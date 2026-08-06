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
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
      <div className="flex items-center gap-2" style={{ color: "var(--indigo)" }}>
        <Icon size={18} />
        <p className="eyebrow">{flight.label} · {flight.flightNumber}</p>
      </div>
      <p className="text-sm mt-2" style={{ color: "var(--ink)" }}>{flight.text}</p>
      <a href={flight.trackUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm font-medium" style={{ color: "var(--shu)" }}>
        Seguir vuelo en vivo ↗
      </a>
    </div>
  );
}
