/**
 * media-url-resolver.js
 * ------------------------------------------------------------------
 * Central helper so EVERY media/link field in the admin panel — and
 * every public page that renders CMS content — accepts any of:
 *
 *   1. A direct hosted URL        (https://cdn.example.com/x.jpg)
 *   2. A Google Drive share link  (https://drive.google.com/file/d/ID/view?usp=sharing)
 *   3. Other third-party links    (Dropbox, YouTube, Vimeo, imgbb, etc.)
 *   4. A local repo file path     (/assets/img.jpg, assets/img.jpg, ./videos/x.mp4)
 *
 * This mirrors (and extends to Dropbox/Vimeo) the Drive/YouTube
 * resolution logic that already exists for Portfolio work items in
 * /js/glock-portfolio.js (resolveImage / parseVideo / parseDoc), so
 * the whole site now behaves consistently no matter which admin
 * field the link/path was pasted into.
 *
 * - resolveImageUrl(raw)  -> string, safe for <img src>
 * - resolveFileUrl(raw)   -> string, safe for <video><source> / direct file
 *     (use for background/looping clips that must be a real file, not
 *      a platform embed — Drive links are normalized to a direct file
 *      link; YouTube links cannot be represented this way and are
 *      returned unchanged, since YouTube has no direct file URL)
 * - resolveEmbeddable(raw) -> { kind: "iframe"|"video"|"empty", src, provider? }
 *     (use for click-to-play video fields, e.g. portfolio case studies —
 *      picks an <iframe> for YouTube/Vimeo/Drive, or a <video> tag for
 *      direct files/local paths)
 * - resolveDocUrl(raw)    -> { kind: "iframe"|"link"|"empty", src, watch }
 * - describeMediaLink(raw) -> short human label for admin-panel hints
 * - isSupportedMediaLink(raw) -> boolean
 *
 * Exposed both as ES module exports AND as `window.MediaResolver` so
 * it can be used from admin-pages.js (a module) as well as any
 * classic-script / inline `onclick=` code inside admin.html.
 * ------------------------------------------------------------------
 */

function clean(raw) {
  if (raw === null || raw === undefined) return "";
  return String(raw).trim().replace(/^["']|["']$/g, "");
}

function isAbsoluteUrl(s) {
  return /^https?:\/\//i.test(s);
}

function isGoogleDriveLink(s) {
  return /drive\.google\.com/i.test(s);
}

function isGoogleDocsLink(s) {
  return /docs\.google\.com/i.test(s);
}

function extractDriveFileId(s) {
  let m = s.match(/\/file\/d\/([^/?#]+)/);
  if (m) return m[1];
  m = s.match(/[?&]id=([^&]+)/);
  if (m) return m[1];
  return null;
}

function extractDocsId(s) {
  const m = s.match(/docs\.google\.com\/[a-z]+\/d\/([^/?#]+)/);
  return m ? m[1] : null;
}

function extractYouTubeId(s) {
  const m = s.match(/(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? m[1] : null;
}

function extractVimeoId(s) {
  const m = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function isDropboxLink(s) {
  return /dropbox\.com/i.test(s);
}

function normalizeDropboxDirect(s) {
  if (/[?&]raw=1/.test(s)) return s;
  if (/[?&]dl=1/.test(s)) return s.replace("dl=1", "raw=1");
  if (/[?&]dl=0/.test(s)) return s.replace("dl=0", "raw=1");
  return s + (s.includes("?") ? "&raw=1" : "?raw=1");
}

/** Image fields: <img src="...">. Drive links become a thumbnail/CDN link. */
export function resolveImageUrl(raw, size) {
  const s = clean(raw);
  if (!s) return "";
  if (isGoogleDriveLink(s)) {
    const id = extractDriveFileId(s);
    if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=${size || "w1600"}`;
    return s;
  }
  if (isDropboxLink(s)) return normalizeDropboxDirect(s);
  // Direct URL or local repo file path — already a valid src as-is.
  return s;
}

/**
 * "Real file" fields: autoplaying/looping background <video><source>
 * elements that need an actual file, not a platform embed. Drive/Dropbox
 * links are normalized to a direct file link; YouTube/Vimeo links are
 * returned unchanged (there is no direct-file URL for those — use a
 * dedicated video field + resolveEmbeddable for click-to-play content).
 */
export function resolveFileUrl(raw) {
  const s = clean(raw);
  if (!s) return "";
  if (isGoogleDriveLink(s)) {
    const id = extractDriveFileId(s);
    if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
    return s;
  }
  if (isDropboxLink(s)) return normalizeDropboxDirect(s);
  return s;
}

/**
 * Click-to-play video fields (e.g. portfolio case studies, hero preview
 * modal). Returns which tag to render and the src to use.
 */
export function resolveEmbeddable(raw) {
  const s = clean(raw);
  if (!s) return { kind: "empty", src: "" };

  const ytId = extractYouTubeId(s);
  if (ytId) {
    return {
      kind: "iframe",
      provider: "youtube",
      src: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`,
      watch: `https://www.youtube.com/watch?v=${ytId}`,
    };
  }

  const vimeoId = extractVimeoId(s);
  if (vimeoId) {
    return { kind: "iframe", provider: "vimeo", src: `https://player.vimeo.com/video/${vimeoId}`, watch: s };
  }

  if (isGoogleDriveLink(s)) {
    const id = extractDriveFileId(s);
    if (id) return { kind: "iframe", provider: "drive", src: `https://drive.google.com/file/d/${id}/preview`, watch: s };
    return { kind: "iframe", provider: "drive", src: s, watch: s };
  }

  if (isDropboxLink(s)) return { kind: "video", src: normalizeDropboxDirect(s) };

  if (/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(s) || s.indexOf("assets/") === 0 || s.charAt(0) === "/" || s.startsWith("./")) {
    return { kind: "video", src: s };
  }

  // Unknown shape — still try it as a direct file rather than silently dropping it.
  return { kind: "video", src: s };
}

/** Doc fields (scriptwriting docs, briefs, etc.) — Google Docs/Drive preview or plain link. */
export function resolveDocUrl(raw) {
  const s = clean(raw);
  if (!s) return { kind: "empty", src: "" };

  if (isGoogleDocsLink(s)) {
    const id = extractDocsId(s);
    if (id) {
      return {
        kind: "iframe",
        src: `https://docs.google.com/document/d/${id}/preview`,
        watch: `https://docs.google.com/document/d/${id}/edit?usp=sharing`,
      };
    }
  }
  if (isGoogleDriveLink(s)) {
    const id = extractDriveFileId(s);
    if (id) return { kind: "iframe", src: `https://drive.google.com/file/d/${id}/preview`, watch: s };
  }
  return { kind: "link", src: s, watch: s };
}

export function isSupportedMediaLink(raw) {
  return !!clean(raw);
}

/** Human-readable label for admin-panel hint text / live preview badges. */
export function describeMediaLink(raw) {
  const s = clean(raw);
  if (!s) return "";
  if (isGoogleDocsLink(s)) return "Google Docs link";
  if (isGoogleDriveLink(s)) return "Google Drive link";
  if (isDropboxLink(s)) return "Dropbox link";
  if (extractYouTubeId(s)) return "YouTube link";
  if (extractVimeoId(s)) return "Vimeo link";
  if (isAbsoluteUrl(s)) return "Direct URL";
  return "Local file path";
}

if (typeof window !== "undefined") {
  window.MediaResolver = {
    resolveImageUrl,
    resolveFileUrl,
    resolveEmbeddable,
    resolveDocUrl,
    isSupportedMediaLink,
    describeMediaLink,
  };
}
