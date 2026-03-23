import PackagesList from "../../../../components/Packages";
import PackageDetail from "../../../../components/PackageDetail";
import { getPackagesTranslations } from "../../../../lib/translationHelper";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";

type Params = {
  params: Promise<{
    lang: string;
    slug: string[];
  }>;
};

// Wrapper component to handle the locale - FIXED
function PackageDetailWrapper({ packageUri, lang }: { packageUri: string; lang: string }) {
  // Pass lang as locale to PackageDetail
  return <PackageDetail packageUri={packageUri} locale={lang} />;
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const param = await props.params;
  const { lang, slug } = param;

  if (slug !== undefined && slug.length == 1) {
    const packageUri = slug[0];
    // Get translated packages based on language
    const packages = getPackagesTranslations(lang);
    const tourPackage = packages.find(tourPackage => tourPackage.Uri === packageUri);

    if (tourPackage) {
      return {
        title: tourPackage.Title,
        description: tourPackage.Description,
        alternates: {
          languages: {
            'en': `https://www.eazetours.com/en/packages/${packageUri}`,
            'es': `https://www.eazetours.com/es/packages/${packageUri}`,
            'de': `https://www.eazetours.com/de/packages/${packageUri}`,
            'fr': `https://www.eazetours.com/fr/packages/${packageUri}`,
          },
        },
      };
    }
  }

  // Default metadata for packages listing page
  const getDefaultTitle = (lang: string) => {
    const titles = {
      en: "Luxury Holiday Tour Packages in India - Eaze Tours",
      es: "Paquetes de Vacaciones de Lujo en India - Eaze Tours",
      de: "Luxuriöse Urlaubspakete in Indien - Eaze Tours",
      fr: "Forfaits de Vacances de Luxe en Inde - Eaze Tours",
    };
    return titles[lang as keyof typeof titles] || titles.en;
  };

  const getDefaultDescription = (lang: string) => {
    const descriptions = {
      en: "Explore luxury holiday packages in India with Eaze Tours. From India tour packages from Delhi to the best tours to India from the USA, plan your trip today!",
      es: "Explore paquetes de vacaciones de lujo en India con Eaze Tours. Desde paquetes turísticos de India desde Delhi hasta los mejores tours a India desde EE. UU., ¡planifique su viaje hoy!",
      de: "Entdecken Sie luxuriöse Urlaubspakete in Indien mit Eaze Tours. Von Indien-Rundreisen ab Delhi bis zu den besten Indien-Reisen ab den USA - planen Sie noch heute Ihre Reise!",
      fr: "Découvrez des forfaits de vacances de luxe en Inde avec Eaze Tours. Des circuits en Inde au départ de Delhi aux meilleures visites de l'Inde depuis les États-Unis, planifiez votre voyage dès aujourd'hui!",
    };
    return descriptions[lang as keyof typeof descriptions] || descriptions.en;
  };

  return {
    title: getDefaultTitle(lang),
    description: getDefaultDescription(lang),
    alternates: {
      languages: {
        'en': `https://www.eazetours.com/en/packages`,
        'es': `https://www.eazetours.com/es/packages`,
        'de': `https://www.eazetours.com/de/packages`,
        'fr': `https://www.eazetours.com/fr/packages`,
      },
    },
  };
}

export default async function Packages(props: Params) {
  const param = await props.params;
  const { lang, slug } = param;

  if (!slug) {
    return (
      <div className="mt-[78px] sm:mt-[135px]">
        <PackagesList locale={lang} />
      </div>
    );
  } else if (slug.length === 1) {
    const packageUri = slug[0];
    // Get translated packages based on language
    const packages = getPackagesTranslations(lang);
    const tourPackage = packages.find(p => p.Uri === packageUri);

    if (tourPackage) {
      // Get base URL for canonical links
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.eazetours.com';
      
      const schema = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: tourPackage.Title,
        description: tourPackage.Description,
        url: `${baseUrl}/${lang}/packages/${tourPackage.Uri}`,
        image: tourPackage.Itinerary?.[0]?.Images?.[0]?.src || "",
        itinerary: {
          "@type": "ItemList",
          itemListElement: tourPackage.Itinerary.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `Day ${item.Day}: ${item.Name}`,
          })),
        },
        provider: {
          "@type": "TravelAgency",
          name: "EazeTours",
          url: baseUrl,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Eaze House ~2nd Floor, RZP-146 Palam Colony",
            addressLocality: "New Delhi",
            addressRegion: "South West Delhi",
            postalCode: "110075",
            addressCountry: "IN",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "heritage specialist",
              telephone: "+91 9911684818",
              email: "mailto:info@eazetours.com",
            },
            {
              "@type": "ContactPoint",
              contactType: "emergency support",
              telephone: "+91 9818006830",
              email: "mailto:harshit@eazetours.com",
            },
          ],
        },
        duration: `P${tourPackage.Itinerary.length}D`,
        touristType: tourPackage.TouristType || [],
        location: {
          "@type": "Place",
          name: String(tourPackage.LocationDescription || tourPackage.Name),
          address: {
            "@type": "PostalAddress",
            addressCountry: "India",
            addressRegion: String(tourPackage.Location?.Address?.AddressRegion || ""),
          },
          geo: tourPackage.Location?.Geo ? {
            "@type": "GeoShape",
            line: String(tourPackage.Location.Geo.Line || ""),
          } : undefined,
        },
        includesAttractions: tourPackage.IncludesAttractions || [],
        tourCompanion: tourPackage.TourCompanion ? {
          "@type": "TourCompanion",
          name: String(tourPackage.TourCompanion.Name),
          description: String(tourPackage.TourCompanion.Description),
        } : undefined,
        review: tourPackage.Ratings ? [
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(tourPackage.Ratings),
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Verified Traveller",
            },
            itemReviewed: {
              "@type": "Product",
              name: tourPackage.Title,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: String(tourPackage.Ratings),
                reviewCount: String(tourPackage.NoOfRatings || 0),
              },
            },
          },
        ] : undefined,
      };

      return (
        <>
          <Script
            id="tourist-trip-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
          <div className="mt-[78px] sm:mt-[135px]">
            {/* FIXED: Pass lang as locale to PackageDetail */}
            <PackageDetail packageUri={packageUri} locale={lang} />
          </div>
        </>
      );
    }
  }

  return notFound();
}
