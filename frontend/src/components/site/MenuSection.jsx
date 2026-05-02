import { Button } from "@/components/ui/button";
import { FEATURE_DISH } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";
import { FileText } from "lucide-react";

export const MenuSection = ({ onViewMenu }) => {
  const { ref, visible } = useReveal();
  return (
    <section
      id="carta"
      ref={ref}
      data-testid="menu-section"
      className="py-24 md:py-40 bg-[#F2EAE0]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8 md:gap-16 items-center">
        <div className={`col-span-12 md:col-span-6 ${visible ? "reveal in-view" : "reveal"}`}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={FEATURE_DISH}
              alt="Plato de temporada"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <p className={`text-xs tracking-[0.25em] uppercase text-[#722F37] font-semibold ${visible ? "reveal in-view delay-100" : "reveal"}`}>
            <span className="ornament-line" /> La carta
          </p>
          <h2 className={`font-serif text-4xl md:text-6xl text-[#2C2A29] leading-[1.05] tracking-tight mt-6 ${visible ? "reveal in-view delay-200" : "reveal"}`}>
            Cocina de <em className="italic">mercado</em>, producto local, temporada.
          </h2>
          <div className={`mt-8 space-y-5 text-base md:text-lg leading-relaxed text-[#2C2A29]/80 ${visible ? "reveal in-view delay-300" : "reveal"}`}>
            <p>
              Nuestra carta cambia al ritmo del muelle. Lo que hoy está en la mesa, ayer nadaba: mero, vieja, sama, pulpo. Papas arrugadas con mojo del abuelo, gofio escaldado y quesos de cabra de las medianías.
            </p>
            <p>
              Pocas recetas, mucha atención. Una selección corta de vinos canarios y de la península, y un postre que siempre pedirás dos veces.
            </p>
          </div>
          <div className={`mt-10 flex flex-wrap gap-4 ${visible ? "reveal in-view delay-400" : "reveal"}`}>
            <Button
              data-testid="menu-view-pdf-btn"
              onClick={onViewMenu}
              className="bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-12 px-8 text-xs tracking-wider uppercase"
            >
              <FileText size={14} className="mr-2" />
              Ver carta completa (PDF)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
