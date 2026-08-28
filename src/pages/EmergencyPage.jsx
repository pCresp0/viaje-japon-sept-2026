import { useState } from "react";
import {
  Phone,
  MapPin,
  ShieldAlert,
  Building2,
  ShieldCheck,
  Download,
  ExternalLink,
  FileText,
  Users,
  Plane,
  Smartphone,
  ChevronDown,
  ChevronUp,
  X,
  HeartHandshake,
} from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { heymondoInsurance } from "../data/insurance";
import { downloadInsuranceConditions } from "../utils/exportInsurance";

export const emergencyNumbers = [
  { label: "Policía", number: "110", note: "Emergencias con la policía japonesa" },
  { label: "Ambulancia / Bomberos", number: "119", note: "Emergencias médicas o incendios" },
  { label: "Línea de ayuda turística (JNTO)", number: "050-3816-2787", note: "24h, en inglés — para cualquier problema como turista" },
];

export const embassy = {
  name: "Embajada de España en Tokio",
  address: "1-3-29 Roppongi, Minato-ku, Tokio 106-0032",
  phone: "+81 3-3583-8531",
  emergencyPhone: "+81 90-6949-8659",
  note: "Teléfono de emergencia consular las 24h para casos graves (accidente, detención, fallecimiento).",
};

