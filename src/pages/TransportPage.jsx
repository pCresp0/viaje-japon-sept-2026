import { transports, transportTotals, days } from "../data/trip";
import { Train, Bus, Zap } from "lucide-react";

// Determine icon based on transport type
function iconKind(type) {
  if (type === "Operador Privado (Bus)") return "bus";
  if (type.includes("Bala")) return "shinkansen";
  return "train";
}

// jrPass === 0  → JR Pass covers the full cost
// 0 < jrPass < real → partially covered (mixed JR + private leg)
// jrPass >= real  → not covered by JR Pass (private operator)
function jrCoverage(t) {
  if (t.jrPass === 0) return "covered";
  if (t.jrPass < t.real) return "partial";
  return "none";
}

export default function TransportPage() {
  // Group transports by day key, preserving insertion order
  const seenKeys = [];
  const groups = {};
  for (const t of transports) {
    const k = String(t.day);
    if (!groups[k]) { groups[k] = []; seenKeys.push(k); }
    groups[k].push(t);
  }

  function headerFor(key) {
    const n = parseInt(key);
    if (!isNaN(n)) {
      const d = days.find(day => day.num === n);
      if (d) {
        const calDay = parseInt(d.date.slice(8));
        return { badge: String(n), title: `${d.weekday} ${calDay} sept`, sub: d.cities };
      }
    }
    // "10-14" range entry
    return { badge: "~", title: "Días 10–14 · 16-20 sept", sub: "Tokio" };
  }

  const savings = (transportTotals.real - transportTotals.jrPass).toFixed(1);

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Movimientos</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Transporte</h2>
      </div>

      {/* Suica card */}
      <div className="rounded-2xl p-5 mb-8" style={{ background: "linear-gradient(135deg, #1d3557 0%, #0f1f35 100%)", color: "white" }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>Tarjeta Suica / Pasmo</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 12 }}>
          Tarjeta recargable para trenes, metro y autobuses en Japón. Se puede comprar en estaciones principales o añadir eSuica al iPhone desde España.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Dónde comprar</p>
            <p style={{ fontSize: 12, fontWeight: 600 }}>Estaciones principales, máquinas expendedoras</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Coste inicial</p>
            <p style={{ fontSize: 12, fontWeight: 600 }}>2 000 yen · (1 500 usables + 500 caución)</p>
          </div>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            Operadores privados (metro local, tranvía Randen, Yurikamome, Nohi Bus) <strong>no</strong> están cubiertos por el JR Pass.
          </p>
        </div>
      </div>

      {/* Trayectos por día */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Trayectos por día</p>
      <div
        className="mb-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: 12,
          alignItems: "start",
        }}
      >
        {seenKeys.map(key => {
          const { badge, title, sub } = headerFor(key);
          const items = groups[key];

          return (
            <div
              key={key}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
            >
              {/* Day header */}
              <div className="px-5 py-3.5 flex items-center gap-3" style={{ background: "var(--indigo)" }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "white",
                }}>
                  {badge}
                </div>
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>
                    {title}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                    {sub}
                  </p>
                </div>
              </div>

              {/* Transport rows */}
              {items.map((t, ti) => {
                const kind = iconKind(t.type);
                const jr = jrCoverage(t);
                return (
                  <div
                    key={ti}
                    className="px-5 py-3 flex gap-3 items-center"
                    style={{ borderTop: ti > 0 ? "1px solid var(--line)" : "none" }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background:
                        kind === "bus" ? "rgba(46,125,91,0.1)"
                        : kind === "shinkansen" ? "rgba(188,71,73,0.1)"
                        : "rgba(29,53,87,0.1)",
                    }}>
                      {kind === "train" && <Train size={16} style={{ color: "#1d3557" }} />}
                      {kind === "bus" && <Bus size={16} style={{ color: "#2e7d5b" }} />}
                      {kind === "shinkansen" && <Zap size={16} style={{ color: "#bc4749" }} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 1 }}>
                        {t.name}
                      </p>
                      <p style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
                        {t.from} → {t.to}
                      </p>
                      {t.note && (
                        <p style={{ fontSize: 11, color: "var(--ink-soft)", fontStyle: "italic", marginTop: 3, lineHeight: 1.4 }}>
                          {t.note}
                        </p>
                      )}
                    </div>

                    <div style={{ textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--shu)" }}>
                        {t.real}€
                      </p>
                      {jr === "covered" && (
                        <p style={{ fontSize: 10, color: "#2e7d5b", fontWeight: 600 }}>JR Pass ✓</p>
                      )}
                      {jr === "partial" && (
                        <p style={{ fontSize: 10, color: "#c9a227", fontWeight: 600 }}>JR parcial</p>
                      )}
                      {jr === "none" && (
                        <p style={{ fontSize: 10, color: "var(--ink-soft)" }}>Op. privado</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Cost summary with JR Pass comparison */}
      <div className="rounded-2xl p-5" style={{ background: "var(--indigo)", color: "white" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Coste total de transporte · por persona
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Sin JR Pass</p>
            <p style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)", margin: 0 }}>
              {transportTotals.real}€
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Con JR Pass</p>
            <p style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)", margin: 0 }}>
              {transportTotals.jrPass}€
            </p>
          </div>
        </div>
        <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
            El JR Pass cubre <strong>{savings}€/persona</strong> en trayectos JR, pero el propio pass cuesta ~300–350€.
            Con este itinerario <strong>no sale a cuenta</strong> comprarlo. Pendiente confirmación final.
          </p>
        </div>
      </div>
    </div>
  );
}
