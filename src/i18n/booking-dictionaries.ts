import type { Locale } from "./dictionaries";
import type { ServiceType } from "../config/ghl-forms";

type Item = { title: string; text: string };
type BookingContent = {
  eyebrow: string; title: string; introduction: string; benefits: Item[]; steps: Item[];
  reviewTitle: string; reviews: Item[];
  reassurance: { eyebrow: string; title: string; benefits: Item[] };
  iframeTitle: string;
};
export type BookingDictionary = {
  back: string; choose: string; processLabel: string; calendarEyebrow: string;
  calendarTitle: string; calendarText: string; loading: string;
  fallback: string; external: string; imageAlt: string;
  services: Record<ServiceType, BookingContent>;
};

const es: BookingDictionary = {
  back: "Volver a los servicios", choose: "Elegir fecha y hora", processLabel: "Cómo reservar tu visita",
  calendarEyebrow: "ENCUENTRA TU MOMENTO", calendarTitle: "Elige el día que mejor te venga",
  calendarText: "Consulta la disponibilidad y sigue los pasos del calendario para confirmar tu visita.",
  loading: "Cargando calendario…", fallback: "Si el calendario no se muestra, puedes abrirlo directamente.",
  external: "Abrir el calendario en otra pestaña",
  imageAlt: "Salón luminoso con un equipo de aire acondicionado de pared y un sofá junto a la ventana.",
  services: {
    repair: {
      eyebrow: "TU CONFORT VUELVE A EMPEZAR AQUÍ", title: "Reserva tu reparación",
      introduction: "Elige cuándo podemos revisar tu equipo. Nuestro técnico diagnosticará la avería y te explicará la mejor solución.",
      benefits: [
        { title: "Diagnóstico profesional", text: "Identificamos el origen del problema." },
        { title: "En tu hogar o negocio", text: "Nos desplazamos hasta ti." },
        { title: "Información clara", text: "Te explicamos las opciones antes de actuar." },
      ],
      steps: [
        { title: "Selecciona una fecha", text: "Elige el día que mejor te convenga" },
        { title: "Elige una hora", text: "Selecciona una franja disponible" },
        { title: "Cuéntanos qué ocurre", text: "Añade los datos de tu equipo" },
        { title: "Confirma tu visita", text: "Revisa y reserva" },
      ],
      reviewTitle: "¿Qué revisaremos durante la visita?",
      reviews: [
        { title: "Estado del equipo", text: "Revisaremos el funcionamiento general y los síntomas indicados." },
        { title: "Diagnóstico de la avería", text: "Identificaremos el origen probable del problema." },
        { title: "Seguridad y rendimiento", text: "Comprobaremos los elementos relevantes del sistema." },
        { title: "Opciones de reparación", text: "Te explicaremos las alternativas y los siguientes pasos." },
      ],
      reassurance: {
        eyebrow: "TU TRANQUILIDAD, NUESTRO COMPROMISO",
        title: "Más que una reparación, una solución para recuperar tu confort",
        benefits: [
          { title: "Diagnóstico profesional", text: "Analizamos la avería antes de recomendar una solución." },
          { title: "Información transparente", text: "Te explicamos claramente las opciones disponibles." },
          { title: "Próximos pasos claros", text: "Sabrás qué ocurre después de la visita." },
        ],
      },
      iframeTitle: "Reservar una cita de reparación de climatización",
    },
    installation: {
      eyebrow: "TU PROYECTO EMPIEZA AQUÍ", title: "Reserva una visita técnica",
      introduction: "Elige cuándo podemos visitar tu vivienda o negocio. Analizaremos tus necesidades de climatización y te ayudaremos a encontrar la solución más adecuada.",
      benefits: [
        { title: "Asesoramiento personalizado", text: "Una solución adaptada a tu espacio." },
        { title: "En tu hogar o negocio", text: "Evaluamos el espacio directamente." },
        { title: "Sin compromiso", text: "Te explicamos las opciones disponibles." },
      ],
      steps: [
        { title: "Selecciona una fecha", text: "Elige el día que mejor te convenga" },
        { title: "Elige una hora", text: "Selecciona una franja disponible" },
        { title: "Cuéntanos sobre tu proyecto", text: "Añade algunos datos del inmueble" },
        { title: "Confirma tu visita", text: "Revisa y reserva" },
      ],
      reviewTitle: "¿Qué revisaremos durante la visita?",
      reviews: [
        { title: "Características del inmueble", text: "Revisaremos el espacio, la distribución y las posibilidades de instalación." },
        { title: "Sistema actual", text: "Evaluaremos tu equipo actual, si lo hay, y su estado." },
        { title: "Necesidades de climatización", text: "Analizaremos el uso del espacio, el confort esperado y la eficiencia." },
        { title: "Opciones de instalación", text: "Te explicaremos qué sistemas pueden adaptarse mejor a tus necesidades." },
      ],
      reassurance: {
        eyebrow: "TU TRANQUILIDAD, NUESTRO COMPROMISO", title: "Un proyecto bien pensado, un hogar más confortable",
        benefits: [
          { title: "Asesoramiento personalizado", text: "Partimos de tu espacio y de lo que necesitas." },
          { title: "Opciones claras", text: "Te ayudamos a entender las alternativas de climatización." },
          { title: "Tú decides", text: "Conoce los siguientes pasos antes de avanzar con tu proyecto." },
        ],
      },
      iframeTitle: "Reservar una visita técnica de climatización",
    },
  },
};

