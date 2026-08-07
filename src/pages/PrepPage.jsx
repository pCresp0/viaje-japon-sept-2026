import { useState } from "react";
import { CheckCircle2, Circle, FileText, Plug, Umbrella, Backpack, Droplets } from "lucide-react";

const STORAGE_KEY = "trip-checklist-v1";

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveChecked(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {}
}

const sections = [
  {
    id: "docs",
    title: "Documentación",
    icon: FileText,
    color: "#bc4749",
    items: [
      { id: "passport", text: "Pasaporte en vigor" },
      { id: "passport-copy", text: "Fotocopia del pasaporte" },
      { id: "insurance", text: "Seguro de viaje contratado — llevar el número de póliza a mano" },
      { id: "flights", text: "Confirmación de vuelos (Qatar Airways QR148 / QR809) impresa o en el móvil" },
      { id: "hotels", text: "Confirmaciones de todos los alojamientos (con PIN de reserva)" },
      { id: "jrpass", text: "JR Pass — reservar/activar antes del viaje si aplica" },
    ],
  },
  {
    id: "clothes",
    title: "Ropa",
    icon: Backpack,
    color: "#2e7d5b",
    items: [
      { id: "chubasquero", text: "Chubasquero" },
      { id: "sudaderas", text: "Sudaderas" },
      { id: "pantalones-cortos", text: "Pantalones cortos" },
      { id: "pantalones-largos", text: "Pantalones largos" },
      { id: "camisetas", text: "Camisetas" },
      { id: "calzoncillos", text: "Calzoncillos y calcetines" },
      { id: "chanclas", text: "Chanclas" },
      { id: "bañador", text: "Bañador" },
      { id: "pijama", text: "Pijama" },
      { id: "zapatillas", text: "Zapatillas" },
      { id: "botas-senderismo", text: "Botas de montaña o de senderismo" },
      { id: "cinturon", text: "Cinturón" },
      { id: "toalla", text: "Toalla" },
      { id: "bolsa-ropa-sucia", text: "Bolsa para la ropa sucia" },
    ],
  },
  {
    id: "tech",
    title: "Electrónica",
    icon: Plug,
    color: "#1d3557",
    items: [
      { id: "adaptador", text: "Adaptador de enchufe tipo A (Japón usa el mismo que EEUU, 100V)" },
      { id: "movil", text: "Móvil" },
      { id: "cargador-movil", text: "Cargador móvil" },
      { id: "reloj", text: "Reloj" },
      { id: "cargador-reloj", text: "Cargador del reloj" },
      { id: "baterias-externas", text: "Baterías externas (power bank)" },
      { id: "ebook", text: "eBook" },
      { id: "cascos", text: "Cascos" },
      { id: "simcard", text: "SIM/eSIM japonesa o router WiFi de bolsillo reservado" },
    ],
  },
  {
    id: "hygiene",
    title: "Aseo e higiene",
    icon: Droplets,
    color: "#c9a227",
    items: [
      { id: "cepillo-dientes", text: "Cepillo de dientes" },
      { id: "cargador-cepillo", text: "Cargador cepillo de dientes" },
      { id: "pasta-dientes", text: "Pasta de dientes" },
      { id: "afeitadora", text: "Afeitadora" },
      { id: "cargador-afeitadora", text: "Cargador afeitadora" },
      { id: "gel", text: "Gel / jabón" },
      { id: "champu", text: "Champú" },
      { id: "desodorante", text: "Desodorante" },
      { id: "colonia", text: "Colonia" },
      { id: "crema-labios", text: "Crema labios" },
      { id: "aparato-dental", text: "Aparato dental (si aplica)" },
      { id: "melatonina", text: "Melatonina (para el jet lag)" },
      { id: "pinzas", text: "Pinzas" },
      { id: "cortaunas", text: "Cortauñas" },
      { id: "antifaz", text: "Antifaz" },
      { id: "tapones-oidos", text: "Tapones para los oídos" },
      { id: "botiquin", text: "Mini botiquín" },
    ],
  },
  {
    id: "accessories",
    title: "Accesorios y otros",
    icon: Umbrella,
    color: "#2e7d5b",
    items: [
      { id: "gafas-leer", text: "Gafas de leer" },
      { id: "gafas-sol", text: "Gafas de sol" },
      { id: "cartera", text: "Cartera" },
      { id: "llaves", text: "Llaves" },
      { id: "escarpines", text: "Escarpines" },
      { id: "repelente-mosquitos", text: "Repelente de mosquitos" },
      { id: "aparato-mosquitos", text: "Aparato de los mosquitos" },
      { id: "dinero", text: "Dinero en efectivo (¥)" },
      { id: "suica", text: "Tarjeta Suica/Pasmo o eSIM Suica en el iPhone" },
    ],
  },
];

export default function PrepPage() {
  const [checked, setChecked] = useState(loadChecked);

  function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    saveChecked(next);
  }

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-2">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Antes del viaje</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Preparativos</h2>
      </div>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 24 }}>
        {totalChecked} de {totalItems} completados — se guarda automáticamente en tu dispositivo.
      </p>

      {/* progress bar */}
      <div style={{
        height: 6, borderRadius: 3, background: "var(--line)",
        overflow: "hidden", marginBottom: 32,
      }}>
        <div style={{
          height: "100%",
          width: `${(totalChecked / totalItems) * 100}%`,
          background: "var(--indigo)",
          transition: "width 0.3s ease",
        }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
        gap: 20,
        alignItems: "start",
      }}>
        {sections.map((section) => {
          const Icon = section.icon;
          const sectionChecked = section.items.filter(i => checked[i.id]).length;
          // Header background uses a slightly darker shade for colors that
          // don't have enough contrast with white text (e.g. gold/mustard).
          const headerBg = section.color === "#c9a227" ? "#8a6d1a" : section.color;
          return (
            <div key={section.id} className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
              {/* header */}
              <div className="flex items-center gap-3 px-5 py-4"
                style={{ background: headerBg }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color: "white" }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{section.title}</p>
                </div>
                <span style={{
                  fontSize: 11.5, color: "white", fontWeight: 700,
                  background: "rgba(255,255,255,0.18)",
                  padding: "3px 9px", borderRadius: 20,
                }}>
                  {sectionChecked}/{section.items.length}
                </span>
              </div>

              {/* items */}
              <div>
                {section.items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex items-start gap-3 w-full text-left px-5 py-3 transition-colors"
                    style={{
                      borderBottom: idx < section.items.length - 1 ? "1px solid var(--line)" : "none",
                      background: "transparent",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.015)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {checked[item.id]
                      ? <CheckCircle2 size={18} style={{ color: section.color, flexShrink: 0, marginTop: 1 }} />
                      : <Circle size={18} style={{ color: "var(--line)", flexShrink: 0, marginTop: 1 }} />
                    }
                    <span style={{
                      fontSize: 13.5, lineHeight: 1.5,
                      color: checked[item.id] ? "var(--ink-soft)" : "var(--ink)",
                      textDecoration: checked[item.id] ? "line-through" : "none",
                    }}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
