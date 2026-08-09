import { useState, useEffect, useRef } from "react";
import { ChevronDown, BookOpen, Headphones, MapPinned, Scroll, Volume2 } from "lucide-react";
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
                  Lo veréis en el viaje
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {period.seeOnTrip.map((ref, i) => (
                  <div key={i} style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                    <span style={{ fontWeight: 700, color: "var(--forest)" }}>
                      {guides[ref.id]?.name ?? ref.id}
                    </span>
                    <span style={{ color: "var(--ink)" }}> — {ref.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const { historyPeriods, furtherReading, guides } = useContent();
  const t = useT();
  const { lang } = useLang();
  const { supported, speakingId, speak, stop } = useTextSpeech(lang);

  // Acordeón exclusivo: sólo un periodo abierto a la vez. Al abrir uno
  // distinto se cierra automáticamente el que estuviera abierto.
  const [openId, setOpenId] = useState(null);
  const { highlightId } = useHighlight();

  function handleToggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  // Si llegamos desde el buscador apuntando a un periodo concreto, se
  // abre automáticamente antes de que PeriodCard intente hacer scroll.
  useEffect(() => {
    if (!highlightId) return;
    const match = historyPeriods.find((p) => slug("history", p.id) === highlightId);
    if (match) setOpenId(match.id);
  }, [highlightId, historyPeriods]);

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Para entender lo que vais a ver</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Historia de Japón
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
          Un recorrido por más de 2.000 años de historia japonesa, organizado por periodos, con referencias directas a los lugares concretos que vais a visitar durante el viaje. Pulsa cada periodo para desplegarlo, o el altavoz para escucharlo.
        </p>
      </div>

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

      {/* Further reading */}
      <div style={{ marginTop: 32 }}>
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Para profundizar</p>
        <h3 className="font-display text-xl" style={{ color: "var(--indigo)", marginBottom: 4 }}>
          Libros y podcasts recomendados
        </h3>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 16, lineHeight: 1.6 }}>
          Si alguna de estas historias os ha dejado con ganas de más, aquí tenéis por dónde seguir tirando del hilo.
        </p>

        {/* Books */}
        <div className="rounded-2xl border overflow-hidden mb-4"
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--indigo)" }}>
            <BookOpen size={16} color="#fff" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Libros</span>
          </div>
          {furtherReading.books.map((b, i) => (
            <Highlightable key={i} id={slug("history", "books", b.title)}>
              <div className="px-5 py-4"
                style={{ borderBottom: i < furtherReading.books.length - 1 ? "1px solid var(--line)" : "none" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{b.title}</p>
                <p style={{ fontSize: 12, color: "var(--shu)", fontWeight: 600, marginTop: 1, marginBottom: 5 }}>{b.author}</p>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{b.note}</p>
              </div>
            </Highlightable>
          ))}
        </div>

        {/* Podcasts */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--forest)" }}>
            <Headphones size={16} color="#fff" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Podcasts</span>
          </div>
          {furtherReading.podcasts.map((p, i) => (
            <Highlightable key={i} id={slug("history", "podcasts", p.title)}>
              <div className="px-5 py-4"
                style={{ borderBottom: i < furtherReading.podcasts.length - 1 ? "1px solid var(--line)" : "none" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{p.title}</p>
                <p style={{ fontSize: 12, color: "var(--forest)", fontWeight: 600, marginTop: 1, marginBottom: 5 }}>{p.show}</p>
                <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{p.note}</p>
              </div>
            </Highlightable>
          ))}
        </div>
      </div>
    </div>
  );
}
