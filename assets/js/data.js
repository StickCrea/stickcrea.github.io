/**
 * data.js — Contenido del sitio, centralizado.
 * Toda la información aquí es real y anonimizada donde corresponde.
 * No se documentan cifras no verificadas: el impacto se describe en
 * términos cualitativos cuando no existe una métrica confirmada.
 * Agregar un caso, proyecto o tecnología nueva es tan simple como
 * añadir un objeto a los arreglos correspondientes.
 */

const SITE_DATA = {
  identity: {
    displayName: "Stiven Cuesta Mena",
    legalName: "Estiven Cuesta Mena",
    brand: "StivCrea",
    role: "Applications Analyst",
    rotating: [
      "Applications Analyst",
      "Backend",
      "Data",
      "Automation",
      "Systems Integration",
      "AI Projects",
    ],
    tagline: "Backend · Data · Automation",
    pitch:
      "Construyo, diagnostico y automatizo sistemas empresariales con software, datos e integraciones.",
    eyebrow: "Building · Diagnosing · Automating",
  },

  // ---- Experiencia (teaser cards) ----
  experience: [
    {
      role: "Applications Analyst",
      company: "Plataforma TMS empresarial multiempresa",
      period: "Rol actual",
      hook: "Del botón en pantalla hasta la última fila de la base de datos.",
      summary:
        "Trabajo sobre una plataforma TMS legacy que soporta operaciones de transporte de carga y logística de vehículos, integrada con el RNDC del Ministerio de Transporte, un ERP corporativo, una plataforma de gastos y anticipos, un portal de clientes y servicios de telemetría GPS.",
      tags: ["ASP Classic", "VBScript", "SQL Server", "Integraciones"],
      more:
        "Diagnóstico de fallas de integración, corrección de causas raíz, automatización de procesos manuales y trazabilidad sobre documentos de transporte. El detalle completo está en la sección de casos.",
    },
    {
      role: "Aprendiz · Técnico en Desarrollo de Software",
      company: "Virgin Mobile",
      period: "Abril 2023 – Octubre 2023",
      hook: "Los primeros pasos construyendo software en un entorno real.",
      summary:
        "Formación práctica aplicada dentro de un equipo de desarrollo, con enfoque en control de versiones y trabajo colaborativo.",
      tags: ["Git", "GitHub"],
      more:
        "Etapa formativa que marcó el inicio del camino hacia el desarrollo backend, datos e integraciones que ocupan el trabajo actual.",
    },
  ],

  education: {
    title: "Técnico en Programación de Software",
    institution: "SENA",
    period: "Julio 2022 – Octubre 2023",
    detail: "Formación técnica en desarrollo, análisis y mantenimiento de software.",
  },

  // ---- Categorías usadas para taggear casos ----
  categories: [
    "Applications",
    "Backend",
    "Database",
    "Integrations",
    "Automation",
    "Security",
    "Diagnostics",
    "Documentation",
  ],

  // ---- Casos profesionales anonimizados ----
  cases: [
    {
      id: "case-01",
      title: "Motor centralizado de anulaciones ante el RNDC",
      categories: ["Automation", "Integrations", "Applications"],
      hook: "Convierto procesos manuales de horas en un solo clic.",
      problem:
        "Anular un documento de transporte ante el RNDC del Ministerio de Transporte requería varios pasos manuales dispersos, sensibles al estado exacto del documento.",
      diagnosis:
        "Se mapeó el flujo real de estados y respuestas del proceso de anulación para identificar qué pasos eran obligatorios, opcionales o dependientes de un paso previo.",
      solution:
        "Un motor centralizado evalúa la respuesta del sistema tras una única acción del usuario, reordena o genera los pasos previos requeridos, reintenta errores técnicos y continúa automáticamente cuando las condiciones lo permiten. La interfaz se resume en tres acciones: Continuar · Reintentar · Contactar.",
      impact:
        "El usuario ya no necesita conocer la complejidad técnica interna del proceso. Flujo más controlado y con menos errores operativos.",
      flow: ["Usuario", "Solicitud", "Diagnóstico", "Evaluación de respuesta", "Reordenamiento de pasos", "Reintento", "Resultado"],
      badges: ["RNDC", "XML", "State machine"],
    },
    {
      id: "case-02",
      title: "Rediseño del reenvío de pedidos al ERP",
      categories: ["Applications", "Integrations", "Security", "Backend"],
      hook: "Del botón en pantalla hasta la última fila de la base de datos.",
      problem:
        "El reenvío de pedidos hacia el ERP corporativo se ejecutaba mediante acciones dispersas, sin una etapa clara de verificación previa.",
      diagnosis:
        "Una auditoría previa del código permitió detectar puntos de inyección SQL, validaciones no deterministas y sobrescritura de fechas en cada reintento.",
      solution:
        "Flujo unificado Buscar → Diagnosticar → Ejecutar, con búsqueda única por manifiesto o remesa, una etapa de diagnóstico de solo lectura antes de ejecutar, revalidación de permisos del lado servidor y trazabilidad por lote.",
      impact:
        "Hallazgo → corrección → control. Menor superficie de error y mejor trazabilidad del reenvío.",
      flow: ["Buscar", "Diagnosticar", "Ejecutar"],
      badges: ["SQL injection (hallazgo)", "Read-only diagnosis", "Trazabilidad por lote"],
      securityNote:
        "Por responsabilidad, el detalle de explotación no se documenta públicamente. Se muestra el ciclo hallazgo → corrección → control.",
    },
    {
      id: "case-03",
      title: "Diagnóstico de fallas en integración con ERP",
      categories: ["Integrations", "Diagnostics", "Backend"],
      hook: "Cuando un sistema falla en silencio, encuentro por qué.",
      problem:
        "Fallas intermitentes en la integración con el ERP, sin un patrón evidente a simple vista.",
      diagnosis:
        "Las fallas se agruparon por colas de tareas e interfaz para aislar patrones comunes entre los casos.",
      solution:
        "La causa raíz fue un desbordamiento de entero en un conector .NET, originado por un registro duplicado mal digitado en el origen del dato. Se corrigió el origen, no el síntoma.",
      impact: "Diagnóstico más preciso y corrección en causa raíz.",
      flow: ["Cola de tareas", "Agrupación de fallas", "Aislamiento de patrón", "Causa raíz", "Corrección en el origen"],
      badges: ["Integer overflow", ".NET connector", "Root cause"],
    },
    {
      id: "case-04",
      title: "Auditorías de trazabilidad documental",
      categories: ["Database", "Diagnostics", "Documentation"],
      hook: "Integro sistemas empresariales con servicios externos sin perder trazabilidad.",
      problem:
        "Reconstruir el ciclo de vida completo de un documento de transporte a partir de tablas de auditoría dispersas.",
      diagnosis:
        "Uso de funciones de ventana (LAG / LEAD) sobre el histórico de auditoría para reconstruir la secuencia de cambios.",
      solution:
        "El objetivo de cada reconstrucción: responder quién, cuándo y qué cambió sobre un documento.",
      impact: "Mejor trazabilidad y una base documentada para auditorías futuras.",
      note:
        "La trazabilidad no siempre permite atribuir causalidad completa; los límites de atribución se documentan explícitamente.",
      flow: ["Tablas de auditoría", "LAG / LEAD", "Secuencia reconstruida", "Quién · Cuándo · Qué cambió"],
      badges: ["LAG / LEAD", "T-SQL", "Auditoría"],
    },
    {
      id: "case-05",
      title: "Consistencia de cálculos en payloads XML",
      categories: ["Integrations", "Data"],
      hook: "Integro sistemas empresariales con servicios del Ministerio de Transporte mediante XML.",
      problem:
        "Valores enviados en distintos campos de un mismo payload XML debían mantener coherencia de redondeo; las diferencias entre campos provocaban rechazos.",
      diagnosis: "Comparación campo a campo del cálculo antes del envío.",
      solution: "Normalización y consistencia del cálculo antes del envío.",
      impact: "Menor tasa de rechazos y mayor consistencia del dato enviado.",
      flow: ["Cálculo por campo", "Comparación cruzada", "Normalización", "Envío consistente"],
      badges: ["XML", "Redondeo", "Validación de payload"],
      codeExample: {
        lang: "xml",
        label: "Ejemplo ilustrativo (datos ficticios)",
        code: `<Documento>
  <ValorFlete>1250000.00</ValorFlete>
  <ValorFleteRedondeado>1250000</ValorFleteRedondeado>
  <TotalPagar>1250000.00</TotalPagar>
</Documento>`,
      },
    },
    {
      id: "case-06",
      title: "Control de acceso por parámetros de usuario y grupo",
      categories: ["Security"],
      hook: "Los permisos se validan donde importan: en el servidor.",
      problem:
        "Acciones sensibles dependían de validaciones visibles únicamente en la interfaz.",
      diagnosis:
        "Revisión de los puntos de entrada expuestos a bypass por URL, POST directo y manipulación de parámetros.",
      solution:
        "Validación de permisos por usuario y grupo, revalidada siempre del lado servidor.",
      impact: "Protección frente a bypass por URL, POST directo y manipulación de parámetros.",
      flow: ["Solicitud", "Validación server-side", "Permiso concedido / denegado"],
      badges: ["Server-side auth", "Least privilege"],
    },
    {
      id: "case-07",
      title: "Diagnóstico de procedimientos de reportes",
      categories: ["Database", "Diagnostics"],
      hook: "Diagnostica con datos antes de tocar código.",
      problem:
        "Procedimientos que alimentan un portal de clientes generaban resultados inconsistentes.",
      diagnosis:
        "Se identificaron parámetros truncados silenciosamente, filtros de fecha que perdían el último día y joins que duplicaban filas.",
      solution:
        "Corrección de los procedimientos a partir del análisis de datos, antes de modificar código.",
      impact: "Reportes más consistentes para el portal de clientes.",
      flow: ["Parámetro truncado", "Filtro de fecha incompleto", "Join duplicado", "Corrección validada con datos"],
      badges: ["T-SQL", "Stored procedures", "Data-first"],
    },
    {
      id: "case-08",
      title: "Integración con telemetría GPS",
      categories: ["Integrations", "Data"],
      hook: "La información logística solo sirve si llega completa.",
      problem:
        "La extracción de datos desde la API de telemetría (JSON) no respetaba correctamente la información asociada a cada parada.",
      diagnosis: "Comparación de la respuesta de la API contra lo esperado por parada.",
      solution: "Corrección de la extracción para respetar la información asociada a cada parada.",
      impact: "Información logística más confiable.",
      flow: ["API telemetría (JSON)", "Extracción por parada", "Validación", "Dato confiable"],
      badges: ["REST/JSON", "Telemetry API"],
      codeExample: {
        lang: "json",
        label: "Ejemplo ilustrativo (datos ficticios)",
        code: `{
  "vehiculo": "VEH-0451",
  "parada": {
    "secuencia": 3,
    "lat": 4.6512,
    "lng": -74.0819,
    "horaLlegada": "2026-03-10T14:22:00Z"
  }
}`,
      },
    },
    {
      id: "case-09",
      title: "Vinculación de transportadores",
      categories: ["Applications", "Documentation"],
      hook: "Un flujo completo, de la validación al registro.",
      problem:
        "El flujo de vinculación de transportadores combina formulario, validación documental automatizada, backoffice y workflow.",
      diagnosis:
        "Participación en pruebas funcionales del flujo completo, con evidencias registradas por caso.",
      solution:
        "Verificación end-to-end del formulario, la validación documental, el backoffice y el workflow antes de su puesta en producción.",
      impact: "Mayor confianza en el flujo antes de salir a producción.",
      flow: ["Formulario", "Validación documental", "Backoffice", "Workflow", "Evidencia por caso"],
      badges: ["QA funcional", "Workflow"],
    },
    {
      id: "case-10",
      title: "Documentación técnica de funcionalidades",
      categories: ["Documentation"],
      hook: "Lo que no está documentado, tarde o temprano se vuelve a preguntar.",
      problem: "Funcionalidades implementadas sin un registro accesible para el resto del equipo.",
      diagnosis: "Identificación de los procesos que carecían de documentación actualizada.",
      solution: "Documentación técnica de las funcionalidades implementadas utilizando Confluence.",
      impact: "Conocimiento accesible para el equipo y menor dependencia de memoria individual.",
      flow: ["Funcionalidad implementada", "Documentación en Confluence", "Conocimiento compartido"],
      badges: ["Confluence", "Documentation by default"],
    },
  ],

  // ---- "Lo que sé resolver" ----
  problems: [
    "Sistemas legacy difíciles de modificar sin romper procesos existentes.",
    "Integraciones que fallan sin mensajes claros.",
    "Procesos manuales que necesitan automatización.",
    "Datos inconsistentes.",
    "Reportes con duplicidad o filtros incorrectos.",
    "Problemas de trazabilidad.",
    "Validaciones que pueden ser bypassadas.",
    "Flujos empresariales con demasiadas acciones dispersas.",
    "Fallos de integración entre sistemas.",
    "Problemas de datos que aparentan ser problemas de código.",
  ],

  // ---- Metodología ----
  methodology: [
    "Diagnosticar con datos",
    "Formular hipótesis",
    "Validarlas contra la base de datos",
    "Descartar hipótesis que no se sostienen",
    "Separar diagnóstico de ejecución",
    "Corregir la causa raíz",
    "Aplicar cambios mínimos y coherentes",
    "Incorporar permisos y trazabilidad",
    "Documentar",
  ],

  methodologyQuotes: [
    "Diagnostica con datos antes de tocar código.",
    "Corrige la causa raíz, no el síntoma.",
    "Diagnóstico de solo lectura antes de ejecución.",
  ],

  // ---- Arquitectura ----
  architecture: [
    { label: "Usuario", detail: "Origen de la acción o solicitud.", reveal: "UX" },
    { label: "Aplicación", detail: "Interfaz que traduce la intención en una operación.", reveal: "UI" },
    { label: "Backend", detail: "Lógica de negocio, permisos y orquestación.", reveal: "Permisos" },
    { label: "Base de datos", detail: "Estado real del sistema y su historial.", reveal: "SQL" },
    { label: "Integración / API", detail: "Comunicación con sistemas externos.", reveal: "XML · JSON" },
    { label: "Automatización", detail: "Procesos que eliminan pasos manuales repetitivos.", reveal: "Batch" },
    { label: "Trazabilidad", detail: "Registro de quién, cuándo y qué cambió.", reveal: "Logging" },
  ],

  uiToDb: ["UI", "Backend", "SQL", "Integration", "Response", "Audit"],

  behindTheProblem: [
    {
      symptom: "Integración con el ERP falla de forma intermitente.",
      hypothesis: "¿Problema de red o timeout puntual?",
      evidence: "Las fallas se agrupan por interfaz, no de forma aleatoria.",
      cause: "Desbordamiento de entero en un conector .NET.",
      correction: "Corrección del registro duplicado en el origen del dato.",
    },
    {
      symptom: "El portal de clientes muestra reportes inconsistentes.",
      hypothesis: "¿El código de reporte tiene un error de lógica?",
      evidence: "Un filtro de fecha excluye sistemáticamente el último día.",
      cause: "Parámetro de fecha truncado silenciosamente en el procedimiento.",
      correction: "Ajuste del procedimiento, validado con datos reales.",
    },
    {
      symptom: "Un payload XML es rechazado de forma intermitente.",
      hypothesis: "¿El servicio externo cambió su validación?",
      evidence: "Dos campos del mismo payload no coinciden en su redondeo.",
      cause: "Cálculo de redondeo inconsistente entre campos relacionados.",
      correction: "Normalización del cálculo antes del envío.",
    },
  ],

  actions: [
    { verb: "Diagnose", example: "Aislé un desbordamiento de entero en un conector .NET hasta su causa raíz." },
    { verb: "Build", example: "Diseñé un motor centralizado de anulaciones ante el RNDC." },
    { verb: "Integrate", example: "Integro sistemas empresariales con servicios del Ministerio de Transporte mediante XML." },
    { verb: "Automate", example: "Convertí procesos manuales de horas en un solo clic." },
    { verb: "Validate", example: "Corrijo la causa raíz, no el síntoma, validando siempre contra la base de datos." },
    { verb: "Secure", example: "Revalidación de permisos del lado servidor, siempre." },
    { verb: "Document", example: "Documento funcionalidades implementadas en Confluence." },
  ],

  principles: {
    main: [
      { title: "Diagnose before changing", detail: "Ningún cambio sin entender primero el comportamiento real." },
      { title: "Validate with data", detail: "Las hipótesis se confirman o se descartan contra la base de datos." },
      { title: "Fix root causes", detail: "El síntoma no es el problema; la causa raíz sí." },
      { title: "Trace everything important", detail: "Quién, cuándo y qué cambió, siempre que sea posible." },
    ],
    secondary: [
      "Least privilege",
      "Read-only diagnosis",
      "Minimal coherent changes",
      "Explicit auditability",
      "Documentation by default",
    ],
  },

  snapshot: [
    { group: "Legacy", items: ["ASP Classic", "VBScript", "SQL Server"] },
    { group: "Backend", items: ["Python", "Node.js", "Flask"] },
    { group: "Data", items: ["T-SQL", "PostgreSQL", "MySQL", "Pandas"] },
    { group: "Integrations", items: ["REST", "JSON", "XML", "Web Services"] },
    { group: "AI", items: ["Anthropic API", "Agent Architecture"] },
    { group: "Tools", items: ["Git", "GitHub", "Confluence"] },
  ],

  stack: [
    { group: "Backend", items: ["Python", "Flask", "Node.js", "SQLAlchemy", "APIs REST"] },
    { group: "Databases", items: ["SQL Server", "T-SQL", "PostgreSQL", "MySQL", "Funciones de ventana", "Triggers"] },
    { group: "Data", items: ["Pandas", "Tableau", "Power BI", "SQL analytics"] },
    { group: "Integrations", items: ["REST/JSON", "XML", "Web Services XML", "ERP integrations", "RNDC integrations", "Telemetry APIs"] },
    { group: "Automation", items: ["Python automation", "Backend processes", "Database procedures", "Batch flows"] },
    { group: "Legacy / Enterprise", items: ["ASP Classic", "VBScript", "SQL Server", "Sistemas empresariales existentes"] },
    { group: "AI", items: ["Anthropic API", "Agent architectures", "System prompts", "AI-assisted workflows"] },
    { group: "Tools", items: ["Git", "GitHub", "Confluence", "Jira"] },
    { group: "Frontend", items: ["HTML", "CSS", "JavaScript"] },
  ],

  // ---- Timeline 2023 → 2026 ----
  timeline: [
    { year: "2023", label: "Formación técnica y desarrollo" },
    { year: "2023", label: "Experiencia inicial en desarrollo" },
    { year: "2024", label: "Infraestructura / IT" },
    { year: "2025", label: "Aplicaciones y bases de datos" },
    { year: "2025", label: "Automatización e integraciones" },
    { year: "2026", label: "Backend / Data / AI" },
  ],

  // ---- Proyectos personales ----
  personalProjects: [
    {
      id: "agentfor",
      name: "AgentFor",
      subtitle: "Personal AI Operating System",
      palette: "emerald-cyan",
      summary:
        "Plataforma personal de agente de IA: un dashboard de terminal con métricas reales del equipo, una interfaz web de un solo archivo y un system prompt que define su identidad y comportamiento.",
      implemented: [
        "Dashboard de terminal en Node.js",
        "blessed-contrib",
        "systeminformation (métricas reales del equipo)",
        "Interfaz web de un solo archivo",
        "Orbe animado",
        "Paneles neón",
        "System prompt que define identidad y comportamiento del agente",
      ],
      roadmap: [
        "Flujo de voz por estados",
        "Taxonomía de intenciones",
        "Confirmación obligatoria para acciones destructivas",
        "Memoria persistente en SQLite (opt-in explícito)",
        "STT local con Whisper.cpp",
        "TTS con Piper",
        "PostgreSQL",
        "Integración con correo",
        "Integración con Obsidian",
        "Integración con VS Code",
      ],
      pipeline: [
        { stage: "Escuchar", status: "roadmap" },
        { stage: "Transcribir", status: "roadmap" },
        { stage: "Interpretar", status: "roadmap" },
        { stage: "Confirmar", status: "roadmap" },
        { stage: "Ejecutar", status: "roadmap" },
        { stage: "Reportar", status: "roadmap" },
        { stage: "Registrar", status: "roadmap" },
      ],
      orbLabels: ["Memory", "Tools", "Models", "Terminal", "Automation", "Integrations"],
      decisions: [
        { tech: "SQLite", reason: "Memoria persistente simple y embebida, sin infraestructura adicional para un agente personal." },
        { tech: "Whisper.cpp", reason: "Transcripción de voz local, sin depender de servicios en la nube." },
        { tech: "Piper", reason: "Síntesis de voz local y ligera." },
        { tech: "PostgreSQL", reason: "Almacenamiento estructurado para datos personales que crecen con el tiempo." },
        { tech: "Anthropic API", reason: "Modelo de lenguaje para interpretar intenciones y coordinar acciones." },
        { tech: "Node.js", reason: "Mismo entorno de ejecución que el dashboard de terminal ya implementado." },
      ],
    },
    {
      id: "finanzas",
      name: "Sistema financiero personal",
      subtitle: "Backend + base de datos propia",
      palette: "violet-emerald",
      summary:
        "Herramienta personal para el seguimiento de gastos, deudas y ciclos financieros, con backend, base de datos, reportes y autenticación propios.",
      scope: ["Gastos", "Deudas", "Ciclos", "Backend", "Base de datos", "Reportes", "Autenticación"],
    },
  ],

  availableFor: ["Backend", "Automation", "Systems Integration", "Applications", "Data", "AI Projects"],

  contact: {
    email: "stivencuestamena@gmail.com",
    github: "https://github.com/stickcrea",
    linkedin: "https://www.linkedin.com/in/stiven-cuesta-mena-59685a245/",
  },
};
