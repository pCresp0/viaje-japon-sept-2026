import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "../i18n/LanguageContext";
import { Highlightable, useHighlight } from "../context/HighlightContext";
import {
  formatEur,
  formatJpy,
  formatJpyEur,
  formatGroupJpyEur,
  YEN_PER_EUR,
} from "../utils/money";
import {
  PEOPLE,
  PASS_7_JPY,
  PASS_14_JPY,
  PASS_21_JPY,
  PASS_7_EUR,
  PASS_14_EUR,
  PASS_21_EUR,
  JR_PASS_SOURCE_EUR,
  JR_PASS_SOURCE_OFFICIAL,
} from "../data/jrPass";

function isJrPassCovered(t) {
  if (typeof t.jrPassCovered === "boolean") return t.jrPassCovered;
  return t.coverage === "jr" && !/nozomi/i.test(t.name || "");
}

function isNozomi(t) {
  return /nozomi/i.test(t.name || "");
}

/**
 * Análisis completo «¿Merece la pena el JR Pass?».
 * Vive en Presupuesto; Transportes solo enlaza aquí.
 */
export default function JrPassAnalysis({ defaultOpen = false }) {
  const { transports } = useContent();
  const { highlightId } = useHighlight();
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (highlightId === "jr-pass-analysis") setOpen(true);
  }, [highlightId]);

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

  const individualTotalJpy = allJpy;
  const individualTotalEur = allEur;
  const withPass7Jpy = PASS_7_JPY + nozomiJpy + nonJrJpy;
  const withPass7Eur = PASS_7_EUR + nozomiEur + nonJrEur;
  const withPass14Jpy = PASS_14_JPY + nozomiJpy + nonJrJpy;
  const withPass14Eur = PASS_14_EUR + nozomiEur + nonJrEur;
  const saveVs7Jpy = withPass7Jpy - individualTotalJpy;
  const saveVs7Eur = withPass7Eur - individualTotalEur;
  const saveVs14Eur = withPass14Eur - individualTotalEur;
  const saveCoveredOnlyEur = PASS_7_EUR - coveredTotalEur;

  return (
    <Highlightable id="jr-pass-analysis">
      <div
        className="rounded-2xl border mb-5 overflow-hidden"
        style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
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
              <div
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
                style={{ background: "rgba(188,71,73,0.1)", border: "1px solid rgba(188,71,73,0.2)" }}
              >
                <span style={{ fontSize: 16 }}>❌</span>
                <p className="text-sm font-bold m-0" style={{ color: "var(--shu)" }}>
                  NO COMPENSA — billetes JR ~{formatJpyEur(coveredTotalJpy, coveredTotalEur)}/pax vs Pass 7d{" "}
                  {formatJpyEur(PASS_7_JPY, PASS_7_EUR)} (+{formatEur(saveCoveredOnlyEur)} más caro).
                </p>
              </div>
            </div>
            <ChevronDown
              size={22}
              className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              style={{ color: "var(--ink-soft)", marginTop: 4 }}
            />
          </div>
        </button>

        {open && (
          <div className="px-5 sm:px-6 pb-6 space-y-6">
            <p className="text-xs leading-relaxed m-0" style={{ color: "var(--ink-soft)" }}>
              Cálculo con <strong>precios reales Revolut</strong> de billetes ya comprados + estimaciones del resto.
              Tipo de cambio aprox. {YEN_PER_EUR} ¥/€ para el resto del viaje. Precios JR Pass Ordinary adulto
              (agencia <a href={JR_PASS_SOURCE_EUR} target="_blank" rel="noopener noreferrer" className="underline">jrpass.com</a>, ago 2026):
              {" "}7 días {formatEur(PASS_7_EUR)} · 14 días {formatEur(PASS_14_EUR)} · 21 días {formatEur(PASS_21_EUR)}
              {" "}(grupo ×5: {formatEur(PASS_7_EUR * PEOPLE)} / {formatEur(PASS_14_EUR * PEOPLE)} / {formatEur(PASS_21_EUR * PEOPLE)}).
              El Pass <strong>no incluye Nozomi</strong>.
            </p>

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
                  <p className="text-[11px] m-0 mt-2" style={{ color: "var(--ink-soft)" }}>Sin vuelos ni excursiones Fuji</p>
                </div>
              </div>
            </div>

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

            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-3 m-0" style={{ color: "var(--ink-soft)" }}>
                3. Precio Japan Rail Pass (ordinario adulto)
              </p>
              <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--line)" }}>
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr style={{ background: "rgba(29,53,87,0.04)" }}>
                      <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Duración</th>
                      <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>¥ oficiales</th>
                      <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>€ agencia (jrpass.com)</th>
                      <th className="py-2.5 px-3 font-semibold text-xs" style={{ color: "var(--ink-soft)" }}>Grupo ×5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-2.5 px-3 font-medium">7 días consecutivos</td>
                      <td className="py-2.5 px-3 font-bold">{formatJpy(PASS_7_JPY)}</td>
                      <td className="py-2.5 px-3 font-bold" style={{ color: "var(--shu)" }}>{formatEur(PASS_7_EUR)}</td>
                      <td className="py-2.5 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>{formatEur(PASS_7_EUR * PEOPLE)}</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-2.5 px-3 font-medium">14 días consecutivos</td>
                      <td className="py-2.5 px-3 font-bold">{formatJpy(PASS_14_JPY)}</td>
                      <td className="py-2.5 px-3 font-bold" style={{ color: "var(--shu)" }}>{formatEur(PASS_14_EUR)}</td>
                      <td className="py-2.5 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>{formatEur(PASS_14_EUR * PEOPLE)}</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-2.5 px-3 font-medium">21 días consecutivos</td>
                      <td className="py-2.5 px-3 font-bold">{formatJpy(PASS_21_JPY)}</td>
                      <td className="py-2.5 px-3 font-bold" style={{ color: "var(--shu)" }}>{formatEur(PASS_21_EUR)}</td>
                      <td className="py-2.5 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>{formatEur(PASS_21_EUR * PEOPLE)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] m-0 mt-2 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                Fuentes:{" "}
                <a href={JR_PASS_SOURCE_EUR} target="_blank" rel="noopener noreferrer" className="underline">jrpass.com</a>
                {" "}(€ de compra) ·{" "}
                <a href={JR_PASS_SOURCE_OFFICIAL} target="_blank" rel="noopener noreferrer" className="underline">japanrailpass.net</a>
                {" "}(¥ oficiales). Desde octubre 2026 las agencias en el extranjero suben a ¥53.000 / ¥84.000 / ¥105.000.
                Nuestro viaje es 7–21 sept (~15 días): un Pass de 7 días <strong>no puede cubrir</strong> a la vez N'EX (día 1), Alpes (día 6–9) y Fuji (día 14).
              </p>
            </div>

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
                        Pass {formatJpyEur(PASS_7_JPY, PASS_7_EUR)} + Nozomi {formatJpyEur(nozomiJpy, nozomiEur)} + privados {formatJpyEur(nonJrJpy, nonJrEur)}
                      </td>
                      <td className="py-3 px-3 font-bold">{formatJpyEur(withPass7Jpy, withPass7Eur)}</td>
                      <td className="py-3 px-3" style={{ color: "var(--shu)" }}>❌ +{formatEur(saveVs7Eur)}</td>
                    </tr>
                    <tr className="border-t" style={{ borderColor: "var(--line)" }}>
                      <td className="py-3 px-3 font-medium">C · JR Pass 14 días</td>
                      <td className="py-3 px-3 text-xs" style={{ color: "var(--ink-soft)" }}>
                        Pass {formatJpyEur(PASS_14_JPY, PASS_14_EUR)} + Nozomi {formatJpyEur(nozomiJpy, nozomiEur)} + privados {formatJpyEur(nonJrJpy, nonJrEur)}
                      </td>
                      <td className="py-3 px-3 font-bold">{formatJpyEur(withPass14Jpy, withPass14Eur)}</td>
                      <td className="py-3 px-3" style={{ color: "var(--shu)" }}>❌ +{formatEur(saveVs14Eur)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3.5 rounded-xl border" style={{ background: "rgba(46,125,91,0.06)", borderColor: "rgba(46,125,91,0.25)" }}>
                <p className="text-sm font-bold m-0 mb-1" style={{ color: "var(--forest)" }}>
                  Ahorro al NO comprar el Pass
                </p>
                <p className="text-xs m-0 leading-relaxed" style={{ color: "var(--ink)" }}>
                  Solo mirando trayectos que el Pass cubriría: {formatJpyEur(coveredTotalJpy, coveredTotalEur)} vs Pass 7d {formatJpyEur(PASS_7_JPY, PASS_7_EUR)}
                  → ahorramos <strong>{formatEur(saveCoveredOnlyEur)}</strong>/persona
                  (≈ {formatEur(saveCoveredOnlyEur * PEOPLE)} el grupo).
                </p>
                <p className="text-xs m-0 mt-2 leading-relaxed" style={{ color: "var(--ink)" }}>
                  En el coste total del transporte del viaje: con Pass 7d pagaríamos <strong>{formatEur(saveVs7Eur)}</strong> más por persona
                  (≈ {formatEur(saveVs7Eur * PEOPLE)} el grupo); con Pass 14d,
                  {" "}<strong>{formatEur(saveVs14Eur)}</strong> más/persona.
                </p>
              </div>
            </div>

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
                <li>• <strong>No comprar Japan Rail Pass.</strong> Los trayectos JR de este viaje suman ~{formatJpyEur(coveredTotalJpy, coveredTotalEur)}/pax frente a {formatJpyEur(PASS_7_JPY, PASS_7_EUR)} (7d) o {formatJpyEur(PASS_14_JPY, PASS_14_EUR)} (14d).</li>
                <li>• Ya llevamos comprados Nozomi + Thunderbird + Shinano + Nohi: el Pass no los “recupera”.</li>
                <li>• Seguir con billetes individuales + Suica/Welcome Suica para urbano.</li>
                <li>• Pendiente de pagar estimado: {formatJpyEur(pendingJpy, pendingEur)}/persona (N'EX, locales, Fuji, Skyliner, metro…).</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2 m-0" style={{ color: "var(--ink-soft)" }}>Fuentes</p>
              <div className="flex flex-col gap-1 text-[11px]">
                <a href={JR_PASS_SOURCE_EUR} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>jrpass.com — precios en euros (agencia)</a>
                <a href={JR_PASS_SOURCE_OFFICIAL} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>Japan Rail Pass — precios oficiales (¥)</a>
                <a href="https://smart-ex.jp/en/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>Smart EX (Tokaido / Sanyo / Kyushu Shinkansen)</a>
                <a href="https://www.westjr.co.jp/global/en/ticket/overview/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--indigo)" }}>JR-West Online Train Reservation</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Highlightable>
  );
}
