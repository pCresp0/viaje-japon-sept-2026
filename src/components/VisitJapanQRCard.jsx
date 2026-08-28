import { useState } from "react";
import { QrCode, Lock, Unlock, Eye, X, CheckCircle2, ShieldCheck, Download } from "lucide-react";

export default function VisitJapanQRCard() {
  const [unlocked, setUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showFullQR, setShowFullQR] = useState(false);

  function handleUnlock(e) {
    e?.preventDefault();
    if (password.trim().toLowerCase() === "cresp0") {
      setUnlocked(true);
      setShowPasswordModal(false);
      setPassword("");
      setError(false);
      setShowFullQR(true);
    } else {
      setError(true);
    }
  }

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all shadow-sm mb-4"
      style={{
        background: "var(--paper-raised)",
        borderColor: "rgba(27, 67, 50, 0.3)",
      }}
    >
      {/* Header Bar */}
      <div
        className="px-4 py-3.5 flex items-center justify-between gap-3 text-white"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <QrCode size={18} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Visit Japan Web
              </span>
              <span className="text-xs text-blue-100 font-semibold hidden sm:inline">
                CRESPO PABLO
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">
              QR Oficial de Inmigración y Declaración de Aduana
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {unlocked ? (
            <button
              type="button"
              onClick={() => setShowFullQR(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-900 shadow-sm active:scale-95 transition-all"
            >
              <Eye size={14} />
              Ver QR
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-sm active:scale-95 transition-all"
            >
              <Lock size={14} />
              Desbloquear QR
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2.5 text-xs" style={{ color: "var(--ink)" }}>
        <p style={{ color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
          Código QR generado en la web oficial de <strong>Visit Japan Web</strong> para agilizar los controles de inmigración y aduanas en el Aeropuerto de Narita. Protegido con contraseña.
        </p>

        {unlocked ? (
          <div className="p-3.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>QR Desbloqueado para CRESPO PABLO</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowFullQR(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 text-white"
              >
                Mostrar en Pantalla Completa
              </button>
              <button
                type="button"
                onClick={() => setUnlocked(false)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
              >
                Bloquear
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1">
            <span style={{ color: "var(--ink-soft)" }}>
              🔒 Requiere contraseña para visualizar
            </span>
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="font-bold underline text-xs text-blue-700 dark:text-blue-400 hover:opacity-80"
            >
              Introducir clave
            </button>
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="rounded-2xl max-w-sm w-full p-6 shadow-2xl border"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Lock size={16} />
                </div>
                <h3 className="font-bold text-sm" style={{ color: "var(--ink)", margin: 0 }}>
                  Acceso a Visit Japan QR
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 rounded-lg hover:bg-black/5"
                style={{ color: "var(--ink-soft)" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>
                  Introduce la contraseña:
                </label>
                <input
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Contraseña"
                  className="w-full px-3 py-2 rounded-xl border text-sm font-semibold outline-none transition-all"
                  style={{
                    background: "var(--paper)",
                    borderColor: error ? "var(--shu)" : "var(--line)",
                    color: "var(--ink)",
                  }}
                />
                {error && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5">
                    Contraseña incorrecta. Inténtalo de nuevo.
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border"
                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
                  style={{ background: "var(--indigo)" }}
                >
                  Desbloquear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen / High Contrast QR Viewer Modal */}
      {showFullQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowFullQR(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl flex flex-col items-center text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowFullQR(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <X size={18} />
            </button>

            <div className="w-full bg-blue-700 text-white py-2 px-3 rounded-xl mb-4 text-xs font-bold tracking-wide uppercase">
              Visit Japan Web · Inmigración y Aduanas
            </div>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              QR Code for Immigration & Customs
            </p>

            {/* QR Image with high contrast white background */}
            <div className="p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-inner mb-4">
              <img
                src="/images/visit-japan-qr.png"
                alt="QR Code Visit Japan Web - CRESPO PABLO"
                className="w-64 h-64 object-contain"
              />
            </div>

            <p className="font-mono text-base font-extrabold text-slate-950 tracking-wider">
              CRESPO PABLO
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Muestra este código directamente en los lectores de inmigración y aduanas de Narita.
            </p>

            <div className="w-full flex gap-2 mt-5">
              <a
                href="/images/visit-japan-qr.png"
                download="Visit_Japan_QR_Crespo_Pablo.png"
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-900 flex items-center justify-center gap-1.5"
              >
                <Download size={14} />
                Descargar PNG
              </a>
              <button
                type="button"
                onClick={() => setShowFullQR(false)}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
