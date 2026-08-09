import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink } from "lucide-react";

import { useContent } from "../i18n/LanguageContext";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

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
        ${order ? `
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
        ` : ''}
      </div>
    `,
    className: "",
    iconSize: [40, 46],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (!markers || markers.length === 0) return;
    const bounds = L.latLngBounds(markers.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 10 });
  }, [map, markers]);
  return null;
}

export default function MapPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("ruta");

  const { mapStops, mapFilterData, mapLabels } = useContent();

  const filters = [
    { id: "ruta", label: mapLabels.filterRuta },
    { id: "hoteles", label: mapLabels.filterHoteles },
    { id: "excursiones", label: mapLabels.filterExcursiones },
    { id: "transportes", label: mapLabels.filterTransportes },
  ];

  const currentMarkers = mapFilterData[filter] || [];
  // Ruta, hoteles y transportes: línea en orden cronológico del viaje
  const showChronoLine = filter === "ruta" || filter === "hoteles" || filter === "transportes";
  const chronoLine = showChronoLine
    ? currentMarkers.map((s) => [s.lat, s.lng])
    : [];

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-4">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{mapLabels.ubicacionesClave}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{mapLabels.mapaDeLaRuta}</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          {filter === "ruta" && `${mapStops.length} ${mapLabels.descRuta}`}
          {filter === "hoteles" && `${mapLabels.descHoteles}`}
          {filter === "excursiones" && `${mapLabels.descExcursiones}`}
          {filter === "transportes" && `${mapLabels.descTransportes}`}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => { setFilter(f.id); setSelected(null); }}
            className="px-4 py-1.5 rounded-full shrink-0 transition-colors"
            style={{
              fontSize: 14,
              fontWeight: 500,
              backgroundColor: filter === f.id ? "var(--shu)" : "rgba(0,0,0,0.03)",
              color: filter === f.id ? "#fff" : "var(--ink)",
              border: filter === f.id ? "1px solid var(--shu-deep)" : "1px solid rgba(0,0,0,0.1)",
              WebkitTapHighlightColor: "transparent"
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .flex.gap-2::-webkit-scrollbar { display: none; }
      `}} />

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

          {showChronoLine && chronoLine.length > 1 && (
            <Polyline
              positions={chronoLine}
              pathOptions={{ color: "#1d3557", weight: 3, opacity: 0.55, dashArray: "8, 8" }}
            />
          )}

          {currentMarkers.map((stop, idx) => (
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
                    {filter === "ruta" ? `${mapLabels.parada} ${idx + 1} · ` : `${mapLabels.no} ${idx + 1} · `}{stop.day}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{stop.name}</p>
                  <p style={{ fontSize: 12, color: "#5a6070", marginBottom: 6 }}>{stop.detail}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: stop.color, fontWeight: 600, textDecoration: "none" }}
                  >
                    {mapLabels.abrirGoogleMaps}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}

          <FitBounds markers={currentMarkers} />
        </MapContainer>
      </div>

      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
        {currentMarkers.length} {showChronoLine ? mapLabels.paradasOrden : mapLabels.ubicaciones}
      </p>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {currentMarkers.map((stop, idx) => {
          const isActive = selected === stop.id;
          return (
            <Highlightable key={stop.id} id={slug("map", stop.id)}>
            <a
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
                <span className="mr-1">{idx + 1}</span>
                <span style={{ fontSize: 12 }}>{stop.emoji}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 1 }}>
                  {idx + 1}. {stop.name}
                </p>
                <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>{stop.day}</p>
              </div>
              <ExternalLink size={13} style={{ color: "var(--ink-soft)", flexShrink: 0 }} />
            </a>
            </Highlightable>
          );
        })}
      </div>
    </div>
  );
}
