import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Plug,
  Droplets,
  ChevronDown,
  Wallet,
  Shirt,
  Backpack,
  AlertCircle,
  RotateCcw,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

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

export const sections = [
  {
    id: "docs",
    title: "1. 🛂 Documentación, Dinero y Tarjetas",
    shortTitle: "Documentación y Dinero",
    subtitle: "Llevar siempre en el equipaje de mano / riñonera",
    icon: Wallet,
    color: "#bc4749",
    notice: "Llevar siempre en el equipaje de mano / riñonera accesible en todo momento.",
    items: [
      { id: "passport", text: "Pasaporte original en vigor (con vigencia superior a 6 meses)" },
      { id: "dni", text: "DNI original" },
      { id: "card-jrwest", text: "Tarjeta física bancaria de compra (imprescindible la tarjeta con la que se compraron billetes de JR-WEST para retirarlos en taquilla/máquina)" },
      { id: "revolut", text: "Tarjetas de viaje sin comisiones (Revolut / tarjetas de respaldo)" },
      { id: "cash", text: "Dinero en efectivo (Euros para cambiar o Yenes ya cambiados; en Japón sigue siendo necesario efectivo para buses locales como Magome-Nakatsugawa, templos, monedas de taquillas y konbinis pequeños)" },
      { id: "suica", text: "Tarjeta Suica / Pasmo (en el Apple Wallet o lista para adquirir versión física Welcome Suica en Narita)" },
      { id: "wallet", text: "Cartera" },
      { id: "keys", text: "Llaves de casa" },
      { id: "insurance", text: "Seguro de viaje contratado — llevar número de póliza y teléfono de asistencia médica 24h a mano" },
      { id: "confirmations", text: "Confirmaciones de vuelos (Qatar Airways QR148 / QR809) y reservas de hotel (guardadas offline en móvil)" },
    ],
  },
  {
    id: "clothes",
    title: "2. 👕 Ropa y Calzado",
    shortTitle: "Ropa y Calzado",
    subtitle: "Calor/humedad (~26–30°C), fresco en los Alpes y aire acondicionado fuerte",
    icon: Shirt,
    color: "#2e7d5b",
    notice: "En septiembre en Japón suele hacer calor y humedad (~26–30°C), pero refresca en los Alpes y hay aire acondicionado fuerte en trenes/interiores.",
    items: [
      { id: "camisetas", text: "8 Camisetas (transpirables y de secado rápido)" },
      { id: "pantalones-cortos", text: "2 Pantalones cortos" },
      { id: "pantalones-largos", text: "2 Pantalones largos (para templos, noches frescas o trenes)" },
      { id: "sudaderas", text: "2 Sudaderas" },
      { id: "pijama", text: "Pijama" },
      { id: "chubasquero", text: "Chubasquero / paraguas plegable compacto" },
      { id: "ropa-interior", text: "Calzoncillos / Ropa interior" },
      { id: "calcetines", text: "Calcetines (llevar suficientes y sin agujeros: en Japón te descalzas constantemente en templos, ryokans y restaurantes tradicionales)" },
      { id: "zapatillas-deporte", text: "Zapatillas de deporte para patear la ciudad (se caminan 15.000–25.000 pasos diarios)" },
      { id: "zapatillas-repuesto", text: "Zapatillas de repuesto para andar/paseo por la ciudad corto" },
      { id: "chanclas", text: "Chanclas" },
      { id: "banador", text: "Bañador (por si visitáis onsens mixtos, spa o zonas acuáticas)" },
      { id: "toalla", text: "Toalla (ligera de microfibra, importante para los templos, que hay que lavarse antes de entrar)" },
      { id: "cinturon", text: "Cinturón" },
      { id: "bolsa-ropa-sucia", text: "Bolsa para la ropa sucia" },
    ],
  },
  {
    id: "tech",
    title: "3. 🔌 Electrónica y Tecnología",
    shortTitle: "Electrónica y Tecnología",
    subtitle: "Baterías externas siempre en cabina, prohibidas en bodega",
    icon: Plug,
    color: "#1d3557",
    notice: "Atención: Las baterías externas (Power Banks) deben ir SIEMPRE en equipaje de mano; están prohibidas en bodega.",
    items: [
      { id: "movil", text: "Móvil" },
      { id: "cargador-movil", text: "Cargador del móvil + cables de repuesto" },
      { id: "baterias-externas", text: "Baterías externas (Power Banks) (capacidad recomendada 10.000–20.000 mAh; en cabina)" },
      { id: "adaptador", text: "Adaptador de enchufe Tipo A (clavijas planas paralelas de 2 patillas, estándar Japón/EE.UU., 100V)" },
      { id: "esim", text: "eSIM japonesa configurada / reservada (o Pocket WiFi)" },
      { id: "regleta", text: "Regleta / ladrón de enchufes" },
      { id: "reloj", text: "Reloj / Smartwatch" },
      { id: "cargador-reloj", text: "Cargador del reloj" },
      { id: "cascos", text: "Cascos / Auriculares (ideales con cancelación de ruido para los vuelos de 11h y 7h)" },
      { id: "ebook", text: "eBook / Lector digital" },
    ],
  },
  {
    id: "accessories",
    title: "4. 👓 Accesorios y Logística de Viaje",
    shortTitle: "Accesorios y Logística",
    subtitle: "Mochila pequeña para excursiones y tramo alpino",
    icon: Backpack,
    color: "#4a5568",
    notice: "Mochila pequeña imprescindible para la caminata Magome-Tsumago y para los 3-4 días en los Alpes sin las maletas grandes.",
    items: [
      { id: "gafas-ver", text: "Gafas de ver / leer" },
      { id: "gafas-sol", text: "Gafas de sol" },
      { id: "mochila-pequena", text: "Mochila pequeña (20–30 L)" },
      { id: "antifaz-tapones", text: "Antifaz y tapones para los oídos (para descansar en vuelos largos de 11h/7h y trenes)" },
    ],
  },
  {
    id: "hygiene",
    title: "5. 🧴 Aseo e Higiene Personal",
    shortTitle: "Aseo e Higiene",
    subtitle: "Líquidos en envases ≤100ml en cabina y botiquín",
    icon: Droplets,
    color: "#c9a227",
    notice: "Líquidos en equipaje de mano en recipientes de máx. 100 ml dentro de bolsa transparente con cierre.",
    items: [
      { id: "cepillo-dientes", text: "Cepillo de dientes" },
      { id: "cargador-cepillo", text: "Cargador del cepillo de dientes" },
      { id: "pasta-dientes", text: "Pasta de dientes" },
      { id: "afeitadora", text: "Afeitadora" },
      { id: "cargador-afeitadora", text: "Cargador de la afeitadora" },
      { id: "aparato-dental", text: "Aparato dental" },
      { id: "desodorante", text: "Desodorante" },
      { id: "colonia", text: "Colonia / Perfume" },
      { id: "crema-labios", text: "Crema o bálsamo labial (para el aire seco de los aviones)" },
      { id: "pinzas", text: "Pinzas" },
      { id: "cortaunas", text: "Cortauñas" },
      { id: "botiquin-medicacion", text: "Mini botiquín y medicación personal (pastillas habituales / tensión, melatonina para jet lag, analgésicos y tiritas)" },
      { id: "repelente-mosquitos", text: "Repelente de mosquitos (para senderos, valles y templos rodeados de bosque)" },
    ],
  },
];

