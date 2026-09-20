import { useState } from "react";
import { Plane, Ticket, CheckCircle2, CalendarDays, ExternalLink } from "lucide-react";
import TicketCardHeader from "./TicketCardHeader";

// Granate Qatar Airways -- tono propio para las tarjetas de vuelo,
// distinto de los degradados por bloque (kioto/alpes/tokio) de los trenes.
const HEADER_BG = "linear-gradient(135deg, #8B1538 0%, #4A0620 100%)";
const ACCENT = "#8B1538";
const SOFT_BG = "rgba(139, 21, 56, 0.06)";

export default function FlightTicketCard({
  legNumber,
  route,
  flightNumber,
  operator = "Qatar Airways",
  date,
  depTime,
  arrTime,
  duration,
  bookingRef,
  eticket,
  checkedIn = true,
  trackUrl,
  defaultExpanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm mb-3"
      style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
    >
      <TicketCardHeader
        icon={Plane}
        iconClassName="text-rose-200"
        route={route}
        title={flightNumber}
        when={`${date} · ${depTime} → ${arrTime}`}
        reservationLabel="Localizador"
        reservationCode={bookingRef}
        priceLine={duration}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        focusRingClass="focus:ring-rose-700"
        headerBg={HEADER_BG}
      />

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
              <CheckCircle2 size={14} /> {checkedIn ? "CHECKED IN" : "CONFIRMADO"}
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              {operator}
            </span>
            {legNumber && (
              <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
                Tramo {legNumber}
              </span>
            )}
          </div>

          <div className="border rounded-xl p-3" style={{ borderColor: "var(--line)" }}>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider m-0 mb-1 flex items-center gap-1">
              <Ticket size={12} /> E-ticket
            </p>
            <p className="text-sm font-bold font-mono m-0" style={{ color: ACCENT }}>{eticket}</p>
          </div>

          {trackUrl && (
            <a
              href={trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full px-3 py-2 border-none transition-opacity hover:opacity-90"
              style={{ background: SOFT_BG, color: ACCENT }}
            >
              <ExternalLink size={13} />
              Seguimiento de vuelo en vivo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
