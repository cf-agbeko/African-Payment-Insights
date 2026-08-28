/* =========================================================
   AFRICAN PAYMENTS INSIGHTS — ADMIN AUTH (CLIENT-SIDE GATE)

   IMPORTANT / READ THIS:
   This site has no server, so there is no real backend to hold
   a password check. What you get here is a convenience lock:
   sessionStorage remembers that someone typed the right
   passphrase for this browser tab session, and every admin
   page checks that flag before showing anything.

   This stops a casual visitor from clicking into /admin and
   editing content, but the passphrase check happens in code
   the browser can read, so it is NOT secure against a
   determined visitor who opens dev tools. If this site goes
   fully public, replace this file with real server-side auth
   (a login endpoint + session cookie/JWT) before treating the
   admin area as trusted.
   ========================================================= */

const APIAuth = (function () {
  const SESSION_KEY = "api_admin_session";
  // Default passphrase — change this before sharing the site.
  const PASSPHRASE = "APInsights2026!";

  function login(input) {
    if (input === PASSPHRASE) {
      sessionStorage.setItem(SESSION_KEY, "true");
      return true;
    }
    return false;
  }

  function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function requireLogin(redirectTo) {
    if (!isLoggedIn()) {
      window.location.href = redirectTo || "login.html";
    }
  }

  return { login, isLoggedIn, logout, requireLogin };
})();
