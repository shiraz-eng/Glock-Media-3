/* Glock Media — shared chrome (nav + footer) rendered from data.js */
(function () {
  'use strict';
  var G = window.GLOCK;
  if (!G || !G.site) return;
  var site = G.site;

  var active = document.body.getAttribute('data-page') || '';

  /* ---------- NAV ---------- */
  var navHost = document.getElementById('glock-nav');
  if (navHost) {
    var links = site.nav.map(function (l) {
      var key = l.href.replace(/\//g, '') || 'home';
      return '<a href="' + l.href + '" class="nav-link' + (active === key ? ' active' : '') + '">' + l.label + '</a>';
    }).join('');
    var mLinks = site.nav.map(function (l) {
      var key = l.href.replace(/\//g, '') || 'home';
      return '<a href="' + l.href + '" class="mobile-link' + (active === key ? ' active' : '') + '">' + l.label + '</a>';
    }).join('');
    navHost.innerHTML =
      '<nav class="nav" id="navbar">' +
        '<div class="nav-inner">' +
          '<a href="/" class="nav-logo">' +
            '<span class="nav-logo-text">GLOCK</span>' +
            '<span class="nav-logo-media">MEDIA</span>' +
          '</a>' +
          '<div class="nav-links">' + links +
            '<a href="' + site.cta.href + '" class="nav-cta">' + site.cta.label + '</a>' +
          '</div>' +
          '<button class="nav-burger" id="navBurger" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</nav>' +
      '<div class="mobile-menu" id="mobileMenu">' + mLinks +
        '<a href="' + site.cta.href + '" class="mobile-cta">' + site.cta.label + '</a>' +
      '</div>';
  }

  /* ---------- FOOTER ---------- */
  var footHost = document.getElementById('glock-footer');
  if (footHost) {
    var cols = site.footerColumns.map(function (c) {
      var links = c.links.map(function (l) { return '<li><a href="' + l.href + '">' + l.label + '</a></li>'; }).join('');
      return '<div><div class="footer-column-title">' + c.title + '</div><ul class="footer-links">' + links + '</ul></div>';
    }).join('');
    var socials = site.socials.map(function (s) {
      return '<a href="' + s.href + '" class="footer-social" aria-label="' + s.label + '"><i data-lucide="' + s.icon + '" style="width:16px;height:16px;"></i></a>';
    }).join('');
    footHost.innerHTML =
      '<footer class="footer">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="footer-brand">' + site.brand + '</div>' +
            '<p class="footer-desc">' + site.tagline + '</p>' +
          '</div>' +
          cols +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span class="footer-copyright">' + site.copyright + '</span>' +
          '<div class="footer-socials">' + socials + '</div>' +
        '</div>' +
      '</footer>';
  }
})();
