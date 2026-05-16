/*
 * Router de hash.
 * Permite usar rutas como #/autos/deportivos sin servidor backend.
 */
window.AppRouter = {
  getCurrentPath() {
    const hash = window.location.hash.replace("#", "");
    return hash || "/";
  },

  navigate(path) {
    window.location.hash = path;
  },

  onChange(callback) {
    window.addEventListener("hashchange", callback);
  }
};
