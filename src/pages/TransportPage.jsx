import { useContent, useT } from "../i18n/LanguageContext";
import { Train, Bus, Zap } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

// Determina el icono del trayecto.
// Se prioriza el campo estable `kind` del dato; el análisis del texto es
// sólo un respaldo para entradas antiguas que aún no lo tengan. Sin esto,
// al traducir la app los iconos serían incorrectos, porque la detección
// dependía de palabras en español ("Bala", "Operador Privado").
function iconKind(transport) {
  if (transport?.kind) return transport.kind;

  const type = transport?.type || "";
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
  const { transports, transportTotals, days } = useContent();
  const t = useT();
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
    return { badge: "~", title: t("transport.tokioDays"), sub: "Tokio" };
  }

  const savings = (transportTotals.real - transportTotals.jrPass).toFixed(1);

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("transport.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("transport.title")}</h2>
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
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{t("transport.icCardInfo")}</p>
            <p style={{ fontSize: 12, fontWeight: 600 }}>{t("transport.icCardInfo")}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{t("transport.icCardCostLabel")}</p>
            <p style={{ fontSize: 12, fontWeight: 600 }}>{t("transport.icCardCostValue")}</p>
          </div>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }} dangerouslySetInnerHTML={{ __html: t("transport.icCardWarning") }} />
        </div>
      </div>

      {/* Trayectos por día */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("transport.tripsByDay")}</p>
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
              {items.map((tItem, ti) => {
                const kind = iconKind(tItem);
                const jr = jrCoverage(tItem);
                return (
                  <Highlightable key={ti} id={slug("transport", tItem.day, tItem.name)}>
                    <div
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
                        {tItem.name}
                      </p>
                      <p style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>
                        {tItem.from} → {tItem.to}
                      </p>
                      {tItem.note && (
                        <p style={{ fontSize: 11, color: "var(--ink-soft)", fontStyle: "italic", marginTop: 3, lineHeight: 1.4 }}>
                          {tItem.note}
                        </p>
                      )}
                    </div>

                    <div style={{ textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--shu)" }}>
                        {tItem.real}€
                      </p>
                      {jr === "covered" && (
                        <p style={{ fontSize: 10, color: "#2e7d5b", fontWeight: 600 }}>{t("transport.jrPassCovered")}</p>
                      )}
                      {jr === "partial" && (
                        <p style={{ fontSize: 10, color: "#c9a227", fontWeight: 600 }}>{t("transport.jrPassPartial")}</p>
                      )}
                      {jr === "none" && (
                        <p style={{ fontSize: 10, color: "var(--ink-soft)" }}>{t("transport.jrPassNone")}</p>
                      )}
                    </div>
                  </div>
                  </Highlightable>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Cost summary & JR Pass evaluation */}
      <div className="rounded-2xl p-6 border mb-6" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📊</span>
          <h3 className="font-bold text-lg" style={{ color: "var(--ink)", margin: 0 }}>
            ¿Merece la pena el Japan Rail Pass (JR Pass)?
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl mb-4" style={{ background: "rgba(188,71,73,0.1)", border: "1px solid rgba(188,71,73,0.2)" }}>
          <span style={{ fontSize: 16 }}>❌</span>
          <p className="text-xs font-bold" style={{ color: "var(--shu)", margin: 0 }}>
            VERDICTO ACTUAL: NO MERECE LA PENA (Ahorramos ~48 € / 7.500 ¥ por persona)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Opción A: Billetes Sueltos (Recomendado)</p>
            <p className="text-2xl font-bold font-display" style={{ color: "var(--forest)", margin: 0 }}>
              ~293 € <span className="text-xs font-normal opacity-75">(~47.000 ¥)</span>
            </p>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Pagando solo los trayectos reales (N'EX, Shinkansen Hikari/Nozomi, Thunderbird, Hida Express). Permite usar los Shinkansen <strong>Nozomi</strong> (los más rápidos y frecuentes).
            </p>
          </div>

          <div className="p-4 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Opción B: JR Pass Nacional (7 días)</p>
            <p className="text-2xl font-bold font-display" style={{ color: "var(--shu)", margin: 0 }}>
              ~341 € <span className="text-xs font-normal opacity-75">(50.000 ¥)</span>
            </p>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Tras la subida de precios (+65%), el pass de 7 días cuesta 50.000 ¥ (~341 €). En nuestro itinerario <strong>perderíamos ~48 € por persona</strong> (~240 € en total para el grupo).
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-600 space-y-1.5 pl-2 border-l-2" style={{ borderColor: "var(--shu)" }}>
          <p>• <strong>Buses no cubiertos:</strong> Los autobuses Nohi Bus (Kanazawa → Shirakawa-go → Takayama) no están incluidos en el JR Pass (~39 € extra).</p>
          <p>• <strong>Transporte local:</strong> El metro de Tokio y el tranvía de Kioto tampoco entran en el JR Pass; se pagan con la tarjeta Suica (¥).</p>
        </div>
      </div>
    </div>
  );
}
