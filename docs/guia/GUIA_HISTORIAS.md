# Guia para agregar historias tipo Wikipedia

Cada tarjeta de vehiculo se puede abrir como una ficha tipo wiki.

La ruta se genera automaticamente con el nombre.

Ejemplo:

```text
#/wiki/audi-r8-v10
#/wiki/f-35-lightning-ii
```

## Donde se escribe la historia

Abre:

```text
assets/js/data.js
```

Busca el vehiculo y agrega la propiedad `history`.

Ejemplo:

```js
{
  name: "Audi R8 V10",
  type: "Deportivo",
  year: "2021",
  detail: "$210,000",
  image: "assets/images/autos/deportivos/audi-r8-v10.jpg",
  history: "El Audi R8 V10 fue uno de los deportivos mas importantes de Audi porque llevo tecnologia inspirada en competicion a un auto de calle."
}
```

## Que debe tener una buena historia

Puedes escribir:

- origen del vehiculo
- marca o fabricante
- anio importante
- motor o tecnologia
- por que es famoso
- uso principal
- curiosidades
- importancia dentro de su categoria

## Como abrir una ficha

En la pagina, haz click sobre la tarjeta o la imagen.

La app abre una vista con:

- imagen
- nombre
- tipo
- anio
- detalle
- sala
- historia
- notas para completar

## Si no se escribe history

La ficha igual abre, pero muestra un texto guia para completar despues.
