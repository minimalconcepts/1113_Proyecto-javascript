# Guia del randomizador

El randomizador elige una pieza al azar para aprender algo nuevo.

## Donde se abre

```text
#/random
```

Tambien aparece en la barra superior como:

```text
Random
```

## Que muestra

El randomizador muestra:

- una tarjeta aleatoria
- nombre de la pieza
- categoria
- boton para leer historia
- boton para elegir otra pieza

## Archivo principal

La logica esta en:

```text
assets/js/app.js
```

Funciones importantes:

```js
renderRandomizer()
getAllItems()
```

## De donde salen las piezas

Las piezas salen de:

```text
assets/js/data.js
```

Solo aparecen en el randomizador las piezas que esten dentro de `items`.

Ejemplo:

```js
items: [
  {
    name: "Audi R8 V10",
    type: "Deportivo",
    year: "2021",
    detail: "$210,000",
    image: "assets/images/autos/deportivos/audi-r8-v10.jpg"
  }
]
```
