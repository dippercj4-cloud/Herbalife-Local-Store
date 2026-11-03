# Herbalife Store

Catálogo local para explorar los productos de Herbalife Store y preparar cotizaciones por WhatsApp.

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox o Safari).
- No requiere dependencias ni servidor.
- La aplicación funciona abriendo directamente `index.html` desde el sistema de archivos.

## Estructura

```text
herbalife-store/
├── index.html
├── catalogo.html
├── cotizacion.html
├── contacto.html
├── README.md
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
└── docs/
    └── instrucciones.md
```

## Cómo usar

1. Abre `index.html` con tu navegador.
2. Explora el catálogo desde la sección de productos.
3. Agrega artículos a “Mi cotización”.
4. Modifica cantidades o elimina productos si es necesario.
5. Envía la cotización por WhatsApp desde la vista de cotización.

## Catálogo

El catálogo contiene 30 productos en dos categorías: Cuidado Personal y Facial (8) y Nutrición y Suplementos (22). Los nombres proceden del inventario configurado en `assets/js/products.js`.

No se muestran precios ni presentaciones sin confirmar. Las fotos disponibles están guardadas localmente en `assets/img/products/catalog/`; cada campo `imageSource` de `assets/js/products.js` conserva el enlace de referencia de la página pública donde se encontró. Las ilustraciones SVG locales se identifican como vectoriales y no representan envases o presentaciones reales. Las descripciones son editoriales y neutrales; no atribuyen efectos médicos ni afirmaciones de salud.

Beta Heart, Té Pequeño y Batido F1 utilizan ilustraciones vectoriales locales porque no se encontró una foto de producto suficientemente específica para estos artículos.

La selección de cotización se guarda en el almacenamiento local del navegador y se envía al número configurado en `assets/js/config.js`.

## Personalización

- Edita los textos en `index.html`, `catalogo.html`, `cotizacion.html` y `contacto.html`.
- Ajusta el número de WhatsApp en `assets/js/config.js`.
- Añade o modifica productos en `assets/js/products.js`.
- El archivo SVG en `assets/img/products/placeholder-product.svg` funciona como placeholder local.

## Nota de cumplimiento

Este proyecto no utiliza frameworks externos, APIs remotas ni servidores. Todo se trabaja con HTML, CSS y JavaScript local.
