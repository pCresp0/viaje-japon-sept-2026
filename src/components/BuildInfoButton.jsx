import { useState, useRef } from "react";
import { X, Clock } from "lucide-react";
import changelogRaw from "../../CHANGELOG_AUTO.md?raw";

const LONG_PRESS_MS = 500;

/**
 * Bandera de Japón centrada en la cabecera móvil.
 * - Toque rápido: recarga la web entera (equivale a "ir a inicio" +
 *   refrescar, ya que al recargar la app vuelve a su estado por
 *   defecto: itinerario, día de hoy).
 * - Pulsación mantenida (>500ms): muestra, con el fondo difuminado
 *   (igual que el buscador), una tarjeta con el registro completo de
 *   cambios subidos a main -- generado solo por la GitHub Action en
 *   cada push, sin importar el entorno usado para subirlo.
 */
export default function BuildInfoButton() {
  const [showInfo, setShowInfo] = useState(false);
  const pressTimer = useRef(null);
  const longPressFired = useRef(false);

  const buildDate = new Date(typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : Date.now());
  const formattedBuild = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
  }).format(buildDate);

  // Extraer solo las líneas de viñeta ("- **...**") del changelog, más
  // recientes primero (el archivo las añade en orden cronológico).
  const changelogEntries = changelogRaw
    .split("\n")
    .filter((line) => line.trim().startsWith("- "))
    .reverse();

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
        aria-label="Ir al inicio (toque) o ver registro de cambios (mantener pulsado)"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 28, lineHeight: 1, padding: 6,
          zIndex: 1,
          background: "transparent", border: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        🇯🇵
      </button>

      {showInfo && (
        <div
          className="fixed inset-0 z-[998] flex items-start justify-center px-3"
          style={{
            paddingTop: "calc(var(--mobile-topbar, 56px) + 10px)",
            backgroundColor: "rgba(20, 25, 35, 0.28)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            animation: "fadeIn 0.15s ease-out",
          }}
          onClick={() => setShowInfo(false)}
        >
          <div
            className="w-full rounded-2xl overflow-hidden shadow-xl flex flex-col"
            style={{
              background: "var(--paper-raised)", border: "1px solid var(--line)",
              maxWidth: 480, maxHeight: "78vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: "var(--shu-darker)" }}>
              <div className="flex items-center gap-2">
                <Clock size={16} color="#fff" />
                <p className="text-[13px] font-bold text-white m-0">Registro de cambios de la web</p>
              </div>
              <button onClick={() => setShowInfo(false)} style={{ color: "rgba(255,255,255,0.85)" }}>
                <X size={18} />
              </button>
            </div>

            <div className="px-4 py-3 shrink-0" style={{ borderBottom: "1px solid var(--line)" }}>
              <p className="text-[11px] m-0" style={{ color: "var(--ink-soft)" }}>Última versión desplegada:</p>
              <p className="font-display font-extrabold text-[18px] m-0" style={{ color: "var(--ink)" }}>
                {formattedBuild}
              </p>
            </div>

            <div className="overflow-y-auto px-4 py-3">
              {changelogEntries.length > 0 ? (
                <ul className="space-y-2 list-none m-0 p-0">
                  {changelogEntries.map((entry, i) => (
                    <li key={i} className="text-[12.5px] leading-snug" style={{ color: "var(--ink)" }}>
                      {entry.replace(/^- /, "").replace(/\*\*/g, "")}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12.5px] m-0" style={{ color: "var(--ink-soft)" }}>
                  Todavía no hay entradas registradas -- se irán añadiendo solas en cada push a main.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
