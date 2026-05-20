# Tarea 4 — Ordenamiento avanzado (Sorting)

**Proyecto:** Car Museum  
**Clase:** JavaScript Intermedio  
**Nivel:** Intermedio

---

## Objetivo de esta tarea

Agregar la capacidad de **ordenar los vehículos por diferentes criterios**:

- **Por precio** (menor a mayor / mayor a menor)
- **Por año** (más reciente primero / más antiguo)
- **Por potencia** (más potencia primero)
- **Por velocidad máxima** (más rápido primero)

Sin eliminar el filtrado existente, solo agregar orden a los resultados.

---

## ¿Por qué es importante?

Todos los sitios serios de e-commerce tienen ordenamiento:
- Amazon: "Ordenar por precio", "Ordenar por calificación"
- Airbnb: "Ordenar por precio", "Ordenar por calificación"
- Mercado Libre: "Orden: relevancia", "Orden: precio menor a mayor"

El ordenamiento es lo que hace que un usuario encuentre rápido lo que necesita.

---

## Paso 1 — Agregar controles de ordenamiento en HTML

En `index.html`, agregar un nuevo select después de los filtros:

```html
<div class="ordenamiento-container">
  <label for="ordenamiento">Ordenar por:</label>
  <select id="ordenamiento" onchange="aplicarOrdenamiento()">
    <option value="defecto">Orden por defecto</option>
    <option value="precio-asc">Precio: Menor a Mayor</option>
    <option value="precio-desc">Precio: Mayor a Menor</option>
    <option value="anio-desc">Año: Más reciente</option>
    <option value="anio-asc">Año: Más antiguo</option>
    <option value="potencia-desc">Potencia: Mayor</option>
    <option value="velocidad-desc">Velocidad máxima: Mayor</option>
  </select>
</div>
```

---

## Paso 2 — Agregar estilos CSS

En `styles.css`, agregar:

```css
.ordenamiento-container {
  margin: 15px 0;
  display: flex;
  gap: 12px;
  align-items: center;
}

.ordenamiento-container label {
  font-weight: bold;
  color: #333;
}

.ordenamiento-container select {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background: white;
  transition: 0.3s;
}

.ordenamiento-container select:hover {
  border-color: #007bff;
}

.ordenamiento-container select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}
```

---

## Paso 3 — Crear variable para ordenamiento

En `app.js`, al inicio, agregar:

```js
let ordenamientoActual = 'defecto'
```

---

## Paso 4 — Crear función de ordenamiento

Agregar esta función después de la función de filtrado:

```js
function aplicarOrdenamiento() {
  ordenamientoActual = document.getElementById('ordenamiento').value
  filtrarVehiculos() // Re-renderizar con el nuevo orden
}

function ordenarVehiculos(lista) {
  const copia = [...lista] // Copia el array para no modificar el original
  
  switch(ordenamientoActual) {
    case 'precio-asc':
      copia.sort((a, b) => a.precio - b.precio)
      break
      
    case 'precio-desc':
      copia.sort((a, b) => b.precio - a.precio)
      break
      
    case 'anio-desc':
      copia.sort((a, b) => b.anio - a.anio)
      break
      
    case 'anio-asc':
      copia.sort((a, b) => a.anio - b.anio)
      break
      
    case 'potencia-desc':
      copia.sort((a, b) => {
        const potA = a.specs?.power ? parseInt(a.specs.power) : 0
        const potB = b.specs?.power ? parseInt(b.specs.power) : 0
        return potB - potA
      })
      break
      
    case 'velocidad-desc':
      copia.sort((a, b) => {
        const velA = a.specs?.topSpeed ? parseInt(a.specs.topSpeed) : 0
        const velB = b.specs?.topSpeed ? parseInt(b.specs.topSpeed) : 0
        return velB - velA
      })
      break
      
    case 'defecto':
    default:
      // Mantener el orden original
      break
  }
  
  return copia
}
```

---

## Paso 5 — Integrar ordenamiento en función de renderizado

Modificar la función que renderiza los vehículos para aplicar ordenamiento:

```js
function filtrarVehiculos() {
  // ... código de filtrado existente ...
  
  // ANTES de renderizar:
  let vehiculosFiltrados = vehiculos.filter(function(vehiculo) {
    // ... lógica de filtrado ...
  })
  
  // DESPUÉS de filtrar, aplicar ordenamiento:
  vehiculosFiltrados = ordenarVehiculos(vehiculosFiltrados)
  
  // LUEGO renderizar:
  renderizarCatalogo(vehiculosFiltrados)
}
```

---

## Paso 6 — Verificar en el navegador

1. Abre el proyecto
2. Usa los filtros de búsqueda y marca/tipo
3. Selecciona un ordenamiento del select
4. Los vehículos deberían reordenarse
5. Prueba todas las opciones:
   - Precio menor a mayor
   - Precio mayor a menor
   - Año más reciente
   - Potencia más alta
   - Velocidad máxima

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| `.sort()` | Ordena un array según una función |
| `(a, b) => a - b` | Ordena de menor a mayor |
| `(a, b) => b - a` | Ordena de mayor a menor |
| `[...array]` | Crea una copia del array (spread operator) |
| `switch/case` | Elige acción según valor |
| `?.` | Optional chaining (acceso seguro a propiedades) |
| Immutabilidad | No modificar el array original, trabajar con copia |

---

## Explicación de `.sort()`

```js
// Ordenar números de menor a mayor
[3, 1, 4, 1, 5].sort((a, b) => a - b)
// Resultado: [1, 1, 3, 4, 5]

// Ordenar números de mayor a menor
[3, 1, 4, 1, 5].sort((a, b) => b - a)
// Resultado: [5, 4, 3, 1, 1]

// Ordenar objetos por propiedad
let autos = [
  { modelo: "Ferrari", precio: 800000 },
  { modelo: "BMW", precio: 200000 }
]

autos.sort((a, b) => a.precio - b.precio)
// Resultado: BMW primero (precio menor), Ferrari después
```

---

## Desafío extra (opcional)

1. Agregar un icono (▲ ▼) que muestre la dirección del ordenamiento actual.
2. Recordar el ordenamiento seleccionado en `localStorage`.
3. Combinar ordenamiento con búsqueda (buscar "Ferrari" y ordenar por precio).
4. Agregar un botón "Reiniciar ordenamiento" que vuelva al orden por defecto.

> **Pista para punto 2**: Podés usar `localStorage.setItem('ordenamiento', valor)` y recuperarlo con `localStorage.getItem('ordenamiento')` al cargar la página.

---

## Diferencia: Comparación vs Ordenamiento

- **Comparación** (ya implementado): Muestra 2-3 vehículos lado a lado para que el usuario decida.
- **Ordenamiento** (esta tarea): Ordena toda la lista por un criterio, para que el usuario encuentre rápido.

Ambos son complementarios. Primero ordena, después compara.
