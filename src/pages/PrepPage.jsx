import { useState } from "react";
import { CheckCircle2, Circle, FileText, Plug, Umbrella, Backpack } from "lucide-react";

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
      { id: "passport", text: "Pasaporte en vigor (mínimo 6 meses de validez restante)" },
      { id: "eta", text: "Japan eTA / visa de turista tramitada" },
      { id: "insurance", text: "Seguro de viaje contratado — llevar el número de póliza a mano" },
      { id: "flights", text: "Confirmación de vuelos (Qatar Airways QR148 / QR809) impresa o en el móvil" },
      { id: "hotels", text: "Confirmaciones de todos los alojamientos (con PIN de reserva)" },
      { id: "jrpass", text: "JR Pass — reservar/activar antes del viaje si aplica" },
      { id: "license", text: "Carnet de conducir internacional (si se va a alquilar algo)" },
    ],
  },
  {
    id: "tech",
    title: "Electrónica y adaptadores",
    icon: Plug,
    color: "#1d3557",
    items: [
      { id: "adapter", text: "Adaptador de enchufe tipo A (Japón usa el mismo que EEUU, 100V — España necesita adaptador de clavija)" },
      { id: "powerbank", text: "Batería externa (power bank) cargada" },
      { id: "simcard", text: "SIM/eSIM japonesa o router WiFi de bolsillo reservado" },
      { id: "camera", text: "Cámara / memoria extra si no usáis solo el móvil" },
      { id: "chargers", text: "Cargadores de móvil y cables" },
    ],
  },
  {
    id: "clothes",
    title: "Ropa y equipaje",
    icon: Backpack,
    color: "#2e7d5b",
    items: [
      { id: "layers", text: "Ropa por capas — septiembre en Japón sigue siendo caluroso y húmedo (25–30°C)" },
      { id: "rain", text: "Chubasquero ligero o paraguas plegable (temporada de lluvias/tifones)" },
      { id: "shoes", text: "Calzado cómodo para caminar mucho — se anda muchísimo cada día" },
      { id: "onsen", text: "Ropa fácil de quitar/poner si vais a un onsen (baño termal)" },
      { id: "formal", text: "Un outfit algo más arreglado por si hay cena especial" },
      { id: "luggage", text: "Maleta que quepa bien en los trenes — pasillos y compartimentos son estrechos" },
    ],
  },
  {
    id: "extras",
    title: "Extras útiles",
    icon: Umbrella,
    color: "#c9a227",
    items: [
      { id: "cash", text: "Efectivo en yenes — Japón sigue siendo muy dependiente del cash en sitios pequeños" },
      { id: "suica", text: "Tarjeta Suica/Pasmo (o Suica móvil en el iPhone) para transporte" },
      { id: "meds", text: "Medicación personal — llevar en el envase original con receta si es necesaria" },
      { id: "handkerchief", text: "Pañuelo/toallita de mano — muchos baños públicos no tienen secador ni papel" },
      { id: "snacks", text: "Snacks para el Shinkansen — los trayectos largos se agradecen con algo de picar" },
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
    <div className="px-4 pt-6 pb-12 max-w-3xl mx-auto">
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

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const sectionChecked = section.items.filter(i => checked[i.id]).length;
          return (
            <div key={section.id} className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
              {/* header */}
              <div className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid var(--line)" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${section.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={18} style={{ color: section.color }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{section.title}</p>
                </div>
                <span style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 500 }}>
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
