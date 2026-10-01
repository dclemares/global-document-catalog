# Autorrellenado con fotografía del documento

Propuesta y prototipo · 30 de septiembre de 2026

## Límite exacto

**Inicio:** clic en «Escanear documento», dentro de la tarjeta de autorrellenado de la captura del usuario.

**Fin correcto:** se han leído los datos y los campos correspondientes del formulario están rellenos.

Incluye preparación, indicaciones, permisos, toma de foto o imagen existente, lectura, errores, reintentos y aplicación de valores. Cancelar o volver a la entrada manual son salidas del escaneo, no éxitos de lectura.

Quedan fuera envío del formulario, validación del registro, gestión de huéspedes, menores, pagos, aceptación legal del documento y cualquier paso posterior al autorrellenado. La caducidad se copia como dato; este flujo no decide si el documento es admisible. La captura solo muestra el punto de entrada: no conocemos el escáner actual, así que los riesgos no se presentan como fallos comprobados del producto.

## Método

Se siguen las cinco etapas solicitadas: flujo inicial V0 → expectativas de 20 perfiles → propuesta V1 → feedback de los mismos 20 perfiles → decisiones V2 y desarrollo.

Los perfiles y sus comentarios son **simulaciones sintéticas**, no entrevistas reales. Cada caso es una hipótesis sobre necesidades, fricciones y respuesta a un diseño. No se inventan porcentajes de éxito ni se afirma que el flujo esté validado por personas. Los datos de demostración son ficticios y no proceden de los informes del repositorio.

## 1. Flujo inicial V0

Clic en autorrellenar → abrir cámara → fotografiar documento → leer → copiar al formulario.

Su ventaja es la brevedad. Sus supuestos problemáticos son que el usuario sabe qué fotografiar, tiene cámara disponible, da permiso y obtiene una lectura completa en el primer intento. La primera ronda explora dónde fallaría.

## 2. Primera ronda: qué esperan los 20 perfiles

| Perfil | Contexto | Expectativa | Fricción prevista en V0 |
|---|---|---|---|
| 1. Lucía | Móvil · DNI español · primera vez | Saber qué cara fotografiar sin entender qué significa MRZ. | Fotografía el anverso y recibe un error genérico. |
| 2. James | Móvil · pasaporte · llegada con prisa | Hacer una foto y ver los campos rellenos con el menor número de pasos. | Una pantalla de revisión obligatoria añade trabajo a una lectura clara. |
| 3. Carmen | Poca experiencia digital · móvil | Instrucciones cortas y un botón evidente en cada paso. | No entiende permisos ni cuándo se toma la foto. |
| 4. Álex | Documento plastificado · reflejos | Que le expliquen cómo mejorar una foto fallida. | Repite la misma foto indefinidamente. |
| 5. Marta | Android antiguo · cámara borrosa | Tener una salida si la cámara no consigue una foto nítida. | Bucle de reintentos o bloqueo del dispositivo. |
| 6. Noah | Permiso de cámara denegado | Recuperarse sin tener que entender los ajustes del navegador. | El sistema insiste en pedir el mismo permiso. |
| 7. Sofía | Portátil sin cámara | Poder leer una imagen existente cuando no tiene cámara. | La experiencia presupone un móvil. |
| 8. Hugo | Móvil · conexión interrumpida durante la lectura | No repetir la foto si lo único que falla es la conexión. | Un fallo de red se presenta como foto defectuosa. |
| 9. Amina | Nombre transliterado en el documento | Reconocer y corregir su nombre sin cambiar su identidad. | Se presenta la transliteración como nombre definitivo. |
| 10. José Luis | Pasaporte · líneas cortadas en los extremos | Saber cuánto documento debe entrar en la foto. | Solo fotografía el centro de las líneas. |
| 11. Sari | Foto de galería · documento girado | No editar la foto a mano para que se lea. | Se rechaza una imagen legible solo por su orientación. |
| 12. Wei | Documento desgastado · un carácter dudoso | Corregir solo el carácter que no se ha podido leer. | Se inserta un número de documento inventado o se pierde toda la lectura. |
| 13. Paula | Documento antiguo sin zona legible por máquina | Que se acepte la entrada manual como vía normal. | Interpreta «sin MRZ» como documento no válido. |
| 14. Eva | Preocupación por privacidad | Entender para qué se toma la foto antes de dar acceso a la cámara. | Abandona si la cámara se abre sin contexto. |
| 15. Daniel | Baja visión · zoom y lector de pantalla | Instrucciones y mensajes que pueda leer con zoom o lector de pantalla. | La cámara y los placeholders son el único modo de interacción. |
| 16. Óscar | Movilidad reducida · pulso inestable | No depender de mantener el documento en una posición precisa. | Captura demasiado exigente o temporizada. |
| 17. Laura | Foto con dos documentos en la misma imagen | Saber si debe fotografiar los documentos juntos o separados. | Se mezclan datos de dos documentos. |
| 18. Diego | Formulario ya parcialmente rellenado | Conservar lo que escribió al probar el escaneo. | Una nueva lectura sustituye silenciosamente valores correctos. |
| 19. Emma | Habitación con poca luz | Una indicación concreta para conseguir una imagen legible. | No entiende si debe acercarse, enfocar o buscar luz. |
| 20. Bruno | Servicio de lectura lento o caído | Saber que sigue leyendo y poder salir si tarda demasiado. | Spinner infinito o resultado tardío que rellena el formulario tras cancelar. |

