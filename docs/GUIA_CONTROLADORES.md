# Guia para trabajar con controladores

Este proyecto quedo organizado para trabajar principalmente con controladores Java.

La idea es simple:

```text
URL del navegador -> routes -> controller -> vista HTML
```

## Estructura limpia del backend

```text
src/main/java/com/agencia/museomotor/
├── Main.java
├── config/
│   ├── AppConfig.java
│   └── ServerDispatcher.java
├── controllers/
│   ├── BaseController.java
│   ├── HomeController.java
│   ├── AutoController.java
│   ├── MotoController.java
│   └── AvionController.java
└── routes/
    ├── RouteConfig.java
    ├── RouteHandler.java
    ├── HomeRoutes.java
    ├── AutoRoutes.java
    ├── MotoRoutes.java
    └── AvionRoutes.java
```

## Estructura de vistas

```text
src/main/resources/
├── templates/
│   ├── home/
│   │   └── index.html
│   ├── autos/
│   │   ├── index.html
│   │   ├── calle.html
│   │   ├── deportivos.html
│   │   ├── superdeportivos.html
│   │   ├── hyper-cars.html
│   │   ├── gt3.html
│   │   └── concept-cars.html
│   ├── motos/
│   │   ├── calle.html
│   │   ├── alto-cilindraje.html
│   │   └── gp.html
│   └── aviones/
│       ├── comerciales.html
│       └── guerra.html
└── static/
    ├── css/
    │   ├── styles.css
    │   └── wiki.css
    └── js/
        └── app.js
```

## Que hace cada parte

`Main.java`

Arranca la aplicacion.

`config`

Contiene la configuracion del servidor local. No se cambia casi nunca.

`routes`

Define las URLs. Ejemplo:

```java
appConfig.get("/autos/gt3", autoController::gt3);
```

Eso significa:

```text
Cuando alguien entra a /autos/gt3, Java ejecuta AutoController.gt3()
```

`controllers`

Es la parte principal que vamos a trabajar. Cada metodo devuelve una vista HTML.

Ejemplo:

```java
public String gt3() {
    return view("autos/gt3.html");
}
```

`templates`

Son los HTML que se muestran en el navegador.

`static`

Guarda CSS, JavaScript e imagenes.

## Como agregar una nueva pagina

Ejemplo: quieres agregar una sala de autos llamada `clasicos`.

### 1. Crear la vista

Crea este archivo:

```text
src/main/resources/templates/autos/clasicos.html
```

### 2. Agregar el metodo en el controlador

Abre:

```text
src/main/java/com/agencia/museomotor/controllers/AutoController.java
```

Agrega:

```java
public String clasicos() {
    return view("autos/clasicos.html");
}
```

### 3. Agregar la ruta

Abre:

```text
src/main/java/com/agencia/museomotor/routes/AutoRoutes.java
```

Agrega dentro de `register()`:

```java
appConfig.get("/autos/clasicos", autoController::clasicos);
```

### 4. Agregar el enlace en la portada

Abre:

```text
src/main/resources/templates/home/index.html
```

Agrega un enlace:

```html
<a class="room-card" href="/autos/clasicos">
  <span>Sala</span>
  <strong>Clasicos</strong>
</a>
```

## Como cambiar texto de una pagina

Solo edita el HTML correspondiente en:

```text
src/main/resources/templates/
```

Ejemplo:

```text
src/main/resources/templates/motos/gp.html
```

## Como cambiar estilos

Para la wiki museo:

```text
src/main/resources/static/css/wiki.css
```

Para el catalogo original de autos:

```text
src/main/resources/static/css/styles.css
```

## Como cambiar JavaScript

El catalogo original usa:

```text
src/main/resources/static/js/app.js
```

## Como compilar

Desde PowerShell, entra a la carpeta del proyecto:

```powershell
cd "C:\Users\Jhoan Andres\Documents\1113_Agencia_SAS"
```

Compila:

```powershell
New-Item -ItemType Directory -Force -Path target\classes
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Ejecuta:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

Abre en el navegador:

```text
http://localhost:8080
```

Para apagar el servidor:

```text
Ctrl + C
```

## Reglas para mantenerlo limpio

- No mezclar HTML dentro de Java.
- No poner CSS dentro de los HTML.
- No repetir paginas; si una URL existe, debe tener un metodo claro en su controlador.
- Usar nombres claros: `gt3`, `calle`, `deportivos`, `comerciales`.
- Mantener una clase de rutas por categoria: autos, motos y aviones.
- Mantener un controlador por categoria: autos, motos y aviones.
