# Guia rapida para usar `descargar_imagenes.py`

## Que hace este script

Este script entra a un catalogo web, busca enlaces de productos, entra a cada producto y descarga sus imagenes en carpetas separadas.

## Que necesitan instalar

```bash
pip install requests beautifulsoup4 lxml
```

## Como ejecutarlo

```bash
python descargar_imagenes.py
```

Las imagenes se guardan en la carpeta:

```bash
imagenes_productos
```

## Que partes tienen que cambiar

### 1. URL del sitio

Busquen estas lineas:

```python
BASE = "https://www.truckdesign4x4.com"
BASE_SHOP = f"{BASE}/shop"
```

Cambien eso por el sitio que ustedes quieran usar.

Ejemplo:

```python
BASE = "https://mitienda.com"
BASE_SHOP = f"{BASE}/productos"
```

### 2. Ruta de los productos

En la funcion `get_product_links()` van a encontrar esta logica:

```python
if href.startswith("/tienda/"):
    href = BASE + href
if href.startswith(f"{BASE}/tienda/"):
    links.add(href)
```

Eso significa que el script hoy solo reconoce productos si la URL contiene `/tienda/`.

Si su sitio usa otra ruta, cambien `/tienda/` por la correcta.

Ejemplos:

- `/producto/`
- `/products/`
- `/shop/`

### 3. Boton de pagina siguiente

Tambien en `get_product_links()` aparece esto:

```python
next_link = soup.select_one("a.next.page-numbers")
```

Eso sirve para pasar a la siguiente pagina del catalogo.

Si su sitio usa otra clase o estructura, tienen que cambiar ese selector.

### 4. Titulo del producto

En `get_product_images()` aparece esto:

```python
title_el = soup.select_one("h1.product_title")
```

Si el titulo del producto no esta ahi, cambien ese selector.

Ejemplo:

```python
title_el = soup.select_one("h1")
```

o

```python
title_el = soup.select_one(".product-name")
```

### 5. Selector de imagenes

Tambien en `get_product_images()` van a ver esto:

```python
for img in soup.select(".woocommerce-product-gallery img, img"):
```

Ese selector busca imagenes en una galeria de WooCommerce.

Si su sitio usa otra estructura, cambien ese selector.

Ejemplos:

```python
for img in soup.select(".product-gallery img"):
```

o

```python
for img in soup.select(".gallery img, .product-image img"):
```

### 6. Filtro de imagenes

El script tiene este filtro:

```python
if src and "/wp-content/uploads/" in src:
```

Eso funciona en sitios WordPress, pero en otros puede fallar.

Si no les descarga nada, cambien eso por:

```python
if src:
```

## En resumen

Si quieren adaptarlo a otro sitio, revisen solo estas partes:

1. `BASE`
2. `BASE_SHOP`
3. `/tienda/`
4. `a.next.page-numbers`
5. `h1.product_title`
6. `.woocommerce-product-gallery img, img`
7. `"/wp-content/uploads/"`

## Problemas comunes

### No encuentra productos

- La URL del catalogo esta mal.
- El sitio no usa `/tienda/`.
- Los productos cargan con JavaScript.

### No descarga imagenes

- El selector de imagenes no coincide.
- El filtro `"/wp-content/uploads/"` no aplica a ese sitio.
- La imagen real esta en otro atributo como `data-src` o `data-large_image`.

### Da error 403 o 404

- El sitio bloquea scraping.
- La URL ya no existe.
- Hace falta revisar headers o permisos.

## Recomendacion final

Antes de cambiar el script, abran el sitio en el navegador, inspeccionen el HTML y verifiquen:

- como es la URL del producto
- donde esta el titulo
- donde estan las imagenes
- como funciona la paginacion

Porque claro, descargar imagenes ajenas sin pensar seguro es una idea brillante... hasta que aparecen los derechos de autor.
