import { useEffect, useRef } from "react";
import { days, blocks } from "../data/trip";
import { formatDateShort } from "../utils/date";
import DayCard from "../components/DayCard";
import { ChevronRight } from "lucide-react";

const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

export default function Itinerary({ openDay, setOpenDay }) {
  const refs = useRef({});

  useEffect(() => {
    if (openDay && refs.current[openDay]) {
      refs.current[openDay].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [openDay]);

  return (
    <div className="pt-5 pb-8 max-w-lg mx-auto">
      <div className="px-4">
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          Los 15 días
        </p>
        <h1 className="font-display text-2xl mb-3" style={{ color: "var(--indigo)" }}>
          Itinerario completo
        </h1>
      </div>
      <div className="px-4 mt-3 space-y-2.5">
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
                <DayCard day={d} />
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
                    <span className="block text-[15px] font-medium truncate" style={{ color: "var(--ink)" }}>
                      {d.title}
                    </span>
                    <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>
                      {formatDateShort(d.date)} · {d.cities}
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
