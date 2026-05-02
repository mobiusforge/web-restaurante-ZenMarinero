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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const times = [];
for (let h = 8; h <= 17; h++) {
  times.push(`${String(h).padStart(2, "0")}:00`);
  times.push(`${String(h).padStart(2, "0")}:30`);
}

export const ReservationDialog = ({ open, onOpenChange }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "13:00",
    guests: "2",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      toast.error("Completa todos los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/reservations`, {
        ...form,
        guests: Number(form.guests),
      });
      toast.success("¡Reserva recibida! Te confirmaremos por teléfono.");
      onOpenChange(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "13:00",
        guests: "2",
        notes: "",
      });
    } catch (err) {
      toast.error("No pudimos enviar la reserva. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="reservation-dialog"
        className="bg-[#FDFBF7] border-[#2C2A29]/10 max-w-lg rounded-none"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl text-[#2C2A29]">
            Reservar <span className="italic text-[#722F37]">mesa</span>
          </DialogTitle>
          <DialogDescription className="text-[#2C2A29]/70">
            Te confirmaremos por teléfono o WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 pt-2">
          <Input
            data-testid="res-name-input"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              data-testid="res-email-input"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
            />
            <Input
              data-testid="res-phone-input"
              placeholder="Teléfono"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input
              data-testid="res-date-input"
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37]"
            />
            <Select value={form.time} onValueChange={(v) => update("time", v)}>
              <SelectTrigger
                data-testid="res-time-select"
                className="rounded-none border-[#2C2A29]/30"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none max-h-60">
                {times.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={form.guests} onValueChange={(v) => update("guests", v)}>
              <SelectTrigger
                data-testid="res-guests-select"
                className="rounded-none border-[#2C2A29]/30"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} pers.
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            data-testid="res-notes-input"
            placeholder="Alergias o comentarios (opcional)"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            className="rounded-none border-[#2C2A29]/30 focus:border-[#722F37] resize-none"
          />
          <Button
            type="submit"
            disabled={loading}
            data-testid="res-submit-btn"
            className="w-full bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-12 text-xs tracking-wider uppercase"
          >
            {loading ? "Enviando..." : "Confirmar reserva"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
