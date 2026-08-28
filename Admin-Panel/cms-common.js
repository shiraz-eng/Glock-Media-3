// Shared helpers for the page-content loaders (about/contact/services/portfolio).
// Keeps every loader consistent: safe HTML escaping, a single global FAQ
// accordion toggle, and a scroll-reveal re-initializer for content that is
// injected AFTER the page's own inline scripts already set up their
// IntersectionObservers against the original static markup.

export const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Same accordion behaviour as the Home page's dynamic-loader.js — bound via
// inline onclick so it keeps working no matter when the node was created.
window.toggleFaq = window.toggleFaq || function (el) {
  const item = el.closest(".faq-item");
  if (!item) return;
  const isOpen = item.classList.contains("open") || item.classList.contains("active");
  item.parentElement.querySelectorAll(".faq-item").forEach((x) => {
    x.classList.remove("open", "active");
  });
  if (!isOpen) item.classList.add("open", "active");
};

// Re-run the reveal/flip/cascade/fold scroll-in animation for any element
// that doesn't have `.visible` yet (i.e. content a CMS loader just injected
// after the page's own observer already fired once against the old DOM).
export function reinitScrollAnimations(root = document) {
  const targets = root.querySelectorAll(".reveal:not(.visible), .flip-3d:not(.visible), .flip-3d-left:not(.visible), .fold-reveal:not(.visible), .cascade-3d:not(.visible)");
  if (!targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  targets.forEach((el) => observer.observe(el));
}

// Fetch the shared `settings/website` doc once and hand back a plain object
// (or {} if it doesn't exist / Firestore is unreachable).
export async function fetchWebsiteSettings(db) {
  try {
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    const snap = await getDoc(doc(db, "settings", "website"));
    return snap.exists() ? snap.data() : {};
  } catch (err) {
    console.warn("cms-common: failed to load settings/website", err);
    return {};
  }
}
