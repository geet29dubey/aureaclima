import type { Locale } from "./dictionaries";

const es = {
  all: "Todos los servicios", repair: "Reparación", installation: "Instalación",
  switchLabel: "Selecciona el tipo de solicitud", loading: "Cargando formulario…",
  external: "Abrir el formulario en otra pestaña", formHelp: "Si el formulario no se muestra, puedes abrirlo directamente.",
  privacy: "El formulario está gestionado por GoHighLevel. Revisa su información de privacidad antes de enviar tus datos.",
  formLabel: "Formulario de solicitud", demo: "Estás explorando una demostración. No se reserva un servicio real de climatización.",
  repairPanel: {
    eyebrow: "TU CONFORT, PASO A PASO", title: "Solicita una reparación.",
    description: "Cuéntanos qué ocurre con tu sistema de climatización. Empieza por los detalles del equipo y continúa con tu solicitud.",
    features: ["Solicitud online", "Información organizada", "Un recorrido claro"],
    formTitle: "Cuéntanos qué ocurre", formDescription: "Completa el formulario para explorar el proceso de solicitud de reparación.",
    asideEyebrow: "CADA DETALLE CUENTA", asideTitle: "Una solicitud clara, desde el principio.",
    benefits: [
      { title: "Tu equipo, en contexto", text: "Indica el tipo de sistema y el problema que has detectado." },
      { title: "Una solicitud sencilla", text: "Comparte la información esencial en un solo formulario." },
      { title: "Reparación o sustitución", text: "Si estás pensando en un equipo nuevo, cambia al recorrido de instalación." },
      { title: "El siguiente paso", text: "Sigue las indicaciones del formulario para continuar con la demo." },
    ],
    imageCaption: "El primer paso hacia el confort de tu hogar.",
  },
  installationPanel: {
    eyebrow: "UN NUEVO COMIENZO EN CASA", title: "Planifica tu nueva instalación.",
    description: "Cuéntanos qué necesitas y comparte algunos detalles de tu vivienda. Cada espacio tiene su propio punto de partida.",
    features: ["Tu proyecto, a tu medida", "Datos del inmueble", "Próximos pasos claros"],
    formTitle: "Cuéntanos tu proyecto de instalación", formDescription: "Completa el formulario para explorar el proceso de una nueva instalación.",
    asideEyebrow: "TU PROYECTO, BIEN ORGANIZADO", asideTitle: "De la idea al siguiente paso.",
    benefits: [
      { title: "Tus necesidades primero", text: "Describe el sistema que te gustaría instalar y qué esperas de él." },
      { title: "Pensado para tu hogar", text: "Comparte el tipo de vivienda, su superficie y el número de estancias." },
      { title: "Opciones de instalación", text: "Indica tu equipo actual y el plazo que tienes en mente." },
      { title: "Un proyecto bien definido", text: "Reúne los detalles esenciales para continuar el recorrido de la demo." },
    ],
    imageCaption: "Nuevas posibilidades para sentirte a gusto en casa.",
  },
};
export type ServiceDictionary = typeof es;
const en: ServiceDictionary = {
  all: "All services", repair: "Repair", installation: "Installation", switchLabel: "Choose your request type",
  loading: "Loading form…", external: "Open the form in a new tab", formHelp: "If the form does not appear, you can open it directly.",
  privacy: "This form is managed by GoHighLevel. Review its privacy information before submitting your details.",
  formLabel: "Request form", demo: "You are exploring a demonstration. No real HVAC service is booked.",
  repairPanel: {
    eyebrow: "YOUR COMFORT, STEP BY STEP", title: "Request a repair.",
    description: "Tell us what is happening with your climate-control system. Start with your equipment details and continue with your request.",
    features: ["Online request", "Organised information", "A clear journey"],
    formTitle: "Tell us what’s happening", formDescription: "Complete the form to explore the repair request journey.",
    asideEyebrow: "EVERY DETAIL MATTERS", asideTitle: "A clear request, from the start.",
    benefits: [
      { title: "Your equipment in context", text: "Tell us the type of system and the issue you have noticed." },
      { title: "A simple request", text: "Share the essential information in one form." },
      { title: "Repair or replacement", text: "Thinking about new equipment? Switch to the installation journey." },
      { title: "The next step", text: "Follow the form’s instructions to continue exploring the demo." },
    ],
    imageCaption: "The first step towards comfort at home.",
  },
  installationPanel: {
    eyebrow: "A FRESH START AT HOME", title: "Plan your new installation.",
    description: "Tell us what you need and share a few details about your home. Every space has its own starting point.",
    features: ["Your own project", "Property details", "Clear next steps"],
    formTitle: "Tell us about your installation project", formDescription: "Complete the form to explore the new installation journey.",
    asideEyebrow: "YOUR PROJECT, WELL ORGANISED", asideTitle: "From your idea to the next step.",
    benefits: [
      { title: "Your needs come first", text: "Describe the system you would like to install and what you want from it." },
      { title: "Designed around your home", text: "Share the property type, floor area and number of rooms." },
      { title: "Installation options", text: "Tell us about your current equipment and the timing you have in mind." },
      { title: "A well-defined project", text: "Bring together the essentials to continue the demo journey." },
    ],
    imageCaption: "New possibilities for feeling at home.",
  },
};
const it: ServiceDictionary = {
  all: "Tutti i servizi", repair: "Riparazione", installation: "Installazione", switchLabel: "Scegli il tipo di richiesta",
  loading: "Caricamento del modulo…", external: "Apri il modulo in una nuova scheda", formHelp: "Se il modulo non viene visualizzato, puoi aprirlo direttamente.",
  privacy: "Il modulo è gestito da GoHighLevel. Leggi le informazioni sulla privacy prima di inviare i tuoi dati.",
  formLabel: "Modulo di richiesta", demo: "Stai esplorando una dimostrazione. Non viene prenotato un vero servizio di climatizzazione.",
  repairPanel: {
    eyebrow: "IL TUO COMFORT, PASSO DOPO PASSO", title: "Richiedi una riparazione.",
    description: "Raccontaci cosa succede al tuo impianto di climatizzazione. Parti dai dettagli dell’impianto e prosegui con la richiesta.",
    features: ["Richiesta online", "Informazioni organizzate", "Un percorso chiaro"],
    formTitle: "Raccontaci cosa succede", formDescription: "Compila il modulo per esplorare il percorso di richiesta di riparazione.",
    asideEyebrow: "OGNI DETTAGLIO CONTA", asideTitle: "Una richiesta chiara, fin dall’inizio.",
    benefits: [
      { title: "Il tuo impianto, nel dettaglio", text: "Indica il tipo di impianto e il problema che hai notato." },
      { title: "Una richiesta semplice", text: "Condividi le informazioni essenziali in un solo modulo." },
      { title: "Riparazione o sostituzione", text: "Stai pensando a un impianto nuovo? Passa al percorso di installazione." },
      { title: "Il prossimo passo", text: "Segui le indicazioni del modulo per continuare a esplorare la demo." },
    ],
    imageCaption: "Il primo passo verso il comfort della tua casa.",
  },
  installationPanel: {
    eyebrow: "UN NUOVO INIZIO A CASA", title: "Progetta la tua nuova installazione.",
    description: "Dicci di cosa hai bisogno e condividi qualche dettaglio della tua casa. Ogni spazio ha il proprio punto di partenza.",
    features: ["Il tuo progetto su misura", "Dettagli dell’immobile", "Prossimi passi chiari"],
    formTitle: "Raccontaci il tuo progetto di installazione", formDescription: "Compila il modulo per esplorare il percorso di una nuova installazione.",
    asideEyebrow: "IL TUO PROGETTO, BEN ORGANIZZATO", asideTitle: "Dall’idea al prossimo passo.",
    benefits: [
      { title: "Prima le tue esigenze", text: "Descrivi l’impianto che vorresti installare e cosa ti aspetti." },
      { title: "Pensato per la tua casa", text: "Indica il tipo di abitazione, la superficie e il numero di stanze." },
      { title: "Opzioni di installazione", text: "Raccontaci dell’impianto attuale e dei tempi che hai in mente." },
      { title: "Un progetto ben definito", text: "Raccogli i dettagli essenziali per proseguire nel percorso della demo." },
    ],
    imageCaption: "Nuove possibilità per sentirti bene a casa.",
  },
};
export const serviceDictionaries: Record<Locale, ServiceDictionary> = { es, en, it };
