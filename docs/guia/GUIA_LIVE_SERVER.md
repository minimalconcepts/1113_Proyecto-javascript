# Guia para prender con Live Server

Este proyecto se prende con Live Server porque usa HTML, CSS y JavaScript.

No necesitas Java.

No necesitas `javac`.

## Requisitos

- Visual Studio Code.
- Extension Live Server.

## Como abrir

1. Abre VS Code.
2. Abre la carpeta:

```text
C:\Users\Jhoan Andres\Documents\1113_Agencia_SAS
```

3. Abre `index.html`.
4. Clic derecho.
5. Selecciona:

```text
Open with Live Server
```

## URL esperada

Live Server abre algo parecido a:

```text
http://127.0.0.1:5500/index.html
```

Las rutas se ven asi:

```text
http://127.0.0.1:5500/index.html#/autos/deportivos
http://127.0.0.1:5500/index.html#/motos/gp
http://127.0.0.1:5500/index.html#/aviones/combate
```

## Si no abre Live Server

Instala la extension:

```text
Live Server
```

Despues reinicia VS Code.

## Si cambias HTML, CSS o JS

Guarda el archivo y recarga el navegador.

No hay que compilar.

## Si agregas imagenes

Ponlas en:

```text
assets/images/
```

Luego actualiza `assets/js/data.js`.
