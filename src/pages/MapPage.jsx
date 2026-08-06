import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink } from "lucide-react";

// Real coordinates verified via Google Places
const stops = [
  {
    id: "narita", name: "Narita", city: "Aeropuerto",
    lat: 35.770178, lng: 140.3843215,
    emoji: "✈️", color: "#c9a227",
    detail: "Llegada · Día 1",
  },
  {
    id: "kioto", name: "Kioto", city: "Kioto",
    lat: 35.011564, lng: 135.7681489,
    emoji: "⛩️", color: "#bc4749",
    detail: "5 noches · Días 1–5",
  },
  {
    id: "kanazawa", name: "Kanazawa", city: "Ishikawa",
    lat: 36.5597341, lng: 136.6520376,
    emoji: "🏯", color: "#2e7d5b",
    detail: "1 noche · Día 6",
  },
  {
    id: "takayama", name: "Takayama", city: "Gifu",
    lat: 36.1461317, lng: 137.252159,
    emoji: "🏮", color: "#2e7d5b",
    detail: "2 noches · Días 7–8",
  },
  {
    id: "tsumago", name: "Tsumago-juku", city: "Nagano",
    lat: 35.5775876, lng: 137.5956667,
    emoji: "🚶", color: "#2e7d5b",
    detail: "1 noche · Día 8",
  },
  {
    id: "tokio", name: "Tokio", city: "Tokio",
    lat: 35.6764225, lng: 139.650027,
    emoji: "🗼", color: "#1d3557",
    detail: "6 noches · Días 9–15",
  },
];

const routeLine = stops.map(s => [s.lat, s.lng]);

// Custom emoji marker icon
function createIcon(emoji, color) {
  return L.divIcon({
    html: `
      <div style="
        width: 40px; height: 40px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 18px;">${emoji}</span>
      </div>
    `,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

// Fit map bounds to show all markers
function FitBounds() {
  const map = useMap();
  useState(() => {
    const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  });
  return null;
}

export default function MapPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="px-4 pt-6 pb-12 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Ubicaciones clave</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Mapa de la ruta</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>
          Toda la ruta de un vistazo: Narita → Kioto → Kanazawa → Takayama → Tsumago → Tokio.
        </p>
      </div>

      {/* Full interactive map with all pins + route */}
      <div className="rounded-2xl overflow-hidden mb-6 border" style={{ borderColor: "var(--line)", height: 480 }}>
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

          {/* Route line connecting all stops */}
          <Polyline
            positions={routeLine}
            pathOptions={{ color: "#1d3557", weight: 3, opacity: 0.6, dashArray: "8, 8" }}
          />

          {/* Markers for every stop */}
          {stops.map((stop) => (
            <Marker
              key={stop.id}
              position={[stop.lat, stop.lng]}
              icon={createIcon(stop.emoji, stop.color)}
              eventHandlers={{ click: () => setSelected(stop.id) }}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 140 }}>
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

      {/* Quick list below for reference */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Paradas del viaje</p>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {stops.map((stop) => (
          <a
            key={stop.id}
            href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl p-3 transition-all"
            style={{ background: "var(--paper-raised)", border: "1px solid var(--line)", textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = stop.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}
          >
            <span style={{ fontSize: 18 }}>{stop.emoji}</span>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{stop.name}</p>
              <p style={{ fontSize: 11, color: "var(--ink-soft)" }}>{stop.detail}</p>
            </div>
            <ExternalLink size={13} style={{ color: "var(--ink-soft)", flexShrink: 0 }} />
          </a>
        ))}
      </div>
    </div>
  );
}