export default function PrepPage() {
  const [checked, setChecked] = useState(loadChecked);
  const [openSections, setOpenSections] = useState(() =>
    sections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );

  function toggle(id) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    saveChecked(next);
  }

  function toggleSection(id) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll() {
    setOpenSections(sections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {}));
  }

  function collapseAll() {
    setOpenSections(sections.reduce((acc, s) => ({ ...acc, [s.id]: false }), {}));
  }

  function resetChecklist() {
    if (window.confirm("¿Seguro que quieres desmarcar todos los elementos de la maleta?")) {
      setChecked({});
      saveChecked({});
    }
  }

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const totalChecked = Object.values(checked).filter(Boolean).length;
  const progressPercent = Math.round((totalChecked / totalItems) * 100);

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Antes del viaje · Checklist</p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl" style={{ color: "var(--indigo)", margin: 0 }}>
              Maleta Japón 🇯🇵
            </h2>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "4px 0 0" }}>
              {totalChecked} de {totalItems} completados ({progressPercent}%) — se guarda automáticamente en tu dispositivo.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors"
              style={{
                borderColor: "var(--line)",
                background: "var(--paper-raised)",
                color: "var(--ink)",
              }}
              title="Desplegar todas las secciones"
            >
              <Maximize2 size={13} />
              <span>Desplegar</span>
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors"
              style={{
                borderColor: "var(--line)",
                background: "var(--paper-raised)",
                color: "var(--ink)",
              }}
              title="Plegar todas las secciones"
            >
              <Minimize2 size={13} />
              <span>Plegar</span>
            </button>
            {totalChecked > 0 && (
              <button
                type="button"
                onClick={resetChecklist}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors"
                style={{
                  borderColor: "rgba(188,71,73,0.3)",
                  background: "rgba(188,71,73,0.06)",
                  color: "#bc4749",
                }}
                title="Desmarcar todos los elementos"
              >
                <RotateCcw size={13} />
                <span>Reiniciar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: "var(--line)",
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: progressPercent === 100 ? "#2e7d5b" : "var(--indigo)",
            transition: "width 0.3s ease, background 0.3s ease",
          }}
        />
      </div>

      {/* Sections Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
          gap: 20,
          alignItems: "start",
        }}
      >
        {sections.map((section) => {
          const Icon = section.icon;
          const sectionChecked = section.items.filter((i) => checked[i.id]).length;
          const isOpen = Boolean(openSections[section.id]);
          const isComplete = sectionChecked === section.items.length;
          const headerBg = section.color === "#c9a227" ? "#8a6d1a" : section.color;

          return (
            <div
              key={section.id}
              className="rounded-2xl border overflow-hidden transition-shadow"
              style={{
                borderColor: isComplete ? "rgba(46,125,91,0.3)" : "var(--line)",
                background: "var(--paper-raised)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Section Header Button */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-3 px-5 py-3.5 w-full text-left border-none cursor-pointer"
                style={{ background: headerBg }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: "white" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14.5, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.25 }}>
                    {section.title}
                  </p>
                  {section.subtitle && (
                    <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)", margin: "2px 0 0", lineHeight: 1.25 }}>
                      {section.subtitle}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "white",
                    fontWeight: 700,
                    background: isComplete ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.18)",
                    padding: "3px 9px",
                    borderRadius: 20,
                    flexShrink: 0,
                  }}
                >
                  {sectionChecked}/{section.items.length}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color: "white",
                    flexShrink: 0,
                    opacity: 0.9,
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              {/* Section Body */}
              {isOpen && (
                <div>
                  {/* Notice / Warning banner if present */}
                  {section.notice && (
                    <div
                      className="flex items-start gap-2.5 px-5 py-2.5"
                      style={{
                        background: "rgba(0,0,0,0.03)",
                        borderBottom: "1px solid var(--line)",
                        fontSize: 12,
                        lineHeight: 1.45,
                        color: "var(--ink-soft)",
                      }}
                    >
                      <AlertCircle size={14} style={{ color: headerBg, flexShrink: 0, marginTop: 1 }} />
                      <span>{section.notice}</span>
                    </div>
                  )}

                  {/* Checklist Items */}
                  {section.items.map((item, idx) => {
                    const isChecked = Boolean(checked[item.id]);
                    return (
                      <Highlightable key={item.id} id={slug("prep", item.id)}>
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          className="flex items-start gap-3 w-full text-left px-5 py-3 transition-colors cursor-pointer border-none"
                          style={{
                            borderBottom: idx < section.items.length - 1 ? "1px solid var(--line)" : "none",
                            background: isChecked ? "rgba(0,0,0,0.012)" : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (!isChecked) e.currentTarget.style.background = "rgba(0,0,0,0.02)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = isChecked ? "rgba(0,0,0,0.012)" : "transparent";
                          }}
                        >
                          {isChecked ? (
                            <CheckCircle2
                              size={18}
                              style={{ color: section.color, flexShrink: 0, marginTop: 2 }}
                            />
                          ) : (
                            <Circle
                              size={18}
                              style={{ color: "var(--line)", flexShrink: 0, marginTop: 2 }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: 13.5,
                              lineHeight: 1.45,
                              color: isChecked ? "var(--ink-soft)" : "var(--ink)",
                              textDecoration: isChecked ? "line-through" : "none",
                            }}
                          >
                            {item.text}
                          </span>
                        </button>
                      </Highlightable>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
