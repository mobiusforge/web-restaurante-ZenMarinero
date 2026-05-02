import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=Hola%20Zen%20Marinero%2C%20me%20gustar%C3%ADa%20...`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#1ea855] transition-all duration-300"
    >
      <MessageCircle size={22} />
    </a>
  );
};
