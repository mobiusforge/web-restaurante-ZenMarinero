import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { MenuSection } from "@/components/site/MenuSection";
import { History } from "@/components/site/History";
import { Gallery } from "@/components/site/Gallery";
import { Visit } from "@/components/site/Visit";
import { Employment } from "@/components/site/Employment";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ReservationDialog } from "@/components/site/ReservationDialog";
import { ContactDialog } from "@/components/site/ContactDialog";
import { MenuDialog } from "@/components/site/MenuDialog";
import { BRAND } from "@/lib/constants";

export default function Home() {
  const [resOpen, setResOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = `Zen Marinero · Restaurante en ${BRAND.city}, ${BRAND.island}`;
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.name = "description";
    meta.content = `Zen Marinero — restaurante de barrio en ${BRAND.city}, La Graciosa (${BRAND.region}). Cocina de mercado, producto local y platos de temporada. Reserva tu mesa.`;
    document.head.appendChild(meta);

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: BRAND.name,
      image: ["https://images.unsplash.com/photo-1718939044138-5b76d9dd938b"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "C. García Escámez, 14",
        addressLocality: BRAND.city,
        addressRegion: BRAND.region,
        postalCode: "35540",
        addressCountry: "ES",
      },
      telephone: BRAND.phone,
      servesCuisine: ["Canaria", "Marinera", "De mercado"],
      priceRange: "€€",
      url: window.location.origin,
      sameAs: [BRAND.instagram],
    });
    document.head.appendChild(jsonLd);

    return () => {
      jsonLd.remove();
    };
  }, []);

  return (
    <>
      <Header
        onReserve={() => setResOpen(true)}
        onViewMenu={() => setMenuOpen(true)}
      />
      <Hero
        onReserve={() => setResOpen(true)}
        onViewMenu={() => setMenuOpen(true)}
      />
      <About />
      <MenuSection onViewMenu={() => setMenuOpen(true)} />
      <History />
      <Gallery />
      <Visit onContact={() => setContactOpen(true)} />
      <Employment />
      <Footer />
      <WhatsAppButton />

      <ReservationDialog open={resOpen} onOpenChange={setResOpen} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
      <MenuDialog open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
