import React from "react";
import { createPortal } from "react-dom";
import { useContent, useT } from "../i18n/LanguageContext";
import { BookOpen, Headphones, Film, MapPinned } from "lucide-react";

export default function HistoryPrintView() {
  const { historyPeriods, furtherReading, guides } = useContent();
  const t = useT();

  return createPortal(
    <div
      className="print-only history-print-view"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: "#1b1f27",
        background: "#ffffff",
        padding: 0,
        maxWidth: "100%",
        lineHeight: 1.5,
      }}
    >
      {/* ── PORTADA / CABECERA DEL DOCUMENTO ─────────────────────── */}
      <div
        style={{
          borderBottom: "3px double #bc4749",
          paddingBottom: "16px",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#bc4749",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            🇯🇵 Viaje a Japón · Septiembre 2026 · Guía de Lectura
          </span>
          <span style={{ fontSize: 9.5, color: "#5a6070", fontStyle: "italic" }}>
            Edición completa para viaje y vuelos
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            fontSize: 26,
            fontWeight: 700,
            color: "#1d3557",
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          Historia y Cultura de Japón
        </h1>

        <p style={{ fontSize: 11, color: "#444b58", margin: 0, lineHeight: 1.6, maxWidth: "90%" }}>
          Recorrido cronológico completo desde los orígenes prehistóricos hasta la era contemporánea.
          Incluye ilustraciones de obras maestras del arte japonés, literatura cortesana, filosofía budista y sintoísta,
          y referencias cruzadas directas con los lugares, templos, santuarios y castillos visitados a lo largo del itinerario.
        </p>
      </div>

      {/* ── ÍNDICE CRONOLÓGICO RÁPIDO ──────────────────────────── */}
      <div
        style={{
          background: "#fdfbf7",
          border: "1px solid #e8dec8",
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: "24px",
          pageBreakInside: "avoid",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#7a2c2e",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            margin: "0 0 6px",
          }}
        >
          Índice de Periodos Históricos
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 16,
            rowGap: 4,
            fontSize: 9.5,
          }}
        >
          {historyPeriods.map((period, idx) => (
            <div key={period.id} style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
              <span style={{ fontWeight: 700, color: "#bc4749", minWidth: 16 }}>{idx + 1}.</span>
              <span style={{ color: "#1d3557", fontWeight: 600 }}>{period.title}</span>
              <span style={{ color: "#7a8290", fontSize: 8.5 }}>({period.era})</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PERIODOS HISTÓRICOS CRONOLÓGICOS ────────────────────── */}
      {historyPeriods.map((period, index) => (
        <div
          key={period.id}
          className="history-period-print-card"
          style={{
            marginBottom: "22px",
            padding: "14px 16px",
            border: "1px solid #e2d7c0",
            borderRadius: 8,
            background: "#ffffff",
            pageBreakInside: "avoid",
            breakInside: "avoid",
          }}
        >
          {/* Encabezado del periodo */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#7a2c2e",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {period.era}
            </span>
            <span style={{ fontSize: 9, color: "#7a8290", fontWeight: 600 }}>
              Periodo {index + 1} de {historyPeriods.length}
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
              fontSize: 16,
              fontWeight: 700,
              color: "#1d3557",
              margin: "0 0 6px 0",
              lineHeight: 1.3,
            }}
          >
            {period.title}
          </h2>

          <p
            style={{
              fontSize: 10.5,
              color: "#4b5363",
              fontStyle: "italic",
              lineHeight: 1.5,
              margin: "0 0 12px 0",
            }}
          >
            {period.summary}
          </p>

          {/* Imagen de la obra histórica (si existe) */}
          {period.image && (
            <div
              style={{
                textAlign: "center",
                margin: "10px 0 14px 0",
                background: "#f9f8f5",
                border: "1px solid #e6decb",
                borderRadius: 6,
                padding: "8px",
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <img
                src={period.image}
                alt={period.title}
                style={{
                  maxHeight: "72mm",
                  maxWidth: "96%",
                  height: "auto",
                  display: "inline-block",
                  borderRadius: 4,
                  border: "1px solid #dcd1be",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {period.imageCaption && (
                <p
                  style={{
                    fontSize: 9,
                    color: "#5a6070",
                    margin: "6px 0 0 0",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  {period.imageCaption}
                </p>
              )}
            </div>
          )}

          {/* Bloques de contenido detallado */}
          {period.content?.map((block, bIdx) => (
            <div key={bIdx} style={{ marginBottom: "10px" }}>
              <h3
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1d3557",
                  margin: "0 0 3px 0",
                }}
              >
                {block.heading}
              </h3>
              <p
                style={{
                  fontSize: 10,
                  color: "#22262f",
                  lineHeight: 1.6,
                  margin: 0,
                  textAlign: "justify",
                }}
              >
                {block.text}
              </p>
            </div>
          ))}

          {/* Conexión con los lugares del itinerario */}
          {period.seeOnTrip?.length > 0 && (
            <div
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "#f7f0e3",
                border: "1px solid #e4d8c2",
                borderRadius: 6,
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 10 }}>📍</span>
                <strong
                  style={{
                    fontSize: 9.5,
                    color: "#1d3557",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Lugares que veréis en el itinerario:
                </strong>
              </div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 9.5, lineHeight: 1.5, color: "#3a414e" }}>
                {period.seeOnTrip.map((ref, rIdx) => {
                  const placeName = guides[ref.id]?.name ?? ref.place ?? ref.name ?? ref.id;
                  return (
                    <li key={rIdx} style={{ marginBottom: 2 }}>
                      <strong style={{ color: "#7a2c2e" }}>{placeName}:</strong> {ref.note}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}

      {/* ── ANEXO: RECURSOS CULTURALES COMPLEMENTARIOS ───────────── */}
      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "2px solid #bc4749",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            fontSize: 16,
            fontWeight: 700,
            color: "#1d3557",
            marginBottom: "12px",
          }}
        >
          Anexo · Recursos para el viaje (Lecturas y Podcasts)
        </h2>

        {/* Libros recomendados */}
        {furtherReading?.books?.length > 0 && (
          <div style={{ marginBottom: "16px", pageBreakInside: "avoid" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7a2c2e", margin: "0 0 6px" }}>
              📚 Libros recomendados (de consulta y lectura previa)
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {furtherReading.books.map((b, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 8px",
                    border: "1px solid #e8dec8",
                    borderRadius: 4,
                    background: "#fdfbf7",
                    fontSize: 9,
                    lineHeight: 1.45,
                  }}
                >
                  <strong style={{ color: "#1d3557", fontSize: 9.5 }}>{b.title}</strong>
                  <br />
                  <span style={{ color: "#7a8290", fontStyle: "italic" }}>{b.author}</span>
                  <p style={{ margin: "3px 0 0", color: "#3a414e" }}>{b.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Podcasts recomendados para momentos del viaje */}
        {furtherReading?.podcasts?.length > 0 && (
          <div style={{ pageBreakInside: "avoid" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#7a2c2e", margin: "0 0 6px" }}>
              🎙️ Podcasts recomendados para vuelos, trenes bala y esperas
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {furtherReading.podcasts.slice(0, 6).map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: "6px 8px",
                    border: "1px solid #e8dec8",
                    borderRadius: 4,
                    background: "#fdfbf7",
                    fontSize: 9,
                    lineHeight: 1.45,
                  }}
                >
                  <strong style={{ color: "#1d3557", fontSize: 9.5 }}>{p.title}</strong>
                  {p.dayBadge && (
                    <span
                      style={{
                        marginLeft: 5,
                        background: "#bc474920",
                        color: "#bc4749",
                        padding: "1px 4px",
                        borderRadius: 3,
                        fontSize: 8,
                        fontWeight: 700,
                      }}
                    >
                      {p.dayBadge}
                    </span>
                  )}
                  <br />
                  <span style={{ color: "#7a8290" }}>{p.show}</span>
                  <p style={{ margin: "3px 0 0", color: "#3a414e" }}>{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
