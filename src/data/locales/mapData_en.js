export const stops = [
  { city: "NRT Airport", day: "Day 1", detail: "Arrival · N'EX to Tokyo / Shinkansen to Kyoto" },
  { city: "Kyoto", day: "Days 1–5", detail: "Base 5 nights · Fushimi, Gion, Nishiki, Kiyomizu…" },
  { city: "Nara", day: "Day 2", detail: "Todai-ji, Great Buddha and deer park" },
  { city: "Kyoto", day: "Day 3", detail: "Bamboo forest, Saga-Toriimoto and Otagi" },
  { city: "Osaka", day: "Day 5", detail: "Castle, Dotonbori and Shinsekai" },
  { city: "Ishikawa", day: "Day 6", detail: "1 night · Kenroku-en, Omicho, Higashi Chaya" },
  { city: "Gifu", day: "Day 7", detail: "Gassho-zukuri village · Nohi Bus stop" },
  { city: "Gifu", day: "Days 7–8", detail: "1 night · Sanmachi Suji and Hida beef" },
  { city: "Nakatsugawa", day: "Day 8", detail: "1 night · Magome Chaya · start of Nakasendo" },
  { city: "Nagano", day: "Day 8", detail: "End of Magome → Tsumago hike (8 km)" },
  { city: "Tokyo", day: "Days 9–15", detail: "Base 6 nights · Senso-ji and KOKO hotel" },
  { city: "Tokyo", day: "Day 9", detail: "Electronics, figures and otaku culture" },
  { city: "Tokyo", day: "Day 10", detail: "Yurikamome, Gundam and skyline" },
  { city: "Tokyo", day: "Day 11", detail: "Crossing, Harajuku and Meiji Jingu nearby" },
  { city: "Yamanashi", day: "Day 14", detail: "Tour with Ken Kaneshima · Chureito / lakes" },
];

export const filterData = {
  hoteles: [
    { day: "Kyoto", detail: "Base 5 nights" },
    { day: "Kanazawa", detail: "1 night" },
    { day: "Takayama", detail: "1 night" },
    { day: "Magome", detail: "1 night · Minshuku" },
    { day: "Tokyo", detail: "Base 6 nights" },
  ],
  excursiones: [
    { day: "Excursion", detail: "Todai-ji and deer park" },
    { day: "Excursion", detail: "Bamboo forest" },
    { day: "Excursion", detail: "Castle and Dotonbori" },
    { day: "Stop", detail: "Gassho-zukuri village" },
    { day: "Excursion", detail: "8 km hike" },
    { day: "Excursion", detail: "Full day tour" },
  ],
  transportes: [
    { name: "Narita Airport", day: "Flights", detail: "Arrival and departure" },
    { name: "Kyoto Sta.", day: "Train", detail: "Shinkansen and N'EX" },
    { name: "Kanazawa Sta.", day: "Train", detail: "Thunderbird" },
    { name: "Nohi Bus Center", day: "Bus", detail: "Bus to Shirakawa-go" },
    { name: "Tokyo Sta.", day: "Train", detail: "Shinkansen and Yamanote" },
  ]
};

export const mapLabels = {
  ubicacionesClave: "Key locations",
  mapaDeLaRuta: "Route Map",
  descRuta: "main stops in chronological order of the trip.",
  descHoteles: "Accommodations in chronological order of the trip.",
  descExcursiones: "Points of interest and 1-day excursions.",
  descTransportes: "Stations and transport hubs in chronological order.",
  filterRuta: "Full Route",
  filterHoteles: "Hotels",
  filterExcursiones: "Excursions",
  filterTransportes: "Transport",
  parada: "STOP",
  no: "No.",
  abrirGoogleMaps: "Open in Google Maps ↗",
  paradasOrden: "stops · in trip order",
  ubicaciones: "locations",
};
