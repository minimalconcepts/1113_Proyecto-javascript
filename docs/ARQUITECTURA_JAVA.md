# Arquitectura Java del Museo Wiki del Motor

Este proyecto conserva los HTML originales en la raiz como version estatica y agrega una estructura backend Java profesional en `src/main`.

## Estructura principal

```text
src/main/java/com/agencia/museomotor/
├── Main.java
├── config/
│   ├── AppConfig.java
│   └── ServerDispatcher.java
├── controllers/
│   ├── HomeController.java
│   ├── AutoController.java
│   ├── MotoController.java
│   └── AvionController.java
├── routes/
│   ├── RouteConfig.java
│   ├── RouteHandler.java
│   ├── HomeRoutes.java
│   ├── AutoRoutes.java
│   ├── MotoRoutes.java
│   └── AvionRoutes.java
├── services/
│   └── TemplateService.java
└── models/
    ├── Vehiculo.java
    ├── Auto.java
    ├── Moto.java
    └── Avion.java
```

## Responsabilidades

- `config`: configuracion del servidor, puerto, despacho de rutas y archivos estaticos.
- `routes`: definicion de URLs limpias como `/autos/deportivos`.
- `controllers`: conectan cada ruta con una vista.
- `services`: contienen logica reutilizable. Por ahora `TemplateService` carga HTML desde recursos.
- `models`: representan entidades del dominio: vehiculos, autos, motos y aviones.
- `resources/templates`: vistas HTML separadas por modulo.
- `resources/static`: CSS, JavaScript e imagenes.

## Flujo MVC

```text
Navegador -> Ruta -> Controller -> Service -> Template HTML -> Respuesta
```

Ejemplo:

```text
/autos/gt3
  -> AutoRoutes
  -> AutoController.gt3()
  -> TemplateService.render("autos/gt3.html")
  -> resources/templates/autos/gt3.html
```

## Rutas creadas

```text
/
/autos
/autos/calle
/autos/deportivos
/autos/superdeportivos
/autos/hyper-cars
/autos/gt3
/autos/concept-cars
/motos/calle
/motos/alto-cilindraje
/motos/gp
/aviones/comerciales
/aviones/guerra
```

## Como ejecutar

Instala un JDK y verifica:

```powershell
javac -version
java -version
```

Compila desde la raiz del proyecto:

```powershell
New-Item -ItemType Directory -Force -Path target\classes
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
Copy-Item -Recurse -Force src\main\resources\* target\classes\
java -cp target\classes com.agencia.museomotor.Main
```

Luego abre:

```text
http://localhost:8080
```

## Recomendaciones

- Mantener una clase de rutas por modulo: `AutoRoutes`, `MotoRoutes`, `AvionRoutes`.
- Mantener un controlador por modulo: `AutoController`, `MotoController`, `AvionController`.
- No poner logica de negocio dentro del HTML.
- No duplicar CSS ni JS; usar `resources/static`.
- Agregar repositorios cuando los datos salgan de una base de datos, JSON o API.
- Si el proyecto crece, migrar esta estructura a Spring Boot o Javalin sin cambiar la idea principal de capas.
