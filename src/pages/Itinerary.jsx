import { useEffect, useRef } from "react";
import { useContent } from "../i18n/LanguageContext";
import { formatDateShort } from "../utils/date";
import DayCard from "../components/DayCard";
import PlaceText from "../components/PlaceText";
import { ChevronRight } from "lucide-react";

export default function Itinerary({ openDay, setOpenDay }) {
  const { days, blocks } = useContent();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const refs = useRef({});

  useEffect(() => {
    if (openDay != null && refs.current[openDay]) {
      refs.current[openDay].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [openDay]);

  return (
    <div className="pt-3 pb-8 px-4">
      <div>
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          Los 15 días
        </p>
        <h1 className="font-display text-2xl mb-3" style={{ color: "var(--indigo)" }}>
          Itinerario completo
        </h1>
      </div>
      <div className="mt-3 space-y-2.5">
        {days.map((d) => {
          const block = blockById[d.block];
          const isOpen = openDay === d.num;
          return (
            <div
              key={d.num}
              ref={(el) => (refs.current[d.num] = el)}
              className="scroll-mt-4"
            >
              {isOpen ? (
                <DayCard day={d} onClose={() => setOpenDay(null)} />
              ) : (
                <button
                  onClick={() => setOpenDay(d.num)}
                  className="w-full flex items-center gap-3 rounded-xl p-3.5 text-left"
                  style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}
                >
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm text-white"
                    style={{ background: block.color }}
                  >
                    {d.num}
                  </span>
                  <span className="flex-1 min-w-0">
                    <PlaceText
                      as="span"
                      text={d.title}
                      className="block text-[15px] font-medium truncate"
                      style={{ color: "var(--ink)" }}
                      linkStyle={{ color: "var(--shu)" }}
                    />
                    <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>
                      {formatDateShort(d.date)} ·{" "}
                      <PlaceText text={d.cities} linkStyle={{ color: "var(--shu)" }} />
                    </span>
                  </span>
                  <ChevronRight size={18} style={{ color: "var(--ink-soft)" }} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
