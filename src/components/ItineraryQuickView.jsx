import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatDateShort } from "../utils/date";

// Entradas informativas sin hora — se filtran del resumen rápido
const SKIP_PREFIXES = [
  "🎫 RESERVAS",
  "🎫 BILLETES",
  "📊 RESUMEN",
  "🍜 COMER EN JAPÓN",
  "🧳 EQUIPAJE",
];

function detectEmoji(time = "", text = "") {
  const src = (time + " " + text).toLowerCase();

  // Hotel check-in & regreso
  if (/regreso al hotel|vuelta al hotel|descanso en hotel|dormir en|dormimos en/i.test(src)) return "🏠";
  if (/check.?in|alojamiento|minshuku|ryokan/i.test(src)) return "🏨";

  // Trenes de alta velocidad / Shinkansen
  if (/shinkansen|nozomi|hikari|kodama|hayabusa|tsurugi|kagayaki/i.test(src)) return "🚄";

  // Trenes expreso y JR
  if (/narita express|n'ex|thunderbird|shinano|hida express|limited express|haruka/i.test(src)) return "🚆";
  if (/\bline\b|línea|linea|yurikamome|\bjr\b|cercanías|cercanias|tren\b/i.test(src)) return "🚃";

  // Metro / Tranvía
  if (/metro|subway/i.test(src)) return "🚇";
  if (/tranvía|tranvia|randen/i.test(src)) return "🚋";

  // Autobús
  if (/\bbus\b|autobús|autobus|nohi|shuttle/i.test(src)) return "🚌";

  // Vuelo / Aterrizaje
  if (/vuelo|aterrizaje|aterriza|despegue|despega|boarding|embarque|aeropuerto|airport/i.test(src)) return "✈️";

  // Barco / Ferry
  if (/ferry|barco|crucero/i.test(src)) return "⛴️";
  if (/taxi/i.test(src)) return "🚕";

  // Comidas / Gastronomía
  if (/desayuno/i.test(src)) return "🥐";
  if (/cenar|cena\b|dîner|dinner|cenamos/i.test(src)) return "🍽️";
  if (/comer|comida|almuerzo|lunch|sushi|ramen|wagyu|hida beef|izakaya|kaiten/i.test(src)) return "🍜";

  // Visitas / Templos / Turismo
  if (/santuario|templo|shrine|jinja|tera|ji\b/i.test(src)) return "⛩️";
  if (/castillo|castle/i.test(src)) return "🏯";
  if (/parque|jardín|jardin|bambú|bambu|bosque|fuji/i.test(src)) return "🌲";
  if (/museo|museum|teamlab|sky|tower|mirador/i.test(src)) return "🗼";
  if (/compras|tiendas|shopping|pokemon center|nintendo/i.test(src)) return "🛍️";
  if (/visita|paseo|recorrido/i.test(src)) return "📍";

  return "•";
}

function formatQuickTime(timeStr = "") {
  if (!timeStr) return "";
  return timeStr
    .replace(/\(\+1\s*d[ií]a\)/gi, "(+1d)")
    .replace(/aprox\.?/gi, "~")
    .replace(/^~/, "~")
    .trim();
}

function shortText(text = "") {
  if (!text) return "";
  let clean = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/https?:\/\/[^\s)]+/g, "")
    .split("\n")[0]
    .trim();
  // Quitar emojis iniciales duplicados (ej: 🛬, 🚄, 🏨, 🥩, •, -, etc.)
  clean = clean.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s•\-—:→]+/u, "").trim();
  return clean.length > 95 ? clean.slice(0, 92) + "…" : clean;
}

function isSkip(entry) {
  return SKIP_PREFIXES.some((p) => entry.time?.startsWith(p));
}

function hasRealTime(entry) {
  return /^~?\d{1,2}[:h]\d{0,2}/.test(entry.time ?? "");
}

