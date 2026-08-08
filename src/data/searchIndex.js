import { flights, stays, days, transports, budget } from "./trip";
import { foods } from "./foods";
import { guides, guidesByDay } from "./guides";
import { pendingItems } from "./pending";
import { frikSections } from "./frikadas";
import { geekStops } from "./popCulture";
import { historyPeriods, furtherReading } from "./history";
import { weatherData, dailyWeather } from "./weatherData";
import { stops as mapStops } from "./mapData";
import { categories as phraseCategories, etiquette } from "../pages/PhrasesPage";
import { sections as prepSections } from "../pages/PrepPage";
import { emergencyNumbers, embassy } from "../pages/EmergencyPage";

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[·•]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function entry({ id, title, subtitle, category, tab, day, terms }) {
  const keywords = normalize([title, subtitle, ...(terms || [])].filter(Boolean).join(" "));
  return { id, title, subtitle, category, tab, day, keywords };
}

function buildSearchIndex() {
  const items = [];

  // ── Vuelos ────────────────────────────────────────────────────────
  items.push(entry({
    id: "flight-out",
    title: `Vuelo ida · ${flights.out.flightNumber}`,
    subtitle: "Madrid → Doha → Narita · 6–7 sept",
    category: "Vuelos",
    tab: "vuelos",
    terms: [
      "vuelo", "ida", "qatar", "qr148", "qr808", "madrid", "barajas", "t4s",
      "doha", "doh", "hamad", "narita", "nrt", "t2", "escala",
      flights.booking.ref, flights.booking.pin, "pin vuelo", "referencia",
    ],
  }));
  items.push(entry({
    id: "flight-back",
    title: `Vuelo vuelta · ${flights.back.flightNumber}`,
    subtitle: "Narita → Doha → Madrid · 21–22 sept",
    category: "Vuelos",
    tab: "vuelos",
    terms: [
      "vuelo", "vuelta", "qatar", "iberia", "qr809", "qr6952",
      "narita", "doha", "madrid", flights.booking.ref, flights.booking.pin,
    ],
  }));
  items.push(entry({
    id: "flight-booking",
    title: `Reserva vuelo · ${flights.booking.ref}`,
    subtitle: `PIN ${flights.booking.pin} · ${flights.price.perPerson}/persona`,
    category: "Vuelos",
    tab: "vuelos",
    terms: [
      "reserva", "booking", "referencia", "pin", flights.booking.ref,
      flights.booking.pin, "40-892227078", "2534",
    ],
  }));

  // ── Hoteles ───────────────────────────────────────────────────────
  for (const stay of stays) {
    for (const opt of stay.options) {
      const terms = [
        stay.city, opt.name, opt.confirmation, opt.pin, opt.address, opt.phone,
        "hotel", "alojamiento", "check-in", "check-out", "reserva",
      ].filter(Boolean);
      items.push(entry({
        id: `hotel-${stay.id}`,
        title: opt.name,
        subtitle: [
          stay.city,
          opt.confirmation ? `Conf. ${opt.confirmation}` : null,
          opt.pin ? `PIN ${opt.pin}` : null,
        ].filter(Boolean).join(" · "),
        category: "Hoteles",
        tab: "hoteles",
        terms,
      }));
    }
  }

  // ── Días del itinerario (ciudades / títulos) ───────────────────────
  for (const d of days) {
    items.push(entry({
      id: `day-${d.num}`,
      title: `Día ${d.num} · ${d.title}`,
      subtitle: `${d.cities} · ${d.date}`,
      category: "Itinerario",
      tab: "itinerario",
      day: d.num,
      terms: [
        d.title, d.cities, d.summary, `dia ${d.num}`, `día ${d.num}`,
        d.weekday, d.date,
      ],
    }));
  }

  // Lugares clave → día concreto (primera aparición en guidesByDay)
  const placeToDay = {};
  for (const [dayStr, ids] of Object.entries(guidesByDay)) {
    const n = parseInt(dayStr, 10);
    for (const gid of ids) {
      if (placeToDay[gid] == null) placeToDay[gid] = n;
    }
  }
  // Aliases extra ciudad → día (primera noche / visita)
  const cityDayHints = [
    { terms: ["kioto", "kyoto"], day: 1, title: "Kioto", subtitle: "Base días 1–5" },
    { terms: ["nara", "todai", "ciervos"], day: 2, title: "Nara", subtitle: "Día 2 · Todai-ji y ciervos" },
    { terms: ["arashiyama", "bambu", "bambú"], day: 3, title: "Arashiyama", subtitle: "Día 3 · bosque de bambú" },
    { terms: ["osaka", "dotonbori", "shinsekai"], day: 5, title: "Osaka", subtitle: "Día 5" },
    { terms: ["kanazawa"], day: 6, title: "Kanazawa", subtitle: "Día 6" },
    { terms: ["shirakawa", "shirakawa-go", "gassho"], day: 7, title: "Shirakawa-go", subtitle: "Día 7" },
    { terms: ["takayama", "hida"], day: 7, title: "Takayama", subtitle: "Días 7–8" },
    { terms: ["magome", "tsumago", "nakasendo"], day: 8, title: "Magome / Tsumago", subtitle: "Día 8 · Nakasendo" },
    { terms: ["asakusa", "senso"], day: 10, title: "Asakusa", subtitle: "Días 9–15 · hotel en Asakusa" },
    { terms: ["akihabara"], day: 9, title: "Akihabara", subtitle: "Día 9" },
    { terms: ["odaiba"], day: 10, title: "Odaiba", subtitle: "Día 10" },
    { terms: ["shibuya", "harajuku", "shinjuku"], day: 11, title: "Shibuya / Harajuku / Shinjuku", subtitle: "Día 11" },
    { terms: ["fuji", "monte fuji", "kaneshima", "fujiyama"], day: 14, title: "Monte Fuji", subtitle: "Día 14 · excursión" },
    { terms: ["ikebukuro", "nakano", "nintendo", "pokemon"], day: 13, title: "Ikebukuro / Nakano", subtitle: "Día 13" },
    { terms: ["toyosu", "ginza", "roppongi"], day: 12, title: "Toyosu / Ginza / Roppongi", subtitle: "Día 12" },
  ];
  for (const c of cityDayHints) {
    items.push(entry({
      id: `place-day-${c.title}`,
      title: c.title,
      subtitle: c.subtitle,
      category: "Itinerario",
      tab: "itinerario",
      day: c.day,
      terms: c.terms,
    }));
  }

  for (const [gid, dayNum] of Object.entries(placeToDay)) {
    const g = guides[gid];
    if (!g) continue;
    items.push(entry({
      id: `guide-day-${gid}`,
      title: g.name,
      subtitle: `Día ${dayNum} · ${g.tagline || "Guía del lugar"}`,
      category: "Itinerario",
      tab: "itinerario",
      day: dayNum,
      terms: [g.name, g.jp, gid.replace(/-/g, " "), g.tagline],
    }));
  }

  // ── Transportes ───────────────────────────────────────────────────
  for (const t of transports) {
    const bookingMatch = t.note?.match(/12GO\d+/gi) || [];
    items.push(entry({
      id: `transport-${t.day}-${t.name}`,
      title: t.name,
      subtitle: `${t.from} → ${t.to}${typeof t.day === "number" ? ` · Día ${t.day}` : ""}`,
      category: "Transportes",
      tab: "transportes",
      day: typeof t.day === "number" ? t.day : undefined,
      terms: [
        t.name, t.from, t.to, t.type, t.note,
        ...bookingMatch, "tren", "bus", "shinkansen", "transporte",
      ],
    }));
  }
  items.push(entry({
    id: "suica",
    title: "Tarjeta Suica / Pasmo",
    subtitle: "Metro, tren local y buses",
    category: "Transportes",
    tab: "transportes",
    terms: ["suica", "pasmo", "ic card", "metro", "recarga"],
  }));
  items.push(entry({
    id: "jr-pass",
    title: "JR Pass",
    subtitle: "Evaluación de si conviene o no",
    category: "Transportes",
    tab: "transportes",
    terms: ["jr pass", "japan rail pass", "pase jr"],
  }));
  items.push(entry({
    id: "nohi-bookings",
    title: "Reservas Nohi Bus",
    subtitle: "12GO31991741 · 12GO31992254",
    category: "Transportes",
    tab: "transportes",
    day: 7,
    terms: ["nohi", "12go31991741", "12go31992254", "12go", "shirakawa bus"],
  }));

  // ── Comidas ───────────────────────────────────────────────────────
  for (const f of foods) {
    items.push(entry({
      id: `food-${f.id}`,
      title: f.name,
      subtitle: f.where || "Comida típica",
      category: "Comidas",
      tab: "comidas",
      terms: [f.name, f.jp, f.desc, f.where, f.id],
    }));
  }

  // ── Lugares (guías) ───────────────────────────────────────────────
  for (const [gid, g] of Object.entries(guides)) {
    items.push(entry({
      id: `lugar-${gid}`,
      title: g.name,
      subtitle: g.tagline || "Lugar del viaje",
      category: "Lugares",
      tab: "lugares",
      terms: [g.name, g.jp, gid.replace(/-/g, " "), g.tagline],
    }));
  }

  // ── Frikadas ──────────────────────────────────────────────────────
  // Un resultado por tema para que una búsqueda lleve directamente al
  // apartado correcto, tanto si se busca una franquicia como un personaje,
  // lugar, tienda o término concreto de cultura pop.
  const franchiseTerms = {
    pokemon: ["pokemon", "pokémon", "pikachu", "mewtwo", "ho oh", "ho-oh", "lugia", "raikou", "entei", "suicune", "johto", "ciudad iris", "ecruteak", "torre campana", "torre quemada", "ciudad malva", "violet city", "bellsprout", "campana", "pokemon center", "pokecenter"],
    digimon: ["digimon", "digimon adventure", "agumon", "gabumon", "tai", "taichi", "matt", "yamato", "patamon", "gatomon", "pumpkinmon", "gotsumon", "odaiba", "digimundo"],
    dragonball: ["dragon ball", "dragonball", "goku", "son goku", "vegeta", "bulma", "toriyama", "akira toriyama", "kamehameha", "namek", "saiyan", "saiyan", "shonen jump"],
    doraemon: ["doraemon", "doraemon", "nobita", "dorayaki", "fujiko f fujio", "puerta magica", "dokodemo door", "kawasaki"],
    shinchan: ["shin chan", "shinchan", "crayon shin chan", "crayon shin-chan", "shinnosuke", "nohara", "kasukabe"],
    tekken: ["tekken", "heihachi", "kazuya", "jin kazama", "mishima", "mishima zaibatsu", "bandai namco", "arcade", "maquinas recreativas"],
    nintendo: ["nintendo", "mario", "super mario", "zelda", "link", "kirby", "splatoon", "animal crossing", "pokemon", "game boy", "switch", "hanafuda", "nintendo museum", "nintendo tokyo", "nintendo kyoto"],
    ghibli: ["ghibli", "studio ghibli", "miyazaki", "totoro", "chihiro", "el viaje de chihiro", "mononoke", "howl", "castillo ambulante", "kiki", "ghibli park", "museo ghibli", "mitaka"],
    godzilla: ["godzilla", "gojira", "kaiju", "toho", "kabukicho", "kabukichō", "hotel gracery", "shinjuku"],
  };
  for (const section of frikSections) {
    for (const [index, item] of section.items.entries()) {
      items.push(entry({
        id: `frikada-${section.id}-${index}`,
        title: `${section.label} · ${item.title}`,
        subtitle: "Frikadas",
        category: "Frikadas",
        tab: "frikadas",
        terms: [section.label, section.intro, item.title, item.body, ...(franchiseTerms[section.id] || [])],
      }));
    }
  }
  for (const stop of geekStops) {
    items.push(entry({
      id: `frikada-ruta-${stop.id}`,
      title: `${stop.franchise} · ${stop.title}`,
      subtitle: `Frikadas · Día ${stop.day} · ${stop.place}`,
      category: "Frikadas",
      tab: "frikadas",
      terms: [stop.franchise, stop.title, stop.place, stop.relation, stop.plan, stop.access, "frikadas", "friki", "freak", "anime", "manga", "videojuegos", "juegos"],
    }));
  }

  // ── Historia ──────────────────────────────────────────────────────
  for (const period of historyPeriods) {
    items.push(entry({ id: `history-${period.id}`, title: period.title, subtitle: "Historia de Japón", category: "Historia", tab: "historia", terms: [period.title, period.summary, ...(period.content || []).map((block) => block.text)] }));
  }
  for (const kind of ["books", "podcasts"]) {
    for (const item of furtherReading[kind] || []) {
      items.push(entry({ id: `history-${kind}-${item.title}`, title: item.title, subtitle: kind === "books" ? "Libro recomendado · Historia" : "Podcast recomendado · Historia", category: "Historia", tab: "historia", terms: [item.title, item.author, item.description, item.text, "historia", "japon"] }));
    }
  }

  // ── Clima, mapa y presupuesto ─────────────────────────────────────
  for (const weather of weatherData) {
    items.push(entry({ id: `weather-${weather.city}`, title: `Clima en ${weather.city}`, subtitle: `${weather.condition} · ${weather.min}–${weather.max} °C`, category: "Clima", tab: "clima", terms: [weather.city, weather.condition, weather.precip, "temperatura", "lluvia", "humedad", "septiembre"] }));
  }
  for (const weather of dailyWeather) {
    items.push(entry({ id: `weather-day-${weather.day}`, title: `Tiempo · Día ${weather.day} · ${weather.city}`, subtitle: `${weather.condition} · ${weather.low}–${weather.high} °C · ${weather.rain}% lluvia`, category: "Clima", tab: "clima", terms: [weather.city, weather.condition, `dia ${weather.day}`, "temperatura", "lluvia", "paraguas"] }));
  }
  for (const stop of mapStops) {
    items.push(entry({ id: `map-${stop.id}`, title: stop.name, subtitle: `Mapa · ${stop.day} · ${stop.city}`, category: "Mapa", tab: "mapa", terms: [stop.name, stop.city, stop.detail, stop.day, "mapa", "ubicacion", "ubicación"] }));
  }
  for (const [index, category] of budget.categories.entries()) {
    items.push(entry({ id: `budget-${index}`, title: category.title, subtitle: `Presupuesto · ${category.total}`, category: "Presupuesto", tab: "presupuesto", terms: [category.title, category.total, ...(category.details || []), "presupuesto", "coste", "precio", "euros"] }));
  }

  // ── Frases, preparativos y emergencias ─────────────────────────────
  for (const category of phraseCategories) {
    for (const phrase of category.phrases) {
      items.push(entry({ id: `phrase-${category.id}-${phrase.romaji}`, title: phrase.es, subtitle: `Frases · ${phrase.romaji} · ${phrase.jp}`, category: "Frases", tab: "frases", terms: [category.title, phrase.es, phrase.romaji, phrase.jp, "japones", "japonés"] }));
    }
  }
  for (const rule of etiquette) {
    items.push(entry({ id: `etiquette-${rule.title}`, title: rule.title, subtitle: "Etiqueta en Japón", category: "Frases", tab: "frases", terms: [rule.title, rule.text, "etiqueta", "costumbres"] }));
  }
  for (const section of prepSections) {
    for (const item of section.items) {
      items.push(entry({ id: `prep-${item.id}`, title: item.text, subtitle: `Preparativos · ${section.title}`, category: "Preparativos", tab: "preparativos", terms: [section.title, item.id, item.text, "maleta", "checklist"] }));
    }
  }
  for (const emergency of emergencyNumbers) {
    items.push(entry({ id: `emergency-${emergency.number}`, title: `${emergency.label} · ${emergency.number}`, subtitle: emergency.note, category: "Emergencias", tab: "emergencias", terms: [emergency.label, emergency.number, emergency.note, "emergencia", "urgencia"] }));
  }
  items.push(entry({ id: "emergency-embassy", title: embassy.name, subtitle: embassy.emergencyPhone, category: "Emergencias", tab: "emergencias", terms: [embassy.name, embassy.address, embassy.phone, embassy.emergencyPhone, embassy.note, "consulado", "emergencia consular"] }));

  // ── Pendientes ────────────────────────────────────────────────────
  for (const p of pendingItems) {
    items.push(entry({
      id: `pending-${p.id}`,
      title: p.title,
      subtitle: p.deadline || "Pendiente",
      category: "Pendientes",
      tab: "pendientes",
      terms: [p.title, p.detail, p.deadline, p.id],
    }));
  }

  // ── Herramientas ──────────────────────────────────────────────────
  items.push(entry({
    id: "cambio",
    title: "Cambio de divisas",
    subtitle: "Euro ↔ Yen · tipo de cambio",
    category: "Herramientas",
    tab: "herramientas",
    terms: [
      "cambio", "divisas", "yen", "jpy", "eur", "euro", "convertidor",
      "tipo de cambio", "cambio de moneda", "dinero",
    ],
  }));
  items.push(entry({
    id: "hora",
    title: "Hora local Japón / España",
    subtitle: "Diferencia horaria",
    category: "Herramientas",
    tab: "herramientas",
    terms: ["hora", "horario", "jst", "japon", "españa", "diferencia horaria", "reloj"],
  }));

  // ── Frases (selección útil) ───────────────────────────────────────
  const phraseHits = [
    { title: "¿Dónde está el baño?", terms: ["baño", "aseo", "toilet", "toire"] },
    { title: "La cuenta, por favor", terms: ["cuenta", "pagar", "okaikei", "factura"] },
    { title: "Muchas gracias (Arigatou)", terms: ["gracias", "arigatou", "arigato"] },
    { title: "Perdón / Sumimasen", terms: ["perdon", "perdón", "sumimasen", "disculpe"] },
    { title: "Hola / Konnichiwa", terms: ["hola", "konnichiwa"] },
    { title: "Itadakimasu / antes de comer", terms: ["itadakimasu", "comer", "restaurante"] },
  ];
  for (const ph of phraseHits) {
    items.push(entry({
      id: `phrase-${ph.title}`,
      title: ph.title,
      subtitle: "Frases útiles",
      category: "Frases",
      tab: "frases",
      terms: ph.terms,
    }));
  }

  // ── Clima ─────────────────────────────────────────────────────────
  items.push(entry({
    id: "clima",
    title: "Clima en septiembre",
    subtitle: "Previsión y consejos de ropa",
    category: "Clima",
    tab: "clima",
    terms: ["clima", "tiempo", "lluvia", "temperatura", "paraguas", "humedad", "septiembre"],
  }));

  // ── Emergencias ───────────────────────────────────────────────────
  items.push(entry({
    id: "emergencia-110",
    title: "Policía · 110",
    subtitle: "Emergencias en Japón",
    category: "Emergencias",
    tab: "emergencias",
    terms: ["110", "policia", "policía", "emergencia"],
  }));
  items.push(entry({
    id: "emergencia-119",
    title: "Ambulancia / Bomberos · 119",
    subtitle: "Emergencias médicas o incendios",
    category: "Emergencias",
    tab: "emergencias",
    terms: ["119", "ambulancia", "bomberos", "medico", "médico", "hospital"],
  }));
  items.push(entry({
    id: "embajada",
    title: "Embajada de España en Tokio",
    subtitle: "Contacto consular",
    category: "Emergencias",
    tab: "emergencias",
    terms: ["embajada", "consulado", "españa", "roppongi"],
  }));

  // ── Preparativos ──────────────────────────────────────────────────
  items.push(entry({
    id: "prep",
    title: "Preparativos / maleta",
    subtitle: "Ropa, documentos, chubasquero…",
    category: "Preparativos",
    tab: "preparativos",
    terms: ["maleta", "ropa", "chubasquero", "pasaporte", "checklist", "preparativos", "equipaje"],
  }));

  return items;
}

export const searchIndex = buildSearchIndex();

export function searchGlobal(query, { limit = 12, minChars = 3 } = {}) {
  const q = normalize(query);
  if (q.length < minChars) return [];

  const scored = [];
  for (const item of searchIndex) {
    if (!item.keywords.includes(q)) {
      // also allow multi-token: all tokens must match
      const tokens = q.split(" ").filter((t) => t.length >= 2);
      if (tokens.length > 1 && tokens.every((t) => item.keywords.includes(t))) {
        scored.push({ item, score: 50 + tokens.length * 5 });
      }
      continue;
    }
    // Prefer title matches
    const titleN = normalize(item.title);
    let score = 10;
    if (titleN.startsWith(q)) score += 40;
    else if (titleN.includes(q)) score += 25;
    if (normalize(item.subtitle).includes(q)) score += 8;
    // Boost booking codes / exact-ish ids
    if (/^\d{4,}$/.test(q) || /^qr\d/i.test(q) || /^12go/i.test(q)) score += 30;
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "es"));
  // Deduplicate by id
  const seen = new Set();
  const out = [];
  for (const { item } of scored) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
    if (out.length >= limit) break;
  }
  return out;
}
