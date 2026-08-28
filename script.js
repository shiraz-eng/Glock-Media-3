
/* ============================================================
   GLOCK MEDIA — Shared Header & Footer Injector
   ------------------------------------------------------------
   USAGE:
   1. In every page's <body>, add two empty placeholders where
      you want the header and footer to appear:

        <div id="site-header"></div>
        ... page content ...
        <div id="site-footer"></div>

   2. Include this script near the end of <body>:

        <script src="components.js"></script>

   The script injects the markup into those placeholders and
   wires up the dropdown / mobile-menu behavior automatically.
   ============================================================ */

(function () {
  const HEADER_HTML = `
<nav class="nav" id="navbar">
<div class="nav-inner">
<a href="/index.html" class="nav-logo">
<span class="nav-logo-text">GLOCK</span>
<span class="nav-logo-media">MEDIA</span>
</a>
<div class="nav-links">
<a href="/About-Us.html" class="nav-link">About</a>
<div class="nav-item" id="nav-services-item">
<button class="nav-link nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false"><a href="/Services/Services.html" class="nav-link">Services</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>
<div class="nav-dropdown" role="menu">
<a href="/Services/Script-Writing.html" role="menuitem">Scriptwriting</a>
<a href="/Services/Video-Editing.html" role="menuitem">Video Editing</a>
<a href="/Services/Growth-Strategy.html" role="menuitem">Growth Strategy</a>
<a href="/Services/Channel-Management.html" role="menuitem">Channel management</a>
</div>
</div>
<a href="/Portfolio.html" class="nav-link">Portfolio</a>
<a href="/Glock-Media-Blog/Blog-Page.html" class="nav-link">Blog</a>
<a href="/Contact-Us.html" class="nav-link">Contact</a>
<a href="https://calendly.com/hammadrazakhan-glockmedia/30min" class="nav-cta" target="_blank" rel="noopener">Book a Call</a>
</div>
<button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">
<span></span><span></span><span></span>
</button>
</div>
</nav>
<div class="menu-overlay" id="menu-overlay"></div>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
<button class="mobile-close" id="mobile-close" aria-label="Close menu">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
</button>
<nav class="mobile-nav">
<a href="/About-Us.html" class="mobile-link">About</a>
<div class="mobile-item" id="mobile-services-item">
<button class="mobile-dropdown-toggle" aria-expanded="false"><a href="/Services/Services.html" class="mobile-link mobile-item">Services</a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button>
<div class="mobile-submenu">
<a href="/Services/Script-Writing.html" class="mobile-sublink">Scriptwritting</a>
<a href="/Services/Video-Editing.html" class="mobile-sublink">Video Editing</a>
<a href="/Services/Growth-Strategy.html" class="mobile-sublink">Growth Strategy</a>
<a href="/Services/Channel-Management.html" class="mobile-sublink">Channel Management</a>
</div>
</div>
<a href="/Portfolio.html" class="mobile-link">Portfolio</a>
<a href="/Glock-Media-Blog/Blog-Page.html" class="mobile-link">Blog</a>
<a href="/Contact-Us.html" class="mobile-link">Contact</a>
<a href="https://calendly.com/hammadrazakhan-glockmedia/30min" class="mobile-cta" target="_blank" rel="noopener">Book a Call</a>
</nav>
</div>`;

  const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand-col">
        <div class="footer-brand">
          <span class="footer-brand-text">GLOCK</span>
          <span class="footer-brand-media">MEDIA</span>
        </div>
        <p class="footer-desc">A digital-first media production and content growth agency helping creators and brands build scalable media assets.</p>
        <div class="footer-social">
          <a href="#" class="footer-social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></a>
          <a href="#" class="footer-social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
          <a href="#" class="footer-social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
          <a href="#" class="footer-social-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
        </div>
      </div>
      <div>
        <h4 class="footer-title">Services</h4>
        <div class="footer-links">
          <a href="/Services/Script-Writing.html" class="footer-link">Scriptwriting</a>
          <a href="/Services/Video-Editing.html" class="footer-link">Video Editing</a>
          <a href="/Services/Growth-Strategy.html" class="footer-link">YouTube Growth</a>
          <a href="/Services/Channel-Management.html" class="footer-link">Channel Management</a>
        </div>
      </div>
      <div>
        <h4 class="footer-title">Company</h4>
        <div class="footer-links">
           <a href="/index.html" class="footer-link">Home</a>
          <a href="/About-Us.html" class="footer-link">About Us</a>
          <a href="/Services.html" class="footer-link">Services</a>
          <a href="/Portfolio.html" class="footer-link">Portfolio</a>
          <a href="/Blog-Page.html" class="footer-link">Blog</a>
          <a href="/Contact-Us.html" class="footer-link">Contact Us</a>
        </div>
      </div>
      <div>
        <h4 class="footer-title">Connect</h4>
        <p class="footer-desc" style="margin-bottom:8px">Founded by <strong style="color:#f5f5f5">Hammad Raza Khan</strong></p>
        <p class="footer-desc">contact@glockmedia.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">&copy; 2026 Glock Media. All rights reserved.</p>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
         <a href="#">Term of Services</a>
        <a href="#">Created by Devzenith</a>
      </div>
    </div>
  </div>
</footer>`;

  function injectPartials() {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');

    if (headerEl) {
      headerEl.innerHTML = HEADER_HTML;
    } else {
      console.warn('[components.js] No #site-header element found on this page.');
    }

    if (footerEl) {
      footerEl.innerHTML = FOOTER_HTML;
    } else {
      console.warn('[components.js] No #site-footer element found on this page.');
    }
  }

  function initDesktopDropdown() {
    const item = document.getElementById('nav-services-item');
    if (!item) return;

    const btn = item.querySelector('.nav-dropdown-toggle');
    let closeTimer;

    function openMenu() {
      clearTimeout(closeTimer);
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeMenu, 180);
    }

    // Hover-intent open/close (desktop)
    item.addEventListener('mouseenter', openMenu);
    item.addEventListener('mouseleave', scheduleClose);
    btn.addEventListener('focus', openMenu);

    // Click toggle (also works on touch)
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.closest('a')) return; // let the inner "Services" link navigate
      e.preventDefault();
      item.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) closeMenu();
    });

    // Close after picking a dropdown link
    item.querySelectorAll('.nav-dropdown a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  function initMobileDropdown() {
    const mItem = document.getElementById('mobile-services-item');
    if (!mItem) return;

    const mBtn = mItem.querySelector('.mobile-dropdown-toggle');
    mBtn.addEventListener('click', function (e) {
      if (e.target.closest('a')) return; // let the inner "Services" link navigate
      e.preventDefault();
      const isOpen = mItem.classList.toggle('open');
      mBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileClose = document.getElementById('mobile-close');
    if (!hamburger || !mobileMenu || !menuOverlay) return;

    function openMenu() {
      hamburger.classList.add('active');
      mobileMenu.classList.add('open');
      menuOverlay.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      menuOverlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu on link click, then smooth-scroll to in-page anchors
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
        const href = this.getAttribute('href');
        if (href && href.indexOf('#') === 0) {
          const target = document.querySelector(href);
          if (target) {
            setTimeout(function () {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
          }
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  function initNavScrollStyle() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(10,10,10,0.95)';
        navbar.style.backdropFilter = 'blur(30px)';
      } else {
        navbar.style.background = 'rgba(10,10,10,0.85)';
        navbar.style.backdropFilter = 'blur(20px)';
      }
    });
  }

  function initNavInteractions() {
    initDesktopDropdown();
    initMobileDropdown();
    initMobileMenu();
    initNavScrollStyle();
  }

  // Appends admin-created "Service Subcategories" (Admin Panel -> Services
  // Overview -> Service Subcategories) to the Services dropdown on every
  // page. Works whether the dropdown came from HEADER_HTML above or was
  // already static in the page's own markup (index.html), since it just
  // looks for `.nav-dropdown` / `.mobile-submenu` in the live DOM.
  function injectCustomServiceLinks() {
    const dropdown = document.querySelector('.nav-dropdown');
    const mobileSub = document.querySelector('.mobile-submenu');
    if (!dropdown && !mobileSub) return;

    import('/Admin-Panel/cms-api.js')
      .then(function (cms) { return cms.listCustomServiceLinks(); })
      .then(function (list) {
        if (!list || !list.length) return;
        list.forEach(function (svc) {
          if (!svc || !svc.slug || !svc.name) return;
          const href = '/Services/Service.html?slug=' + encodeURIComponent(svc.slug);

          if (dropdown && !dropdown.querySelector('a[href="' + href + '"]')) {
            const a = document.createElement('a');
            a.setAttribute('role', 'menuitem');
            a.href = href;
            a.textContent = svc.name;
            a.addEventListener('click', function () {
              const item = document.getElementById('nav-services-item');
              if (item) item.classList.remove('open');
            });
            dropdown.appendChild(a);
          }

          if (mobileSub && !mobileSub.querySelector('a[href="' + href + '"]')) {
            const ma = document.createElement('a');
            ma.className = 'mobile-sublink';
            ma.href = href;
            ma.textContent = svc.name;
            mobileSub.appendChild(ma);
          }
        });
      })
      .catch(function (err) { console.warn('[script.js] custom services nav sync failed:', err); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectPartials();
    initNavInteractions();
    injectCustomServiceLinks();
  });
})();