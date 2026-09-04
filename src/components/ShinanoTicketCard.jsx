import { useState } from "react";
import { Train, Ticket, CheckCircle2, CreditCard, Lock, AlertTriangle, Eye, X, CalendarDays, MapPin } from "lucide-react";
import { ticketAccentColor, ticketHeaderBackground, ticketSoftBackground } from "../utils/blockTheme";
import TicketCardHeader from "./TicketCardHeader";

const CONFIRMATION_IMG = "/images/tickets/jr-west-shinano-4-nakatsugawa-nagoya-2026-09-15.png";

// Cruce Alpes → Tokio (salida Magome / llegada hacia Tokio)
const FROM_BLOCK = "alpes";
const TO_BLOCK = "tokio";

/** Precios reales Revolut (grupo): ¥14.350 · 77,84€ */
const PRICE_LINE = "5 · ¥14.350 (~77,84€)";

export default function ShinanoTicketCard({ onGoToDay, defaultExpanded = false } = {}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showImageModal, setShowImageModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    booked: true,
    paid: true,
    seats: true,
    card: false,
    pin: false,
    collected: false,
    boarded: false,
  });
  const headerBg = ticketHeaderBackground(FROM_BLOCK, TO_BLOCK);
  const accent = ticketAccentColor(FROM_BLOCK, TO_BLOCK);
  const softBg = ticketSoftBackground(FROM_BLOCK, TO_BLOCK);

  const toggleCheck = (id) => {
    if (["booked", "paid", "seats"].includes(id)) return;
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm mb-3"
      style={{
        background: "var(--paper-raised)",
        borderColor: "var(--line)",
      }}
    >
      <TicketCardHeader
        icon={Train}
        iconClassName="text-sky-200"
        route="Nakatsugawa → Nagoya"
        title="Shinano 4 (JR-WEST)"
        when="15 Sept 2026 · 09:57 → 10:53"
        reservationCode="42093"
        priceLine={PRICE_LINE}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        focusRingClass="focus:ring-indigo-500"
        headerBg={headerBg}
      />

      {onGoToDay && (
        <div className="px-3.5 py-2 border-b flex items-center justify-between gap-2" style={{ borderColor: "var(--line)", background: softBg }}>
          <button
            type="button"
            onClick={onGoToDay}
            className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 cursor-pointer border-none transition-opacity hover:opacity-80"
            style={{ background: accent, color: "white" }}
          >
            <CalendarDays size={13} />
            Ver día 9 en itinerario
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-5 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
              <CheckCircle2 size={14} /> RESERVADO Y PAGADO
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              Car 4 · Reserved · Non-Smoking
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              ⚠️ Billetes físicos: pendiente de recoger
            </span>
          </div>

          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-sm m-0">
              <AlertTriangle size={16} /> OBLIGATORIO: RECOGER BILLETES FÍSICOS ANTES DE SUBIR
            </h4>
            <p className="text-sm text-amber-800 m-0 leading-relaxed">
              La reserva está <strong>confirmada y pagada</strong>, pero JR-WEST exige recibir los billetes físicos
              <strong> antes de subir al tren</strong>. Sin ellos puede ser necesario comprar de nuevo a precio sin descuento.
              <br /><br />
              <strong>⏰ Cuándo (plan B / obligatorio en el día):</strong> Martes 15 sept, al llegar a Nakatsugawa (~08:40). Hay ~77 min hasta el Shinano 4 (09:57).
              <br />
              <strong>📍 Dónde:</strong> Máquina o taquilla habilitada <strong>FUERA de los tornos</strong> (no sirve una máquina dentro de la zona de andenes).
              <br />
              <strong>💡 Antelación:</strong> Si es posible, intentar recoger antes en una estación JR-WEST (p. ej. Kioto) con máquina/taquilla fuera de tornos; si no, <strong>recoger obligatoriamente en Nakatsugawa</strong>.
            </p>

            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-100 space-y-2">
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider m-0 mb-1">Para la recogida necesitas:</p>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <CreditCard size={14} className="text-gray-400 shrink-0" />
                <span><strong>Tarjeta física</strong> Mastercard terminada en <strong>8625</strong> (no vale virtual).</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <Lock size={14} className="text-gray-400 shrink-0" />
                <span><strong>PIN de recogida:</strong> PIN de 4 dígitos de la reserva.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <Ticket size={14} className="text-gray-400 shrink-0" />
                <span>Reservation No. <strong>42093</strong> · Receipt ID <strong>AEE6606M</strong></span>
              </div>
            </div>
          </div>

          <div className="border rounded-xl p-4" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-sm m-0 text-gray-900">Limited Express Shinano 4 — Car No. 4</p>
                <p className="text-xs text-gray-500 m-0">Nakatsugawa (09:57) → Nagoya (10:53) · 56 min · Ordinary / Non-Smoking</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-gray-100 text-gray-700 self-start sm:self-auto">
                Ref: 42093
              </span>
            </div>

            <div className="bg-sky-50/70 p-3 rounded-lg border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">5 Asientos asignados:</span>
              <span className="text-sm font-bold text-sky-900 tracking-wider">11-D · 12-C · 12-D · 13-C · 13-D</span>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2" style={{ borderColor: "var(--line)" }}>
              <span>👤 Titular: <strong>Pablo Crespo</strong></span>
              <span>💰 Revolut: <strong>¥14.350 (~77,84€) · ¥2.870/pax (~15,57€)</strong></span>
              <span>🧾 Receipt: <strong>AEE6606M</strong></span>
            </div>
            <p className="text-xs text-gray-500 m-0 mt-2">
              Desglose/pax: Limited Express ¥1.530 (~8€) + Basic Fare ¥1.340 (~7€) · Regular ticket (incluye basic fare Standard).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <MapPin size={18} className="text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <strong>Contexto del día:</strong> Magome → bus a Nakatsugawa (08:15–08:40) → <strong>Shinano 4</strong> → Nagoya (10:53) →
              <strong> Nozomi 358</strong> (11:29 → 13:06, Smart EX 2002 · ya comprado) → KOKO Hotel / Akihabara.
            </div>
          </div>

          {/* Confirmación visual */}
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.015)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Ticket size={16} className="text-indigo-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Billete / Confirmación JR-WEST</span>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-900 hover:bg-indigo-100 cursor-pointer transition-colors"
              >
                <Eye size={13} /> Ampliar captura
              </button>
            </div>

            <div
              onClick={() => setShowImageModal(true)}
              className="rounded-lg overflow-hidden border border-gray-200 relative group cursor-pointer max-h-64 bg-white"
            >
              <img
                src={CONFIRMATION_IMG}
                alt="Confirmación JR-WEST Shinano 4 Nakatsugawa → Nagoya (reserva 42093)"
                className="w-full object-contain object-top max-h-64 transition-transform group-hover:scale-[1.01]"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                <Eye size={16} /> Click para ampliar
              </div>
            </div>
            <p className="text-[11px] text-gray-500 m-0 mt-2">
              Documento de referencia del viaje (se conserva aunque marques la recogida como hecha).
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 mt-2 border-b pb-2">Checklist operativo</p>
            <div className="space-y-2">
              <ChecklistItem id="booked" checked={checkedItems.booked} locked text="Reserva JR-WEST aceptada (nº 42093 · Receipt AEE6606M)" />
              <ChecklistItem id="paid" checked={checkedItems.paid} locked text="Pago Revolut · ¥14.350 (~77,84€) · 5 adultos" />
              <ChecklistItem id="seats" checked={checkedItems.seats} locked text="Asientos Car 4: 11-D, 12-C, 12-D, 13-C, 13-D" />

              <div className="my-2 border-t border-dashed" style={{ borderColor: "var(--line)" }} />

              <ChecklistItem id="card" checked={checkedItems.card} onClick={() => toggleCheck("card")} text="Llevamos la tarjeta física Mastercard terminada en 8625" />
              <ChecklistItem id="pin" checked={checkedItems.pin} onClick={() => toggleCheck("pin")} text="Tenemos a mano el PIN de la reserva (4 dígitos)" />
              <ChecklistItem id="collected" checked={checkedItems.collected} onClick={() => toggleCheck("collected")} text="Billetes físicos recogidos (fuera de los tornos) antes de subir" />
              <ChecklistItem id="boarded" checked={checkedItems.boarded} onClick={() => toggleCheck("boarded")} text="Subidos al Shinano 4 a las 09:57 con billetes en mano" />
            </div>
          </div>
        </div>
      )}

      {showImageModal && (
        <div
          className="fixed inset-0 z-[130] bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-lg w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 px-4 border-b flex items-center justify-between bg-gray-50">
              <p className="text-xs font-bold text-gray-700 m-0 flex items-center gap-1.5">
                <Ticket size={14} className="text-indigo-700" /> Confirmación Shinano 4 · Reserva 42093
              </p>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-auto p-2 bg-gray-100 flex items-start justify-center">
              <img
                src={CONFIRMATION_IMG}
                alt="Confirmación JR-WEST Shinano 4 ampliada"
                className="max-w-full h-auto rounded shadow-xs"
               onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChecklistItem({ checked, locked, text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      className={`flex items-start gap-3 w-full text-left p-2 rounded-lg transition-colors ${
        locked ? "cursor-default opacity-80" : "cursor-pointer hover:bg-black/5"
      }`}
    >
      <div className={`mt-0.5 shrink-0 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
        checked ? "bg-indigo-700 border-indigo-700 text-white" : "border-gray-300 bg-white"
      }`}>
        {checked && <CheckCircle2 size={14} />}
      </div>
      <span className={`text-sm leading-snug ${checked ? "text-gray-500 line-through" : "text-gray-900 font-medium"}`}>
        {text}
      </span>
    </button>
  );
}
