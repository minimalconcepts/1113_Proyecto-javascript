# Tarea 2 (1 hora) — Imágenes, tipo y mensaje sin resultados

## Objetivo de hoy
Completar el MVP del catálogo agregando:
- imágenes a cada auto
- un segundo filtro por tipo de vehículo
- mensaje cuando no hay resultados

Tiempo total: **60 minutos**

---

## Paso 1 (15 min) — Nuevo dataset deportivo

El proyecto se llama **Car Dealer Motorsport**. Es hora de que los datos lo reflejen.

Reemplazá el arreglo `vehiculos` en `app.js` con este:

```js
const vehiculos = [
  {
    id: 1,
    marca: "Lamborghini",
    modelo: "Huracán EVO",
    tipo: "superdeportivo",
    precio: 850000,
    anio: 2023,
    imagen: "https://i.pinimg.com/736x/0e/71/f0/0e71f0ca67067f85c991c97cca1954ce.jpg"
  },
  {
    id: 2,
    marca: "Ferrari",
    modelo: "488 GTB",
    tipo: "superdeportivo",
    precio: 780000,
    anio: 2022,
    imagen: "https://i.pinimg.com/1200x/6a/d1/45/6ad145c55b3022835d91115fc16dc906.jpg"
  },
  {
    id: 3,
    marca: "McLaren",
    modelo: "720S",
    tipo: "superdeportivo",
    precio: 720000,
    anio: 2021,
    imagen: "https://i.pinimg.com/webp85/736x/9f/a2/da/9fa2da35ddeee5d15851d6ac99454d7e.webp"
  },
  {
    id: 4,
    marca: "Porsche",
    modelo: "911 Turbo S",
    tipo: "deportivo",
    precio: 320000,
    anio: 2023,
    imagen: "https://i.pinimg.com/webp85/1200x/a1/ed/d5/a1edd5d8161bf2d4a128c36c75912a6d.webp"
  },
  {
    id: 5,
    marca: "BMW",
    modelo: "M4 Competition",
    tipo: "deportivo",
    precio: 180000,
    anio: 2022,
    imagen: "https://i.pinimg.com/1200x/48/09/8e/48098e86f055f7310e847963e2844fd8.jpg"
  },
  {
    id: 6,
    marca: "Audi",
    modelo: "R8 V10",
    tipo: "deportivo",
    precio: 210000,
    anio: 2021,
    imagen: "TU_URL_ACA"
  }
];
```

**Desafío para el auto 6:** abrí Google → buscá `"Audi R8 V10"` → hacé click derecho en una imagen → *Copiar dirección de imagen* → pegala en lugar de `"TU_URL_ACA"`.

Meta: al guardar `app.js`, los 6 objetos nuevos deben estar en memoria (verificá en consola del navegador con `console.log(vehiculos)`).

---

## Paso 2 (15 min) — Actualizar el HTML

### 2.1 Reemplazá el `<select>` de marca

Los autos cambiaron, las opciones también. Buscá el `<select id="marca">` en `index.html` y reemplazalo con este:

```html
<label for="marca">Marca:</label>
<select id="marca">
  <option value="todos">Todas</option>
  <option value="Lamborghini">Lamborghini</option>
  <option value="Ferrari">Ferrari</option>
  <option value="McLaren">McLaren</option>
  <option value="Porsche">Porsche</option>
  <option value="BMW">BMW</option>
  <option value="Audi">Audi</option>
</select>
```

### 2.2 Agregá un segundo `<select>` para el tipo

Pegá esto **debajo** del select de marca (y antes del `<section id="catalogo">`):

```html
<label for="tipo">Tipo:</label>
<select id="tipo">
  <option value="todos">Todos</option>
  <option value="superdeportivo">Superdeportivo</option>
  <option value="deportivo">Deportivo</option>
</select>
```

Meta: al abrir `index.html` en el navegador, deben verse los dos selectores.

---

## Paso 3 (15 min) — Imagen en la card

