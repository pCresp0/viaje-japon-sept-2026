import { createPortal } from "react-dom";
import { tripMeta, flights, stays } from "../data/trip";
import { guides, guidesByDay } from "../data/guides";
import { guideImages } from "../data/guideImages";
import { popCulture } from "../data/popCulture";

const franchiseLabel = { pokemon: "Pokémon", digimon: "Digimon", pelicula: "Película" };

/** Renderiza un bloque de texto con soporte de \n, **bold** y URLs clicables */
function RichText({ text, style = {} }) {
  if (!text) return null;

  const paragraphs = text.split("\n");

  return (
    <span style={style}>
      {paragraphs.map((para, pi) => {
        if (!para.trim()) return pi === 0 ? null : <br key={pi} />;

        // Parse **bold** and URLs
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
            parts.push(
              <a key={match.index} href={match[3]} style={{ color: "#7a2c2e", wordBreak: "break-all" }}>
                {match[3]} ↗
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

function FlightBlock({ flight }) {
  return (
    <div style={{ marginBottom: 10, fontSize: 10.5, lineHeight: 1.5 }}>
      <strong>{flight.label} · {flight.flightNumber}</strong> — {flight.text}
      {flight.trackUrl && (
        <>
          {" "}
          <a href={flight.trackUrl} style={{ color: "#7a2c2e" }}>Seguir vuelo ↗</a>
        </>
      )}
    </div>
  );
}

function StayBlock({ day }) {
  const stay = stays.find((s) => s.afterDay === day.num);
  if (!stay) return null;
  const opt = stay.options[0];
  return (
    <div style={{
      marginTop: 10, padding: "8px 10px", background: "#f0f8ee",
      border: "1px solid #b8ddb0", borderRadius: 6, fontSize: 10,
    }}>
      <strong>🏨 {opt.name}</strong> — {stay.city} · {stay.nights}
      <br />
      {opt.address} {opt.phone && `· ${opt.phone}`}
      {opt.confirmation && <> · Confirmación: {opt.confirmation}</>}
      {opt.pin && <> · PIN: {opt.pin}</>}
      {opt.checkIn && <> · ✅ Check-in: {opt.checkIn}</>}
      {opt.checkOut && <> · Check-out: {opt.checkOut}</>}
      {opt.url && (
        <>
          {" · "}
          <a href={opt.url} style={{ color: "#7a2c2e" }}>Ver reserva ↗</a>
        </>
      )}
    </div>
  );
}

function GuideBlock({ id, accentColor }) {
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
        />
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

/** Decide si una entrada del schedule es "especial" (sin hora real, solo etiqueta) */
function isSpecialEntry(time) {
  const special = ["🎫", "🧳", "📊", "💡", "🍙", "🍜", "🍵", "🚌", "🚍", "🏯", "📖"];
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

function DaySection({ day }) {
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

      {day.history && (
        <p style={{ fontSize: 10, lineHeight: 1.55, color: "#5a6070", background: "#f7f0e3", padding: "8px 10px", borderRadius: 6, marginBottom: 4 }}>
          <strong>Contexto histórico:</strong> {day.history}
        </p>
      )}

      <StayBlock day={day} />

      {placeIds.length > 0 && (
        <>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#1d3557", marginTop: 14, marginBottom: 2 }}>
            📖 Qué vamos a ver
          </p>
          {placeIds.map((id) => <GuideBlock key={id} id={id} accentColor="#1d3557" />)}
        </>
      )}
    </section>
  );
}

/**
 * Vista de impresión/exportación a PDF de todo el itinerario. Se monta
 * siempre en el DOM (vía portal en <body>) pero permanece oculta en
 * pantalla — sólo se hace visible dentro de @media print (ver
 * index.css), momento en el que el resto de la app se oculta.
 *
 * Renderiza markdown básico (**bold**), saltos de línea (\n) y URLs clicables.
 * Todo el contenido sale desplegado porque en un PDF no se puede pulsar nada.
 */
export default function ItineraryPrintView({ days }) {
  return createPortal(
    <div className="print-only" style={{ fontFamily: "Georgia, serif", color: "#1b1f27", background: "#fff" }}>
      {/* Portada */}
      <section style={{ marginBottom: 20, pageBreakAfter: "always", breakAfter: "page" }}>
        <p style={{ fontSize: 11, color: "#7a2c2e", letterSpacing: "0.08em", fontWeight: 700 }}>
          {tripMeta.subtitle?.toUpperCase()}
        </p>
        <h1 style={{ fontSize: 30, color: "#1d3557", margin: "4px 0 8px" }}>{tripMeta.title}</h1>
        <p style={{ fontSize: 12, color: "#5a6070", marginBottom: 16 }}>
          {tripMeta.people} viajeros · {tripMeta.start} → {tripMeta.end}
        </p>
        <FlightBlock flight={flights.out} />
        <FlightBlock flight={flights.back} />
        <p style={{ fontSize: 9.5, color: "#5a6070", marginTop: 20 }}>
          Documento generado desde la guía de viaje — {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </section>

      {days.map((day) => <DaySection key={day.num} day={day} />)}
    </div>,
    document.body
  );
}

