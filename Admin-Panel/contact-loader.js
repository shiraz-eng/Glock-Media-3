// Injects CMS-managed content into Contact-Us.html from Firestore
// (settings/website -> contactPage). Missing fields are skipped so the
// page keeps its original static copy.
import { db } from "./firebase-config.js";
import { esc, reinitScrollAnimations } from "./cms-common.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function setHtml(sel, val) { const el = document.querySelector(sel); if (el && val) el.innerHTML = val; }
function setText(sel, val) { const el = document.querySelector(sel); if (el && val) el.textContent = val; }
function setAttr(sel, attr, val) { const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); }

function renderMethods(list) {
  const wrap = document.querySelector(".contact-methods");
  if (!wrap || !Array.isArray(list) || !list.length) return;
  wrap.innerHTML = list.map(m => `
    <div class="contact-method">
      <div class="contact-method-icon">${m.icon || ""}</div>
      <div class="contact-method-content">
        <h4>${esc(m.title)}</h4>
        <p>${m.html || ""}</p>
      </div>
    </div>
  `).join("");
}

function renderFaq(list) {
  const wrap = document.querySelector("#contact-faq .faq-list");
  if (!wrap || !Array.isArray(list) || !list.length) return;
  wrap.innerHTML = list.map((f, i) => `
    <div class="faq-item reveal${i ? " reveal-delay-" + Math.min(i, 4) : ""}">
      <div class="faq-question" onclick="window.toggleFaq(this)">
        <h3>${esc(f.q)}</h3>
        <div class="faq-icon"></div>
      </div>
      <div class="faq-answer"><p>${esc(f.a)}</p></div>
    </div>
  `).join("");
}

(async () => {
  let data = {};
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) data = snap.data().contactPage || {};
  } catch (err) {
    console.warn("contact-loader: falling back to static content", err);
  }
  if (!data || !Object.keys(data).length) return;

  if (data.hero) {
    setText("#contact-hero .scramble-text", data.hero.label);
    setHtml("#contact-hero .hero-title", data.hero.titleHtml);
    setText("#contact-hero .hero-subtitle", data.hero.subtitle);
    setAttr("#contact-hero .hero-cta-primary", "href", data.hero.ctaPrimaryLink);
    setAttr("#contact-hero .hero-cta-secondary", "href", data.hero.ctaSecondaryLink);
    const primaryBtn = document.querySelector("#contact-hero .hero-cta-primary");
    if (primaryBtn && data.hero.ctaPrimaryText) primaryBtn.childNodes[0].textContent = data.hero.ctaPrimaryText + " ";
    if (data.hero.ctaSecondaryText) setText("#contact-hero .hero-cta-secondary", data.hero.ctaSecondaryText);
    setText("#contact-hero .hero-spots-text", data.hero.spotsText);
  }

  if (Array.isArray(data.methods)) renderMethods(data.methods);
  if (Array.isArray(data.faq)) renderFaq(data.faq);

  reinitScrollAnimations();
})();
