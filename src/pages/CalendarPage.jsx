import { days, blocks } from "../data/trip";

const blockColors = {
  kioto: { bg: "#bc4749", label: "Kioto · Nara · Osaka" },
  alpes: { bg: "#2e7d5b", label: "Alpes Japoneses"      },
  tokio: { bg: "#1d3557", label: "Tokio"                },
};

const blockEmoji = { kioto: "⛩️", alpes: "🏔️", tokio: "🗼" };

// Group days by week rows (Mon–Sun visual grid)
// Our trip: day 1 = Mon 7 Sep. Show a Sep calendar grid.
const SEP_START_DOW = 1; // September 1 2026 = Tuesday → offset 1 from Monday
const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Build 5 weeks × 7 days grid for September 2026
// Sep 1 = Tuesday (DOW=2 in JS, but we want Mon-first grid → col index = (DOW+6)%7)
// Sep 1 DOW = Tuesday = col 1 (0=Mon)
function buildGrid() {
  const cells = [];
  // Sep 1 is col 1 in Mon-first grid
  const offset = 1; // Tuesday
  for (let i = 0; i < offset; i++) cells.push(null); // empty
  for (let d = 1; d <= 30; d++) cells.push(d);
  // pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const grid = buildGrid();

// Map date number to trip day
const dayByDate = {};
days.forEach((d) => {
  const dateNum = parseInt(d.date.split("-")[2]);
  dayByDate[dateNum] = d;
});

export default function CalendarPage() {
  return (
    <div className="px-4 pt-6 pb-12 max-w-3xl mx-auto">
      {/* title */}
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Septiembre 2026</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Calendario del viaje
        </h2>
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(blockColors).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: v.bg }} />
            <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
              {blockEmoji[k]} {v.label}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        {/* weekday headers */}
        <div className="grid grid-cols-7 border-b" style={{ borderColor: "var(--line)" }}>
          {WEEKDAYS.map((w) => (
            <div key={w} className="text-center py-2.5"
              style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-soft)", letterSpacing: "0.06em" }}>
              {w.toUpperCase()}
            </div>
          ))}
        </div>

        {/* weeks */}
        {Array.from({ length: grid.length / 7 }).map((_, wi) => (
          <div key={wi} className="grid grid-cols-7"
            style={{ borderBottom: wi < grid.length / 7 - 1 ? "1px solid var(--line)" : "none" }}>
            {grid.slice(wi * 7, wi * 7 + 7).map((dateNum, di) => {
              const tripDay = dateNum ? dayByDate[dateNum] : null;
              const color = tripDay ? blockColors[tripDay.block]?.bg : null;
              const isWeekend = di >= 5;
              return (
                <div key={di}
                  className="relative flex flex-col min-h-[80px] md:min-h-[100px]"
                  style={{
                    borderRight: di < 6 ? "1px solid var(--line)" : "none",
                    background: tripDay ? `${color}08` : "transparent",
                  }}
                >
                  {dateNum && (
                    <>
                      {/* date number */}
                      <div className="flex items-center justify-between px-2 pt-2 pb-1">
                        <span style={{
                          fontSize: 13, fontWeight: tripDay ? 700 : 400,
                          color: tripDay ? color : isWeekend ? "var(--ink-soft)" : "var(--ink)",
                          fontFamily: tripDay ? "var(--font-display)" : "inherit",
                        }}>
                          {dateNum}
                        </span>
                        {tripDay && (
                          <span style={{ fontSize: 13 }}>{blockEmoji[tripDay.block]}</span>
                        )}
                      </div>

                      {/* trip day info */}
                      {tripDay && (
                        <div className="px-2 pb-2 flex-1 flex flex-col gap-1">
                          <span className="inline-block px-1.5 py-0.5 rounded text-white"
                            style={{ fontSize: 9, fontWeight: 700, background: color, letterSpacing: "0.05em", width: "fit-content" }}>
                            DÍA {tripDay.num}
                          </span>
                          <p style={{
                            fontSize: 11, lineHeight: 1.3, color: "var(--ink)",
                            fontWeight: 500, display: "-webkit-box",
                            WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                          }}>
                            {tripDay.title}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Day-by-day list below */}
      <div className="mt-8 space-y-2">
        <p className="eyebrow mb-4" style={{ color: "var(--ink-soft)" }}>Resumen día a día</p>
        {days.map((d) => {
          const color = blockColors[d.block]?.bg;
          return (
            <div key={d.num}
              className="flex gap-3 rounded-xl p-3.5"
              style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}
            >
              {/* day badge */}
              <div className="shrink-0 flex flex-col items-center justify-center rounded-lg text-white w-11 h-11"
                style={{ background: color }}>
                <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.05em", opacity: 0.8 }}>DÍA</span>
                <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "var(--font-display)", lineHeight: 1 }}>{d.num}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{d.title}</span>
                  <span style={{ fontSize: 11, color: color, fontWeight: 600 }}>{blockEmoji[d.block]}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                  {d.weekday} {parseInt(d.date.split("-")[2])} sep · {d.cities}
                </p>
                <p style={{
                  fontSize: 12, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                }}>
                  {d.summary}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
