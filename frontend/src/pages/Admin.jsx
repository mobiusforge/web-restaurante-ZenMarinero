import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, LogOut } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "zm_admin_token";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState({ reservations: [], contacts: [], jobs: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) verify(token);
  }, []); // eslint-disable-line

  const verify = async (t) => {
    try {
      await axios.post(`${API}/admin/verify`, {}, { headers: { Authorization: `Bearer ${t}` } });
      localStorage.setItem(TOKEN_KEY, t);
      setAuthed(true);
      fetchAll(t);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setAuthed(false);
      toast.error("Token incorrecto");
    }
  };

  const fetchAll = async (t) => {
    setLoading(true);
    try {
      const h = { Authorization: `Bearer ${t}` };
      const [r, c, j] = await Promise.all([
        axios.get(`${API}/admin/reservations`, { headers: h }),
        axios.get(`${API}/admin/contacts`, { headers: h }),
        axios.get(`${API}/admin/jobs`, { headers: h }),
      ]);
      setData({ reservations: r.data, contacts: c.data, jobs: j.data });
    } catch {
      toast.error("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setToken("");
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#F2EAE0] p-8 md:p-12">
          <h1 className="font-serif text-4xl text-[#2C2A29] mb-2">
            Panel <span className="italic text-[#722F37]">Admin</span>
          </h1>
          <p className="text-sm text-[#2C2A29]/70 mb-8">Introduce el token de administración.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              verify(token);
            }}
            className="space-y-4"
          >
            <Label className="text-xs tracking-[0.2em] uppercase">Token</Label>
            <Input
              data-testid="admin-token-input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="rounded-none border-[#2C2A29]/30"
            />
            <Button
              data-testid="admin-login-btn"
              type="submit"
              className="w-full bg-[#722F37] hover:bg-[#5A1C24] text-[#FDFBF7] rounded-none h-11 text-xs tracking-wider uppercase"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <header className="border-b border-[#2C2A29]/10 bg-[#FDFBF7] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl">
            Zen <span className="italic text-[#722F37]">Marinero</span> · Admin
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAll(token)}
              className="rounded-none"
            >
              {loading ? "..." : "Recargar"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              data-testid="admin-logout-btn"
            >
              <LogOut size={14} className="mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Tabs defaultValue="reservations">
          <TabsList className="rounded-none bg-[#F2EAE0]">
            <TabsTrigger value="reservations" data-testid="tab-reservations">
              Reservas ({data.reservations.length})
            </TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">
              Contacto ({data.contacts.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" data-testid="tab-jobs">
              Empleo ({data.jobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="mt-6">
            <Table
              rows={data.reservations}
              columns={[
                ["Fecha", (r) => `${r.date} · ${r.time}`],
                ["Nombre", (r) => r.name],
                ["Pers.", (r) => r.guests],
                ["Email", (r) => r.email],
                ["Teléfono", (r) => r.phone],
                ["Notas", (r) => r.notes || "-"],
                ["Recibida", (r) => new Date(r.created_at).toLocaleString()],
              ]}
            />
          </TabsContent>
          <TabsContent value="contacts" className="mt-6">
            <Table
              rows={data.contacts}
              columns={[
                ["Nombre", (c) => c.name],
                ["Email", (c) => c.email],
                ["Teléfono", (c) => c.phone || "-"],
                ["Mensaje", (c) => c.message],
                ["Recibido", (c) => new Date(c.created_at).toLocaleString()],
              ]}
            />
          </TabsContent>
          <TabsContent value="jobs" className="mt-6">
            <Table
              rows={data.jobs}
              columns={[
                ["Nombre", (j) => j.name],
                ["Email", (j) => j.email],
                ["Teléfono", (j) => j.phone],
                ["Mensaje", (j) => j.message],
                [
                  "CV",
                  (j) =>
                    j.cv_filename ? (
                      <a
                        href={`${API}/admin/jobs/${j.id}/cv`}
                        onClick={(e) => {
                          e.preventDefault();
                          axios
                            .get(`${API}/admin/jobs/${j.id}/cv`, {
                              responseType: "blob",
                              headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((res) => {
                              const url = URL.createObjectURL(res.data);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = j.cv_filename;
                              a.click();
                            });
                        }}
                        className="inline-flex items-center gap-1 text-[#722F37] hover:underline"
                      >
                        <Download size={14} /> descargar
                      </a>
                    ) : (
                      "-"
                    ),
                ],
                ["Recibido", (j) => new Date(j.created_at).toLocaleString()],
              ]}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

const Table = ({ rows, columns }) => {
  if (!rows.length) {
    return <p className="text-sm text-[#2C2A29]/60 py-12 text-center">Sin registros.</p>;
  }
  return (
    <div className="overflow-x-auto border border-[#2C2A29]/10">
      <table className="w-full text-sm">
        <thead className="bg-[#F2EAE0]">
          <tr>
            {columns.map(([label]) => (
              <th key={label} className="text-left px-4 py-3 font-semibold text-xs tracking-wider uppercase text-[#2C2A29]/70">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[#2C2A29]/10 hover:bg-[#F2EAE0]/40">
              {columns.map(([label, fn]) => (
                <td key={label} className="px-4 py-3 align-top max-w-xs">
                  {fn(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
