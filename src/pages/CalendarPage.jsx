import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useContent, useT } from "../i18n/LanguageContext";
import DayCard from "../components/DayCard";
import { X, CalendarPlus, Download, ExternalLink } from "lucide-react";
import { days } from "../data/trip";
import { downloadIcsCalendar } from "../utils/exportCalendar";

// blockColors removed, we use blocks from context now
const blockEmoji = { kioto: "⛩️", alpes: "🏔️", tokio: "🗼" };

const dayHighlights = {
  0: { highlight: "✈️ Vuelo QR148 MAD", stay: "En vuelo" },
  1: { highlight: "✈️ Aterrizaje NRT", stay: "🏨 Keihan Kioto" },
  2: { highlight: "🦌 Excursión Nara", stay: "🏨 Keihan Kioto" },
  3: { highlight: "🏯 Kinkaku & Kiyomizu", stay: "🏨 Keihan Kioto" },
  4: { highlight: "🎋 Arashiyama & Gion", stay: "🏨 Keihan Kioto" },
  5: { highlight: "🏯 Excursión Osaka", stay: "🏨 Keihan Kioto" },
  6: { highlight: "🌸 Kenroku-en", stay: "🏨 Resol Kanazawa" },
  7: { highlight: "🚌 Nohi Bus Shirakawa", stay: "🏨 Wood Takayama" },
  8: { highlight: "⛰️ Nakasendo (8km)", stay: "🏨 Magome Chaya" },
  9: { highlight: "🚄 Shinkansen Tokio", stay: "🏨 KOKO Tokio" },
  10: { highlight: "🌉 teamLab Planets", stay: "🏨 KOKO Tokio" },
  11: { highlight: "🚦 Shibuya & Meiji", stay: "🏨 KOKO Tokio" },
  12: { highlight: "🎮 Akihabara & Ueno", stay: "🏨 KOKO Tokio" },
  13: { highlight: "🌃 Shinjuku Yokocho", stay: "🏨 KOKO Tokio" },
  14: { highlight: "🗻 Tour Monte Fuji", stay: "🏨 KOKO Tokio" },
  15: { highlight: "✈️ Vuelta NRT QR809", stay: "Regreso" },
};

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
  const [showExportModal, setShowExportModal] = useState(false);
  const selectedDay = selectedDayNum !== null ? days.find(d => d.num === selectedDayNum) : null;
  
  // blocks is an array, build a dictionary by id
  const blockMap = Object.fromEntries((blocks || []).map(b => [b.id, b]));

  const WEEKDAYS = [
    t("calendar.weekdays.0"),
    t("calendar.weekdays.1"),
    t("calendar.weekdays.2"),
    t("calendar.weekdays.3"),
    t("calendar.weekdays.4"),
    t("calendar.weekdays.5"),
    t("calendar.weekdays.6"),
  ];

  // Lock body scroll while the mobile modal is open
  useEffect(() => {
    if ((selectedDay || showExportModal) && window.innerWidth < 1024) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [selectedDay, showExportModal]);

  return (
    <div style={{ display: "flex", height: "100%", gap: 16 }}>
      {/* Calendar grid — left side */}
      <div className="flex-1 px-4 pt-3 pb-12 overflow-y-auto" style={{ maxWidth: "none" }}>
        {/* title + export button */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("calendar.eyebrow")}</p>
            <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
              {t("calendar.title")}
            </h2>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.6 }}>
              {t("calendar.intro")}
            </p>
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all hover:opacity-90 mt-1"
            style={{
              background: "var(--shu)",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(188,71,73,0.3)"
            }}
          >
            <CalendarPlus size={15} />
            <span>Exportar</span>
          </button>
        </div>

        {/* legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Array.isArray(blocks) && blocks.map((b) => (
            <div key={b.id} className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: b.color }} />
              <span className="text-xs font-medium" style={{ color: "var(--ink)" }}>
                {blockEmoji[b.id] || b.emoji} {b.title}
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
                const blockData = tripDay ? blockMap[tripDay.block] : null;
                const color = blockData ? blockData.color : "#bc4749";
                const isWeekend = di >= 5;
                const isSelected = tripDay && tripDay.num === selectedDayNum;
                const meta = tripDay ? dayHighlights[tripDay.num] : null;
                
                return (
                  <button
                    key={di}
                    onClick={() => tripDay && setSelectedDayNum(tripDay.num)}
                    style={{
                      borderRight: di < 6 ? "1px solid var(--line)" : "none",
                      borderTop: tripDay ? `3px solid ${color}` : "none",
                      background: isSelected ? `${color}35` : tripDay ? `${color}15` : "transparent",
                      boxShadow: isSelected ? `inset 0 0 0 2px ${color}` : "none",
                      cursor: tripDay ? "pointer" : "default",
                      minHeight: 96,
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (tripDay) e.currentTarget.style.background = `${color}28`;
                    }}
                    onMouseLeave={(e) => {
                      if (tripDay && !isSelected) e.currentTarget.style.background = `${color}15`;
                    }}
                  >
                    {dateNum && (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span style={{
                            fontSize: 12.5, fontWeight: tripDay ? 700 : 400,
                            color: tripDay ? color : isWeekend ? "var(--ink-soft)" : "var(--ink)",
                            fontFamily: tripDay ? "var(--font-display)" : "inherit",
                          }}>
                            {dateNum}
                          </span>
                          {tripDay && (
                            <span style={{ fontSize: 12 }}>{blockEmoji[tripDay.block] || blockData?.emoji}</span>
                          )}
                        </div>
                        {tripDay && (
                          <div className="text-left flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <span className="inline-block px-1 py-0.5 rounded text-white mb-1"
                                style={{ fontSize: 7.5, fontWeight: 700, background: color, letterSpacing: "0.05em" }}>
                                DÍA {tripDay.num}
                              </span>
                              <p style={{
                                fontSize: 10, lineHeight: 1.15, color: "var(--ink)",
                                fontWeight: 700, display: "-webkit-box",
                                WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden",
                                marginBottom: 2
                              }}>
                                {tripDay.title}
                              </p>
                            </div>

                            {meta && (
                              <div className="space-y-0.5 mt-0.5">
                                <div className="text-[8.5px] font-semibold px-1 py-0.5 rounded bg-black/5 truncate" style={{ color: "var(--ink)" }}>
                                  {meta.highlight}
                                </div>
                                <div className="text-[8px] font-medium opacity-80 truncate" style={{ color: "var(--ink-soft)" }}>
                                  {meta.stay}
                                </div>
                              </div>
                            )}
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
          padding: 20,
          overflowY: "auto",
          height: "100%",
          flexShrink: 0,
          position: "relative",
        }}>
          <button
            onClick={() => setSelectedDayNum(null)}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: 28,
              right: 28,
              zIndex: 30,
              background: "rgba(0, 0, 0, 0.4)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            <X size={18} />
          </button>
          <DayCard day={selectedDay} defaultOpenHistory={true} />
        </div>
      )}

      {/* Mobile modal overlay for day detail */}
      {selectedDay && createPortal(
        <div data-mobile-modal className="modal-overlay" onClick={() => setSelectedDayNum(null)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ position: "relative", overflow: "hidden" }}>
            <button
              onClick={() => setSelectedDayNum(null)}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 30,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.4)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
              }}
            >
              <X size={18} />
            </button>
            <div style={{ padding: 0 }}>
              <DayCard day={selectedDay} defaultOpenHistory={true} />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Export Calendar Modal */}
      {showExportModal && createPortal(
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div
            className="modal-sheet p-6"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 440, borderRadius: 24, background: "var(--paper-raised)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CalendarPlus size={22} style={{ color: "var(--shu)" }} />
                <h3 className="font-bold text-lg" style={{ color: "var(--ink)", margin: 0 }}>
                  Exportar itinerario
                </h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center border"
                style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink-soft)" }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 18, lineHeight: 1.5 }}>
              Añade automáticamente los 16 días del viaje con sus títulos, ciudades y detalles a la aplicación de calendario de tu móvil u ordenador.
            </p>

            <div className="space-y-3 mb-4">
              {/* Apple Calendar / iCal */}
              <button
                onClick={() => {
                  downloadIcsCalendar(days);
                  setShowExportModal(false);
                }}
                className="w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all hover:bg-black/5"
                style={{ background: "var(--paper)", borderColor: "var(--line)" }}
              >
                <span className="text-2xl shrink-0">🍏</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "var(--ink)", margin: 0 }}>
                    Apple Calendar (iPhone / Mac)
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)", margin: 0 }}>
                    Descarga el archivo .ics y lo abre directamente en iCal.
                  </p>
                </div>
                <Download size={18} style={{ color: "var(--indigo)" }} />
              </button>

              {/* Google Calendar */}
              <button
                onClick={() => {
                  downloadIcsCalendar(days);
                  window.open("https://calendar.google.com/calendar/u/0/r/settings/export", "_blank");
                  setShowExportModal(false);
                }}
                className="w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all hover:bg-black/5"
                style={{ background: "var(--paper)", borderColor: "var(--line)" }}
              >
                <span className="text-2xl shrink-0">🌐</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "var(--ink)", margin: 0 }}>
                    Google Calendar
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)", margin: 0 }}>
                    Descarga el .ics y abre la web de importación de Google.
                  </p>
                </div>
                <ExternalLink size={18} style={{ color: "var(--forest)" }} />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
