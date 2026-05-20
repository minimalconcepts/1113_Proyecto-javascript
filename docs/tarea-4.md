# Tarea 4 — Sistema de comparación de vehículos

**Proyecto:** Car Museum  
**Clase:** JavaScript Intermedio - Avanzado  
**Nivel:** Intermedio+

---

## Objetivo de esta tarea

Agregar la capacidad de **comparar 2-3 vehículos lado a lado**:

- Botón "Comparar" en cada vehículo
- Panel de comparación que muestre specs lado a lado
- Poder agregar/quitar vehículos de la comparación
- Mostrar diferencias destacadas

---

## ¿Por qué es importante?

Todos los sitios de e-commerce importantes tienen comparación (Amazon, Mercado Libre, Automotrices, etc.). Permite al usuario tomar decisiones informadas viendo múltiples productos juntos.

---

## Paso 1 — Estructura HTML para comparación

En `index.html`, después de la sección de catálogo, agregar:

```html
<!-- BOTÓN PARA ABRIR COMPARACIÓN -->
<div class="comparacion-header">
  <button id="btn-ver-comparacion" class="btn-comparacion">
    Ver comparación (<span id="contador-comparacion">0</span>)
  </button>
</div>

<!-- MODAL DE COMPARACIÓN -->
<div id="modal-comparacion" class="modal-comparacion" style="display: none;">
  <div class="modal-content-comparacion">
    <div class="modal-header-comparacion">
      <h2>Comparar vehículos</h2>
      <button id="btn-cerrar-comparacion" class="btn-cerrar">&times;</button>
    </div>

    <div id="tabla-comparacion" class="tabla-comparacion">
      <!-- Se llena con JavaScript -->
    </div>

    <div class="modal-footer-comparacion">
      <button id="btn-limpiar-comparacion" class="btn-limpiar">
        Limpiar comparación
      </button>
      <button id="btn-cerrar-modal" class="btn-cerrar-modal">
        Cerrar
      </button>
    </div>
  </div>
</div>
```

---

## Paso 2 — Estilos CSS para comparación

En `styles.css`, agregar:

```css
.comparacion-header {
  margin-top: 30px;
  text-align: center;
}

.btn-comparacion {
  padding: 12px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-comparacion:hover {
  background-color: #218838;
  transform: scale(1.05);
}

/* MODAL */
.modal-comparacion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content-comparacion {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 1000px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header-comparacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
}

.modal-header-comparacion h2 {
  margin: 0;
}

.btn-cerrar {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
}

.btn-cerrar:hover {
  color: #000;
}

.tabla-comparacion {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.vehiculo-comparacion {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  position: relative;
}

.vehiculo-comparacion img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.vehiculo-comparacion h3 {
  margin: 10px 0;
  color: #333;
}

.spec-comparacion {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.spec-label {
  font-weight: bold;
  color: #666;
}

.spec-valor {
  color: #333;
}

.btn-quitar-comparacion {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
}

.btn-quitar-comparacion:hover {
  background: #c82333;
}

.modal-footer-comparacion {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  border-top: 2px solid #eee;
  padding-top: 15px;
}

.btn-limpiar,
.btn-cerrar-modal {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-limpiar {
  background: #ffc107;
  color: #333;
}

.btn-limpiar:hover {
  background: #ffb300;
}

.btn-cerrar-modal {
  background: #007bff;
  color: white;
}

.btn-cerrar-modal:hover {
  background: #0056b3;
}
```

---

## Paso 3 — Crear array para comparación

En `app.js`, agregar al inicio:

```js
let vehiculosAComparar = []

function agregarAComparacion(id) {
  const vehiculo = vehiculos.find(v => v.id === id)
  
  // Evitar agregar el mismo vehículo dos veces
  if (vehiculosAComparar.find(v => v.id === id)) {
    alert('Este vehículo ya está en la comparación')
    return
  }
  
  // Máximo 3 vehículos
  if (vehiculosAComparar.length >= 3) {
    alert('Máximo 3 vehículos para comparar')
    return
  }
  
  vehiculosAComparar.push(vehiculo)
  actualizarContadorComparacion()
}

function quitarDeComparacion(id) {
  vehiculosAComparar = vehiculosAComparar.filter(v => v.id !== id)
  actualizarContadorComparacion()
  renderizarComparacion()
}

function limpiarComparacion() {
  vehiculosAComparar = []
  actualizarContadorComparacion()
  cerrarModalComparacion()
}

function actualizarContadorComparacion() {
  document.getElementById('contador-comparacion').textContent = 
    vehiculosAComparar.length
}
```

