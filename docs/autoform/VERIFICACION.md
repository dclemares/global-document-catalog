# Verificación del prototipo

30 de septiembre de 2026. Se prueba el comportamiento de la demo; no un OCR real.

- 5 pruebas automatizadas de aplicación de datos: relleno de campos vacíos, preservación de datos ajenos a la lectura, conflictos conservados por defecto, sustitución explícita por campo, valores ausentes e idempotencia de una lectura idéntica. Resultado: 5/5.
- Navegador: captura simulada de pasaporte → cierre del panel → seis campos rellenos, sin revisión intermedia.
- Lectura parcial: el número vacío muestra error; introducir un valor lo aplica junto al resto de datos.
- Conflictos: el nombre «Diego» se conserva si no se acepta el valor diferente de la foto.
- Permiso denegado: mensaje de recuperación y ruta de galería hasta formulario relleno.
- Reflejos: segundo fallo destaca la vuelta al formulario; recuperación simulada rellena campos.
- Cancelación durante lectura: el texto escrito permanece; tras pasar el tiempo de respuesta, el diálogo sigue cerrado y la lectura no aplica cambios.
- Vista de 390 × 844: sin desbordamiento horizontal en el panel; contenido vertical desplazable; captura y relleno completados.
- Seis etiquetas textuales de procedencia acompañan a los campos leídos, además del color.
- Sin errores de consola observados durante las rutas comprobadas.

Pendiente para producción: cámara/permisos reales, OCR y formatos de archivo, diagnóstico de calidad, normalización de orientación, latencias y cancelación del proveedor, pruebas con lectores de pantalla y dispositivos físicos. Las 20 simulaciones de perfiles son exploración de diseño, no 20 sesiones de usuarios ni una certificación de accesibilidad.

Para ejecutar las pruebas de datos:

```sh
node --test autoform-mrz/app.test.cjs
```

## Actualización de país y documento

- 8/8 pruebas automatizadas, incluyendo resolución de anverso/reverso/página de datos y rechazo de combinaciones desconocidas.
- No se puede continuar sin país y tipo. Cambiar España/DNI a Francia deja el tipo vacío y desactiva continuar.
- España/DNI muestra reverso; Francia/modelo antiguo muestra anverso; España/pasaporte muestra página de datos sobre una libreta abierta.
- Captura de DNI → datos de muestra en el formulario. No se añade envío ni otro paso posterior.
- Fotografías de muestra integradas con marco exterior y resaltado de MRZ mediante HTML/CSS; se mantienen los originales.
- Vista móvil 390 × 844: DNI y pasaporte muestran documento, resaltado y botones de captura/cancelación. Capturas guardadas en mockup-dni.png y mockup-pasaporte.png.
