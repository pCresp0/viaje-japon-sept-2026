import { useState } from "react";
import { ChevronDown, ChevronRight, CalendarX2, Compass, MapPin, List, FileDown, Loader2 } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import {
  pendingDays,
  pendingSectionLabel,
  pendingSectionSubtitle,
  futureSectionTabs,
  futureLocationCoords,
} from "../data/pendingDays";
import PlaceText from "../components/PlaceText";
import FutureTripsMap from "../components/FutureTripsMap";
import FutureTripsPrintView from "../components/FutureTripsPrintView";

export default function FutureTripsPage({ initialTab = "itinerario", onTabChange }) {
  const { lang } = useLang();
  const days = pendingDays[lang] || pendingDays.es;
  const tabs = futureSectionTabs[lang] || futureSectionTabs.es;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [openId, setOpenId] = useState(null);
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSwitch = (t) => {
    setActiveTab(t);
    if (onTabChange) onTabChange(t);
  };

  function handleExportPdf() {
    setExporting(true);
    window.setTimeout(() => {
      window.print();
      setExporting(false);
    }, 100);
  }

  const handleGoToItinerary = (id) => {
    handleTabSwitch("itinerario");
    setOpenId(id);
    setTimeout(() => {
      const el = document.getElementById(`future-day-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleViewOnMap = (id) => {
    setSelectedMapId(id);
    handleTabSwitch("mapa");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto">
      {/* Header con botón de exportar PDF */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Utilidades · Ideas</p>
          <div className="flex items-center gap-2">
            <Compass size={22} style={{ color: "var(--indigo)" }} />
            <h2 className="font-display text-2xl" style={{ color: "var(--indigo)", margin: 0 }}>
              {pendingSectionLabel[lang] || pendingSectionLabel.es}
            </h2>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "4px 0 0" }}>
            {pendingSectionSubtitle[lang] || pendingSectionSubtitle.es}
          </p>
        </div>

        <button
          onClick={handleExportPdf}
          disabled={exporting}
          className="shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold cursor-pointer shadow-xs transition-opacity hover:opacity-90 active:scale-95"
          style={{ background: "var(--indigo)", color: "white", border: "none" }}
          title={lang === "en" ? "Export PDF Guide" : lang === "fr" ? "Exporter le guide PDF" : lang === "tl" ? "I-export ang PDF Guide" : "Exportar guía PDF"}
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
          <span>{lang === "en" ? "Export PDF Guide" : lang === "fr" ? "Exporter le guide PDF" : lang === "tl" ? "I-export ang PDF Guide" : "Exportar guía PDF"}</span>
        </button>
      </div>

      <FutureTripsPrintView days={days} lang={lang} />

      {/* Switcher pill buttons (Itinerario futuro / Mapa futuro) */}
      <div className="flex gap-2 pb-3 mb-3 border-b" style={{ borderColor: "var(--line)" }}>
        <button
          onClick={() => handleTabSwitch("itinerario")}
          className="px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            backgroundColor: activeTab === "itinerario" ? "var(--shu)" : "var(--paper-raised)",
            color: activeTab === "itinerario" ? "#fff" : "var(--ink)",
            border: activeTab === "itinerario" ? "1px solid var(--shu-deep)" : "1px solid var(--line)",
            boxShadow: activeTab === "itinerario" ? "0 2px 8px rgba(185, 28, 28, 0.25)" : "none",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <List size={16} />
          <span>{tabs.itinerary}</span>
        </button>

        <button
          onClick={() => handleTabSwitch("mapa")}
          className="px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2"
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            backgroundColor: activeTab === "mapa" ? "var(--shu)" : "var(--paper-raised)",
            color: activeTab === "mapa" ? "#fff" : "var(--ink)",
            border: activeTab === "mapa" ? "1px solid var(--shu-deep)" : "1px solid var(--line)",
            boxShadow: activeTab === "mapa" ? "0 2px 8px rgba(185, 28, 28, 0.25)" : "none",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <MapPin size={16} />
          <span>{tabs.map}</span>
        </button>
      </div>

      {/* Content depending on active tab */}
      {activeTab === "mapa" ? (
        <FutureTripsMap
          days={days}
          selectedId={selectedMapId}
          onSelectDay={(id) => setSelectedMapId(id)}
          onGoToItinerary={handleGoToItinerary}
          lang={lang}
        />
      ) : (
        <div className="space-y-2.5">
          {days.map((d) => {
            const isOpen = openId === d.id;
            const meta = futureLocationCoords[d.id] || { emoji: "📍", color: "#e63946" };

            return (
              <div
                key={d.id}
                id={`future-day-${d.id}`}
                className="rounded-xl overflow-hidden transition-all"
                style={{
                  border: isOpen ? "1px solid var(--shu)" : "1px dashed var(--line)",
                  background: "var(--paper-raised)",
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : d.id)}
                  className="w-full flex items-center gap-3 p-3.5 text-left"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
                    style={{ background: meta.color, color: "#fff" }}
                  >
                    {meta.emoji}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="block text-[15px] font-medium truncate" style={{ color: "var(--ink)" }}>
                        {d.title}
                      </span>
                    </span>
                    <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>
                      {d.cities}
                    </span>
                  </span>
                  {isOpen ? (
                    <ChevronDown size={18} style={{ color: "var(--ink-soft)" }} />
                  ) : (
                    <ChevronRight size={18} style={{ color: "var(--ink-soft)" }} />
                  )}
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className="text-xs italic p-2.5 rounded-lg flex-1 m-0"
                        style={{ color: "var(--ink-soft)", background: "var(--paper)", border: "1px solid var(--line)" }}
                      >
                        {d.reason}
                      </p>
                      <button
                        onClick={() => handleViewOnMap(d.id)}
                        className="shrink-0 py-2 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        style={{
                          background: "var(--paper)",
                          border: "1px solid var(--line)",
                          color: "var(--indigo)",
                          cursor: "pointer",
                        }}
                      >
                        <MapPin size={13} style={{ color: "var(--shu)" }} />
                        <span>{lang === "en" ? "Map" : lang === "fr" ? "Carte" : lang === "tl" ? "Mapa" : "Ver en mapa"}</span>
                      </button>
                    </div>

                    <PlaceText
                      as="p"
                      text={d.summary}
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ink)" }}
                      linkStyle={{ color: "var(--shu)" }}
                    />

                    {d.history && (
                      <div className="pt-1">
                        <p
                          className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                          style={{ color: "var(--shu)", letterSpacing: "0.01em" }}
                        >
                          {lang === "en" ? "History & Context" : lang === "fr" ? "Histoire & Contexte" : lang === "tl" ? "Kasaysayan at Konteksto" : "Historia y contexto"}
                        </p>
                        <PlaceText
                          as="p"
                          text={d.history}
                          className="text-[13.5px] leading-[1.65] m-0"
                          style={{ color: "var(--ink)", whiteSpace: "pre-wrap" }}
                          linkStyle={{ color: "var(--shu)", fontWeight: 600 }}
                        />
                      </div>
                    )}

                    <div className="pt-2 pb-1 space-y-4">
                      {d.schedule.map((item, i) => (
                        <div key={i}>
                          <p
                            className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                            style={{
                              color: "var(--shu)",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {item.time}
                          </p>
                          <PlaceText
                            as="p"
                            text={item.text}
                            className="text-[13.5px] leading-[1.65] m-0"
                            style={{ color: "var(--ink)", whiteSpace: "pre-wrap" }}
                            linkStyle={{ color: "var(--shu)", fontWeight: 600 }}
                          />
                        </div>
                      ))}
                    </div>

                    {d.money && (
                      <div className="pt-3 mt-1" style={{ borderTop: "1px solid var(--line)" }}>
                        <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                          💰 {d.money}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
