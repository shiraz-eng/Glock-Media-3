// CMS loader for Portfolio.html. `js/data.js` (loaded just before this
// script, as window.GLOCK.portfolio) is always the baseline for work items —
// it's the file meant to be hand-edited directly, so nothing added there can
// ever be hidden by Firestore. Firestore's `portfolio` collection only ever
// ADDS items on top: anything saved through the admin's "Add Work Item"
// modal whose title isn't already in data.js gets appended. This also means
// a title collision (e.g. leftover corrupted docs from an old bug) is
// automatically skipped rather than shadowing the real data.js entry.
// Hero/results/CTA copy and the small testimonials/marquee lists still come
// from settings/website -> portfolioPage. Because glock-portfolio.js reads
// window.GLOCK synchronously the moment it loads, it is only injected AFTER
// this loader has finished merging in any CMS data — never included as a
// static <script> tag in the page itself.
import { db } from "./firebase-config.js";
import { listPortfolioItems } from "./cms-api.js";
import { esc } from "./cms-common.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { resolveImageUrl } from "./media-url-resolver.js";

function setHtml(sel, val) { const el = document.querySelector(sel); if (el && val) el.innerHTML = val; }
function setText(sel, val) { const el = document.querySelector(sel); if (el && val) el.textContent = val; }
function setAttr(sel, attr, val) { const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); }

// Hand-off to trusted-marquee.js — see dynamic-loader.js for the full
// explanation. Created synchronously (before DOMContentLoaded can fire) so
// trusted-marquee.js can always safely await it.
let resolveTrustedLogos;
window.__trustedLogosPromise = new Promise((res) => { resolveTrustedLogos = res; });

(async () => {
  window.GLOCK = window.GLOCK || {};

  // 1) Portfolio work items — data.js is the baseline; Firestore only adds
  // items with a title that isn't already present (see header comment).
  try {
    const baseline = window.GLOCK.portfolio || [];
    const existingTitles = new Set(baseline.map(p => p.title));
    const items = await listPortfolioItems();
    if (items && items.length) {
      const extra = items.filter(p => p.title && !existingTitles.has(p.title));
      window.GLOCK.portfolio = baseline.concat(extra);
    }
  } catch (err) {
    console.warn("portfolio-loader: using data.js portfolio items only", err);
  }

  // 2) Page copy + small lists — settings/website.portfolioPage
  let page = {};
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) page = snap.data().portfolioPage || {};
  } catch (err) {
    console.warn("portfolio-loader: falling back to static page copy", err);
  }

  if (page.hero) {
    setText("#pf-hero .scramble-text", page.hero.label);
    setHtml("#pf-hero .hero-title", page.hero.titleHtml);
    setText("#pf-hero .hero-subtitle", page.hero.subtitle);
  }

  if (Array.isArray(page.results) && page.results.length) {
    const cards = document.querySelectorAll("#pf-results .pf-result");
    page.results.forEach((r, i) => {
      const card = cards[i];
      if (!card || !r) return;
      const numSpan = card.querySelector(".num span");
      const lbl = card.querySelector(".lbl");
      if (numSpan && (r.num ?? "") !== "") {
        numSpan.setAttribute("data-count", r.num);
        if (r.suffix != null) numSpan.setAttribute("data-suffix", r.suffix);
        numSpan.textContent = String(r.num) + (r.suffix || "");
      }
      if (lbl && r.label) lbl.textContent = r.label;
    });
  }

  if (Array.isArray(page.testimonials) && page.testimonials.length) {
    window.GLOCK.testimonials = page.testimonials;
  }
  if (Array.isArray(page.marquee) && page.marquee.length) {
    window.GLOCK.marquee = page.marquee;
  }
  if (Array.isArray(page.customTypes) && page.customTypes.length) {
    window.GLOCK.customTypes = page.customTypes;
  }

  // Trusted-by logos — hand off to trusted-marquee.js (see top of file).
  try {
    const clients = Array.isArray(page.clients) ? page.clients : [];
    const resolvedLogos = clients.filter((c) => c && c.logo).map((c) => resolveImageUrl(c.logo));
    window.GLOCK.clients = clients;
    resolveTrustedLogos(resolvedLogos.length ? resolvedLogos : null);
  } catch (err) {
    console.warn("portfolio-loader: failed to resolve trusted logos", err);
    resolveTrustedLogos(null);
  }

  if (page.cta) {
    setText(".cta-section .cta-spots-text", page.cta.spotsText);
    setHtml(".cta-section .cta-title", page.cta.titleHtml);
    setText(".cta-section .cta-desc", page.cta.desc);
    setAttr(".cta-section .cta-btn", "href", page.cta.btnLink);
    const ctaBtn = document.querySelector(".cta-section .cta-btn");
    if (ctaBtn && page.cta.btnText) ctaBtn.childNodes[0].textContent = page.cta.btnText + " ";
  }

  // 3) Now that window.GLOCK is final, run the portfolio rendering engine.
  const s = document.createElement("script");
  s.src = "/js/glock-portfolio.js";
  document.body.appendChild(s);
})();
