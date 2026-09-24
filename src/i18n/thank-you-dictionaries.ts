import type { Locale } from "./dictionaries";
import type { ServiceType } from "../config/ghl-forms";

type ThankYouDictionary = {
  eyebrow: string;
  title: string;
  next: string;
  details: string;
  home: string;
  services: Record<ServiceType, { title: string; text: string; preparation: string }>;
};

export const thankYouDictionaries: Record<Locale, ThankYouDictionary> = {
  es: {
    eyebrow: "RESERVA COMPLETADA", title: "Gracias por tu confianza.",
    next: "¿Qué sigue?", details: "Conserva los detalles de tu cita. Si necesitas cambiarla, utiliza las opciones de gestión facilitadas con tu reserva.",
    home: "Volver al inicio",
    services: {
      repair: { title: "Tu cita de reparación está reservada.", text: "Has completado la reserva para revisar tu equipo de climatización.", preparation: "Ten a mano los datos del equipo y una descripción del problema para la visita." },
      installation: { title: "Tu visita técnica está reservada.", text: "Has completado la reserva de una visita para valorar tu nueva instalación.", preparation: "Prepara tus preguntas y los detalles del espacio donde quieres instalar el equipo." },
    },
  },
  en: {
    eyebrow: "BOOKING COMPLETE", title: "Thank you for choosing us.",
    next: "What happens next?", details: "Keep your appointment details handy. If you need to make a change, use the booking management options provided with your reservation.",
    home: "Back to home",
    services: {
      repair: { title: "Your repair appointment is reserved.", text: "You’ve completed your booking to have your climate-control equipment checked.", preparation: "Have your equipment details and a description of the problem ready for the visit." },
      installation: { title: "Your technical visit is reserved.", text: "You’ve completed your booking for a visit to assess your new installation.", preparation: "Prepare your questions and details about the space where you’d like the equipment installed." },
    },
  },
  it: {
    eyebrow: "PRENOTAZIONE COMPLETATA", title: "Grazie per la tua fiducia.",
    next: "Cosa succede adesso?", details: "Conserva i dettagli del tuo appuntamento. Se devi modificarlo, usa le opzioni di gestione fornite con la prenotazione.",
    home: "Torna alla home",
    services: {
      repair: { title: "Il tuo appuntamento per la riparazione è prenotato.", text: "Hai completato la prenotazione per il controllo del tuo impianto di climatizzazione.", preparation: "Tieni a portata di mano i dati dell’impianto e una descrizione del problema per la visita." },
      installation: { title: "La tua visita tecnica è prenotata.", text: "Hai completato la prenotazione di una visita per valutare la nuova installazione.", preparation: "Prepara le tue domande e i dettagli dello spazio in cui vorresti installare l’impianto." },
    },
  },
};
