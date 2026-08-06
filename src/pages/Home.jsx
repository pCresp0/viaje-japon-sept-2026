import { tripMeta, flights, blocks, days } from "../data/trip";
import { getTripStatus, formatDateLong, diffDays } from "../utils/date";
import DayCard from "../components/DayCard";
import RouteLine from "../components/RouteLine";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";

export default function Home({ onGoToDay }) {
  const status = getTripStatus();

  return (
    <div style={{ background: "var(--paper)" }}>
      {/* Hero header */}
      <div style={{
        background: "linear-gradient(135deg, var(--indigo) 0%, #0f1f35 100%)",
        padding: "48px 24px",
        color: "white",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: 8
            }}>
              {tripMeta.subtitle}
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: 48,
              fontWeight: 400, lineHeight: 1.2, marginBottom: 16
            }}>
              {tripMeta.title}
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 600, lineHeight: 1.6 }}>
              Una aventura de 15 días por Kioto, los Alpes Japoneses y Tokio. Del 6 al 22 de septiembre de 2026.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24, marginTop: 32 }}>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Duración</p>
              <p style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>15 días</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Viajeros</p>
              <p style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>5 personas</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Regiones</p>
              <p style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>3 bloques</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Aerolínea</p>
              <p style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>Qatar Airways</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "32px 24px 0", maxWidth: 1100, margin: "0 auto" }}>
        <RouteLine currentDay={status.day?.num} onSelectDay={onGoToDay} />

        <div style={{ marginTop: 40 }}>
          {status.phase === "before" && <BeforeTrip daysUntil={status.daysUntil} />}
          {status.phase === "during" && status.day && (
            <div>
              <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Hoy</p>
              <DayCard day={status.day} defaultOpenHistory={false} />
            </div>
          )}
          {status.phase === "during" && !status.day && <TransitDay />}
          {status.phase === "after" && <AfterTrip />}
        </div>

        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <FlightCard flight={flights.out} icon={PlaneTakeoff} />
          <BlocksOverview />
        </div>
      </div>
    </div>
  );
}

function BeforeTrip({ daysUntil }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
      <div style={{
        background: "var(--paper-raised)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: 32,
        textAlign: "center",
      }}>
        <p className="eyebrow" style={{ color: "var(--shu)" }}>Faltan</p>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: 56, fontWeight: 400,
          color: "var(--indigo)", margin: "12px 0"
        }}>
          {daysUntil}
        </p>
        <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
          {daysUntil === 1 ? "día para despegar" : "días para despegar"}
        </p>
      </div>

      <div style={{
        background: "var(--paper-raised)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: 24,
      }}>
        <p className="eyebrow mb-3" style={{ color: "var(--indigo)" }}>SIGUIENTE</p>
        <p style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>Día 1 — Lunes 7 de septiembre</p>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Llegada a Japón. Aterrizaje en Narita y traslado a Kioto en Shinkansen.
        </p>
      </div>
    </div>
  );
}

function TransitDay() {
  return (
    <div style={{
      background: "var(--paper-raised)",
      border: "1px solid var(--shu)",
      borderRadius: 16,
      padding: 24,
      marginBottom: 32,
    }}>
      <p className="eyebrow mb-2" style={{ color: "var(--shu)" }}>Hoy · Día de viaje</p>
      <p style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>Salida hacia Japón</p>
      <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>
        El itinerario detallado comienza cuando aterricemos. Mientras tanto, disfruta revisando el calendario y el presupuesto.
      </p>
    </div>
  );
}

function AfterTrip() {
  return (
    <div style={{
      background: "linear-gradient(135deg, var(--indigo) 0%, rgba(29,53,87,0.8) 100%)",
      borderRadius: 16,
      padding: 32,
      textAlign: "center",
      color: "white",
      marginBottom: 32,
    }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 8 }}>おかえりなさい 🇯🇵</p>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
        El viaje ha terminado. Aquí están todos los recuerdos, detalles y documentos. ¡Que vuelva pronto!
      </p>
    </div>
  );
}

function FlightCard({ flight, icon: Icon }) {
  return (
    <div style={{
      background: "var(--paper-raised)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 24,
      marginBottom: 32,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Icon size={18} style={{ color: "var(--indigo)" }} />
        <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>
          {flight.label} · {flight.flightNumber}
        </p>
      </div>
      <p style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.6, marginBottom: 12 }}>
        {flight.text}
      </p>
      <a
        href={flight.trackUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--shu)",
          textDecoration: "none",
          borderBottom: "1px solid var(--shu)",
          paddingBottom: 2,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        Seguir vuelo en vivo ↗
      </a>
    </div>
  );
}

function BlocksOverview() {
  return (
    <div>
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Los 3 bloques</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {blocks.map((b) => (
          <div
            key={b.id}
            style={{
              background: "var(--paper-raised)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: 20,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = b.color;
              e.currentTarget.style.boxShadow = `0 4px 16px rgba(${parseInt(b.color.slice(1,3),16)}, ${parseInt(b.color.slice(3,5),16)}, ${parseInt(b.color.slice(5,7),16)}, 0.1)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <span style={{ fontSize: 28 }}>{b.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: b.color, marginBottom: 2 }}>
                  {b.title}
                </p>
                <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                  Días {b.days[0]}–{b.days[b.days.length - 1]} · {b.sleepSummary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
