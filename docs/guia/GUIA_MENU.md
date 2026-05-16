# Guia del menu principal

El menu principal organiza los botones de navegacion para que la barra superior no quede llena.

## Donde esta el menu

El HTML del menu esta en:

```text
index.html
```

Busca:

```html
<div class="nav-menu" id="main-menu">
```

## Como agregar un enlace

Dentro del grupo que corresponda, agrega un enlace:

```html
<a href="#/autos/deportivos">Autos</a>
```

Para rutas JavaScript recuerda usar `#`:

```text
#/ruta
```

Ejemplo:

```html
<a href="#/favoritos">Favoritos</a>
```

## Grupos actuales

El menu esta separado en:

```text
Colecciones
Herramientas
```

## Donde estan los estilos

Los estilos del menu estan en:

```text
assets/css/styles.css
```

Clases importantes:

```css
.menu-wrapper
.menu-toggle
.nav-menu
.nav-menu.is-open
```

## Donde esta la logica

La logica para abrir y cerrar el menu esta en:

```text
assets/js/app.js
```

El menu se cierra automaticamente cuando haces click en un enlace.
