import { days, tripMeta } from "../data/trip";

// Returns today's local date as YYYY-MM-DD
export function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getTripStatus() {
  const today = todayISO();
  if (today < tripMeta.start) {
    return { phase: "before", daysUntil: diffDays(today, tripMeta.start) };
  }
  if (today > tripMeta.end) {
    return { phase: "after" };
  }
  const day = days.find((d) => d.date === today);
  if (day) return { phase: "during", day };
  // fecha entre inicio y fin de viaje pero sin día definido (p.ej. 6 sept, día de vuelo de ida)
  return { phase: "during", day: null };
}

export function diffDays(fromISO, toISO) {
  const a = new Date(fromISO + "T00:00:00");
  const b = new Date(toISO + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

export function formatDateLong(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}

export function formatDateShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
