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

// La Wikipedia en inglés tiene muchísima mejor cobertura de artículos e
// imágenes para monumentos japoneses que la española (a menudo el artículo
// en español no existe o no tiene foto). El texto de la app sigue en
// español; sólo la fuente de la foto cambia.
const ENDPOINT = "https://en.wikipedia.org/w/api.php";
const TIMEOUT_MS = 6000;

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function extractResult(page) {
  if (!page?.thumbnail?.source) return null;
  return {
    src: page.thumbnail.source,
    width: page.thumbnail.width,
    height: page.thumbnail.height,
    pageTitle: page.title,
    pageUrl: page.fullurl,
  };
}

export async function fetchWikiImage(searchTerm) {
  if (cache.has(searchTerm)) return cache.get(searchTerm);
  if (inFlight.has(searchTerm)) return inFlight.get(searchTerm);

  const promise = (async () => {
    try {
      // 1) Búsqueda restringida a artículos (namespace 0), para no caer
      //    en categorías/plantillas que no tienen imagen aunque el sitio
      //    real sí la tenga.
      const searchParams = new URLSearchParams({
        action: "query",
        generator: "search",
        gsrsearch: searchTerm,
        gsrnamespace: "0",
        gsrlimit: "1",
        prop: "pageimages|info",
        piprop: "thumbnail",
        pithumbsize: "800",
        inprop: "url",
        format: "json",
        formatversion: "2",
        origin: "*",
      });

      let data = await fetchWithTimeout(`${ENDPOINT}?${searchParams}`, TIMEOUT_MS);
      let page = data?.query?.pages?.[0];
      let result = extractResult(page);

      // 2) Si el resultado de búsqueda no trae foto (p. ej. el artículo
      //    real es distinto al que devolvió gsrsearch), reintentar con el
      //    término como título exacto + redirects, que a veces encuentra
      //    la página correcta cuando la búsqueda de texto libre falla.
      if (!result) {
        const titleParams = new URLSearchParams({
          action: "query",
          titles: searchTerm,
          redirects: "1",
          prop: "pageimages|info",
          piprop: "thumbnail",
          pithumbsize: "800",
          inprop: "url",
          format: "json",
          formatversion: "2",
          origin: "*",
        });
        data = await fetchWithTimeout(`${ENDPOINT}?${titleParams}`, TIMEOUT_MS);
        page = data?.query?.pages?.[0];
        result = extractResult(page);
      }

      if (!result && import.meta.env?.DEV) {
        // eslint-disable-next-line no-console
        console.warn(`[wikiImage] Sin foto para "${searchTerm}". Página encontrada:`, page?.title ?? "(ninguna)");
      }

      cache.set(searchTerm, result);
      return result;
    } catch (err) {
      // Sin conexión, timeout o API caída: no se muestra imagen, el resto
      // de la guía sigue funcionando igual. Se deja constancia en consola
      // para poder diagnosticar qué término falla y por qué.
      // eslint-disable-next-line no-console
      console.warn(`[wikiImage] Fallo al buscar "${searchTerm}":`, err?.message || err);
      cache.set(searchTerm, null);
      return null;
    } finally {
      inFlight.delete(searchTerm);
    }
  })();

  inFlight.set(searchTerm, promise);
  return promise;
}
