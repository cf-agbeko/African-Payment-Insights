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
