/* Glock Media — blog engine (listing + article) driven by data.js */
(function () {
  'use strict';
  var G = window.GLOCK;
  if (!G || !G.posts) return;

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function catOf(id) {
    for (var i = 0; i < G.categories.length; i++) if (G.categories[i].id === id) return G.categories[i];
    return { id: id, label: id };
  }
  function authorOf(id) {
    return G.authors[id] || { name: 'Glock Media', role: 'Editorial Team', avatar: '', bio: '' };
  }
  function fmtDate(iso) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d = new Date(iso + 'T12:00:00');
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function fmtDateShort(iso) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var d = new Date(iso + 'T12:00:00');
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  function postUrl(slug) { return '/blog/' + slug; }
  function sortedPosts() {
    return G.posts.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }

  /* ============================================================
     BLOG LISTING PAGE
     ============================================================ */
  var blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    var posts = sortedPosts();
    var featured = posts.filter(function (p) { return p.featured; })[0] || posts[0];
    var rest = posts.filter(function (p) { return p !== featured; });
    var currentFilter = 'all';
    var PAGE_SIZE = 6;
    var shown = PAGE_SIZE;

    /* Hero stats */
    var statArticles = document.getElementById('statArticles');
    if (statArticles) {
      statArticles.setAttribute('data-count', posts.length);
      statArticles.textContent = '0+';
    }
    var statCats = document.getElementById('statCats');
    if (statCats) {
      statCats.setAttribute('data-count', G.categories.length);
      statCats.textContent = '0';
    }

    /* Featured article */
    var featHost = document.getElementById('featuredArticle');
    function renderFeatured() {
      if (!featHost) return;
      if (currentFilter !== 'all' && featured.category !== currentFilter) {
        featHost.style.display = 'none';
        return;
      }
      featHost.style.display = 'grid';
      var c = catOf(featured.category);
      var a = authorOf(featured.author);
      featHost.dataset.category = featured.category;
      featHost.innerHTML =
        '<div class="featured-image-wrapper">' +
          '<a href="' + postUrl(featured.slug) + '" aria-label="Read: ' + esc(featured.title) + '">' +
            '<img src="' + featured.image + '" alt="' + esc(featured.title) + '" class="featured-image" loading="eager" decoding="async">' +
          '</a>' +
          '<div class="featured-image-overlay"></div>' +
          '<span class="featured-badge">Featured</span>' +
        '</div>' +
        '<div class="featured-content">' +
          '<div class="featured-meta">' +
            '<span class="featured-category">' + c.label + '</span>' +
            '<span class="featured-date"><i data-lucide="calendar" style="width:14px;height:14px;"></i>' + fmtDate(featured.date) + '</span>' +
          '</div>' +
          '<h3 class="featured-title"><a href="' + postUrl(featured.slug) + '" style="color:inherit;text-decoration:none;">' + featured.title + '</a></h3>' +
          '<p class="featured-excerpt">' + featured.excerpt + '</p>' +
          '<div class="featured-author">' +
            '<img src="' + a.avatar + '" alt="' + esc(a.name) + '" class="featured-author-avatar" loading="lazy" decoding="async">' +
            '<div class="featured-author-info">' +
              '<span class="featured-author-name">' + a.name + '</span>' +
              '<span class="featured-author-role">' + a.role + '</span>' +
            '</div>' +
            '<span class="featured-readtime"><i data-lucide="clock" style="width:14px;height:14px;"></i>' + featured.readTime + ' min read</span>' +
          '</div>' +
        '</div>';
    }

    /* Filter bar (rendered from data) */
    var filterBar = document.getElementById('filterBar');
    if (filterBar) {
      var btns = [{ id: 'all', label: 'All' }].concat(G.categories);
      filterBar.innerHTML = btns.map(function (c) {
        return '<button class="filter-btn' + (c.id === 'all' ? ' active' : '') + '" data-filter="' + c.id + '">' + c.label + '</button>';
      }).join('');
      filterBar.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          currentFilter = btn.dataset.filter;
          shown = PAGE_SIZE;
          renderFeatured();
          renderGrid();
          if (window.lucide) lucide.createIcons();
        });
      });
    }

    /* Grid */
    var loadMoreWrap = document.getElementById('loadMoreWrap');
    function cardHTML(p, i) {
      var c = catOf(p.category);
      var a = authorOf(p.author);
      return '<article class="blog-card" data-category="' + p.category + '" style="animation-delay:' + (i * 0.08) + 's">' +
        '<div class="blog-card-image-wrapper">' +
          '<a href="' + postUrl(p.slug) + '" aria-label="Read: ' + esc(p.title) + '">' +
            '<img src="' + p.image + '" alt="' + esc(p.title) + '" class="blog-card-image" loading="lazy" decoding="async">' +
          '</a>' +
          '<div class="blog-card-image-overlay"></div>' +
          '<div class="blog-card-read-icon"><i data-lucide="arrow-up-right" style="width:18px;height:18px;"></i></div>' +
        '</div>' +
        '<div class="blog-card-content">' +
          '<div class="blog-card-meta">' +
            '<span class="blog-card-category">' + c.label + '</span>' +
            '<span class="blog-card-dot"></span>' +
            '<span class="blog-card-date">' + fmtDateShort(p.date) + '</span>' +
          '</div>' +
          '<h3 class="blog-card-title">' + p.title + '</h3>' +
          '<p class="blog-card-excerpt">' + p.excerpt + '</p>' +
          '<div class="blog-card-footer">' +
            '<div class="blog-card-author">' +
              '<img src="' + a.avatar + '" alt="' + esc(a.name) + '" class="blog-card-author-avatar" loading="lazy" decoding="async">' +
              '<span class="blog-card-author-name">' + a.name + '</span>' +
            '</div>' +
            '<span class="blog-card-readtime"><i data-lucide="clock" style="width:12px;height:12px;"></i>' + p.readTime + ' min</span>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    function renderGrid() {
      var pool = rest.filter(function (p) { return currentFilter === 'all' || p.category === currentFilter; });
      var visible = pool.slice(0, shown);
      blogGrid.innerHTML = visible.map(cardHTML).join('');
      if (loadMoreWrap) loadMoreWrap.style.display = pool.length > shown ? 'flex' : 'none';
    }

    var loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function () {
        loadMoreBtn.classList.add('loading');
        setTimeout(function () {
          shown += PAGE_SIZE;
          renderGrid();
          loadMoreBtn.classList.remove('loading');
          if (window.lucide) lucide.createIcons();
        }, 500);
      });
    }

    renderFeatured();
    renderGrid();
  }

  /* ============================================================
     ARTICLE PAGE
     ============================================================ */
  var articleRoot = document.getElementById('articleRoot');
  if (articleRoot) {
    var slug = document.body.getAttribute('data-post');
    var post = null;
    var postsAll = sortedPosts();
    for (var i = 0; i < postsAll.length; i++) if (postsAll[i].slug === slug) post = postsAll[i];
    if (!post) post = postsAll[0];
    var author = authorOf(post.author);
    var cat = catOf(post.category);
    var idx = postsAll.indexOf(post);
    var prev = postsAll[idx - 1] || null;   /* newer */
    var next = postsAll[idx + 1] || null;   /* older */

    document.title = post.title + ' — Glock Media Blog';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    /* Body renderer */
    function blockHTML(b) {
      if (b.p) return '<p>' + b.p + '</p>';
      if (b.h2) return '<h2 id="' + b.id + '">' + b.h2 + '</h2>';
      if (b.h3) return '<h3>' + b.h3 + '</h3>';
      if (b.quote) return '<blockquote>' + b.quote + '</blockquote>';
      if (b.list) return '<ul>' + b.list.map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
      if (b.image) return '<img src="' + b.image.src + '" alt="' + esc(b.image.alt || '') + '" class="article-image">' +
        (b.image.caption ? '<p class="article-image-caption">' + b.image.caption + '</p>' : '');
      if (b.takeaways) return '<div class="takeaways-box"><h4><i data-lucide="zap" style="width:18px;height:18px;"></i> ' + (b.takeaways.title || 'Key Takeaways') + '</h4><ul>' +
        b.takeaways.items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>';
      if (b.stats) return '<div class="stat-box">' + b.stats.map(function (s) {
        return '<div class="stat-box-item"><div class="stat-box-number">' + s.number + '</div><div class="stat-box-label">' + s.label + '</div></div>';
      }).join('') + '</div>';
      if (b.pullquote) return '<div class="pull-quote-box"><p>' + b.pullquote.text + '</p><div class="quote-author">&mdash; ' + b.pullquote.author + '</div></div>';
      return '';
    }

    /* TOC — auto from body h2s unless overridden */
    var toc = post.toc || post.body.filter(function (b) { return b.h2; }).map(function (b, i) { return { id: b.id, label: b.h2 }; });

    /* Related — same category first, then recent, excluding self */
    var related = postsAll.filter(function (p) { return p.slug !== post.slug; })
      .sort(function (a, b) {
        var as = a.category === post.category ? 0 : 1;
        var bs = b.category === post.category ? 0 : 1;
        return as - bs;
      }).slice(0, 3);

    articleRoot.innerHTML =
      '<section class="article-hero">' +
        '<img src="' + post.image + '" alt="' + esc(post.title) + '" class="article-hero-img">' +
        '<div class="article-hero-overlay"></div>' +
        '<div class="article-hero-content">' +
          '<div class="article-hero-label"><span class="dot"></span>' + cat.label + '</div>' +
          '<h1 class="article-hero-title">' + post.title + '</h1>' +
          '<div class="article-hero-meta">' +
            '<span class="article-hero-meta-item"><i data-lucide="user" style="width:14px;height:14px;"></i> ' + author.name + '</span>' +
            '<span class="article-hero-meta-item"><i data-lucide="calendar" style="width:14px;height:14px;"></i> ' + fmtDate(post.date) + '</span>' +
            '<span class="article-hero-meta-item"><i data-lucide="clock" style="width:14px;height:14px;"></i> ' + post.readTime + ' min read</span>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<div class="article-layout">' +
        '<div class="share-bar reveal">' +
          '<div class="share-label">Share</div>' +
          '<button class="share-btn" data-share="twitter" aria-label="Share on X"><i data-lucide="twitter" style="width:18px;height:18px;"></i></button>' +
          '<button class="share-btn" data-share="linkedin" aria-label="Share on LinkedIn"><i data-lucide="linkedin" style="width:18px;height:18px;"></i></button>' +
          '<button class="share-btn" data-share="facebook" aria-label="Share on Facebook"><i data-lucide="facebook" style="width:18px;height:18px;"></i></button>' +
          '<button class="share-btn" data-share="copy" aria-label="Copy link"><i data-lucide="link" style="width:18px;height:18px;"></i></button>' +
        '</div>' +

        '<article class="article-main reveal">' +
          '<div class="article-meta-bar">' +
            '<div class="article-meta-author">' +
              '<img src="' + author.avatar + '" alt="' + esc(author.name) + '" class="article-meta-avatar">' +
              '<div><div class="article-meta-name">' + author.name + '</div><div class="article-meta-role">' + author.role + '</div></div>' +
            '</div>' +
            '<div class="article-meta-divider"></div>' +
            '<span class="article-meta-item"><i data-lucide="calendar" style="width:14px;height:14px;"></i> ' + fmtDate(post.date) + '</span>' +
            '<span class="article-meta-item"><i data-lucide="clock" style="width:14px;height:14px;"></i> ' + post.readTime + ' min read</span>' +
            '<span class="article-meta-category">' + cat.label + '</span>' +
          '</div>' +
          '<div class="article-body">' + post.body.map(blockHTML).join('') + '</div>' +

          '<div class="author-bio reveal">' +
            '<img src="' + author.avatar + '" alt="' + esc(author.name) + '" class="author-bio-avatar">' +
            '<div class="author-bio-content">' +
              '<div class="author-bio-name">' + author.name + '</div>' +
              '<div class="author-bio-role">' + author.role + ' at Glock Media</div>' +
              '<div class="author-bio-text">' + author.bio + '</div>' +
            '</div>' +
          '</div>' +
        '</article>' +

        '<aside class="toc-sidebar reveal">' +
          '<div class="toc-title">Table of Contents</div>' +
          '<ul class="toc-list">' + toc.map(function (t, i) {
            return '<li><a href="#' + t.id + '" class="toc-link' + (i === 0 ? ' active' : '') + '">' + t.label + '</a></li>';
          }).join('') + '</ul>' +
        '</aside>' +
      '</div>' +

      '<div class="article-nav">' +
        (prev ? '<a href="' + postUrl(prev.slug) + '" class="article-nav-btn prev"><span class="article-nav-label">&#8592; Newer Article</span><span class="article-nav-title">' + prev.title + '</span></a>' : '<span></span>') +
        (next ? '<a href="' + postUrl(next.slug) + '" class="article-nav-btn next"><span class="article-nav-label">Older Article &#8594;</span><span class="article-nav-title">' + next.title + '</span></a>' : '<span></span>') +
      '</div>' +

      '<section class="related-section">' +
        '<div class="related-header"><h2 class="related-title">More from <span class="gradient-text">Glock Media</span></h2></div>' +
        '<div class="related-grid">' + related.map(function (r) {
          var rc = catOf(r.category);
          return '<a href="' + postUrl(r.slug) + '" class="related-card">' +
            '<img src="' + r.image + '" alt="' + esc(r.title) + '" class="related-card-img" loading="lazy">' +
            '<div class="related-card-content">' +
              '<div class="related-card-category">' + rc.label + '</div>' +
              '<h3 class="related-card-title">' + r.title + '</h3>' +
              '<p class="related-card-excerpt">' + r.excerpt + '</p>' +
            '</div></a>';
        }).join('') + '</div>' +
      '</section>';

    /* Share handlers */
    document.querySelectorAll('.share-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = window.location.href;
        var t = btn.dataset.share;
        if (t === 'twitter') window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(post.title), '_blank', 'width=600,height=400');
        if (t === 'linkedin') window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'width=600,height=400');
        if (t === 'facebook') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'width=600,height=400');
        if (t === 'copy') {
          if (navigator.clipboard) navigator.clipboard.writeText(url);
          btn.innerHTML = '<i data-lucide="check" style="width:18px;height:18px;"></i>';
          if (window.lucide) lucide.createIcons();
          setTimeout(function () {
            btn.innerHTML = '<i data-lucide="link" style="width:18px;height:18px;"></i>';
            if (window.lucide) lucide.createIcons();
          }, 1500);
        }
      });
    });

    /* Reading progress */
    var progressBar = document.getElementById('readingProgress');
    window.addEventListener('scroll', function () {
      if (!progressBar) return;
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
    }, { passive: true });

    /* TOC scrollspy + smooth scroll */
    var tocLinks = document.querySelectorAll('.toc-link');
    var sections = document.querySelectorAll('.article-body h2[id]');
    window.addEventListener('scroll', function () {
      var current = '';
      sections.forEach(function (s) { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
      tocLinks.forEach(function (l) {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + current) l.classList.add('active');
      });
    }, { passive: true });
    tocLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(link.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
      });
    });
  }

  /* Newsletter (both pages) */
  var nl = document.getElementById('newsletterForm');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = nl.querySelector('.newsletter-btn');
      if (btn) { btn.textContent = 'Subscribed'; btn.disabled = true; }
      nl.reset();
      setTimeout(function () { if (btn) { btn.textContent = 'Subscribe'; btn.disabled = false; } }, 2500);
    });
  }
})();
