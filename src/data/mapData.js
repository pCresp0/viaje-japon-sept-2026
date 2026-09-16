export const stops = [
  // ── DÍA 1: Llegada a Japón ───────────────────────────────────────
  {
    id: "narita", name: "Aeropuerto Narita", city: "Chiba",
    lat: 35.7719, lng: 140.3929,
    emoji: "✈️", color: "#c9a227",
    day: "Días 1 y 15",
    detail: "Llegada internacional · N'EX a Tokio / Shinkansen a Kioto",
  },
  {
    id: "kyoto-station", name: "Estación de Kioto", city: "Kioto",
    lat: 34.9858, lng: 135.7587,
    emoji: "🚄", color: "#bc4749",
    day: "Días 1–5",
    detail: "Llegada en Shinkansen Nozomi · Conexión base en Kioto",
  },
  {
    id: "hotel-keihan-kyoto", name: "Hotel Keihan Kyoto Hachijoguchi", city: "Kioto",
    lat: 34.9811, lng: 135.7589,
    emoji: "🏨", color: "#bc4749",
    day: "Día 1",
    detail: "Llegada, check-in y cena cercana en AEON MALL",
  },

  // ── DÍA 2: Fushimi Inari + Nara: Gran Buda, ciervos y Pontocho ────
  {
    id: "fushimi-inari", name: "Fushimi Inari Taisha", city: "Kioto",
    lat: 34.9671, lng: 135.7727,
    emoji: "⛩️", color: "#bc4749",
    day: "Día 2",
    detail: "Santuario de los 10.000 torii rojos y senderos del monte Inari",
  },
  {
    id: "todai-ji", name: "Tōdai-ji", city: "Nara",
    lat: 34.6890, lng: 135.8398,
    emoji: "🏯", color: "#bc4749",
    day: "Día 2",
    detail: "Daibutsuden y el Gran Buda de bronce",
  },
  {
    id: "gyumabushi", name: "Gyumabushi Miyama 牛まぶし三山", city: "Nara",
    lat: 34.6836628, lng: 135.8396976,
    emoji: "🍚", color: "#bc4749",
    day: "Día 2",
    detail: "Comida — restaurante de gyumabushi, no acepta reservas",
  },
  {
    id: "nara-park", name: "Parque de Nara", city: "Nara",
    lat: 34.6851, lng: 135.8433,
    emoji: "🦌", color: "#bc4749",
    day: "Día 2",
    detail: "Ciervos sagrados y shika senbei",
  },
  {
    id: "nigatsudo", name: "Nigatsu-do", city: "Nara",
    lat: 34.6894, lng: 135.8450,
    emoji: "🏮", color: "#bc4749",
    day: "Día 2",
    detail: "OPCIONAL — subida breve para vistas panorámicas, sólo si vamos bien de tiempo",
  },
  {
    id: "pontocho-day2", name: "Pontocho y Miyagawacho", city: "Kioto",
    lat: 35.009, lng: 135.77,
    emoji: "🏮", color: "#bc4749",
    day: "Día 2",
    detail: "Paseo y cena en los callejones tradicionales junto al río Kamo",
  },

  // ── DÍA 3: Ruta Norte de Higashiyama y Geishas ────────────────────
  {
    id: "ginkaku-ji", name: "Ginkaku-ji", city: "Kioto",
    lat: 35.0272, lng: 135.7982,
    emoji: "🌿", color: "#bc4749",
    day: "Día 3",
    detail: "Pabellón de Plata y jardín zen de arena",
  },
  {
    id: "filosofia", name: "Paseo de la Filosofía", city: "Kioto",
    lat: 35.0215, lng: 135.7947,
    emoji: "🚶", color: "#bc4749",
    day: "Día 3",
    detail: "Sendero peatonal empedrado a lo largo del canal",
  },
  {
    id: "nanzen-ji", name: "Eikando y Nanzen-ji", city: "Kioto",
    lat: 35.0117, lng: 135.7936,
    emoji: "🍁", color: "#bc4749",
    day: "Día 3",
    detail: "Templos zen de Higashiyama y acueducto de ladrillo",
  },
  {
    id: "nishiki", name: "Mercado de Nishiki", city: "Kioto",
    lat: 35.005, lng: 135.7649,
    emoji: "🍢", color: "#bc4749",
    day: "Día 3",
    detail: "La despensa de Kioto y degustación gastronómica",
  },
  {
    id: "pontocho-day3", name: "Pontocho y Miyagawacho", city: "Kioto",
    lat: 35.009, lng: 135.77,
    emoji: "🏮", color: "#bc4749",
    day: "Día 3",
    detail: "Paseo al atardecer por los callejones tradicionales junto al río Kamo",
  },
  {
    id: "gion", name: "Barrio de Gion", city: "Kioto",
    lat: 35.0037, lng: 135.7772,
    emoji: "🏮", color: "#bc4749",
    day: "Día 3",
    detail: "Hanamikoji, Shirakawa y distrito histórico de geishas",
  },

  // ── DÍA 4: Kioto Noroeste y Bambú ────────────────────────────────
  {
    id: "kinkaku-ji", name: "Kinkaku-ji", city: "Kioto",
    lat: 35.0394, lng: 135.7292,
    emoji: "✨", color: "#bc4749",
    day: "Día 4",
    detail: "El Pabellón Dorado cubierto de pan de oro",
  },
  {
    id: "ryoan-ji", name: "Ryoan-ji", city: "Kioto",
    lat: 35.0345, lng: 135.7183,
    emoji: "🪨", color: "#bc4749",
    day: "Día 4",
    detail: "Jardín seco zen de 15 rocas, el más famoso de Japón",
  },
  {
    id: "ninna-ji", name: "Ninna-ji", city: "Kioto",
    lat: 35.0312, lng: 135.7183,
    emoji: "🌸", color: "#bc4749",
    day: "Día 4",
    detail: "Templo imperial, Patrimonio Mundial, con cerezos enanos",
  },
  {
    id: "otagi", name: "Otagi Nenbutsu-ji", city: "Kioto",
    lat: 35.0219, lng: 135.6633,
    emoji: "🗿", color: "#bc4749",
    day: "Día 4",
    detail: "1.200 estatuas de rakan con caras únicas, en Saga-Toriimoto",
  },
  {
    id: "saga-toriimoto", name: "Saga-Toriimoto", city: "Kioto",
    lat: 35.0195, lng: 135.6663,
    emoji: "🏘️", color: "#bc4749",
    day: "Día 4",
    detail: "Calle histórica preservada con casas de techo de paja",
  },
  {
    id: "arashiyama", name: "Arashiyama y Bosque de Bambú", city: "Kioto",
    lat: 35.0173, lng: 135.6721,
    emoji: "🎋", color: "#bc4749",
    day: "Día 4",
    detail: "Bosque de bambú, puente Togetsukyo y tranvía Randen",
  },

  // ── DÍA 5: Kioto Tradicional y Castillo de Osaka ─────────────────
  {
    id: "kiyomizu-dera", name: "Kiyomizu-dera", city: "Kioto",
    lat: 34.9949, lng: 135.785,
    emoji: "🏯", color: "#bc4749",
    day: "Día 5",
    detail: "Gran terraza de madera sobre el valle y cascada Otowa",
  },
  {
    id: "ninenzaka", name: "Ninenzaka y Sannenzaka", city: "Kioto",
    lat: 34.9976, lng: 135.7808,
    emoji: "🏮", color: "#bc4749",
    day: "Día 5",
    detail: "Paseo por famosas cuestas empedradas con casas tradicionales",
  },
  {
    id: "yasaka-chionin", name: "Yasaka, Maruyama y Chion-in", city: "Kioto",
    lat: 35.0032, lng: 135.7811,
    emoji: "⛩️", color: "#bc4749",
    day: "Día 5",
    detail: "Santuario Yasaka, parque Maruyama y gran puerta de Chion-in",
  },
  {
    id: "heian-jingu", name: "Heian Jingu", city: "Kioto",
    lat: 35.0159, lng: 135.7825,
    emoji: "⛩️", color: "#bc4749",
    day: "Día 5",
    detail: "Santuario con gran torii rojo y hermosos jardines",
  },
  {
    id: "chao-chao-gyoza", name: "Chao Chao Gyoza (Sanjo Kiyamachi)", city: "Kioto",
    lat: 35.0106, lng: 135.7712,
    emoji: "🥟", color: "#bc4749",
    day: "Día 5",
    detail: "Comida — izakaya de gyozas muy valorado, junto a la estación de Sanjo",
  },
  {
    id: "osaka-castle", name: "Castillo de Osaka", city: "Osaka",
    lat: 34.6873, lng: 135.5262,
    emoji: "🏯", color: "#bc4749",
    day: "Día 5",
    detail: "Fortaleza histórica de Toyotomi Hideyoshi y parque",
  },
  {
    id: "dotonbori", name: "Dotonbori y Namba", city: "Osaka",
    lat: 34.6687, lng: 135.5013,
    emoji: "🐙", color: "#bc4749",
    day: "Día 5",
    detail: "Neones, cartel de Glico, takoyaki y comida callejera",
  },
  {
    id: "shinsekai", name: "Shinsekai", city: "Osaka",
    lat: 34.6525, lng: 135.5063,
    emoji: "🍢", color: "#bc4749",
    day: "Día 5",
    detail: "Barrio retro con la torre Tsutenkaku y puestos de kushikatsu",
  },

  // ── DÍA 6: Kanazawa ──────────────────────────────────────────────
  {
    id: "kenroku-en", name: "Kenroku-en", city: "Ishikawa",
    lat: 36.5621, lng: 136.6626,
    emoji: "🌸", color: "#2e7d5b",
    day: "Día 6",
    detail: "Uno de los tres grandes jardines paisajísticos de Japón",
  },
  {
    id: "kanazawa-castle", name: "Castillo de Kanazawa", city: "Ishikawa",
    lat: 36.5636, lng: 136.6592,
    emoji: "🏯", color: "#2e7d5b",
    day: "Día 6",
    detail: "Cruzando el puente desde Kenroku-en — recinto y jardines de entrada gratuita",
  },
  {
    id: "nagamachi", name: "Barrio samurái de Nagamachi", city: "Ishikawa",
    lat: 36.5644, lng: 136.6486,
    emoji: "🗡️", color: "#2e7d5b",
    day: "Día 6",
    detail: "Calles de muros de tierra de la antigua residencia de samuráis",
  },
  {
    id: "omicho", name: "Mercado Omicho", city: "Ishikawa",
    lat: 36.5697, lng: 136.6558,
    emoji: "🦀", color: "#2e7d5b",
    day: "Día 6",
    detail: "El mejor marisco fresco de la costa del Mar de Japón",
  },
  {
    id: "higashi-chaya", name: "Higashi Chaya", city: "Ishikawa",
    lat: 36.5697, lng: 136.6636,
    emoji: "🍵", color: "#2e7d5b",
    day: "Día 6",
    detail: "Barrio histórico de casas de té y geiko de Kanazawa",
  },

  // ── DÍA 7: Shirakawa-go y Takayama ───────────────────────────────
  {
    id: "shirakawa", name: "Shirakawa-go", city: "Gifu",
    lat: 36.2577, lng: 136.9063,
    emoji: "🏡", color: "#2e7d5b",
    day: "Día 7",
    detail: "Aldea gassho-zukuri tradicional Patrimonio UNESCO",
  },
  {
    id: "takayama", name: "Takayama (Sanmachi Suji)", city: "Gifu",
    lat: 36.1461, lng: 137.2522,
    emoji: "🏮", color: "#2e7d5b",
    day: "Días 7–8",
    detail: "Casco histórico tradicional, destilerías de sake y Hida beef",
  },

  // ── DÍA 8: La Ruta Nakasendo ─────────────────────────────────────
  {
    id: "magome", name: "Magome", city: "Nakatsugawa",
    lat: 35.5244, lng: 137.5647,
    emoji: "⛰️", color: "#2e7d5b",
    day: "Día 8",
    detail: "Villa postal en cuesta, inicio de la caminata · Magome Chaya",
  },
  {
    id: "tsumago", name: "Tsumago", city: "Nagano",
    lat: 35.5776, lng: 137.5957,
    emoji: "🚶", color: "#2e7d5b",
    day: "Día 8",
    detail: "Final de la caminata histórica Magome → Tsumago (8 km)",
  },

  // ── DÍA 9: Tránsito a Tokio y Akihabara ──────────────────────────
  {
    id: "nakatsugawa", name: "Estación de Nakatsugawa", city: "Gifu",
    lat: 35.5002, lng: 137.5029,
    emoji: "🚆", color: "#2e7d5b",
    day: "Día 9",
    detail: "Canje crítico de billetes JR físicos antes de subir al Shinano 4",
  },
  {
    id: "nagoya", name: "Estación de Nagoya", city: "Aichi",
    lat: 35.1709, lng: 136.8815,
    emoji: "🚄", color: "#2e7d5b",
    day: "Día 9",
    detail: "Enlace en tránsito · parada de ekiben antes del Shinkansen",
  },
  {
    id: "tokyo-skytree", name: "Tokyo Skytree", city: "Tokio",
    lat: 35.7101, lng: 139.8107,
    emoji: "🗼", color: "#1d3557",
    day: "Día 9",
    detail: "Paseo por el río Sumida hasta la base de la torre y Tokyo Solamachi",
  },

  // ── DÍA 10: Excursión al Monte Fuji ──────────────────────────────
  {
    id: "tokyo-mode-gakuen", name: "Punto de encuentro (Shinjuku)", city: "Tokio",
    lat: 35.6912, lng: 139.6997,
    emoji: "🚌", color: "#1d3557",
    day: "Día 10",
    detail: "Tokyo Mode Gakuen — salida del autobús de la excursión a las 08:30",
  },
  {
    id: "kawaguchiko", name: "Lago Kawaguchiko y Parque Oishi", city: "Yamanashi",
    lat: 35.5326, lng: 138.7423,
    emoji: "🗻", color: "#1d3557",
    day: "Día 10",
    detail: "Vistas clásicas del Fuji y campos de flores junto al lago",
  },
  {
    id: "oshino-hakkai", name: "Oshino Hakkai", city: "Yamanashi",
    lat: 35.4547, lng: 138.8425,
    emoji: "💧", color: "#1d3557",
    day: "Día 10",
    detail: "Ocho estanques de agua cristalina alimentados por el deshielo del Fuji",
  },
  {
    id: "chureito-pagoda", name: "Pagoda Chureito", city: "Yamanashi",
    lat: 35.4903, lng: 138.8006,
    emoji: "⛩️", color: "#1d3557",
    day: "Día 10",
    detail: "La imagen postal más icónica de Japón: la pagoda de cinco pisos con el Fuji al fondo",
  },

  // ── DÍA 11: Shibuya, Harajuku y Shinjuku ─────────────────────────
  {
    id: "shibuya", name: "Cruce de Shibuya", city: "Tokio",
    lat: 35.6595, lng: 139.7005,
    emoji: "🚦", color: "#1d3557",
    day: "Día 11",
    detail: "El cruce peatonal más transitado, Miyashita Park y Pokémon Center",
  },
  {
    id: "harajuku", name: "Harajuku", city: "Tokio",
    lat: 35.6702, lng: 139.7027,
    emoji: "👗", color: "#1d3557",
    day: "Día 11",
    detail: "Calle Takeshita, moda juvenil alternativa y crepes",
  },
  {
    id: "meiji-jingu", name: "Meiji Jingu", city: "Tokio",
    lat: 35.6764, lng: 139.6993,
    emoji: "🌲", color: "#1d3557",
    day: "Día 11",
    detail: "Santuario imperial en el frondoso bosque del parque Yoyogi",
  },
  {
    id: "shinjuku", name: "Shinjuku", city: "Tokio",
    lat: 35.6892, lng: 139.6917,
    emoji: "🌃", color: "#1d3557",
    day: "Día 11",
    detail: "Mirador del Gobierno Metropolitano, Omoide Yokocho y Kabukicho",
  },

  // ── DÍA 12: Toyosu, Ueno y Odaiba ─────────────────────────────────
  {
    id: "toyosu", name: "Mercado de Toyosu", city: "Tokio",
    lat: 35.6433, lng: 139.7817,
    emoji: "🍣", color: "#1d3557",
    day: "Día 12",
    detail: "Sucesor de Tsukiji, lonja mayorista y desayuno de sushi fresco",
  },
  {
    id: "ueno", name: "Ueno y Ameyoko", city: "Tokio",
    lat: 35.7141, lng: 139.7744,
    emoji: "🌳", color: "#1d3557",
    day: "Día 12",
    detail: "Parque de Ueno y mercadillo callejero de Ameyoko",
  },
  {
    id: "odaiba", name: "Odaiba y Bahía de Tokio", city: "Tokio",
    lat: 35.6295, lng: 139.7794,
    emoji: "🌉", color: "#1d3557",
    day: "Día 12",
    detail: "Tren Yurikamome, DiverCity y atardecer en la bahía",
  },

  // ── DÍA 14: Ruta Nintendo, Compras y Skytree ──────────────────────
  {
    id: "ikebukuro", name: "Ikebukuro", city: "Tokio",
    lat: 35.7295, lng: 139.7189,
    emoji: "🕹️", color: "#1d3557",
    day: "Día 14",
    detail: "Mega Pokémon Center Ikebukuro y Nintendo Store Tokyo",
  },
  {
    id: "nakano", name: "Nakano Broadway", city: "Tokio",
    lat: 35.7078, lng: 139.6656,
    emoji: "🧸", color: "#1d3557",
    day: "Día 14",
    detail: "Meca del coleccionismo retro, figuras vintage y manga",
  },
  {
    id: "akihabara", name: "Akihabara", city: "Tokio",
    lat: 35.6984, lng: 139.7731,
    emoji: "🎮", color: "#1d3557",
    day: "Día 14",
    detail: "Electric Town: Mandarake, Super Potato y arcades japoneses",
  },
  {
    id: "tokyo-skytree-sunset", name: "Tokyo Skytree (atardecer)", city: "Tokio",
    lat: 35.7101, lng: 139.8107,
    emoji: "🌇", color: "#1d3557",
    day: "Día 14",
    detail: "Subida con entradas para ver la puesta de sol -- cierre del viaje por Tokio",
  },

  // ── DÍA 13: Excursión a Nikko ────────────────────────────────────
  {
    id: "tobu-nikko-sta", name: "Estación de Tobu-Nikko", city: "Tochigi",
    lat: 36.7573, lng: 139.6122,
    emoji: "🚅", color: "#1d3557",
    day: "Día 13",
    detail: "Llegada en tren directo desde Tobu-Asakusa (aprox. 2h)",
  },
  {
    id: "shinkyo-bridge", name: "Puente Shinkyo", city: "Tochigi",
    lat: 36.7567, lng: 139.5989,
    emoji: "🌉", color: "#1d3557",
    day: "Día 13",
    detail: "El puente rojo icónico sobre el río Daiya, símbolo de Nikko",
  },
  {
    id: "toshogu", name: "Santuario Toshogu", city: "Tochigi",
    lat: 36.7581, lng: 139.5992,
    emoji: "⛩️", color: "#1d3557",
    day: "Día 13",
    detail: "Mausoleo de Tokugawa Ieyasu, Patrimonio de la Humanidad UNESCO",
  },
  {
    id: "lake-chuzenji", name: "Lago Chuzenji", city: "Tochigi",
    lat: 36.7275, lng: 139.4767,
    emoji: "🏞️", color: "#1d3557",
    day: "Día 13",
    detail: "Lago a los pies del monte Nantai, tras la carretera Irohazaka",
  },
  {
    id: "kegon-falls", name: "Cataratas Kegon", city: "Tochigi",
    lat: 36.7386, lng: 139.4989,
    emoji: "🌊", color: "#1d3557",
    day: "Día 13",
    detail: "Cascada de 97 m de caída, una de las más famosas de Japón",
  },
  
  // ── DÍA 15: Vuelta a casa ────────────────────────────────────────
  {
    id: "senso-ji", name: "Asakusa y Senso-ji", city: "Tokio",
    lat: 35.7148, lng: 139.7967,
    emoji: "🗼", color: "#1d3557",
    day: "Día 15",
    detail: "Última mañana: puerta Kaminarimon, calle Nakamise y Kappabashi Dori",
  },
  {
    id: "keisei-ueno", name: "Estación Keisei-Ueno", city: "Tokio",
    lat: 35.7112, lng: 139.7735,
    emoji: "🚆", color: "#1d3557",
    day: "Día 15",
    detail: "Salida del Keisei Skyliner directo hacia Narita (con maletas)",
  },

];