export default function EmergencyPage() {
  const [showAllCoverages, setShowAllCoverages] = useState(false);
  const [modalContent, setModalContent] = useState(null); // 'particular' | 'general' | null

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Por si acaso</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Emergencias y Seguro de Viaje
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
          Póliza contratada con Heymondo, teléfonos de asistencia 24h, embajada y números de emergencia en Japón.
        </p>
      </div>

      {/* 1. SEGURO DE VIAJE HEYMONDO (DESTACADO PRINCIPAL) */}
      <Highlightable id="emergency-insurance">
        <div
          className="rounded-2xl overflow-hidden border mb-8 shadow-sm"
          style={{ borderColor: "rgba(5, 150, 105, 0.3)", background: "var(--paper-raised)" }}
        >
          {/* Cabecera Heymondo */}
          <div
            className="p-5 sm:p-6 text-white"
            style={{
              background: "linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                  style={{ background: "rgba(255, 255, 255, 0.2)" }}
                >
                  <ShieldCheck size={26} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-white/20 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ¡Ya estás asegurad@!
                    </span>
                    <span className="text-xs text-emerald-100 font-medium">
                      Heymondo · Viaje Tranquilidad
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">
                    Póliza Nº {heymondoInsurance.policyNumber}
                  </h3>
                  <p className="text-xs text-emerald-100/90 mt-0.5">
                    Aseguradora: IMA Ibérica Asistencia · 06/09/2026 – 22/09/2026 (Japón)
                  </p>
                </div>
              </div>

              {/* Botón Llamar 24h directo */}
              <div className="shrink-0 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${heymondoInsurance.assistancePhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white text-emerald-900 shadow-md hover:bg-emerald-50 active:scale-95 transition-all"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={16} className="text-emerald-700" />
                  Asistencia 24h: {heymondoInsurance.assistancePhone}
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* 4 Viajeros Asegurados */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-emerald-600 dark:text-emerald-400" />
                <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>
                  Viajeros Asegurados (4 Personas)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {heymondoInsurance.travelers.map((t, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border flex flex-col justify-between"
                    style={{ background: "var(--paper)", borderColor: "var(--line)" }}
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase">Asegurado {i + 1}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {t.name} {t.surnames}
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
                      <span className="text-[11px] text-slate-400">DNI:</span>
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {t.dni}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coberturas Destacadas */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HeartHandshake size={16} className="text-emerald-600 dark:text-emerald-400" />
                  <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>
                    Coberturas de la Póliza
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCoverages(!showAllCoverages)}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
                >
                  {showAllCoverages ? "Ver menos" : "Ver todas las coberturas"}
                  {showAllCoverages ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {(showAllCoverages
                  ? heymondoInsurance.topCoverages
                  : heymondoInsurance.topCoverages.filter((c) => c.highlight)
                ).map((cov, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      cov.highlight ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{cov.label}</p>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-1.5 font-mono">
                      {cov.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AirHelp Plus Incluido */}
            <div className="p-4 rounded-xl border bg-sky-50/60 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Plane size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-sky-950 dark:text-sky-200 flex items-center gap-2">
                    Servicio AirHelp Plus Incluido
                    <span className="text-[10px] bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-300 font-bold px-2 py-0.5 rounded-full">
                      Hasta 600 € / pasajero
                    </span>
                  </h4>
                  <p className="text-xs text-sky-900/80 dark:text-sky-300/80 mt-0.5 leading-relaxed">
                    Reclamación de vuelos ante demoras &gt;3h, cancelaciones o pérdidas de conexión en colaboración con Heymondo.
                  </p>
                </div>
              </div>

              <a
                href={heymondoInsurance.airHelpUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shrink-0 shadow-sm"
                style={{ textDecoration: "none" }}
              >
                Reclamar Vuelo AirHelp ↗
              </a>
            </div>

            {/* App Heymondo & Canales de Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Smartphone size={15} className="text-emerald-600" />
                  App Heymondo (Asistencia 24h)
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Chat médico y videoconsulta 24h, llamada de asistencia gratuita por internet sin coste de roaming y gestión de incidencias.
                </p>
                <div className="flex gap-2 pt-1">
                  <a
                    href={heymondoInsurance.appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white flex items-center gap-1"
                    style={{ textDecoration: "none" }}
                  >
                    🍏 App Store ↗
                  </a>
                  <a
                    href={heymondoInsurance.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white flex items-center gap-1"
                    style={{ textDecoration: "none" }}
                  >
                    🤖 Google Play ↗
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <FileText size={15} className="text-emerald-600" />
                  Gestión de Reembolsos
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Portal online para solicitar reembolsos de gastos médicos o incidencias autorizadas previamente. Teléfono: <strong>+34 91 353 63 24</strong>.
                </p>
                <div className="pt-1">
                  <a
                    href={heymondoInsurance.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 w-fit"
                    style={{ textDecoration: "none" }}
                  >
                    🌐 Portal Siniestros (siniestros.imaiberica.es) ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Botones de Descarga y Visualización de Condiciones */}
            <div className="pt-2 border-t flex flex-wrap gap-2.5" style={{ borderColor: "var(--line)" }}>
              <button
                type="button"
                onClick={() => downloadInsuranceConditions("particular")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
              >
                <Download size={14} />
                Descargar Condiciones Particulares (.txt)
              </button>

              <button
                type="button"
                onClick={() => downloadInsuranceConditions("general")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white shadow-sm transition-all"
              >
                <Download size={14} />
                Descargar Condiciones Generales (.txt)
              </button>

              <button
                type="button"
                onClick={() => setModalContent("particular")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
              >
                <FileText size={14} />
                Ver Condiciones Particulares
              </button>

              <button
                type="button"
                onClick={() => setModalContent("general")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
              >
                <FileText size={14} />
                Ver Condiciones Generales
              </button>
            </div>

          </div>
        </div>
      </Highlightable>

      {/* 2. Números de emergencia en Japón */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert size={16} style={{ color: "var(--shu)" }} />
          <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>Números de emergencia en Japón</p>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {emergencyNumbers.map((e, idx) => (
            <Highlightable key={idx} id={slug("emergency", e.number)}>
              <a
                href={`tel:${e.number}`}
                className="rounded-xl p-4 flex items-center gap-3 transition-all"
                style={{ background: "var(--paper-raised)", border: "1px solid var(--line)", textDecoration: "none" }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = "var(--shu)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = "var(--line)"; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(188,71,73,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Phone size={18} style={{ color: "var(--shu)" }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{e.label}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "var(--shu)", fontFamily: "var(--font-display)" }}>{e.number}</p>
                  <p style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{e.note}</p>
                </div>
              </a>
            </Highlightable>
          ))}
        </div>
      </div>

      {/* 3. Embajada de España */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={16} style={{ color: "var(--indigo)" }} />
          <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>Embajada de España en Tokio</p>
        </div>
        <Highlightable id="emergency-embassy">
          <div className="rounded-2xl p-5" style={{ background: "var(--indigo)", color: "white" }}>
            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-display)" }}>{embassy.name}</p>

            <div className="flex items-start gap-2 mb-3">
              <MapPin size={15} style={{ color: "rgba(255,255,255,0.6)", marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{embassy.address}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a href={`tel:${embassy.phone}`} className="flex-1 rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.08)", textDecoration: "none" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Teléfono general</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginTop: 2 }}>{embassy.phone}</p>
              </a>
              <a href={`tel:${embassy.emergencyPhone}`} className="flex-1 rounded-xl p-3"
                style={{ background: "rgba(188,71,73,0.25)", border: "1px solid rgba(188,71,73,0.5)", textDecoration: "none" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Emergencia 24h</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginTop: 2 }}>{embassy.emergencyPhone}</p>
              </a>
            </div>

            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 12, lineHeight: 1.5 }}>
              {embassy.note}
            </p>
          </div>
        </Highlightable>
      </div>

      {/* Modal de visualización de Condiciones */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-emerald-800 text-white flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <FileText size={20} />
                <h3 className="font-bold text-base">
                  {modalContent === "particular"
                    ? `Condiciones Particulares · Póliza ${heymondoInsurance.policyNumber}`
                    : `Condiciones Generales · Seguro TRANQUILIDAD`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="p-1 rounded-lg text-slate-200 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed flex-1 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
              {modalContent === "particular"
                ? heymondoInsurance.fullParticularConditions
                : heymondoInsurance.fullGeneralConditions}
            </div>

            <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <button
                type="button"
                onClick={() => downloadInsuranceConditions(modalContent)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
              >
                <Download size={14} />
                Descargar como archivo .txt
              </button>

              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
