import { useState } from "react";
import { ScrollText, ChevronDown, ChevronUp, Map } from "lucide-react";
import { useContent } from "../i18n/LanguageContext";
import { guidesByDay } from "../data/guides";
import DayFujiOptionCard from "./DayFujiOptionCard";
import VisitJapanQRCard from "./VisitJapanQRCard";
import ShinkansenTicketCard from "./ShinkansenTicketCard";
import GuideCard from "./GuideCard";
import StayOption from "./StayOption";
import PlaceText from "./PlaceText";
import { formatDateLong } from "../utils/date";
import { parseDayNumbers } from "../utils/mapDay";

// Auto-detect transport type from schedule text and return matching emoji
function getScheduleEmoji(text) {
  if (/\bvuelo\b|aterriza|\bavión\b/i.test(text)) return "✈️";
  if (/shinkansen|nozomi|hikari/i.test(text)) return "🚄";
  if (/\bbus\b|nohi|autobús/i.test(text)) return "🚌";
  if (/tranvía|randen/i.test(text)) return "🚋";
  if (/\bmetro\b/i.test(text)) return "🚇";
  if (/\btren\b|\bJR\b|narita express|hida express|thunderbird|shinano|yurikamome/i.test(text)) return "🚂";
  return null;
}

export default function DayCard({ day, defaultOpenHistory = false, onClose, onViewMap }) {
  const [showHistory, setShowHistory] = useState(defaultOpenHistory);
  const { blocks, stays, mapStops } = useContent();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const block = blockById[day.block];
  const stay = stays.find((s) => s.afterDay === day.num);
  const dayGuides = guidesByDay[day.num] || [];
  // Días de puro traslado (vuelo de ida/vuelta) no tienen ninguna parada
  // propia en el mapa — en esos casos no tiene sentido ofrecer "Ver mapa".
  const hasMapStops = mapStops.some((s) => parseDayNumbers(s.day).includes(day.num));

  return (
    <article
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      <header className="px-5 pt-5 pb-4 flex items-start justify-between gap-3" style={{ background: block.color }}>
        <div>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.95)" }}>
            {block.emoji} Día {day.num} · {formatDateLong(day.date)}
          </p>
          <PlaceText
            as="h2"
            text={day.title}
            className="font-display text-2xl text-white mt-1 leading-tight"
            linkStyle={{ color: "white", textDecorationColor: "rgba(255,255,255,0.7)" }}
          />
          <PlaceText
            as="p"
            text={day.cities}
            className="text-white/85 text-sm mt-1"
            linkStyle={{ color: "white", textDecorationColor: "rgba(255,255,255,0.7)" }}
          />
        </div>
        {((onViewMap && hasMapStops) || onClose) && (
          <div className="shrink-0 mt-0.5 flex items-center gap-2">
            {onViewMap && hasMapStops && (
              <button
                onClick={onViewMap}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
              >
                <Map size={14} />
                Ver mapa
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="rounded-full p-1"
                style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
              >
                <ChevronUp size={18} />
              </button>
            )}
          </div>
        )}
      </header>

      <div className="p-5 space-y-4">
        {/* QR de Visit Japan Web en el día de llegada (Día 1 / 7 de sept) */}
        {day.num === 1 && (
          <div className="space-y-4">
            <VisitJapanQRCard />
          </div>
        )}

        {/* Opción de Excursión Monte Fuji con GetYourGuide (Días 10 al 13) */}
        <DayFujiOptionCard dayNum={day.num} />

        <PlaceText
          as="p"
          text={day.summary}
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--ink)" }}
          linkStyle={{ color: "var(--shu)" }}
        />

        <div>
          <ol className="relative border-l-2 pl-4 space-y-4" style={{ borderColor: "var(--line)" }}>
            {day.schedule.filter(s => s.time && /\d/.test(s.time)).map((s, i) => {
              const emoji = getScheduleEmoji(s.text);
              return (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
                    style={{ background: block.color }}
                  />
                  <p className="font-display text-[16px] sm:text-[17px] font-extrabold flex items-center gap-1.5 mb-1 tracking-tight" style={{ color: block.color }}>
                    {emoji && <span className="text-[17px]">{emoji}</span>}{s.time}
                  </p>
                  <PlaceText
                    as="p"
                    text={s.text}
                    className="text-[14px] leading-snug mt-0.5 whitespace-pre-wrap"
                    style={{ color: "var(--ink)" }}
                    linkStyle={{ color: "var(--shu)" }}
                  />
                  {day.num === 1 && s.time === "17:19" && (
                    <div className="mt-3 relative z-10">
                      <ShinkansenTicketCard />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {day.schedule.filter(s => !s.time || !/\d/.test(s.time)).length > 0 && (
            <div className="mt-6 space-y-3">
              {day.schedule.filter(s => !s.time || !/\d/.test(s.time)).map((s, i) => {
                return (
                  <div key={i} className="rounded-xl p-4 border" style={{ background: "rgba(0,0,0,0.015)", borderColor: "var(--line)" }}>
                    {s.time && (
                      <p className="font-display text-[15px] sm:text-[16px] font-extrabold flex items-center gap-1.5 mb-2 tracking-tight" style={{ color: block.color }}>
                        {s.time}
                      </p>
                    )}
                    <PlaceText
                      as="p"
                      text={s.text}
                      className="text-[14px] leading-snug whitespace-pre-wrap"
                      style={{ color: "var(--ink)" }}
                      linkStyle={{ color: "var(--shu)" }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {dayGuides.length > 0 && (
          <div>
            <p className="eyebrow mb-2" style={{ color: "var(--ink-soft)" }}>
              📖 Qué vamos a ver
            </p>
            <div className="space-y-2">
              {dayGuides.map((gid) => (
                <GuideCard key={gid} id={gid} accent={block.color} />
              ))}
            </div>
          </div>
        )}

        {stay && (
          <div className="rounded-xl p-4" style={{ background: "var(--paper)" }}>
            <p className="eyebrow" style={{ color: "var(--indigo)" }}>
              🏨 Dónde dormimos —{" "}
              <PlaceText text={stay.city} linkStyle={{ color: "var(--shu)" }} />
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
              {stay.nights}
            </p>
            {stay.warning && (
              <p className="text-xs mt-2 rounded-lg p-2" style={{ background: "#FBEAEA", color: "var(--shu)" }}>
                {stay.warning}
              </p>
            )}
            <div className="mt-2 space-y-2">
              {stay.options.map((o, i) => (
                <StayOption key={i} option={o} city={stay.city} />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowHistory((v) => !v)}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: "var(--indigo)" }}
        >
          <ScrollText size={16} />
          Contexto histórico
          <ChevronDown size={16} className={`transition-transform ${showHistory ? "rotate-180" : ""}`} />
        </button>
        {showHistory && (
          <PlaceText
            as="p"
            text={day.history}
            className="text-[13.5px] leading-relaxed italic"
            style={{ color: "var(--ink-soft)" }}
            linkStyle={{ color: "var(--shu)", fontStyle: "normal" }}
          />
        )}
      </div>
    </article>
  );
}
