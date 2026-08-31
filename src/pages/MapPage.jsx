import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink, CalendarDays } from "lucide-react";

import { useContent } from "../i18n/LanguageContext";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { parseDayNumbers } from "../utils/mapDay";
import { getTripStatus } from "../utils/date";
import PlaceText from "../components/PlaceText";

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
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [map, markers]);
  return null;
}

export default function MapPage({ onGoToDay, initialDay }) {
  const defaultDay = initialDay ?? (getTripStatus().dayNum || 1);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("dias");
  const [subDay, setSubDay] = useState(defaultDay); // día concreto dentro del filtro "dias", null = todos

  const { mapStops, mapFilterData, mapLabels, days } = useContent();
  const dayInfo = Object.fromEntries(days.map((d) => [d.num, d]));

  const filters = [
    { id: "ruta", label: mapLabels.filterRuta },
    { id: "dias", label: mapLabels.filterDias },
    { id: "hoteles", label: mapLabels.filterHoteles },
    { id: "excursiones", label: mapLabels.filterExcursiones },
    { id: "transportes", label: mapLabels.filterTransportes },
  ];

  // Días que realmente tienen alguna parada en el mapa, en orden.
  const availableDays = [...new Set(mapStops.flatMap((s) => parseDayNumbers(s.day)))].sort((a, b) => a - b);

  // "Ruta completa": una única chincheta por día en vez de una por parada.
  // Se usan las coordenadas de la primera parada de ese día (por donde
  // empieza la jornada), pero el contenido del pin resume el día entero:
  // título, fecha y todos los sitios que se ven, no sólo ese primer sitio.
  const dayOverviewMarkers = availableDays.map((n) => {
    const first = mapStops.find((s) => parseDayNumbers(s.day)[0] === n) || mapStops.find((s) => parseDayNumbers(s.day).includes(n));
    const stopsThatDay = mapStops.filter((s) => parseDayNumbers(s.day).includes(n));
    const info = dayInfo[n];
    return {
      id: `day-${n}`,
      lat: first.lat, lng: first.lng,
      emoji: first.emoji, color: first.color,
      day: first.day,
      dayNum: n,
      name: info ? info.title : `${mapLabels.diaLabel} ${n}`,
      cities: info ? info.cities : "",
      detail: stopsThatDay.map((s) => s.name).join(" · "),
    };
  });

  const DAY_START_HOTELS = {
    1: { id: "hotel-d1", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#bc4749", day: "Día 1", detail: "Hotel base en Kioto · Llegada y check-in", isHotel: true },
    2: { id: "hotel-d2", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#bc4749", day: "Día 2", detail: "Hotel base en Kioto · Punto de partida del día", isHotel: true },
    3: { id: "hotel-d3", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#bc4749", day: "Día 3", detail: "Hotel base en Kioto · Punto de partida del día", isHotel: true },
    4: { id: "hotel-d4", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#bc4749", day: "Día 4", detail: "Hotel base en Kioto · Punto de partida del día", isHotel: true },
    5: { id: "hotel-d5", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#bc4749", day: "Día 5", detail: "Hotel base en Kioto · Salida hacia Osaka", isHotel: true },
    6: { id: "hotel-d6-start", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#bc4749", day: "Día 6", detail: "Hotel de salida en Kioto · Gestión de maletas y salida a Kanazawa", isHotel: true },
    7: { id: "hotel-d7-start", name: "Hotel Resol Trinity Kanazawa", city: "Kanazawa", lat: 36.5713, lng: 136.6542, emoji: "🏨", color: "#2e7d5b", day: "Día 7", detail: "Hotel de salida en Kanazawa · Salida a Shirakawa-go", isHotel: true },
    8: { id: "hotel-d8-start", name: "Hotel Wood Takayama", city: "Takayama", lat: 36.1421, lng: 137.2582, emoji: "🏨", color: "#2e7d5b", day: "Día 8", detail: "Hotel de salida en Takayama · Salida a Magome", isHotel: true },
    9: { id: "hotel-d9-start", name: "Magome Chaya", city: "Magome", lat: 35.5244, lng: 137.5647, emoji: "🏨", color: "#2e7d5b", day: "Día 9", detail: "Minshuku tradicional en Magome · Salida hacia Tokio", isHotel: true },
    10: { id: "hotel-d10", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 10", detail: "Hotel base en Tokio · Punto de partida del día", isHotel: true },
    11: { id: "hotel-d11", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 11", detail: "Hotel base en Tokio · Punto de partida del día", isHotel: true },
    12: { id: "hotel-d12", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 12", detail: "Hotel base en Tokio · Punto de partida del día", isHotel: true },
    13: { id: "hotel-d13", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 13", detail: "Hotel base en Tokio · Punto de partida del día", isHotel: true },
    14: { id: "hotel-d14", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 14", detail: "Hotel base en Tokio · Salida excursión Monte Fuji", isHotel: true },
    15: { id: "hotel-d15", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 15", detail: "Hotel base en Tokio · Check-out y salida al aeropuerto", isHotel: true },
  };

  const DAY_END_HOTELS = {
    6: { id: "hotel-d6-end", name: "Hotel Resol Trinity Kanazawa", city: "Kanazawa", lat: 36.5713, lng: 136.6542, emoji: "🏨", color: "#2e7d5b", day: "Día 6", detail: "Hotel en Kanazawa · Llegada, check-in y descanso", isHotel: true },
    7: { id: "hotel-d7-end", name: "Hotel Wood Takayama", city: "Takayama", lat: 36.1421, lng: 137.2582, emoji: "🏨", color: "#2e7d5b", day: "Día 7", detail: "Hotel en Takayama · Llegada, check-in y descanso", isHotel: true },
    8: { id: "hotel-d8-end", name: "Magome Chaya", city: "Magome", lat: 35.5244, lng: 137.5647, emoji: "🏨", color: "#2e7d5b", day: "Día 8", detail: "Minshuku tradicional en Magome · Llegada, cena y descanso", isHotel: true },
    9: { id: "hotel-d9-end", name: "KOKO HOTEL Residence Asakusa Kappabashi", city: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1d3557", day: "Día 9", detail: "Hotel base en Tokio · Llegada, check-in para 6 noches", isHotel: true },
  };

  const getSingleDayMarkers = (dayNum) => {
    const rawStops = mapStops.filter((s) => parseDayNumbers(s.day).includes(dayNum));
    
    // Si es Día 1 (día de llegada), el hotel es la última parada (llegada y check-in)
    if (dayNum === 1) {
      return rawStops;
    }
    
    const result = [];
    const startHotel = DAY_START_HOTELS[dayNum];
    if (startHotel) {
      result.push(startHotel);
    }
    
    for (const stop of rawStops) {
      // Evitar duplicar si la parada ya es el hotel de salida
      if (stop.id !== startHotel?.id && !stop.name.includes(startHotel?.name || "---")) {
        result.push(stop);
      }
    }
    
    // Si es día de cambio de ciudad, añadir el hotel de llegada al final
    const endHotel = DAY_END_HOTELS[dayNum];
    if (endHotel && !result.some((s) => s.id === endHotel.id || s.name.includes(endHotel.name))) {
      result.push(endHotel);
    }
    
    return result;
  };

  const isDaysFilter = filter === "dias";
  const isRutaFilter = filter === "ruta";
  const isSingleDayDetail = isDaysFilter && subDay != null;

  const currentMarkers = isRutaFilter
    ? dayOverviewMarkers
    : isDaysFilter
      ? (subDay == null ? mapStops : getSingleDayMarkers(subDay))
      : (mapFilterData[filter] || []);

  // Ruta, hoteles, transportes y días: línea en orden cronológico del viaje
  const showChronoLine = filter === "ruta" || filter === "hoteles" || filter === "transportes" || isDaysFilter;
  const chronoLine = showChronoLine
    ? currentMarkers.map((s) => [s.lat, s.lng])
    : [];

  function selectFilter(id) {
    setFilter(id);
    setSelected(null);
    if (id !== "dias") setSubDay(null);
  }

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-4">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{mapLabels.ubicacionesClave}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{mapLabels.mapaDeLaRuta}</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          {filter === "ruta" && `${dayOverviewMarkers.length} ${mapLabels.descRuta}`}
          {filter === "dias" && (isSingleDayDetail ? `${currentMarkers.length} ${mapLabels.paradasOrden}` : mapLabels.descDias)}
          {filter === "hoteles" && `${mapLabels.descHoteles}`}
          {filter === "excursiones" && `${mapLabels.descExcursiones}`}
          {filter === "transportes" && `${mapLabels.descTransportes}`}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => selectFilter(f.id)}
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

      {isDaysFilter && (
        <div className="flex gap-1.5 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <button
            onClick={() => setSubDay(null)}
            className="px-3 py-1 rounded-full shrink-0 transition-colors"
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              backgroundColor: subDay == null ? "var(--indigo)" : "rgba(0,0,0,0.03)",
              color: subDay == null ? "#fff" : "var(--ink-soft)",
              border: subDay == null ? "1px solid var(--indigo)" : "1px solid rgba(0,0,0,0.1)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {mapLabels.todosLosDias}
          </button>
          {availableDays.map((n) => (
            <button
              key={n}
              onClick={() => setSubDay(n)}
              className="px-3 py-1 rounded-full shrink-0 transition-colors"
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                backgroundColor: subDay === n ? "var(--indigo)" : "rgba(0,0,0,0.03)",
                color: subDay === n ? "#fff" : "var(--ink-soft)",
                border: subDay === n ? "1px solid var(--indigo)" : "1px solid rgba(0,0,0,0.1)",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {mapLabels.diaLabel} {n}
            </button>
          ))}
        </div>
      )}

      {isSingleDayDetail && dayInfo[subDay] && (
        <div className="rounded-2xl p-4 mb-4" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
          <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
            {mapLabels.diaLabel} {subDay} · {dayInfo[subDay].weekday} {dayInfo[subDay].date?.slice(8)} sept
          </p>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--indigo)", fontFamily: "var(--font-display)", marginBottom: 6 }}>
            {dayInfo[subDay].title}
          </p>
          <PlaceText
            as="p"
            text={dayInfo[subDay].summary}
            className="text-sm leading-relaxed"
            style={{ color: "var(--ink)" }}
            linkStyle={{ color: "var(--shu)" }}
          />
        </div>
      )}

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

          {currentMarkers.map((stop, idx) => {
            const primaryDay = isRutaFilter ? stop.dayNum : parseDayNumbers(stop.day)[0];
            const badge = isRutaFilter
              ? primaryDay
              : isSingleDayDetail
                ? idx + 1
                : (isDaysFilter && primaryDay != null ? primaryDay : idx + 1);
            return (
            <Marker
              key={stop.id}
              position={[stop.lat, stop.lng]}
              icon={createIcon(stop.emoji, stop.color, badge)}
              eventHandlers={{ click: () => setSelected(stop.id) }}
              opacity={selected && selected !== stop.id ? 0.7 : 1}
            >
              <Popup>
                <div style={{ fontFamily: "var(--font-body)", minWidth: 170 }}>
                  {isRutaFilter ? (
                    <>
                      <p style={{ fontSize: 11, color: stop.color, fontWeight: 700, marginBottom: 2 }}>
                        {mapLabels.diaLabel} {stop.dayNum}{stop.cities ? ` · ${stop.cities}` : ""}
                      </p>
                      <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{stop.name}</p>
                      <p style={{ fontSize: 11.5, color: "#5a6070", lineHeight: 1.5 }}>{stop.detail}</p>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: 11, color: stop.color, fontWeight: 700, marginBottom: 2 }}>
                        {isSingleDayDetail
                          ? `${mapLabels.diaLabel} ${subDay} · ${idx + 1}/${currentMarkers.length} · `
                          : isDaysFilter
                            ? (primaryDay != null ? `${mapLabels.diaLabel} ${primaryDay} · ` : "")
                            : (filter === "ruta" ? `${mapLabels.parada} ${idx + 1} · ` : `${mapLabels.no} ${idx + 1} · `)}
                        {stop.day}
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
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
            );
          })}

          <FitBounds markers={currentMarkers} />
        </MapContainer>
      </div>

      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>
        {currentMarkers.length} {showChronoLine ? mapLabels.paradasOrden : mapLabels.ubicaciones}
      </p>

      {isSingleDayDetail && currentMarkers.length === 0 && (
        <div className="rounded-xl p-4 mb-4" style={{ background: "var(--paper)", border: "1px solid var(--line)" }}>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
            El {mapLabels.diaLabel.toLowerCase()} {subDay} es de viaje/traslado y no tiene paradas propias en el mapa.
          </p>
        </div>
      )}

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {currentMarkers.map((stop, idx) => {
          const isActive = selected === stop.id;
          const primaryDay = isRutaFilter ? stop.dayNum : parseDayNumbers(stop.day)[0];
          const badge = isRutaFilter
            ? primaryDay
            : isSingleDayDetail
              ? idx + 1
              : (isDaysFilter && primaryDay != null ? primaryDay : idx + 1);
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;
          const canGoToItinerary = primaryDay != null && !!onGoToDay;

          return (
            <Highlightable key={stop.id} id={slug("map", stop.id)}>
            <div
              className="rounded-xl p-3 transition-all"
              style={{
                background: isActive ? `${stop.color}12` : "var(--paper-raised)",
                border: `1px solid ${isActive ? stop.color : "var(--line)"}`,
              }}
            >
              <div className="flex items-center gap-3 mb-2.5">
                <div style={{
                  height: 24, padding: "0 8px", borderRadius: 12,
                  background: stop.color, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  <span>{badge}</span>
                  <span style={{ fontSize: 12 }}>{stop.emoji}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 1,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {isRutaFilter || isDaysFilter ? stop.name : `${idx + 1}. ${stop.name}`}
                  </p>
                  <p style={{
                    fontSize: 12, color: "var(--ink-soft)",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {isRutaFilter || isSingleDayDetail ? stop.detail : stop.day}
                  </p>
                </div>
              </div>

              {/* Dos botones claros y separados: qué hace cada uno se ve
                  a simple vista, en vez de tener que adivinar qué pasa al
                  tocar la tarjeta o un icono suelto. */}
              <div className="flex gap-1.5" style={{ minWidth: 0 }}>
                {canGoToItinerary && (
                  <button
                    onClick={() => onGoToDay(primaryDay)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 transition-colors"
                    style={{
                      background: "var(--indigo)",
                      color: "white",
                      fontSize: 11.5,
                      fontWeight: 600,
                      border: "none",
                      minWidth: 0,
                      overflow: "hidden",
                    }}
                  >
                    <CalendarDays size={13} style={{ flexShrink: 0 }} />
                    <span className="truncate">{mapLabels.verEnItinerario}</span>
                  </button>
                )}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelected(stop.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 px-2 transition-colors"
                  style={{
                    background: "var(--paper)",
                    color: "var(--ink)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    border: "1px solid var(--line)",
                    textDecoration: "none",
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  <ExternalLink size={13} style={{ flexShrink: 0 }} />
                  <span className="truncate">{mapLabels.verEnGoogleMaps}</span>
                </a>
              </div>
            </div>
            </Highlightable>
          );
        })}
      </div>
    </div>
  );
}
