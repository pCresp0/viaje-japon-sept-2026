import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { PlaneTakeoff } from "lucide-react";

function getCountdown(departureIso) {
  const now = new Date();
  const target = new Date(departureIso);
  const diff = target - now;
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

// sections removed since they will be imported from Nav.tabs
import { tabs as navTabs } from "../components/Nav";
export default function InicioPage({ onNavigate }) {
  const { tripMeta, flights } = useContent();
  const t = useT();
  const DEPARTURE_ISO = `${flights.out.date}T09:05:00`;
  const [countdown, setCountdown] = useState(() => getCountdown(DEPARTURE_ISO));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(DEPARTURE_ISO)), 1000);
    return () => clearInterval(timer);
  }, [DEPARTURE_ISO]);

  const units = countdown
    ? [
        { label: t("home.countdownDays"), value: countdown.days },
        { label: t("home.countdownHours"), value: countdown.hours },
        { label: t("home.countdownMinutes"), value: countdown.minutes },
        { label: t("home.countdownSeconds"), value: countdown.seconds },
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
            {units ? t("home.countdownTitle") : t("home.countdownFinished")}
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
            <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }} dangerouslySetInnerHTML={{ __html: t("home.countdownZero") }} />
          )}
        </div>
      </div>

      {/* Qué es esto */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.forTheGroup")}</p>
        <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          {tripMeta.welcomeParagraphs?.map((paragraph, idx) => (
            <p key={idx} style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </section>

      {/* Apartados */}
      <section className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.mainSections")}</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
          gap: 10,
        }}>
          {navTabs.filter(s => s.id !== "inicio").map((s) => {
            const Icon = s.icon;
            let iconColor = "var(--indigo)";
            if (["vuelos", "itinerario", "hoy", "pendientes", "lugares"].includes(s.id)) iconColor = "#bc4749";
            if (["hoteles", "mapa", "preparativos"].includes(s.id)) iconColor = "#2e7d5b";
            if (["comidas", "presupuesto"].includes(s.id)) iconColor = "#c9a227";

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

      {/* Flight teaser */}
      <section>
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("home.outboundFlight")}</p>
        <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <div className="flex items-center gap-2 mb-3" style={{ color: "var(--shu)" }}>
            <PlaneTakeoff size={16} />
            <p className="eyebrow" style={{ margin: 0 }}>{t("home.outbound")} · {flights.out.flightNumber}</p>
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
            Madrid → Doha → Narita
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>
            {t("home.flightDesc")}
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.("vuelos")}
            className="mt-3 text-sm font-medium"
            style={{ color: "var(--shu)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            {t("home.viewFlights")}
          </button>
        </div>
      </section>
    </div>
  );
}
