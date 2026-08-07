import { stays } from "../data/trip";
import { mapsUrl } from "../utils/maps";
import { MapPin, Phone, KeyRound, CalendarCheck, CalendarX, BedDouble, ExternalLink } from "lucide-react";

function Field({ label, children, mono = false }) {
  if (!children) return null;
  return (
    <div>
      <p style={{
        fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase",
        letterSpacing: "0.06em", marginBottom: 3, fontWeight: 600,
      }}>
        {label}
      </p>
      <p style={{
        fontSize: mono ? 14 : 13.5,
        fontWeight: mono ? 700 : 500,
        color: "var(--ink)",
        margin: 0,
        fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit",
        lineHeight: 1.4,
      }}>
        {children}
      </p>
    </div>
  );
}

function HotelCard({ stay, index }) {
  const hotel = stay.options[0];
  if (!hotel) return null;

  const mapQuery = hotel.address
    ? `${hotel.name}, ${hotel.address}`
    : `${hotel.name}, ${stay.city}, Japan`;

  return (
    <article
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      {/* Header */}
      <div className="px-5 py-4" style={{ background: "var(--indigo)", color: "white" }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p style={{ fontSize: 11, opacity: 0.7, margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Hotel {index + 1} · {stay.city}
            </p>
            <h3 className="font-display text-xl mt-0.5 leading-tight" style={{ margin: 0 }}>
              {hotel.name}
            </h3>
            <p style={{ fontSize: 12.5, opacity: 0.75, margin: "4px 0 0" }}>
              {stay.nights}
            </p>
          </div>
          {hotel.total && (
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontSize: 10, opacity: 0.65, margin: 0, textTransform: "uppercase" }}>Total</p>
              <p className="font-display" style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                {hotel.total}
              </p>
              {hotel.guests && (
                <p style={{ fontSize: 10, opacity: 0.65, margin: 0 }}>{hotel.guests}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Check-in / Check-out */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="rounded-xl p-3" style={{ background: "rgba(46,125,91,0.08)" }}>
            <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "#2e7d5b" }}>
              <CalendarCheck size={14} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Check-in
              </span>
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>
              {hotel.checkIn || "—"}
            </p>
          </div>
          <div className="rounded-xl p-3" style={{ background: "rgba(188,71,73,0.08)" }}>
            <div className="flex items-center gap-1.5 mb-1.5" style={{ color: "var(--shu)" }}>
              <CalendarX size={14} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Check-out
              </span>
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>
              {hotel.checkOut || "—"}
            </p>
          </div>
        </div>

        {/* Codes */}
        {(hotel.confirmation || hotel.pin) && (
          <div className="rounded-xl p-3.5" style={{ background: "var(--paper)", border: "1px solid var(--line)" }}>
            <div className="flex items-center gap-1.5 mb-3" style={{ color: "var(--indigo)" }}>
              <KeyRound size={14} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Códigos de reserva
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: hotel.confirmation && hotel.pin ? "1fr 1fr" : "1fr", gap: 12 }}>
              <Field label="Confirmación" mono>{hotel.confirmation}</Field>
              <Field label="PIN" mono>{hotel.pin}</Field>
            </div>
          </div>
        )}

        {/* Rooms + contact */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: 14 }}>
          {hotel.rooms && (
            <div className="flex gap-2">
              <BedDouble size={15} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />
              <Field label="Habitaciones">{hotel.rooms}</Field>
            </div>
          )}
          {hotel.phone && (
            <div className="flex gap-2">
              <Phone size={15} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />
              <Field label="Teléfono">
                <a href={`tel:${hotel.phone.replace(/\s/g, "")}`} style={{ color: "var(--indigo)", textDecoration: "none" }}>
                  {hotel.phone}
                </a>
              </Field>
            </div>
          )}
          {hotel.address && (
            <div className="flex gap-2" style={{ gridColumn: "1 / -1" }}>
              <MapPin size={15} style={{ color: "var(--ink-soft)", flexShrink: 0, marginTop: 2 }} />
              <Field label="Dirección">{hotel.address}</Field>
            </div>
          )}
        </div>

        {hotel.cancel && (
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: 0, lineHeight: 1.45 }}>
            {hotel.cancel}
          </p>
        )}
        {hotel.note && (
          <p className="rounded-lg px-3 py-2" style={{
            fontSize: 12.5, margin: 0, lineHeight: 1.45,
            background: "rgba(201,162,39,0.1)", color: "var(--ink)",
          }}>
            {hotel.note}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {hotel.url && (
            <a
              href={hotel.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-2"
              style={{ background: "var(--indigo)", color: "white", textDecoration: "none" }}
            >
              <ExternalLink size={14} /> Ver reserva Booking
            </a>
          )}
          <a
            href={mapsUrl(mapQuery)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-2"
            style={{ background: "var(--paper)", color: "var(--shu)", border: "1px solid var(--line)", textDecoration: "none" }}
          >
            <MapPin size={14} /> Cómo llegar
          </a>
        </div>
      </div>
    </article>
  );
}

export default function HotelsPage() {
  const totalGroup = stays.reduce((sum, s) => {
    const raw = s.options[0]?.total;
    if (!raw) return sum;
    const n = parseFloat(raw.replace(/[€\s]/g, "").replace(/\./g, "").replace(",", "."));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Alojamiento</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Hoteles</h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          Todo lo necesario para el check-in: confirmación, PIN, horarios, dirección y enlace a la reserva.
        </p>
      </div>

      {/* Summary strip */}
      <div className="rounded-2xl px-5 py-4 mb-6" style={{ background: "var(--indigo)", color: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div>
            <p style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Estancias</p>
            <p className="font-display" style={{ fontSize: 22, fontWeight: 700, margin: "2px 0 0" }}>{stays.length}</p>
          </div>
          <div>
            <p style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Noches</p>
            <p className="font-display" style={{ fontSize: 22, fontWeight: 700, margin: "2px 0 0" }}>14</p>
          </div>
          <div>
            <p style={{ fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Total grupo</p>
            <p className="font-display" style={{ fontSize: 22, fontWeight: 700, margin: "2px 0 0" }}>
              {totalGroup.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: 14,
          alignItems: "start",
        }}
      >
        {stays.map((stay, i) => (
          <HotelCard key={stay.id} stay={stay} index={i} />
        ))}
      </div>
    </div>
  );
}
