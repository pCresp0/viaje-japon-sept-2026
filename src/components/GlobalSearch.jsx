import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { searchGlobal } from "../data/searchIndex";

/**
 * Buscador global (contenido en español). Icono al lado del idioma;
 * al abrir, panel con input y resultados a partir de 3 caracteres.
 *
 * variant:
 *  - "bar"     → móvil (lupa + texto corto)
 *  - "desktop" → cabecera PC (lupa + «Buscar»)
 */
export default function GlobalSearch({ onNavigate, variant = "bar" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState(null);
  const btnRef = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();
  const isDesktop = variant === "desktop";

  const results = searchGlobal(query);

  function openPanel() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const panelW = Math.min(340, window.innerWidth - 24);
      let right = window.innerWidth - r.right;
      // Evitar que se salga por la izquierda en móvil
      if (window.innerWidth - right - panelW < 12) {
        right = Math.max(12, window.innerWidth - panelW - 12);
      }
      setCoords({ top: r.bottom + 8, right, width: panelW });
    }
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    setQuery("");
  }

  useEffect(() => {
    if (!open) return;
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    function onKey(e) {
      if (e.key === "Escape") closePanel();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function selectResult(item) {
    onNavigate?.({ tab: item.tab, day: item.day });
    closePanel();
  }

  const showHint = query.trim().length > 0 && query.trim().length < 3;
  const showEmpty = query.trim().length >= 3 && results.length === 0;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-label="Buscar"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isDesktop ? 7 : 5,
          padding: isDesktop ? "7px 14px" : "6px 11px",
          borderRadius: 999,
          background: open
            ? "rgba(255,255,255,0.24)"
            : "rgba(255,255,255,0.16)",
          border: "1px solid rgba(255,255,255,0.28)",
          cursor: "pointer",
          flexShrink: 0,
          color: "#fff",
        }}
      >
        <Search size={isDesktop ? 17 : 16} strokeWidth={2.5} />
        <span style={{
          fontSize: isDesktop ? 13 : 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}>
          Buscar
        </span>
      </button>

      {open && coords && createPortal(
        <>
          <div
            onClick={closePanel}
            style={{ position: "fixed", inset: 0, zIndex: 998 }}
          />
          <div
            id={listId}
            role="dialog"
            aria-label="Buscador"
            style={{
              position: "fixed",
              top: coords.top,
              right: coords.right,
              width: coords.width,
              zIndex: 999,
              background: "var(--paper-raised)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderBottom: "1px solid var(--line)",
            }}>
              <Search size={16} style={{ color: "var(--ink-soft)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar vuelo, hotel, ciudad…"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 14.5,
                  color: "var(--ink)",
                  minWidth: 0,
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Borrar"
                  style={{
                    padding: 4,
                    color: "var(--ink-soft)",
                    display: "flex",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div style={{ maxHeight: "min(52vh, 360px)", overflowY: "auto" }}>
              {!query.trim() && (
                <p style={{
                  margin: 0,
                  padding: "14px 14px 16px",
                  fontSize: 12.5,
                  color: "var(--ink-soft)",
                  lineHeight: 1.45,
                }}>
                  Escribe al menos 3 caracteres. Vuelos, hoteles, códigos, ciudades, comidas…
                </p>
              )}

              {showHint && (
                <p style={{
                  margin: 0,
                  padding: "14px",
                  fontSize: 12.5,
                  color: "var(--ink-soft)",
                }}>
                  Sigue escribiendo… ({3 - query.trim().length} más)
                </p>
              )}

              {showEmpty && (
                <p style={{
                  margin: 0,
                  padding: "14px",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                }}>
                  Sin resultados para «{query.trim()}»
                </p>
              )}

              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectResult(item)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "11px 14px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--line)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--paper)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{
                    display: "block",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--shu)",
                    marginBottom: 3,
                  }}>
                    {item.category}
                    {item.day != null ? ` · Día ${item.day}` : ""}
                  </span>
                  <span style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.25,
                  }}>
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span style={{
                      display: "block",
                      fontSize: 12,
                      color: "var(--ink-soft)",
                      marginTop: 2,
                      lineHeight: 1.35,
                    }}>
                      {item.subtitle}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
