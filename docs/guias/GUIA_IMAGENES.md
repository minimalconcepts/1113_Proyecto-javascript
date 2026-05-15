# Guia para agregar imagenes

Las imagenes deben guardarse dentro de:

```text
src/main/resources/static/images/
```

## Carpetas por categoria

```text
src/main/resources/static/images/
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

Usen nombres sin espacios, sin tildes y en minusculas.

Ejemplos correctos:

```text
audi-r8-v10.jpg
aston-martin-valhalla.jpg
ducati-panigale-v4.jpg
boeing-747.jpg
f-22-raptor.jpg
```

## Como usar una imagen en HTML

Si guardan una imagen aqui:

```text
src/main/resources/static/images/autos/deportivos/audi-r8-v10.jpg
```

En el HTML se pone asi:

```html
<img
  src="/static/images/autos/deportivos/audi-r8-v10.jpg"
  alt="Audi R8 V10"
/>
```

No se pone la ruta completa de Windows. La ruta siempre empieza con:

```text
/static/images/
```

## Imagenes en cuadritos

Las tarjetas ya estan configuradas para que las imagenes salgan en cuadro.

Esto lo hace el CSS:

```css
aspect-ratio: 1 / 1;
object-fit: cover;
```

Eso significa:

- La imagen queda cuadrada.
- No se deforma.
- Si la imagen es muy horizontal o vertical, se recorta un poco para que se vea ordenada.

## Ejemplo completo de tarjeta

```html
<article class="vehicle-card">
  <img
    src="/static/images/autos/deportivos/audi-r8-v10.jpg"
    alt="Audi R8 V10"
  />
  <div>
    <h3>Audi R8 V10</h3>
    <p><strong>Tipo:</strong> Deportivo</p>
    <p><strong>Anio:</strong> 2021</p>
    <p><strong>Precio:</strong> $210,000</p>
  </div>
</article>
```

## Donde editar cada sala

```text
src/main/resources/templates/autos/calle.html
src/main/resources/templates/autos/deportivos.html
src/main/resources/templates/autos/superdeportivos.html
src/main/resources/templates/autos/hyper-cars.html
src/main/resources/templates/autos/gt3.html
src/main/resources/templates/autos/concept-cars.html
src/main/resources/templates/motos/calle.html
src/main/resources/templates/motos/alto-cilindraje.html
src/main/resources/templates/motos/gp.html
src/main/resources/templates/aviones/comerciales.html
src/main/resources/templates/aviones/combate.html
```

## Despues de agregar imagenes

Copien otra vez los recursos al `target`:

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Luego recarguen el navegador.
