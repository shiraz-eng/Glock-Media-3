// Site-wide "Reviews" loader for the .testimonial-carousel slider used on
// the About page and every Service page (Script-Writing, Video-Editing,
// Growth-Strategy, Channel-Management, and any custom service pages added
// later). Edited in one place in the Admin Panel (About page tab -> "Site
// Reviews"), pushed out here to every page that includes this script.
//
// If Firestore has no siteReviews saved yet, this does nothing and the
// page's original hardcoded review cards stay exactly as they are — same
// "never breaks the page, only adds on top" pattern as the other loaders.
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { esc } from "./cms-common.js";
import { resolveImageUrl } from "./media-url-resolver.js";

function slideHtml(r, i) {
  return `
    <div class="testimonial-slide${i === 0 ? " active" : ""}">
      <div class="testimonial-quote">${esc(r.quote || "")}</div>
      <div class="testimonial-author">
        <img src="${esc(resolveImageUrl(r.avatar || ""))}" alt="Client">
        <div class="testimonial-author-info">
          <div class="name">${esc(r.name || "")}</div>
          <div class="role">${esc(r.role || "")}</div>
        </div>
      </div>
    </div>`;
}
function dotHtml(_, i) {
  return `<div class="testimonial-dot${i === 0 ? " active" : ""}" data-index="${i}"></div>`;
}

(async () => {
  const carousel = document.querySelector(".testimonial-carousel");
  const dotsWrap = document.querySelector(".testimonial-dots");
  if (!carousel) return;

  let reviews = [];
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) reviews = (snap.data().siteReviews || {}).list || [];
  } catch (err) {
    console.warn("reviews-loader: falling back to static reviews on this page", err);
    return;
  }
  if (!Array.isArray(reviews) || !reviews.length) return;

  carousel.innerHTML = reviews.map(slideHtml).join("");
  if (dotsWrap) dotsWrap.innerHTML = reviews.map(dotHtml).join("");

  // Re-run the page's own carousel init (About.js / Services-Post.js) now
  // that fresh slide/dot elements exist — it re-queries the DOM and
  // restarts the rotation timer.
  if (typeof window.initTestimonialCarousel === "function") {
    window.initTestimonialCarousel();
  }
})();
