// Rutas estáticas a las imágenes en public/img/.
// Al estar en public/ Vite las sirve directamente sin procesarlas,
// lo que evita que el plugin PWA intente meterlas en el precache
// del service worker (algunas pesan varios MB).
export const guideImages = {
  "fushimi-inari": "/img/fushimi-inari.jpg",
  "todai-ji":      "/img/todai-ji.jpg",
  "kinkaku-ji":    "/img/kinkaku-ji.jpg",
  "ginkaku-ji":    "/img/ginkaku-ji.jpg",
  "kiyomizu-dera": "/img/kiyomizu-dera.jpg",
  "arashiyama":    "/img/arashiyama.jpg",
  "gion":          "/img/gion.jpg",
  "nishiki":       "/img/nishiki.jpg",
  "osaka":         "/img/osaka.jpg",
  "kenroku-en":    "/img/kenroku-en.jpg",
  "shirakawa-go":  "/img/shirakawa-go.jpg",
  "takayama":      "/img/takayama.jpg",
  "nakasendo":     "/img/nakasendo.jpg",
  "senso-ji":      "/img/senso-ji.jpg",
  "meiji-jingu":   "/img/meiji-jingu.jpg",
  "shibuya":       "/img/shibuya.jpg",
  "akihabara":     "/img/akihabara.png",
  "teamlab":       "/img/teamlab.jpg",
  "fuji":          "/img/fuji.jpg",
};