### 3.1 Actualizá `pintarVehiculos` en `app.js`

Reemplazá la función existente con esta versión que agrega la imagen y muestra el tipo:

```js
function pintarVehiculos(lista) {
  catalogo.innerHTML = lista
    .map(
      (auto) => `
      <article class="card">
        <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}" />
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Tipo: ${auto.tipo}</p>
        <p>Precio: $${auto.precio.toLocaleString()}</p>
        <p>Año: ${auto.anio}</p>
      </article>
    `
    )
    .join("");
}
```

### 3.2 Agregá estilos para la imagen en `styles.css`

```css
.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}
```

Meta: al abrir la página, cada card debe mostrar la imagen del auto.

---

## Paso 4 (15 min) — Filtro combinado y mensaje sin resultados

### 4.1 Reemplazá el evento de marca con una función `filtrar()`

Borrá el bloque `selectMarca.addEventListener(...)` que escribieron en la Tarea 1 y reemplazalo con esto:

```js
const selectMarca = document.getElementById("marca");
const selectTipo = document.getElementById("tipo");

function filtrar() {
  const marcaSeleccionada = selectMarca.value;
  const tipoSeleccionado = selectTipo.value;

  const resultado = vehiculos.filter((auto) => {
    const coincideMarca = marcaSeleccionada === "todos" || auto.marca === marcaSeleccionada;
    const coincideTipo = tipoSeleccionado === "todos" || auto.tipo === tipoSeleccionado;
    return coincideMarca && coincideTipo;
  });

  pintarVehiculos(resultado);
}

selectMarca.addEventListener("change", filtrar);
selectTipo.addEventListener("change", filtrar);
```

### 4.2 Agregá el mensaje de sin resultados dentro de `pintarVehiculos`

Actualizá la función para manejar el caso en que `lista` llegue vacía:

```js
function pintarVehiculos(lista) {
  if (lista.length === 0) {
    catalogo.innerHTML = "<p class='sin-resultados'>No hay autos con esos filtros.</p>";
    return;
  }

  catalogo.innerHTML = lista
    .map(
      (auto) => `
      <article class="card">
        <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}" />
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Tipo: ${auto.tipo}</p>
        <p>Precio: $${auto.precio.toLocaleString()}</p>
        <p>Año: ${auto.anio}</p>
      </article>
    `
    )
    .join("");
}
```

### 4.3 Agregá el estilo del mensaje en `styles.css`

```css
.sin-resultados {
  grid-column: 1 / -1;
  text-align: center;
  color: #666;
  padding: 40px;
  font-size: 1.1rem;
}
```

Meta: seleccioná "Lamborghini" en marca y "deportivo" en tipo → debe aparecer el mensaje de sin resultados.

---

## Checklist de entrega

- [ ] El arreglo `vehiculos` tiene `id`, `tipo` e `imagen` en cada objeto
- [ ] Cada card muestra la imagen del auto
- [ ] Hay dos selectores: uno de marca y uno de tipo
- [ ] Ambos filtros funcionan en combinación
- [ ] Cuando no hay resultados aparece el mensaje
- [ ] No hay errores en la consola del navegador

---

## Apoyo del docente durante la hora

- **Min 0–15:** verificar que actualizaron el arreglo correctamente (tipear `vehiculos` en consola → deben verse 6 objetos con `imagen`)
- **Min 15–30:** confirmar que el HTML tiene los dos `<select>` y que las imágenes aparecen en las cards
- **Min 30–45:** ayudar con `&&` en el `filter()` — el error más común es confundirlo con `||`
- **Min 45–60:** probar combinaciones que den sin resultados y verificar que el mensaje aparece

---

## Mensaje para Juan

Juan, esa función `filtrar()` parece difícil pero hacé este ejercicio mental: escribí en papel qué tiene que pasar para que un auto aparezca. Si lo podés describir en palabras, lo podés escribir en código. Eso es programar.
