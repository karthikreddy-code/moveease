/* =========================================================
   MOVEEASE - AUTH + SESSION (shared by every page)
   - register / login for Customer and Owner
   - role based redirect to the right dashboard
   - route guard for the dashboards
   - navbar sync (Dashboard link, user chip, Logout)

   NOTE: There is no server yet, so accounts live in this browser
   (localStorage). Passwords are salted + hashed (SHA-256), never
   stored as plain text. To go live, replace the three functions
   marked "BACKEND" with fetch() calls to your API and keep the rest.
========================================================= */
(function () {
    "use strict";

    var USERS_KEY = "moveeaseUsers";
    var SESSION_KEY = "moveeaseSession";
    var LOCK_KEY = "moveeaseLock";
    var SESSION_HOURS = 12;          // normal login
    var REMEMBER_DAYS = 30;          // "Remember me"
    var MAX_TRIES = 5, LOCK_SECONDS = 60;

    var DASH = { customer: "customer-dashboard.html", owner: "dashboard.html" };

    /* demo accounts so the portals can be tried before a backend exists */
    var DEMO = {
        customer: { name: "Priya Sharma", email: "demo@moveease.com", phone: "9876543210", password: "Customer@123" },
        owner: { name: "Rajesh Kumar", email: "owner@moveease.com", phone: "9876500000", password: "Owner@123", code: "MOVE2026", bizName: "MoveEase Packers & Movers", bizLoc: "Bengaluru" }
    };

    /* ---------- safe storage ---------- */
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
    function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
    function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
    function ssDel(k) { try { sessionStorage.removeItem(k); } catch (e) {} }
    function readJSON(s, fallback) { try { var v = JSON.parse(s); return v == null ? fallback : v; } catch (e) { return fallback; } }

    /* ---------- helpers ---------- */
    function normEmail(v) { return String(v || "").trim().toLowerCase(); }
    function normPhone(v) { var d = String(v || "").replace(/\D/g, ""); return d.length > 10 ? d.slice(-10) : d; }
    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function rand(n) {
        var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", out = "";
        try { var a = new Uint32Array(n); crypto.getRandomValues(a); for (var i = 0; i < n; i++) out += chars[a[i] % chars.length]; }
        catch (e) { for (var j = 0; j < n; j++) out += chars[Math.floor(Math.random() * chars.length)]; }
        return out;
    }
    function initials(name) {
        var p = String(name || "").trim().split(/\s+/).filter(Boolean);
        return ((p[0] || "U")[0] + (p[1] ? p[1][0] : "")).toUpperCase();
    }
    function firstName(name) { return String(name || "").trim().split(/\s+/)[0] || "there"; }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

    /* SHA-256 with a fallback for very old browsers */
    function hash(text) {
        if (window.crypto && crypto.subtle && window.TextEncoder) {
            return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
                return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
            });
        }
        var h = 5381; for (var i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
        return Promise.resolve("f" + (h >>> 0).toString(16));
    }
    function hashPw(pw, salt) { return hash(salt + "::" + pw); }

    /* ---------- users store (BACKEND: replace with API) ---------- */
    function getUsers() { return readJSON(lsGet(USERS_KEY), []); }
    function setUsers(list) { lsSet(USERS_KEY, JSON.stringify(list)); }

    function seedDemo() {
        var users = getUsers(), changed = false, jobs = [];
        ["customer", "owner"].forEach(function (role) {
            var d = DEMO[role];
            if (users.some(function (u) { return u.demo && u.role === role; })) return;
            var salt = rand(10);
            jobs.push(hashPw(d.password, salt).then(function (pwHash) {
                users.push({ id: "demo-" + role, demo: true, role: role, name: d.name, email: d.email, phone: d.phone, salt: salt, pwHash: pwHash, code: d.code || "", bizName: d.bizName || "", bizLoc: d.bizLoc || "", created: Date.now() });
                changed = true;
            }));
        });
        return Promise.all(jobs).then(function () { if (changed) setUsers(users); });
    }

    /* ---------- session ---------- */
    function readSession() {
        var raw = ssGet(SESSION_KEY) || lsGet(SESSION_KEY);
        var s = readJSON(raw, null);
        if (!s || !s.uid || !DASH[s.role]) return null;
        if (s.exp && Date.now() > s.exp) { clearSession(); return null; }
        return s;
    }
    function writeSession(user, remember) {
        var s = { uid: user.id, role: user.role, name: user.name, email: user.email, remember: !!remember, at: Date.now(), exp: Date.now() + (remember ? REMEMBER_DAYS * 864e5 : SESSION_HOURS * 36e5) };
        clearSession();
        if (remember) lsSet(SESSION_KEY, JSON.stringify(s)); else ssSet(SESSION_KEY, JSON.stringify(s));
        return s;
    }
    function clearSession() { ssDel(SESSION_KEY); lsDel(SESSION_KEY); }

    /* ---------- brute-force throttle ---------- */
    function lockState() { var l = readJSON(lsGet(LOCK_KEY), { n: 0, until: 0 }); return l; }
    function lockLeft() { var l = lockState(); return Math.max(0, Math.ceil((l.until - Date.now()) / 1000)); }
    function registerFail() {
        var l = lockState(); l.n = (l.n || 0) + 1;
        if (l.n >= MAX_TRIES) { l.until = Date.now() + LOCK_SECONDS * 1000; l.n = 0; }
        lsSet(LOCK_KEY, JSON.stringify(l));
    }
    function resetFails() { lsDel(LOCK_KEY); }

    /* ---------- public actions ---------- */
    function register(data) {                                   // BACKEND: POST /api/register
        var role = data.role === "owner" ? "owner" : "customer";
        var email = normEmail(data.email), phone = normPhone(data.phone);
        return seedDemo().then(function () {
            var users = getUsers();
            if (users.some(function (u) { return u.role === role && u.email === email; })) return { ok: false, field: "regEmail", error: "An account with this email already exists. Please login." };
            if (users.some(function (u) { return u.role === role && u.phone === phone; })) return { ok: false, field: "regPhone", error: "An account with this phone number already exists." };
            var salt = rand(10);
            return hashPw(data.password, salt).then(function (pwHash) {
                var user = {
                    id: role[0] + "-" + Date.now().toString(36) + rand(4), role: role, name: String(data.name).trim(), email: email, phone: phone,
                    salt: salt, pwHash: pwHash, code: role === "owner" ? "ME" + rand(6) : "", bizName: role === "owner" ? String(data.bizName || "").trim() : "", bizLoc: role === "owner" ? String(data.bizLoc || "").trim() : "", created: Date.now()
                };
                users.push(user); setUsers(users);
                return { ok: true, user: user, code: user.code };
            });
        });
    }

    function login(data) {                                      // BACKEND: POST /api/login
        var role = data.role === "owner" ? "owner" : "customer";
        var wait = lockLeft();
        if (wait) return Promise.resolve({ ok: false, error: "Too many attempts. Try again in " + wait + " seconds." });
        var id = String(data.id || "").trim(), email = normEmail(id), phone = normPhone(id);
        return seedDemo().then(function () {
            var user = getUsers().filter(function (u) {
                if (u.role !== role) return false;
                return isEmail(email) ? u.email === email : (phone.length === 10 && u.phone === phone);
            })[0];
            var bad = { ok: false, error: "Incorrect login details. Please check and try again." };
            if (!user) { registerFail(); return bad; }
            return hashPw(data.password, user.salt).then(function (h) {
                var codeOk = role !== "owner" || String(data.code || "").trim().toUpperCase() === String(user.code).toUpperCase();
                if (h !== user.pwHash || !codeOk) { registerFail(); return bad; }
                resetFails();
                writeSession(user, data.remember);
                return { ok: true, user: user, redirect: DASH[role] };
            });
        });
    }

    function logout(redirect) {
        var s = readSession();
        clearSession();
        if (redirect !== false) location.replace(typeof redirect === "string" ? redirect : "login.html" + (s && s.role === "owner" ? "#owner" : "#customer"));
    }

    function safeNext(role) {
        /* ?next=customer-dashboard.html#book  (same-site .html files only) */
        var m = /[?&]next=([^&#]+)/.exec(location.search);
        if (!m) return null;
        var n = decodeURIComponent(m[1]);
        return /^[a-z0-9\-]+\.html$/i.test(n) && n === DASH[role] ? n : null;
    }

    /* Guard for dashboard pages: call as early as possible in <head> */
    function guard(role, opts) {
        opts = opts || {};
        var s = readSession(), ok = s && (s.role === role || (opts.ownerPreview && s.role === "owner"));
        if (ok) return s;
        var page = location.pathname.split("/").pop() || "";
        if (s && s.role !== role) { location.replace(DASH[s.role]); }      // wrong portal -> own dashboard
        else { location.replace("login.html?next=" + encodeURIComponent(page) + "#" + role); }
        document.documentElement.style.visibility = "hidden";
        return null;
    }

    /* ---------- navbar sync ---------- */
    var CSS = ".header-actions{flex-shrink:0}" +
        ".user-menu{position:relative;flex-shrink:0}" +
        ".um-btn{display:inline-flex;align-items:center;gap:10px;height:46px;padding:4px 14px 4px 4px;border:1px solid var(--primary,#f36b21);border-radius:50px;background:var(--surface,#fff);color:var(--heading,var(--ink,#092638));font-family:inherit;cursor:pointer;transition:.25s}" +
        ".um-btn:hover,.um-btn[aria-expanded=true]{background:var(--primary-soft,#fff2e9)}" +
        ".um-btn:focus-visible{outline:3px solid var(--primary,#f36b21);outline-offset:3px}" +
        ".um-av{width:36px;height:36px;display:grid;place-items:center;flex-shrink:0;border-radius:50%;background:var(--primary,#f36b21);color:#fff;font-size:13px;font-weight:800}" +
        ".um-t{display:grid;text-align:start;line-height:1.15} .um-t b{font-size:14px;font-weight:700;max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .um-t small{font-size:10.5px;font-weight:600;color:var(--muted,#536575)}" +
        ".um-btn .um-caret{font-size:11px;transition:transform .25s} .um-btn[aria-expanded=true] .um-caret{transform:rotate(180deg)}" +
        ".um-pop{display:none;position:absolute;top:calc(100% + 10px);inset-inline-end:0;z-index:2000;width:250px;max-width:calc(100vw - 24px);padding:8px;background:var(--surface,#fff);border:1.5px solid var(--primary,#f36b21);border-radius:14px;box-shadow:0 16px 36px var(--shadow,rgba(0,0,0,.18))}" +
        ".um-pop.open{display:block;animation:umIn .18s ease-out}" +
        "@keyframes umIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}" +
        ".um-head{display:flex;align-items:center;gap:12px;padding:10px 10px 12px;margin-bottom:6px;border-bottom:1px solid var(--border,#e1e1e1)}" +
        ".um-head > div{min-width:0} .um-head b{display:block;font-size:14px;color:var(--heading,#092638);overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .um-head small{display:block;font-size:12px;color:var(--muted,#536575);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
        ".um-pop a,.um-pop button.um-item{display:flex;align-items:center;gap:10px;width:100%;padding:11px 12px;border:none;border-radius:9px;background:transparent;color:var(--text,#263746);font:600 14px inherit;font-family:inherit;text-align:start;cursor:pointer;transition:.2s}" +
        ".um-pop a:hover,.um-pop button.um-item:hover{background:var(--primary-soft,#fff2e9);color:var(--primary,#f36b21)} .um-pop i{font-size:16px;width:18px;text-align:center}" +
        ".um-pop button.um-out{color:#d93025} .um-pop button.um-out:hover{background:rgba(217,48,37,.1);color:#d93025}" +
        "@media (max-width:1100px){.um-t,.um-caret{display:none}.um-btn{padding:4px;gap:0;height:44px;width:44px;justify-content:center}.um-av{width:34px;height:34px}}" +
        "@media (max-width:380px){.um-pop{position:fixed;top:auto;inset-inline:12px;width:auto;max-width:none}}";

    function syncNav() {
        var s = readSession();
        if (!document.getElementById("meAuthCss")) { var st = document.createElement("style"); st.id = "meAuthCss"; st.textContent = CSS; document.head.appendChild(st); }

        /* "Dashboard" nav link -> the correct dashboard, or login */
        document.querySelectorAll('.navbar a.nav-link[href="login.html"], .navbar a.nav-link[href="dashboard.html"], .navbar a.nav-link[href="customer-dashboard.html"], .navbar a.nav-link[data-dash]').forEach(function (a) {
            a.setAttribute("data-dash", ""); a.href = s ? DASH[s.role] : "login.html";
        });

        /* Login button -> one compact user menu (Dashboard + Logout) */
        var actions = document.querySelector(".header-actions");
        if (!actions) return;
        var menu = actions.querySelector(".user-menu"), login = actions.querySelector("a.book-btn[href='login.html'], a.book-btn[data-login]");
        actions.querySelectorAll(".user-chip, [data-logout-nav]").forEach(function (n) { n.remove(); });   // old markup
        if (!s) { if (login) login.style.display = ""; if (menu) menu.remove(); return; }

        if (login) { login.style.display = "none"; login.setAttribute("data-login", ""); }
        if (!menu) { menu = document.createElement("div"); menu.className = "user-menu"; actions.appendChild(menu); }
        var roleTxt = s.role === "owner" ? "Owner" : "Customer";
        menu.innerHTML =
            '<button type="button" class="um-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Account menu for ' + esc(s.name) + '">' +
                '<span class="um-av">' + esc(initials(s.name)) + '</span>' +
                '<span class="um-t"><b>' + esc(firstName(s.name)) + '</b><small>' + roleTxt + '</small></span>' +
                '<i class="bi bi-chevron-down um-caret"></i></button>' +
            '<div class="um-pop" role="menu">' +
                '<div class="um-head"><span class="um-av">' + esc(initials(s.name)) + '</span><div><b>' + esc(s.name) + '</b><small>' + esc(s.email || roleTxt) + '</small></div></div>' +
                '<a href="' + DASH[s.role] + '" role="menuitem"><i class="bi bi-grid-1x2"></i> My Dashboard</a>' +
                '<button type="button" class="um-item um-out" role="menuitem" data-logout><i class="bi bi-box-arrow-right"></i> Logout</button>' +
            '</div>';
    }

    /* user menu open / close */
    function closeMenus(focus) {
        document.querySelectorAll(".um-pop.open").forEach(function (p) {
            p.classList.remove("open");
            var b = p.parentNode.querySelector(".um-btn"); if (b) { b.setAttribute("aria-expanded", "false"); if (focus) b.focus(); }
        });
    }
    document.addEventListener("click", function (e) {
        var btn = e.target.closest && e.target.closest(".um-btn");
        if (btn) {
            var pop = btn.parentNode.querySelector(".um-pop"), open = !pop.classList.contains("open");
            closeMenus(); if (open) { pop.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
            return;
        }
        if (!(e.target.closest && e.target.closest(".um-pop"))) closeMenus();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenus(true); });

    /* every [data-logout] element logs out */
    document.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest("[data-logout]");
        if (b) { e.preventDefault(); logout(); }
    });

    /* logging in/out in another tab updates this one */
    window.addEventListener("storage", function (e) {
        if (e.key !== SESSION_KEY) return;
        var guarded = document.documentElement.hasAttribute("data-guard");
        if (guarded && !readSession()) location.replace("login.html");
        else syncNav();
    });
    /* back/forward cache: re-check after returning to a page */
    window.addEventListener("pageshow", function (e) {
        if (e.persisted) { if (document.documentElement.hasAttribute("data-guard") && !readSession()) location.replace("login.html"); else syncNav(); }
    });

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", syncNav); else syncNav();

    window.MoveEaseAuth = {
        DASH: DASH, DEMO: DEMO, register: register, login: login, logout: logout, guard: guard, current: readSession,
        dashboardFor: function (role) { return DASH[role] || "login.html"; }, safeNext: safeNext, syncNav: syncNav,
        lockLeft: lockLeft, initials: initials, firstName: firstName, seedDemo: seedDemo
    };
})(); 