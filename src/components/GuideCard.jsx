import { useState, useEffect } from "react";
import { BookOpen, ChevronDown, Lightbulb, Sparkles } from "lucide-react";
import { guides } from "../data/guides";
import { fetchWikiImage } from "../utils/wikiImage";

/**
 * Tarjeta plegable con la guía detallada de un lugar.
 * Por defecto está cerrada: sólo muestra el nombre y una línea de resumen,
 * para no convertir cada día en un muro de texto.
 */
export default function GuideCard({ id, accent = "#1d3557" }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imgState, setImgState] = useState("idle"); // idle | loading | done
  const guide = guides[id];

  // La imagen se pide sólo la primera vez que se abre la tarjeta, para no
  // lanzar 19 peticiones al cargar la página.
  useEffect(() => {
    if (!open || !guide?.wiki || imgState !== "idle") return;
    let cancelled = false;
    setImgState("loading");
    fetchWikiImage(guide.wiki).then((result) => {
      if (cancelled) return;
      setImage(result);
      setImgState("done");
    });
    return () => { cancelled = true; };
  }, [open, guide, imgState]);

  if (!guide) return null;

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        borderColor: open ? accent + "44" : "var(--line)",
        background: "var(--paper-raised)",
        transition: "border-color 0.2s",
      }}
    >
      {/* Cabecera pulsable */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start gap-3 px-4 py-3"
        style={{ background: open ? accent + "0a" : "transparent", transition: "background 0.2s" }}
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

      {/* Contenido desplegado */}
      {open && (
        <div className="px-4 pb-4" style={{ borderTop: "1px solid var(--line)", paddingTop: 14 }}>
          {/* Foto del lugar (Wikipedia, licencia libre) */}
          {imgState === "loading" && (
            <div style={{
              width: "100%", aspectRatio: "16 / 10", borderRadius: 10,
              background: "var(--paper)", marginBottom: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Cargando foto…</span>
            </div>
          )}

          {imgState === "done" && image && (
            <figure style={{ margin: "0 0 14px" }}>
              <img
                src={image.src}
                alt={guide.name}
                loading="lazy"
                style={{
                  width: "100%", aspectRatio: "16 / 10", objectFit: "cover",
                  borderRadius: 10, display: "block",
                  background: "var(--paper)",
                }}
                onError={() => setImage(null)}
              />
              <figcaption style={{
                fontSize: 10.5, color: "var(--ink-soft)", marginTop: 5,
                display: "flex", justifyContent: "flex-end",
              }}>
                <a
                  href={image.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--ink-soft)", textDecoration: "none" }}
                >
                  Foto: Wikimedia Commons ↗
                </a>
              </figcaption>
            </figure>
          )}

          {/* Ni petición en curso ni imagen: no se encontró foto o falló
              la conexión. Se omite en silencio, sin dejar un hueco raro
              ni un "cargando" perpetuo. */}

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
              <p style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.6 }}>
                {guide.tip}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