La síntesis de estas expectativas es: mostrar qué zona importa antes de pedir permisos, ayudar a corregir la foto según el problema y mantener una salida sin pérdida de datos. No exigir aprender la palabra «MRZ».

## 3. Propuesta V1

Clic → elegir documento y ver guía → cámara o imagen existente → captura manual → lectura → revisión de todos los datos → aplicar → formulario relleno.

La guía representa las dos o tres líneas con letras, números y signos «<». El pasaporte muestra la página de datos; la tarjeta muestra la cara que contiene las líneas, sin asumir que siempre sea el reverso. Se fotografía un solo documento, con líneas completas y sin reflejos. La cámara no se abre hasta que el usuario la solicita.

Esta versión añade claridad pero también una revisión obligatoria incluso cuando la lectura es completa. Además, «repetir foto» por sí solo no resuelve una caída de conexión ni explica cómo corregir el encuadre. La segunda ronda cuestiona esas decisiones.

## 4. Segunda ronda: feedback simulado sobre V1

| Perfil | Feedback sintético sobre V1 | Cambio adoptado para V2 |
|---|---|---|
| 1. Lucía | «La guía ayuda, pero necesito ver las líneas que tengo que buscar.» | D01 · Ejemplo visual de las líneas y opción «No encuentro estas líneas». |
| 2. James | «Si ya se ha leído bien, quiero ver el formulario relleno directamente.» | D02 · Lectura fiable: cerrar el panel y aplicar directamente, con confirmación visible. |
| 3. Carmen | «Prefiero pulsar yo el botón y poder volver atrás.» | D03 · Captura explícita, texto sencillo y salida visible. |
| 4. Álex | ««No se pudo leer» no me dice qué cambiar.» | D04 · Mensaje específico si hay señal fiable; salida manual prioritaria tras dos fallos. |
| 5. Marta | «Después de dos intentos prefiero escribir y seguir.» | D04 · Reintento opcional y alternativa manual desde el inicio. |
| 6. Noah | «Déjame elegir una foto o introducir mis datos.» | D05 · No repetir el permiso automáticamente; ofrecer foto y entrada manual. |
| 7. Sofía | «El ordenador también tiene que tener una salida clara.» | D05 · Ruta de imagen y manual; traspaso al móvil fuera del MVP. |
| 8. Hugo | «La foto estaba bien; quiero reintentar leerla, no hacerla otra vez.» | D06 · Distinguir foto ilegible de fallo de servicio; reintentar la misma captura. |
| 9. Amina | «Dejadme corregirlo y explicad que viene del documento.» | D07 · Aplicar la transliteración leída sin reconstruir grafías y señalar su procedencia. |
| 10. José Luis | «Necesito saber que las líneas tienen que verse de principio a fin.» | D08 · Marco con margen y error específico de encuadre cuando sea detectable. |
| 11. Sari | «Podríais girarla antes de pedirme otra foto.» | D09 · Normalizar orientación antes de leer; en demo se representa una lectura correcta. |
| 12. Wei | «Mostradme el campo dudoso y conservad lo que sí se ha leído.» | D10 · Revisar solo el número dudoso; sin volver a teclear todo. |
| 13. Paula | «Mi documento existe; no digáis que es inválido por no leerlo.» | D11 · Documento sin MRZ: explicar el límite del escaneo y volver al formulario. |
| 14. Eva | «Explicad para qué es la foto y dejadme salir antes de abrir la cámara.» | D12 · Explicación previa, cierre visible y permiso solo al pulsar cámara. |
| 15. Daniel | «Necesito oír si está leyendo, si ha fallado y cuándo ha rellenado los campos.» | D13 · Etiquetas, diálogo con foco, anuncios de estado y fin del autorrellenado. |
| 16. Óscar | «Quiero usar una foto existente sin prisas.» | D03 / D05 · Sin cuenta atrás; imagen existente y entrada manual. |
| 17. Laura | «Decidme que fotografíe solo un documento cada vez.» | D14 · Un documento por foto; rechazo de capturas múltiples cuando se detecten. |
| 18. Diego | «Quiero elegir entre el dato anterior y el leído.» | D15 · Si hay diferencias, conservar lo escrito por defecto y elegir por campo. |
| 19. Emma | «Pedidme ir a un lugar con más luz, sin hacerme repetir a ciegas.» | D16 · Ayuda de iluminación si hay señal fiable; reintento guiado. |
| 20. Bruno | «Quiero cancelar sin que los datos aparezcan después por sorpresa.» | D17 · Cancelación, timeout y descarte de resultados tardíos. |

