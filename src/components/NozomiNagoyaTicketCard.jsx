import { useState } from "react";
import { Zap, Ticket, CheckCircle2, ChevronDown, Clock, Smartphone, CreditCard, Eye, X, CalendarDays, MapPin, Luggage } from "lucide-react";
import { groupMembers } from "./VisitJapanQRCard";
import { ticketAccentColor, ticketHeaderBackground, ticketSoftBackground } from "../utils/blockTheme";

const CONFIRMATION_IMG = "/images/tickets/smart-ex_nagoya-tokyo_nozomi358_2026-09-15.png";

const FROM_BLOCK = "tokio";
const TO_BLOCK = "tokio";

// Asientos Car 12 · Smart EX reserva 2002 (misma lógica de asignación que Nozomi 53 día 1)
const memberSeats = {
  pablo: { seat: "11-E", qr: "/images/tickets/nozomi-day9/seat-11e.png" },
  sergio: { seat: "12-E", qr: "/images/tickets/nozomi-day9/seat-12e.png" },
  juancarlos: { seat: "12-C", qr: "/images/tickets/nozomi-day9/seat-12c.png" },
  gerundio: { seat: "11-D", qr: "/images/tickets/nozomi-day9/seat-11d.png" },
  thibaut: { seat: "12-D", qr: "/images/tickets/nozomi-day9/seat-12d.png" },
};

