# Tarea 5 — Sistema de favoritos con localStorage

**Proyecto:** Car Museum  
**Clase:** JavaScript Intermedio - Avanzado  
**Nivel:** Intermedio+

---

## Objetivo de esta tarea

Agregar la capacidad de **marcar vehículos como favoritos**:

- Icono de corazón en cada tarjeta
- Corazón relleno = favorito
- Corazón vacío = no es favorito
- Los favoritos se guardan en `localStorage`
- Mostrar/ocultar favoritos con un filtro

---

## ¿Por qué es importante?

Casi toda aplicación moderna tiene "favoritos" o "wishlist" (Netflix, Spotify, Amazon, etc.). Es lo que permite a los usuarios guardar lo que les interesa para luego.

---

## Paso 1 — Estructura HTML actualizada

En las tarjetas de vehículos, agregar un botón de favorito:

```html
<div class="card">
  <button class="btn-favorito" onclick="toggleFavorito(vehiculo.id)">
    <span class="icono-corazon">♡</span>
  </button>
  
  <!-- Resto del contenido de la tarjeta -->
  <img src="${vehiculo.imagen}">
  <h3>${vehiculo.marca} ${vehiculo.modelo}</h3>
  
  <!-- ... más contenido ... -->
</div>
```

---

## Paso 2 — Estilos para el botón de favorito

En `styles.css`, agregar:

```css
.card {
  position: relative;
  /* ... estilos existentes ... */
}

.btn-favorito {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.btn-favorito:hover {
  transform: scale(1.1);
  background: white;
}

.btn-favorito.favorito {
  color: #ff1744;
}

.btn-favorito .icono-corazon {
  display: block;
  transition: 0.2s;
}

.btn-favorito.favorito .icono-corazon {
  animation: latido 0.3s ease;
}

@keyframes latido {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* FILTRO DE FAVORITOS */
.filtro-favoritos {
  margin: 15px 0;
}

.btn-solo-favoritos {
  padding: 8px 16px;
  background: #ff1744;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-solo-favoritos:hover {
  background: #e5004d;
}

.btn-solo-favoritos.activo {
  background: #c41e3a;
  box-shadow: 0 0 10px rgba(255, 23, 68, 0.5);
}
```

---

## Paso 3 — Crear funciones de favoritos

En `app.js`, agregar:

```js
const CLAVE_FAVORITOS = 'museo_favoritos'
let soloFavoritos = false

function cargarFavoritos() {
  const favoritos = localStorage.getItem(CLAVE_FAVORITOS)
  return favoritos ? JSON.parse(favoritos) : []
}

function guardarFavoritos(favoritos) {
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos))
}

function isFavorito(id) {
  const favoritos = cargarFavoritos()
  return favoritos.includes(id)
}

function toggleFavorito(id) {
  const favoritos = cargarFavoritos()
  const index = favoritos.indexOf(id)

  if (index > -1) {
    // Si ya es favorito, quitarlo
    favoritos.splice(index, 1)
  } else {
    // Si no es favorito, agregarlo
    favoritos.push(id)
  }

  guardarFavoritos(favoritos)
  
  // Actualizar visual del botón
  const boton = document.querySelector(`[onclick*="toggleFavorito(${id})"]`)
  if (boton) {
    boton.classList.toggle('favorito')
  }
  
  // Si está filtrando por favoritos, re-renderizar
  if (soloFavoritos) {
    filtrarVehiculos()
  }
}
```

---

## Paso 4 — Actualizar función de renderizado

Modificar la función que renderiza tarjetas para:

1. Mostrar el botón de favorito
2. Marcar como favorito si ya lo es

