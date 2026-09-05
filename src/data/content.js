// Cargador de contenido multiidioma.
//
// Estrategia: los ficheros de datos en español son la ÚNICA fuente de
// verdad para todo lo que no es texto (coordenadas, precios, fechas,
// PINs, URLs, números de vuelo...). Las traducciones son "superposiciones"
// que sólo contienen las cadenas traducidas, con la misma forma que el
// original, y se aplican encima mediante un merge profundo.
//
// Ventajas frente a duplicar los ficheros completos por idioma:
//  · Un cambio de precio o de hora se hace en un solo sitio.
//  · Imposible que las traducciones se desincronicen de los datos duros.
//  · Si falta una traducción, cae automáticamente al español sin romperse.

import { tripMeta, flights, blocks, stays, days, transports, budget } from "./trip";
import { guides, guidesByDay } from "./guides";
import { historyPeriods, furtherReading } from "./history";
import { foods, foodCategories } from "./foods";
import { pendingItems, categoryLabels, urgencyConfig } from "./pending";
import { popCulture } from "./popCulture";
import { guideImages } from "./guideImages";
import { stops as mapStops, filterData as mapFilterData, mapLabels } from "./mapData";
import { weatherData, dailyWeather, weatherLabels } from "./weatherData";
import { konbiniRules, konbiniChains } from "./konbiniGuide";

import en from "./locales/en";
import fr from "./locales/fr";
import tl from "./locales/tl";

const overlays = { en, fr, tl };

// Conjunto base en español.
const base = {
  tripMeta, flights, blocks, stays, days, transports, budget,
  guides, guidesByDay,
  historyPeriods, furtherReading,
  foods, foodCategories,
  konbiniRules, konbiniChains,
  pendingItems, categoryLabels, urgencyConfig,
  popCulture,
  guideImages,
  mapStops, mapFilterData, mapLabels,
  weatherData, dailyWeather, weatherLabels,
};

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/**
 * Merge profundo de `patch` sobre `source`.
 * - Los arrays se fusionan por índice, no se reemplazan: así una
 *   traducción puede traducir sólo el elemento 3 de una lista y el resto
 *   sigue en español.
 * - Los valores que no aparecen en el patch se conservan intactos.
 */
function deepMerge(source, patch) {
  if (patch === undefined) return source;

  if (Array.isArray(source)) {
    if (!Array.isArray(patch)) return source;
    return source.map((item, i) => {
      if (item && typeof item === "object" && item.id) {
        const matchingPatch = patch.find((p) => p && p.id === item.id);
        if (matchingPatch) return deepMerge(item, matchingPatch);
      }
      return deepMerge(item, patch[i]);
    });
  }

  if (isPlainObject(source)) {
    if (!isPlainObject(patch)) return source;
    const out = { ...source };
    for (const key of Object.keys(patch)) {
      out[key] = deepMerge(source[key], patch[key]);
    }
    return out;
  }

  // Primitivo: el patch gana si existe.
  return patch !== undefined ? patch : source;
}

// Se cachea el resultado por idioma: el merge sólo se hace una vez, no
// en cada render.
const cache = new Map();

export function getContent(locale) {
  if (locale === "es" || !overlays[locale]) return base;

  if (cache.has(locale)) return cache.get(locale);

  const merged = deepMerge(base, overlays[locale]);
  cache.set(locale, merged);
  return merged;
}

export { base as contentEs };
