# Global Document Catalog

Catálogo visual de documentos de identidad y pasaportes de **196 países**, con filtros por país, región y cobertura. Cada país muestra el anverso del ID, su reverso y la página de datos del pasaporte, indicando expresamente las imágenes o evidencias que faltan.

**[Abrir el catálogo](https://dclemares.github.io/global-document-catalog/)** · [Descargar el proyecto](https://github.com/dclemares/global-document-catalog/archive/refs/heads/main.zip)

## Contenido

- 212 imágenes seleccionadas en 85 países, incluidas 194 recreaciones de demostración.
- Referencias originales disponibles y enlaces a las fuentes de cada modelo.
- Indicaciones de foto de cara y MRZ por cara o página, con su nivel de evidencia.
- 333 asignaciones de ejemplos globales: 82 anversos, 55 reversos y 196 pasaportes.
- 55 países con las tres piezas globales asignadas.

Los ejemplos globales orientan la captura: el front se asigna cuando hay foto y la MRZ está ausente o por confirmar (manteniendo la incertidumbre indicada); el back cuando hay MRZ en el reverso, tenga o no foto; el pasaporte representa una página de datos con foto y MRZ. En los pasaportes, 75 asignaciones se apoyan en el modelo del catálogo y 121 en el estándar ICAO, con el modelo del país sin verificar.

## Abrir y actualizar

Abre `docs/index.html` directamente, sin instalar dependencias. Para servirlo localmente:

```sh
python3 -m http.server 8770 --directory docs
```

Abre <http://localhost:8770/>. Los datos están en `docs/paises.json`, el inventario en `docs/manifest.json`, los totales en `docs/RESUMEN.json` y la plantilla visual en `src/catalog.html`.

Tras modificar los datos o la plantilla, reconstruye y valida:

```sh
python3 scripts/validate.py
```

Incluye los HTML regenerados en el mismo commit. GitHub Pages publica la carpeta `docs` de la rama `main`. El workflow de validación comprueba los archivos y que la versión publicada corresponda a los datos.

## Fuentes y alcance

El catálogo distingue referencias públicas, plantillas y demos generadas. Las fuentes se conservan junto a cada documento; no se afirma que todas las imágenes sean de la última emisión. No encontrar una imagen no significa que el documento no exista.

Las demos contienen datos ficticios y MRZ ilustrativas, sin validación para OCR. El catálogo sirve para diseño y orientación de captura, no para validar identidades ni documentos. No hay un pasaporte ordinario sin MRZ identificado en las referencias reunidas; las emisiones históricas y los documentos de emergencia pueden diferir.

Las imágenes de terceros conservan los derechos y condiciones de sus fuentes; este repositorio no les asigna una licencia de redistribución nueva. Consulta los enlaces de procedencia para reutilizarlas. El detalle de criterios está en [`docs/LEEME.txt`](docs/LEEME.txt).

Inventario revisado el 30 de septiembre de 2026. Las 196 entradas corresponden a los 195 países de la lista inicial más Kosovo.
