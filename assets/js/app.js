/*
 * Render principal de la aplicacion.
 * Convierte los datos y rutas JavaScript en vistas HTML.
 */
const app = document.getElementById("app");

function renderApp() {
  const path = window.AppRouter.getCurrentPath();

  if (path === "/") {
    renderHome();
    return;
  }

  const route = window.MUSEUM_DATA.routes[path];

  if (!route) {
    renderNotFound(path);
    return;
  }

  renderRoom(route);
}

function renderHome() {
  app.innerHTML = `
    <section class="hero-panel">
      <p class="eyebrow">Wiki museo 1113</p>
      <h1>Explora autos, motos y aviones por salas.</h1>
      <p>Proyecto hecho con HTML, CSS y JavaScript. Las rutas funcionan desde JavaScript usando hash.</p>
    </section>

    ${window.MUSEUM_DATA.sections.map(renderSection).join("")}
  `;
}

function renderSection(section) {
  return `
    <section class="museum-section" id="${section.id}">
      <div class="section-heading">
        <p class="eyebrow">${section.title}</p>
        <h2>${section.description}</h2>
      </div>
      <div class="route-grid">
        ${section.routes.map(renderRouteCard).join("")}
      </div>
    </section>
  `;
}

function renderRouteCard(route) {
  return `
    <a class="route-card" href="#${route.path}">
      <span>Sala</span>
      <strong>${route.label}</strong>
    </a>
  `;
}

function renderRoom(route) {
  app.innerHTML = `
    <section class="room-header ${route.area.toLowerCase()}">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">${route.area}</p>
      <h1>${route.title}</h1>
      <p>${route.description}</p>
      <small>Carpeta de imagenes: ${route.folder}</small>
    </section>

    <section class="vehicle-section">
      <div class="section-heading">
        <p class="eyebrow">Registrados</p>
        <h2>${route.items.length === 0 ? "Sala preparada" : "Piezas de la sala"}</h2>
      </div>
      ${
        route.items.length === 0
          ? `<p class="empty-state">Todavia no hay elementos registrados. Agrega imagenes en <strong>${route.folder}</strong> y despues crea una tarjeta en <strong>assets/js/data.js</strong>.</p>`
          : `<div class="vehicle-grid">${route.items.map(renderVehicleCard).join("")}</div>`
      }
    </section>
  `;
}

function renderVehicleCard(item) {
  return `
    <article class="vehicle-card">
      <div class="image-frame">
        <img src="${item.image}" alt="${item.name}" onerror="this.remove(); this.parentElement.classList.add('missing-image'); this.parentElement.innerHTML='Imagen pendiente';" />
      </div>
      <div class="vehicle-info">
        <h3>${item.name}</h3>
        <p><strong>Tipo:</strong> ${item.type}</p>
        <p><strong>Anio:</strong> ${item.year}</p>
        <p><strong>Detalle:</strong> ${item.detail}</p>
      </div>
    </article>
  `;
}

function renderNotFound(path) {
  app.innerHTML = `
    <section class="hero-panel">
      <p class="eyebrow">Ruta no encontrada</p>
      <h1>No existe la ruta ${path}</h1>
      <p>Regresa al inicio y selecciona una sala disponible.</p>
      <a class="back-link dark" href="#/">Regresar</a>
    </section>
  `;
}

window.AppRouter.onChange(renderApp);
renderApp();
