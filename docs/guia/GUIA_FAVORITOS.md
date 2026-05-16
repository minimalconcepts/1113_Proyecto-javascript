# Guia de favoritos

El apartado de favoritos permite guardar piezas para estudiarlas despues.

## Donde se abre

```text
#/favoritos
```

Tambien aparece en la barra superior como:

```text
Favoritos
```

## Como funciona

Cada tarjeta tiene un boton:

```text
Favorito
```

Al presionarlo, la pieza se guarda en el navegador usando `localStorage`.

## Archivo principal

La logica esta en:

```text
assets/js/app.js
```

Funciones importantes:

```js
getFavorites()
saveFavorites()
isFavorite()
toggleFavorite()
renderFavorites()
```

## Importante

Los favoritos se guardan solo en el navegador donde se usan.

Si se abre el proyecto en otro computador o navegador, la lista empieza vacia.
