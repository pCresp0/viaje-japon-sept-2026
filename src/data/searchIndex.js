import { getContent, contentEs } from "./content";
import { frikSections } from "./frikadas";
import { geekStops } from "./popCulture";
import { stopSectionId } from "./geekRouteMap";
import { categories as phraseCategories, etiquette } from "../pages/PhrasesPage";
import { sections as prepSections } from "../pages/PrepPage";
import { emergencyNumbers, embassy } from "../pages/EmergencyPage";
import { slug } from "../utils/slug";

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[·•]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Alias de ciudades que la mayoría de gente de fuera de España escribe
// en su grafía inglesa. El contenido de la app está en español
// ("Kioto", "Tokio"), pero si un amigo del grupo busca "Kyoto" o
// "Tokyo" (muy probable si tiene la app en inglés/tagalo, o
// simplemente está acostumbrado a esa grafía) el buscador debe
// encontrar igualmente hoteles, comidas, clima, mapa... no sólo las
// entradas del itinerario que ya tenían el alias a mano.
const CITY_ALIASES = [
  ["kioto", "kyoto"],
  ["tokio", "tokyo"],
];

function withCityAliases(text) {
  const n = normalize(text);
  const extra = [];
  for (const [es, alt] of CITY_ALIASES) {
    if (n.includes(es)) extra.push(alt);
    if (n.includes(alt)) extra.push(es);
  }
  return extra;
}

function entry({ id, title, subtitle, category, tab, day, terms, targetId }) {
  const base = [title, subtitle, ...(terms || [])].filter(Boolean).join(" ");
  const aliasTerms = withCityAliases(base);
  const keywords = normalize([base, ...aliasTerms].join(" "));
  return { id, title, subtitle, category, tab, day, keywords, targetId };
}

