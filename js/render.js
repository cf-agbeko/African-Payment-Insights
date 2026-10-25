/* =========================================================
   AFRICAN PAYMENTS INSIGHTS — SHARED RENDER HELPERS
   ========================================================= */

const APIRender = (function () {
  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function initials(name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  /**
   * Tiny markdown-lite parser for article bodies.
   * Supported syntax (documented in the admin form too):
   *   ## Heading        -> <h2>
   *   - list item        -> <ul><li>
   *   **bold text**       -> <strong>
   *   blank-line-separated blocks -> <p>
   */
  function renderBody(raw) {
    const lines = raw.split("\n");
    let html = "";
    let inList = false;
    let paragraphBuffer = [];

    function flushParagraph() {
      if (paragraphBuffer.length) {
        const text = paragraphBuffer.join(" ").trim();
        if (text) html += `<p>${inlineFormat(text)}</p>`;
        paragraphBuffer = [];
      }
    }

    function inlineFormat(text) {
      return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    }

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        flushParagraph();
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h2>${inlineFormat(trimmed.slice(3))}</h2>`;
      } else if (trimmed.startsWith("- ")) {
        flushParagraph();
        if (!inList) { html += "<ul>"; inList = true; }
        html += `<li>${inlineFormat(trimmed.slice(2))}</li>`;
      } else if (trimmed === "") {
        if (inList) { html += "</ul>"; inList = false; }
        flushParagraph();
      } else {
        paragraphBuffer.push(trimmed);
      }
    });
    if (inList) html += "</ul>";
    flushParagraph();
    return html;
  }

  function articleCard(article) {
    return `
      <a class="article-card" href="article.html?id=${encodeURIComponent(article.id)}">
        <span class="cat-pill cat-${article.category}">${APIStore.categoryIcon(article.category)} ${APIStore.categoryLabel(article.category)}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <p class="excerpt">${escapeHtml(article.excerpt)}</p>
        <span class="meta-line">${article.readTime} min read &middot; ${formatDate(article.date)}</span>
      </a>`;
  }

  function featuredCard(article) {
    return `
      <a class="featured-card" href="article.html?id=${encodeURIComponent(article.id)}" style="display:block;">
        <span class="badge badge--terracotta">Featured Insight</span>
        <span class="cat-pill cat-${article.category}">${APIStore.categoryIcon(article.category)} ${APIStore.categoryLabel(article.category)}</span>
        <h3>${escapeHtml(article.title)}</h3>
        <p class="excerpt">${escapeHtml(article.excerpt)}</p>
        <span class="meta-line">${article.readTime} min read &middot; By ${escapeHtml(article.author)} &middot; <span>Read the full deep-dive &rarr;</span></span>
      </a>`;
  }

  /**
   * Renders a short-form, LinkedIn-style update: avatar initials,
   * author + role, timestamp, plain body text, and an optional
   * "view source" link card if the post points out to an external URL.
   */
  function postCard(post) {
    const sourceBlock = post.sourceUrl
      ? `<a class="post-source" href="${escapeHtml(post.sourceUrl)}" target="_blank" rel="noopener noreferrer">
           🔗 ${escapeHtml(post.sourceLabel || "View original source")}
         </a>`
      : "";
    return `
      <article class="post-card">
        <div class="post-card-head">
          <div class="post-avatar">${initials(post.authorName || "AP")}</div>
          <div>
            <div class="post-author">${escapeHtml(post.authorName || "")}</div>
            <div class="post-meta">${escapeHtml(post.authorRole || "")} &middot; ${formatDate(post.date)}</div>
          </div>
        </div>
        <p class="post-body">${inlinePlain(post.body)}</p>
        ${sourceBlock}
      </article>`;
  }

  function inlinePlain(text) {
    return escapeHtml(text || "").replace(/\n/g, "<br>");
  }

  function emptyState(message) {
    return `<div class="empty-state">${message}</div>`;
  }

  function wireNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        links.classList.toggle("open");
      });
    }
    // Highlight active link based on current page filename
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a[data-page]").forEach((a) => {
      if (a.getAttribute("data-page") === current) a.classList.add("active");
    });
  }

  /**
   * Builds the scrolling ticker from what's actually published on the
   * site right now (real counts from the data store), rather than
   * fixed placeholder marketing figures.
   */
  async function buildTicker() {
    const articles = await APIStore.getAll();
    const posts = await APIStore.getAllPosts();
    const categoriesCovered = new Set(articles.map((a) => a.category)).size;
    const totalReadMinutes = articles.reduce((sum, a) => sum + (a.readTime || 0), 0);
    const latest = articles[0];

    const items = [
      { label: "Articles Published", value: String(articles.length) },
      { label: "Categories Covered", value: String(categoriesCovered) },
      { label: "Posts Shared", value: String(posts.length) },
      { label: "Minutes of Reading, Total", value: String(totalReadMinutes) },
    ];
    if (latest) {
      items.push({ label: "Latest: " + latest.title, value: formatDate(latest.date) });
    }

    // duplicate the list once so the CSS animation can loop seamlessly
    const doubled = items.concat(items);
    return doubled
      .map((i) => `<span class="ticker-item"><strong>${escapeHtml(i.value)}</strong> ${escapeHtml(i.label)}</span>`)
      .join("");
  }

  return {
    formatDate,
    escapeHtml,
    renderBody,
    articleCard,
    featuredCard,
    postCard,
    emptyState,
    wireNav,
    buildTicker,
  };
})();

document.addEventListener("DOMContentLoaded", APIRender.wireNav);
