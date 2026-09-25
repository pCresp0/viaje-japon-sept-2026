import { useState, useEffect } from "react";
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
          {days.map((d, index) => {
            const isOpen = openId === d.id;
            const meta = futureLocationCoords[d.id] || { emoji: "📍", color: "#e63946" };

            return (
              <div
                key={d.id}
                id={`future-day-${d.id}`}
                className="itinerary-day-anchor"
              >
                {isOpen ? (
                  <article
                    className="rounded-2xl overflow-hidden border shadow-sm transition-all"
                    style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
                  >
                    {/* Header con el color del destino / bloque */}
                    <header
                      className="px-5 pt-5 pb-4 flex items-start justify-between gap-3 text-white"
                      style={{ background: meta.color }}
                    >
                      <div>
                        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.92)" }}>
                          {meta.emoji} Día {index + 1} · {d.cities}
                        </p>
                        <PlaceText
                          as="h2"
                          text={d.title}
                          className="font-display text-2xl text-white mt-1 leading-tight font-bold m-0"
                          linkStyle={{ color: "white", textDecorationColor: "rgba(255,255,255,0.7)" }}
                        />
                        <PlaceText
                          as="p"
                          text={d.cities}
                          className="text-white/85 text-sm mt-1 m-0"
                          linkStyle={{ color: "white", textDecorationColor: "rgba(255,255,255,0.7)" }}
                        />
                      </div>

                      <div className="shrink-0 mt-0.5 flex items-center gap-1.5 sm:gap-2">
                        {/* Botón Ver mapa */}
                        <button
                          type="button"
                          onClick={() => handleViewOnMap(d.id)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                          style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(4px)",
                          }}
                          title={lang === "en" ? "View on map" : lang === "fr" ? "Voir sur la carte" : lang === "tl" ? "Tingnan sa mapa" : "Ver en mapa"}
                        >
                          <MapPin size={13} />
                          <span className="hidden sm:inline">
                            {lang === "en" ? "Map" : lang === "fr" ? "Carte" : lang === "tl" ? "Mapa" : "Ver mapa"}
                          </span>
                        </button>

                        {/* Botón Cerrar (colapsar) */}
                        <button
                          type="button"
                          onClick={() => setOpenId(null)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                          style={{
                            background: "rgba(255, 255, 255, 0.2)",
                            color: "#fff",
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                          }}
                          title={lang === "en" ? "Close" : lang === "fr" ? "Fermer" : lang === "tl" ? "Isara" : "Cerrar día"}
                          aria-label="Cerrar día"
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>
                    </header>

                    {/* Cuerpo de la ficha de día */}
                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Contexto del viaje */}
                      <div
                        className="text-xs p-3 rounded-xl border flex items-start gap-2.5"
                        style={{
                          background: "var(--paper)",
                          borderColor: "var(--line)",
                          color: "var(--ink-soft)",
                        }}
                      >
                        <span className="text-base shrink-0 leading-none">💡</span>
                        <span className="leading-relaxed">
                          <strong style={{ color: "var(--ink)" }}>
                            {lang === "en" ? "Context:" : lang === "fr" ? "Contexte :" : lang === "tl" ? "Konteksto:" : "Contexto:"}
                          </strong>{" "}
                          {d.reason}
                        </span>
                      </div>

                      {/* Resumen */}
                      <PlaceText
                        as="p"
                        text={d.summary}
                        className="text-sm leading-relaxed m-0"
                        style={{ color: "var(--ink)" }}
                        linkStyle={{ color: "var(--shu)" }}
                      />

                      {/* Historia y contexto */}
                      {d.history && (
                        <div
                          className="p-3.5 rounded-xl border"
                          style={{
                            background: "var(--paper)",
                            borderColor: "var(--line)",
                          }}
                        >
                          <p
                            className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                            style={{ color: "var(--shu)", letterSpacing: "0.01em" }}
                          >
                            📜 {lang === "en" ? "History & Context" : lang === "fr" ? "Histoire & Contexte" : lang === "tl" ? "Kasaysayan at Konteksto" : "Historia y contexto"}
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

                      {/* Secciones del día / Itinerario paso a paso */}
                      <div className="pt-2 space-y-4">
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

                      {/* Presupuesto y logística */}
                      {d.money && (
                        <div className="pt-3.5 mt-2 border-t" style={{ borderColor: "var(--line)" }}>
                          <p className="text-xs sm:text-[13px] leading-relaxed m-0" style={{ color: "var(--ink-soft)" }}>
                            💰 <strong style={{ color: "var(--ink)" }}>{lang === "en" ? "Estimated budget:" : lang === "fr" ? "Budget estimé :" : lang === "tl" ? "Tinatayang badyet:" : "Presupuesto estimado:"}</strong> {d.money}
                          </p>
                        </div>
                      )}
                    </div>
                  </article>
                ) : (
                  <button
                    onClick={() => setOpenId(d.id)}
                    className="w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all hover:border-[var(--shu)]"
                    style={{
                      background: "var(--paper-raised)",
                      border: "1px solid var(--line)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm font-bold text-white shadow-xs"
                      style={{ background: meta.color }}
                    >
                      {index + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[15px] font-medium truncate" style={{ color: "var(--ink)" }}>
                        <span style={{ color: meta.color, fontWeight: 700, marginRight: 6 }}>
                          {lang === "en" ? `Day ${d.num || index + 1}:` : lang === "fr" ? `Jour ${d.num || index + 1} :` : lang === "tl" ? `Araw ${d.num || index + 1}:` : `Día ${d.num || index + 1}:`}
                        </span>
                        <PlaceText
                          as="span"
                          text={d.title}
                          linkStyle={{ color: "var(--shu)" }}
                        />
                      </span>
                      <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>
                        {d.cities}
                      </span>
                    </span>
                    <ChevronRight size={18} style={{ color: "var(--ink-soft)" }} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
