# Guia de imagenes

Las imagenes van dentro de:

```text
assets/images/
```

## Carpetas recomendadas

```text
assets/images/
├── autos/
│   ├── calle/
│   ├── deportivos/
│   ├── superdeportivos/
│   ├── hyper-cars/
│   ├── gt3/
│   └── concept-cars/
├── motos/
│   ├── calle/
│   ├── alto-cilindraje/
│   └── gp/
└── aviones/
    ├── comerciales/
    └── combate/
```

## Como nombrar imagenes

Usa nombres sin espacios, sin tildes y en minusculas.

Correcto:

```text
audi-r8-v10.jpg
aston-martin-valhalla.jpg
suzuki-gsx-rr.jpg
airbus-a380.jpg
f-35.jpg
```

Evita:

```text
Mi foto.jpg
avión bonito.png
imagen 1.jpeg
```

## Como conectar una imagen

En `assets/js/data.js`, cada pieza tiene una propiedad `image`.

Ejemplo:

```js
{
  name: "Audi R8 V10",
  type: "Deportivo",
  year: "2021",
  detail: "$210,000",
  image: "assets/images/autos/deportivos/audi-r8-v10.jpg"
}
```

## Imagenes cuadradas

Las tarjetas ya estan preparadas para mostrar imagenes cuadradas.

El CSS usa:

```css
aspect-ratio: 1 / 1;
object-fit: cover;
```

Eso significa que la imagen se recorta sin deformarse.

## Si una imagen no aparece

Revisa:

- Que el archivo exista.
- Que el nombre sea exactamente igual.
- Que la extension coincida: `.jpg`, `.png`, `.webp`.
- Que la ruta en `data.js` empiece con `assets/images/`.
