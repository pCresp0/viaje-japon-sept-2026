import { useState, useRef, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { fmtDate, getDefaultTripDay } from "../utils/date";
import { PlaneTakeoff, PlaneLanding, ChevronDown } from "lucide-react";
import VisitJapanQRCard from "../components/VisitJapanQRCard";

export default function InfoPage() {
  const { flights } = useContent();
  const t = useT();
  const currentDay = getDefaultTripDay();

  // Día 0 (salida Madrid 6 sept) o Día 1 (llegada 7 sept): ida activa
  // Día 1 (llegada a Narita) o Día 0 (vuelo): Visit Japan Web activo
  // Día 15 (21 sept) o posterior: vuelta activa
  const isOutboundActive = currentDay <= 1;
  const isVisitJapanActive = currentDay === 1 || currentDay === 0;
  const isReturnActive = currentDay >= 15;

  return (
    <div className="px-4 pt-3 pb-8">
      <div className="mb-6">
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          {t("flights.eyebrow")}
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          {t("flights.title")}
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          {t("flights.confirmedSub")}
        </p>
      </div>

      {/* QR Visit Japan Web para entrada a Japón */}
      <div id="visit-japan-qr-card">
        <VisitJapanQRCard 
          defaultExpanded={isVisitJapanActive}
          isPriorityToday={isVisitJapanActive}
        />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        gap: 16,
        alignItems: "start",
      }}>
        <div id="flight-outbound-card">
          <FlightRow 
            flight={flights.out} 
            icon={PlaneTakeoff} 
            defaultExpanded={isOutboundActive}
            isTodayFlight={isOutboundActive}
          />
        </div>
        <div id="flight-return-card">
          <FlightRow 
            flight={flights.back} 
            icon={PlaneLanding} 
            defaultExpanded={isReturnActive}
            isTodayFlight={isReturnActive}
          />
        </div>
      </div>
    </div>
  );
}

function FlightRow({ flight, icon: Icon, defaultExpanded = false, isTodayFlight = false }) {
  const t = useT();
  // For round trip flights, we need to parse the journey
  // Ida: Madrid -> Doha -> Narita
  // Vuelta: Narita -> Doha -> Madrid
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rowRef = useRef(null);
  
  // Se compara contra un campo estable, nunca contra el texto visible:
  // el label se traduce y la comparación se rompería.
  const isOutbound = flight.dir === "out";

  useEffect(() => {
    if (defaultExpanded && rowRef.current && !isOutbound) {
      const t = window.setTimeout(() => {
        rowRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => window.clearTimeout(t);
    }
  }, [defaultExpanded, isOutbound]);
  
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
  const routeSummary = isOutbound ? "Madrid → Doha → Narita" : "Narita → Doha → Madrid";
  
  return (
    <div 
      ref={rowRef}
      className="rounded-2xl overflow-hidden transition-all" 
      style={{ 
        background: "var(--paper-raised)", 
        border: isTodayFlight ? "1.5px solid var(--shu)" : "1px solid var(--line)",
        boxShadow: isTodayFlight ? "0 0 0 2px rgba(188, 71, 73, 0.22)" : "none"
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 cursor-pointer transition-colors hover:bg-black/[0.02] border-none bg-transparent"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5" style={{ color: "var(--shu)" }}>
              <Icon size={18} />
              <p className="eyebrow font-semibold m-0">{flight.label} · {flight.flightNumber}</p>
              {isTodayFlight && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 shadow-sm ml-auto">
                  {t("flights.todayFlight")}
                </span>
              )}
            </div>
            <p className="text-sm font-bold m-0" style={{ color: "var(--ink)" }}>{routeSummary}</p>
            <p className="text-xs mt-1 m-0" style={{ color: "var(--ink-soft)" }}>
              {formatDate(depTime)} · {flight.leg1?.depTime || formatTime(depTime)} → {flight.leg2?.arrTime || formatTime(arrTime)}
              {arrTime.getDate() !== depTime.getDate() ? " (+1)" : ""} · {flight.totalDuration || `${totalDuration}h ${totalMins}m`}
            </p>
          </div>
          <ChevronDown
            size={20}
            className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
            style={{ color: "var(--ink-soft)", marginTop: 2 }}
          />
        </div>
      </button>

      {expanded && (
      <div className="px-4 pb-4">
      {/* Route overview */}
      <div style={{
        background: "var(--paper)",
        borderRadius: 12,
        padding: "12px",
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>
          Ruta completa: {flight.totalDuration || `${totalDuration}h ${totalMins}m`}
        </div>
        
        {/* Leg 1 */}
        <div style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-soft)" }}>
                {flight.leg1 ? flight.leg1.number : "LEG 1"} · {flight.leg1?.operator ?? "Qatar Airways"}{flight.leg1?.aircraft ? ` (${flight.leg1.aircraft})` : ""}
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
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{flight.leg1?.depTime || formatTime(depTime)}</div>
              {flight.depart.terminal && (
                <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Terminal {flight.depart.terminal}</div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{formatDate(leg1End)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{flight.leg1?.arrTime || formatTime(leg1End)}</div>
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
              {flight.layover?.duration || "~2h"}
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
                {flight.leg2 ? flight.leg2.number : "LEG 2"} · {flight.leg2?.operator ?? "Qatar Airways"}{flight.leg2?.aircraft ? ` (${flight.leg2.aircraft})` : ""}
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
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{isOutbound ? formatDate(depTime) : formatDate(leg2Start)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{flight.leg2?.depTime || formatTime(leg2Start)}</div>
              <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Doha</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--ink-soft)", fontSize: 10 }}>{formatDate(arrTime)}</div>
              <div style={{ color: "var(--indigo)", fontWeight: 700 }}>{flight.leg2?.arrTime || formatTime(arrTime)}</div>
              {arrTime.getDate() !== depTime.getDate() && <div style={{ fontSize: 9, color: "var(--shu)", fontWeight: 700 }}>+1 día</div>}
              {flight.arrive.terminal && (
                <div style={{ color: "var(--ink-soft)", fontSize: 10, marginTop: 1 }}>Terminal {flight.arrive.terminal}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 pt-1">
        {flight.leg1?.trackUrl ? (
          <a
            href={flight.leg1.trackUrl}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all"
            style={{ color: "var(--indigo)", background: "var(--paper)", borderColor: "var(--line)" }}
          >
            ✈️ Seguir {flight.leg1.number} en vivo ↗
          </a>
        ) : null}
        {flight.leg2?.trackUrl ? (
          <a
            href={flight.leg2.trackUrl}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all"
            style={{ color: "var(--indigo)", background: "var(--paper)", borderColor: "var(--line)" }}
          >
            ✈️ Seguir {flight.leg2.number} en vivo ↗
          </a>
        ) : null}
        {!flight.leg1?.trackUrl && !flight.leg2?.trackUrl && flight.trackUrl && (
          <a href={flight.trackUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-medium" style={{ color: "var(--shu)" }}>
            Seguir vuelo en vivo ↗
          </a>
        )}
      </div>
      </div>
      )}
    </div>
  );
}
