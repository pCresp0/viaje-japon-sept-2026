import { useState } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Train, Bus, Zap, FileDown, CheckCircle2, Clock, AlertCircle, Smartphone, CreditCard, ChevronDown } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { exportTransportExcel } from "../utils/exportCsv";
import { formatEur, formatJpy, formatJpyEur, formatGroupJpyEur, jpyToEur, YEN_PER_EUR } from "../utils/money";
import ShinkansenTicketCard from "../components/ShinkansenTicketCard";
import ThunderbirdTicketCard from "../components/ThunderbirdTicketCard";
import NohiMagomeTicketCard from "../components/NohiMagomeTicketCard";
import ShinanoTicketCard from "../components/ShinanoTicketCard";
import NozomiNagoyaTicketCard from "../components/NozomiNagoyaTicketCard";

const PEOPLE = 5;
const PASS_7 = 50000;
const PASS_14 = 80000;
const PASS_21 = 100000;

function iconKind(transport) {
  if (transport?.kind) return transport.kind;
  const type = transport?.type || "";
  if (type === "Operador Privado (Bus)") return "bus";
  if (type.includes("Bala")) return "shinkansen";
  return "train";
}

function isJrPassCovered(t) {
  if (typeof t.jrPassCovered === "boolean") return t.jrPassCovered;
  return t.coverage === "jr" && !/nozomi/i.test(t.name || "");
}

function isNozomi(t) {
  return /nozomi/i.test(t.name || "");
}

