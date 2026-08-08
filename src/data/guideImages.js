// Rutas estáticas a las imágenes de lugares en public/img/places/.
// Las comidas están en public/img/food/.
// Al estar en public/ Vite las sirve directamente sin procesarlas,
// lo que evita que el plugin PWA intente meterlas en el precache
// del service worker.
export const guideImages = {
  "fushimi-inari": "/img/places/fushimi-inari.jpg",
  "todai-ji":      "/img/places/todai-ji.jpg",
  "kinkaku-ji":    "/img/places/kinkaku-ji.jpg",
  "ginkaku-ji":    "/img/places/ginkaku-ji.jpg",
  "kiyomizu-dera": "/img/places/kiyomizu-dera.jpg",
  "arashiyama":    "/img/places/arashiyama.jpg",
  "gion":          "/img/places/gion.jpg",
  "nishiki":       "/img/places/nishiki.jpg",
  "osaka":         "/img/places/osaka.jpg",
  "kenroku-en":    "/img/places/kenroku-en.jpg",
  "shirakawa-go":  "/img/places/shirakawa-go.jpg",
  "takayama":      "/img/places/takayama.jpg",
  "nakasendo":     "/img/places/nakasendo.jpg",
  // "senso-ji" y "shibuya" quitados temporalmente: los ficheros
  // public/img/places/senso-ji.jpg y shibuya.jpg están corruptos (son
  // literalmente un cuadrado negro sólido, verificado visualmente el
  // 2026-08-07 — no es un problema de CSS ni de carga, el archivo en sí
  // no contiene ninguna foto). Sin entrada aquí, GuideCard simplemente
  // no muestra imagen para ellos en vez de mostrar el negro. Sustituir
  // ambos ficheros por fotos reales y volver a añadir la entrada.
  "meiji-jingu":   "/img/places/meiji-jingu.jpg",
  "akihabara":     "/img/places/akihabara.jpg",
  "teamlab":       "/img/places/teamlab.jpg",
  "fuji":          "/img/places/fuji.jpg",
};
