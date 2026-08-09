// Qué parada de geekStops (popCulture.js) pertenece a qué sección de
// frikSections (frikadas.js). Vive en un fichero aparte porque lo
// necesitan tanto FrikadasPage (para agrupar visualmente) como
// searchIndex (para saber qué acordeón abrir al llegar desde una
// búsqueda) — así no hay dos copias que puedan desincronizarse.

export const stopStyle = {
  "en-ruta": { label: "Ya está en la ruta", color: "#2e7d5b" },
  "desvio-corto": { label: "Desvío corto", color: "#1d6fb8" },
  "requiere-reserva": { label: "Reserva necesaria", color: "#b47808" },
  confirmar: { label: "Confirmar antes", color: "#a65a18" },
  "no-disponible": { label: "No estará disponible", color: "#bc4749" },
};

export const stopsBySection = {
  pokemon: ["pokemon-kyoto-inspiration", "shibuya-parco", "mega-tokyo"],
  digimon: ["digimon-tokyo"],
  tekken: ["akihabara", "nakano-broadway"],
  nintendo: ["nintendo-kyoto"],
  ghibli: ["ghibli-mitaka"],
  godzilla: ["godzilla-shinjuku"],
};

export const standaloneStops = ["teamlab-planets", "gundam-odaiba"];

// id de parada -> id de sección de frikSections (o "ruta-especial" para
// las que no pertenecen a ninguna franquicia concreta).
export const stopSectionId = (() => {
  const map = {};
  for (const [sectionId, ids] of Object.entries(stopsBySection)) {
    for (const id of ids) map[id] = sectionId;
  }
  for (const id of standaloneStops) map[id] = "ruta-especial";
  return map;
})();
