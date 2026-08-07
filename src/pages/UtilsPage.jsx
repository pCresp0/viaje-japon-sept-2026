import { useState, useEffect } from "react";
import { Clock, DollarSign } from "lucide-react";

export default function UtilsPage() {
  const [time, setTime] = useState(new Date());
  const [euroToYen, setEuroToYen] = useState(160); // Approximate rate
  const [eurInput, setEurInput] = useState(100);
  const [yenInput, setYenInput] = useState(16000);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Timezone calculation
  const spainTime = time.toLocaleTimeString("es-ES", { timeZone: "Europe/Madrid" });
  const japanTime = time.toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo" });
  const spainDate = time.toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" });
  const japanDate = time.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" });

  const handleEurChange = (val) => {
    setEurInput(val);
    setYenInput(Math.round(val * euroToYen));
  };

  const handleYenChange = (val) => {
    setYenInput(val);
    setEurInput(Math.round(val / euroToYen * 100) / 100);
  };

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Herramientas</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Hora local y divisas</h2>
      </div>

      {/* Time section */}
      <div className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Hora actual</p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Spain */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(29,53,87,0.1) 0%, rgba(188,71,73,0.1) 100%)", border: "1px solid var(--line)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 20 }}>🇪🇸</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>España (Madrid)</p>
            </div>
            <p style={{
              fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)",
              color: "var(--indigo)", marginBottom: 4
            }}>
              {spainTime.split(":").slice(0, 2).join(":")}
            </p>
            <p style={{ fontSize: 11, color: "var(--ink-soft)" }}>{spainDate}</p>
          </div>

          {/* Japan */}
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(46,125,91,0.1) 0%, rgba(201,162,39,0.1) 100%)", border: "1px solid var(--line)" }}>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 20 }}>🇯🇵</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Japón (Tokio)</p>
            </div>
            <p style={{
              fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)",
              color: "var(--forest)", marginBottom: 4
            }}>
              {japanTime.split(":").slice(0, 2).join(":")}
            </p>
            <p style={{ fontSize: 11, color: "var(--ink-soft)" }}>{japanDate}</p>
          </div>
        </div>

        <div className="rounded-xl p-4 mt-3" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <p style={{ fontSize: 12, color: "var(--ink-soft)", margin: 0 }}>
            <strong>Diferencia:</strong> Japón está 8 horas adelantado respecto a España.
          </p>
        </div>
      </div>

      {/* Currency converter */}
      <div>
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Conversor EUR ↔ JPY</p>
        <p style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 4 }}>
          Tipo aproximado: 1€ = {euroToYen}¥ (consultable en tiempo real en XE.com)
        </p>

        <div className="space-y-4">
          {/* EUR input */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
              Euros (€)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={eurInput}
                onChange={(e) => handleEurChange(parseFloat(e.target.value) || 0)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--line)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--paper-raised)",
                }}
              />
              <span style={{
                padding: "10px 16px",
                background: "var(--indigo)",
                color: "white",
                borderRadius: 10,
                fontWeight: 700,
                minWidth: "60px",
                textAlign: "center",
              }}>
                €
              </span>
            </div>
          </div>

          {/* Conversion arrow */}
          <div style={{ textAlign: "center", color: "var(--ink-soft)" }}>↕</div>

          {/* YEN input */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
              Yenes (¥)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={yenInput}
                onChange={(e) => handleYenChange(parseFloat(e.target.value) || 0)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--line)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--paper-raised)",
                }}
              />
              <span style={{
                padding: "10px 16px",
                background: "var(--forest)",
                color: "white",
                borderRadius: 10,
                fontWeight: 700,
                minWidth: "60px",
                textAlign: "center",
              }}>
                ¥
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 mt-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <p style={{ fontSize: 12, color: "var(--ink-soft)", margin: 0 }}>
            💱 Actualiza el tipo en XE.com si quieres precisión en tiempo real. Los cajeros automáticos de Japón suelen ofrecer mejor tipo de cambio que oficinas de cambio.
          </p>
        </div>
      </div>
    </div>
  );
}
