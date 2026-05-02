import { BRAND } from "@/lib/constants";
import { Instagram } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="footer-section"
      className="relative bg-[#1a1918] text-[#FDFBF7] pt-24 pb-10 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 font-serif text-[20vw] leading-[0.8] text-[#FDFBF7]/[0.04] whitespace-nowrap text-center tracking-tighter select-none"
      >
        Zen Marinero
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#FDFBF7]/10">
          <div className="md:col-span-2">
            <p className="font-serif text-3xl">
              Zen <span className="italic text-[#B58E94]">Marinero</span>
            </p>
            <p className="mt-4 text-sm text-[#FDFBF7]/60 max-w-sm leading-relaxed">
              Taberna marinera en Caleta del Sebo, La Graciosa. Cocina de barrio con alma contemporánea.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#FDFBF7]/50 mb-4">Contacto</p>
            <ul className="space-y-2 text-sm">
              <li className="text-[#FDFBF7]/80">{BRAND.address}</li>
              <li>
                <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-[#B58E94]">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="hover:text-[#B58E94]">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#FDFBF7]/50 mb-4">Síguenos</p>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-[#B58E94]"
              data-testid="footer-instagram"
            >
              <Instagram size={16} /> {BRAND.instagramHandle}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-[#FDFBF7]/50">
          <p>© {year} Zen Marinero. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FDFBF7]">Aviso legal</a>
            <a href="#" className="hover:text-[#FDFBF7]">Política de privacidad</a>
            <a href="#" className="hover:text-[#FDFBF7]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
