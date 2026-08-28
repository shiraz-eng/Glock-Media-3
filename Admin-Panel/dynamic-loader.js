import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { DEFAULT_CONFIG } from "./site-defaults.js";
import { resolveFileUrl, resolveImageUrl } from "./media-url-resolver.js";
export { DEFAULT_CONFIG };

// Hand-off to trusted-marquee.js: created synchronously at module load
// (before DOMContentLoaded can fire) so trusted-marquee.js can always
// safely await it, no matter which script's DOMContentLoaded listener
// runs first. Resolves with a list of resolved logo image URLs once the
// admin-configured "Trusted By" logos are known, or `null` if the admin
// hasn't configured any (letting trusted-marquee.js fall back to its
// automatic images/trusted/ folder scan).
let resolveTrustedLogos;
window.__trustedLogosPromise = new Promise((res) => { resolveTrustedLogos = res; });

// IndexedDB Local video resolution
let localVideoUrls = {};

async function loadLocalVideosMap() {
  try {
    const DB_NAME = "GlockMediaAssets";
    const STORE_NAME = "videos";
    const DB_VERSION = 1;
    
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains(STORE_NAME)) {
          d.createObjectStore(STORE_NAME, { keyPath: "name" });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });

    const videosList = await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });

    videosList.forEach(v => {
      if (v.blob) {
        localVideoUrls[v.name] = URL.createObjectURL(v.blob);
      }
    });
  } catch (err) {
    console.warn("IndexedDB video loading bypassed or unavailable:", err);
  }
}

function resolveVideoSrc(src) {
  if (src && localVideoUrls[src]) {
    return localVideoUrls[src];
  }
  // Accepts a direct file URL, a Google Drive link, a Dropbox link, or a
  // local repo file path (e.g. /assets/clips/reel-1.mp4) — see
  // media-url-resolver.js. (YouTube links can't power an autoplaying
  // background <video> tag — use the Portfolio "Video URL" field for
  // click-to-play YouTube content instead.)
  return resolveFileUrl(src);
}

function validateIcon(iconStr, defaultIconHtml) {
  if (!iconStr) return defaultIconHtml;
  const trimmed = iconStr.trim();
  // Check if starts with <svg but is truncated, unclosed, or contains unescaped attributes
  if (trimmed.startsWith("<svg") && (!trimmed.includes(">") || !trimmed.endsWith("</svg>"))) {
    return defaultIconHtml;
  }
  return iconStr;
}

async function loadDynamicContent() {
  await loadLocalVideosMap();
  let data = DEFAULT_CONFIG;
  try {
    const docRef = doc(db, "settings", "website");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      data = snapshot.data();
    }
  } catch (err) {
    console.error("Failed to load firestore settings, using default configuration:", err);
  }

  // Hand configured "Trusted By" logos (if any) off to trusted-marquee.js.
  try {
    const trustedList = (data.trusted && Array.isArray(data.trusted.list)) ? data.trusted.list : [];
    const resolvedLogos = trustedList
      .filter((c) => c && c.logo)
      .map((c) => resolveImageUrl(c.logo));
    resolveTrustedLogos(resolvedLogos.length ? resolvedLogos : null);
  } catch (err) {
    console.error("Failed to resolve trusted logos:", err);
    resolveTrustedLogos(null);
  }

  // Render website sections dynamically
  renderHero(data.hero || DEFAULT_CONFIG.hero);
  renderShowcase(data.showcase || DEFAULT_CONFIG.showcase);
  renderAbout(data.about || DEFAULT_CONFIG.about);
  renderServices(data.services || DEFAULT_CONFIG.services);
  renderProcess(data.process || DEFAULT_CONFIG.process);
  renderTestimonials(data.testimonials || DEFAULT_CONFIG.testimonials);
  renderIndustries(data.industries || DEFAULT_CONFIG.industries);
  renderFaq(data.faq || DEFAULT_CONFIG.faq);
  renderCta(data.cta || DEFAULT_CONFIG.cta);
  renderFooter(data.footer || DEFAULT_CONFIG.footer);

  // Re-run animation observers and custom logic after dynamic injection
  initializeInteractivity();
}

