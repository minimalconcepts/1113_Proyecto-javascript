# Tarea 3 — Búsqueda en tiempo real

**Proyecto:** Car Museum  
**Clase:** JavaScript Intermedio  
**Nivel:** Intermedio

---

## Objetivo de esta tarea

Agregar un campo de búsqueda que filtre vehículos **mientras el usuario escribe**, sin necesidad de apretar un botón.

**Antes:** Solo filtros por select  
**Después:** Búsqueda dinámica que actualiza mientras escribes

---

## Paso 1 — Agregar input de búsqueda al HTML

En `index.html`, antes de los select de marca y tipo, agregar:

```html
<div class="search-container">
  <input 
    type="text" 
    id="busqueda" 
    placeholder="Buscar por nombre, marca o modelo..."
    class="search-input"
  />
</div>
```

---

## Paso 2 — Estilos para la búsqueda

En `styles.css`, agregar:

```css
.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}
```

---

## Paso 3 — Crear variable para el término de búsqueda

En `app.js`, después de las variables de filtros, agregar:

```js
let terminoBusqueda = ''
```

---

## Paso 4 — Modificar la función de renderizado

La función que renderiza los vehículos debe considerar la búsqueda. Encuentra donde se filtra y agregar lógica de búsqueda:

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
    
    // Búsqueda: buscar en marca, modelo y descripción
    const cumpleBusqueda = 
      vehiculo.marca.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      (vehiculo.descripcion && 
       vehiculo.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()))
    
    return cumpleMarca && cumpleTipo && cumpleBusqueda
  })
  
  renderizarCatalogo(vehiculosFiltrados)
}
```

---

## Paso 5 — Agregar event listener para búsqueda

Al final de `app.js`, agregar:

```js
// Event listener para búsqueda en tiempo real
document.getElementById('busqueda').addEventListener('input', function(e) {
  terminoBusqueda = e.target.value
  filtrarVehiculos()
})

// También para marca y tipo (si no está)
document.getElementById('marca').addEventListener('change', filtrarVehiculos)
document.getElementById('tipo').addEventListener('change', filtrarVehiculos)
```

---

## Paso 6 — Verificar en el navegador

1. Abre el proyecto
2. Escribe en el input de búsqueda
3. La lista debería filtrar en tiempo real mientras escribes
4. Prueba buscando:
   - "Ferrari"
   - "911"
   - "Turbo"
5. Combina búsqueda + filtros de marca y tipo

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| `addEventListener('input')` | Se ejecuta cada vez que cambia el valor del input |
| `.toLowerCase()` | Convierte a minúsculas para búsqueda sin importar mayúsculas |
| `.includes()` | Verifica si un texto contiene otro |
| Filtros combinados | Usar múltiples condiciones con `&&` (AND) |
| Búsqueda flexible | Buscar en múltiples campos |

---

## Desafío extra (opcional)

1. Mostrar "sin resultados" si no hay coincidencias.
2. Resaltar el texto buscado en los resultados (con colores).
3. Agregar contador de resultados encontrados.
4. Que la búsqueda sea case-insensitive (ya está con `.toLowerCase()`).

> **Pista para punto 2**: Podés usar un `<span>` con fondo amarillo alrededor del texto encontrado.