const en: BookingDictionary = {
  back: "Back to services", choose: "Choose date & time", processLabel: "How to book your visit",
  calendarEyebrow: "MAKE TIME FOR COMFORT", calendarTitle: "Find a time that works for you",
  calendarText: "Check availability and follow the calendar steps to confirm your visit.",
  loading: "Loading calendar…", fallback: "If the calendar does not appear, you can open it directly.",
  external: "Open the calendar in a new tab",
  imageAlt: "A bright living room with a wall-mounted air conditioner and a sofa beside the window.",
  services: {
    repair: {
      eyebrow: "YOUR COMFORT STARTS AGAIN HERE", title: "Book your repair",
      introduction: "Choose when we can inspect your system. Our technician will diagnose the fault and explain the best solution.",
      benefits: [
        { title: "Professional diagnosis", text: "We identify the source of the problem." },
        { title: "At your home or business", text: "We come to you." },
        { title: "Clear information", text: "We explain your options before taking action." },
      ],
      steps: [
        { title: "Select a date", text: "Choose the day that suits you best" },
        { title: "Choose a time", text: "Select an available time slot" },
        { title: "Tell us what’s happening", text: "Add your equipment details" },
        { title: "Confirm your visit", text: "Review and book" },
      ],
      reviewTitle: "What will we check during the visit?",
      reviews: [
        { title: "Equipment condition", text: "We’ll review overall operation and the symptoms you’ve described." },
        { title: "Fault diagnosis", text: "We’ll identify the likely source of the problem." },
        { title: "Safety and performance", text: "We’ll check the relevant parts of your system." },
        { title: "Repair options", text: "We’ll explain the alternatives and the next steps." },
      ],
      reassurance: {
        eyebrow: "YOUR PEACE OF MIND, OUR COMMITMENT", title: "More than a repair. A way back to comfort.",
        benefits: [
          { title: "Professional diagnosis", text: "We assess the fault before recommending a solution." },
          { title: "Transparent information", text: "We explain the available options clearly." },
          { title: "Clear next steps", text: "You’ll know what happens after the visit." },
        ],
      },
      iframeTitle: "Book a climate-control repair appointment",
    },
    installation: {
      eyebrow: "YOUR PROJECT STARTS HERE", title: "Book a technical visit",
      introduction: "Choose when we can visit your home or business. We’ll assess your climate-control needs and help you find the most suitable solution.",
      benefits: [
        { title: "Personalised advice", text: "A solution suited to your space." },
        { title: "At your home or business", text: "We assess the space in person." },
        { title: "No obligation", text: "We explain the available options." },
      ],
      steps: [
        { title: "Select a date", text: "Choose the day that suits you best" },
        { title: "Choose a time", text: "Select an available time slot" },
        { title: "Tell us about your project", text: "Add a few details about the property" },
        { title: "Confirm your visit", text: "Review and book" },
      ],
      reviewTitle: "What will we check during the visit?",
      reviews: [
        { title: "Your property", text: "We’ll review the space, layout and installation possibilities." },
        { title: "Your current system", text: "We’ll assess your existing equipment, if any, and its condition." },
        { title: "Climate-control needs", text: "We’ll consider how you use the space, your comfort expectations and efficiency." },
        { title: "Installation options", text: "We’ll explain which systems could best suit your needs." },
      ],
      reassurance: {
        eyebrow: "YOUR PEACE OF MIND, OUR COMMITMENT", title: "A considered plan for a more comfortable home",
        benefits: [
          { title: "Personalised advice", text: "We start with your space and what you need." },
          { title: "Clear options", text: "We help you understand the climate-control alternatives." },
          { title: "You decide", text: "Understand the next steps before moving your project forward." },
        ],
      },
      iframeTitle: "Book a climate-control technical visit",
    },
  },
};

