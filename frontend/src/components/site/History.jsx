import { useReveal } from "@/hooks/useReveal";

export const History = () => {
  const { ref, visible } = useReveal();
  return (
    <section
      id="historia"
      ref={ref}
      data-testid="history-section"
      className="py-24 md:py-40 bg-[#FDFBF7]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className={`text-xs tracking-[0.25em] uppercase text-[#722F37] font-semibold ${visible ? "reveal in-view" : "reveal"}`}>
            <span className="ornament-line" /> Historia
          </p>
        </div>
        <div className="col-span-12 md:col-span-9 space-y-8">
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] leading-[1.05] tracking-tight ${visible ? "reveal in-view delay-100" : "reveal"}`}>
            Un pequeño local, una <em className="italic">gran familia</em>.
          </h2>
          <div className={`grid md:grid-cols-2 gap-10 text-base md:text-lg leading-relaxed text-[#2C2A29]/80 ${visible ? "reveal in-view delay-200" : "reveal"}`}>
            <p>
              Zen Marinero nació en una casa baja de Caleta del Sebo, frente al mar que lo cambia todo. Lo empezamos con más sueños que sillas, convencidos de que La Graciosa merecía un sitio donde el producto hablase solo.
            </p>
            <p>
              Con los años hemos aprendido que este oficio no va de rapidez, sino de honestidad. De mirar a los ojos al pescador, al campesino, al comensal. Hoy seguimos en la misma esquina, con la misma plantilla pequeña y el mismo empeño: cocinar como si fuera para casa.
            </p>
          </div>
          <div className={`flex items-center gap-8 pt-4 ${visible ? "reveal in-view delay-300" : "reveal"}`}>
            <div>
              <p className="font-serif text-5xl text-[#722F37]">2014</p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#2C2A29]/60 mt-1">Primer servicio</p>
            </div>
            <div className="w-px h-12 bg-[#2C2A29]/20" />
            <div>
              <p className="font-serif text-5xl text-[#722F37]">0</p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#2C2A29]/60 mt-1">Km al muelle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
