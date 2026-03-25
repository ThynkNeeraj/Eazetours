import { Metadata } from "next";
import ContactForm from "../../../components/ContactForm";

// Dynamic metadata based on language
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  const translations: Record<string, { title: string; description: string }> = {
    en: {
      title: "Contact Eaze Tours for Your Travel Inquiries",
      description: "Get in touch with Eaze Tours for personalized travel assistance. Our team is ready to help with bookings, inquiries, and more for your next trip. Call Now!",
    },
    de: {
      title: "Kontaktieren Sie Eaze Tours für Ihre Reiseanfragen",
      description: "Nehmen Sie Kontakt mit Eaze Tours auf, um persönliche Reiseunterstützung zu erhalten. Unser Team hilft Ihnen gerne bei Buchungen, Anfragen und mehr für Ihre nächste Reise. Rufen Sie uns an!",
    },
    es: {
      title: "Contacte a Eaze Tours para sus consultas de viaje",
      description: "Póngase en contacto con Eaze Tours para obtener asistencia personalizada en viajes. Nuestro equipo está listo para ayudarle con reservas, consultas y más para su próximo viaje. ¡Llámenos ahora!",
    },
    fr: {
      title: "Contactez Eaze Tours pour vos demandes de voyage",
      description: "Contactez Eaze Tours pour une assistance personnalisée en matière de voyage. Notre équipe est prête à vous aider pour les réservations, les demandes et plus encore pour votre prochain voyage. Appelez maintenant!",
    },
  };

  const defaultMeta = translations.en;
  const meta = translations[lang as keyof typeof translations] || defaultMeta;

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function ContactUs({ params }: { params: { lang: string } }) {
  const { lang } = params;

  // Translations for the static headings on the page
  const uiTranslations: Record<string, { headOffice: string; branchOffice: string; contact: string }> = {
    en: {
      headOffice: "Head Office - New Delhi",
      branchOffice: "Branch Office – Varanasi",
      contact: "Contact",
    },
    de: {
      headOffice: "Hauptsitz - Neu-Delhi",
      branchOffice: "Zweigstelle – Varanasi",
      contact: "Kontakt",
    },
    es: {
      headOffice: "Oficina central - Nueva Delhi",
      branchOffice: "Sucursal – Varanasi",
      contact: "Contacto",
    },
    fr: {
      headOffice: "Siège social - New Delhi",
      branchOffice: "Bureau secondaire – Varanasi",
      contact: "Contact",
    },
  };

  const t = uiTranslations[lang as keyof typeof uiTranslations] || uiTranslations.en;

  return (
    <div>
      <div className="hero mt-[135px] min-h-[100%] xl:min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1 space-y-5">
            {/* Head Office Card */}
            <div className="card card-side bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-center">{t.headOffice}</h2>
                <span className="text-xl text-center">
                  <p>Eaze Tours</p>
                  <p>
                    Eaze House – Second Floor, RZP-146, Gali No 2 Raj Nagar Part 2, Palam Colony,
                    New Delhi, South West Delhi, 110075
                  </p>
                </span>
              </div>
            </div>

            {/* Branch Office Card */}
            <div className="card card-side bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-center">{t.branchOffice}</h2>
                <span className="text-xl text-center">
                  <p>Eaze House - Sa 6/186-76 Srinagar Colony Pahariya, Varanasi 221007</p>
                </span>
              </div>
            </div>

            {/* Contact Card */}
            <div className="card card-side bg-base-100 shadow-xl mt-5">
              <div className="card-body">
                <h2 className="font-bold text-2xl text-center">{t.contact}</h2>
                <span className="text-xl text-center">
                  <p className="hover:text-[#3778EE] hover:font-semibold cursor-pointer">
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-phone-alt text-lg leading-lg " />{" "}
                    <a href="tel:+919873186168">+91 987 318 6168</a>
                  </p>
                  <p className="hover:text-[#3778EE] hover:font-semibold cursor-pointer">
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-phone-alt text-lg leading-lg " />{" "}
                    <a href="tel:+919911684818">+91 991 168 4818</a>
                  </p>
                  <p className="hover:text-[#3778EE] hover:font-semibold cursor-pointer">
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-phone-alt text-lg leading-lg " />{" "}
                    <a href="tel:+919818006830">+91 981 800 6830</a>
                  </p>
                  <p className="hover:text-[#3778EE] hover:font-semibold cursor-pointer">
                    <i className="lg:text-blueGray-200 text-blueGray-400 fas fa-envelope text-lg leading-lg " />{" "}
                    <a href="mailto:info@eazetours.com">info@eazetours.com</a>
                  </p>
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 space-y-5">
            <ContactForm locale={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}