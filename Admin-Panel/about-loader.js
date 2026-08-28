// Injects CMS-managed content into About-Us.html from Firestore
// (settings/website -> aboutPage). Any field left empty/missing in
// Firestore is skipped so the page keeps its original static copy —
// this loader only ever overwrites, never blanks.
import { db } from "./firebase-config.js";
import { esc, reinitScrollAnimations } from "./cms-common.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { resolveImageUrl } from "./media-url-resolver.js";

const SOCIAL_ICONS = {
  instagram: "instagram", linkedin: "linkedin", youtube: "youtube",
  twitter: "twitter", upwork: "briefcase", facebook: "facebook"
};

function setHtml(sel, val) { const el = document.querySelector(sel); if (el && val) el.innerHTML = val; }
function setText(sel, val) { const el = document.querySelector(sel); if (el && val) el.textContent = val; }
function setAttr(sel, attr, val) { const el = document.querySelector(sel); if (el && val) el.setAttribute(attr, val); }

function renderStat(container, idx, stat) {
  if (!container || !stat) return;
  const items = container.querySelectorAll(":scope > *");
  const item = items[idx];
  if (!item) return;
  const num = item.querySelector(".num, .hero-stat-number, .intro-stat-num");
  const label = item.querySelector(".label, .hero-stat-label, .intro-stat-label");
  if (num && (stat.num ?? "") !== "") num.textContent = stat.num;
  if (label && stat.label) label.textContent = stat.label;
}

function renderValues(data) {
  const grid = document.querySelector("#values .values-grid");
  if (!grid || !data || !Array.isArray(data.list) || !data.list.length) return;
  grid.innerHTML = data.list.map((v, i) => `
    <div class="value-card flip-3d${i % 2 ? "-left" : ""} reveal-delay-${(i % 4) + 1}">
      <div class="value-icon">${v.icon || ""}</div>
      <h3>${esc(v.title)}</h3>
      <p>${esc(v.desc)}</p>
    </div>
  `).join("");
}

function renderTeam(data) {
  const grid = document.querySelector("#team .team-grid");
  if (!grid || !data || !Array.isArray(data.list) || !data.list.length) return;
  grid.innerHTML = data.list.map((m, i) => `
    <div class="team-card cascade-3d reveal-delay-${(i % 4) + 1}">
      <div class="team-card-img"><img src="${esc(resolveImageUrl(m.img))}" alt="${esc(m.name)}"></div>
      <div class="team-card-info">
        <div class="role">${esc(m.role)}</div>
        <div class="name">${esc(m.name)}</div>
        <div class="desc">${esc(m.desc)}</div>
      </div>
      <div class="team-card-social">
        ${(m.social || []).map(s => `<a href="${esc(s.url || "#")}" target="_blank" rel="noopener"><i data-lucide="${esc(SOCIAL_ICONS[s.icon] || "link")}" style="width:14px;height:14px;"></i></a>`).join("")}
      </div>
    </div>
  `).join("");
  if (window.lucide) window.lucide.createIcons();
}

function renderProcess(data) {
  const timeline = document.querySelector("#process .process-timeline");
  if (!timeline || !data || !Array.isArray(data.steps) || !data.steps.length) return;
  timeline.innerHTML = data.steps.map(s => `
    <div class="process-step fold-reveal">
      <div class="process-step-num">${esc(s.num)}</div>
      <div class="process-step-content">
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
      </div>
      <div class="process-step-visual"><img src="${esc(resolveImageUrl(s.image))}" alt="${esc(s.title)}"></div>
    </div>
  `).join("");
}

(async () => {
  let data = {};
  try {
    const snap = await getDoc(doc(db, "settings", "website"));
    if (snap.exists()) data = snap.data().aboutPage || {};
  } catch (err) {
    console.warn("about-loader: falling back to static content", err);
  }
  if (!data || !Object.keys(data).length) return;

  // Hero
  if (data.hero) {
    setHtml("#about-hero .hero-title", data.hero.titleHtml);
    setText("#about-hero .hero-subtitle", data.hero.subtitle);
    setAttr("#about-hero .hero-cta-primary", "href", data.hero.ctaPrimaryLink);
    setAttr("#about-hero .hero-cta-secondary", "href", data.hero.ctaSecondaryLink);
    const primaryBtn = document.querySelector("#about-hero .hero-cta-primary");
    if (primaryBtn && data.hero.ctaPrimaryText) primaryBtn.childNodes[0].textContent = data.hero.ctaPrimaryText + " ";
    const secondaryBtn = document.querySelector("#about-hero .hero-cta-secondary");
    if (secondaryBtn && data.hero.ctaSecondaryText) secondaryBtn.textContent = data.hero.ctaSecondaryText;
    if (Array.isArray(data.hero.stats)) {
      const statsWrap = document.querySelector("#about-hero .hero-stats");
      data.hero.stats.forEach((s, i) => renderStat(statsWrap, i, s));
    }
  }

  // Mission
  if (data.mission) {
    setText("#mission .section-label", data.mission.label);
    setHtml("#mission h2.section-title", data.mission.titleHtml);
    if (Array.isArray(data.mission.paragraphs) && data.mission.paragraphs.length) {
      const wrap = document.querySelector("#mission .mission-paragraphs");
      if (wrap) wrap.innerHTML = data.mission.paragraphs.map(p => `<p>${p}</p>`).join("");
    }
    setAttr("#mission .mission-visual img", "src", resolveImageUrl(data.mission.image));
    if (Array.isArray(data.mission.stats)) {
      const statsWrap = document.querySelector("#mission .mission-stat");
      data.mission.stats.forEach((s, i) => renderStat(statsWrap, i, s));
    }
  }

  // Values
  if (data.values) {
    setText("#values .section-label", data.values.label);
    setHtml("#values h2.section-title", data.values.titleHtml);
    setText("#values > div.reveal > p", data.values.subtitle);
    renderValues(data.values);
  }

  // Team
  if (data.team) {
    setText("#team .section-label", data.team.label);
    setHtml("#team h2.section-title", data.team.titleHtml);
    setText("#team > div.reveal > p", data.team.subtitle);
    renderTeam(data.team);
  }

  // Process
  if (data.process) {
    setText("#process .section-label", data.process.label);
    setHtml("#process h2.section-title", data.process.titleHtml);
    setText("#process > div.reveal > p", data.process.subtitle);
    renderProcess(data.process);
  }

  // CTA
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
