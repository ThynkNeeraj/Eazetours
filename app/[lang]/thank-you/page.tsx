import type { Metadata } from "next";

// Generate metadata dynamically based on language
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  
  const metadataTranslations = {
    en: {
      title: "Thank You | EazeTours",
      description: "We've received your enquiry. Our travel experts will contact you soon to help plan your perfect trip.",
      ogDescription: "We've received your enquiry. Our travel experts will contact you soon to help plan your perfect trip.",
    },
    de: {
      title: "Danke | EazeTours",
      description: "Wir haben Ihre Anfrage erhalten. Unsere Reiseexperten werden sich bald mit Ihnen in Verbindung setzen, um Ihre perfekte Reise zu planen.",
      ogDescription: "Wir haben Ihre Anfrage erhalten. Unsere Reiseexperten werden sich bald mit Ihnen in Verbindung setzen, um Ihre perfekte Reise zu planen.",
    },
    es: {
      title: "Gracias | EazeTours",
      description: "Hemos recibido su consulta. Nuestros expertos en viajes se comunicarán con usted pronto para ayudarle a planificar su viaje perfecto.",
      ogDescription: "Hemos recibido su consulta. Nuestros expertos en viajes se comunicarán con usted pronto para ayudarle a planificar su viaje perfecto.",
    },
    fr: {
      title: "Merci | EazeTours",
      description: "Nous avons reçu votre demande. Nos experts en voyages vous contacteront bientôt pour vous aider à planifier votre voyage parfait.",
      ogDescription: "Nous avons reçu votre demande. Nos experts en voyages vous contacteront bientôt pour vous aider à planifier votre voyage parfait.",
    },
  };

  const currentMetadata = metadataTranslations[lang as keyof typeof metadataTranslations] || metadataTranslations.en;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    robots: "index, follow",
    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.ogDescription,
      url: `https://www.eazetours.com/${lang === 'en' ? '' : lang + '/'}thank-you`,
      siteName: "EazeTours",
      images: [
        {
          url: "https://www.eazetours.com/images/thankyou-banner.jpg",
          width: 1200,
          height: 630,
          alt: "EazeTours Thank You",
        },
      ],
      type: "website",
    },
  };
}

// Page content translations
const pageTranslations = {
  en: {
    heading: "Thank You!",
    message: "We have received your query and will get back to you shortly.",
  },
  de: {
    heading: "Danke!",
    message: "Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  },
  es: {
    heading: "¡Gracias!",
    message: "Hemos recibido su consulta y nos comunicaremos con usted en breve.",
  },
  fr: {
    heading: "Merci !",
    message: "Nous avons reçu votre demande et vous répondrons sous peu.",
  },
};

export default function ThankYou({ params }: { params: { lang: string } }) {
  const { lang } = params;
  
  // Get translations based on current language, fallback to English
  const translations = pageTranslations[lang as keyof typeof pageTranslations] || pageTranslations.en;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-4">{translations.heading}</h1>
      <p className="text-lg text-center max-w-2xl">{translations.message}</p>
    </div>
  );
}