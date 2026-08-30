import { useState } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Train, Bus, Zap, FileDown, CheckCircle2, Clock, AlertCircle, Smartphone, CreditCard, ChevronDown } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { exportTransportExcel } from "../utils/exportCsv";
import ShinkansenTicketCard from "../components/ShinkansenTicketCard";
import ThunderbirdTicketCard from "../components/ThunderbirdTicketCard";
import NohiMagomeTicketCard from "../components/NohiMagomeTicketCard";
import ShinanoTicketCard from "../components/ShinanoTicketCard";
import NozomiNagoyaTicketCard from "../components/NozomiNagoyaTicketCard";

function iconKind(transport) {
  if (transport?.kind) return transport.kind;
  const type = transport?.type || "";
  if (type === "Operador Privado (Bus)") return "bus";
  if (type.includes("Bala")) return "shinkansen";
  return "train";
}

export default function TransportPage({ onNavigate }) {
  const { transports, days, blocks } = useContent();
  const t = useT();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const [jrPassOpen, setJrPassOpen] = useState(false);

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
        const block = blockById[d.block];
        return {
          badge: String(n),
          title: `${d.weekday} ${calDay} sept`,
          sub: d.cities,
          color: block?.color || "var(--indigo)",
        };
      }
    }
    return { badge: "~", title: t("transport.tokioDays"), sub: "Tokio", color: blockById.tokio?.color || "var(--indigo)" };
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
          className="shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: "var(--indigo)", color: "white", border: "none" }}
        >
          <FileDown size={14} />
          Descargar Excel
        </button>
      </div>

      {/* 1. BILLETES CONFIRMADOS — lo más importante, arriba del todo */}
      <div className="mb-8">
        <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Billetes confirmados</p>
        <ShinkansenTicketCard
          onGoToDay={onNavigate ? () => onNavigate({ tab: "itinerario", day: 1, targetId: slug("itinerary-day", 1) }) : undefined}
        />
        <ThunderbirdTicketCard
          onGoToDay={onNavigate ? () => onNavigate({ tab: "itinerario", day: 6, targetId: slug("itinerary-day", 6) }) : undefined}
        />
        <NohiMagomeTicketCard
          onGoToDay={onNavigate ? () => onNavigate({ tab: "itinerario", day: 8, targetId: slug("itinerary-day", 8) }) : undefined}
        />
        <ShinanoTicketCard
          onGoToDay={onNavigate ? () => onNavigate({ tab: "itinerario", day: 9, targetId: slug("itinerary-day", 9) }) : undefined}
        />
        <NozomiNagoyaTicketCard
          onGoToDay={onNavigate ? () => onNavigate({ tab: "itinerario", day: 9, targetId: slug("itinerary-day", 9) }) : undefined}
        />
      </div>

      {/* 2. RESUMEN VISUAL DE ESTADO DE TRANSPORTES */}
      <div className="rounded-2xl p-5 mb-8 border" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
        <p className="font-display text-base font-bold flex items-center gap-2 mb-3" style={{ color: "var(--indigo)" }}>
          <span>🚆</span> TRANSPORTES — ESTADO GENERAL (5 ADULTOS)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border bg-green-50/50 border-green-200">
            <p className="text-xs font-bold text-green-800 flex items-center gap-1 mb-2">
              <CheckCircle2 size={14} /> ✅ COMPRADOS
            </p>
            <ul className="text-xs text-green-900 space-y-1.5">
              <li>• <strong>Nozomi 53</strong> Shinagawa → Kioto (7 sep, 17:19 · Coche 13)</li>
              <li>• <strong>Thunderbird + Kagayaki</strong> Kioto → Kanazawa (12 sep, 08:10)</li>
              <li>• <strong>Nohi Bus</strong> Kanazawa → Shirakawa-go (13 sep, 08:40)</li>
              <li>• <strong>Nohi Bus</strong> Shirakawa-go → Takayama (13 sep, 13:15)</li>
              <li>• <strong>Nohi Bus</strong> Takayama → Magome (14 sep, 08:00 · Car 01 · Asientos: 2C, 2D, 3B, 3C, 3D)</li>
              <li>• <strong>Shinano 4</strong> Nakatsugawa → Nagoya (15 sep, 09:57 · Car 4 · Res. 42093 · 🎫 recoger físicos)</li>
              <li>• <strong>Nozomi 358</strong> Nagoya → Tokio (15 sep, 11:29 · Car 12 · Smart EX 2002 · QR-Ticket)</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl border bg-red-50/50 border-red-200">
            <p className="text-xs font-bold text-red-800 flex items-center gap-1 mb-2">
              <AlertCircle size={14} /> 🔴 RESERVAR AHORA
            </p>
            <ul className="text-xs text-red-900 space-y-1.5">
              <li>• <strong>Shinkansen Fuji</strong> (20 sep, 07:27 · Smart EX · salida hotel recomendada ~06:30)</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl border bg-amber-50/50 border-amber-200">
            <p className="text-xs font-bold text-amber-800 flex items-center gap-1 mb-2">
              <Clock size={14} /> 🟠 RESERVAR MÁS ADELANTE
            </p>
            <ul className="text-xs text-amber-900 space-y-1.5">
              <li>• <strong>Keisei Skyliner / N'EX Vuelta</strong> Tokio → Narita (21 sep · Valorar Skyliner desde Keisei-Ueno vs N'EX)</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl border bg-slate-50/80 border-slate-200">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-2">
              <CreditCard size={14} /> 🟢 COMPRAR EN JAPÓN
            </p>
            <ul className="text-xs text-slate-800 space-y-1.5">
              <li>• <strong>N'EX Ida</strong> Narita → Shinagawa (comprar al aterrizar)</li>
              <li>• <strong>Transportes locales</strong> con Suica / Efectivo según operador</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. BLOQUE OFICIAL WELCOME SUICA / TARJETAS IC */}
      <div className="rounded-2xl p-5 mb-8" style={{ background: "linear-gradient(135deg, #1d3557 0%, #0f1f35 100%)", color: "white" }}>
        <div className="flex items-center gap-2 mb-2">
          <CreditCard size={18} className="text-emerald-400" />
          <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Tarjeta Welcome Suica / Tarjetas IC</p>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 12 }}>
          Tarjeta de transporte y monedero electrónico para trenes locales, metro, autobuses urbanos y compras compatibles en todo Japón.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
            <p className="text-xs font-bold text-emerald-300 flex items-center gap-1 mb-1.5">
              <Smartphone size={14} /> 📱 iPhone (Welcome Suica Mobile)
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              Descargar la app oficial <strong>Welcome Suica Mobile</strong> e integrarla en Apple Wallet con tarjeta en Apple Pay. Requiere activar localización. <em>Nota: Si existen restricciones de emisión/recarga desde España por la ubicación, se puede crear y recargar directamente al aterrizar en Japón.</em>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
            <p className="text-xs font-bold text-amber-300 flex items-center gap-1 mb-1.5">
              <CreditCard size={14} /> 🤖 Android extranjero (Welcome Suica Física)
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              La app Welcome Suica Mobile no está disponible para Android extranjero. El hermano con Android puede comprar la <strong>Welcome Suica física</strong> al llegar a los puntos autorizados de JR East en Narita (T1 o T2/3).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/80 pt-3 border-t border-white/15">
          <div>
            <p className="font-semibold text-white mb-0.5">💰 Sin depósito</p>
            <p className="text-white/70">No requiere los ¥500 de fianza de la tarjeta clásica.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-0.5">⚠️ No reembolsable</p>
            <p className="text-white/70">El saldo restante no se devuelve. No cargar importes excesivos.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-0.5">💳 Recarga recomendada</p>
            <p className="text-white/70">Iniciar con ¥3.000–¥5.000/persona y recargar según necesidad.</p>
          </div>
        </div>
      </div>

      {/* 4. POLÍTICA DE CAMBIOS SHINKANSEN SMART EX */}
      <div className="rounded-2xl p-4 mb-8 border" style={{ background: "rgba(29, 53, 87, 0.03)", borderColor: "var(--line)" }}>
        <p className="text-sm font-bold flex items-center gap-1.5 mb-2" style={{ color: "var(--indigo)" }}>
          <Zap size={16} /> Política de Cambios en Shinkansen (Smart EX)
        </p>
        <p className="text-xs text-gray-700 leading-relaxed mb-2">
          Las reservas de Shinkansen realizadas por <strong>Smart EX</strong> permiten modificaciones online sin coste antes de la salida (hasta 4 minutos antes de la salida programada, siempre que no se haya accedido al torno con QR ni impreso el billete físico, y sujeto a plazas disponibles).
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          💡 <strong>Plan de conexión Día 1 (Nozomi 53):</strong> Si el vuelo o el N'EX sufren un retraso severo y peligra la llegada a Shinagawa antes de las 17:19, se debe acceder a Smart EX (App / Web) <em>antes</em> de la salida del tren para cambiar los billetes al siguiente Nozomi disponible.
        </p>
      </div>

      {/* 5. TRAYECTOS POR DÍA */}
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
          const { badge, title, sub, color } = headerFor(key);
          const items = groups[key];

          return (
            <div
              key={key}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
            >
              {/* Day header — color del bloque (Kioto / Alpes / Tokio) */}
              <div className="px-5 py-3.5 flex items-center gap-3" style={{ background: color }}>
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
                const isClickable = onNavigate && !isNaN(parseInt(tItem.day));
                const suicaCat = tItem.suicaCategory || (tItem.suica ? "yes" : "no");
                
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
                        {tItem.purchased ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle2 size={10} />
                            COMPRADO
                          </span>
                        ) : tItem.advance ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                            <Clock size={10} />
                            COMPRAR ADELANTADO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            <Clock size={10} />
                            COMPRAR ALLÍ
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
                        {tItem.jpy ? `¥${tItem.jpy.toLocaleString("es-ES")} (~${tItem.real}€)` : `${tItem.real}€`}
                      </p>
                      <div className="mt-1">
                        {suicaCat === "yes" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            🟢 Suica: SÍ
                          </span>
                        )}
                        {suicaCat === "partial" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            🟡 Suica: PARCIAL
                          </span>
                        )}
                        {suicaCat === "no" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            🔴 Suica: NO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  </Highlightable>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* 6. ANÁLISIS DE COSTE & JAPAN RAIL PASS */}
      <div className="rounded-2xl border mb-6 overflow-hidden" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
        <button
          type="button"
          onClick={() => setJrPassOpen(!jrPassOpen)}
          className="w-full text-left p-5 sm:p-6 cursor-pointer border-none bg-transparent transition-colors hover:bg-black/[0.02]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📊</span>
                <h3 className="font-bold text-lg m-0" style={{ color: "var(--ink)" }}>
                  ¿Merece la pena el Japan Rail Pass (JR Pass)?
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl" style={{ background: "rgba(188,71,73,0.1)", border: "1px solid rgba(188,71,73,0.2)" }}>
                <span style={{ fontSize: 16 }}>❌</span>
                <p className="text-sm font-bold m-0" style={{ color: "var(--shu)" }}>
                  VEREDICTO: NO COMPENSA COMPRAR EL JAPAN RAIL PASS NACIONAL.
                </p>
              </div>
            </div>
            <ChevronDown
              size={22}
              className={`shrink-0 transition-transform ${jrPassOpen ? "rotate-180" : ""}`}
              style={{ color: "var(--ink-soft)", marginTop: 4 }}
            />
          </div>
        </button>

        {jrPassOpen && (
        <div className="px-5 sm:px-6 pb-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">✅ El JR Pass SÍ cubre:</p>
            <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc marker:text-green-600">
              <li>Trenes JR incluidos en la red nacional.</li>
              <li>Shinkansen Hikari, Kodama, Sakura, Tsubame.</li>
              <li>Limited Express JR (ej. Shinano, Thunderbird).</li>
              <li>Trenes locales JR (ej. Línea Nara, Línea San-In).</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">❌ El JR Pass NO cubre:</p>
            <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc marker:text-red-600">
              <li>Nohi Bus (Kanazawa → Shirakawa-go → Takayama → Magome).</li>
              <li>Metro de Kioto y Autobuses urbanos.</li>
              <li>Tranvía Randen y tren elevado Yurikamome.</li>
              <li>Metro de Tokio (Tokyo Metro y Toei Subway).</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border mb-6" style={{ background: "#FFF5F5", borderColor: "#FCA5A5" }}>
          <p className="text-sm font-bold text-red-800 mb-1 flex items-center gap-1.5">
            <span className="text-base">⚠️</span> IMPORTANTE SOBRE NOZOMI
          </p>
          <p className="text-xs text-red-700 leading-relaxed">
            El tren bala más rápido (Nozomi) <strong>NO está incluido</strong> directamente en el JR Pass y exige pagar un billete complementario costoso. Comprando billetes individuales SÍ podemos subir al Nozomi directamente reservando por Smart EX.
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
                <td className="py-2 px-3 text-red-600">❌ No compensa</td>
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
            * <strong>¿Por qué no compensa?</strong> Agrupando todos los trayectos JR de la semana más densa (Kioto → Kanazawa, Kioto → Osaka, Nakatsugawa → Nagoya y Nagoya → Tokio), el coste individual suma aproximadamente <strong>~¥23.490</strong> por persona, muy por debajo de los <strong>¥50.000</strong> que cuesta el pase de 7 días.
          </p>
          <p>
            Además, una parte importante de nuestro itinerario utiliza operadores privados no incluidos (Nohi Bus, metro de Kioto, Randen, Yurikamome y metro de Tokio), los cuales habría que pagar aparte de todos modos.
          </p>
          <p className="italic text-gray-500 pt-1 border-t" style={{ borderColor: "var(--line)" }}>
            Nota: El precio del pase nacional se multiplica por viajero exactamente igual que los billetes individuales, por lo que viajar en grupo de 5 personas no cambia la ecuación de ahorro.
          </p>
        </div>

        <div className="p-4 rounded-xl border bg-indigo-50/30 mb-6" style={{ borderColor: "var(--indigo)" }}>
          <p className="text-sm font-bold mb-2 flex items-center gap-1.5" style={{ color: "var(--indigo)" }}>
            <span className="text-base">✅</span> RECOMENDACIÓN FINAL
          </p>
          <ul className="text-xs text-gray-800 space-y-2 pl-2">
            <li>• <strong>No comprar Japan Rail Pass.</strong></li>
            <li>• Comprar billetes individuales para los trayectos de larga distancia (Smart EX para Shinkansen y JR-West Online para Kioto–Kanazawa).</li>
            <li>• Utilizar Suica / Welcome Suica para todo el transporte urbano de Kioto, Osaka y Tokio.</li>
            <li>• Reservar por adelantado únicamente los trenes/buses que requieran asiento garantizado para los 5 viajeros.</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fuentes Oficiales</p>
          <div className="flex flex-col gap-1 text-[11px]">
            <a href="https://japanrailpass.net/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Japan Rail Pass Oficial</a>
            <a href="https://smart-ex.jp/en/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Smart EX (Tokaido / Sanyo / Kyushu Shinkansen)</a>
            <a href="https://www.westjr.co.jp/global/en/ticket/overview/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">JR-West Online Train Reservation (Thunderbird + Hokuriku Shinkansen)</a>
            <a href="https://www.jreast.co.jp/multi/en/welcomesuica/welcomesuica.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">JR East Welcome Suica Oficial</a>
            <a href="https://www.nouhibus.co.jp/highwaybus/highwaybus_route/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Nohi Bus Oficial</a>
          </div>
        </div>
        </div>
        )}
      </div>
    </div>
  );
}