---

## Paso 4 — Función para renderizar comparación

Agregar:

```js
function renderizarComparacion() {
  const tablaComparacion = document.getElementById('tabla-comparacion')
  tablaComparacion.innerHTML = ''

  if (vehiculosAComparar.length === 0) {
    tablaComparacion.innerHTML = '<p>No hay vehículos para comparar</p>'
    return
  }

  vehiculosAComparar.forEach(function(vehiculo) {
    const div = document.createElement('div')
    div.className = 'vehiculo-comparacion'
    
    div.innerHTML = `
      <button class="btn-quitar-comparacion" onclick="quitarDeComparacion(${vehiculo.id})">
        ×
      </button>
      <img src="${vehiculo.imagen}" alt="${vehiculo.modelo}">
      <h3>${vehiculo.marca} ${vehiculo.modelo}</h3>
      
      <div class="spec-comparacion">
        <span class="spec-label">Precio:</span>
        <span class="spec-valor">$${vehiculo.precio.toLocaleString()}</span>
      </div>
      
      <div class="spec-comparacion">
        <span class="spec-label">Año:</span>
        <span class="spec-valor">${vehiculo.anio}</span>
      </div>
      
      <div class="spec-comparacion">
        <span class="spec-label">Tipo:</span>
        <span class="spec-valor">${vehiculo.tipo}</span>
      </div>
      
      ${vehiculo.potencia ? `
      <div class="spec-comparacion">
        <span class="spec-label">Potencia:</span>
        <span class="spec-valor">${vehiculo.potencia} HP</span>
      </div>
      ` : ''}
    `
    
    tablaComparacion.appendChild(div)
  })
}
```

---

## Paso 5 — Modal y event listeners

Agregar:

```js
function abrirModalComparacion() {
  if (vehiculosAComparar.length === 0) {
    alert('Agrega vehículos a la comparación primero')
    return
  }
  renderizarComparacion()
  document.getElementById('modal-comparacion').style.display = 'flex'
}

function cerrarModalComparacion() {
  document.getElementById('modal-comparacion').style.display = 'none'
}

// Event listeners
document.getElementById('btn-ver-comparacion').addEventListener('click', abrirModalComparacion)
document.getElementById('btn-cerrar-comparacion').addEventListener('click', cerrarModalComparacion)
document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModalComparacion)
document.getElementById('btn-limpiar-comparacion').addEventListener('click', limpiarComparacion)

// Cerrar modal si clickea fuera
document.getElementById('modal-comparacion').addEventListener('click', function(e) {
  if (e.target === this) {
    cerrarModalComparacion()
  }
})
```

---

## Paso 6 — Agregar botón "Comparar" en cada tarjeta

Cuando renderices las tarjetas de vehículos, agregar un botón:

```js
// En la función que renderiza cada vehículo:
let botonComparar = document.createElement('button')
botonComparar.textContent = 'Comparar'
botonComparar.onclick = function() {
  agregarAComparacion(vehiculo.id)
}
card.appendChild(botonComparar)
```

---

## Verificar en el navegador

1. Agrega varios vehículos a la comparación (máximo 3)
2. Haz clic en "Ver comparación"
3. Deberían verse lado a lado
4. Prueba quitar uno con el botón "×"
5. Limpiar y empezar de nuevo

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| Array de selección | Mantener track de elementos seleccionados |
| Modal | Ventana emergente para mostrar contenido |
| Grid responsive | Layout flexible que se adapta |
| Validación de límites | Máximo 3 items |
| Event delegation | Usar onclick dinámicamente |

---

## Desafío extra (opcional)

1. Mostrar un icono verde/rojo en specs donde uno es mejor que otro.
2. Guardar la comparación actual en `localStorage`.
3. Permitir compartir la comparación (copiar URL con parámetros).

