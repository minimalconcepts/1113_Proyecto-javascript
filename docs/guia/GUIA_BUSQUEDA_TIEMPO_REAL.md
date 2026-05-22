# Guia de busqueda en tiempo real

Esta guia corresponde a la tarea 3 del proyecto.

## Que hace

- Filtra las piezas mientras el usuario escribe.
- No necesita boton de buscar.
- Busca en nombre, tipo, detalle, historia, categoria, estado y datos tecnicos.
- Tiene un buscador global en el inicio para todo el museo.
- Tiene buscadores locales dentro de cada sala.
- Funciona junto con el ordenamiento y el filtro de favoritos.
- Muestra contador de resultados.
- Resalta la palabra encontrada dentro de las tarjetas.

## Archivos importantes

```text
assets/js/app.js
assets/css/styles.css
```

## Funciones principales

```js
setupRoomSearch(route)
setupGlobalSearch()
filterRoomItems(items)
getSearchableVehicleText(item)
renderVehicleResults(items)
getSearchCounterText(filteredCount, totalCount)
highlightSearchMatch(value)
```

## Buscador global

El buscador global aparece en el inicio y revisa todas las piezas de autos, motos y aviones.

Sirve para encontrar rapidamente una ficha sin saber en que sala esta.

```text
Inicio -> Buscador global -> Resultado -> Ficha wiki
```

## Buscador por sala

El buscador por sala aparece dentro de cada categoria, por ejemplo deportivos, aviones de combate o motos GP.

Sirve para filtrar solo las piezas de esa sala sin mezclar todo el museo.

```text
Sala -> Busqueda local -> Tarjetas filtradas
```

## Como funciona paso a paso en una sala

1. Cada sala renderiza un input con `id="busqueda"`.
2. `setupRoomSearch(route)` escucha el evento `input`.
3. Cada vez que escriben, se actualiza `terminoBusqueda`.
4. `filterRoomItems(items)` revisa si cada pieza contiene ese texto.
5. `updateRoomResults(route)` vuelve a pintar solo las tarjetas que coinciden.
6. `highlightSearchMatch(value)` marca visualmente la coincidencia con `<mark>`.

## Como funciona paso a paso en el inicio

1. El inicio renderiza un input con `id="busqueda-global"`.
2. `setupGlobalSearch()` escucha el evento `input`.
3. Cada vez que escriben, se actualiza `terminoBusquedaGlobal`.
4. `getGlobalSearchResults()` busca en todas las piezas del museo.
5. `renderGlobalSearchResults()` muestra resultados que abren la ficha wiki.

## Como probarlo

1. Abre el inicio del museo.
2. Escribe algo como `911`, `Ferrari`, `F-35`, `Honda` o `GT3`.
3. Deben aparecer resultados de cualquier sala.
4. Entra a una sala del museo.
5. Escribe otra busqueda.
6. Las tarjetas deben cambiar mientras escribes.
7. Borra el texto.
8. Deben volver todas las piezas.
9. Activa `Solo favoritos` y busca de nuevo.
10. La busqueda debe respetar favoritos y ordenamiento.

## Cual usar

- Usa el buscador global cuando no sabes donde esta una pieza.
- Usa el buscador por sala cuando ya estas dentro de una categoria.
- Mantener ambos es mejor para una wiki porque mejora la navegacion sin perder orden.

## Que no deben hacer

- No crear otro buscador aparte en cada HTML.
- No duplicar funciones de filtrado.
- No filtrar directamente modificando `assets/js/data.js`.
- No quitar `getSearchableVehicleText`, porque permite buscar en varios campos.

## Si agregan nuevos datos

Si agregan campos nuevos en una pieza y quieren que el buscador los lea, incluyan ese campo dentro de `getSearchableVehicleText(item)` en `assets/js/app.js`.
