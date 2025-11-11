"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Extended Country options with flag + code
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

export default function ContactForm() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
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

  // ✅ Auto-detect country code by IP
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

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email address.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!validatePhone(formData.phone)) newErrors.phone = "Invalid phone number.";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required.";
    if (!formData.dateOfTravel.trim()) newErrors.dateOfTravel = "Select a travel date.";
    if (!formData.dateOfTravel.trim()) newErrors.dateOfTravel = "Select a date.";
    if (!formData.people.trim()) newErrors.people = "Enter number of travelers.";
    if (!formData.tourType.trim()) newErrors.tourType = "Select a tour type.";
    if (formData.tourType === "Custom Tour" && !formData.message.trim())
      newErrors.message = "Please describe your custom tour request.";

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
              <span>We have received your query! Redirecting...</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-base-100 w-full mx-auto shadow-2xl my-10 flex-1">
        <div className="text-center mt-5">
          <h3 className="text-3xl font-bold">Write to us!</h3>
          <p className="p-6">
            Want to enquire about a tour or your next vacation? Fill out the form and we’ll get back
            to you with a tailor-made itinerary.
          </p>
        </div>

        <form className="card-body" onSubmit={onSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ✅ Full Name (text only + accent friendly + red border feedback) */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
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
                <p className="text-red-500 text-sm mt-1">Only letters are allowed.</p>
              )}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* ✅ City */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="Your City"
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
                <p className="text-red-500 text-sm mt-1">Only letters are allowed.</p>
              )}
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full border-gray-300"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* ✅ Phone with country code */}
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
                  placeholder="Mobile Number"
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

            {/* ✅ Destination */}
            <div>
              <input
                type="text"
                name="destination"
                placeholder="Destination"
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
                <p className="text-red-500 text-sm mt-1">Only letters are allowed.</p>
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
                  const input = e.currentTarget; // ✅ store ref before async
                  input.blur(); // prevent blue selection highlight

                  requestAnimationFrame(() => {
                    // ✅ use stored element safely
                    if (typeof input.showPicker === "function") {
                      input.showPicker();
                    } else {
                      input.focus(); // fallback for Safari/Firefox
                    }
                  });
                }}
                min={today}
                className={`input input-bordered w-full border-gray-300 placeholder-gray-400 ${formData.dateOfTravel ? "text-black" : "text-transparent"
                  }`}
                required
              />
              {!formData.dateOfTravel && (
                <span className="absolute left-3 top-2.5 text-gray-400 pointer-events-none">
                  Date of Travel
                </span>
              )}
            </div>

            {/* People */}
            <div>
              <input
                type="number"
                name="people"
                placeholder="No. of Travelers"
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
                <option value="">Select Tour Type</option>
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
              placeholder="Message (optional)"
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
            Send
          </button>
        </form>
      </div>
    </>
  );
}
