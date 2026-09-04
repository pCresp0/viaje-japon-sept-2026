import { useState, useRef, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Search, X, Calendar, Hotel, Train, Utensils, MapPin, Plane, AlertCircle, Clock, Star, LayoutGrid } from "lucide-react";
import { searchGlobal, QUICK_SUGGESTIONS } from "../data/searchIndex";
import { useLang } from "../i18n/LanguageContext";

/**
 * Buscador global. Icono al lado del idioma; al abrir, panel con input,
 * chips de sugerencias rápidas y resultados a partir de 3 caracteres.
 *
 * variant:
 *  - "bar"     → móvil (lupa + texto corto)
 *  - "desktop" → cabecera PC (lupa + «Buscar»)
 */

// Color e icono por categoría de resultado
const CATEGORY_META = {
  "Apartados":    { color: "#1d3557", bg: "rgba(29,53,87,0.12)",   icon: LayoutGrid },
  "Itinerario":   { color: "#1d3557", bg: "rgba(29,53,87,0.1)",   icon: Calendar },
  "Hoteles":      { color: "#2e7d5b", bg: "rgba(46,125,91,0.1)",  icon: Hotel },
  "Transportes":  { color: "#bc4749", bg: "rgba(188,71,73,0.1)",  icon: Train },
  "Vuelos":       { color: "#7a2c2e", bg: "rgba(122,44,46,0.1)",  icon: Plane },
  "Comidas":      { color: "#c9a227", bg: "rgba(201,162,39,0.1)", icon: Utensils },
  "Lugares":      { color: "#5a6070", bg: "rgba(90,96,112,0.1)",  icon: MapPin },
  "Pendientes":   { color: "#bc4749", bg: "rgba(188,71,73,0.1)",  icon: AlertCircle },
  "Clima":        { color: "#1d6fa8", bg: "rgba(29,111,168,0.1)", icon: Clock },
  "Mapa":         { color: "#2e7d5b", bg: "rgba(46,125,91,0.1)",  icon: MapPin },
  "Frases":       { color: "#7a4a00", bg: "rgba(122,74,0,0.1)",   icon: Star },
  "Frikadas":     { color: "#6b21a8", bg: "rgba(107,33,168,0.1)", icon: Star },
  "Historia":     { color: "#5a6070", bg: "rgba(90,96,112,0.1)",  icon: Star },
  "Preparativos": { color: "#2e7d5b", bg: "rgba(46,125,91,0.1)",  icon: Star },
  "Emergencias":  { color: "#bc4749", bg: "rgba(188,71,73,0.1)",  icon: AlertCircle },
  "Presupuesto":  { color: "#c9a227", bg: "rgba(201,162,39,0.1)", icon: Star },
  "Herramientas": { color: "#1d3557", bg: "rgba(29,53,87,0.1)",   icon: Star },
};

/** Resalta la query dentro de un texto */
function HighlightMatch({ text, query }) {
  if (!text || !query || query.length < 2) return <>{text}</>;
  const qi = text.toLowerCase().indexOf(query.toLowerCase());
  if (qi === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, qi)}
      <mark style={{ background: "rgba(188,71,73,0.18)", color: "var(--shu)", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(qi, qi + query.length)}
      </mark>
      {text.slice(qi + query.length)}
    </>
  );
}

