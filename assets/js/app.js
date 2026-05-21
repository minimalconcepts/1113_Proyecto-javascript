/*
 * Render principal de la aplicacion.
 * Convierte datos, rutas JavaScript, favoritos, randomizador y pilotos en vistas HTML.
 */
const app = document.getElementById("app");
const FAVORITES_KEY = "carDealerMuseumFavorites";
const THEME_KEY = "carDealerMuseumTheme";
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("main-menu");
const themeToggle = document.querySelector(".theme-toggle");
let terminoBusqueda = "";
// Cambia image por la ruta final de cada afiche dentro de assets/images/easter-egg.
const EASTER_EGG_CARDS = [
  {
    name: "Exclusive Access",
    type: "Easter Egg",
    category: "Premium",
    status: "Coming Soon",
    detail: "Premium Collection",
    image: "assets/images/easter-egg/placeholder-premium-collection.jpg",
    collaboration: "Private Creator",
    history: "Afiche placeholder preparado para reemplazar imagen, descripcion y colaboracion cuando el contenido final este listo."
  },
  {
    name: "Hidden Content",
    type: "Easter Egg",
    category: "Members Area",
    status: "Reservado",
    detail: "Members Area",
    image: "assets/images/easter-egg/ONLYPORCHE_GT3RS.jpg",
    collaboration: "Premium Studio",
    history: "Detalle placeholder integrado al sistema de fichas del museo para mantener la misma navegacion y estructura visual."
  },
  {
    name: "Secret Archive",
    type: "Easter Egg",
    category: "Archivo secreto",
    status: "Coming Soon",
    detail: "Coming Soon",
    image: "assets/images/easter-egg/placeholder-secret-archive.jpg",
    collaboration: "Future Partner",
    history: "Contenido preparado para crecer sin crear una arquitectura paralela al detalle existente de autos."
  }
];
const EASTER_EGG_ROUTE = {
  area: "Easter Egg",
  title: "Easter Egg",
  description: "Afiches placeholder del apartado secreto.",
  folder: "assets/images/easter-egg",
  items: EASTER_EGG_CARDS
};

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = selectedTheme;
  localStorage.setItem(THEME_KEY, selectedTheme);

  if (themeToggle) {
    themeToggle.innerHTML = `<span aria-hidden="true">${selectedTheme === "dark" ? "☀" : "☾"}</span>`;
    themeToggle.title = selectedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
    themeToggle.setAttribute(
      "aria-label",
      selectedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
  }
}

applyTheme(localStorage.getItem(THEME_KEY) || "light");

if (themeToggle) {
  let themeClickCount = 0;
  let themeClickTimer;
  const themeClickHint = document.createElement("span");
  themeClickHint.className = "theme-click-hint";
  themeClickHint.setAttribute("aria-live", "polite");
  themeToggle.insertAdjacentElement("afterend", themeClickHint);

  const updateThemeClickHint = () => {
    const clicksLeft = 15 - themeClickCount;
    themeClickHint.textContent = themeClickCount >= 10 && clicksLeft > 0
      ? `Faltan ${clicksLeft} clicks...`
      : "";
  };

  const resetThemeClickCounter = () => {
    themeClickCount = 0;
    clearTimeout(themeClickTimer);
    updateThemeClickHint();
  };

  const openThemeEasterEgg = () => {
    const currentEasterEgg = document.querySelector(".theme-easter-egg");

    if (currentEasterEgg) {
      currentEasterEgg.remove();
    }

    let canCloseFromOutside = false;
    const easterEgg = document.createElement("div");
    easterEgg.className = "theme-easter-egg";
    easterEgg.setAttribute("role", "dialog");
    easterEgg.setAttribute("aria-modal", "true");
    easterEgg.setAttribute("aria-labelledby", "theme-easter-egg-title");
    easterEgg.innerHTML = `
      <div class="theme-easter-egg-card">
        <button class="theme-easter-egg-close" type="button" aria-label="Cerrar Easter Egg">&times;</button>
        <h2 id="theme-easter-egg-title">EASTER EGG</h2>
        <p>espera.......</p>
        <a class="theme-easter-egg-link" href="#/easter-egg">entrar</a>
      </div>
    `;

    const closeEasterEgg = () => {
      easterEgg.remove();
    };

    easterEgg.addEventListener("click", (event) => {
      if (event.target.closest(".theme-easter-egg-close, .theme-easter-egg-link")) {
        closeEasterEgg();
        return;
      }

      if (event.target === easterEgg && canCloseFromOutside) {
        closeEasterEgg();
      }
    });

    document.body.appendChild(easterEgg);
    easterEgg.querySelector(".theme-easter-egg-close").focus();
    setTimeout(() => {
      canCloseFromOutside = true;
    }, 250);
  };

  themeToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentTheme = document.documentElement.dataset.theme;
    applyTheme(currentTheme === "dark" ? "light" : "dark");

    // Cuenta clics consecutivos del boton de tema sin alterar su comportamiento.
    themeClickCount += 1;
    clearTimeout(themeClickTimer);
    updateThemeClickHint();

    if (themeClickCount >= 15) {
      resetThemeClickCounter();
      openThemeEasterEgg();
      return;
    }

    themeClickTimer = setTimeout(resetThemeClickCounter, 3000);
  });
}

