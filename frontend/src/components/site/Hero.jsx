import { Button } from "@/components/ui/button";
import { HERO_IMAGE, BRAND } from "@/lib/constants";
import { ArrowDown } from "lucide-react";

export const Hero = ({ onReserve, onViewMenu }) => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden"
    >
      <img
        src={HERO_IMAGE}
        alt="Interior de Zen Marinero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-28 pt-32">
        <div className="max-w-4xl">
          <p className="text-xs tracking-[0.3em] uppercase text-[#FDFBF7]/90 mb-6 reveal in-view">
            <span className="ornament-line" /> {BRAND.city} · {BRAND.island}
          </p>
          <h1
            data-testid="hero-title"
            className="font-serif text-[#FDFBF7] text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight reveal in-view delay-100"
          >
            Cocina de barrio
            <br />
            con <span className="italic">alma contemporánea</span>.
          </h1>
          <p className="mt-8 text-[#FDFBF7]/90 text-base md:text-lg max-w-xl leading-relaxed reveal in-view delay-200">
            Una taberna marinera en el corazón de La Graciosa. Producto del Atlántico, mercado diario y las recetas de siempre, contadas de nuevo.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal in-view delay-300">
            <Button
              data-testid="hero-reserve-btn"
              onClick={onReserve}
              className="bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-12 px-8 text-xs tracking-wider uppercase"
            >
              Reservar mesa
            </Button>
            <Button
              data-testid="hero-view-menu-btn"
              onClick={onViewMenu}
              variant="outline"
              className="bg-transparent border-[#FDFBF7] text-[#FDFBF7] hover:bg-[#FDFBF7] hover:text-[#2C2A29] rounded-none h-12 px-8 text-xs tracking-wider uppercase"
            >
              Ver carta
            </Button>
          </div>
        </div>

        <a
          href="#somos"
          aria-label="Scroll"
          className="hidden md:flex absolute right-10 bottom-10 items-center gap-3 text-[#FDFBF7]/80 text-xs tracking-[0.2em] uppercase"
        >
          <span>Descubre</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};
