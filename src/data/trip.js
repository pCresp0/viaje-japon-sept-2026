// Datos del viaje — extraídos de la planificación y el resumen de reservas
export const tripMeta = {
  title: "Viaje Morisqueño a Japón",
  subtitle: "Septiembre 2026",
  start: "2026-09-06",
  end: "2026-09-21",
  people: 5,
  welcomeParagraphs: [
    "¡Bienvenidos al Viaje Morisqueño a Japón! Esta web es la <strong>base del viaje de los 5</strong>. Aquí están los vuelos, hoteles con PIN y confirmación, buses ya reservados, el plan día a día y lo que aún falta por cerrar.",
    "Es la <strong>guía privada del grupo</strong>: itinerario, reservas, hoteles, transporte, mapa y tips. Todo lo que necesitamos en el móvil, sin depender de chats ni PDFs sueltos.",
    "Todos los apartados de abajo son clicables para entrar al detalle de cada sección. También puedes usar el <strong>menú de la parte superior izquierda</strong> para navegar rápidamente por todos los apartados en cualquier momento. Cuando empiece el viaje (desde el 6–7 sept), la web abrirá sola en la pestaña 'Hoy', con el detalle del día que toque.",
    "Además, puedes <strong>cambiar el idioma</strong> de la aplicación en cualquier momento (Español, English, Français, Tagalog) usando el botón de la parte superior."
  ],
  about: {
    title: "Sobre la web",
    description: "Esta aplicación web ha sido construida a medida para nuestro viaje utilizando React, Vite y TailwindCSS. Su diseño prioriza la velocidad, accesibilidad offline (como PWA) y una estética moderna sin sacrificar el rendimiento. Todo el código fuente es público y se puede consultar libremente en nuestro repositorio.",
    github: "Ver código fuente en GitHub"
  }
};

export const flights = {
  booking: { ref: "40-892227078", pin: "2534" },
  price: { perPerson: "890€", total: "4.450€", people: 5 },
  out: {
    dir: "out",
    label: "Ida",
    date: "2026-09-06",
    text: "Salida Dom 6 sept desde Madrid (T4S) a las 09:05 (Qatar Airways QR148). Escala en Doha (aeropuerto de terminal única). Llegada a Narita (NRT), Terminal 2, el Lun 7 sept a las 12:55.",
    flightNumber: "QR148 + QR808",
    leg1: { number: "QR148", operator: "Qatar Airways", duration: "7h", route: "Madrid → Doha" },
    leg2: { number: "QR808", operator: "Qatar Airways", duration: "8h 50m", route: "Doha → Narita" },
    trackUrl: "https://es.flightaware.com/live/flight/QTR148",
    depart: { city: "Madrid", time: "2026-09-06T09:05", terminal: "T4S (Satélite)" },
    arrive: { city: "Narita (NRT)", time: "2026-09-07T12:55", terminal: "T2" },
    layover: {
      city: "Doha (DOH)",
      airport: "Hamad International",
      terminal: "Terminal única — todos los vuelos Qatar Airways",
      connection:
        "Aeropuerto de terminal única: no hay que cambiar de edificio ni volver a facturar. De concourse A a E se tarda unos 15 min andando; entre concourses cercanos, unos 9 min de media (90 seg en tren). La puerta de embarque cierra 20 min antes de la salida.",
    },
  },
  back: {
    dir: "back",
    label: "Vuelta",
    date: "2026-09-21",
    text: "Salida Lun 21 sept desde Narita (Terminal 2) a las 17:25 (Qatar Airways QR809). Escala en Doha. Llegada a Madrid (T4S) el Mar 22 sept a las 08:15.",
    flightNumber: "QR809 + QR6952",
    leg1: { number: "QR809", operator: "Qatar Airways", duration: "8h", route: "Narita → Doha" },
    leg2: { number: "QR6952", operator: "Qatar Airways / Iberia", duration: "7h 50m", route: "Doha → Madrid" },
    trackUrl: "https://es.flightaware.com/live/flight/QTR809",
    depart: { city: "Narita (NRT)", time: "2026-09-21T17:25", terminal: "T2" },
    arrive: { city: "Madrid", time: "2026-09-22T08:15", terminal: "T4S (Satélite)" },
    layover: {
      city: "Doha (DOH)",
      airport: "Hamad International",
      terminal: "Terminal única — todos los vuelos Qatar Airways",
      connection:
        "Mismo aeropuerto de terminal única que a la ida: sin cambio de edificio. Seguir los carteles morados de tránsito hasta la puerta de conexión; el trayecto más largo (entre extremos del aeropuerto) son unos 15 min andando.",
    },
  },
};

