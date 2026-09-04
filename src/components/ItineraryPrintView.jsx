import React from "react";
import { createPortal } from "react-dom";
import { useContent, useT } from "../i18n/LanguageContext";
import { guidesByDay } from "../data/guides";
import { guideImages } from "../data/guideImages";
import { popCulture } from "../data/popCulture";
import { pendingItems } from "../data/pending";
import { heymondoInsurance } from "../data/insurance";
import { gygFujiActivity, kenFujiActivity, visibilityTools } from "../data/fujiBookings";
import { foods } from "../data/foods";
import { sections as prepSections } from "../pages/PrepPage";
import { categories as phraseCategories, etiquette } from "../pages/PhrasesPage";
import { emergencyNumbers, embassy } from "../pages/EmergencyPage";
import { Plane, Train, Hotel, Euro, AlertCircle, Sparkles, CheckSquare, Clock } from "lucide-react";
import { diffDays, formatDateLong, todayISO } from "../utils/date";
import { formatEur, formatJpyEur, YEN_PER_EUR } from "../utils/money";
import { PASS_7_JPY, PASS_14_JPY, PASS_7_EUR, PASS_14_EUR } from "../data/jrPass";

const iconMap = {
  plane: Plane,
  train: Train,
  hotel: Hotel,
  euro: Euro,
  alert: AlertCircle,
  sparkles: Sparkles,
  check: CheckSquare,
  clock: Clock
};

const franchiseLabel = { pokemon: "Pokémon", digimon: "Digimon", pelicula: "Película" };
const PEOPLE = 5;


const CONFIRMED_TICKETS = [
  {
    name: "Nozomi 53",
    route: "Shinagawa → Kioto",
    when: "7 sept · 17:19 → 19:23",
    ref: "Smart EX 2000",
    car: "Coche 13",
    seats: "Pablo 13-E · Sergio 14-E · Juan Carlos 13-C · Randy 13-D · Thibaut 14-D",
    price: "¥68.850 · 373,27€ (grupo)",
    note: "QR-Ticket en la app / web. Nozomi no incluido en JR Pass.",
  },
  {
    name: "Thunderbird 5 + Kagayaki 508",
    route: "Kioto → Kanazawa",
    when: "12 sept · 08:10 → 10:03",
    ref: "JR-WEST 47932",
    car: "Recoger billetes físicos en Kyoto Station (máq. verdes)",
    seats: "5 adultos",
    price: "¥38.600 · 209,38€ (grupo)",
    note: "Llevar Mastercard física *8625 + PIN. Recoger preferiblemente el 11 sept.",
  },
  {
    name: "Nohi Bus Kanazawa → Shirakawa-go",
    route: "Kanazawa Sta. → Shirakawa-go",
    when: "13 sept · 08:40",
    ref: "12GO31991741",
    car: "—",
    seats: "5 asientos confirmados",
    price: "Incluido en buses Alpes",
    note: "Operador privado · no JR Pass.",
  },
  {
    name: "Nohi Bus Shirakawa-go → Takayama",
    route: "Shirakawa-go → Takayama",
    when: "13 sept · 13:15",
    ref: "12GO31992254",
    car: "—",
    seats: "5 asientos confirmados",
    price: "Incluido en buses Alpes",
    note: "Operador privado · no JR Pass.",
  },
  {
    name: "Nohi Bus Takayama → Magome",
    route: "Takayama → Magome",
    when: "14 sept · 08:00 → 10:45",
    ref: "08302008262",
    car: "Car 01",
    seats: "2C, 2D, 3B, 3C, 3D",
    price: "¥25.000 · 135,61€ (grupo)",
    note: "Canjear e-ticket en taquilla. PDF en la app.",
  },
  {
    name: "Shinano 4",
    route: "Nakatsugawa → Nagoya",
    when: "15 sept · 09:57 → 10:53",
    ref: "JR-WEST 42093",
    car: "Car 4",
    seats: "5 adultos",
    price: "¥14.350 · 77,84€ (grupo)",
    note: "Recoger billetes físicos antes de subir (Mastercard *8625 + PIN).",
  },
  {
    name: "Nozomi 358",
    route: "Nagoya → Tokio",
    when: "15 sept · 11:29 → 13:06",
    ref: "Smart EX 2002",
    car: "Coche 12",
    seats: "Pablo 11-E · Sergio 12-E · Juan Carlos 12-C · Randy 11-D · Thibaut 12-D",
    price: "¥54.500 · 295,62€ (grupo)",
    note: "QR-Ticket. Nozomi no incluido en JR Pass.",
  },
];

