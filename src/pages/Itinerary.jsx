import { useEffect, useRef, useState } from "react";
import { useContent } from "../i18n/LanguageContext";
import { formatDateShort } from "../utils/date";
import DayCard from "../components/DayCard";
import PlaceText from "../components/PlaceText";
import ItineraryPrintView from "../components/ItineraryPrintView";
import ItineraryQuickView from "../components/ItineraryQuickView";
import { ChevronRight, FileDown, Loader2, List, LayoutList } from "lucide-react";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

export default function Itinerary({ openDay, setOpenDay, quickView, setQuickView, onGoToMapDay }) {
  const { days, blocks } = useContent();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const refs = useRef({});
  const { highlightId } = useHighlight();
  const [exporting, setExporting] = useState(false);

  function handleExportPdf() {
    setExporting(true);
    window.setTimeout(() => {
      window.print();
      setExporting(false);
    }, 80);
  }

  useEffect(() => {
    if (openDay == null || openDay === 0) return;
    const t = window.setTimeout(() => {
      if (quickView) {
        const el = document.getElementById(`quick-day-${openDay}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const el = refs.current[openDay];
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
    return () => window.clearTimeout(t);
  }, [openDay, quickView]);

  function handleShowQuickDay(dayNum) {
    setQuickView(true);
    window.setTimeout(() => {
      const el = document.getElementById(`quick-day-${dayNum}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  return (
    <div className="pt-3 pb-8 px-4">
      {/* ── Cabecera ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="eyebrow" style={{ color: "var(--shu)" }}>
            Los 15 días
          </p>
          <h1 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
            Itinerario completo
          </h1>
        </div>
        <button
          onClick={handleExportPdf}
          disabled={exporting}
          className="shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold"
          style={{ background: "var(--indigo)", color: "white", border: "none" }}
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
          Exportar guía PDF
        </button>
      </div>

      <p className="text-xs mb-4" style={{ color: "var(--ink-soft)" }}>
        El PDF incluye el itinerario completo (días 0–15) y anexos: vuelos, hoteles, billetes, Fuji, transporte, presupuesto, emergencias, pendientes, preparativos, comidas, frases e historia de Japón.
      </p>

      {/* ── Toggle vista rápida / completa ────────────────────── */}
      <div
        className="flex items-center gap-1 rounded-full p-1 mb-4"
        style={{ background: "var(--paper-raised)", border: "1px solid var(--line)", width: "fit-content" }}
      >
        <button
          onClick={() => setQuickView(false)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
          style={{
            background: !quickView ? "var(--indigo)" : "transparent",
            color: !quickView ? "white" : "var(--ink-soft)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <LayoutList size={13} />
          Detalle completo
        </button>
        <button
          onClick={() => setQuickView(true)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
          style={{
            background: quickView ? "var(--shu)" : "transparent",
            color: quickView ? "white" : "var(--ink-soft)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <List size={13} />
          Vista rápida
        </button>
      </div>

      {quickView && (
        <p className="text-xs mb-3 px-0.5" style={{ color: "var(--ink-soft)" }}>
          Solo lo esencial: transportes, visitas y comidas. Pulsa "Detalle completo" para ver toda la info.
        </p>
      )}

      <ItineraryPrintView days={days} />

      {/* ── Vista rápida ──────────────────────────────────────── */}
      {quickView ? (
        <ItineraryQuickView 
          days={days} 
          blocks={blocks} 
          onShowFullDay={(dayNum) => {
            setQuickView(false);
            setOpenDay(dayNum);
          }}
          onViewMap={onGoToMapDay}
          openDay={openDay}
          setOpenDay={setOpenDay}
        />
      ) : (
        /* ── Vista completa (comportamiento original) ─────────── */
        <div className="space-y-2.5">
          {days.map((d) => {
            const block = blockById[d.block];
            const isOpen = openDay === d.num;
            const isHighlighted = highlightId === slug("itinerary-day", d.num);
            return (
              <div
                key={d.num}
                ref={(el) => (refs.current[d.num] = el)}
                className={"itinerary-day-anchor" + (isHighlighted ? " search-highlight-pulse" : "")}
              >
                {isOpen ? (
                  <DayCard 
                    day={d} 
                    onClose={() => setOpenDay(null)} 
                    onViewMap={() => onGoToMapDay?.(d.num)} 
                    onShowQuickView={() => handleShowQuickDay(d.num)}
                  />
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
      )}
    </div>
  );
}
