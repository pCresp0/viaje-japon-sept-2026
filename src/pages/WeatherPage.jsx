import { useState, useEffect, useCallback } from "react";
import { Cloud, CloudRain, Sun, CloudSun, MapPin, Droplets, Loader2, Info, RefreshCw } from "lucide-react";

import { useContent } from "../i18n/LanguageContext";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

const cityCoords = {
  "Kioto": { lat: 35.0116, lon: 135.7681 },
  "Kanazawa": { lat: 36.5613, lon: 136.6562 },
  "Takayama": { lat: 36.1461, lon: 137.2522 },
  "Tsumago": { lat: 35.5768, lon: 137.5954 },
  "Tokio": { lat: 35.6895, lon: 139.6917 }
};

function getSkyFromWMO(code) {
  if (code === 0) return "sun";
  if (code === 1 || code === 2) return "partly";
  if (code === 3 || code === 45 || code === 48) return "cloud";
  return "rain";
}

function getConditionFromWMO(code) {
  if (code === 0) return "Soleado";
  if (code === 1 || code === 2) return "Parcialmente nublado";
  if (code === 3 || code === 45 || code === 48) return "Nublado";
  if (code >= 51 && code <= 67) return "Lluvia";
  if (code >= 71 && code <= 86) return "Nieve/Lluvia";
  if (code >= 95) return "Tormenta";
  return "Variable";
}