function renderHero(hero) {
  if (!hero) return;
  const taglineEl = document.querySelector("#hero .hero-tagline");
  const descEl = document.querySelector("#hero .hero-desc");
  const videoEl = document.querySelector("#hero video");
  const primaryBtn = document.querySelector("#hero .btn-primary");
  const secondaryBtn = document.querySelector("#hero .btn-secondary");
  const statsContainer = document.querySelector("#hero .hero-stats");

  if (taglineEl) taglineEl.innerHTML = hero.tagline;
  if (descEl) descEl.innerText = hero.desc;
  
  if (videoEl && hero.videoUrl) {
    const resolvedUrl = resolveVideoSrc(hero.videoUrl);
    const source = videoEl.querySelector("source");
    if (source && source.getAttribute("src") !== resolvedUrl) {
      source.setAttribute("src", resolvedUrl);
      videoEl.load();
    }
  }

  if (primaryBtn) {
    primaryBtn.innerHTML = `${hero.primaryBtnText || "Start Your Growth"} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    primaryBtn.setAttribute("href", hero.primaryBtnLink || "#contact");
  }

  if (secondaryBtn) {
    secondaryBtn.innerHTML = `${hero.secondaryBtnText || "View Projects"} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 3 20 12 6 21 6 3"/></svg>`;
    secondaryBtn.setAttribute("href", hero.secondaryBtnLink || "#showcase");
  }

  if (statsContainer && hero.stats) {
    statsContainer.innerHTML = hero.stats.map(stat => `
      <div class="stat-item">
        <div class="stat-num">${stat.num}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join("");
  }
}

function renderShowcase(showcase) {
  if (!showcase || !showcase.videos) return;
  const track = document.querySelector("#showcase .video-track");
  if (!track) return;

  // We multiply the videos to make a double track list for seamless infinite loop scroll!
  const list = [...showcase.videos, ...showcase.videos];

  track.innerHTML = list.map(v => `
    <div class="video-card ${v.landscape ? 'landscape' : ''}">
      <video autoplay muted loop playsinline preload="metadata">
        <source src="${resolveVideoSrc(v.src)}" type="video/mp4">
      </video>
      <span class="video-badge">${v.badge}</span>
      <div class="video-stats">
        <span class="video-stat">${v.stat1}</span>
        <span class="video-stat">${v.stat2}</span>
      </div>
    </div>
  `).join("");
}

function renderAbout(about) {
  if (!about) return;
  const badge = document.querySelector("#about .intro-badge");
  const title = document.querySelector("#about .intro-title");
  const text = document.querySelector("#about .intro-text");
  const statsContainer = document.querySelector("#about .intro-stats");
  const scrollContainer = document.querySelector("#about .phone-scroll");
  const featuresContainer = document.querySelector("#about .intro-features div[style*='margin-top']");

  if (badge) badge.innerText = about.badge || "Introduction";
  if (title) title.innerHTML = about.title;
  if (text) text.innerText = about.text;

  if (statsContainer && about.stats) {
    statsContainer.innerHTML = about.stats.map(stat => `
      <div class="intro-stat-item">
        <div class="intro-stat-num">${stat.num}</div>
        <div class="intro-stat-label">${stat.label}</div>
        <div class="intro-stat-line"></div>
      </div>
    `).join("");
  }

  if (scrollContainer && about.phoneVideos) {
    // Duplicate phone videos for seamless vertical loop scroll
    const items = [...about.phoneVideos, ...about.phoneVideos];
    scrollContainer.innerHTML = items.map(v => `
      <div class="phone-video">
        <video autoplay muted loop playsinline preload="metadata">
          <source src="${resolveVideoSrc(v.src)}" type="video/mp4">
        </video>
        <span class="phone-video-badge">${v.badge}</span>
      </div>
    `).join("");
  }

  if (featuresContainer && about.features) {
    featuresContainer.innerHTML = about.features.map((f, idx) => {
      const fallbackIcon = DEFAULT_CONFIG.about.features[idx]?.icon || DEFAULT_CONFIG.about.features[0]?.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
      const cleanIcon = validateIcon(f.icon, fallbackIcon);
      return `
        <div class="intro-feature">
          <div class="intro-feature-icon">
            ${cleanIcon}
          </div>
          <div>
            <div class="intro-feature-title">${f.title}</div>
            <div class="intro-feature-desc">${f.desc}</div>
          </div>
        </div>
      `;
    }).join("");
  }
}

function renderServices(services) {
  if (!services) return;
  const title = document.querySelector("#services .services-title");
  const subtitle = document.querySelector("#services .services-header p");
  const grid = document.querySelector("#services .services-grid");

  if (title) title.innerHTML = services.title || "Our Services";
  if (subtitle) subtitle.innerText = services.subtitle || "";

  if (grid && services.list) {
    const colCount = 3;
    const itemsPerCol = Math.ceil(services.list.length / colCount);
    let columnsHtml = "";
    for (let i = 0; i < colCount; i++) {
      const colItems = services.list.slice(i * itemsPerCol, (i + 1) * itemsPerCol);
      if (colItems.length === 0) continue;
      
      const colCardsHtml = colItems.map((s, idx) => {
        const globalIdx = i * itemsPerCol + idx;
        const fallbackIcon = DEFAULT_CONFIG.services.list[globalIdx]?.icon || DEFAULT_CONFIG.services.list[0]?.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>`;
        const cleanIcon = validateIcon(s.icon, fallbackIcon);
        const cardNum = String(globalIdx + 1).padStart(2, "0");
        return `
          <div class="service-card reveal">
            <span class="service-card-num">${cardNum}</span>
            <div class="service-icon">
              ${cleanIcon}
            </div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.desc}</p>
          </div>
        `;
      }).join("");

      columnsHtml += `<div class="service-parent">${colCardsHtml}</div>`;
    }
    grid.innerHTML = columnsHtml;
  }
}

