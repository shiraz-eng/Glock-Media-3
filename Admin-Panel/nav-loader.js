// Injects dynamic navbar items from Firestore into any page.
// Include as: <script type="module" src="/Admin-Panel/nav-loader.js"></script>
// It looks for a container with class ".nav-links" (or #dynamicNav) and
// replaces existing managed links while preserving the CTA button.
import { listNavItems } from "./cms-api.js";

const normalizeUrl = (item) => {
  if (item.type === "category") {
    return `/Glock-Media-Blog/category.html?slug=${encodeURIComponent(String(item.url || "").replace(/^\/+/, ""))}`;
  }
  return item.url || "#";
};

const renderContainer = (container, items, linkClass) => {
  const cta = Array.from(container.children).filter(el => el.classList.contains("nav-cta") || el.classList.contains("mobile-cta"));
  container.innerHTML = "";
  items.forEach(item => {
    const a = document.createElement("a");
    a.className = linkClass;
    a.textContent = item.label;
    a.href = normalizeUrl(item);
    if (item.type === "external") {
      a.target = "_blank";
      a.rel = "noopener";
    }
    container.appendChild(a);
  });
  cta.forEach(el => container.appendChild(el));
};

(async () => {
  try {
    const items = (await listNavItems())
      .filter(i => i.enabled !== false)
      .sort((a,b) => (a.order??0) - (b.order??0));
    if (!items.length) return;
    document.querySelectorAll(".nav-links").forEach(container => renderContainer(container, items, "nav-link"));
    document.querySelectorAll(".mobile-nav").forEach(container => {
      renderContainer(container, items, "mobile-link");
    });
  } catch(e){ console.warn("nav-loader:", e); }
})();
