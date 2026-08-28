/* ============================================================
   GLOCK MEDIA — Trusted By Marquee (zero-config folder loader)
   ------------------------------------------------------------
   Just drop image files into  images/trusted/  and they appear.
   Two auto-discovery strategies run in this order:

   1) DIRECTORY LISTING (works with Apache/Nginx autoindex, most
      local dev servers like `python -m http.server`, `live-server`,
      `http-server`, VSCode Live Server, XAMPP, MAMP, etc.)
      -> fetches images/trusted/ and reads the HTML file list.

   2) NUMBERED FALLBACK (works on any static host, including
      Netlify / Vercel / GitHub Pages that DO NOT list folders)
      -> loads 1.png, 2.png, 3.png ... up to 50, also tries
         .jpg / .jpeg / .webp / .svg / .gif for each number.
      So name your files 1.png, 2.png, 3.png ... and you're done.

   USAGE
     <div id="trusted-marquee"></div>
     <script src="trusted-marquee.js"></script>

   OPTIONAL ATTRIBUTES
     data-folder="images/trusted"   (default)
     data-label="TRUSTED BY"        (default)
     data-max="50"                  numeric probe upper bound
   ============================================================ */
(function () {
  const IMG_EXT = ["png", "jpg", "jpeg", "webp", "svg", "gif"];

  const SECTION_HTML = (label, logos) => {
    const li = (src, dup) =>
      `<div class="trusted-logo"${dup ? ' aria-hidden="true"' : ""}>` +
        `<img src="${src}" alt="${dup ? "" : "logo"}" loading="lazy">` +
      `</div>`;
    return `
<section class="trusted-by-section">
  <div class="trusted-by-inner">
    <div class="trusted-by-label"><span class="tb-line"></span>${label}<span class="tb-line"></span></div>
    <div class="trusted-marquee">
      <div class="trusted-marquee-track">
        ${logos.map(s => li(s, false)).join("")}
        <!-- duplicate for seamless loop -->
        ${logos.map(s => li(s, true)).join("")}
      </div>
    </div>
  </div>
</section>`;
  };

  // Try to fetch a directory index (autoindex) and extract image URLs.
  function tryDirectoryIndex(folder) {
    return fetch(folder + "/", { cache: "no-cache" })
      .then(r => (r.ok && (r.headers.get("content-type") || "").includes("text/html") ? r.text() : Promise.reject()))
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const seen = new Set();
        const out = [];
        doc.querySelectorAll("a[href]").forEach(a => {
          const href = a.getAttribute("href");
          if (!href || href.startsWith("?") || href.startsWith("/") || href === "../") return;
          const clean = href.split("?")[0].split("#")[0];
          const ext = clean.split(".").pop().toLowerCase();
          if (!IMG_EXT.includes(ext)) return;
          if (seen.has(clean)) return;
          seen.add(clean);
          out.push(folder + "/" + clean);
        });
        return out.length ? out : Promise.reject();
      });
  }

  function probeImage(url) {
    return new Promise(resolve => {
      const im = new Image();
      im.onload = () => resolve(url);
      im.onerror = () => resolve(null);
      im.src = url;
    });
  }

  // Probe 1.ext, 2.ext, ... until `max` in a row all fail.
  async function tryNumberedProbe(folder, max) {
    const found = [];
    let miss = 0;
    for (let i = 1; i <= max; i++) {
      let hit = null;
      for (const ext of IMG_EXT) {
        const url = `${folder}/${i}.${ext}`;
        // eslint-disable-next-line no-await-in-loop
        const ok = await probeImage(url);
        if (ok) { hit = ok; break; }
      }
      if (hit) { found.push(hit); miss = 0; }
      else { miss++; if (miss >= 3 && found.length) break; }
    }
    return found;
  }

  async function collect(folder, max) {
    try { return await tryDirectoryIndex(folder); } catch (_) {}
    return tryNumberedProbe(folder, max);
  }

  function render(mount) {
    const folder = (mount.getAttribute("data-folder") || "images/trusted").replace(/\/$/, "");
    const label  = mount.getAttribute("data-label")  || "TRUSTED BY";
    const max    = parseInt(mount.getAttribute("data-max") || "50", 10);
    collect(folder, max).then(logos => {
      if (!logos || !logos.length) return;
      mount.outerHTML = SECTION_HTML(label, logos);
    });
  }

  function init() {
    document.querySelectorAll("#trusted-marquee, [data-trusted-marquee]").forEach(mount => {
      // If a loader (dynamic-loader.js / portfolio-loader.js) registered a
      // CMS-driven logo list, prefer it over the auto-scan. The loader sets
      // `window.__trustedLogosPromise` synchronously at module load time —
      // before this DOMContentLoaded handler can run — so it's always safe
      // to await here regardless of how long the Firestore fetch takes.
      const pending = window.__trustedLogosPromise;
      if (pending && typeof pending.then === "function") {
        pending.then(logos => {
          if (logos && logos.length) {
            const label = mount.getAttribute("data-label") || "TRUSTED BY";
            mount.outerHTML = SECTION_HTML(label, logos);
          } else {
            render(mount);
          }
        }).catch(() => render(mount));
      } else {
        render(mount);
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