export default function WeatherPage() {
  const { weatherData, dailyWeather, weatherLabels } = useContent();
  const [liveWeather, setLiveWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const cities = Object.keys(cityCoords);
      const lats = cities.map(c => cityCoords[c].lat).join(",");
      const lons = cities.map(c => cityCoords[c].lon).join(",");
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=16`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      const resultsArray = Array.isArray(data) ? data : [data];
      
      const weatherMap = {};
      cities.forEach((city, index) => {
        weatherMap[city] = resultsArray[index].daily;
      });

      const tripStartDate = new Date("2026-09-07T00:00:00+09:00");
      
      const updatedDaily = dailyWeather.map(d => {
        const targetDate = new Date(tripStartDate);
        targetDate.setDate(tripStartDate.getDate() + (d.day - 1));
        const dateStr = targetDate.toISOString().split("T")[0];
        
        const cityData = weatherMap[d.city];
        if (!cityData) return d;
        
        const dateIndex = cityData.time.indexOf(dateStr);
        let high, low, rain, sky, condition, isFallback = false;

        if (dateIndex !== -1) {
          high = Math.round(cityData.temperature_2m_max[dateIndex]);
          low = Math.round(cityData.temperature_2m_min[dateIndex]);
          rain = cityData.precipitation_probability_max[dateIndex] || 0;
          const wmo = cityData.weathercode[dateIndex];
          sky = getSkyFromWMO(wmo);
          condition = getConditionFromWMO(wmo);
        } else {
          high = Math.round(cityData.temperature_2m_max[0]);
          low = Math.round(cityData.temperature_2m_min[0]);
          rain = cityData.precipitation_probability_max[0] || 0;
          const wmo = cityData.weathercode[0];
          sky = getSkyFromWMO(wmo);
          condition = getConditionFromWMO(wmo);
          isFallback = true;
        }
        
        return { ...d, high, low, rain, sky, condition, isFallback };
      });
      
      setLiveWeather(updatedDaily);
      setLastFetched(new Date());
    } catch (err) {
      console.error("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  }, [dailyWeather]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const displayWeather = liveWeather || dailyWeather;

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6 flex justify-between items-start gap-4">
        <div>
          <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{weatherLabels.previsiones}</p>
          <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{weatherLabels.climaCiudad}</h2>
        </div>
        <div className="flex flex-col items-end gap-1 mt-1">
          <button 
            onClick={() => !loading && fetchWeather()}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-green-50 border-green-200 text-green-700 shadow-sm transition-colors hover:bg-green-100 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <RefreshCw size={12} />
            )}
            <span className="text-[10px] font-bold tracking-widest uppercase">{loading ? 'Cargando' : 'Actualizar'}</span>
          </button>
          {lastFetched && (
            <span className="text-[9px] text-slate-400 font-medium mr-1">
              {lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* City weather overview */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>{weatherLabels.condicionesGrales}</p>
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {weatherData.map((w, idx) => (
          <Highlightable key={idx} id={slug("weather", w.city)}>
          <div className="rounded-xl p-4 border"
            style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 20 }}>{w.emoji}</span>
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", marginBottom: 1 }}>
              {w.city}
            </p>
            <p style={{ fontSize: 12, color: "var(--shu)", fontWeight: 600, marginBottom: 4 }}>
              {w.avg}°C
            </p>
            <p style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.4 }}>
              {w.condition}
            </p>
            <p style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 3, opacity: 0.7 }}>
              {weatherLabels.lluvia} {w.precip}
            </p>
          </div>
          </Highlightable>
        ))}
      </div>

      {/* Day-by-day forecast */}
      <p className="eyebrow mb-3 mt-6 flex items-center justify-between" style={{ color: "var(--ink-soft)" }}>
        <span>{weatherLabels.previsionDiaDia}</span>
        {!loading && <span className="text-[10px] font-medium bg-slate-100 px-2 py-0.5 rounded-md text-slate-500">API: Open-Meteo</span>}
      </p>
      <div className="space-y-3">
        {displayWeather.map((d, idx) => {
          // El icono se elige por la clave estable `sky`, no analizando el
          // texto: al traducir la app, buscar "Soleado" o "Lluvia" fallaría
          // y todos los días saldrían con el icono genérico de nube.
          let bg = "linear-gradient(135deg, #606C88 0%, #3F4C6B 100%)";
          let Icon = Cloud;
          if (d.sky === "sun") {
            bg = "linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)";
            Icon = Sun;
          } else if (d.sky === "partly") {
            bg = "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)";
            Icon = CloudSun;
          } else if (d.sky === "rain") {
            bg = "linear-gradient(135deg, #3A7BD5 0%, #3A6073 100%)";
            Icon = CloudRain;
          }

          return (
            <Highlightable key={idx} id={slug("weather-day", d.day)}>
            <div className="rounded-[10px] py-2 px-3 shadow-sm relative overflow-hidden" 
              style={{ background: bg, color: "white" }}>
              {/* Decorational circles for glassmorphism / modern feel */}
              <div style={{
                position: "absolute", top: "-30%", right: "-5%",
                width: "90px", height: "90px",
                background: "rgba(255,255,255,0.12)",
                borderRadius: "50%", pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute", bottom: "-40%", right: "20%",
                width: "60px", height: "60px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "50%", pointerEvents: "none"
              }} />

              <div className="relative z-10 flex justify-between items-center mb-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} strokeWidth={2.5} />
                    <span className="font-semibold" style={{ fontSize: 12, letterSpacing: "0.02em", textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                      {d.condition}
                    </span>
                  </div>
                  {d.isFallback && (
                    <div className="flex items-center gap-1 mt-1 text-white/90" style={{ fontSize: 9 }}>
                      <Info size={9} />
                      Faltan +16 días. Mostrando tiempo de hoy.
                    </div>
                  )}
                </div>
                <div className="font-semibold opacity-95" style={{ fontSize: 11, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  {weatherLabels.dia} {d.day}
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <div className="flex items-baseline gap-1" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                  <span className="font-display font-bold" style={{ fontSize: 24, lineHeight: 1 }}>{d.high}°</span>
                  <span className="font-medium" style={{ fontSize: 13, opacity: 0.85 }}>/ {d.low}°</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1" style={{ fontSize: 10, opacity: 0.9, marginBottom: 2 }}>
                    <Droplets size={10} strokeWidth={2.5} />
                    <span className="font-medium">{d.rain}{weatherLabels.probLluvia}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 font-bold" style={{ fontSize: 12, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                    <MapPin size={11} strokeWidth={2.5} />
                    {d.city}
                  </div>
                </div>
              </div>
            </div>
            </Highlightable>
          );
        })}
      </div>

      {/* Tips */}
      <div className="rounded-xl p-4 mt-6" style={{ background: "rgba(46,125,91,0.1)", border: "1px solid rgba(46,125,91,0.3)" }}>
        <p style={{ fontSize: 12.5, color: "var(--forest)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          {weatherLabels.tipTexto}
        </p>
      </div>

      {/* Visibilidad y Webcams del Monte Fuji */}
      <div className="rounded-2xl p-4 mt-6 border" style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: 18 }}>🗻</span>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--indigo)", margin: 0 }}>
            Visibilidad en Directo del Monte Fuji (Días 10–14 · 16–20 sept)
          </p>
        </div>
        <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 10 }}>
          <strong>La regla de oro:</strong> Comprobad las webcams en directo a las <strong>06:30 AM</strong> desde el hotel. Si a las 07:00 AM no se ve, no suele despejarse más tarde (a partir de las 09:00 AM el calor forma nubes).
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://isfujivisible.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold px-3 py-2 rounded-xl border flex items-center gap-1.5"
            style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--indigo)", textDecoration: "none" }}
          >
            🌐 isfujivisible.com (Índice 1-10) ↗
          </a>
          <a
            href="https://mtfujitoday.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold px-3 py-2 rounded-xl border flex items-center gap-1.5"
            style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--forest)", textDecoration: "none" }}
          >
            📹 mtfujitoday.com (Webcams en Vivo) ↗
          </a>
        </div>
      </div>
    </div>
  );
}
