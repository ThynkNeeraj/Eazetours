"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Extended Country options with flag + code (unchanged)
const countryOptions = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+377", flag: "🇲🇨", name: "Monaco" },
  { code: "+378", flag: "🇸🇲", name: "San Marino" },
  { code: "+379", flag: "🇻🇦", name: "Vatican City" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "+387", flag: "🇧🇦", name: "Bosnia & Herzegovina" },
  { code: "+389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
];

// Tour types remain the same (could also be translated if needed, but keeping as-is for now)
const tourTypes = [
  "Adventure Tours",
  "Cultural Tours",
  "Luxury Tours",
  "Honeymoon Tours",
  "Pilgrim Tours",
  "Tribal Tours",
  "Wildlife Tours",
  "Bhutan Tours",
  "Sri Lanka Tours",
  "Nepal Tours",
  "Maldives Tours",
  "Custom Tour",
];

interface ContactFormProps {
  locale?: string; // 'en', 'de', 'es', 'fr' – defaults to 'en'
}

export default function ContactForm({ locale = "en" }: ContactFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  // Translation dictionary
  const translations = {
    en: {
      title: "Write to us!",
      subtitle: "Want to enquire about a tour or your next vacation? Fill out the form and we’ll get back to you with a tailor-made itinerary.",
      namePlaceholder: "Full Name",
      cityPlaceholder: "Your City",
      emailPlaceholder: "Email Address",
      phonePlaceholder: "Mobile Number",
      destinationPlaceholder: "Destination",
      datePlaceholder: "Date of Travel",
      peoplePlaceholder: "No. of Travelers",
      tourTypePlaceholder: "Select Tour Type",
      messagePlaceholder: "Message (optional)",
      submitButton: "Send",
      toastMessage: "We have received your query! Redirecting...",
      errorNameRequired: "Name is required.",
      errorCityRequired: "City is required.",
      errorEmailRequired: "Email is required.",
      errorEmailInvalid: "Invalid email address.",
      errorPhoneRequired: "Phone number is required.",
      errorPhoneInvalid: "Invalid phone number.",
      errorDestinationRequired: "Destination is required.",
      errorDateRequired: "Select a travel date.",
      errorPeopleRequired: "Enter number of travelers.",
      errorTourTypeRequired: "Select a tour type.",
      errorCustomMessageRequired: "Please describe your custom tour request.",
      errorLettersOnly: "Only letters are allowed.",
    },
    de: {
      title: "Schreiben Sie uns!",
      subtitle: "Möchten Sie eine Tour oder Ihren nächsten Urlaub anfragen? Füllen Sie das Formular aus und wir melden uns mit einem maßgeschneiderten Reiseplan bei Ihnen.",
      namePlaceholder: "Vollständiger Name",
      cityPlaceholder: "Ihre Stadt",
      emailPlaceholder: "E-Mail-Adresse",
      phonePlaceholder: "Mobilnummer",
      destinationPlaceholder: "Reiseziel",
      datePlaceholder: "Reisedatum",
      peoplePlaceholder: "Anzahl der Reisenden",
      tourTypePlaceholder: "Tourart auswählen",
      messagePlaceholder: "Nachricht (optional)",
      submitButton: "Senden",
      toastMessage: "Wir haben Ihre Anfrage erhalten! Weiterleitung...",
      errorNameRequired: "Name ist erforderlich.",
      errorCityRequired: "Stadt ist erforderlich.",
      errorEmailRequired: "E-Mail ist erforderlich.",
      errorEmailInvalid: "Ungültige E-Mail-Adresse.",
      errorPhoneRequired: "Telefonnummer ist erforderlich.",
      errorPhoneInvalid: "Ungültige Telefonnummer.",
      errorDestinationRequired: "Reiseziel ist erforderlich.",
      errorDateRequired: "Wählen Sie ein Reisedatum.",
      errorPeopleRequired: "Geben Sie die Anzahl der Reisenden ein.",
      errorTourTypeRequired: "Wählen Sie eine Tourart.",
      errorCustomMessageRequired: "Bitte beschreiben Sie Ihre individuelle Touranfrage.",
      errorLettersOnly: "Nur Buchstaben sind erlaubt.",
    },
    es: {
      title: "¡Escríbanos!",
      subtitle: "¿Quiere consultar sobre un tour o sus próximas vacaciones? Complete el formulario y le responderemos con un itinerario personalizado.",
      namePlaceholder: "Nombre completo",
      cityPlaceholder: "Su ciudad",
      emailPlaceholder: "Correo electrónico",
      phonePlaceholder: "Número de móvil",
      destinationPlaceholder: "Destino",
      datePlaceholder: "Fecha de viaje",
      peoplePlaceholder: "Número de viajeros",
      tourTypePlaceholder: "Seleccione tipo de tour",
      messagePlaceholder: "Mensaje (opcional)",
      submitButton: "Enviar",
      toastMessage: "¡Hemos recibido su consulta! Redirigiendo...",
      errorNameRequired: "El nombre es obligatorio.",
      errorCityRequired: "La ciudad es obligatoria.",
      errorEmailRequired: "El correo electrónico es obligatorio.",
      errorEmailInvalid: "Correo electrónico inválido.",
      errorPhoneRequired: "El número de teléfono es obligatorio.",
      errorPhoneInvalid: "Número de teléfono inválido.",
      errorDestinationRequired: "El destino es obligatorio.",
      errorDateRequired: "Seleccione una fecha de viaje.",
      errorPeopleRequired: "Ingrese el número de viajeros.",
      errorTourTypeRequired: "Seleccione un tipo de tour.",
      errorCustomMessageRequired: "Por favor, describa su solicitud de tour personalizado.",
      errorLettersOnly: "Solo se permiten letras.",
    },
    fr: {
      title: "Écrivez-nous!",
      subtitle: "Vous souhaitez vous renseigner sur un voyage ou vos prochaines vacances? Remplissez le formulaire et nous vous répondrons avec un itinéraire sur mesure.",
      namePlaceholder: "Nom complet",
      cityPlaceholder: "Votre ville",
      emailPlaceholder: "Adresse e-mail",
      phonePlaceholder: "Numéro de mobile",
      destinationPlaceholder: "Destination",
      datePlaceholder: "Date de voyage",
      peoplePlaceholder: "Nombre de voyageurs",
      tourTypePlaceholder: "Sélectionnez le type de voyage",
      messagePlaceholder: "Message (optionnel)",
      submitButton: "Envoyer",
      toastMessage: "Nous avons reçu votre demande! Redirection...",
      errorNameRequired: "Le nom est requis.",
      errorCityRequired: "La ville est requise.",
      errorEmailRequired: "L'e-mail est requis.",
      errorEmailInvalid: "Adresse e-mail invalide.",
      errorPhoneRequired: "Le numéro de téléphone est requis.",
      errorPhoneInvalid: "Numéro de téléphone invalide.",
      errorDestinationRequired: "La destination est requise.",
      errorDateRequired: "Sélectionnez une date de voyage.",
      errorPeopleRequired: "Entrez le nombre de voyageurs.",
      errorTourTypeRequired: "Sélectionnez un type de voyage.",
      errorCustomMessageRequired: "Veuillez décrire votre demande de voyage personnalisé.",
      errorLettersOnly: "Seules les lettres sont autorisées.",
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
    countryCode: "+91",
    destination: "",
    dateOfTravel: "",
    people: "",
    tourType: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  // Auto-detect country Mobile code by IP
  useEffect(() => {
    const detectCountryCode = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data && data.country_calling_code) {
          setFormData((prev) => ({
            ...prev,
            countryCode: data.country_calling_code,
          }));
        }
      } catch {
        setFormData((prev) => ({ ...prev, countryCode: "+91" }));
      }
    };
    detectCountryCode();
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[0-9+\-\s]{7,15}$/.test(phone);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = t.errorNameRequired;
    if (!formData.city.trim()) newErrors.city = t.errorCityRequired;
    if (!formData.email.trim()) newErrors.email = t.errorEmailRequired;
    else if (!validateEmail(formData.email)) newErrors.email = t.errorEmailInvalid;
    if (!formData.phone.trim()) newErrors.phone = t.errorPhoneRequired;
    else if (!validatePhone(formData.phone)) newErrors.phone = t.errorPhoneInvalid;
    if (!formData.destination.trim()) newErrors.destination = t.errorDestinationRequired;
    if (!formData.dateOfTravel.trim()) newErrors.dateOfTravel = t.errorDateRequired;
    if (!formData.people.trim()) newErrors.people = t.errorPeopleRequired;
    if (!formData.tourType.trim()) newErrors.tourType = t.errorTourTypeRequired;
    if (formData.tourType === "Custom Tour" && !formData.message.trim())
      newErrors.message = t.errorCustomMessageRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fullPhone: `${formData.countryCode}${formData.phone}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setShowToast(true);
        setFormData({
          name: "",
          city: "",
          email: "",
          phone: "",
          countryCode: formData.countryCode,
          destination: "",
          dateOfTravel: "",
          people: "",
          tourType: "",
          message: "",
        });

        setTimeout(() => {
          setShowToast(false);
          router.push("/thank-you");
        }, 2000);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
          <div className="alert alert-success shadow-lg">
            <div>
              <span>{t.toastMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-base-100 w-full mx-auto shadow-2xl my-10 flex-1">
        <div className="text-center mt-5">
          <h3 className="text-3xl font-bold">{t.title}</h3>
          <p className="p-6">{t.subtitle}</p>
        </div>

        <form className="card-body" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value;
                  const textOnly = value.replace(/[^a-zA-ZÀ-ž\s'-]/g, "");
                  setFormData({ ...formData, name: textOnly });
                }}
                className={`input input-bordered w-full border-gray-300 focus:outline-none ${
                  /[^a-zA-ZÀ-ž\s'-]/.test(formData.name) ? "border-red-500" : ""
                }`}
              />
              {/[^a-zA-ZÀ-ž\s'-]/.test(formData.name) && (
                <p className="text-red-500 text-sm mt-1">{t.errorLettersOnly}</p>
              )}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                name="city"
                placeholder={t.cityPlaceholder}
                value={formData.city}
                onChange={(e) => {
                  const value = e.target.value;
                  const textOnly = value.replace(/[^a-zA-ZÀ-ž\s'-]/g, "");
                  setFormData({ ...formData, city: textOnly });
                }}
                className={`input input-bordered w-full border-gray-300 focus:outline-none ${
                  /[^a-zA-ZÀ-ž\s'-]/.test(formData.city) ? "border-red-500" : ""
                }`}
              />
              {/[^a-zA-ZÀ-ž\s'-]/.test(formData.city) && (
                <p className="text-red-500 text-sm mt-1">{t.errorLettersOnly}</p>
              )}
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full border-gray-300"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone with country code */}
            <div>
              <div className="flex items-center space-x-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="select px-4 select-bordered border-gray-300 w-26 h-[52px] text-base flex-shrink-0 rounded-md"
                >
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, phone: numericValue }));
                  }}
                  className="input input-bordered border-gray-300 w-full h-[52px] text-base focus:outline-none rounded-md"
                  maxLength={15}
                  inputMode="numeric"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Destination */}
            <div>
              <input
                type="text"
                name="destination"
                placeholder={t.destinationPlaceholder}
                value={formData.destination}
                onChange={(e) => {
                  const value = e.target.value;
                  const textOnly = value.replace(/[^a-zA-ZÀ-ž\s'-]/g, "");
                  setFormData({ ...formData, destination: textOnly });
                }}
                className={`input input-bordered w-full border-gray-300 focus:outline-none ${
                  /[^a-zA-ZÀ-ž\s'-]/.test(formData.destination) ? "border-red-500" : ""
                }`}
              />
              {/[^a-zA-ZÀ-ž\s'-]/.test(formData.destination) && (
                <p className="text-red-500 text-sm mt-1">{t.errorLettersOnly}</p>
              )}
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
              )}
            </div>

            {/* Date of Travel */}
            <div className="relative">
              <input
                type="date"
                name="dateOfTravel"
                value={formData.dateOfTravel}
                onChange={handleChange}
                onClick={(e) => {
                  const input = e.currentTarget;
                  input.blur();
                  requestAnimationFrame(() => {
                    if (typeof input.showPicker === "function") {
                      input.showPicker();
                    } else {
                      input.focus();
                    }
                  });
                }}
                min={today}
                className={`input input-bordered w-full border-gray-300 placeholder-gray-400 ${
                  formData.dateOfTravel ? "text-black" : "text-transparent"
                }`}
                required
              />
              {!formData.dateOfTravel && (
                <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                  {t.datePlaceholder}
                </span>
              )}
            </div>

            {/* People */}
            <div>
              <input
                type="number"
                name="people"
                placeholder={t.peoplePlaceholder}
                value={formData.people}
                onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                className="input input-bordered w-full border-gray-300"
              />
              {errors.people && <p className="text-red-500 text-sm mt-1">{errors.people}</p>}
            </div>

            {/* Tour type */}
            <div>
              <select
                name="tourType"
                value={formData.tourType}
                onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
                className="select select-bordered w-full border-gray-300"
              >
                <option value="">{t.tourTypePlaceholder}</option>
                {tourTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.tourType && <p className="text-red-500 text-sm mt-1">{errors.tourType}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="mt-4">
            <textarea
              name="message"
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="textarea textarea-bordered w-full border-gray-300"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="btn bg-[#025C7A] rounded-[41px] text-white px-8 mt-4 hover:bg-[#6E9753] transition-all duration-300"
          >
            {t.submitButton}
          </button>
        </form>
      </div>
    </>
  );
}