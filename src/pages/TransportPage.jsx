import { days } from "../data/trip";
import { Train, Bus, Wallet } from "lucide-react";

// Extracted from trip.js — transport details per day
const transportData = {
  1: [
    { type: "train", text: "Narita Express (N'EX) → Estación de Tokio", cost: 19, detail: "1h exacta" },
    { type: "train", text: "Shinkansen Hikari → Kioto", cost: 90, detail: "2h 30m, lado derecho para ver Fuji" },
  ],
  2: [
    { type: "train", text: "Tren JR Nara Line (ida y vuelta Kioto-Nara)", cost: 5, detail: "45 min por sentido" },
  ],
  3: [
    { type: "bus", text: "Nohi Bus Kanazawa ↔ Shirakawa-go (reservar con antelación)", cost: 15, detail: "Asientos reservados" },
  ],
  6: [
    { type: "train", text: "Shinkansen Hokuriku → Kanazawa", cost: 45, detail: "2h 30m desde Kioto" },
  ],
  7: [
    { type: "bus", text: "Nohi Bus Kanazawa → Shirakawa-go → Takayama", cost: 20, detail: "Reservar semanas antes (temporada alta)" },
  ],
  8: [
    { type: "bus", text: "Nohi Bus Takayama → Magome (Nakasendo)", cost: 12, detail: "Ida" },
    { type: "service", text: "Mochila forwarding Magome ↔ Tsumago", cost: 5, detail: "~5€ (Tsumago)" },
  ],
  9: [
    { type: "train", text: "Shinkansen Tokaido → Tokio", cost: 95, detail: "4h desde Nagoya" },
  ],
};

const suicaInfo = {
  title: "Tarjeta Suica / Pasmo",
  description: "Tarjeta recargable para transporte público en Japón (trenes, metros, autobuses). Se puede comprar en cualquier estación o usar eSuica en el iPhone.",
  where: "Estaciones principales, máquinas expendedoras",
  initial: "Compra inicial: 2000 yen (1500 yen usables + 500 yen caución)",
  usage: "Descuenta automáticamente el coste de cada trayecto",
};

export default function TransportPage() {
  const tripsWithTransport = Object.keys(transportData).map(dayNum => {
    const day = days.find(d => d.num === parseInt(dayNum));
    return { day, transports: transportData[dayNum] };
  }).filter(item => item.day);

  const totalCost = Object.values(transportData).flat().reduce((sum, t) => sum + (t.cost || 0), 0);

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="mb-2">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Movimientos</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Transporte</h2>
      </div>

      {/* Suica info card */}
      <div className="rounded-2xl p-5 mb-8" style={{ background: "linear-gradient(135deg, #1d3557 0%, #0f1f35 100%)", color: "white" }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{suicaInfo.title}</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 12 }}>
          {suicaInfo.description}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Dónde comprar</p>
            <p style={{ fontSize: 12, fontWeight: 600 }}>{suicaInfo.where}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Coste inicial</p>
            <p style={{ fontSize: 12, fontWeight: 600 }}>{suicaInfo.initial}</p>
          </div>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            {suicaInfo.usage}
          </p>
        </div>
      </div>

      {/* Transport by day */}
      <div className="mb-6">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Trayectos por día</p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: 12,
          alignItems: "start",
        }}>
          {tripsWithTransport.map((item, idx) => (
            <div key={idx} className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
              {/* day header */}
              <div className="px-5 py-3.5 flex items-center gap-3"
                style={{ background: "var(--indigo)" }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 13, fontWeight: 700, color: "white",
                }}>
                  {item.day.num}
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>
                  {item.day.weekday} {item.day.num} sep <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>— {item.day.cities}</span>
                </p>
              </div>

              {/* transports */}
              {item.transports.map((t, ti) => (
                <div key={ti} className="px-5 py-3 flex gap-3"
                  style={{ borderTop: ti > 0 ? "1px solid var(--line)" : "none" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    background: t.type === "train" ? "rgba(29,53,87,0.1)" : t.type === "bus" ? "rgba(46,125,91,0.1)" : "rgba(201,162,39,0.1)",
                  }}>
                    {t.type === "train" && <Train size={16} style={{ color: "#1d3557" }} />}
                    {t.type === "bus" && <Bus size={16} style={{ color: "#2e7d5b" }} />}
                    {t.type === "service" && <Wallet size={16} style={{ color: "#c9a227" }} />}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
                      {t.text}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>{t.detail}</p>
                  </div>
                  {t.cost && (
                    <div style={{ textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--shu)" }}>{t.cost}€</p>
                      <p style={{ fontSize: 10, color: "var(--ink-soft)" }}>por persona</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Cost summary */}
      <div className="rounded-2xl p-5" style={{ background: "var(--indigo)", color: "white" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Transporte (sin JR Pass)</p>
        <p style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)" }}>{totalCost}€</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>
          Coste total por persona en transporte entre ciudades (no incluye tren dentro de cada ciudad).
        </p>
      </div>
    </div>
  );
}
