/** Formato de importes ¥ / € para la web del viaje. */

/** Tipo de cambio aprox. Revolut (ago 2026) usado en comparativas. */
export const YEN_PER_EUR = 184.4;

export function jpyToEur(jpy, rate = YEN_PER_EUR) {
  if (jpy == null || Number.isNaN(Number(jpy))) return null;
  return Number(jpy) / rate;
}

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

/** Ejemplo: "¥10.900 (~59,12€)" — o solo una de las dos si falta la otra. */
export function formatJpyEur(jpy, eur, { eurDigits = 2 } = {}) {
  const y = formatJpy(jpy);
  const e = formatEur(eur, { digits: eurDigits });
  if (y && e) return `${y} (~${e})`;
  return y || e || "";
}

/** Total de grupo a partir de per-person. */
export function formatGroupJpyEur(jpyPax, eurPax, people = 5) {
  const jpy = jpyPax != null ? jpyPax * people : null;
  const eur = eurPax != null ? +(eurPax * people).toFixed(2) : null;
  return formatJpyEur(jpy, eur);
}
