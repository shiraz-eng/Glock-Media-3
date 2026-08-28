
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


  // Nav scroll + Parallax
  const nav = document.getElementById('navbar');
  const heroGrid = document.querySelector('.hero-grid');
  let ticking = false;

  function onScrollFrame() {
    const scrolled = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', scrolled > 50);
    if (heroGrid) heroGrid.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';

    // Parallax for all parallax elements
    document.querySelectorAll('.parallax-slow').forEach(el => {
      if (el !== heroGrid) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = 'translateY(' + (scrolled * 0.1) + 'px)';
        }
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
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .flip-3d, .flip-3d-left, .fold-reveal, .cascade-3d').forEach(el => {
    revealObserver.observe(el);
  });

  // Counter animation
  const counters = document.querySelectorAll('.mission-stat-item .num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current) + '+';
        }, 30);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  // Testimonial carousel — exposed on window so reviews-loader.js (Admin
  // Panel CMS) can re-run this after it swaps in admin-edited review cards,
  // since the slide/dot elements it queries would otherwise go stale.
  window.initTestimonialCarousel = function () {
    if (window.__testimonialCarouselTimer) clearInterval(window.__testimonialCarouselTimer);
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    if (!slides.length) return;
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((s, i) => { s.classList.toggle('active', i === index); });
      dots.forEach((d, i) => { d.classList.toggle('active', i === index); });
      currentSlide = index;
    }

    dots.forEach(d => {
      d.addEventListener('click', () => showSlide(parseInt(d.dataset.index)));
    });

    window.__testimonialCarouselTimer = setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 6000);
  };
  window.initTestimonialCarousel();

  // 3D Tilt effect on mouse move for cards
  document.querySelectorAll('.tilt-3d, .value-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(20px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

})();
