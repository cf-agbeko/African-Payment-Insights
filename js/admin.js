/* =========================================================
   AFRICAN PAYMENTS INSIGHTS — ADMIN DASHBOARD LOGIC
   Handles both content types: Articles (long-form) and
   Posts (short-form, LinkedIn-style updates).
   ========================================================= */

APIAuth.requireLogin("login.html");

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/* =====================================================
   ARTICLES
   ===================================================== */

const form = document.getElementById("article-form");
const idField = document.getElementById("article-id");
const titleField = document.getElementById("title");
const categoryField = document.getElementById("category");
const authorField = document.getElementById("author");
const dateField = document.getElementById("date");
const readTimeField = document.getElementById("readTime");
const excerptField = document.getElementById("excerpt");
const bodyField = document.getElementById("body");
const featuredField = document.getElementById("featured");
const formTitle = document.getElementById("form-title");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const statusBanner = document.getElementById("status-banner");
const listWrap = document.getElementById("admin-list");
const countLabel = document.getElementById("article-count");

function populateCategories() {
  categoryField.innerHTML = APIStore.CATEGORIES.map(
    (c) => `<option value="${c.slug}">${c.icon} ${c.label}</option>`
  ).join("");
}

function showStatus(message) {
  statusBanner.textContent = message;
  statusBanner.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => { statusBanner.hidden = true; }, 3500);
}

function resetForm() {
  form.reset();
  idField.value = "";
  dateField.value = todayISO();
  authorField.value = "Editorial Team";
  readTimeField.value = 5;
  formTitle.textContent = "Publish a new article";
  form.querySelector('button[type="submit"]').textContent = "Publish article";
  cancelEditBtn.hidden = true;
}

function renderList() {
  const articles = APIStore.getAll();
  countLabel.textContent = `${articles.length} article${articles.length === 1 ? "" : "s"} published`;

  if (!articles.length) {
    listWrap.innerHTML = `<div class="empty-state">Nothing published yet. Use the form to add your first article.</div>`;
    return;
  }

  listWrap.innerHTML = articles
    .map(
      (a) => `
      <div class="admin-list-item">
        <div>
          <h3>${a.featured ? "⭐ " : ""}${APIRender.escapeHtml(a.title)}</h3>
          <div class="admin-meta">${APIStore.categoryLabel(a.category)} &middot; ${APIRender.formatDate(a.date)} &middot; ${a.readTime} min</div>
        </div>
        <div class="admin-list-actions">
          <button class="edit-btn" data-id="${a.id}">Edit</button>
          <button class="delete-btn" data-id="${a.id}">Delete</button>
        </div>
      </div>`
    )
    .join("");

  listWrap.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => loadArticleIntoForm(btn.dataset.id));
  });
  listWrap.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const article = APIStore.getById(btn.dataset.id);
      if (confirm(`Delete "${article.title}"? This can't be undone.`)) {
        APIStore.remove(btn.dataset.id);
        showStatus("Article deleted.");
        renderList();
        if (idField.value === btn.dataset.id) resetForm();
      }
    });
  });
}

function loadArticleIntoForm(id) {
  const a = APIStore.getById(id);
  if (!a) return;
  idField.value = a.id;
  titleField.value = a.title;
  categoryField.value = a.category;
  authorField.value = a.author;
  dateField.value = a.date;
  readTimeField.value = a.readTime;
  excerptField.value = a.excerpt;
  bodyField.value = a.body;
  featuredField.checked = !!a.featured;
  formTitle.textContent = "Editing: " + a.title;
  form.querySelector('button[type="submit"]').textContent = "Save changes";
  cancelEditBtn.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const article = {
    id: idField.value || undefined,
    title: titleField.value.trim(),
    category: categoryField.value,
    author: authorField.value.trim(),
    date: dateField.value.trim() || todayISO(),
    readTime: parseInt(readTimeField.value, 10) || 5,
    excerpt: excerptField.value.trim(),
    body: bodyField.value,
    featured: featuredField.checked,
  };
  const wasEdit = !!idField.value;
  APIStore.save(article);
  showStatus(wasEdit ? "Changes saved." : "Article published.");
  resetForm();
  renderList();
});

