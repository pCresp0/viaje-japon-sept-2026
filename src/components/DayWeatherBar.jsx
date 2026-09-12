import { Sun, CloudSun, Cloud, CloudRain, Droplets, Loader2 } from "lucide-react";
import { useDayWeatherForecast } from "../utils/weatherService";

const SKY_ICON = { sun: Sun, partly: CloudSun, cloud: Cloud, rain: CloudRain };
const SKY_COLOR = { sun: "#e8a83c", partly: "#7a8fa6", cloud: "#8a94a3", rain: "#4a7ab5" };

/**
 * Barra de clima compacta para un día concreto del itinerario -- misma
 * fuente de datos que la página de Clima (useDayWeatherForecast, con
 * datos en vivo y respaldo estático), pero en una sola línea estrecha
 * en vez de la tarjeta grande de esa página, para no ocupar demasiado
 * espacio dentro de la vista del día.
 */
export default function DayWeatherBar({ dayNum }) {
  const { loading, citiesWeather } = useDayWeatherForecast(dayNum);

  if (!citiesWeather || citiesWeather.length === 0) return null;

  return (
    <div
      className="flex items-center gap-3 px-3.5 py-2 overflow-x-auto"
      style={{ background: "var(--paper-raised)", borderBottom: "1px solid var(--line)" }}
    >
      {loading && citiesWeather.every((c) => !c.isLive) && (
        <Loader2 size={13} className="animate-spin shrink-0" style={{ color: "var(--ink-soft)" }} />
      )}
      {citiesWeather.map((c, i) => {
        const Icon = SKY_ICON[c.sky] || Cloud;
        return (
          <div key={c.cityKey} className="flex items-center gap-1.5 shrink-0">
            {i > 0 && <span style={{ color: "var(--line)" }}>·</span>}
            <Icon size={15} style={{ color: SKY_COLOR[c.sky] || "var(--ink-soft)" }} />
            <span className="text-[12px] font-semibold" style={{ color: "var(--ink)" }}>
              {c.displayName}
            </span>
            <span className="text-[12px] font-bold" style={{ color: "var(--ink)" }}>
              {c.high}°/{c.low}°
            </span>
            <span className="flex items-center gap-0.5 text-[11px]" style={{ color: "var(--ink-soft)" }}>
              <Droplets size={11} />
              {c.rain}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
