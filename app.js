const vehiculos = [
   {
    id: 1,
    marca: "Aston Martin ",
    modelo: "Valhalla",
    tipo: "superdeportivo",
    precio: 920000,
    anio: 2024,
    imagen: "https://i.pinimg.com/736x/0e/71/f0/0e71f0ca67067f85c991c97cca1954ce.jpg"
  },
  {
    id: 2,
    marca: "Bugatti",
    modelo: "Beyron Super sport +1600HP",
    tipo: "superdeportivo",
    precio: 3500000,
    anio: 2016,
    imagen: "https://i.pinimg.com/736x/51/8b/9a/518b9a97337da1dbf0e365c55b282524.jpg"
  },

  {
    id: 3,
    marca: "Aston Martin",
    modelo: "Valkyrie con moldeado del culo de fernando alonso",
    tipo: "superdeportivo",
    precio: 6500000,
    anio: 2021,
    imagen: "https://i.pinimg.com/1200x/97/cd/bf/97cdbfb2dc1d1ac3c00e9f9c1945b446.jpg"
  },

  {
    id: 4,
    marca: "Aston Martin",
    modelo: "DB12",
    tipo: "deportivo",
    precio: 320000,
    anio: 2024,
    imagen: "https://i.pinimg.com/1200x/8c/5e/b3/8c5eb3834a87fc0e372855d3af691312.jpg"
  },

  {
    id: 5,
    marca: "Audi",
    modelo: "R8 V10",
    tipo: "deportivo",
    precio: 210000,
    anio: 2021,
    imagen: "https://i.pinimg.com/736x/2c/73/98/2c7398f0e4b73a61d7227d1d493ae415.jpg"
  },


  {

    id: 6,
    marca: "Koenigsegg",
    modelo: "Jesko Atack",
    tipo: "superdeportivo",
    precio: 3000000,
    anio: 2024,
    imagen:"https://i.pinimg.com/1200x/d3/19/f9/d319f9db0ca9ca5cdcc65376a02c5990.jpg"
  },

];
 
const catalogo = document.getElementById("catalogo");

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

pintarVehiculos(vehiculos);

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