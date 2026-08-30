import { ChevronDown, Ticket, Clock } from "lucide-react";

/**
 * Cabecera compacta de billete (colapsada por defecto).
 * Misma estética que las tarjetas de transporte, menos alta en el itinerario.
 */
export default function TicketCardHeader({
  icon: Icon,
  iconClassName = "opacity-90",
  route,
  title,
  when,
  reservationLabel = "Reserva",
  reservationCode,
  priceLine,
  isExpanded,
  onToggle,
  focusRingClass = "focus:ring-indigo-500",
  headerBg,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full text-left px-3.5 py-2.5 text-white relative overflow-hidden transition-all hover:brightness-110 focus:outline-none focus:ring-2 ${focusRingClass} focus:ring-inset cursor-pointer`}
      style={{ background: headerBg }}
    >
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 opacity-90 mb-0.5">
            {Icon && <Icon size={12} className={iconClassName} />}
            <p className="text-[10px] font-bold tracking-wider uppercase m-0 truncate">{route}</p>
          </div>
          <h3 className="text-[15px] font-display font-bold m-0 leading-tight truncate">{title}</h3>
          {when && (
            <p className="text-[11px] opacity-90 mt-0.5 flex items-center gap-1 m-0 truncate">
              <Clock size={11} className="shrink-0 opacity-80" />
              <span className="truncate">{when}</span>
            </p>
          )}
        </div>
        <div className="text-right flex-shrink-0 max-w-[46%]">
          <p className="text-[10px] opacity-75 uppercase tracking-wider m-0 leading-none mb-0.5">{reservationLabel}</p>
          <p className="text-sm font-bold font-mono tracking-wide m-0 leading-tight">{reservationCode}</p>
          {priceLine && (
            <p className="text-[10px] opacity-90 m-0 mt-0.5 leading-snug">{priceLine}</p>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          style={{ opacity: 0.85 }}
        />
      </div>
      <div className="absolute -bottom-5 -right-5 opacity-10 rotate-12 pointer-events-none">
        <Ticket size={72} />
      </div>
    </button>
  );
}
