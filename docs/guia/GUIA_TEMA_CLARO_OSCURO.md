# Guia para cambiar el tema claro y oscuro

El proyecto tiene un boton de tema en la barra superior, al lado del menu.

## Como usarlo

1. Abre el proyecto con Live Server.
2. Busca el boton con icono de luna o sol en la barra superior.
3. Presiona la luna para activar el tema oscuro.
4. Presiona el sol para volver al tema claro.

La pagina recuerda la opcion automaticamente con `localStorage`, asi que al recargar conserva el tema elegido.

## Donde se cambian los colores

Los colores principales estan en:

```txt
assets/css/styles.css
```

Busca estas partes:

```css
:root {
  --bg: #f3f0ea;
  --surface: #ffffff;
  --ink: #1d1d1d;
}

:root[data-theme="dark"] {
  --bg: #111111;
  --surface: #1d1c1a;
  --ink: #f6f2ea;
}
```

## Que significa cada variable

- `--bg`: color del fondo general.
- `--surface`: color de tarjetas, menu y paneles.
- `--ink`: color principal del texto.
- `--muted`: color de textos secundarios.
- `--line`: color de bordes.
- `--red`: color de acento.
- `--header-bg`: color del encabezado.
- `--image-bg`: fondo de los cuadros de imagen cuando no cargan.

## Donde esta la logica del boton

La logica esta en:

```txt
assets/js/app.js
```

Busca:

```js
const THEME_KEY = "carDealerMuseumTheme";
```

Esa parte guarda y aplica el tema elegido.
