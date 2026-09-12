import { useState, useRef } from "react";
import { X, Clock } from "lucide-react";

const LONG_PRESS_MS = 500;

/**
 * Bandera de Japón en la cabecera móvil.
 * - Toque rápido: recarga la web entera (equivale a "ir a inicio" +
 *   refrescar, ya que al recargar la app vuelve a su estado por
 *   defecto: itinerario, día de hoy).
 * - Pulsación mantenida (>500ms): en vez de recargar, muestra una
 *   tarjeta con la fecha y hora exactas de este build -- para saber
 *   de un vistazo si la web ya tiene los últimos cambios subidos.
 */
export default function BuildInfoButton() {
  const [showInfo, setShowInfo] = useState(false);
  const pressTimer = useRef(null);
  const longPressFired = useRef(false);

  const buildDate = new Date(typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : Date.now());
  const formatted = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).format(buildDate);

  const startPress = () => {
    longPressFired.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressFired.current = true;
      setShowInfo(true);
    }, LONG_PRESS_MS);
  };

  const endPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    if (!longPressFired.current) {
      // Toque rápido -> recargar la web (vuelve a Itinerario, día de hoy)
      window.location.href = "/";
      window.location.reload();
    }
  };

  const cancelPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
  };

  return (
    <>
      <button
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchCancel={cancelPress}
        aria-label="Ir al inicio (toque) o ver última actualización (mantener pulsado)"
        style={{
          fontSize: 18, lineHeight: 1, padding: 4,
          position: "relative", zIndex: 1,
          background: "transparent", border: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        🇯🇵
      </button>

      {showInfo && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center px-4"
          style={{ paddingTop: "calc(var(--mobile-topbar, 56px) + 10px)", background: "rgba(0,0,0,0.45)" }}
          onClick={() => setShowInfo(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl overflow-hidden shadow-xl"
            style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "var(--shu-darker)" }}>
              <div className="flex items-center gap-2">
                <Clock size={16} color="#fff" />
                <p className="text-[13px] font-bold text-white m-0">Última actualización de la web</p>
              </div>
              <button onClick={() => setShowInfo(false)} style={{ color: "rgba(255,255,255,0.85)" }}>
                <X size={18} />
              </button>
            </div>
            <div className="px-4 py-4 text-center">
              <p className="font-display font-extrabold text-[22px] m-0" style={{ color: "var(--ink)" }}>
                {formatted}
              </p>
              <p className="text-[12px] mt-2 m-0" style={{ color: "var(--ink-soft)" }}>
                Fecha y hora en que se generó esta versión de la web (día, hora, minutos y segundos). Si acabas de pedir un cambio y esta hora es anterior, la web todavía no lo tiene desplegado.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
