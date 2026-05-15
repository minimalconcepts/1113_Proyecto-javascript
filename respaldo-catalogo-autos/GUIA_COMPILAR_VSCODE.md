# Guia para compilar y ejecutar desde VS Code

Esta guia explica paso a paso como compilar y levantar el proyecto Java del museo desde Visual Studio Code.

## 1. Abrir el proyecto en VS Code

1. Abre Visual Studio Code.
2. Ve a:

```text
File > Open Folder
```

3. Selecciona esta carpeta:

```text
C:\Users\PROGRAMADOR\Documents\1113_Agencia_SAS
```

## 2. Abrir la terminal

En VS Code abre:

```text
Terminal > New Terminal
```

Si la terminal no queda en la carpeta del proyecto, escribe:

```powershell
cd "C:\Users\PROGRAMADOR\Documents\1113_Agencia_SAS"
```

## 3. Verificar Java

Primero revisa Java:

```powershell
java -version
```

Luego revisa el compilador:

```powershell
javac -version
```

Si ambos muestran una version, puedes compilar.

## 4. Compilar paso a paso

Ejecuta estos comandos uno por uno en la terminal.

### Paso 1: crear la carpeta de compilacion

```powershell
New-Item -ItemType Directory -Force -Path target\classes
```

### Paso 2: buscar todos los archivos Java

```powershell
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
```

### Paso 3: compilar el codigo Java

```powershell
javac -encoding UTF-8 -d target\classes $sources
```

### Paso 4: copiar HTML, CSS e imagenes

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

## 5. Ejecutar el servidor

Despues de compilar, ejecuta:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

Si todo esta bien, debe aparecer algo parecido a:

```text
Museo Wiki del Motor disponible en http://localhost:8080
```

## 6. Abrir el proyecto

Abre en el navegador:

```text
http://localhost:8080
```

Rutas disponibles:

```text
http://localhost:8080/
http://localhost:8080/autos/calle
http://localhost:8080/autos/deportivos
http://localhost:8080/autos/superdeportivos
http://localhost:8080/autos/hyper-cars
http://localhost:8080/autos/gt3
http://localhost:8080/autos/concept-cars
http://localhost:8080/motos/calle
http://localhost:8080/motos/alto-cilindraje
http://localhost:8080/motos/gp
http://localhost:8080/aviones/comerciales
http://localhost:8080/aviones/guerra
```

## 7. Apagar el servidor

En la misma terminal donde esta corriendo el servidor, presiona:

```text
Ctrl + C
```

## 8. Codigo completo para copiar y pegar

Este bloque hace todo: entrar al proyecto, compilar, copiar recursos y ejecutar.

```powershell
cd "C:\Users\Jhoan Andres\Documents\1113_Agencia_SAS"
New-Item -ItemType Directory -Force -Path target\classes
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
Copy-Item -Recurse -Force src\main\resources\* target\classes\
java -cp target\classes com.agencia.museomotor.Main
```

## 9. Si solo cambias HTML, CSS o imagenes

Si editaste algo dentro de:

```text
src/main/resources/
```

No necesitas compilar Java otra vez. Solo ejecuta:

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Luego recarga el navegador.

## 10. Si cambias controladores o rutas

Si editaste algo dentro de:

```text
src/main/java/
```

Compila otra vez:

```powershell
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
```

Luego ejecuta:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

## 11. Si `javac -version` no funciona

Si este comando falla:

```powershell
javac -version
```

Significa que falta el JDK o que Windows no lo encuentra.

Pasos recomendados:

1. Instala un JDK.
2. Cierra VS Code completamente.
3. Abre VS Code otra vez.
4. Prueba:

```powershell
javac -version
```

Si todavia falla, agrega al PATH la carpeta `bin` del JDK.

Ejemplo:

```text
C:\Program Files\Java\jdk-21\bin
```

Despues de modificar el PATH, cierra y abre VS Code otra vez.

## 12. Errores comunes

### Error: `javac no se reconoce`

Solucion:

- Instalar JDK.
- Agregar el JDK al PATH.
- Reiniciar VS Code.

### Error: `Address already in use`

Significa que el puerto `8080` ya esta ocupado.

Soluciones:

- Apaga el servidor anterior con `Ctrl + C`.
- O cambia el puerto en:

```text
src/main/java/com/agencia/museomotor/Main.java
```

Busca:

```java
AppConfig appConfig = new AppConfig(8080);
```

Cambia por:

```java
AppConfig appConfig = new AppConfig(8081);
```

### No se ven estilos o imagenes

Ejecuta otra vez:

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Y revisa que las rutas empiecen con:

```text
/static/css/
/static/images/
```

Ejemplo correcto:

```html
<link rel="stylesheet" href="/static/css/wiki.css" />
<img src="/static/images/autos/deportivos/audi-r8.jpg" alt="Audi R8" />
```