function buildSearchIndex(lang) {
  const content = lang && lang !== "es" ? getContent(lang) : contentEs;
  const {
    flights, stays, days, transports, budget, foods, guides, guidesByDay,
    pendingItems, historyPeriods, furtherReading, mapStops, weatherData, dailyWeather,
  } = content;

  const items = [];

  // ── Vuelos ────────────────────────────────────────────────────────
  items.push(entry({
    id: "flight-out",
    title: `Vuelo ida · ${flights.out.flightNumber}`,
    subtitle: "Madrid → Doha → Narita · 6–7 sept",
    category: "Vuelos",
    tab: "vuelos",
    targetId: "flight-out",
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
    targetId: "flight-back",
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
    targetId: "flight-out",
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
        targetId: slug("hotel", stay.id),
        terms,
      }));
    }
  }

  // ── Días del itinerario (ciudades / títulos + schedule) ─────────────
  for (const d of days) {
    // Extraemos todo el texto de las entradas del schedule para indexar
    // horarios, transportes, restaurantes, visitas, hoteles, etc.
    const scheduleTerms = (d.schedule || []).flatMap((s) => [
      s.time,
      // Limpiar markdown y URLs del texto
      (s.text || "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/https?:\/\/[^\s)]+/g, "")
        .replace(/\n/g, " "),
    ]).filter(Boolean);

    items.push(entry({
      id: `day-${d.num}`,
      title: `Día ${d.num} · ${d.title}`,
      subtitle: `${d.cities} · ${d.date}`,
      category: "Itinerario",
      tab: "itinerario",
      day: d.num,
      targetId: slug("itinerary-day", d.num),
      terms: [
        d.title, d.cities, d.summary, `dia ${d.num}`, `día ${d.num}`,
        d.weekday, d.date, d.history,
        ...scheduleTerms,
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
    { terms: ["kioto", "kyoto", "keihan", "hachijoguchi", "uogashi", "kaiten sushi", "pontocho", "gion", "inari"], day: 1, title: "Kioto", subtitle: "Base días 1–5" },
    { terms: ["tokio", "tokyo", "koko hotel", "asakusa"], day: 9, title: "Tokio", subtitle: "Base días 9–15" },
    { terms: ["nara", "todai", "todaiji", "ciervos", "daibutsuden", "gran buda", "gran buddha", "shika senbei"], day: 2, title: "Nara", subtitle: "Día 2 · Todai-ji y ciervos" },
    { terms: ["arashiyama", "bambu", "bambú", "tenryu-ji", "kinkaku", "kinkakuji", "ginkaku", "ginkakuji", "nishiki", "mercado nishiki", "filo de la filosofia", "heian"], day: 3, title: "Arashiyama", subtitle: "Día 3 · bosque de bambú" },
    { terms: ["osaka", "dotonbori", "shinsekai", "kuromon", "namba", "takoyaki"], day: 5, title: "Osaka", subtitle: "Día 5" },
    { terms: ["kanazawa", "kenroku-en", "kenrokuен", "higashichaya"], day: 6, title: "Kanazawa", subtitle: "Día 6" },
    { terms: ["shirakawa", "shirakawa-go", "gassho", "minka"], day: 7, title: "Shirakawa-go", subtitle: "Día 7" },
    { terms: ["takayama", "hida", "hida beef", "wagyu", "sake", "sake brewery", "jinya", "sanmachi"], day: 7, title: "Takayama", subtitle: "Días 7–8" },
    { terms: ["magome", "tsumago", "nakasendo", "magome chaya", "cena minshuku", "jeng", "juan carlos"], day: 8, title: "Magome / Tsumago", subtitle: "Día 8 · Nakasendo" },
    { terms: ["asakusa", "senso", "senso-ji", "narita airport", "narita", "n'ex", "nex", "narita express"], day: 1, title: "Llegada · Narita", subtitle: "Día 1 · Aterrizaje y traslado a Kioto" },
    { terms: ["odaiba", "gundam", "teamlab", "teamlab planets", "yurikamome"], day: 10, title: "Odaiba / teamLab", subtitle: "Día 10" },
    { terms: ["shibuya", "harajuku", "shinjuku", "meiji", "takeshita", "omoide", "shibuya sky", "shibuya crossing", "cat street"], day: 11, title: "Shibuya / Harajuku / Shinjuku", subtitle: "Día 11" },
    { terms: ["toyosu", "ginza", "roppongi", "mori tower", "sushi", "sashimi", "tsukiji", "teamlab borderless"], day: 12, title: "Toyosu / Ginza / Roppongi", subtitle: "Día 12" },
    { terms: ["ikebukuro", "nakano", "nintendo", "pokemon", "sunshine", "animate", "mandarake", "broadway"], day: 13, title: "Ikebukuro / Nakano", subtitle: "Día 13" },
    { terms: ["fuji", "monte fuji", "ken kaneshima", "kaneshima", "fujiyama", "chureito", "aokigahara", "shiraito", "oshino", "houtou", "mishima", "shin-fuji", "getyourguide", "gyg", "gygx7m7nzbnl", "gygfwv2mnzv8", "gygzgvzvlfl75", "gygmx397lbna", "visionary", "saiko", "oishi", "mode gakuen", "isfujivisible", "mtfujitoday"], day: 14, title: "Monte Fuji", subtitle: "Día 14 · excursión exclusiva Ken + reservas GYG" },
    // Transportes clave buscables por nombre
    { terms: ["nozomi", "nozomi 53", "shinkansen", "shinagawa", "17:19", "smart ex", "coche 13", "13c", "13d", "13e", "14d", "14e"], day: 1, title: "Shinkansen Nozomi 53", subtitle: "Día 1 · Shinagawa → Kyoto 17:19" },
    { terms: ["check-in", "check in", "keihan", "hotel keihan"], day: 1, title: "Check-in Hotel Keihan Kyoto Hachijoguchi", subtitle: "Día 1 · 19:30" },
    { terms: ["cena", "kaiten", "uogashi", "sushi giratorio", "aeon mall", "aeon"], day: 1, title: "Cena Kaiten-Sushi Uogashi", subtitle: "Día 1 · AEON Mall Kyoto" },
    { terms: ["thunderbird", "hokuriku", "tsuruga", "kyoto kanazawa"], day: 6, title: "Thunderbird → Hokuriku Shinkansen", subtitle: "Día 6 · Kioto → Kanazawa" },
    { terms: ["hida express", "hida", "gifu", "takayama kanazawa"], day: 7, title: "JR Hida Express", subtitle: "Día 7 · Kanazawa → Takayama" },
    { terms: ["nohi bus", "nohi", "bus magome", "takayama magome", "08:00"], day: 8, title: "Nohi Bus Takayama → Magome", subtitle: "Día 8 · 08:00" },
    { terms: ["shinano", "express shinano", "nakatsugawa", "nagoya", "09:57", "42093", "aee6606m"], day: 9, title: "JR Shinano 4 → Nagoya", subtitle: "Día 9 · ✅ Reservado 42093 · 🎫 Recoger billetes" },
    { terms: ["kodama", "kodama 805", "shin-fuji", "fuji shinkansen", "07:27"], day: 14, title: "Shinkansen Kodama 805", subtitle: "Día 14 · Tokio → Mishima/Shin-Fuji" },
  ];
  for (const c of cityDayHints) {
    items.push(entry({
      id: `place-day-${c.title}`,
      title: c.title,
      subtitle: c.subtitle,
      category: "Itinerario",
      tab: "itinerario",
      day: c.day,
      targetId: slug("itinerary-day", c.day),
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
      targetId: slug("guide", gid),
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
      targetId: slug("transport", t.day, t.name),
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
      targetId: slug("food", f.id),
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
      targetId: slug("guide", gid),
      terms: [g.name, g.jp, gid.replace(/-/g, " "), g.tagline],
    }));
  }

  // ── Frikadas ──────────────────────────────────────────────────────
  // Un resultado por tema para que una búsqueda lleve directamente al
  // apartado correcto, tanto si se busca una franquicia como un personaje,
  // lugar, tienda o término concreto de cultura pop. targetId apunta
  // siempre al acordeón de la SECCIÓN (no al item suelto dentro), que es
  // lo que FrikadasPage sabe abrir automáticamente.
  const franchiseTerms = {
    pokemon: ["pokemon", "pokémon", "pikachu", "mewtwo", "ho oh", "ho-oh", "lugia", "raikou", "entei", "suicune", "johto", "ciudad iris", "ecruteak", "torre campana", "torre quemada", "ciudad malva", "violet city", "bellsprout", "campana", "pokemon center", "pokecenter"],
    digimon: ["digimon", "digimon adventure", "agumon", "gabumon", "tai", "taichi", "matt", "yamato", "patamon", "gatomon", "pumpkinmon", "gotsumon", "odaiba", "digimundo"],
    dragonball: ["dragon ball", "dragonball", "goku", "son goku", "vegeta", "bulma", "toriyama", "akira toriyama", "kamehameha", "namek", "saiyan", "shonen jump"],
    doraemon: ["doraemon", "nobita", "dorayaki", "fujiko f fujio", "puerta magica", "dokodemo door", "kawasaki"],
    shinchan: ["shin chan", "shinchan", "crayon shin chan", "crayon shin-chan", "shinnosuke", "nohara", "kasukabe"],
    tekken: ["tekken", "heihachi", "kazuya", "jin kazama", "mishima", "mishima zaibatsu", "bandai namco", "arcade", "maquinas recreativas"],
    nintendo: ["nintendo", "mario", "super mario", "zelda", "link", "kirby", "splatoon", "animal crossing", "pokemon", "game boy", "switch", "hanafuda", "nintendo museum", "nintendo tokyo", "nintendo kyoto"],
    ghibli: ["ghibli", "studio ghibli", "miyazaki", "totoro", "chihiro", "el viaje de chihiro", "mononoke", "howl", "castillo ambulante", "kiki", "ghibli park", "museo ghibli", "mitaka"],
    godzilla: ["godzilla", "gojira", "kaiju", "toho", "kabukicho", "kabukichō", "hotel gracery", "shinjuku"],
  };
  for (const section of frikSections) {
    const anchorId = slug("frikadas", section.id);
    for (const [index, item] of section.items.entries()) {
      items.push(entry({
        id: `frikada-${section.id}-${index}`,
        title: `${section.label} · ${item.title}`,
        subtitle: "Frikadas",
        category: "Frikadas",
        tab: "frikadas",
        targetId: anchorId,
        terms: [section.label, section.intro, item.title, item.body, ...(franchiseTerms[section.id] || [])],
      }));
    }
  }
  for (const stop of geekStops) {
    const sectionId = stopSectionId[stop.id];
    items.push(entry({
      id: `frikada-ruta-${stop.id}`,
      title: `${stop.franchise} · ${stop.title}`,
      subtitle: `Frikadas · Día ${stop.day} · ${stop.place}`,
      category: "Frikadas",
      tab: "frikadas",
      day: stop.day,
      targetId: sectionId ? slug("frikadas", sectionId) : undefined,
      terms: [stop.franchise, stop.title, stop.place, stop.relation, stop.plan, stop.access, "frikadas", "friki", "freak", "anime", "manga", "videojuegos", "juegos"],
    }));
  }

  // ── Historia ──────────────────────────────────────────────────────
  for (const period of historyPeriods) {
    items.push(entry({
      id: `history-${period.id}`,
      title: period.title,
      subtitle: "Historia de Japón",
      category: "Historia",
      tab: "historia",
      targetId: slug("history", period.id),
      terms: [period.title, period.summary, ...(period.content || []).map((block) => block.text)],
    }));
  }
  for (const kind of ["books", "podcasts"]) {
    for (const item of furtherReading[kind] || []) {
      items.push(entry({
        id: `history-${kind}-${item.title}`,
        title: item.title,
        subtitle: kind === "books" ? "Libro recomendado · Historia" : "Podcast recomendado · Historia",
        category: "Historia",
        tab: "historia",
        targetId: slug("history", kind, item.title),
        terms: [item.title, item.author, item.description, item.text, "historia", "japon"],
      }));
    }
  }

  // ── Clima, mapa y presupuesto ─────────────────────────────────────
  for (const weather of weatherData) {
    items.push(entry({
      id: `weather-${weather.city}`,
      title: `Clima en ${weather.city}`,
      subtitle: `${weather.condition} · ${weather.min}–${weather.max} °C`,
      category: "Clima",
      tab: "clima",
      targetId: slug("weather", weather.city),
      terms: [weather.city, weather.condition, weather.precip, "temperatura", "lluvia", "humedad", "septiembre"],
    }));
  }
  for (const weather of dailyWeather) {
    items.push(entry({
      id: `weather-day-${weather.day}`,
      title: `Tiempo · Día ${weather.day} · ${weather.city}`,
      subtitle: `${weather.condition} · ${weather.low}–${weather.high} °C · ${weather.rain}% lluvia`,
      category: "Clima",
      tab: "clima",
      day: weather.day,
      targetId: slug("weather-day", weather.day),
      terms: [weather.city, weather.condition, `dia ${weather.day}`, "temperatura", "lluvia", "paraguas"],
    }));
  }
  for (const stop of mapStops) {
    items.push(entry({
      id: `map-${stop.id}`,
      title: stop.name,
      subtitle: `Mapa · ${stop.day} · ${stop.city}`,
      category: "Mapa",
      tab: "mapa",
      targetId: slug("map", stop.id),
      terms: [stop.name, stop.city, stop.detail, stop.day, "mapa", "ubicacion", "ubicación"],
    }));
  }
  for (const [index, category] of budget.categories.entries()) {
    items.push(entry({
      id: `budget-${index}`,
      title: category.title,
      subtitle: `Presupuesto · ${category.total}`,
      category: "Presupuesto",
      tab: "presupuesto",
      targetId: slug("budget", index),
      terms: [category.title, category.total, ...(category.details || []), "presupuesto", "coste", "precio", "euros"],
    }));
  }

  // ── Frases, preparativos y emergencias ─────────────────────────────
  // Estas tres páginas todavía no forman parte del sistema de contenido
  // multiidioma (viven en el propio componente .jsx, no en /data), así
  // que se siguen indexando en español independientemente del idioma
  // activo — es justo lo mismo que la página en sí muestra hoy.
  for (const category of phraseCategories) {
    for (const phrase of category.phrases) {
      items.push(entry({
        id: `phrase-${category.id}-${phrase.romaji}`,
        title: phrase.es,
        subtitle: `Frases · ${phrase.romaji} · ${phrase.jp}`,
        category: "Frases",
        tab: "frases",
        targetId: slug("phrase", category.id, phrase.romaji),
        terms: [category.title, phrase.es, phrase.romaji, phrase.jp, "japones", "japonés"],
      }));
    }
  }
  for (const rule of etiquette) {
    items.push(entry({
      id: `etiquette-${rule.title}`,
      title: rule.title,
      subtitle: "Etiqueta en Japón",
      category: "Frases",
      tab: "frases",
      targetId: slug("etiquette", rule.title),
      terms: [rule.title, rule.text, "etiqueta", "costumbres"],
    }));
  }
  for (const section of prepSections) {
    for (const item of section.items) {
      items.push(entry({
        id: `prep-${item.id}`,
        title: item.text,
        subtitle: `Preparativos · ${section.title}`,
        category: "Preparativos",
        tab: "preparativos",
        targetId: slug("prep", item.id),
        terms: [section.title, item.id, item.text, "maleta", "checklist"],
      }));
    }
  }
  for (const emergency of emergencyNumbers) {
    items.push(entry({
      id: `emergency-${emergency.number}`,
      title: `${emergency.label} · ${emergency.number}`,
      subtitle: emergency.note,
      category: "Emergencias",
      tab: "emergencias",
      targetId: slug("emergency", emergency.number),
      terms: [emergency.label, emergency.number, emergency.note, "emergencia", "urgencia"],
    }));
  }
  items.push(entry({
    id: "emergency-insurance",
    title: "Seguro de viaje · Heymondo (Póliza 2368219)",
    subtitle: "IMA Ibérica Asistencia · +34 91 353 63 23",
    category: "Emergencias",
    tab: "emergencias",
    targetId: "emergency-insurance",
    terms: [
      "seguro", "seguro de viaje", "heymondo", "mondo", "póliza", "poliza", "2368219",
      "asistencia medica", "asistencia médica", "ima iberica", "ima ibérica", "airhelp",
      "913536323", "913536324", "gastos medicos", "repatriacion", "equipaje", "cobertura",
    ],
  }));
  items.push(entry({
    id: "emergency-embassy",
    title: embassy.name,
    subtitle: embassy.emergencyPhone,
    category: "Emergencias",
    tab: "emergencias",
    targetId: "emergency-embassy",
    terms: [embassy.name, embassy.address, embassy.phone, embassy.emergencyPhone, embassy.note, "consulado", "emergencia consular"],
  }));

  // ── Pendientes ────────────────────────────────────────────────────
  for (const p of pendingItems) {
    items.push(entry({
      id: `pending-${p.id}`,
      title: p.title,
      subtitle: p.deadline || "Pendiente",
      category: "Pendientes",
      tab: "pendientes",
      targetId: slug("pending", p.id),
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
    targetId: "emergency-embassy",
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

// Un índice por idioma, calculado sólo la primera vez que se pide.
const indexCache = new Map();
export function getSearchIndex(lang = "es") {
  const key = lang || "es";
  if (!indexCache.has(key)) {
    indexCache.set(key, buildSearchIndex(key));
  }
  return indexCache.get(key);
}

// Compatibilidad con quien siga importando `searchIndex` directamente
// (índice en español, comportamiento previo).
export const searchIndex = getSearchIndex("es");

// ── Tolerancia mínima a erratas ──────────────────────────────────────
// Distancia de edición (Levenshtein) acotada: sólo se usa como último
// recurso, cuando la búsqueda normal no encuentra nada, y sólo compara
// contra el título del resultado (no contra el blob entero de keywords,
// que sería carísimo y generaría muchísimo ruido).
function levenshtein(a, b) {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  let prev = Array.from({ length: bl + 1 }, (_, i) => i);
  for (let i = 1; i <= al; i++) {
    const cur = [i];
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[bl];
}

function fuzzyMatches(query, title) {
  const tn = normalize(title);
  const words = tn.split(" ");
  // Tolerancia: 1 error para palabras cortas/medias, 2 para las largas.
  const maxDist = query.length >= 7 ? 2 : 1;
  return words.some((w) => w.length >= 3 && levenshtein(query, w) <= maxDist);
}

// Lista de sugerencias rápidas para mostrar en el panel vacío
export const QUICK_SUGGESTIONS = [
  { label: "Fushimi Inari", query: "fushimi" },
  { label: "eSIM / Holafly", query: "holafly" },
  { label: "Nozomi 53", query: "nozomi" },
  { label: "Hotel Kioto", query: "keihan" },
  { label: "Monte Fuji", query: "fuji" },
  { label: "Shinkansen", query: "shinkansen" },
  { label: "Narita Express", query: "narita express" },
  { label: "Magome", query: "magome" },
  { label: "Check-in", query: "check-in" },
  { label: "Suica", query: "suica" },
  { label: "Seguro", query: "heymondo" },
  { label: "Pokémon", query: "pokemon" },
  { label: "Ken Kaneshima", query: "ken kaneshima" },
];

export function searchGlobal(query, { limit = 15, minChars = 3, lang = "es" } = {}) {
  const q = normalize(query);
  if (q.length < minChars) return [];

  const index = getSearchIndex(lang);
  const scored = [];
  for (const item of index) {
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

  // Si no hay ni un solo resultado, se intenta con tolerancia a erratas
  // (p. ej. "shibuia" -> "Shibuya") antes de rendirse.
  if (scored.length === 0 && q.length >= 4) {
    for (const item of index) {
      if (fuzzyMatches(q, item.title)) {
        scored.push({ item, score: 5 });
      }
    }
  }

  scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "es"));

  // Deduplicar por id, y repartir entre categorías: sin esto, una
  // búsqueda amplia ("kioto") puede llenar los 12 huecos sólo con
  // Itinerario y dejar fuera el hotel o el clima de esa misma ciudad,
  // aunque también coincidan. Primera pasada: máx. 3 por categoría en
  // orden de puntuación; segunda pasada: rellenar lo que quede sin ese
  // límite, para no perder resultados si hay pocas categorías distintas.
  const seen = new Set();
  const perCategoryCount = new Map();
  const PER_CATEGORY_CAP = 3;
  const out = [];

  for (const { item } of scored) {
    if (out.length >= limit) break;
    if (seen.has(item.id)) continue;
    const count = perCategoryCount.get(item.category) || 0;
    if (count >= PER_CATEGORY_CAP) continue;
    seen.add(item.id);
    perCategoryCount.set(item.category, count + 1);
    out.push(item);
  }
  if (out.length < limit) {
    for (const { item } of scored) {
      if (out.length >= limit) break;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      out.push(item);
    }
  }

  return out;
}
