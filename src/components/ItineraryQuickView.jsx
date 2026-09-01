import { useState } from "react";
import { ChevronDown, ChevronUp, LayoutList, X, Map } from "lucide-react";
import { formatDateShort } from "../utils/date";
import PlaceText from "./PlaceText";
import { useContent } from "../i18n/LanguageContext";
import { parseDayNumbers } from "../utils/mapDay";

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
    .replace(/(\d{2}:\d{2})\+/g, "$1") // Remove trailing + (e.g. 13:35+ -> 13:35)
    .replace(/aprox\.?/gi, "~")
    .replace(/^~/, "~")
    .replace(/(\d{2}:\d{2})\s*\/\s*\d{2}:\d{2}/g, "$1") // "13:30/14:00" -> "13:30"
    .replace(/\s*([–-])\s*/g, "$1") // "11:00 - 12:15" -> "11:00-12:15"
    .trim();
}

function extractUrls(text = "") {
  const matches = text.match(/https?:\/\/[^\s)]+/gi);
  return matches ? Array.from(new Set(matches)) : [];
}

function formatQuickText(text = "") {
  if (!text) return "";
  
  let clean = text
    .replace(/\(\s*https?:\/\/[^\s)]+\s*\)/g, "")
    .replace(/https?:\/\/[^\s)]+/g, "")
    .replace(/(?:Seguimiento en vivo|Live flight tracking|Suivi de vol en direct|Live tracking):?/gi, "")
    .split("\n")[0]
    .trim();
  clean = clean.replace(/\(\s*\)/g, "").replace(/:\s*$/, "").trim();

  // Quitamos asteriscos originales para rehacer el bold en el título
  clean = clean.replace(/\*\*(.*?)\*\*/g, "$1");

  try {
    clean = clean.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s•\-—:→]+/u, "").trim();
  } catch {
    clean = clean.replace(/^[^\w\s•\-—:→]+/, "").trim();
  }

  // Inteligencia semántica: Cortar en seco si empiezan consejos o avisos
  clean = clean.split(/[💡⚠️🎫🛒📅]/)[0].trim();
  clean = clean.split(/(?:Tip|Consejo|Alternativa|Nota|Opcional|Importante):/i)[0].trim();

  if (!clean) return "";

  let parts = clean.split(/\.\s+/);
  let title = parts[0];
  let detail = "";

  if (parts.length > 1) {
    // Filtramos frases puramente logísticas para quedarnos con el detalle real
    let filteredParts = parts.filter((part, index) => {
      if (index === 0) return true; // El título siempre se queda
      const p = part.toLowerCase();
      if (/abierto todos|horario|entrada aprox|no requiere|precio orientat|¥|último pedido/.test(p)) return false;
      return true;
    });

    if (filteredParts.length > 1) {
      detail = filteredParts[1]; // Nos quedamos con 1 frase de "lore" puro
    }
  }

  // Quitar puntos finales sueltos
  title = title.replace(/\.$/, "");
  detail = detail.replace(/\.$/, "");

  let finalStr = `**${title}.**`;
  if (detail) {
    finalStr += ` ${detail}.`;
  }

  return finalStr;
}

function hasRealTime(entry) {
  return /^~?\d{1,2}[:h]\d{0,2}/.test(entry.time ?? "");
}

export function QuickDayCard({ day, blockColor, onShowFullDay, onClose, onViewMap, standalone = false, isOpen = true, onToggle }) {
  const keyEntries = (day.schedule ?? []).filter(hasRealTime);
  const { mapStops } = useContent();
  const hasMapStops = mapStops.some((s) => parseDayNumbers(s.day).includes(day.num));

  return (
    <div
      id={`quick-day-${day.num}`}
      className={`itinerary-day-anchor ${standalone ? "flex flex-col h-full bg-paper" : "rounded-2xl overflow-hidden"}`}
      style={{ border: standalone ? "none" : "1px solid var(--line)", background: standalone ? "var(--paper-raised)" : "var(--paper-raised)", ...(standalone ? { height: "100%", borderRadius: 0 } : {}) }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3 relative"
        style={{ background: blockColor, cursor: onToggle ? "pointer" : "default" }}
        onClick={onToggle}
      >
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm text-white font-bold"
          style={{ background: "rgba(255,255,255,0.22)" }}
        >
          {day.num}
        </span>
        <div className="flex-1 min-w-0 pr-16">
          <p className="text-white font-semibold text-sm leading-snug truncate">{day.title}</p>
          <p className="text-white/80 text-xs mt-0.5">{formatDateShort(day.date)} · {day.cities}</p>
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          {onShowFullDay && (
            <button
              type="button"
              onClick={() => onShowFullDay(day.num)}
              className="flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all hover:bg-white/25 active:scale-95 shrink-0"
              style={{ background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", color: "white" }}
              title="Ver detalle completo"
              aria-label="Ver detalle completo"
            >
              <LayoutList size={14} />
              <span className="hidden sm:inline">Detalle completo</span>
            </button>
          )}
          {onViewMap && hasMapStops && (
            <button
              type="button"
              onClick={() => onViewMap(day.num)}
              className="flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all hover:bg-white/25 active:scale-95 shrink-0"
              style={{ background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", color: "white" }}
              title="Ver mapa"
              aria-label="Ver mapa"
            >
              <Map size={14} />
              <span className="hidden sm:inline">Ver mapa</span>
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 flex items-center justify-center transition-all hover:bg-white/25 active:scale-95"
              style={{ background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", color: "white" }}
              title="Cerrar"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          )}
          {onToggle && !onClose && !standalone && (
            <button
              type="button"
              onClick={onToggle}
              className="rounded-full p-1.5 flex items-center justify-center transition-all hover:bg-white/25 active:scale-95"
              style={{ background: "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", color: "white" }}
              aria-label={isOpen ? "Colapsar día" : "Expandir día"}
            >
              <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
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
                  const urls = extractUrls(entry.text);

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
                        <PlaceText text={formatQuickText(entry.text)} />
                        {urls.map((u, ui) => (
                          <PlaceText key={ui} text={u} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ItineraryQuickView({ days, blocks, onShowFullDay, onViewMap, openDay, setOpenDay }) {
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

  return (
    <div className="mt-3 space-y-2.5">
      {days.map((day) => {
        const block = blockById[day.block] ?? { color: "#1d3557" };
        const isOpen = openDay === day.num;
        return (
          <QuickDayCard 
            key={day.num} 
            day={day} 
            blockColor={block.color} 
            onShowFullDay={onShowFullDay}
            onViewMap={onViewMap}
            isOpen={isOpen}
            onToggle={() => setOpenDay(isOpen ? null : day.num)}
          />
        );
      })}
    </div>
  );
}

