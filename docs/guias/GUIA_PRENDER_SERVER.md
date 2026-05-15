# Guia para prender el servidor

Esta guia explica lo minimo que se necesita para prender el servidor Java del proyecto y mostrar la pagina en el navegador.

## 1. Requisitos

Antes de prender el servidor, verifica que tengas Java y `javac`.

Abre la terminal de VS Code y ejecuta:

```powershell
java -version
```

Luego:

```powershell
javac -version
```

Si los dos comandos muestran una version, puedes continuar.

## 2. Abrir el proyecto en VS Code

Abre esta carpeta en Visual Studio Code:

```text
C:\Users\PROGRAMADOR\Documents\1113_Agencia_SAS
```

Luego abre una terminal:

```text
Terminal > New Terminal
```

Si la terminal no esta ubicada en el proyecto, ejecuta:

```powershell
cd "C:\Users\PROGRAMADOR\Documents\1113_Agencia_SAS"
```

## 3. Compilar el proyecto

Ejecuta estos comandos en orden:

```powershell
New-Item -ItemType Directory -Force -Path target\classes
```

```powershell
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
```

```powershell
javac -encoding UTF-8 -d target\classes $sources
```

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

## 4. Prender el servidor

Ejecuta:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

Si todo esta bien, debe salir algo parecido a:

```text
Museo Wiki del Motor disponible en http://localhost:8080
```

## 5. Abrir la pagina

En el navegador abre:

```text
http://localhost:8080
```

## 6. Rutas principales

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
http://localhost:8080/aviones/combate
```

## 7. Apagar el servidor

En la terminal donde esta prendido el servidor, presiona:

```text
Ctrl + C
```

## 8. Si el puerto 8080 esta ocupado

Si aparece un error como:

```text
Address already in use
```

Significa que ya hay otro servidor usando el puerto `8080`.

Para ver quien lo esta usando:

```powershell
netstat -ano | findstr :8080
```

Busca el numero final de la linea. Ese numero es el PID.

Ejemplo:

```text
TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    3288
```

Para apagarlo:

```powershell
Stop-Process -Id 3288
```

Cambia `3288` por el numero que te salga.

Luego vuelve a prender el servidor:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

## 9. Codigo completo para copiar y pegar

Este bloque sirve para compilar y prender todo desde cero:

```powershell
cd "C:\Users\Jhoan Andres\Documents\1113_Agencia_SAS"
New-Item -ItemType Directory -Force -Path target\classes
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
Copy-Item -Recurse -Force src\main\resources\* target\classes\
java -cp target\classes com.agencia.museomotor.Main
```

## 10. Si cambias imagenes, HTML o CSS

Si solo cambiaste archivos dentro de:

```text
src/main/resources/
```

No tienes que recompilar Java. Solo copia recursos:

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Luego recarga el navegador.

## 11. Si cambias rutas o controladores

Si cambiaste archivos dentro de:

```text
src/main/java/
```

Vuelve a compilar:

```powershell
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
```

Luego prende otra vez:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```