export default function NozomiNagoyaTicketCard({ onGoToDay } = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFullQR, setShowFullQR] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    booked: true,
    paid: true,
    seats: true,
    qr: false,
    luggage: false,
    email: false,
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
      className="rounded-2xl border overflow-hidden shadow-sm mb-6"
      style={{
        background: "var(--paper-raised)",
        borderColor: "var(--line)",
      }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 sm:p-5 text-white relative overflow-hidden transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset cursor-pointer"
        style={{ background: headerBg }}
      >
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-1.5 opacity-90">
                <Zap size={14} className="text-yellow-400" />
                <p className="text-xs font-bold tracking-widest uppercase m-0">Nagoya → Tokio</p>
              </div>
              <h3 className="text-lg font-display font-bold m-0 leading-tight">
                NOZOMI 358
              </h3>
              <p className="text-sm opacity-90 mt-1 flex items-center gap-1.5 m-0">
                <Clock size={12} />
                15 Septiembre 2026 · 11:29 → 13:06
              </p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0">
              <p className="text-xs opacity-75 uppercase tracking-wider mb-0.5 mt-0">Reserva</p>
              <p className="text-base font-bold font-mono tracking-widest m-0">2002</p>
              <p className="text-xs opacity-90 mt-0.5 m-0">5 Adultos · ¥54.500 · 295,62€</p>
            </div>
          </div>
          <ChevronDown
            size={24}
            className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            style={{ opacity: 0.8 }}
          />
        </div>

        <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12 pointer-events-none">
          <Ticket size={120} />
        </div>
      </button>

      {onGoToDay && (
        <div className="px-4 py-2.5 border-b flex items-center justify-between gap-2" style={{ borderColor: "var(--line)", background: softBg }}>
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
              <CheckCircle2 size={14} /> COMPRADO Y CONFIRMADO
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              Coche 12 · Ordinary · N700
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              QR-Ticket disponible
            </span>
          </div>

          <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
            Billetes confirmados para los 5 viajeros. Selecciona tu nombre para abrir tu <strong>código QR individual</strong> de acceso a los tornos del Shinkansen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {groupMembers.map((m) => {
              const seatInfo = memberSeats[m.id];
              const isSelected = selectedMember?.id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMember(m);
                    setShowFullQR(true);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  style={{
                    borderColor: isSelected ? "var(--indigo)" : "var(--line)",
                    background: isSelected ? "rgba(29, 53, 87, 0.04)" : "var(--paper)",
                  }}
                >
                  <div>
                    <p className="text-sm font-bold m-0" style={{ color: "var(--ink)" }}>{m.name}</p>
                    <p className="text-xs font-medium mt-0.5 m-0" style={{ color: "var(--indigo)" }}>
                      Asiento {seatInfo?.seat}
                    </p>
                  </div>
                  <Ticket size={18} style={{ color: isSelected ? "var(--indigo)" : "var(--ink-soft)" }} />
                </button>
              );
            })}
          </div>

          <div className="rounded-xl p-4 bg-sky-50 border border-sky-200">
            <h4 className="font-bold text-sky-900 flex items-center gap-2 mb-2 text-sm m-0">
              <Smartphone size={16} /> ACCESO AL SHINKANSEN (Smart EX)
            </h4>
            <p className="text-sm text-sky-900 m-0 leading-relaxed">
              Opción principal recomendada: <strong>QR-Ticket</strong> en el móvil (mostrar en pantalla antes de subir).
              <br /><br />
              También se puede <strong>designar una IC card</strong> a los asientos para pasar el torno tocando la tarjeta.
              Opcionalmente se pueden recoger billetes físicos, pero <strong>NO es obligatorio</strong> como en JR-WEST.
            </p>
          </div>

          <div className="border rounded-xl p-4" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-sm m-0 text-gray-900">Tokaido Shinkansen NOZOMI 358 — Car No. 12</p>
                <p className="text-xs text-gray-500 m-0">Nagoya (11:29) → Tokyo (13:06) · 1 h 37 min · Series N700</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-gray-100 text-gray-700 self-start sm:self-auto">
                Ref: 2002
              </span>
            </div>

            <div className="bg-indigo-50/70 p-3 rounded-lg border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">5 Asientos asignados:</span>
              <span className="text-sm font-bold text-indigo-900 tracking-wider">11-D · 11-E · 12-C · 12-D · 12-E</span>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2" style={{ borderColor: "var(--line)" }}>
              <span>👤 Titular: <strong>Pablo Crespo Bellido</strong></span>
              <span>💰 Total: <strong>¥54.500 (¥10.900/pax · 295,62€ Revolut)</strong></span>
              <span className="inline-flex items-center gap-1">
                <CreditCard size={12} /> Mastercard ···· <strong>5230</strong>
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <MapPin size={18} className="text-amber-800 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed">
              <strong>Transbordo en Nagoya:</strong> el Shinano 4 llega a las <strong>10:53</strong>; el Nozomi 358 sale a las <strong>11:29</strong> → <strong>36 minutos</strong> de margen.
              Seguir indicaciones a andenes del Tokaido Shinkansen. No cambiar esta reserva salvo incidencia real.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Luggage size={18} className="text-slate-700 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-800 leading-relaxed">
              <strong>Equipaje (Ordinary Car ya reservada):</strong> si largo+ancho+alto ≤ 160 cm, no hace falta zona especial.
              Si supera 160 cm (hasta 250 cm), correspondería asiento con oversized baggage — comprobar dimensiones reales antes del viaje; no modificar la reserva sin verificar.
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.015)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Ticket size={16} className="text-indigo-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Ver confirmación del billete (Smart EX)</span>
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
              className="rounded-lg overflow-hidden border border-gray-200 relative group cursor-pointer max-h-56 bg-white"
            >
              <img
                src={CONFIRMATION_IMG}
                alt="Confirmación Smart EX Nozomi 358 Nagoya → Tokyo (reserva 2002)"
                className="w-full object-contain object-top max-h-56 transition-transform group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                <Eye size={16} /> Click para ampliar
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 mt-2 border-b pb-2">Checklist de preparación</p>
            <div className="space-y-2">
              <ChecklistItem checked={checkedItems.booked} locked text="Reserva Smart EX completada (nº 2002)" />
              <ChecklistItem checked={checkedItems.paid} locked text="Pago confirmado · ¥54.500 · 295,62€" />
              <ChecklistItem checked={checkedItems.seats} locked text="Asientos Car 12: 11-D, 11-E, 12-C, 12-D, 12-E" />
              <div className="my-2 border-t border-dashed" style={{ borderColor: "var(--line)" }} />
              <ChecklistItem checked={checkedItems.qr} onClick={() => toggleCheck("qr")} text="QR-Ticket guardado / método de acceso confirmado" />
              <ChecklistItem checked={checkedItems.luggage} onClick={() => toggleCheck("luggage")} text="Comprobadas dimensiones de las maletas" />
              <ChecklistItem checked={checkedItems.email} onClick={() => toggleCheck("email")} text="Email/confirmación Smart EX accesible en el móvil" />
            </div>
          </div>
        </div>
      )}

      {showFullQR && selectedMember && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5 mt-0">
                  Billete QR Shinkansen
                </p>
                <p className="text-base font-bold text-gray-900 leading-tight m-0">
                  {selectedMember.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullQR(false)}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors border-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex-1 overflow-y-auto flex flex-col items-center">
              <div className="w-full bg-blue-50 text-blue-900 rounded-xl p-3 mb-6 text-center border border-blue-100">
                <p className="text-lg font-black tracking-widest font-mono m-0">
                  {memberSeats[selectedMember.id]?.seat}
                </p>
                <p className="text-xs font-medium opacity-80 mt-1 uppercase tracking-wider m-0">
                  Coche 12
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-200 mb-6 w-full max-w-[280px] aspect-square flex items-center justify-center relative shadow-sm">
                <img
                  src={memberSeats[selectedMember.id]?.qr}
                  alt={`QR Shinkansen ${selectedMember.name}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full text-center space-y-1">
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider m-0">Tren</p>
                <p className="text-sm font-bold text-gray-900 m-0">NOZOMI 358</p>
                <p className="text-xs text-gray-600 mt-2 m-0">
                  Nagoya (11:29) → Tokio (13:06)
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-500 m-0">
                Aumenta el brillo de tu pantalla y escanea este código en los tornos Shinkansen de la estación.
              </p>
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
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 px-4 border-b flex items-center justify-between bg-gray-50">
              <p className="text-xs font-bold text-gray-700 m-0 flex items-center gap-1.5">
                <Ticket size={14} className="text-indigo-700" /> Smart EX · Nozomi 358 · Reserva 2002
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
                alt="Confirmación Smart EX Nozomi 358 ampliada"
                className="max-w-full h-auto rounded shadow-xs"
              />
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
