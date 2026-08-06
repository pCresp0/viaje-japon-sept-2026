import { useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";

// Real coordinates verified via Google Places
const stops = [
  {
    id: "narita",
    name: "Aeropuerto de Narita",
    city: "Chiba",
    lat: 35.770178, lng: 140.3843215,
    emoji: "✈️",
    type: "airport",
    color: "#c9a227",
    detail: "Llegada día 1 · 12:55",
  },
  {
    id: "kioto",
    name: "Kioto",
    city: "Kioto",
    lat: 35.011564, lng: 135.7681489,
    emoji: "⛩️",
    type: "stay",
    color: "#bc4749",
    detail: "5 noches · Días 1–5 · Hachijoguchi / Tower Annex",
  },
  {
    id: "kanazawa",
    name: "Kanazawa",
    city: "Ishikawa",
    lat: 36.5597341, lng: 136.6520376,
    emoji: "🏯",
    type: "stay",
    color: "#2e7d5b",
    detail: "1 noche · Día 6 · Hotel Resol Trinity",
  },
  {
    id: "takayama",
    name: "Takayama",
    city: "Gifu",
    lat: 36.1461317, lng: 137.252159,
    emoji: "🏮",
    type: "stay",
    color: "#2e7d5b",
    detail: "2 noches · Días 7–8 · Washington Plaza / Hotel Wood",
  },
  {
    id: "tsumago",
    name: "Tsumago-juku",
    city: "Nagano",
    lat: 35.5775876, lng: 137.5956667,
    emoji: "🚶",
    type: "stay",
    color: "#2e7d5b",
    detail: "1 noche · Día 8 · Fin de la ruta Nakasendo",
  },
  {
    id: "tokio",
    name: "Tokio",
    city: "Tokio",
    lat: 35.6764225, lng: 139.650027,
    emoji: "🗼",
    type: "stay",
    color: "#1d3557",
    detail: "6 noches · Días 9–15 · Asakusa Kappabashi / Keihan",
  },
];

// Google Maps embed showing the actual route with all waypoints
const routeMapUrl = "https://www.google.com/maps/embed/v1/directions?key=&origin=Narita+Airport,+Japan&destination=Tokyo,+Japan&waypoints=Kyoto,+Japan|Kanazawa,+Japan|Takayama,+Gifu,+Japan|Tsumago-juku,+Nagiso,+Japan&mode=driving";

// Fallback: static Google Maps embed centered on Japan with a search query showing all our cities
const staticMapUrl = "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1656789.512!2d137.2!3d35.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m5!3e0!4m0!4m5!3e0!4m0!5e0!3m2!1sen!2sjp!4v1693472846821";

export default function MapPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="px-4 pt-6 pb-12 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Ubicaciones clave</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Mapa de la ruta</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>
          Las 6 paradas del viaje, de norte a sur: Narita → Kioto → Kanazawa → Takayama → Tsumago → Tokio.
        </p>
      </div>

      {/* Route visual — vertical timeline with map link per stop */}
      <div className="rounded-2xl border overflow-hidden mb-6"
        style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        {stops.map((stop, idx) => (
          <div key={stop.id}
            className="relative flex gap-4 px-5 py-4 cursor-pointer transition-colors"
            style={{
              borderBottom: idx < stops.length - 1 ? "1px solid var(--line)" : "none",
              background: selected === stop.id ? `${stop.color}08` : "transparent",
            }}
            onClick={() => setSelected(selected === stop.id ? null : stop.id)}
            onMouseEnter={e => { if (selected !== stop.id) e.currentTarget.style.background = "rgba(0,0,0,0.015)"; }}
            onMouseLeave={e => { if (selected !== stop.id) e.currentTarget.style.background = "transparent"; }}
          >
            {/* connector line + dot */}
            <div className="flex flex-col items-center" style={{ width: 20 }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%",
                background: stop.color,
                border: "3px solid var(--paper-raised)",
                boxShadow: `0 0 0 2px ${stop.color}`,
                flexShrink: 0, marginTop: 2,
              }} />
              {idx < stops.length - 1 && (
                <div style={{ width: 2, flex: 1, background: "var(--line)", marginTop: 4 }} />
              )}
            </div>

            {/* content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 18 }}>{stop.emoji}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{stop.name}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: stop.color, color: "white", fontSize: 11, fontWeight: 600, textDecoration: "none" }}
                >
                  <ExternalLink size={11} />
                  Maps
                </a>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>{stop.detail}</p>

              {selected === stop.id && (
                <div className="mt-3 rounded-xl overflow-hidden border" style={{ borderColor: "var(--line)", height: 220 }}>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps?q=${stop.lat},${stop.lng}&z=12&output=embed`}
                    style={{ width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full route overview map */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Vista general de la ruta</p>
      <div className="rounded-2xl overflow-hidden mb-6 border" style={{ borderColor: "var(--line)", height: 380 }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps?q=Kyoto+Kanazawa+Takayama+Tsumago+Tokyo+Japan&z=6&output=embed"
          style={{ width: "100%", height: "100%" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Info box */}
      <div className="rounded-xl p-4" style={{ background: "var(--indigo)", color: "white" }}>
        <p style={{ fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
          💡 Pulsa cualquier parada arriba para ver su ubicación exacta ampliada, o el botón "Maps" para abrirla directamente en Google Maps con direcciones.
        </p>
      </div>
    </div>
  );
}
