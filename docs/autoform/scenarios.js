/* Simulaciones sintéticas del flujo de fotografía y autorrellenado. */
const profiles = [
  {
    "id": 1,
    "name": "Lucía",
    "context": "Móvil · DNI español · primera vez",
    "expectation": "Saber qué cara fotografiar sin entender qué significa MRZ.",
    "risk": "Fotografía el anverso y recibe un error genérico.",
    "feedback": "La guía ayuda, pero necesito ver las líneas que tengo que buscar.",
    "decision": "D01 · Ejemplo visual de las líneas y opción «No encuentro estas líneas».",
    "scenario": "wrong-side",
    "residual": "Validar la guía con varias generaciones de DNI."
  },
  {
    "id": 2,
    "name": "James",
    "context": "Móvil · pasaporte · llegada con prisa",
    "expectation": "Hacer una foto y ver los campos rellenos con el menor número de pasos.",
    "risk": "Una pantalla de revisión obligatoria añade trabajo a una lectura clara.",
    "feedback": "Si ya se ha leído bien, quiero ver el formulario relleno directamente.",
    "decision": "D02 · Lectura fiable: cerrar el panel y aplicar directamente, con confirmación visible.",
    "scenario": "success",
    "residual": "Medir si detecta los campos rellenados sin una pantalla extra."
  },
  {
    "id": 3,
    "name": "Carmen",
    "context": "Poca experiencia digital · móvil",
    "expectation": "Instrucciones cortas y un botón evidente en cada paso.",
    "risk": "No entiende permisos ni cuándo se toma la foto.",
    "feedback": "Prefiero pulsar yo el botón y poder volver atrás.",
    "decision": "D03 · Captura explícita, texto sencillo y salida visible.",
    "scenario": "success",
    "residual": "Comprobar comprensión sin ayuda de un moderador."
  },
  {
    "id": 4,
    "name": "Álex",
    "context": "Documento plastificado · reflejos",
    "expectation": "Que le expliquen cómo mejorar una foto fallida.",
    "risk": "Repite la misma foto indefinidamente.",
    "feedback": "«No se pudo leer» no me dice qué cambiar.",
    "decision": "D04 · Mensaje específico si hay señal fiable; salida manual prioritaria tras dos fallos.",
    "scenario": "glare",
    "residual": "El proveedor debe distinguir reflejos de desenfoque; si no, mensaje neutro."
  },
  {
    "id": 5,
    "name": "Marta",
    "context": "Android antiguo · cámara borrosa",
    "expectation": "Tener una salida si la cámara no consigue una foto nítida.",
    "risk": "Bucle de reintentos o bloqueo del dispositivo.",
    "feedback": "Después de dos intentos prefiero escribir y seguir.",
    "decision": "D04 · Reintento opcional y alternativa manual desde el inicio.",
    "scenario": "blur",
    "residual": "Probar rendimiento en dispositivos reales de gama baja."
  },
  {
    "id": 6,
    "name": "Noah",
    "context": "Permiso de cámara denegado",
    "expectation": "Recuperarse sin tener que entender los ajustes del navegador.",
    "risk": "El sistema insiste en pedir el mismo permiso.",
    "feedback": "Déjame elegir una foto o introducir mis datos.",
    "decision": "D05 · No repetir el permiso automáticamente; ofrecer foto y entrada manual.",
    "scenario": "denied",
    "residual": "El prototipo simula el permiso; validar Safari y Chrome reales."
  },
  {
    "id": 7,
    "name": "Sofía",
    "context": "Portátil sin cámara",
    "expectation": "Poder leer una imagen existente cuando no tiene cámara.",
    "risk": "La experiencia presupone un móvil.",
    "feedback": "El ordenador también tiene que tener una salida clara.",
    "decision": "D05 · Ruta de imagen y manual; traspaso al móvil fuera del MVP.",
    "scenario": "desktop",
    "residual": "La carga real de archivos y sus límites dependen del proveedor."
  },
  {
    "id": 8,
    "name": "Hugo",
    "context": "Móvil · conexión interrumpida durante la lectura",
    "expectation": "No repetir la foto si lo único que falla es la conexión.",
    "risk": "Un fallo de red se presenta como foto defectuosa.",
    "feedback": "La foto estaba bien; quiero reintentar leerla, no hacerla otra vez.",
    "decision": "D06 · Distinguir foto ilegible de fallo de servicio; reintentar la misma captura.",
    "scenario": "offline",
    "residual": "Integrar retención temporal en memoria y reintento real del proveedor."
  },
  {
    "id": 9,
    "name": "Amina",
    "context": "Nombre transliterado en el documento",
    "expectation": "Reconocer y corregir su nombre sin cambiar su identidad.",
    "risk": "Se presenta la transliteración como nombre definitivo.",
    "feedback": "Dejadme corregirlo y explicad que viene del documento.",
    "decision": "D07 · Aplicar la transliteración leída sin reconstruir grafías y señalar su procedencia.",
    "scenario": "names",
    "residual": "Validar que el usuario identifica el valor leído al verlo en el formulario."
  },
  {
    "id": 10,
    "name": "José Luis",
    "context": "Pasaporte · líneas cortadas en los extremos",
    "expectation": "Saber cuánto documento debe entrar en la foto.",
    "risk": "Solo fotografía el centro de las líneas.",
    "feedback": "Necesito saber que las líneas tienen que verse de principio a fin.",
    "decision": "D08 · Marco con margen y error específico de encuadre cuando sea detectable.",
    "scenario": "cropped",
    "residual": "Comprobar tolerancia al recorte con el proveedor real."
  },
  {
    "id": 11,
    "name": "Sari",
    "context": "Foto de galería · documento girado",
    "expectation": "No editar la foto a mano para que se lea.",
    "risk": "Se rechaza una imagen legible solo por su orientación.",
    "feedback": "Podríais girarla antes de pedirme otra foto.",
    "decision": "D09 · Normalizar orientación antes de leer; en demo se representa una lectura correcta.",
    "scenario": "rotated",
    "residual": "La rotación real depende del procesamiento de imágenes; no existe en la demo."
  },
  {
    "id": 12,
    "name": "Wei",
    "context": "Documento desgastado · un carácter dudoso",
    "expectation": "Corregir solo el carácter que no se ha podido leer.",
    "risk": "Se inserta un número de documento inventado o se pierde toda la lectura.",
    "feedback": "Mostradme el campo dudoso y conservad lo que sí se ha leído.",
    "decision": "D10 · Revisar solo el número dudoso; sin volver a teclear todo.",
    "scenario": "partial",
    "residual": "Calibrar la confianza por campo con el proveedor de OCR."
  },
  {
    "id": 13,
    "name": "Paula",
    "context": "Documento antiguo sin zona legible por máquina",
    "expectation": "Que se acepte la entrada manual como vía normal.",
    "risk": "Interpreta «sin MRZ» como documento no válido.",
    "feedback": "Mi documento existe; no digáis que es inválido por no leerlo.",
    "decision": "D11 · Documento sin MRZ: explicar el límite del escaneo y volver al formulario.",
    "scenario": "no-mrz",
    "residual": "No confundir compatibilidad de lectura con validez del documento."
  },
  {
    "id": 14,
    "name": "Eva",
    "context": "Preocupación por privacidad",
    "expectation": "Entender para qué se toma la foto antes de dar acceso a la cámara.",
    "risk": "Abandona si la cámara se abre sin contexto.",
    "feedback": "Explicad para qué es la foto y dejadme salir antes de abrir la cámara.",
    "decision": "D12 · Explicación previa, cierre visible y permiso solo al pulsar cámara.",
    "scenario": "privacy",
    "residual": "Vincular el texto real de tratamiento de la imagen antes de integrar."
  },
  {
    "id": 15,
    "name": "Daniel",
    "context": "Baja visión · zoom y lector de pantalla",
    "expectation": "Instrucciones y mensajes que pueda leer con zoom o lector de pantalla.",
    "risk": "La cámara y los placeholders son el único modo de interacción.",
    "feedback": "Necesito oír si está leyendo, si ha fallado y cuándo ha rellenado los campos.",
    "decision": "D13 · Etiquetas, diálogo con foco, anuncios de estado y fin del autorrellenado.",
    "scenario": "accessible",
    "residual": "Validar con VoiceOver/TalkBack; la foto manual puede requerir ayuda."
  },
  {
    "id": 16,
    "name": "Óscar",
    "context": "Movilidad reducida · pulso inestable",
    "expectation": "No depender de mantener el documento en una posición precisa.",
    "risk": "Captura demasiado exigente o temporizada.",
    "feedback": "Quiero usar una foto existente sin prisas.",
    "decision": "D03 / D05 · Sin cuenta atrás; imagen existente y entrada manual.",
    "scenario": "desktop",
    "residual": "Evaluar ayudas de captura con personas reales."
  },
  {
    "id": 17,
    "name": "Laura",
    "context": "Foto con dos documentos en la misma imagen",
    "expectation": "Saber si debe fotografiar los documentos juntos o separados.",
    "risk": "Se mezclan datos de dos documentos.",
    "feedback": "Decidme que fotografíe solo un documento cada vez.",
    "decision": "D14 · Un documento por foto; rechazo de capturas múltiples cuando se detecten.",
    "scenario": "multiple",
    "residual": "Requiere detección de múltiples zonas MRZ o señal del proveedor."
  },
  {
    "id": 18,
    "name": "Diego",
    "context": "Formulario ya parcialmente rellenado",
    "expectation": "Conservar lo que escribió al probar el escaneo.",
    "risk": "Una nueva lectura sustituye silenciosamente valores correctos.",
    "feedback": "Quiero elegir entre el dato anterior y el leído.",
    "decision": "D15 · Si hay diferencias, conservar lo escrito por defecto y elegir por campo.",
    "scenario": "conflict",
    "residual": "La aplicación al formulario debe ser atómica y no perder ediciones previas."
  },
  {
    "id": 19,
    "name": "Emma",
    "context": "Habitación con poca luz",
    "expectation": "Una indicación concreta para conseguir una imagen legible.",
    "risk": "No entiende si debe acercarse, enfocar o buscar luz.",
    "feedback": "Pedidme ir a un lugar con más luz, sin hacerme repetir a ciegas.",
    "decision": "D16 · Ayuda de iluminación si hay señal fiable; reintento guiado.",
    "scenario": "dark",
    "residual": "Evitar diagnóstico de oscuridad sin una medición real."
  },
  {
    "id": 20,
    "name": "Bruno",
    "context": "Servicio de lectura lento o caído",
    "expectation": "Saber que sigue leyendo y poder salir si tarda demasiado.",
    "risk": "Spinner infinito o resultado tardío que rellena el formulario tras cancelar.",
    "feedback": "Quiero cancelar sin que los datos aparezcan después por sorpresa.",
    "decision": "D17 · Cancelación, timeout y descarte de resultados tardíos.",
    "scenario": "timeout",
    "residual": "Comprobar cancelación real y definir tiempos con el proveedor."
  }
];
if (typeof module !== 'undefined') module.exports = profiles;
