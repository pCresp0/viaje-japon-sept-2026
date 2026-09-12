import { useState } from "react";
import { QrCode, X, Maximize2 } from "lucide-react";

/**
 * QR de Yamato Transport (Takkyubin) para el envío de las 5 maletas grandes
 * de Kioto a Tokio (KOKO Hotel). Se muestra sin protección por contraseña,
 * a diferencia de VisitJapanQRCard, porque no es un documento de identidad
 * ni de inmigración — es solo la confirmación del envío de equipaje.
 */
export default function TakkyubinQRCard() {
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <div
        className="mt-3 rounded-2xl border overflow-hidden"
        style={{ borderColor: "rgba(201,162,39,0.35)", background: "rgba(201,162,39,0.06)" }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "rgba(201,162,39,0.14)" }}>
          <QrCode size={16} style={{ color: "#8a6d1a" }} />
          <p className="text-[13px] font-bold" style={{ color: "#5c4a12" }}>
            QR de recogida — envío de maletas (Yamato)
          </p>
        </div>
        <button
          onClick={() => setShowFull(true)}
          className="w-full flex flex-col items-center gap-2 px-4 py-4"
        >
          <img
            src="/images/takkyubin-qr.jpeg"
            alt="Código QR de confirmación del envío Yamato Takkyubin"
            className="w-40 h-auto rounded-lg border"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          />
          <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: "#8a6d1a" }}>
            <Maximize2 size={12} /> Toca para ampliar
          </span>
        </button>
        <p className="px-4 pb-3 text-[12.5px] leading-snug" style={{ color: "var(--ink-soft)" }}>
          Guardado como captura de pantalla del formulario Yamato. Tenerlo a mano por si el hotel o el mensajero lo pide al hacer la entrega o el check-in.
        </p>
      </div>

      {showFull && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setShowFull(false)}
        >
          <button
            onClick={() => setShowFull(false)}
            className="absolute top-5 right-5 p-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <X size={22} color="#fff" />
          </button>
          <img
            src="/images/takkyubin-qr.jpeg"
            alt="Código QR de confirmación del envío Yamato Takkyubin, ampliado"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