No todos los problemas se consideran resueltos: cada perfil conserva una validación pendiente en el panel del prototipo. Los diagnósticos de reflejo, recorte, oscuridad o múltiples documentos necesitan señales reales del proveedor; no se deben fabricar a partir de un error genérico.

## 5. Flujo final con país emisor y tipo de documento

### Camino principal

1. **Clic.** Abrir un panel sobre el formulario, conservando todo lo escrito.
2. **Elegir y preparar.** Pedir país emisor y tipo de documento antes de abrir la cámara; no confundir país emisor con nacionalidad. Con vuestro catálogo, resolver la cara exacta: anverso, reverso o página de datos. Mostrar una imagen del documento correspondiente, el marco sobre la zona real y una instrucción directa como «Fotografía el reverso de tu DNI». Si el país tiene modelos con caras diferentes, distinguir el modelo en el selector. Acciones: usar cámara, elegir foto, cambiar selección y «Mi documento no se parece a este».
3. **Fotografiar.** Solicitar permiso solo al pulsar cámara. Mostrar un marco suficientemente amplio para no cortar extremos y tres ayudas: documento apoyado, buena luz sin reflejos y todas las líneas nítidas. Captura explícita, sin cuenta atrás.
4. **Leer.** Mostrar un estado de lectura con cancelación. Procesar orientación antes de OCR. No añadir una pantalla genérica «¿Se ve bien?» después de cada foto: la comprobación automática determina si hace falta intervenir.
5. **Rellenar.** Lectura fiable y sin conflictos: aplicar de forma atómica, cerrar el panel, destacar campos rellenados y mostrar «Documento leído. X campos rellenados». El contador refleja campos cuyo valor cambió. **Aquí termina el flujo.** No botón de continuar, confirmación de registro ni pantalla posterior.

### Intervenciones solo cuando hacen falta

| Situación | Mensaje y acción | Condición de salida |
|---|---|---|
| Permiso denegado | Explicar que puede habilitar cámara en ajustes, elegir imagen o cerrar | Imagen elegida o salida sin cambios |
| Sin cámara | Ofrecer imagen existente | Lectura o salida |
| Cara incorrecta | «No vemos las líneas de lectura» y volver a la guía | Nueva foto con las líneas |
| Líneas cortadas | «Aleja un poco el documento» | Nueva foto completa |
| Reflejos | «Inclina ligeramente el documento o cambia de luz» | Nueva foto legible |
| Desenfoque | «Apoya el documento y espera a que enfoque» | Nueva foto legible |
| Poca luz | «Acerca el documento a una luz uniforme» | Nueva foto legible |
| Varios documentos | «Deja un solo documento en la imagen» | Nueva foto individual |
| Sin MRZ compatible | Explicar el límite de lectura sin declarar inválido el documento | Volver al formulario |
| Error no clasificado | «No hemos podido leer las líneas. Comprueba que estén completas y nítidas» | Reintento o salida |
| Fallo de conexión/servicio | Reintentar lectura de la misma captura | Respuesta de lectura o cancelación |
| Espera excesiva | Estado de timeout con reintento o cierre | Sin spinner indefinido |
| Un campo dudoso | Mantener resultados fiables en memoria; pedir solo el dato que falta o nueva foto | Corrección explícita y aplicación |
| Diferencia con datos escritos | Comparar valor actual y leído; conservar actual por defecto | Aplicación con elecciones por campo |

Si se acumulan dos fallos, destacar la vuelta al formulario y mantener disponible el reintento. Dos intentos es una hipótesis inicial de UX, no un resultado medido. En la integración, proponer 15 segundos como timeout configurable y ajustarlo al proveedor; la demo acelera la espera para facilitar las pruebas.

