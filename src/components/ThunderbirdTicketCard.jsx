import { useState } from "react";
import { Train, Ticket, CheckCircle2, CreditCard, Lock, Info, MapPin, CalendarDays } from "lucide-react";
import { ticketAccentColor, ticketHeaderBackground, ticketSoftBackground } from "../utils/blockTheme";
import TicketCardHeader from "./TicketCardHeader";

// Cruce Kioto → Alpes
const FROM_BLOCK = "kioto";
const TO_BLOCK = "alpes";

/** Precios reales Revolut (grupo): ¥38.600 · 209,38€ */
const PRICE_LINE = "5 · ¥38.600 (~209,38€)";

export default function ThunderbirdTicketCard({ onGoToDay } = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    booked: true,
    paid: true,
    seats: true,
    collected: false,
    card: false,
    pin: false,
    kept: false,
  });
  const headerBg = ticketHeaderBackground(FROM_BLOCK, TO_BLOCK);
  const accent = ticketAccentColor(FROM_BLOCK, TO_BLOCK);
  const softBg = ticketSoftBackground(FROM_BLOCK, TO_BLOCK);

  const toggleCheck = (id) => {
    // Solo permitir interactuar con los que no vienen pre-marcados del código
    if (['booked', 'paid', 'seats'].includes(id)) return;
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
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
        iconClassName="text-green-200"
        route="Kioto → Kanazawa"
        title="Thunderbird 5 + Kagayaki 508"
        when="12 Sept 2026 · 08:10 → 10:03"
        reservationCode="47932"
        priceLine={PRICE_LINE}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        focusRingClass="focus:ring-green-600"
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
            Ver día 6 en itinerario
          </button>
        </div>
      )}

      {/* Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-5 animate-in slide-in-from-top-2 fade-in duration-200">
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
              <CheckCircle2 size={14} /> COMPRADO
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              NO sirve Suica
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              ⏳ Falta recoger billetes
            </span>
          </div>

          {/* Alerta importante recogida */}
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-sm m-0">
              <Info size={16} /> MUY IMPORTANTE: RECOGIDA OBLIGATORIA
            </h4>
            <p className="text-sm text-amber-800 m-0 leading-relaxed">
              Esta reserva NO es digital. Hay que retirar los billetes físicamente <strong>antes de subir al tren</strong>. 
              <br/><br/>
              <strong>Cuándo:</strong> Viernes 11 de Septiembre (tarde/noche).<br/>
              <strong>Dónde:</strong> Máquinas verdes JR-WEST 5489 de Kyoto Station.
            </p>
            
            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-100 space-y-2">
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider m-0 mb-1">Para la recogida necesitas:</p>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <CreditCard size={14} className="text-gray-400" />
                <span><strong>Tarjeta física</strong> Mastercard terminada en 8625 (OBLIGATORIA).</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <Ticket size={14} className="text-gray-400" />
                <span>Nº de reserva: <strong>47932</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <Lock size={14} className="text-gray-400" />
                <span><strong>Identification Number</strong> (PIN de 4 dígitos).</span>
              </div>
            </div>
          </div>

          {/* Trenes y Asientos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tren 1 */}
            <div className="border rounded-xl p-4" style={{ borderColor: "var(--line)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <p className="font-bold text-sm m-0 text-gray-900">Thunderbird 5</p>
                  <p className="text-xs text-gray-500 m-0">Kyoto (08:10) → Tsuruga (09:03)</p>
                </div>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Coche 5</span>
                <span className="text-sm font-bold text-blue-700 tracking-wide">11-D · 12-C · 12-D · 13-C · 13-D</span>
              </div>
            </div>

            {/* Tren 2 */}
            <div className="border rounded-xl p-4" style={{ borderColor: "var(--line)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-xs">2</div>
                <div>
                  <p className="font-bold text-sm m-0 text-gray-900">Kagayaki 508</p>
                  <p className="text-xs text-gray-500 m-0">Tsuruga (09:21) → Kanazawa (10:03)</p>
                </div>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Coche 5</span>
                <span className="text-sm font-bold text-green-700 tracking-wide">11-E · 12-D · 12-E · 13-D · 13-E</span>
              </div>
            </div>
          </div>
          
          <div className="text-center p-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              <MapPin size={12} /> 18 minutos de transbordo en Tsuruga
            </span>
          </div>

          {/* Checklist Operativo */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 mt-2 border-b pb-2">Checklist Operativo</p>
            <div className="space-y-2">
              <ChecklistItem id="booked" checked={checkedItems.booked} locked text="Reserva realizada (Receipt: AEE6444M)" />
              <ChecklistItem id="paid" checked={checkedItems.paid} locked text="Pago confirmado (¥38.600 · ~209,38€ Revolut)" />
              <ChecklistItem id="seats" checked={checkedItems.seats} locked text="5 asientos confirmados en coche 5" />
              
              <div className="my-2 border-t border-dashed" style={{ borderColor: "var(--line)" }}></div>
              
              <ChecklistItem id="card" checked={checkedItems.card} onClick={() => toggleCheck("card")} text="Llevamos tarjeta física Mastercard (**8625)" />
              <ChecklistItem id="pin" checked={checkedItems.pin} onClick={() => toggleCheck("pin")} text="Recordamos el Identification Number (PIN 4 dígitos)" />
              <ChecklistItem id="collected" checked={checkedItems.collected} onClick={() => toggleCheck("collected")} text="Billetes físicos recogidos en Kyoto Station (11/09)" />
              <ChecklistItem id="kept" checked={checkedItems.kept} onClick={() => toggleCheck("kept")} text="Hemos guardado juntos todos los tickets impresos" />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function ChecklistItem({ id, checked, locked, text, onClick }) {
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
        checked ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 bg-white"
      }`}>
        {checked && <CheckCircle2 size={14} />}
      </div>
      <span className={`text-sm leading-snug ${checked ? "text-gray-500 line-through" : "text-gray-900 font-medium"}`}>
        {text}
      </span>
    </button>
  );
}
