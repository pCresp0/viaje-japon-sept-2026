// Selección de la mejor voz disponible para un idioma dado.
//
// Los navegadores suelen ofrecer varias voces por idioma, y su calidad
// varía muchísimo: las voces "locales/compactas" (las que vienen
// instaladas de fábrica en iOS/Android para ahorrar espacio, del tipo
// "Kyoko" en iOS o el motor por defecto de Android) suenan claramente
// sintéticas. Las voces "de red" o "mejoradas" (Google, Neural, Wavenet,
// Natural, Enhanced, Premium) suenan mucho más naturales.
//
// Esta función puntúa cada voz candidata y elige la de mayor puntuación,
// en vez de quedarse con la primera que coincida por idioma.

const QUALITY_HINTS = [
  "google", "neural", "wavenet", "natural", "enhanced", "premium", "siri",
];

function scoreVoice(voice, bcp47) {
  const lang = voice.lang?.toLowerCase() || "";
  const target = bcp47.toLowerCase();
  const shortTarget = target.slice(0, 2);
  let score = 0;

  if (lang === target) score += 100;
  else if (lang.startsWith(shortTarget)) score += 50;
  else return -1; // idioma no coincide en absoluto, descartar

  const name = voice.name?.toLowerCase() || "";
  if (QUALITY_HINTS.some((hint) => name.includes(hint))) score += 30;

  // Las voces que no son "locales" suelen procesarse en la nube y sonar
  // mejor que el motor offline compacto del dispositivo.
  if (voice.localService === false) score += 20;

  return score;
}

/**
 * Devuelve la mejor voz disponible para el idioma `bcp47` (p. ej. "ja-JP",
 * "es-ES"), o null si ninguna voz coincide con ese idioma.
 */
export function pickBestVoice(voices, bcp47) {
  let best = null;
  let bestScore = -1;

  for (const voice of voices) {
    const s = scoreVoice(voice, bcp47);
    if (s > bestScore) {
      bestScore = s;
      best = voice;
    }
  }

  // Diagnóstico visible en la consola del navegador (F12 → Console).
  // No afecta a nadie que no la abra, pero permite ver exactamente qué
  // voces detecta el dispositivo y cuál se ha elegido — imprescindible
  // para saber si "no mejora nada" es porque sólo hay una voz disponible
  // para ese idioma (lo más habitual en móvil) o por otra causa.
  if (typeof window !== "undefined") {
    const candidates = voices
      .filter((v) => v.lang?.toLowerCase().startsWith(bcp47.slice(0, 2).toLowerCase()))
      .map((v) => `${v.name} (${v.lang}${v.localService ? ", local" : ", red"})`);
    // eslint-disable-next-line no-console
    console.log(
      `[voz ${bcp47}] ${candidates.length} voz(ces) disponible(s): ${candidates.join(" | ") || "ninguna"} → elegida: ${best?.name || "voz por defecto del sistema"}`
    );
  }

  return bestScore >= 0 ? best : null;
}
