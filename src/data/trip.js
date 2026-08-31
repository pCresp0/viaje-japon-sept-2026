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
    features: [
      {
        icon: "📡",
        title: "100% Offline by Design",
        text: "Esta aplicación web ha sido diseñada con un propósito claro: <strong>no depender de internet durante el viaje</strong>. Cuando estás en Japón, la conexión puede fallar en trenes bala, zonas rurales o si hay problemas con la eSIM. Por eso, se ha optado por una arquitectura de <strong>Single Source of Truth (SSOT)</strong> en el lado del cliente, en lugar de usar una base de datos en la nube. Esperemos que a Pablo no se le acaben los tokens de la IA con tanto vibe coding."
      },
      {
        icon: "⚡",
        title: "Arquitectura PWA y Rendimiento",
        text: "Todo el itinerario, vuelos, alojamientos y traducciones viven en la propia app (<code>trip.js</code>), empaquetada como una <strong>PWA (Progressive Web App)</strong> con Vite. El navegador descarga todo en caché mediante Service Workers en la primera visita, asegurando latencia cero al navegar o cambiar de idioma."
      },
      {
        icon: "🎨",
        title: "React, Tailwind & UI Moderna",
        text: "El ecosistema de React nos permite usar componentes modulares, facilitando un diseño estricto Mobile-First estilizado con TailwindCSS v4. Además, con controles segmentados (estilo iOS) y micro-animaciones en los menús, garantizamos una experiencia totalmente premium y nativa."
      },
      {
        icon: "⚡",
        title: "Lazy Loading (Code Splitting)",
        text: "Para mantener la velocidad de carga al máximo, hemos implementado React Suspense. Al abrir la app, solo descargas el código necesario para empezar (Lazy Loading); el resto de pantallas (Mapas, Frikadas, Historia) se cargan de forma asíncrona a medida que las visitas."
      },
      {
        icon: "🔍",
        title: "Buscador Global Inteligente",
        text: "La aplicación incluye un motor de búsqueda que indexa instantáneamente todo el contenido (lugares, restaurantes, conceptos históricos, cultura pop, hoteles). Puedes saltar en un clic a cualquier parte del viaje, abriendo los paneles o menús necesarios automáticamente."
      },
      {
        icon: "👾",
        title: "Cultura Pop (Frikadas)",
        text: "Hemos añadido una integración especial entre los puntos de la ruta y franquicias japonesas como Pokémon, Studio Ghibli, Nintendo o Digimon. La app no solo te cuenta las curiosidades, sino que cruza los datos con el mapa interactivo para avisarte si estás cerca de algún punto clave."
      }
    ],
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
    leg1: { number: "QR148", operator: "Qatar Airways", duration: "7h", route: "Madrid → Doha", trackUrl: "https://es.flightaware.com/live/flight/QTR148" },
    leg2: { number: "QR808", operator: "Qatar Airways", duration: "8h 50m", route: "Doha → Narita", trackUrl: "https://es.flightaware.com/live/flight/QTR808" },
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
    leg1: { number: "QR809", operator: "Qatar Airways", duration: "8h", route: "Narita → Doha", trackUrl: "https://es.flightaware.com/live/flight/QTR809" },
    leg2: { number: "QR6952", operator: "Qatar Airways / Iberia", duration: "7h 50m", route: "Doha → Madrid", trackUrl: "https://es.flightaware.com/live/flight/IBE6952" },
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
      "No pernoctaremos en el Fuji para no arriesgarnos a que amanezca nublado. Tour de día completo con guía en español: Ken Kaneshima · Excursiones Fujiyama (excursionesfujiyama.com · +81 90-5863-1635). Pendiente de reservar. Lo ideal: reservar 3–4 días consecutivos, mirar el tiempo la noche anterior y hacer el primero que amanezca despejado, cancelando el resto. Confirmar antes la política de cancelación. Thibaut, a ver si demuestras que ese CrossFit sirve de algo.",
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
        note: "A partir de marzo de 2026, Kioto aplica una nueva tasa turística. Para alojamientos de menos de ¥6.000 (~33€) por persona/noche, el impuesto está EXENTO. Si supera los ¥6.000 (~33€), será de ¥400 (~2€) por persona/noche. A pagar en el hotel. No incluye comidas.",
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
        rooms: "Minshuku · con cena (sin desayuno)",
        note: "Cena casera a hora fija (~18:00). Confirmar antes del viaje. NO incluye desayuno: comprar la noche anterior en un konbini.",
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
      { time: "09:05", text: "Salida desde el Aeropuerto Adolfo Suárez Madrid-Barajas en vuelo QR148 (Qatar Airways). Seguimiento en vivo: https://es.flightaware.com/live/flight/QTR148" },
      { time: "13:35+", text: "Llegada a Doha (Aeropuerto Internacional de Hamad, HIA). Escala técnica, cambio de avión. Tiempo en escala: aprox. 2 horas." },
      { time: "15:35+", text: "Salida desde Doha hacia Narita (NRT) en el vuelo QR808 (Qatar Airways). Seguimiento en vivo: https://es.flightaware.com/live/flight/QTR808" },
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
      "Aterrizaje en el aeropuerto de Narita, trámites de aduana con el código QR de Visit Japan Web y recogida de equipajes. Traslado en tren Narita Express hasta Shinagawa y conexión en tren bala Shinkansen Nozomi directo hasta Kioto para hacer el check-in en el hotel. Terminaremos la jornada con una primera toma de contacto con la ciudad, cenando algo rápido por los alrededores de la estación. Seguro que Randy ya está comparando la recepción con su hotel en Sol.",
    history:
      "Kioto fue la capital imperial de Japón durante más de mil años, desde 794 hasta 1868. Es el corazón cultural y espiritual del país. Al haber sobrevivido casi intacta a los bombardeos de la Segunda Guerra Mundial, conserva gran parte de su milenaria arquitectura tradicional de madera.",
    schedule: [
      { time: "📱 CONEXIÓN eSIM (HOLAFLY)", text: "**Logística Digital al aterrizar:**\n\nPablo, Sergio, Juan Carlos y Randy ya tienen la eSIM de Holafly comprada. Se instala antes de viajar y se activa automáticamente al aterrizar en Japón. (Thibaut lo gestiona por su cuenta).\n\nEs recomendable activarla nada más aterrizar para tener internet mientras se pasan los controles y facilitar el uso de Visit Japan Web." },
      { time: "🍜 COMER EN JAPÓN", text: "**Consejos prácticos:**\n\n**Desayuno habitual:** aproximadamente 07:00–09:00.\n**Comida:** aproximadamente 11:30–14:00.\n**Cena:** aproximadamente 17:30–21:00.\n\nMuchos restaurantes pequeños cierran entre comida y cena.\n\nEn días con salida muy temprana, comprar desayuno la noche anterior en un konbini. En excursiones con horarios ajustados, llevar un onigiri/sandwich de emergencia. Los konbini (7-Eleven, Lawson, FamilyMart) son una opción práctica y barata para onigiri, sandwiches, bentos, fruta, yogur, karaage y bebidas. Además, los konbini abren 24 horas los 7 días de la semana, así que nunca cierran y puedes ir a comprar el desayuno a la hora que quieras sin miedo.\n\nUna comida sencilla de ramen/udon/donburi puede costar aproximadamente **¥500–1.500 (~3–9€)**.\n\nNo reservar normalmente para ramen, udon, donburi, comida rápida japonesa, izakaya informal o puestos de comida. Reservar solo restaurantes especiales/populares cuando realmente queramos cenar allí.\n\nEn mercados y zonas de comida callejera, respetar las normas locales sobre dónde comer. En Japón no es habitual comer caminando por calles comerciales; en Nishiki Market está expresamente desaconsejado." },
      { time: "12:55", text: "🛬 Aterrizaje en Narita (NRT).\n\nHay que realizar inmigración, recogida de equipaje facturado, aduanas, y salida a la zona pública del aeropuerto.\nRecuerda tener preparado el código QR de Visit Japan Web de los 5 viajeros para agilizar los trámites.\n\n💡 Consejo: El tiempo real de salida del aeropuerto puede variar bastante según inmigración, equipaje y aduanas. Por eso NO tenemos comprado de antemano el Narita Express." },
      { time: "~14:45", text: "🚂 NARITA EXPRESS (N'EX) — ⏳ PENDIENTE / COMPRAR EN NARITA\n\n🎫 **SUICA:** ❌ NO para pagar (requiere billete exprés)\n📅 **RESERVA:** 🔴 NECESARIA\n🛒 **COMPRA:** COMPRAR ALLÍ. En máquinas o taquillas JR en el propio aeropuerto de Narita. NO comprar por adelantado.\n\nTrayecto: Narita Airport → Shinagawa\n(El horario de las ~14:45 es solo un objetivo orientativo).\n\nAl salir de aduanas, seguir las indicaciones de JR / Narita Express. Comprar el billete en las máquinas de JR o en una oficina/taquilla JR del aeropuerto.\n\n⚠️ **IMPORTANTE:**\n- NO es metro. Es un tren JR de larga distancia.\n- Se toma en la estación JR del aeropuerto.\n- El billete NO está comprado todavía.\n- NO queremos fijar obligatoriamente un tren concreto antes de volar porque el vuelo puede retrasarse.\n- Lo compraremos EN EL PROPIO AEROPUERTO DE NARITA cuando tengamos una estimación realista de tiempo.\n- Para este trayecto se necesita billete de N'EX. No utilizar Smart EX.\n- Somos 5 personas: comprar los 5 billetes juntos y pedir asientos juntos si es posible.\n\nNota: Si el vuelo se retrasa, NO perdemos ningún billete de N'EX porque todavía no lo hemos comprado. Simplemente compraremos el siguiente N'EX que nos permita llegar a tiempo a Shinagawa." },
      { time: "17:19", text: "🚄 **SHINKANSEN NOZOMI 53 (SHINAGAWA → KYOTO)**\n\nTren bala directo hacia Kyoto Station (17:19 → 19:23 · 2h 04min). Billetes comprados y asientos asignados en Smart EX para los 5 viajeros. Despliega la tarjeta inferior para consultar asientos y billetes QR individuales." },
      { time: "🧳 EQUIPAJE", text: "Viajamos con maletas grandes de facturación, pero no especialmente gigantes. La reserva de equipaje oversized solo es necesaria si una pieza supera los 160 cm sumando alto + ancho + fondo. (Ejemplo: 75 + 50 + 30 = 155 cm → no oversized). No hace falta reservar espacio oversized para una maleta normal que no supere los 160 cm." },
      { time: "19:23", text: "🚅 Llegada a Kioto (JR Kyoto Station). Salimos por la salida Hachijo East Exit (八条東口). Desde ahí son solo 5 minutos andando hasta nuestro hotel." },
      { time: "19:30–20:15", text: "🏨 **CHECK-IN: HOTEL KEIHAN KYOTO HACHIJOGUCHI** (https://www.google.com/maps/search/?api=1&query=Hotel+Keihan+Kyoto+Hachijoguchi)\n\nLlegada al hotel, trámite de check-in para las habitaciones del grupo, dejar el equipaje, refrescarse y acomodarse tranquilamente tras el vuelo internacional y los trenes del día." },
      { time: "20:15–21:30", text: "🍣 **CENA: KAITEN-SUSHI UOGASHI**\n\nRestaurante recomendado en **AEON MALL KYOTO** — Sakura Building, 4F (https://maps.app.goo.gl/ByDBQB6zaVZ3dj2E6). A unos 5–7 min andando desde el hotel y la estación.\n\n**Kaiten-zushi** (sushi en cinta transportadora). Precio orientativo: **¥2.000–3.000/persona (~12–19€)**.\n\nHorario: 11:00–22:00 (último pedido aprox 21:30). No es necesario reservar.\n\n**Qué probar:** sushi variado; piezas de pescado fresco; nigiri; platos especiales del día; algún acompañamiento caliente." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: HOTEL KEIHAN KYOTO HACHIJOGUCHI** (https://www.google.com/maps/search/?api=1&query=Hotel+Keihan+Kyoto+Hachijoguchi)\n\nVuelta al hotel tras la cena para descansar (1ª noche en Kioto en Hotel Keihan Kyoto Hachijoguchi)." },
      { time: "~22:00", text: "🍙 **COMPRA DE DESAYUNO EN KONBINI (CERCA DEL HOTEL)**\n\nAntes de dormir, comprar en un konbini cercano (7-Eleven / Lawson / FamilyMart) el desayuno del Día 2 (madrugón a Fushimi Inari). Abren 24 h: se puede ir a las 22:00 o más tarde sin problema." },
      { time: "📊 RESUMEN: QUÉ ESTÁ COMPRADO / QUÉ FALTA", text: "✅ COMPRADO\n- Shinkansen NOZOMI 53 Shinagawa → Kyoto (17:19 → 19:23)\n- 5 personas\n- Coche 13, Asientos 13C, 13D, 13E, 14D, 14E\n- Smart EX (Reserva 2000)\n\n⏳ PENDIENTE\n- Narita Express (N'EX) Narita → Shinagawa\n- Comprar en Narita después de aterrizar\n- Elegir el siguiente tren adecuado según la hora real de salida del aeropuerto.\n\nNO compres el N'EX con una hora fija con demasiada antelación: el vuelo puede retrasarse." }
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
      { time: "07:00", text: "Despertar. 🍙 Desayuno para llevar comprado la noche anterior. Comer antes de llegar al santuario o durante el trayecto." },
      { time: "07:45–08:00", text: "🚆 JR Nara Line: Kyoto Station → Inari Station (~5 min).\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nSin reserva. Utilizar Suica o comprar billete sencillo en la estación. Inari Station está justo al lado del recinto." },
      { time: "08:00–10:15", text: "Santuario Fushimi Inari. 💡 Consejo: llegar temprano es especialmente recomendable para evitar las mayores aglomeraciones. No es necesario subir hasta la cima del Monte Inari; si el tiempo o el cansancio aprietan, hacer una subida parcial y regresar. A Pablo no le costará nada subir, para algo va al gym a ponerse fuerte." },
      { time: "10:20–10:30", text: "🚆 JR Nara Line: Inari → Nara.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nTren directo hacia Nara, sin transbordo, aproximadamente 50–55 min. No requiere reserva. En Inari, comprobar que el servicio elegido para en Inari y continúa hacia Nara." },
      { time: "Transporte", text: "**🚌 Desde JR Nara Station → Tōdai-ji:**\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta por el lector del bus al subir/bajar.\n\nBus local de Nara Kotsu hasta la zona de Tōdai-ji Daibutsuden/Kasuga Taisha-mae y después unos minutos andando. \n\n**Alternativa:** taxi desde JR Nara Station si vamos justos de tiempo. También es posible ir andando, pero requiere más tiempo. No reservar por adelantado. A ver qué nos cuenta Juancar como buen historiador con doctorado, que seguro que se ha leído algún libro sobre esto." },
      { time: "11:30–12:30", text: "🏯 Visita del Daibutsuden y del Gran Buda. La visita al interior del Gran Buda es la parte principal; después podemos recorrer brevemente el recinto. No reservar entrada anticipadamente." },
      { time: "12:30–14:00", text: "🦌 Parque de Nara y ciervos. 🦌 Si compramos shika senbei para los ciervos, darles las galletas y enseñar las manos vacías cuando se terminen: algunos ciervos pueden ponerse bastante insistentes si creen que todavía tenemos comida." },
      { time: "14:00–15:00", text: "🍜 Comida en Nara." },
      { time: "15:00–15:45", text: "Paseo tranquilo por Nara. Nigatsu-do opcional si vamos bien de tiempo." },
      { time: "15:45–16:15", text: "🚆 JR Nara → Kyoto.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nCoger el siguiente servicio conveniente hacia Kyoto. No requiere reserva. Utilizar Suica o comprar billete sencillo. Si hay un Miyakoji Rapid conveniente, puede utilizarse para reducir el tiempo de viaje." },
      { time: "18:30–21:30", text: "🍜 **CENA EN PONTOCHO / GION**\n\nFranja perfecta para cenar en los callejones tradicionales junto al río Kamo. Opciones recomendadas: gyukatsu, yakitori, ramen, izakaya u okonomiyaki (ej. GYUKATSU Kyoto Katsugyu Pontocho Honten, abierto hasta las 22:30, aprox. ¥2.000–6.000 (~12–37€))." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: HOTEL KEIHAN KYOTO HACHIJOGUCHI** (https://www.google.com/maps/search/?api=1&query=Hotel+Keihan+Kyoto+Hachijoguchi)\n\nRegreso desde Gion/Pontocho a nuestro hotel en Kioto para descansar (2ª noche aquí).\n\n**Cómo volver:**\n- 🚇 Metro/Bus: Bus urbano o metro desde Shijo/Gion hasta Kyoto Station (~10–15 min, 🎫 **SUICA:** ✅ SÍ).\n- 🚶 A pie: Aprox. 25–30 min andando cruzando el río Kamo." },
      { time: "🎫 RESERVAS", text: "No es necesario reservar por adelantado ninguno de los trenes ni transportes de este día. Todos son servicios regionales/locales que se pagan sobre la marcha con Suica." }
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 3,
    date: "2026-09-09",
    weekday: "Miércoles",
    block: "kioto",
    title: "Ruta Norte de Higashiyama y Geishas",
    cities: "Kioto",
    summary:
      "Recorreremos la parte este de la ciudad, desde el Pabellón de Plata bajando a pie por el Paseo de la Filosofía a lo largo del canal. Comeremos en el Mercado de Nishiki y pasaremos la tarde descubriendo a fondo los históricos barrios de geishas.",
    history:
      "El Pabellón de Plata (Ginkakuji) representa la refinada cultura Higashiyama del periodo Muromachi, centrada en la estética wabi-sabi. Los hanamachi (barrios de geishas) florecieron durante el periodo Edo como centros de artes escénicas de alto nivel.",
    schedule: [
      { time: "07:30", text: "Despertar. 🍳 Desayuno: Se puede desayunar tranquilamente en el buffet del hotel desde las 07:00. Alternativamente, desayuno ligero de konbini/café." },
      { time: "08:00–08:30", text: "🚌 Salida hacia Ginkaku-ji. Desde el Hotel Keihan Kyoto Hachijoguchi caminar hasta Kyoto Station. Tomar el Kyoto City Bus nº 5 o nº 7 con destino hacia Ginkaku-ji y bajar en Ginkakuji-michi.\n\n🎫 **SUICA:** ✅ SÍ; pasar tarjeta por el lector del bus al subir/bajar.\n\nDuración aproximada: 35–45 min puerta a puerta, dependiendo del tráfico. Alternativa si el tráfico es malo: usar metro + bus según Google Maps/Navitime en ese momento. Pago: No reservar. Usar Suica. También se puede comprar billete sencillo." },
      { time: "08:30–10:00", text: "🩶 Ginkaku-ji (Pabellón de Plata). Horario oficial en septiembre: 08:30–17:00. Visitar: Pabellón de Plata, Jardines, Estanque, Camino elevado del jardín. No requiere reserva." },
      { time: "10:00–11:00", text: "🚶 Paseo de la Filosofía. Salir de Ginkaku-ji y recorrer andando hacia el sur siguiendo el canal. Es un tramo principalmente peatonal." },
      { time: "11:00–13:15", text: "⛩️ Eikando + Nanzen-ji. Primero Eikando y después Nanzen-ji. Eikando: Entrada aproximadamente ¥1.000 (~6€). En temporada normal abre 09:00–17:00. No requiere reserva. Llevar una bolsa para los zapatos. Nanzen-ji: En septiembre abre 08:40–17:00. No requiere reserva. Si se quiere entrar en el Hojo Garden o subir a la Sanmon, pagar entrada allí. \n\n⚠️ **IMPORTANTE:**\nNanzen-ji y Eikando están muy cerca y este orden mantiene el recorrido lógico hacia el sur." },
      { time: "13:15–13:45", text: "🚇 Nanzen-ji → centro de Kyoto. Caminar aproximadamente 10 min hasta Keage Station. Tomar Kyoto Subway Tozai Line: Keage → Karasuma Oike.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nDesde Karasuma Oike:\n\n caminar hacia Nishiki Market, aproximadamente 15 min; o continuar con la combinación de metro que resulte más conveniente. No reservar. Pagar con Suica." },
      { time: "13:45–16:00", text: "🍣 Mercado de Nishiki. Comida y recorrido por el mercado. Consejo: No intentar recorrer absolutamente todos los puestos. Elegir algunos productos/comidas y comer delante del propio establecimiento. \n\n⚠️ **IMPORTANTE:**\nNo hacer 'tabearuki' (comer mientras se camina). El propio mercado pide evitarlo. Nishiki no tiene una hora única de cierre: cada tienda tiene su propio horario. Muchas tiendas funcionan aproximadamente entre 09:00/10:00 y 17:00/18:00. 🍣 Comer aquí principalmente picando diferentes especialidades, no necesariamente haciendo una comida formal. Qué buscar: dashimaki tamago; yuba; tofu; tsukemono; fu; matcha; pescado/marisco preparado. NO comer caminando. Comprar → apartarse → comer delante del puesto o dentro del establecimiento.\n⚠️ IMPORTANTE: Hoy es miércoles 9 de septiembre. Nishiki Market NO cierra como mercado completo, pero muchos comercios individuales descansan los miércoles. Por ello, no depender exclusivamente de Nishiki para comer. Si hay demasiados puestos cerrados, buscar comida en Shijo/Teramachi/Kawaramachi, manteniendo el mismo recorrido general." },
      { time: "16:00–17:30", text: "🏮 Pontocho → Miyagawacho. Recorrido andando. No hace falta transporte." },
      { time: "17:30–19:00", text: "🏮 Gion. Recorrido: Hanamikoji, zona de Ichiriki, Shirakawa, Tatsumi Jinja. Paseo y cena por Gion/Pontocho. Ojalá Randy nos hiciera hoy su famosa lasaña espectacular. Randy estará encantado con lo tranquilos y callados que son aquí." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: HOTEL KEIHAN KYOTO HACHIJOGUCHI** (https://www.google.com/maps/search/?api=1&query=Hotel+Keihan+Kyoto+Hachijoguchi)\n\nRegreso tras la cena en Gion/Pontocho a nuestro hotel en Kioto para descansar (3ª noche en Hotel Keihan Kyoto Hachijoguchi)." },
      { time: "🎫 RESERVAS", text: "No es necesario reservar ningún transporte. No reservar: Bus, Metro, Entradas de Ginkaku-ji, Eikando, Nanzen-ji, Nishiki Market. Todos los transportes pueden pagarse sobre la marcha con Suica." }
    ],
    money: "Aprox. 40€ (comidas)",
  },
  {
    num: 4,
    date: "2026-09-10",
    weekday: "Jueves",
    block: "kioto",
    title: "Kioto Noroeste y Bambú",
    cities: "Kioto (Arashiyama)",
    summary:
      "Exploraremos el noroeste empezando por el brillante Pabellón Dorado y el sendero Kinukake no Michi. Al mediodía, un tranvía nos lleva a Arashiyama, priorizando la zona histórica superior antes de bajar por el famoso bosque de bambú. Sergio, no te lleves bambú para tus plantas en Aluche. Seguro que Juancar ya está buscando fallos históricos en el panfleto.",
    history:
      "El Kinkakuji (Pabellón Dorado) fue la suntuosa villa de retiro del shogun Ashikaga Yoshimitsu a finales del siglo XIV. Arashiyama lleva siendo destino vacacional de la nobleza imperial desde el periodo Heian.",
    schedule: [
      { time: "07:30", text: "Despertar. 🍳 Desayuno en el hotel desde las 07:00 o desayuno ligero comprado previamente." },
      { time: "08:00–09:00", text: "🚇 Hotel → Kinkaku-ji. Desde el hotel caminar hasta Kyoto Station. Tomar Kyoto Subway Karasuma Line:\n\n Kyoto → Kitaoji. En Kitaoji: seguir las indicaciones hacia Kitaoji Bus Terminal; utilizar la zona azul; tomar bus nº 204 o 205 hacia Kinkaku-ji; bajar en Kinkakuji-michi. Desde Kinkakuji-michi:\n\n aprox. 5 min andando hasta la entrada. Esta combinación es preferible al bus 205 directo desde Kyoto Station porque evita parte del tráfico y las aglomeraciones. No reservar. Usar Suica." },
      { time: "09:00–10:15", text: "🏯 Kinkaku-ji (Pabellón Dorado). \n\n⚠️ **IMPORTANTE:**\nLa hora anterior de 08:30 era incorrecta. Kinkaku-ji abre a las 09:00. Entrada: aprox. ¥500 (~3€). No requiere reserva. Consejo: Intentar llegar justo a la apertura para disfrutar del recinto con menos gente." },
      { time: "10:15–12:15", text: "🚶 Sendero Kinukake no Michi. Recorrer en este orden: 1. Kinkaku-ji 2. Ryoan-ji 3. Ninna-ji" },
      { time: "10:15–11:00", text: "🏯 Ryoan-ji. Desde Kinkaku-ji caminar por Kinukake no Michi. Distancia aproximada:\n\n 1,5 km / 20 min. Ryoan-ji abre en septiembre 08:00–17:00. Entrada: aprox. ¥600 (~4€). No requiere reserva. Visitar especialmente: jardín de piedras; Hojo; jardín." },
      { time: "11:00–12:15", text: "🏯 Ninna-ji. Continuar andando desde Ryoan-ji hacia Ninna-ji. Distancia aproximada: 10–15 min. Ninna-ji abre en septiembre 09:00–17:00. La entrada a las zonas especiales puede tener coste adicional. No requiere reserva." },
      { time: "12:15–12:40", text: "🚋 Ninna-ji → Arashiyama. Caminar hasta Omuro-Ninnaji Station. Tomar Randen Kitano Line hacia Katabiranotsuji. En Katabiranotsuji hacer transbordo a la Randen Arashiyama Line hacia Arashiyama. Bajar en Arashiyama Station. Duración aproximada total: 20–25 min. \n\n⚠️ **IMPORTANTE:**\nRanden NO es un tren JR. No necesita Japan Rail Pass. Tarifa actual de Randen: ¥250 (~1,5€) por adulto por trayecto. Se puede pagar con Suica. Al subir NO hay que tocar la Suica. Se paga al bajar/en la estación según corresponda. No reservar." },
      { time: "12:40–13:20", text: "🍜 Comida rápida en Arashiyama. Mantener comida rápida para no comprometer la parte de Otagi.\n⚠️ No retrasar demasiado la comida. En Arashiyama muchos restaurantes tienen último pedido alrededor de las 14:00 y algunos cierran la cocina por la tarde. Qué comer: udon; soba; tempura; donburi; curry; onigiri/bento si vamos con prisa. Si vemos que vamos justos de tiempo, comprar onigiri/sandwich/bento en la zona de Arashiyama y continuar. Es preferible esto a perder tiempo esperando mesa." },
      { time: "13:20–13:50", text: "🚌 Arashiyama → Otagi Nenbutsu-ji. \n\n⚠️ **IMPORTANTE:**\nNO hacer toda la subida andando desde Arashiyama. La propia web de Otagi recomienda llegar en taxi o bus y realizar después el recorrido cuesta abajo. Opción recomendada: Kyoto Bus nº 94 hacia Kiyotaki. Subir en una parada de la zona de Arashiyama y bajar en Otagidera-mae. Duración aproximada: 20–25 min. \n\n\n**Alternativa:** Taxi desde la zona de Arashiyama. El taxi es más caro pero puede ahorrar tiempo si vamos justos. No reservar el bus." },
      { time: "13:50–14:45", text: "🏯 Otagi Nenbutsu-ji. \n\n⚠️ **IMPORTANTE:**\nAhora se visita el jueves 10 de septiembre. Horario: 09:00–16:00. Está cerrado los miércoles y sábados, por lo que el cambio de día soluciona el problema. Entrada: ¥1.000 (~6€). No requiere reserva. Visitar especialmente las aproximadamente 1.200 estatuas de rakan." },
      { time: "14:45–15:30", text: "🚶 Saga-Toriimoto. Desde Otagi comenzar el descenso andando. Recorrer la zona histórica de Saga-Toriimoto. \n\n⚠️ **IMPORTANTE:**\n\n\nEste sentido del recorrido es deliberado: Otagi → Saga-Toriimoto → bosque de bambú → centro de Arashiyama. Es el sentido recomendado por el propio templo." },
      { time: "15:30–17:00", text: "🎋 Bosque de bambú de Arashiyama. Bajar andando hacia el centro atravesando el bosque de bambú. Consejo: No esperar encontrar el bosque completamente vacío. Es una zona muy concurrida. El tramo desde Saga-Toriimoto hacia el bosque permite disfrutar de una transición progresiva desde la zona rural/histórica hasta el Arashiyama más turístico. 🍵 Snack opcional después del bosque de bambú: matcha; dango; taiyaki; helado; melon pan." },
      { time: "17:00", text: "🚆 Regreso a Kyoto. Tomar JR Sagano/San-in Line desde Saga-Arashiyama hasta Kyoto Station (~15–20 min, 🎫 **SUICA:** ✅ SÍ). Cena por Kyoto Station o Pontocho." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: HOTEL KEIHAN KYOTO HACHIJOGUCHI** (https://www.google.com/maps/search/?api=1&query=Hotel+Keihan+Kyoto+Hachijoguchi)\n\nRegreso al hotel para descansar y dejar listas las mochilas para el envío de equipaje de la mañana siguiente (4ª noche en Hotel Keihan Kyoto Hachijoguchi)." },
      { time: "🎫 RESERVAS", text: "NO reservar ningún transporte de este día. No reservar: Metro, Bus 204/205, Randen, Kyoto Bus nº 94, JR Saga-Arashiyama → Kyoto. Tampoco es necesario reservar: Kinkaku-ji, Ryoan-ji, Ninna-ji, Otagi Nenbutsu-ji. Comprar las entradas directamente en cada recinto. JAPAN RAIL PASS: No tenemos Japan Rail Pass. NO modificar el itinerario por este motivo. Los transportes de este día pueden utilizarse y pagarse individualmente. Suica: Kyoto Subway, Kyoto City Bus, Randen, Kyoto Bus, JR local." }
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
      "Última mañana en Kioto visitando el monumental Kiyomizu-dera y bajando por las cuestas de Higashiyama. Al mediodía, tren rápido a Osaka para su castillo histórico y la locura gastronómica de Dotonbori. Seguro que a Juancar y Randy les entra la nostalgia y prefieren estar cenando pasta en Roma donde se conocieron. Cuidado que Pablo se pone en modo profesor de secundaria a darnos la chapa. Juancar, ¡este castillo tiene más historia que tú y Randy en Roma!",
    history:
      "Kiyomizu-dera se fundó en el año 778; su terraza se construyó sin usar un solo clavo. El Castillo de Osaka fue el epicentro militar de Toyotomi Hideyoshi, figura clave en la unificación de Japón en el siglo XVI.",
    schedule: [
      { time: "07:30", text: "Despertar. 🍳 Desayuno en el hotel a las 07:00. Kiyomizu-dera abre muy temprano, por lo que no conviene retrasar la salida.\n\n⚠️ **RECORDATORIO IMPORTANTE DE HOY:** Durante el día de hoy (al pasar por Kyoto Station a mediodía o al volver de Osaka) debemos **recoger los billetes físicos** del tren Thunderbird a Kanazawa del día siguiente en las máquinas verdes 5489 con la tarjeta física Mastercard (**8625)." },
      { time: "08:00–08:30", text: "🚍 HOTEL → KIYOMIZU-DERA. Desde el Hotel Keihan Kyoto Hachijoguchi caminar hasta Kyoto Station. **Opción principal:**\n Kyoto City Bus 100 o 206 desde Kyoto Station. Bajar en Gojozaka. Caminar aproximadamente 10 min hasta Kiyomizu-dera. \n\n\n**Alternativa:** Utilizar el nuevo Kiyomizu-dera Line de Okoshi Bus, disponible los días laborables desde julio de 2026, si el horario del momento resulta conveniente. No reservar. Pagar con Suica o billete correspondiente. Los buses de Higashiyama pueden sufrir congestión. Salir con margen." },
      { time: "08:30–10:30", text: "🏯 KIYOMIZU-DERA. Abre a las 06:00 y el 11 de septiembre cierra a las 18:00. Visitar: Main Hall / escenario de Kiyomizu, Otowa-no-taki, Pagoda y alrededores, Calles de Kiyomizu-zaka al salir. No requiere reserva. 💡 Tip: Kiyomizu-dera a primera hora es una buena elección para evitar aglomeraciones." },
      { time: "10:30–12:30", text: "🚶 HIGASHIYAMA → YASAKA → MARUYAMA → CHION-IN. Hacer todo el recorrido andando: Kiyomizu-dera → Ninenzaka/Sannenzaka → Yasaka Jinja → Maruyama Park → Chion-in. 💡 Tip: Esta zona se disfruta mejor caminando y conviene no intentar seguir una ruta demasiado rígida por las callejuelas. No intentar hacerlo todo en Higashiyama deprisa: el atractivo está precisamente en las calles y pequeñas tiendas entre templos." },
      { time: "12:30", text: "⛩️ CHION-IN. Visitar el recinto y la Sanmon. El recinto abre desde las 06:00; las visitas/recepciones de las zonas interiores empiezan a las 09:00. Si se quiere visitar alguno de los jardines interiores, comprobar su apertura y comprar la entrada allí. No reservar." },
      { time: "12:30–13:00", text: "🚶 CHION-IN → HEIAN JINGU. Continuar andando hacia Heian Jingu." },
      { time: "13:00–13:30", text: "⛩️ HEIAN JINGU. Visitar el santuario y su gran torii. El recinto abre desde las 06:00. Si se quiere visitar el jardín (Shin-en), su horario el 11 de septiembre es aproximadamente 08:30–18:00, última entrada 17:30. No requiere reserva." },
      { time: "13:30–14:15", text: "🍜 COMIDA EN KYOTO. \n\n⚠️ **IMPORTANTE:**\nIntentar terminar aproximadamente sobre las 14:15 para conservar margen para el tren a Osaka.\n⚠️ Esta comida debe ser rápida. Tenemos el tren hacia Osaka a las 14:30. Recomendación: comer cerca del camino hacia Kyoto Station; ramen; udon/soba; curry; donburi; teishoku rápido. No reservar restaurante para esta comida. \n\n\n**Alternativa:** Comprar bento/ekiben en Kyoto Station si vamos justos." },
      { time: "14:15–14:30", text: "🚶 Traslado a Kyoto Station." },
      { time: "14:30", text: "🚆 KYOTO → OSAKA.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nTomar JR Kyoto Line desde Kyoto Station hasta Osaka Station. Preferir un Special Rapid (新快速) si hay uno conveniente. Trayecto aproximadamente 30 min. Sin reserva. No necesita JR Pass." },
      { time: "~15:00", text: "🚆 OSAKA STATION → MORINOMIYA.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nDesde Osaka Station tomar JR Osaka Loop Line hacia Morinomiya." },
      { time: "~15:15–15:30", text: "🚶 MORINOMIYA → OSAKA CASTLE. Caminar por Osaka Castle Park hasta el castillo. Calcular aproximadamente 15–20 min." },
      { time: "15:30–18:00", text: "🏯 OSAKA CASTLE. \n\n⚠️ **IMPORTANTE:**\nEl Museo del Castillo de Osaka abre 09:00–18:00, última entrada 17:30. ENTRAR AL INTERIOR DEL CASTILLO: Mantener como visita principal el museo de la torre y el mirador. Entrada: ¥1.200 (~7,5€) adulto. No es necesario reservar anticipadamente para este día. Comprar la entrada en el propio castillo. Se puede pagar con efectivo, tarjeta e Suica. 💡 Tip: En Osaka Castle, reservar aproximadamente 1,5–2 h para museo + mirador + exteriores." },
      { time: "18:00–18:30", text: "🚇 OSAKA CASTLE → DOTONBORI.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nDesde Morinomiya utilizar Osaka Metro hacia la zona de Namba/Dotonbori." },
      { time: "18:30–21:15", text: "🌃 DOTONBORI + SHINSEKAI. Paseo nocturno y comida callejera. Priorizar: Dotonbori, Glico, Ebisu Bridge, Hozenji Yokocho. Si queda tiempo y energía, continuar hacia Shinsekai. 💡 Tips: En Dotonbori no hace falta reservar para probar comida callejera; elegir puestos/restaurantes sobre la marcha. Dotonbori es especialmente interesante después de anochecer, por lo que mantener la llegada sobre las 18:30 es buena idea. 🍜 Osaka Food Crawl — qué probar: 1. Takoyaki 🐙 (Compartir una ración. Opción: Takoyaki Wanaka Dotonbori. Presupuesto aprox: ¥500–1.000 (~3–6€)). 2. Okonomiyaki (Compartir o pedir uno por persona según hambre. Opción: CHIBO Dotonbori. Presupuesto aprox: ¥2.000–3.000 por persona (~12–19€)). 3. Kushikatsu (Si llegamos a Shinsekai. Probar varias brochetas. Es una de las especialidades históricas de la zona). 4. Hozenji Yokocho (Buena alternativa para salir del tramo más turístico de Dotonbori. Buscar un izakaya pequeño o restaurante local).\n⚠️ No entrar automáticamente en el restaurante con el cartel más grande de Dotonbori. La zona principal es muy turística y algunos locales cobran más por ubicación. Entre aproximadamente 18:00 y 22:00 Dotonbori se llena mucho. Mantener juntos al grupo de 5 personas y tener un punto de encuentro claro. 💴 Presupuesto gastronómico Osaka: Para una noche de food crawl sencilla en Dotonbori/Shinsekai, calcular aproximadamente ¥2.500–4.000 por persona (~15–25€) si combinamos takoyaki + okonomiyaki/kushikatsu + bebida, aunque depende de cuánto comamos." },
      { time: "~21:15–21:30", text: "🚆 OSAKA → KYOTO.\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nRegreso a Kyoto mediante JR (Kyoto Line Special Rapid recomendado)." },
      { time: "~22:00", text: "🏨 **REGRESO AL HOTEL: HOTEL KEIHAN KYOTO HACHIJOGUCHI** (https://www.google.com/maps/search/?api=1&query=Hotel+Keihan+Kyoto+Hachijoguchi)\n\nTras el tren desde Osaka, vuelta al hotel para descansar (5ª y última noche en Kioto). Mañana: envío de maletas a Tokio y Thunderbird hacia Kanazawa.\n\n**Cómo llegar desde Kyoto Station:** ~5 min andando por la salida Hachijo East Exit (八条東口)." },
      { time: "🎟️ LOGÍSTICA", text: "⚠️ **RECOGIDA DE BILLETES JR-WEST:**\nAl regresar a Kyoto Station (o en cualquier momento libre del día), dirigirse a las máquinas expendedoras verdes (con el logo 5489) para **imprimir los billetes físicos** del tren del día siguiente hacia Kanazawa. OBLIGATORIO llevar:\n- La tarjeta de crédito **física** (Mastercard **8625).\n- El localizador de la reserva (47932).\n- El Identification Number (PIN de 4 dígitos)." },
      { time: "🎫 RESERVAS DEL DÍA", text: "NO reservar ningún transporte.\nNO utilizar SmartEX.\nNO utilizar JR-WEST Online.\nNo necesitamos Japan Rail Pass.\nTodos los trayectos pueden pagarse individualmente con Suica.\nRESUMEN DE TRANSPORTE: Hotel → Kiyomizu: Bus 100/206 o Kiyomizu-dera Line → Suica/billete.\nKiyomizu → Yasaka → Maruyama → Chion-in → Heian: A pie.\nHeian → Kyoto Station: A pie + transporte urbano si fuera necesario.\nKyoto → Osaka: JR Kyoto Line Special Rapid → Suica/billete.\nOsaka → Morinomiya: JR Osaka Loop Line → Suica/billete.\nMorinomiya → Osaka Castle: A pie.\nOsaka Castle → Dotonbori: Osaka Metro → Suica.\nDotonbori → Kyoto: JR/metro según ubicación → Suica/billete." },
      { time: "🍙 KIT DE COMIDA", text: "Antes de un día con salida muy temprana, comprar la noche anterior: 1–2 onigiri; sandwich de huevo; fruta/banana; bebida; café si queremos. Los konbini japoneses son una solución totalmente normal para desayunos y comidas rápidas." },
      { time: "🍵 COSTUMBRES GASTRONÓMICAS", text: "No comer caminando en Nishiki Market. En puestos de comida, comer en la zona indicada por el propio vendedor. En restaurantes pequeños, comprobar si aceptan tarjeta; llevar algo de efectivo. No dejar propina. En muchos restaurantes se paga en caja, no necesariamente en la mesa. Los noodles pueden sorberse; no es necesario preocuparse por ello. Si un restaurante tiene una cola enorme, buscar una alternativa una o dos calles más lejos. No asumir que 'abierto de 17:00 a 23:00' significa que la cocina acepta pedidos hasta las 23:00; mirar siempre el último pedido." }
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
      "Despacharemos el equipaje grande a Tokio y viajaremos ligeros hacia la costa del Mar de Japón. Día en Kanazawa: Kenroku-en (uno de los mejores jardines del país), marisco y antiguos barrios samuráis. Seguro que los helados de aquí no están tan buenos como los caseros de fruta que hace Sergio.",
    history:
      "Kanazawa fue el dominio del poderoso clan Maeda durante el periodo Edo, rivalizando con Kioto en riqueza y cultura. Al esquivar los bombardeos modernos, conserva su trazado urbano feudal.",
    schedule: [
      { time: "07:30", text: "🧳 Despertar y gestión de envío de maletas (Takkyubin).\n\nEl Hotel Keihan Kyoto Hachijoguchi dispone de servicio de envío de equipaje (Yamato Transport / Sagawa). Enviaremos las 5 maletas grandes directamente desde Kioto hasta el KOKO HOTEL Residence Asakusa Kappabashi en Tokio.\n\n📦 **Estrategia logística de equipaje:**\n- Viajaremos por los Alpes (Kanazawa, Shirakawa-go, Takayama, Magome y la ruta a pie de Tsumago) únicamente con mochilas y equipaje de mano ligero, evitando acarrear maletas voluminosas por trenes de montaña, autobuses y senderos de piedra.\n- Tiempo sin maletas grandes: Estaremos sin el equipaje grande durante los días 12, 13, 14 y gran parte del 15 (hasta nuestra llegada por la tarde al hotel de Tokio).\n- El 12/09 por la mañana: Confirmar en recepción del hotel de Kioto el envío y verificar que el KOKO HOTEL Residence Asakusa Kappabashi acepta la recepción del equipaje. Solicitar que la fecha de entrega quede programada para antes o el mismo día 15/09.\n- Guardar cuidadosamente los resguardos y números de seguimiento (tracking).\n- El margen de 3–4 días entre el envío y nuestra llegada a Tokio es amplio y adecuado para la entrega.\n\n🍳 **Desayuno:** Desayuno no incluido. Opción de desayunar fuera o pillar algo en 7-Eleven / konbini para salir con margen hacia el tren de las 08:10." },
      { time: "08:10", text: "🚆 KYOTO → TSURUGA → KANAZAWA. Hotel Keihan Kyoto Hachijoguchi → Kyoto Station: aproximadamente 5 minutos andando hasta Hachijo East Exit. Salir con margen suficiente para estar en el andén unos 10–15 minutos antes. 1. Limited Express THUNDERBIRD 5: Kyoto Station (08:10) → Tsuruga Station (09:03).\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** ✅ YA COMPRADA y Billetes recogidos el día anterior.\n\nAsientos confirmados: Coche 5 (11-D, 12-C, 12-D, 13-C, 13-D).\n\n2. En Tsuruga (09:03 - 09:21): Hacer transbordo (18 min) al Hokuriku Shinkansen. Seguir las señales de conexión Thunderbird → Shinkansen. No salir de la estación innecesariamente.\n\n3. Hokuriku Shinkansen KAGAYAKI 508: Tsuruga (09:21) → Kanazawa (10:03).\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** ✅ YA COMPRADA\n\nAsientos confirmados: Coche 5 (11-E, 12-D, 12-E, 13-D, 13-E).\n\nLlegada a Kanazawa a las 10:03." },
      { time: "11:00–12:15", text: "🌳 JARDÍN KENROKU-EN. Abierto todos los días. Horario en septiembre: 07:00–18:00. Entrada aproximada: ¥320 (~2€). No requiere reserva. Qué buscar: Kasumigaike Pond, Kotoji-toro, Karasaki Pine, Uchihashi-tei, vistas del jardín y sus distintos niveles. 💡 Tip: Kenroku-en es grande; no intentar verlo absolutamente todo. Hacer una ruta circular por los puntos principales." },
      { time: "12:15–13:30 aprox.", text: "🏯 NAGAMACHI SAMURAI DISTRICT. Paseo por: calles de muros de tierra; canales; antiguas residencias samurái. El barrio es residencial y se puede recorrer gratuitamente caminando. Si queremos entrar en una residencia, priorizar Nomura-ke: Abierta 08:30–17:30 en septiembre. Entrada ¥550 (~3,5€). No requiere reserva. Jardín interior especialmente interesante." },
      { time: "13:30/14:00–15:30", text: "🍣 COMIDA EN OMICHO MARKET. Uno de los grandes mercados gastronómicos de Kanazawa, famoso por el pescado y marisco fresco del Mar de Japón. Priorizar: kaisendon; sushi; amaebi (gamba dulce); nodoguro; pescado local; productos frescos de Ishikawa. Septiembre no es la temporada principal del cangrejo y la buri/seriola; el mercado destaca especialmente estos productos alrededor de noviembre. No hacer del cangrejo el objetivo principal de esta comida. 💡 Tip: Muchos restaurantes/puestos empiezan a cerrar por la tarde. No retrasar demasiado la comida. En foros recientes viajeros recomiendan explorar también Omicho Ichibakan y su segunda planta, donde hay pequeños restaurantes locales. Presupuesto orientativo: comida sencilla: ¥1.000–2.000 (~6–12€); kaisendon/sushi más completo: ¥2.000–4.000+ (~12–25€+). No hacer reserva obligatoria para la comida." },
      { time: "16:30–18:00", text: "🏮 HIGASHI CHAYA DISTRICT. Pasear por las calles históricas y las casas de té. Opcional: SHIMA — antigua casa de té, abierta 09:30–17:30 en septiembre. Entrada: ¥500 (~3€) + suplemento opcional por té/dulce. Si queréis entrar en SHIMA, hacerlo antes de las 17:15 para tener margen. Opción gastronómica: matcha + wagashi; helado de matcha; helado con hoja de oro." },
      { time: "19:00–21:00", text: "🍜 CENA EN KANAZAWA. Recomendar cenar por el centro de Kanazawa (Korinbo / Katamachi / Omicho). Probar oden de Kanazawa, sushi o pescado del Mar de Japón." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: HOTEL RESOL TRINITY KANAZAWA** (https://www.google.com/maps/search/?api=1&query=Hotel+Resol+Trinity+Kanazawa)\n\nRegreso al hotel tras la cena para descansar (1ª y única noche en Kanazawa en Hotel Resol Trinity Kanazawa)." },
      { time: "🚌 TRANSPORTE", text: "Cómo moverse por Kanazawa: Los principales puntos turísticos están muy cerca entre sí, pero el Loop Bus resulta muy práctico. Kanazawa Loop Bus: ¥220 (~1,4€) por trayecto. Acepta Suicas nacionales y pago contactless. También existe ONE DAY PASS por ¥800 (~5€). ONE DAY PASS solo merece especialmente la pena si vamos a utilizar el bus 4 veces o más. Importante: El ONE DAY PASS no se compra a bordo del bus. Se puede comprar en el Centro de Información Turística de la estación, centros Hokutetsu, algunos hoteles o digitalmente." },
      { time: "💡 TIPS", text: "Tips de Kanazawa: Kanazawa es mucho más compacta que Kyoto; caminar entre varias zonas es perfectamente viable. Llevar efectivo aunque muchos lugares acepten tarjeta/IC. En Omicho, mirar primero y decidir después; no comprar lo primero que parezca atractivo. Para seafood bowls, comparar tamaños/precios antes de sentarse. En Higashi Chaya, la mayoría de tiendas tradicionales cierran antes que los restaurantes. El barrio de Nagamachi es residencial: mantener un tono discreto y respetar las viviendas. Si llueve, Kanazawa sigue siendo bastante manejable porque muchas zonas comerciales están cubiertas, pero llevar paraguas. Randy seguro que ya ha comprado agua para todos porque siempre está súper atento." }
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
      { time: "07:30", text: "🍙 Despertar + Desayuno rápido para llevar. El Hotel Resol Trinity Kanazawa NO incluye desayuno en nuestra reserva. Aunque el hotel ofrece desayuno desde las 07:00, para esta mañana es más práctico comprar la noche anterior en un konbini: onigiri, sandwich, fruta, café/bebida. No depender del desayuno del hotel porque tenemos que coger el bus de las 08:40. Preparar también agua para llevar." },
      { time: "08:40", text: "🚌 Nohi Bus Kanazawa → Shirakawa-go.\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** ✅ YA COMPRADA\n🛒 **COMPRA:** Utilizar la reserva confirmada de 12GO / Hokutetsu.\n\nSalida: 08:40. Reserva: 12GO31991741. 5 asientos confirmados. Duración aproximada: 1h25. Llegada prevista: 10:05. Reserva obligatoria para este servicio. No es JR. No utiliza Japan Rail Pass. No utilizar Suica: llevamos la reserva/billete del autobús. 💡 Tip: Llegar a la parada con margen. Tener localizada la reserva en el móvil y/o una copia accesible." },
      { time: "10:05", text: "Llegada a Shirakawa-go a las 10:05. Disponemos de aproximadamente 3 h 10 min en Shirakawa-go (desde las 10:05 hasta la salida del bus a Takayama a las 13:15). Desde Shirakawa-go Bus Terminal comienza el recorrido a pie por Ogimachi. El centro histórico está a pocos minutos de la terminal." },
      { time: "10:05–11:45", text: "SHIRAKAWA-GO. Recorrer Ogimachi: casas gassho-zukuri, calles tradicionales, canales, Shirakawa Hachiman Shrine, vistas de las montañas. Priorizar disfrutar del pueblo antes que intentar entrar en muchas casas. Visita interior recomendada: Wada House (09:00–17:00, ¥400 (~2,5€), a unos 3–4 min de la terminal, sin reserva, pago en efectivo). Opcional: Open-Air Museum (08:40–17:00 en septiembre, ¥600 (~4€), a 12 min andando. Solo entrar si vamos bien de tiempo)." },
      { time: "11:45–12:30", text: "🍜 COMIDA EN SHIRAKAWA-GO. No retrasar demasiado la comida porque el bus a Takayama sale a las 13:15 y debemos estar de vuelta en la terminal con margen. Qué probar: Hida beef, hoba miso, soba, udon, tofu de Shirakawa-go, verduras locales. \n\n\nOpciones:\n\n1. YOUCYA UDON (opción rápida); 2. Hiiragi (Hida beef A4/A5); 3. Magoemon (opción tradicional pequeña, valorar reserva). No hacer reserva obligatoria. 💡 Tip: Muchos restaurantes son pequeños y con horarios variables. Si encontramos una opción adecuada abierta y con poca espera, aprovecharla." },
      { time: "12:30–13:00", text: "ÚLTIMO PASEO + REGRESO A TERMINAL. Dejar aproximadamente 15–20 minutos de margen para volver a Shirakawa-go Bus Terminal. No alejarse de la zona central." },
      { time: "13:15", text: "🚌 Nohi Bus Shirakawa-go → Takayama.\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** ✅ YA COMPRADA\n🛒 **COMPRA:** Utilizar la reserva confirmada de 12GO / Nohi Bus.\n\nSalida: 13:15. Reserva: 12GO31992254. 5 asientos confirmados. Duración aproximada: 50 min. Llegada prevista a Takayama Bus Terminal: 14:05. Reserva obligatoria. No es JR. No requiere Japan Rail Pass. No utilizar Suica: utilizar la reserva/billete del autobús." },
      { time: "14:05", text: "Llegada a Takayama. Desde Takayama Bus Terminal hasta Hotel Wood Takayama:\n\n aproximadamente 12 minutos andando. El hotel está prácticamente junto al casco histórico, por lo que NO necesitamos taxi ni transporte urbano. El check-in oficial es a las 15:00. Podemos dejar el equipaje en recepción si la habitación todavía no está disponible." },
      { time: "14:20–17:30", text: "CASCO ANTIGUO DE TAKAYAMA. Recorrer: Sanmachi Suji, calles tradicionales, pequeñas tiendas, sake breweries, edificios históricos, Nakabashi y alrededores. \n\n⚠️ **IMPORTANTE:**\nMuchas tiendas y atracciones del casco antiguo cierran alrededor de las 17:00. Aprovechar esta franja para compras y visitas interiores. Después de las 17:00: Quedarse por la zona, descansar en el hotel o dar un paseo tranquilo por las calles cuando haya menos gente. 🍡 SNACK OPCIONAL: Probar alguna especialidad callejera de Hida (Hida beef sushi, croquette, mitarashi dango, pudding, sake local). No llenar demasiado el estómago si queremos cenar Hida beef." },
      { time: "19:00", text: "🥩 Cena especial de Hida beef en Takayama. Probar yakiniku de Hida beef A4/A5, hoba miso y especialidades locales." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: HOTEL WOOD TAKAYAMA** (https://www.google.com/maps/search/?api=1&query=Hotel+Wood+Takayama)\n\nPaseo nocturno por el casco antiguo hasta el hotel para descansar (1ª y única noche en Takayama en Hotel Wood Takayama)." },
      { time: "🎫 RESERVAS", text: "YA RESERVADO: Kanazawa → Shirakawa-go (08:40, 5 plazas) y Shirakawa-go → Takayama (13:15, 5 plazas). NO necesitamos Japan Rail Pass, trenes, ni Suica para estos buses.\nPENDIENTE / RECOMENDADO: reservar cena de Hida beef para 5 personas a las 19:00." },
      { time: "🚍 RESUMEN DE TRANSPORTE", text: "Kanazawa → Shirakawa-go: Nohi Bus reservado, 08:40 → 10:05 (3 h 10 min de visita en Shirakawa-go).\nShirakawa-go: Todo a pie.\nShirakawa-go → Takayama: Nohi Bus reservado, 13:15 → 14:05.\nTakayama Bus Terminal → Hotel Wood: aprox. 12 min andando.\nHotel → Sanmachi: al lado.\nNo necesitamos Japan Rail Pass ni trenes hoy." },
      { time: "🍽️ CONSEJOS DE COMIDA", text: "⚠️ En Shirakawa-go no esperar hasta las 13:00 para comer. Establecimientos con horarios limitados y debemos estar de vuelta en la terminal antes de las 13:15.\n⚠️ En Takayama muchas tiendas cierran sobre las 17:00, pero los restaurantes de cena abren más tarde. La cena a las 19:00 es viable. 🥩 Takayama es ideal para probar Hida beef. Tip de viajeros: reservar restaurantes populares o acudir temprano ya que se llenan." }
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
      "La Nakasendo era una de las cinco grandes rutas feudales del periodo Edo que conectaban Kioto con Edo (Tokio). Magome y Tsumago operaban como 'estaciones de posta' (juku) donde samuráis, daimyos y mercaderes descansaban en sus viajes a pie.",
    schedule: [
      { time: "07:00", text: "🍙 Despertar y desayuno rápido. El Hotel Wood Takayama no debe ser nuestra fuente de desayuno esta mañana si no está incluido en la reserva. Comprar el desayuno la noche anterior: onigiri, sandwich, pan, fruta, café/bebida. Comer antes de salir o llevarlo para el autobús. 💡 Tip: Salir con todo preparado porque tenemos un autobús reservado a las 08:00." },
      { time: "07:20 aprox.", text: "🚶 Salir del Hotel Wood Takayama hacia Takayama Nohi Bus Center (aprox. 10–15 minutos andando). Objetivo: llegar entre 07:30 y 07:35 para canjear con calma los billetes." },
      { time: "07:35", text: "⚠️ **CANJE OBLIGATORIO DE E-TICKET:**\nEn el Takayama Nohi Bus Center presentar el E-ticket de Japan Bus Online (en el móvil o impreso) en el mostrador para **canjearlo por los billetes físicos**.\n\n⚠️ **IMPORTANTE:** El operador exige realizar el canje al menos 15 minutos antes de la salida de las 08:00 (llegar como tarde 07:45). Guardar los billetes físicos para presentarlos al subir al bus." },
      { time: "08:00", text: "🚌 Nohi Bus directo: Takayama → Magome.\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** ✅ COMPRADA Y CONFIRMADA\n📄 **E-TICKET:** Reserva 08302008262 · Titular: Pablo Crespo Bellido\n\nSalida: Takayama Nohi Bus Center (08:00) → Llegada: Magome (10:45).\nCar No. 01 · 5 Asientos: 2C, 2D, 3B, 3C, 3D.\nTotal: ¥25.000 (~135,61€) (5 adultos · ¥5.000/pax · ~27€).\n\n⚠️ **IMPORTANTE:**\nNuestra reserva finaliza en **MAGOME a las 10:45**. Aunque el autobús continúe hasta Tsumago (11:10), nosotros nos bajamos en Magome para iniciar la ruta a pie por el camino histórico de Nakasendo." },
      { time: "10:45", text: "📍 Llegada a MAGOME. Fin del trayecto en autobús. Comenzamos aquí la Ruta Nakasendo a pie hacia Tsumago (8 km). Antes de iniciar la caminata, dejamos el equipaje en el servicio de transporte." },
      { time: "10:45–11:15", text: "🧳 ENVIAR EQUIPAJE A TSUMAGO. El servicio permite dejar maletas en la oficina de turismo de Magome entre 08:30 y 11:30 (¥500/pieza · ~3€). Recogeremos las maletas en Tsumago después de las 13:00. \n\n⚠️ **IMPORTANTE:**\nLlegamos a las 10:45, hay tiempo para dejarlo antes de las 11:30. Llevar durante la caminata únicamente una mochila pequeña con agua, documentación, móvil, batería y dinero. NO llevar maletas grandes durante la ruta (el sendero tiene piedras y desnivel)." },
      { time: "11:15", text: "🥾 Ruta Nakasendo: Magome → Tsumago. Aproximadamente 8 km y unas 3 horas a ritmo tranquilo. El sentido Magome → Tsumago tiene menos subida. Info práctica: dificultad fácil–moderada; sendero bien señalizado; tramos de bosque y asfalto; llevar agua. Hay campanas para ahuyentar osos en varios puntos, utilizarlas al pasar. Juancar, ya sabemos que como funcionario en el Reina Sofía no te mueves mucho, ¡pero hoy toca andar!" },
      { time: "12:30–13:00", text: "🍙 COMIDA / SNACK DURANTE LA RUTA. Llevar comida desde Takayama/Magome. No depender de encontrar un restaurante durante la caminata. Comprar: onigiri, sandwich, fruta, bebida. La prioridad es no alargar la caminata porque debemos recoger el equipaje y coger el bus de vuelta a Magome. Si encontramos una casa de té abierta, podemos parar, pero no depender de ello." },
      { time: "14:15 aprox.", text: "🏘️ Llegada a Tsumago. Paseo corto por Tsumago mientras nos dirigimos a la oficina de información turística. El objetivo principal de Tsumago este día es terminar la ruta y recoger el equipaje." },
      { time: "14:15–14:22", text: "🧳 Recoger maletas en Tsumago y BUS TSUMAGO → MAGOME. Recoger equipaje en la oficina de turismo (horario 08:30–17:00). 🚍 14:22 — BUS local Magome Line.\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** ❌ NO\n🛒 **COMPRA:** Pago en efectivo al conductor o billete en la oficina de Tsumago.\n\nSalida Tsumago: 14:22. Llegada Magome: 14:50. Duración: 28 min. Precio: ¥1.000/persona (~6€). No requiere JR Pass. No hace falta reservar. \n\n⚠️ **IMPORTANTE:** Este bus es imprescindible para volver a Magome a dormir." },
      { time: "14:50", text: "📍 Regreso a Magome. Ya tenemos el equipaje con nosotros." },
      { time: "15:00–17:30", text: "Pasear tranquilamente por Magome-juku, sus casas tradicionales y calles históricas. Esta franja sirve para: check-in, dejar equipaje, descansar, ducharse y disfrutar del pueblo. \n\n⚠️ **IMPORTANTE:**\nMuchas tiendas y restaurantes cierran temprano. No dejar compras ni comida para última hora." },
      { time: "18:00", text: "🍱 CENA EN MAGOME CHAYA. La cena tradicional se sirve EXACTAMENTE a las 18:00. Precio: ¥3.630/persona (~23€) (confirmar previamente con el alojamiento)." },
      { time: "~19:30", text: "🏨 **ALOJAMIENTO: MAGOME CHAYA (MINSHUKU)** (https://www.google.com/maps/search/?api=1&query=Magome+Chaya+Gifu)\n\nDescanso en la posada rural tras la cena (1ª y única noche en Magome Chaya)." },
      { time: "~20:00", text: "🏮 **PASEO NOCTURNO POR MAGOME (OPCIONAL)**\n\nSi quedan ganas, paseo corto por las calles empedradas iluminadas con faroles tradicionales. El pueblo cierra temprano: no alejarse mucho de la posada." },
      { time: "🚍 RESUMEN DE TRANSPORTE", text: "🏨 Hotel Wood Takayama\n↓ 10–15 min andando (07:20)\n↓ 🚌 Takayama Nohi Bus Center (07:35 canje billetes)\n↓ 08:00–10:45 🚌 Nohi Bus directo (✅ Reservado)\n↓ 📍 Magome (bajada 10:45)\n↓ dejar equipaje\n↓ 🥾 8 km / ~3 h Ruta Nakasendo\n↓ 📍 Tsumago\n↓ recoger equipaje\n↓ 🚌 14:22–14:50 Bus local\n↓ 📍 Magome\n↓ 🏨 Magome Chaya\n↓ 🍱 Cena 18:00." },
      { time: "💡 TIPS NAKASENDO", text: "🥤 Llevar agua suficiente y comida ligera antes de empezar. 🍵 Hay casas de té pero con horarios variables. 🌙 Magome cierra temprano, la cena a las 18:00 es la opción segura. 🥾 Calzado cómodo con buena suela. 🌧️ Ojo al barro si llueve. 🐻 Usar campanas para osos. 🎒 Caminar solo con mochila pequeña usando el servicio de equipaje. 📸 No correr, disfrutar de la ruta." }
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
      { time: "07:00", text: "🍙 07:00 — DESAYUNO\nMagome Chaya NO ofrece desayuno desde 2026.\nComprar el desayuno el día anterior.\nRecomendación: onigiri, sandwich, pan, fruta, café/bebida.\nComer antes de salir o llevarlo para el autobús.\nNO depender de encontrar desayuno abierto en Magome por la mañana." },
      { time: "08:15", text: "🚌 08:15 — BUS LOCAL MAGOME → NAKATSUGAWA\n\n🎫 **SUICA:** ❌ NO (solo efectivo)\n📅 **RESERVA:** ❌ NO\n🛒 **COMPRA:** Coger ticket numerado al subir por puerta trasera, pagar en efectivo al conductor al bajar.\n\nSalida: Magome — 08:15\nLlegada: Nakatsugawa Station — 08:40\nDuración: aprox. 25 min.\nTipo: bus local.\nReserva: NO se puede reservar.\nJapan Rail Pass: NO incluido.\nPago: comprar/pagar localmente según las instrucciones del operador.\nPrecio orientativo: ¥800/persona (~5€).\n\n⚠️ **IMPORTANTE:**\nEl 15 de septiembre de 2026 es martes, por lo que corresponde el horario laborable.\nLlegar a la parada unos minutos antes.\nEste bus es necesario para conectar Magome con la red ferroviaria de JR." },
      { time: "08:40", text: "🎫 **08:40 — RECOGER BILLETES FÍSICOS JR-WEST (CRÍTICO)**\n\nLlegada a Nakatsugawa Station (~08:40). El Shinano 4 sale a las **09:57** → hay **~77 minutos** de margen.\n\n🟢 La reserva **YA ESTÁ PAGADA** (nº **42093**). Esto NO es comprar billete: es **recoger los físicos**.\n\n⚠️ **OBLIGATORIO antes de subir:**\n- Buscar máquina o taquilla habilitada **FUERA de los tornos** (no sirve una máquina dentro de las puertas de acceso).\n- Llevar la **tarjeta física** Mastercard terminada en **8625** (no vale virtual).\n- Tener a mano Reservation No. **42093** y Receipt ID **AEE6606M**.\n- PIN de 4 dígitos de la reserva.\n- No entrar a los tornos hasta tener los billetes si son necesarios para el acceso.\n\n💡 **Antelación (si se puede):** intentar recoger antes en una estación JR-WEST con máquina/taquilla fuera de tornos (p. ej. Kioto). Si no se ha hecho: **PLAN B / OBLIGATORIO en Nakatsugawa**.\n\n☕ Con el tiempo restante: baño, café/desayuno ligero, agua/snacks y localizar el andén del Shinano 4 sin prisas." },
      { time: "09:57", text: "🚆 **SHINANO 4 — NAKATSUGAWA → NAGOYA**\n\n🟢 **RESERVADO Y CONFIRMADO** (JR-WEST Online Train Reservation)\n\nSalida: Nakatsugawa **09:57** → Llegada: Nagoya **10:53** (56 min).\nCar **4** · Ordinary / Reserved / Non-Smoking.\nAsientos: **11-D · 12-C · 12-D · 13-C · 13-D** (ya asignados).\n5 adultos · Total **¥14.350 (~77,84€)** (¥2.870/pax · ~15,57€).\nReserva **#42093** · Receipt **AEE6606M**.\n\n🎫 **BILLETES FÍSICOS:** pendiente de recoger (ver 08:40). Subir solo con los tickets en mano.\n\nDespliega la tarjeta inferior para ver la confirmación, asientos y checklist de recogida." },
      { time: "10:53", text: "10:53 — Llegada a Nagoya Station.\n\n⏱️ **Transbordo al Tokaido Shinkansen:** el Nozomi 358 sale a las **11:29** → **36 minutos** de margen (razonable; no es un margen enorme).\n\n⚠️ **IMPORTANTE:** Seguir las indicaciones hacia los andenes del Tokaido Shinkansen. No buscar tren alternativo ni cambiar la reserva salvo incidencia real.\n\n🍱 En esta franja (aprox. 10:53–11:20) comprar ekiben/bento, sandwich, sushi o bebida para comer en el Shinkansen. No reservar restaurante." },
      { time: "10:53–11:20", text: "🍱 **COMPRAR COMIDA EN NAGOYA**\n\nComprar un ekiben/bento, sandwich, sushi, bebida, etc., para comer durante el Nozomi 358.\nEs la forma más práctica de aprovechar el trayecto.\nNo reservar restaurante para esta comida." },
      { time: "11:29", text: "🚄 **TOKAIDO SHINKANSEN NOZOMI 358 — NAGOYA → TOKYO**\n\n🟢 **COMPRADO Y CONFIRMADO** (Smart EX)\n\nSalida: Nagoya **11:29** → Llegada: Tokyo **13:06** (1 h 37 min).\nOrdinary Car · Series N700 · Car **12**.\nAsientos: **11-D · 11-E · 12-C · 12-D · 12-E** (ya asignados).\n5 adultos · Total **¥54.500 (~295,62€)** (¥10.900/pax · ~59,12€).\nReserva Smart EX **#2002**.\n\n📱 **Acceso:** QR-Ticket (recomendado) · también se puede designar IC card · recogida física opcional (NO obligatoria).\n\n🧳 Ordinary Car ya reservada: comprobar dimensiones de maletas (≤160 cm OK; >160 cm hasta 250 cm requeriría zona oversized — no modificar reserva sin medir).\n\nDespliega la tarjeta inferior para consultar asientos, QR individuales y la confirmación Smart EX." },
      { time: "13:06", text: "13:06 — Llegada a Tokyo Station. Desde Tokyo Station continuar en transporte público hasta KOKO HOTEL Residence Asakusa Kappabashi." },
      { time: "~13:30", text: "🚇 TOKYO STATION → KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos.\n\nEl hotel está en: 3-24-2 Nishi-Asakusa, Taito-ku.\n\n\nOpciones:\n\nOpción sencilla: JR desde Tokyo → Ueno + Tokyo Metro Ginza Line Ueno → Tawaramachi + 10 min andando hasta el hotel.\nAlternativamente: Tokyo → Ueno y después taxi si llevamos mucho equipaje.\nEl hotel está aproximadamente:\n- 4 min andando desde Tsukuba Express Asakusa Station B\n- 10 min desde Tawaramachi Station\n- 10 min desde Iriya Station.\n\nNo reservar este transporte.\nSe paga allí mediante Suica/billete.\nCon 5 personas y maletas, si estamos cansados, valorar taxi desde Tokyo Station directamente al hotel. No es obligatorio reservarlo." },
      { time: "~14:00–15:00", text: "🏨 **CHECK-IN: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nLlegada y check-in (oficial desde las 15:00). Si llegamos antes, dejar las maletas en recepción si el hotel lo permite y salir hacia Akihabara.\n\nDirección: 3-24-2 Nishi-Asakusa, Taito-ku. Muy bien situado para ir a Akihabara en transporte público." },
      { time: "15:00–19:00", text: "Tarde en Akihabara. Recorrer Electric Town, Radio Kaikan, Mandarake, tiendas de tecnología, anime/manga y figuras. Sergio, no puedes llevarte nada de los contenedores por muy 'chollito' que sea, y no vas a poder meter más juegos de mesa en la maleta, ¡ya tienes más de 130! Aquí es donde Pablo se volverá loco comprando cachivaches que la IA le diga." },
      { time: "19:30–21:00", text: "🍜 Cena por Akihabara o Asakusa (ramen, tonkatsu, izakaya o gyudon)." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nRegreso a nuestra residencia en Tokio para descansar y reencontrarnos con las maletas grandes enviadas desde Kioto (1ª noche en Tokio)." },
      { time: "🍜 COMIDA/CENA", text: "COMIDA\nComo el desayuno será temprano y la comida principal será en el Shinkansen, no es necesario reservar una comida en Akihabara.\nSi tenemos hambre al llegar, comer algo rápido en Akihabara. Opciones típicas: ramen, curry, gyudon, kaiten sushi, tonkatsu, comida rápida japonesa.\n\nCENA\nDejar la cena para Akihabara o Asakusa.\nNo asumir que todos los restaurantes permanecen abiertos hasta muy tarde.\nPara un restaurante concreto y siendo 5 personas, reservar si se decide uno popular." },
      { time: "🚆 TRANSPORTE DEL DÍA", text: "1. 🚌 Magome → Nakatsugawa: 08:15 → 08:40. Sin reserva. ¥800 aprox. (~5€). Pago local.\n2. 🚆 Nakatsugawa → Nagoya: Limited Express **Shinano 4**. 09:57 → 10:53.\n\n🟢 **YA RESERVADO** (JR-WEST nº 42093 · ¥14.350 (~77,84€) · Car 4). 🎫 Recoger billetes físicos antes de subir.\n3. 🚅 Nagoya → Tokyo: **Nozomi 358**. 11:29 → 13:06.\n\n🟢 **YA COMPRADO** (Smart EX nº 2002 · ¥54.500 (~295,62€) · Car 12 · QR-Ticket).\n4. 🚇 Tokyo → Asakusa/Kappabashi: Metro/JR. Sin reserva. Suica.\n5. 🚇 Asakusa → Akihabara: Transporte urbano. Sin reserva. Suica." },
      { time: "🎫 RESERVAS", text: "🟢 **HECHO**\n• Shinano 4 Nakatsugawa → Nagoya (09:57 → 10:53) · Reserva 42093 · Receipt AEE6606M · ¥14.350 (~77,84€).\n• Nozomi 358 Nagoya → Tokyo (11:29 → 13:06) · Smart EX **2002** · ¥54.500 (~295,62€) · Car 12 · asientos 11-D/11-E/12-C/12-D/12-E.\n\n🎫 **PENDIENTE DE RECOGER (Shinano, no es comprar):** billetes físicos JR-WEST antes de subir (Mastercard **8625 + PIN de la reserva).\n\n📱 **PREPARACIÓN Nozomi:** guardar QR-Ticket / confirmar acceso; comprobar dimensiones de maletas.\n\n🟢 NO RESERVAR\nBus local Magome → Nakatsugawa (08:15).\n\n🟢 NO RESERVAR\nTokyo → hotel / transporte urbano en Tokyo." },
      { time: "💡 PUNTOS IMPORTANTES", text: "⚠️ El Shinano 4 (09:57) y el Nozomi 358 (11:29) **YA ESTÁN COMPRADOS**. No cambiar horarios salvo petición expresa o incidencia.\n\n⚠️ Transbordo Nagoya: 10:53 → 11:29 (**36 min**). Seguir a andenes del Tokaido Shinkansen.\n\n⚠️ Shinano: la reserva NO sustituye la recogida física de billetes JR-WEST.\n\n⚠️ Nozomi: acceso con **QR-Ticket** (recomendado) o IC designada — no es recogida obligatoria tipo JR-WEST.\n\n⚠️ Comprar el desayuno el día anterior porque Magome Chaya no ofrece desayuno." },
      { time: "✅ CHECKLIST DEL DÍA", text: "☑️ Bus Magome → Nakatsugawa\n☑️ Reserva Shinano 4 (nº 42093 · YA HECHA)\n☑️ Reserva Nozomi 358 Smart EX (nº 2002 · YA COMPRADA)\n☐ Recoger billetes físicos JR-WEST del Shinano (fuera de tornos)\n☐ Tarjeta física Mastercard terminada en 8625 + PIN + nº 42093\n☐ Guardar QR-Ticket / confirmar acceso Smart EX del Nozomi 358\n☐ Comprobar dimensiones de las maletas\n☐ Mantener confirmación Smart EX accesible en el móvil" },
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
      "Templo Senso-ji en Asakusa, cruzando la puerta Kaminarimon. Paseo por el mercadillo de Ameyoko junto al parque de Ueno. Por la tarde, tren futurista sin conductor hacia Odaiba para ver el atardecer sobre la bahía. (Fecha con reserva flexible de GetYourGuide GYGX7M7NZBNL).",
    history:
      "El templo Senso-ji, el más antiguo de Tokio, fue fundado en el año 628. Odaiba nació en el siglo XIX como islas-fortaleza para defender Tokio de los barcos occidentales.",
    schedule: [
      { time: "09:00", text: "Templo Senso-ji en Asakusa, cruzando la icónica puerta Kaminarimon." },
      { time: "11:30", text: "Parque de Ueno y mercadillo de Ameyoko, ideal para compras baratas de té y dulces." },
      { time: "14:30", text: "Tren Yurikamome hacia Odaiba cruzando el Rainbow Bridge (sentaos en el primer vagón).\n\n🎫 **SUICA:** ✅ SÍ; pasar la tarjeta directamente por los tornos." },
      { time: "15:30", text: "Gundam a tamaño real y atardecer desde el paseo marítimo con el skyline de Tokio." },
      { time: "19:00–21:00", text: "🍜 Cena en Odaiba o Asakusa (Aqua City / DiverCity con vistas a la bahía de Tokio)." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nRegreso en metro/Yurikamome a nuestra residencia en Asakusa Kappabashi para descansar (2ª noche en Tokio)." },
      { time: "~22:00", text: "🏮 **OPCIONAL: SENSŌ-JI DE NOCHE**\n\nEl hotel está a ~10 min a pie de Sensō-ji / Kaminarimon. Si hay energía, paseo corto al templo iluminado (gratis; ambiente muy distinto al del día)." },
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
      "Día intenso: cruce de Shibuya y cultura juvenil de Harajuku. Terminamos bajo los neones de Shinjuku con sus callejones gastronómicos. (Fecha con reserva flexible de GetYourGuide GYGFWV2MNZV8). Thibaut, aprovecha para cortarte el pelo, que aunque no sea tan barato como en España, igual es mejor que en Francia.",
    history:
      "Estos distritos crecieron tras el Gran Terremoto de Kanto de 1923, impulsados por la expansión del tren urbano. Shinjuku alberga hoy la estación más transitada del planeta.",
    schedule: [
      { time: "09:30", text: "Cruce de Shibuya y Miyashita Park. Parada en el Pokémon Center Shibuya. Ojo, que a Sergio seguro que se le ocurre montar un huerto urbano aquí para sus plantas de Aluche." },
      { time: "13:00", text: "Paseo hacia Harajuku por la calle Takeshita, terminando en el santuario Meiji en el parque Yoyogi." },
      { time: "17:00", text: "Noche en Shinjuku: mirador gratuito del Gobierno Metropolitano, cena en Omoide Yokocho y paseo bajo los neones de Kabukicho." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nRegreso en metro desde Shinjuku a nuestra residencia en Asakusa Kappabashi para descansar (3ª noche en Tokio)." },
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
      { time: "17:30", text: "Atardecer en el mirador Tokyo City View de la torre Mori (Roppongi), vistas panorámicas y Torre de Tokio iluminada." },
      { time: "19:30–21:00", text: "🍜 Cena por Roppongi o Asakusa." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nRegreso en metro a nuestra residencia en Asakusa Kappabashi para descansar (4ª noche en Tokio)." },
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
      { time: "19:30–21:00", text: "🍜 Cena por Nakano o Asakusa." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nRegreso a la residencia para descansar y preparar el madrugón para la excursión del Monte Fuji (5ª noche en Tokio)." },
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
      { time: "06:15", text: "Comprobar cámaras web en directo en mtfujitoday.com e isfujivisible.com desde el hotel en Tokio (la regla de oro matutina)." },
      { time: "06:30 aprox.", text: "🚶 SALIDA RECOMENDADA DEL HOTEL (KOKO HOTEL Residence Asakusa Kappabashi → Estación de Tokio).\n\nRecomendación de salida del hotel con margen suficiente (~06:30; no es un horario ferroviario oficial, sino una recomendación preventiva para el grupo de 5 personas):\n1. Caminar ~10 min desde el hotel hasta la estación de Tawaramachi (Tokyo Metro).\n2. Tomar la Ginza Line desde Tawaramachi hasta Ueno Station.\n3. Desde Ueno, conectar hacia Tokyo Station (vía JR Yamanote Line o Keihin-Tohoku Line) y caminar tranquilamente hasta el andén del Tokaido Shinkansen.\n\n⚠️ Conexión crítica: Este margen deliberado es esencial para llegar al andén con calma antes de la salida del Shinkansen a las 07:27, garantizando el enlace con el tour privado de Ken Kaneshima en Mishima." },
      { time: "07:27", text: "🚅 Tokaido-Sanyo Shinkansen KODAMA 805.\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** 🔴 NECESARIA\n🛒 **COMPRA:** COMPRAR POR ADELANTADO (ida y vuelta) por Smart EX o taquillas JR.\n\nSalida de Tokio a las 07:27, llegada a Mishima a las 08:20. \n\n⚠️ **IMPORTANTE:**\nDebe ser el Kodama para que pare en Mishima." },
      { time: "08:25", text: "Encuentro en la Salida Sur de la Estación de Mishima con el guía Ken Kaneshima e inicio de la ruta en mini-van privada." },
      { time: "09:30", text: "Pagoda Chureito (Arakurayama Sengen): la imagen postal más icónica de Japón con la pagoda de 5 pisos y el Monte Fuji de fondo." },
      { time: "11:00", text: "Santuario Kitaguchi Hongu Fuji Sengen Jinja: punto de partida histórico de los peregrinos, con cedros gigantes milenarios y faroles de piedra." },
      { time: "12:15", text: "Aldea Oshino Hakkai: pintoresco pueblo con estanques cristalinos alimentados por el deshielo del Fuji y casas tradicionales de paja." },
      { time: "13:30", text: "Almuerzo tradicional en restaurante local: degustación de Houtou (fideos anchos en sopa caliente de miso con verduras de montaña)." },
      { time: "14:45", text: "Bosque de Aokigahara: el 'Mar de Árboles' que creció sobre la colada de lava del año 864, con raíces retorcidas y silencio absoluto." },
      { time: "15:45", text: "Cataratas Shiraito: espectacular salto de agua filtrada por roca volcánica que cae simulando hilos de seda blanca." },
      { time: "16:30", text: "Ruta panorámica de los Lagos del Fuji (Yamanakako, Saiko y Motosuko) con vistas desde distintos ángulos." },
      { time: "17:30", text: "Llegada a la Estación de tren bala Shin-Fuji y regreso en Shinkansen a Tokio (~60 min).\n\n🎫 **SUICA:** ❌ NO\n📅 **RESERVA:** 🔴 NECESARIA\n🛒 **COMPRA:** Utilizar billete de Shinkansen de regreso." },
      { time: "20:00", text: "🍜 Cena de despedida del grupo en Tokio (Asakusa / Ginza)." },
      { time: "~21:30", text: "🏨 **REGRESO AL HOTEL: KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI** (https://www.google.com/maps/search/?api=1&query=KOKO+HOTEL+Residence+Asakusa+Kappabashi)\n\nRegreso a la residencia en Asakusa Kappabashi para empaquetar maletas de facturación y descansar (6ª y última noche en Tokio)." },
    ],
    money: "13.000 ¥ tour (~81€) (entradas y mini-van inc.) + Shinkansen + comida Houtou",
  },
  {
    num: 15,
    date: "2026-09-21",
    weekday: "Lunes",
    block: "tokio",
    title: "Vuelta a casa",
    cities: "Tokio, Narita",
    summary:
      "Últimas horas en Japón: compras de última hora en farmacias locales o paseo de despedida cerca del hotel. Traslado a Narita con tiempo de sobra para facturar el vuelo de vuelta.",
    history:
      "Tras dos intensas semanas recorriendo la historia de los shogunes, la filosofía zen y la tecnología del archipiélago, el viaje concluye. Narita es el principal puerto de entrada y salida internacional de la región de Kanto desde 1978.",
    schedule: [
      { time: "09:00", text: "Último paseo por el barrio y compras de souvenirs (Kit-Kats de sabores, matcha, recuerdos de Kappabashi)." },
      { time: "13:00 aprox.", text: "🚆 TRASLADO AL AEROPUERTO DE NARITA — 2 OPCIONES (Recomendado: Keisei Skyliner)\n\n🟢 **OPCIÓN RECOMENDADA: KEISEI SKYLINER (desde Keisei-Ueno)**\n- Traslado al tren: KOKO HOTEL Residence Asakusa Kappabashi → Estación de Keisei-Ueno. Para 5 personas con maletas grandes, es muy conveniente valorar un taxi directo desde la puerta del hotel hasta Keisei-Ueno (~10 min), simplificando notablemente la logística.\n- Tren: Keisei Skyliner desde Keisei-Ueno directo a Narita Airport (~41 min). Tren exprés con asiento reservado y amplio espacio para maletas.\n- Ventaja: Evita desplazarse hasta Tokyo Station arrastrando el equipaje grande por pasillos y transbordos.\n- Horario definitivo: Consultar y reservar cuando esté publicada la tabla definitiva de septiembre de 2026, asegurando llegar a Narita con margen para el vuelo de las 17:25.\n\n🟡 **ALTERNATIVA VÁLIDA: JR NARITA EXPRESS (N'EX)**\n- Traslado: Hotel → Tokyo Station (metro o taxi) → JR Narita Express (N'EX) directo a Narita (~1h de tren, asiento reservado obligatorio).\n- El N'EX sigue siendo una opción perfectamente válida si se prefiere salir desde Tokyo Station.\n\n💡 Mantener margen suficiente para estar en la terminal de Narita antes de las 14:30 para facturación y seguridad." },
      { time: "14:30", text: "Facturación y controles de seguridad en Narita (Terminal 2)." },
      { time: "17:25", text: "Vuelo QR809 Narita → Doha (Qatar Airways, ~8h). Escala en Doha, luego vuelo QR6952 Doha → Madrid (Iberia). Llegada a Madrid el mar 22 sept a las 08:15." },
    ],
    money: "Aprox. 40€ (comidas)",
  },
];

// Transportes: `real` = €/persona · `jpy` = ¥/persona.
// Los billetes ya comprados usan conversión real Revolut (ago 2026).
export const transports = [
  { day: 1, date: "2026-09-07", name: "Narita Express (N'EX)", from: "Aeropuerto de Narita", to: "Estación de Shinagawa", type: "Línea JR", real: 19, jpy: 3330, coverage: "jr", jrPassCovered: true, suicaCategory: "partial", note: "Comprar al llegar a Narita en taquillas/máquinas JR. Billete reservado N'EX.", purchased: false, advance: false },
  { day: 1, date: "2026-09-07", name: "Shinkansen Nozomi 53", from: "Estación de Shinagawa", to: "Kioto", type: "Línea JR (Tren Bala)", real: 74.65, jpy: 13770, coverage: "jr", jrPassCovered: false, suicaCategory: "no", note: "✓ Comprado Smart EX (Ref: 2000) · ¥68.850 total · 373,27€ Revolut · 17:19→19:23 · Coche 13 · ⚠️ Nozomi NO incluido en JR Pass", purchased: true, advance: true },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Kioto", to: "Inari Station", type: "Línea JR Local", real: 1, jpy: 200, coverage: "jr", jrPassCovered: true, suicaCategory: "yes", purchased: false, advance: false },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Inari Station", to: "Nara", type: "Línea JR Local", real: 4.2, jpy: 680, coverage: "jr", jrPassCovered: true, suicaCategory: "yes", purchased: false, advance: false },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Nara", to: "Kioto", type: "Línea JR Local", real: 4.5, jpy: 720, coverage: "jr", jrPassCovered: true, suicaCategory: "yes", purchased: false, advance: false },
  { day: 3, date: "2026-09-09", name: "Bus y Metro", from: "Kioto", to: "Mercado Nishiki / Gion", type: "Operador Privado / Local", real: 4, jpy: 600, coverage: "no-jr", jrPassCovered: false, suicaCategory: "yes", purchased: false, advance: false },
  { day: 4, date: "2026-09-10", name: "Metro y Bus 205", from: "Kioto", to: "Kinkakuji", type: "Operador Privado / Local", real: 3, jpy: 500, coverage: "no-jr", jrPassCovered: false, suicaCategory: "yes", purchased: false, advance: false },
  { day: 4, date: "2026-09-10", name: "Tranvía Randen", from: "Ninna-ji", to: "Arashiyama", type: "Operador Privado", real: 1.5, jpy: 250, coverage: "no-jr", jrPassCovered: false, suicaCategory: "yes", purchased: false, advance: false },
  { day: 4, date: "2026-09-10", name: "Tren JR Línea San-In", from: "Arashiyama", to: "Kioto", type: "Línea JR Local", real: 1.5, jpy: 240, coverage: "jr", jrPassCovered: true, suicaCategory: "yes", purchased: false, advance: false },
  { day: 5, date: "2026-09-11", name: "Tren rápido JR (ida y vuelta)", from: "Kioto", to: "Osaka", type: "Línea JR Local", real: 7, jpy: 1160, coverage: "jr", jrPassCovered: true, suicaCategory: "yes", purchased: false, advance: false },
  { day: 6, date: "2026-09-12", name: "Thunderbird + Hokuriku Shinkansen", from: "Kioto", to: "Kanazawa", type: "Línea JR Exprés", real: 41.88, jpy: 7720, coverage: "jr", jrPassCovered: true, suicaCategory: "no", note: "✓ Comprado · Reserva 47932 · ¥38.600 total · 209,38€ Revolut · Retirar billetes físicos en Kyoto Station (día 11)", purchased: true, advance: true },
  { day: 7, date: "2026-09-13", name: "Nohi Bus Kanazawa → Shirakawa-go", from: "Kanazawa Sta.", to: "Shirakawa-go Bus Terminal", type: "Operador Privado (Bus)", real: 19.12, jpy: 3100, coverage: "no-jr", jrPassCovered: false, suicaCategory: "no", note: "✓ Reservado · Booking 12GO31991741 · Salida 08:40 · 5 asientos confirmados", purchased: true, advance: true },
  { day: 7, date: "2026-09-13", name: "Nohi Bus Shirakawa-go → Takayama", from: "Shirakawa-go Bus Terminal", to: "Takayama Nohi Bus Center", type: "Operador Privado (Bus)", real: 20.03, jpy: 3250, coverage: "no-jr", jrPassCovered: false, suicaCategory: "no", note: "✓ Reservado · Booking 12GO31992254 · Salida 13:15 · 5 asientos confirmados", purchased: true, advance: true },
  { day: 8, date: "2026-09-14", name: "Nohi Bus directo Takayama → Magome", from: "Takayama Nohi Bus Center", to: "Magome", type: "Operador Privado (Bus)", real: 27.12, jpy: 5000, coverage: "no-jr", jrPassCovered: false, suicaCategory: "no", note: "✓ Comprado · Booking 08302008262 · ¥25.000 total · 135,61€ Revolut · 08:00→10:45 · Car 01 · Canje E-ticket en taquilla", purchased: true, advance: true },
  { day: 9, date: "2026-09-15", name: "Bus local Magome → Nakatsugawa", from: "Magome", to: "Nakatsugawa", type: "Operador Privado (Bus)", real: 4.34, jpy: 800, coverage: "no-jr", jrPassCovered: false, suicaCategory: "no", note: "Salida 08:15 → Llegada 08:40 · ¥800/persona (~4,34€) · Sin reserva (pago en efectivo al bajar)", purchased: false, advance: false },
  { day: 9, date: "2026-09-15", name: "JR Limited Express Shinano 4", from: "Nakatsugawa", to: "Nagoya", type: "Línea JR Exprés", real: 15.57, jpy: 2870, coverage: "jr", jrPassCovered: true, suicaCategory: "partial", note: "09:57 → 10:53 · ✅ JR-WEST nº 42093 · ¥14.350 total · 77,84€ Revolut · Car 4 · 🎫 Recoger billetes físicos antes de subir", purchased: true, advance: false },
  { day: 9, date: "2026-09-15", name: "Shinkansen Nozomi 358", from: "Nagoya", to: "Tokio", type: "Línea JR (Tren Bala)", real: 59.12, jpy: 10900, coverage: "jr", jrPassCovered: false, suicaCategory: "no", note: "11:29 → 13:06 · ✅ Smart EX nº 2002 · ¥54.500 total · 295,62€ Revolut · Car 12 · QR-Ticket · ⚠️ Nozomi NO incluido en JR Pass", purchased: true, advance: false },
  { day: 10, date: "2026-09-16", name: "Tren elevado Yurikamome", from: "Tokio", to: "Isla de Odaiba", type: "Operador Privado", real: 2, jpy: 330, coverage: "no-jr", jrPassCovered: false, suicaCategory: "yes", purchased: false, advance: false },
  { day: "10-14", date: "16-20 sept", name: "Metro y trenes locales (5 días)", from: "Tokio", to: "Tokio (varios)", type: "Operador Privado / Local", real: 25, jpy: 4000, coverage: "no-jr", jrPassCovered: false, suicaCategory: "yes", purchased: false, advance: false },
  { day: 14, date: "2026-09-20", name: "Shinkansen ida y vuelta (Excursión Fuji)", from: "Tokio", to: "Mishima / Shin-Fuji", type: "Línea JR (Tren Bala)", real: 62, jpy: 9000, coverage: "jr", jrPassCovered: true, suicaCategory: "no", note: "Estimado · Kodama 805 ida 07:27 (salida hotel ~06:30) y regreso Shin-Fuji · pendiente de comprar", purchased: false, advance: true },
  { day: 15, date: "2026-09-21", name: "Keisei Skyliner (o N'EX)", from: "Keisei-Ueno (o Tokio)", to: "Aeropuerto de Narita", type: "Línea Keisei / JR", real: 17, jpy: 2570, coverage: "no-jr", jrPassCovered: false, suicaCategory: "partial", note: "Recomendado: Skyliner desde Keisei-Ueno (con taxi hotel→Ueno para 5). Alternativa: N'EX desde Tokyo Station.", purchased: false, advance: true },
];

// Presupuesto estimado para 5 personas
export const budget = {
  people: 5,
  note: "Vuelos, hoteles y billetes largos confirmados (Revolut). Excursiones Fuji + estimados urbanos pendientes. JR Pass no compensa (ver análisis abajo).",
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
        "Magome Chaya (14–15 sept, 1 noche, con cena sin desayuno): 178,98€ grupo · 35,80€/persona.",
        "KOKO HOTEL Residence Asakusa Kappabashi (15–21 sept, 6 noches): 1.952,50€ grupo · 390,50€/persona.",
      ],
    },
    {
      title: "Transporte nacional",
      perPerson: "~414€",
      total: "~2.068€",
      details: [
        "<strong>Ya comprado ≈ 1.287€ grupo (~257€/persona)</strong> — Nozomi 53 373,27€ · Thunderbird/Kagayaki 209,38€ · Nohi Magome 135,61€ · Shinano 4 77,84€ · Nozomi 358 295,62€ · Nohi día 7 (Kanazawa↔Shirakawa↔Takayama) ≈ 196€.",
        "Pendiente estimado ≈ 156€/persona: N'EX llegada, locales JR, metro Tokio, Shinkansen Fuji (Kodama), Skyliner/N'EX vuelta.",
        "Total transporte est. ≈ 414€/persona · ~2.068€ grupo. Conversión Revolut ~184 ¥/€.",
        "Japan Rail Pass Ordinary (jrpass.com): 284€ / 455€ / 568€ (7/14/21 días) — <strong>no compensa</strong> (análisis abajo).",
      ],
    },
    {
      title: "Excursiones Monte Fuji",
      perPerson: "~70€ – 112€",
      total: "~350€ – 560€",
      details: [
        "<strong>Tour Ken Kaneshima (día 14, confirmado):</strong> 13.000 ¥ (~70€)/persona · ~350€ grupo (mini-van + entradas).",
        "<strong>GetYourGuide (días 10–13, 4 fechas reservadas):</strong> 210€ grupo / 42€/persona por el día que se use. Cancelación gratuita 24h antes del resto (reembolso 100%). Cobro programado ~13 sept.",
        "Si el cielo está bien un día 10–13 se puede hacer GYG y cancelar el resto; el tour con Ken del día 14 es independiente. Shinkansen Fuji va en Transporte.",
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
      title: "Seguro, eSIM y extras",
      perPerson: "~200€",
      total: "~1.000€",
      details: [
        "Seguro Heymondo Japón: 273,60€ (4 personas · Revolut).",
        "E-SIM Holafly: 164,88€ (4 personas · Revolut).",
        "Entradas (templos, TeamLab, miradores), Takkyubin Kioto→Tokio y extras varios ~150€/persona orientativo.",
      ],
    },
  ],
  totalPerPerson: "~2.750€ – 2.900€ (vuelos incluidos)",
  totalGroup: "~13.750€ – 14.500€ (5 personas)",
};
