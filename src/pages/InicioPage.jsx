import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { PlaneTakeoff, Route, CalendarDays, Hotel, Train, Heart, UtensilsCrossed, Map, MessageCircle, Backpack, Wallet, Compass, ListTodo, Landmark } from "lucide-react";
import { flights } from "../data/trip";

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

// sections removed since they will be imported from Nav.tabs
import { tabs as navTabs } from "../components/Nav";
export default function InicioPage({ onNavigate }) {
  const { tripMeta, flights } = useContent();
  const t = useT();
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = countdown
    ? [
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

      {/* Sobre la web */}
      {tripMeta.about && (
        <section className="mt-8">
          <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{tripMeta.about.title}</p>
          <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 16px" }}>
              {tripMeta.about.description}
            </p>
            <a
              href="https://github.com/pCresp0/viaje-japon-sept-2026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 text-sm font-medium rounded-xl py-3"
              style={{ background: "var(--ink)", color: "var(--paper)", textDecoration: "none" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              {tripMeta.about.github}
            </a>
          </div>
        </section>
      )}
      {/* Sobre la web */}
      {tripMeta.about && (
        <section className="mb-8">
          <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{tripMeta.about.title}</p>
          <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <p style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.6, margin: 0, marginBottom: 16 }}>
              {tripMeta.about.description}
            </p>
            <a
              href="https://github.com/pCresp0/viaje-japon-sept-2026"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--shu)",
                textDecoration: "none",
                background: "rgba(188,71,73,0.1)",
                padding: "8px 16px",
                borderRadius: 20
              }}
            >
              {tripMeta.about.github} ↗
            </a>
          </div>
        </section>
      )}

    </div>
  );
}
