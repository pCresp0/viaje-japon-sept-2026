import { Cloud, CloudRain, Sun, CloudSun, MapPin, Droplets } from "lucide-react";

import { useContent } from "../i18n/LanguageContext";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

export default function WeatherPage() {
  const { weatherData, dailyWeather, weatherLabels } = useContent();

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{weatherLabels.previsiones}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{weatherLabels.climaCiudad}</h2>
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
      <p className="eyebrow mb-3 mt-6" style={{ color: "var(--ink-soft)" }}>{weatherLabels.previsionDiaDia}</p>
      <div className="space-y-3">
        {dailyWeather.map((d, idx) => {
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
                <div className="flex items-center gap-1.5">
                  <Icon size={14} strokeWidth={2.5} />
                  <span className="font-semibold" style={{ fontSize: 12, letterSpacing: "0.02em", textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                    {d.condition}
                  </span>
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
    </div>
  );
}
