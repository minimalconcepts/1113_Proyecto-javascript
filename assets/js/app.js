/*
 * Render principal de la aplicacion.
 * Convierte datos, rutas JavaScript, favoritos, randomizador y pilotos en vistas HTML.
 */
const app = document.getElementById("app");
const FAVORITES_KEY = "carDealerMuseumFavorites";
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("main-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function renderApp() {
  const path = window.AppRouter.getCurrentPath();

  if (path === "/") {
    renderHome();
    return;
  }

  if (path === "/favoritos") {
    renderFavorites();
    return;
  }

  if (path === "/random") {
    renderRandomizer();
    return;
  }

  if (path === "/pilotos") {
    renderPilots();
    return;
  }

  if (path.startsWith("/wiki/")) {
    renderWikiDetail(path);
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
      <div class="quick-actions">
        <a class="action-card" href="#/random"><span>Descubrir</span><strong>Randomizador</strong></a>
        <a class="action-card" href="#/favoritos"><span>Guardar</span><strong>Favoritos</strong></a>
        <a class="action-card" href="#/pilotos"><span>Historia</span><strong>Pilotos famosos</strong></a>
      </div>
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
          : `<div class="vehicle-grid">${route.items.map((item) => renderVehicleCard(item)).join("")}</div>`
      }
    </section>
  `;
}

function renderVehicleCard(item) {
  const slug = createSlug(item.name);
  const favorite = isFavorite(slug);

  return `
    <article class="vehicle-card">
      <button class="favorite-button ${favorite ? "is-active" : ""}" type="button" onclick="toggleFavorite('${slug}')" aria-label="Agregar o quitar favorito">
        ${favorite ? "Favorito" : "Favorito"}
      </button>
      <a class="vehicle-link" href="#/wiki/${slug}" aria-label="Abrir historia de ${item.name}">
        <div class="image-frame">
          <img src="${item.image}" alt="${item.name}" onerror="this.remove(); this.parentElement.classList.add('missing-image'); this.parentElement.innerHTML='Imagen pendiente';" />
        </div>
        <div class="vehicle-info">
          <h3>${item.name}</h3>
          <p><strong>Tipo:</strong> ${item.type}</p>
          <p><strong>Anio:</strong> ${item.year}</p>
          <p><strong>Detalle:</strong> ${item.detail}</p>
        </div>
      </a>
    </article>
  `;
}

function renderWikiDetail(path) {
  const slug = path.replace("/wiki/", "");
  const result = findItemBySlug(slug);

  if (!result) {
    renderNotFound(path);
    return;
  }

  const { item, roomPath, route } = result;
  const favorite = isFavorite(slug);

  app.innerHTML = `
    <article class="wiki-entry">
      <div class="detail-actions">
        <a class="back-link dark" href="#${roomPath}">Regresar a ${route.title}</a>
        <button class="favorite-button detail ${favorite ? "is-active" : ""}" type="button" onclick="toggleFavorite('${slug}')">
          ${favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>

      <header class="wiki-title">
        <p class="eyebrow">${route.area}</p>
        <h1>${item.name}</h1>
        <p>${item.type} - ${item.year}</p>
      </header>

      <div class="wiki-layout">
        <aside class="wiki-media">
          <div class="image-frame large">
            <img src="${item.image}" alt="${item.name}" onerror="this.remove(); this.parentElement.classList.add('missing-image'); this.parentElement.innerHTML='Imagen pendiente';" />
          </div>
          <dl class="fact-list">
            <div><dt>Tipo</dt><dd>${item.type}</dd></div>
            <div><dt>Anio</dt><dd>${item.year}</dd></div>
            <div><dt>Detalle</dt><dd>${item.detail}</dd></div>
            <div><dt>Sala</dt><dd>${route.title}</dd></div>
          </dl>
        </aside>

        <section class="wiki-content">
          <h2>Historia</h2>
          <p>${item.history || "Aqui pueden escribir la historia del vehiculo: origen, marca, importancia, tecnologia, competiciones, curiosidades y por que pertenece a esta sala."}</p>

          <h2>Para aprender</h2>
          <ul>
            <li>Identifica a que categoria pertenece.</li>
            <li>Compara su epoca con otras piezas de la sala.</li>
            <li>Agrega datos historicos o tecnicos en assets/js/data.js.</li>
          </ul>
        </section>
      </div>
    </article>
  `;
}

function renderFavorites() {
  const favoriteSlugs = getFavorites();
  const favoriteItems = getAllItems().filter((entry) => favoriteSlugs.includes(entry.slug));

  app.innerHTML = `
    <section class="room-header">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">Coleccion personal</p>
      <h1>Favoritos</h1>
      <p>Aqui aparecen las piezas que marcaste para estudiar despues.</p>
    </section>

    ${
      favoriteItems.length === 0
        ? `<p class="empty-state">Todavia no tienes favoritos. Entra a una sala y presiona el boton Favorito en una tarjeta.</p>`
        : `<div class="vehicle-grid">${favoriteItems.map((entry) => renderVehicleCard(entry.item)).join("")}</div>`
    }
  `;
}

function renderRandomizer() {
  const items = getAllItems();
  const randomEntry = items[Math.floor(Math.random() * items.length)];

  if (!randomEntry) {
    app.innerHTML = `<p class="empty-state">Todavia no hay piezas para randomizar.</p>`;
    return;
  }

  app.innerHTML = `
    <section class="room-header">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">Aprender algo nuevo</p>
      <h1>Randomizador</h1>
      <p>La app eligio una pieza al azar para que la conozcas.</p>
    </section>

    <div class="random-layout">
      ${renderVehicleCard(randomEntry.item)}
      <div class="random-panel">
        <h2>${randomEntry.item.name}</h2>
        <p>Categoria: ${randomEntry.route.title}</p>
        <a class="primary-button" href="#/wiki/${randomEntry.slug}">Leer historia</a>
        <button class="secondary-button" type="button" onclick="renderRandomizer()">Elegir otra pieza</button>
      </div>
    </div>
  `;
}

function renderPilots() {
  const pilots = window.MUSEUM_DATA.pilots || [];

  app.innerHTML = `
    <section class="room-header">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">Personajes historicos</p>
      <h1>Pilotos famosos</h1>
      <p>Un apartado para aprender sobre pilotos importantes del automovilismo, motociclismo y aviacion.</p>
    </section>

    <div class="pilot-grid">
      ${pilots.map(renderPilotCard).join("")}
    </div>
  `;
}

function renderPilotCard(pilot) {
  return `
    <article class="pilot-card">
      <p class="eyebrow">${pilot.area}</p>
      <h3>${pilot.name}</h3>
      <p>${pilot.description}</p>
      <small>${pilot.highlight}</small>
    </article>
  `;
}

function getAllItems() {
  return Object.entries(window.MUSEUM_DATA.routes).flatMap(([roomPath, route]) =>
    route.items.map((item) => ({
      item,
      route,
      roomPath,
      slug: createSlug(item.name)
    }))
  );
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(slug) {
  return getFavorites().includes(slug);
}

function toggleFavorite(slug) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(slug)
    ? favorites.filter((favorite) => favorite !== slug)
    : [...favorites, slug];

  saveFavorites(nextFavorites);
  renderApp();
}

function findItemBySlug(slug) {
  return getAllItems().find((entry) => entry.slug === slug);
}

function createSlug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

window.toggleFavorite = toggleFavorite;
window.renderRandomizer = renderRandomizer;
window.AppRouter.onChange(renderApp);
renderApp();
