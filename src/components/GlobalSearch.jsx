import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { searchGlobal } from "../data/searchIndex";
import { useLang } from "../i18n/LanguageContext";

/**
 * Buscador global. Icono al lado del idioma; al abrir, panel con input
 * y resultados a partir de 3 caracteres. El índice y los textos de la
 * interfaz siguen el idioma activo de la app (useLang).
 *
 * variant:
 *  - "bar"     → móvil (lupa + texto corto)
 *  - "desktop" → cabecera PC (lupa + «Buscar»)
 */
export default function GlobalSearch({ onNavigate, variant = "bar" }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const btnRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const isDesktop = variant === "desktop";

  const shortCode = /^(jr|ic|qr)$/i.test(query.trim());
  const minChars = shortCode ? 2 : 3;
  const results = searchGlobal(query, { minChars, lang });

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
    setActiveIndex(-1);
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

  // El índice activo se resetea cada vez que cambian los resultados,
  // para no dejar seleccionada una fila que ya no existe.
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const row = listRef.current.querySelector(`[data-result-index="${activeIndex}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function selectResult(item) {
    onNavigate?.({ tab: item.tab, day: item.day, targetId: item.targetId });
    closePanel();
  }

  function onInputKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = activeIndex >= 0 ? results[activeIndex] : results[0];
      if (target) selectResult(target);
    }
  }

  const trimmed = query.trim();
  const showHint = trimmed.length > 0 && trimmed.length < minChars;
  const showEmpty = trimmed.length >= minChars && results.length === 0;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
        aria-label={t("search.ariaLabel")}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isDesktop ? 8 : 5,
          padding: isDesktop ? "9px 18px" : "6px 11px",
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
        <Search size={isDesktop ? 20 : 16} strokeWidth={2.5} />
        <span style={{
          fontSize: isDesktop ? 15 : 12,
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}>
          {t("search.button")}
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
            aria-label={t("search.dialogLabel")}
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
                onKeyDown={onInputKeyDown}
                placeholder={t("search.placeholder")}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
                aria-autocomplete="list"
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
                  aria-label={t("search.clear")}
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

            <div ref={listRef} role="listbox" style={{ maxHeight: "min(52vh, 360px)", overflowY: "auto" }}>
              {!trimmed && (
                <p style={{
                  margin: 0,
                  padding: "14px 14px 16px",
                  fontSize: 12.5,
                  color: "var(--ink-soft)",
                  lineHeight: 1.45,
                }}>
                  {t("search.hintDefault")}
                </p>
              )}

              {showHint && (
                <p style={{
                  margin: 0,
                  padding: "14px",
                  fontSize: 12.5,
                  color: "var(--ink-soft)",
                }}>
                  {t("search.hintMore", { count: minChars - trimmed.length })}
                </p>
              )}

              {showEmpty && (
                <p style={{
                  margin: 0,
                  padding: "14px",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                }}>
                  {t("search.empty", { query: trimmed })}
                </p>
              )}

              {results.map((item, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    id={`${listId}-opt-${index}`}
                    data-result-index={index}
                    role="option"
                    aria-selected={active}
                    type="button"
                    onClick={() => selectResult(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "11px 14px",
                      textAlign: "left",
                      background: active ? "var(--paper)" : "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--line)",
                      borderLeft: active ? "3px solid var(--shu)" : "3px solid transparent",
                      cursor: "pointer",
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
                      {item.day != null ? ` · ${t("search.day", { day: item.day })}` : ""}
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
                );
              })}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
