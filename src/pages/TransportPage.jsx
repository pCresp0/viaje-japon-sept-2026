import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Train, Bus, Zap, FileDown, CheckCircle2, Clock, AlertCircle, Smartphone, CreditCard, ChevronDown, Ticket } from "lucide-react";
import { Highlightable, useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { exportTransportExcel } from "../utils/exportCsv";
import { formatEur, formatJpyEur } from "../utils/money";
import { PASS_7_JPY, PASS_7_EUR } from "../data/jrPass";
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
  const { highlightId } = useHighlight();
  const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));
  const [activeTab, setActiveTab] = useState("billetes");
  const [suicaOpen, setSuicaOpen] = useState(false);
  const [smartExOpen, setSmartExOpen] = useState(false);

  // Auto-switch a "trayectos" si la búsqueda global aterriza en un trayecto concreto
  useEffect(() => {
    if (highlightId && highlightId.startsWith("transport-")) {
      setActiveTab("trayectos");
    }
  }, [highlightId]);

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
    <div className="pb-12">
      {/* Header */}
      <div className="px-4 pt-3 mb-4 flex items-start justify-between gap-3">
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
          Excel
        </button>
      </div>

      {/* Pill tabs — sticky */}
      <div
        className="sticky top-0 z-20 px-4 pb-3 pt-1"
        style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)" }}
      >
        <div 
          className="flex p-1 rounded-xl relative z-0" 
          style={{ background: "rgba(29, 53, 87, 0.06)", border: "1px solid rgba(29, 53, 87, 0.08)" }}
        >
          <div
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-out pointer-events-none"
            style={{ transform: activeTab === "billetes" ? "translateX(0)" : "translateX(100%)" }}
          />
          <button
            type="button"
            onClick={() => setActiveTab("billetes")}
            className="flex-1 relative z-10 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer border-none bg-transparent m-0"
            style={{ color: activeTab === "billetes" ? "var(--indigo)" : "var(--ink-soft)" }}
          >
            <Ticket size={14} />
            Billetes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("trayectos")}
            className="flex-1 relative z-10 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer border-none bg-transparent m-0"
            style={{ color: activeTab === "trayectos" ? "var(--indigo)" : "var(--ink-soft)" }}
          >
            <Train size={14} />
            Trayectos
          </button>
        </div>
      </div>

      {/* ── TAB: BILLETES ──────────────────────────────────────── */}
      {activeTab === "billetes" && (
        <div className="px-4 pt-5">
          {/* Tarjetas de billetes */}
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

          {/* Estado general — al final */}
          <div className="rounded-2xl p-4 mt-2 mb-4 border" style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}>
            <p className="font-display text-sm font-bold flex items-center gap-2 mb-3" style={{ color: "var(--indigo)" }}>
              <span>🚆</span> Estado general — 5 adultos
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl border bg-green-50/50 border-green-200">
                <p className="text-xs font-bold text-green-800 flex items-center gap-1 mb-1.5">
                  <CheckCircle2 size={13} /> ✅ COMPRADOS
                </p>
                <ul className="text-xs text-green-900 space-y-1">
                  <li>• <strong>Nozomi 53</strong> Shinagawa→Kioto (7 sep, 17:19)</li>
                  <li>• <strong>Thunderbird+Kagayaki</strong> Kioto→Kanazawa (12 sep)</li>
                  <li>• <strong>Nohi Bus ×3</strong> Alpes (13–14 sep)</li>
                  <li>• <strong>Shinano 4</strong> Nakatsugawa→Nagoya (15 sep)</li>
                  <li>• <strong>Nozomi 358</strong> Nagoya→Tokio (15 sep, 11:29)</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl border bg-red-50/50 border-red-200">
                <p className="text-xs font-bold text-red-800 flex items-center gap-1 mb-1.5">
                  <AlertCircle size={13} /> 🔴 RESERVAR AHORA
                </p>
                <ul className="text-xs text-red-900 space-y-1">
                  <li>• <strong>Shinkansen Fuji</strong> (20 sep · Smart EX · salida ~06:30)</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl border bg-amber-50/50 border-amber-200">
                <p className="text-xs font-bold text-amber-800 flex items-center gap-1 mb-1.5">
                  <Clock size={13} /> 🟠 MÁS ADELANTE
                </p>
                <ul className="text-xs text-amber-900 space-y-1">
                  <li>• <strong>Skyliner/N'EX</strong> vuelta a Narita (21 sep)</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl border bg-slate-50/80 border-slate-200">
                <p className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-1.5">
                  <CreditCard size={13} /> 🟢 EN JAPÓN
                </p>
                <ul className="text-xs text-slate-800 space-y-1">
                  <li>• <strong>N'EX</strong> llegada Narita→Shinagawa</li>
                  <li>• Locales con Suica</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: TRAYECTOS ─────────────────────────────────────── */}
      {activeTab === "trayectos" && (
        <div className="px-4 pt-5">

          {/* Trayectos por día — primero */}
          <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{t("transport.tripsByDay")}</p>
          <div
            className="mb-6"
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
                  <div className="px-4 py-3 flex items-center gap-3" style={{ background: color }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: "rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "white",
                    }}>
                      {badge}
                    </div>
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.3 }}>{title}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>{sub}</p>
                    </div>
                  </div>

                  {items.map((tItem, ti) => {
                    const kind = iconKind(tItem);
                    const isClickable = onNavigate && !isNaN(parseInt(tItem.day));
                    const suicaCat = tItem.suicaCategory || (tItem.suica ? "yes" : "no");

                    return (
                      <Highlightable key={ti} id={slug("transport", tItem.day, tItem.name)}>
                        <div
                          onClick={() => handleTransportClick(tItem)}
                          className={`px-4 py-3 flex gap-3 items-center relative ${isClickable ? "cursor-pointer hover:bg-black/5 active:bg-black/10 transition-colors" : ""}`}
                          style={{ borderTop: ti > 0 ? "1px solid var(--line)" : "none" }}
                        >
                          <div style={{
                            width: 26, height: 26, borderRadius: 7,
                            background: "rgba(0,0,0,0.04)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--ink)", flexShrink: 0,
                          }}>
                            {kind === "shinkansen" ? <Zap size={13} /> : kind === "bus" ? <Bus size={13} /> : <Train size={13} />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{tItem.name}</p>
                              {tItem.purchased ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                                  <CheckCircle2 size={10} /> COMPRADO
                                </span>
                              ) : tItem.advance ? (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200">
                                  <Clock size={10} /> COMPRAR ADELANTADO
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                  <Clock size={10} /> COMPRAR ALLÍ
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: 11, color: "var(--ink-soft)" }}>{tItem.from} → {tItem.to}</p>
                            {tItem.note && (
                              <p style={{ fontSize: 10.5, color: "var(--ink-soft)", fontStyle: "italic", marginTop: 2, lineHeight: 1.4 }}>
                                {tItem.note}
                              </p>
                            )}
                          </div>

                          <div style={{ textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
                            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--shu)" }}>
                              {tItem.jpy != null ? formatJpyEur(tItem.jpy, tItem.real) : formatEur(tItem.real)}
                            </p>
                            <p style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 2 }}>/persona</p>
                            <div className="mt-1">
                              {suicaCat === "yes" && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 Suica</span>
                              )}
                              {suicaCat === "partial" && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Suica</span>
                              )}
                              {suicaCat === "no" && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">🔴 Suica</span>
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

          {/* Suica */}
          <div className="rounded-2xl mb-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #1d3557 0%, #0f1f35 100%)", color: "white" }}>
            <button
              type="button"
              onClick={() => setSuicaOpen(!suicaOpen)}
              className="w-full text-left p-4 border-none cursor-pointer bg-transparent text-white"
            >
              <div className="flex items-center gap-2">
                <CreditCard size={17} className="text-emerald-400 shrink-0" />
                <p style={{ fontSize: 15, fontWeight: 700, margin: 0 }} className="flex-1">Tarjeta Welcome Suica / IC</p>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${suicaOpen ? "rotate-180" : ""}`}
                  style={{ color: "rgba(255,255,255,0.8)" }}
                />
              </div>
              {!suicaOpen && (
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", margin: "6px 0 0", lineHeight: 1.4 }}>
                  iPhone (Pablo, Juan Carlos y Randy): Welcome Suica Mobile · Android (Sergio y Thibaut): física en Narita · recarga ¥3.000–¥5.000 (~16–27€)
                </p>
              )}
            </button>
            {suicaOpen && (
              <div className="px-4 pb-4">
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 12 }}>
                  Tarjeta de transporte y monedero electrónico para trenes locales, metro, autobuses urbanos y compras compatibles en todo Japón.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                    <p className="text-xs font-bold text-emerald-300 flex items-center gap-1 mb-1.5">
                      <Smartphone size={13} /> 📱 iPhone — Pablo, Juan Carlos y Randy (Welcome Suica Mobile)
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Descargar la app oficial <strong>Welcome Suica Mobile</strong> e integrarla en Apple Wallet con tarjeta en Apple Pay. Requiere activar localización. <em>Nota: Si la emisión/recarga da error desde España por restricciones de ubicación, se puede crear y recargar al instante al aterrizar en Japón.</em>
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                    <p className="text-xs font-bold text-amber-300 flex items-center gap-1 mb-1.5">
                      <CreditCard size={13} /> 🤖 Android — Sergio y Thibaut (Welcome Suica Física)
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed">
                      La app Welcome Suica Mobile no está disponible para terminales Android comprados fuera de Japón (requieren chip FeliCa japonés). <strong>Sergio y Thibaut</strong> comprarán la <strong>Welcome Suica física</strong> al llegar a los puntos autorizados de JR East en Narita (T1 o T2/3).
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/80 pt-3 border-t border-white/15">
                  <div>
                    <p className="font-semibold text-white mb-0.5">💰 Sin depósito</p>
                    <p className="text-white/70">No requiere los ¥500 (~3€) de fianza.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-0.5">⚠️ No reembolsable</p>
                    <p className="text-white/70">El saldo restante no se devuelve.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-0.5">💳 Recarga recomendada</p>
                    <p className="text-white/70">¥3.000–¥5.000 (~16–27€)/persona.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Smart EX */}
          <div className="rounded-2xl mb-5 border overflow-hidden" style={{ background: "rgba(29, 53, 87, 0.03)", borderColor: "var(--line)" }}>
            <button
              type="button"
              onClick={() => setSmartExOpen(!smartExOpen)}
              className="w-full text-left px-4 py-3.5 border-none cursor-pointer bg-transparent flex items-center gap-2"
            >
              <Zap size={16} style={{ color: "var(--indigo)" }} />
              <p className="text-sm font-bold flex-1 m-0" style={{ color: "var(--indigo)" }}>
                Política de Cambios — Smart EX
              </p>
              <ChevronDown
                size={17}
                className={`shrink-0 transition-transform ${smartExOpen ? "rotate-180" : ""}`}
                style={{ color: "var(--ink-soft)" }}
              />
            </button>
            {smartExOpen && (
              <div className="px-4 pb-4">
                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                  Las reservas de Shinkansen realizadas por <strong>Smart EX</strong> permiten modificaciones online sin coste antes de la salida (hasta 4 minutos antes de la salida programada, siempre que no se haya accedido al torno con QR ni impreso el billete físico).
                </p>
                <p className="text-xs text-gray-600 leading-relaxed m-0">
                  💡 <strong>Plan de conexión Día 1 (Nozomi 53):</strong> Si el vuelo o el N'EX sufren un retraso severo y peligra la llegada a Shinagawa antes de las 17:19, acceder a Smart EX (App / Web) <em>antes</em> de la salida para cambiar al siguiente Nozomi disponible.
                </p>
              </div>
            )}
          </div>

          {/* JR Pass link */}
          <button
            type="button"
            onClick={() => onNavigate?.({
              tab: "presupuesto",
              targetId: "jr-pass-analysis",
              silent: true,
              scrollBlock: "start",
              highlightDelay: 250,
            })}
            className="w-full text-left rounded-2xl border mb-6 p-4 cursor-pointer transition-colors hover:bg-black/[0.02]"
            style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">📊</span>
                  <h3 className="font-bold text-base m-0" style={{ color: "var(--ink)" }}>
                    ¿Merece la pena el Japan Rail Pass?
                  </h3>
                </div>
                <p className="text-sm m-0 mb-1.5" style={{ color: "var(--ink-soft)" }}>
                  Análisis completo en Presupuesto · Pass 7d: {formatJpyEur(PASS_7_JPY, PASS_7_EUR)}/persona · {formatEur(PASS_7_EUR * 5)} grupo.
                </p>
                <p className="text-sm font-bold m-0" style={{ color: "var(--shu)" }}>
                  ❌ NO COMPENSA — ver detalle →
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold" style={{ color: "var(--indigo)", marginTop: 3 }}>Ver →</span>
            </div>
          </button>

        </div>
      )}
    </div>
  );
}
