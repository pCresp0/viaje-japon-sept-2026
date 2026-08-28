import { useState, useEffect } from "react";
import { useContent, useT } from "../i18n/LanguageContext";
import { Check } from "lucide-react";
import { Highlightable } from "../context/HighlightContext";
import PlaceText from "../components/PlaceText";
import { slug } from "../utils/slug";

const STORAGE_KEY = "trip-pending-v1";

export default function PendingPage() {
  const { pendingItems, categoryLabels, urgencyConfig } = useContent();
  const t = useT();
  const [done, setDone] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setDone(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  function toggle(id) {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }

  const total = pendingItems.length;
  const completed = pendingItems.filter((i) => done[i.id]).length;
  const remaining = total - completed;
  const pct = Math.round((completed / total) * 100);

  // Group by category, keeping original order
  const grouped = Object.keys(categoryLabels).map((cat) => ({
    cat,
    items: pendingItems.filter((i) => i.category === cat),
  }));

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-5">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("pending.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("pending.title")}</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.6 }}>
          {t("pending.intro")}
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-2xl p-5 mb-8" style={{
        background: remaining === 0
          ? "linear-gradient(135deg, #2e7d5b 0%, #1f5a41 100%)"
          : "linear-gradient(160deg, var(--shu-darker) 0%, var(--shu-deep) 100%)",
        color: "white",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1 }}>
              {remaining}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              {remaining === 0
                ? t("pending.allDone")
                : remaining === 1 ? t("pending.remainingOne") : t("pending.remaining")}
            </p>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            {completed} / {total}
          </p>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`, height: "100%",
            background: "#e8b74a", borderRadius: 3,
            transition: "width 0.3s",
          }} />
        </div>
      </div>

      {/* Items grouped by category */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
        gap: 8,
        alignItems: "start",
      }}>
      {grouped.map(({ cat, items }) => (
        <div key={cat} className="mb-8">
          <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
            {categoryLabels[cat].emoji} {categoryLabels[cat].label}
          </p>

          <div className="space-y-3">
            {items.map((item) => {
              const isDone = !!done[item.id];
              const urg = urgencyConfig[item.urgency];

              return (
                <Highlightable key={item.id} id={slug("pending", item.id)}>
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    borderColor: isDone ? "var(--line)" : urg.color + "44",
                    background: "var(--paper-raised)",
                    opacity: isDone ? 0.6 : 1,
                    transition: "opacity 0.2s",
                  }}>
                  <div className="p-4 flex gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggle(item.id)}
                      aria-label={isDone ? t("pending.markPending") : t("pending.markDone")}
                      style={{
                        width: 24, height: 24, borderRadius: 7, flexShrink: 0, marginTop: 2,
                        border: isDone ? "none" : "2px solid var(--line)",
                        background: isDone ? "var(--forest)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                    >
                      {isDone && <Check size={14} color="white" strokeWidth={3} />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <p style={{
                          fontSize: 14.5, fontWeight: 700, color: "var(--ink)",
                          textDecoration: isDone ? "line-through" : "none",
                        }}>
                          {item.title}
                        </p>
                        {!isDone && (
                          <span style={{
                            fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em",
                            textTransform: "uppercase", padding: "2px 7px", borderRadius: 20,
                            background: urg.color, color: "white", flexShrink: 0,
                          }}>
                            {urg.label}
                          </span>
                        )}
                      </div>

                      <PlaceText
                        as="p"
                        text={item.detail}
                        className="text-[13px] leading-relaxed block"
                        style={{ color: "var(--ink-soft)" }}
                      />

                      {/* Options to choose between */}
                      {item.options && (
                        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                          {item.options.map((opt, i) => (
                            <div key={i} style={{
                              background: "var(--paper)",
                              borderRadius: 8, padding: "8px 10px",
                              display: "flex", justifyContent: "space-between",
                              alignItems: "center", gap: 8,
                            }}>
                              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
                                {opt.name}
                              </span>
                              <span style={{ fontSize: 11, color: "var(--ink-soft)", whiteSpace: "nowrap", flexShrink: 0 }}>
                                {opt.note}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.deadline && (
                        <p style={{
                          fontSize: 11.5, color: urg.color, fontWeight: 600,
                          marginTop: 10,
                        }}>
                          ⏳ {item.deadline}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                </Highlightable>
              );
            })}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
