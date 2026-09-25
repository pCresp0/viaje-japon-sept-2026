import { useState } from "react";
import { ChevronDown, ChevronRight, CalendarX2, Compass } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { pendingDays, pendingSectionLabel, pendingSectionSubtitle } from "../data/pendingDays";
import PlaceText from "../components/PlaceText";

export default function FutureTripsPage() {
  const { lang } = useLang();
  const days = pendingDays[lang] || pendingDays.es;
  const [openId, setOpenId] = useState(null);

  return (
    <div className="px-4 pt-3 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Utilidades · Ideas</p>
        <div className="flex items-center gap-2">
          <Compass size={20} style={{ color: "var(--indigo)" }} />
          <h2 className="font-display text-2xl" style={{ color: "var(--indigo)", margin: 0 }}>
            {pendingSectionLabel[lang] || pendingSectionLabel.es}
          </h2>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "4px 0 0" }}>
          {pendingSectionSubtitle[lang] || pendingSectionSubtitle.es}
        </p>
      </div>

      <div className="space-y-2.5">
        {days.map((d) => {
          const isOpen = openId === d.id;
          return (
            <div
              key={d.id}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px dashed var(--line)", background: "var(--paper-raised)" }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : d.id)}
                className="w-full flex items-center gap-3 p-3.5 text-left"
                style={{ background: "transparent", border: "none" }}
              >
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
                >
                  <CalendarX2 size={15} style={{ color: "var(--ink-soft)" }} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[15px] font-medium truncate" style={{ color: "var(--ink)" }}>
                    {d.title}
                  </span>
                  <span className="block text-xs" style={{ color: "var(--ink-soft)" }}>
                    {d.cities}
                  </span>
                </span>
                {isOpen ? (
                  <ChevronDown size={18} style={{ color: "var(--ink-soft)" }} />
                ) : (
                  <ChevronRight size={18} style={{ color: "var(--ink-soft)" }} />
                )}
              </button>

              {isOpen && (
                <div className="px-3.5 pb-4 space-y-3">
                  <p
                    className="text-xs italic p-2.5 rounded-lg"
                    style={{ color: "var(--ink-soft)", background: "var(--paper)", border: "1px solid var(--line)" }}
                  >
                    {d.reason}
                  </p>

                  <PlaceText
                    as="p"
                    text={d.summary}
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--ink)" }}
                    linkStyle={{ color: "var(--shu)" }}
                  />

                  {d.history && (
                    <div className="pt-1">
                      <p
                        className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                        style={{ color: "var(--shu)", letterSpacing: "0.01em" }}
                      >
                        {lang === "en" ? "History & Context" : lang === "fr" ? "Histoire & Contexte" : lang === "tl" ? "Kasaysayan at Konteksto" : "Historia y contexto"}
                      </p>
                      <PlaceText
                        as="p"
                        text={d.history}
                        className="text-[13.5px] leading-[1.65] m-0"
                        style={{ color: "var(--ink)", whiteSpace: "pre-wrap" }}
                        linkStyle={{ color: "var(--shu)", fontWeight: 600 }}
                      />
                    </div>
                  )}

                  <div className="pt-2 pb-1 space-y-4">
                    {d.schedule.map((item, i) => (
                      <div key={i}>
                        <p
                          className="font-display font-bold text-[15px] sm:text-[15.5px] mb-1.5"
                          style={{
                            color: "var(--shu)",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {item.time}
                        </p>
                        <PlaceText
                          as="p"
                          text={item.text}
                          className="text-[13.5px] leading-[1.65] m-0"
                          style={{ color: "var(--ink)", whiteSpace: "pre-wrap" }}
                          linkStyle={{ color: "var(--shu)", fontWeight: 600 }}
                        />
                      </div>
                    ))}
                  </div>

                  {d.money && (
                    <div className="pt-3 mt-1" style={{ borderTop: "1px solid var(--line)" }}>
                      <p className="text-xs sm:text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                        💰 {d.money}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
