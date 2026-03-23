import Testimonial from "../../../components/Testimonial";
import TestimonialVideoSection from "../../../components/client/TestimonialVideoSection";
import { Metadata } from "next";
import { getTestimonialsTranslations } from "../../../lib/translationHelper";

// Metadata needs to be generated dynamically based on language
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  
  const metadataTranslations = {
    en: {
      title: "Client Testimonials - Eaze Tours: Best Travel Agency India",
      description: "Read authentic reviews from satisfied travelers who shared their memorable experiences with Eaze Tours, highlighting quality service and unforgettable trips.",
    },
    de: {
      title: "Kundenbewertungen - Eaze Tours: Beste Reiseagentur Indien",
      description: "Lesen Sie authentische Bewertungen zufriedener Reisender, die ihre unvergesslichen Erfahrungen mit Eaze Tours geteilt haben - qualitativ hochwertiger Service und unvergessliche Reisen.",
    },
    es: {
      title: "Testimonios de Clientes - Eaze Tours: Mejor Agencia de Viajes India",
      description: "Lea reseñas auténticas de viajeros satisfechos que compartieron sus experiencias memorables con Eaze Tours, destacando un servicio de calidad y viajes inolvidables.",
    },
    fr: {
      title: "Témoignages Clients - Eaze Tours: Meilleure Agence de Voyage Inde",
      description: "Lisez les avis authentiques de voyageurs satisfaits qui ont partagé leurs expériences mémorables avec Eaze Tours, mettant en avant un service de qualité et des voyages inoubliables.",
    },
  };

  const currentMetadata = metadataTranslations[lang as keyof typeof metadataTranslations] || metadataTranslations.en;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
  };
}

// Heading translations
const headingTranslations = {
  en: "We let our customers talk for us.",
  de: "Wir lassen unsere Kunden für uns sprechen.",
  es: "Dejamos que nuestros clientes hablen por nosotros.",
  fr: "Nous laissons nos clients parler pour nous.",
};

export default function Testimonials({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const testimonials = getTestimonialsTranslations(lang);
  
  // Get the translated heading based on current language
  const translatedHeading = headingTranslations[lang as keyof typeof headingTranslations] || headingTranslations.en;

  return (
    <div>
      <div
        className="relative mt-[150px] max-w-[1280px] mx-8 h-[480px] mb-6 rounded-[23px] overflow-hidden flex items-center justify-start p-[20px] sm:p-[80px] bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/gallery/5.jpg")' }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-[900px] py-8 pt-[210px] text-left">
          <h2 className="text-white text-[38px] sm:text-[56px] mb-4 font-semibold leading-[1.2em]">
            {translatedHeading}
          </h2>
          {/* Input Field and Subscribe Button */}
        </div>
      </div>

      {/* Video Section */}
      <TestimonialVideoSection currentLocale={lang} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-1 place-items-center my-12 mx-8">
        {testimonials.map(testimonial => (
          <div key={testimonial.Id} className="h-[100%] mb-8">
            <Testimonial testimonial={testimonial}></Testimonial>
          </div>
        ))}
      </div>
    </div>
  );
}
