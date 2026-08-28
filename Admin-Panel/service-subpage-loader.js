// Generic CMS loader for the individual service pages (Channel-Management,
// Growth-Strategy, Script-Writing, Video-Editing, plus any admin-created
// subcategory served from Services/Service.html). Which record to fetch is
// read from <body data-service-key="...">; if that's blank (the generic
// Service.html template), it falls back to the ?slug= query param, which
// matches the "key" the admin panel assigned when the subcategory was
// created (Admin-Panel/admin-pages.js -> addCustomServicePage).
// Pulled from settings/website -> servicePages[key]. Missing fields are
// skipped so the page keeps its original static copy.
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

function renderIconList(sel, list, cardTag) {
  const grid = document.querySelector(sel);
  if (!grid || !Array.isArray(list) || !list.length) return;
  const cls = cardTag === "deliverable" ? "deliverable-card flip-3d" : "feature-card tilt cascade-3d";
  grid.innerHTML = list.map((it, i) => cardTag === "deliverable" ? `
    <div class="deliverable-card flip-3d reveal-delay-${(i % 4) + 1}">
      <div class="deliverable-icon">${it.icon || ""}</div>
      <div class="deliverable-content">
        <h4>${esc(it.title)}</h4>
        <p>${esc(it.desc)}</p>
      </div>
    </div>
  ` : `
    <div class="feature-card tilt cascade-3d reveal-delay-${(i % 3) + 1}">
      <div class="feature-icon">${it.icon || ""}</div>
      <h3>${esc(it.title)}</h3>
      <p>${esc(it.desc)}</p>
    </div>
  `).join("");
}

function renderMethodology(steps) {
  const wrap = document.querySelector("#methodology .methodology-steps");
  if (!wrap || !Array.isArray(steps) || !steps.length) return;
  wrap.innerHTML = steps.map((s, i) => `
    <div class="method-step fold-reveal reveal-delay-${i + 1}">
      <div class="method-step-num">${esc(s.num)}</div>
      <div class="method-step-content">
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.desc)}</p>
      </div>
    </div>
  `).join("");
}

function renderFaq(list) {
  const wrap = document.querySelector("#svc-faq .faq-list");
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
  const slugParam = new URLSearchParams(location.search).get("slug");
  const key = document.body.dataset.serviceKey || slugParam;
  if (!key) return;
  let data = {};
  let found = false;
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) {
      const servicePages = snap.data().servicePages || {};
      found = Object.prototype.hasOwnProperty.call(servicePages, key);
      data = servicePages[key] || {};
    }
  } catch (err) {
    console.warn("service-subpage-loader: falling back to static content", err);
  }

  // Generic Service.html has no built-in static copy of its own (unlike the
  // 4 fixed pages), so if a slug was given but nothing matches it in
  // Firestore, tell the visitor instead of silently showing placeholder text.
  if (!document.body.dataset.serviceKey && slugParam && !found) {
    const hero = document.querySelector("#svc-hero .hero-title");
    if (hero) hero.textContent = "Service not found";
    const sub = document.querySelector("#svc-hero .hero-subtitle");
    if (sub) sub.textContent = "This service page hasn't been published yet. Head back to our Services overview to see everything we offer.";
    return;
  }

  if (!data || !Object.keys(data).length) return;

  if (data.hero && data.hero.label) {
    document.title = `${data.hero.label} | Glock Media`;
  }

  if (data.hero) {
    setText("#svc-hero .scramble-text", data.hero.label);
    setHtml("#svc-hero .hero-title", data.hero.titleHtml);
    setText("#svc-hero .hero-subtitle", data.hero.subtitle);
    setAttr("#svc-hero .hero-cta-primary", "href", data.hero.ctaPrimaryLink);
    setAttr("#svc-hero .hero-cta-secondary", "href", data.hero.ctaSecondaryLink);
    const primaryBtn = document.querySelector("#svc-hero .hero-cta-primary");
    if (primaryBtn && data.hero.ctaPrimaryText) primaryBtn.childNodes[0].textContent = data.hero.ctaPrimaryText + " ";
    if (data.hero.ctaSecondaryText) setText("#svc-hero .hero-cta-secondary", data.hero.ctaSecondaryText);
    if (Array.isArray(data.hero.stats)) {
      const statsWrap = document.querySelector("#svc-hero .hero-stats");
      data.hero.stats.forEach((s, i) => renderStat(statsWrap, i, s));
    }
  }

  if (data.problem) {
    setText("#svc-problem .section-label", data.problem.label);
    setHtml("#svc-problem h2.section-title", data.problem.titleHtml);
    if (Array.isArray(data.problem.paragraphs) && data.problem.paragraphs.length) {
      const wrap = document.querySelector("#svc-problem .problem-paragraphs");
      if (wrap) wrap.innerHTML = data.problem.paragraphs.map(p => `<p>${p}</p>`).join("");
    }
    if (Array.isArray(data.problem.bullets) && data.problem.bullets.length) {
      const ul = document.querySelector("#svc-problem .problem-text ul");
      if (ul) ul.innerHTML = data.problem.bullets.map(b => `<li>${esc(b)}</li>`).join("");
    }
    setText("#svc-problem .problem-visual-quote", data.problem.quote);
    setAttr("#svc-problem .problem-visual img", "src", resolveImageUrl(data.problem.image));
  }

  if (data.features) {
    setText("#features .section-label", data.features.label);
    setHtml("#features h2.section-title", data.features.titleHtml);
    setText("#features .section-desc", data.features.subtitle);
    renderIconList("#features .features-grid", data.features.list, "feature");
  }

  if (data.methodology) {
    setText("#methodology .section-label", data.methodology.label);
    setHtml("#methodology h2.section-title", data.methodology.titleHtml);
    setAttr("#methodology .methodology-visual img", "src", resolveImageUrl(data.methodology.image));
    renderMethodology(data.methodology.steps);
  }

  if (data.deliverables) {
    setText("#svc-deliverables .section-label", data.deliverables.label);
    setHtml("#svc-deliverables h2.section-title", data.deliverables.titleHtml);
    setText("#svc-deliverables .section-desc", data.deliverables.subtitle);
    renderIconList("#svc-deliverables .deliverables-grid", data.deliverables.list, "deliverable");
  }

  if (Array.isArray(data.faq)) renderFaq(data.faq);

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
