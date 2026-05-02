import { useReveal } from "@/hooks/useReveal";

export const About = () => {
  const { ref, visible } = useReveal();

  return (
    <section
      id="somos"
      ref={ref}
      data-testid="about-section"
      className="py-24 md:py-40 bg-[#FDFBF7]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4">
          <p className={`text-xs tracking-[0.25em] uppercase text-[#722F37] font-semibold ${visible ? "reveal in-view" : "reveal"}`}>
            <span className="ornament-line" /> Somos
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] leading-[1.05] tracking-tight mt-6 ${visible ? "reveal in-view delay-100" : "reveal"}`}>
            Un restaurante de <em className="italic">barrio</em>.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6">
          <p className={`font-serif text-2xl md:text-3xl leading-snug text-[#2C2A29] ${visible ? "reveal in-view delay-200" : "reveal"}`}>
            En Caleta del Sebo, donde el océano manda y el reloj se olvida, abrimos cada día con las manos llenas de mar y la misma ilusión del primer servicio.
          </p>
          <p className={`text-base md:text-lg leading-relaxed text-[#2C2A29]/80 ${visible ? "reveal in-view delay-300" : "reveal"}`}>
            No somos un restaurante cualquiera: somos el bar al que se asoma el vecino, la mesa larga de los domingos y el refugio del viajero que llegó buscando algo distinto. Cocinamos con el producto que trae el muelle, con las verduras de la huerta canaria y con el tiempo que pide cada guiso. Lento, honesto, cercano.
          </p>
          <p className={`text-base md:text-lg leading-relaxed text-[#2C2A29]/80 ${visible ? "reveal in-view delay-400" : "reveal"}`}>
            Aquí no hay modas: hay memoria, cariño y un punto de sal. Porque la cocina de barrio no se inventa — se hereda, se respeta y, si uno quiere, se reinventa con alma.
          </p>
        </div>
      </div>
    </section>
  );
};
