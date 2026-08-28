/* Glock Media — fullscreen video loader engine */
(function () {
  'use strict';
  var html = document.documentElement;
  var el = document.getElementById('glockLoader');

  function finish() {
    html.classList.remove('gl-lock');
    html.classList.add('gl-done');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
  if (!el) { html.classList.remove('gl-lock'); return; }

  var cfg = (window.GLOCK && window.GLOCK.loader) || {};
  if (cfg.enabled === false) { finish(); return; }

  var fast = html.classList.contains('gl-fast');
  var words = (cfg.statusWords && cfg.statusWords.length)
    ? cfg.statusWords
    : ['SCRIPTING', 'CUTTING', 'GRADING', 'SCORING', 'RENDERING', 'EXPORTING'];

  var video = el.querySelector('.gl-video');
  var statusEl = el.querySelector('.gl-status');
  var countEl = el.querySelector('.gl-count');
  var fillEl = el.querySelector('.gl-fill');
  var stopped = false;
  var exited = false;
  var MIN_TIME = fast ? 900 : 2600;
  var t0 = performance.now();

  /* Status word scramble */
  var chars = '!<>-_\\/[]{}=+*^?#';
  var wi = 0;
  function scrambleTo(word) {
    if (!statusEl) return;
    var frame = 0, total = 12;
    var iv = setInterval(function () {
      var out = '';
      var reveal = Math.floor((frame / total) * word.length);
      for (var i = 0; i < word.length; i++) {
        out += i < reveal ? word[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      statusEl.textContent = out;
      frame++;
      if (frame > total) { statusEl.textContent = word; clearInterval(iv); }
    }, 26);
  }
  function cycle() {
    if (stopped) return;
    scrambleTo(words[wi % words.length]);
    wi++;
    setTimeout(cycle, 620);
  }
  cycle();

  function setProgress(p) {
    if (!isFinite(p)) p = 0;
    p = Math.max(0, Math.min(1, p));
    if (countEl) countEl.innerHTML = Math.round(p * 100) + '<span class="pct">%</span>';
    if (fillEl) fillEl.style.transform = 'scaleX(' + p + ')';
    if (p >= 1 && !exited) {
      var wait = Math.max(0, MIN_TIME - (performance.now() - t0));
      setTimeout(function () {
        if (exited) return;
        exited = true;
        stopped = true;
        if (statusEl) statusEl.textContent = 'EXPORTING';
        try { sessionStorage.setItem('gl_seen', '1'); } catch (err) {}
        setTimeout(function () {
          el.classList.add('gl-out');
          setTimeout(finish, 1300);
        }, 300);
      }, wait);
    }
  }

  if (fast) {
    /* Poster flash — quick branded pass on repeat visits */
    var fp = 0;
    var fiv = setInterval(function () {
      fp += 0.09;
      setProgress(fp);
      if (fp >= 1) clearInterval(fiv);
    }, 60);
    return;
  }

  /* Mobile / data-saver: lighter rendition */
  try {
    var small = window.innerWidth < 720 ||
      (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || '')));
    if (small && video) {
      var src = video.querySelector('source');
      if (src) { src.src = src.src.replace('loader-1080.mp4', 'loader-720.mp4'); video.load(); }
    }
  } catch (e) {}

  /* Progress follows ACTUAL video playback; timer fallback if it stalls */
  var played = false;
  var start = performance.now();
  var FALLBACK_MS = 4200;

  if (video) {
    video.addEventListener('timeupdate', function () {
      played = true;
      if (video.duration) setProgress(video.currentTime / video.duration);
    });
    video.addEventListener('ended', function () { setProgress(1); });
    video.addEventListener('error', function () { played = true; setProgress(1); });
    var playPromise = video.play ? video.play() : null;
    if (playPromise && playPromise.catch) playPromise.catch(function () {});
  }

  (function fallbackTick() {
    if (exited) return;
    if (!played) {
      var p = (performance.now() - start) / FALLBACK_MS;
      if (p >= 1) { setProgress(1); return; }
      setProgress(p);
    }
    setTimeout(fallbackTick, 120);
  })();

  /* Hard cap — never trap the user */
  setTimeout(function () { setProgress(1); }, 8000);
})();
