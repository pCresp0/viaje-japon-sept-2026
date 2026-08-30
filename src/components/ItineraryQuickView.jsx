import { useState } from "react";
import { ChevronDown, ChevronUp, LayoutList, X } from "lucide-react";
import { formatDateShort } from "../utils/date";
import PlaceText from "./PlaceText";

// La vista rápida filtra automáticamente para dejar solo las paradas cronológicas (horas con dígitos)

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
    .replace(/(\d{2}:\d{2})\s*\/\s*\d{2}:\d{2}/g, "$1") // "13:30/14:00" -> "13:30"
    .replace(/\s*([–-])\s*/g, "$1") // "11:00 - 12:15" -> "11:00-12:15"
    .trim();
}

function extractMapUrl(text = "") {
  const match = text.match(/https?:\/\/(?:maps\.app\.goo\.gl|www\.google\.com\/maps)[^\s)]+/i);
  return match ? match[0] : null;
}

function shortText(text = "") {
  if (!text) return "";
  let clean = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/https?:\/\/[^\s)]+/g, "")
    .split("\n")[0]
    .trim();
  try {
    clean = clean.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s•\-—:→]+/u, "").trim();
  } catch {
    clean = clean.replace(/^[^\w\s•\-—:→]+/, "").trim();
  }
  return clean.length > 95 ? clean.slice(0, 92) + "…" : clean;
}

function hasRealTime(entry) {
  return /^~?\d{1,2}[:h]\d{0,2}/.test(entry.time ?? "");
}

export function QuickDayCard({ day, blockColor, onShowFullDay, onClose, standalone = false }) {
  const keyEntries = (day.schedule ?? []).filter(hasRealTime);

  return (
    <div
      id={`quick-day-${day.num}`}
      className={standalone ? "flex flex-col h-full bg-paper" : "rounded-2xl overflow-hidden"}
      style={{ scrollMarginTop: "80px", border: standalone ? "none" : "1px solid var(--line)", background: standalone ? "var(--paper-raised)" : "var(--paper-raised)", ...(standalone ? { height: "100%", borderRadius: 0 } : {}) }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3 relative"
        style={{ background: blockColor }}
      >
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm text-white font-bold"
          style={{ background: "rgba(255,255,255,0.22)" }}
        >
          {day.num}
        </span>
        <div className="flex-1 min-w-0 pr-10">
          <p className="text-white font-semibold text-sm leading-snug truncate">{day.title}</p>
          <p className="text-white/80 text-xs mt-0.5">{formatDateShort(day.date)} · {day.cities}</p>
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {onShowFullDay && (
            <button
              onClick={() => onShowFullDay(day.num)}
              className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/20 active:scale-95"
              style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", color: "white" }}
              title="Ver detalle completo"
            >
              <LayoutList size={16} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-white/20 active:scale-95"
              style={{ background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", color: "white" }}
              title="Cerrar"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="px-3 sm:px-4 py-3">
        {keyEntries.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Día de traslado · ver detalle</p>
        ) : (
          <div className="relative">
            {/* Línea conectora vertical centrada exactamente con los nodos */}
            <div
              className="absolute top-2 bottom-3 left-[98px] sm:left-[126px] -translate-x-1/2"
              style={{ width: 1.5, background: "var(--line)" }}
            />
            <div className="space-y-2">
              {keyEntries.map((entry, i) => {
                const emoji = detectEmoji(entry.time, entry.text);
                const isHotelReturn =
                  /regreso al hotel|vuelta al hotel|descanso en hotel/i.test(
                    (entry.time ?? "") + (entry.text ?? "")
                  );
                const displayTime = hasRealTime(entry) ? formatQuickTime(entry.time) : "";
                const mapUrl = extractMapUrl(entry.text);

                return (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3 relative">
                    {/* Columna de hora con ancho amplio y limpio tanto en móvil como en PC */}
                    <div
                      className="w-[78px] sm:w-[104px] shrink-0 text-right text-[11px] sm:text-xs font-mono font-bold tabular-nums whitespace-nowrap pt-0.5"
                      style={{ color: "var(--shu)" }}
                    >
                      {displayTime}
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
                    <div
                      className="flex-1 text-xs sm:text-[13px] leading-snug pt-0.5 pb-0.5"
                      style={{
                        color: isHotelReturn ? "var(--forest)" : "var(--ink)",
                        fontWeight: isHotelReturn ? 600 : 400,
                      }}
                    >
                      <span>{shortText(entry.text)}</span>
                      {mapUrl && (
                        <PlaceText text={mapUrl} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryQuickView({ days, blocks, onShowFullDay }) {
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

  return (
    <div className="mt-3 space-y-2.5">
      {days.map((day) => {
        const block = blockById[day.block] ?? { color: "#1d3557" };
        return (
          <QuickDayCard 
            key={day.num} 
            day={day} 
            blockColor={block.color} 
            onShowFullDay={onShowFullDay}
          />
        );
      })}
    </div>
  );
}