/** Renderiza un bloque de texto con soporte de \n, **bold** y URLs clicables */
function RichText({ text, style = {} }) {
  if (!text) return null;

  const paragraphs = text.split("\n");

  return (
    <span style={style}>
      {paragraphs.map((para, pi) => {
        if (!para.trim()) return pi === 0 ? null : <br key={pi} />;

        const parts = [];
        const pattern = /(\*\*(.+?)\*\*|(https?:\/\/[^\s)]+))/g;
        let last = 0;
        let match;

        while ((match = pattern.exec(para)) !== null) {
          if (match.index > last) {
            parts.push(para.slice(last, match.index));
          }
          if (match[2]) {
            parts.push(<strong key={match.index}>{match[2]}</strong>);
          } else if (match[3]) {
            const href = match[3];
            const isMaps = /maps\.app\.goo\.gl|google\.com\/maps/i.test(href);
            const isFlight = /flightaware\.com|flightradar24\.com|google\..*[\?&]q=(vuelo|flight|vol|\+?qr\d|\+?ibe\d)/i.test(href);
            const label = isMaps ? "📍 Maps ↗" : isFlight ? "✈️ Seguimiento vuelo ↗" : "🔗 Enlace ↗";
            parts.push(
              <a
                key={match.index}
                href={href}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                  fontSize: "0.78em",
                  fontWeight: 600,
                  padding: "1px 7px",
                  borderRadius: 999,
                  background: isFlight ? "rgba(192, 57, 43, 0.09)" : "rgba(29, 53, 87, 0.09)",
                  color: isFlight ? "var(--shu, #c0392b)" : "var(--indigo, #1d3557)",
                  textDecoration: "none",
                  marginLeft: 4,
                  border: isFlight ? "1px solid rgba(192, 57, 43, 0.22)" : "1px solid rgba(29, 53, 87, 0.18)",
                }}
              >
                {label}
              </a>
            );
          }
          last = match.index + match[0].length;
        }
        if (last < para.length) parts.push(para.slice(last));

        return (
          <span key={pi} style={{ display: "block", marginBottom: pi < paragraphs.length - 1 ? 3 : 0 }}>
            {parts}
          </span>
        );
      })}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 16, color: "#1d3557", margin: "0 0 10px",
      borderBottom: "2px solid #7a2c2e", paddingBottom: 4,
    }}>
      {children}
    </h2>
  );
}

function FlightBlock({ flight }) {
  return (
    <div style={{ marginBottom: 12, fontSize: 10.5, lineHeight: 1.55 }}>
      <strong>{flight.label} · {flight.flightNumber}</strong>
      <br />
      {flight.text}
      {flight.leg1 && (
        <>
          <br />
          <span style={{ color: "#5a6070" }}>
            Tramo 1: {flight.leg1.number} ({flight.leg1.route}, {flight.leg1.duration})
            {flight.leg1.trackUrl && <> · <a href={flight.leg1.trackUrl} style={{ color: "#7a2c2e" }}>Seguir ↗</a></>}
          </span>
        </>
      )}
      {flight.leg2 && (
        <>
          <br />
          <span style={{ color: "#5a6070" }}>
            Tramo 2: {flight.leg2.number} ({flight.leg2.route}, {flight.leg2.duration})
            {flight.leg2.trackUrl && <> · <a href={flight.leg2.trackUrl} style={{ color: "#7a2c2e" }}>Seguir ↗</a></>}
          </span>
        </>
      )}
      {flight.layover && (
        <>
          <br />
          <span style={{ color: "#5a6070" }}>
            Escala {flight.layover.city}: {flight.layover.connection}
          </span>
        </>
      )}
    </div>
  );
}

function StayBlock({ day }) {
  const { stays } = useContent();
  const stay = stays.find((s) => s.afterDay === day.num);
  if (!stay) return null;
  return <HotelCard stay={stay} compact />;
}

function HotelCard({ stay, compact = false }) {
  const opt = stay.options[0];
  if (!opt) return null;
  return (
    <div style={{
      marginTop: compact ? 10 : 0, marginBottom: compact ? 0 : 10,
      padding: "8px 10px", background: "#f0f8ee",
      border: "1px solid #b8ddb0", borderRadius: 6, fontSize: 10, lineHeight: 1.5,
      pageBreakInside: "avoid",
    }}>
      <strong>🏨 {opt.name}</strong> — {stay.city} · {stay.nights}
      <br />
      {opt.address && <>{opt.address}{opt.phone ? ` · ${opt.phone}` : ""}<br /></>}
      {opt.confirmation && <>Confirmación: <strong>{opt.confirmation}</strong>{opt.pin ? <> · PIN: <strong>{opt.pin}</strong></> : ""}<br /></>}
      {opt.checkIn && <>Check-in: {opt.checkIn}{opt.checkOut ? ` · Check-out: ${opt.checkOut}` : ""}<br /></>}
      {opt.rooms && <>Habitaciones: {opt.rooms}{opt.guests ? ` · ${opt.guests}` : ""}<br /></>}
      {opt.total && <>Total: <strong>{opt.total}</strong>{opt.cancel ? ` · ${opt.cancel}` : ""}<br /></>}
      {opt.note && <><span style={{ color: "#5a6070" }}>{opt.note}</span><br /></>}
      {opt.url && <a href={opt.url} style={{ color: "#7a2c2e" }}>Ver reserva ↗</a>}
    </div>
  );
}

