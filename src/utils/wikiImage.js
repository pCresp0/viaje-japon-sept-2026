// Obtiene la imagen principal de un artículo de Wikipedia.
//
// Por qué así y no imágenes empaquetadas: las fotos de monumentos que
// circulan por webs de viajes tienen derechos de autor. Wikipedia sólo
// admite imágenes de licencia libre (Creative Commons o dominio público),
// así que es una fuente segura para uso público.
//
// La consulta se hace desde el navegador con origin=* (la API de Wikimedia
// permite CORS). Se usa generator=search en lugar de un título exacto para
// que siga funcionando aunque el artículo se renombre.

const cache = new Map();
const inFlight = new Map();

const ENDPOINT = "https://es.wikipedia.org/w/api.php";

export async function fetchWikiImage(searchTerm) {
  if (cache.has(searchTerm)) return cache.get(searchTerm);
  if (inFlight.has(searchTerm)) return inFlight.get(searchTerm);

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: searchTerm,
    gsrlimit: "1",
    prop: "pageimages|info",
    piprop: "thumbnail",
    pithumbsize: "800",
    inprop: "url",
    format: "json",
    formatversion: "2",
    origin: "*",
  });

  const promise = (async () => {
    try {
      const res = await fetch(`${ENDPOINT}?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const page = data?.query?.pages?.[0];

      const result = page?.thumbnail?.source
        ? {
            src: page.thumbnail.source,
            width: page.thumbnail.width,
            height: page.thumbnail.height,
            pageTitle: page.title,
            pageUrl: page.fullurl,
          }
        : null;

      cache.set(searchTerm, result);
      return result;
    } catch {
      // Sin conexión o API caída: no se muestra imagen, el resto sigue igual.
      cache.set(searchTerm, null);
      return null;
    } finally {
      inFlight.delete(searchTerm);
    }
  })();

  inFlight.set(searchTerm, promise);
  return promise;
}
