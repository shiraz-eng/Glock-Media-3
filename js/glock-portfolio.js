/* Glock Media — portfolio engine (driven by GLOCK in data.js)
   Sections: showreel marquee → trusted-by → tabs + single-select niche chips
   (deep-linkable via ?tab=&niche=) → work wall → modal player / variants
   lightbox → testimonials carousel.
   NOTE: "CaseStudy" tab is treated exactly like "thumbnail" (image + variants
   lightbox, "designs" count, etc.). */
(function () {
  'use strict';
  var G = window.GLOCK;
  if (!G || !G.portfolio) return;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Types that render as image cards (thumbnail-style)
  function isImageType(type) { return type === 'thumbnail' || type === 'CaseStudy'; }
  // Scriptwriting renders as a document card (opens Google Doc/Drive preview on click)
  function isDocType(type) { return type === 'scriptwriting'; }

  var PLAY_SVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.8.4c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.5 9.1.5 11v1.8c0 1.9.5 3.8.5 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 7.5.4 7.5.4s4.6 0 7.8-.4c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.5-1.9.5-3.8V11c0-1.9-.5-3.8-.5-3.8z" fill="currentColor"/><path d="M9.8 15.1V8.5l6.2 3.3-6.2 3.3z" fill="#0a0a0a"/></svg>';
  var PLAY_SVG_SM = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5z"/></svg>';
  var DOC_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>';

  /* ---------- Video URL detection (YouTube / Google Drive / direct file) ---------- */
  function parseVideo(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return {
      kind: 'youtube',
      embed: 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0&modestbranding=1',
      watch: 'https://www.youtube.com/watch?v=' + m[1],
      watchLabel: 'Watch on YouTube'
    };
    var g = String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (g) return {
      kind: 'gdrive',
      embed: 'https://drive.google.com/file/d/' + g[1] + '/preview',
      watch: url,
      watchLabel: 'Open in Google Drive'
    };
    if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url) || url.indexOf('assets/') === 0 || url.charAt(0) === '/') {
      return { kind: 'file', src: url };
    }
    return null;
  }

  /* ---------- Document URL detection (Google Docs / Google Drive / PDF) ---------- */
  function parseDoc(url) {
    if (!url) return null;
    var d = String(url).match(/docs\.google\.com\/document\/d\/([\w-]+)/);
    if (d) return {
      kind: 'gdoc',
      embed: 'https://docs.google.com/document/d/' + d[1] + '/preview',
      watch: 'https://docs.google.com/document/d/' + d[1] + '/edit?usp=sharing',
      watchLabel: 'Open in Google Docs' ,
      images:'https://docs.google.com/document/d/' + d[1] + '/edit?usp=sharing',
    };
    var g = String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (g) return {
      kind: 'gdrive',
      embed: 'https://drive.google.com/file/d/' + g[1] + '/preview',
      watch: url,
      watchLabel: 'Open in Google Drive'
    };
    if (/\.pdf(\?|#|$)/i.test(url)) return { kind: 'pdf', embed: url, watch: url, watchLabel: 'Open File' };
    return null;
  }

  /* ============================================================
     1) SHOWREEL MARQUEE
     ============================================================ */
  var marqueeHost = document.getElementById('pfMarquee');
  if (marqueeHost && G.marquee && G.marquee.length) {
    function mqTile(t, i) {
      var clipSrc = resolveClip(t.clip);
      return '<div class="pf-mq-tile ' + (t.orientation === 'v' ? 'v' : 'h') + '" data-mq="' + i + '" role="button" tabindex="0" aria-label="Play showreel clip">' +
        '<video src="' + esc(clipSrc) + '" poster="' + esc(clipSrc.replace(/\.mp4$/, '.jpg')) + '" autoplay muted loop playsinline preload="metadata"></video>' +
        '<div class="pf-mq-shade"></div>' +
        (t.platform ? '<span class="pf-mq-badge">' + esc(t.platform) + '</span>' : '') +
        (t.stats && t.stats.length ? '<div class="pf-mq-stats">' + t.stats.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' : '') +
        '<span class="pf-mq-play">' + PLAY_SVG_SM + '</span>' +
      '</div>';
    }
    var half = G.marquee.map(mqTile).join('');
    marqueeHost.innerHTML = '<div class="pf-mq-track">' + half + half + '</div>';
    marqueeHost.querySelectorAll('video').forEach(function (v) {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  /* ============================================================
     2) TRUSTED BY
     ============================================================ */
  var clientsHost = document.getElementById('pfClientsTrack');
  if (clientsHost && G.clients && G.clients.length) {
    var clHalf = G.clients.map(function (c) {
      return '<span class="pf-client" title="' + esc(c.name) + '"><img src="' + esc(resolveImage(c.logo)) + '" alt="' + esc(c.name) + '" loading="lazy"></span>';
    }).join('');
    clientsHost.innerHTML = clHalf + clHalf;
  }

  /* ============================================================
     3) TABS + SINGLE-SELECT CHIPS + DEEP LINKS
     ============================================================ */
  var items = G.portfolio;
  var TYPES = [
    { id: 'longform',  label: 'Long-Form Videos',  heading: 'Long-Form <span class="gradient-text">Examples</span>',  sub: 'Documentaries, flagships and story-driven content — click any to watch.' },
    { id: 'shortform', label: 'Short-Form Videos', heading: 'Short-Form <span class="gradient-text">Examples</span>', sub: 'Shorts, Reels and TikToks engineered for loops and follows.' },
    { id: 'scriptwriting', label: 'Scriptwriting', heading: 'Scriptwriting <span class="gradient-text">Samples</span>', sub: 'Documentary, Shorts and campaign scripts — click any to read.' },
    { id: 'thumbnail', label: 'Thumbnails',        heading: 'Thumbnail <span class="gradient-text">Examples</span>',  sub: 'Key art systems A/B tested against live CTR data.' },
    { id: 'CaseStudy', label: 'Case Study',        heading: 'Case <span class="gradient-text">Studies</span>',        sub: 'In-depth breakdowns of client projects — click any to view.' }
  ];
  // Admin-defined custom categories (added via the "Portfolio Categories"
  // manager) get appended as their own real tab, with a sensible default
  // heading/subtitle built from the label if none was configured.
  if (Array.isArray(G.customTypes)) {
    G.customTypes.forEach(function (c) {
      if (!c || !c.id || TYPES.some(function (t) { return t.id === c.id; })) return;
      var label = c.label || c.id;
      TYPES.push({
        id: c.id,
        label: label,
        heading: c.heading || (label + ' <span class="gradient-text">Examples</span>'),
        sub: c.sub || ('Work from the ' + label + ' category — click any to view.')
      });
    });
  }

  var currentType = 'longform';
  var activeChip = {};

  var tabBar  = document.getElementById('pfTabs');
  var heading = document.getElementById('pfHeading');
  var subEl   = document.getElementById('pfSub');
  var chipsEl = document.getElementById('pfChips');
  var gridEl  = document.getElementById('pfGrid');
  var countEl = document.getElementById('pfCount');

  /* ---------- Case Study CTA block (shown only above the grid when the
     "CaseStudy" tab is active) ---------- */
  var CASE_STUDY_CTA_ID = 'pfCaseStudyCTA';
  var CASE_STUDY_CTA_HTML =
    '<section class="cta-section" id="' + CASE_STUDY_CTA_ID + '" style="padding: 12px;">' +
      '<div class="section-inner">' +
        '<div class="reveal visible">' +
          '<h2 class="section-title" style="font-size: 4rem;"><span class="gradient-text">Featured</span> Case Studies</h2>' +
          '<h2> Real <span class="gradient-text"> Channels. </span> Real <span class="gradient-text"> Growth. </span> Real<span class="gradient-text"> Proof. </span></h2>' +
          '<br>' +
          '<p class="section-desc">Every project in our content agency case studies section tells the same story: strategy meets execution, and execution compounds.</p>' +
        '</div>' +
      '</div>' +
    '</section>';

  function renderCaseStudyCTA() {
    if (!gridEl || !gridEl.parentNode) return;
    var existing = document.getElementById(CASE_STUDY_CTA_ID);
    if (currentType === 'CaseStudy') {
      if (!existing) {
        gridEl.insertAdjacentHTML('beforebegin', CASE_STUDY_CTA_HTML);
      }
    } else if (existing) {
      existing.remove();
    }
  }

function resolveImage(url, size) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("drive.google.com")) return url;

  size = size || "w1600";

  let fileId = null;

  // /file/d/FILE_ID/...
  let m = url.match(/\/file\/d\/([^/]+)/);
  if (m) fileId = m[1];

  // ?id=FILE_ID  (open?id=, uc?id=, thumbnail?id=)
  if (!fileId) {
    m = url.match(/[?&]id=([^&]+)/);
    if (m) fileId = m[1];
  }

  if (!fileId) return url; // unrecognized Drive URL shape, leave as-is

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
}

// Resolves a background/looping <video> clip src: accepts a direct file
// URL, a Google Drive share link, a Dropbox share link, or a local repo
// file path (e.g. /assets/clips/reel-1.mp4). YouTube links can't power an
// autoplaying background clip (no direct file URL) — those are only
// supported by the click-to-play parseVideo() flow above.
function resolveClip(url) {
  if (!url || typeof url !== 'string') return url;
  var g = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
  if (g && url.indexOf('drive.google.com') !== -1) {
    return 'https://drive.google.com/uc?export=download&id=' + g[1];
  }
  if (url.indexOf('dropbox.com') !== -1) {
    if (/[?&]raw=1/.test(url)) return url;
    if (/[?&]dl=1/.test(url)) return url.replace('dl=1', 'raw=1');
    if (/[?&]dl=0/.test(url)) return url.replace('dl=0', 'raw=1');
    return url + (url.indexOf('?') !== -1 ? '&raw=1' : '?raw=1');
  }
  return url; // direct file URL or local repo path — already usable as-is
}


  function chipsFor(type) {
    var seen = [];
    items.forEach(function (p) {
      if (p.type === type && seen.indexOf(p.niche) === -1) seen.push(p.niche);
    });
    return seen;
  }

  function syncURL() {
    try {
      var q = '?tab=' + currentType;
      var n = activeChip[currentType];
      if (n) q += '&niche=' + encodeURIComponent(n);
      history.replaceState(null, '', q);
    } catch (e) {}
  }

  function imageList(p) {
    var list;
    if (p.slides && p.slides.length) list = p.slides;
    else if (p.variants && p.variants.length) list = p.variants;
    else if (p.cover) list = [p.cover];
    else if (p.image) list = [p.image];
    else list = [];
    return list.map(function (u) { return resolveImage(u); });
  }

  function cardHTML(p, i) {
    var isShort = p.type === 'shortform';
    var isThumb = isImageType(p.type);
    var isCase = p.type === 'CaseStudy';
    var isDoc = isDocType(p.type);
    var list = imageList(p);
    var thumbImg = list[0] || '';
    var countLbl = isCase ? 'Slides' : 'Variants';
    var ariaVerb = isThumb ? 'View' : (isDoc ? 'Read' : 'Play');
    return '<article class="pf-item' + (isShort ? ' is-short' : '') + (isDoc ? ' is-doc' : '') + '" data-id="' + p.id + '" tabindex="0" role="button" aria-label="' + ariaVerb + ': ' + esc(p.title) + '" style="animation-delay:' + (i * 0.06) + 's">' +
      '<div class="pf-item-media">' +
        '<img src="' + thumbImg + '" alt="' + esc(p.title) + '" loading="lazy">' +
        '<div class="pf-item-shade"></div>' +
        (isThumb
          ? ((list.length > 1 ? '<span class="pf-item-variants"><i data-lucide="layers" style="width:11px;height:11px;"></i>' + list.length + ' ' + countLbl + '</span>' : '') +
             (p.ctr ? '<span class="pf-item-ctr">' + p.ctr + ' CTR</span>' : '') +
             '<span class="pf-item-eye"><i data-lucide="eye" style="width:20px;height:20px;"></i></span>')
          : (isDoc
              ? '<span class="pf-item-play pf-item-doc-btn">' + DOC_SVG + '</span>'
              : '<span class="pf-item-play">' + PLAY_SVG + '</span>')) +
        (isShort || isThumb || isDoc || !p.duration ? '' : '<span class="pf-item-dur"><i data-lucide="clock" style="width:11px;height:11px;"></i>' + p.duration + '</span>') +
        (isDoc && p.pages ? '<span class="pf-item-dur"><i data-lucide="file-text" style="width:11px;height:11px;"></i>' + p.pages + ' pages</span>' : '') +
      '</div>' +
      '<div class="pf-item-info">' +
        '<div class="pf-item-row"><span class="pf-item-niche">' + p.niche + '</span><span class="pf-item-views">' + (isThumb ? (p.client || '') : (isDoc ? (p.client || 'Script') : (p.views + ' views'))) + '</span></div>' +
        '<h3 class="pf-item-title">' + p.title + '</h3>' +
      '</div>' +
    '</article>';
  }

  function renderGrid() {
    if (!gridEl) return;
    var pool = items.filter(function (p) { return p.type === currentType; });
    var sel = activeChip[currentType];
    if (sel) pool = pool.filter(function (p) { return p.niche === sel; });
    gridEl.classList.toggle('pf-grid-shorts', currentType === 'shortform');
    gridEl.classList.toggle('pf-grid-docs', currentType === 'scriptwriting');
    if (!pool.length) {
      gridEl.innerHTML = '<div class="pf-empty">No work in this category yet — check back soon.</div>';
    } else {
      gridEl.innerHTML = pool.map(cardHTML).join('');
    }
    if (countEl) countEl.textContent = pool.length + (isImageType(currentType) ? ' designs' : (currentType === 'scriptwriting' ? ' scripts' : ' videos'));
    if (window.lucide) lucide.createIcons();
  }

  function renderChips() {
    if (!chipsEl) return;
    var chips = chipsFor(currentType);
    var sel = activeChip[currentType] || null;
    var html = '<button class="pf-chip' + (!sel ? ' active' : '') + '" data-niche="">All</button>';
    html += chips.map(function (c) {
      return '<button class="pf-chip' + (sel === c ? ' active' : '') + '" data-niche="' + esc(c) + '">' + c + '</button>';
    }).join('');
    chipsEl.innerHTML = html;
    chipsEl.querySelectorAll('.pf-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var n = chip.dataset.niche || null;
        activeChip[currentType] = (activeChip[currentType] === n) ? null : n;
        renderChips();
        renderGrid();
        syncURL();
      });
    });
  }

  function renderPanel() {
    var t = TYPES.find(function (x) { return x.id === currentType; });
    var isCaseStudy = currentType === 'CaseStudy';
    if (heading) {
      heading.innerHTML = t.heading;
      heading.style.display = isCaseStudy ? 'none' : '';
    }
    if (subEl) {
      subEl.textContent = t.sub;
      subEl.style.display = isCaseStudy ? 'none' : '';
    }
    renderCaseStudyCTA();
    renderChips();
    renderGrid();
  }

  if (tabBar) {
    tabBar.innerHTML = TYPES.map(function (t) {
      return '<button class="pf-tab" data-type="' + t.id + '">' + t.label + '</button>';
    }).join('');
    tabBar.querySelectorAll('.pf-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentType = btn.dataset.type;
        tabBar.querySelectorAll('.pf-tab').forEach(function (b) { b.classList.toggle('active', b === btn); });
        renderPanel();
        syncURL();
      });
    });
  }

  (function applyDeepLink() {
    try {
      var q = new URLSearchParams(location.search);
      var tab = q.get('tab');
      if (tab && TYPES.some(function (t) { return t.id === tab; })) currentType = tab;
      var niche = q.get('niche');
      if (niche && chipsFor(currentType).indexOf(niche) !== -1) activeChip[currentType] = niche;
    } catch (e) {}
    if (tabBar) {
      tabBar.querySelectorAll('.pf-tab').forEach(function (b) {
        b.classList.toggle('active', b.dataset.type === currentType);
      });
    }
  })();

  renderPanel();

  /* ============================================================
     4) MODAL
     ============================================================ */
  var modal = document.getElementById('pfModal');
  var modalBox = document.getElementById('pfModalBox');
  var varState = null;

  function statsChips(p) {
    var chips = [];
    if (p.views) chips.push(p.views + ' views');
    if (p.duration) chips.push(p.duration);
    if (p.client) chips.push(p.client);
    return chips.length ? '<div class="pf-modal-stats">' + chips.map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' : '';
  }

  function openVideoModal(p, source) {
    var v = source || parseVideo(p.video);
    if (!v) return;
    var vertical = p.type === 'shortform' || p.orientation === 'v';
    modalBox.className = 'pf-modal-box ' + (vertical ? 'is-vertical' : 'is-wide');
    var frame;
    if (v.kind === 'file') {
      frame = '<video src="' + esc(v.src) + '" controls autoplay playsinline></video>';
    } else {
      frame = '<iframe src="' + esc(v.embed) + '" title="' + esc(p.title || 'Video') + '" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    }
    modalBox.innerHTML =
      '<div class="pf-modal-frame">' + frame + '</div>' +
      '<div class="pf-modal-caption">' +
        (p.niche ? '<span class="pf-item-niche">' + esc(p.niche) + (p.client ? ' &middot; ' + esc(p.client) : '') + '</span>' : '') +
        (p.title ? '<h3>' + esc(p.title) + '</h3>' : '') +
        (p.type ? statsChips(p) : '') +
        (v.watch ? '<a class="pf-watch-yt" href="' + esc(v.watch) + '" target="_blank" rel="noopener">' + esc(v.watchLabel) + ' <i data-lucide="external-link" style="width:14px;height:14px;"></i></a>' : '') +
      '</div>';
    showModal();
  }

  function thumbList(p) {
    var list = imageList(p);
    return list.length ? list : [''];
  }

  function renderVariant() {
    if (!varState) return;
    var img = modalBox.querySelector('.pf-modal-img');
    var count = modalBox.querySelector('.pf-var-count');
    var dots = modalBox.querySelectorAll('.pf-var-dots button');
    if (img) img.src = varState.list[varState.i];
    if (count) count.textContent = (varState.i + 1) + ' / ' + varState.list.length;
    dots.forEach(function (d, ix) { d.classList.toggle('on', ix === varState.i); });
  }

  function stepVariant(d) {
    if (!varState) return;
    varState.i = (varState.i + d + varState.list.length) % varState.list.length;
    renderVariant();
  }

  function openDocModal(p) {
    var v = parseDoc(p.doc);
    if (!v) return;
    modalBox.className = 'pf-modal-box is-doc';
    var frame = '<iframe src="' + esc(v.embed) + '" title="' + esc(p.title || 'Script') + '" frameborder="0" allow="autoplay"></iframe>';
    modalBox.innerHTML =
      '<div class="pf-modal-frame">' + frame + '</div>' +
      '<div class="pf-modal-caption">' +
        (p.niche ? '<span class="pf-item-niche">' + esc(p.niche) + (p.client ? ' &middot; ' + esc(p.client) : '') + '</span>' : '') +
        (p.title ? '<h3>' + esc(p.title) + '</h3>' : '') +
        (p.description ? '<p>' + esc(p.description) + '</p>' : '') +
        (p.pages ? '<div class="pf-modal-stats"><span>' + esc(String(p.pages)) + ' pages</span></div>' : '') +
        (v.watch ? '<a class="pf-watch-yt" href="' + esc(v.watch) + '" target="_blank" rel="noopener">' + esc(v.watchLabel) + ' <i data-lucide="external-link" style="width:14px;height:14px;"></i></a>' : '') +
      '</div>';
    showModal();
  }

  function openThumbModal(p) {
    var list = thumbList(p);
    varState = list.length > 1 ? { list: list, i: 0 } : null;
    modalBox.className = 'pf-modal-box is-image';
    modalBox.innerHTML =
      '<div class="pf-modal-img-wrap">' +
        '<img class="pf-modal-img" src="' + list[0] + '" alt="' + esc(p.title) + '">' +
        (varState
          ? '<button class="pf-var-arrow prev" aria-label="Previous variant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
            '<button class="pf-var-arrow next" aria-label="Next variant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
            '<span class="pf-var-count">1 / ' + list.length + '</span>' +
            '<div class="pf-var-dots">' + list.map(function (_, ix) {
              return '<button data-ix="' + ix + '"' + (ix === 0 ? ' class="on"' : '') + ' aria-label="Variant ' + (ix + 1) + '"></button>';
            }).join('') + '</div>'
          : '') +
      '</div>' +
      '<div class="pf-modal-caption">' +
        '<span class="pf-item-niche">' + esc(p.niche) + (p.client ? ' &middot; ' + esc(p.client) : '') + '</span>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.description || '') + '</p>' +
        (p.stats && p.stats.length ? '<div class="pf-modal-stats">' + p.stats.map(function(s){return '<span>' + esc(s) + '</span>';}).join('') + '</div>' : '') +
        (p.ctr ? '<span class="pf-modal-ctr">' + esc(p.ctr) + ' CTR' + (varState ? ' — winning variant' : '') + '</span>' : '') +
      '</div>';
    if (varState) {
      modalBox.querySelector('.pf-var-arrow.prev').addEventListener('click', function (e) { e.stopPropagation(); stepVariant(-1); });
      modalBox.querySelector('.pf-var-arrow.next').addEventListener('click', function (e) { e.stopPropagation(); stepVariant(1); });
      modalBox.querySelectorAll('.pf-var-dots button').forEach(function (d) {
        d.addEventListener('click', function (e) {
          e.stopPropagation();
          varState.i = parseInt(d.dataset.ix, 10);
          renderVariant();
        });
      });
      var wrap = modalBox.querySelector('.pf-modal-img-wrap');
      var sx = null;
      wrap.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      wrap.addEventListener('touchend', function (e) {
        if (sx === null) return;
        var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) stepVariant(dx < 0 ? 1 : -1);
        sx = null;
      }, { passive: true });
    }
    showModal();
  }

  function openShotModal(t) {
    varState = null;
    modalBox.className = 'pf-modal-box is-image';
    modalBox.innerHTML =
      '<div class="pf-modal-img-wrap"><img class="pf-modal-img" src="' + esc(resolveImage(t.shot)) + '" alt="Client review"></div>' +
      '<div class="pf-modal-caption">' +
        '<span class="pf-testi-stars">' + '★'.repeat(t.rating || 5) + '</span>' +
        '<h3>' + esc(t.project) + '</h3>' +
        '<p>' + esc(t.client) + '</p>' +
      '</div>';
    showModal();
  }

  function showModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (modalBox) modalBox.innerHTML = '';
    varState = null;
  }

  /* ---------- Global click / key routing ---------- */
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.pf-item[data-id]');
    if (card) {
      var p = items.find(function (x) { return x.id === card.dataset.id; });
      if (p) {
        if (isImageType(p.type)) openThumbModal(p);
        else if (isDocType(p.type)) openDocModal(p);
        else openVideoModal(p);
      }
      return;
    }
    var mq = e.target.closest('.pf-mq-tile[data-mq]');
    if (mq && G.marquee) {
      var t = G.marquee[parseInt(mq.dataset.mq, 10)];
      if (t) {
        var src = t.link ? parseVideo(t.link) : { kind: 'file', src: t.clip };
        openVideoModal({ title: (t.platform || 'Showreel') + ' — Glock Media', orientation: t.orientation }, src);
      }
      return;
    }
    var tc = e.target.closest('.pf-testi-card[data-t]');
    if (tc && G.testimonials) {
      var tm = G.testimonials[parseInt(tc.dataset.t, 10)];
      if (tm) openShotModal(tm);
      return;
    }
    if (e.target.closest('.pf-modal-close') || e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) {
      if (e.key === 'Enter' && document.activeElement && document.activeElement.dataset) {
        var d = document.activeElement.dataset;
        if (d.id) {
          var p = items.find(function (x) { return x.id === d.id; });
          if (p) {
            if (isImageType(p.type)) openThumbModal(p);
            else if (isDocType(p.type)) openDocModal(p);
            else openVideoModal(p);
          }
        }
      }
      return;
    }
    if (e.key === 'Escape') closeModal();
    if (varState) {
      if (e.key === 'ArrowLeft') stepVariant(-1);
      if (e.key === 'ArrowRight') stepVariant(1);
    }
  });

  /* ============================================================
     5) TESTIMONIALS
     ============================================================ */
  var testiHost = document.getElementById('pfTestiTrack');
  if (testiHost && G.testimonials && G.testimonials.length) {
    var tHalf = G.testimonials.map(function (t, i) {
      return '<figure class="pf-testi-card" data-t="' + i + '" role="button" tabindex="0" aria-label="View review: ' + esc(t.project) + '">' +
        '<img class="pf-testi-shot" src="' + esc(resolveImage(t.shot)) + '" alt="Review from ' + esc(t.client) + '" loading="lazy">' +
        '<figcaption class="pf-testi-meta">' +
          '<span class="pf-testi-stars">' + '★'.repeat(t.rating || 5) + '</span>' +
          '<span class="pf-testi-who"><strong>' + esc(t.client) + '</strong> · ' + esc(t.project) + '</span>' +
        '</figcaption>' +
      '</figure>';
    }).join('');
    testiHost.innerHTML = tHalf + tHalf;
  }
})();
