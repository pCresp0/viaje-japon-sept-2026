import { mapsUrl } from "./maps";

// Regex para detectar URLs completas y dominios web conocidos
const URL_PATTERN = /(?:https?:\/\/[^\s)]+|(?:[a-zA-Z0-9-]+\.)+(?:com|es|org|jp|net|io)(?:\/[^\s)]*)?)/gi;

// Alias (cómo aparece en el texto) → query de Google Maps.
// Ordenar de más largo a más corto para evitar matches parciales.
const PLACE_ENTRIES = [
  // Aeropuertos y estaciones
  ["Aeropuerto Adolfo Suárez Madrid-Barajas", "Aeropuerto Adolfo Suárez Madrid-Barajas"],
  ["Aeropuerto Internacional de Hamad", "Hamad International Airport Doha"],
  ["Gobierno Metropolitano", "Tokyo Metropolitan Government Building"],
  ["Estación de Tokio", "Tokyo Station Japan"],
  ["Estación de Kioto", "Kyoto Station Japan"],
  ["Estación de Mishima", "Mishima Station Japan"],
  ["Estación de tren bala Shin-Fuji", "Shin-Fuji Station Japan"],
  ["Estación Shin-Fuji", "Shin-Fuji Station Japan"],
  ["estación de Nagoya", "Nagoya Station Japan"],
  ["estación de metro Keage", "Keage Station Kyoto"],
  ["Inari Station", "Inari Station Kyoto"],
  ["Kitaoji Station", "Kitaoji Station Kyoto"],
  ["Nakatsugawa", "Nakatsugawa Station Japan"],
  ["Nagoya", "Nagoya Station Japan"],

  // Kioto y alrededores
  ["Santuario Fushimi Inari", "Fushimi Inari Taisha Kyoto"],
  ["Fushimi Inari", "Fushimi Inari Taisha Kyoto"],
  ["Kinukake no Michi", "Kinukake-no-michi Kyoto"],
  ["Paseo de la Filosofía", "Philosopher's Path Kyoto"],
  ["bosque de bambú", "Arashiyama Bamboo Grove Kyoto"],
  ["Saga-Toriimoto", "Saga Toriimoto Kyoto"],
  ["Mercado de Nishiki", "Nishiki Market Kyoto"],
  ["Parque Maruyama", "Maruyama Park Kyoto"],
  ["Canal Okazaki", "Okazaki Canal Kyoto"],
  ["Heian Jingu", "Heian Shrine Kyoto"],
  ["Kiyomizu-dera", "Kiyomizu-dera Kyoto"],
  ["Templo Kiyomizu-dera", "Kiyomizu-dera Kyoto"],
  ["Kinkakuji", "Kinkaku-ji Kyoto"],
  ["Kinkaku-ji", "Kinkaku-ji Kyoto"],
  ["Ginkakuji", "Ginkaku-ji Kyoto"],
  ["Ginkaku-ji", "Ginkaku-ji Kyoto"],
  ["Pabellón de Plata", "Ginkaku-ji Kyoto"],
  ["Pabellón Dorado", "Kinkaku-ji Kyoto"],
  ["Ryoan-ji", "Ryoan-ji Kyoto"],
  ["Ninna-ji", "Ninna-ji Kyoto"],
  ["Eikando", "Eikando Temple Kyoto"],
  ["Nanzen-ji", "Nanzen-ji Kyoto"],
  ["Chion-in", "Chion-in Temple Kyoto"],
  ["Yasaka Jinja", "Yasaka Shrine Kyoto"],
  ["Higashiyama", "Higashiyama Kyoto"],
  ["Miyagawacho", "Miyagawacho Kyoto"],
  ["Hanamikoji", "Hanamikoji Street Gion Kyoto"],
  ["Ichiriki", "Ichiriki Chaya Kyoto"],
  ["Tatsumi", "Tatsumi Daimyojin Kyoto"],
  ["riachuelo Shirakawa", "Shirakawa Canal Gion Kyoto"],
  ["Pontocho", "Pontocho Alley Kyoto"],
  ["Arashiyama", "Arashiyama Kyoto"],
  ["Otagi", "Otagi Nenbutsu-ji Kyoto"],
  ["Gion", "Gion Kyoto"],
  ["Kioto", "Kyoto Japan"],
  ["Kyoto", "Kyoto Japan"],

  // Nara / Osaka
  ["Gran Buda", "Todai-ji Great Buddha Nara"],
  ["Todai-ji", "Todai-ji Nara"],
  ["parque de los ciervos", "Nara Park Japan"],
  ["Castillo de Osaka", "Osaka Castle"],
  ["Dotonbori", "Dotonbori Osaka"],
  ["Shinsekai", "Shinsekai Osaka"],
  ["Osaka", "Osaka Japan"],
  ["Nara", "Nara Japan"],

  // Alpes / Nakasendo
  ["Jardín Kenroku-en", "Kenroku-en Kanazawa"],
  ["Kenroku-en", "Kenroku-en Kanazawa"],
  ["barrio samurái de Nagamachi", "Nagamachi Samurai District Kanazawa"],
  ["Nagamachi", "Nagamachi Samurai District Kanazawa"],
  ["mercado Omicho", "Omicho Market Kanazawa"],
  ["Omicho", "Omicho Market Kanazawa"],
  ["Higashi Chaya", "Higashi Chaya District Kanazawa"],
  ["Sanmachi Suji", "Sanmachi Suji Takayama"],
  ["Shirakawa-go", "Shirakawa-go Japan"],
  ["Magome Chaya", "Magome Chaya Magome Japan"],
  ["Magome", "Magome Nakatsugawa Japan"],
  ["Tsumago", "Tsumago Nagiso Japan"],
  ["Takayama", "Takayama Gifu Japan"],
  ["Kanazawa", "Kanazawa Japan"],

  // Monte Fuji
  ["Pagoda Chureito", "Chureito Pagoda Japan"],
  ["Santuario Kitaguchi Hongu Fuji Sengen Jinja", "Kitaguchi Hongu Fuji Sengen Shrine"],
  ["Kitaguchi Hongu", "Kitaguchi Hongu Fuji Sengen Shrine"],
  ["Oshino Hakkai", "Oshino Hakkai Japan"],
  ["Bosque de Aokigahara", "Aokigahara Forest Japan"],
  ["Aokigahara", "Aokigahara Forest Japan"],
  ["Cataratas Shiraito", "Shiraito Falls Fujinomiya"],
  ["Shiraito", "Shiraito Falls Fujinomiya"],
  ["Lagos del Fuji", "Fuji Five Lakes Japan"],
  ["Lago Yamanakako", "Lake Yamanaka Japan"],
  ["Yamanakako", "Lake Yamanaka Japan"],
  ["Lago Saiko", "Lake Saiko Japan"],
  ["Saiko", "Lake Saiko Japan"],
  ["Lago Motosuko", "Lake Motosu Japan"],
  ["Motosuko", "Lake Motosu Japan"],
  ["Monte Fuji", "Mount Fuji Japan"],
  ["Fuji", "Mount Fuji Japan"],

  // Tokio
  ["Palacio Imperial", "Imperial Palace Tokyo"],
  ["Tokyo City View", "Tokyo City View Mori Tower"],
  ["Torre de Tokio", "Tokyo Tower"],
  ["Torre Mori", "Mori Tower Roppongi"],
  ["Rainbow Bridge", "Rainbow Bridge Tokyo"],
  ["Pokémon Center Shibuya", "Pokemon Center Shibuya"],
  ["Pokémon Center Ikebukuro", "Pokemon Center Mega Tokyo Ikebukuro"],
  ["Nintendo Store Tokyo", "Nintendo TOKYO"],
  ["Nakano Broadway", "Nakano Broadway Tokyo"],
  ["Miyashita Park", "Miyashita Park Shibuya"],
  ["calle Takeshita", "Takeshita Street Harajuku"],
  ["Takeshita", "Takeshita Street Harajuku"],
  ["Omoide Yokocho", "Omoide Yokocho Shinjuku"],
  ["Kabukicho", "Kabukicho Shinjuku"],
  ["parque Yoyogi", "Yoyogi Park Tokyo"],
  ["santuario Meiji", "Meiji Jingu Tokyo"],
  ["Meiji Jingū", "Meiji Jingu Tokyo"],
  ["Kaminarimon", "Kaminarimon Gate Asakusa"],
  ["Senso-ji", "Senso-ji Temple Asakusa"],
  ["Ameyoko", "Ameyoko Market Ueno"],
  ["Parque de Ueno", "Ueno Park Tokyo"],
  ["Ueno", "Ueno Park Tokyo"],
  ["Mandarake", "Mandarake Complex Akihabara"],
  ["Akihabara", "Akihabara Tokyo"],
  ["Asakusa", "Asakusa Tokyo"],
  ["Odaiba", "Odaiba Tokyo"],
  ["Shibuya", "Shibuya Crossing Tokyo"],
  ["Harajuku", "Harajuku Tokyo"],
  ["Shinjuku", "Shinjuku Tokyo"],
  ["Toyosu", "Toyosu Market Tokyo"],
  ["Tsukiji", "Tsukiji Outer Market Tokyo"],
  ["Ginza", "Ginza Tokyo"],
  ["Roppongi", "Roppongi Tokyo"],
  ["Ikebukuro", "Ikebukuro Tokyo"],
  ["Nakano", "Nakano Broadway Tokyo"],
  ["Shimokitazawa", "Shimokitazawa Tokyo"],
  ["Shiodome", "Shiodome Tokyo"],
  ["teamLab", "teamLab Planets Tokyo"],
  ["Tokio", "Tokyo Japan"],
  ["Tokyo", "Tokyo Japan"],
  ["Narita", "Narita Airport Japan"],
  ["Doha", "Hamad International Airport Doha"],
  ["Madrid", "Madrid Spain"],
];

