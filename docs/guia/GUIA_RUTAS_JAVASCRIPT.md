# Guia de rutas con JavaScript

Este proyecto no usa Java ni backend.

Las rutas se manejan con JavaScript usando hash:

```text
#/autos/deportivos
#/motos/gp
#/aviones/combate
```

Esto permite que funcione con Live Server sin configurar servidor backend.

## Archivos importantes

```text
index.html
assets/js/data.js
assets/js/router.js
assets/js/app.js
assets/css/styles.css
```

## Donde estan las rutas

Las rutas estan en:

```text
assets/js/data.js
```

Ejemplo:

```js
"/autos/deportivos": {
  area: "Autos",
  title: "Autos deportivos",
  description: "Modelos con rendimiento alto y uso posible en calle.",
  folder: "assets/images/autos/deportivos",
  items: []
}
```

## Como crear una ruta nueva

Ejemplo: crear `#/autos/clasicos`.

### 1. Agregar la ruta al menu

En `assets/js/data.js`, busca la seccion `autos` y agrega:

```js
{ path: "/autos/clasicos", label: "Clasicos" }
```

### 2. Agregar el contenido de la ruta

En el mismo archivo, dentro de `routes`, agrega:

```js
"/autos/clasicos": {
  area: "Autos",
  title: "Autos clasicos",
  description: "Vehiculos historicos y de coleccion.",
  folder: "assets/images/autos/clasicos",
  items: []
}
```

### 3. Crear carpeta de imagenes

Crea:

```text
assets/images/autos/clasicos/
```

## Como navegar

En HTML o JavaScript, los enlaces se escriben asi:

```html
<a href="#/autos/deportivos">Autos deportivos</a>
```

No se escribe:

```html
<a href="/autos/deportivos">
```

Porque este proyecto no usa backend.
