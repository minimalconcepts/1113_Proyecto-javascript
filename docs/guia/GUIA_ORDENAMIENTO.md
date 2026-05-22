# Guia de ordenamiento avanzado

Esta guia corresponde a la tarea 4 del proyecto.

## Que hace

- Ordena las piezas de una sala sin modificar los datos originales.
- Funciona junto con la busqueda en tiempo real.
- Funciona junto con el filtro de favoritos.
- Recuerda el ultimo orden elegido usando `localStorage`.

## Opciones disponibles

```text
Orden por defecto
Precio: Menor a Mayor
Precio: Mayor a Menor
Anio: Mas reciente
Anio: Mas antiguo
Potencia: Mayor
Velocidad maxima: Mayor
```

## Archivos importantes

```text
assets/js/app.js
assets/css/styles.css
```

## Funciones principales

```js
aplicarOrdenamiento()
ordenarVehiculos(lista)
obtenerPrecioVehiculo(item)
obtenerAnioVehiculo(item)
extraerNumero(value)
updateRoomResults(route)
```

## Como funciona paso a paso

1. La sala muestra un `select` con `id="ordenamiento"`.
2. Cuando el usuario cambia la opcion, se ejecuta `aplicarOrdenamiento()`.
3. El valor elegido se guarda en `ordenamientoActual`.
4. Tambien se guarda en `localStorage` con la clave `carDealerMuseumOrder`.
5. Primero se aplican busqueda y favoritos.
6. Despues `ordenarVehiculos(lista)` ordena una copia del array.
7. Finalmente `updateRoomResults(route)` vuelve a pintar las tarjetas.

## Por que se usa una copia

La funcion usa:

```js
const copia = [...lista]
```

Eso evita cambiar el orden original escrito en `assets/js/data.js`.

## Como probarlo

1. Abre una sala con varias piezas.
2. Cambia el select a `Precio: Menor a Mayor`.
3. Cambia a `Anio: Mas reciente`.
4. Escribe algo en el buscador.
5. El ordenamiento debe seguir funcionando con los resultados filtrados.
6. Activa `Solo favoritos`.
7. El ordenamiento debe aplicarse tambien a los favoritos visibles.
8. Recarga la pagina.
9. El ultimo orden elegido debe mantenerse.

## Si agregan piezas nuevas

Para que el ordenamiento sea mas exacto, cada pieza deberia tener:

```js
year: "2024",
detail: "$320,000",
specs: {
  power: "671 hp",
  topSpeed: "325 km/h"
}
```

Si algun dato no existe, el sistema lo toma como `0` para evitar errores.
