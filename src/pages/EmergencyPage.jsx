import { useState } from "react";
import {
  Phone,
  MapPin,
  ShieldAlert,
  Building2,
  ShieldCheck,
  Download,
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
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
        >
          {/* Cabecera Heymondo */}
          <div
            className="p-5 sm:p-6 text-white"
            style={{
              background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 60%, #40916c 100%)",
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
                    <span className="bg-emerald-300 text-emerald-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      ¡Ya estás asegurad@!
                    </span>
                    <span className="text-xs text-emerald-100 font-medium">
                      Heymondo · Viaje Tranquilidad
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight text-white font-display">
                    Póliza Nº {heymondoInsurance.policyNumber}
                  </h3>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    Aseguradora: IMA Ibérica Asistencia · 06/09/2026 – 22/09/2026 (Japón)
                  </p>
                </div>
              </div>

              {/* Botón Llamar 24h directo */}
              <div className="shrink-0 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${heymondoInsurance.assistancePhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-white text-emerald-950 shadow-md hover:bg-emerald-50 active:scale-95 transition-all"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={16} className="text-emerald-800" />
                  Asistencia 24h: {heymondoInsurance.assistancePhone}
                </a>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* 4 Viajeros Asegurados */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} style={{ color: "var(--forest)" }} />
                <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>
                  Viajeros Asegurados (4 Personas)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {heymondoInsurance.travelers.map((t, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border flex flex-col justify-between"
                    style={{ background: "var(--paper)", borderColor: "var(--line)" }}
                  >
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                        Asegurado {i + 1}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginTop: 4, marginBottom: 0 }}>
                        {t.name} {t.surnames}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
                      <span style={{ fontSize: 11, color: "var(--ink-soft)", fontWeight: 600 }}>DNI:</span>
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                        style={{
                          background: "rgba(45, 106, 79, 0.08)",
                          borderColor: "rgba(45, 106, 79, 0.25)",
                          color: "var(--forest)",
                        }}
                      >
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
                  <HeartHandshake size={16} style={{ color: "var(--forest)" }} />
                  <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>
                    Coberturas de la Póliza
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCoverages(!showAllCoverages)}
                  className="text-xs font-bold flex items-center gap-1 hover:underline"
                  style={{ color: "var(--forest)" }}
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
                    className="p-3.5 rounded-xl border flex flex-col justify-between"
                    style={{
                      background: cov.highlight ? "rgba(45, 106, 79, 0.05)" : "var(--paper)",
                      borderColor: cov.highlight ? "rgba(45, 106, 79, 0.25)" : "var(--line)",
                    }}
                  >
                    <p style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                      {cov.label}
                    </p>
                    <p
                      className="font-display"
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: cov.highlight ? "var(--forest)" : "var(--indigo)",
                        marginTop: 6,
                        marginBottom: 0,
                      }}
                    >
                      {cov.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AirHelp Plus Incluido */}
            <div
              className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              style={{ background: "rgba(29, 53, 87, 0.05)", borderColor: "rgba(29, 53, 87, 0.2)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  style={{ background: "var(--indigo)" }}
                >
                  <Plane size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "var(--indigo)", margin: 0 }}>
                      Servicio AirHelp Plus Incluido
                    </h4>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(29, 53, 87, 0.12)", color: "var(--indigo)" }}
                    >
                      Hasta 600 € / pasajero
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2, marginBottom: 0, lineHeight: 1.5 }}>
                    Reclamación de vuelos ante demoras &gt;3h, cancelaciones o pérdidas de conexión en colaboración con Heymondo.
                  </p>
                </div>
              </div>

              <a
                href={heymondoInsurance.airHelpUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0 shadow-sm"
                style={{ background: "var(--indigo)", textDecoration: "none" }}
              >
                Reclamar Vuelo AirHelp ↗
              </a>
            </div>

            {/* App Heymondo & Canales de Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div
                className="p-4 rounded-xl border space-y-2"
                style={{ background: "var(--paper)", borderColor: "var(--line)" }}
              >
                <h5 style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }} className="flex items-center gap-1.5">
                  <Smartphone size={15} style={{ color: "var(--forest)" }} />
                  App Heymondo (Asistencia 24h)
                </h5>
                <p style={{ fontSize: 12, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>
                  Chat médico y videoconsulta 24h, llamada de asistencia gratuita por internet sin coste de roaming y gestión de incidencias.
                </p>
                <div className="flex gap-2 pt-1">
                  <a
                    href={heymondoInsurance.appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1"
                    style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)", textDecoration: "none" }}
                  >
                    🍏 App Store ↗
                  </a>
                  <a
                    href={heymondoInsurance.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1"
                    style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)", textDecoration: "none" }}
                  >
                    🤖 Google Play ↗
                  </a>
                </div>
              </div>

              <div
                className="p-4 rounded-xl border space-y-2"
                style={{ background: "var(--paper)", borderColor: "var(--line)" }}
              >
                <h5 style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }} className="flex items-center gap-1.5">
                  <FileText size={15} style={{ color: "var(--forest)" }} />
                  Gestión de Reembolsos
                </h5>
                <p style={{ fontSize: 12, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>
                  Portal online para solicitar reembolsos de gastos médicos o incidencias autorizadas previamente. Teléfono: <strong style={{ color: "var(--ink)" }}>+34 91 353 63 24</strong>.
                </p>
                <div className="pt-1">
                  <a
                    href={heymondoInsurance.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 w-fit"
                    style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--forest)", textDecoration: "none" }}
                  >
                    🌐 siniestros.imaiberica.es ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Botones de Descarga y Visualización de Condiciones */}
            <div className="pt-3 border-t flex flex-wrap gap-2.5" style={{ borderColor: "var(--line)" }}>
              <button
                type="button"
                onClick={() => downloadInsuranceConditions("particular")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
                style={{ background: "var(--forest)" }}
              >
                <Download size={14} />
                Descargar Condiciones Particulares (.txt)
              </button>

              <button
                type="button"
                onClick={() => downloadInsuranceConditions("general")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
                style={{ background: "var(--indigo)" }}
              >
                <Download size={14} />
                Descargar Condiciones Generales (.txt)
              </button>

              <button
                type="button"
                onClick={() => setModalContent("particular")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
              >
                <FileText size={14} />
                Ver Condiciones Particulares
              </button>

              <button
                type="button"
                onClick={() => setModalContent("general")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all"
                style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--ink)" }}
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
            className="rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-6 py-4 text-white flex items-center justify-between rounded-t-2xl"
              style={{ background: "var(--forest)" }}
            >
              <div className="flex items-center gap-2">
                <FileText size={20} />
                <h3 className="font-bold text-base text-white">
                  {modalContent === "particular"
                    ? `Condiciones Particulares · Póliza ${heymondoInsurance.policyNumber}`
                    : `Condiciones Generales · Seguro TRANQUILIDAD`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="p-6 overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed flex-1"
              style={{ background: "var(--paper)", color: "var(--ink)" }}
            >
              {modalContent === "particular"
                ? heymondoInsurance.fullParticularConditions
                : heymondoInsurance.fullGeneralConditions}
            </div>

            <div
              className="px-6 py-4 border-t flex items-center justify-between"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
            >
              <button
                type="button"
                onClick={() => downloadInsuranceConditions(modalContent)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
                style={{ background: "var(--forest)" }}
              >
                <Download size={14} />
                Descargar como archivo .txt
              </button>

              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white"
                style={{ background: "var(--indigo)" }}
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
