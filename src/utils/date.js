import { days as baseDays, tripMeta } from "../data/trip";

// Returns today's local date as YYYY-MM-DD
export function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Devuelve la fecha actual en la zona horaria de Japón (Asia/Tokyo) en formato YYYY-MM-DD
export function getTokyoISO() {
  try {
    const f = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" });
    return f.format(new Date());
  } catch {
    return todayISO();
  }
}

export function getTripStatus() {
  const localToday = todayISO();
  const tokyoToday = getTokyoISO();

  // Durante las fechas del viaje, preferimos la hora de Japón (Asia/Tokyo)
  // para que a las 00:00 de Japón la web avance automáticamente al día correspondiente.
  const isDuringTrip = (date) => date >= tripMeta.start && date <= tripMeta.end;

  let today = localToday;
  if (isDuringTrip(tokyoToday)) {
    today = tokyoToday;
  } else if (isDuringTrip(localToday)) {
    today = localToday;
  }

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

export function getDefaultTripDay() {
  const status = getTripStatus();
  if (status.phase === "during") {
    return status.dayNum ?? 0;
  }
  if (status.phase === "after") {
    return 15;
  }
  // Antes del inicio del viaje: abrir por defecto el Día 0
  return 0;
}

// Devuelve el id del hotel (de 'stays') en el que se duerme la noche del día indicado
export function getHotelForDay(dayNum) {
  if (dayNum == null || dayNum <= 5) return "kioto";
  if (dayNum === 6) return "kanazawa";
  if (dayNum === 7) return "takayama";
  if (dayNum === 8) return "magome";
  return "tokio";
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
