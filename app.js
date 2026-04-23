const vehiculos = [
  { marca: "Toyota", modelo: "Corolla", precio: 78000, anio: 2020 },
  { marca: "Toyota", modelo: "Hilux", precio: 120000, anio: 2022 },
  { marca: "Mazda", modelo: "CX-5", precio: 110000, anio: 2021 },
  { marca: "Mazda", modelo: "3 Touring", precio: 90000, anio: 2019 },
  { marca: "Ford", modelo: "Escape", precio: 95000, anio: 2020 },
  { marca: "Ford", modelo: "Ranger", precio: 130000, anio: 2023 }
];

const catalogo = document.getElementById("catalogo");

function pintarVehiculos(lista) {
  catalogo.innerHTML = lista
    .map(
      (auto) => `
      <article class="card">
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Precio: $${auto.precio}</p>
        <p>Año: ${auto.anio}</p>
      </article>
    `
    )
    .join("");
}

pintarVehiculos(vehiculos);

const selectMarca = document.getElementById("marca");

selectMarca.addEventListener("change", () => {
  const marcaSeleccionada = selectMarca.value;

  if (marcaSeleccionada === "todos") {
    pintarVehiculos(vehiculos);
    return;
  }

  const filtrados = vehiculos.filter(
    (auto) => auto.marca === marcaSeleccionada
  );

  pintarVehiculos(filtrados);
});