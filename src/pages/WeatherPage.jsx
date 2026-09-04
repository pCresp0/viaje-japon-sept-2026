import { useState, useEffect, useCallback } from "react";
import { Cloud, CloudRain, Sun, CloudSun, MapPin, Droplets, Loader2, Info, RefreshCw, ExternalLink } from "lucide-react";

import { useContent } from "../i18n/LanguageContext";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { diffDays, todayISO } from "../utils/date";

const dayDateMap = {
  1: "7 Sept",
  2: "8 Sept",
  3: "9 Sept",
  4: "10 Sept",
  5: "11 Sept",
  6: "12 Sept",
  7: "13 Sept",
  8: "14 Sept",
  9: "15 Sept",
  10: "16 Sept",
  11: "17 Sept",
  12: "18 Sept",
  13: "19 Sept",
  14: "20 Sept",
  15: "21 Sept",
};

function getDayDateLabel(dayNum) {
  return dayDateMap[dayNum] || `Día ${dayNum}`;
}

function getCityWeatherUrl(city) {
  const queryCity = city === "Tsumago" ? "Nagiso Tsumago" : city === "Fuji" ? "Fujikawaguchiko" : city;
  return `https://www.google.com/search?q=${encodeURIComponent(`tiempo en ${queryCity} Japon`)}`;
}

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

