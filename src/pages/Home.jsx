import { useState, useEffect } from "react";
import { tripMeta, flights, blocks, days } from "../data/trip";
import { getTripStatus, formatDateLong, diffDays } from "../utils/date";
import DayCard from "../components/DayCard";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";

// Departure moment used for the live countdown (Madrid local time)
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

export default function Home({ onGoToDay }) {
  const status = getTripStatus();

  return (
    <div>
      <div style={{ padding: "24px 24px 0", maxWidth: 1100, margin: "0 auto" }}>
        {/* Simple page title */}
        <div style={{ marginBottom: 8 }}>
          <p className="eyebrow" style={{ color: "var(--shu)" }}>{tripMeta.subtitle}</p>
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: 32,
            fontWeight: 400, color: "var(--indigo)", lineHeight: 1.2,
          }}>
            {tripMeta.title}
          </h1>
        </div>

        <div style={{ marginTop: 24 }}>
          {status.phase === "before" && <BeforeTrip />}
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

function BeforeTrip() {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!countdown) return null;

  const units = [
    { label: "Días", value: countdown.days },
    { label: "Horas", value: countdown.hours },
    { label: "Min", value: countdown.minutes },
    { label: "Seg", value: countdown.seconds },
  ];

  return (
    <div className="before-trip-grid" style={{ display: "grid", gap: 20, marginBottom: 40 }}>
      {/* Live countdown */}
      <div style={{
        background: "linear-gradient(135deg, var(--indigo) 0%, #0f1f35 100%)",
        borderRadius: 16,
        padding: 28,
        color: "white",
      }}>
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>
          Faltan para despegar
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
          {units.map((u) => (
            <div key={u.label} style={{ textAlign: "center", flex: 1 }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: 32, fontWeight: 400,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}>
                {String(u.value).padStart(2, "0")}
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6 }}>
                {u.label}
              </p>
            </div>
          ))}
        </div>
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
  const isOutbound = flight.label === "Ida";
  const depTime = new Date(flight.depart.time);
  const arrTime = new Date(flight.arrive.time);
  
  const formatTime = (date) => date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  
  // Calculate durations
  const leg1Duration = isOutbound ? 7 : 8;
  const leg2Duration = isOutbound ? 8 : 7;
  const totalDuration = Math.floor((arrTime - depTime) / (1000 * 60 * 60));
  
  return (
    <div style={{
      background: "var(--paper-raised)",
      border: "1px solid var(--line)",
      borderRadius: 16,
      padding: 24,
      marginBottom: 32,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <Icon size={18} style={{ color: "var(--shu)" }} />
        <p className="eyebrow" style={{ margin: 0, color: "var(--shu)" }}>
          {flight.label} · {flight.flightNumber}
        </p>
      </div>
      
      {/* Route summary */}
      <div style={{
        background: "var(--paper)",
        borderRadius: 12,
        padding: 14,
        marginBottom: 14,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--indigo)", marginBottom: 8 }}>
          {isOutbound ? "Madrid → Doha → Narita" : "Narita → Doha → Madrid"}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>Salida</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
              {formatTime(depTime)}
            </div>
            {flight.depart.terminal && (
              <div style={{ fontSize: 9.5, color: "var(--ink-soft)", marginTop: 1 }}>
                Terminal {flight.depart.terminal}
              </div>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--shu)" }}>Duración</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--shu)" }}>
              {totalDuration}h
            </div>
            {flight.layover && (
              <div style={{ fontSize: 9.5, color: "var(--ink-soft)", marginTop: 1 }}>
                vía {flight.layover.city}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>Llegada</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
              {formatTime(arrTime)} {arrTime.getDate() !== depTime.getDate() ? "+1" : ""}
            </div>
            {flight.arrive.terminal && (
              <div style={{ fontSize: 9.5, color: "var(--ink-soft)", marginTop: 1 }}>
                Terminal {flight.arrive.terminal}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Connection info */}
      {flight.layover && (
        <div style={{
          background: "var(--paper)", borderRadius: 10,
          padding: "10px 12px", marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>
            🛫 Escala en {flight.layover.city} · {flight.layover.terminal}
          </div>
          <p style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>
            {flight.layover.connection}
          </p>
        </div>
      )}
      
      {/* Details text */}
      <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.6, marginBottom: 12 }}>
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
