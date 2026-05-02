import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

export const MenuDialog = ({ open, onOpenChange }) => {
  const pdfUrl = "/carta-zen-marinero.pdf";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="menu-dialog"
        className="bg-[#FDFBF7] border-[#2C2A29]/10 max-w-4xl h-[85vh] rounded-none p-0 flex flex-col"
      >
        <DialogHeader className="px-6 py-4 border-b border-[#2C2A29]/10 flex-row items-center justify-between">
          <DialogTitle className="font-serif text-2xl text-[#2C2A29]">
            La <span className="italic text-[#722F37]">Carta</span>
          </DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              data-testid="menu-download-btn"
              onClick={() => window.open(pdfUrl, "_blank")}
              className="rounded-none border-[#2C2A29] text-[#2C2A29] h-9"
            >
              <Download size={14} className="mr-2" /> Descargar
            </Button>
            <Button
              size="sm"
              data-testid="menu-openpdf-btn"
              onClick={() => window.open(pdfUrl, "_blank")}
              className="bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-9"
            >
              <ExternalLink size={14} className="mr-2" /> Abrir PDF
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-[#F2EAE0] p-6 md:p-10">
          <div className="max-w-2xl mx-auto bg-[#FDFBF7] p-8 md:p-12 shadow-sm">
            <p className="text-xs tracking-[0.25em] uppercase text-[#722F37] font-semibold text-center">
              <span className="ornament-line" /> Carta de temporada <span className="ornament-line" />
            </p>
            <h3 className="font-serif text-4xl text-[#2C2A29] text-center mt-4 mb-10">
              Zen <span className="italic">Marinero</span>
            </h3>

            <Section title="Para compartir">
              <Item name="Papas arrugadas con mojo rojo y verde" price="7,50 €" />
              <Item name="Queso de cabra majorero, miel de palma" price="11 €" />
              <Item name="Croquetas de sancocho" price="9 €" />
              <Item name="Pulpo a la brasa, alioli de ajo negro" price="18 €" />
            </Section>

            <Section title="Del mar">
              <Item
                name="Vieja frita, mojo hervido y cebolla encurtida"
                desc="pescada en la isla"
                price="24 €"
              />
              <Item name="Sama al horno con papas panadera" price="26 €" />
              <Item name="Arroz marinero (mín. 2 personas · pp)" price="22 €" />
              <Item name="Pescado del día a la sal" price="SM" />
            </Section>

            <Section title="De tierra">
              <Item name="Cabrito al horno con mojo palmero" price="23 €" />
              <Item name="Garbanzada canaria" price="14 €" />
              <Item name="Berenjena ahumada, gofio y miel de tedera" price="13 €" />
            </Section>

            <Section title="Postres">
              <Item name="Bienmesabe casero con helado de gofio" price="7 €" />
              <Item name="Frangollo de la abuela" price="6,50 €" />
              <Item name="Queso fresco con miel de palma" price="6 €" />
            </Section>

            <p className="text-center text-xs text-[#2C2A29]/60 mt-10 italic">
              La carta cambia según lo que traiga el muelle.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h4 className="font-serif text-2xl text-[#722F37] border-b border-[#2C2A29]/20 pb-2 mb-4">
      {title}
    </h4>
    <ul className="space-y-3">{children}</ul>
  </div>
);

const Item = ({ name, desc, price }) => (
  <li className="flex justify-between gap-6 items-baseline">
    <div className="flex-1">
      <p className="text-[#2C2A29]">{name}</p>
      {desc && <p className="text-xs text-[#2C2A29]/60 italic">{desc}</p>}
    </div>
    <span className="font-serif text-lg text-[#722F37] whitespace-nowrap">{price}</span>
  </li>
);
