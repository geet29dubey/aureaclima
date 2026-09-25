import type { Locale } from "@/i18n/dictionaries";

export type Policy = "privacy" | "cookies" | "legal";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string };

export type LegalDocument = {
  title: string;
  updated: string;
  introduction?: string;
  sections: { title: string; blocks: LegalBlock[] }[];
};

const paragraph = (text: string): LegalBlock => ({ type: "paragraph", text });
const subheading = (text: string): LegalBlock => ({ type: "subheading", text });
const list = (...items: string[]): LegalBlock => ({ type: "list", items });
const table = (headers: string[], rows: string[][]): LegalBlock => ({ type: "table", headers, rows });
const quote = (text: string): LegalBlock => ({ type: "quote", text });

const es: Record<Policy, LegalDocument> = {
  legal: {
    title: "Aviso legal",
    updated: "Última actualización: 21 de septiembre de 2026",
    sections: [
      {
        title: "1. Identificación del titular",
        blocks: [
          paragraph("En cumplimiento de la normativa aplicable a los servicios de la sociedad de la información, se facilita la siguiente información de identificación del titular del sitio web:"),
          table(["Dato", "Información"], [
            ["Titular", "Geetanjali Dubey"],
            ["Nombre comercial", "Rooklyn"],
            ["NIF/NIE", "Z0680759X"],
            ["Domicilio profesional", "Calle Transversal Sexta 24, 28021 Madrid, España"],
            ["Correo electrónico", "geet29.dubey@gmail.com"],
            ["Sitio web", "https://rooklyn.co"],
          ]),
          paragraph("Datos registrales: no aplicable actualmente, salvo que resulte exigible por la forma jurídica o por la inscripción en un registro público."),
        ],
      },
      {
        title: "2. Objeto y ámbito de aplicación",
        blocks: [
          paragraph("Rooklyn ofrece información y servicios relacionados con tecnología, automatización, CRM, inteligencia artificial, gestión comercial, marketing digital y soluciones de optimización de procesos para empresas."),
          paragraph("Este Aviso Legal se aplica a rooklyn.co y, cuando corresponda, a los subdominios, páginas de demostración y páginas comerciales gestionadas por Rooklyn, incluidos clima.rooklyn.co y aureaclima.rooklyn.co."),
          paragraph("Áurea Clima es un entorno demostrativo de Rooklyn destinado a ilustrar funcionalidades aplicables a empresas de climatización, calefacción, aire acondicionado y servicios relacionados. Salvo indicación expresa, no representa una empresa HVAC independiente ni implica la prestación efectiva de los servicios técnicos mostrados en la demostración."),
        ],
      },
      {
        title: "3. Condiciones de uso",
        blocks: [
          paragraph("El acceso y uso de los sitios web de Rooklyn atribuye la condición de usuario e implica el compromiso de utilizarlos de forma lícita, diligente y conforme a la legislación aplicable, al presente Aviso Legal y a la buena fe."),
          paragraph("Queda prohibido, entre otros usos:"),
          list(
            "Realizar actividades ilícitas o contrarias a derechos de terceros.",
            "Introducir virus, código malicioso o elementos destinados a dañar o alterar sistemas.",
            "Intentar acceder sin autorización a sistemas, cuentas, datos o funcionalidades.",
            "Interferir con la disponibilidad, seguridad o funcionamiento de los sitios web.",
            "Reproducir, explotar o utilizar contenidos de forma contraria a la ley o a los derechos de sus titulares.",
          ),
        ],
      },
      {
        title: "4. Contenido demostrativo",
        blocks: [
          paragraph("Determinadas funcionalidades, precios, empresas, comunicaciones, automatizaciones, calendarios, solicitudes de servicio, presupuestos, activos, estados de oportunidades u otros elementos mostrados en entornos de demostración pueden ser ficticios o tener una finalidad exclusivamente demostrativa."),
          paragraph("El usuario no debe introducir en un entorno de demostración datos sensibles, datos confidenciales de terceros ni información que no sea necesaria para realizar la prueba."),
        ],
      },
      {
        title: "5. Propiedad intelectual e industrial",
        blocks: [
          paragraph("Salvo indicación en contrario, los contenidos, diseños, textos, elementos gráficos, estructura, software, marcas, nombres comerciales y demás elementos de los sitios web pertenecen a Rooklyn o se utilizan con autorización o bajo una licencia aplicable."),
          paragraph("No se autoriza su reproducción, distribución, transformación, comunicación pública o explotación comercial cuando dicha utilización requiera autorización del titular de los derechos, sin perjuicio de los usos permitidos por la ley."),
        ],
      },
      {
        title: "6. Disponibilidad y responsabilidad",
        blocks: [
          paragraph("Rooklyn procura mantener sus sitios web disponibles, seguros y actualizados, pero no garantiza la ausencia absoluta de errores, interrupciones, vulnerabilidades o incidencias técnicas."),
          paragraph("Los contenidos publicados tienen carácter informativo y demostrativo. No constituyen asesoramiento jurídico, fiscal, financiero, técnico especializado ni sustituyen la valoración profesional que pueda requerir cada caso concreto."),
        ],
      },
      {
        title: "7. Enlaces y servicios de terceros",
        blocks: [paragraph("Los sitios web pueden incluir enlaces, integraciones o servicios proporcionados por terceros. Rooklyn no controla necesariamente dichos servicios y no responde por sus contenidos, disponibilidad, políticas o prácticas, sin perjuicio de las responsabilidades que legalmente correspondan.")],
      },
      {
        title: "8. Protección de datos personales",
        blocks: [paragraph("El tratamiento de los datos personales realizado a través de los sitios web, formularios y canales propios de Rooklyn se describe en la Política de Privacidad disponible en https://rooklyn.co/politica-privacidad.")],
      },
      {
        title: "9. Cookies",
        blocks: [paragraph("La utilización de cookies y tecnologías similares se describe en la Política de Cookies disponible en https://rooklyn.co/politica-cookies. Cuando resulte necesario, las cookies no esenciales se instalarán únicamente después de que el usuario haya realizado una elección válida mediante el mecanismo de gestión de consentimiento.")],
      },
      {
        title: "10. Comunicaciones y contacto",
        blocks: [paragraph("Para consultas relacionadas con el sitio web o con los servicios de Rooklyn, puede contactar mediante geet29.dubey@gmail.com. Este correo podrá ser sustituido por una dirección específica del dominio rooklyn.co cuando esté disponible.")],
      },
      {
        title: "11. Legislación aplicable",
        blocks: [paragraph("El presente Aviso Legal se regirá por la legislación española, sin perjuicio de las normas imperativas y de los derechos que puedan corresponder a consumidores o usuarios cuando resulten aplicables.")],
      },
      {
        title: "12. Modificaciones",
        blocks: [paragraph("Rooklyn podrá actualizar este Aviso Legal para reflejar cambios normativos, técnicos, organizativos o en los servicios ofrecidos. La fecha de la última actualización aparecerá al inicio del documento.")],
      },
    ],
  },
  cookies: {
    title: "Política de cookies",
    updated: "Última actualización: 21 de septiembre de 2026",
    introduction: "Esta Política de Cookies explica qué son las cookies y tecnologías similares, cómo pueden utilizarse en los sitios web operados por Rooklyn, qué terceros pueden intervenir y cómo puede el usuario aceptar, rechazar, configurar o retirar sus preferencias.",
    sections: [
      {
        title: "1. Responsable",
        blocks: [
          table(["Dato", "Información"], [
            ["Responsable", "Geetanjali Dubey"],
            ["Nombre comercial", "Rooklyn"],
            ["NIF/NIE/CIF", "Z0680759Z"],
            ["Correo electrónico", "geet29.dubey@gmail.com"],
            ["Sitio web principal", "https://rooklyn.co"],
          ]),
          paragraph("Esta Política se aplica, cuando corresponda, a los siguientes dominios y subdominios gestionados por Rooklyn:"),
          list("https://rooklyn.co", "https://clima.rooklyn.co", "https://aureaclima.rooklyn.co"),
          paragraph("Los enlaces que dirijan a sitios de terceros quedan sometidos a las políticas de privacidad y cookies de dichos terceros."),
        ],
      },
      {
        title: "2. Marco normativo y alcance",
        blocks: [
          paragraph("El uso de cookies y tecnologías de almacenamiento o acceso a información en el dispositivo del usuario se rige, entre otras normas aplicables, por el artículo 22.2 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI). Cuando dichas tecnologías impliquen tratamiento de datos personales, resultan asimismo aplicables el Reglamento (UE) 2016/679 (RGPD) y la normativa española de protección de datos que corresponda."),
          paragraph("Las cookies estrictamente necesarias para transmitir una comunicación o prestar un servicio expresamente solicitado por el usuario pueden quedar exceptuadas del requisito de consentimiento. Las cookies no necesarias se activarán únicamente cuando exista una base jurídica válida y, cuando corresponda, después de que el usuario haya prestado un consentimiento válido."),
        ],
      },
      {
        title: "3. ¿Qué son las cookies y tecnologías similares?",
        blocks: [
          paragraph("Las cookies son pequeños archivos de texto que un sitio web puede almacenar en el navegador o dispositivo del usuario. También pueden utilizarse tecnologías con funciones similares, como almacenamiento local, píxeles, identificadores técnicos o scripts integrados."),
          paragraph("Estas tecnologías pueden servir para permitir el funcionamiento técnico del sitio, recordar preferencias, mantener la seguridad, gestionar sesiones, medir el uso de las páginas o, cuando proceda y exista consentimiento, personalizar contenidos o comunicaciones comerciales."),
        ],
      },
      {
        title: "4. Tipos de cookies por finalidad",
        blocks: [
          subheading("Cookies técnicas o estrictamente necesarias"),
          paragraph("Permiten el funcionamiento básico del sitio, la navegación, la seguridad, el equilibrio de carga, la prevención de fraude o bots, la gestión de sesiones, la conservación de la elección de cookies o la prestación de una funcionalidad expresamente solicitada por el usuario. Cuando sean estrictamente necesarias, no se utilizarán para finalidades adicionales incompatibles."),
          subheading("Cookies de preferencias o funcionales"),
          paragraph("Permiten recordar elecciones del usuario, como el idioma o determinadas preferencias de interfaz. Cuando la normativa exija consentimiento para una preferencia concreta, la tecnología correspondiente permanecerá desactivada hasta obtenerlo."),
          subheading("Cookies analíticas o de rendimiento"),
          paragraph("Permiten medir de forma agregada cómo se utiliza un sitio, detectar errores, conocer páginas visitadas o mejorar el rendimiento. Cuando requieran consentimiento, no se instalarán ni activarán antes de que el usuario las acepte."),
          subheading("Cookies publicitarias o de marketing"),
          paragraph("Pueden utilizarse para medir campañas, limitar la repetición de anuncios, crear audiencias o mostrar publicidad basada en intereses. Si se utilizan, se solicitará el consentimiento previo que resulte exigible."),
          subheading("Cookies o tecnologías de servicios integrados"),
          paragraph("Determinadas páginas pueden incorporar formularios, calendarios, CRM, chat, vídeo, mapas, captchas u otros componentes de terceros. La finalidad y régimen de consentimiento dependerán del componente y de las tecnologías que efectivamente cargue en el navegador."),
        ],
      },
      {
        title: "5. Cookies propias y de terceros",
        blocks: [
          paragraph("En función de la entidad que gestione la tecnología, los sitios pueden utilizar:"),
          list(
            "Cookies propias: gestionadas desde dominios o componentes controlados por Rooklyn.",
            "Cookies de terceros: gestionadas por proveedores tecnológicos integrados en el sitio, cuando la funcionalidad correspondiente se encuentre activa.",
          ),
          paragraph("La presencia efectiva de una cookie concreta puede variar según el dominio visitado, la página, el componente cargado, la configuración técnica y la elección realizada por el usuario en el gestor de consentimiento."),
        ],
      },
      {
        title: "6. Inventario de cookies y servicios tecnológicos",
        blocks: [
          paragraph("A la fecha de esta Política, Rooklyn utiliza o puede cargar, según la página y la funcionalidad activada, los siguientes servicios. Las tecnologías no necesarias deberán permanecer bloqueadas hasta que exista consentimiento cuando éste sea exigible."),
          table(["Categoría", "Proveedor", "Finalidad", "Ejemplos / tecnología", "Duración orientativa", "Estado / activación"], [
            ["Necesarias", "Rooklyn / gestor de consentimiento", "Funcionamiento técnico, conservación de la elección de cookies y, cuando proceda, preferencias imprescindibles para prestar la funcionalidad solicitada.", "Cookie o almacenamiento de consentimiento; el nombre técnico depende del gestor implantado.", "Durante la sesión o durante el plazo configurado para conservar la elección del usuario.", "Activas únicamente en la medida necesaria para operar el sitio o recordar la elección del usuario."],
            ["Necesarias / seguridad", "Cloudflare, Inc. (cuando la infraestructura o funciones de seguridad lo requieran)", "Entrega segura del sitio, filtrado de tráfico, protección frente a bots, retos de seguridad y/o balanceo de carga.", "Cloudflare documenta cookies técnicas como __cf_bm, cf_clearance o _cflb cuando las funciones correspondientes están activas.", "Normalmente de sesión o de corta duración, según la función y configuración del proveedor.", "Solo cuando el servicio o función técnica correspondiente se encuentre activo."],
            ["Funcionales / CRM / reservas", "HighLevel / LeadConnector (cuando se carguen formularios, calendarios, chat o componentes integrados)", "Procesar formularios, solicitudes, reservas, sesiones de componentes, preferencias y otras funciones vinculadas al CRM o a la interacción solicitada por el usuario.", "HighLevel utiliza tecnologías de sesión y persistentes; los identificadores concretos dependen del componente cargado.", "Desde la sesión hasta periodos persistentes definidos por el proveedor; HighLevel publica duraciones de hasta un año para determinadas cookies.", "Solo en páginas donde se cargue la integración correspondiente. Las tecnologías no necesarias se supeditarán al consentimiento cuando sea exigible."],
            ["Preferencias", "Rooklyn y/o proveedor del componente", "Recordar idioma u otras preferencias elegidas por el usuario.", "Cookie o almacenamiento local de preferencia, si se implementa.", "Hasta que caduque la preferencia, se elimine o el usuario cambie su configuración.", "Solo cuando la funcionalidad se encuentre implementada y conforme al régimen de consentimiento aplicable."],
            ["Analíticas / rendimiento", "Rooklyn y/o proveedor de analítica que se active en el futuro", "Medición de uso, rendimiento y mejora del sitio.", "No se declara en esta Política una herramienta concreta de analítica basada en cookies como activa por defecto. Si se habilita, se identificará en el gestor y en esta tabla.", "Según la herramienta que se active.", "Desactivadas hasta su configuración y, cuando proceda, consentimiento."],
            ["Marketing / publicidad", "Rooklyn y/o plataforma publicitaria que se active en el futuro", "Medición de campañas, atribución, audiencias o publicidad personalizada.", "No se declara en esta Política una plataforma concreta de marketing basada en cookies como activa por defecto. Si se habilita, se identificará antes de su uso.", "Según la plataforma que se active.", "Desactivadas hasta su configuración y consentimiento previo cuando sea exigible."],
          ]),
          paragraph("Importante: el inventario técnico exacto (nombre de la cookie o identificador, proveedor, finalidad y caducidad) debe coincidir con la configuración que esté desplegada en cada dominio. Cuando el gestor de consentimiento muestre un inventario dinámico, dicho panel deberá mantenerse actualizado y accesible desde “Configuración de cookies”. Si se incorpora una nueva herramienta de analítica, publicidad, vídeo, chat, calendario, captcha u otro tercero, esta sección deberá revisarse antes de su activación."),
        ],
      },
      {
        title: "7. Consentimiento y configuración",
        blocks: [
          paragraph("Cuando se utilicen cookies o tecnologías que requieran consentimiento, el usuario dispondrá, desde la primera capa o banner, de mecanismos claros para:"),
          list("Aceptar cookies no necesarias.", "Rechazar cookies no necesarias.", "Configurar las cookies por finalidad y guardar la selección."),
          paragraph("Las opciones de aceptar y rechazar deberán ofrecerse al mismo tiempo y con una visibilidad equivalente. No se utilizarán casillas premarcadas ni se considerará que la mera continuación de la navegación constituye consentimiento. Las cookies no necesarias que requieran consentimiento permanecerán bloqueadas hasta que el usuario realice una elección válida."),
        ],
      },
      {
        title: "8. Retirada o modificación del consentimiento",
        blocks: [
          paragraph("El usuario podrá modificar o retirar sus preferencias en cualquier momento mediante el enlace o botón “Configuración de cookies” disponible de forma permanente en el pie de página o en el sistema de gestión de consentimiento del sitio."),
          paragraph("Retirar el consentimiento no afectará a la licitud del tratamiento efectuado antes de su retirada. Cuando el usuario rechace una categoría, las tecnologías de dicha categoría dejarán de cargarse en las visitas posteriores, salvo aquellas que sean estrictamente necesarias o deban conservarse por obligación legal."),
        ],
      },
      {
        title: "9. Gestión desde el navegador",
        blocks: [
          paragraph("Además del gestor de consentimiento del sitio, el usuario puede permitir, bloquear, eliminar o limitar cookies desde la configuración de su navegador. El bloqueo de determinadas cookies técnicas puede impedir que algunas funciones solicitadas se presten correctamente."),
          paragraph("Los principales navegadores incluyen opciones específicas de privacidad y cookies en sus menús de configuración (por ejemplo, Chrome, Edge, Firefox y Safari). El procedimiento puede variar según la versión y el dispositivo."),
        ],
      },
      {
        title: "10. Servicios de terceros",
        blocks: [
          paragraph("Rooklyn puede integrar servicios de terceros para alojamiento y seguridad, CRM, formularios, calendarios, reservas, mensajería, chat, vídeo, mapas, analítica o marketing. Cuando alguno de estos servicios instale cookies o utilice tecnologías de seguimiento no necesarias, se aplicará el régimen de consentimiento correspondiente."),
          list(
            "Cloudflare: puede intervenir en la entrega, seguridad y protección del tráfico del sitio. Cloudflare clasifica determinadas cookies de seguridad como estrictamente necesarias cuando se activan sus funciones correspondientes.",
            "HighLevel / LeadConnector: puede intervenir en formularios, CRM, calendarios, chat, reservas u otros componentes integrados. HighLevel publica su propia Política de Cookies y documentación de privacidad para sus servicios.",
          ),
          paragraph("La inclusión de un proveedor en esta Política no significa que todas sus cookies se utilicen en todas las páginas. Solo se cargarán las tecnologías asociadas a los componentes que estén efectivamente integrados y activados."),
        ],
      },
      {
        title: "11. Transferencias internacionales",
        blocks: [
          paragraph("Algunos proveedores tecnológicos pueden tratar datos fuera del Espacio Económico Europeo. Cuando exista una transferencia internacional de datos personales, Rooklyn procurará que se utilice un mecanismo reconocido por la normativa aplicable, como una decisión de adecuación, el Marco de Privacidad de Datos UE-EE. UU. (cuando el proveedor esté certificado y la transferencia quede cubierta) o cláusulas contractuales tipo, según corresponda."),
          paragraph("HighLevel informa públicamente de que HighLevel y LeadConnector participan en el Marco de Privacidad de Datos UE-EE. UU. Para conocer el mecanismo concreto aplicable a un tratamiento determinado, puede consultarse la documentación de privacidad del proveedor y la Política de Privacidad de Rooklyn."),
        ],
      },
      {
        title: "12. Conservación",
        blocks: [paragraph("Las cookies de sesión se eliminan normalmente al cerrar el navegador. Las cookies persistentes permanecen durante el plazo configurado o hasta que el usuario las elimine. Rooklyn aplicará plazos proporcionados a la finalidad y revisará periódicamente las tecnologías activas para evitar una conservación innecesaria.")],
      },
      {
        title: "13. Actualización de esta Política",
        blocks: [paragraph("Esta Política podrá actualizarse cuando cambien las cookies utilizadas, los proveedores tecnológicos, los dominios gestionados por Rooklyn o las obligaciones legales aplicables. La fecha de la última actualización aparecerá al inicio del documento. Recomendamos revisar periódicamente esta página.")],
      },
      {
        title: "14. Contacto",
        blocks: [paragraph("Para consultas relacionadas con esta Política de Cookies o con la configuración de privacidad del sitio, puede contactar con Rooklyn en: geet29.dubey@gmail.com.")],
      },
      {
        title: "Anexo: texto recomendado para el banner de cookies",
        blocks: [
          quote("Utilizamos cookies técnicas necesarias para que el sitio funcione. Con tu consentimiento, también podremos utilizar cookies de preferencias, analíticas o de terceros integrados para mejorar la experiencia y medir el uso del sitio. Puedes aceptar, rechazar o configurar tus preferencias. Más información en nuestra Política de Cookies."),
          paragraph("Botones recomendados, mostrados al mismo nivel visual:"),
          list("RECHAZAR", "CONFIGURAR", "ACEPTAR"),
        ],
      },
    ],
  },
  privacy: {
    title: "Política de privacidad",
    updated: "Última actualización: 21 de septiembre de 2026",
    introduction: "En Rooklyn nos comprometemos a tratar los datos personales de forma lícita, leal, transparente y limitada a las finalidades para las que resulten necesarios. Esta Política explica cómo tratamos los datos personales de quienes interactúan con nuestros sitios web, formularios, páginas de demostración y canales propios.",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        blocks: [
          table(["Dato", "Información"], [
            ["Titular", "Geetanjali Dubey"],
            ["Nombre comercial", "Rooklyn"],
            ["NIF/NIE", "Z0680759X"],
            ["Domicilio profesional", "Calle Transversal Sexta 24, 28021 Madrid, España"],
            ["Correo electrónico", "geet29.dubey@gmail.com"],
            ["Sitio web", "https://rooklyn.co"],
          ]),
          paragraph("Rooklyn actúa como responsable del tratamiento respecto de los datos recogidos para sus propias finalidades comerciales, de contacto, contratación y gestión de sus servicios. Cuando Rooklyn trate datos por cuenta de un cliente y siguiendo sus instrucciones, podrá actuar como encargado del tratamiento; dicha relación deberá regularse contractualmente cuando corresponda."),
        ],
      },
      {
        title: "2. Ámbito de aplicación",
        blocks: [
          paragraph("Esta Política se aplica, entre otros, a:"),
          list("https://rooklyn.co", "https://clima.rooklyn.co", "https://aureaclima.rooklyn.co", "Formularios, páginas de reserva, demostraciones y otros canales propios vinculados a esos sitios."),
          paragraph("Áurea Clima es un entorno demostrativo de Rooklyn y no constituye necesariamente una empresa HVAC independiente."),
        ],
      },
      {
        title: "3. Datos que podemos tratar",
        blocks: [
          subheading("3.1 Datos identificativos y de contacto"),
          list("Nombre y apellidos.", "Empresa y cargo o función profesional.", "Dirección de correo electrónico.", "Número de teléfono."),
          subheading("3.2 Datos relacionados con solicitudes y relaciones comerciales"),
          list("Tipo de empresa y servicios de interés.", "Información facilitada voluntariamente en formularios o comunicaciones.", "Fecha y hora de reuniones, demostraciones o reservas.", "Mensajes e historial de comunicaciones relacionados con la solicitud.", "Datos necesarios para propuestas, presupuestos, contratación, facturación y soporte cuando exista relación contractual."),
          subheading("3.3 Datos técnicos y de navegación"),
          list("Dirección IP y datos de conexión.", "Tipo de navegador, dispositivo y sistema operativo.", "Fecha y hora de acceso.", "Información sobre uso y navegación cuando proceda."),
          paragraph("Cuando estos datos se obtengan mediante cookies o tecnologías no necesarias, se solicitará el consentimiento cuando sea exigible."),
        ],
      },
      {
        title: "4. Finalidades y bases jurídicas",
        blocks: [
          table(["Finalidad", "Datos / actividad", "Base jurídica principal"], [
            ["Atender consultas y solicitudes", "Responder formularios, correos y solicitudes de información", "Medidas precontractuales solicitadas por el interesado y, según el caso, interés legítimo en atender comunicaciones profesionales."],
            ["Gestionar demostraciones y reuniones", "Organización de llamadas, demos y citas solicitadas", "Medidas precontractuales solicitadas por el interesado."],
            ["Gestión comercial y CRM", "Registrar contactos, oportunidades e historial de seguimiento", "Medidas precontractuales; interés legítimo en la gestión de relaciones profesionales cuando resulte aplicable."],
            ["Prestación de servicios", "Gestión contractual, soporte, facturación y administración", "Ejecución de contrato y cumplimiento de obligaciones legales."],
            ["Comunicaciones comerciales", "Información sobre servicios, soluciones y novedades", "Consentimiento cuando sea necesario, o la base legal que resulte aplicable a relaciones previas conforme a la normativa."],
            ["Seguridad y funcionamiento", "Prevención de fraude, seguridad, mantenimiento y diagnóstico técnico", "Interés legítimo en mantener la seguridad y funcionamiento de los sistemas; cumplimiento legal cuando proceda."],
          ]),
          paragraph("Cuando un tratamiento se base en el consentimiento, el interesado podrá retirarlo en cualquier momento sin que ello afecte a la licitud del tratamiento previo a su retirada."),
        ],
      },
      {
        title: "5. Formularios y datos obligatorios",
        blocks: [
          paragraph("Los campos marcados como obligatorios son necesarios para gestionar la solicitud correspondiente. Si no se facilitan, puede no ser posible atender la petición o prestar la funcionalidad solicitada."),
          paragraph("La información sobre protección de datos mostrada junto a los formularios complementa esta Política. Cuando se solicite consentimiento para una finalidad opcional, como determinadas comunicaciones comerciales, se presentará de forma separada y no premarcada."),
        ],
      },
      {
        title: "6. Conservación de los datos",
        blocks: [
          paragraph("Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y, posteriormente, durante los plazos en los que puedan surgir responsabilidades legales."),
          list(
            "Consultas y oportunidades comerciales: mientras exista una interacción o posibilidad razonable de relación comercial y posteriormente durante el plazo necesario para atender posibles responsabilidades o solicitudes.",
            "Clientes: durante la relación contractual y posteriormente durante los plazos legales aplicables.",
            "Comunicaciones comerciales basadas en consentimiento: hasta la retirada del consentimiento o el ejercicio del derecho de oposición, sin perjuicio de conservar la evidencia necesaria para acreditar la preferencia o consentimiento.",
          ),
        ],
      },
      {
        title: "7. Destinatarios y proveedores tecnológicos",
        blocks: [
          paragraph("Rooklyn puede recurrir a proveedores que tratan datos para prestar servicios tecnológicos necesarios para su actividad. Según la configuración efectiva de cada sitio o servicio, pueden incluir:"),
          list("Proveedores de alojamiento web, DNS, seguridad y distribución de contenido, incluido Cloudflare cuando esté activo.", "GoHighLevel / HighLevel para CRM, formularios, automatizaciones, oportunidades y comunicaciones.", "Proveedores de correo electrónico y calendario.", "Proveedores de mensajería, incluido WhatsApp/Meta cuando se utilice dicho canal.", "Proveedores de infraestructura, automatización o inteligencia artificial que resulten necesarios para prestar funcionalidades concretas y se encuentren debidamente configurados."),
          paragraph("Rooklyn no vende datos personales. Cuando un proveedor actúe como encargado del tratamiento, la relación se regulará conforme a las exigencias aplicables. También podrán comunicarse datos cuando exista una obligación legal."),
        ],
      },
      {
        title: "8. Transferencias internacionales",
        blocks: [paragraph("Algunos proveedores tecnológicos pueden estar establecidos o tratar datos fuera del Espacio Económico Europeo. Cuando exista una transferencia internacional sujeta al RGPD, se utilizará un mecanismo válido, como una decisión de adecuación, cláusulas contractuales tipo u otra garantía reconocida por la normativa aplicable. Puede solicitar información adicional sobre las garantías aplicables mediante el correo indicado en esta Política.")],
      },
      {
        title: "9. GoHighLevel y formularios",
        blocks: [paragraph("Determinados formularios y procesos de Rooklyn pueden integrarse con GoHighLevel / HighLevel. La información facilitada puede incorporarse al CRM para gestionar solicitudes, contactar con el interesado, programar demostraciones o reuniones, gestionar seguimientos y mantener el historial de comunicaciones relacionado con la solicitud.")],
      },
      {
        title: "10. Áurea Clima y entornos de demostración",
        blocks: [
          paragraph("Áurea Clima es un entorno de demostración comercial utilizado para mostrar ejemplos de automatización y gestión aplicables al sector de climatización y HVAC. Los datos introducidos en formularios activos de la demostración se tratarán conforme a esta Política cuando Rooklyn los reciba para sus propias finalidades."),
          paragraph("No deben introducirse datos especialmente sensibles, datos de salud, información confidencial de terceros ni datos reales de clientes que no sean necesarios para realizar la demostración."),
        ],
      },
      {
        title: "11. Decisiones automatizadas y perfilado",
        blocks: [paragraph("Rooklyn puede utilizar automatizaciones para clasificar solicitudes, crear tareas, asignar estados o facilitar seguimientos internos. Salvo que se informe expresamente de lo contrario, estas automatizaciones no se utilizan para adoptar decisiones basadas únicamente en tratamiento automatizado que produzcan efectos jurídicos sobre el interesado o le afecten significativamente de modo similar.")],
      },
      {
        title: "12. Derechos de las personas interesadas",
        blocks: [
          paragraph("Puede ejercer, cuando correspondan, los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar el consentimiento cuando el tratamiento se base en él."),
          paragraph("Para ejercer sus derechos puede escribir a geet29.dubey@gmail.com, indicando en el asunto “Protección de datos” y facilitando la información necesaria para identificar la solicitud. Podremos solicitar información adicional cuando sea razonablemente necesaria para verificar la identidad del solicitante."),
        ],
      },
      {
        title: "13. Reclamación ante la autoridad de control",
        blocks: [paragraph("Si considera que el tratamiento de sus datos personales infringe la normativa, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), cuya información y procedimientos están disponibles en https://www.aepd.es.")],
      },
      {
        title: "14. Seguridad",
        blocks: [paragraph("Rooklyn aplicará medidas técnicas y organizativas apropiadas atendiendo a la naturaleza, alcance, contexto y finalidades del tratamiento y al nivel de riesgo. Ningún sistema conectado a Internet puede garantizar una seguridad absoluta.")],
      },
      {
        title: "15. Datos de terceros",
        blocks: [paragraph("Quien facilite datos de terceros debe contar con una base legítima para hacerlo y proporcionar únicamente la información necesaria para la finalidad correspondiente.")],
      },
      {
        title: "16. Menores de edad",
        blocks: [paragraph("Los servicios de Rooklyn están dirigidos principalmente a empresas y profesionales. No se pretende recopilar intencionadamente datos de menores mediante formularios comerciales o demostraciones.")],
      },
      {
        title: "17. Enlaces externos",
        blocks: [paragraph("Los sitios web pueden contener enlaces a páginas o servicios de terceros. Sus prácticas de privacidad se rigen por sus propias políticas y condiciones.")],
      },
      {
        title: "18. Cookies",
        blocks: [paragraph("La información sobre cookies y tecnologías similares se encuentra en la Política de Cookies disponible en https://rooklyn.co/politica-cookies.")],
      },
      {
        title: "19. Cambios en esta Política",
        blocks: [paragraph("Rooklyn podrá actualizar esta Política cuando cambien los tratamientos, proveedores, servicios o requisitos normativos. La fecha de la última actualización aparecerá al inicio del documento.")],
      },
    ],
  },
};

