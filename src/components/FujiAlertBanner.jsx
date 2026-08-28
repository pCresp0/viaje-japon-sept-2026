import { useState } from "react";
import { Mountain, ExternalLink, X, AlertTriangle, CheckCircle2, Clock, MapPin, Eye, Info, Calendar } from "lucide-react";
import { gygFujiActivity, kenFujiActivity, visibilityTools } from "../data/fujiBookings";

export default function FujiAlertBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <aside
        aria-label="Aviso de visibilidad del Monte Fuji"
        className="relative border-b shadow-sm transition-all"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%)",
          borderColor: "rgba(255, 255, 255, 0.12)",
          color: "white",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            
            {/* Left: Icon & Core Alert Message */}
            <div className="flex items-start gap-3 flex-1 min-w-0 pr-6 md:pr-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
              >
                <Mountain size={20} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Estrategia Fuji 🗻
                  </span>
                  <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                    4 Reservas GetYourGuide + Tour con Ken (20 Sept)
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5 leading-snug">
                  Revisa la visibilidad 24h antes y cancela gratis las fechas con nubes
                </p>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                  La regla de oro: Abre las webcams a las 06:30 AM. Si a las 07:00 AM no se ve el pico, cancela antes del límite de 24h.
                </p>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-start md:justify-end shrink-0 pt-1 md:pt-0">
              <a
                href={visibilityTools.isFujiVisible.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 transition-colors"
                title="Puntuación de visibilidad de 1 a 10"
              >
                <Eye size={14} className="text-amber-400" />
                isfujivisible.com ↗
              </a>

              <a
                href={visibilityTools.mtFujiToday.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 transition-colors"
                title="Webcams en directo y previsión"
              >
                <ExternalLink size={14} className="text-sky-400" />
                mtfujitoday.com ↗
              </a>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all active:scale-95"
              >
                <Info size={14} />
                Ver 4 Reservas & Códigos
              </button>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Cerrar banner durante esta sesión"
              className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
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
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 px-6 py-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
                  <Mountain size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold">Estrategia de Excursión al Monte Fuji</h3>
                  <p className="text-xs text-slate-300">4 Reservas en GetYourGuide + Tour Privado con Ken</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              
              {/* Cómo funciona la estrategia */}
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                      ¿Cómo funciona la cancelación gratuita?
                    </h4>
                    <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-1 leading-relaxed">
                      Se han reservado 4 días en GetYourGuide con antelación para asegurar plaza. Cada reserva permite <strong>reembolso íntegro cancelando con al menos 24 horas de antelación</strong> a través de la app/web de GetYourGuide. Revisad los enlaces de visibilidad y cancelad las fechas nubladas antes del límite indicado en cada bono.
                    </p>
                  </div>
                </div>
              </div>

              {/* Las 4 Reservas de GetYourGuide */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                    Tus 4 Códigos de Reserva en GetYourGuide
                  </h4>
                  <a
                    href={gygFujiActivity.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    Ver actividad en GYG ↗
                  </a>
                </div>

                <div className="space-y-3">
                  {gygFujiActivity.bookings.map((b) => (
                    <div
                      key={b.code}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {b.dateFormatted} (08:30 AM)
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Límite cancelación: <strong className="text-rose-600 dark:text-rose-400">{b.cancelDeadline}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Reserva</p>
                          <p className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{b.code}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700">
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">PIN</p>
                          <p className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{b.pin}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logística y aviso de comida de GetYourGuide */}
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2.5">
                <h5 className="font-bold text-xs uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                  📍 Punto de Encuentro y Detalles GYG
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                  <MapPin size={15} className="text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Punto de encuentro:</strong> Tokyo Mode Gakuen (1-7-3 Nishishinjuku, Shinjuku, enfrente de la estación). Llegar antes de las <strong>08:25 AM</strong> (salida 08:30).
                  </span>
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/30 p-2.5 rounded-lg leading-relaxed">
                  🍱 <strong>Comida NO incluida:</strong> La actividad no incluye almuerzo. No está permitido comer en el autobús, por lo que conviene desayunar bien, llevar agua y comprar comida/snacks en las paradas (llevad yenes en efectivo ¥ para las tiendas tradicionales).
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  👟 <strong>Recomendación:</strong> Calzado cómodo para subir los 400 escalones del Parque Arakurayama Sengen hasta la Pagoda Chureito.
                </p>
              </div>

              {/* Tour Privado con Ken Kaneshima (20 Sept) */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🚐</span> Tour Exclusivo con Ken Kaneshima
                  </h4>
                  <span className="text-xs font-bold text-forest bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                    Domingo 20 Sept
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Precio:</strong> 13.000 ¥/persona (entradas y mini-van privada 8h con guía oficial en español). Inicio en Estación de Mishima (08:20 AM) y fin en Estación Shin-Fuji (17:30). Incluye parada gastronómica tradicional para degustar fideos <strong>Houtou</strong>.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  📞 Contacto Ken: <a href="tel:+819058631635" className="font-semibold underline">+81 90-5863-1635</a> · <a href="https://excursionesfujiyama.com" target="_blank" rel="noreferrer" className="font-semibold underline">excursionesfujiyama.com ↗</a>
                </p>
              </div>

            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
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
