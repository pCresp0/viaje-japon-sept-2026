import { Cloud, CloudRain, Sun, CloudSun, Droplets, MapPin, ArrowRight, ArrowRightLeft } from "lucide-react";
import { useTodayWeatherForecast } from "../utils/weatherService";
import { useT } from "../i18n";

export default function DrawerWeatherWidget({ onNavigate, onClose }) {
  const t = useT();
  const { loading, dayNum, isDisplacement, citiesWeather, phase, dateLabel } = useTodayWeatherForecast();

  if (!citiesWeather || citiesWeather.length === 0) return null;

  function handleClick() {
    onNavigate?.("clima");
    onClose?.();
  }

  function getWeatherIcon(sky, rain) {
    if (rain >= 50 || sky === "rain") {
      return <CloudRain size={15} className="text-sky-400 shrink-0" strokeWidth={2.4} />;
    }
    if (sky === "sun" && rain < 25) {
      return <Sun size={15} className="text-amber-400 shrink-0" strokeWidth={2.4} />;
    }
    if (sky === "partly" || rain < 40) {
      return <CloudSun size={15} className="text-sky-200 shrink-0" strokeWidth={2.2} />;
    }
    return <Cloud size={15} className="text-slate-300 shrink-0" strokeWidth={2.2} />;
  }

  function getRainBadgeColor(rain) {
    if (rain >= 60) return { color: "#93c5fd", bg: "rgba(59, 130, 246, 0.22)", border: "rgba(96, 165, 250, 0.35)" };
    if (rain >= 35) return { color: "#bae6fd", bg: "rgba(14, 165, 233, 0.18)", border: "rgba(56, 189, 248, 0.25)" };
    if (rain >= 15) return { color: "#e2e8f0", bg: "rgba(255, 255, 255, 0.1)", border: "rgba(255, 255, 255, 0.15)" };
    return { color: "#86efac", bg: "rgba(34, 197, 94, 0.15)", border: "rgba(74, 222, 128, 0.2)" };
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleClick}
        className="w-full text-left rounded-xl transition-all select-none group"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(15, 8, 8, 0.42) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.13)",
          padding: "10px 12px",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
        }}
      >
        {/* Widget Header */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Droplets size={13} className="text-sky-400 shrink-0" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#e8b74a",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {t("nav.rainToday") || "Lluvia hoy"}
            </span>
            <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
              {`· ${t("common.day") || "Día"} ${dayNum}${dateLabel ? ` (${dateLabel})` : ""}`}
            </span>
          </div>

          <div className="flex items-center gap-0.5 text-white/50 group-hover:text-white transition-colors">
            <span style={{ fontSize: 10, fontWeight: 600 }}>{t("nav.clima") || "Clima"}</span>
            <ArrowRight size={11} />
          </div>
        </div>

        {/* Cities Forecast Cards */}
        {isDisplacement ? (
          <div className="flex flex-col gap-1.5">
            {citiesWeather.map((item, idx) => {
              const rainStyle = getRainBadgeColor(item.rain);
              return (
                <div
                  key={item.cityKey}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={11} className="text-white/60 shrink-0" />
                    <span
                      className="truncate"
                      style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}
                    >
                      {item.displayName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
                      {item.high}°
                    </span>
                    <div
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded"
                      style={{
                        background: rainStyle.bg,
                        color: rainStyle.color,
                        border: `1px solid ${rainStyle.border}`,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {getWeatherIcon(item.sky, item.rain)}
                      <span>{item.rain}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {citiesWeather.map((item) => {
              const rainStyle = getRainBadgeColor(item.rain);
              return (
                <div
                  key={item.cityKey}
                  className="flex items-center justify-between px-2.5 py-2 rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={12} className="text-white/60 shrink-0" />
                    <span
                      className="truncate"
                      style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}
                    >
                      {item.displayName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                      {item.high}° / {item.low}°
                    </span>
                    <div
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded"
                      style={{
                        background: rainStyle.bg,
                        color: rainStyle.color,
                        border: `1px solid ${rainStyle.border}`,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {getWeatherIcon(item.sky, item.rain)}
                      <span>{item.rain}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </button>
    </div>
  );
}
