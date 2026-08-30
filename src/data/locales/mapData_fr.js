export const stops = [
  // ── JOUR 1 : Arrivée au Japon ────────────────────────────────────
  { name: "Aéroport de Narita", city: "Chiba", day: "Jours 1 et 15", detail: "Arrivée internationale · N'EX vers Tokyo / Shinkansen vers Kyoto" },
  { name: "Gare de Kyoto", city: "Kyoto", day: "Jours 1–5", detail: "Arrivée en Shinkansen Nozomi · Nœud central à Kyoto" },

  // ── JOUR 2 : Sud de Kyoto et Nara ────────────────────────────────
  { name: "Fushimi Inari Taisha", city: "Kyoto", day: "Jour 2", detail: "Sanctuaire aux 10 000 torii rouges et sentiers du mont Inari" },
  { name: "Nara et Todai-ji", city: "Nara", day: "Jour 2", detail: "Todai-ji, Grand Bouddha en bronze et parc aux daims" },
  { name: "Pontocho et Miyagawacho", city: "Kyoto", day: "Jour 2", detail: "Balade du soir dans les ruelles traditionnelles au bord du fleuve Kamo" },

  // ── JOUR 3 : Nord de Higashiyama et Geishas ──────────────────────
  { name: "Ginkaku-ji", city: "Kyoto", day: "Jour 3", detail: "Pavillon d'Argent et jardin zen de sable" },
  { name: "Chemin de la Philosophie", city: "Kyoto", day: "Jour 3", detail: "Promenade piétonne pavée le long du canal" },
  { name: "Eikando et Nanzen-ji", city: "Kyoto", day: "Jour 3", detail: "Temples zen de Higashiyama et aqueduc en briques" },
  { name: "Marché de Nishiki", city: "Kyoto", day: "Jour 3", detail: "Le garde-manger de Kyoto et dégustations culinaires" },
  { name: "Quartier de Gion", city: "Kyoto", day: "Jour 3", detail: "Hanamikoji, Shirakawa et quartier historique des geishas" },

  // ── JOUR 4 : Nord-ouest de Kyoto et Arashiyama ───────────────────
  { name: "Kinkaku-ji", city: "Kyoto", day: "Jour 4", detail: "Le Pavillon d'Or recouvert de feuilles d'or" },
  { name: "Ryoan-ji", city: "Kyoto", day: "Jour 4", detail: "Le plus célèbre jardin sec zen du Japon (15 rochers)" },
  { name: "Ninna-ji", city: "Kyoto", day: "Jour 4", detail: "Temple impérial, patrimoine mondial avec cerisiers nains" },
  { name: "Otagi Nenbutsu-ji", city: "Kyoto", day: "Jour 4", detail: "1 200 statues de rakan aux visages uniques à Saga-Toriimoto" },
  { name: "Arashiyama et Forêt de Bambous", city: "Kyoto", day: "Jour 4", detail: "Bambouseraie, pont Togetsukyo et tramway Randen" },

  // ── JOUR 5 : Kyoto Traditionnel et Château d'Osaka ───────────────
  { name: "Kiyomizu-dera", city: "Kyoto", day: "Jour 5", detail: "Grande terrasse en bois sur la vallée et cascade Otowa" },
  { name: "Higashiyama, Yasaka et Chion-in", city: "Kyoto", day: "Jour 5", detail: "Pentes Ninenzaka/Sannenzaka, parc Maruyama et Chion-in" },
  { name: "Château d'Osaka", city: "Osaka", day: "Jour 5", detail: "Forteresse historique de Toyotomi Hideyoshi et parc" },
  { name: "Dotonbori et Namba", city: "Osaka", day: "Jour 5", detail: "Néons géants, Glico Man, takoyaki et street food" },

  // ── JOUR 6 : Kanazawa ────────────────────────────────────────────
  { name: "Kenroku-en", city: "Ishikawa", day: "Jour 6", detail: "L'un des trois grands jardins paysagers célèbres du Japon" },
  { name: "Quartier samouraï de Nagamachi", city: "Ishikawa", day: "Jour 6", detail: "Ruelles aux murs de terre des anciennes demeures de samouraïs" },
  { name: "Marché Omicho", city: "Ishikawa", day: "Jour 6", detail: "Les meilleurs fruits de mer frais de la mer du Japon" },
  { name: "Higashi Chaya", city: "Ishikawa", day: "Jour 6", detail: "Quartier historique des maisons de thé et geiko de Kanazawa" },

  // ── JOUR 7 : Shirakawa-go et Takayama ────────────────────────────
  { name: "Shirakawa-go", city: "Gifu", day: "Jour 7", detail: "Village traditionnel gassho-zukuri classé à l'UNESCO" },
  { name: "Takayama (Sanmachi Suji)", city: "Gifu", day: "Jours 7–8", detail: "Cité historique préservée, brasseries de saké et bœuf de Hida" },

  // ── JOUR 8 : La Route du Nakasendo ───────────────────────────────
  { name: "Magome", city: "Nakatsugawa", day: "Jour 8", detail: "Bourg-relais en pente, départ du Nakasendo · Magome Chaya" },
  { name: "Tsumago", city: "Nagano", day: "Jour 8", detail: "Arrivée de la randonnée historique Magome → Tsumago (8 km)" },

  // ── JOUR 9 : Transit vers Tokyo et Akihabara ─────────────────────
  { name: "Gare de Nagoya", city: "Aichi", day: "Jour 9", detail: "Nœud de correspondance · arrêt ekiben avant le Tokaido Shinkansen" },
  { name: "Akihabara", city: "Tokyo", day: "Jour 9", detail: "Electric Town, électronique, mangas et boutiques de figurines" },

  // ── JOUR 10 : Asakusa, Ueno et Odaiba ────────────────────────────
  { name: "Asakusa et Senso-ji", city: "Tokyo", day: "Jour 10", detail: "Temple Senso-ji, porte Kaminarimon et rue commerçante Nakamise" },
  { name: "Ueno et Ameyoko", city: "Tokyo", day: "Jour 10", detail: "Parc d'Ueno et grand marché populaire d'Ameyoko" },
  { name: "Odaiba et Baie de Tokyo", city: "Tokyo", day: "Jour 10", detail: "Train sans conducteur Yurikamome, Gundam géant et coucher de soleil" },

  // ── JOUR 11 : Shibuya, Harajuku et Shinjuku ──────────────────────
  { name: "Carrefour de Shibuya", city: "Tokyo", day: "Jour 11", detail: "Le carrefour piéton le plus célèbre du monde et Pokémon Center" },
  { name: "Harajuku", city: "Tokyo", day: "Jour 11", detail: "Rue Takeshita, culture jeune alternative et crêpes" },
  { name: "Meiji Jingu", city: "Tokyo", day: "Jour 11", detail: "Sanctuaire impérial dans la forêt sacrée de 100 000 arbres de Yoyogi" },
  { name: "Shinjuku", city: "Tokyo", day: "Jour 11", detail: "Observatoire du gouvernement métropolitain, Omoide Yokocho et néons" },

  // ── JOUR 12 : Gastronomie, Luxe et Belvédères ────────────────────
  { name: "Marché de Toyosu", city: "Tokyo", day: "Jour 12", detail: "Successeur de Tsukiji, marché de gros et sushis ultra-frais du matin" },
  { name: "Gare de Tokyo et Palais Impérial", city: "Tokyo", day: "Jour 12", detail: "Architecture en briques rouges de la gare et esplanade du palais" },
  { name: "Ginza", city: "Tokyo", day: "Jour 12", detail: "Architecture contemporaine et boutiques de haute couture" },
  { name: "Roppongi (Mori Tower)", city: "Tokyo", day: "Jour 12", detail: "Belvédère Tokyo City View avec panorama sur la Tour de Tokyo" },

  // ── JOUR 13 : Route Nintendo et Shopping ─────────────────────────
  { name: "Ikebukuro", city: "Tokyo", day: "Jour 13", detail: "Mega Pokémon Center Ikebukuro et Nintendo Store Tokyo" },
  { name: "Nakano Broadway", city: "Tokyo", day: "Jour 13", detail: "Mecque des objets de collection rétro, figurines vintage et mangas" },

  // ── JOUR 14 : Excursion Exclusive au Mont Fuji ───────────────────
  { name: "Pagode Chureito (Arakurayama Sengen)", city: "Yamanashi", day: "Jour 14", detail: "La vue carte postale légendaire de la pagode à 5 étages et du Fuji" },
  { name: "Village d'Oshino Hakkai", city: "Yamanashi", day: "Jour 14", detail: "Bassins cristallins alimentés par la fonte des neiges du Fuji" },
  { name: "Forêt d'Aokigahara", city: "Yamanashi", day: "Jour 14", detail: "La Mer d'Arbres millénaire sur coulée de lave volcanique" },
  { name: "Cascades de Shiraito", city: "Shizuoka", day: "Jour 14", detail: "Spectaculaire chute d'eau en fils de soie blanche" },
  { name: "Route des Lacs du Fuji", city: "Yamanashi", day: "Jour 14", detail: "Panoramas sur le mont Fuji depuis les lacs Kawaguchiko et Saiko" },
];

