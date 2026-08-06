import { flights, blocks, stays } from "../data/trip";
import { mapsUrl } from "../utils/maps";
import { PlaneTakeoff, PlaneLanding, MapPin } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="px-4 pt-5 pb-8 max-w-lg mx-auto space-y-6">
      <div>
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          Logística
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Vuelos y alojamientos
        </h1>
      </div>

      <section className="space-y-3">
        <h2 className="eyebrow" style={{ color: "var(--ink-soft)" }}>
          ✈️ Vuelos confirmados
        </h2>
        <FlightRow flight={flights.out} icon={PlaneTakeoff} />
        <FlightRow flight={flights.back} icon={PlaneLanding} />
      </section>

      <section className="space-y-3">
        <h2 className="eyebrow" style={{ color: "var(--ink-soft)" }}>
          🏨 Dónde dormimos
        </h2>
        {stays.map((s) => (
          <div key={s.id} className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <div className="flex items-center gap-2">
              <MapPin size={16} style={{ color: "var(--shu)" }} />
              <p className="font-medium" style={{ color: "var(--ink)" }}>{s.city}</p>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>{s.nights}</p>
            {s.warning && (
              <p className="text-xs mt-2 rounded-lg p-2" style={{ background: "#FBEAEA", color: "var(--shu)" }}>
                {s.warning}
              </p>
            )}
            <div className="mt-2 space-y-2">
              {s.options.map((o, i) => (
                <div key={i} className="rounded-lg px-3 py-2 text-sm" style={{ background: "var(--paper)" }}>
                  <span className="font-medium block" style={{ color: "var(--ink)" }}>{o.name}</span>
                  <span className="block text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                    {o.total}
                    {o.pin ? ` · PIN ${o.pin}` : ""}
                  </span>
                  <span className="flex items-center gap-3 mt-1.5">
                    <a href={o.url} target="_blank" rel="noreferrer" className="text-xs font-medium" style={{ color: "var(--indigo)" }}>
                      Ver reserva ↗
                    </a>
                    <a
                      href={mapsUrl(`${o.name}, ${s.city}, Japan`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: "var(--shu)" }}
                    >
                      <MapPin size={12} /> Cómo llegar ↗
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="eyebrow" style={{ color: "var(--ink-soft)" }}>
          📍 Mejor zona por bloque
        </h2>
        {blocks.map((b) => (
          <div key={b.id} className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <p className="font-medium text-sm" style={{ color: b.color }}>{b.emoji} {b.title}</p>
            <p className="text-sm mt-1.5" style={{ color: "var(--ink)" }}>{b.bestArea}</p>
            {b.logisticaTip && (
              <p className="text-xs mt-2 rounded-lg p-2" style={{ background: "var(--paper)", color: "var(--ink-soft)" }}>
                💡 {b.logisticaTip}
              </p>
            )}
            {b.fujiStrategy && (
              <p className="text-xs mt-2 rounded-lg p-2" style={{ background: "var(--paper)", color: "var(--ink-soft)" }}>
                🗻 {b.fujiStrategy}
              </p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

function FlightRow({ flight, icon: Icon }) {
  // Calculate duration in hours
  const departure = new Date(flight.depart.time);
  const arrival = new Date(flight.arrive.time);
  const durationMs = arrival - departure;
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
      <div className="flex items-center gap-2 mb-4" style={{ color: "var(--indigo)" }}>
        <Icon size={18} />
        <p className="eyebrow">{flight.label} · {flight.flightNumber}</p>
      </div>
      
      {/* Route visualization */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        {/* Departure */}
        <div style={{ textAlign: "center", flex: "0 0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
            {departure.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 500 }}>
            {flight.depart.city}
          </div>
        </div>

        {/* Arrow + duration */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 2 }}>
            ↙ ↗
          </div>
          <div style={{ fontSize: 10, color: "var(--shu)", fontWeight: 600 }}>
            {durationHours}h {durationMins}m
          </div>
        </div>

        {/* Arrival */}
        <div style={{ textAlign: "center", flex: "0 0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
            {arrival.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
            {arrival.getDate() !== departure.getDate() ? <span style={{ fontSize: 9 }}> +1</span> : ""}
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 500 }}>
            {flight.arrive.city}
          </div>
        </div>
      </div>

      {/* Details */}
      <p className="text-xs mt-3" style={{ color: "var(--ink-soft)", lineHeight: 1.5 }}>{flight.text}</p>
      
      <a href={flight.trackUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-xs font-medium" style={{ color: "var(--shu)" }}>
        Seguir vuelo en vivo ↗
      </a>
    </div>
  );
}