export default function TransportPage({ onNavigate }) {
  const { transports, days, blocks } = useContent();
  const t = useT();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const [jrPassOpen, setJrPassOpen] = useState(false);
  const [suicaOpen, setSuicaOpen] = useState(false);
  const [smartExOpen, setSmartExOpen] = useState(false);

  const sumJpy = (arr) => arr.reduce((s, x) => s + (x.jpy || 0), 0);
  const sumEur = (arr) => arr.reduce((s, x) => s + (x.real || 0), 0);

  const purchased = transports.filter((x) => x.purchased);
  const pending = transports.filter((x) => !x.purchased);
  const jrCoveredPurchased = purchased.filter(isJrPassCovered);
  const jrCoveredEstimated = pending.filter(isJrPassCovered);
  const nozomiPurchased = purchased.filter(isNozomi);
  const nonJrAll = transports.filter((x) => !isJrPassCovered(x) && !isNozomi(x));
  const nonJrPurchased = nonJrAll.filter((x) => x.purchased);
  const nonJrPending = nonJrAll.filter((x) => !x.purchased);

  const coveredBoughtJpy = sumJpy(jrCoveredPurchased);
  const coveredBoughtEur = sumEur(jrCoveredPurchased);
  const coveredEstJpy = sumJpy(jrCoveredEstimated);
  const coveredEstEur = sumEur(jrCoveredEstimated);
  const coveredTotalJpy = coveredBoughtJpy + coveredEstJpy;
  const coveredTotalEur = coveredBoughtEur + coveredEstEur;
  const nozomiJpy = sumJpy(nozomiPurchased);
  const nozomiEur = sumEur(nozomiPurchased);
  const nonJrJpy = sumJpy(nonJrAll);
  const nonJrEur = sumEur(nonJrAll);
  const nonJrBoughtJpy = sumJpy(nonJrPurchased);
  const nonJrBoughtEur = sumEur(nonJrPurchased);
  const nonJrPendJpy = sumJpy(nonJrPending);
  const nonJrPendEur = sumEur(nonJrPending);

  const paidJpy = sumJpy(purchased);
  const paidEur = sumEur(purchased);
  const pendingJpy = sumJpy(pending);
  const pendingEur = sumEur(pending);
  const allJpy = paidJpy + pendingJpy;
  const allEur = paidEur + pendingEur;

  // Escenarios totales /pax (transporte completo del viaje)
  const individualTotalJpy = allJpy;
  const individualTotalEur = allEur;
  const withPass7Jpy = PASS_7 + nozomiJpy + nonJrJpy;
  const withPass7Eur = jpyToEur(PASS_7) + nozomiEur + nonJrEur;
  const withPass14Jpy = PASS_14 + nozomiJpy + nonJrJpy;
  const withPass14Eur = jpyToEur(PASS_14) + nozomiEur + nonJrEur;
  const saveVs7Jpy = withPass7Jpy - individualTotalJpy;
  const saveVs7Eur = withPass7Eur - individualTotalEur;
  const saveVs14Jpy = withPass14Jpy - individualTotalJpy;
  const saveVs14Eur = withPass14Eur - individualTotalEur;
  const saveCoveredOnlyJpy = PASS_7 - coveredTotalJpy;
  const saveCoveredOnlyEur = jpyToEur(PASS_7) - coveredTotalEur;

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
      <div className="rounded-2xl mb-5 overflow-hidden" style={{ background: "linear-gradient(135deg, #1d3557 0%, #0f1f35 100%)", color: "white" }}>
        <button
          type="button"
          onClick={() => setSuicaOpen(!suicaOpen)}
          className="w-full text-left p-5 border-none cursor-pointer bg-transparent text-white"
        >
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-emerald-400 shrink-0" />
            <p style={{ fontSize: 16, fontWeight: 700, margin: 0 }} className="flex-1">Tarjeta Welcome Suica / Tarjetas IC</p>
            <ChevronDown
              size={20}
              className={`shrink-0 transition-transform ${suicaOpen ? "rotate-180" : ""}`}
              style={{ color: "rgba(255,255,255,0.8)" }}
            />
          </div>
          {!suicaOpen && (
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: "8px 0 0", lineHeight: 1.45 }}>
              iPhone: Welcome Suica Mobile · Android: física en Narita · recarga ¥3.000–¥5.000 (~16–27€)
            </p>
          )}
        </button>
        {suicaOpen && (
        <div className="px-5 pb-5">
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
            <p className="text-white/70">No requiere los ¥500 (~3€) de fianza de la tarjeta clásica.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-0.5">⚠️ No reembolsable</p>
            <p className="text-white/70">El saldo restante no se devuelve. No cargar importes excesivos.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-0.5">💳 Recarga recomendada</p>
            <p className="text-white/70">Iniciar con ¥3.000–¥5.000 (~16–27€)/persona y recargar según necesidad.</p>
          </div>
        </div>
        </div>
        )}
      </div>

      {/* 4. POLÍTICA DE CAMBIOS SHINKANSEN SMART EX */}
      <div className="rounded-2xl mb-8 border overflow-hidden" style={{ background: "rgba(29, 53, 87, 0.03)", borderColor: "var(--line)" }}>
        <button
          type="button"
          onClick={() => setSmartExOpen(!smartExOpen)}
          className="w-full text-left px-4 py-3.5 border-none cursor-pointer bg-transparent flex items-center gap-2"
        >
          <Zap size={16} style={{ color: "var(--indigo)" }} />
          <p className="text-sm font-bold flex-1 m-0" style={{ color: "var(--indigo)" }}>
            Política de Cambios en Shinkansen (Smart EX)
          </p>
          <ChevronDown
            size={18}
            className={`shrink-0 transition-transform ${smartExOpen ? "rotate-180" : ""}`}
            style={{ color: "var(--ink-soft)" }}
          />
        </button>
        {smartExOpen && (
        <div className="px-4 pb-4">
        <p className="text-xs text-gray-700 leading-relaxed mb-2">
          Las reservas de Shinkansen realizadas por <strong>Smart EX</strong> permiten modificaciones online sin coste antes de la salida (hasta 4 minutos antes de la salida programada, siempre que no se haya accedido al torno con QR ni impreso el billete físico, y sujeto a plazas disponibles).
        </p>
        <p className="text-xs text-gray-600 leading-relaxed m-0">
          💡 <strong>Plan de conexión Día 1 (Nozomi 53):</strong> Si el vuelo o el N'EX sufren un retraso severo y peligra la llegada a Shinagawa antes de las 17:19, se debe acceder a Smart EX (App / Web) <em>antes</em> de la salida del tren para cambiar los billetes al siguiente Nozomi disponible.
        </p>
        </div>
        )}
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
                        {tItem.jpy != null
                          ? formatJpyEur(tItem.jpy, tItem.real)
                          : formatEur(tItem.real)}
                      </p>
                      <p style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 2 }}>
                        /persona
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
                  NO COMPENSA — billetes JR ~{formatJpyEur(coveredTotalJpy, coveredTotalEur)}/pax vs Pass 7d {formatJpyEur(PASS_7)} (+{formatJpyEur(saveCoveredOnlyJpy)} más caro).
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
        <div className="px-5 sm:px-6 pb-6 space-y-6">
          <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ink-soft)" }}>
            Cálculo con <strong>precios reales Revolut</strong> de billetes ya comprados + estimaciones del resto.
            Tipo de cambio aprox. {YEN_PER_EUR} ¥/€. Precios oficiales JR Pass (ordinario adulto, vigentes hasta sept 2026):
            {" "}7 días {formatJpyEur(PASS_7)} · 14 días {formatJpyEur(PASS_14)} · 21 días {formatJpyEur(PASS_21)}.
            El Pass <strong>no incluye Nozomi</strong>.
          </p>

          {/* 1. Estado de pagos del transporte */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-3 m-0" style={{ color: "var(--ink-soft)" }}>
              1. Estado de pagos — transporte nacional
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border" style={{ background: "rgba(46,125,91,0.06)", borderColor: "rgba(46,125,91,0.25)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider m-0" style={{ color: "var(--forest)" }}>Ya pagado</p>
                <p className="font-display text-lg font-bold m-0 mt-1" style={{ color: "var(--ink)" }}>{formatJpyEur(paidJpy, paidEur)}</p>
                <p className="text-xs m-0 mt-1" style={{ color: "var(--ink-soft)" }}>/persona · grupo {formatGroupJpyEur(paidJpy, paidEur, PEOPLE)}</p>
                <p className="text-[11px] m-0 mt-2" style={{ color: "var(--ink-soft)" }}>{purchased.length} trayectos confirmados</p>
              </div>
              <div className="p-4 rounded-xl border" style={{ background: "rgba(201,162,39,0.08)", borderColor: "rgba(201,162,39,0.3)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider m-0" style={{ color: "#8a6d1a" }}>Queda por pagar (est.)</p>
                <p className="font-display text-lg font-bold m-0 mt-1" style={{ color: "var(--ink)" }}>{formatJpyEur(pendingJpy, pendingEur)}</p>
                <p className="text-xs m-0 mt-1" style={{ color: "var(--ink-soft)" }}>/persona · grupo {formatGroupJpyEur(pendingJpy, pendingEur, PEOPLE)}</p>
                <p className="text-[11px] m-0 mt-2" style={{ color: "var(--ink-soft)" }}>{pending.length} trayectos pendientes</p>
              </div>
              <div className="p-4 rounded-xl border" style={{ background: "rgba(29,53,87,0.06)", borderColor: "rgba(29,53,87,0.2)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wider m-0" style={{ color: "var(--indigo)" }}>Total transporte est.</p>
                <p className="font-display text-lg font-bold m-0 mt-1" style={{ color: "var(--ink)" }}>{formatJpyEur(allJpy, allEur)}</p>
                <p className="text-xs m-0 mt-1" style={{ color: "var(--ink-soft)" }}>/persona · grupo {formatGroupJpyEur(allJpy, allEur, PEOPLE)}</p>
                <p className="text-[11px] m-0 mt-2" style={{ color: "var(--ink-soft)" }}>Sin vuelos internacionales</p>
              </div>
            </div>
          </div>

          {/* 2. Desglose por categoría */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-3 m-0" style={{ color: "var(--ink-soft)" }}>
              2. Desglose por categoría (/persona)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
                <p className="text-xs font-bold m-0 mb-2" style={{ color: "var(--forest)" }}>✅ Cubierto por JR Pass</p>
                <ul className="text-xs space-y-1 m-0 p-0 list-none" style={{ color: "var(--ink)" }}>
                  {jrCoveredPurchased.map((x) => (
                    <li key={`p-${x.name}`}>• {x.name}: <strong>{formatJpyEur(x.jpy, x.real)}</strong> ✓</li>
                  ))}
                  {jrCoveredEstimated.map((x) => (
                    <li key={`e-${x.name}`}>• {x.name}: <strong>{formatJpyEur(x.jpy, x.real)}</strong> <span style={{ color: "var(--ink-soft)" }}>(est.)</span></li>
                  ))}
                </ul>
                <p className="text-xs font-bold m-0 mt-3 pt-2 border-t" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
                  Subtotal: {formatJpyEur(coveredTotalJpy, coveredTotalEur)}
                </p>
                <p className="text-[10px] m-0 mt-1" style={{ color: "var(--ink-soft)" }}>
                  Comprado {formatJpyEur(coveredBoughtJpy, coveredBoughtEur)} · pendiente {formatJpyEur(coveredEstJpy, coveredEstEur)}
                </p>
              </div>

              <div className="p-4 rounded-xl border" style={{ background: "#FFF5F5", borderColor: "#FCA5A5" }}>
                <p className="text-xs font-bold text-red-800 m-0 mb-2">⚠️ Nozomi (NO entra en el Pass)</p>
                <ul className="text-xs text-red-800 space-y-1 m-0 p-0 list-none">
                  {nozomiPurchased.map((x) => (
                    <li key={x.name}>• {x.name}: <strong>{formatJpyEur(x.jpy, x.real)}</strong></li>
                  ))}
                </ul>
                <p className="text-xs font-bold text-red-900 m-0 mt-3 pt-2 border-t border-red-200">
                  Subtotal: {formatJpyEur(nozomiJpy, nozomiEur)}
                </p>
                <p className="text-[10px] text-red-700 m-0 mt-1">
                  Con Pass habría que pagar suplemento Nozomi o usar Hikari/Kodama (más lento). Ya comprados.
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
                <p className="text-xs font-bold m-0 mb-2" style={{ color: "var(--ink)" }}>🚌 Privados / no JR</p>
                <ul className="text-xs space-y-1 m-0 p-0 list-none" style={{ color: "var(--ink)" }}>
                  {nonJrPurchased.map((x) => (
                    <li key={`np-${x.name}`}>• {x.name}: <strong>{formatJpyEur(x.jpy, x.real)}</strong> ✓</li>
                  ))}
                  {nonJrPending.map((x) => (
                    <li key={`ne-${x.name}`}>• {x.name}: <strong>{formatJpyEur(x.jpy, x.real)}</strong> <span style={{ color: "var(--ink-soft)" }}>(est.)</span></li>
                  ))}
                </ul>
                <p className="text-xs font-bold m-0 mt-3 pt-2 border-t" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
                  Subtotal: {formatJpyEur(nonJrJpy, nonJrEur)}
                </p>
                <p className="text-[10px] m-0 mt-1" style={{ color: "var(--ink-soft)" }}>
                  Se paga igual con o sin Pass · comprado {formatJpyEur(nonJrBoughtJpy, nonJrBoughtEur)} · pendiente {formatJpyEur(nonJrPendJpy, nonJrPendEur)}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Precios oficiales del Pass */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-3 m-0" style={{ color: "var(--ink-soft)" }}>
              3. Precio oficial Japan Rail Pass (ordinario adulto)
            </p>
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--line)" }}>
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr style={{ background: "rgba(29,53,87,0.04)" }}>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Duración</th>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>¥ / persona</th>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>≈ € / persona</th>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Grupo ×5</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="py-2.5 px-3 font-medium">7 días consecutivos</td>
                    <td className="py-2.5 px-3 font-bold">{formatJpy(PASS_7)}</td>
                    <td className="py-2.5 px-3">~{formatEur(jpyToEur(PASS_7))}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>{formatGroupJpyEur(PASS_7, jpyToEur(PASS_7), PEOPLE)}</td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="py-2.5 px-3 font-medium">14 días consecutivos</td>
                    <td className="py-2.5 px-3 font-bold">{formatJpy(PASS_14)}</td>
                    <td className="py-2.5 px-3">~{formatEur(jpyToEur(PASS_14))}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>{formatGroupJpyEur(PASS_14, jpyToEur(PASS_14), PEOPLE)}</td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="py-2.5 px-3 font-medium">21 días consecutivos</td>
                    <td className="py-2.5 px-3 font-bold">{formatJpy(PASS_21)}</td>
                    <td className="py-2.5 px-3">~{formatEur(jpyToEur(PASS_21))}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>{formatGroupJpyEur(PASS_21, jpyToEur(PASS_21), PEOPLE)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] m-0 mt-2 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Fuente: <a href="https://japanrailpass.net/en/purchase/price/" target="_blank" rel="noreferrer" className="underline">japanrailpass.net</a>.
              Desde octubre 2026 las agencias en el extranjero suben a ¥53.000 (~287€) / ¥84.000 (~455€) / ¥105.000 (~569€); la web oficial mantiene los precios actuales por ahora.
              Nuestro viaje es 7–21 sept (~15 días): un Pass de 7 días <strong>no puede cubrir</strong> a la vez N'EX (día 1), Alpes (día 6–9) y Fuji (día 14).
            </p>
          </div>

          {/* 4. Comparativa de escenarios */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-3 m-0" style={{ color: "var(--ink-soft)" }}>
              4. Comparativa de escenarios — coste total transporte /persona
            </p>
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--line)" }}>
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr style={{ background: "rgba(29,53,87,0.04)" }}>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Escenario</th>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Cómo se compone</th>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Total /pax</th>
                    <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>vs individuales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t" style={{ borderColor: "var(--line)", background: "rgba(46,125,91,0.06)" }}>
                    <td className="py-3 px-3 font-bold" style={{ color: "var(--forest)" }}>A · Billetes individuales</td>
                    <td className="py-3 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>
                      JR {formatJpyEur(coveredTotalJpy, coveredTotalEur)} + Nozomi {formatJpyEur(nozomiJpy, nozomiEur)} + privados {formatJpyEur(nonJrJpy, nonJrEur)}
                    </td>
                    <td className="py-3 px-3 font-bold" style={{ color: "var(--forest)" }}>{formatJpyEur(individualTotalJpy, individualTotalEur)}</td>
                    <td className="py-3 px-3 font-medium" style={{ color: "var(--forest)" }}>✅ Más barato</td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="py-3 px-3 font-medium">B · JR Pass 7 días</td>
                    <td className="py-3 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>
                      Pass {formatJpyEur(PASS_7)} + Nozomi {formatJpyEur(nozomiJpy, nozomiEur)} + privados {formatJpyEur(nonJrJpy, nonJrEur)}
                    </td>
                    <td className="py-3 px-3 font-bold">{formatJpyEur(withPass7Jpy, withPass7Eur)}</td>
                    <td className="py-3 px-3" style={{ color: "var(--shu)" }}>❌ +{formatJpyEur(saveVs7Jpy, saveVs7Eur)}</td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                    <td className="py-3 px-3 font-medium">C · JR Pass 14 días</td>
                    <td className="py-3 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>
                      Pass {formatJpyEur(PASS_14)} + Nozomi {formatJpyEur(nozomiJpy, nozomiEur)} + privados {formatJpyEur(nonJrJpy, nonJrEur)}
                    </td>
                    <td className="py-3 px-3 font-bold">{formatJpyEur(withPass14Jpy, withPass14Eur)}</td>
                    <td className="py-3 px-3" style={{ color: "var(--shu)" }}>❌ +{formatJpyEur(saveVs14Jpy, saveVs14Eur)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3.5 rounded-xl border" style={{ background: "rgba(46,125,91,0.06)", borderColor: "rgba(46,125,91,0.25)" }}>
              <p className="text-sm font-bold m-0 mb-1" style={{ color: "var(--forest)" }}>
                Ahorro al NO comprar el Pass
              </p>
              <p className="text-xs m-0 leading-relaxed" style={{ color: "var(--ink)" }}>
                Solo mirando trayectos que el Pass cubriría: {formatJpyEur(coveredTotalJpy, coveredTotalEur)} vs Pass 7d {formatJpyEur(PASS_7, jpyToEur(PASS_7))}
                → ahorramos <strong>{formatJpyEur(saveCoveredOnlyJpy, saveCoveredOnlyEur)}</strong>/persona
                (≈ {formatGroupJpyEur(saveCoveredOnlyJpy, saveCoveredOnlyEur, PEOPLE)} el grupo).
              </p>
              <p className="text-xs m-0 mt-2 leading-relaxed" style={{ color: "var(--ink)" }}>
                En el coste total del transporte del viaje: con Pass 7d pagaríamos <strong>{formatJpyEur(saveVs7Jpy, saveVs7Eur)}</strong> más por persona
                (≈ {formatGroupJpyEur(saveVs7Jpy, saveVs7Eur, PEOPLE)} el grupo); con Pass 14d,
                {" "}<strong>{formatJpyEur(saveVs14Jpy, saveVs14Eur)}</strong> más/persona.
              </p>
            </div>
          </div>

          {/* 5. Qué cubre / no */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 m-0" style={{ color: "var(--ink-soft)" }}>✅ El JR Pass SÍ cubre</p>
              <ul className="text-xs space-y-1 pl-4 list-disc m-0" style={{ color: "var(--ink)" }}>
                <li>Shinkansen Hikari, Kodama, Sakura, Tsubame</li>
                <li>Limited Express JR (Thunderbird, Shinano, Kagayaki…)</li>
                <li>Trenes locales JR (Nara, San-In, Osaka…)</li>
                <li>Narita Express (N'EX)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border bg-white/50" style={{ borderColor: "var(--line)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 m-0" style={{ color: "var(--ink-soft)" }}>❌ El JR Pass NO cubre</p>
              <ul className="text-xs space-y-1 pl-4 list-disc m-0" style={{ color: "var(--ink)" }}>
                <li>Nozomi / Mizuho (salvo suplemento caro)</li>
                <li>Nohi Bus (Alpes: Shirakawa-go, Takayama, Magome)</li>
                <li>Metro Kioto/Tokio, Randen, Yurikamome</li>
                <li>Keisei Skyliner (vuelta a Narita)</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl border" style={{ background: "rgba(29,53,87,0.05)", borderColor: "var(--indigo)" }}>
            <p className="text-sm font-bold mb-2 flex items-center gap-1.5 m-0" style={{ color: "var(--indigo)" }}>
              <span>✅</span> Recomendación final
            </p>
            <ul className="text-xs space-y-2 pl-2 m-0" style={{ color: "var(--ink)" }}>
              <li>• <strong>No comprar Japan Rail Pass.</strong> Los trayectos JR de este viaje suman ~{formatJpyEur(coveredTotalJpy, coveredTotalEur)}/pax frente a {formatJpyEur(PASS_7)} (7d) o {formatJpyEur(PASS_14)} (14d).</li>
              <li>• Ya llevamos comprados Nozomi + Thunderbird + Shinano + Nohi: el Pass no los “recupera”.</li>
              <li>• Seguir con billetes individuales + Suica/Welcome Suica para urbano.</li>
              <li>• Pendiente de pagar estimado: {formatJpyEur(pendingJpy, pendingEur)}/persona (N'EX, locales, Fuji, Skyliner, metro…).</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2 m-0" style={{ color: "var(--ink-soft)" }}>Fuentes oficiales</p>
            <div className="flex flex-col gap-1 text-[11px]">
              <a href="https://japanrailpass.net/en/purchase/price/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>Japan Rail Pass — precios oficiales</a>
              <a href="https://japanrailpass.net/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>Japan Rail Pass — info general</a>
              <a href="https://smart-ex.jp/en/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>Smart EX (Tokaido / Sanyo / Kyushu Shinkansen)</a>
              <a href="https://www.westjr.co.jp/global/en/ticket/overview/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>JR-West Online Train Reservation</a>
              <a href="https://www.jreast.co.jp/multi/en/welcomesuica/welcomesuica.html" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>JR East Welcome Suica</a>
              <a href="https://www.nouhibus.co.jp/highwaybus/highwaybus_route/" target="_blank" rel="noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>Nohi Bus Oficial</a>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