```js
function renderizarCatalogo(listaVehiculos) {
  const catalogo = document.getElementById('catalogo')
  catalogo.innerHTML = ''

  listaVehiculos.forEach(function(vehiculo) {
    const card = document.createElement('div')
    card.className = 'card'

    const esFavorito = isFavorito(vehiculo.id)
    const claseFavorito = esFavorito ? 'favorito' : ''

    card.innerHTML = `
      <button class="btn-favorito ${claseFavorito}" 
              onclick="toggleFavorito(${vehiculo.id})">
        <span class="icono-corazon">♡</span>
      </button>
      
      <img src="${vehiculo.imagen}" alt="${vehiculo.modelo}">
      <h3>${vehiculo.marca}</h3>
      <p>${vehiculo.modelo}</p>
      <p class="precio">$${vehiculo.precio.toLocaleString()}</p>
      
      <!-- ... más contenido ... -->
    `

    catalogo.appendChild(card)
  })
}
```

---

## Paso 5 — Agregar filtro de solo favoritos

En `app.js`, modificar la función de filtrado:

```js
function filtrarVehiculos() {
  const marcaSeleccionada = document.getElementById('marca').value
  const tipoSeleccionado = document.getElementById('tipo').value
  
  let vehiculosFiltrados = vehiculos.filter(function(vehiculo) {
    // Filtro por marca
    const cumpleMarca = marcaSeleccionada === 'todos' || 
                        vehiculo.marca === marcaSeleccionada
    
    // Filtro por tipo
    const cumpleTipo = tipoSeleccionado === 'todos' || 
                       vehiculo.tipo === tipoSeleccionado
    
    // Filtro por búsqueda (si existe)
    const cumpleBusqueda = !terminoBusqueda || 
                          vehiculo.marca.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                          vehiculo.modelo.toLowerCase().includes(terminoBusqueda.toLowerCase())
    
    // NUEVO: Filtro por favoritos
    const cumpleFavoritos = !soloFavoritos || isFavorito(vehiculo.id)
    
    return cumpleMarca && cumpleTipo && cumpleBusqueda && cumpleFavoritos
  })
  
  renderizarCatalogo(vehiculosFiltrados)
}

function toggleFiltroFavoritos() {
  soloFavoritos = !soloFavoritos
  
  const boton = document.getElementById('btn-solo-favoritos')
  boton.classList.toggle('activo')
  
  filtrarVehiculos()
}
```

---

## Paso 6 — Agregar botón en HTML

En `index.html`, agregar un botón para filtrar:

```html
<div class="filtro-favoritos">
  <button id="btn-solo-favoritos" class="btn-solo-favoritos" 
          onclick="toggleFiltroFavoritos()">
    ♡ Solo favoritos
  </button>
</div>
```

---

## Paso 7 — Event listeners finales

Agregar:

```js
// Al cargar la página, verificar favoritos guardados
document.addEventListener('DOMContentLoaded', function() {
  filtrarVehiculos() // Renderizar con favoritos cargados
})
```

---

## Verificar en el navegador

1. Abre el proyecto
2. Haz clic en el corazón de algunos vehículos (debe llenarse)
3. Recarga la página (F5)
4. Los favoritos deberían seguir siendo favoritos
5. Haz clic en "♡ Solo favoritos"
6. Solo deberían verse los que marcaste

---

## Concepto de localStorage

```js
// Guardar
const favoritos = [1, 3, 5]
localStorage.setItem('mis_favoritos', JSON.stringify(favoritos))

// Leer
const guardados = JSON.parse(localStorage.getItem('mis_favoritos'))
// guardados = [1, 3, 5]

// Verificar DevTools
// F12 → Application → Local Storage → favoritos
```

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| `localStorage.setItem()` | Guarda datos persistentes |
| `localStorage.getItem()` | Lee datos guardados |
| `.includes()` | Verifica si un array contiene un elemento |
| `.indexOf()` | Encuentra la posición de un elemento |
| `.splice()` | Elimina un elemento del array |
| `classList.toggle()` | Alterna una clase CSS |
| Persistencia | Los datos sobreviven a recargas de página |

---

## Desafío extra (opcional)

1. Mostrar un contador de cuántos favoritos hay (ej: "♡ 5 favoritos").
2. Crear una página separada solo para favoritos.
3. Poder compartir los favoritos (exportar como JSON).
4. Agregar una opción para limpiar todos los favoritos con confirmación.

> **Pista para punto 1**: 
> ```js
> const cantidad = cargarFavoritos().length
> document.getElementById('contador').textContent = cantidad
> ```
