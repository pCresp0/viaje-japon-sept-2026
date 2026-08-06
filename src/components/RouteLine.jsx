import { days, blocks } from "../data/trip";

const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

// Mini "metro line" showing all 15 days as stations, colored by block,
// with the current day highlighted like a live-position marker.
export default function RouteLine({ currentDay, onSelectDay, orientation = "horizontal" }) {
  const isH = orientation === "horizontal";
  return (
    <div className={isH ? "w-full overflow-x-auto pb-2" : ""}>
      <div
        className={isH ? "flex items-center min-w-max px-1" : "flex flex-col items-center"}
        style={{ gap: isH ? "0" : "0" }}
      >
        {days.map((d, i) => {
          const block = blockById[d.block];
          const isCurrent = currentDay === d.num;
          const isPast = currentDay != null && d.num < currentDay;
          return (
            <div key={d.num} className={isH ? "flex items-center" : "flex flex-col items-center"}>
              {i > 0 && (
                <div
                  className={isH ? "h-[3px] w-6 sm:w-8" : "w-[3px] h-6"}
                  style={{ background: block.color, opacity: isPast ? 1 : 0.35 }}
                />
              )}
              <button
                onClick={() => onSelectDay?.(d.num)}
                className="relative flex flex-col items-center group shrink-0"
                aria-label={`Día ${d.num}: ${d.title}`}
              >
                <span
                  className="rounded-full border-2 flex items-center justify-center transition-transform"
                  style={{
                    width: isCurrent ? 18 : 12,
                    height: isCurrent ? 18 : 12,
                    background: isCurrent ? block.color : isPast ? block.color : "var(--paper)",
                    borderColor: block.color,
                    opacity: isPast || isCurrent ? 1 : 0.5,
                  }}
                />
                {isCurrent && (
                  <span
                    className="absolute -top-1 rounded-full animate-ping"
                    style={{ width: 18, height: 18, background: block.color, opacity: 0.5 }}
                  />
                )}
                <span
                  className="eyebrow mt-1 text-[9px] whitespace-nowrap"
                  style={{ color: isCurrent ? block.color : "var(--ink-soft)" }}
                >
                  {d.num}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