function renderProcess(process) {
  if (!process) return;
  const title = document.querySelector("#process .process-title");
  const subtitle = document.querySelector("#process .process-subtitle");
  const timeline = document.querySelector("#process .process-timeline");

  if (title) title.innerHTML = process.title || "How We Work";
  if (subtitle) subtitle.innerText = process.subtitle || "";

  if (timeline && process.steps) {
    timeline.innerHTML = process.steps.map((step, idx) => `
      <div class="process-card reveal" data-step="${step.num}">
        <div class="process-card-text">
          <div class="process-card-num">${step.num}</div>
          <h3 class="process-card-title">${step.title}</h3>
          <p class="process-card-desc">${step.desc}</p>
        </div>
        <div class="process-card-visual">
          <video autoplay muted loop playsinline preload="metadata">
            <source src="${resolveVideoSrc(step.video)}" type="video/mp4">
          </video>
        </div>
      </div>
    `).join("");
  }
}

function renderTestimonials(testimonials) {
  if (!testimonials) return;
  const title = document.querySelector("#testimonials .testimonials-title");
  const leftColTrack = document.querySelector("#testimonials .scroll-col-left .scroll-track");
  const rightColTrack = document.querySelector("#testimonials .scroll-col-right .scroll-track");
  const reelsTrack = document.querySelector("#testi-reels-track");

  if (title) title.innerHTML = testimonials.title || "What Clients Say";

  if (testimonials.list) {
    // Generate star SVGs
    const makeStars = (rating) => {
      let starsHtml = "";
      for (let i = 0; i < 5; i++) {
        starsHtml += `<svg viewBox="0 0 24 24" class="${i < rating ? 'text-[#d4a843] fill-[#d4a843]' : 'text-gray-600'}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }
      return starsHtml;
    };

    const reviewsHtml = testimonials.list.map(t => `
      <div class="testi-card">
        <div class="testi-stars">
          ${makeStars(t.rating)}
        </div>
        <p class="testi-text">"${t.text}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${t.avatar}</div>
          <div>
            <div class="testi-name">${t.name}</div>
            <div class="testi-role">${t.role}</div>
          </div>
        </div>
      </div>
    `);

    // Split reviews or duplicate for columns
    if (leftColTrack) {
      leftColTrack.innerHTML = [...reviewsHtml, ...reviewsHtml].join("");
    }
    if (rightColTrack) {
      rightColTrack.innerHTML = [...reviewsHtml, ...reviewsHtml].reverse().join("");
    }
  }

  // Reels phone videos
  if (reelsTrack && testimonials.phoneReels) {
    reelsTrack.innerHTML = testimonials.phoneReels.map(reel => `
      <div class="testi-phone-slide">
        <video autoplay muted loop playsinline preload="metadata">
          <source src="${resolveVideoSrc(reel)}" type="video/mp4">
        </video>
      </div>
    `).join("");
  }
}

function renderIndustries(industries) {
  if (!industries) return;
  const title = document.querySelector("#industries .services-title") || document.querySelector("#industries h2");
  const grid = document.querySelector("#industries .industries-grid");

  if (title) title.innerHTML = industries.title || "Industries We Serve";

  if (grid && industries.list) {
    grid.innerHTML = industries.list.map((ind, idx) => {
      const fallbackIcon = DEFAULT_CONFIG.industries.list[idx]?.icon || DEFAULT_CONFIG.industries.list[0]?.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
      const cleanIcon = validateIcon(ind.icon, fallbackIcon);
      return `
        <div class="industry-card">
          <div class="industry-icon">
            ${cleanIcon}
          </div>
          <h3 class="industry-title">${ind.title}</h3>
          <p class="industry-desc">${ind.desc}</p>
        </div>
      `;
    }).join("");
  }
}

function renderFaq(faq) {
  if (!faq) return;
  const title = document.querySelector("#faq .faq-header h2") || document.querySelector("#faq h2");
  const container = document.querySelector("#faq .faq-inner");

  if (title) title.innerHTML = faq.title || "Frequently Asked Questions";

  if (container && faq.list) {
    const headerHtml = `
      <div class="faq-header reveal">
        <span class="intro-badge">FAQ</span>
        <h2 class="faq-title">${faq.title || "Frequently Asked Questions"}</h2>
      </div>
    `;

    const faqsHtml = faq.list.map((f, idx) => `
      <div class="faq-item">
        <div class="faq-question" onclick="toggleFaq(this)">
          <span class="faq-q-text">${f.q}</span>
          <div class="faq-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </div>
        <div class="faq-answer">
          <p class="faq-a-text">${f.a}</p>
        </div>
      </div>
    `).join("");

    container.innerHTML = headerHtml + faqsHtml;
  }
}

function renderCta(cta) {
  if (!cta) return;
  const badge = document.querySelector(".cta-section .intro-badge") || document.querySelector(".cta-section .cta-badge");
  const title = document.querySelector(".cta-section .cta-title");
  const desc = document.querySelector(".cta-section .cta-desc");
  const spotsContainer = document.querySelector(".cta-section .cta-spots") || document.querySelector(".cta-spots");
  const calendlyBtns = document.querySelectorAll("a[href*='calendly.com']");

  if (badge) badge.innerText = cta.badge || "Limited Availability";
  if (title) title.innerHTML = cta.title;
  if (desc) desc.innerText = cta.desc;
  
  if (spotsContainer) {
    spotsContainer.innerHTML = `<span class="cta-spots-dot"></span><span>${cta.spots}</span>`;
  }

  if (cta.calendlyUrl) {
    calendlyBtns.forEach(btn => {
      btn.setAttribute("href", cta.calendlyUrl);
    });
  }
}

function renderFooter(footer) {
  if (!footer) return;
  const desc = document.querySelector("footer .footer-desc");
  const founder = document.querySelector("footer .footer-desc strong");
  const email = document.querySelector("footer p.footer-desc:nth-of-type(2)") || document.querySelector("footer .footer-links + p");
  
  if (desc && !founder) desc.innerText = footer.desc;
  
  const brandFounderParagraph = document.querySelector("footer .footer-grid div:nth-child(4) p:nth-child(2)");
  if (brandFounderParagraph) {
    brandFounderParagraph.innerHTML = `Founded by <strong style="color:#f5f5f5">${footer.founder}</strong>`;
  }

  const brandEmailParagraph = document.querySelector("footer .footer-grid div:nth-child(4) p:nth-child(3)");
  if (brandEmailParagraph) {
    brandEmailParagraph.innerText = footer.email;
  }

  // Update social links
  const socialIcons = document.querySelectorAll("footer .footer-social-link");
  if (socialIcons.length >= 4) {
    if (footer.youtube) socialIcons[0].setAttribute("href", footer.youtube);
    if (footer.instagram) socialIcons[1].setAttribute("href", footer.instagram);
    if (footer.twitter) socialIcons[2].setAttribute("href", footer.twitter);
    if (footer.linkedin) socialIcons[3].setAttribute("href", footer.linkedin);
  }
}

function initializeInteractivity() {
  // Re-observe scroll animations
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

  const processObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('active');
      else entry.target.classList.remove('active');
    });
  }, { threshold: 0.4, rootMargin: '-100px 0px -100px 0px' });
  
  document.querySelectorAll('.process-card').forEach(function(card) {
    processObserver.observe(card);
  });

  // Re-initialize Testimonials Reels Slideshow
  const testiPhone = document.getElementById('testi-reels');
  if (testiPhone && window.initTestiReels) {
    // If it was already defined, we re-run it
    try {
      window.initTestiReels();
    } catch (e) {
      console.log("Error re-initializing testi reels:", e);
    }
  }
}

// Global toggle for FAQ answer Accordions
window.toggleFaq = function(el) {
  var item = el.parentElement;
  var isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(function(x) {
    x.classList.remove('active');
  });
  if (!isActive) {
    item.classList.add('active');
  }
};

// Start dynamic loading sequence immediately
document.addEventListener("DOMContentLoaded", () => {
  loadDynamicContent();
});
