import { flights, blocks, stays } from "../data/trip";
import { fmtDate } from "../utils/date";
import { PlaneTakeoff, PlaneLanding, MapPin } from "lucide-react";
import StayOption from "../components/StayOption";

export default function InfoPage() {
  return (
    <div className="px-4 pt-5 pb-8">
      <div className="mb-6">
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          Logística
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Vuelos y alojamientos
        </h1>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        gap: 24,
        alignItems: "start",
      }}>
        <section className="space-y-3">
          <h2 className="eyebrow" style={{ color: "var(--ink-soft)" }}>
            ✈️ Vuelos confirmados
          </h2>
          <FlightRow flight={flights.out} icon={PlaneTakeoff} />
          <FlightRow flight={flights.back} icon={PlaneLanding} />
          <div className="rounded-xl p-3.5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <div>
                <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Referencia</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", fontFamily: "monospace" }}>{flights.booking.ref}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>PIN</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", fontFamily: "monospace" }}>{flights.booking.pin}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{flights.price.people} personas</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--shu)" }}>{flights.price.total}</p>
                <p style={{ fontSize: 10, color: "var(--ink-soft)" }}>{flights.price.perPerson}/persona</p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
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
                <StayOption key={i} option={o} city={s.city} />
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
      </div>
    </div>
  );
}

function FlightRow({ flight, icon: Icon }) {
  // For round trip flights, we need to parse the journey
  // Ida: Madrid -> Doha -> Narita
  // Vuelta: Narita -> Doha -> Madrid
  
  const isOutbound = flight.label === "Ida";
  
  // Parse times
  const depTime = new Date(flight.depart.time);
  const arrTime = new Date(flight.arrive.time);
  
  // Format time helper
  const formatTime = (date) => date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date) => fmtDate(date);
  
  // Calculate leg times (Madrid-Doha ~7h, Doha-Narita ~8h for outbound)
  let leg1End, leg2Start;
  if (isOutbound) {
    // Outbound: Madrid 09:05 -> Doha (7h flight) + 2h stopover -> Narita 12:55 next day
    leg1End = new Date(depTime.getTime() + 7 * 60 * 60 * 1000); // 7 hours
    leg2Start = new Date(leg1End.getTime() + 2 * 60 * 60 * 1000); // 2h stopover
  } else {
    // Return: Narita 17:25 -> Doha (8h flight) + 2h stopover -> Madrid 08:15 next day
    leg1End = new Date(depTime.getTime() + 8 * 60 * 60 * 1000); // 8 hours
    leg2Start = new Date(leg1End.getTime() + 2 * 60 * 60 * 1000); // 2h stopover
  }
  
  const totalDuration = Math.floor((arrTime - depTime) / (1000 * 60 * 60));
  const totalMins = Math.floor(((arrTime - depTime) % (1000 * 60 * 60)) / (1000 * 60));
  
  const leg1Duration = 7; // Madrid-Doha
  const leg2Duration = 8; // Doha-Narita or reverse
  
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
      <div className="flex items-center gap-2 mb-4" style={{ color: "var(--shu)" }}>
        <Icon size={18} />
        <p className="eyebrow font-semibold">{flight.label} · {flight.flightNumber}</p>
      </div>
      
      {/* Route overview */}
      <div style={{
        background: "var(--paper)",
        borderRadius: 12,
        padding: "12px",
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>
          Ruta completa: {totalDuration}h {totalMins}m
        </div>
        
        {/* Leg 1 */}
        <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-soft)" }}>
                {flight.leg1 ? flight.leg1.number : "LEG 1"} · {flight.leg1?.operator ?? "Qatar Airways"}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                {isOutbound ? "Madrid" : "Narita"} → Doha
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--shu)" }}>{flight.leg1?.duration ?? `${leg1Duration}h`}</div>
              <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>vuelo</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 500 }}>
            <div>
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{formatDate(depTime)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{formatTime(depTime)}</div>
              {flight.depart.terminal && (
                <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Terminal {flight.depart.terminal}</div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{formatDate(leg1End)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{formatTime(leg1End)}</div>
              {flight.layover?.terminal && (
                <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Doha</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Stopover */}
        <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-soft)" }}>
              ⏸ ESCALA EN DOHA
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--forest)" }}>
              ~2h
            </div>
          </div>
          {flight.layover && (
            <div style={{
              marginTop: 8, padding: "8px 10px",
              background: "var(--paper-raised)", borderRadius: 8,
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>
                🛫 {flight.layover.airport} — {flight.layover.terminal}
              </div>
              <p style={{ fontSize: 10.5, color: "var(--ink-soft)", lineHeight: 1.55, margin: 0 }}>
                {flight.layover.connection}
              </p>
            </div>
          )}
        </div>
        
        {/* Leg 2 */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-soft)" }}>
                {flight.leg2 ? flight.leg2.number : "LEG 2"} · {flight.leg2?.operator ?? "Qatar Airways"}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                Doha → {isOutbound ? "Narita" : "Madrid"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--shu)" }}>{flight.leg2?.duration ?? `${leg2Duration}h`}</div>
              <div style={{ fontSize: 10, color: "var(--ink-soft)" }}>vuelo</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 500 }}>
            <div>
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{formatDate(leg2Start)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{formatTime(leg2Start)}</div>
              <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Doha</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{formatDate(arrTime)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{formatTime(arrTime)}</div>
              {arrTime.getDate() !== depTime.getDate() && <div style={{ fontSize: 9, color: "var(--shu)", fontWeight: 700 }}>+1 día</div>}
              {flight.arrive.terminal && (
                <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Terminal {flight.arrive.terminal}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <a href={flight.trackUrl} target="_blank" rel="noreferrer" className="inline-block text-xs font-medium" style={{ color: "var(--shu)" }}>
        Seguir vuelo en vivo ↗
      </a>
    </div>
  );
}
