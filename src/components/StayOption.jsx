import { MapPin } from "lucide-react";
import { mapsUrl } from "../utils/maps";

export default function StayOption({ option, city }) {
  const mapQuery = option.address
    ? `${option.name}, ${option.address}`
    : `${option.name}, ${city}, Japan`;

  return (
    <div
      className="rounded-lg px-3 py-2.5 text-sm border"
      style={{ borderColor: "var(--line)", background: "var(--paper)" }}
    >
      <span className="font-medium block" style={{ color: "var(--ink)" }}>
        {option.name}
      </span>

      <div className="mt-1 space-y-0.5" style={{ color: "var(--ink-soft)", fontSize: 12, lineHeight: 1.45 }}>
        {option.total && (
          <p style={{ margin: 0 }}>
            {option.total}
            {option.guests ? ` · ${option.guests}` : ""}
          </p>
        )}
        {(option.confirmation || option.pin) && (
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11.5 }}>
            {option.confirmation ? `Conf. ${option.confirmation}` : ""}
            {option.confirmation && option.pin ? " · " : ""}
            {option.pin ? `PIN ${option.pin}` : ""}
          </p>
        )}
        {option.rooms && <p style={{ margin: 0 }}>{option.rooms}</p>}
        {option.checkIn && <p style={{ margin: 0 }}>Entrada: {option.checkIn}</p>}
        {option.checkOut && <p style={{ margin: 0 }}>Salida: {option.checkOut}</p>}
        {option.address && <p style={{ margin: 0 }}>{option.address}</p>}
        {option.phone && <p style={{ margin: 0 }}>Tel. {option.phone}</p>}
        {option.cancel && <p style={{ margin: 0 }}>{option.cancel}</p>}
        {option.note && (
          <p style={{ margin: 0, fontStyle: "italic", color: "var(--ink-soft)" }}>{option.note}</p>
        )}
      </div>

      <span className="flex items-center gap-3 mt-2">
        {option.url && (
          <a href={option.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium" style={{ color: "var(--indigo)" }}>
            Ver reserva ↗
          </a>
        )}
        <a
          href={mapsUrl(mapQuery)}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: "var(--shu)" }}
        >
          <MapPin size={12} /> Cómo llegar ↗
        </a>
      </span>
    </div>
  );
}
