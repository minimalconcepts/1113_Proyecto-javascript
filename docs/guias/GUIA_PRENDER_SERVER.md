# Guia para prender el servidor

Esta guia explica lo minimo que se necesita para prender el servidor Java del proyecto y mostrar la pagina en el navegador.

## 1. Aplicaciones requeridas

Para prender el servidor se necesita:

- Visual Studio Code.
- Java JDK u OpenJDK.
- Terminal de PowerShell.

Importante:

No basta con tener solo Java para ejecutar programas. Tambien se necesita el compilador `javac`, que viene con el JDK.

## 2. Si no tienes Java ni javac

Si estos comandos no funcionan:

```powershell
java -version
```

```powershell
javac -version
```

Instala un JDK.

Opciones recomendadas:

- Microsoft Build of OpenJDK.
- Eclipse Temurin OpenJDK.
- Oracle JDK.

Recomendado para el proyecto:

```text
OpenJDK 21
```

Despues de instalarlo:

1. Cierra VS Code completamente.
2. Vuelve a abrir VS Code.
3. Abre una terminal nueva.
4. Prueba otra vez:

```powershell
java -version
```

```powershell
javac -version
```

## 3. Si Java funciona pero javac no

Si este comando funciona:

```powershell
java -version
```

Pero este no:

```powershell
javac -version
```

Significa que probablemente tienes Java instalado, pero no tienes el JDK completo o Windows no encuentra la carpeta `bin` del JDK.

Busca una ruta parecida a esta:

```text
C:\Program Files\Java\jdk-21\bin
```

O esta:

```text
C:\Program Files\Microsoft\jdk-21...\bin
```

Esa carpeta debe estar en el `PATH` de Windows.

Pasos para agregarla:

1. Busca en Windows: `Variables de entorno`.
2. Abre `Editar las variables de entorno del sistema`.
3. Entra a `Variables de entorno`.
4. En `Variables del sistema`, busca `Path`.
5. Clic en `Editar`.
6. Clic en `Nuevo`.
7. Pega la ruta del `bin` del JDK.
8. Acepta todo.
9. Cierra VS Code.
10. Abre VS Code otra vez.
11. Prueba:

```powershell
javac -version
```

## 4. Si VS Code no detecta OpenJDK

Si Java esta instalado pero VS Code no lo reconoce:

1. Cierra VS Code completamente.
2. Abre VS Code otra vez.
3. Abre una terminal nueva.
4. Ejecuta:

```powershell
java -version
```

```powershell
javac -version
```

Si todavia no funciona, reinicia el computador.

Si sigue sin funcionar, revisa que el `PATH` tenga la ruta del JDK, por ejemplo:

```text
C:\Program Files\Microsoft\jdk-21...\bin
```

Tambien puedes instalar en VS Code la extension:

```text
Extension Pack for Java
```

Esta extension ayuda a VS Code a detectar proyectos Java, aunque para este proyecto lo mas importante es que la terminal reconozca `java` y `javac`.

## 5. Verificar requisitos

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

## 6. Abrir el proyecto en VS Code

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

## 7. Compilar el proyecto

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

## 8. Prender el servidor

Ejecuta:

```powershell
java -cp target\classes com.agencia.museomotor.Main
```

Si todo esta bien, debe salir algo parecido a:

```text
Museo Wiki del Motor disponible en http://localhost:8080
```

## 9. Abrir la pagina

En el navegador abre:

```text
http://localhost:8080
```

## 10. Rutas principales

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

## 11. Apagar el servidor

En la terminal donde esta prendido el servidor, presiona:

```text
Ctrl + C
```

## 12. Si el puerto 8080 esta ocupado

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

## 13. Codigo completo para copiar y pegar

Este bloque sirve para compilar y prender todo desde cero:

```powershell
cd "C:\Users\Jhoan Andres\Documents\1113_Agencia_SAS"
New-Item -ItemType Directory -Force -Path target\classes
$sources = Get-ChildItem -Path src\main\java -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d target\classes $sources
Copy-Item -Recurse -Force src\main\resources\* target\classes\
java -cp target\classes com.agencia.museomotor.Main
```

## 14. Si cambias imagenes, HTML o CSS

Si solo cambiaste archivos dentro de:

```text
src/main/resources/
```

No tienes que recompilar Java. Solo copia recursos:

```powershell
Copy-Item -Recurse -Force src\main\resources\* target\classes\
```

Luego recarga el navegador.

## 15. Si cambias rutas o controladores

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
