import { useContent } from "../i18n/LanguageContext";
import { getTripStatus } from "../utils/date";
import DayCard from "../components/DayCard";
import { Info } from "lucide-react";

export default function Home({ onGoToDay }) {
  const { tripMeta, days } = useContent();
  const t = useT();
  const status = getTripStatus();
  const day1 = days.find((d) => d.num === 1);

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-5">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{tripMeta.subtitle}</p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)", margin: 0 }}>
          {t("nav.hoy")}
        </h1>
      </div>

      {status.phase === "before" && (
        <>
          <div
            className="rounded-2xl p-4 mb-5 flex gap-3 items-start"
            style={{ background: "rgba(29,53,87,0.08)", border: "1px solid rgba(29,53,87,0.18)" }}
          >
            <Info size={18} style={{ color: "var(--indigo)", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--indigo)", margin: "0 0 4px" }}>
                {t("today.previewTitle")}
              </p>
              <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: 0 }} dangerouslySetInnerHTML={{ __html: t("today.previewDesc") }} />
            </div>
          </div>

          {day1 && (
            <div>
              <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
                {t("today.exampleDay1")}
              </p>
              <DayCard day={day1} defaultOpenHistory={false} />
            </div>
          )}
        </>
      )}

      {status.phase === "during" && status.day && (
        <div>
          <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
            {t("today.todayDay")} {status.day.num}
          </p>
          <DayCard day={status.day} defaultOpenHistory={false} />
        </div>
      )}

      {status.phase === "during" && !status.day && (
        <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--shu)" }}>
          <p className="eyebrow mb-2" style={{ color: "var(--shu)" }}>{t("today.travelDay")}</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
            {t("today.onRoute")}
          </p>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 }}>
            {t("today.onRouteDesc")}
          </p>
          {day1 && (
            <button
              type="button"
              onClick={() => onGoToDay?.(1)}
              className="mt-4 text-sm font-medium"
              style={{ color: "var(--shu)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              {t("today.viewDay1")}
            </button>
          )}
        </div>
      )}

      {status.phase === "after" && (
        <div style={{
          background: "linear-gradient(135deg, var(--indigo) 0%, rgba(29,53,87,0.85) 100%)",
          borderRadius: 16, padding: 32, textAlign: "center", color: "white",
        }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 8 }}>{t("today.endThanks")}</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: 0 }}>
            {t("today.endMessage")}
          </p>
        </div>
      )}
    </div>
  );
}
