import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink } from "lucide-react";

// Hasta 15 paradas principales, en orden cronológico del viaje
const stops = [
  {
    id: "narita", name: "Narita", city: "Aeropuerto NRT",
    lat: 35.7719, lng: 140.3929,
    emoji: "✈️", color: "#c9a227",
    day: "Día 1",
    detail: "Llegada · N'EX a Tokio / Shinkansen a Kioto",
  },
  {
    id: "kioto", name: "Kioto", city: "Kioto",
    lat: 35.0116, lng: 135.7681,
    emoji: "⛩️", color: "#bc4749",
    day: "Días 1–5",
    detail: "Base 5 noches · Fushimi, Gion, Nishiki, Kiyomizu…",
  },
  {
    id: "nara", name: "Nara", city: "Nara",
    lat: 34.6890, lng: 135.8398,
    emoji: "🦌", color: "#bc4749",
    day: "Día 2",
    detail: "Todai-ji, Gran Buda y parque de los ciervos",
  },
  {
    id: "arashiyama", name: "Arashiyama", city: "Kioto",
    lat: 35.0173, lng: 135.6721,
    emoji: "🎋", color: "#bc4749",
    day: "Día 3",
    detail: "Bosque de bambú, Saga-Toriimoto y Otagi",
  },
  {
    id: "osaka", name: "Osaka", city: "Osaka",
    lat: 34.6873, lng: 135.5262,
    emoji: "🏯", color: "#bc4749",
    day: "Día 5",
    detail: "Castillo, Dotonbori y Shinsekai",
  },
  {
    id: "kanazawa", name: "Kanazawa", city: "Ishikawa",
    lat: 36.5613, lng: 136.6562,
    emoji: "🌸", color: "#2e7d5b",
    day: "Día 6",
    detail: "1 noche · Kenroku-en, Omicho, Higashi Chaya",
  },
  {
    id: "shirakawa", name: "Shirakawa-go", city: "Gifu",
    lat: 36.2577, lng: 136.9063,
    emoji: "🏡", color: "#2e7d5b",
    day: "Día 7",
    detail: "Aldea gassho-zukuri · parada Nohi Bus",
  },
  {
    id: "takayama", name: "Takayama", city: "Gifu",
    lat: 36.1461, lng: 137.2522,
    emoji: "🏮", color: "#2e7d5b",
    day: "Días 7–8",
    detail: "1 noche · Sanmachi Suji y Hida beef",
  },
  {
    id: "magome", name: "Magome", city: "Nakatsugawa",
    lat: 35.5244, lng: 137.5647,
    emoji: "⛰️", color: "#2e7d5b",
    day: "Día 8",
    detail: "1 noche · Magome Chaya · inicio Nakasendo",
  },
  {
    id: "tsumago", name: "Tsumago", city: "Nagano",
    lat: 35.5776, lng: 137.5957,
    emoji: "🚶", color: "#2e7d5b",
    day: "Día 8",
    detail: "Final de la caminata Magome → Tsumago (8 km)",
  },
  {
    id: "asakusa", name: "Asakusa", city: "Tokio",
    lat: 35.7148, lng: 139.7967,
    emoji: "🗼", color: "#1d3557",
    day: "Días 9–15",
    detail: "Base 6 noches · Senso-ji y hotel KOKO",
  },
  {
    id: "akihabara", name: "Akihabara", city: "Tokio",
    lat: 35.6984, lng: 139.7731,
    emoji: "🎮", color: "#1d3557",
    day: "Día 9",
    detail: "Electrónica, figuras y cultura otaku",
  },
  {
    id: "odaiba", name: "Odaiba", city: "Tokio",
    lat: 35.6295, lng: 139.7794,
    emoji: "🌉", color: "#1d3557",
    day: "Día 10",
    detail: "Yurikamome, Gundam y skyline",
  },
  {
    id: "shibuya", name: "Shibuya", city: "Tokio",
    lat: 35.6595, lng: 139.7005,
    emoji: "🚦", color: "#1d3557",
    day: "Día 11",
    detail: "Cruce, Harajuku y Meiji Jingu cerca",
  },
  {
    id: "fuji", name: "Monte Fuji", city: "Yamanashi",
    lat: 35.5009, lng: 138.7606,
    emoji: "🗻", color: "#1d3557",
    day: "Día 14",
    detail: "Excursión con Ken Kaneshima · Chureito / lagos",
  },
];

const routeLine = stops.map((s) => [s.lat, s.lng]);

function createIcon(emoji, color, order) {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 40px; height: 46px;">
        <div style="
          width: 40px; height: 40px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="transform: rotate(45deg); font-size: 16px; line-height: 1;">${emoji}</span>
        </div>
        <div style="
          position: absolute; top: -6px; right: -6px;
          width: 20px; height: 20px;
          background: #1d3557;
          color: white;
          border: 2px solid white;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700;
          font-family: -apple-system, sans-serif;
          box-shadow: 0 1px 4px rgba(0,0,0,0.35);
        ">${order}</div>
      </div>
    `,
    className: "",
    iconSize: [40, 46],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(stops.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [36, 36] });
  }, [map]);
  return null;
}

export default function MapPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Ubicaciones clave</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Mapa de la ruta</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          {stops.length} paradas principales en orden: aeropuerto, ciudades base, pueblos de los Alpes y barrios de Tokio.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden mb-6 border" style={{ borderColor: "var(--line)", height: 520, position: "relative", isolation: "isolate" }}>
        <MapContainer
          center={[36.0, 137.5]}
          zoom={6}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          <Polyline
            positions={routeLine}
            pathOptions={{ color: "#1d3557", weight: 3, opacity: 0.55, dashArray: "8, 8" }}
          />

          {stops.map((stop, idx) => (
            <Marker
              key={stop.id}
              position={[stop.lat, stop.lng]}
              icon={createIcon(stop.emoji, stop.color, idx + 1)}
              eventHandlers={{ click: () => setSelected(stop.id) }}
              opacity={selected && selected !== stop.id ? 0.7 : 1}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 160 }}>
                  <p style={{ fontSize: 11, color: stop.color, fontWeight: 700, marginBottom: 2 }}>
                    PARADA {idx + 1} · {stop.day}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{stop.name}</p>
                  <p style={{ fontSize: 12, color: "#5a6070", marginBottom: 6 }}>{stop.detail}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: stop.color, fontWeight: 600, textDecoration: "none" }}
                  >
                    Abrir en Google Maps ↗
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          <FitBounds />
        </MapContainer>
      </div>

      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
        {stops.length} paradas · en orden del viaje
      </p>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {stops.map((stop, idx) => {
          const isActive = selected === stop.id;
          return (
            <a
              key={stop.id}
              href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl p-3 transition-all"
              style={{
                background: isActive ? `${stop.color}12` : "var(--paper-raised)",
                border: `1px solid ${isActive ? stop.color : "var(--line)"}`,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = stop.color; }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.borderColor = "var(--line)";
              }}
              onClick={() => setSelected(stop.id)}
            >
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: stop.color, color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>
                {idx + 1}
              </div>
              <span style={{ fontSize: 18 }}>{stop.emoji}</span>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{stop.name}</p>
                <p style={{ fontSize: 11, color: "var(--ink-soft)", margin: 0 }}>
                  {stop.day} · {stop.detail}
                </p>
              </div>
              <ExternalLink size={13} style={{ color: "var(--ink-soft)", flexShrink: 0 }} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
