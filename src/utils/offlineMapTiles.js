// Precarga de teselas del mapa para uso sin conexión.
//
// En vez de calcular una única caja que englobe todo el viaje (carísimo:
// a zoom de detalle, el hueco vacío entre Kioto y Tokio multiplica el
// número de teselas por nada útil), se calcula un radio pequeño
// alrededor de CADA parada del itinerario. Así se cubre bien el detalle
// de cada ciudad sin descargar mar y montaña vacíos entre medias.
//
// Subdominios de CartoDB (debe coincidir con la regla de caché de
// vite.config.js y con la URL real que usa el TileLayer de Leaflet).
const SUBDOMAINS = ["a", "b", "c", "d"];
const TILE_URL = (s, z, x, y) =>
  `https://${s}.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`;

function tileXY(lat, lng, z) {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return [x, y];
}

/**
 * Calcula el conjunto de teselas (z, x, y) necesarias para cubrir bien
 * el viaje: una vista general del país a zoom bajo, y un radio de
 * detalle alrededor de cada parada a zoom más alto.
 */
export function computeTripTiles(stops) {
  const tiles = new Set();
  const add = (z, x, y) => tiles.add(`${z}/${x}/${y}`);

  // Vista general: una sola caja que englobe todas las paradas, a zoom
  // bajo (barato incluso cubriendo todo el país).
  const lats = stops.map((s) => s.lat);
  const lngs = stops.map((s) => s.lng);
  const latMax = Math.max(...lats), latMin = Math.min(...lats);
  const lngMax = Math.max(...lngs), lngMin = Math.min(...lngs);
  for (let z = 5; z <= 8; z++) {
    const [x0, y0] = tileXY(latMax, lngMin, z);
    const [x1, y1] = tileXY(latMin, lngMax, z);
    for (let x = Math.min(x0, x1) - 1; x <= Math.max(x0, x1) + 1; x++) {
      for (let y = Math.min(y0, y1) - 1; y <= Math.max(y0, y1) + 1; y++) {
        add(z, x, y);
      }
    }
  }

  // Detalle por parada: radio de 2 teselas alrededor de cada punto,
  // en zooms 9 a 12 (cubre desde "toda la ciudad" hasta "la manzana").
  for (const stop of stops) {
    for (let z = 9; z <= 12; z++) {
      const [cx, cy] = tileXY(stop.lat, stop.lng, z);
      for (let x = cx - 2; x <= cx + 2; x++) {
        for (let y = cy - 2; y <= cy + 2; y++) {
          add(z, x, y);
        }
      }
    }
  }

  return [...tiles].map((key) => {
    const [z, x, y] = key.split("/").map(Number);
    return { z, x, y };
  });
}

/**
 * Descarga (y por tanto cachea, vía la regla CacheFirst del service
 * worker) todas las teselas necesarias. Se hacen las peticiones con
 * concurrencia limitada para no saturar la conexión ni el servidor de
 * teselas gratuito. `onProgress(done, total, failed)` se llama tras cada
 * tesela.
 *
 * Devuelve de inmediato { cancel, done } — `cancel()` corta la descarga
 * a mitad (con lo ya bajado quedando cacheado igualmente), y `done` es
 * la promesa que resuelve con el resultado final. Antes esta función
 * esperaba a que todo terminara para devolver `cancel`, lo que lo hacía
 * inútil: nunca daba tiempo a llamarlo antes de que ya no sirviera de
 * nada.
 */
export function prefetchTripTiles(stops, onProgress, { concurrency = 6 } = {}) {
  const tiles = computeTripTiles(stops);
  const total = tiles.length;
  let done = 0;
  let failed = 0;
  let cancelled = false;

  async function worker(queue) {
    while (queue.length > 0 && !cancelled) {
      const { z, x, y } = queue.pop();
      const sub = SUBDOMAINS[(x + y) % SUBDOMAINS.length];
      try {
        const res = await fetch(TILE_URL(sub, z, x, y));
        if (!res.ok) failed++;
      } catch {
        failed++;
      }
      done++;
      onProgress?.(done, total, failed);
    }
  }

  const queue = [...tiles];
  const workers = Array.from({ length: concurrency }, () => worker(queue));
  const resultPromise = Promise.all(workers).then(() => ({ total, done, failed, cancelled }));

  return {
    cancel: () => { cancelled = true; },
    result: resultPromise,
    total,
  };
}
