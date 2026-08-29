import { useContent, useT } from "../i18n/LanguageContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

export default function BudgetPage() {
  const { budget, transports } = useContent();
  const t = useT();
  const [showTransports, setShowTransports] = useState(false);

  const transportTotal = transports.reduce((sum, t) => sum + (t.real || 0), 0);

  return (
    <div className="px-4 pt-3 pb-8">
      <div className="mb-5">
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          Para {budget.people} personas
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Presupuesto estimado
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>{budget.note}</p>
      </div>

      <div className="rounded-2xl p-6 text-center mb-5" style={{ background: "var(--indigo)" }}>
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.9)" }}>{t("budget.perPerson")}</p>
        <p className="font-display text-3xl text-white my-1">{budget.totalPerPerson}</p>
        <p className="text-white/70 text-xs mt-2">Grupo ({budget.people} pax): {budget.totalGroup}</p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
        gap: 10,
        marginBottom: 20,
      }}>
        {budget.categories.map((c, index) => (
          <Highlightable key={c.title} id={slug("budget", index)}>
          <div className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <div className="flex items-baseline justify-between">
              <p className="font-medium text-sm" style={{ color: "var(--ink)" }}>{c.title}</p>
              <p className="font-display text-sm" style={{ color: "var(--gold)" }}>{c.perPerson} /pax</p>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>Total grupo: {c.total}</p>
            {c.details.length > 0 && (
              <ul className="mt-2 space-y-1">
                {c.details.map((d, i) => (
                  <li key={i} className="text-[11.5px] flex items-start gap-1.5" style={{ color: "var(--ink-soft)" }}>
                    <span style={{ color: "var(--shu)" }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: d }} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          </Highlightable>
        ))}
      </div>

      <div className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
        <button
          onClick={() => setShowTransports((v) => !v)}
          className="w-full flex items-center justify-between"
        >
          <span className="font-medium text-sm" style={{ color: "var(--indigo)" }}>
            🚄 Detalle de transportes día a día
          </span>
          <ChevronDown size={18} className={`transition-transform ${showTransports ? "rotate-180" : ""}`} style={{ color: "var(--ink-soft)" }} />
        </button>
        {showTransports && (
          <div className="mt-3 space-y-2">
            {transports.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: "var(--line)" }}>
                <div className="min-w-0 pr-2">
                  <p className="font-medium truncate" style={{ color: "var(--ink)" }}>
                    Día {t.day} · {t.name}
                  </p>
                  <p style={{ color: "var(--ink-soft)" }}>{t.from} → {t.to}</p>
                </div>
                <div className="text-right shrink-0">
                  <p style={{ color: "var(--ink)" }}>{t.real.toFixed(2)}€</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm font-medium pt-1">
              <span style={{ color: "var(--ink)" }}>{t("budget.perPerson")}</span>
              <span style={{ color: "var(--ink)" }}>
                {transportTotal.toFixed(2)}€
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
