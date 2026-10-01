# Autorrellenado con foto del documento · prototipo

Prototipo navegable del flujo "escanear documento → rellenar el formulario" para el registro de huéspedes.
Cubre **196 países** del catálogo de documentos y usa solo recreaciones con IA y datos ficticios.

## Cómo probarlo
- Abre `index.html` en el navegador (o la versión publicada en GitHub Pages, ruta `/autoform/`).
- Pulsa **Escanear documento** → elige país y tipo → *Prepara tu documento* → *Hacer la foto*.
- **Cámara real:** en una dirección HTTPS (GitHub Pages) o en `localhost` el navegador pide permiso y el visor
  muestra tu cámara con el esquema del documento encima. Si no das permiso o no hay cámara, se usa una simulación.
  La imagen solo se muestra en pantalla: no se guarda ni se envía.
- La lectura (OCR) es simulada: al "hacer la foto" se rellenan datos de ejemplo.

## Estructura
- `index.html`, `styles.css`, `app.js`: la aplicación (sin dependencias).
- `documents.js`: catálogo país → documentos (imagen y cara a fotografiar).
- `layouts.js`: zonas de cada documento para dibujar el esquema.
- `scenarios.js`: los 20 perfiles simulados del estudio (`DECISIONES.md`, `VERIFICACION.md`).
- `assets/`: imágenes (WebP con transparencia) y créditos.

## Límites
Imágenes recreadas con IA a partir de referencias públicas; datos y MRZ ficticios. No sirve para validar
identidades. Las posiciones del esquema son aproximadas.
