import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, MessageCircle, Instagram, Mail } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export const Visit = ({ onContact }) => {
  const { ref, visible } = useReveal();
  return (
    <section
      id="visitanos"
      ref={ref}
      data-testid="visit-section"
      className="py-24 md:py-32 bg-[#FDFBF7]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <p className={`text-xs tracking-[0.25em] uppercase text-[#722F37] font-semibold ${visible ? "reveal in-view" : "reveal"}`}>
              <span className="ornament-line" /> Visítanos
            </p>
            <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A29] leading-[1.05] tracking-tight mt-6 ${visible ? "reveal in-view delay-100" : "reveal"}`}>
              Frente al mar, <em className="italic">te esperamos</em>.
            </h2>

            <div className={`mt-10 space-y-8 ${visible ? "reveal in-view delay-200" : "reveal"}`}>
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[#722F37] mt-1 shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#2C2A29]/60 mb-1">Dirección</p>
                  <p className="text-base text-[#2C2A29]">{BRAND.address}</p>
                  <a
                    href={BRAND.maps}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="maps-link"
                    className="inline-block mt-2 link-underline text-sm text-[#722F37]"
                  >
                    Cómo llegar →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={20} className="text-[#722F37] mt-1 shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#2C2A29]/60 mb-1">Teléfono</p>
                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    data-testid="phone-link"
                    className="text-base text-[#2C2A29] hover:text-[#722F37]"
                  >
                    {BRAND.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock size={20} className="text-[#722F37] mt-1 shrink-0" />
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#2C2A29]/60 mb-2">Horario</p>
                  <ul className="space-y-1 text-sm text-[#2C2A29]">
                    {BRAND.schedule.map((d) => (
                      <li key={d.day} className="flex justify-between gap-8 min-w-[220px]">
                        <span className="text-[#2C2A29]/70">{d.day}</span>
                        <span>{d.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  data-testid="whatsapp-cta-btn"
                  onClick={() =>
                    window.open(`https://wa.me/${BRAND.whatsapp}`, "_blank")
                  }
                  className="bg-[#25D366] hover:bg-[#1ea855] text-white rounded-none h-11 px-5 text-xs tracking-wider uppercase"
                >
                  <MessageCircle size={14} className="mr-2" /> WhatsApp
                </Button>
                <Button
                  data-testid="instagram-cta-btn"
                  variant="outline"
                  onClick={() => window.open(BRAND.instagram, "_blank")}
                  className="border-[#2C2A29] text-[#2C2A29] hover:bg-[#2C2A29] hover:text-[#FDFBF7] rounded-none h-11 px-5 text-xs tracking-wider uppercase"
                >
                  <Instagram size={14} className="mr-2" /> Instagram
                </Button>
                <Button
                  data-testid="contact-open-btn"
                  variant="outline"
                  onClick={onContact}
                  className="border-[#2C2A29] text-[#2C2A29] hover:bg-[#2C2A29] hover:text-[#FDFBF7] rounded-none h-11 px-5 text-xs tracking-wider uppercase"
                >
                  <Mail size={14} className="mr-2" /> Escríbenos
                </Button>
              </div>
            </div>
          </div>

          <div className={`col-span-12 md:col-span-7 ${visible ? "reveal in-view delay-300" : "reveal"}`}>
            <div className="aspect-[4/5] md:aspect-[4/5] w-full overflow-hidden border border-[#2C2A29]/10">
              <iframe
                title="Zen Marinero en Google Maps"
                src={BRAND.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="maps-iframe"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
