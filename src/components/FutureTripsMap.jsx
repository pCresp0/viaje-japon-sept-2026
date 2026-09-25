import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Compass, ExternalLink, MapPin } from "lucide-react";
import { futureLocationCoords } from "../data/pendingDays";
import PlaceText from "./PlaceText";

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

function MapController({ selectedMarker, markers }) {
  const map = useMap();
  useEffect(() => {
    if (selectedMarker) {
      map.flyTo([selectedMarker.lat, selectedMarker.lng], 9, {
        duration: 1.1,
      });
    } else if (markers && markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [map, selectedMarker, markers]);

  return null;
}

export default function FutureTripsMap({ days, selectedId, onSelectDay, onGoToItinerary, lang }) {
  const [activeId, setActiveId] = useState(selectedId || null);
  const markerRefs = useRef({});

  // Merge days with coordinates: exactly 1 point per future day
  const markers = days.map((d, index) => {
    const coords = futureLocationCoords[d.id] || { lat: 35.6762, lng: 139.6503, emoji: "📍", color: "#e63946" };
    return {
      ...d,
      ...coords,
      order: index + 1,
    };
  });

  const selectedMarker = markers.find((m) => m.id === activeId);

  useEffect(() => {
    if (selectedId) {
      setActiveId(selectedId);
      if (markerRefs.current[selectedId]) {
        markerRefs.current[selectedId].openPopup();
      }
    }
  }, [selectedId]);

  const handleMarkerClick = (id) => {
    setActiveId(id);
    if (onSelectDay) onSelectDay(id);
  };

  const handleCardClick = (id) => {
    setActiveId(id);
    if (markerRefs.current[id]) {
      markerRefs.current[id].openPopup();
    }
  };

  return (
    <div className="space-y-4">
      {/* Map view matching MapPage styling */}
      <div
        className="rounded-2xl overflow-hidden border shadow-sm"
        style={{
          borderColor: "var(--line)",
          height: 520,
          position: "relative",
          isolation: "isolate",
          background: "var(--paper-raised)",
        }}
      >
        <MapContainer
          center={[35.0, 135.5]}
          zoom={5}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {markers.length > 1 && (
            <Polyline
              positions={markers.map((s) => [s.lat, s.lng])}
              pathOptions={{ color: "#1d3557", weight: 3, opacity: 0.55, dashArray: "8, 8" }}
            />
          )}

          <MapController selectedMarker={selectedMarker} markers={markers} />

          {markers.map((m) => (
            <Marker
              key={m.id}
              ref={(ref) => {
                if (ref) markerRefs.current[m.id] = ref;
              }}
              position={[m.lat, m.lng]}
              icon={createIcon(m.emoji, m.color, m.order)}
              eventHandlers={{
                click: () => handleMarkerClick(m.id),
              }}
              opacity={activeId && activeId !== m.id ? 0.75 : 1}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 200, maxWidth: 280 }}>
                  <p style={{ fontSize: 11, color: m.color, fontWeight: 700, marginBottom: 2 }}>
                    #{m.order} · {m.cities}
                  </p>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "var(--indigo)" }}>
                    {m.title}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 8 }}>
                    {m.summary.slice(0, 140)}...
                  </p>
                  <button
                    onClick={() => onGoToItinerary(m.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white transition-opacity"
                    style={{
                      background: "var(--shu)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span>{lang === "en" ? "View in Itinerary" : lang === "fr" ? "Voir dans l'itinéraire" : lang === "tl" ? "Tingnan sa Itinerary" : "Ver en el itinerario"}</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* 1 punto por día: lista rápida de los 7 destinos */}
      <div className="pt-1">
        <p className="eyebrow mb-2" style={{ color: "var(--shu)" }}>
          {lang === "en" ? "7 Destinations on the Map" : lang === "fr" ? "7 Destinations sur la carte" : lang === "tl" ? "7 Destinasyon sa Mapa" : "7 Destinos en el mapa"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {markers.map((m) => {
            const isSelected = activeId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => handleCardClick(m.id)}
                className="p-3 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer"
                style={{
                  background: isSelected ? "var(--paper-raised)" : "var(--paper)",
                  borderColor: isSelected ? "var(--shu)" : "var(--line)",
                  boxShadow: isSelected ? "0 2px 10px rgba(185, 28, 28, 0.15)" : "none",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: m.color }}
                      >
                        {m.order}
                      </span>
                      <span className="text-base">{m.emoji}</span>
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--paper-raised)", color: "var(--ink-soft)", border: "1px solid var(--line)" }}>
                      {m.cities.split(",")[0]}
                    </span>
                  </div>

                  <p className="font-display font-bold text-[14px] leading-tight mb-1" style={{ color: "var(--ink)" }}>
                    {m.title}
                  </p>

                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--ink-soft)" }}>
                    {m.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2 border-t" style={{ borderColor: "var(--line)" }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(m.id);
                    }}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--indigo)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <MapPin size={12} />
                    <span>{lang === "en" ? "Focus on map" : lang === "fr" ? "Centrer sur la carte" : lang === "tl" ? "Tingnan sa mapa" : "Centrar en mapa"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGoToItinerary(m.id);
                    }}
                    className="text-xs font-semibold flex items-center gap-1"
                    style={{ color: "var(--shu)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <span>{lang === "en" ? "Details →" : lang === "fr" ? "Détails →" : lang === "tl" ? "Detalye →" : "Ver detalles →"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
