import { useState } from "react";
import { Mountain, ExternalLink, X, AlertTriangle, MapPin, Eye, Info, Calendar } from "lucide-react";
import { gygFujiActivity, kenFujiActivity, visibilityTools } from "../data/fujiBookings";
import { todayISO } from "../utils/date";

export default function FujiAlertBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // El banner solo debe mostrarse a partir del 12 de septiembre y hasta el 20 de septiembre (ventana de decisión del Fuji)
  // Permitimos forzarlo con query param ?fujiBanner=1 si se desea previsualizar
  const today = todayISO();
  const isDateActive = today >= "2026-09-12" && today <= "2026-09-20";
  const forcePreview = typeof window !== "undefined" && window.location.search.includes("fujiBanner=1");

  if (!isDateActive && !forcePreview) return null;
  if (dismissed) return null;

  return (
    <>
      <aside
        aria-label="Aviso de visibilidad del Monte Fuji"
        className="relative mx-3 sm:mx-4 mt-2 mb-4 rounded-2xl shadow-lg border overflow-hidden transition-all animate-fadeIn"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #1e1b4b 100%)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          color: "white",
        }}
      >
        <div className="px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3.5">
            
            {/* Left: Icon & Core Alert Message */}
            <div className="flex items-start gap-3 flex-1 min-w-0 pr-8 lg:pr-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md mt-0.5 bg-white/20"
              >
                <Mountain size={20} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-white/20 text-white border border-white/30 text-[10.5px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Estrategia Fuji 🗻
                  </span>
                  <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                    4 Reservas GetYourGuide + Tour con Ken (20 Sept)
                  </span>
                </div>
                <p className="text-sm font-bold text-white mt-1 leading-snug">
                  Revisa la visibilidad 24h antes y cancela gratis las fechas con nubes
                </p>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  La regla de oro: Comprueba las webcams a las <strong>06:30 AM</strong>. Si a las 07:00 AM no se ve el pico, cancela antes del límite de 24h en GetYourGuide.
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto justify-start lg:justify-end shrink-0 pt-1 lg:pt-0">
              <a
                href={visibilityTools.isFujiVisible.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 transition-colors"
                title="Puntuación de visibilidad de 1 a 10"
              >
                <Eye size={13} className="text-amber-400" />
                isfujivisible.com ↗
              </a>

              <a
                href={visibilityTools.mtFujiToday.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 transition-colors"
                title="Webcams en directo y previsión"
              >
                <ExternalLink size={13} className="text-sky-400" />
                mtfujitoday.com ↗
              </a>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 shadow-md transition-all active:scale-95"
              >
                <Info size={14} />
                Ver 4 Reservas & Códigos
              </button>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Cerrar aviso temporalmente"
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/15 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal con todos los detalles de las reservas de GetYourGuide y Ken Kaneshima */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between border-b" style={{ background: "linear-gradient(135deg, #1d3557 0%, #0369a1 100%)", borderColor: "rgba(255,255,255,0.15)", color: "white" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Mountain size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white m-0">Estrategia de Excursión al Monte Fuji</h3>
                  <p className="text-xs text-white/80 m-0">4 Reservas en GetYourGuide + Tour Privado con Ken</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              
              {/* Cómo funciona la estrategia */}
              <div className="rounded-xl p-4 border" style={{ background: "var(--paper)", borderColor: "rgba(2, 132, 199, 0.25)" }}>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="text-sky-600 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-sm m-0" style={{ color: "var(--indigo)" }}>
                      ¿Cómo funciona la cancelación gratuita?
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed m-0" style={{ color: "var(--ink)" }}>
                      Se han reservado 4 días en GetYourGuide con antelación para asegurar plaza. Cada reserva permite <strong>reembolso íntegro cancelando con al menos 24 horas de antelación</strong> a través de la app/web de GetYourGuide. Revisad los enlaces de visibilidad y cancelad las fechas nubladas antes del límite indicado en cada bono.
                    </p>
                  </div>
                </div>
              </div>

              {/* Las 4 Reservas de GetYourGuide */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold flex items-center gap-2 m-0" style={{ color: "var(--ink)" }}>
                    <Calendar size={16} style={{ color: "var(--indigo)" }} />
                    Tus 4 Códigos de Reserva en GetYourGuide
                  </h4>
                  <a
                    href={gygFujiActivity.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold hover:underline flex items-center gap-1"
                    style={{ color: "var(--indigo)" }}
                  >
                    Ver actividad en GYG ↗
                  </a>
                </div>

                <div className="space-y-2.5">
                  {gygFujiActivity.bookings.map((b) => (
                    <div
                      key={b.code}
                      className="p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      style={{ background: "var(--paper)", borderColor: "var(--line)" }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm" style={{ color: "var(--ink)" }}>
                            {b.dateFormatted} (08:30 AM)
                          </span>
                        </div>
                        <p className="text-xs mt-0.5 m-0" style={{ color: "var(--ink-soft)" }}>
                          Límite cancelación: <strong style={{ color: "var(--shu)" }}>{b.cancelDeadline}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="px-2.5 py-1 rounded-lg border" style={{ background: "var(--paper-raised)", borderColor: "rgba(2, 132, 199, 0.3)" }}>
                          <p className="text-[10px] uppercase font-semibold m-0" style={{ color: "var(--ink-soft)" }}>Reserva</p>
                          <p className="font-mono text-xs font-bold m-0" style={{ color: "#0284c7" }}>{b.code}</p>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg border" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
                          <p className="text-[10px] uppercase font-semibold m-0" style={{ color: "var(--ink-soft)" }}>PIN</p>
                          <p className="font-mono text-xs font-bold m-0" style={{ color: "var(--ink)" }}>{b.pin}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logística y aviso de comida de GetYourGuide */}
              <div className="p-4 rounded-xl border space-y-2.5" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
                <h5 className="font-bold text-xs uppercase tracking-wider m-0" style={{ color: "var(--indigo)" }}>
                  📍 Punto de Encuentro y Detalles GYG
                </h5>
                <p className="text-xs flex items-start gap-1.5 m-0" style={{ color: "var(--ink)" }}>
                  <MapPin size={15} className="text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Punto de encuentro:</strong> Tokyo Mode Gakuen (1-7-3 Nishishinjuku, Shinjuku, enfrente de la estación). Llegar antes de las <strong>08:25 AM</strong> (salida 08:30).
                  </span>
                </p>
                <p className="text-xs p-2.5 rounded-lg leading-relaxed m-0" style={{ background: "rgba(230, 57, 70, 0.08)", border: "1px solid rgba(230, 57, 70, 0.25)", color: "var(--ink)" }}>
                  🍱 <strong style={{ color: "var(--shu)" }}>Comida NO incluida:</strong> La actividad no incluye almuerzo. No está permitido comer en el autobús, por lo que conviene desayunar bien, llevar agua y comprar comida/snacks en las paradas (llevad yenes en efectivo ¥ para las tiendas tradicionales).
                </p>
                <p className="text-xs m-0" style={{ color: "var(--ink-soft)" }}>
                  👟 <strong>Recomendación:</strong> Calzado cómodo para subir los 400 escalones del Parque Arakurayama Sengen hasta la Pagoda Chureito.
                </p>
              </div>

              {/* Tour Privado con Ken Kaneshima (20 Sept) */}
              <div className="p-4 rounded-xl border space-y-2" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm flex items-center gap-2 m-0" style={{ color: "var(--ink)" }}>
                    <span>🚐</span> Tour Exclusivo con Ken Kaneshima
                  </h4>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(46, 125, 91, 0.15)", color: "var(--forest)" }}>
                    Domingo 20 Sept
                  </span>
                </div>
                <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ink)" }}>
                  <strong>Precio:</strong> 13.000 ¥/persona (entradas y mini-van privada 8h con guía oficial en español). Inicio en Estación de Mishima (08:20 AM) y fin en Estación Shin-Fuji (17:30). Incluye parada gastronómica tradicional para degustar fideos <strong>Houtou</strong>.
                </p>
                <p className="text-xs m-0" style={{ color: "var(--ink-soft)" }}>
                  📞 Contacto Ken: <a href="tel:+819058631635" className="font-semibold underline" style={{ color: "var(--indigo)" }}>+81 90-5863-1635</a> · <a href="https://excursionesfujiyama.com" target="_blank" rel="noreferrer" className="font-semibold underline" style={{ color: "var(--indigo)" }}>excursionesfujiyama.com ↗</a>
                </p>
              </div>

            </div>

            <div className="px-6 py-4 border-t flex justify-end" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--indigo)", border: "none" }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
