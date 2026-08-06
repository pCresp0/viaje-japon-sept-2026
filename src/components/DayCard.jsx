import { useState } from "react";
import { ScrollText, Wallet, ChevronDown } from "lucide-react";
import { blocks, stays } from "../data/trip";
import { guidesByDay } from "../data/guides";
import GuideCard from "./GuideCard";
import { formatDateLong } from "../utils/date";
import { mapsUrl } from "../utils/maps";
import { MapPin } from "lucide-react";

const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

export default function DayCard({ day, defaultOpenHistory = false }) {
  const [showHistory, setShowHistory] = useState(defaultOpenHistory);
  const block = blockById[day.block];
  const stay = stays.find((s) => s.afterDay === day.num);
  const dayGuides = guidesByDay[day.num] || [];

  return (
    <article
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      <header className="px-5 pt-5 pb-4" style={{ background: block.color }}>
        <p className="eyebrow text-white/80">
          {block.emoji} Día {day.num} · {formatDateLong(day.date)}
        </p>
        <h2 className="font-display text-2xl text-white mt-1 leading-tight">{day.title}</h2>
        <p className="text-white/85 text-sm mt-1">{day.cities}</p>
      </header>

      <div className="p-5 space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: "var(--ink)" }}>
          {day.summary}
        </p>

        <div>
          <ol className="relative border-l-2 pl-4 space-y-4" style={{ borderColor: "var(--line)" }}>
            {day.schedule.map((s, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
                  style={{ background: block.color }}
                />
                <p className="font-display text-sm font-bold" style={{ color: block.color }}>
                  {s.time}
                </p>
                <p className="text-[14px] leading-snug mt-0.5" style={{ color: "var(--ink)" }}>
                  {s.text}
                </p>
              </li>
            ))}
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
              🏨 Dónde dormimos — {stay.city}
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
                <div
                  key={i}
                  className="rounded-lg px-3 py-2 text-sm border"
                  style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
                >
                  <span className="font-medium block" style={{ color: "var(--ink)" }}>
                    {o.name}
                  </span>
                  <span className="block text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                    {o.total}
                    {o.pin ? ` · PIN ${o.pin}` : ""}
                  </span>
                  <span className="flex items-center gap-3 mt-1.5">
                    <a href={o.url} target="_blank" rel="noreferrer" className="text-xs font-medium" style={{ color: "var(--indigo)" }}>
                      Ver reserva ↗
                    </a>
                    <a
                      href={mapsUrl(`${o.name}, ${stay.city}, Japan`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: "var(--shu)" }}
                    >
                      <MapPin size={12} /> Cómo llegar ↗
                    </a>
                  </span>
                </div>
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
          <p className="text-[13.5px] leading-relaxed italic" style={{ color: "var(--ink-soft)" }}>
            {day.history}
          </p>
        )}
      </div>
    </article>
  );
}
