import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Plane, CheckCircle2 } from "lucide-react";
import { tabs as navTabs } from "../components/Nav";

function getTripTiming(departureIso, returnIso) {
  const now = new Date();
  const dep = new Date(departureIso);
  const ret = returnIso ? new Date(returnIso) : new Date("2026-09-22T07:35:00");

  if (now < dep) {
    const diff = dep - now;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { mode: "before", days, hours, minutes, seconds };
  }

  // Viaje completado: tiempo transcurrido desde el regreso que aumenta cada segundo
  const elapsed = Math.max(0, now - ret);
  const days = Math.floor(elapsed / 86400000);
  const hours = Math.floor((elapsed % 86400000) / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  return { mode: "after", days, hours, minutes, seconds };
}

export default function InicioPage({ onNavigate }) {
  const { tripMeta, flights } = useContent();
  const t = useT();
  const DEPARTURE_ISO = `${flights.out?.date || "2026-09-06"}T09:05:00`;
  const RETURN_ISO = flights.back?.arrive?.time ? `${flights.back.arrive.time}:00` : "2026-09-22T07:35:00";

  const [timing, setTiming] = useState(() => getTripTiming(DEPARTURE_ISO, RETURN_ISO));

  useEffect(() => {
    const timer = setInterval(() => setTiming(getTripTiming(DEPARTURE_ISO, RETURN_ISO)), 1000);
    return () => clearInterval(timer);
  }, [DEPARTURE_ISO, RETURN_ISO]);

  const isAfter = timing.mode === "after";
  const units = [
    { label: t("home.countdownDays") || "Días", value: timing.days },
    { label: t("home.countdownHours") || "Horas", value: timing.hours },
    { label: t("home.countdownMinutes") || "Min", value: timing.minutes },
    { label: t("home.countdownSeconds") || "Seg", value: timing.seconds },
  ];

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{tripMeta.subtitle}</p>
        <h1 className="font-display text-3xl" style={{ color: "var(--indigo)", margin: 0, lineHeight: 1.2 }}>
          {tripMeta.title}
        </h1>
      </div>

      {/* Contador de tiempo */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          background: "linear-gradient(135deg, var(--indigo) 0%, #0f1f35 100%)",
          borderRadius: 16, padding: "24px 28px", color: "white",
          boxShadow: "0 4px 20px rgba(15, 31, 53, 0.25)",
        }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="eyebrow m-0" style={{ color: "rgba(255,255,255,0.7)", fontSize: 11.5, letterSpacing: "0.06em" }}>
              {isAfter ? (t("home.elapsedTitle") || "EL VIAJE SE REALIZÓ HACE") : (t("home.countdownTitle") || "FALTAN PARA DESPEGAR")}
            </p>
            {isAfter && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1" style={{ background: "rgba(46,125,91,0.25)", color: "#7ae0ad", border: "1px solid rgba(46,125,91,0.4)" }}>
                <CheckCircle2 size={12} /> {t("home.tripCompletedBadge") || "Viaje completado"}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
            {units.map((u) => (
              <div key={u.label} style={{ textAlign: "center", flex: 1 }}>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 400,
                  fontVariantNumeric: "tabular-nums", lineHeight: 1, margin: 0,
                  color: "#ffffff",
                }}>
                  {String(u.value).padStart(2, "0")}
                </p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6, margin: "6px 0 0" }}>
                  {u.label}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 16, marginBottom: 0, textAlign: "center" }}>
            {t("home.tripDatesSub") || "Viaje realizado del 6 al 21 de sept. de 2026 · 16 días · Madrid ⇄ Japón"}
          </p>
        </div>
      </div>

      {/* Qué es esto / Para qué sirve la web */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.forTheGroup") || "Para el grupo"}</p>
        <div className="rounded-2xl p-5 space-y-4 shadow-xs" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          {tripMeta.welcomeParagraphs?.map((paragraph, idx) => (
            <p key={idx} style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </section>

      {/* Apartados principales */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.mainSections") || "Apartados principales"}</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 10,
        }}>
          {navTabs.filter(s => s.id !== "inicio").map((s) => {
            const Icon = s.icon;
            let iconColor = "var(--indigo)";
            if (["vuelos", "itinerario", "pendientes", "lugares"].includes(s.id)) iconColor = "#bc4749";
            if (["hoteles", "mapa", "preparativos"].includes(s.id)) iconColor = "#2e7d5b";
            if (["comidas", "presupuesto"].includes(s.id)) iconColor = "#c9a227";

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate?.(s.id)}
                className="rounded-xl p-3.5 text-left flex gap-3 items-start transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "var(--paper-raised)",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  background: `${iconColor}14`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} style={{ color: iconColor }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{t(s.labelKey)}</p>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4, margin: "3px 0 0" }}>{t(s.descKey)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Resumen de Vuelos */}
      <section>
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.completedFlights") || "Vuelos del viaje"}</p>
        <div className="rounded-2xl p-5 shadow-xs" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2" style={{ color: "var(--shu)" }}>
              <Plane size={16} />
              <p className="eyebrow" style={{ margin: 0 }}>{flights.out?.flightNumber || "QR148 + QR808"} / {flights.back?.flightNumber || "QR809 + QR147"}</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(46,125,91,0.12)", color: "#2e7d5b" }}>
              ✓ Ida y Vuelta
            </span>
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
            Madrid ⇄ Doha ⇄ Narita (Qatar Airways)
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>
            {t("home.flightsCompletedDesc") || "Vuelos de ida y vuelta completados con éxito. Consulta billetes, escalas y referencias en la pestaña Vuelos."}
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("vuelos")}
            className="mt-3 text-sm font-semibold inline-flex items-center gap-1"
            style={{ color: "var(--shu)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            {t("home.viewFlights") || "Ver vuelos ↗"}
          </button>
        </div>
      </section>
    </div>
  );
}