const en: Record<Policy, LegalDocument> = {
  legal: {
    title: "Legal notice",
    updated: "Last updated: 21 September 2026",
    sections: [
      { title: "1. Website owner identification", blocks: [
        paragraph("In compliance with the rules applicable to information society services, the following identifying information about the website owner is provided:"),
        table(["Item", "Information"], [["Owner", "Geetanjali Dubey"], ["Trading name", "Rooklyn"], ["Tax identification number (NIF/NIE)", "Z0680759X"], ["Business address", "Calle Transversal Sexta 24, 28021 Madrid, Spain"], ["Email", "geet29.dubey@gmail.com"], ["Website", "https://rooklyn.co"]]),
        paragraph("Registration details: currently not applicable, unless required by the legal form or by registration in a public registry."),
      ] },
      { title: "2. Purpose and scope", blocks: [
        paragraph("Rooklyn provides information and services related to technology, automation, CRM, artificial intelligence, commercial management, digital marketing and business process optimisation solutions."),
        paragraph("This Legal Notice applies to rooklyn.co and, where appropriate, to subdomains, demonstration pages and commercial pages managed by Rooklyn, including clima.rooklyn.co and aureaclima.rooklyn.co."),
        paragraph("Áurea Clima is a Rooklyn demonstration environment intended to illustrate features applicable to air conditioning, heating, HVAC and related service businesses. Unless expressly stated otherwise, it does not represent an independent HVAC company or imply that the technical services shown in the demonstration are actually provided."),
      ] },
      { title: "3. Terms of use", blocks: [
        paragraph("Accessing and using Rooklyn websites gives the visitor the status of user and entails a commitment to use them lawfully, diligently and in accordance with applicable law, this Legal Notice and good faith."),
        paragraph("The following uses, among others, are prohibited:"),
        list("Carrying out unlawful activities or activities contrary to third-party rights.", "Introducing viruses, malicious code or elements intended to damage or alter systems.", "Attempting to access systems, accounts, data or features without authorisation.", "Interfering with the availability, security or operation of the websites.", "Reproducing, exploiting or using content contrary to the law or the rights of its owners."),
      ] },
      { title: "4. Demonstration content", blocks: [
        paragraph("Certain features, prices, companies, communications, automations, calendars, service requests, quotations, assets, opportunity stages or other elements shown in demonstration environments may be fictitious or intended solely for demonstration purposes."),
        paragraph("Users must not enter sensitive data, confidential third-party data or information that is not necessary for the test into a demonstration environment."),
      ] },
      { title: "5. Intellectual and industrial property", blocks: [
        paragraph("Unless otherwise stated, the content, designs, text, graphics, structure, software, trademarks, trading names and other elements of the websites belong to Rooklyn or are used with permission or under an applicable licence."),
        paragraph("Their reproduction, distribution, transformation, public communication or commercial exploitation is not authorised where such use requires permission from the rights holder, without prejudice to uses permitted by law."),
      ] },
      { title: "6. Availability and liability", blocks: [
        paragraph("Rooklyn seeks to keep its websites available, secure and up to date, but does not guarantee the complete absence of errors, interruptions, vulnerabilities or technical incidents."),
        paragraph("Published content is provided for information and demonstration purposes. It does not constitute legal, tax, financial or specialised technical advice and does not replace the professional assessment that a particular case may require."),
      ] },
      { title: "7. Third-party links and services", blocks: [paragraph("The websites may include links, integrations or services provided by third parties. Rooklyn does not necessarily control those services and is not responsible for their content, availability, policies or practices, without prejudice to any liability imposed by law.")] },
      { title: "8. Personal data protection", blocks: [paragraph("The processing of personal data through Rooklyn websites, forms and owned channels is described in the Privacy Policy available at https://rooklyn.co/politica-privacidad.")] },
      { title: "9. Cookies", blocks: [paragraph("The use of cookies and similar technologies is described in the Cookie Policy available at https://rooklyn.co/politica-cookies. Where required, non-essential cookies will be installed only after the user has made a valid choice through the consent management mechanism.")] },
      { title: "10. Communications and contact", blocks: [paragraph("For questions about the website or Rooklyn services, you may contact geet29.dubey@gmail.com. This email may be replaced by a specific rooklyn.co domain address when one becomes available.")] },
      { title: "11. Governing law", blocks: [paragraph("This Legal Notice is governed by Spanish law, without prejudice to mandatory rules and any rights that consumers or users may have where applicable.")] },
      { title: "12. Changes", blocks: [paragraph("Rooklyn may update this Legal Notice to reflect regulatory, technical or organisational changes or changes to the services offered. The date of the latest update will appear at the beginning of the document.")] },
    ],
  },
  cookies: {
    title: "Cookie policy",
    updated: "Last updated: 21 September 2026",
    introduction: "This Cookie Policy explains what cookies and similar technologies are, how they may be used on websites operated by Rooklyn, which third parties may be involved, and how users can accept, reject, configure or withdraw their preferences.",
    sections: [
      { title: "1. Controller", blocks: [
        table(["Item", "Information"], [["Controller", "Geetanjali Dubey"], ["Trading name", "Rooklyn"], ["Tax identification number (NIF/NIE/CIF)", "Z0680759Z"], ["Email", "geet29.dubey@gmail.com"], ["Main website", "https://rooklyn.co"]]),
        paragraph("Where applicable, this Policy covers the following domains and subdomains managed by Rooklyn:"),
        list("https://rooklyn.co", "https://clima.rooklyn.co", "https://aureaclima.rooklyn.co"),
        paragraph("Links to third-party websites are subject to those third parties’ privacy and cookie policies."),
      ] },
      { title: "2. Legal framework and scope", blocks: [
        paragraph("The use of cookies and technologies that store or access information on a user’s device is governed, among other applicable rules, by Article 22.2 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI). Where those technologies involve the processing of personal data, Regulation (EU) 2016/679 (GDPR) and the corresponding Spanish data protection rules also apply."),
        paragraph("Cookies that are strictly necessary to transmit a communication or provide a service expressly requested by the user may be exempt from the consent requirement. Non-essential cookies will be activated only where a valid legal basis exists and, where applicable, after the user has given valid consent."),
      ] },
      { title: "3. What are cookies and similar technologies?", blocks: [
        paragraph("Cookies are small text files that a website may store in a user’s browser or device. Technologies with similar functions may also be used, such as local storage, pixels, technical identifiers or embedded scripts."),
        paragraph("These technologies may enable the technical operation of the site, remember preferences, maintain security, manage sessions, measure page use or, where appropriate and with consent, personalise content or commercial communications."),
      ] },
      { title: "4. Types of cookies by purpose", blocks: [
        subheading("Technical or strictly necessary cookies"),
        paragraph("These enable the site’s basic operation, navigation, security, load balancing, fraud or bot prevention, session management, storage of the cookie choice, or delivery of a feature expressly requested by the user. Where they are strictly necessary, they will not be used for additional incompatible purposes."),
        subheading("Preference or functional cookies"),
        paragraph("These remember user choices, such as language or certain interface preferences. Where the law requires consent for a specific preference, the corresponding technology will remain disabled until consent is obtained."),
        subheading("Analytics or performance cookies"),
        paragraph("These enable aggregated measurement of how a site is used, error detection, identification of visited pages or performance improvements. Where they require consent, they will not be installed or activated before the user accepts them."),
        subheading("Advertising or marketing cookies"),
        paragraph("These may be used to measure campaigns, limit repeated advertisements, create audiences or display interest-based advertising. If used, any required prior consent will be requested."),
        subheading("Cookies or technologies from embedded services"),
        paragraph("Some pages may include forms, calendars, CRM, chat, video, maps, captchas or other third-party components. Their purpose and consent requirements will depend on the component and the technologies it actually loads in the browser."),
      ] },
      { title: "5. First-party and third-party cookies", blocks: [
        paragraph("Depending on the entity managing the technology, the sites may use:"),
        list("First-party cookies: managed from domains or components controlled by Rooklyn.", "Third-party cookies: managed by technology providers integrated into the site when the relevant feature is active."),
        paragraph("Whether a specific cookie is present may vary according to the domain visited, page, loaded component, technical configuration and the user’s choice in the consent manager."),
      ] },
      { title: "6. Inventory of cookies and technology services", blocks: [
        paragraph("As of the date of this Policy, Rooklyn uses or may load the following services depending on the page and activated feature. Non-essential technologies must remain blocked until consent is obtained where consent is required."),
        table(["Category", "Provider", "Purpose", "Examples / technology", "Indicative duration", "Status / activation"], [
          ["Necessary", "Rooklyn / consent manager", "Technical operation, storage of the cookie choice and, where appropriate, preferences essential to provide the requested feature.", "Consent cookie or storage; the technical name depends on the manager implemented.", "For the session or for the configured period used to retain the user’s choice.", "Active only to the extent necessary to operate the site or remember the user’s choice."],
          ["Necessary / security", "Cloudflare, Inc. (where required by infrastructure or security features)", "Secure site delivery, traffic filtering, protection against bots, security challenges and/or load balancing.", "Cloudflare documents technical cookies such as __cf_bm, cf_clearance or _cflb when the corresponding features are active.", "Usually session-based or short-lived, depending on the provider’s feature and configuration.", "Only when the corresponding technical service or feature is active."],
          ["Functional / CRM / bookings", "HighLevel / LeadConnector (when forms, calendars, chat or embedded components are loaded)", "Process forms, requests, bookings, component sessions, preferences and other functions linked to the CRM or the interaction requested by the user.", "HighLevel uses session and persistent technologies; the specific identifiers depend on the loaded component.", "From the session through persistent periods set by the provider; HighLevel publishes durations of up to one year for certain cookies.", "Only on pages where the relevant integration is loaded. Non-essential technologies will be subject to consent where required."],
          ["Preferences", "Rooklyn and/or the component provider", "Remember language or other preferences selected by the user.", "Preference cookie or local storage, if implemented.", "Until the preference expires, is deleted or the user changes the setting.", "Only when the feature is implemented and in accordance with the applicable consent rules."],
          ["Analytics / performance", "Rooklyn and/or an analytics provider activated in the future", "Measure usage and performance and improve the site.", "This Policy does not declare any particular cookie-based analytics tool active by default. If enabled, it will be identified in the manager and in this table.", "According to the tool that is activated.", "Disabled until configured and, where applicable, consent is obtained."],
          ["Marketing / advertising", "Rooklyn and/or an advertising platform activated in the future", "Campaign measurement, attribution, audiences or personalised advertising.", "This Policy does not declare any particular cookie-based marketing platform active by default. If enabled, it will be identified before use.", "According to the platform that is activated.", "Disabled until configured and prior consent is obtained where required."],
        ]),
        paragraph("Important: the exact technical inventory (cookie or identifier name, provider, purpose and expiry) must match the configuration deployed on each domain. Where the consent manager displays a dynamic inventory, that panel must be kept up to date and accessible from “Cookie settings”. If a new analytics, advertising, video, chat, calendar, captcha or other third-party tool is introduced, this section must be reviewed before activation."),
      ] },
      { title: "7. Consent and settings", blocks: [
        paragraph("Where cookies or technologies requiring consent are used, the first layer or banner will give users clear ways to:"),
        list("Accept non-essential cookies.", "Reject non-essential cookies.", "Configure cookies by purpose and save the selection."),
        paragraph("Accept and reject options must be offered at the same time with equivalent visibility. Pre-selected boxes will not be used, and merely continuing to browse will not be treated as consent. Non-essential cookies that require consent will remain blocked until the user makes a valid choice."),
      ] },
      { title: "8. Withdrawing or changing consent", blocks: [
        paragraph("Users may change or withdraw their preferences at any time through the “Cookie settings” link or button permanently available in the footer or in the site’s consent management system."),
        paragraph("Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal. When a user rejects a category, technologies in that category will stop loading on subsequent visits, except those that are strictly necessary or must be retained under a legal obligation."),
      ] },
      { title: "9. Browser settings", blocks: [
        paragraph("In addition to the site’s consent manager, users can allow, block, delete or limit cookies through their browser settings. Blocking certain technical cookies may prevent some requested features from working correctly."),
        paragraph("Major browsers include specific privacy and cookie options in their settings menus, including Chrome, Edge, Firefox and Safari. The procedure may vary by version and device."),
      ] },
      { title: "10. Third-party services", blocks: [
        paragraph("Rooklyn may integrate third-party services for hosting and security, CRM, forms, calendars, bookings, messaging, chat, video, maps, analytics or marketing. Where any of these services installs cookies or uses non-essential tracking technologies, the corresponding consent rules will apply."),
        list("Cloudflare: may be involved in site delivery, security and traffic protection. Cloudflare classifies certain security cookies as strictly necessary when the corresponding features are enabled.", "HighLevel / LeadConnector: may be involved in forms, CRM, calendars, chat, bookings or other embedded components. HighLevel publishes its own Cookie Policy and privacy documentation for its services."),
        paragraph("Listing a provider in this Policy does not mean that all of its cookies are used on every page. Only technologies associated with components that are actually integrated and active will be loaded."),
      ] },
      { title: "11. International transfers", blocks: [
        paragraph("Some technology providers may process data outside the European Economic Area. Where an international transfer of personal data takes place, Rooklyn will seek to use a mechanism recognised by applicable law, such as an adequacy decision, the EU–US Data Privacy Framework where the provider is certified and the transfer is covered, or Standard Contractual Clauses, as appropriate."),
        paragraph("HighLevel publicly states that HighLevel and LeadConnector participate in the EU–US Data Privacy Framework. The provider’s privacy documentation and Rooklyn’s Privacy Policy should be consulted to identify the specific mechanism applicable to particular processing."),
      ] },
      { title: "12. Retention", blocks: [paragraph("Session cookies are normally deleted when the browser is closed. Persistent cookies remain for the configured period or until the user deletes them. Rooklyn will apply periods proportionate to the purpose and periodically review active technologies to avoid unnecessary retention.")] },
      { title: "13. Updates to this Policy", blocks: [paragraph("This Policy may be updated when the cookies used, technology providers, domains managed by Rooklyn or applicable legal obligations change. The date of the latest update will appear at the beginning of the document. We recommend reviewing this page periodically.")] },
      { title: "14. Contact", blocks: [paragraph("For questions about this Cookie Policy or the site’s privacy settings, contact Rooklyn at: geet29.dubey@gmail.com.")] },
      { title: "Appendix: recommended text for the cookie banner", blocks: [
        quote("We use technical cookies that are necessary for the site to work. With your consent, we may also use preference, analytics or embedded third-party cookies to improve the experience and measure site use. You can accept, reject or configure your preferences. Read more in our Cookie Policy."),
        paragraph("Recommended buttons, displayed with equal visual prominence:"),
        list("REJECT", "SETTINGS", "ACCEPT"),
      ] },
    ],
  },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated: 21 September 2026",
    introduction: "At Rooklyn, we are committed to processing personal data lawfully, fairly, transparently and only for the purposes for which it is needed. This Policy explains how we process the personal data of people who interact with our websites, forms, demonstration pages and owned channels.",
    sections: [
      { title: "1. Data controller", blocks: [
        table(["Item", "Information"], [["Owner", "Geetanjali Dubey"], ["Trading name", "Rooklyn"], ["Tax identification number (NIF/NIE)", "Z0680759X"], ["Business address", "Calle Transversal Sexta 24, 28021 Madrid, Spain"], ["Email", "geet29.dubey@gmail.com"], ["Website", "https://rooklyn.co"]]),
        paragraph("Rooklyn acts as controller for data collected for its own commercial, contact, contracting and service management purposes. When Rooklyn processes data on behalf of a client and under that client’s instructions, it may act as a processor; that relationship must be governed by contract where appropriate."),
      ] },
      { title: "2. Scope", blocks: [
        paragraph("This Policy applies, among other things, to:"),
        list("https://rooklyn.co", "https://clima.rooklyn.co", "https://aureaclima.rooklyn.co", "Forms, booking pages, demonstrations and other owned channels linked to those sites."),
        paragraph("Áurea Clima is a Rooklyn demonstration environment and does not necessarily constitute an independent HVAC company."),
      ] },
      { title: "3. Data we may process", blocks: [
        subheading("3.1 Identification and contact data"),
        list("First and last name.", "Company and job title or professional role.", "Email address.", "Telephone number."),
        subheading("3.2 Data relating to enquiries and commercial relationships"),
        list("Type of business and services of interest.", "Information voluntarily provided in forms or communications.", "Date and time of meetings, demonstrations or bookings.", "Messages and communication history relating to the request.", "Data needed for proposals, quotations, contracting, billing and support where a contractual relationship exists."),
        subheading("3.3 Technical and browsing data"),
        list("IP address and connection data.", "Browser, device and operating system type.", "Date and time of access.", "Usage and browsing information where applicable."),
        paragraph("Where this data is collected through non-essential cookies or technologies, consent will be requested where required."),
      ] },
      { title: "4. Purposes and legal bases", blocks: [
        table(["Purpose", "Data / activity", "Main legal basis"], [
          ["Respond to enquiries and requests", "Respond to forms, emails and information requests", "Pre-contractual steps requested by the data subject and, where applicable, legitimate interest in responding to professional communications."],
          ["Manage demonstrations and meetings", "Organise requested calls, demos and appointments", "Pre-contractual steps requested by the data subject."],
          ["Commercial and CRM management", "Record contacts, opportunities and follow-up history", "Pre-contractual steps; legitimate interest in managing professional relationships where applicable."],
          ["Provide services", "Contract management, support, billing and administration", "Performance of a contract and compliance with legal obligations."],
          ["Commercial communications", "Information about services, solutions and news", "Consent where necessary, or the legal basis applicable to existing relationships under the relevant rules."],
          ["Security and operation", "Fraud prevention, security, maintenance and technical diagnostics", "Legitimate interest in maintaining system security and operation; legal compliance where applicable."],
        ]),
        paragraph("Where processing is based on consent, the data subject may withdraw it at any time without affecting the lawfulness of processing carried out before withdrawal."),
      ] },
      { title: "5. Forms and required data", blocks: [
        paragraph("Fields marked as required are necessary to manage the corresponding request. If they are not provided, it may not be possible to respond to the request or provide the requested feature."),
        paragraph("The data protection information shown alongside forms supplements this Policy. Where consent is requested for an optional purpose, such as certain commercial communications, it will be presented separately and will not be pre-selected."),
      ] },
      { title: "6. Data retention", blocks: [
        paragraph("Data will be kept for as long as necessary to fulfil the purpose for which it was collected and subsequently for the periods during which legal liability may arise."),
        list("Enquiries and commercial opportunities: while there is an interaction or a reasonable prospect of a commercial relationship, and afterwards for the period needed to address possible liabilities or requests.", "Clients: for the duration of the contractual relationship and afterwards for the applicable statutory periods.", "Consent-based commercial communications: until consent is withdrawn or the right to object is exercised, without prejudice to retaining evidence needed to demonstrate the preference or consent."),
      ] },
      { title: "7. Recipients and technology providers", blocks: [
        paragraph("Rooklyn may use providers that process data to deliver technology services needed for its business. Depending on the actual configuration of each site or service, these may include:"),
        list("Web hosting, DNS, security and content distribution providers, including Cloudflare when active.", "GoHighLevel / HighLevel for CRM, forms, automations, opportunities and communications.", "Email and calendar providers.", "Messaging providers, including WhatsApp/Meta when that channel is used.", "Infrastructure, automation or artificial intelligence providers needed to deliver specific, properly configured features."),
        paragraph("Rooklyn does not sell personal data. Where a provider acts as a processor, the relationship will be governed in accordance with applicable requirements. Data may also be disclosed where a legal obligation exists."),
      ] },
      { title: "8. International transfers", blocks: [paragraph("Some technology providers may be established or process data outside the European Economic Area. Where an international transfer is subject to the GDPR, a valid mechanism will be used, such as an adequacy decision, Standard Contractual Clauses or another safeguard recognised by applicable law. You may request further information about the applicable safeguards using the email address in this Policy.")] },
      { title: "9. GoHighLevel and forms", blocks: [paragraph("Certain Rooklyn forms and processes may integrate with GoHighLevel / HighLevel. Information provided may be added to the CRM to manage requests, contact the data subject, schedule demonstrations or meetings, manage follow-ups and maintain the communication history relating to the request.")] },
      { title: "10. Áurea Clima and demonstration environments", blocks: [
        paragraph("Áurea Clima is a commercial demonstration environment used to show examples of automation and management applicable to the air conditioning and HVAC sector. Data entered into active demonstration forms will be processed under this Policy where Rooklyn receives it for its own purposes."),
        paragraph("Do not enter special-category or highly sensitive data, health data, confidential third-party information or real client data that is not necessary for the demonstration."),
      ] },
      { title: "11. Automated decision-making and profiling", blocks: [paragraph("Rooklyn may use automations to classify requests, create tasks, assign statuses or support internal follow-up. Unless expressly stated otherwise, these automations are not used to make decisions based solely on automated processing that produce legal effects concerning the data subject or similarly significantly affect them.")] },
      { title: "12. Data subject rights", blocks: [
        paragraph("Where applicable, you may exercise the rights of access, rectification, erasure, objection, restriction of processing and portability, and withdraw consent where processing is based on it."),
        paragraph("To exercise your rights, write to geet29.dubey@gmail.com with “Data protection” in the subject line and provide the information needed to identify the request. We may request additional information where reasonably necessary to verify the requester’s identity."),
      ] },
      { title: "13. Complaint to the supervisory authority", blocks: [paragraph("If you believe that the processing of your personal data breaches the rules, you may lodge a complaint with the Spanish Data Protection Agency (AEPD), whose information and procedures are available at https://www.aepd.es.")] },
      { title: "14. Security", blocks: [paragraph("Rooklyn will apply appropriate technical and organisational measures in view of the nature, scope, context and purposes of processing and the level of risk. No internet-connected system can guarantee absolute security.")] },
      { title: "15. Third-party data", blocks: [paragraph("Anyone who provides third-party data must have a lawful basis for doing so and provide only the information needed for the relevant purpose.")] },
      { title: "16. Children", blocks: [paragraph("Rooklyn services are primarily intended for businesses and professionals. Rooklyn does not intend to collect children’s data through commercial forms or demonstrations.")] },
      { title: "17. External links", blocks: [paragraph("The websites may contain links to third-party pages or services. Their privacy practices are governed by their own policies and terms.")] },
      { title: "18. Cookies", blocks: [paragraph("Information about cookies and similar technologies is provided in the Cookie Policy available at https://rooklyn.co/politica-cookies.")] },
      { title: "19. Changes to this Policy", blocks: [paragraph("Rooklyn may update this Policy when processing activities, providers, services or regulatory requirements change. The date of the latest update will appear at the beginning of the document.")] },
    ],
  },
};

