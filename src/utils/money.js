/** Formato de importes ¥ / € para la web del viaje. */

/** Tipo de cambio aprox. Revolut (ago 2026) usado en comparativas. */
export const YEN_PER_EUR = 184.4;

export function jpyToEur(jpy, rate = YEN_PER_EUR) {
  if (jpy == null || Number.isNaN(Number(jpy))) return null;
  return Number(jpy) / rate;
}

/** Solo yenes (p. ej. columna de tabla con € aparte). */
export function formatJpy(jpy) {
  if (jpy == null || Number.isNaN(Number(jpy))) return null;
  return `¥${Number(jpy).toLocaleString("es-ES")}`;
}

export function formatEur(eur, { digits = 2 } = {}) {
  if (eur == null || Number.isNaN(Number(eur))) return null;
  return `${Number(eur).toLocaleString("es-ES", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}€`;
}

/**
 * "¥10.900 (~59,12€)".
 * Si no pasas `eur`, se calcula con YEN_PER_EUR.
 * Rangos: formatJpyEurRange(3000, 5000) → "¥3.000–¥5.000 (~16,27–27,11€)".
 */
export function formatJpyEur(jpy, eur, { eurDigits = 2 } = {}) {
  const y = formatJpy(jpy);
  const eurVal = eur != null ? eur : jpyToEur(jpy);
  const e = formatEur(eurVal, { digits: eurDigits });
  if (y && e) return `${y} (~${e})`;
  return y || e || "";
}

export function formatJpyEurRange(jpyFrom, jpyTo, { eurDigits = 0 } = {}) {
  if (jpyFrom == null || jpyTo == null) return "";
  const y = `${formatJpy(jpyFrom)}–${formatJpy(jpyTo)}`;
  const eFrom = formatEur(jpyToEur(jpyFrom), { digits: eurDigits });
  const eTo = formatEur(jpyToEur(jpyTo), { digits: eurDigits });
  if (eFrom && eTo) return `${y} (~${eFrom.replace("€", "")}–${eTo})`;
  return y;
}

/** Total de grupo a partir de per-person. */
export function formatGroupJpyEur(jpyPax, eurPax, people = 5) {
  const jpy = jpyPax != null ? jpyPax * people : null;
  const eur = eurPax != null
    ? +(eurPax * people).toFixed(2)
    : jpy != null
      ? +(jpyToEur(jpy)).toFixed(2)
      : null;
  return formatJpyEur(jpy, eur);
}
