# Instrucciones de uso local

## Objetivo

Crear una plataforma visual de catálogo y cotización local para un negocio de nutrición y bienestar, sin depender de bases de datos ni servicios externos.

## Reglas del proyecto

- Todo debe funcionar abriendo archivos locales directamente desde el navegador.
- No usar frameworks externos ni APIs remotas.
- Mantener la lógica basada en JavaScript vanilla.
- Trabajar con almacenamiento local (`localStorage`) para la lista de cotización.
- No mostrar precios definitivos ni inventar detalles oficiales de productos.

## Flujo recomendado

1. Explorar productos desde el catálogo.
2. Filtrar por categoría o buscar por nombre.
3. Añadir a la cotización.
4. Revisar cantidades y total de productos.
5. Enviar vía WhatsApp para confirmar comercialmente.

## Archivos clave

- `index.html`: presentación general del negocio.
- `catalogo.html`: catálogo interactivo.
- `cotizacion.html`: vista de selección y resumen.
- `contacto.html`: datos de contacto y formulario de consulta.
- `assets/js/products.js`: listado de productos base.
- `assets/js/cart.js`: lógica de cotización local.
- `assets/js/whatsapp.js`: generación del enlace de WhatsApp.

## Extensión

Puedes personalizar el proyecto sustituyendo los datos de prueba por el catálogo real del propietario y ajustando la identidad visual.
