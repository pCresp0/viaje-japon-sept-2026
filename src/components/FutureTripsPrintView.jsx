import React from "react";
import { createPortal } from "react-dom";
import { futureLocationCoords } from "../data/pendingDays";

export default function FutureTripsPrintView({ days, lang }) {
  if (typeof document === "undefined") return null;

  const labels = {
    es: {
      docTag: "🇯🇵 Viaje a Japón · Guía de Viajes Futuros",
      subtitleDoc: "Edición completa para imprimir o guardar en PDF",
      mainTitle: "Viajes Futuros · Itinerario e Ideas",
      mainDesc: "Guía completa de 13 días con vuelos y conexiones de principio a fin: Llegada a Narita y traslado a Tokio, 3 días en Tokio (lo imprescindible, Nikko y Kamakura), ascensión al Monte Fuji, 2 días en Osaka, Hiroshima, Miyajima, islas Ryukyu (Okinawa e Iriomote), Hokkaido, y regreso a Tokio con noche de despedida y vuelo de vuelta desde Narita.",
      indexTitle: "Índice de destinos incluidos",
      historyTitle: "Historia y contexto",
      itineraryTitle: "Lugares imprescindibles y guía paso a paso",
      tableTitle: "Resumen comparativo para futuros viajes",
      colDest: "Destino / Etapa",
      colSeason: "Mejor época",
      colDuration: "Duración",
      colType: "Tipo de experiencia",
      colAccess: "Acceso principal",
      budgetPrefix: "Presupuesto y logística:",
      footer: "Documento generado desde la web de Viaje a Japón 2026 · Información verificada y actualizada.",
    },
    en: {
      docTag: "🇯🇵 Japan Trip · Future Trips Guide",
      subtitleDoc: "Complete edition to print or save as PDF",
      mainTitle: "Future Trips · Itinerary & Ideas",
      mainDesc: "Comprehensive 13-day master guide with flights and connections: Narita arrival and transfer to Tokyo, 3 days in Tokyo (highlights, Nikko, Kamakura), Mount Fuji climb, 2 days in Osaka, Hiroshima, Miyajima, Ryukyu islands (Okinawa & Iriomote), Hokkaido, and return to Tokyo with farewell night and flight from Narita.",
      indexTitle: "Table of Destinations",
      historyTitle: "History & Context",
      itineraryTitle: "Must-See Highlights & Detailed Guide",
      tableTitle: "Comparative Summary for Future Trips",
      colDest: "Destination / Stage",
      colSeason: "Best Season",
      colDuration: "Duration",
      colType: "Experience Type",
      colAccess: "Main Access",
      budgetPrefix: "Budget & Logistics:",
      footer: "Generated from the Japan Trip 2026 guide · Verified and updated details.",
    },
    fr: {
      docTag: "🇯🇵 Voyage au Japon · Guide des Voyages Futurs",
      subtitleDoc: "Édition intégrale à imprimer ou enregistrer en PDF",
      mainTitle: "Voyages Futurs · Itinéraires et Idées",
      mainDesc: "Guide complet de 13 jours de l'arrivée au départ : Arrivée à Narita et transfert à Tokyo, 3 jours à Tokyo (incontournables, Nikko, Kamakura), mont Fuji, 2 jours à Osaka, Hiroshima, Miyajima, Okinawa, Iriomote, Hokkaido, et retour à Tokyo pour une soirée d'adieu et vol retour depuis Narita.",
      indexTitle: "Sommaire des destinations",
      historyTitle: "Histoire & Contexte",
      itineraryTitle: "Lieux incontournables et guide détaillé",
      tableTitle: "Tableau comparatif pour futurs séjours",
      colDest: "Destination / Étape",
      colSeason: "Période idéale",
      colDuration: "Durée",
      colType: "Type d'expérience",
      colAccess: "Accès principal",
      budgetPrefix: "Budget et logistique :",
      footer: "Document généré depuis le guide Voyage au Japon 2026 · Données vérifiées.",
    },
    tl: {
      docTag: "🇯🇵 Biyahe sa Japan · Gabay sa Susunod na Biyahe",
      subtitleDoc: "Kumpletong edisyon para i-print o i-save bilang PDF",
      mainTitle: "Susunod na Biyahe · Itinerary at Ideya",
      mainDesc: "Kumpletong 13-araw na gabay: Pagdating sa Narita at byahe sa Tokyo, 3 araw sa Tokyo (highlights, Nikko, Kamakura), Mount Fuji, 2 araw sa Osaka, Hiroshima, Miyajima, Okinawa, Iriomote, Hokkaido, at pagbalik sa Tokyo bago lumipad pauwi mula Narita.",
      indexTitle: "Talaan ng mga Destinasyon",
      historyTitle: "Kasaysayan at Konteksto",
      itineraryTitle: "Mga Tampok na Lugar at Detalyadong Gabay",
      tableTitle: "Buod ng mga Susunod na Biyahe",
      colDest: "Destinasyon",
      colSeason: "Pinakamagandang Panahon",
      colDuration: "Tagal",
      colType: "Uri ng Karanasan",
      colAccess: "Pangunahing Byahe",
      budgetPrefix: "Badyet at Logistics:",
      footer: "Dokumentong nabuo mula sa Japan Trip 2026 website.",
    },
  };

  const l = labels[lang] || labels.es;

  const comparisonData = [
    {
      name: "Llegada a Narita y Tokio",
      season: "Todo el año",
      duration: "1 día (tarde/noche)",
      type: "Aterrizaje, aduanas, tren express y bienvenida",
      access: "Tren Narita Express (N'EX) o Keisei Skyliner (36–60 min)",
    },
    {
      name: "Tokio imprescindible",
      season: "Todo el año (Primavera y Otoño ideales)",
      duration: "1 día completo",
      type: "Iconos urbanos, templos milenarios y miradores",
      access: "Red de Metro de Tokio y línea JR Yamanote",
    },
    {
      name: "Excursión a Nikko",
      season: "Todo el año (Otoño espectacular: oct–nov)",
      duration: "1 día completo",
      type: "Templos barrocos, cascadas y bosques sagrados",
      access: "Tren Tobu directo desde Asakusa (1h 50m)",
    },
    {
      name: "Tokio alt. & Kamakura",
      season: "Primavera a Otoño (playa y flores)",
      duration: "1 día completo",
      type: "Gran Buda de bronce, templos zen y Yanaka retro",
      access: "Tren JR Yokosuka desde Tokio (55 min)",
    },
    {
      name: "Monte Fuji (Ascensión)",
      season: "Verano (Julio a principios de septiembre)",
      duration: "2 días (1 noche en refugio)",
      type: "Senderismo alpino, goraiko (amanecer 3.776 m)",
      access: "Bus directo Tokio / Shinjuku a 5ª estación (2h 20m)",
    },
    {
      name: "Osaka clásico",
      season: "Todo el año",
      duration: "1 día completo",
      type: "Castillo feudal, Shitenno-ji, Dotonbori y takoyaki",
      access: "Shinkansen desde Fuji/Mishima (1h 50m) + Metro Osaka",
    },
    {
      name: "Templos ocultos Osaka",
      season: "Todo el año",
      duration: "1 día completo",
      type: "Santuario del león Namba Yasaka y Fudo con musgo",
      access: "Metro de Osaka y paseos peatonales",
    },
    {
      name: "Hiroshima y Nagasaki",
      season: "Primavera / Otoño",
      duration: "2–3 días",
      type: "Memoria de paz, historia Sakoku y gastronomía",
      access: "Shinkansen Sanyo desde Shin-Osaka (1h 25m)",
    },
    {
      name: "Isla de Miyajima",
      season: "Todo el año (Otoño momiji deslumbrante)",
      duration: "1 día (o 1 noche en ryokan)",
      type: "Torii flotante, monte Misen (535m) y templos",
      access: "Tren JR desde Hiroshima (28 min) + ferry JR (10 min)",
    },
    {
      name: "Okinawa y Ryukyu",
      season: "Primavera a Otoño (may–oct para snorkel)",
      duration: "3–5 días",
      type: "Playas 'Miyako Blue', arrecifes y cultura Ryukyu",
      access: "Vuelo directo desde Hiroshima/Kansai a Naha (1h 55m)",
    },
    {
      name: "Isla de Iriomote",
      season: "Feb–jun (Cruz del Sur) / Verano (kayak)",
      duration: "2–3 días",
      type: "Astrofotografía, Dark Sky Park y selva virgen",
      access: "Vuelo Naha–Ishigaki (55 min) + ferry a Iriomote (45 min)",
    },
    {
      name: "Hokkaido (Sapporo)",
      season: "Invierno (nieve/hielo) o Verano (flores: jul–ago)",
      duration: "4–6 días",
      type: "Naturaleza indómita, onsen, marisco y festivales",
      access: "Vuelo a Sapporo New Chitose + tren JR a Sapporo (37 min)",
    },
    {
      name: "Regreso a Tokio y Narita",
      season: "Todo el año",
      duration: "1 día (despedida y vuelo)",
      type: "Últimas compras, noche en Tokio y vuelo de regreso",
      access: "Vuelo doméstico a Tokio + tren Narita Express al aeropuerto",
    },
  ];

  return createPortal(
    <div
      className="print-only future-trips-print-view"
      style={{
        fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
        color: "#1b1f27",
        background: "#ffffff",
        padding: 0,
        maxWidth: "100%",
        lineHeight: 1.55,
      }}
    >
      {/* ── PORTADA DEL DOCUMENTO ──────────────────────────────────── */}
      <section style={{ marginBottom: 28, pageBreakAfter: "always", breakAfter: "page" }}>
        <div style={{ borderBottom: "3px double #bc4749", paddingBottom: 16, marginBottom: 20 }}>
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
              {l.docTag}
            </span>
            <span style={{ fontSize: 9.5, color: "#5a6070", fontStyle: "italic" }}>
              {l.subtitleDoc}
            </span>
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1d3557",
              margin: "6px 0 10px",
              lineHeight: 1.2,
            }}
          >
            {l.mainTitle}
          </h1>

          <p style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
            {l.mainDesc}
          </p>
        </div>

        {/* Índice con los 7 destinos */}
        <div
          style={{
            background: "#fdfbf7",
            border: "1px solid #e5ded3",
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: "#1d3557",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              margin: "0 0 12px",
              borderBottom: "1px solid #e5ded3",
              paddingBottom: 6,
            }}
          >
            📋 {l.indexTitle}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
            {days.map((d, i) => {
              const meta = futureLocationCoords[d.id] || { emoji: "📍", color: "#bc4749" };
              return (
                <div key={d.id} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 11 }}>
                  <span style={{ fontWeight: 800, color: meta.color, minWidth: 20 }}>
                    #{i + 1}
                  </span>
                  <span>{meta.emoji}</span>
                  <div>
                    <strong style={{ color: "#1b1f27" }}>{d.title}</strong>
                    <span style={{ color: "#6b7280", fontSize: 10, marginLeft: 6 }}>
                      ({d.cities})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabla comparativa de planificación */}
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              color: "#1d3557",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            🗺️ {l.tableTitle}
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 10,
              lineHeight: 1.4,
              border: "1px solid #d1d5db",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6", borderBottom: "1.5px solid #9ca3af" }}>
                <th style={{ padding: "6px 8px", textAlign: "left", color: "#1d3557", fontWeight: 700 }}>{l.colDest}</th>
                <th style={{ padding: "6px 8px", textAlign: "left", color: "#1d3557", fontWeight: 700 }}>{l.colSeason}</th>
                <th style={{ padding: "6px 8px", textAlign: "left", color: "#1d3557", fontWeight: 700 }}>{l.colDuration}</th>
                <th style={{ padding: "6px 8px", textAlign: "left", color: "#1d3557", fontWeight: 700 }}>{l.colType}</th>
                <th style={{ padding: "6px 8px", textAlign: "left", color: "#1d3557", fontWeight: 700 }}>{l.colAccess}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                  }}
                >
                  <td style={{ padding: "6px 8px", fontWeight: 700, color: "#bc4749" }}>{row.name}</td>
                  <td style={{ padding: "6px 8px", color: "#374151" }}>{row.season}</td>
                  <td style={{ padding: "6px 8px", color: "#374151" }}>{row.duration}</td>
                  <td style={{ padding: "6px 8px", color: "#374151" }}>{row.type}</td>
                  <td style={{ padding: "6px 8px", color: "#374151" }}>{row.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── DESGLOSE DE CADA DESTINO ─────────────────────────────────── */}
      {days.map((d, index) => {
        const meta = futureLocationCoords[d.id] || { emoji: "📍", color: "#bc4749" };

        return (
          <article
            key={d.id}
            style={{
              pageBreakBefore: "always",
              breakBefore: "page",
              marginBottom: 24,
            }}
          >
            {/* Cabecera del Destino */}
            <div
              style={{
                borderBottom: "2px solid #1d3557",
                paddingBottom: 10,
                marginBottom: 14,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: meta.color, letterSpacing: "0.06em", margin: "0 0 3px", textTransform: "uppercase" }}>
                  Destino #{index + 1} · {d.cities}
                </p>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1d3557", margin: 0 }}>
                  {meta.emoji} {d.title}
                </h2>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#ffffff",
                  background: meta.color,
                  padding: "4px 10px",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                }}
              >
                #{index + 1}
              </span>
            </div>

            {/* Motivo / Contexto */}
            <div
              style={{
                background: "#f9fafb",
                borderLeft: `4px solid ${meta.color}`,
                padding: "8px 12px",
                marginBottom: 12,
                fontSize: 10.5,
                color: "#4b5563",
                fontStyle: "italic",
              }}
            >
              <strong>Contexto del viaje:</strong> {d.reason}
            </div>

            {/* Resumen */}
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "#1f2937", margin: 0 }}>
                {d.summary}
              </p>
            </div>

            {/* Historia y Contexto */}
            {d.history && (
              <div
                style={{
                  background: "#fffaf5",
                  border: "1px solid #fde8d7",
                  borderRadius: 6,
                  padding: "10px 14px",
                  marginBottom: 16,
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "#bc4749",
                    margin: "0 0 6px",
                    letterSpacing: "0.01em",
                  }}
                >
                  📜 {l.historyTitle}
                </h3>
                <p style={{ fontSize: 11, lineHeight: 1.6, color: "#374151", margin: 0 }}>
                  {d.history}
                </p>
              </div>
            )}

            {/* Puntos y Secciones de la Guía */}
            <div style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontSize: 13.5,
                  fontWeight: 800,
                  color: "#1d3557",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: 4,
                  margin: "0 0 12px",
                }}
              >
                📍 {l.itineraryTitle}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {d.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      breakInside: "avoid",
                      pageBreakInside: "avoid",
                      paddingBottom: 8,
                      borderBottom: "1px dashed #f3f4f6",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12.5,
                        fontWeight: 800,
                        color: "#bc4749",
                        margin: "0 0 4px",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.time}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        lineHeight: 1.6,
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de presupuesto y logística */}
            {d.money && (
              <div
                style={{
                  borderTop: "1.5px solid #e5e7eb",
                  paddingTop: 8,
                  marginTop: 10,
                  fontSize: 10.5,
                  color: "#4b5563",
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
              >
                <strong style={{ color: "#1d3557" }}>💰 {l.budgetPrefix}</strong> {d.money}
              </div>
            )}
          </article>
        );
      })}

      {/* Pie de página final */}
      <footer
        style={{
          borderTop: "1px solid #d1d5db",
          paddingTop: 8,
          marginTop: 20,
          textAlign: "center",
          fontSize: 9,
          color: "#9ca3af",
          fontStyle: "italic",
        }}
      >
        {l.footer}
      </footer>
    </div>,
    document.body
  );
}
