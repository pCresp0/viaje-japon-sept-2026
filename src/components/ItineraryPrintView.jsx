import { createPortal } from "react-dom";
import { tripMeta, flights, stays } from "../data/trip";
import { guides, guidesByDay } from "../data/guides";
import { guideImages } from "../data/guideImages";
import { popCulture } from "../data/popCulture";

const franchiseLabel = { pokemon: "Pokémon", digimon: "Digimon", pelicula: "Película" };

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
      marginTop: 10, padding: "8px 10px", background: "#f7f0e3",
      border: "1px solid #e6dcc4", borderRadius: 6, fontSize: 10,
    }}>
      <strong>🏨 {opt.name}</strong> — {stay.city} · {stay.nights}
      <br />
      {opt.address} {opt.phone && `· ${opt.phone}`}
      {opt.confirmation && <> · Confirmación: {opt.confirmation}</>}
      {opt.pin && <> · PIN: {opt.pin}</>}
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
        <img src={img} alt={g.name} style={{ width: "100%", maxHeight: 220, objectFit: "cover", display: "block" }} />
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
            {day.schedule.map((s, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e6dcc4" }}>
                <td style={{ padding: "4px 8px 4px 0", fontWeight: 700, color: "#7a2c2e", whiteSpace: "nowrap", verticalAlign: "top", width: 60 }}>
                  {s.time}
                </td>
                <td style={{ padding: "4px 0", verticalAlign: "top" }}>{s.text}</td>
              </tr>
            ))}
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
 * Deliberadamente NO usa acordeones ni nada plegado: todo el contenido
 * (incluidas las guías "Saber más", normalmente colapsadas en la app)
 * sale desplegado de antemano, porque en un PDF no se puede pulsar nada.
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
