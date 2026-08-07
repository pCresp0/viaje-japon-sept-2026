import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

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
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Previsión día a día</p>
      <div className="space-y-2">
        {dailyWeather.map((d, idx) => (
          <div key={idx} className="rounded-lg p-3 flex items-center justify-between"
            style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                Día {d.day} — {d.city}
              </p>
              <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                {d.condition}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--indigo)" }}>
                {d.high}° / {d.low}°
              </p>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", marginTop: 1 }}>
                {d.rain}% lluvia
              </p>
            </div>
          </div>
        ))}
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