La lectura parcial no debe rellenar silenciosamente un valor dudoso. La ruta de ejemplo pide el número de documento y, al resolverlo, aplica el conjunto. El mensaje final distingue «Lectura completada con tu corrección» de lectura automática completa. Si faltan varios campos, mostrar solo los afectados, permitiendo repetir foto o salir; no convertirlo en otro formulario completo.

Los nombres se copian tal como se leen, sin reconstruir acentos ni dividir apellidos automáticamente. El segundo apellido existente se conserva. Los datos que la MRZ no contiene quedan como estaban. Cuando el modelo real del producto requiera otra distribución de nombres, deberá establecerse un mapeo explícito sin adivinar.

### Microcopy de producción propuesto

- Entrada: «Autorrellena tus datos» / «Haz una foto de las líneas de tu documento».
- Guía: «Busca las líneas con letras, números y signos <».
- Cámara: «Encuadra las líneas completas» / «Hacer foto».
- Lectura: «Estamos leyendo las líneas» / «Cancelar lectura».
- Éxito: «Documento leído. X campos rellenados».
- Parcial: «Solo falta un dato por leer».
- Conflicto: «Ya habías escrito algunos datos».

Los botones del prototipo dicen «Simular» o «de prueba» para dejar claro que no activan cámara, galería u OCR reales. Estas etiquetas no son microcopy propuesto para producción.

## 6. Especificación de implementación

### Estados y reglas

`idle → country_and_type → side_guidance → permission/capture → reading → filled`

Ramas: `capture → image_error → capture`; `reading → service_error → reading`; `reading → partial → correction → filled`; `reading → conflict → explicit_merge → filled`; cualquier estado del panel permite `cancel → idle` sin aplicar resultados pendientes.

Mantener tres objetos separados: formulario existente, captura temporal e intento de lectura. Solo la transición a `filled` aplica el resultado. Cancelar invalida el identificador de intento, libera recursos y descarta resultados tardíos. Al cerrar cámara, detener sus tracks; al reemplazar imagen, liberar el object URL. El prototipo simula este comportamiento con un token de intento y no usa cámara ni imágenes reales.

### Entrada y salida del lector propuesto

Este contrato es una propuesta, no una API existente.

Entrada: `attemptId`, imagen temporal y preferencia de tipo de documento. Salida: `attemptId`, `status` (`complete`, `partial`, `unreadable`, `unsupported`), campos con valor/procedencia/estado de revisión, y `reasonCode` sustentado por una señal real. Incluir resultados de formato y dígitos de control según el tipo de MRZ. Un checksum no prueba autenticidad del documento ni identidad de la persona.

Para relleno directo exigir lectura estructuralmente consistente y ausencia de campos marcados como dudosos. Calibrar umbrales de confianza con imágenes reales; no inventar porcentajes. Fechas con siglo ambiguo no se resuelven por intuición: se marcan como dato por revisar. Traducir códigos de nacionalidad usando un catálogo; no inferir nacionalidad a partir de país emisor.

### Aplicación al formulario

Rellenar solo campos obtenidos de la lectura. No borrar campos no leídos ni cambiar valores escritos sin elección explícita. Construir el parche en memoria y aplicarlo en una sola transición. Conservar procedencia de campo (`read`, `manual`, `user_corrected`) en el estado local. La integración debe capturar la versión del formulario al comenzar para detectar cambios concurrentes.

### Tratamiento de la foto

Antes de integrar, confirmar proveedor, formatos admitidos, límites de tamaño, política de conservación y texto informativo real. Una imagen no admitida debe dar un mensaje claro y permitir elegir otra sin reiniciar el flujo. No introducir imagen, base64, MRZ o valores personales en analítica, URLs ni logs. En la demo no hay captura, subida, almacenamiento persistente ni scripts externos. No se promete una política de borrado de producción que no conocemos.

## 7. Desarrollo y cobertura

La carpeta contiene un prototipo sin dependencias externas, que conserva la estética de la captura: fondo lavanda, navegación lateral, tarjeta redondeada, acento azul violeta y secciones del formulario. Se ha limitado intencionadamente al autorrellenado; el formulario de fondo sirve para mostrar el resultado.

Implementado: guía por documento, captura simulada, lectura simulada cancelable, todos los estados de la tabla salvo error genérico/archivo real, corrección de un campo dudoso, conciliación de valores previos, aplicación directa, confirmación de relleno, conservación de campos no leídos, 20 perfiles, dos rondas consultables y diseño adaptable.

