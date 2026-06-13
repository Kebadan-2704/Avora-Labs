"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import Loader from "@/components/loader/Loader";
import Navigation from "@/components/navigation/Navigation";
import HeroSection from "@/components/hero/HeroSection";

// Dynamic imports for below-fold sections (code splitting)
const PortfolioSection = dynamic(
  () => import("@/components/portfolio/PortfolioSection"),
  { ssr: false }
);
const ServicesSection = dynamic(
  () => import("@/components/services/ServicesSection"),
  { ssr: false }
);
const ProcessSection = dynamic(
  () => import("@/components/process/ProcessSection"),
  { ssr: false }
);
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  ssr: false,
});
const TechnologySection = dynamic(
  () => import("@/components/technology/TechnologySection"),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/contact/ContactSection"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScrollProvider>
      {/* Loader */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main content */}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        <Navigation />

        <main>
          {/* New section order: Show → Tell → Prove → Close */}
          <HeroSection />
          <PortfolioSection />
          <ServicesSection />
          <ProcessSection />
          <AboutSection />
          <TechnologySection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
