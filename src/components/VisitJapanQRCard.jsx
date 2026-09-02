import { useState } from "react";
import { QrCode, Lock, Unlock, Eye, EyeOff, X, CheckCircle2, ShieldCheck, Download, UserCheck, ChevronRight, ChevronDown } from "lucide-react";
import { sha256Hex } from "../utils/hash";

// passHash = sha256(contraseña en minúsculas) — valores en claro en /memories/repo/secrets.md (fuera del repo).
export const groupMembers = [
  { id: "pablo", name: "Pablo Crespo Bellido", hasQR: true, qrPath: "/images/visit-japan-qr.png", role: "Titular", passHash: "1d8b070e797a48a1b935e9622415c50a4914a19bbcc7a3bffa909fe65c1d07b7" },
  { id: "sergio", name: "Sergio Crespo Bellido", hasQR: true, qrPath: "/images/visit-japan-qr-sergio.png", role: "Titular", passHash: "296fb098929ae462b109e0df2726da063f371ad993a0ebe6dadf18a36fa1583c" },
  { id: "juancarlos", name: "Juan Carlos Rodríguez", hasQR: false, role: "Viajero", passHash: "1d8b070e797a48a1b935e9622415c50a4914a19bbcc7a3bffa909fe65c1d07b7" },
  { id: "gerundio", name: "Randy (Gerundio)", hasQR: false, role: "Viajero", passHash: "1d8b070e797a48a1b935e9622415c50a4914a19bbcc7a3bffa909fe65c1d07b7" },
  { id: "thibaut", name: "Thibaut Fossat", hasQR: true, qrPath: "/images/visit-japan-qr-thibaut.png", role: "Titular", passHash: "97cf94ea5536d9ce870ce055760f81c6b355df478d4566ae3140a4dc1cdec3d5" },
];

