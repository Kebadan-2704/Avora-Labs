import type { Metadata } from "next";
import "./globals.css";
import BookingWidget from "@/components/chat/BookingWidget";
import MobileDynamicIsland from "@/components/navigation/MobileDynamicIsland";
import { CursorProvider } from "@/providers/CursorProvider";

export const metadata: Metadata = {
  title: "Avora Labs | Engineering Digital Excellence",
  description:
    "We engineer software that scales revenue. An elite digital agency specializing in bespoke web development, AI architecture, and enterprise software.",
  keywords: [
    "top web development agency India",
    "AI automation startup Coimbatore",
    "best software engineering agency",
    "enterprise software development",
    "bespoke web applications",
    "Next.js developers India",
    "UI/UX design agency",
    "cloud infrastructure services",
    "Avora Labs",
    "software development company Coimbatore",
  ],
  authors: [{ name: "Avora Labs" }],
  creator: "Avora Labs",
  metadataBase: new URL("https://avora-labs.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://avora-labs.vercel.app",
    siteName: "Avora Labs",
    title: "Avora Labs | Engineering Digital Excellence",
    description:
      "We engineer software that scales revenue. An elite digital agency.",
    images: [
      {
        url: "/Transparent Logo.png",
        width: 1200,
        height: 630,
        alt: "Avora Labs — Engineering Digital Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avora Labs",
    description: "We engineer software that scales revenue.",
    images: ["/Transparent Logo.png"],
    creator: "@avoralabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Avora Labs",
    url: "https://avora-labs.vercel.app",
    logo: "https://avora-labs.vercel.app/Transparent%20Logo.png",
    image: "https://avora-labs.vercel.app/Transparent%20Logo.png",
    description:
      "Premium software engineering and AI automation agency based in India. We engineer bespoke web platforms, mobile apps, and enterprise architecture.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN"
    },
    telephone: "+91-94434-37081",
    priceRange: "$$",
    sameAs: [
      "https://linkedin.com/company/avoralabs",
      "https://twitter.com/avoralabs",
      "https://instagram.com/avoralabs",
      "https://github.com/avoralabs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@avoralabs.com",
      contactType: "sales",
      availableLanguage: ["English"]
    },
    foundingDate: "2021",
    areaServed: ["IN", "US", "GB", "Worldwide"],
    serviceType: [
      "Web Development",
      "AI Chatbot Development",
      "Enterprise Software Architecture",
      "Business Automation",
      "SaaS Development",
      "UI/UX Design"
    ],
  };

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <CursorProvider>
          {/* Noise overlay — always visible */}
          <div className="noise-overlay" aria-hidden="true" />
          {children}
          <BookingWidget />
          <MobileDynamicIsland />
        </CursorProvider>
      </body>
    </html>
  );
}
