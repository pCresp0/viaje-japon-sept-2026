import { useState } from "react";
import { Zap, Ticket, X, CalendarDays } from "lucide-react";
import { groupMembers } from "./VisitJapanQRCard";
import { ticketAccentColor, ticketHeaderBackground, ticketSoftBackground } from "../utils/blockTheme";
import TicketCardHeader from "./TicketCardHeader";

const FROM_BLOCK = "kioto";
const TO_BLOCK = "kioto";

/** Precios reales Revolut (grupo): ¥68.850 · 373,27€ */
const PRICE_LINE = "5 · ¥68.850 (~373,27€)";

export default function ShinkansenTicketCard({ onGoToDay, defaultExpanded = false } = {}) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFullQR, setShowFullQR] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const headerBg = ticketHeaderBackground(FROM_BLOCK, TO_BLOCK);
  const accent = ticketAccentColor(FROM_BLOCK, TO_BLOCK);
  const softBg = ticketSoftBackground(FROM_BLOCK, TO_BLOCK);

  // Configuración de los 5 asientos para la reserva Smart EX 2000
  const memberSeats = {
    "pablo": { seat: "13-E", qr: "/images/tickets/nozomi-day1/seat-13e.png" },
    "sergio": { seat: "14-E", qr: "/images/tickets/nozomi-day1/seat-14e.png" },
    "juancarlos": { seat: "13-C", qr: "/images/tickets/nozomi-day1/seat-13c.png" },
    "gerundio": { seat: "13-D", qr: "/images/tickets/nozomi-day1/seat-13d.png" },
    "thibaut": { seat: "14-D", qr: "/images/tickets/nozomi-day1/seat-14d.png" },
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
        icon={Zap}
        iconClassName="text-yellow-400"
        route="Shinagawa → Kioto"
        title="NOZOMI 53"
        when="7 Sept 2026 · 17:19 → 19:23"
        reservationCode="2000"
        priceLine={PRICE_LINE}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        focusRingClass="focus:ring-blue-500"
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
            Ver día 1 en itinerario
          </button>
        </div>
      )}

      {/* Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-3.5 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-800 border border-green-200">
              ✅ Billetes Comprados (Smart EX)
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              Coche 13 · Ordinary
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              Revolut: ¥68.850 (~373,27€) · ¥13.770/pax (~74,65€)
            </span>
          </div>

          <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
            Billetes confirmados para los 5 viajeros. Selecciona tu nombre para abrir tu <strong>código QR individual</strong> de acceso a los tornos del Shinkansen.
          </p>

        {/* Members List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
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
                  background: isSelected ? "rgba(29, 53, 87, 0.04)" : "var(--paper)"
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
      </div>
      )}

      {/* Modal QR Completo */}
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
                onClick={() => setShowFullQR(false)}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors"
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
                  Coche 13
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
                <p className="text-sm font-bold text-gray-900 m-0">NOZOMI 53</p>
                <p className="text-xs text-gray-600 mt-2 m-0">
                  Shinagawa (17:19) → Kioto (19:23)
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
    </div>
  );
}
