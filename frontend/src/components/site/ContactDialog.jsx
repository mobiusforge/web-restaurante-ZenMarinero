import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ContactDialog = ({ open, onOpenChange }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Completa los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("¡Gracias! Te respondemos lo antes posible.");
      onOpenChange(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("No pudimos enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="contact-dialog"
        className="bg-[#FDFBF7] border-[#2C2A29]/10 max-w-lg rounded-none"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl text-[#2C2A29]">
            Escríbe<span className="italic text-[#722F37]">nos</span>
          </DialogTitle>
          <DialogDescription className="text-[#2C2A29]/70">
            Preguntas, eventos privados, prensa o cualquier cosa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 pt-2">
          <Input
            data-testid="contact-name-input"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              data-testid="contact-email-input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
            />
            <Input
              data-testid="contact-phone-input"
              placeholder="Teléfono (opcional)"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
            />
          </div>
          <Textarea
            data-testid="contact-message-input"
            placeholder="Tu mensaje"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={5}
            className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37] resize-none"
          />
          <Button
            type="submit"
            disabled={loading}
            data-testid="contact-submit-btn"
            className="w-full bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-12 text-xs tracking-wider uppercase"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
