import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { useLang } from "../i18n";

/**
 * Selector de idioma. Se muestra como la bandera del idioma activo y
 * despliega un menú con las cuatro opciones.
 *
 * El menú va en un portal a <body> y posicionado con coordenadas reales
 * del botón, para que no lo recorte ningún contenedor con overflow ni
 * lo tape la barra superior (que tiene z-index alto).
 */
export default function LanguageSwitcher({ variant = "bar" }) {
  const { lang, setLang, languages, t } = useLang();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const btnRef = useRef(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  function toggle() {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      // Se ancla por la derecha para que no se salga de la pantalla.
      setCoords({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
    setOpen((o) => !o);
  }

  // Cerrar con Escape, además del clic fuera.
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onBar = variant === "bar";

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label={t("common.selectLanguage")}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: onBar ? "5px 9px" : "6px 10px",
          borderRadius: 999,
          background: onBar ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.18)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14, lineHeight: 1 }}>{current.flag}</span>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.04em",
        }}>
          {current.short}
        </span>
      </button>

      {open && coords && createPortal(
        <>
          {/* Capa invisible para cerrar al tocar fuera */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 998 }}
          />
          <div
            role="listbox"
            style={{
              position: "fixed",
              top: coords.top,
              right: coords.right,
              zIndex: 999,
              background: "var(--paper-raised)",
              border: "1px solid var(--line)",
              borderRadius: 12,
              boxShadow: "0 10px 32px rgba(0,0,0,0.22)",
              overflow: "hidden",
              minWidth: 168,
            }}
          >
            {languages.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  role="option"
                  aria-selected={active}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "11px 14px",
                    background: active ? "var(--shu)0f" : "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--line)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 17, lineHeight: 1 }}>{l.flag}</span>
                  <span style={{
                    flex: 1,
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? "var(--shu)" : "var(--ink)",
                  }}>
                    {l.label}
                  </span>
                  {active && <Check size={15} style={{ color: "var(--shu)" }} />}
                </button>
              );
            })}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
