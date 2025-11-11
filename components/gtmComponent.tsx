"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { pageview } from "../lib/gtm";

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    pageview(pathname);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer!.push(...args);
    };

    const consentGiven = getCookie("consent");

    if (consentGiven === "true") {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });
    } else {
      gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
      });
    }

    if (!document.getElementById("gtm-script")) {
      const script = document.createElement("script");
      script.id = "gtm-script";
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-N77ZQ757";
      document.head.appendChild(script);
    }

    const updateConsent = () => {
      gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });

      gtag("event", "cookie_consent_given");
    };

    window.addEventListener("updateGTMConsent", updateConsent);

    return () => {
      window.removeEventListener("updateGTMConsent", updateConsent);
    };
  }, [pathname, searchParams]);

  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-N77ZQ757"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