// Deduplicate keeping first (longest-first)
const seen = new Set();
export const mapPlaces = PLACE_ENTRIES
  .sort((a, b) => b[0].length - a[0].length)
  .filter(([alias]) => {
    const key = alias.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

const placePattern = new RegExp(
  `\\b(${mapPlaces.map(([a]) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi"
);

export function placeMapsUrl(alias) {
  const found = mapPlaces.find(([a]) => a.toLowerCase() === alias.toLowerCase());
  return mapsUrl(found ? found[1] : `${alias}, Japan`);
}

/** Split text into plain strings, web URLs, and place-link descriptors */
export function tokenizePlaces(text) {
  if (!text) return [];
  let textStr = String(text);
  
  // Eliminar paréntesis que rodeen directamente a cualquier URL para que el botón se renderice limpio
  textStr = textStr.replace(/\(\s*(https?:\/\/[^\s)]+)\s*\)/gi, ' $1 ');
  // Normalizar viñetas con asterisco suelto (* Item) a viñeta limpia (• Item)
  textStr = textStr.replace(/(^|\n)\s*\*\s+/g, '$1• ');

  // 1. Primero extraemos las URLs completas para que no sean divididas por nombres de lugares
  const chunks = [];
  let lastIndex = 0;
  let urlMatch;
  const urlRe = new RegExp(URL_PATTERN.source, "gi");

  while ((urlMatch = urlRe.exec(textStr)) !== null) {
    if (urlMatch.index > lastIndex) {
      chunks.push({ type: "raw", value: textStr.slice(lastIndex, urlMatch.index) });
    }
    chunks.push({ type: "url", value: urlMatch[0] });
    lastIndex = urlMatch.index + urlMatch[0].length;
  }
  if (lastIndex < textStr.length) {
    chunks.push({ type: "raw", value: textStr.slice(lastIndex) });
  }

  // 2. Extraer formato en negrita (**texto**) de los fragmentos de texto puro
  const withBold = [];
  for (const chunk of chunks) {
    if (chunk.type !== "raw") {
      withBold.push(chunk);
      continue;
    }
    
    let last = 0;
    let boldMatch;
    const boldRe = /\*\*(.*?)\*\*/gs;
    
    while ((boldMatch = boldRe.exec(chunk.value)) !== null) {
      if (boldMatch.index > last) {
        withBold.push({ type: "raw", value: chunk.value.slice(last, boldMatch.index) });
      }
      withBold.push({ type: "bold", value: boldMatch[1] });
      last = boldMatch.index + boldMatch[0].length;
    }
    if (last < chunk.value.length) {
      withBold.push({ type: "raw", value: chunk.value.slice(last) });
    }
  }

  // 2b. Extraer formato en cursiva (*texto*) de los fragmentos restantes
  const withFormat = [];
  for (const chunk of withBold) {
    if (chunk.type !== "raw") {
      withFormat.push(chunk);
      continue;
    }

    let last = 0;
    let italicMatch;
    const italicRe = /\*([^*\n]+)\*/g;

    while ((italicMatch = italicRe.exec(chunk.value)) !== null) {
      if (italicMatch.index > last) {
        withFormat.push({ type: "raw", value: chunk.value.slice(last, italicMatch.index) });
      }
      withFormat.push({ type: "italic", value: italicMatch[1] });
      last = italicMatch.index + italicMatch[0].length;
    }
    if (last < chunk.value.length) {
      withFormat.push({ type: "raw", value: chunk.value.slice(last) });
    }
  }

  // 3. En los bloques de texto puro (raw), aplicamos la detección de lugares
  const finalParts = [];
  for (const part of withFormat) {
    if (part.type !== "raw") {
      finalParts.push(part);
      continue;
    }

    let rawLast = 0;
    let placeMatch;
    const placeRe = new RegExp(placePattern.source, "gi");

    while ((placeMatch = placeRe.exec(part.value)) !== null) {
      if (placeMatch.index > rawLast) {
        finalParts.push({ type: "text", value: part.value.slice(rawLast, placeMatch.index) });
      }
      finalParts.push({ type: "place", value: placeMatch[0] });
      rawLast = placeMatch.index + placeMatch[0].length;
    }
    if (rawLast < part.value.length) {
      finalParts.push({ type: "text", value: part.value.slice(rawLast) });
    }
  }

  return finalParts.length ? finalParts : [{ type: "text", value: textStr }];
}
