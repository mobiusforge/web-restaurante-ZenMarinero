import { GALLERY } from "@/lib/constants";
import { useReveal } from "@/hooks/useReveal";

export const Gallery = () => {
  const { ref, visible } = useReveal();
  return (
    <section
      id="galeria"
      ref={ref}
      data-testid="image-gallery"
      className="py-24 md:py-32 bg-[#F2EAE0]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className={`text-xs tracking-[0.25em] uppercase text-[#722F37] font-semibold ${visible ? "reveal in-view" : "reveal"}`}>
              <span className="ornament-line" /> Galería
            </p>
            <h2 className={`font-serif text-4xl md:text-6xl text-[#2C2A29] leading-[1.05] tracking-tight mt-4 ${visible ? "reveal in-view delay-100" : "reveal"}`}>
              Un instante en <em className="italic">Zen Marinero</em>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[260px]">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className={`gallery-item ${g.span} ${visible ? `reveal in-view` : "reveal"}`}
              style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={g.url}
                alt={g.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