export default function VisitJapanQRCard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [step, setStep] = useState("idle"); // 'idle' | 'select_member' | 'enter_password' | 'unlocked'
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showFullQR, setShowFullQR] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function startUnlockFlow() {
    setStep("select_member");
    setError(false);
    setPassword("");
  }

  function handleSelectMember(member) {
    setSelectedMember(member);
    setStep("enter_password");
    setError(false);
    setPassword("");
  }

  async function handlePasswordSubmit(e) {
    e?.preventDefault();
    const inputHash = await sha256Hex(password.trim().toLowerCase());
    if (inputHash === selectedMember?.passHash) {
      setStep("unlocked");
      setError(false);
      setPassword("");
      if (selectedMember?.hasQR) {
        setShowFullQR(true);
      }
    } else {
      setError(true);
    }
  }

  function handleLock() {
    setStep("idle");
    setSelectedMember(null);
    setShowFullQR(false);
    setPassword("");
    setError(false);
  }

  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm mb-4"
      style={{
        background: "var(--paper-raised)",
        borderColor: "var(--line)",
      }}
    >
      {/* Header (Toggle) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-2.5 text-white transition-all hover:brightness-110 focus:outline-none cursor-pointer border-none"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 shadow-sm">
            <QrCode size={17} className="text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] bg-white text-blue-900 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider leading-none">
                Visit Japan Web
              </span>
              <span className="text-xs text-blue-100 font-semibold truncate">
                Inmigración y Aduanas
              </span>
            </div>
            <h3 className="text-[13.5px] sm:text-sm font-bold text-white leading-tight mt-0.5 truncate" style={{ margin: 0 }}>
              Código QR de Llegada a Narita
            </h3>
          </div>
        </div>

        <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} style={{ opacity: 0.85 }} />
      </button>

      {/* Card Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-3">
        <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
          Código QR generado en la web oficial de <strong>Visit Japan Web</strong> para agilizar los controles de inmigración y aduanas en el Aeropuerto de Narita. Selecciona quién eres y desbloquéalo con tu contraseña.
        </p>

        {step === "unlocked" && selectedMember ? (
          <div
            className="p-4 rounded-xl border flex flex-col gap-3"
            style={{ background: "rgba(45, 106, 79, 0.06)", borderColor: "rgba(45, 106, 79, 0.3)" }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} style={{ color: "var(--forest)" }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--forest)", margin: 0 }}>
                  Acceso desbloqueado: {selectedMember.name}
                </p>
                <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>
                  {selectedMember.hasQR
                    ? "QR oficial cargado y listo para escanear en los tornos."
                    : "Código QR individual pendiente de asociar."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {selectedMember.hasQR ? (
                <button
                  type="button"
                  onClick={() => setShowFullQR(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
                  style={{ background: "var(--forest)" }}
                >
                  Mostrar QR en Pantalla Completa 📱
                </button>
              ) : (
                <span className="text-xs text-slate-700 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-300 flex items-center">
                  QR de este viajero no cargado aún
                </span>
              )}

              <button
                type="button"
                onClick={handleLock}
                className="px-3 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
              >
                Cambiar de persona / Bloquear 🔒
              </button>
            </div>
          </div>
        ) : (
          <div
            className="px-3.5 py-2 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
            style={{ background: "var(--paper)", borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-2">
              <Lock size={15} style={{ color: "var(--indigo)" }} />
              <span style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 500 }}>
                Protegido por contraseña para cada miembro del grupo
              </span>
            </div>

            <button
              type="button"
              onClick={startUnlockFlow}
              className="text-xs font-bold px-3 py-1.5 rounded-lg text-white shadow-sm w-fit"
              style={{ background: "var(--indigo)" }}
            >
              Seleccionar viajero y ver QR ↗
            </button>
          </div>
        )}

        {/* Web Oficial Visit Japan Web */}
        <div
          className="px-3 py-2 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
          style={{ background: "rgba(30, 58, 138, 0.04)", borderColor: "rgba(30, 58, 138, 0.15)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🌐</span>
            <span style={{ color: "var(--ink-soft)" }}>
              También puedes ver o generar tu QR directamente en la web oficial del Gobierno de Japón:
            </span>
          </div>
          <a
            href="https://www.vjw.digital.go.jp/"
            target="_blank"
            rel="noreferrer"
            className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 shrink-0 w-fit"
            style={{
              background: "var(--paper-raised)",
              borderColor: "var(--line)",
              color: "var(--indigo)",
              textDecoration: "none",
            }}
          >
            vjw.digital.go.jp ↗
          </a>
        </div>
      </div>
      )}

      {/* Modal Paso 1: Elegir quién eres de los 5 */}
      {step === "select_member" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setStep("idle")}
        >
          <div
            className="rounded-2xl max-w-md w-full p-6 shadow-2xl border"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "var(--indigo)" }}
                >
                  <UserCheck size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: "var(--ink)", margin: 0 }}>
                    ¿Quién eres?
                  </h3>
                  <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>
                    Selecciona tu nombre para abrir tu QR de Visit Japan
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep("idle")}
                className="p-1.5 rounded-lg hover:bg-black/5"
                style={{ color: "var(--ink-soft)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 my-4">
              {groupMembers.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMember(m)}
                  className="w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all hover:scale-[1.01]"
                  style={{
                    background: "var(--paper)",
                    borderColor: "var(--line)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: m.hasQR ? "rgba(45, 106, 79, 0.15)" : "rgba(0,0,0,0.06)",
                        color: m.hasQR ? "var(--forest)" : "var(--ink-soft)",
                      }}
                    >
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                        {m.name}
                      </p>
                      <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>
                        {m.hasQR ? "🟢 QR oficial disponible" : "⚪ Pendiente de asociar QR"}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={16} style={{ color: "var(--ink-soft)" }} />
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep("idle")}
                className="px-4 py-2 rounded-xl text-xs font-semibold border"
                style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Paso 2: Introducir Contraseña */}
      {step === "enter_password" && selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setStep("idle")}
        >
          <div
            className="rounded-2xl max-w-sm w-full p-6 shadow-2xl border"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ background: "var(--indigo)" }}
                >
                  <Lock size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "var(--ink)", margin: 0 }}>
                    Clave de Acceso
                  </h3>
                  <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>
                    {selectedMember.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep("idle")}
                className="p-1 rounded-lg hover:bg-black/5"
                style={{ color: "var(--ink-soft)" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>
                  Introduce la contraseña para desbloquear:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Contraseña"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm font-semibold outline-none transition-all"
                    style={{
                      background: "var(--paper)",
                      borderColor: error ? "var(--shu)" : "var(--line)",
                      color: "var(--ink)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    style={{ padding: 4 }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5">
                    Contraseña incorrecta. Inténtalo de nuevo.
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("select_member")}
                  className="text-xs font-semibold underline"
                  style={{ color: "var(--ink-soft)" }}
                >
                  ← Cambiar persona
                </button>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
                    style={{ background: "var(--indigo)" }}
                  >
                    Desbloquear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pantalla Completa QR */}
      {showFullQR && selectedMember && (
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

            {/* QR Image con fondo blanco puro y alto contraste para escáneres */}
            <div className="p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-inner mb-4">
              <img
                src={selectedMember.qrPath || "/images/visit-japan-qr.png"}
                alt={`QR Code Visit Japan Web - ${selectedMember.name}`}
                className="w-64 h-64 object-contain"
              />
            </div>

            <p className="font-mono text-base font-extrabold text-slate-950 tracking-wider">
              {selectedMember.name.toUpperCase()}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Muestra este código directamente en los lectores de inmigración y aduanas de Narita.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-2 mt-4">
              <a
                href={selectedMember.qrPath || "/images/visit-japan-qr.png"}
                download={`Visit_Japan_QR_${selectedMember.name.replace(/\s+/g, "_")}.png`}
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

            <div className="mt-3 pt-2.5 border-t border-slate-100 w-full">
              <a
                href="https://www.vjw.digital.go.jp/"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1"
              >
                🌐 Web oficial del Gobierno: vjw.digital.go.jp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
