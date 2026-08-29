import { useState } from "react";
import { Zap, Ticket, X, MapPin } from "lucide-react";
import { groupMembers } from "./VisitJapanQRCard";

export default function ShinkansenTicketCard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFullQR, setShowFullQR] = useState(false);

  // Configuración de los 5 asientos para la reserva Smart EX 2000
  const memberSeats = {
    "pablo": { seat: "13-E", type: "Ventana", qr: "/images/tickets/nozomi-day1/seat-13e.png" },
    "sergio": { seat: "14-E", type: "Ventana", qr: "/images/tickets/nozomi-day1/seat-14e.png" },
    "juancarlos": { seat: "13-C", type: "Pasillo", qr: "/images/tickets/nozomi-day1/seat-13c.png" },
    "gerundio": { seat: "13-D", type: "Centro", qr: "/images/tickets/nozomi-day1/seat-13d.png" },
    "viajero5": { seat: "14-D", type: "Centro", qr: "/images/tickets/nozomi-day1/seat-14d.png" },
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm mb-6"
      style={{
        background: "var(--paper-raised)",
        borderColor: "var(--line)",
      }}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1d3557 0%, #2a5286 100%)" }}>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 opacity-90">
              <Zap size={14} className="text-yellow-400" />
              <p className="text-xs font-bold tracking-widest uppercase m-0">Shinkansen Ticket</p>
            </div>
            <h3 className="text-lg font-display font-bold m-0 leading-tight">
              NOZOMI 53
            </h3>
            <p className="text-sm opacity-90 mt-1 flex items-center gap-1.5 m-0">
              <MapPin size={12} />
              Shinagawa (17:19) → Kioto (19:23)
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs opacity-75 uppercase tracking-wider mb-0.5 mt-0">Localizador</p>
            <p className="text-base font-bold font-mono tracking-widest m-0">2000</p>
            <p className="text-xs opacity-90 mt-0.5 m-0">7 Septiembre 2026</p>
          </div>
        </div>
        
        {/* Decoración gráfica */}
        <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12 pointer-events-none">
          <Ticket size={120} />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 space-y-3">
        <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
          Billetes de tren bala (Shinkansen Nozomi) confirmados y comprados a través de Smart EX. <strong>Coche 13 (Ordinary)</strong>.
          Selecciona tu nombre para ver el billete QR que deberás escanear en los tornos de la estación.
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
                  Coche 13 • {memberSeats[selectedMember.id]?.type}
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
