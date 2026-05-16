# Guia de pilotos famosos

El apartado de pilotos famosos sirve para conectar los vehiculos con personas importantes de la historia.

## Donde se abre

```text
#/pilotos
```

Tambien aparece en la barra superior como:

```text
Pilotos
```

## Donde se agregan pilotos

Abre:

```text
assets/js/data.js
```

Busca:

```js
pilots: []
```

Agrega un piloto asi:

```js
{
  name: "Nombre del piloto",
  area: "Automovilismo",
  highlight: "Dato importante",
  description: "Descripcion corta de su historia."
}
```

## Categorias recomendadas

Puedes usar:

```text
Automovilismo
Motociclismo
Aviacion
```

## Archivo que renderiza pilotos

La vista se crea en:

```text
assets/js/app.js
```

Funciones:

```js
renderPilots()
renderPilotCard()
```
