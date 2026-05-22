# Guia de favoritos

Esta guia explica como funciona la tarea 5 dentro del proyecto sin copiar codigo duplicado.

## Que hace

- Muestra un corazon en cada tarjeta.
- Corazon vacio: la pieza no esta guardada.
- Corazon lleno: la pieza esta en favoritos.
- Guarda la seleccion en `localStorage`, por eso se conserva al recargar.
- Permite filtrar una sala para ver solo piezas favoritas.
- Tiene una pagina completa en `#/favoritos`.

## Archivos importantes

```text
assets/js/app.js
assets/css/styles.css
assets/css/responsive.css
```

## Funciones principales

```js
getFavorites()
saveFavorites(favorites)
isFavorite(slug)
toggleFavorite(slug)
toggleSoloFavoritos()
filterRoomItems(items)
renderFavorites()
```

## Como se identifica cada pieza

Cada vehiculo usa un `slug` creado desde el nombre:

```js
const slug = createSlug(item.name)
```

Por eso es importante que en `assets/js/data.js` cada pieza tenga un `name` claro y diferente.

## Como probarlo paso a paso

1. Abre el proyecto en el navegador.
2. Entra a una sala, por ejemplo `#/autos/deportivos`.
3. Presiona el corazon de una tarjeta.
4. Recarga la pagina.
5. El corazon debe seguir marcado.
6. Presiona `Solo favoritos`.
7. La sala debe mostrar solo las piezas marcadas.
8. Entra a `#/favoritos`.
9. Deben aparecer todas las piezas guardadas.

## Donde se guardan los favoritos

Se guardan en el navegador con esta clave:

```js
carDealerMuseumFavorites
```

Para revisarlo:

```text
F12 -> Application -> Local Storage -> carDealerMuseumFavorites
```

## Que no deben hacer

- No crear otra lista de favoritos en otro archivo.
- No cambiar la clave de `localStorage` si ya hay favoritos guardados.
- No repetir funciones como `toggleFavorite`; usen la que ya existe.
- No usar nombres iguales para dos piezas distintas.

## Si agregan una pieza nueva

Solo deben agregarla en `assets/js/data.js`. El sistema de favoritos funciona automaticamente porque lee las tarjetas desde los datos del museo.
