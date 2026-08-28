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
                Opción Monte Fuji GYG
              </span>
              <span className="text-xs text-sky-100 font-semibold hidden sm:inline">
                Reserva {booking.code}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5 truncate">
              {open ? "Excursión GetYourGuide disponible hoy si el cielo está despejado" : "Posibilidad de Excursión Monte Fuji hoy (Pulsa para ver detalles)"}
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
            Si 24h antes comprobamos que la previsión meteorológica es excelente, realizaremos esta excursión de 10h desde Shinjuku en lugar de la ruta prevista en Tokio.
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
              ⏰ Llegar antes de las <strong>08:25 AM</strong> (salida puntual en autobús a las 08:30 AM). Regreso aprox. 18:30.
            </p>
          </div>

          {/* Paradas del tour */}
          <div className="p-3 rounded-xl border space-y-1.5" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="font-bold" style={{ color: "var(--indigo)", margin: 0 }}>🗺️ Lugares que se visitan:</p>
            <ol className="pl-4 space-y-1 list-decimal" style={{ color: "var(--ink)" }}>
              <li><strong>Lago Kawaguchiko y Parque Oishi:</strong> Paseo junto al lago, campos de flores de temporada y vistas panorámicas.</li>
              <li><strong>Saiko Iyashi-no-Sato Nenba:</strong> Aldea tradicional reconstruida con casas de tejado de paja y talleres artesanos (entrada incluida).</li>
              <li><strong>Manantiales de Oshino Hakkai:</strong> 8 estanques cristalinos alimentados por el agua de deshielo del volcán (Patrimonio UNESCO).</li>
              <li><strong>Parque Arakurayama Sengen y Pagoda Chureito:</strong> Subida de 400 escalones para capturar la postal icónica de Japón.</li>
            </ol>
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

          {/* Enlaces directos */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={gygFujiActivity.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 text-[11.5px]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--indigo)", textDecoration: "none" }}
            >
              🎟️ Abrir Reserva en GetYourGuide ↗
            </a>
            <a
              href={gygFujiActivity.meetingPointUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 text-[11.5px]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--forest)", textDecoration: "none" }}
            >
              📍 Abrir Punto de Encuentro en Maps ↗
            </a>
            <a
              href={visibilityTools.isFujiVisible.url}
              target="_blank"
              rel="noreferrer"
              className="font-bold px-3 py-1.5 rounded-lg border flex items-center gap-1 text-[11.5px]"
              style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--shu)", textDecoration: "none" }}
            >
              👁️ Webcams en Directo (06:30 AM) ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