function QuickDayCard({ day, blockColor }) {
  const [expanded, setExpanded] = useState(false);

  const keyEntries = (day.schedule ?? []).filter((e) => {
    if (isSkip(e)) return false;
    if (hasRealTime(e)) return true;
    const src = (e.time ?? "") + " " + (e.text ?? "");
    return /shinkansen|nozomi|vuelo|aterriza|tren|metro|bus|check.?in|regreso al hotel|visita|santuario|templo|castillo|museo|cena|comida|restaurante/i.test(src);
  });

  const displayed = expanded ? keyEntries : keyEntries.slice(0, 5);
  const hasMore = keyEntries.length > 5;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--line)", background: "var(--paper-raised)" }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ background: blockColor }}
      >
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm text-white font-bold"
          style={{ background: "rgba(255,255,255,0.22)" }}
        >
          {day.num}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-snug truncate">{day.title}</p>
          <p className="text-white/80 text-xs mt-0.5">{formatDateShort(day.date)} · {day.cities}</p>
        </div>
      </div>

      <div className="px-3 sm:px-4 py-3">
        {keyEntries.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Día de traslado · ver detalle</p>
        ) : (
          <div className="relative">
            {/* Línea conectora vertical centrada con los iconos */}
            <div
              className="absolute top-2 bottom-3 left-[94px] sm:left-[108px] -translate-x-1/2"
              style={{ width: 1.5, background: "var(--line)" }}
            />
            <div className="space-y-2">
              {displayed.map((entry, i) => {
                const emoji = detectEmoji(entry.time, entry.text);
                const isHotelReturn =
                  /regreso al hotel|vuelta al hotel|descanso en hotel/i.test(
                    (entry.time ?? "") + (entry.text ?? "")
                  );
                const displayTime = hasRealTime(entry) ? formatQuickTime(entry.time) : "";

                return (
                  <div key={i} className="flex items-start gap-2 sm:gap-2.5 relative">
                    {/* Columna de hora: ancho suficiente y sin saltos de línea */}
                    <div
                      className="shrink-0 text-right text-[11px] sm:text-xs font-mono font-bold tabular-nums whitespace-nowrap pt-0.5"
                      style={{
                        color: "var(--shu)",
                        width: 76,
                        minWidth: 76,
                      }}
                    >
                      <span className="hidden sm:inline-block sm:w-[90px] text-right">
                        {displayTime}
                      </span>
                      <span className="inline-block sm:hidden text-right">
                        {displayTime}
                      </span>
                    </div>

                    {/* Nodo con icono temático */}
                    <div
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] z-10 mt-0.5 shadow-xs"
                      style={{
                        background: isHotelReturn ? "#e8f5e9" : "var(--paper)",
                        border: `1.5px solid ${isHotelReturn ? "#2e7d5b" : "var(--line)"}`,
                      }}
                    >
                      {emoji}
                    </div>

                    {/* Texto limpio sin emoji redundante */}
                    <p
                      className="flex-1 text-xs sm:text-[13px] leading-snug pt-0.5 pb-0.5"
                      style={{
                        color: isHotelReturn ? "var(--forest)" : "var(--ink)",
                        fontWeight: isHotelReturn ? 600 : 400,
                      }}
                    >
                      {shortText(entry.text)}
                    </p>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-2.5 flex items-center gap-1 text-xs font-semibold"
                style={{
                  marginLeft: 98,
                  color: "var(--shu)",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                {expanded ? (
                  <><ChevronUp size={13} /> Ver menos</>
                ) : (
                  <><ChevronDown size={13} /> +{keyEntries.length - 5} más</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryQuickView({ days, blocks }) {
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

  return (
    <div className="mt-3 space-y-2.5">
      {days.map((day) => {
        const block = blockById[day.block] ?? { color: "#1d3557" };
        return (
          <QuickDayCard key={day.num} day={day} blockColor={block.color} />
        );
      })}
    </div>
  );
}

