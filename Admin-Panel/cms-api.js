// Shared CMS API — Firestore CRUD for categories, blogs, navbar, media.
import { db } from "./firebase-config.js";
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export const slugify = (s) => (s || "").toString().toLowerCase().trim()
  .replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

const fallbackKey = (name) => `glock_cms_${name}`;
const fallbackList = (name) => {
  try { return JSON.parse(localStorage.getItem(fallbackKey(name)) || "[]"); }
  catch { return []; }
};
const fallbackSaveAll = (name, items) => localStorage.setItem(fallbackKey(name), JSON.stringify(items));
const fallbackId = () => `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const now = () => Date.now();

const upsertFallback = (name, id, payload) => {
  const items = fallbackList(name);
  const idx = items.findIndex(i => i.id === id);
  const cleanPayload = { ...payload, updatedAt: now() };
  if (idx >= 0) {
    items[idx] = { ...items[idx], ...cleanPayload };
  } else {
    items.push({ id, ...cleanPayload, createdAt: now() });
  }
  fallbackSaveAll(name, items);
};

const removeFallback = (name, id) => {
  fallbackSaveAll(name, fallbackList(name).filter(i => i.id !== id));
};

async function syncRemote(label, action) {
  try {
    await withTimeout(action(), 10000);
  } catch (err) {
    console.error(`Firestore ${label} sync failed:`, err);
    throw err;
  }
}

const serializeFirestoreData = (data) => {
  if (!data) return data;
  const clean = { ...data };
  for (const key in clean) {
    if (clean[key] && typeof clean[key] === "object") {
      if (typeof clean[key].toDate === "function") {
        clean[key] = clean[key].toDate().getTime();
      } else if (typeof clean[key].seconds === "number") {
        clean[key] = clean[key].seconds * 1000;
      }
    }
  }
  return clean;
};

const withTimeout = (promise, ms = 10000) => Promise.race([
  promise,
  new Promise((_, reject) => setTimeout(() => reject(new Error("Database request timed out")), ms))
]);

async function withFallback(name, action, fallback) {
  try { return await withTimeout(action(), 10000); }
  catch (err) {
    console.warn(`Firestore ${name} unavailable, using browser fallback:`, err);
    return fallback();
  }
}

// ---------- Categories ----------
export async function listCategories() {
  return withFallback("categories", async () => {
    const snap = await getDocs(collection(db, "categories"));
    const remoteItems = snap.docs.map(d => serializeFirestoreData({ id: d.id, ...d.data() }));
    fallbackSaveAll("categories", remoteItems);
    return remoteItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, () => fallbackList("categories").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
}
export async function getCategoryBySlug(slug) {
  return withFallback("category", async () => {
    const snap = await getDocs(query(collection(db, "categories"), where("slug", "==", slug)));
    if (snap.empty) return null;
    return serializeFirestoreData({ id: snap.docs[0].id, ...snap.docs[0].data() });
  }, () => fallbackList("categories").find(c => c.slug === slug) || null);
}
export async function saveCategory(data, id) {
  const payload = {
    name: data.name,
    slug: data.slug || slugify(data.name),
    color: data.color || "#3b82f6",
    order: Number(data.order ?? 0),
    updatedAt: serverTimestamp()
  };
  const targetId = id || fallbackId();
  upsertFallback("categories", targetId, { ...payload, updatedAt: now() });
  await syncRemote("save category", async () => {
    const remotePayload = id ? payload : { ...payload, createdAt: serverTimestamp() };
    await setDoc(doc(db, "categories", targetId), remotePayload, { merge: true });
  });
  return targetId;
}
export async function deleteCategory(id) {
  removeFallback("categories", id);
  await syncRemote("delete category", async () => { await deleteDoc(doc(db, "categories", id)); });
}

// ---------- Blogs ----------
export async function listBlogs({ categorySlug, publishedOnly = false } = {}) {
  return withFallback("blogs", async () => {
    const snap = await getDocs(collection(db, "blogs"));
    const remoteItems = snap.docs.map(d => serializeFirestoreData({ id: d.id, ...d.data() }));
    fallbackSaveAll("blogs", remoteItems);
    let items = remoteItems;
    if (categorySlug) items = items.filter(b => b.categorySlug === categorySlug);
    if (publishedOnly) items = items.filter(b => b.published !== false);
    return items.sort((a, b) => (b.publishDate || "").localeCompare(a.publishDate || ""));
  }, () => {
    let items = fallbackList("blogs");
    if (categorySlug) items = items.filter(b => b.categorySlug === categorySlug);
    if (publishedOnly) items = items.filter(b => b.published !== false);
    return items.sort((a, b) => (b.publishDate || "").localeCompare(a.publishDate || ""));
  });
}
export async function getBlog(id) {
  return withFallback("blog", async () => {
    const s = await getDoc(doc(db, "blogs", id));
    return s.exists() ? serializeFirestoreData({ id: s.id, ...s.data() }) : null;
  }, () => fallbackList("blogs").find(b => b.id === id) || null);
}
export async function getBlogBySlug(slug) {
  const blogs = await listBlogs();
  return blogs.find(b => b.slug === slug) || null;
}
export async function saveBlog(data, id) {
  const payload = {
    title: data.title || "",
    slug: data.slug || slugify(data.title),
    categoryId: data.categoryId || "",
    categorySlug: data.categorySlug || "",
    categoryName: data.categoryName || "",
    featuredImage: data.featuredImage || "",
    shortDesc: data.shortDesc || "",
    content: data.content || "",
    author: data.author || "",
    authorAvatar: data.authorAvatar || "",
    publishDate: data.publishDate || new Date().toISOString().slice(0, 10),
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? String(data.tags).split(",").map(t => t.trim()).filter(Boolean) : []),
    seoTitle: data.seoTitle || "",
    seoDescription: data.seoDescription || "",
    keywords: data.keywords || "",
    ogImage: data.ogImage || "",
    canonical: data.canonical || "",
    readTime: data.readTime || "5 min",
    published: !!data.published,
    toc: Array.isArray(data.toc) ? data.toc : [],
    updatedAt: serverTimestamp()
  };
  const targetId = id || fallbackId();
  upsertFallback("blogs", targetId, { ...payload, updatedAt: now() });
  await syncRemote("save blog", async () => {
    const remotePayload = id ? payload : { ...payload, createdAt: serverTimestamp() };
    await setDoc(doc(db, "blogs", targetId), remotePayload, { merge: true });
  });
  return targetId;
}
export async function deleteBlog(id) {
  removeFallback("blogs", id);
  await syncRemote("delete blog", async () => { await deleteDoc(doc(db, "blogs", id)); });
}

// ---------- Navbar ----------
export async function listNavItems() {
  return withFallback("navbar", async () => {
    const snap = await getDocs(collection(db, "navbar"));
    const remoteItems = snap.docs.map(d => serializeFirestoreData({ id: d.id, ...d.data() }));
    fallbackSaveAll("navbar", remoteItems);
    return remoteItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, () => fallbackList("navbar").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
}
export async function saveNavItem(data, id) {
  const payload = {
    label: data.label || "",
    url: data.url || "#",
    order: Number(data.order ?? 0),
    enabled: data.enabled !== false,
    type: data.type || "internal",
    updatedAt: serverTimestamp()
  };
  const targetId = id || fallbackId();
  upsertFallback("navbar", targetId, { ...payload, updatedAt: now() });
  await syncRemote("save nav", async () => {
    const remotePayload = id ? payload : { ...payload, createdAt: serverTimestamp() };
    await setDoc(doc(db, "navbar", targetId), remotePayload, { merge: true });
  });
  return targetId;
}
export async function deleteNavItem(id) {
  removeFallback("navbar", id);
  await syncRemote("delete nav", async () => { await deleteDoc(doc(db, "navbar", id)); });
}

// ---------- Media ----------
export async function listMedia() {
  return withFallback("media", async () => {
    const snap = await getDocs(collection(db, "media"));
    const remoteItems = snap.docs.map(d => serializeFirestoreData({ id: d.id, ...d.data() }));
    fallbackSaveAll("media", remoteItems);
    return remoteItems.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  }, () => fallbackList("media").sort((a, b) => (a.createdAt ?? 0) - (a.createdAt ?? 0)));
}
export async function saveMedia(item) {
  const payload = {
    name: item.name || "asset",
    url: item.url,
    type: item.type || "image",
    createdAt: serverTimestamp()
  };
  const targetId = fallbackId();
  upsertFallback("media", targetId, { ...payload, createdAt: now(), updatedAt: now() });
  await syncRemote("save media", async () => {
    await setDoc(doc(db, "media", targetId), payload, { merge: true });
  });
  return targetId;
}
export async function deleteMedia(id) {
  removeFallback("media", id);
  await syncRemote("delete media", async () => { await deleteDoc(doc(db, "media", id)); });
}

// ---------- Portfolio items (case studies / showreel work) ----------
export async function listPortfolioItems() {
  return withFallback("portfolio", async () => {
    const snap = await getDocs(collection(db, "portfolio"));
    const remoteItems = snap.docs.map(d => serializeFirestoreData({ id: d.id, ...d.data() }));
    fallbackSaveAll("portfolio", remoteItems);
    return remoteItems.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, () => fallbackList("portfolio").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
}
export async function getPortfolioItem(id) {
  return withFallback("portfolio item", async () => {
    const s = await getDoc(doc(db, "portfolio", id));
    return s.exists() ? serializeFirestoreData({ id: s.id, ...s.data() }) : null;
  }, () => fallbackList("portfolio").find(p => p.id === id) || null);
}
export async function savePortfolioItem(data, id) {
  const payload = {
    type: data.type || "longform",
    title: data.title || "",
    niche: data.niche || "",
    client: data.client || "",
    video: data.video || "",
    doc: data.doc || "",
    image: data.image || "",
    variants: Array.isArray(data.variants) ? data.variants : [],
    views: data.views || "",
    duration: data.duration || "",
    pages: data.pages || "",
    ctr: data.ctr || "",
    stats: Array.isArray(data.stats) ? data.stats : [],
    description: data.description || "",
    order: Number(data.order ?? 0),
    updatedAt: serverTimestamp()
  };
  const targetId = id || data.id || fallbackId();
  upsertFallback("portfolio", targetId, { ...payload, updatedAt: now() });
  await syncRemote("save portfolio item", async () => {
    const remotePayload = id ? payload : { ...payload, createdAt: serverTimestamp() };
    await setDoc(doc(db, "portfolio", targetId), remotePayload, { merge: true });
  });
  return targetId;
}
export async function deletePortfolioItem(id) {
  removeFallback("portfolio", id);
  await syncRemote("delete portfolio item", async () => { await deleteDoc(doc(db, "portfolio", id)); });
}

// ---------- Custom service subcategories (admin-added Services dropdown pages) ----------
// Stored as settings/website.customServices — a small array of
// { key, slug, name, order }. `key` doubles as the Firestore key inside
// servicePages{} AND the ?slug= used by /Services/Service.html, so pages can
// resolve either one straight from this same list. Used by script.js to
// inject the extra navbar dropdown links on every page.
export async function listCustomServiceLinks() {
  return withFallback("customServices", async () => {
    const snap = await getDoc(doc(db, "settings", "website"));
    const list = snap.exists() ? (snap.data().customServices || []) : [];
    fallbackSaveAll("customServicesNav", list);
    return list.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, () => fallbackList("customServicesNav").sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
}