export default function GlobalSearch({ onNavigate, variant = "bar" }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const btnRef = useRef(null);
  const inputRef = useRef(null);
  const hasFocusedRef = useRef(false);
  const listRef = useRef(null);
  const listId = useId();
  const isDesktop = variant === "desktop";

  const shortCode = /^(jr|ic|qr)$/i.test(query.trim());
  const minChars = shortCode ? 2 : 3;
  const results = searchGlobal(query, { minChars, lang });

  function openPanel() {
    hasFocusedRef.current = false;
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const panelW = Math.min(380, window.innerWidth - 24);
      let right = window.innerWidth - r.right;
      if (window.innerWidth - right - panelW < 12) {
        right = Math.max(12, window.innerWidth - panelW - 12);
      }
      setCoords({ top: r.bottom + 8, right, width: panelW });
    }
    setOpen(true);
  }

  function closePanel() {
    hasFocusedRef.current = false;
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }

  useEffect(() => {
    if (!open) return;
    // Foco inmediato y de respaldo (para que en móviles y escritorio se coloque el cursor de inmediato)
    inputRef.current?.focus({ preventScroll: true });
    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, 40);
    function onKey(e) {
      if (e.key === "Escape") closePanel();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
  const showChips = !trimmed;
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
          background: open ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.16)",
          border: "1px solid rgba(255,255,255,0.28)",
          cursor: "pointer",
          flexShrink: 0,
          color: "#fff",
        }}
      >
        <Search size={isDesktop ? 20 : 16} strokeWidth={2.5} />
        <span style={{ fontSize: isDesktop ? 15 : 12, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1 }}>
          {t("search.button")}
        </span>
      </button>

      {open && coords && createPortal(
        <>
          <div onClick={closePanel} style={{ position: "fixed", inset: 0, zIndex: 998 }} />
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
              borderRadius: 16,
              boxShadow: "0 16px 48px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)",
              overflow: "hidden",
            }}
          >
            {/* Input */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 13px", borderBottom: "1px solid var(--line)" }}>
              <Search size={17} style={{ color: "var(--shu)", flexShrink: 0 }} />
              <input
                ref={(node) => {
                  inputRef.current = node;
                  if (node && !hasFocusedRef.current) {
                    hasFocusedRef.current = true;
                    try {
                      node.focus({ preventScroll: true });
                    } catch {
                      /* fallback handled by effect */
                    }
                  }
                }}
                autoFocus
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
                  fontSize: 16,
                  color: "var(--ink)",
                  minWidth: 0,
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus({ preventScroll: true });
                  }}
                  aria-label={t("search.clear")}
                  style={{ padding: 4, color: "var(--ink-soft)", display: "flex", background: "transparent", border: "none", cursor: "pointer", borderRadius: 6 }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div ref={listRef} role="listbox" style={{ maxHeight: "min(62vh, 440px)", overflowY: "auto" }}>

              {/* Chips de sugerencias rápidas — sólo en panel vacío */}
              {showChips && (
                <div style={{ padding: "12px 13px 10px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                    Búsquedas frecuentes
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {QUICK_SUGGESTIONS.map((s) => (
                      <button
                        key={s.query}
                        type="button"
                        onClick={() => {
                          setQuery(s.query);
                          inputRef.current?.focus({ preventScroll: true });
                        }}
                        style={{
                          padding: "5px 11px",
                          borderRadius: 999,
                          border: "1px solid var(--line)",
                          background: "var(--paper)",
                          color: "var(--ink)",
                          fontSize: 12.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--line)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--paper)"; }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <p style={{ margin: "10px 0 2px", fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                    {t("search.hintDefault")}
                  </p>
                </div>
              )}

              {/* Faltan caracteres */}
              {showHint && (
                <p style={{ margin: 0, padding: "13px 14px", fontSize: 12.5, color: "var(--ink-soft)" }}>
                  {t("search.hintMore", { count: minChars - trimmed.length })}
                </p>
              )}

              {/* Sin resultados */}
              {showEmpty && (
                <div style={{ padding: "20px 14px", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>
                    {t("search.empty", { query: trimmed })}
                  </p>
                  <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--ink-soft)" }}>
                    Prueba con otra palabra o un término más corto
                  </p>
                </div>
              )}

              {/* Resultados */}
              {results.length > 0 && (
                <>
                  <div style={{
                    padding: "7px 13px 5px",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    borderBottom: "1px solid var(--line)",
                  }}>
                    {results.length} resultado{results.length !== 1 ? "s" : ""}
                  </div>
                  {results.map((item, index) => {
                    const active = index === activeIndex;
                    const meta = CATEGORY_META[item.category] || { color: "var(--ink-soft)", bg: "rgba(90,96,112,0.1)", icon: Star };
                    const Icon = meta.icon;
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
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          width: "100%",
                          padding: "10px 13px",
                          textAlign: "left",
                          background: active ? "var(--paper)" : "transparent",
                          border: "none",
                          borderBottom: "1px solid var(--line)",
                          borderLeft: active ? "3px solid var(--shu)" : "3px solid transparent",
                          cursor: "pointer",
                        }}
                      >
                        {/* Icono categoría */}
                        <div style={{
                          flexShrink: 0,
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: meta.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 1,
                        }}>
                          <Icon size={14} style={{ color: meta.color }} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Categoría + día */}
                          <span style={{
                            display: "block",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: meta.color,
                            marginBottom: 2,
                          }}>
                            {item.category}
                            {item.day != null ? ` · ${t("search.day", { day: item.day })}` : ""}
                          </span>
                          {/* Título con match resaltado */}
                          <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>
                            <HighlightMatch text={item.title} query={trimmed} />
                          </span>
                          {/* Subtitle */}
                          {item.subtitle && (
                            <span style={{
                              display: "block",
                              fontSize: 11.5,
                              color: "var(--ink-soft)",
                              marginTop: 2,
                              lineHeight: 1.35,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}>
                              {item.subtitle}
                            </span>
                          )}
                        </div>

                        {/* Flecha indicador */}
                        <span style={{
                          flexShrink: 0,
                          fontSize: 18,
                          color: active ? "var(--shu)" : "var(--line)",
                          alignSelf: "center",
                          transition: "color 0.1s",
                          lineHeight: 1,
                        }}>›</span>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
