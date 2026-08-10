import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ExternalLink, CalendarDays, DownloadCloud, Check, X as XIcon } from "lucide-react";

import { useContent } from "../i18n/LanguageContext";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";
import { parseDayNumbers } from "../utils/mapDay";
import { prefetchTripTiles } from "../utils/offlineMapTiles";

const OFFLINE_TILES_KEY = "map-tiles-downloaded-at";

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

export default function MapPage({ onGoToDay, initialDay }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState(initialDay != null ? "dias" : "ruta");
  const [subDay, setSubDay] = useState(initialDay ?? null); // día concreto dentro del filtro "dias", null = todos

  const { mapStops, mapFilterData, mapLabels, days } = useContent();
  const dayInfo = Object.fromEntries(days.map((d) => [d.num, d]));

  // Descarga de teselas para uso sin conexión
  const [offlineState, setOfflineState] = useState("idle"); // idle | downloading | done | error
  const [offlineProgress, setOfflineProgress] = useState({ done: 0, total: 0 });
  const [offlineDownloadedAt, setOfflineDownloadedAt] = useState(() => {
    try { return localStorage.getItem(OFFLINE_TILES_KEY); } catch { return null; }
  });
  const [offlineCancel, setOfflineCancel] = useState(null);
  const offlineSupported = typeof window !== "undefined" && "caches" in window;

  function startOfflineDownload() {
    if (!offlineSupported || offlineState === "downloading") return;
    setOfflineState("downloading");
    const { cancel, result, total } = prefetchTripTiles(mapStops, (done, tot, failed) => {
      setOfflineProgress({ done, total: tot, failed });
    });
    setOfflineProgress({ done: 0, total, failed: 0 });
    setOfflineCancel(() => cancel);
    result.then(({ cancelled }) => {
      setOfflineCancel(null);
      if (cancelled) {
        setOfflineState("idle");
        return;
      }
      setOfflineState("done");
      const now = new Date().toISOString();
      try { localStorage.setItem(OFFLINE_TILES_KEY, now); } catch { /* ignore */ }
      setOfflineDownloadedAt(now);
    }).catch(() => setOfflineState("error"));
  }

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

  const isDaysFilter = filter === "dias";
  const isRutaFilter = filter === "ruta";
  const currentMarkers = isRutaFilter
    ? dayOverviewMarkers
    : isDaysFilter
      ? (subDay == null ? mapStops : mapStops.filter((s) => parseDayNumbers(s.day).includes(subDay)))
      : (mapFilterData[filter] || []);

  // Cuando hay un día concreto elegido en "Días", los números pasan a ser
  // el orden de visita dentro de ESE día (1, 2, 3...), no el número de día.
  const isSingleDayDetail = isDaysFilter && subDay != null;

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

      {offlineSupported && (
        <div className="rounded-xl p-3.5 mb-4" style={{
          background: offlineState === "downloading" ? "#1d355708" : "var(--paper-raised)",
          border: "1px solid var(--line)",
        }}>
          {offlineState === "downloading" ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--indigo)" }}>
                  Descargando mapa para uso sin conexión…
                </p>
                <button
                  onClick={() => offlineCancel?.()}
                  aria-label="Cancelar descarga"
                  style={{ color: "var(--ink-soft)", background: "none", border: "none", cursor: "pointer" }}
                >
                  <XIcon size={15} />
                </button>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "var(--line)", overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: offlineProgress.total ? `${(offlineProgress.done / offlineProgress.total) * 100}%` : "0%",
                  background: "var(--indigo)",
                  transition: "width 0.2s",
                }} />
              </div>
              <p style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>
                {offlineProgress.done} / {offlineProgress.total} imágenes del mapa
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div style={{
                width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                background: offlineState === "done" ? "#2e7d5b18" : "#1d355712",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {offlineState === "done"
                  ? <Check size={16} style={{ color: "var(--forest)" }} />
                  : <DownloadCloud size={16} style={{ color: "var(--indigo)" }} />}
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
                  {offlineState === "done" ? "Mapa disponible sin conexión" : "Descargar mapa para uso sin conexión"}
                </p>
                <p style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 1 }}>
                  {offlineDownloadedAt
                    ? `Última descarga: ${new Date(offlineDownloadedAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" })} — vuelve a pulsar para actualizar`
                    : "~8 MB con WiFi, cubre toda la ruta del viaje"}
                </p>
              </div>
              <button
                onClick={startOfflineDownload}
                style={{
                  flexShrink: 0, padding: "7px 14px", borderRadius: 999,
                  background: "var(--indigo)", color: "white",
                  border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                }}
              >
                {offlineDownloadedAt ? "Actualizar" : "Descargar"}
              </button>
            </div>
          )}
        </div>
      )}

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
                  width: 24, height: 24, borderRadius: "50%",
                  background: stop.color, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>
                  <span className="mr-1">{badge}</span>
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
                    {isRutaFilter ? stop.detail : stop.day}
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
