import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatDateShort } from "../utils/date";

// Entradas informativas sin hora — se filtran del resumen
const SKIP_PREFIXES = [
  "🎫 RESERVAS",
  "🎫 BILLETES",
  "📊 RESUMEN",
  "🍜 COMER EN JAPÓN",
  "🧳 EQUIPAJE",
];

function detectEmoji(time = "", text = "") {
  const src = time + " " + text;
  if (/shinkansen|nozomi|hikari/i.test(src)) return "🚄";
  if (/vuelo|aterriza|despega|avión|airport/i.test(src)) return "✈️";
  if (/\bbus\b|autobús|nohi/i.test(src)) return "🚌";
  if (/tranvía|randen/i.test(src)) return "🚋";
  if (/\bmetro\b/i.test(src)) return "🚇";
  if (/\btren\b|\bJR\b|narita express|n'ex|hida express|thunderbird|shinano|yurikamome/i.test(src)) return "🚂";
  if (/taxi/i.test(src)) return "🚕";
  if (/ferry|barco/i.test(src)) return "⛴️";
  if (/check.?in|🏨/i.test(src)) return "🏨";
  if (/regreso al hotel|vuelta al hotel|descanso en hotel/i.test(src)) return "🏠";
  if (/cenar|cena|comida|🍣|🍜|🍙|restaurante/i.test(src)) return "🍽️";
  if (/visita|santuario|templo|castillo|jardín|jardines|museo|parque|🏯/i.test(src)) return "📍";
  return "•";
}

function shortText(text = "") {
  const clean = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/https?:\/\/[^\s)]+/g, "")
    .split("\n")[0]
    .trim();
  return clean.length > 90 ? clean.slice(0, 87) + "…" : clean;
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

      <div className="px-4 py-3">
        {keyEntries.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Día de traslado · ver detalle</p>
        ) : (
          <div className="relative">
            <div
              className="absolute top-0 bottom-0"
              style={{ left: 69, width: 1, background: "var(--line)" }}
            />
            <div className="space-y-1.5">
              {displayed.map((entry, i) => {
                const emoji = detectEmoji(entry.time, entry.text);
                const isHotelReturn =
                  /regreso al hotel|vuelta al hotel|descanso en hotel/i.test(
                    (entry.time ?? "") + (entry.text ?? "")
                  );
                return (
                  <div key={i} className="flex items-start gap-2 relative">
                    <div
                      className="shrink-0 text-right text-xs font-mono tabular-nums pt-0.5"
                      style={{ color: "var(--shu)", width: 60, minWidth: 60 }}
                    >
                      {hasRealTime(entry) ? entry.time.replace(/^~/, "~") : ""}
                    </div>
                    <div
                      className="shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] z-10 mt-0.5"
                      style={{
                        background: isHotelReturn ? "var(--forest)" : "var(--paper)",
                        border: `1.5px solid ${isHotelReturn ? "var(--forest)" : "var(--line)"}`,
                      }}
                    >
                      {emoji}
                    </div>
                    <p
                      className="flex-1 text-xs leading-snug pt-0.5 pb-1"
                      style={{ color: isHotelReturn ? "var(--forest)" : "var(--ink)" }}
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
                className="mt-2 flex items-center gap-1 text-xs font-medium"
                style={{
                  marginLeft: 82,
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
