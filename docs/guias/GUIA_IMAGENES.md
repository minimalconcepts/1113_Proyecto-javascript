# Guia para agregar imagenes al museo

Esta guia explica donde poner imagenes y como usarlas en las paginas HTML del proyecto.

## Donde van las imagenes

Todas las imagenes del proyecto Java deben ir dentro de:

```text
src/main/resources/static/images/
```

La organizacion recomendada es:

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
    └── guerra/
```

Si una carpeta no existe, se puede crear manualmente.

## Como nombrar las imagenes

Usen nombres claros, sin espacios y sin tildes.

Correcto:

```text
aston-martin-valhalla.jpg
audi-r8-v10.jpg
boeing-747.jpg
ducati-panigale-v4.jpg
```

Eviten:

```text
imagen 1.jpg
mi foto.png
carro bonito.jpeg
avión guerra.png
```

## Formatos recomendados

Pueden usar:

```text
.jpg
.jpeg
.png
.webp
```

Para fotos de vehiculos, lo mejor suele ser `.jpg` o `.webp`.

## Como poner una imagen en un HTML

Si guardan una imagen aqui:

```text
src/main/resources/static/images/autos/deportivos/audi-r8-v10.jpg
```

En el HTML se usa asi:

```html
<img
  src="/static/images/autos/deportivos/audi-r8-v10.jpg"
  alt="Audi R8 V10"
/>
```

Importante:

- La ruta en HTML siempre empieza con `/static/images/`.
- No se escribe `src/main/resources`.
- El `alt` debe describir la imagen.

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

## En que archivo editar

Las vistas estan en:

```text
src/main/resources/templates/
```

Ejemplos:

```text
src/main/resources/templates/autos/deportivos.html
src/main/resources/templates/autos/hyper-cars.html
src/main/resources/templates/motos/gp.html
src/main/resources/templates/aviones/guerra.html
```

Si quieren agregar una imagen a la sala de hyper cars, editan:

```text
src/main/resources/templates/autos/hyper-cars.html
```

Y guardan la imagen en:

```text
src/main/resources/static/images/autos/hyper-cars/
```

## Despues de agregar imagenes

Hay que recompilar y copiar recursos al `target`.

Desde PowerShell, dentro del proyecto:

```powershell
cd "C:\Users\PROGRAMADOR\Documents\1113_Agencia_SAS"
```

Ejecutar:

```powershell
New-Item -ItemType Directory -Force -Path target\classes
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Luego levantar el servidor:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

Abrir:

```text
http://localhost:8080
```

## Reglas para mantener orden

- Cada imagen debe ir en la carpeta de su categoria.
- No usar espacios ni tildes en nombres de archivos.
- Usar nombres descriptivos.
- No guardar imagenes en la raiz del proyecto.
- No guardar imagenes dentro de `templates`.
- No usar rutas de Windows como `C:\Users\...` dentro del HTML.
- Usar siempre rutas web como `/static/images/...`.
