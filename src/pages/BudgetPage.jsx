import { useContent, useT } from "../i18n/LanguageContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { formatEur, formatJpyEur } from "../utils/money";

export default function BudgetPage() {
  const { budget, transports, flights } = useContent();
  const t = useT();
  const [showTransports, setShowTransports] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const transportTotal = transports.reduce((sum, item) => sum + (item.real || 0), 0);
  const transportTotalJpy = transports.reduce((sum, item) => sum + (item.jpy || 0), 0);
  const purchasedTotal = transports
    .filter((item) => item.purchased)
    .reduce((sum, item) => sum + (item.real || 0), 0);

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

      <Highlightable id="budget-flights-booking">
        <div
          className="rounded-xl p-4 mb-5"
          style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider m-0 mb-3" style={{ color: "var(--ink-soft)" }}>
            Vuelos · reserva Qatar Airways
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 14 }}>
            <div>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{t("flights.reference")}</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", fontFamily: "monospace", margin: 0 }}>{flights.booking.ref}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>PIN</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", fontFamily: "monospace", margin: 0 }}>{flights.booking.pin}</p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{flights.price.people} personas</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "var(--shu)", margin: 0 }}>{flights.price.total}</p>
              <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>{flights.price.perPerson}/persona</p>
            </div>
          </div>
        </div>
      </Highlightable>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
        gap: 10,
        marginBottom: 20,
      }}>
        {budget.categories.map((c, index) => {
          const isOpen = openCategory === index;
          return (
            <Highlightable key={c.title} id={slug("budget", index)}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenCategory(isOpen ? null : index)}
                  className="w-full text-left px-4 py-3.5 border-none cursor-pointer bg-transparent"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm m-0" style={{ color: "var(--ink)" }}>{c.title}</p>
                      <p className="text-xs mt-1 m-0" style={{ color: "var(--ink-soft)" }}>
                        Total grupo: {c.total}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <p className="font-display text-sm m-0" style={{ color: "var(--gold)" }}>{c.perPerson}/pax</p>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: "var(--ink-soft)" }}
                      />
                    </div>
                  </div>
                </button>
                {isOpen && c.details.length > 0 && (
                  <ul className="px-4 pb-4 space-y-1.5" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
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
          );
        })}
      </div>

      <div className="rounded-2xl p-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
        <button
          onClick={() => setShowTransports((v) => !v)}
          className="w-full flex items-center justify-between"
        >
          <div className="text-left min-w-0">
            <span className="font-medium text-sm block" style={{ color: "var(--indigo)" }}>
              🚄 Detalle de transportes día a día
            </span>
            <span className="text-xs block mt-0.5" style={{ color: "var(--ink-soft)" }}>
              Estimado {formatJpyEur(transportTotalJpy, transportTotal)}/pax · ya comprado ≈ {formatEur(purchasedTotal)}/pax
            </span>
          </div>
          <ChevronDown size={18} className={`transition-transform shrink-0 ${showTransports ? "rotate-180" : ""}`} style={{ color: "var(--ink-soft)" }} />
        </button>
        {showTransports && (
          <div className="mt-3 space-y-2">
            {transports.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs border-b pb-2" style={{ borderColor: "var(--line)" }}>
                <div className="min-w-0 pr-2">
                  <p className="font-medium truncate" style={{ color: "var(--ink)" }}>
                    Día {item.day} · {item.name}
                    {item.purchased ? " ✓" : ""}
                  </p>
                  <p style={{ color: "var(--ink-soft)" }}>{item.from} → {item.to}</p>
                </div>
                <div className="text-right shrink-0">
                  <p style={{ color: "var(--ink)" }}>
                    {item.jpy != null ? formatJpyEur(item.jpy, item.real) : formatEur(item.real)}
                  </p>
                  <p style={{ color: "var(--ink-soft)", fontSize: 10 }}>/persona</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm font-medium pt-1">
              <span style={{ color: "var(--ink)" }}>Total estimado / persona</span>
              <span style={{ color: "var(--ink)" }}>
                {formatJpyEur(transportTotalJpy, transportTotal)}
              </span>
            </div>
            <p className="text-[11px] m-0" style={{ color: "var(--ink-soft)" }}>
              Ya comprado ≈ {formatEur(purchasedTotal)}/persona · {formatEur(purchasedTotal * 5)} el grupo (Revolut en billetes largos).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
