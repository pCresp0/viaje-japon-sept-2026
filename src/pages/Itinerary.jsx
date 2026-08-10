import { useEffect, useRef, useState } from "react";
import { useContent } from "../i18n/LanguageContext";
import { formatDateShort } from "../utils/date";
import DayCard from "../components/DayCard";
import PlaceText from "../components/PlaceText";
import { ChevronRight, FileDown, Loader2 } from "lucide-react";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

export default function Itinerary({ openDay, setOpenDay, onGoToMapDay }) {
  const { days, blocks } = useContent();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const refs = useRef({});
  const { highlightId } = useHighlight();
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);

  async function handleExportPdf() {
    if (exporting) return;
    setExporting(true);
    setExportProgress(null);
    try {
      // jsPDF (con html2canvas de propina, que no se usa aquí pero pesa
      // ~200KB) sólo se descarga cuando de verdad hace falta, al pulsar
      // el botón — así el resto de la app no paga ese peso de más en
      // cada visita si nadie exporta nunca un PDF.
      const { exportItineraryPdf } = await import("../utils/exportItineraryPdf");
      await exportItineraryPdf(days, {
        onProgress: (done, total) => setExportProgress({ done, total }),
      });
    } finally {
      setExporting(false);
      setExportProgress(null);
    }
  }

  useEffect(() => {
    if (openDay == null) return;
    const el = refs.current[openDay];
    if (!el) return;
    // Esperar a que la DayCard se monte y mida, para ir al borde superior
    // de la card (no al título a medias bajo la cabecera fija).
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [openDay]);

  return (
    <div className="pt-3 pb-8 px-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow" style={{ color: "var(--shu)" }}>
            Los 15 días
          </p>
          <h1 className="font-display text-2xl mb-3" style={{ color: "var(--indigo)" }}>
            Itinerario completo
          </h1>
        </div>
        <button
          onClick={handleExportPdf}
          disabled={exporting}
          className="shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold"
          style={{ background: "var(--indigo)", color: "white", border: "none", opacity: exporting ? 0.75 : 1 }}
        >
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
          {exporting
            ? (exportProgress ? `Generando… ${exportProgress.done}/${exportProgress.total}` : "Generando…")
            : "Exportar a PDF"}
        </button>
      </div>
      <div className="mt-3 space-y-2.5">
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
                <DayCard day={d} onClose={() => setOpenDay(null)} onViewMap={() => onGoToMapDay?.(d.num)} />
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
