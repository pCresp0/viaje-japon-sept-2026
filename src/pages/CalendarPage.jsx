import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useContent, useT } from "../i18n/LanguageContext";
import DayCard from "../components/DayCard";
import { X } from "lucide-react";
import { days } from "../data/trip";

const blockColors = {
  kioto: { bg: "#bc4749", label: "Kioto · Nara · Osaka" },
  alpes: { bg: "#2e7d5b", label: "Alpes Japoneses"      },
  tokio: { bg: "#1d3557", label: "Tokio"                },
};

const blockEmoji = { kioto: "⛩️", alpes: "🏔️", tokio: "🗼" };

const SEP_START_DOW = 1;
const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function buildGrid() {
  const cells = [];
  const offset = 1;
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= 30; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const grid = buildGrid();

const dayByDate = {};
days.forEach((d) => {
  const dateNum = parseInt(d.date.split("-")[2]);
  dayByDate[dateNum] = d;
});

// Solo semanas con algún día del viaje (quita la fila del 28–30, vacía)
const weeks = [];
for (let wi = 0; wi < grid.length / 7; wi++) {
  const week = grid.slice(wi * 7, wi * 7 + 7);
  if (week.some((d) => d && dayByDate[d])) weeks.push(week);
}

export default function CalendarPage() {
  const { days, blocks } = useContent();
  const t = useT();
  const [selectedDayNum, setSelectedDayNum] = useState(null);
  const selectedDay = selectedDayNum !== null ? days.find(d => d.num === selectedDayNum) : null;

  // Lock body scroll while the mobile modal is open, so the page behind
  // it can't move and the close button/backdrop stay reachable.
  useEffect(() => {
    if (selectedDay && window.innerWidth < 1024) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [selectedDay]);

  return (
    <div style={{ display: "flex", height: "100%", gap: 16 }}>
      {/* Calendar grid — left side */}
      <div className="flex-1 px-4 pt-3 pb-12 overflow-y-auto" style={{ maxWidth: "none" }}>
        {/* title */}
        <div className="mb-6">
          <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("calendar.eyebrow")}</p>
          <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
            {t("calendar.title")}
          </h2>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.6 }}>
            {t("calendar.intro")}
          </p>
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
        <div className="rounded-2xl overflow-hidden border mb-8" style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
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
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7"
              style={{ borderBottom: wi < weeks.length - 1 ? "1px solid var(--line)" : "none" }}>
              {week.map((dateNum, di) => {
                const tripDay = dateNum ? dayByDate[dateNum] : null;
                const color = tripDay ? blockColors[tripDay.block]?.bg : null;
                const isWeekend = di >= 5;
                const isSelected = tripDay && tripDay.num === selectedDayNum;
                
                return (
                  <button
                    key={di}
                    onClick={() => tripDay && setSelectedDayNum(tripDay.num)}
                    style={{
                      borderRight: di < 6 ? "1px solid var(--line)" : "none",
                      background: isSelected ? `${color}15` : tripDay ? `${color}08` : "transparent",
                      border: isSelected ? `2px solid ${color}` : "none",
                      cursor: tripDay ? "pointer" : "default",
                      minHeight: 80,
                      padding: 8,
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (tripDay) e.currentTarget.style.background = `${color}12`;
                    }}
                    onMouseLeave={(e) => {
                      if (tripDay && !isSelected) e.currentTarget.style.background = `${color}08`;
                    }}
                  >
                    {dateNum && (
                      <>
                        <div className="flex items-center justify-between mb-1">
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
                        {tripDay && (
                          <div className="text-left flex-1">
                            <span className="inline-block px-1.5 py-0.5 rounded text-white mb-1"
                              style={{ fontSize: 8, fontWeight: 700, background: color, letterSpacing: "0.05em" }}>
                              DÍA {tripDay.num}
                            </span>
                            <p style={{
                              fontSize: 10, lineHeight: 1.2, color: "var(--ink)",
                              fontWeight: 500, display: "-webkit-box",
                              WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                            }}>
                              {tripDay.title}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Day detail panel — right side (desktop only, fixed width) */}
      {selectedDay && (
        <div data-detail-panel style={{
          display: "flex",
          width: 380,
          flexDirection: "column",
          borderLeft: "1px solid var(--line)",
          background: "var(--paper-raised)",
          paddingTop: 24,
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 24,
          overflowY: "auto",
          height: "100%",
          flexShrink: 0,
        }}>
          <button
            onClick={() => setSelectedDayNum(null)}
            style={{
              position: "sticky",
              top: 0,
              float: "right",
              marginLeft: 12,
              marginBottom: -32,
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--ink-soft)",
              zIndex: 5,
            }}
          >
            <X size={16} />
          </button>
          <DayCard day={selectedDay} defaultOpenHistory={true} />
        </div>
      )}

      {/* Mobile modal overlay for day detail — portaled to <body> so
          position:fixed is always relative to the real viewport, never
          to a scrolling ancestor (an iOS Safari quirk). Anchored near
          the top of the screen (not a full bottom-sheet) so it never
          collides with the mobile topbar, with its own sticky header
          and scrollable body so long content is always reachable. */}
      {selectedDay && createPortal(
        <div data-mobile-modal className="modal-overlay" onClick={() => setSelectedDayNum(null)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-sheet-header">
              <button className="modal-close-btn" onClick={() => setSelectedDayNum(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-sheet-body">
              <DayCard day={selectedDay} defaultOpenHistory={true} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
