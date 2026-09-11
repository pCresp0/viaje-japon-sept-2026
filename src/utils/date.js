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

// Minutos transcurridos desde medianoche, en la hora de Japón (o local si falla),
// usados para encontrar en qué punto del horario de hoy estamos ahora mismo.
export function getCurrentMinutesTokyo() {
  try {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false });
    const parts = f.formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    return h * 60 + m;
  } catch {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }
}

// Dado el horario de un día (array de { time, text }), devuelve el índice (dentro
// de las entradas que SÍ tienen una hora real) de la parada correspondiente al
// momento actual: la última parada cuya hora de inicio ya ha pasado -- es decir,
// el punto ANTERIOR a la hora actual, nunca uno posterior, para no adelantarse a
// algo que todavía no ha pasado. Si la hora actual es anterior a la primera
// parada del día, devuelve 0 (la primera). Devuelve null si no hay ninguna
// entrada con hora reconocible.
export function findCurrentScheduleIndex(schedule) {
  if (!schedule || schedule.length === 0) return null;
  const timed = schedule
    .map((s, i) => ({ ...s, _origIndex: i }))
    .filter((s) => s.time && /\d/.test(s.time));
  if (timed.length === 0) return null;

  const nowMinutes = getCurrentMinutesTokyo();

  const parseStartMinutes = (timeStr) => {
    const match = String(timeStr).match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    return Number(match[1]) * 60 + Number(match[2]);
  };

  let bestFilteredIndex = 0;
  let bestMinutes = -Infinity;
  timed.forEach((s, filteredIdx) => {
    const startMinutes = parseStartMinutes(s.time);
    if (startMinutes == null) return;
    if (startMinutes <= nowMinutes && startMinutes > bestMinutes) {
      bestMinutes = startMinutes;
      bestFilteredIndex = filteredIdx;
    }
  });
  return bestFilteredIndex;
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
