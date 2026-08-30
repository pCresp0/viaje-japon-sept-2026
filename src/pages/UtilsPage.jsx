import { useState, useEffect, useRef } from "react";
import { RefreshCw, CheckCircle2, WifiOff } from "lucide-react";
import { fmtDateTZ } from "../utils/date";

/** Formato ES: 1.234.567 o 12,5 */
function formatEs(n, { maxDecimals = 0 } = {}) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return num.toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

/** Parsea "1.234,56" o "1234.56" → number */
function parseEs(str) {
  const raw = String(str ?? "").trim();
  if (!raw) return 0;
  const cleaned = raw.includes(",")
    ? raw.replace(/\./g, "").replace(",", ".")
    : raw.replace(/[^\d.-]/g, "");
  const n = parseFloat(cleaned.replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function UtilsPage() {
  const [time, setTime] = useState(new Date());

  const [rate, setRate] = useState(() => {
    try {
      const saved = localStorage.getItem("jpy_rate");
      return saved ? parseFloat(saved) : 160;
    } catch {
      return 160;
    }
  });

  const [lastUpdated, setLastUpdated] = useState(() => {
    try {
      return localStorage.getItem("jpy_rate_date") || null;
    } catch {
      return null;
    }
  });

  const [loadingRate, setLoadingRate] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const [eurInput, setEurInput] = useState(100);
  const [yenInput, setYenInput] = useState(() => Math.round(100 * rate));
  const [eurText, setEurText] = useState(() => formatEs(100, { maxDecimals: 2 }));
  const [yenText, setYenText] = useState(() => formatEs(Math.round(100 * rate)));

  // fetchLiveRate() se lanza una sola vez al montar (no en cada cambio del
  // campo de euros, o cada tecla dispararía una llamada de red). Pero si
  // se deja que capture "eurInput" por closure, al resolver la petición
  // usaría el valor que había EN EL MOMENTO DE MONTAR (100 por defecto) y
  // no el que el usuario haya escrito mientras tanto — sobrescribiendo su
  // valor de yenes con un cálculo basado en un euro obsoleto. Esta ref
  // siempre apunta al valor más reciente, sin necesidad de reiniciar el
  // efecto ni provocar una llamada de red en cada pulsación.
  const eurInputRef = useRef(eurInput);
  useEffect(() => { eurInputRef.current = eurInput; }, [eurInput]);

  async function fetchLiveRate() {
    setLoadingRate(true);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/EUR");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data && data.rates && data.rates.JPY) {
        const liveJpy = Math.round(data.rates.JPY * 100) / 100;
        setRate(liveJpy);
        setIsLive(true);
        const timeStr = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
        setLastUpdated(timeStr);
        const nextYen = Math.round(eurInputRef.current * liveJpy);
        setYenInput(nextYen);
        setYenText(formatEs(nextYen));
        try {
          localStorage.setItem("jpy_rate", liveJpy.toString());
          localStorage.setItem("jpy_rate_date", timeStr);
        } catch {
          /* ignore */
        }
      }
    } catch (err) {
      console.warn("Using offline / cached rate:", err);
      setIsLive(false);
    } finally {
      setLoadingRate(false);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    fetchLiveRate();
    return () => clearInterval(timer);
  }, []);

  const spainTime = time.toLocaleTimeString("es-ES", { timeZone: "Europe/Madrid" });
  const japanTime = time.toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo" });
  const spainDate = fmtDateTZ(time, "Europe/Madrid");
  const japanDate = fmtDateTZ(time, "Asia/Tokyo");

  const handleEurChange = (raw) => {
    setEurText(raw);
    const val = parseEs(raw);
    setEurInput(val);
    const nextYen = Math.round(val * rate);
    setYenInput(nextYen);
    setYenText(formatEs(nextYen));
  };

  const handleYenChange = (raw) => {
    setYenText(raw);
    const val = parseEs(raw);
    setYenInput(val);
    const nextEur = Math.round((val / rate) * 100) / 100;
    setEurInput(nextEur);
    setEurText(formatEs(nextEur, { maxDecimals: 2 }));
  };

  const getHourDiff = () => {
    try {
      const now = new Date();
      const madridDate = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));
      const tokyoDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
      return Math.round((tokyoDate.getTime() - madridDate.getTime()) / (1000 * 60 * 60));
    } catch {
      return 7;
    }
  };
  const diffHours = getHourDiff();

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Herramientas</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Hora local y divisas</h2>
      </div>

      <div className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Hora actual</p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
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

        <div className="rounded-xl p-4 mt-3 space-y-1.5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <p style={{ fontSize: 13, color: "var(--ink)", margin: 0, fontWeight: 700 }}>
            ⏰ <strong>Diferencia horaria:</strong> Japón está actualmente <strong>{diffHours} horas adelantado</strong> (+{diffHours} h).
          </p>
          <p style={{ fontSize: 12, color: "var(--ink-soft)", margin: 0, lineHeight: 1.5 }}>
            • <strong>Horario de verano (nuestro viaje en septiembre):</strong> <strong>+7 horas</strong> respecto a España peninsular (cuando en España son las 10:00, en Japón son las 17:00).<br />
            • <strong>Horario de invierno (noviembre a marzo):</strong> <strong>+8 horas</strong> respecto a España peninsular.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="eyebrow" style={{ color: "var(--ink-soft)" }}>Conversor EUR ↔ JPY</p>
          <button
            onClick={fetchLiveRate}
            disabled={loadingRate}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all"
            style={{
              background: "var(--paper-raised)",
              borderColor: "var(--line)",
              color: "var(--ink)",
              cursor: loadingRate ? "not-allowed" : "pointer"
            }}
          >
            <RefreshCw size={12} className={loadingRate ? "animate-spin" : ""} />
            {loadingRate ? "Actualizando..." : "Actualizar"}
          </button>
        </div>

        <div
          className="rounded-xl p-3.5 mb-4 flex items-center justify-between"
          style={{
            background: isLive ? "rgba(46,125,91,0.08)" : "rgba(201,162,39,0.1)",
            border: isLive ? "1px solid rgba(46,125,91,0.2)" : "1px solid rgba(201,162,39,0.3)",
          }}
        >
          <div className="flex items-center gap-2">
            {isLive ? (
              <CheckCircle2 size={16} style={{ color: "var(--forest)" }} />
            ) : (
              <WifiOff size={16} style={{ color: "#b08500" }} />
            )}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                1 € = {formatEs(rate, { maxDecimals: 2 })} ¥
              </p>
              <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>
                {isLive
                  ? `Cambio oficial en directo ${lastUpdated ? `(${lastUpdated})` : ""}`
                  : `Cambio guardado offline ${lastUpdated ? `(actualizado ${lastUpdated})` : ""}`}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>
                Euros (€)
              </label>
              <div className="flex gap-1.5">
                {[10, 50, 100, 500].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleEurChange(String(val))}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-all hover:bg-black/5"
                    style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--indigo)" }}
                  >
                    {formatEs(val)} €
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={eurText}
                onChange={(e) => handleEurChange(e.target.value)}
                onBlur={() => setEurText(formatEs(eurInput, { maxDecimals: 2 }))}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--line)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--paper-raised)",
                  fontVariantNumeric: "tabular-nums",
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

          <div style={{ textAlign: "center", color: "var(--ink-soft)" }}>↕</div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>
                Yenes (¥)
              </label>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {[1000, 5000, 10000, 50000, 100000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleYenChange(String(val))}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-all hover:bg-black/5"
                    style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--forest)" }}
                  >
                    {formatEs(val)} ¥
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={yenText}
                onChange={(e) => handleYenChange(e.target.value)}
                onBlur={() => setYenText(formatEs(Math.round(yenInput)))}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid var(--line)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink)",
                  background: "var(--paper-raised)",
                  fontVariantNumeric: "tabular-nums",
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
            💱 Tipo de cambio oficial obtenido en directo desde API pública (ExchangeRate-API). Si no hay cobertura en el metro o montaña, se utiliza automáticamente la última cotización guardada en el dispositivo.
          </p>
        </div>
      </div>
    </div>
  );
}