export const filterData = {
  hoteles: [
    { name: "Hotel Keihan Kyoto Hachijoguchi", day: "Kyoto", detail: "Base 4 nuits à Kyoto" },
    { name: "Hotel Resol Trinity Kanazawa", day: "Kanazawa", detail: "1 nuit à Kanazawa" },
    { name: "Hotel Wood Takayama", day: "Takayama", detail: "1 nuit près du centre historique" },
    { name: "Magome Chaya", day: "Magome", detail: "1 nuit · Minshuku traditionnel sur le Nakasendo" },
    { name: "KOKO HOTEL Residence Asakusa Kappabashi", day: "Tokyo", detail: "Base 6 nuits à Tokyo" },
  ],
  excursiones: [
    { name: "Nara et Todai-ji", day: "Jour 2", detail: "Grand Bouddha et parc aux daims" },
    { name: "Arashiyama et Otagi", day: "Jour 4", detail: "Forêt de bambous et 1 200 statues rakan" },
    { name: "Osaka", day: "Jour 5", detail: "Château et Dotonbori" },
    { name: "Shirakawa-go", day: "Jour 7", detail: "Village gassho-zukuri UNESCO" },
    { name: "Route du Nakasendo", day: "Jour 8", detail: "Randonnée de 8 km Magome → Tsumago" },
    { name: "Mont Fuji avec Ken", day: "Jour 14", detail: "Tour privé 8h en mini-van avec guide hispanophone" },
  ],
  transportes: [
    { name: "Aéroport de Narita", day: "Jours 1 et 15", detail: "Vols internationaux QR148 / QR807" },
    { name: "Gare de Kyoto", day: "Jours 1–5", detail: "Shinkansen Nozomi et trains régionaux" },
    { name: "Gare de Kanazawa", day: "Jours 5–7", detail: "Thunderbird / Hokuriku Shinkansen" },
    { name: "Takayama Nohi Bus Center", day: "Jours 7–8", detail: "Bus vers Shirakawa-go et Magome" },
    { name: "Gare de Nagoya", day: "Jour 9", detail: "Correspondance Shinano 4 → Tokaido Shinkansen" },
    { name: "Gare de Tokyo", day: "Jours 9–15", detail: "Shinkansen et lignes JR" },
    { name: "Gare de Mishima", day: "Jour 14", detail: "Point de rencontre tour Mont Fuji (08:20)" },
    { name: "Gare Shin-Fuji", day: "Jour 14", detail: "Fin du tour Mont Fuji et retour en train à grande vitesse" },
  ]
};

export const mapLabels = {
  ubicacionesClave: "Lieux clés",
  mapaDeLaRuta: "Carte de l'itinéraire",
  descRuta: "arrêts principaux par ordre chronologique du voyage.",
  descHoteles: "Hébergements dans l'ordre chronologique du voyage.",
  descExcursiones: "Points d'intérêt et excursions d'une journée.",
  descTransportes: "Gares et nœuds de transport dans l'ordre chronologique.",
  filterRuta: "Itinéraire complet",
  filterHoteles: "Hôtels",
  filterExcursiones: "Excursions",
  filterTransportes: "Transports",
  filterDias: "Jours",
  descDias: "choisissez un jour pour ne voir que ce que vous visitez ce jour-là.",
  todosLosDias: "Tous",
  diaLabel: "Jour",
  parada: "ARRÊT",
  no: "Nº",
  abrirGoogleMaps: "Ouvrir dans Google Maps ↗",
  verEnItinerario: "Voir dans l'itinéraire",
  verEnGoogleMaps: "Voir dans Google Maps",
  paradasOrden: "arrêts · dans l'ordre du voyage",
  ubicaciones: "emplacements",
};