export const filterData = {
  ruta: stops,
  hoteles: [
    { id: "h-kioto", name: "Hotel Keihan Kyoto Hachijoguchi", day: "Kioto", lat: 34.9811, lng: 135.7589, emoji: "🏨", color: "#BC4749", detail: "Base 4 noches en Kioto" },
    { id: "h-kanazawa", name: "Hotel Resol Trinity Kanazawa", day: "Kanazawa", lat: 36.5713, lng: 136.6542, emoji: "🏨", color: "#2E7D5B", detail: "1 noche en Kanazawa" },
    { id: "h-takayama", name: "Hotel Wood Takayama", day: "Takayama", lat: 36.1421, lng: 137.2582, emoji: "🏨", color: "#2E7D5B", detail: "1 noche junto al casco histórico" },
    { id: "h-magome", name: "Magome Chaya", day: "Magome", lat: 35.5244, lng: 137.5647, emoji: "🏨", color: "#2E7D5B", detail: "1 noche · Minshuku tradicional en la Ruta Nakasendo" },
    { id: "h-tokio", name: "KOKO HOTEL Residence Asakusa Kappabashi", day: "Tokio", lat: 35.7178, lng: 139.7917, emoji: "🏨", color: "#1D3557", detail: "Base 6 noches en Tokio" },
  ],
  excursiones: [
    { id: "e-nara", name: "Nara y Todai-ji", day: "Día 2", lat: 34.6890, lng: 135.8398, emoji: "🦌", color: "#bc4749", detail: "Gran Buda y parque de los ciervos" },
    { id: "e-arashiyama", name: "Arashiyama y Otagi", day: "Día 4", lat: 35.0173, lng: 135.6721, emoji: "🎋", color: "#bc4749", detail: "Bosque de bambú y 1.200 rakans" },
    { id: "e-osaka", name: "Osaka", day: "Día 5", lat: 34.6873, lng: 135.5262, emoji: "🏯", color: "#bc4749", detail: "Castillo y Dotonbori" },
    { id: "e-shirakawa", name: "Shirakawa-go", day: "Día 7", lat: 36.2577, lng: 136.9063, emoji: "🏡", color: "#2e7d5b", detail: "Aldea gassho-zukuri tradicional" },
    { id: "e-tsumago", name: "Ruta Nakasendo", day: "Día 8", lat: 35.5776, lng: 137.5957, emoji: "🚶", color: "#2e7d5b", detail: "Caminata de 8 km Magome → Tsumago" },
    { id: "e-fuji", name: "Monte Fuji", day: "Día 10", lat: 35.4903, lng: 138.8006, emoji: "🗻", color: "#1d3557", detail: "Kawaguchiko, Parque Oishi, Oshino Hakkai y Pagoda Chureito" },
    { id: "e-nikko", name: "Nikko", day: "Día 13", lat: 36.7573, lng: 139.6122, emoji: "⛩️", color: "#1d3557", detail: "Santuario Toshogu, Puente Shinkyo y cataratas Kegon" },
  ],
  transportes: [
    { id: "t-narita", name: "Aeropuerto Narita", day: "Días 1 y 15", lat: 35.7719, lng: 140.3929, emoji: "✈️", color: "#c9a227", detail: "Vuelos internacionales QR808 (llegada) / QR809 (salida)" },
    { id: "t-kioto", name: "Estación de Kioto", day: "Días 1–5", lat: 34.9858, lng: 135.7587, emoji: "🚄", color: "#bc4749", detail: "Shinkansen Nozomi y trenes regionales" },
    { id: "t-kanazawa", name: "Estación de Kanazawa", day: "Días 5–7", lat: 36.5780, lng: 136.6480, emoji: "🚆", color: "#2e7d5b", detail: "Thunderbird / Hokuriku Shinkansen" },
    { id: "t-takayama", name: "Takayama Nohi Bus Center", day: "Días 7–8", lat: 36.1415, lng: 137.2513, emoji: "🚌", color: "#2e7d5b", detail: "Buses a Shirakawa-go y Magome" },
    { id: "t-nagoya", name: "Estación de Nagoya", day: "Día 9", lat: 35.1709, lng: 136.8815, emoji: "🚄", color: "#2e7d5b", detail: "Transbordo Shinano 4 → Tokaido Shinkansen" },
    { id: "t-tokio", name: "Estación de Tokio", day: "Días 9–15", lat: 35.6812, lng: 139.7671, emoji: "🚄", color: "#1d3557", detail: "Shinkansen y conexiones JR" },
    { id: "t-tobu-asakusa", name: "Estación de Tobu-Asakusa", day: "Día 13", lat: 35.7108, lng: 139.8006, emoji: "🚅", color: "#1d3557", detail: "Salida hacia Nikko en Tobu Limited Express" },
  ]
};

export const mapLabels = {
  ubicacionesClave: "Ubicaciones clave",
  mapaDeLaRuta: "Mapa de la ruta",
  descRuta: "paradas principales en orden cronológico del viaje.",
  descHoteles: "Alojamientos en orden cronológico del viaje.",
  descExcursiones: "Puntos de interés y excursiones de 1 día.",
  descTransportes: "Estaciones y nodos de transporte en orden cronológico.",
  filterRuta: "Ruta completa",
  filterHoteles: "Hoteles",
  filterExcursiones: "Excursiones",
  filterTransportes: "Transportes",
  filterDias: "Días",
  descDias: "elige un día para ver sólo lo que visitáis entonces.",
  todosLosDias: "Todos",
  diaLabel: "Día",
  parada: "PARADA",
  no: "Nº",
  abrirGoogleMaps: "Abrir en Google Maps ↗",
  verEnItinerario: "Ver en itinerario",
  verEnGoogleMaps: "Ver en Google Maps",
  paradasOrden: "paradas · en orden del viaje",
  ubicaciones: "ubicaciones",
};