// Bloques del viaje (tramos con línea de "metro" temática)
export const blocks = [
  {
    id: "kioto",
    emoji: "⛩️",
    title: "Kioto, Nara y Osaka",
    color: "#BC4749", // shu-iro / rojo torii
    days: [0, 1, 2, 3, 4, 5],
    sleepSummary: "En Kioto (4 noches)",
    bestArea:
      "Cerca de la Estación de Kioto (máxima comodidad para trenes) o en Karasuma / Kawaramachi (más ambiente nocturno y restaurantes).",
  },
  {
    id: "alpes",
    emoji: "🏔️",
    title: "Alpes Japoneses y Ruta Nakasendo",
    color: "#2E7D5B", // verde bosque
    days: [6, 7, 8],
    sleepSummary: "Kanazawa → Takayama → Magome/Tsumago (1 noche cada uno)",
    bestArea:
      "Kanazawa: cerca de la estación o del mercado Omicho. Takayama: casco histórico o cerca de la estación. Magome/Tsumago: un Minshuku rural en plena ruta.",
    logisticaTip:
      "La mañana del día 6 enviáis las maletas grandes desde el hotel de Kioto directo al hotel de Tokio por unos 15€/maleta. Viajáis estos días solo con mochila.",
  },
  {
    id: "tokio",
    emoji: "🗻",
    title: "Tokio y Excursión al Fuji",
    color: "#1D3557", // azul índigo
    days: [9, 10, 11, 12, 13, 14, 15],
    sleepSummary: "En Tokio (6 noches)",
    bestArea:
      "Shinjuku o Shibuya (mucha vida nocturna y conexión directa al aeropuerto y Fuji) o Ueno/Akihabara (más barato, mejor para cultura pop).",
    fujiStrategy:
      "No pernoctaremos en el Fuji para no arriesgarnos a que amanezca nublado. Tour de día completo con guía en español: Ken Kaneshima · Excursiones Fujiyama (excursionesfujiyama.com · +81 90-5863-1635). Pendiente de reservar. Lo ideal: reservar 3–4 días consecutivos, mirar el tiempo la noche anterior y hacer el primero que amanezca despejado, cancelando el resto. Confirmar antes la política de cancelación.",
  },
];

// Alojamientos reservados (de la hoja "Resumen Planificación")
export const stays = [
  {
    id: "kioto",
    city: "Kioto",
    nights: "Del 7 al 12 sept (5 noches)",
    afterDay: 1,
    options: [
      {
        name: "Hotel Keihan Kyoto Hachijoguchi",
        total: "678,68€",
        confirmation: "6312220075",
        pin: "2281",
        url: "https://secure.booking.com/confirmation.es.html?auth_key=3fYVGxt0CFKjdTcO&source=mytrips",
        address: "Minami ward Higashi Kujo Minami Sannou cho 5-1, Kioto, Japón",
        phone: "+81 75 662 0321",
        checkIn: "7-sept-2026 · 15:00–00:00",
        checkOut: "12-sept-2026 · hasta 11:00",
        rooms: "2 habitaciones · Triple Moderate + Doble Estándar (2 camas)",
        guests: "5 adultos",
        cancel: "Cancelación gratis hasta 1 día antes",
        note: "Tasa turística por persona/noche se paga en el hotel. No incluye comidas.",
      },
    ],
  },
  {
    id: "kanazawa",
    city: "Kanazawa",
    nights: "Del 12 al 13 sept (1 noche)",
    afterDay: 6,
    options: [
      {
        name: "Hotel Resol Trinity Kanazawa",
        total: "164€",
        confirmation: "6857492125",
        pin: "4374",
        url: "https://secure.booking.com/confirmation.es.html?auth_key=KIjhSQTE4sa9Kxfu&source=mytrips",
        address: "Musashicho 1-18, Kanazawa, Ishikawa, Japón",
        phone: "+81 76 221 9269",
        checkIn: "12-sept-2026 · desde 15:00",
        checkOut: "13-sept-2026 · hasta 11:00",
        rooms: "2 habitaciones · Doble (2 camas + 1 supletoria) + Doble Estándar",
        guests: "5 adultos",
        cancel: "Cancelación gratis hasta 2 días antes",
        note: "No incluye comidas.",
      },
    ],
  },
  {
    id: "takayama",
    city: "Takayama",
    nights: "Del 13 al 14 sept (1 noche)",
    afterDay: 7,
    options: [
      {
        name: "Hotel Wood Takayama",
        total: "279€",
        confirmation: "6080544403",
        pin: "7717",
        url: "https://secure.booking.com/confirmation.es.html?auth_key=HHfRYyLH6LzNxeM1&source=mytrips",
        address: "Kamininomachi 80-2, Takayama, Gifu, Japón",
        phone: "+81 577 32 0111",
        checkIn: "13-sept-2026 · 15:00–22:00",
        checkOut: "14-sept-2026 · hasta 10:00",
        rooms: "2 habitaciones · Triple Superior + Doble Estándar (2 camas)",
        guests: "5 adultos",
        cancel: "Cancelación gratis hasta 3 días antes",
        note: "Check-out temprano (10:00). No incluye comidas.",
      },
    ],
  },
  {
    id: "magome",
    city: "Magome",
    nights: "Del 14 al 15 sept (1 noche)",
    afterDay: 8,
    options: [
      {
        name: "Magome Chaya",
        total: "178,98€",
        url: "https://www.booking.com/hotel/jp/magome-chaya.es.html",
        rooms: "Minshuku · con cena y desayuno",
        note: "Cena casera a hora fija (~18:30). Confirmar antes del viaje.",
      },
    ],
  },
  {
    id: "tokio",
    city: "Tokio",
    nights: "Del 15 al 21 sept (6 noches)",
    afterDay: 9,
    options: [
      {
        name: "KOKO HOTEL Residence Asakusa Kappabashi",
        total: "1.952,50€",
        confirmation: "5660174287",
        pin: "3322",
        url: "https://secure.booking.com/app_link/myreservations.es.html?stid=325542&bn=5660174287&aid=332731",
        rooms: "Residencia / apartamento · 6 noches",
        guests: "5 adultos",
      },
    ],
  },
];

