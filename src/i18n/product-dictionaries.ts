import type { Locale } from "./dictionaries";
import type { ProductSlug } from "@/data/products";

export type ProductCopy = { name: string; category: string; description: string; imageAlt: string };
export type ProductDictionary = {
  eyebrow: string;
  title: string;
  intro: string;
  options: string;
  from: string;
  assessment: string;
  equipmentOnly: string;
  imagePending: string;
  pricingDisclaimer: string;
  demoDisclaimer: string;
  products: Record<ProductSlug, ProductCopy>;
};

export const productDictionaries: Record<Locale, ProductDictionary> = {
  en: {
    eyebrow: "EXPLORE THE EQUIPMENT",
    title: "Climate solutions for different homes.",
    intro: "Explore the equipment options available in the Áurea Clima demonstration. Final system selection and installed pricing are confirmed after a technical assessment.",
    options: "Available options",
    from: "From",
    assessment: "Request a technical assessment",
    equipmentOnly: "Demo · equipment only",
    imagePending: "Product image coming soon",
    pricingDisclaimer: "Illustrative demo equipment and pricing only. Prices shown are equipment-only estimates and exclude labour, materials and installation. Final equipment selection and pricing require a technical assessment.",
    demoDisclaimer: "Áurea Clima is an interactive Rooklyn demonstration. Product images, specifications and prices shown here are illustrative and do not represent real commercial offers.",
    products: {
      "air-conditioner": { name: "Áurea Air Conditioner", category: "Air Conditioning", description: "A simple residential air-conditioning solution for rooms and smaller living spaces. Cooling capacity options depend on your room requirements.", imageAlt: "Áurea Air Conditioner demonstration equipment" },
      "split-air-conditioner": { name: "Áurea Split Air Conditioner", category: "Split Air Conditioning", description: "A complete split-system solution with indoor and outdoor units, designed for residential cooling and selected heating applications.", imageAlt: "Áurea Split Air Conditioner demonstration indoor and outdoor units" },
      "heat-pump": { name: "Áurea Heat Pump", category: "Heat Pump", description: "An air-to-water heat-pump solution for efficient heating, cooling and replacement of conventional heating systems.", imageAlt: "Áurea Heat Pump demonstration equipment" },
      boiler: { name: "Áurea Condensing Boiler", category: "Boiler", description: "A modern condensing boiler option for residential heating and hot-water replacement projects.", imageAlt: "Áurea Condensing Boiler demonstration equipment" },
      "ducted-system": { name: "Áurea Ducted HVAC System", category: "Ducted System", description: "A concealed ducted climate-control solution for heating or cooling distributed across multiple rooms.", imageAlt: "Áurea Ducted HVAC System demonstration equipment" },
      "vrf-vrv": { name: "Áurea VRF / VRV System", category: "VRF / VRV", description: "A multi-zone HVAC solution for larger homes and small commercial environments requiring independent climate control across multiple spaces.", imageAlt: "Áurea VRF / VRV multi-zone demonstration equipment" },
    },
  },
  es: {
    eyebrow: "EXPLORA LOS EQUIPOS",
    title: "Soluciones de climatización para distintos hogares.",
    intro: "Descubre las opciones de equipos disponibles en la demostración de Áurea Clima. La selección final del sistema y el precio de instalación se confirman después de una evaluación técnica.",
    options: "Opciones disponibles",
    from: "Desde",
    assessment: "Solicitar una evaluación técnica",
    equipmentOnly: "Demo · solo equipo",
    imagePending: "Imagen del equipo próximamente",
    pricingDisclaimer: "Equipos y precios únicamente ilustrativos para esta demostración. Los precios mostrados corresponden solo al equipo y no incluyen mano de obra, materiales ni instalación. La selección final y el precio requieren una evaluación técnica.",
    demoDisclaimer: "Áurea Clima es una demostración interactiva de Rooklyn. Las imágenes, especificaciones y precios mostrados son ilustrativos y no representan ofertas comerciales reales.",
    products: {
      "air-conditioner": { name: "Aire acondicionado Áurea", category: "Aire acondicionado", description: "Una solución sencilla de aire acondicionado residencial para habitaciones y espacios pequeños. Las opciones de potencia dependen de las necesidades de cada estancia.", imageAlt: "Equipo demostrativo de aire acondicionado Áurea" },
      "split-air-conditioner": { name: "Aire acondicionado split Áurea", category: "Aire acondicionado split", description: "Un sistema split completo con unidades interior y exterior, diseñado para refrigeración residencial y determinadas aplicaciones de calefacción.", imageAlt: "Unidades interior y exterior del aire acondicionado split demostrativo Áurea" },
      "heat-pump": { name: "Bomba de calor Áurea", category: "Bomba de calor", description: "Una solución de bomba de calor aire-agua para calefacción y refrigeración eficientes y para sustituir sistemas de calefacción convencionales.", imageAlt: "Equipo demostrativo de bomba de calor Áurea" },
      boiler: { name: "Caldera de condensación Áurea", category: "Caldera", description: "Una opción moderna de caldera de condensación para proyectos de sustitución de calefacción y agua caliente en el hogar.", imageAlt: "Equipo demostrativo de caldera de condensación Áurea" },
      "ducted-system": { name: "Sistema de climatización por conductos Áurea", category: "Sistema por conductos", description: "Una solución de climatización oculta por conductos para distribuir calefacción o refrigeración entre varias habitaciones.", imageAlt: "Sistema demostrativo de climatización por conductos Áurea" },
      "vrf-vrv": { name: "Sistema VRF / VRV Áurea", category: "VRF / VRV", description: "Una solución multizona para viviendas grandes y pequeños locales comerciales que necesitan climatización independiente en varios espacios.", imageAlt: "Sistema demostrativo multizona VRF / VRV Áurea" },
    },
  },
  it: {
    eyebrow: "SCOPRI LE SOLUZIONI",
    title: "Soluzioni di climatizzazione per ogni tipo di casa.",
    intro: "Scopri le opzioni disponibili nella demo Áurea Clima. La scelta definitiva del sistema e il prezzo di installazione vengono confermati dopo una valutazione tecnica.",
    options: "Opzioni disponibili",
    from: "Da",
    assessment: "Richiedi una valutazione tecnica",
    equipmentOnly: "Demo · solo apparecchiatura",
    imagePending: "Immagine del prodotto in arrivo",
    pricingDisclaimer: "Prodotti e prezzi esclusivamente illustrativi per questa demo. I prezzi indicati si riferiscono solo all'apparecchiatura e non includono manodopera, materiali o installazione. La scelta finale e il prezzo richiedono una valutazione tecnica.",
    demoDisclaimer: "Áurea Clima è una demo interattiva di Rooklyn. Le immagini, le specifiche e i prezzi mostrati sono illustrativi e non rappresentano offerte commerciali reali.",
    products: {
      "air-conditioner": { name: "Climatizzatore Áurea", category: "Climatizzazione", description: "Una semplice soluzione di climatizzazione residenziale per stanze e piccoli ambienti. Le potenze disponibili dipendono dalle esigenze del locale.", imageAlt: "Climatizzatore dimostrativo Áurea" },
      "split-air-conditioner": { name: "Climatizzatore split Áurea", category: "Climatizzatore split", description: "Un sistema split completo con unità interna ed esterna, pensato per il raffrescamento residenziale e determinate applicazioni di riscaldamento.", imageAlt: "Unità interna ed esterna del climatizzatore split dimostrativo Áurea" },
      "heat-pump": { name: "Pompa di calore Áurea", category: "Pompa di calore", description: "Una soluzione con pompa di calore aria-acqua per riscaldamento e raffrescamento efficienti e per sostituire i sistemi di riscaldamento tradizionali.", imageAlt: "Pompa di calore dimostrativa Áurea" },
      boiler: { name: "Caldaia a condensazione Áurea", category: "Caldaia", description: "Una moderna caldaia a condensazione per progetti di sostituzione del riscaldamento e della produzione di acqua calda domestica.", imageAlt: "Caldaia a condensazione dimostrativa Áurea" },
      "ducted-system": { name: "Sistema di climatizzazione canalizzato Áurea", category: "Sistema canalizzato", description: "Una soluzione di climatizzazione canalizzata a scomparsa per distribuire riscaldamento o raffrescamento in più stanze.", imageAlt: "Sistema di climatizzazione canalizzato dimostrativo Áurea" },
      "vrf-vrv": { name: "Sistema VRF / VRV Áurea", category: "VRF / VRV", description: "Una soluzione multizona per abitazioni grandi e piccoli spazi commerciali che richiedono un controllo indipendente del clima in più ambienti.", imageAlt: "Sistema multizona VRF / VRV dimostrativo Áurea" },
    },
  },
};
