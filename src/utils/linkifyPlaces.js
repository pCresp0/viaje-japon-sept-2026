import { mapsUrl } from "./maps";

// Alias (cómo aparece en el texto) → query de Google Maps.
// Ordenar de más largo a más corto para evitar matches parciales.
const PLACE_ENTRIES = [
  // Aeropuertos y estaciones
  ["Aeropuerto Adolfo Suárez Madrid-Barajas", "Aeropuerto Adolfo Suárez Madrid-Barajas"],
  ["Aeropuerto Internacional de Hamad", "Hamad International Airport Doha"],
  ["Gobierno Metropolitano", "Tokyo Metropolitan Government Building"],
  ["Estación de Tokio", "Tokyo Station Japan"],
  ["Estación de Kioto", "Kyoto Station Japan"],
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

  // Tokio
  ["Palacio Imperial", "Imperial Palace Tokyo"],
  ["Tokyo City View", "Tokyo City View Mori Tower"],
  ["Torre de Tokio", "Tokyo Tower"],
  ["Torre Mori", "Mori Tower Roppongi"],
  ["Rainbow Bridge", "Rainbow Bridge Tokyo"],
  ["Pokémon Center Shibuya", "Pokemon Center Shibuya"],
  ["Pokémon Center Ikebukuro", "Pokemon Center Mega Tokyo Ikebukuro"],
  ["Nintendo Store Tokyo", "Nintendo TOKYO"],
  ["Pokémon Café", "Pokemon Cafe Tokyo"],
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
  ["Monte Fuji", "Mount Fuji Japan"],
  ["Fuji", "Mount Fuji Japan"],
  ["teamLab", "teamLab Planets Tokyo"],
  ["Tokio", "Tokyo Japan"],
  ["Tokyo", "Tokyo Japan"],
  ["Narita", "Narita Airport Japan"],
  ["Doha", "Hamad International Airport Doha"],
  ["Madrid", "Madrid Spain"],
];

// Deduplicate keeping first (longest-first if we sort)
const seen = new Set();
export const mapPlaces = PLACE_ENTRIES
  .sort((a, b) => b[0].length - a[0].length)
  .filter(([alias]) => {
    const key = alias.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

const pattern = new RegExp(
  `(${mapPlaces.map(([a]) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "gi"
);

export function placeMapsUrl(alias) {
  const found = mapPlaces.find(([a]) => a.toLowerCase() === alias.toLowerCase());
  return mapsUrl(found ? found[1] : `${alias}, Japan`);
}

/** Split text into plain strings and place-link descriptors */
export function tokenizePlaces(text) {
  if (!text) return [];
  const parts = [];
  let last = 0;
  const re = new RegExp(pattern.source, "gi");
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
    parts.push({ type: "place", value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts.length ? parts : [{ type: "text", value: text }];
}
