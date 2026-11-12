/* =========================================================
   MOVEEASE - RTL, DARK MODE, MOBILE MENU, CONTACT FORM
========================================================= */

const root = document.documentElement;
const body = document.body;

const rtlBtn = document.getElementById("rtlMode");
const themeBtn = document.getElementById("themeBtn");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

/* ---------- safe localStorage ---------- */
function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
}
function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

/* ---------- RTL / LTR ---------- */
function setDirection(dir) {
    root.setAttribute("dir", dir);                 // CSS html[dir="rtl"] work avuthundi
    if (rtlBtn) {
        rtlBtn.textContent = dir === "rtl" ? "LTR" : "RTL";
        rtlBtn.title = dir === "rtl" ? "Switch to LTR" : "Switch to RTL";
    }
    save("direction", dir);
}

if (rtlBtn) rtlBtn.addEventListener("click", () => {
    setDirection(root.getAttribute("dir") === "rtl" ? "ltr" : "rtl");
});

/* ---------- Dark mode ---------- */
function setTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);
    if (themeBtn) {
        themeBtn.innerHTML = isDark
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon"></i>';
        themeBtn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
    save("theme", isDark ? "dark" : "light");
}

if (themeBtn) themeBtn.addEventListener("click", () => {
    setTheme(!body.classList.contains("dark-mode"));
});

/* ---------- Mobile menu ---------- */
function setMenu(open) {
    if (!navbar || !menuToggle) return;
    navbar.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
}

if (menuToggle && navbar) menuToggle.addEventListener("click", () => {
    setMenu(!navbar.classList.contains("active"));
});

/* Home dropdown: on mobile the first tap opens the sub-menu, links close the menu */
const homeDropdown = document.getElementById("homeDropdown");
const isMobileMenu = () => window.matchMedia("(max-width: 850px)").matches;

if (homeDropdown) {
    const dropToggle = homeDropdown.querySelector(".dropdown-toggle");

    dropToggle.addEventListener("click", (e) => {
        if (isMobileMenu()) {
            e.preventDefault();
            const open = homeDropdown.classList.toggle("open");
            dropToggle.setAttribute("aria-expanded", String(open));
        }
    });

    homeDropdown.querySelectorAll(".dropdown-menu a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });
}

if (navbar) navbar.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

/* close the mobile menu with Escape or a tap outside it */
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => {
    if (navbar && navbar.classList.contains("active") && !navbar.contains(e.target) && !(menuToggle && menuToggle.contains(e.target))) setMenu(false);
});

window.addEventListener("resize", () => {
    if (!isMobileMenu()) {
        setMenu(false);
        if (homeDropdown) homeDropdown.classList.remove("open");
    }
});

/* ---------- Contact form ---------- */
const contactForm = document.getElementById("moveEaseContactForm");
const contactSuccess = document.getElementById("meContactSuccess");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();                        // page reload avvakunda
        contactSuccess.hidden = false;
        contactForm.reset();
        setTimeout(() => { contactSuccess.hidden = true; }, 6000);
    });
}

/* ---------- Restore saved settings on page load ---------- */
setDirection(load("direction") === "rtl" ? "rtl" : "ltr");
setTheme(load("theme") === "dark");