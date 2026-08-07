import { Cloud, CloudRain, Sun, CloudSun, MapPin, Droplets } from "lucide-react";

// Approximate weather for September 2026 in Japan (based on historical patterns)
const weatherData = [
  { city: "Kioto", avg: 28, min: 22, max: 33, condition: "Calor y humedad", emoji: "☀️", precip: "Ocasional" },
  { city: "Kanazawa", avg: 27, min: 21, max: 32, condition: "Calor, lluvias posibles", emoji: "⛅", precip: "Frecuente" },
  { city: "Takayama", avg: 24, min: 18, max: 29, condition: "Más templado", emoji: "🌤️", precip: "Posible" },
  { city: "Tsumago", avg: 23, min: 17, max: 28, condition: "Fresco (alta montaña)", emoji: "🌲", precip: "Variable" },
  { city: "Tokio", avg: 27, min: 21, max: 32, condition: "Calor y humedad", emoji: "☀️", precip: "Ocasional" },
];

const dailyWeather = [
  { day: 1, city: "Kioto", high: 31, low: 23, condition: "Soleado", rain: 10 },
  { day: 2, city: "Kioto", high: 30, low: 22, condition: "Parcialmente nublado", rain: 20 },
  { day: 3, city: "Kioto", high: 29, low: 21, condition: "Parcialmente nublado", rain: 30 },
  { day: 4, city: "Kioto", high: 28, low: 20, condition: "Lluvia ligera", rain: 60 },
  { day: 5, city: "Kioto", high: 29, low: 21, condition: "Soleado", rain: 10 },
  { day: 6, city: "Kanazawa", high: 27, low: 20, condition: "Lluvia intermitente", rain: 70 },
  { day: 7, city: "Takayama", high: 25, low: 18, condition: "Nublado", rain: 40 },
  { day: 8, city: "Tsumago", high: 23, low: 16, condition: "Soleado", rain: 5 },
  { day: 9, city: "Tokio", high: 30, low: 22, condition: "Soleado", rain: 10 },
  { day: 10, city: "Tokio", high: 29, low: 21, condition: "Parcialmente nublado", rain: 25 },
  { day: 11, city: "Tokio", high: 28, low: 20, condition: "Soleado", rain: 15 },
  { day: 12, city: "Tokio", high: 27, low: 19, condition: "Lluvia ligera", rain: 50 },
  { day: 13, city: "Tokio", high: 28, low: 20, condition: "Parcialmente nublado", rain: 30 },
  { day: 14, city: "Tokio", high: 29, low: 21, condition: "Soleado", rain: 10 },
  { day: 15, city: "Tokio", high: 30, low: 22, condition: "Soleado", rain: 5 },
];

export default function WeatherPage() {
  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Previsiones</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Clima por ciudad</h2>
      </div>

      {/* City weather overview */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Septiembre 2026 — Condiciones generales</p>
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {weatherData.map((w, idx) => (
          <div key={idx} className="rounded-xl p-4 border"
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
              Lluvia: {w.precip}
            </p>
          </div>
        ))}
      </div>

      {/* Day-by-day forecast */}
      <p className="eyebrow mb-3 mt-6" style={{ color: "var(--ink-soft)" }}>Previsión día a día</p>
      <div className="space-y-3">
        {dailyWeather.map((d, idx) => {
          let bg = "linear-gradient(135deg, #606C88 0%, #3F4C6B 100%)";
          let Icon = Cloud;
          if (d.condition.includes("Soleado")) {
            bg = "linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)";
            Icon = Sun;
          } else if (d.condition.includes("Parcialmente")) {
            bg = "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)";
            Icon = CloudSun;
          } else if (d.condition.includes("Lluvia")) {
            bg = "linear-gradient(135deg, #3A7BD5 0%, #3A6073 100%)";
            Icon = CloudRain;
          }

          return (
            <div key={idx} className="rounded-[14px] py-2.5 px-3.5 shadow-sm relative overflow-hidden" 
              style={{ background: bg, color: "white" }}>
              {/* Decorational circles for glassmorphism / modern feel */}
              <div style={{
                position: "absolute", top: "-30%", right: "-5%",
                width: "120px", height: "120px",
                background: "rgba(255,255,255,0.12)",
                borderRadius: "50%", pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute", bottom: "-40%", right: "20%",
                width: "80px", height: "80px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "50%", pointerEvents: "none"
              }} />

              <div className="relative z-10 flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon size={15} strokeWidth={2.5} />
                  <span className="font-semibold" style={{ fontSize: 13, letterSpacing: "0.02em", textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                    {d.condition}
                  </span>
                </div>
                <div className="font-semibold opacity-95" style={{ fontSize: 12, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  Día {d.day}
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end">
                <div className="flex items-baseline gap-1" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                  <span className="font-display font-bold" style={{ fontSize: 28, lineHeight: 1 }}>{d.high}°</span>
                  <span className="font-medium" style={{ fontSize: 15, opacity: 0.85 }}>/ {d.low}°</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-0.5" style={{ fontSize: 11, opacity: 0.9 }}>
                    <Droplets size={11} strokeWidth={2.5} />
                    <span className="font-medium">{d.rain}% lluvia</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 font-bold" style={{ fontSize: 13, textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                    <MapPin size={12} strokeWidth={2.5} />
                    {d.city}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="rounded-xl p-4 mt-6" style={{ background: "rgba(46,125,91,0.1)", border: "1px solid rgba(46,125,91,0.3)" }}>
        <p style={{ fontSize: 12.5, color: "var(--forest)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
          💧 Septiembre es temporada de lluvias en Japón — llevar paraguas o chubasquero. Las temperaturas bajan en las montañas (Alpes y Nakasendo), así que ropa por capas es esencial.
        </p>
      </div>
    </div>
  );
}