No implementado: OCR, procesamiento o carga real de imagen, permisos reales, medición de luz/enfoque, normalización real de orientación, API, validación de parser MRZ y dispositivos reales. Estas dependencias están especificadas; la demo no las finge. Los controles «Simular foto corregida / servicio recuperado» están separados y rotulados como controles de prueba; permiten recorrer el camino de recuperación, pero no son parte de la UI de producción.

Abrir `index.html` directamente o ejecutar desde la raíz del repositorio:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory autoform-mrz
```

Servir solo esta carpeta: el resto del repositorio contiene información privada.

## 8. Criterios de aceptación y prueba real posterior

1. Una lectura correcta rellena el formulario sin una pantalla extra de revisión.
2. País y tipo son obligatorios; la guía usa la cara configurada para esa combinación y modelo. No se solicita al huésped que adivine anverso/reverso.
3. No se solicita cámara antes de una acción explícita.
4. El usuario puede cerrar en cualquier paso sin perder datos ni recibir después un resultado cancelado.
5. Los errores fotográficos dicen qué cambiar; los errores de servicio permiten releer la misma captura.
6. Después de dos fallos se destaca la salida; nunca hay bucle obligatorio.
7. Un carácter dudoso no se inventa ni se rellena sin intervención.
8. Los datos ya escritos se conservan salvo elección explícita por campo.
9. Los campos no presentes en la lectura se mantienen.
10. El final visible es el formulario relleno; no contiene envío ni pasos de registro.
11. Foco contenido en el diálogo, Escape disponible, etiquetas persistentes y anuncios de lectura/resultado.
12. Los 20 casos siguen identificados como simulaciones y no se convierten en métricas reales.

Para validar con personas, pedir únicamente «rellena los datos usando una foto del documento» y detener la sesión cuando aparecen los campos. Observar descubrimiento de la zona, tiempo hasta foto legible, comprensión de errores, cancelaciones, reintentos y reconocimiento del éxito. Medir por dispositivo y documento. Hacer pruebas específicas de zoom, teclado, VoiceOver/TalkBack, permisos, imagen girada y respuestas tardías. No evaluar envío ni conversión de registro en este trabajo.

## Fuentes

- [ICAO · Doc 9303](https://www.icao.int/publications/doc-series/doc-9303): referencia de documentos de lectura mecánica; catálogo de pasaportes TD3 y tarjetas TD1/TD2. El parser real debe contrastarse con las partes aplicables.
- [W3C WAI · Notificaciones de formularios](https://www.w3.org/WAI/tutorials/forms/notifications/): errores comprensibles, asociación con campos y anuncio de resultados. Sustenta la propuesta de foco y mensajes.

Las decisiones de UX son inferencias de diseño. Estas fuentes no validan las simulaciones ni demuestran la eficacia de la propuesta.


## Catálogo visual del prototipo

La selección es explícita y obligatoria. Cambiar país limpia el tipo elegido para impedir que sobreviva una combinación incompatible. Las selecciones se conservan al volver de la guía y nunca modifican la nacionalidad del formulario.

| País y tipo de ejemplo | Cara indicada | Ejemplo utilizado |
|---|---|---|
| España · DNI | Reverso | Imagen de muestra del DNI con tres líneas inferiores |
| España · Pasaporte | Página de datos con foto | Página de muestra dentro de una composición de libreta abierta |
| Francia · Documento de identidad, modelo antiguo grande | Anverso | Imagen local del modelo con dos líneas debajo de la foto |
| India · Pasaporte | Página de datos con foto | Ejemplar local marcado SPECIMEN |

Este es un catálogo reducido de demostración. La integración utilizará el catálogo ya conocido por el producto, incluyendo versión/modelo cuando haga falta; no se extrapola una cara para todos los documentos de un país. La foto de ejemplo y las coordenadas de la guía son datos de la misma configuración (`documents.js`).

La imagen original se mantiene; el marco exterior y el resaltado de MRZ son capas de HTML/CSS. El pasaporte tiene página contigua, encuadernación y página de datos para diferenciarlo visualmente de una tarjeta. En la vista de cámara se indica «EJEMPLO», sin presentar la imagen como una captura real. La lectura sigue simulada.

Recursos: [DNI de muestra, Gobierno de España](https://commons.wikimedia.org/wiki/File:Spanish_ID_card_(back_side).webp); [pasaporte de muestra, MonicasHouse](https://commons.wikimedia.org/wiki/File:Spanish_passport_data_page_sample.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). El detalle de archivos y atribuciones está en `assets/CREDITOS.txt`.
