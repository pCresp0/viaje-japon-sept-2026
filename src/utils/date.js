import { days as baseDays, tripMeta } from "../data/trip";

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
  const day = baseDays.find((d) => d.date === today);
  if (day) return { phase: "during", dayNum: day.num };
  // fecha entre inicio y fin de viaje pero sin día definido (p.ej. 6 sept, día de vuelo de ida)
  return { phase: "during", dayNum: null };
}

export function diffDays(fromISO, toISO) {
  const a = new Date(fromISO + "T00:00:00");
  const b = new Date(toISO + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

const MONTHS = ["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];
const WEEKDAYS = ["dom","lun","mar","mié","jue","vie","sáb"];

// Formatea un Date en una zona horaria dada como "dd-mmm-yyyy"
export function fmtDateTZ(date, tz) {
  const f = new Intl.DateTimeFormat("es-ES", { timeZone: tz, day: "numeric", month: "numeric", year: "numeric" });
  const p = Object.fromEntries(f.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${p.day}-${MONTHS[+p.month - 1]}-${p.year}`;
}

// Formatea un objeto Date como "dd-mmm-yyyy" (p.ej. "7-sept-2026")
export function fmtDate(date) {
  return `${date.getDate()}-${MONTHS[date.getMonth()]}-${date.getFullYear()}`;
}

// "dom 7-sept-2026"
export function formatDateLong(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;
}

// "7-sept-2026"
export function formatDateShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return fmtDate(d);
}
