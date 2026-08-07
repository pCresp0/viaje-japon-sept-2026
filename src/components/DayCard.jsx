import { useState } from "react";
import { ScrollText, Wallet, ChevronDown, ChevronUp } from "lucide-react";
import { blocks, stays } from "../data/trip";
import { guidesByDay } from "../data/guides";
import GuideCard from "./GuideCard";
import StayOption from "./StayOption";
import PlaceText from "./PlaceText";
import { formatDateLong } from "../utils/date";

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

const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

export default function DayCard({ day, defaultOpenHistory = false, onClose }) {
  const [showHistory, setShowHistory] = useState(defaultOpenHistory);
  const block = blockById[day.block];
  const stay = stays.find((s) => s.afterDay === day.num);
  const dayGuides = guidesByDay[day.num] || [];

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
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 mt-0.5 rounded-full p-1"
            style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
          >
            <ChevronUp size={18} />
          </button>
        )}
      </header>

      <div className="p-5 space-y-4">
        <PlaceText
          as="p"
          text={day.summary}
          className="text-[15px] leading-relaxed"
          style={{ color: "var(--ink)" }}
          linkStyle={{ color: "var(--shu)" }}
        />

        <div>
          <ol className="relative border-l-2 pl-4 space-y-4" style={{ borderColor: "var(--line)" }}>
            {day.schedule.map((s, i) => {
              const emoji = getScheduleEmoji(s.text);
              return (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
                    style={{ background: block.color }}
                  />
                  <p className="font-display text-sm font-bold flex items-center gap-1" style={{ color: block.color }}>
                    {emoji && <span>{emoji}</span>}{s.time}
                  </p>
                  <PlaceText
                    as="p"
                    text={s.text}
                    className="text-[14px] leading-snug mt-0.5"
                    style={{ color: "var(--ink)" }}
                    linkStyle={{ color: "var(--shu)" }}
                  />
                </li>
              );
            })}
          </ol>
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

        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gold)" }}>
          <Wallet size={16} />
          <span className="font-medium">{day.money}</span>
        </div>

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
