"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const countryCodes = [
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

interface TravelEnquiryFormProps {
  selectedPackage: string; // Package name must be passed
}

export default function TravelEnquiryForm({ selectedPackage }: TravelEnquiryFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    city: "",
    dateOfTravel: "",
    adults: 1,
    children: 0,
    infants: 0,
    message: "",
    packageName: selectedPackage || "",
  });

  const [showToast, setShowToast] = useState(false);
  const [detectingCountry, setDetectingCountry] = useState(true);

  // Detect package and auto-detect country code
  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, packageName: selectedPackage }));
    }

    const detectCountryCode = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data?.country_calling_code) {
          setFormData((prev) => ({
            ...prev,
            countryCode: data.country_calling_code,
          }));
        }
      } catch (error) {
        console.error("Error detecting country code:", error);
      } finally {
        setDetectingCountry(false);
      }
    };

    detectCountryCode();
  }, [selectedPackage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTravelerChange = (
    type: "adults" | "children" | "infants",
    increment: boolean
  ) => {
    setFormData((prev) => {
      const newValue = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: newValue };
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const totalTravelers = formData.adults + formData.children + formData.infants;
    if (totalTravelers === 0) {
      alert("Please specify at least one traveler.");
      return;
    }

    try {
      const res = await fetch("/api/travel-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setShowToast(true);
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phone: "",
          city: "",
          dateOfTravel: "",
          adults: 1,
          children: 0,
          infants: 0,
          message: "",
          packageName: selectedPackage || "",
        });

        setTimeout(() => {
          setShowToast(false);
          router.push("/thank-you");
        }, 2000);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
          <div className="alert alert-success shadow-lg">
            <div>
              <span>We have received your travel enquiry! Redirecting...</span>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-base-100 max-w-[900px] mx-auto p-6 sm:p-8 border-2 shadow-lg overflow-auto scrollbar-hide">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold">Travel Enquiry</h3>
          <p className="pt-3 text-gray-600">
            Fill in your travel details and we’ll get back to you soon.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Package Name (Read-only) */}
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              readOnly
              className="input input-bordered w-full border-gray-300 bg-gray-100 cursor-not-allowed"
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => {
                // Allow only A–Z, a–z, space, apostrophe, and hyphen
                const onlyText = e.target.value.replace(/[^a-zA-Z\s'-]/g, "");
                setFormData({ ...formData, name: onlyText });
              }}
              className="input input-bordered w-full border-gray-300"
              required
            />


            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full border-gray-300"
              required
            />

            {/* Country Code + Phone */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                disabled={detectingCountry}
                className="select border-none bg-gray-100 text-sm w-28 pr-0"
                required
              >
                {detectingCountry && <option>Detecting...</option>}
                {countryCodes.map((c) => (
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
                className="input border-none w-full focus:outline-none"
                required
                maxLength={10}
                inputMode="numeric"
              />
            </div>

            <input
              type="text"
              name="city"
              placeholder="Your City"
              value={formData.city}
              onChange={(e) => {
                // Allows basic international characters (Latin accents)
                const onlyText = e.target.value.replace(/[^a-zA-ZÀ-ž\s'-]/g, "");
                setFormData({ ...formData, city: onlyText });
              }}
              className="input input-bordered w-full border-gray-300"
              required
            />


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



            {/* Travelers Section */}
            <div className="border border-gray-300 rounded-lg p-4">
              <label className="font-medium text-gray-700 mb-2 block">
                Number of Travelers
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["adults", "children", "infants"].map((type) => (
                  <div key={type} className="flex flex-col items-center">
                    <span className="capitalize text-sm">{type}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleTravelerChange(
                            type as "adults" | "children" | "infants",
                            false
                          )
                        }
                        className="btn btn-square btn-xs border-gray-400 hover:bg-gray-200"
                      >
                        –
                      </button>
                      <span className="text-lg font-semibold w-6 text-center">
                        {formData[type as keyof typeof formData]}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleTravelerChange(
                            type as "adults" | "children" | "infants",
                            true
                          )
                        }
                        className="btn btn-square btn-xs border-gray-400 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered textarea-lg w-full border-gray-300"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-[#025C7A] rounded-[41px] text-white px-10 mt-4 hover:bg-[#6E9753] transition-all duration-300 uppercase"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </>
  );
}