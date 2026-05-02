import { useEffect, useState } from "react";
import { Instagram, Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export const Header = ({ onReserve, onViewMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Somos", href: "#somos" },
    { label: "Carta", href: "#carta" },
    { label: "Historia", href: "#historia" },
    { label: "Galería", href: "#galeria" },
    { label: "Visítanos", href: "#visitanos" },
    { label: "Trabaja con nosotros", href: "#empleo" },
  ];

  return (
    <header
      data-testid="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2C2A29]/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        <a
          href="#top"
          data-testid="brand-logo"
          className="font-serif text-2xl md:text-3xl tracking-tight text-[#2C2A29] leading-none"
        >
          Zen <span className="italic text-[#722F37]">Marinero</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.href.replace("#", "")}`}
              className="link-underline text-sm tracking-wider uppercase text-[#2C2A29]/80 hover:text-[#722F37] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            data-testid="instagram-link"
            className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full border border-[#2C2A29]/20 text-[#2C2A29] hover:bg-[#722F37] hover:text-[#FDFBF7] hover:border-[#722F37] transition-all"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <Button
            data-testid="header-view-menu-btn"
            variant="outline"
            onClick={onViewMenu}
            className="hidden sm:inline-flex border-[#2C2A29] text-[#2C2A29] hover:bg-[#2C2A29] hover:text-[#FDFBF7] rounded-none h-10 px-5 text-xs tracking-wider uppercase"
          >
            Ver carta
          </Button>
          <Button
            data-testid="header-reserve-btn"
            onClick={onReserve}
            className="bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-10 px-5 text-xs tracking-wider uppercase"
          >
            Reservar mesa
          </Button>
          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#2C2A29]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-[#FDFBF7] border-t border-[#2C2A29]/10 px-6 py-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-2xl text-[#2C2A29] hover:text-[#722F37]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
