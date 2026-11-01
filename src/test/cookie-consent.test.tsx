import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

const scripts = () => document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');

describe("Consent-gated GA4", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST12345");
    vi.stubEnv("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY", "");
  });

  afterEach(() => {
    cleanup();
    scripts().forEach((script) => script.remove());
    delete window.dataLayer;
    delete window.gtag;
    vi.unstubAllEnvs();
  });

  it("makes no Google initialization before an explicit accept click", () => {
    render(<CookieConsentBanner />);
    expect(scripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
  });

  it("loads and configures the environment's stream only after acceptance", () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Прийняти всі" }));
    expect(localStorage.getItem("als_cookie_consent")).toBe("accepted");
    expect(scripts()).toHaveLength(1);
    expect(scripts()[0].getAttribute("src")).toBe("https://www.googletagmanager.com/gtag/js?id=G-TEST12345");
    expect(window.dataLayer?.map((entry) => Array.from(entry as IArguments))).toContainEqual(["config", "G-TEST12345"]);
  });

  it("does not initialize analytics when declined", () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Відхилити" }));
    expect(localStorage.getItem("als_cookie_consent")).toBe("declined");
    expect(scripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
  });

  it("does not initialize from a stored choice without clicking", () => {
    localStorage.setItem("als_cookie_consent", "accepted");
    render(<CookieConsentBanner />);
    expect(scripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
  });

  it("does not load Google when no Measurement ID is configured", () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Прийняти всі" }));
    expect(scripts()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
  });

  it("uses the connected browser tracking ID as a fallback", () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    vi.stubEnv("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY", "G-CONNECT123");
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Прийняти всі" }));
    expect(scripts()[0]?.getAttribute("src")).toBe("https://www.googletagmanager.com/gtag/js?id=G-CONNECT123");
  });

  it("does not inject a second script after repeated acceptance", () => {
    const first = render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Прийняти всі" }));
    first.unmount();
    localStorage.clear();
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Прийняти всі" }));
    expect(scripts()).toHaveLength(1);
    expect(window.dataLayer?.map((entry) => Array.from(entry as IArguments)).filter((entry) => entry[0] === "config")).toHaveLength(1);
  });
});