if (menuToggle && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu principal";
  };

  const openMenu = () => {
    navMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.textContent = "Cerrar menu";
  };

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    if (navMenu.classList.contains("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.classList.contains("is-open")) {
      return;
    }

    if (!event.target.closest(".menu-wrapper")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
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

  if (path === "/fundadores") {
    renderFounders();
    return;
  }

  if (path === "/easter-egg") {
    renderEasterEggPage();
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
  const stats = getMuseumStats();
  const recommended = getRandomEntry();

  app.innerHTML = `
    <section class="wiki-intro">
      <div class="wiki-intro-content">
        <p class="eyebrow">Bienvenido a la wiki</p>
        <h1>Museo digital de autos, motos y aviones.</h1>
        <p>Explora maquinas legendarias por categorias, guarda tus favoritas y abre cada ficha como una pagina tipo Wikipedia para estudiar su historia.</p>
      </div>
    </section>

    <section class="home-summary">
      <div class="overview-copy">
        <p class="eyebrow">Wiki museo 1113</p>
        <h2>Resumen del museo</h2>
        <p>Las colecciones estan separadas por salas para que sea facil agregar piezas, imagenes e historias sin desordenar el proyecto.</p>
        ${recommended ? `
          <a class="recommended-link" href="#/wiki/${recommended.slug}">
            <span>Recomendado para aprender</span>
            <strong>${recommended.item.name}</strong>
          </a>
        ` : ""}
      </div>

      <div class="stats-panel" aria-label="Resumen del museo">
        <article><strong>${stats.rooms}</strong><span>Salas</span></article>
        <article><strong>${stats.items}</strong><span>Piezas</span></article>
        <article><strong>${stats.pilots}</strong><span>Pilotos</span></article>
      </div>
    </section>

    <section class="home-dashboard">
      <aside class="tool-section">
        <div class="section-heading compact">
          <p class="eyebrow">Herramientas</p>
          <h2>Aprende y guarda</h2>
        </div>
        <div class="tool-list">
          <a class="tool-row" href="#/random"><span>01</span><strong>Randomizador</strong><small>Elige una pieza al azar.</small></a>
          <a class="tool-row" href="#/favoritos"><span>02</span><strong>Favoritos</strong><small>Revisa tu coleccion.</small></a>
          <a class="tool-row" href="#/pilotos"><span>03</span><strong>Pilotos</strong><small>Figuras importantes.</small></a>
          <a class="tool-row" href="#/fundadores"><span>04</span><strong>Creadores</strong><small>Fundadores de marcas.</small></a>
        </div>
      </aside>

      <section class="collections-overview">
        <div class="section-heading compact">
          <p class="eyebrow">Colecciones</p>
          <h2>Salas principales</h2>
        </div>
        ${window.MUSEUM_DATA.sections.filter((section) => !["pilotos", "fundadores"].includes(section.id)).map(renderSection).join("")}
      </section>
    </section>
  `;
}

function renderSection(section) {
  return `
    <section class="museum-section" id="${section.id}">
      <div class="section-heading section-row">
        <div>
          <p class="eyebrow">${section.title}</p>
          <h2>${section.description}</h2>
        </div>
        <span>${section.routes.length} salas</span>
      </div>
      <div class="route-grid">
        ${section.routes.map(renderRouteCard).join("")}
      </div>
    </section>
  `;
}

function renderRouteCard(route) {
  const room = window.MUSEUM_DATA.routes[route.path];
  const itemCount = room ? room.items.length : 0;

  return `
    <a class="route-card" href="#${route.path}">
      <span>Sala</span>
      <strong>${route.label}</strong>
      <small>${itemCount} piezas registradas</small>
    </a>
  `;
}

function renderRoom(route) {
  const relatedRoutes = getRoutesByArea(route.area);
  const filteredItems = filterRoomItems(route.items);

  app.innerHTML = `
    <section class="room-header ${route.area.toLowerCase()}">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">${route.area}</p>
      <h1>${route.title}</h1>
      <p>${route.description}</p>
      <small>Carpeta de imagenes: ${route.folder}</small>
    </section>

    <nav class="room-tabs" aria-label="Salas relacionadas">
      ${relatedRoutes.map((relatedRoute) => `
        <a class="${relatedRoute.path === getPathByRoute(route) ? "is-active" : ""}" href="#${relatedRoute.path}">
          ${relatedRoute.label}
        </a>
      `).join("")}
    </nav>

    <section class="vehicle-section">
      <div class="section-heading">
        <p class="eyebrow">Registrados</p>
        <h2>${route.items.length === 0 ? "Sala preparada" : "Piezas de la sala"}</h2>
      </div>
      ${
        route.items.length === 0
          ? `<p class="empty-state">Todavia no hay elementos registrados. Agrega imagenes en <strong>${route.folder}</strong> y despues crea una tarjeta en <strong>assets/js/data.js</strong>.</p>`
          : `
            <div class="search-container">
              <input
                type="text"
                id="busqueda"
                placeholder="Buscar por nombre, marca o modelo..."
                class="search-input"
                value="${escapeHtml(terminoBusqueda)}"
                autocomplete="off"
              />
              <p class="search-counter" id="contador-busqueda">${getSearchCounterText(filteredItems.length, route.items.length)}</p>
            </div>
            <div id="vehicle-results">
              ${renderVehicleResults(filteredItems)}
            </div>
          `
      }
    </section>
  `;

  setupRoomSearch(route);
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
          <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.classList.add('missing-image'); this.parentElement.innerHTML='Imagen pendiente';" />
        </div>
        <div class="vehicle-info">
          <h3>${item.name}</h3>
          <div class="vehicle-meta">
            <span>${item.type || "Tipo pendiente"}</span>
            <span>${item.year || "Anio pendiente"}</span>
          </div>
          <p><strong>Detalle:</strong> ${item.detail || "Pendiente por investigar"}</p>
          <span class="card-action">Abrir ficha</span>
        </div>
      </a>
    </article>
  `;
}

function setupRoomSearch(route) {
  const searchInput = document.getElementById("busqueda");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", (event) => {
    terminoBusqueda = event.target.value;
    const filteredItems = filterRoomItems(route.items);
    const results = document.getElementById("vehicle-results");
    const counter = document.getElementById("contador-busqueda");

    if (results) {
      results.innerHTML = renderVehicleResults(filteredItems);
    }

    if (counter) {
      counter.textContent = getSearchCounterText(filteredItems.length, route.items.length);
    }
  });
}

function filterRoomItems(items) {
  const searchTerm = terminoBusqueda.trim().toLowerCase();

  if (!searchTerm) {
    return items;
  }

  return items.filter((item) => getSearchableVehicleText(item).includes(searchTerm));
}

function getSearchableVehicleText(item) {
  return [
    item.name,
    item.type,
    item.detail,
    item.year,
    item.status,
    item.category,
    item.collaboration,
    item.history,
    item.learning,
    item.specs
  ]
    .map(stringifySearchValue)
    .join(" ")
    .toLowerCase();
}

function stringifySearchValue(value) {
  if (!value) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map(stringifySearchValue).join(" ");
  }

  if (typeof value === "object") {
    return Object.values(value).map(stringifySearchValue).join(" ");
  }

  return String(value);
}

function renderVehicleResults(items) {
  if (items.length === 0) {
    return `<p class="empty-state">No hay resultados para esa busqueda. Prueba con otro nombre, marca o modelo.</p>`;
  }

  return `<div class="vehicle-grid">${items.map((item) => renderVehicleCard(item)).join("")}</div>`;
}

function getSearchCounterText(filteredCount, totalCount) {
  if (!terminoBusqueda.trim()) {
    return `${totalCount} piezas disponibles`;
  }

  return `${filteredCount} de ${totalCount} resultados`;
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
  const relatedItems = route.items
    .filter((candidate) => createSlug(candidate.name) !== slug)
    .map((candidate) => ({
      item: candidate,
      slug: createSlug(candidate.name)
    }));

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
        <p>${item.type} - ${item.status || item.year}</p>
      </header>

      <div class="wiki-layout">
        <aside class="wiki-media">
          <div class="image-frame large">
            <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.classList.add('missing-image'); this.parentElement.innerHTML='Imagen pendiente';" />
          </div>
          <dl class="fact-list">
            <div><dt>Tipo</dt><dd>${item.type}</dd></div>
            <div><dt>${item.status ? "Estado" : "Anio"}</dt><dd>${item.status || item.year}</dd></div>
            <div><dt>Detalle</dt><dd>${item.detail}</dd></div>
            ${item.category ? `<div><dt>Categoria</dt><dd>${item.category}</dd></div>` : ""}
            ${item.collaboration ? `<div><dt>Colaboración con</dt><dd>${item.collaboration}</dd></div>` : ""}
            <div><dt>Sala</dt><dd>${route.title}</dd></div>
          </dl>
        </aside>

        <section class="wiki-content">
          <section class="wiki-block main-story">
            <p class="eyebrow">Historia principal</p>
            <h2>Origen e importancia</h2>
            <div class="story-text">
              ${renderHistory(item.history)}
            </div>
          </section>

          <div class="wiki-info-grid">
            <section class="wiki-block">
              <p class="eyebrow">Contexto</p>
              <h3>Por que esta en esta sala</h3>
              <p>Esta pieza pertenece a ${route.title} por su categoria, epoca, diseno o papel dentro de la cultura del motor.</p>
            </section>

            <section class="wiki-block">
              <p class="eyebrow">Para aprender</p>
              <h3>Puntos clave</h3>
              ${renderLearning(item.learning)}
            </section>
          </div>

          ${renderComparisonPanel(item, route, relatedItems)}
        </section>
      </div>
    </article>
  `;
}

function renderComparisonPanel(currentItem, route, relatedItems) {
  if (relatedItems.length === 0) {
    return `
      <section class="wiki-block comparison-panel">
        <p class="eyebrow">Comparador</p>
        <h3>Piezas de la misma sala</h3>
        <p>Cuando agregues otra pieza a ${route.title}, aqui aparecera un comparador automatico.</p>
      </section>
    `;
  }

  const firstRelated = relatedItems[0];

  return `
    <section class="wiki-block comparison-panel">
      <div class="comparison-heading">
        <div>
          <p class="eyebrow">Comparador</p>
          <h3>Comparar con otra pieza de ${route.title}</h3>
        </div>
        <select class="comparison-select" onchange="renderComparison('${createSlug(currentItem.name)}', this.value)" aria-label="Seleccionar pieza para comparar">
          ${relatedItems.map((entry) => `
            <option value="${entry.slug}">${entry.item.name}</option>
          `).join("")}
        </select>
      </div>
      <div id="comparison-result">
        ${renderComparisonTable(currentItem, firstRelated.item, route)}
      </div>
    </section>
  `;
}

function renderComparison(currentSlug, relatedSlug) {
  const currentEntry = findItemBySlug(currentSlug);
  const relatedEntry = findItemBySlug(relatedSlug);
  const result = document.getElementById("comparison-result");

  if (!currentEntry || !relatedEntry || !result) {
    return;
  }

  result.innerHTML = renderComparisonTable(currentEntry.item, relatedEntry.item, currentEntry.route);
}

function renderComparisonTable(currentItem, relatedItem, route) {
  const rows = [
    { label: "Tipo", key: "type" },
    currentItem.status || relatedItem.status
      ? { label: "Estado", key: "status" }
      : { label: "Anio", key: "year" },
    { label: "Detalle", key: "detail" },
    ...(currentItem.category || relatedItem.category ? [{ label: "Categoria", key: "category" }] : []),
    ...(currentItem.collaboration || relatedItem.collaboration ? [{ label: "Colaboración con", key: "collaboration" }] : []),
    { label: "Creador / fabricante", key: "creator", source: "specs" },
    { label: "Potencia", key: "power", source: "specs" },
    { label: "Velocidad maxima", key: "topSpeed", source: "specs" },
    { label: "Records", key: "records", source: "specs" },
    { label: "Uso principal", key: "mainUse", source: "specs" },
    { label: "Importancia", key: "importance", source: "specs" }
  ];

  return `
    <div class="comparison-table" role="table" aria-label="Comparacion de piezas">
      <div role="row">
        <span role="columnheader">Dato</span>
        <strong role="columnheader">${currentItem.name}</strong>
        <strong role="columnheader">${relatedItem.name}</strong>
      </div>
      ${rows.map((row) => renderComparisonRow(row, currentItem, relatedItem)).join("")}
      <div role="row">
        <span role="cell">Sala</span>
        <span role="cell">${route.title}</span>
        <span role="cell">${route.title}</span>
      </div>
    </div>
  `;
}

function renderComparisonRow(row, currentItem, relatedItem) {
  return `
    <div role="row">
      <span role="cell">${row.label}</span>
      <span role="cell">${getComparisonValue(currentItem, row)}</span>
      <span role="cell">${getComparisonValue(relatedItem, row)}</span>
    </div>
  `;
}

function getComparisonValue(item, row) {
  const value = row.source === "specs"
    ? item.specs && item.specs[row.key]
    : item[row.key];

  return value || "Pendiente";
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

function renderHistory(history) {
  const fallback = "Aqui pueden escribir la historia del vehiculo: origen, marca, importancia, tecnologia, competiciones, curiosidades y por que pertenece a esta sala.";

  if (Array.isArray(history)) {
    return history.map((paragraph) => `<p>${paragraph}</p>`).join("");
  }

  return `<p>${history || fallback}</p>`;
}

function renderLearning(learning) {
  if (!learning) {
    return `
      <ul>
        <li>Identifica a que categoria pertenece.</li>
        <li>Compara su epoca con otras piezas de la sala.</li>
        <li>Agrega datos historicos o tecnicos en assets/js/data.js.</li>
      </ul>
    `;
  }

  return `
    <div class="learning-content">
      <p><strong>Nivel:</strong> ${learning.level || "Pendiente"}</p>
      ${learning.summary ? `<p>${learning.summary}</p>` : ""}
      ${learning.keyConcepts ? `
        <div>
          <strong>Conceptos clave</strong>
          <ul>${learning.keyConcepts.map((concept) => `<li>${concept}</li>`).join("")}</ul>
        </div>
      ` : ""}
      ${learning.questions ? `
        <div>
          <strong>Preguntas para repasar</strong>
          <ul>${learning.questions.map((question) => `<li>${question}</li>`).join("")}</ul>
        </div>
      ` : ""}
      ${learning.funFact ? `<p><strong>Dato curioso:</strong> ${learning.funFact}</p>` : ""}
    </div>
  `;
}

function renderRandomizer() {
  const randomEntry = getRandomEntry();

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

function renderFounders() {
  const founders = window.MUSEUM_DATA.founders || [];

  app.innerHTML = `
    <section class="room-header">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">Historia de marcas</p>
      <h1>Creadores de marcas</h1>
      <p>Un apartado para conocer a las personas y figuras clave detras de marcas importantes de autos, motos y aviones.</p>
    </section>

    <div class="founder-grid">
      ${founders.map(renderFounderCard).join("")}
    </div>
  `;
}

function renderEasterEggPage() {
  app.innerHTML = `
    <section class="room-header easter-egg-page">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">Ruta secreta</p>
      <h1>¿Tienes 18 años?</h1>
      <div class="easter-age-actions" aria-label="Verificacion de edad">
        <button class="primary-button" type="button" onclick="showEasterEggContent()">Sí</button>
        <button class="secondary-button" type="button" onclick="window.AppRouter.navigate('/')">No</button>
      </div>
    </section>
  `;
}

function showEasterEggContent() {
  app.innerHTML = `
    <section class="room-header easter-egg-page">
      <a class="back-link" href="#/">Regresar</a>
      <p class="eyebrow">Ruta secreta</p>
      <h1>Bienvenido al Easter Egg</h1>
      <p>Más contenido próximamente...</p>
    </section>

    <section class="easter-poster" aria-label="Afiche promocional placeholder">
      <span>Exclusive Access</span>
      <strong>Premium Content</strong>
      <small>Coming Soon</small>
    </section>

    <section class="vehicle-grid easter-card-grid" aria-label="Afiches Easter Egg">
      ${EASTER_EGG_CARDS.map(renderEasterEggCard).join("")}
    </section>
  `;
}

function renderEasterEggCard(card) {
  return `
    <article class="vehicle-card easter-card">
      <a class="vehicle-link" href="#/wiki/${createSlug(card.name)}" aria-label="Abrir detalle de ${card.name}">
        <div class="image-frame">
          <img src="${card.image}" alt="${card.name}" loading="lazy" decoding="async" onerror="this.remove(); this.parentElement.classList.add('missing-image'); this.parentElement.innerHTML='Imagen placeholder';" />
        </div>
        <div class="vehicle-info">
          <h3>${card.name}</h3>
          <p>${card.detail}</p>
          <span class="card-action">Abrir ficha</span>
        </div>
      </a>
    </article>
  `;
}

function getMuseumStats() {
  return {
    rooms: Object.keys(window.MUSEUM_DATA.routes).length,
    items: getAllItems().length,
    pilots: (window.MUSEUM_DATA.pilots || []).length
  };
}

function getRoutesByArea(area) {
  const section = window.MUSEUM_DATA.sections.find((candidate) => candidate.title === area);
  return section ? section.routes : [];
}

function getPathByRoute(route) {
  const entry = Object.entries(window.MUSEUM_DATA.routes).find(([, candidate]) => candidate === route);
  return entry ? entry[0] : "";
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

function renderFounderCard(founder) {
  return `
    <article class="founder-card">
      <p class="eyebrow">${founder.area}</p>
      <h3>${founder.name}</h3>
      <dl>
        <div><dt>Marca</dt><dd>${founder.brand}</dd></div>
        <div><dt>Anio</dt><dd>${founder.year}</dd></div>
      </dl>
      <p>${founder.description}</p>
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

function getEasterEggEntries() {
  return EASTER_EGG_ROUTE.items.map((item) => ({
    item,
    route: EASTER_EGG_ROUTE,
    roomPath: "/easter-egg",
    slug: createSlug(item.name)
  }));
}

function getRandomEntry() {
  const items = getAllItems();
  return items[Math.floor(Math.random() * items.length)];
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
  return getAllItems().find((entry) => entry.slug === slug)
    || getEasterEggEntries().find((entry) => entry.slug === slug);
}

function createSlug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

function handleRouteChange() {
  renderApp();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
  });
}

window.toggleFavorite = toggleFavorite;
window.renderRandomizer = renderRandomizer;
window.renderComparison = renderComparison;
window.showEasterEggContent = showEasterEggContent;
window.AppRouter.onChange(handleRouteChange);
renderApp();
