import { useState, useEffect, useRef } from "react";
import { ChevronDown, BookOpen, Headphones, MonitorPlay, MapPinned, Scroll, Volume2, ExternalLink } from "lucide-react";
import { useContent, useT, useLang } from "../i18n/LanguageContext";
import { useTextSpeech } from "../utils/useTextSpeech";
import { useHighlight, Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

// Concatena el contenido de un periodo en un único texto legible en voz
// alta: título, resumen y cada bloque (encabezado + texto).
function periodSpeechText(period) {
  const parts = [period.title, period.summary];
  period.content?.forEach((block) => {
    if (block.heading) parts.push(block.heading + ".");
    if (block.text) parts.push(block.text);
  });
  return parts.filter(Boolean).join("  ");
}

// Color de acento del periodo. Se usa el valor hexadecimal literal (no
// "var(--shu)") porque hace falta concatenarle un sufijo de opacidad
// (p. ej. SHU + "18" = "#bc474918"), y eso sólo funciona con strings de
// color reales — con una referencia var() la concatenación no es CSS
// válido y el navegador la descarta en silencio.
const SHU = "#bc4749";

function PeriodCard({ period, isOpen, onToggle, speak, stop, speakingId, supported }) {
  const t = useT();
  const { guides } = useContent();
  const { highlightId } = useHighlight();
  const isSpeaking = speakingId === period.id;
  const anchorId = slug("history", period.id);
  const isHighlighted = highlightId === anchorId;
  const cardRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      const t = window.setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
  }, [isHighlighted]);

  return (
    <div
      id={anchorId}
      ref={cardRef}
      className={"rounded-2xl border overflow-hidden mb-3" + (isHighlighted ? " search-highlight-pulse" : "")}
      style={{
        borderColor: isOpen ? SHU + "55" : "var(--line)",
        background: "var(--paper-raised)",
        transition: "border-color 0.2s",
      }}>
      <div className="flex items-start gap-2 px-4 py-4"
        style={{ background: isOpen ? SHU + "14" : "transparent", transition: "background 0.2s" }}>

        {/* Altavoz — arriba a la izquierda, lee el periodo completo */}
        {supported && (
          <button
            onClick={(e) => { e.stopPropagation(); speak(periodSpeechText(period), period.id); }}
            aria-label="Escuchar este periodo"
            className="speaker-btn"
            style={{
              flexShrink: 0, marginTop: 1,
              width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: isSpeaking ? SHU : SHU + "1c",
              border: `1.5px solid ${isSpeaking ? SHU : SHU + "40"}`,
              boxShadow: isSpeaking
                ? `0 2px 8px ${SHU}55`
                : "0 1px 3px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <Volume2
              size={15}
              style={{ color: isSpeaking ? "#fff" : SHU }}
              className={isSpeaking ? "speaking-pulse" : ""}
            />
          </button>
        )}

        {/* Cabecera pulsable — abre/cierra el acordeón */}
        <button
          onClick={() => { if (isSpeaking) stop(); onToggle(); }}
          className="flex-1 text-left flex items-start gap-3"
        >
          <div style={{
            width: 34, height: 34, borderRadius: 10, flexShrink: 0, marginTop: 1,
            background: SHU + "18",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Scroll size={17} style={{ color: SHU }} />
          </div>

          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--shu)", letterSpacing: "0.04em" }}>
              {period.era}
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", marginTop: 1 }}>
              {period.title}
            </p>
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 3 }}>
              {period.summary}
            </p>
          </div>

          <ChevronDown
            size={16}
            style={{
              color: "var(--shu)", flexShrink: 0, marginTop: 8,
              transform: isOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </button>
      </div>

      {isOpen && (
        <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
          {period.content.map((block, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--indigo)", marginBottom: 4 }}>
                {block.heading}
              </p>
              <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.7 }}>
                {block.text}
              </p>
            </div>
          ))}

          {period.seeOnTrip?.length > 0 && (
            <div style={{
              marginTop: 10, background: "var(--paper)", borderRadius: 10,
              padding: "12px 14px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <MapPinned size={13} style={{ color: "var(--forest)" }} />
                <span style={{
                  fontSize: 11, fontWeight: 700, color: "var(--ink-soft)",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  {t("history.seeOnTrip")}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {period.seeOnTrip.map((ref, i) => {
                  const placeName = guides[ref.id]?.name ?? ref.place ?? ref.name ?? ref.id;
                  const placeNote = ref.note ?? ref.desc;
                  if (!placeName && !placeNote) return null;
                  return (
                    <div key={i} style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                      {placeName && (
                        <span style={{ fontWeight: 700, color: "var(--forest)" }}>
                          {placeName}
                        </span>
                      )}
                      {placeNote && (
                        <span style={{ color: "var(--ink)" }}>{placeName ? " — " : ""}{placeNote}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const { historyPeriods, furtherReading } = useContent();
  const t = useT();
  const { lang } = useLang();
  const { supported, speakingId, speak, stop } = useTextSpeech(lang);

  // 4 Secciones principales colapsadas por defecto
  const [openSections, setOpenSections] = useState({
    historia: false,
    podcasts: false,
    documentaries: false,
    books: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Acordeón exclusivo para periodos dentro de la sección de Historia
  const [openId, setOpenId] = useState(null);
  const { highlightId } = useHighlight();

  function handleToggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  // Si llegamos desde el buscador apuntando a un elemento concreto,
  // se abre automáticamente la sección padre correspondiente.
  useEffect(() => {
    if (!highlightId) return;
    if (highlightId.startsWith("history-podcasts")) {
      setOpenSections((prev) => ({ ...prev, podcasts: true }));
    } else if (highlightId.startsWith("history-documentaries")) {
      setOpenSections((prev) => ({ ...prev, documentaries: true }));
    } else if (highlightId.startsWith("history-books")) {
      setOpenSections((prev) => ({ ...prev, books: true }));
    } else {
      const match = historyPeriods.find((p) => slug("history", p.id) === highlightId);
      if (match) {
        setOpenSections((prev) => ({ ...prev, historia: true }));
        setOpenId(match.id);
      }
    }
  }, [highlightId, historyPeriods]);

  return (
    <div className="px-4 pt-3 pb-12">
      {/* Header */}
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("history.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          {t("history.title")}
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
          {t("history.intro")}
        </p>
      </div>

      {/* ── 1. SECCIÓN: HISTORIA DE JAPÓN ────────────────────────── */}
      <div 
        className="rounded-2xl border overflow-hidden mb-4 shadow-xs"
        style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
      >
        <button
          type="button"
          onClick={() => toggleSection("historia")}
          className="w-full text-left flex items-center justify-between px-5 py-3.5 transition-colors cursor-pointer border-none m-0"
          style={{ background: "var(--shu)" }}
        >
          <div className="flex items-center gap-2.5">
            <Scroll size={18} color="#fff" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
              {t("history.title")}
            </span>
            <span 
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              {historyPeriods.length}
            </span>
          </div>
          <ChevronDown
            size={18}
            color="#fff"
            className={`transition-transform duration-200 ${openSections.historia ? "rotate-180" : ""}`}
          />
        </button>

        {openSections.historia && (
          <div className="p-4" style={{ background: "var(--paper)" }}>
            {historyPeriods.map((period) => (
              <PeriodCard
                key={period.id}
                period={period}
                isOpen={openId === period.id}
                onToggle={() => handleToggle(period.id)}
                speak={speak}
                stop={stop}
                speakingId={speakingId}
                supported={supported}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── 2. SECCIÓN: PODCASTS (MORADO) ────────────────────────── */}
      <div 
        className="rounded-2xl border overflow-hidden mb-4 shadow-xs"
        style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
      >
        <button
          type="button"
          onClick={() => toggleSection("podcasts")}
          className="w-full text-left flex items-center justify-between px-5 py-3.5 transition-colors cursor-pointer border-none m-0"
          style={{ background: "#872ec4" }}
        >
          <div className="flex items-center gap-2.5">
            <Headphones size={18} color="#fff" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
              {t("history.podcasts")}
            </span>
            <span 
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              {furtherReading.podcasts.length}
            </span>
          </div>
          <ChevronDown
            size={18}
            color="#fff"
            className={`transition-transform duration-200 ${openSections.podcasts ? "rotate-180" : ""}`}
          />
        </button>

        {openSections.podcasts && (
          <div>
            {furtherReading.podcasts.map((p, i) => (
              <Highlightable key={i} id={slug("history", "podcasts", p.title)}>
                <div 
                  className="px-5 py-4"
                  style={{ borderBottom: i < furtherReading.podcasts.length - 1 ? "1px solid var(--line)" : "none" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>{p.title}</p>
                      <p style={{ fontSize: 12, color: "#872ec4", fontWeight: 600, marginTop: 2, marginBottom: 0 }}>{p.show}</p>
                    </div>
                    {p.url && (
                      <a 
                        href={p.url} 
                        target="_blank" rel="noopener noreferrer" 
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:opacity-90 active:scale-95 self-start"
                        style={{ background: "#872ec4", textDecoration: "none" }}
                      >
                        <Headphones size={13} />
                        Apple Podcasts
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "6px 0 0" }}>{p.note}</p>
                </div>
              </Highlightable>
            ))}
          </div>
        )}
      </div>

      {/* ── 3. SECCIÓN: DOCUMENTALES (ROJO YOUTUBE) ────────────────── */}
      {furtherReading.documentaries && furtherReading.documentaries.length > 0 && (
        <div 
          className="rounded-2xl border overflow-hidden mb-4 shadow-xs"
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
        >
          <button
            type="button"
            onClick={() => toggleSection("documentaries")}
            className="w-full text-left flex items-center justify-between px-5 py-3.5 transition-colors cursor-pointer border-none m-0"
            style={{ background: "#c4302b" }}
          >
            <div className="flex items-center gap-2.5">
              <MonitorPlay size={18} color="#fff" />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
                {t("history.documentaries")}
              </span>
              <span 
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ background: "rgba(255,255,255,0.22)" }}
              >
                {furtherReading.documentaries.length}
              </span>
            </div>
            <ChevronDown
              size={18}
              color="#fff"
              className={`transition-transform duration-200 ${openSections.documentaries ? "rotate-180" : ""}`}
            />
          </button>

          {openSections.documentaries && (
            <div>
              {furtherReading.documentaries.map((d, i) => (
                <Highlightable key={i} id={slug("history", "documentaries", d.title)}>
                  <div 
                    className="px-5 py-4"
                    style={{ borderBottom: i < furtherReading.documentaries.length - 1 ? "1px solid var(--line)" : "none" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>{d.title}</p>
                        <p style={{ fontSize: 12, color: "#c4302b", fontWeight: 600, marginTop: 2, marginBottom: 0 }}>{d.channel}</p>
                      </div>
                      {d.url && (
                        <a 
                          href={d.url} 
                          target="_blank" rel="noopener noreferrer" 
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:opacity-90 active:scale-95 self-start"
                          style={{ background: "#c4302b", textDecoration: "none" }}
                        >
                          <MonitorPlay size={13} />
                          YouTube
                        </a>
                      )}
                    </div>
                    <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "6px 0 0" }}>{d.note}</p>
                  </div>
                </Highlightable>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── 4. SECCIÓN: LIBROS (AZUL / ÍNDIGO) ────────────────────── */}
      <div 
        className="rounded-2xl border overflow-hidden mb-4 shadow-xs"
        style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
      >
        <button
          type="button"
          onClick={() => toggleSection("books")}
          className="w-full text-left flex items-center justify-between px-5 py-3.5 transition-colors cursor-pointer border-none m-0"
          style={{ background: "var(--indigo)" }}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} color="#fff" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
              {t("history.books")}
            </span>
            <span 
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              {furtherReading.books.length}
            </span>
          </div>
          <ChevronDown
            size={18}
            color="#fff"
            className={`transition-transform duration-200 ${openSections.books ? "rotate-180" : ""}`}
          />
        </button>

        {openSections.books && (
          <div>
            {furtherReading.books.map((b, i) => (
              <Highlightable key={i} id={slug("history", "books", b.title)}>
                <div 
                  className="px-5 py-4"
                  style={{ borderBottom: i < furtherReading.books.length - 1 ? "1px solid var(--line)" : "none" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>{b.title}</p>
                      <p style={{ fontSize: 12, color: "var(--shu)", fontWeight: 600, marginTop: 2, marginBottom: 0 }}>{b.author}</p>
                    </div>
                    {b.url && (
                      <a 
                        href={b.url} 
                        target="_blank" rel="noopener noreferrer" 
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-white transition-all hover:opacity-90 active:scale-95 self-start"
                        style={{ background: "var(--indigo)", textDecoration: "none" }}
                      >
                        <BookOpen size={13} />
                        {t("history.readOnline") || "Leer online"}
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "6px 0 0" }}>{b.note}</p>
                </div>
              </Highlightable>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