// Detalle día a día (de la Planificación docx)
export const days = [
  {
    num: 0,
    date: "2026-09-06",
    weekday: "Domingo",
    block: "kioto",
    title: "Día de viaje",
    cities: "Madrid → Doha → Narita",
    summary:
      "Salida temprana desde Madrid en vuelo directo con Qatar Airways. Largo viaje transatlántico con escala en Doha. Llegaremos a Narita el lunes por la tarde, local.",
    history:
      "Qatar Airways es la aerolínea nacional de Catar y una de las más valoradas del mundo. Doha es el hub central de la compañía en Oriente Medio, punto de conexión entre Europa y Asia.",
    schedule: [
      { time: "09:05", text: "Salida desde el Aeropuerto Adolfo Suárez Madrid-Barajas en vuelo QR148 (Qatar Airways)." },
      { time: "13:35+", text: "Llegada a Doha (Aeropuerto Internacional de Hamad, HIA). Escala técnica, cambio de avión. Tiempo en escala: aprox. 2 horas." },
      { time: "15:35+", text: "Salida desde Doha hacia Narita (NRT) en el vuelo QR808 (Qatar Airways)." },
      { time: "12:55 (+1 día)", text: "Llegada a Narita (lunes 7 sept). Aduanas y recogida de equipajes. Luego: traslado en Narita Express + Shinkansen a Kioto." },
    ],
    money: "Vuelo incluido en el presupuesto de grupo",
  },
  {
    num: 1,
    date: "2026-09-07",
    weekday: "Lunes",
    block: "kioto",
    title: "Llegada a Japón",
    cities: "Narita, Tokio, Kioto",
    summary:
      "Aterrizaje en el aeropuerto de Narita, trámites de aduana y recogida de equipajes. Traslado directo en tren hasta Kioto para hacer el check-in en el hotel. Terminaremos la jornada con una primera toma de contacto con la ciudad, cenando algo rápido por los alrededores de la estación.",
    history:
      "Kioto fue la capital imperial de Japón durante más de mil años, desde 794 hasta 1868. Es el corazón cultural y espiritual del país. Al haber sobrevivido casi intacta a los bombardeos de la Segunda Guerra Mundial, conserva gran parte de su milenaria arquitectura tradicional de madera.",
    schedule: [
      { time: "12:55", text: "Aterrizaje en Narita y trámites de aduana (aprox. 1h 30m)." },
      { time: "15:00", text: "Salida del aeropuerto en el Narita Express (N'EX), unos 19€, 1h exacta hasta la Estación de Tokio." },
      { time: "16:30", text: "En la Estación de Tokio, transbordo al Shinkansen Hikari (tren bala) hasta Kioto (aprox. 90€, 2h 30m). Sentaos en el lado derecho para ver el Monte Fuji si está despejado." },
      { time: "19:00", text: "Llegada a Kioto, check-in en el hotel y cena." },
    ],
    money: "Aprox. 40€ (comidas) + transportes",
  },
  {
    num: 2,
    date: "2026-09-08",
    weekday: "Martes",
    block: "kioto",
    title: "Kioto Sur y Nara",
    cities: "Kioto, Nara",
    summary:
      "Empezaremos muy temprano en el icónico Fushimi Inari para recorrer sus toriis rojos evitando multitudes. Después, tren directo hacia Nara para ver a sus famosos ciervos y el imponente Gran Buda. La jornada acaba de vuelta en Kioto con un paseo al atardecer por los callejones tradicionales de geishas.",
    history:
      "Fushimi Inari está dedicado a Inari, la deidad sintoísta del arroz, elemento fundamental para la antigua economía japonesa. Nara fue la primera capital permanente de Japón en el siglo VIII y es la cuna del budismo en el país.",
    schedule: [
      { time: "07:00", text: "Despertar." },
      { time: "08:00", text: "Santuario Fushimi Inari. Línea D de JR Nara desde Estación de Kioto hasta Inari Station (aprox. 1€, 5 min)." },
      { time: "10:30", text: "Desde Inari, seguimos en la línea JR directo a Nara (45 min)." },
      { time: "11:30", text: "Visita al Gran Buda (Todai-ji) y parque de los ciervos. Comida en Nara." },
      { time: "16:00", text: "Tren de vuelta a Kioto." },
      { time: "17:00", text: "Paseo al atardecer por Pontocho y el barrio de geishas de Miyagawacho." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 3,
    date: "2026-09-09",
    weekday: "Miércoles",
    block: "kioto",
    title: "Kioto Noroeste y Bambú",
    cities: "Kioto (Arashiyama)",
    summary:
      "Exploraremos el noroeste empezando por el brillante Pabellón Dorado y el sendero Kinukake no Michi. Al mediodía, un tranvía nos lleva a Arashiyama, priorizando la zona histórica superior antes de bajar por el famoso bosque de bambú.",
    history:
      "El Kinkakuji (Pabellón Dorado) fue la suntuosa villa de retiro del shogun Ashikaga Yoshimitsu a finales del siglo XIV. Arashiyama lleva siendo destino vacacional de la nobleza imperial desde el periodo Heian.",
    schedule: [
      { time: "07:30", text: "Despertar." },
      { time: "08:30", text: "Kinkakuji: línea verde de metro (Karasuma Line) hasta Kitaoji Station y luego bus 205." },
      { time: "10:30", text: "Sendero Kinukake no Michi: templos Kinkakuji, Ryoan-ji y Ninna-ji, en ese orden." },
      { time: "12:30", text: "Desde Ninna-ji, tranvía Randen hasta Arashiyama (20 min). Comida rápida." },
      { time: "13:30", text: "Subida andando al distrito histórico de Saga-Toriimoto y templo Otagi (cierra a las 16h, subir primero)." },
      { time: "15:30", text: "Bajada cruzando el bosque de bambú hacia el centro del barrio." },
      { time: "17:00", text: "Regreso a Kioto en tren JR, Línea San-In (2€, 15 min directo)." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 4,
    date: "2026-09-10",
    weekday: "Jueves",
    block: "kioto",
    title: "Ruta Norte de Higashiyama y Geishas",
    cities: "Kioto",
    summary:
      "Recorreremos la parte este de la ciudad, desde el Pabellón de Plata bajando a pie por el Paseo de la Filosofía a lo largo del canal. Comeremos en el Mercado de Nishiki y pasaremos la tarde descubriendo a fondo los históricos barrios de geishas.",
    history:
      "El Pabellón de Plata (Ginkakuji) representa la refinada cultura Higashiyama del periodo Muromachi, centrada en la estética wabi-sabi. Los hanamachi (barrios de geishas) florecieron durante el periodo Edo como centros de artes escénicas de alto nivel.",
    schedule: [
      { time: "08:30", text: "Llegada en bus al Templo Ginkakuji (Pabellón de Plata)." },
      { time: "10:00", text: "A pie hacia el sur por el Paseo de la Filosofía, siguiendo el canal." },
      { time: "11:00", text: "Visita a los templos Eikando y Nanzen-ji." },
      { time: "13:30", text: "Desde Nanzen-ji, caminamos a la estación de metro Keage al centro. Comida en el Mercado de Nishiki." },
      { time: "16:00", text: "Barrios de geishas: Pontocho, cruzando el río Kamogawa hasta Miyagawacho." },
      { time: "17:30", text: "Paseo por Gion: calle Hanamikoji hasta la casa de té Ichiriki, riachuelo Shirakawa y santuario Tatsumi." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 5,
    date: "2026-09-11",
    weekday: "Viernes",
    block: "kioto",
    title: "Kioto Tradicional y Castillo de Osaka",
    cities: "Kioto, Osaka",
    summary:
      "Última mañana en Kioto visitando el monumental Kiyomizu-dera y bajando por las cuestas de Higashiyama. Al mediodía, tren rápido a Osaka para su castillo histórico y la locura gastronómica de Dotonbori.",
    history:
      "Kiyomizu-dera se fundó en el año 778; su terraza se construyó sin usar un solo clavo. El Castillo de Osaka fue el epicentro militar de Toyotomi Hideyoshi, figura clave en la unificación de Japón en el siglo XVI.",
    schedule: [
      { time: "07:30", text: "Despertar." },
      { time: "08:30", text: "Templo Kiyomizu-dera (tren JR o bus directo, aprox 40 min puerta a puerta)." },
      { time: "10:30", text: "Bajada por las cuestas de Higashiyama hasta Yasaka Jinja, cruzando el Parque Maruyama hasta el Templo Chion-in." },
      { time: "12:30", text: "Caminando hasta el Canal Okazaki y el Templo Heian Jingu." },
      { time: "13:30", text: "Comida en Kioto." },
      { time: "14:30", text: "Tren rápido a Osaka (Línea JR, 30 min)." },
      { time: "15:30", text: "Jardines y Castillo de Osaka con luz de día." },
      { time: "18:00", text: "Neones y comida callejera por Dotonbori y Shinsekai." },
      { time: "21:30", text: "Tren rápido de vuelta a dormir a Kioto." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 6,
    date: "2026-09-12",
    weekday: "Sábado",
    block: "alpes",
    title: "Kanazawa",
    cities: "Kanazawa",
    summary:
      "Despacharemos el equipaje grande a Tokio y viajaremos ligeros hacia la costa del Mar de Japón. Día en Kanazawa: Kenroku-en (uno de los mejores jardines del país), marisco y antiguos barrios samuráis.",
    history:
      "Kanazawa fue el dominio del poderoso clan Maeda durante el periodo Edo, rivalizando con Kioto en riqueza y cultura. Al esquivar los bombardeos modernos, conserva su trazado urbano feudal.",
    schedule: [
      { time: "07:30", text: "Despertar y envío de maletas en recepción." },
      { time: "08:30", text: "Tren Thunderbird directo de Kioto a Kanazawa (2h)." },
      { time: "11:00", text: "Jardín Kenroku-en y barrio samurái de Nagamachi." },
      { time: "14:00", text: "Comida en el mercado Omicho (el mejor marisco de Japón)." },
      { time: "16:30", text: "Paseo por el barrio de geishas de Higashi Chaya." },
    ],
    money: "Aprox. 40€ (comidas) + 15€ envío maleta",
  },
  {
    num: 7,
    date: "2026-09-13",
    weekday: "Domingo",
    block: "alpes",
    title: "Shirakawa-go y Takayama",
    cities: "Shirakawa-go, Takayama",
    summary:
      "Autobús matutino hasta la aislada aldea tradicional de Shirakawa-go. Por la tarde, ruta hasta la pintoresca Takayama para pasear por su casco antiguo y disfrutar de una cena premium.",
    history:
      "Shirakawa-go es famosa por sus casas gassho-zukuri, con tejados de paja muy inclinados para soportar la nieve. Takayama prosperó como rica ciudad de mercaderes bajo el shogunato Tokugawa, gracias a sus carpinteros.",
    schedule: [
      { time: "07:30", text: "Despertar y desayuno rápido." },
      { time: "08:40", text: "Nohi Bus Kanazawa → Shirakawa-go (1h 15m). Reserva 12GO31991741 — 5 asientos confirmados." },
      { time: "10:00", text: "Llegada a Shirakawa-go. Paseo por la aldea de casas gassho-zukuri (tejados de paja inclinados)." },
      { time: "13:15", text: "Nohi Bus Shirakawa-go → Takayama (50 min). Reserva 12GO31992254 — 5 asientos confirmados." },
      { time: "14:15", text: "Llegada a Takayama. Casco antiguo de calles de madera (Sanmachi Suji)." },
      { time: "19:00", text: "Cena con la famosa ternera wagyu de Hida, rival de la de Kobe." },
    ],
    money: "Aprox. 40€ + cena premium wagyu",
  },
  {
    num: 8,
    date: "2026-09-14",
    weekday: "Lunes",
    block: "alpes",
    title: "La Ruta Nakasendo",
    cities: "Takayama, Magome, Tsumago",
    summary:
      "Viajaremos en un precioso tren panorámico y luego en autobús hasta Magome para iniciar una suave ruta de senderismo por un bosque milenario. Caminaremos hasta Tsumago, donde pasaremos la noche en una posada rural.",
    history:
      "La Nakasendo era una de las cinco grandes rutas feudales del periodo Edo que conectaban Kioto con Edo (Tokio). Magome y Tsumago operaban como \"estaciones de posta\" (juku) donde samuráis, daimyos y mercaderes descansaban en sus viajes a pie.",
    schedule: [
      { time: "07:00", text: "Despertar." },
      { time: "08:00", text: "Mercadillos matutinos en Takayama junto al río." },
      { time: "09:30", text: "Tren panorámico Hida Express a Nagoya (2h 30m)." },
      { time: "12:30", text: "Enlace en tren+bus local hasta Magome (1h 15m). Comida rápida." },
      { time: "14:00", text: "Ruta a pie de Magome a Tsumago por el bosque (8 km, muy fácil, aprox 2.5h). Hay envío de mochilas entre pueblos por unos 5€." },
      { time: "17:30", text: "Check-in en el Minshuku y cena casera local a las 18:30 (fija)." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 9,
    date: "2026-09-15",
    weekday: "Martes",
    block: "tokio",
    title: "Tránsito a Tokio y Akihabara",
    cities: "Akihabara (Tokio)",
    summary:
      "Abandonaremos los Alpes para viajar en tren bala hacia Tokio, donde nos reencontraremos con el equipaje grande. Tarde inmersiva en Akihabara, paraíso de tecnología, anime y cultura otaku.",
    history:
      "Edo (la antigua Tokio) se transformó de pueblo pesquero al centro político de Japón en 1603. Tras la Segunda Guerra Mundial, Akihabara resurgió como mercado de componentes de radio, evolucionando hasta ser el epicentro de la cultura pop japonesa.",
    schedule: [
      { time: "08:00", text: "Desayuno en Magome Chaya y recogida de mochilas." },
      { time: "08:50", text: "⚠️ Bus local desde Magome hasta Nakatsugawa (~25 min). Poca frecuencia en zona rural — revisar el horario la noche anterior (suele salir ~08:50 ó 09:10)." },
      { time: "09:30", text: "JR Shinano Limited Express desde Nakatsugawa hasta Nagoya (~50 min). Llegada a Nagoya ~10:30." },
      { time: "10:30", text: "30 min de margen en la estación de Nagoya — tiempo justo para orientarse y comprar un ekiben (bento de tren) para el Shinkansen." },
      { time: "11:00", text: "Shinkansen Nozomi desde Nagoya hasta la Estación de Tokio (1h 40m). Salen cada 10-15 min — sin riesgo de perderlo." },
      { time: "12:40", text: "Llegada a Estación de Tokio. Metro hasta el hotel en Asakusa (~35 min). Check-in y reencuentro con las maletas grandes." },
      { time: "15:00", text: "Tarde en Akihabara: tiendas de electrónica, coleccionismo de figuras, Mandarake, salones recreativos." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 10,
    date: "2026-09-16",
    weekday: "Miércoles",
    block: "tokio",
    title: "Asakusa, Ueno y Odaiba",
    cities: "Asakusa, Ueno, Odaiba",
    summary:
      "Templo Senso-ji en Asakusa, cruzando la puerta Kaminarimon. Paseo por el mercadillo de Ameyoko junto al parque de Ueno. Por la tarde, tren futurista sin conductor hacia Odaiba para ver el atardecer sobre la bahía.",
    history:
      "El templo Senso-ji, el más antiguo de Tokio, fue fundado en el año 628. Odaiba nació en el siglo XIX como islas-fortaleza para defender Tokio de los barcos occidentales.",
    schedule: [
      { time: "09:00", text: "Templo Senso-ji en Asakusa, cruzando la icónica puerta Kaminarimon." },
      { time: "11:30", text: "Parque de Ueno y mercadillo de Ameyoko, ideal para compras baratas de té y dulces." },
      { time: "14:30", text: "Tren Yurikamome hacia Odaiba cruzando el Rainbow Bridge (sentaos en el primer vagón)." },
      { time: "15:30", text: "Gundam a tamaño real y atardecer desde el paseo marítimo con el skyline de Tokio." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 11,
    date: "2026-09-17",
    weekday: "Jueves",
    block: "tokio",
    title: "Shibuya, Harajuku y Shinjuku",
    cities: "Shibuya, Harajuku, Shinjuku",
    summary:
      "Día intenso: cruce de Shibuya y cultura juvenil de Harajuku. Terminamos bajo los neones de Shinjuku con sus callejones gastronómicos. (Fecha con reserva flexible de GetYourGuide GYGFWV2MNZV8).",
    history:
      "Estos distritos crecieron tras el Gran Terremoto de Kanto de 1923, impulsados por la expansión del tren urbano. Shinjuku alberga hoy la estación más transitada del planeta.",
    schedule: [
      { time: "09:30", text: "Cruce de Shibuya y Miyashita Park. Parada en el Pokémon Center Shibuya." },
      { time: "13:00", text: "Paseo hacia Harajuku por la calle Takeshita, terminando en el santuario Meiji en el parque Yoyogi." },
      { time: "17:00", text: "Noche en Shinjuku: mirador gratuito del Gobierno Metropolitano, cena en Omoide Yokocho, neones de Kabukicho." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 12,
    date: "2026-09-18",
    weekday: "Viernes",
    block: "tokio",
    title: "Gastronomía, Lujo y Miradores",
    cities: "Toyosu, Ginza, Roppongi",
    summary:
      "Madrugón para el mejor sushi fresco del mundo en Toyosu, paseo por Ginza y su arquitectura elegante. La tarde culmina en Roppongi, subiendo al mirador de la torre Mori para ver atardecer sobre Tokio y la Torre iluminada. (Fecha con reserva flexible de GetYourGuide GYGZGZVLFL75).",
    history:
      "Ginza significa 'asiento de plata', sitio original de la ceca gubernamental en el periodo Edo. Tras un incendio a finales del XIX se reconstruyó con arquitectura occidental, escaparate de la modernización de Japón.",
    schedule: [
      { time: "08:30", text: "Desayuno premium de sushi en el mercado mayorista de Toyosu (sucesor de Tsukiji)." },
      { time: "11:30", text: "Estación de Tokio, explanada del Palacio Imperial y rascacielos de Shiodome." },
      { time: "14:00", text: "Paseo por la arquitectura moderna y tiendas emblemáticas de Ginza." },
      { time: "17:30", text: "Atardecer en el mirador Tokyo City View de la torre Mori (Roppongi), vistas panorámicas y Torre de Tokio." },
    ],
    money: "Aprox. 50€ (comidas y mirador Mori)",
  },
  {
    num: 13,
    date: "2026-09-19",
    weekday: "Sábado",
    block: "tokio",
    title: "Ruta Nintendo y Compras",
    cities: "Ikebukuro, Nakano",
    summary:
      "Día de coleccionismo y videojuegos: tiendas oficiales de Nintendo y Pokémon. Por la tarde, Nakano Broadway, el mejor lugar para artículos retro y frikis a precio justo. (Fecha con reserva flexible de GetYourGuide GYGMX397LBNA).",
    history:
      "La industria del videojuego japonesa, liderada por Nintendo, revitalizó la economía cultural del país en los 80. Nakano Broadway nació en los 60 como complejo residencial de lujo, hoy meca del coleccionismo underground.",
    schedule: [
      { time: "10:00", text: "Mega Pokémon Center Ikebukuro y Nintendo Store Tokyo." },
      { time: "13:30", text: "Comida por la zona de Ikebukuro." },
      { time: "16:00", text: "Tarde de compras de coleccionismo retro, manga y figuras en Nakano Broadway." },
    ],
    money: "Aprox. 40€ (comidas) + compras",
  },
  {
    num: 14,
    date: "2026-09-20",
    weekday: "Domingo",
    block: "tokio",
    title: "Excursión Exclusiva al Monte Fuji",
    cities: "Mishima, Pagoda Chureito, Oshino Hakkai, Aokigahara, Shiraito, Lagos del Fuji",
    summary:
      "Tour de día completo (8 horas) en mini-van privada con guía oficial en español (Ken Kaneshima · Excursiones Fujiyama). Grupo reducido recorriendo la Pagoda Chureito, el santuario milenario Kitaguchi Hongu, la aldea tradicional de Oshino Hakkai, el bosque de Aokigahara, las cataratas Shiraito y la ruta de los lagos. Comida típica probando el plato estrella local: Houtou.",
    history:
      "El Monte Fuji (3.776 m) es el volcán sagrado y símbolo indiscutible de Japón. Durante siglos ha sido lugar de peregrinación sintoísta (Sengen Jinja) e inspiración de artistas como Hokusai. Su cono casi perfectamente simétrico atrae a viajeros de todo el mundo.",
    schedule: [
      { time: "06:30", text: "Comprobar cámaras web en directo en mtfujitoday.com e isfujivisible.com desde el hotel en Tokio (la regla de oro matutina)." },
      { time: "07:15", text: "Tren bala Shinkansen desde Estación de Tokio hacia la Estación de Mishima (~50 min de trayecto)." },
      { time: "08:20", text: "Encuentro en la Salida Sur de la Estación de Mishima con el guía Ken Kaneshima e inicio de la ruta en mini-van privada." },
      { time: "09:30", text: "Pagoda Chureito (Arakurayama Sengen): la imagen postal más icónica de Japón con la pagoda de 5 pisos y el Monte Fuji de fondo." },
      { time: "11:00", text: "Santuario Kitaguchi Hongu Fuji Sengen Jinja: punto de partida histórico de los peregrinos, con cedros gigantes milenarios y faroles de piedra." },
      { time: "12:15", text: "Aldea Oshino Hakkai: pintoresco pueblo con estanques cristalinos alimentados por el deshielo del Fuji y casas tradicionales de paja." },
      { time: "13:30", text: "Almuerzo tradicional en restaurante local: degustación de Houtou (fideos anchos en sopa caliente de miso con verduras de montaña)." },
      { time: "14:45", text: "Bosque de Aokigahara: el 'Mar de Árboles' que creció sobre la colada de lava del año 864, con raíces retorcidas y silencio absoluto." },
      { time: "15:45", text: "Cataratas Shiraito: espectacular salto de agua filtrada por roca volcánica que cae simulando hilos de seda blanca." },
      { time: "16:30", text: "Ruta panorámica de los Lagos del Fuji (Yamanakako, Saiko y Motosuko) con vistas desde distintos ángulos." },
      { time: "17:30", text: "Llegada a la Estación de tren bala Shin-Fuji y regreso en Shinkansen a Tokio (~60 min)." },
      { time: "20:30", text: "Cena de despedida del grupo en Tokio y empaquetar maletas en el hotel." },
    ],
    money: "13.000 ¥ tour (entradas y mini-van inc.) + Shinkansen + comida Houtou",
  },
  {
    num: 15,
    date: "2026-09-21",
    weekday: "Lunes",
    block: "tokio",
    title: "Vuelta a casa",
    cities: "Tokio, Narita",
    summary:
      "Últimas horas en Japón: compras de última hora en farmacias locales o paseo de despedida cerca del hotel. Tren hacia Narita con tiempo de sobra para facturar.",
    history:
      "Tras dos intensas semanas recorriendo la historia de los shogunes, la filosofía zen y la tecnología del archipiélago, el viaje concluye. Narita es el principal puerto de entrada y salida internacional de la región de Kanto desde 1978.",
    schedule: [
      { time: "09:00", text: "Último paseo por el barrio y compras de souvenirs (Kit-Kats de sabores)." },
      { time: "13:00", text: "Narita Express (N'EX) al aeropuerto (1h exacta)." },
      { time: "14:30", text: "Facturación y controles de seguridad en Narita." },
      { time: "17:25", text: "Vuelo QR809 Narita → Doha (Qatar Airways, ~8h). Escala en Doha, luego vuelo QR6952 Doha → Madrid (Iberia). Llegada a Madrid el mar 22 sept a las 08:15." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
];

// Transportes con coste real vs coste ya cubierto por JR Pass (hoja "Transportes")
export const transports = [
  { day: 1, date: "2026-09-07", name: "Narita Express (N'EX)", from: "Aeropuerto de Narita", to: "Estación de Tokio", type: "Línea JR", real: 19, jrPass: 0 },
  { day: 1, date: "2026-09-07", name: "Shinkansen Hikari", from: "Estación de Tokio", to: "Kioto", type: "Línea JR (Tren Bala)", real: 85, jrPass: 0 },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Kioto", to: "Inari Station", type: "Línea JR Local", real: 1, jrPass: 0 },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Inari Station", to: "Nara", type: "Línea JR Local", real: 4.2, jrPass: 0 },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Nara", to: "Kioto", type: "Línea JR Local", real: 4.5, jrPass: 0 },
  { day: 3, date: "2026-09-09", name: "Metro y Bus 205", from: "Kioto", to: "Kinkakuji", type: "Operador Privado / Local", real: 3, jrPass: 3 },
  { day: 3, date: "2026-09-09", name: "Tranvía Randen", from: "Ninna-ji", to: "Arashiyama", type: "Operador Privado", real: 1.5, jrPass: 1.5 },
  { day: 3, date: "2026-09-09", name: "Tren JR Línea San-In", from: "Arashiyama", to: "Kioto", type: "Línea JR Local", real: 1.5, jrPass: 0 },
  { day: 4, date: "2026-09-10", name: "Bus y Metro", from: "Kioto", to: "Mercado Nishiki / Gion", type: "Operador Privado / Local", real: 4, jrPass: 4 },
  { day: 5, date: "2026-09-11", name: "Tren rápido JR (ida y vuelta)", from: "Kioto", to: "Osaka", type: "Línea JR Local", real: 7, jrPass: 0 },
  { day: 6, date: "2026-09-12", name: "Tren Thunderbird", from: "Kioto", to: "Kanazawa", type: "Línea JR Exprés", real: 43.5, jrPass: 0 },
  { day: 7, date: "2026-09-13", name: "Nohi Bus Kanazawa → Shirakawa-go", from: "Kanazawa Sta.", to: "Shirakawa-go Bus Terminal", type: "Operador Privado (Bus)", real: 19.12, jrPass: 19.12, note: "✓ Reservado · Booking 12GO31991741 · Salida 08:40 · 5 asientos confirmados" },
  { day: 7, date: "2026-09-13", name: "Nohi Bus Shirakawa-go → Takayama", from: "Shirakawa-go Bus Terminal", to: "Takayama Nohi Bus Center", type: "Operador Privado (Bus)", real: 20.03, jrPass: 20.03, note: "✓ Reservado · Booking 12GO31992254 · Salida 13:15 · 5 asientos confirmados" },
  { day: 8, date: "2026-09-14", name: "Tren panorámico Hida Express", from: "Takayama", to: "Nagoya", type: "Línea JR Exprés", real: 34, jrPass: 0 },
  { day: 8, date: "2026-09-14", name: "Tren JR Shinano y Bus local", from: "Nagoya", to: "Magome", type: "Mixta (JR + Bus Privado)", real: 12, jrPass: 4 },
  { day: 9, date: "2026-09-15", name: "Bus local Magome → Nakatsugawa", from: "Magome", to: "Nakatsugawa", type: "Operador Privado (Bus)", real: 3, jrPass: 3, note: "⚠️ Poca frecuencia — revisar horario la noche anterior (sale ~08:50 ó 09:10)" },
  { day: 9, date: "2026-09-15", name: "JR Shinano Limited Express", from: "Nakatsugawa", to: "Nagoya", type: "Línea JR Exprés", real: 15, jrPass: 0, note: "~50 min. Llegada a Nagoya ~10:30 con 30 min de margen para el Shinkansen" },
  { day: 9, date: "2026-09-15", name: "Shinkansen Nozomi", from: "Nagoya", to: "Tokio", type: "Línea JR (Tren Bala)", real: 50, jrPass: 0, note: "Sale cada 10-15 min — sin riesgo de perderse. Llegada a Tokio ~12:40" },
  { day: 10, date: "2026-09-16", name: "Tren elevado Yurikamome", from: "Tokio", to: "Isla de Odaiba", type: "Operador Privado", real: 2, jrPass: 2 },
  { day: "10-14", date: "16-20 sept", name: "Metro y trenes locales (5 días)", from: "Tokio", to: "Tokio (varios)", type: "Operador Privado / Local", real: 25, jrPass: 25 },
  { day: 15, date: "2026-09-21", name: "Narita Express (N'EX)", from: "Estación de Tokio", to: "Aeropuerto de Narita", type: "Línea JR (fuera de plazo JR Pass)", real: 19, jrPass: 19 },
];

export const transportTotals = { real: 373.35, jrPass: 100.65 };

// Presupuesto estimado para 5 personas
export const budget = {
  people: 5,
  note: "Calculado con precios realistas y el ¥ actual, muy barato para Europa.",
  categories: [
    {
      title: "Vuelos internacionales",
      perPerson: "890€",
      total: "4.450€ ✓",
      details: [
        "Qatar Airways Madrid ↔ Tokio (vía Doha). 5 personas × 890€.",
        "Ida: QR148 MAD→DOH + QR808 DOH→NRT (6 sept, 09:05 → 7 sept, 12:55, 20h 50m).",
        "Vuelta: QR809 NRT→DOH + QR6952 DOH→MAD (21 sept, 17:25 → 22 sept, 08:15, 21h 50m).",
        "Reserva: ref. 40-892227078 · PIN 2534.",
      ],
    },
    {
      title: "Alojamiento (14 noches)",
      perPerson: "650,63€",
      total: "3.253,16€ ✓",
      details: [
        "Hotel Keihan Kyoto Hachijoguchi (7–12 sept, 5 noches): 678,68€ grupo · 135,74€/persona.",
        "Hotel Resol Trinity Kanazawa (12–13 sept, 1 noche): 164€ grupo · 32,80€/persona.",
        "Hotel Wood Takayama (13–14 sept, 1 noche): 279€ grupo · 55,80€/persona.",
        "Magome Chaya (14–15 sept, 1 noche, con cena y desayuno): 178,98€ grupo · 35,80€/persona.",
        "KOKO HOTEL Residence Asakusa Kappabashi (15–21 sept, 6 noches): 1.952,50€ grupo · 390,50€/persona.",
      ],
    },
    {
      title: "Transporte nacional",
      perPerson: "~373€",
      total: "~1.867€",
      details: [
        "Trenes sueltos sin JR Pass (NEX, Shinkansen, ruta Alpes, Tokio): ~293€/persona.",
        "Nohi Bus Kanazawa–Shirakawa-go–Takayama (reservado): 39,15€/persona.",
        "Transporte local (tarjeta Suica): ~80€/persona.",
      ],
    },
    {
      title: "Comidas y bebidas (14 días)",
      perPerson: "~500€ – 550€",
      total: "~2.600€",
      details: [
        "Desayuno ~5€, comida casual/ramen ~10€, cena buena/sushi ~20€. Aprox. 40€/día (sin contar las 2 cenas incluidas en alojamientos: Magome Chaya y cena wagyu en Takayama).",
      ],
    },
    {
      title: "Entradas y extras",
      perPerson: "~150€",
      total: "~750€",
      details: ["Templos, museos, mirador de Roppongi, TeamLab, envío de maletas Takkyubin de Kioto a Tokio."],
    },
  ],
  totalPerPerson: "~2.560€ – 2.660€ (vuelos incluidos)",
  totalGroup: "~12.800€ – 13.300€ (5 personas)",
};
