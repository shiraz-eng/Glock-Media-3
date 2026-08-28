(function() {
  'use strict';

  // Icons
  function initIcons() {
    if (window.lucide) lucide.createIcons();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIcons);
  } else {
    initIcons();
  }

  // Mobile menu
  var burger = document.getElementById('navBurger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Nav scroll + Parallax
  var nav = document.getElementById('navbar');
  var heroGrid = document.querySelector('.hero-grid');
  var ticking = false;

  function onScrollFrame() {
    var scrolled = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', scrolled > 50);
    if (heroGrid) heroGrid.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';

    document.querySelectorAll('.parallax-slow').forEach(function(el) {
      if (el !== heroGrid) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
        }
      }
    });
    document.querySelectorAll('.parallax-medium').forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var offset = (rect.top - window.innerHeight / 2) * -0.08;
        el.style.transform = 'translateY(' + offset + 'px)';
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(onScrollFrame);
      ticking = true;
    }
  }, { passive: true });

  // Scroll Reveal Observer
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .flip-3d, .flip-3d-left, .fold-reveal, .cascade-3d').forEach(function(el) {
    revealObserver.observe(el);
  });

  // Counter animation — data-count="50" data-suffix="B+"
  var counters = document.querySelectorAll('[data-count]');
  var countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var decimals = (el.dataset.count.split('.')[1] || '').length;
        var current = 0;
        var increment = target / 60;
        var timer = setInterval(function() {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = (decimals ? current.toFixed(decimals) : Math.floor(current)) + suffix;
        }, 25);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(function(c) { countObserver.observe(c); });

  // Text scramble effect
  var scrambleChars = '!<>-_\\/[]{}=+*^?#____';
  function scramble(el) {
    var original = el.dataset.text || el.textContent;
    el.dataset.text = original;
    var frame = 0;
    var totalFrames = Math.max(20, original.length * 2);
    var interval = setInterval(function() {
      var out = '';
      var revealCount = Math.floor((frame / totalFrames) * original.length);
      for (var i = 0; i < original.length; i++) {
        if (original[i] === ' ') { out += ' '; continue; }
        if (i < revealCount) out += original[i];
        else out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
      el.textContent = out;
      frame++;
      if (frame > totalFrames) {
        el.textContent = original;
        clearInterval(interval);
      }
    }, 30);
  }
  var scrambleObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        scramble(entry.target);
        scrambleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.scramble-text').forEach(function(el) {
    scrambleObserver.observe(el);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item) {
    var q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', function() {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // 3D tilt on hover (desktop only)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.tilt').forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 24;
        var rotateY = (centerX - x) / 24;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(12px)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
      });
    });
  }
})();

// Contact form — demo submit with success state
(function() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('.form-submit');
    var success = document.getElementById('formSuccess');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(function() {
      form.reset();
      btn.innerHTML = 'Send Message &#8594;';
      btn.disabled = false;
      if (success) success.classList.add('show');
    }, 900);
  });
})();

(function(){
  // Desktop dropdown (hover + click, with hover-intent close delay)
  var item = document.getElementById('nav-services-item');
  if(item){
    var btn = item.querySelector('.nav-dropdown-toggle');
    var closeTimer;
    function openMenu(){ clearTimeout(closeTimer); item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    function closeMenu(){ item.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
    function scheduleClose(){ clearTimeout(closeTimer); closeTimer = setTimeout(closeMenu, 180); }

    item.addEventListener('mouseenter', openMenu);
    item.addEventListener('mouseleave', scheduleClose);
    btn.addEventListener('focus', openMenu);
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      if(item.classList.contains('open')) closeMenu(); else openMenu();
    });
    document.addEventListener('click', function(e){
      if(!item.contains(e.target)){ closeMenu(); }
    });
    item.querySelectorAll('.nav-dropdown a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
  }
  // Mobile expandable
  var mItem = document.getElementById('mobile-services-item');
  if(mItem){
    var mBtn = mItem.querySelector('.mobile-dropdown-toggle');
    mBtn.addEventListener('click', function(){
      var open = mItem.classList.toggle('open');
      mBtn.setAttribute('aria-expanded', open);
    });
  }
})();
  const navbar=document.getElementById('navbar');
window.addEventListener('scroll',function(){
  if(window.pageYOffset>100){
    navbar.style.background='rgba(10,10,10,0.95)';
    navbar.style.backdropFilter='blur(30px)';
  }else{
    navbar.style.background='rgba(10,10,10,0.85)';
    navbar.style.backdropFilter='blur(20px)';
  }
});
const hamburger=document.getElementById('nav-hamburger');
const mobileMenu=document.getElementById('mobile-menu');
const menuOverlay=document.getElementById('menu-overlay');
const mobileClose=document.getElementById('mobile-close');
function closeMenu(){
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
function openMenu(){
  hamburger.classList.add('active');
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
  hamburger.setAttribute('aria-expanded','true');
  mobileMenu.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
hamburger.addEventListener('click',function(){
  mobileMenu.classList.contains('open')?closeMenu():openMenu();
});
mobileClose.addEventListener('click',closeMenu);
menuOverlay.addEventListener('click',closeMenu);
document.querySelectorAll('.mobile-link,.mobile-cta').forEach(function(link){
  link.addEventListener('click',function(){
    closeMenu();
    var href=this.getAttribute('href');
    if(href && href.indexOf('#')===0){
      var target=document.querySelector(href);
      if(target) setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'start'});},300);
    }
  });
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&mobileMenu.classList.contains('open')) closeMenu();
});