function GuideBlock({ id, accentColor, guides }) {
  const g = guides[id];
  if (!g) return null;
  const img = guideImages[id];
  const refs = popCulture[id];
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.name)}`;

  return (
    <div style={{
      marginTop: 12, pageBreakInside: "avoid", breakInside: "avoid",
      border: "1px solid #e6dcc4", borderRadius: 8, overflow: "hidden",
    }}>
      {img && (
        <img
          src={img}
          alt={g.name}
          style={{
            display: "block", margin: "0 auto",
            maxWidth: "100%", maxHeight: "65mm",
            width: "auto", height: "auto",
          }}
         onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      )}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
          <strong style={{ fontSize: 12.5, color: accentColor }}>
            {g.name} <span style={{ fontWeight: 400, color: "#5a6070", fontSize: 10 }}>{g.jp}</span>
          </strong>
          <a href={mapsUrl} style={{ color: "#7a2c2e", fontSize: 9.5 }}>Ver en mapa ↗</a>
        </div>
        <p style={{ fontSize: 9.5, color: "#5a6070", marginBottom: 6 }}>{g.founded} · {g.tagline}</p>

        {g.sections?.map((s, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#1d3557", marginBottom: 2 }}>{s.title}</p>
            <p style={{ fontSize: 10, lineHeight: 1.5, color: "#1b1f27" }}>{s.body}</p>
          </div>
        ))}

        {g.curiosities?.length > 0 && (
          <div style={{ marginTop: 6 }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, color: "#5a6070", marginBottom: 2 }}>CURIOSIDADES</p>
            <ul style={{ margin: 0, paddingLeft: 14, fontSize: 9.5, lineHeight: 1.5 }}>
              {g.curiosities.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        )}

        {g.tip && (
          <p style={{ fontSize: 9.5, marginTop: 6, fontStyle: "italic", color: "#7a2c2e" }}>💡 {g.tip}</p>
        )}

        {refs?.length > 0 && (
          <div style={{ marginTop: 6, borderTop: "1px dashed #e6dcc4", paddingTop: 6 }}>
            {refs.map((r, i) => (
              <p key={i} style={{ fontSize: 9.5, lineHeight: 1.5, marginBottom: 3 }}>
                <strong>{franchiseLabel[r.franchise] || r.franchise}</strong> · {r.title}: {r.detail}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function isSpecialEntry(time) {
  const special = ["🎫", "🧳", "📊", "💡", "🍙", "🍜", "🍵", "🚌", "🚍", "🏯", "📖", "📱"];
  return special.some((e) => time?.startsWith(e));
}

function ScheduleRow({ entry }) {
  const special = isSpecialEntry(entry.time);
  const isHotel = entry.text?.includes("REGRESO AL HOTEL") || entry.text?.includes("DESCANSO EN") || entry.time?.includes("🏨");

  if (special) {
    return (
      <tr>
        <td colSpan={2} style={{
          padding: "6px 8px",
          background: "#f7f0e3",
          borderBottom: "1px solid #e6dcc4",
          fontSize: 9.5,
        }}>
          <strong style={{ color: "#7a2c2e" }}>{entry.time}</strong>{" "}
          <RichText text={entry.text} />
        </td>
      </tr>
    );
  }

  if (isHotel) {
    return (
      <tr style={{ background: "#f0f8ee" }}>
        <td style={{
          padding: "6px 8px 6px 0", fontWeight: 700, color: "#2e7d5b",
          whiteSpace: "nowrap", verticalAlign: "top", width: 60,
          borderBottom: "1px solid #b8ddb0",
        }}>
          {entry.time}
        </td>
        <td style={{ padding: "6px 0", verticalAlign: "top", borderBottom: "1px solid #b8ddb0", fontSize: 10 }}>
          <RichText text={entry.text} />
        </td>
      </tr>
    );
  }

  return (
    <tr style={{ borderBottom: "1px solid #e6dcc4" }}>
      <td style={{
        padding: "4px 8px 4px 0", fontWeight: 700, color: "#7a2c2e",
        whiteSpace: "nowrap", verticalAlign: "top", width: 60,
      }}>
        {entry.time}
      </td>
      <td style={{ padding: "4px 0", verticalAlign: "top", fontSize: 10, lineHeight: 1.55 }}>
        <RichText text={entry.text} />
      </td>
    </tr>
  );
}

function DayTicketNote({ dayNum }) {
  const tickets = {
    1: CONFIRMED_TICKETS[0],
    6: CONFIRMED_TICKETS[1],
    8: CONFIRMED_TICKETS[4],
    9: null,
  };
  if (dayNum === 9) {
    return (
      <div style={{ marginTop: 8, padding: "8px 10px", background: "#eef4fb", border: "1px solid #b8c9de", borderRadius: 6, fontSize: 9.5, lineHeight: 1.5 }}>
        <strong>🎟️ Billetes del día</strong>
        <br />
        <strong>{CONFIRMED_TICKETS[5].name}</strong> · {CONFIRMED_TICKETS[5].ref} · {CONFIRMED_TICKETS[5].car} · {CONFIRMED_TICKETS[5].price}
        <br />
        <strong>{CONFIRMED_TICKETS[6].name}</strong> · {CONFIRMED_TICKETS[6].ref} · {CONFIRMED_TICKETS[6].car}
        <br />
        Asientos: {CONFIRMED_TICKETS[6].seats}
      </div>
    );
  }
  const t = tickets[dayNum];
  if (!t) return null;
  return (
    <div style={{ marginTop: 8, padding: "8px 10px", background: "#eef4fb", border: "1px solid #b8c9de", borderRadius: 6, fontSize: 9.5, lineHeight: 1.5 }}>
      <strong>🎟️ {t.name}</strong> · {t.ref} · {t.car}
      <br />
      {t.seats} · {t.price}
      <br />
      <span style={{ color: "#5a6070" }}>{t.note}</span>
    </div>
  );
}

function DayFujiNote({ dayNum }) {
  const booking = gygFujiActivity.bookings.find((b) => b.dayNum === dayNum);
  if (!booking) return null;
  return (
    <div style={{ marginTop: 8, padding: "8px 10px", background: "#e8f4fc", border: "1px solid #7dd3fc", borderRadius: 6, fontSize: 9.5, lineHeight: 1.5 }}>
      <strong>🗻 Opción Monte Fuji GYG (reserva {booking.code})</strong>
      <br />
      PIN: {booking.pin} · {booking.status}
      <br />
      Cancelar antes de: {booking.cancelDeadline}
      <br />
      Punto de encuentro: {gygFujiActivity.meetingPoint} · {gygFujiActivity.meetingTime}
    </div>
  );
}

function DaySection({ day, guides }) {
  const placeIds = guidesByDay[day.num] || [];
  return (
    <section style={{ marginBottom: 22, pageBreakBefore: "always", breakBefore: "page" }}>
      <div style={{ borderBottom: "3px solid #7a2c2e", paddingBottom: 6, marginBottom: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#7a2c2e", letterSpacing: "0.05em", margin: 0 }}>
          DÍA {day.num} · {day.weekday?.toUpperCase()} {day.date}
        </p>
        <h2 style={{ fontSize: 18, margin: "2px 0 0", color: "#1d3557" }}>{day.title}</h2>
        <p style={{ fontSize: 11, color: "#5a6070", margin: "2px 0 0" }}>{day.cities}</p>
      </div>

      <p style={{ fontSize: 11.5, lineHeight: 1.6, marginBottom: 8 }}>{day.summary}</p>

      {day.schedule?.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, marginBottom: 8 }}>
          <tbody>
            {day.schedule.map((s, i) => <ScheduleRow key={i} entry={s} />)}
          </tbody>
        </table>
      )}

      <DayTicketNote dayNum={day.num} />
      <DayFujiNote dayNum={day.num} />

      {day.num === 14 && (
        <div style={{ marginTop: 8, padding: "8px 10px", background: "#e8f4fc", border: "1px solid #7dd3fc", borderRadius: 6, fontSize: 9.5, lineHeight: 1.5 }}>
          <strong>🗻 Excursión con Ken Kaneshima</strong> — {kenFujiActivity.dateFormatted}
          <br />
          {kenFujiActivity.price} · {kenFujiActivity.language}
          <br />
          Salida: {kenFujiActivity.startPoint} · Fin: {kenFujiActivity.endPoint}
          <br />
          Tel: {kenFujiActivity.phone} · <a href={kenFujiActivity.url} style={{ color: "#7a2c2e", fontWeight: 600 }}>Web excursión ↗</a>
        </div>
      )}

      {day.history && (
        <p style={{ fontSize: 10, lineHeight: 1.55, color: "#5a6070", background: "#f7f0e3", padding: "8px 10px", borderRadius: 6, marginTop: 8, marginBottom: 4 }}>
          <strong>Contexto histórico:</strong> {day.history}
        </p>
      )}

      <StayBlock day={day} />

      {placeIds.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", marginTop: 14, marginBottom: 2 }}>
            📖 Qué vamos a ver
          </p>
          {placeIds.map((id) => <GuideBlock key={id} id={id} accentColor="#1d3557" guides={guides} />)}
        </>
      )}
    </section>
  );
}

function Appendix({ title, children }) {
  return (
    <section style={{ marginBottom: 22, pageBreakBefore: "always", breakBefore: "page" }}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}

/**
 * Vista de impresión/exportación a PDF completa del viaje.
 * Incluye itinerario día a día + anexos (vuelos, hoteles, billetes, Fuji,
 * transporte, presupuesto, emergencias, pendientes, preparativos, comidas, frases).
 */
export default function ItineraryPrintView({ days }) {
  const { tripMeta, flights, stays, blocks, transports, budget, guides } = useContent();
  const purchased = transports.filter((x) => x.purchased);
  const pending = transports.filter((x) => !x.purchased);
  const jrCovered = transports.filter((x) => x.jrPassCovered);
  const sumJpy = (arr) => arr.reduce((s, x) => s + (x.jpy || 0), 0);
  const sumEur = (arr) => arr.reduce((s, x) => s + (x.real || 0), 0);
  const coveredJpy = sumJpy(jrCovered);
  const coveredEur = sumEur(jrCovered);
  const paidJpy = sumJpy(purchased);
  const paidEur = sumEur(purchased);
  const pendJpy = sumJpy(pending);
  const pendEur = sumEur(pending);

  return createPortal(
    <div className="print-only" style={{ fontFamily: "Georgia, serif", color: "#1b1f27", background: "#fff" }}>
      {/* ── Portada ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 20, pageBreakAfter: "always", breakAfter: "page" }}>
        <p style={{ fontSize: 11, color: "#7a2c2e", letterSpacing: "0.08em", fontWeight: 700 }}>
          {tripMeta.subtitle?.toUpperCase()}
        </p>
        <h1 style={{ fontSize: 30, color: "#1d3557", margin: "4px 0 8px" }}>{tripMeta.title}</h1>
        <p style={{ fontSize: 12, color: "#5a6070", marginBottom: 16 }}>
          {tripMeta.people} viajeros · {tripMeta.start} → {tripMeta.end}
        </p>

        <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", marginBottom: 6 }}>Índice del PDF</p>
        <ol style={{ fontSize: 10.5, lineHeight: 1.7, margin: "0 0 16px", paddingLeft: 18, color: "#5a6070" }}>
          <li>Portada · vuelos y bloques del viaje</li>
          <li>Itinerario día a día (días 0–15) con guías de lugares</li>
          <li>Anexos: hoteles · billetes confirmados · Fuji · transporte · presupuesto</li>
          <li>Anexos: emergencias · pendientes · preparativos · comidas · frases</li>
        </ol>

        <div style={{ padding: "10px 12px", background: "#f7f0e3", borderRadius: 8, marginBottom: 14, fontSize: 10.5, lineHeight: 1.55 }}>
          <strong>Reserva Qatar Airways</strong>
          <br />
          Referencia: <strong style={{ fontFamily: "monospace" }}>{flights.booking.ref}</strong>
          {" · "}PIN: <strong style={{ fontFamily: "monospace" }}>{flights.booking.pin}</strong>
          <br />
          {flights.price.people} personas · <strong>{flights.price.total}</strong> ({flights.price.perPerson}/persona)
        </div>

        <FlightBlock flight={flights.out} />
        <FlightBlock flight={flights.back} />

        <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", margin: "16px 0 8px" }}>Bloques del viaje</p>
        {blocks.map((b) => (
          <div key={b.id} style={{ marginBottom: 10, fontSize: 10.5, lineHeight: 1.5, borderLeft: `4px solid ${b.color}`, paddingLeft: 10 }}>
            <strong>{b.emoji} {b.title}</strong> — días {b.days.join(", ")}
            <br />
            <span style={{ color: "#5a6070" }}>{b.sleepSummary}</span>
            {b.logisticaTip && <><br /><span style={{ color: "#7a2c2e" }}>💡 {b.logisticaTip}</span></>}
            {b.fujiStrategy && <><br /><span style={{ color: "#5a6070" }}>{b.fujiStrategy}</span></>}
          </div>
        ))}

        <p style={{ fontSize: 9.5, color: "#5a6070", marginTop: 20 }}>
          Documento completo generado desde la guía de viaje — {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}.
          Los QR de billetes y Visit Japan Web están en la app (no se imprimen aquí por privacidad y legibilidad).
        </p>
      </section>

      {/* ── Días ────────────────────────────────────────────────── */}
      {days.map((day) => <DaySection key={day.num} day={day} guides={guides} />)}

      {/* ── Anexo: Hoteles ──────────────────────────────────────── */}
      <Appendix title="Anexo · Alojamientos (detalle completo)">
        {stays.map((stay) => <HotelCard key={stay.id} stay={stay} />)}
      </Appendix>

      {/* ── Anexo: Billetes ─────────────────────────────────────── */}
      <Appendix title="Anexo · Billetes confirmados">
        <p style={{ fontSize: 10, color: "#5a6070", marginBottom: 10, lineHeight: 1.5 }}>
          Resumen de reservas ya pagadas. Los QR individuales están en la pestaña Transportes / Itinerario de la app.
        </p>
        {CONFIRMED_TICKETS.map((t) => (
          <div key={t.ref} style={{
            marginBottom: 10, padding: "8px 10px", border: "1px solid #e6dcc4",
            borderRadius: 6, fontSize: 10, lineHeight: 1.5, pageBreakInside: "avoid",
          }}>
            <strong>{t.name}</strong> — {t.route}
            <br />
            {t.when} · {t.ref} · {t.car}
            <br />
            {t.seats}
            <br />
            <strong>{t.price}</strong>
            <br />
            <span style={{ color: "#5a6070" }}>{t.note}</span>
          </div>
        ))}
      </Appendix>

      {/* ── Anexo: Fuji ─────────────────────────────────────────── */}
      <Appendix title="Anexo · Excursión Monte Fuji">
        <div style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 12 }}>
          <strong>{kenFujiActivity.title}</strong> (día 14 · confirmado)
          <br />
          Guía: {kenFujiActivity.guide} · Tel: {kenFujiActivity.phone}
          <br />
          {kenFujiActivity.dateFormatted} · {kenFujiActivity.price}
          <br />
          {kenFujiActivity.transport} · {kenFujiActivity.language}
          <br />
          Inicio: {kenFujiActivity.startPoint}
          <br />
          Fin: {kenFujiActivity.endPoint}
          <br />
          Comida: {kenFujiActivity.food}
          <br />
          Paradas: {kenFujiActivity.stops?.join(" · ")}
          <br />
          <a href={kenFujiActivity.url} style={{ color: "#7a2c2e", fontWeight: 600 }}>Web excursión ↗</a>
        </div>

        <div style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 10 }}>
          <strong>Estrategia GYG (días 10–13)</strong> — {gygFujiActivity.title}
          <br />
          {gygFujiActivity.participants} · {gygFujiActivity.totalPrice} · pago: {gygFujiActivity.paymentDate}
          <br />
          Encuentro: {gygFujiActivity.meetingPoint}
          <br />
          {gygFujiActivity.meetingTime} · duración {gygFujiActivity.duration} · {gygFujiActivity.language}
          <br />
          {gygFujiActivity.foodNotice}
          <br />
          Proveedor: {gygFujiActivity.provider} · {gygFujiActivity.providerPhone}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10, marginBottom: 10 }}>
          <thead>
            <tr style={{ background: "#f7f0e3" }}>
              <th style={{ textAlign: "left", padding: 6 }}>Día</th>
              <th style={{ textAlign: "left", padding: 6 }}>Código</th>
              <th style={{ textAlign: "left", padding: 6 }}>PIN</th>
              <th style={{ textAlign: "left", padding: 6 }}>Cancelar antes de</th>
            </tr>
          </thead>
          <tbody>
            {gygFujiActivity.bookings.map((b) => (
              <tr key={b.code} style={{ borderBottom: "1px solid #e6dcc4" }}>
                <td style={{ padding: 6 }}>{b.dateFormatted}</td>
                <td style={{ padding: 6, fontFamily: "monospace" }}>{b.code}</td>
                <td style={{ padding: 6, fontFamily: "monospace" }}>{b.pin}</td>
                <td style={{ padding: 6 }}>{b.cancelDeadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 10, color: "#5a6070", lineHeight: 1.5 }}>
          Visibilidad: {visibilityTools.isFujiVisible.name} ({visibilityTools.isFujiVisible.url}) · {visibilityTools.mtFujiToday.name} ({visibilityTools.mtFujiToday.url}).
          {" "}{visibilityTools.goldenRule}
        </p>
      </Appendix>

      {/* ── Anexo: Transporte ───────────────────────────────────── */}
      <Appendix title="Anexo · Transporte, Suica y JR Pass">
        <p style={{ fontSize: 10.5, lineHeight: 1.55, marginBottom: 10 }}>
          <strong>Ya pagado:</strong> {formatJpyEur(paidJpy, paidEur)}/persona
          {" · "}
          <strong>Pendiente est.:</strong> {formatJpyEur(pendJpy, pendEur)}/persona
          {" · "}
          <strong>Total est.:</strong> {formatJpyEur(paidJpy + pendJpy, paidEur + pendEur)}/persona
        </p>

        <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", margin: "12px 0 6px" }}>Trayectos (todos)</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9.5, marginBottom: 12 }}>
          <thead>
            <tr style={{ background: "#f7f0e3" }}>
              <th style={{ textAlign: "left", padding: 5 }}>Día</th>
              <th style={{ textAlign: "left", padding: 5 }}>Trayecto</th>
              <th style={{ textAlign: "left", padding: 5 }}>Estado</th>
              <th style={{ textAlign: "right", padding: 5 }}>/pax</th>
            </tr>
          </thead>
          <tbody>
            {transports.map((t, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e6dcc4" }}>
                <td style={{ padding: 5, verticalAlign: "top" }}>{t.day}</td>
                <td style={{ padding: 5, verticalAlign: "top" }}>
                  <strong>{t.name}</strong>
                  <br />
                  <span style={{ color: "#5a6070" }}>{t.from} → {t.to}</span>
                </td>
                <td style={{ padding: 5, verticalAlign: "top" }}>{t.purchased ? "✅ Comprado" : t.advance ? "🟠 Adelantado" : "🟢 En Japón"}</td>
                <td style={{ padding: 5, verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                  {t.jpy != null ? formatJpyEur(t.jpy, t.real) : formatEur(t.real)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: "8px 10px", background: "#f7f0e3", borderRadius: 6, fontSize: 10, lineHeight: 1.55, marginBottom: 10 }}>
          <strong>Welcome Suica / IC</strong>
          <br />
          iPhone (Pablo, Juan Carlos, Randy): app Welcome Suica Mobile → Apple Wallet. Android (Sergio, Thibaut): tarjeta física en Narita (JR East).
          Sin depósito ¥500 (~3€); saldo no reembolsable. Recarga inicial recomendada ¥3.000–¥5.000 (~16–27€)/persona.
        </div>

        <div style={{ padding: "8px 10px", background: "#eef4fb", borderRadius: 6, fontSize: 10, lineHeight: 1.55, marginBottom: 10 }}>
          <strong>Smart EX — cambios</strong>
          <br />
          Modificaciones online sin coste hasta 4 min antes de la salida (si no se ha usado el QR ni impreso el billete).
          Día 1: si peligra la conexión al Nozomi 53, cambiar en Smart EX antes de las 17:19.
        </div>

        <div style={{ padding: "8px 10px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: 6, fontSize: 10, lineHeight: 1.55 }}>
          <strong>JR Pass — NO COMPENSA</strong>
          <br />
          Trayectos cubiertos por el Pass: ~{formatJpyEur(coveredJpy, coveredEur)}/persona
          {" vs "}Pass 7d {formatJpyEur(PASS_7_JPY, PASS_7_EUR)}
          {" / "}Pass 14d {formatJpyEur(PASS_14_JPY, PASS_14_EUR)}.
          Agencia jrpass.com: 284€ / 455€ / 568€. Tipo cambio ~{YEN_PER_EUR} ¥/€. Nozomi no incluido. Un Pass de 7 días no cubre a la vez N'EX (día 1), Alpes y Fuji (día 14).
        </div>
      </Appendix>

      {/* ── Anexo: Presupuesto ──────────────────────────────────── */}
      <Appendix title="Anexo · Presupuesto">
        <p style={{ fontSize: 12, marginBottom: 10 }}>
          <strong>Total / persona:</strong> {budget.totalPerPerson}
          {" · "}
          <strong>Grupo:</strong> {budget.totalGroup}
        </p>
        <p style={{ fontSize: 9.5, color: "#5a6070", marginBottom: 12 }}>{budget.note}</p>
        <div style={{ padding: "8px 10px", background: "#f7f0e3", borderRadius: 6, fontSize: 10, marginBottom: 12, lineHeight: 1.5 }}>
          Vuelos · Ref. <strong>{flights.booking.ref}</strong> · PIN <strong>{flights.booking.pin}</strong>
          {" · "}{flights.price.total} ({flights.price.perPerson}/pax)
        </div>
        {budget.categories.map((c) => (
          <div key={c.title} style={{ marginBottom: 12, pageBreakInside: "avoid" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", margin: "0 0 4px" }}>
              {c.title} — {c.perPerson}/pax · grupo {c.total}
            </p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10, lineHeight: 1.5, color: "#5a6070" }}>
              {c.details.map((d, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: d }} />
              ))}
            </ul>
          </div>
        ))}
      </Appendix>

      {/* ── Anexo: Emergencias ──────────────────────────────────── */}
      <Appendix title="Anexo · Emergencias y seguro">
        <div style={{ padding: "10px 12px", background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 8, marginBottom: 12, fontSize: 10.5, lineHeight: 1.55 }}>
          <strong>{heymondoInsurance.product}</strong>
          <br />
          Póliza Nº <strong>{heymondoInsurance.policyNumber}</strong> · {heymondoInsurance.dates.start} – {heymondoInsurance.dates.end}
          <br />
          Asistencia 24h: <strong>{heymondoInsurance.assistancePhone}</strong>
          {" · "}Reembolsos: {heymondoInsurance.reimbursementPhone}
          <br />
          Portal: {heymondoInsurance.portalUrl}
          <br />
          Asegurados: {heymondoInsurance.travelers.map((t) => t.name).join(" · ")}
          <br />
          Precio: {heymondoInsurance.pricing.totalPrice}
          <br />
          📁 Documentación completa (DNI, PDFs): {heymondoInsurance.documentsDriveUrl}
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 6px", color: "#1d3557" }}>Coberturas principales</p>
        <ul style={{ fontSize: 10, lineHeight: 1.5, margin: "0 0 12px", paddingLeft: 16 }}>
          {heymondoInsurance.topCoverages.filter((c) => c.highlight).map((c) => (
            <li key={c.label}><strong>{c.label}:</strong> {c.amount}</li>
          ))}
        </ul>
        <p style={{ fontSize: 11, fontWeight: 700, margin: "0 0 6px", color: "#1d3557" }}>Números en Japón</p>
        {emergencyNumbers.map((e) => (
          <p key={e.number} style={{ fontSize: 10.5, margin: "0 0 4px", lineHeight: 1.45 }}>
            <strong>{e.label}: {e.number}</strong> — {e.note}
          </p>
        ))}
        <p style={{ fontSize: 11, fontWeight: 700, margin: "12px 0 6px", color: "#1d3557" }}>{embassy.name}</p>
        <p style={{ fontSize: 10.5, lineHeight: 1.5, margin: 0 }}>
          {embassy.address}
          <br />
          General: {embassy.phone} · Emergencia 24h: <strong>{embassy.emergencyPhone}</strong>
          <br />
          {embassy.note}
        </p>
      </Appendix>

      {/* ── Anexo: Pendientes ───────────────────────────────────── */}
      <Appendix title="Anexo · Pendientes">
        {pendingItems.map((item) => (
          <div key={item.id} style={{
            marginBottom: 10, padding: "8px 10px", border: "1px solid #e6dcc4",
            borderRadius: 6, fontSize: 10, lineHeight: 1.5, pageBreakInside: "avoid",
          }}>
            <strong>{item.title}</strong>
            {item.deadline && <> · <span style={{ color: "#7a2c2e" }}>{item.deadline}</span></>}
            <br />
            <RichText text={item.detail} style={{ color: "#5a6070" }} />
          </div>
        ))}
      </Appendix>

      {/* ── Anexo: Preparativos ─────────────────────────────────── */}
      <Appendix title="Anexo · Preparativos (checklist)">
        {prepSections.map((section) => (
          <div key={section.id} style={{ marginBottom: 12, pageBreakInside: "avoid" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: section.color, margin: "0 0 4px" }}>{section.title}</p>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 10, lineHeight: 1.55 }}>
              {section.items.map((item) => (
                <li key={item.id}>☐ {item.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </Appendix>

      {/* ── Anexo: Comidas ──────────────────────────────────────── */}
      <Appendix title="Anexo · Comidas típicas">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9.5 }}>
          <thead>
            <tr style={{ background: "#f7f0e3" }}>
              <th style={{ textAlign: "left", padding: 5 }}>Plato</th>
              <th style={{ textAlign: "left", padding: 5 }}>Dónde</th>
              <th style={{ textAlign: "left", padding: 5 }}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((f) => (
              <tr key={f.id} style={{ borderBottom: "1px solid #e6dcc4" }}>
                <td style={{ padding: 5, verticalAlign: "top" }}>
                  <strong>{f.name}</strong> <span style={{ color: "#5a6070" }}>{f.jp}</span>
                  <br />
                  <span style={{ color: "#5a6070" }}>{f.desc}</span>
                  {f.tip && <><br /><em style={{ color: "#7a2c2e" }}>{f.tip}</em></>}
                </td>
                <td style={{ padding: 5, verticalAlign: "top" }}>{f.where}</td>
                <td style={{ padding: 5, verticalAlign: "top", whiteSpace: "nowrap" }}>{f.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Appendix>

      {/* ── Anexo: Frases ───────────────────────────────────────── */}
      <Appendix title="Anexo · Frases y etiqueta">
        {phraseCategories.map((cat) => (
          <div key={cat.id} style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: cat.color, margin: "0 0 4px" }}>{cat.title}</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9.5, marginBottom: 6 }}>
              <tbody>
                {cat.phrases.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #e6dcc4" }}>
                    <td style={{ padding: "3px 5px", width: "32%" }}>{p.jp}</td>
                    <td style={{ padding: "3px 5px", width: "28%", color: "#5a6070" }}>{p.romaji}</td>
                    <td style={{ padding: "3px 5px" }}>{p.es}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", margin: "8px 0 6px" }}>Etiqueta</p>
        {etiquette.map((e) => (
          <p key={e.title} style={{ fontSize: 10, lineHeight: 1.5, margin: "0 0 6px" }}>
            <strong>{e.title}:</strong> {e.text}
          </p>
        ))}
      </Appendix>
    </div>,
    document.body
  );
}
