import { useCallback } from "react";
import ReactGA from "react-ga4";

// Utility: Get UTM params from current URL
const getUTMParams = () => {
  if (typeof window === "undefined") return {};
  const urlParams = new URLSearchParams(window.location.search);

  const getParam = (keys) => {
    for (const key of keys) {
      const val = urlParams.get(key);
      if (val) return val;
    }
    return null;
  };

  return {
    utm_source: getParam(["utm_source", "utmSource"]),
    utm_medium: getParam(["utm_medium", "utmMedium"]),
    utm_campaign: getParam(["utm_campaign", "utmCampaign"]),
    utm_campaign: getParam(["utm_keyword", "utmKeyword"]),
    utm_term: getParam(["utm_term", "utmTerm"]),
    utm_content: getParam(["utm_content", "utmContent"]),
  };
};


export const useLeadTracking = () => {
  const utmParams = getUTMParams();

  const trackButtonClick = useCallback(
    (source, action, label, propertyType = null) => {
      ReactGA.gtag("event", action, {
        event_category: "Button Click",
        event_label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
        lead_source: source,
        property_type: propertyType,
        funnel_stage: "interest",
        ...utmParams,
      });
    },
    [utmParams]
  );

  const trackFormSubmission = useCallback(
    (source, formType, propertyType = null) => {
      ReactGA.gtag("event", `${formType}_submit`, {
        event_category: "Form Submission",
        event_label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
        lead_source: source,
        property_type: propertyType,
        funnel_stage:
          formType === "contact_form" ? "lead" : "site_visit_request",
        ...utmParams,
      });
    },
    [utmParams]
  );

  const trackFormOpen = useCallback(
    (source, formType, propertyType = null) => {
      const normalize = (str) =>
        (str || "")
          .toLowerCase()
          .replace(/[_\s]+/g, "")
          .trim();

      ReactGA.gtag("event", `${formType}_opened`, {
        event_category: "Form Interaction",
        event_label:
          propertyType && !normalize(source).includes(normalize(propertyType))
            ? `${source} - ${propertyType}`
            : source,
        lead_source: source,
        property_type: propertyType,
        funnel_stage: "consideration",
        ...utmParams,
      });
    },
    [utmParams]
  );

  return {
    trackButtonClick,
    trackFormSubmission,
    trackFormOpen,
  };
};

// Lead source constants
export const LEAD_SOURCES = {
  HERO: "hero_banner",
  OVERVIEW: "overview_section",
  PRICING_2BHK: "pricing_2BHK",
  PRICING_3BHK: "pricing_3BHK",
  PRICING_4BHK: "pricing_4BHK",
  MASTER_PLAN: "master_plan_section",
  FOOTER: "footer_section",
  CONTACT_FORM_LINK: "contact_form_internal_link",
  UNKNOWN: "unknown_source",
};

// Property types
export const PROPERTY_TYPES = {
  BHK2: "2BHK",
  BHK3: "3BHK",
  BHK4: "4BHK"
};
