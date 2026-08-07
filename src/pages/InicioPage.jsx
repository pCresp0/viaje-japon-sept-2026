import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { PlaneTakeoff, Route, CalendarDays, Hotel, Train, Heart, UtensilsCrossed, Map, MessageCircle, Backpack, Wallet, Compass, ListTodo, Landmark } from "lucide-react";

const DEPARTURE_ISO = `${flights.out.date}T09:05:00`;

function getCountdown() {
  const now = new Date();
  const target = new Date(DEPARTURE_ISO);
  const diff = target - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const sections = [
  { id: "itinerario", label: "Itinerario", desc: "Los 15 días, hora a hora, con lugares clicables a Maps", icon: Route, color: "#bc4749" },
  { id: "calendario", label: "Calendario", desc: "Vista mensual de septiembre con el detalle de cada día", icon: CalendarDays, color: "#1d3557" },
  { id: "vuelos", label: "Vuelos", desc: "Ida y vuelta, números de vuelo, referencia y PIN", icon: PlaneTakeoff, color: "#bc4749" },
  { id: "hoteles", label: "Hoteles", desc: "Check-in/out, confirmación, PIN, dirección y Booking", icon: Hotel, color: "#2e7d5b" },
  { id: "transportes", label: "Transportes", desc: "Trenes, buses y costes día a día", icon: Train, color: "#1d3557" },
  { id: "lugares", label: "Lugares", desc: "Templos, restaurantes y la excursión al Fuji", icon: Heart, color: "#bc4749" },
  { id: "comidas", label: "Comidas típicas", desc: "Qué probar en cada zona del viaje", icon: UtensilsCrossed, color: "#c9a227" },
  { id: "mapa", label: "Mapa", desc: "15 paradas principales en orden, con enlace a Maps", icon: Map, color: "#2e7d5b" },
  { id: "frases", label: "Frases", desc: "Japonés útil para pedir, moveros y saludar", icon: MessageCircle, color: "#1d3557" },
  { id: "preparativos", label: "Preparativos", desc: "Lista de ropa, documentos y cosas a llevar", icon: Backpack, color: "#2e7d5b" },
  { id: "presupuesto", label: "Presupuesto", desc: "Coste por persona y desglose del grupo", icon: Wallet, color: "#c9a227" },
  { id: "hoy", label: "Hoy", desc: "Cuando empiece el viaje, aquí veréis el día en curso", icon: Compass, color: "#bc4749" },
  { id: "pendientes", label: "Cosas pendientes", desc: "Reservas y tareas que aún hay que cerrar", icon: ListTodo, color: "#bc4749" },
  { id: "historia", label: "Historia de Japón", desc: "Contexto histórico ligado a lo que vamos a ver", icon: Landmark, color: "#1d3557" },
];

export default function InicioPage({ onNavigate }) {
  const { tripMeta, flights } = useContent();
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = countdown
    ? [
        { label: "Días", value: countdown.days },
        { label: "Horas", value: countdown.hours },
        { label: "Min", value: countdown.minutes },
        { label: "Seg", value: countdown.seconds },
      ]
    : null;

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{tripMeta.subtitle}</p>
        <h1 className="font-display text-3xl" style={{ color: "var(--indigo)", margin: 0, lineHeight: 1.2 }}>
          {tripMeta.title}
        </h1>
      </div>

      {/* Countdown */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          background: "linear-gradient(135deg, var(--indigo) 0%, #0f1f35 100%)",
          borderRadius: 16, padding: 28, color: "white",
        }}>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
            {units ? "Faltan para despegar" : "¡Ya despegamos!"}
          </p>
          {units ? (
            <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
              {units.map((u) => (
                <div key={u.label} style={{ textAlign: "center", flex: 1 }}>
                  <p style={{
                    fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400,
                    fontVariantNumeric: "tabular-nums", lineHeight: 1, margin: 0,
                  }}>
                    {String(u.value).padStart(2, "0")}
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6 }}>
                    {u.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
              El contador ha llegado a cero. Abrí la pestaña <strong>Hoy</strong> para el día en curso.
            </p>
          )}
        </div>
      </div>

      {/* Qué es esto */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Para el grupo</p>
        <div className="rounded-2xl p-5 space-y-3" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          {tripMeta.welcomeParagraphs?.map((paragraph, idx) => (
            <p key={idx} style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Apartados */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Apartados principales</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 10,
        }}>
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate?.(s.id)}
                className="rounded-xl p-3.5 text-left flex gap-3 items-start"
                style={{
                  background: "var(--paper-raised)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  background: `${s.color}14`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{s.label}</p>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4, margin: "3px 0 0" }}>{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Flight teaser */}
      <section>
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Vuelo de ida</p>
        <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2 mb-3" style={{ color: "var(--shu)" }}>
            <PlaneTakeoff size={16} />
            <p className="eyebrow" style={{ margin: 0 }}>Ida · {flights.out.flightNumber}</p>
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
            Madrid → Doha → Narita
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>
            Salida 6-sept-2026 · 09:05 (T4S) · llegada 7-sept · 12:55 (T2). Detalle completo en la pestaña Vuelos.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("vuelos")}
            className="mt-3 text-sm font-medium"
            style={{ color: "var(--shu)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Ver vuelos ↗
          </button>
        </div>
      </section>
    </div>
  );
}
