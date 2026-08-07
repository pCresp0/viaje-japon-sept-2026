export const stops = [
  { city: "Aéroport NRT", day: "Jour 1", detail: "Arrivée · N'EX vers Tokyo / Shinkansen vers Kyoto" },
  { city: "Kyoto", day: "Jours 1–5", detail: "Base 5 nuits · Fushimi, Gion, Nishiki, Kiyomizu…" },
  { city: "Nara", day: "Jour 2", detail: "Todai-ji, Grand Bouddha et parc des cerfs" },
  { city: "Kyoto", day: "Jour 3", detail: "Forêt de bambous, Saga-Toriimoto et Otagi" },
  { city: "Osaka", day: "Jour 5", detail: "Château, Dotonbori et Shinsekai" },
  { city: "Ishikawa", day: "Jour 6", detail: "1 nuit · Kenroku-en, Omicho, Higashi Chaya" },
  { city: "Gifu", day: "Jour 7", detail: "Village gassho-zukuri · Arrêt Nohi Bus" },
  { city: "Gifu", day: "Jours 7–8", detail: "1 nuit · Sanmachi Suji et bœuf de Hida" },
  { city: "Nakatsugawa", day: "Jour 8", detail: "1 nuit · Magome Chaya · début Nakasendo" },
  { city: "Nagano", day: "Jour 8", detail: "Fin de la randonnée Magome → Tsumago (8 km)" },
  { city: "Tokyo", day: "Jours 9–15", detail: "Base 6 nuits · Senso-ji et hôtel KOKO" },
  { city: "Tokyo", day: "Jour 9", detail: "Électronique, figurines et culture otaku" },
  { city: "Tokyo", day: "Jour 10", detail: "Yurikamome, Gundam et skyline" },
  { city: "Tokyo", day: "Jour 11", detail: "Carrefour, Harajuku et Meiji Jingu à proximité" },
  { city: "Yamanashi", day: "Jour 14", detail: "Tour avec Ken Kaneshima · Chureito / lacs" },
];

export const filterData = {
  hoteles: [
    { day: "Kyoto", detail: "Base 5 nuits" },
    { day: "Kanazawa", detail: "1 nuit" },
    { day: "Takayama", detail: "1 nuit" },
    { day: "Magome", detail: "1 nuit · Minshuku" },
    { day: "Tokyo", detail: "Base 6 nuits" },
  ],
  excursiones: [
    { day: "Excursion", detail: "Todai-ji et parc des cerfs" },
    { day: "Excursion", detail: "Forêt de bambous" },
    { day: "Excursion", detail: "Château et Dotonbori" },
    { day: "Arrêt", detail: "Village gassho-zukuri" },
    { day: "Excursion", detail: "Randonnée de 8 km" },
    { day: "Excursion", detail: "Tour d'une journée complète" },
  ],
  transportes: [
    { name: "Aéroport Narita", day: "Vols", detail: "Arrivée et départ" },
    { name: "Gare Kyoto", day: "Train", detail: "Shinkansen et N'EX" },
    { name: "Gare Kanazawa", day: "Train", detail: "Thunderbird" },
    { name: "Nohi Bus Center", day: "Bus", detail: "Bus vers Shirakawa-go" },
    { name: "Gare Tokyo", day: "Train", detail: "Shinkansen et Yamanote" },
  ]
};

export const mapLabels = {
  ubicacionesClave: "Lieux clés",
  mapaDeLaRuta: "Carte de l'itinéraire",
  descRuta: "arrêts principaux par ordre chronologique du voyage.",
  descHoteles: "Nos hébergements de base pendant le voyage.",
  descExcursiones: "Points d'intérêt et excursions d'une journée.",
  descTransportes: "Gares principales et nœuds de transport.",
  filterRuta: "Itinéraire complet",
  filterHoteles: "Hôtels",
  filterExcursiones: "Excursions",
  filterTransportes: "Transports",
  parada: "ARRÊT",
  no: "Nº",
  abrirGoogleMaps: "Ouvrir dans Google Maps ↗",
  paradasOrden: "arrêts · dans l'ordre du voyage",
  ubicaciones: "emplacements",
};