const it: Record<Policy, LegalDocument> = {
  legal: {
    title: "Note legali",
    updated: "Ultimo aggiornamento: 21 settembre 2026",
    sections: [
      { title: "1. Identificazione del titolare", blocks: [
        paragraph("In conformità alla normativa applicabile ai servizi della società dell’informazione, si forniscono i seguenti dati identificativi del titolare del sito web:"),
        table(["Dato", "Informazione"], [["Titolare", "Geetanjali Dubey"], ["Nome commerciale", "Rooklyn"], ["Numero di identificazione fiscale (NIF/NIE)", "Z0680759X"], ["Sede professionale", "Calle Transversal Sexta 24, 28021 Madrid, Spagna"], ["Email", "geet29.dubey@gmail.com"], ["Sito web", "https://rooklyn.co"]]),
        paragraph("Dati di registrazione: attualmente non applicabili, salvo qualora siano richiesti dalla forma giuridica o dall’iscrizione in un registro pubblico."),
      ] },
      { title: "2. Oggetto e ambito di applicazione", blocks: [
        paragraph("Rooklyn offre informazioni e servizi relativi a tecnologia, automazione, CRM, intelligenza artificiale, gestione commerciale, marketing digitale e soluzioni di ottimizzazione dei processi aziendali."),
        paragraph("Le presenti Note legali si applicano a rooklyn.co e, ove pertinente, ai sottodomini, alle pagine dimostrative e alle pagine commerciali gestite da Rooklyn, compresi clima.rooklyn.co e aureaclima.rooklyn.co."),
        paragraph("Áurea Clima è un ambiente dimostrativo di Rooklyn destinato a illustrare funzionalità applicabili alle imprese di climatizzazione, riscaldamento, condizionamento e servizi correlati. Salvo indicazione espressa, non rappresenta un’impresa HVAC indipendente né implica l’effettiva prestazione dei servizi tecnici mostrati nella dimostrazione."),
      ] },
      { title: "3. Condizioni d’uso", blocks: [
        paragraph("L’accesso e l’uso dei siti web di Rooklyn attribuiscono la qualifica di utente e comportano l’impegno a utilizzarli in modo lecito e diligente, nel rispetto della normativa applicabile, delle presenti Note legali e della buona fede."),
        paragraph("Sono vietati, tra gli altri, i seguenti utilizzi:"),
        list("Svolgere attività illecite o contrarie ai diritti di terzi.", "Introdurre virus, codice dannoso o elementi destinati a danneggiare o alterare i sistemi.", "Tentare di accedere senza autorizzazione a sistemi, account, dati o funzionalità.", "Interferire con la disponibilità, la sicurezza o il funzionamento dei siti web.", "Riprodurre, sfruttare o utilizzare contenuti in modo contrario alla legge o ai diritti dei rispettivi titolari."),
      ] },
      { title: "4. Contenuti dimostrativi", blocks: [
        paragraph("Determinate funzionalità, prezzi, imprese, comunicazioni, automazioni, calendari, richieste di servizio, preventivi, risorse, stati delle opportunità o altri elementi mostrati negli ambienti dimostrativi possono essere fittizi o avere finalità esclusivamente dimostrative."),
        paragraph("L’utente non deve inserire in un ambiente dimostrativo dati sensibili, dati riservati di terzi o informazioni non necessarie per svolgere la prova."),
      ] },
      { title: "5. Proprietà intellettuale e industriale", blocks: [
        paragraph("Salvo diversa indicazione, i contenuti, i design, i testi, gli elementi grafici, la struttura, il software, i marchi, i nomi commerciali e gli altri elementi dei siti web appartengono a Rooklyn o sono utilizzati con autorizzazione o in base a una licenza applicabile."),
        paragraph("Non ne è autorizzata la riproduzione, distribuzione, trasformazione, comunicazione al pubblico o sfruttamento commerciale quando tale utilizzo richieda l’autorizzazione del titolare dei diritti, fatti salvi gli usi consentiti dalla legge."),
      ] },
      { title: "6. Disponibilità e responsabilità", blocks: [
        paragraph("Rooklyn cerca di mantenere i propri siti web disponibili, sicuri e aggiornati, ma non garantisce l’assenza assoluta di errori, interruzioni, vulnerabilità o incidenti tecnici."),
        paragraph("I contenuti pubblicati hanno carattere informativo e dimostrativo. Non costituiscono consulenza legale, fiscale, finanziaria o tecnica specialistica e non sostituiscono la valutazione professionale eventualmente necessaria per il singolo caso."),
      ] },
      { title: "7. Collegamenti e servizi di terzi", blocks: [paragraph("I siti web possono includere collegamenti, integrazioni o servizi forniti da terzi. Rooklyn non controlla necessariamente tali servizi e non risponde dei loro contenuti, disponibilità, politiche o pratiche, fatti salvi gli obblighi di legge.")] },
      { title: "8. Protezione dei dati personali", blocks: [paragraph("Il trattamento dei dati personali effettuato attraverso i siti web, i moduli e i canali propri di Rooklyn è descritto nell’Informativa sulla privacy disponibile all’indirizzo https://rooklyn.co/politica-privacidad.")] },
      { title: "9. Cookie", blocks: [paragraph("L’uso di cookie e tecnologie simili è descritto nell’Informativa sui cookie disponibile all’indirizzo https://rooklyn.co/politica-cookies. Quando necessario, i cookie non essenziali saranno installati soltanto dopo che l’utente avrà espresso una scelta valida attraverso il meccanismo di gestione del consenso.")] },
      { title: "10. Comunicazioni e contatti", blocks: [paragraph("Per domande relative al sito web o ai servizi di Rooklyn, è possibile scrivere a geet29.dubey@gmail.com. Questo indirizzo potrà essere sostituito da un indirizzo specifico del dominio rooklyn.co quando sarà disponibile.")] },
      { title: "11. Legge applicabile", blocks: [paragraph("Le presenti Note legali sono disciplinate dalla legge spagnola, fatte salve le norme imperative e gli eventuali diritti spettanti a consumatori o utenti ove applicabili.")] },
      { title: "12. Modifiche", blocks: [paragraph("Rooklyn potrà aggiornare le presenti Note legali per riflettere cambiamenti normativi, tecnici, organizzativi o relativi ai servizi offerti. La data dell’ultimo aggiornamento sarà indicata all’inizio del documento.")] },
    ],
  },
  cookies: {
    title: "Informativa sui cookie",
    updated: "Ultimo aggiornamento: 21 settembre 2026",
    introduction: "La presente Informativa sui cookie spiega cosa sono i cookie e le tecnologie simili, come possono essere utilizzati nei siti web gestiti da Rooklyn, quali terzi possono intervenire e come l’utente può accettare, rifiutare, configurare o revocare le proprie preferenze.",
    sections: [
      { title: "1. Titolare", blocks: [
        table(["Dato", "Informazione"], [["Titolare", "Geetanjali Dubey"], ["Nome commerciale", "Rooklyn"], ["Numero di identificazione fiscale (NIF/NIE/CIF)", "Z0680759Z"], ["Email", "geet29.dubey@gmail.com"], ["Sito web principale", "https://rooklyn.co"]]),
        paragraph("Ove applicabile, la presente Informativa riguarda i seguenti domini e sottodomini gestiti da Rooklyn:"),
        list("https://rooklyn.co", "https://clima.rooklyn.co", "https://aureaclima.rooklyn.co"),
        paragraph("I collegamenti verso siti di terzi sono soggetti alle informative sulla privacy e sui cookie di tali terzi."),
      ] },
      { title: "2. Quadro normativo e ambito di applicazione", blocks: [
        paragraph("L’uso di cookie e tecnologie di archiviazione o accesso alle informazioni presenti sul dispositivo dell’utente è disciplinato, tra le altre norme applicabili, dall’articolo 22.2 della Legge spagnola 34/2002 sui servizi della società dell’informazione e sul commercio elettronico (LSSI). Quando tali tecnologie comportano il trattamento di dati personali, si applicano anche il Regolamento (UE) 2016/679 (GDPR) e la normativa spagnola pertinente in materia di protezione dei dati."),
        paragraph("I cookie strettamente necessari per trasmettere una comunicazione o fornire un servizio espressamente richiesto dall’utente possono essere esenti dall’obbligo di consenso. I cookie non essenziali saranno attivati soltanto in presenza di una valida base giuridica e, ove necessario, dopo che l’utente avrà prestato un consenso valido."),
      ] },
      { title: "3. Cosa sono i cookie e le tecnologie simili?", blocks: [
        paragraph("I cookie sono piccoli file di testo che un sito web può memorizzare nel browser o nel dispositivo dell’utente. Possono essere utilizzate anche tecnologie con funzioni simili, come l’archiviazione locale, i pixel, gli identificatori tecnici o gli script integrati."),
        paragraph("Queste tecnologie possono consentire il funzionamento tecnico del sito, ricordare le preferenze, mantenere la sicurezza, gestire le sessioni, misurare l’uso delle pagine o, ove opportuno e con il consenso, personalizzare contenuti o comunicazioni commerciali."),
      ] },
      { title: "4. Tipi di cookie in base alla finalità", blocks: [
        subheading("Cookie tecnici o strettamente necessari"),
        paragraph("Consentono il funzionamento di base del sito, la navigazione, la sicurezza, il bilanciamento del carico, la prevenzione di frodi o bot, la gestione delle sessioni, la conservazione della scelta sui cookie o l’erogazione di una funzionalità espressamente richiesta dall’utente. Quando sono strettamente necessari, non saranno utilizzati per ulteriori finalità incompatibili."),
        subheading("Cookie di preferenza o funzionali"),
        paragraph("Consentono di ricordare le scelte dell’utente, come la lingua o determinate preferenze dell’interfaccia. Quando la normativa richiede il consenso per una specifica preferenza, la tecnologia corrispondente resterà disattivata fino al suo ottenimento."),
        subheading("Cookie analitici o di prestazione"),
        paragraph("Consentono di misurare in forma aggregata l’uso del sito, individuare errori, conoscere le pagine visitate o migliorare le prestazioni. Quando richiedono il consenso, non saranno installati né attivati prima che l’utente li accetti."),
        subheading("Cookie pubblicitari o di marketing"),
        paragraph("Possono essere utilizzati per misurare campagne, limitare la ripetizione degli annunci, creare segmenti di pubblico o mostrare pubblicità basata sugli interessi. Se utilizzati, sarà richiesto il consenso preventivo eventualmente necessario."),
        subheading("Cookie o tecnologie di servizi integrati"),
        paragraph("Alcune pagine possono includere moduli, calendari, CRM, chat, video, mappe, captcha o altri componenti di terzi. La finalità e il regime di consenso dipenderanno dal componente e dalle tecnologie effettivamente caricate nel browser."),
      ] },
      { title: "5. Cookie propri e di terzi", blocks: [
        paragraph("In base al soggetto che gestisce la tecnologia, i siti possono utilizzare:"),
        list("Cookie propri: gestiti da domini o componenti controllati da Rooklyn.", "Cookie di terzi: gestiti da fornitori tecnologici integrati nel sito quando la relativa funzionalità è attiva."),
        paragraph("La presenza effettiva di uno specifico cookie può variare in base al dominio visitato, alla pagina, al componente caricato, alla configurazione tecnica e alla scelta effettuata dall’utente nel gestore del consenso."),
      ] },
      { title: "6. Inventario dei cookie e dei servizi tecnologici", blocks: [
        paragraph("Alla data della presente Informativa, Rooklyn utilizza o può caricare i seguenti servizi in base alla pagina e alla funzionalità attivata. Le tecnologie non essenziali devono rimanere bloccate finché non sia stato ottenuto il consenso, quando richiesto."),
        table(["Categoria", "Fornitore", "Finalità", "Esempi / tecnologia", "Durata indicativa", "Stato / attivazione"], [
          ["Necessari", "Rooklyn / gestore del consenso", "Funzionamento tecnico, conservazione della scelta sui cookie e, ove opportuno, preferenze indispensabili per fornire la funzionalità richiesta.", "Cookie o archivio del consenso; il nome tecnico dipende dal gestore implementato.", "Per la sessione o per il periodo configurato per conservare la scelta dell’utente.", "Attivi solo nella misura necessaria a far funzionare il sito o ricordare la scelta dell’utente."],
          ["Necessari / sicurezza", "Cloudflare, Inc. (quando richiesto dall’infrastruttura o dalle funzioni di sicurezza)", "Distribuzione sicura del sito, filtraggio del traffico, protezione dai bot, verifiche di sicurezza e/o bilanciamento del carico.", "Cloudflare documenta cookie tecnici come __cf_bm, cf_clearance o _cflb quando le relative funzioni sono attive.", "Generalmente di sessione o di breve durata, secondo la funzione e la configurazione del fornitore.", "Solo quando il relativo servizio o funzione tecnica è attivo."],
          ["Funzionali / CRM / prenotazioni", "HighLevel / LeadConnector (quando vengono caricati moduli, calendari, chat o componenti integrati)", "Elaborare moduli, richieste, prenotazioni, sessioni dei componenti, preferenze e altre funzioni legate al CRM o all’interazione richiesta dall’utente.", "HighLevel utilizza tecnologie di sessione e persistenti; gli identificatori specifici dipendono dal componente caricato.", "Dalla sessione fino a periodi persistenti definiti dal fornitore; HighLevel pubblica durate fino a un anno per determinati cookie.", "Solo nelle pagine in cui viene caricata l’integrazione pertinente. Le tecnologie non essenziali saranno soggette al consenso quando richiesto."],
          ["Preferenze", "Rooklyn e/o il fornitore del componente", "Ricordare la lingua o altre preferenze selezionate dall’utente.", "Cookie o archivio locale di preferenza, se implementato.", "Fino alla scadenza o eliminazione della preferenza, oppure finché l’utente non modifica l’impostazione.", "Solo quando la funzionalità è implementata e in conformità al regime di consenso applicabile."],
          ["Analitici / prestazioni", "Rooklyn e/o un fornitore di analisi attivato in futuro", "Misurare utilizzo e prestazioni e migliorare il sito.", "La presente Informativa non dichiara attivo per impostazione predefinita alcuno strumento analitico specifico basato sui cookie. Se abilitato, sarà identificato nel gestore e nella presente tabella.", "Secondo lo strumento attivato.", "Disattivati fino alla configurazione e, ove necessario, al consenso."],
          ["Marketing / pubblicità", "Rooklyn e/o una piattaforma pubblicitaria attivata in futuro", "Misurazione delle campagne, attribuzione, segmenti di pubblico o pubblicità personalizzata.", "La presente Informativa non dichiara attiva per impostazione predefinita alcuna piattaforma specifica di marketing basata sui cookie. Se abilitata, sarà identificata prima dell’uso.", "Secondo la piattaforma attivata.", "Disattivati fino alla configurazione e al consenso preventivo quando richiesto."],
        ]),
        paragraph("Importante: l’inventario tecnico esatto, comprendente nome del cookie o identificatore, fornitore, finalità e scadenza, deve corrispondere alla configurazione distribuita in ciascun dominio. Quando il gestore del consenso mostra un inventario dinamico, tale pannello deve essere mantenuto aggiornato e accessibile da “Preferenze cookie”. Se viene introdotto un nuovo strumento di analisi, pubblicità, video, chat, calendario, captcha o altro servizio di terzi, questa sezione deve essere riesaminata prima dell’attivazione."),
      ] },
      { title: "7. Consenso e configurazione", blocks: [
        paragraph("Quando vengono utilizzati cookie o tecnologie che richiedono il consenso, il primo livello o banner offrirà all’utente meccanismi chiari per:"),
        list("Accettare i cookie non essenziali.", "Rifiutare i cookie non essenziali.", "Configurare i cookie per finalità e salvare la scelta."),
        paragraph("Le opzioni di accettazione e rifiuto devono essere offerte contemporaneamente e con visibilità equivalente. Non saranno utilizzate caselle preselezionate e la semplice prosecuzione della navigazione non sarà considerata consenso. I cookie non essenziali che richiedono il consenso resteranno bloccati finché l’utente non effettuerà una scelta valida."),
      ] },
      { title: "8. Revoca o modifica del consenso", blocks: [
        paragraph("L’utente può modificare o revocare le proprie preferenze in qualsiasi momento mediante il collegamento o pulsante “Preferenze cookie”, disponibile in modo permanente nel piè di pagina o nel sistema di gestione del consenso del sito."),
        paragraph("La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca. Quando l’utente rifiuta una categoria, le tecnologie di tale categoria non saranno più caricate nelle visite successive, ad eccezione di quelle strettamente necessarie o da conservare per obbligo di legge."),
      ] },
      { title: "9. Gestione dal browser", blocks: [
        paragraph("Oltre al gestore del consenso del sito, l’utente può consentire, bloccare, eliminare o limitare i cookie dalle impostazioni del browser. Il blocco di determinati cookie tecnici può impedire il corretto funzionamento di alcune funzionalità richieste."),
        paragraph("I principali browser, tra cui Chrome, Edge, Firefox e Safari, includono opzioni specifiche per privacy e cookie nei menu delle impostazioni. La procedura può variare in base alla versione e al dispositivo."),
      ] },
      { title: "10. Servizi di terzi", blocks: [
        paragraph("Rooklyn può integrare servizi di terzi per hosting e sicurezza, CRM, moduli, calendari, prenotazioni, messaggistica, chat, video, mappe, analisi o marketing. Quando uno di tali servizi installa cookie o utilizza tecnologie di tracciamento non essenziali, si applicherà il relativo regime di consenso."),
        list("Cloudflare: può intervenire nella distribuzione del sito, nella sicurezza e nella protezione del traffico. Cloudflare classifica determinati cookie di sicurezza come strettamente necessari quando vengono attivate le relative funzioni.", "HighLevel / LeadConnector: può intervenire in moduli, CRM, calendari, chat, prenotazioni o altri componenti integrati. HighLevel pubblica una propria Informativa sui cookie e documentazione sulla privacy per i suoi servizi."),
        paragraph("L’inclusione di un fornitore nella presente Informativa non significa che tutti i suoi cookie siano utilizzati in ogni pagina. Saranno caricate soltanto le tecnologie associate ai componenti effettivamente integrati e attivi."),
      ] },
      { title: "11. Trasferimenti internazionali", blocks: [
        paragraph("Alcuni fornitori tecnologici possono trattare dati al di fuori dello Spazio economico europeo. In caso di trasferimento internazionale di dati personali, Rooklyn cercherà di utilizzare un meccanismo riconosciuto dalla normativa applicabile, come una decisione di adeguatezza, il Quadro UE-USA per la protezione dei dati quando il fornitore è certificato e il trasferimento è coperto, o le clausole contrattuali standard, secondo il caso."),
        paragraph("HighLevel dichiara pubblicamente che HighLevel e LeadConnector aderiscono al Quadro UE-USA per la protezione dei dati. Per individuare il meccanismo specifico applicabile a un determinato trattamento, è possibile consultare la documentazione sulla privacy del fornitore e l’Informativa sulla privacy di Rooklyn."),
      ] },
      { title: "12. Conservazione", blocks: [paragraph("I cookie di sessione vengono normalmente eliminati alla chiusura del browser. I cookie persistenti restano per il periodo configurato o finché l’utente non li elimina. Rooklyn applicherà periodi proporzionati alla finalità e riesaminerà periodicamente le tecnologie attive per evitare una conservazione non necessaria.")] },
      { title: "13. Aggiornamento della presente Informativa", blocks: [paragraph("La presente Informativa potrà essere aggiornata quando cambiano i cookie utilizzati, i fornitori tecnologici, i domini gestiti da Rooklyn o gli obblighi legali applicabili. La data dell’ultimo aggiornamento sarà indicata all’inizio del documento. Consigliamo di consultare periodicamente questa pagina.")] },
      { title: "14. Contatti", blocks: [paragraph("Per domande relative alla presente Informativa sui cookie o alle impostazioni di privacy del sito, è possibile contattare Rooklyn all’indirizzo: geet29.dubey@gmail.com.")] },
      { title: "Appendice: testo consigliato per il banner dei cookie", blocks: [
        quote("Utilizziamo cookie tecnici necessari per il funzionamento del sito. Con il tuo consenso, potremo utilizzare anche cookie di preferenza, analitici o di terzi integrati per migliorare l’esperienza e misurare l’uso del sito. Puoi accettare, rifiutare o configurare le tue preferenze. Maggiori informazioni nella nostra Informativa sui cookie."),
        paragraph("Pulsanti consigliati, mostrati con lo stesso rilievo visivo:"),
        list("RIFIUTA", "CONFIGURA", "ACCETTA"),
      ] },
    ],
  },
  privacy: {
    title: "Informativa sulla privacy",
    updated: "Ultimo aggiornamento: 21 settembre 2026",
    introduction: "Rooklyn si impegna a trattare i dati personali in modo lecito, corretto, trasparente e limitato alle finalità per le quali sono necessari. La presente Informativa spiega come trattiamo i dati personali di chi interagisce con i nostri siti web, moduli, pagine dimostrative e canali propri.",
    sections: [
      { title: "1. Titolare del trattamento", blocks: [
        table(["Dato", "Informazione"], [["Titolare", "Geetanjali Dubey"], ["Nome commerciale", "Rooklyn"], ["Numero di identificazione fiscale (NIF/NIE)", "Z0680759X"], ["Sede professionale", "Calle Transversal Sexta 24, 28021 Madrid, Spagna"], ["Email", "geet29.dubey@gmail.com"], ["Sito web", "https://rooklyn.co"]]),
        paragraph("Rooklyn agisce come titolare del trattamento per i dati raccolti per le proprie finalità commerciali, di contatto, contrattuali e di gestione dei servizi. Quando Rooklyn tratta dati per conto di un cliente e secondo le sue istruzioni, può agire come responsabile del trattamento; tale rapporto deve essere disciplinato contrattualmente ove opportuno."),
      ] },
      { title: "2. Ambito di applicazione", blocks: [
        paragraph("La presente Informativa si applica, tra l’altro, a:"),
        list("https://rooklyn.co", "https://clima.rooklyn.co", "https://aureaclima.rooklyn.co", "Moduli, pagine di prenotazione, dimostrazioni e altri canali propri collegati a tali siti."),
        paragraph("Áurea Clima è un ambiente dimostrativo di Rooklyn e non costituisce necessariamente un’impresa HVAC indipendente."),
      ] },
      { title: "3. Dati che possiamo trattare", blocks: [
        subheading("3.1 Dati identificativi e di contatto"),
        list("Nome e cognome.", "Azienda e posizione o ruolo professionale.", "Indirizzo email.", "Numero di telefono."),
        subheading("3.2 Dati relativi a richieste e rapporti commerciali"),
        list("Tipo di impresa e servizi di interesse.", "Informazioni fornite volontariamente nei moduli o nelle comunicazioni.", "Data e ora di riunioni, dimostrazioni o prenotazioni.", "Messaggi e cronologia delle comunicazioni relative alla richiesta.", "Dati necessari per proposte, preventivi, contratti, fatturazione e assistenza quando esiste un rapporto contrattuale."),
        subheading("3.3 Dati tecnici e di navigazione"),
        list("Indirizzo IP e dati di connessione.", "Tipo di browser, dispositivo e sistema operativo.", "Data e ora di accesso.", "Informazioni sull’uso e sulla navigazione ove pertinenti."),
        paragraph("Quando tali dati sono raccolti tramite cookie o tecnologie non essenziali, sarà richiesto il consenso ove necessario."),
      ] },
      { title: "4. Finalità e basi giuridiche", blocks: [
        table(["Finalità", "Dati / attività", "Base giuridica principale"], [
          ["Rispondere a domande e richieste", "Rispondere a moduli, email e richieste di informazioni", "Misure precontrattuali richieste dall’interessato e, ove opportuno, legittimo interesse a rispondere alle comunicazioni professionali."],
          ["Gestire dimostrazioni e riunioni", "Organizzazione di chiamate, demo e appuntamenti richiesti", "Misure precontrattuali richieste dall’interessato."],
          ["Gestione commerciale e CRM", "Registrazione di contatti, opportunità e cronologia dei follow-up", "Misure precontrattuali; legittimo interesse alla gestione dei rapporti professionali ove applicabile."],
          ["Prestazione di servizi", "Gestione contrattuale, assistenza, fatturazione e amministrazione", "Esecuzione di un contratto e adempimento di obblighi legali."],
          ["Comunicazioni commerciali", "Informazioni su servizi, soluzioni e novità", "Consenso ove necessario o base giuridica applicabile ai rapporti precedenti secondo la normativa."],
          ["Sicurezza e funzionamento", "Prevenzione delle frodi, sicurezza, manutenzione e diagnostica tecnica", "Legittimo interesse a mantenere la sicurezza e il funzionamento dei sistemi; adempimento normativo ove pertinente."],
        ]),
        paragraph("Quando un trattamento si basa sul consenso, l’interessato può revocarlo in qualsiasi momento senza pregiudicare la liceità del trattamento effettuato prima della revoca."),
      ] },
      { title: "5. Moduli e dati obbligatori", blocks: [
        paragraph("I campi contrassegnati come obbligatori sono necessari per gestire la relativa richiesta. Se non vengono compilati, potrebbe non essere possibile rispondere alla richiesta o fornire la funzionalità desiderata."),
        paragraph("Le informazioni sulla protezione dei dati mostrate accanto ai moduli integrano la presente Informativa. Quando viene richiesto il consenso per una finalità facoltativa, come determinate comunicazioni commerciali, esso sarà presentato separatamente e non sarà preselezionato."),
      ] },
      { title: "6. Conservazione dei dati", blocks: [
        paragraph("I dati saranno conservati per il tempo necessario a realizzare la finalità per cui sono stati raccolti e successivamente per i periodi durante i quali possono sorgere responsabilità legali."),
        list("Richieste e opportunità commerciali: finché esiste un’interazione o una ragionevole possibilità di rapporto commerciale e, successivamente, per il periodo necessario a gestire eventuali responsabilità o richieste.", "Clienti: per la durata del rapporto contrattuale e successivamente per i periodi previsti dalla legge.", "Comunicazioni commerciali basate sul consenso: fino alla revoca del consenso o all’esercizio del diritto di opposizione, ferma restando la conservazione delle prove necessarie a dimostrare la preferenza o il consenso."),
      ] },
      { title: "7. Destinatari e fornitori tecnologici", blocks: [
        paragraph("Rooklyn può ricorrere a fornitori che trattano dati per erogare servizi tecnologici necessari alla propria attività. In base alla configurazione effettiva di ciascun sito o servizio, possono comprendere:"),
        list("Fornitori di hosting web, DNS, sicurezza e distribuzione dei contenuti, compreso Cloudflare quando attivo.", "GoHighLevel / HighLevel per CRM, moduli, automazioni, opportunità e comunicazioni.", "Fornitori di posta elettronica e calendario.", "Fornitori di messaggistica, compreso WhatsApp/Meta quando viene utilizzato tale canale.", "Fornitori di infrastruttura, automazione o intelligenza artificiale necessari per offrire funzionalità specifiche e correttamente configurate."),
        paragraph("Rooklyn non vende dati personali. Quando un fornitore agisce come responsabile del trattamento, il rapporto sarà disciplinato conformemente ai requisiti applicabili. I dati potranno inoltre essere comunicati in presenza di un obbligo di legge."),
      ] },
      { title: "8. Trasferimenti internazionali", blocks: [paragraph("Alcuni fornitori tecnologici possono avere sede o trattare dati al di fuori dello Spazio economico europeo. Quando un trasferimento internazionale è soggetto al GDPR, sarà utilizzato un meccanismo valido, come una decisione di adeguatezza, le clausole contrattuali standard o un’altra garanzia riconosciuta dalla normativa applicabile. È possibile richiedere ulteriori informazioni sulle garanzie applicabili scrivendo all’indirizzo email indicato nella presente Informativa.")] },
      { title: "9. GoHighLevel e moduli", blocks: [paragraph("Determinati moduli e processi di Rooklyn possono integrarsi con GoHighLevel / HighLevel. Le informazioni fornite possono essere inserite nel CRM per gestire le richieste, contattare l’interessato, programmare dimostrazioni o riunioni, gestire i follow-up e mantenere la cronologia delle comunicazioni relative alla richiesta.")] },
      { title: "10. Áurea Clima e ambienti dimostrativi", blocks: [
        paragraph("Áurea Clima è un ambiente dimostrativo commerciale utilizzato per mostrare esempi di automazione e gestione applicabili al settore della climatizzazione e HVAC. I dati inseriti nei moduli attivi della dimostrazione saranno trattati ai sensi della presente Informativa quando Rooklyn li riceve per le proprie finalità."),
        paragraph("Non devono essere inseriti dati appartenenti a categorie particolari o altamente sensibili, dati sanitari, informazioni riservate di terzi o dati reali di clienti non necessari per la dimostrazione."),
      ] },
      { title: "11. Decisioni automatizzate e profilazione", blocks: [paragraph("Rooklyn può utilizzare automazioni per classificare le richieste, creare attività, assegnare stati o agevolare i follow-up interni. Salvo diversa comunicazione espressa, tali automazioni non sono utilizzate per adottare decisioni basate unicamente su trattamenti automatizzati che producano effetti giuridici sull’interessato o incidano in modo analogo significativamente sulla sua persona.")] },
      { title: "12. Diritti degli interessati", blocks: [
        paragraph("Ove applicabili, è possibile esercitare i diritti di accesso, rettifica, cancellazione, opposizione, limitazione del trattamento e portabilità, nonché revocare il consenso quando il trattamento si basa su di esso."),
        paragraph("Per esercitare i propri diritti, è possibile scrivere a geet29.dubey@gmail.com indicando nell’oggetto “Protezione dei dati” e fornendo le informazioni necessarie a identificare la richiesta. Potremo richiedere ulteriori informazioni quando ragionevolmente necessarie per verificare l’identità del richiedente."),
      ] },
      { title: "13. Reclamo all’autorità di controllo", blocks: [paragraph("Se si ritiene che il trattamento dei dati personali violi la normativa, è possibile presentare un reclamo all’Agenzia spagnola per la protezione dei dati (AEPD), le cui informazioni e procedure sono disponibili all’indirizzo https://www.aepd.es.")] },
      { title: "14. Sicurezza", blocks: [paragraph("Rooklyn adotterà misure tecniche e organizzative adeguate tenendo conto della natura, dell’ambito, del contesto e delle finalità del trattamento e del livello di rischio. Nessun sistema connesso a Internet può garantire una sicurezza assoluta.")] },
      { title: "15. Dati di terzi", blocks: [paragraph("Chi fornisce dati di terzi deve disporre di una base giuridica per farlo e comunicare esclusivamente le informazioni necessarie alla relativa finalità.")] },
      { title: "16. Minori", blocks: [paragraph("I servizi di Rooklyn sono destinati principalmente a imprese e professionisti. Non si intende raccogliere intenzionalmente dati di minori attraverso moduli commerciali o dimostrazioni.")] },
      { title: "17. Collegamenti esterni", blocks: [paragraph("I siti web possono contenere collegamenti a pagine o servizi di terzi. Le loro pratiche in materia di privacy sono disciplinate dalle rispettive informative e condizioni.")] },
      { title: "18. Cookie", blocks: [paragraph("Le informazioni sui cookie e sulle tecnologie simili sono disponibili nell’Informativa sui cookie all’indirizzo https://rooklyn.co/politica-cookies.")] },
      { title: "19. Modifiche alla presente Informativa", blocks: [paragraph("Rooklyn potrà aggiornare la presente Informativa quando cambiano i trattamenti, i fornitori, i servizi o i requisiti normativi. La data dell’ultimo aggiornamento sarà indicata all’inizio del documento.")] },
    ],
  },
};

export const legalDocuments: Record<Locale, Record<Policy, LegalDocument>> = { es, en, it };
