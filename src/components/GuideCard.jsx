import { useState, useEffect, useRef } from "react";
import { BookOpen, ChevronDown, Lightbulb, Sparkles } from "lucide-react";
import { popCulture } from "../data/popCulture";
import { guideImages } from "../data/guideImages";
import { useContent } from "../i18n/LanguageContext";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

const franchiseStyle = {
  pokemon: { label: "Pokémon", emoji: "⚡", color: "#d9720a" },
  digimon: { label: "Digimon", emoji: "🔷", color: "#1d6fb8" },
  pelicula: { label: "Película", emoji: "🎬", color: "#6b3fa0" },
};

function GuideBody({ guide, refs, localImage, accent }) {
  return (
    <>
      {localImage && (
        <figure style={{ margin: "0 0 14px" }}>
          <img
            src={localImage}
            alt={guide.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            style={{
              width: "100%", aspectRatio: "16 / 10", objectFit: "cover",
              borderRadius: 10, display: "block",
              background: "var(--paper)",
            }}
          />
          <figcaption style={{
            fontSize: 10.5, color: "var(--ink-soft)", marginTop: 5,
            display: "flex", justifyContent: "flex-end",
          }}>
            Foto: Wikimedia Commons
          </figcaption>
        </figure>
      )}

      {guide.sections.map((s, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <p style={{
            fontSize: 12, fontWeight: 700, color: accent,
            letterSpacing: "0.02em", marginBottom: 4,
          }}>
            {s.title}
          </p>
          <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.65 }}>
            {s.body}
          </p>
        </div>
      ))}

      {refs?.length > 0 && (
        <div style={{ marginTop: 4, marginBottom: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {refs.map((ref, i) => {
            const fs = franchiseStyle[ref.franchise];
            return (
              <div key={i} style={{
                border: `1px solid ${fs.color}33`,
                background: `${fs.color}0d`,
                borderRadius: 10, padding: "10px 12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: "#fff",
                    background: fs.color, padding: "2px 8px", borderRadius: 20,
                    letterSpacing: "0.02em", display: "inline-flex", alignItems: "center", gap: 4,
                  }}>
                    {fs.emoji} {fs.label}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
                    {ref.title}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>
                  {ref.detail}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {guide.curiosities?.length > 0 && (
        <div style={{
          background: "var(--paper)", borderRadius: 10,
          padding: "12px 14px", marginTop: 4, marginBottom: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Sparkles size={13} style={{ color: "var(--gold)" }} />
            <span style={{
              fontSize: 11, fontWeight: 700, color: "var(--ink-soft)",
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              Curiosidades
            </span>
          </div>
          <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            {guide.curiosities.map((c, i) => (
              <li key={i} style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.6 }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {guide.tip && (
        <div style={{
          display: "flex", gap: 8, alignItems: "flex-start",
          background: accent + "0f", borderRadius: 10, padding: "10px 12px",
        }}>
          <Lightbulb size={14} style={{ color: accent, flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
            {guide.tip}
          </p>
        </div>
      )}
    </>
  );
}

/**
 * Tarjeta plegable con la guía detallada de un lugar.
 * - variant="accordion" (default): plegable en el listado del día.
 * - variant="modal": ficha completa sin acordeón, para el modal de Info.
 */
export default function GuideCard({
  id,
  accent = "#1d3557",
  defaultOpen = false,
  variant = "accordion",
}) {
  const [open, setOpen] = useState(defaultOpen || variant === "modal");
  const { guides } = useContent();
  const guide = guides[id];
  const refs = popCulture[id];
  const localImage = guideImages[id] ?? null;
  const { highlightId } = useHighlight();
  const anchorId = slug("guide", id);
  const isHighlighted = highlightId === anchorId;
  const cardRef = useRef(null);
  const isModal = variant === "modal";

  useEffect(() => {
    if (isHighlighted) {
      setOpen(true);
      const t = window.setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => window.clearTimeout(t);
    }
  }, [isHighlighted]);

  if (!guide) return null;

  if (isModal) {
    return (
      <div ref={cardRef}>
        <div className="flex items-start gap-3 mb-4">
          <div
            style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: accent + "18",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <BookOpen size={17} style={{ color: accent }} />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <div style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0, fontFamily: "var(--font-display, inherit)" }}>
                {guide.name}
              </h3>
              <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {guide.jp}
              </span>
              {refs?.length > 0 && (
                <span title="Tiene referencias de Pokémon/Digimon/cine" style={{ fontSize: 13 }}>
                  {refs.some(r => r.franchise === "pokemon") && "⚡"}
                  {refs.some(r => r.franchise === "digimon") && "🔷"}
                  {refs.some(r => r.franchise === "pelicula") && "🎬"}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45, margin: "4px 0 0" }}>
              {guide.founded || guide.tagline}
            </p>
          </div>
        </div>
        <GuideBody guide={guide} refs={refs} localImage={localImage} accent={accent} />
      </div>
    );
  }

  return (
    <div
      id={anchorId}
      ref={cardRef}
      className={"rounded-xl border overflow-hidden" + (isHighlighted ? " search-highlight-pulse" : "")}
      style={{
        scrollMarginTop: "75px",
        borderColor: open ? accent + "44" : "var(--line)",
        background: "var(--paper-raised)",
        transition: "border-color 0.2s",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start gap-3 px-4 py-3 cursor-pointer"
        style={{ background: open ? accent + "0a" : "transparent", transition: "background 0.2s", border: "none" }}
      >
        <div
          style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            background: accent + "18",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: 1,
          }}
        >
          <BookOpen size={15} style={{ color: accent }} />
        </div>

        <div className="flex-1 min-w-0">
          <div style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
              {guide.name}
            </span>
            <span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
              {guide.jp}
            </span>
            {refs?.length > 0 && (
              <span title="Tiene referencias de Pokémon/Digimon/cine" style={{ fontSize: 12 }}>
                {refs.some(r => r.franchise === "pokemon") && "⚡"}
                {refs.some(r => r.franchise === "digimon") && "🔷"}
                {refs.some(r => r.franchise === "pelicula") && "🎬"}
              </span>
            )}
          </div>
          <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 2 }}>
            {open ? guide.founded : guide.tagline}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginTop: 4 }}>
          {!open && (
            <span style={{
              fontSize: 10.5, fontWeight: 700, color: accent,
              letterSpacing: "0.03em", whiteSpace: "nowrap",
            }}>
              Saber más
            </span>
          )}
          <ChevronDown
            size={15}
            style={{
              color: accent,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4" style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
          <GuideBody guide={guide} refs={refs} localImage={localImage} accent={accent} />
        </div>
      )}
    </div>
  );
}
