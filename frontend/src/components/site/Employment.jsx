import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Employment = () => {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (cv) fd.append("cv", cv);
      await axios.post(`${API}/jobs`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("¡Gracias! Hemos recibido tu candidatura.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setCv(null);
    } catch (err) {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="empleo"
      ref={ref}
      data-testid="employment-section"
      className="py-24 md:py-32 bg-[#2C2A29] text-[#FDFBF7]"
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <p className={`text-xs tracking-[0.25em] uppercase text-[#B58E94] font-semibold ${visible ? "reveal in-view" : "reveal"}`}>
            <span className="ornament-line" /> Empleo
          </p>
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mt-6 ${visible ? "reveal in-view delay-100" : "reveal"}`}>
            Trabaja con <em className="italic">nosotros</em>.
          </h2>
          <p className={`mt-6 text-[#FDFBF7]/70 leading-relaxed ${visible ? "reveal in-view delay-200" : "reveal"}`}>
            Siempre estamos atentos a quienes aman este oficio. Si sientes que tu sitio está en sala, cocina o bar — déjanos tu CV y unas líneas sobre ti.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          data-testid="employment-form"
          className={`col-span-12 md:col-span-7 space-y-6 ${visible ? "reveal in-view delay-300" : "reveal"}`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-[#FDFBF7]/60 mb-2 block">Nombre</label>
              <input
                data-testid="job-name-input"
                name="name"
                value={form.name}
                onChange={onChange}
                className="editorial-input w-full text-[#FDFBF7] border-b border-[#FDFBF7]/30 focus:border-[#B58E94]"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-[#FDFBF7]/60 mb-2 block">Email</label>
              <input
                data-testid="job-email-input"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="editorial-input w-full text-[#FDFBF7] border-b border-[#FDFBF7]/30 focus:border-[#B58E94]"
              />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-[#FDFBF7]/60 mb-2 block">Teléfono</label>
            <input
              data-testid="job-phone-input"
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="editorial-input w-full text-[#FDFBF7] border-b border-[#FDFBF7]/30 focus:border-[#B58E94]"
            />
          </div>
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-[#FDFBF7]/60 mb-2 block">Cuéntanos sobre ti</label>
            <textarea
              data-testid="job-message-input"
              name="message"
              rows="4"
              value={form.message}
              onChange={onChange}
              className="editorial-input w-full text-[#FDFBF7] border-b border-[#FDFBF7]/30 focus:border-[#B58E94] resize-none"
            />
          </div>
          <div>
            <label
              className="flex items-center gap-3 text-sm text-[#FDFBF7]/70 hover:text-[#FDFBF7] cursor-pointer"
              data-testid="job-cv-label"
            >
              <Paperclip size={16} />
              <span>{cv ? cv.name : "Adjuntar CV (PDF, DOC)"}</span>
              <input
                type="file"
                data-testid="job-cv-input"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>
          <Button
            type="submit"
            disabled={loading}
            data-testid="job-submit-btn"
            className="bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-12 px-8 text-xs tracking-wider uppercase"
          >
            <Send size={14} className="mr-2" />
            {loading ? "Enviando..." : "Enviar candidatura"}
          </Button>
        </form>
      </div>
    </section>
  );
};
