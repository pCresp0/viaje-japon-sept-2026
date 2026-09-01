import { useState, useEffect, useRef } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { mapsUrl } from "../utils/maps";
import { MapPin, Phone, KeyRound, CalendarCheck, CalendarX, BedDouble, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

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

const getHeaderColor = (city) => {
  if (!city) return "var(--indigo)";
  const c = city.toLowerCase();
  if (c.includes("kioto") || c.includes("kyoto") || c.includes("osaka")) return "var(--shu)";
  if (c.includes("kanazawa") || c.includes("takayama") || c.includes("magome") || c.includes("tsumago")) return "var(--forest)";
  if (c.includes("tokio") || c.includes("tokyo")) return "var(--indigo)";
  return "var(--indigo)";
};

function HotelCard({ stay, index, anchorId }) {
  const hotel = stay.options[0];
  const t = useT();
  const { highlightId } = useHighlight();
  const isHighlighted = anchorId && highlightId === anchorId;
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      setExpanded(true);
      const t = window.setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
      return () => window.clearTimeout(t);
    }
  }, [isHighlighted]);

  if (!hotel) return null;

  const mapQuery = hotel.address
    ? `${hotel.name}, ${hotel.address}`
    : `${hotel.name}, ${stay.city}, Japan`;
    
  const headerBg = getHeaderColor(stay.city);

  return (
    <article
      id={anchorId}
      ref={cardRef}
      className={"rounded-2xl overflow-hidden border" + (isHighlighted ? " search-highlight-pulse" : "")}
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      {/* Header */}
      <div 
        className="px-5 py-4 cursor-pointer transition-colors hover:opacity-95" 
        style={{ background: headerBg, color: "white" }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p style={{ fontSize: 11, opacity: 0.8, margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Hotel {index + 1} · {stay.city}
            </p>
            <h3 className="font-display text-xl mt-0.5 leading-tight" style={{ margin: 0 }}>
              {hotel.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span style={{ fontSize: 12.5, opacity: 0.9 }}>
                {stay.nights}
              </span>
              {hotel.paid ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(46,125,91,0.35)", color: "#d1fae5", border: "1px solid rgba(110,231,183,0.4)" }}>
                  ✓ Ya pagado (Juancar)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.35)", color: "#fef3c7", border: "1px solid rgba(252,211,77,0.4)" }}>
                  ⚠️ Pago en efectivo en hotel
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <a
              href={mapsUrl(mapQuery)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 transition-colors"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", textDecoration: "none" }}
            >
              <MapPin size={12} /> Maps
            </a>
            <div className="p-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>
      </div>

      {expanded && (
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

          {/* Actions & Price */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3" style={{ borderTop: "1px solid var(--line)" }}>
            {hotel.url && (
              <a
                href={hotel.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-2"
                style={{ background: headerBg, color: "white", textDecoration: "none" }}
              >
                <ExternalLink size={14} /> Ver reserva Booking
              </a>
            )}
            {hotel.total && (
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "auto" }}>
                <p style={{ fontSize: 10, opacity: 0.65, margin: 0, textTransform: "uppercase" }}>{t("common.total")}</p>
                <p className="font-display" style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--ink)", lineHeight: 1 }}>
                  {hotel.total}
                </p>
                <p style={{ fontSize: 11, fontWeight: 700, margin: "3px 0 0", color: hotel.paid ? "#2e7d5b" : "#b45309" }}>
                  {hotel.paid ? "✓ Pagado vía Booking" : "⚠️ En efectivo en hotel"}
                </p>
                {hotel.guests && (
                  <p style={{ fontSize: 10, opacity: 0.65, margin: "2px 0 0" }}>{hotel.guests}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function HotelsPage() {
  const { stays } = useContent();
  const t = useT();

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("hotels.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("hotels.title")}</h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          Todo lo necesario para el check-in: confirmación, PIN, horarios, dirección y enlace a la reserva.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr", // Forcing 1 column since they are collapsibles now, better to stack them
          gap: 14,
          alignItems: "start",
        }}
      >
        {stays.map((stay, i) => (
          <HotelCard key={stay.id} stay={stay} index={i} anchorId={slug("hotel", stay.id)} />
        ))}
      </div>
    </div>
  );
}