cancelEditBtn.addEventListener("click", resetForm);

/* =====================================================
   POSTS
   ===================================================== */

const postForm = document.getElementById("post-form");
const postIdField = document.getElementById("post-id");
const postAuthorField = document.getElementById("post-author");
const postRoleField = document.getElementById("post-role");
const postDateField = document.getElementById("post-date");
const postBodyField = document.getElementById("post-body");
const postSourceUrlField = document.getElementById("post-source-url");
const postSourceLabelField = document.getElementById("post-source-label");
const postFormTitle = document.getElementById("post-form-title");
const cancelPostEditBtn = document.getElementById("cancel-post-edit-btn");
const postListWrap = document.getElementById("admin-post-list");
const postCountLabel = document.getElementById("post-count");

function resetPostForm() {
  postForm.reset();
  postIdField.value = "";
  postDateField.value = todayISO();
  postAuthorField.value = "African Payments Insights";
  postRoleField.value = "Editorial Team";
  postFormTitle.textContent = "Publish a new post";
  postForm.querySelector('button[type="submit"]').textContent = "Publish post";
  cancelPostEditBtn.hidden = true;
}

function renderPostList() {
  const posts = APIStore.getAllPosts();
  postCountLabel.textContent = `${posts.length} post${posts.length === 1 ? "" : "s"} published`;

  if (!posts.length) {
    postListWrap.innerHTML = `<div class="empty-state">Nothing published yet. Use the form to add your first post.</div>`;
    return;
  }

  postListWrap.innerHTML = posts
    .map(
      (p) => `
      <div class="admin-list-item">
        <div>
          <h3>${APIRender.escapeHtml(p.authorName)}</h3>
          <div class="admin-meta">${APIRender.formatDate(p.date)}${p.sourceUrl ? " &middot; links out" : ""}</div>
        </div>
        <div class="admin-list-actions">
          <button class="edit-btn" data-id="${p.id}">Edit</button>
          <button class="delete-btn" data-id="${p.id}">Delete</button>
        </div>
      </div>`
    )
    .join("");

  postListWrap.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => loadPostIntoForm(btn.dataset.id));
  });
  postListWrap.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const post = APIStore.getPostById(btn.dataset.id);
      if (confirm(`Delete this post from ${post.authorName}? This can't be undone.`)) {
        APIStore.removePost(btn.dataset.id);
        showStatus("Post deleted.");
        renderPostList();
        if (postIdField.value === btn.dataset.id) resetPostForm();
      }
    });
  });
}

function loadPostIntoForm(id) {
  const p = APIStore.getPostById(id);
  if (!p) return;
  postIdField.value = p.id;
  postAuthorField.value = p.authorName;
  postRoleField.value = p.authorRole || "";
  postDateField.value = p.date;
  postBodyField.value = p.body;
  postSourceUrlField.value = p.sourceUrl || "";
  postSourceLabelField.value = p.sourceLabel || "";
  postFormTitle.textContent = "Editing post from " + p.authorName;
  postForm.querySelector('button[type="submit"]').textContent = "Save changes";
  cancelPostEditBtn.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const post = {
    id: postIdField.value || undefined,
    authorName: postAuthorField.value.trim(),
    authorRole: postRoleField.value.trim(),
    date: postDateField.value.trim() || todayISO(),
    body: postBodyField.value.trim(),
    sourceUrl: postSourceUrlField.value.trim(),
    sourceLabel: postSourceLabelField.value.trim(),
  };
  const wasEdit = !!postIdField.value;
  APIStore.savePost(post);
  showStatus(wasEdit ? "Post changes saved." : "Post published.");
  resetPostForm();
  renderPostList();
});

cancelPostEditBtn.addEventListener("click", resetPostForm);

/* =====================================================
   SHARED
   ===================================================== */

document.getElementById("logout-btn").addEventListener("click", () => {
  APIAuth.logout();
  window.location.href = "login.html";
});

populateCategories();
resetForm();
renderList();
resetPostForm();
renderPostList();
