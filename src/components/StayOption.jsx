import { MapPin, KeyRound, BedDouble, Phone, CalendarCheck, CalendarX } from "lucide-react";
import { mapsUrl } from "../utils/maps";

// Etiqueta pequeña en mayúsculas + valor debajo — mismo lenguaje visual
// que ya usa la ficha completa de Hoteles, para que ambos sitios se
// lean igual de bien en vez de ser un bloque de líneas sueltas sin
// jerarquía.
function Field({ label, icon: Icon, children, mono = false }) {
  if (!children) return null;
  return (
    <div className="flex gap-1.5">
      {Icon && <Icon size={12} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />}
      <div style={{ minWidth: 0 }}>
        <p style={{
          fontSize: 9.5, color: "var(--ink-soft)", textTransform: "uppercase",
          letterSpacing: "0.05em", marginBottom: 1, fontWeight: 700,
        }}>
          {label}
        </p>
        <div style={{
          fontSize: mono ? 12.5 : 12,
          fontWeight: mono ? 700 : 600,
          color: "var(--ink)",
          lineHeight: 1.4,
          fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function StayOption({ option, city }) {
  const mapQuery = option.address
    ? `${option.name}, ${option.address}`
    : `${option.name}, ${city}, Japan`;

  return (
    <div
      className="rounded-lg px-3 py-3 text-sm border"
      style={{ borderColor: "var(--line)", background: "var(--paper)" }}
    >
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="font-bold" style={{ color: "var(--ink)", fontSize: 14 }}>
          {option.name}
        </span>
        {option.total && (
          <span className="shrink-0" style={{ color: "var(--forest)", fontWeight: 700, fontSize: 12.5 }}>
            {option.total}
          </span>
        )}
      </div>

      {option.guests && (
        <p style={{ margin: "0 0 8px", color: "var(--ink-soft)", fontSize: 11.5 }}>{option.guests}</p>
      )}

      {(option.confirmation || option.pin) && (
        <div className="flex gap-3 rounded-md px-2.5 py-2 mb-2.5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <Field label="Confirmación" icon={KeyRound} mono>{option.confirmation}</Field>
          <Field label="PIN" mono>{option.pin}</Field>
        </div>
      )}

      <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}>
        <Field label="Entrada" icon={CalendarCheck}>{option.checkIn}</Field>
        <Field label="Salida" icon={CalendarX}>{option.checkOut}</Field>
        <Field label="Habitaciones" icon={BedDouble}>{option.rooms}</Field>
        {option.phone && (
          <Field label="Teléfono" icon={Phone}>
            <a href={`tel:${option.phone.replace(/\s/g, "")}`} style={{ color: "var(--indigo)", textDecoration: "none" }}>
              {option.phone}
            </a>
          </Field>
        )}
      </div>

      {option.onsen?.has && (
        <div className="flex gap-1.5 rounded-md px-2.5 py-2 mb-2" style={{ background: "#1d355712" }}>
          <span style={{ fontSize: 13, lineHeight: 1, flexShrink: 0 }}>♨️</span>
          <p style={{ margin: 0, fontSize: 11.5, color: "var(--ink)", lineHeight: 1.4 }}>
            <strong>Onsen:</strong> {option.onsen.hours}
          </p>
        </div>
      )}

      {option.address && (
        <div className="flex gap-1.5 mb-2">
          <MapPin size={12} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>{option.address}</p>
        </div>
      )}

      {option.cancel && (
        <p style={{ margin: "0 0 4px", fontSize: 11, color: "var(--ink-soft)" }}>{option.cancel}</p>
      )}

      {option.note && (
        <p className="rounded-md px-2.5 py-2 mt-1" style={{
          margin: 0, fontSize: 11.5, lineHeight: 1.45,
          background: "rgba(201,162,39,0.12)", color: "var(--ink)",
        }}>
          {option.note}
        </p>
      )}

      <div className="flex gap-2 mt-2.5">
        {option.url && (
          <a
            href={option.url}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 transition-colors"
            style={{ background: "var(--indigo)", color: "white", fontSize: 12, fontWeight: 700, textDecoration: "none" }}
          >
            <img src="/icons/booking.png" alt="" width={14} height={14} style={{ borderRadius: 3, flexShrink: 0 }} />
            Ver reserva ↗
          </a>
        )}
        <a
          href={mapsUrl(mapQuery)}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 px-2 transition-colors"
          style={{ background: "var(--paper-raised)", color: "var(--shu)", fontSize: 12, fontWeight: 700, border: "1px solid var(--line)", textDecoration: "none" }}
        >
          <img src="/icons/google-maps.png" alt="" width={14} height={14} style={{ flexShrink: 0 }} />
          Cómo llegar ↗
        </a>
      </div>
    </div>
  );
}
