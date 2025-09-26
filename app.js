// 1. Route definitions (hash-based)
const routes = {
  "":          "pages/home/home.html",
  "blog":      "pages/blog/blog.html",
  "services":  "pages/services/services.html",
  "about":     "pages/about/about.html"
};

// 2. Grab content container and nav elements
const contentEl = document.querySelector(".content");
const navItems  = document.querySelectorAll(".navBar ul li");
const navBar    = document.querySelector(".navBar");
const hamburger = document.querySelector(".hamburger");

// 3. Load & inject page HTML + swap CSS
async function loadPage(routeKey) {
  const page      = routeKey === "" ? "home" : routeKey;
  const htmlFile  = routes[routeKey] || routes[""];
  const cssLinkEl = document.getElementById("page-css");
  const newHref   = `pages/${page}/${page}.css`;

  // Only swap CSS if it's different
  if (!cssLinkEl.href.endsWith(newHref)) {
    cssLinkEl.href = newHref;
  }

  contentEl.innerHTML = "<p>Loading…</p>";

  try {
    const res = await fetch(htmlFile);
    if (!res.ok) throw new Error();
    contentEl.innerHTML = await res.text();
  } catch {
    contentEl.innerHTML = "<h2>404 — Page not found</h2>";
  }
}

// 4. Router logic (reads hash)
function router() {
  const hash = location.hash.slice(1); // remove "#"
  loadPage(hash);
  setActiveNav(hash);
}

// 5. Highlight active menu item
function setActiveNav(routeKey) {
  navItems.forEach(li => {
    const key = li.textContent.trim().toLowerCase();
    const match = routeKey === "" && key === "home" ? true : routeKey === key;
    li.classList.toggle("active", match);
  });
}

// 6. Attach click events to nav items
navItems.forEach(li => {
  li.style.cursor = "pointer";
  li.addEventListener("click", () => {
    const key = li.textContent.trim().toLowerCase();
    const targetHash = key === "home" ? "" : key;
    location.hash = `#${targetHash}`;

    // close hamburger menu if open
    hamburger.setAttribute("aria-expanded", "false");
    navBar.classList.remove("open");
  });
});

// 7. Handle hash changes
window.addEventListener("hashchange", router);

// 8. Hamburger toggle
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  navBar.classList.toggle("open");
});

// 9. Initial load
document.addEventListener("DOMContentLoaded", router);