function computeCityWeatherBadges(w, liveWeather, dailyWeather, weatherLabels) {
  if (!liveWeather) return [];
  const cityDays = liveWeather.filter(d => d.city === w.city);
  const baseDays = dailyWeather.filter(d => d.city === w.city);
  if (cityDays.length === 0) return [];

  const avgHighLive = cityDays.reduce((acc, d) => acc + d.high, 0) / cityDays.length;
  const diffTemp = avgHighLive - w.avg;

  const avgRainLive = cityDays.reduce((acc, d) => acc + d.rain, 0) / cityDays.length;
  const baseRainAvg = baseDays.length > 0 ? (baseDays.reduce((acc, d) => acc + d.rain, 0) / baseDays.length) : 25;
  const rainDaysLive = cityDays.filter(d => d.sky === "rain" || d.rain >= 50).length;
  const rainDaysBase = baseDays.filter(d => d.sky === "rain" || d.rain >= 50).length;
  const sunDaysLive = cityDays.filter(d => d.sky === "sun").length;
  const cloudDaysLive = cityDays.filter(d => d.sky === "cloud" || d.sky === "partly").length;

  const badges = [];

  // 1. Comparación de temperatura en vivo vs histórica
  const roundedDiff = Math.abs(Math.round(diffTemp * 10) / 10);
  if (diffTemp >= 2.5) {
    badges.push({ 
      text: `🔥 +${roundedDiff}°C Mucho más calor`, 
      color: "#ef4444", 
      bg: "rgba(239, 68, 68, 0.12)" 
    });
  } else if (diffTemp >= 1.2) {
    badges.push({ 
      text: `🌡️ +${roundedDiff}°C Más calor`, 
      color: "#ea580c", 
      bg: "rgba(234, 88, 12, 0.12)" 
    });
  } else if (diffTemp <= -2.5) {
    badges.push({ 
      text: `❄️ -${roundedDiff}°C Mucho más frío`, 
      color: "#2563eb", 
      bg: "rgba(37, 99, 235, 0.12)" 
    });
  } else if (diffTemp <= -1.2) {
    badges.push({ 
      text: `🍃 -${roundedDiff}°C Más fresco`, 
      color: "#0284c7", 
      bg: "rgba(2, 132, 199, 0.12)" 
    });
  }

  // 2. Comparación de lluvia / sol / nubes en vivo vs esperada
  // Caso A: Lluvia imprevista (se esperaba seco pero la API marca lluvia o alta prob.)
  if (baseRainAvg < 30 && rainDaysBase === 0 && (avgRainLive >= 40 || rainDaysLive >= 1)) {
    badges.push({ 
      text: `🌧️ Lluvia no prevista (${Math.round(avgRainLive)}%)`, 
      color: "#6366f1", 
      bg: "rgba(99, 102, 241, 0.12)" 
    });
  } 
  // Caso B: Más lluvia de la esperada
  else if (avgRainLive - baseRainAvg >= 15 || (avgRainLive >= 50 && baseRainAvg < 45)) {
    badges.push({ 
      text: `🌧️ Más lluvia de lo previsto (${Math.round(avgRainLive)}%)`, 
      color: "#6366f1", 
      bg: "rgba(99, 102, 241, 0.12)" 
    });
  }
  // Caso C: Más soleado de lo esperado (en lugares donde suele llover en septiembre o se preveía lluvia)
  else if ((baseRainAvg >= 35 || rainDaysBase > 0) && avgRainLive <= 25 && rainDaysLive === 0) {
    badges.push({ 
      text: `☀️ Más soleado de lo esperado`, 
      color: "#16a34a", 
      bg: "rgba(22, 163, 74, 0.12)" 
    });
  }
  // Caso D: Predominio claro de sol
  else if (sunDaysLive / cityDays.length >= 0.6 && avgRainLive <= 20) {
    badges.push({ 
      text: `☀️ Muy soleado`, 
      color: "#16a34a", 
      bg: "rgba(22, 163, 74, 0.12)" 
    });
  }
  // Caso E: Mayormente nublado
  else if (cloudDaysLive / cityDays.length >= 0.65 && avgRainLive < 40) {
    badges.push({ 
      text: `☁️ Más nublado`, 
      color: "#64748b", 
      bg: "rgba(100, 116, 139, 0.12)" 
    });
  }

  // 3. Si no hay variaciones significativas ni de temp ni de precipitaciones
  if (badges.length === 0) {
    badges.push({ 
      text: `✨ ${weatherLabels.compExpected || "Lo esperado"}`, 
      color: "#10b981", 
      bg: "rgba(16, 185, 129, 0.12)" 
    });
  }

  return badges;
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

      const today = todayISO();
      
      const updatedDaily = dailyWeather.map(d => {
        const dateStr = `2026-09-${String(6 + d.day).padStart(2, "0")}`;
        const daysLeft = diffDays(today, dateStr);
        
        const cityData = weatherMap[d.city];
        if (!cityData) return { ...d, daysLeft, dateStr };
        
        const dateIndex = cityData.time ? cityData.time.indexOf(dateStr) : -1;
        let high, low, rain, sky, condition, isFallback = false;

        const liveMax = dateIndex !== -1 ? cityData.temperature_2m_max?.[dateIndex] : null;
        const liveMin = dateIndex !== -1 ? cityData.temperature_2m_min?.[dateIndex] : null;
        const liveRain = dateIndex !== -1 ? cityData.precipitation_probability_max?.[dateIndex] : null;
        const liveWmo = dateIndex !== -1 ? cityData.weathercode?.[dateIndex] : null;

        if (dateIndex !== -1 && liveMax != null && liveMin != null) {
          high = Math.round(liveMax);
          low = Math.round(liveMin);
          rain = liveRain != null ? liveRain : d.rain;
          sky = liveWmo != null ? getSkyFromWMO(liveWmo) : d.sky;
          condition = liveWmo != null ? getConditionFromWMO(liveWmo) : d.condition;
          isFallback = false;
        } else {
          // Si el día está fuera del rango de predicción o la API aún no tiene temps calculadas (p.ej. null a 16 días)
          high = d.high;
          low = d.low;
          rain = liveRain != null ? liveRain : d.rain;
          sky = liveWmo != null ? getSkyFromWMO(liveWmo) : d.sky;
          condition = liveWmo != null ? getConditionFromWMO(liveWmo) : d.condition;
          isFallback = true;
        }
        
        return { ...d, high, low, rain, sky, condition, isFallback, daysLeft, dateStr };
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

      {/* Day-by-day forecast */}
      <p className="eyebrow mb-3 mt-6 flex items-center justify-between" style={{ color: "var(--ink-soft)" }}>
        <span>{weatherLabels.previsionDiaDia}</span>
        {!loading && <span className="text-[10px] font-medium bg-slate-100 px-2 py-0.5 rounded-md text-slate-500">API: Open-Meteo</span>}
      </p>
      <div className="space-y-3">
        {displayWeather.map((d, idx) => {
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
            <a
              href={getCityWeatherUrl(d.city)}
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] py-2 px-3 shadow-sm relative overflow-hidden block transition-all duration-200 hover:opacity-95 hover:shadow-md active:scale-[0.99] group select-none no-underline text-white" 
              style={{ background: bg, color: "white", textDecoration: "none", cursor: "pointer" }}
              title={`Ver previsión detallada de ${d.city} en Google Weather ↗`}
            >
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
                    <div className="flex items-center gap-1 mt-1 text-white/90" style={{ fontSize: 9.5 }}>
                      <Info size={10} />
                      {d.daysLeft != null
                        ? (d.daysLeft === 1
                            ? "Falta 1 día. Mostrando tiempo de hoy."
                            : `Faltan ${d.daysLeft} días. Mostrando tiempo de hoy.`)
                        : "Mostrando tiempo de hoy."}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 font-semibold opacity-95 group-hover:opacity-100 transition-opacity" style={{ fontSize: 11.5, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  <span>{getDayDateLabel(d.day)}</span>
                  <ExternalLink size={10.5} className="opacity-70 group-hover:opacity-100 transition-opacity" />
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
            </a>
            </Highlightable>
          );
        })}
      </div>

      {/* City weather overview */}
      <p className="eyebrow mb-3 mt-8 flex items-center justify-between" style={{ color: "var(--ink-soft)" }}>
        <span>{weatherLabels.condicionesGrales}</span>
      </p>
      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {weatherData.map((w, idx) => {
          const cityDays = liveWeather ? liveWeather.filter(d => d.city === w.city) : [];
          const liveAvgHigh = cityDays.length > 0 ? Math.round(cityDays.reduce((acc, d) => acc + d.high, 0) / cityDays.length) : null;
          const liveAvgRain = cityDays.length > 0 ? Math.round(cityDays.reduce((acc, d) => acc + d.rain, 0) / cityDays.length) : null;
          const badges = computeCityWeatherBadges(w, liveWeather, dailyWeather, weatherLabels);

          return (
            <Highlightable key={idx} id={slug("weather", w.city)}>
            <a
              href={getCityWeatherUrl(w.city)}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl p-4 border flex flex-col justify-between transition-all duration-200 hover:border-slate-400 hover:shadow-md active:scale-[0.99] no-underline text-inherit block group cursor-pointer"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)", textDecoration: "none" }}
              title={`Ver previsión detallada de ${w.city} en Google Weather ↗`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: 20 }}>{w.emoji}</span>
                  <div className="flex items-center gap-1.5">
                    {liveAvgHigh != null && (
                      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full" 
                        style={{ background: "rgba(29,53,87,0.08)", color: "var(--indigo)" }}>
                        API en vivo
                      </span>
                    )}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-60 transition-opacity text-slate-500" />
                  </div>
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>
                  {w.city}
                </p>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span style={{ fontSize: 18, color: "var(--shu)", fontWeight: 700, lineHeight: 1 }}>
                    {liveAvgHigh != null ? `${liveAvgHigh}°C` : `${w.avg}°C`}
                  </span>
                  {liveAvgHigh != null && liveAvgHigh !== w.avg && (
                    <span style={{ fontSize: 11, color: "var(--ink-soft)", textDecoration: "line-through", opacity: 0.6 }}>
                      {w.avg}°C
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>media</span>
                </div>
                <p style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                  {w.condition}
                </p>
                <p style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 4, opacity: 0.8 }}>
                  {weatherLabels.lluvia} {liveAvgRain != null ? `${liveAvgRain}% prev.` : w.precip} 
                  {liveAvgRain != null && <span className="opacity-60"> (habitual: {w.precip})</span>}
                </p>
              </div>
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5" style={{ borderTop: '1px solid var(--line)' }}>
                  {badges.map((b, bIdx) => (
                    <span 
                      key={bIdx} 
                      style={{ 
                        fontSize: 9.5, 
                        fontWeight: 700, 
                        color: b.color, 
                        backgroundColor: b.bg, 
                        padding: '2.5px 6px', 
                        borderRadius: '4px',
                        letterSpacing: '0.01em',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {b.text}
                    </span>
                  ))}
                </div>
              )}
            </a>
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
