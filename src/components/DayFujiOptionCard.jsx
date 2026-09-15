import { useState } from "react";
import { Mountain, MapPin, ChevronDown, ChevronUp, AlertTriangle, ExternalLink, Calendar } from "lucide-react";
import { gygFujiActivity, visibilityTools } from "../data/fujiBookings";

export default function DayFujiOptionCard({ dayNum }) {
  const booking = gygFujiActivity.bookings.find((b) => b.dayNum === dayNum);
  const [open, setOpen] = useState(false);

  if (!booking) return null;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all shadow-sm mb-4"
      style={{
        background: "var(--paper-raised)",
        borderColor: "rgba(2, 132, 199, 0.35)",
      }}
    >
      {/* Header Bar */}
      <div
        onClick={() => setOpen(!open)}
        className="px-4 py-3 cursor-pointer flex items-center justify-between gap-3 text-white transition-opacity hover:opacity-95"
        style={{
          background: "linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #075985 100%)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <Mountain size={17} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] bg-white text-sky-900 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Excursión Monte Fuji · Confirmada
              </span>
              <span className="text-xs text-sky-100 font-semibold hidden sm:inline">
                Reserva {booking.code}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 truncate">
              {open ? "Guía asignado y horario actualizado -- toda la info aquí" : "Mañana: excursión al Monte Fuji (Pulsa para ver el mensaje del guía)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="text-xs font-semibold text-sky-100 flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-lg"
          >
            {open ? "Ocultar" : "Ver detalle"}
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Quick Summary Strip (Always Visible) */}
      <div
        className="px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs"
        style={{ background: "var(--paper)", borderColor: "var(--line)" }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ color: "var(--ink-soft)" }}>Código GYG:</span>
          <span className="font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
            {booking.code}
          </span>
          <span className="font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            PIN: {booking.pin}
          </span>
        </div>

        <div className="text-[11.5px] font-semibold text-rose-700 dark:text-rose-400">
          Cancela gratis: {booking.cancelDeadline}
        </div>
      </div>

      {/* Expanded Details */}
      {open && (
        <div className="p-4 space-y-3.5 text-xs animate-fadeIn" style={{ color: "var(--ink)" }}>
          <p style={{ color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
            Excursión de día completo confirmada, con guía asignado para mañana. Toda la información: horario actualizado, punto de encuentro y aviso de lluvia.
          </p>

          {/* Punto de encuentro y horario */}
          <div className="p-3 rounded-xl border space-y-1.5" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="font-bold flex items-center gap-1.5" style={{ color: "var(--indigo)", margin: 0 }}>
              <MapPin size={15} className="text-sky-600" />
              Punto de Encuentro y Horario:
            </p>
            <p style={{ color: "var(--ink)", margin: 0 }}>
              <strong>Tokyo Mode Gakuen</strong> (1-7-3 Nishishinjuku, Shinjuku City, Tokio).
            </p>
            <p style={{ color: "var(--ink-soft)", margin: 0 }}>
              ⏰ Encuentro a las <strong>08:10 AM</strong> (salida puntual en autobús a las <strong>08:20 AM</strong>). Regreso aprox. 18:30.
            </p>
          </div>

          {/* Mensaje del guía (recibido la víspera) */}
          <div className="p-3 rounded-xl border space-y-1.5" style={{ background: "rgba(234, 88, 12, 0.06)", borderColor: "rgba(234, 88, 12, 0.35)" }}>
            <p className="font-bold flex items-center gap-1.5" style={{ margin: 0, color: "#c2410c" }}>
              🧡 Mensaje del guía ({gygFujiActivity.guideMessage.receivedDate}):
            </p>
            <ul className="pl-4 space-y-1 list-disc" style={{ margin: 0, color: "var(--ink)" }}>
              <li>Guía: <strong>{gygFujiActivity.guideMessage.guideName}</strong> -- sostendrá una bandera <strong>{gygFujiActivity.guideMessage.flagColor.toLowerCase()}</strong> con el número <strong>{gygFujiActivity.guideMessage.flagNumber}</strong>.</li>
              <li><strong>⚠️ {gygFujiActivity.guideMessage.lateWarning}</strong></li>
              <li>🚉 {gygFujiActivity.guideMessage.stationWarning}</li>
              <li>🌧️ <strong>Aviso de lluvia:</strong> {gygFujiActivity.guideMessage.weatherNotice}</li>
              <li>🚻 {gygFujiActivity.guideMessage.restroomNotice}</li>
            </ul>
          </div>

          {/* Recomendación de salida del hotel */}
          <div className="p-3 rounded-xl border space-y-1.5" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="font-bold flex items-center gap-1.5" style={{ color: "var(--indigo)", margin: 0 }}>
              🕖 ¿A qué hora salir del hotel?
            </p>
            <p style={{ color: "var(--ink)", margin: 0 }}>
              {gygFujiActivity.hotelDepartureAdvice}
            </p>
          </div>

          {/* Paradas del tour */}
          <div className="p-3 rounded-xl border space-y-2.5" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="font-bold" style={{ color: "var(--indigo)", margin: 0 }}>🗺️ Qué vamos a ver, parada a parada:</p>
            {gygFujiActivity.itineraryStopsDetailed.map((stop, i) => (
              <div key={i} className="pl-2 border-l-2 space-y-0.5" style={{ borderColor: "rgba(2, 132, 199, 0.35)" }}>
                <p className="font-bold flex items-center gap-1.5 flex-wrap" style={{ color: "var(--ink)", margin: 0 }}>
                  <span>{stop.emoji}</span>
                  <span>{i + 1}. {stop.name}</span>
                  <span className="text-[10.5px] font-semibold" style={{ color: "var(--ink-soft)" }}>({stop.duration})</span>
                </p>
                <p style={{ color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>{stop.detail}</p>
              </div>
            ))}
          </div>

          {/* Aviso importante de comidas y dinero */}
          <div className="p-3 rounded-xl border space-y-1.5" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="font-bold flex items-center gap-1.5" style={{ margin: 0, color: "var(--shu)" }}>
              <AlertTriangle size={14} />
              ⚠️ Comida y Normas de la Actividad:
            </p>
            <ul className="pl-4 space-y-1 list-disc" style={{ margin: 0, color: "var(--ink)" }}>
              <li><strong>Comida NO incluida:</strong> Desayunar fuerte antes de salir y llevar snacks/agua.</li>
              <li><strong>Prohibido comer en el autobús:</strong> Solo se puede comer en los descansos y paradas de las atracciones.</li>
              <li><strong>Llevar efectivo en yenes (¥):</strong> La mayoría de puestos locales de comida de Oshino Hakkai y Saiko no aceptan tarjeta.</li>
              <li><strong>Calzado deportivo:</strong> Hay 400 escalones empinados en la Pagoda Chureito.</li>
            </ul>
          </div>

          {/* Aviso de qué lado del Fuji comprobar */}
          <div className="p-3 rounded-xl border space-y-1.5" style={{ background: "rgba(220, 38, 38, 0.06)", borderColor: "rgba(220, 38, 38, 0.3)" }}>
            <p className="font-bold flex items-center gap-1.5" style={{ margin: 0, color: "#b91c1c" }}>
              <AlertTriangle size={14} />
              👁️ Qué lado del Fuji comprobar en la web de visibilidad:
            </p>
            <p style={{ color: "var(--ink)", margin: 0 }}>
              Mirad siempre la vista <strong>NORTE (Kawaguchiko)</strong>, nunca la de Hakone/Sur — las webs de visibilidad muestran previsiones separadas para cada lado del Fuji, y puede estar despejado en uno y nublado en el otro el mismo día. Todas las paradas de esta excursión (Kawaguchiko, Parque Oishi, Oshino Hakkai, Pagoda Chureito) están en el lado norte.
            </p>
          </div>

          {/* Enlaces directos */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={gygFujiActivity.url}
              target="_blank" rel="noopener noreferrer"
              className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 text-[11.5px]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--indigo)", textDecoration: "none" }}
            >
              🎟️ Abrir Reserva en GetYourGuide ↗
            </a>
            <a
              href={gygFujiActivity.meetingPointUrl}
              target="_blank" rel="noopener noreferrer"
              className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 text-[11.5px]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--forest)", textDecoration: "none" }}
            >
              📍 Abrir Punto de Encuentro en Maps ↗
            </a>
            <a
              href={visibilityTools.isFujiVisible.url}
              target="_blank" rel="noopener noreferrer"
              className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 text-[11.5px]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--shu)", textDecoration: "none" }}
            >
              👁️ Ver vista NORTE en Directo (06:30 AM) ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
