import { useState } from "react";
import { Bus, Ticket, CheckCircle2, ChevronDown, Clock, AlertTriangle, Info, MapPin, Eye, X } from "lucide-react";

export default function NohiMagomeTicketCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    booked: true,
    paid: true,
    seats: true,
    printedOrReady: false,
    earlyArrival: false,
    exchanged: false,
    boarded: false,
  });

  const toggleCheck = (id) => {
    if (['booked', 'paid', 'seats'].includes(id)) return;
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden shadow-sm mb-6 mt-4"
      style={{
        background: "var(--paper-raised)",
        borderColor: "var(--line)",
      }}
    >
      {/* Header (Toggle) */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 sm:p-5 text-white relative overflow-hidden transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset cursor-pointer" 
        style={{ background: "linear-gradient(135deg, #b45309 0%, #78350f 100%)" }}
      >
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-1">
            <div>
              <div className="flex items-center gap-2 mb-1.5 opacity-90">
                <Bus size={14} className="text-amber-200" />
                <p className="text-xs font-bold tracking-widest uppercase m-0">Takayama → Magome (Nakasendo)</p>
              </div>
              <h3 className="text-lg font-display font-bold m-0 leading-tight">
                Nohi Bus (Japan Bus Online)
              </h3>
              <p className="text-sm opacity-90 mt-1 flex items-center gap-1.5 m-0">
                <Clock size={12} />
                14 Septiembre 2026 · 08:00 → 10:45
              </p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0">
              <p className="text-xs opacity-75 uppercase tracking-wider mb-0.5 mt-0">Reserva</p>
              <p className="text-base font-bold font-mono tracking-widest m-0">08302008262</p>
              <p className="text-xs opacity-90 mt-0.5 m-0">5 Adultos · ¥25.000</p>
            </div>
          </div>
          <ChevronDown 
            size={24} 
            className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            style={{ opacity: 0.8 }}
          />
        </div>
        
        <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12 pointer-events-none">
          <Ticket size={120} />
        </div>
      </button>

      {/* Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-5 animate-in slide-in-from-top-2 fade-in duration-200">
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
              <CheckCircle2 size={14} /> COMPRADO Y CONFIRMADO
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
              Asientos Reservados
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              ⚠️ Requiere Canje Físico
            </span>
          </div>

          {/* Alerta importante canje en estación */}
          <div className="rounded-xl p-4 bg-amber-50 border border-amber-200">
            <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-sm m-0">
              <AlertTriangle size={16} /> OBLIGATORIO: CANJEAR E-TICKET POR BILLETE FÍSICO
            </h4>
            <p className="text-sm text-amber-800 m-0 leading-relaxed">
              En el <strong>Takayama Nohi Bus Center</strong> debemos presentar el E-ticket de confirmación para canjearlo por el <strong>billete físico antes de subir al autobús</strong>.
              <br/><br/>
              <strong>⏰ Cuándo:</strong> Lunes 14 de Septiembre, sobre las <strong>07:30–07:35</strong> (al menos 15 minutos antes de la salida de las 08:00).<br/>
              <strong>📍 Dónde:</strong> Mostrador del Takayama Nohi Bus Center.<br/>
              <strong>📄 Qué llevar:</strong> E-ticket en el móvil + copia impresa recomendada.
            </p>
          </div>

          {/* Detalles del Bus y Asientos */}
          <div className="border rounded-xl p-4" style={{ borderColor: "var(--line)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-sm m-0 text-gray-900">Autobús Nohi Bus — Car No. 01</p>
                <p className="text-xs text-gray-500 m-0">Takayama Nohi Bus Terminal (08:00) → Magome (10:45)</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-gray-100 text-gray-700 self-start sm:self-auto">
                Ref: 08302008262
              </span>
            </div>

            <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-150 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">5 Asientos Asignados:</span>
              <span className="text-sm font-bold text-amber-955 tracking-wider">2C · 2D · 3B · 3C · 3D</span>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2" style={{ borderColor: "var(--line)" }}>
              <span>👤 Titular: <strong>Pablo Crespo Bellido</strong></span>
              <span>💰 Total: <strong>¥25.000 (¥5.000/pax)</strong></span>
              <span>⏳ Cancelación: <strong>Hasta 14/09 07:50 JST</strong></span>
            </div>
          </div>

          {/* Aviso sobre la bajada en Magome */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
            <MapPin size={18} className="text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <strong>Bajada en Magome (10:45):</strong> Aunque el servicio continúa posteriormente hacia Tsumago (11:10), nuestra reserva y billete finalizan en <strong>Magome</strong>. Aquí nos bajamos para iniciar la ruta a pie por el camino histórico de Nakasendo hasta Tsumago.
            </div>
          </div>

          {/* Comprobante E-Ticket */}
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--line)", background: "rgba(0,0,0,0.015)" }}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Ticket size={16} className="text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Comprobante de Reserva Oficial</span>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 cursor-pointer transition-colors"
              >
                <Eye size={13} /> Ver comprobante completo
              </button>
            </div>

            <div 
              onClick={() => setShowImageModal(true)}
              className="rounded-lg overflow-hidden border border-gray-200 relative group cursor-pointer max-h-48 bg-white"
            >
              <img 
                src="/images/tickets/nohi_bus_takayama_magome.png" 
                alt="Comprobante Nohi Bus Takayama Magome" 
                className="w-full object-cover object-top h-48 transition-transform group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                <Eye size={16} /> Click para ampliar
              </div>
            </div>
          </div>

          {/* Checklist Operativo */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 mt-2 border-b pb-2">Checklist Operativo del Día</p>
            <div className="space-y-2">
              <ChecklistItem id="booked" checked={checkedItems.booked} locked text="Reserva completada en Japan Bus Online (08302008262)" />
              <ChecklistItem id="paid" checked={checkedItems.paid} locked text="Pago confirmado: ¥25.000 (5 adultos)" />
              <ChecklistItem id="seats" checked={checkedItems.seats} locked text="Asientos asignados en Car 01: 2C, 2D, 3B, 3C, 3D" />
              
              <div className="my-2 border-t border-dashed" style={{ borderColor: "var(--line)" }}></div>
              
              <ChecklistItem id="printedOrReady" checked={checkedItems.printedOrReady} onClick={() => toggleCheck("printedOrReady")} text="E-ticket descargado en el móvil + copia impresa preparada" />
              <ChecklistItem id="earlyArrival" checked={checkedItems.earlyArrival} onClick={() => toggleCheck("earlyArrival")} text="Llegar al Nohi Bus Center sobre 07:30–07:35 (25 min antes)" />
              <ChecklistItem id="exchanged" checked={checkedItems.exchanged} onClick={() => toggleCheck("exchanged")} text="Canjear E-ticket en taquilla por el billete físico antes de 07:45" />
              <ChecklistItem id="boarded" checked={checkedItems.boarded} onClick={() => toggleCheck("boarded")} text="Subir al autobús Car 01 a las 08:00 y bajar en Magome a las 10:45" />
            </div>
          </div>

        </div>
      )}

      {/* Modal visor de comprobante a pantalla completa */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 px-4 border-b flex items-center justify-between bg-gray-50">
              <p className="text-xs font-bold text-gray-700 m-0 flex items-center gap-1.5">
                <Ticket size={14} className="text-amber-700" /> Comprobante Nohi Bus Takayama → Magome (08302008262)
              </p>
              <button 
                onClick={() => setShowImageModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-auto p-2 bg-gray-100 flex items-center justify-center">
              <img 
                src="/images/tickets/nohi_bus_takayama_magome.png" 
                alt="Comprobante Nohi Bus Takayama Magome Grande" 
                className="max-w-full h-auto rounded shadow-xs"
              />
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
        checked ? "bg-amber-600 border-amber-600 text-white" : "border-gray-300 bg-white"
      }`}>
        {checked && <CheckCircle2 size={14} />}
      </div>
      <span className={`text-sm leading-snug ${checked ? "text-gray-500 line-through" : "text-gray-900 font-medium"}`}>
        {text}
      </span>
    </button>
  );
}
