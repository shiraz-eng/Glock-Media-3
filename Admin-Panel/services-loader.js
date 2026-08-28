// CMS loader for Services.html (the main services overview page) from
// settings/website -> servicesPage. Missing fields are skipped so the page
// keeps its original static copy.
import { db } from "./firebase-config.js";
import { esc, reinitScrollAnimations } from "./cms-common.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { resolveImageUrl } from "./media-url-resolver.js";

function setHtml(sel, val) { const el = document.querySelector(sel); if (el && val) el.innerHTML = val; }
function setText(sel, val) { const el = document.querySelector(sel); if (el && val) el.textContent = val; }
function setAttr(sel, attr, val) { const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); }

function renderStat(container, idx, stat) {
  if (!container || !stat) return;
  const item = container.querySelectorAll(".hero-stat")[idx];
  if (!item) return;
  const num = item.querySelector(".hero-stat-number");
  const label = item.querySelector(".hero-stat-label");
  if (num && (stat.num ?? "") !== "") {
    num.setAttribute("data-count", stat.num);
    if (stat.suffix != null) num.setAttribute("data-suffix", stat.suffix);
    num.textContent = String(stat.num) + (stat.suffix || "");
  }
  if (label && stat.label) label.textContent = stat.label;
}

(async () => {
  let data = {};
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) data = snap.data().servicesPage || {};
  } catch (err) {
    console.warn("services-loader: falling back to static content", err);
  }
  if (!data || !Object.keys(data).length) return;

  if (data.hero) {
    setText("#svc-main-hero .scramble-text", data.hero.label);
    setHtml("#svc-main-hero .hero-title", data.hero.titleHtml);
    setText("#svc-main-hero .hero-subtitle", data.hero.subtitle);
    if (Array.isArray(data.hero.stats)) {
      const statsWrap = document.querySelector("#svc-main-hero .hero-stats");
      data.hero.stats.forEach((s, i) => renderStat(statsWrap, i, s));
    }
  }

  // The 4 service cards keep their fixed links (they route to the real
  // sub-pages) — only the copy/image/tags are editable, in a fixed order.
  if (Array.isArray(data.cards) && data.cards.length) {
    const cards = document.querySelectorAll("#services .service-card");
    data.cards.forEach((c, i) => {
      const card = cards[i];
      if (!card || !c) return;
      const img = card.querySelector("img"); if (img && c.image) img.src = resolveImageUrl(c.image);
      const accent = card.querySelector(".service-card-accent"); if (accent && c.accent) accent.textContent = c.accent;
      const h3 = card.querySelector("h3"); if (h3 && c.title) h3.textContent = c.title;
      const p = card.querySelector(".service-card-content > p"); if (p && c.desc) p.textContent = c.desc;
      const tagsWrap = card.querySelector(".service-card-features");
      if (tagsWrap && Array.isArray(c.tags) && c.tags.length) {
        tagsWrap.innerHTML = c.tags.map(t => `<span>${esc(t)}</span>`).join("");
      }
    });
  }

  if (data.process) {
    setText("#process .section-label", data.process.label);
    setHtml("#process h2.section-title", data.process.titleHtml);
    setText("#process .section-desc", data.process.subtitle);
    if (Array.isArray(data.process.steps) && data.process.steps.length) {
      const wrap = document.querySelector("#process .process-steps");
      if (wrap) wrap.innerHTML = data.process.steps.map((s, i) => `
        <div class="process-step-card tilt fold-reveal reveal-delay-${i + 1}">
          <div class="process-step-num">${esc(s.num)}</div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.desc)}</p>
        </div>
      `).join("");
    }
  }

  if (data.results) {
    setText("#svc-main-results .section-label", data.results.label);
    setHtml("#svc-main-results h2.section-title", data.results.titleHtml);
    setText("#svc-main-results .section-desc", data.results.subtitle);
    if (Array.isArray(data.results.list) && data.results.list.length) {
      const wrap = document.querySelector("#svc-main-results .results-grid");
      if (wrap) wrap.innerHTML = data.results.list.map((r, i) => `
        <div class="result-card tilt cascade-3d reveal-delay-${i + 1}">
          <div class="icon">${r.icon || ""}</div>
          <div class="number">${r.prefix || ""}<span data-count="${esc(r.num)}" data-suffix="${esc(r.suffix || "")}">${esc(r.num)}${esc(r.suffix || "")}</span></div>
          <div class="label">${esc(r.label)}</div>
          <div class="desc">${esc(r.desc)}</div>
        </div>
      `).join("");
    }
  }

  if (Array.isArray(data.faq) && data.faq.length) {
    const wrap = document.querySelector("#svc-main-faq .faq-list");
    if (wrap) wrap.innerHTML = data.faq.map((f, i) => `
      <div class="faq-item reveal${i ? " reveal-delay-" + Math.min(i, 4) : ""}">
        <div class="faq-question" onclick="window.toggleFaq(this)">
          <h3>${esc(f.q)}</h3>
          <div class="faq-icon"></div>
        </div>
        <div class="faq-answer"><p>${esc(f.a)}</p></div>
      </div>
    `).join("");
  }

  if (data.cta) {
    setText(".cta-section .cta-spots-text", data.cta.spotsText);
    setHtml(".cta-section .cta-title", data.cta.titleHtml);
    setText(".cta-section .cta-desc", data.cta.desc);
    setAttr(".cta-section .cta-btn", "href", data.cta.btnLink);
    const ctaBtn = document.querySelector(".cta-section .cta-btn");
    if (ctaBtn && data.cta.btnText) ctaBtn.childNodes[0].textContent = data.cta.btnText + " ";
  }

  reinitScrollAnimations();
})();
