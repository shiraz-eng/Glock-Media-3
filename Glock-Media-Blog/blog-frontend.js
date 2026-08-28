// Dynamic blog frontend loader — reads from Firestore and renders into
// the existing Glock Media Blog markup (keeps original layout & styling).
import * as api from "../Admin-Panel/cms-api.js";

export async function fetchCategories(){
  return api.listCategories();
}
export async function fetchBlogs({ categorySlug } = {}){
  return api.listBlogs({ categorySlug, publishedOnly: false });
}
export async function fetchBlogBySlug(slug, preview = false){
  const blog = await api.getBlogBySlug(slug);
  if (!blog) return null;
  return blog;
}
export async function fetchCategoryBySlug(slug){
  return api.getCategoryBySlug(slug);
}

export function isValidRealBlog(blog) {
  if (!blog) return false;
  return !!(blog.title && blog.slug);
}

export function fmtDate(d){
  if(!d) return "";
  try { return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); }
  catch { return d; }
}

export function escapeHTML(s){
  return String(s||"").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

// Build a blog-card matching the existing site markup (class names preserved).
export function blogCardHTML(b, { initial=false } = {}){
  const catClass = (b.categorySlug || "tech").toLowerCase();
  const catLabel = escapeHTML(b.categoryName || b.categorySlug || "");
  const link = `/Glock-Media-Blog/blog-post.html?slug=${encodeURIComponent(b.slug)}`;
  return `
    <article class="blog-card${initial?" initial-card":""}" data-category="${catClass}">
      <div class="blog-card-image-wrapper">
        <a href="${link}" aria-label="Read: ${escapeHTML(b.title)}">
          <img src="${b.featuredImage||""}" alt="${escapeHTML(b.title)}" class="blog-card-image" loading="lazy" decoding="async">
        </a>
        <div class="blog-card-image-overlay"></div>
        <div class="blog-card-read-icon">
          <i data-lucide="arrow-up-right" style="width:18px;height:18px;"></i>
        </div>
      </div>
      <div class="blog-card-content">
        <div class="blog-card-meta">
          <span class="blog-card-category ${catClass}">${catLabel}</span>
          <span class="blog-card-dot"></span>
          <span class="blog-card-date">${fmtDate(b.publishDate)}</span>
        </div>
        <h3 class="blog-card-title"><a href="${link}" style="color:inherit;text-decoration:none">${escapeHTML(b.title)}</a></h3>
        <p class="blog-card-excerpt">${escapeHTML(b.shortDesc||"")}</p>
        <div class="blog-card-footer">
          <div class="blog-card-author">
            ${b.authorAvatar?`<img src="${b.authorAvatar}" alt="${escapeHTML(b.author||"")}" class="blog-card-author-avatar" loading="lazy">`:""}
            <span class="blog-card-author-name">${escapeHTML(b.author||"")}</span>
          </div>
          <span class="blog-card-readtime">
            <i data-lucide="clock" style="width:12px;height:12px;"></i>
            ${escapeHTML(b.readTime||"5 min")}
          </span>
        </div>
      </div>
    </article>`;
}

export function featuredHTML(b){
  const catClass = (b.categorySlug || "tech").toLowerCase();
  const link = `/Glock-Media-Blog/blog-post.html?slug=${encodeURIComponent(b.slug)}`;
  return `
    <div class="featured-image-wrapper">
      <a href="${link}" aria-label="Read: ${escapeHTML(b.title)}">
        <img src="${b.featuredImage||""}" alt="${escapeHTML(b.title)}" class="featured-image" loading="eager" decoding="async">
      </a>
      <div class="featured-image-overlay"></div>
      <span class="featured-badge">Featured</span>
    </div>
    <div class="featured-content">
      <div class="featured-meta">
        <span class="featured-category ${catClass}">${escapeHTML(b.categoryName||"")}</span>
        <span class="featured-date">
          <i data-lucide="calendar" style="width:14px;height:14px;"></i>
          ${fmtDate(b.publishDate)}
        </span>
      </div>
      <h3 class="featured-title"><a href="${link}" style="color:inherit;text-decoration:none">${escapeHTML(b.title)}</a></h3>
      <p class="featured-excerpt">${escapeHTML(b.shortDesc||"")}</p>
      <div class="featured-author">
        ${b.authorAvatar?`<img src="${b.authorAvatar}" alt="${escapeHTML(b.author||"")}" class="featured-author-avatar" loading="lazy">`:""}
        <div class="featured-author-info">
          <span class="featured-author-name">${escapeHTML(b.author||"")}</span>
          <span class="featured-author-role">Author</span>
        </div>
        <span class="featured-readtime">
          <i data-lucide="clock" style="width:14px;height:14px;"></i>
          ${escapeHTML(b.readTime||"5 min")} read
        </span>
      </div>
    </div>`;
}