const it: BookingDictionary = {
  back: "Torna ai servizi", choose: "Scegli data e ora", processLabel: "Come prenotare la visita",
  calendarEyebrow: "TROVA IL TUO MOMENTO", calendarTitle: "Scegli il momento più comodo per te",
  calendarText: "Consulta le disponibilità e segui i passaggi del calendario per confermare la visita.",
  loading: "Caricamento del calendario…", fallback: "Se il calendario non appare, puoi aprirlo direttamente.",
  external: "Apri il calendario in una nuova scheda",
  imageAlt: "Soggiorno luminoso con un climatizzatore a parete e un divano accanto alla finestra.",
  services: {
    repair: {
      eyebrow: "IL TUO COMFORT RIPARTE DA QUI", title: "Prenota la tua riparazione",
      introduction: "Scegli quando possiamo controllare il tuo impianto. Il nostro tecnico diagnosticherà il guasto e ti spiegherà la soluzione migliore.",
      benefits: [
        { title: "Diagnosi professionale", text: "Individuiamo l’origine del problema." },
        { title: "A casa o nella tua attività", text: "Veniamo direttamente da te." },
        { title: "Informazioni chiare", text: "Ti spieghiamo le opzioni prima di intervenire." },
      ],
      steps: [
        { title: "Seleziona una data", text: "Scegli il giorno più comodo per te" },
        { title: "Scegli un orario", text: "Seleziona una fascia disponibile" },
        { title: "Raccontaci cosa succede", text: "Aggiungi i dettagli del tuo impianto" },
        { title: "Conferma la visita", text: "Controlla e prenota" },
      ],
      reviewTitle: "Cosa controlleremo durante la visita?",
      reviews: [
        { title: "Stato dell’impianto", text: "Controlleremo il funzionamento generale e i sintomi segnalati." },
        { title: "Diagnosi del guasto", text: "Individueremo la probabile origine del problema." },
        { title: "Sicurezza e prestazioni", text: "Controlleremo gli elementi rilevanti del sistema." },
        { title: "Opzioni di riparazione", text: "Ti spiegheremo le alternative e i passi successivi." },
      ],
      reassurance: {
        eyebrow: "LA TUA TRANQUILLITÀ, IL NOSTRO IMPEGNO", title: "Più di una riparazione, una soluzione per ritrovare il comfort",
        benefits: [
          { title: "Diagnosi professionale", text: "Analizziamo il guasto prima di consigliare una soluzione." },
          { title: "Informazioni trasparenti", text: "Ti spieghiamo con chiarezza le opzioni disponibili." },
          { title: "Prossimi passi chiari", text: "Saprai cosa succederà dopo la visita." },
        ],
      },
      iframeTitle: "Prenota un appuntamento per la riparazione dell’impianto di climatizzazione",
    },
    installation: {
      eyebrow: "IL TUO PROGETTO INIZIA QUI", title: "Prenota una visita tecnica",
      introduction: "Scegli quando possiamo visitare la tua abitazione o attività. Analizzeremo le tue esigenze di climatizzazione e ti aiuteremo a trovare la soluzione più adatta.",
      benefits: [
        { title: "Consulenza personalizzata", text: "Una soluzione adatta al tuo spazio." },
        { title: "A casa o nella tua attività", text: "Valutiamo lo spazio di persona." },
        { title: "Senza impegno", text: "Ti spieghiamo le opzioni disponibili." },
      ],
      steps: [
        { title: "Seleziona una data", text: "Scegli il giorno più comodo per te" },
        { title: "Scegli un orario", text: "Seleziona una fascia disponibile" },
        { title: "Raccontaci il tuo progetto", text: "Aggiungi alcuni dettagli dell’immobile" },
        { title: "Conferma la visita", text: "Controlla e prenota" },
      ],
      reviewTitle: "Cosa controlleremo durante la visita?",
      reviews: [
        { title: "Caratteristiche dell’immobile", text: "Valuteremo lo spazio, la disposizione e le possibilità di installazione." },
        { title: "Impianto attuale", text: "Valuteremo il tuo impianto attuale, se presente, e le sue condizioni." },
        { title: "Esigenze di climatizzazione", text: "Analizzeremo l’uso dello spazio, il comfort desiderato e l’efficienza." },
        { title: "Opzioni di installazione", text: "Ti spiegheremo quali sistemi possono adattarsi meglio alle tue esigenze." },
      ],
      reassurance: {
        eyebrow: "LA TUA TRANQUILLITÀ, IL NOSTRO IMPEGNO", title: "Un progetto ben studiato per una casa più confortevole",
        benefits: [
          { title: "Consulenza personalizzata", text: "Partiamo dal tuo spazio e dalle tue esigenze." },
          { title: "Opzioni chiare", text: "Ti aiutiamo a capire le alternative per la climatizzazione." },
          { title: "Decidi tu", text: "Conosci i passi successivi prima di portare avanti il progetto." },
        ],
      },
      iframeTitle: "Prenota una visita tecnica per la climatizzazione",
    },
  },
};

export const bookingDictionaries: Record<Locale, BookingDictionary> = { es, en, it };
