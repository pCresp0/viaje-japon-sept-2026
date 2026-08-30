import { createContext, useContext, useState, useRef, useCallback, useEffect, cloneElement } from "react";

/**
 * Sistema de "resaltado tras búsqueda": cuando el usuario elige un
 * resultado del buscador global, App.jsx llama a triggerHighlight(targetId)
 * con el id del elemento al que hay que llevarle. Cualquier componente de
 * la app puede leer highlightId (vía useHighlight) para:
 *   a) si es un acordeón con estado propio (Historia, Frikadas, GuideCard),
 *      abrirse automáticamente cuando su id coincide;
 *   b) hacer scroll hasta sí mismo y aplicar un pulso visual temporal.
 *
 * El highlight se borra solo a los pocos segundos, así que si el usuario
 * vuelve a buscar algo (aunque sea el mismo sitio) el efecto se repite.
 */

const HighlightContext = createContext(null);

const HIGHLIGHT_DURATION_MS = 2600;

export function HighlightProvider({ children }) {
  const [highlightId, setHighlightId] = useState(null);
  const [highlightOpts, setHighlightOpts] = useState({ block: "center" });
  const timerRef = useRef(null);

  const triggerHighlight = useCallback((id, opts = {}) => {
    window.clearTimeout(timerRef.current);
    if (!id) {
      setHighlightId(null);
      return;
    }
    const nextOpts = { block: opts.block || "center", delay: opts.delay ?? 60 };
    // Forzar un "reset" antes de volver a activar el mismo id, para que
    // si se pulsa el mismo resultado dos veces seguidas el pulso se
    // vuelva a reproducir en vez de quedarse ya "consumido".
    setHighlightId(null);
    requestAnimationFrame(() => {
      setHighlightOpts(nextOpts);
      setHighlightId(id);
      timerRef.current = window.setTimeout(() => setHighlightId(null), HIGHLIGHT_DURATION_MS);
    });
  }, []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return (
    <HighlightContext.Provider value={{ highlightId, highlightOpts, triggerHighlight }}>
      {children}
    </HighlightContext.Provider>
  );
}

export function useHighlight() {
  const ctx = useContext(HighlightContext);
  if (!ctx) throw new Error("useHighlight debe usarse dentro de <HighlightProvider>");
  return ctx;
}

/**
 * Envoltorio genérico para filas/tarjetas SIN estado propio de
 * abrir/cerrar (hoteles, comidas, transporte, mapa, presupuesto, clima,
 * frases, emergencias, pendientes, preparativos...). No añade ningún nodo
 * extra al DOM: clona el hijo para inyectarle id, ref y la clase de pulso,
 * así no rompe layouts de flex/grid existentes.
 *
 * Uso: <Highlightable id={anchorId}><div className="...">...</div></Highlightable>
 */
export function Highlightable({ id, children }) {
  const { highlightId, highlightOpts } = useHighlight();
  const ref = useRef(null);
  const active = highlightId === id;
  const block = highlightOpts?.block || "center";
  const delay = highlightOpts?.delay ?? 60;

  useEffect(() => {
    if (active && ref.current) {
      const t = window.setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block });
      }, delay);
      return () => window.clearTimeout(t);
    }
  }, [active, block, delay]);

  return cloneElement(children, {
    id,
    ref,
    className: [children.props.className, active ? "search-highlight-pulse" : ""]
      .filter(Boolean)
      .join(" "),
    style: {
      ...children.props.style,
      ...(block === "start" ? { scrollMarginTop: 12 } : null),
    },
  });
}
