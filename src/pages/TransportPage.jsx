import { useContent, useT } from "../i18n/LanguageContext";
import { Train, Bus, Zap, FileDown, CheckCircle2, Clock } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { exportTransportExcel } from "../utils/exportCsv";

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

// jrCoverage determines if a transport is covered by JR Pass
function jrCoverage(t) {
  if (t.coverage === "jr") return "covered";
  return "none";
}

export default function TransportPage({ onNavigate }) {
  const { transports, days } = useContent();
  const t = useT();
  // Group transports by day key, preserving insertion order
  const seenKeys = [];
  const groups = {};
  for (const item of transports) {
    const k = String(item.day);
    if (!groups[k]) { groups[k] = []; seenKeys.push(k); }
    groups[k].push(item);
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

  function handleTransportClick(tItem) {
    if (!onNavigate || isNaN(parseInt(tItem.day))) return;
    const dayNum = parseInt(tItem.day);
    onNavigate({ tab: "itinerario", day: dayNum, targetId: slug("itinerary-day", dayNum) });
  }

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("transport.eyebrow")}</p>
          <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("transport.title")}</h2>
        </div>
        <button
          onClick={() => exportTransportExcel(transports)}
          className="shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold shadow-sm"
          style={{ background: "var(--indigo)", color: "white", border: "none" }}
        >
          <FileDown size={14} />
          Descargar Excel
        </button>
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
                const isClickable = onNavigate && !isNaN(parseInt(tItem.day));
                
                return (
                  <Highlightable key={ti} id={slug("transport", tItem.day, tItem.name)}>
                    <div
                      onClick={() => handleTransportClick(tItem)}
                      className={`px-5 py-3 flex gap-3 items-center relative ${isClickable ? "cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors" : ""}`}
                      style={{ borderTop: ti > 0 ? "1px solid var(--line)" : "none" }}
                    >
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: "rgba(0,0,0,0.04)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--ink)", flexShrink: 0,
                    }}>
                      {kind === "shinkansen" ? <Zap size={14} /> : kind === "bus" ? <Bus size={14} /> : <Train size={14} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                          {tItem.name}
                        </p>
                        {tItem.purchased !== undefined && (
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            tItem.purchased ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                          }`}>
                            {tItem.purchased ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                            {tItem.purchased ? "COMPRADO" : "PENDIENTE"}
                          </span>
                        )}
                      </div>
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
                        {tItem.jpy ? `¥${tItem.jpy.toLocaleString("es-ES")}` : `${tItem.real}€`}
                      </p>
                      {jr === "covered" && (
                        <p style={{ fontSize: 10, color: "#2e7d5b", fontWeight: 600 }}>{t("transport.jrPassCovered")}</p>
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
          <p className="text-sm font-bold" style={{ color: "var(--shu)", margin: 0 }}>
            VERDICTO: NO COMPENSA COMPRAR EL JAPAN RAIL PASS NACIONAL.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">✅ El JR Pass SÍ cubre:</p>
            <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc marker:text-green-600">
              <li>Trenes JR incluidos en la red nacional.</li>
              <li>Shinkansen Hikari, Kodama, Sakura, Tsubame.</li>
              <li>Limited Express JR.</li>
              <li>Trenes locales JR.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">❌ El JR Pass NO cubre:</p>
            <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc marker:text-red-600">
              <li>Nohi Bus.</li>
              <li>Metro de Kioto y Autobuses urbanos.</li>
              <li>Randen y Yurikamome.</li>
              <li>Metro de Tokio y otros operadores privados.</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border mb-6" style={{ background: "#FFF5F5", borderColor: "#FCA5A5" }}>
          <p className="text-sm font-bold text-red-800 mb-1 flex items-center gap-1.5">
            <span className="text-base">⚠️</span> IMPORTANTE SOBRE NOZOMI
          </p>
          <p className="text-xs text-red-700 leading-relaxed">
            El tren bala más rápido (Nozomi) <strong>NO está incluido</strong> normalmente en el JR Pass. Para usarlo con el JR Pass hay que pagar un "Ticket Especial" adicional cada vez. Comprando billetes individuales SÍ podemos subir al Nozomi sin problema.
          </p>
        </div>

        <p className="text-sm font-bold mb-3" style={{ color: "var(--indigo)" }}>Comparativa de Precios (Billetes JR vs JR Pass)</p>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--line)" }}>
                <th className="py-2 px-3 font-semibold text-gray-600">Opción</th>
                <th className="py-2 px-3 font-semibold text-gray-600">Precio/Persona</th>
                <th className="py-2 px-3 font-semibold text-gray-600">Precio 5 Personas</th>
                <th className="py-2 px-3 font-semibold text-gray-600">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: "var(--line)" }}>
                <td className="py-2 px-3 font-medium">Billetes individuales JR</td>
                <td className="py-2 px-3 text-green-700 font-bold">~¥54.920</td>
                <td className="py-2 px-3 text-green-700 font-bold">~¥274.600</td>
                <td className="py-2 px-3 font-medium text-green-700">✅ Recomendado</td>
              </tr>
              <tr className="border-b bg-gray-50/50" style={{ borderColor: "var(--line)" }}>
                <td className="py-2 px-3">JR Pass 7 días</td>
                <td className="py-2 px-3 text-red-600">¥50.000</td>
                <td className="py-2 px-3 text-red-600">¥250.000</td>
                <td className="py-2 px-3 text-red-600">❌ No compensa *</td>
              </tr>
              <tr className="border-b bg-gray-50/50" style={{ borderColor: "var(--line)" }}>
                <td className="py-2 px-3">JR Pass 14 días</td>
                <td className="py-2 px-3 text-red-600">¥80.000</td>
                <td className="py-2 px-3 text-red-600">¥400.000</td>
                <td className="py-2 px-3 text-red-600">❌ No compensa</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="py-2 px-3">JR Pass 21 días</td>
                <td className="py-2 px-3 text-red-600">¥100.000</td>
                <td className="py-2 px-3 text-red-600">¥500.000</td>
                <td className="py-2 px-3 text-red-600">❌ No compensa</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-xs text-gray-700 space-y-3 mb-6 leading-relaxed">
          <p>
            * <strong>¿Por qué ni siquiera el de 7 días compensa?</strong> He comparado las opciones con nuestros trayectos reales. La ventana de 7 días más favorable para nosotros sería del 9 al 15 de septiembre. Esta ventana concentra los trayectos <em>Kioto→Kanazawa (¥7.720)</em>, <em>Kioto→Osaka (¥1.160)</em>, otros JR locales (¥240), <em>Nakatsugawa→Nagoya (¥3.070)</em> y <em>Nagoya→Tokio (¥11.300)</em>.
          </p>
          <p>
            Incluso agrupando estos desplazamientos en la ventana de 7 días más favorable, el coste de los billetes JR individuales queda en <strong>~¥23.490</strong>, muy por debajo de los <strong>¥50.000</strong> por persona del pase. Por tanto, el JR Pass no se amortiza en absoluto.
          </p>
          <p>
            Además, una parte importante de nuestro itinerario utiliza operadores que no están incluidos en el JR Pass, especialmente Nohi Bus, metro de Kioto, Randen, Yurikamome y metro de Tokio. Estos habría que pagarlos aparte de todos modos. Comprar billetes individuales también nos permite utilizar Nozomi sin pagar el suplemento especial.
          </p>
          <p className="italic text-gray-500 pt-1 border-t" style={{ borderColor: "var(--line)" }}>
            Nota: Si durante el viaje gastamos "X" en transporte total, eso NO significa que el JR Pass se compare directamente con ese total, porque una parte importante del transporte no está cubierta por el Pass. Los cálculos en euros son aproximados y dependen del tipo de cambio. El hecho de ser 5 personas NO hace que el JR Pass sea más rentable (el precio se multiplica por 5 igual).
          </p>
        </div>

        <div className="p-4 rounded-xl border bg-indigo-50/30 mb-6" style={{ borderColor: "var(--indigo)" }}>
          <p className="text-sm font-bold mb-2 flex items-center gap-1.5" style={{ color: "var(--indigo)" }}>
            <span className="text-base">✅</span> RECOMENDACIÓN FINAL
          </p>
          <ul className="text-xs text-gray-800 space-y-2 pl-2">
            <li>• <strong>No comprar Japan Rail Pass.</strong></li>
            <li>• Comprar billetes individuales para los trayectos largos y utilizar Suica/PASMO para el transporte urbano.</li>
            <li>• Reservar por adelantado únicamente los trenes en los que realmente queramos asiento asegurado.</li>
            <li>• Somos 5 adultos. Para nosotros es especialmente recomendable reservar juntos los trenes de larga distancia por adelantado para intentar conseguir asientos próximos.</li>
            <li>• Los transportes privados/locales se compran según corresponda: Nohi Bus online, Randen/metro/buses locales en Japón con Suica.</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fuentes Oficiales</p>
          <div className="flex flex-col gap-1 text-[11px]">
            <a href="https://japanrailpass.net/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Japan Rail Pass Oficial</a>
            <a href="https://japanrailpass.net/purchase/price/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Precios Oficiales JR Pass</a>
            <a href="https://japanrailpass.net/en/about_jrp/route/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Cobertura Oficial JR Pass</a>
            <a href="https://global.jr-central.co.jp/en/onlinebooking/contents/jrp_nozomi/index.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Información Nozomi + JR Pass</a>
            <a href="https://smart-ex.jp/en/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Smart EX (Reservas Shinkansen)</a>
          </div>
        </div>
      </div>
    </div>
  );
}
