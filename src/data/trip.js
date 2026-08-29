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
        text: "Esta aplicación web ha sido diseñada con un propósito claro: <strong>no depender de internet durante el viaje</strong>. Cuando estás en Japón, la conexión puede fallar en trenes bala, zonas rurales o si hay problemas con la eSIM. Por eso, se ha optado por una arquitectura de <strong>Single Source of Truth (SSOT)</strong> en el lado del cliente, en lugar de usar una base de datos en la nube."
      },
      {
        icon: "⚡",
        title: "Arquitectura PWA y Rendimiento",
        text: "Todo el itinerario, vuelos, alojamientos y traducciones viven en la propia app (<code>trip.js</code>), empaquetada como una <strong>PWA (Progressive Web App)</strong> con Vite. El navegador descarga todo en caché mediante Service Workers en la primera visita, asegurando latencia cero al navegar o cambiar de idioma."
      },
      {
        icon: "🎨",
        title: "React, Tailwind & Framer Motion",
        text: "El ecosistema de React nos permite usar componentes modulares, facilitando un diseño estricto Mobile-First estilizado con TailwindCSS y animaciones fluidas con Framer Motion, garantizando una experiencia nativa."
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
        note: "A partir de marzo de 2026, Kioto aplica una nueva tasa turística. Para alojamientos de menos de ¥6.000 por persona/noche, el impuesto está EXENTO. Si supera los ¥6.000, será de ¥400 por persona/noche. A pagar en el hotel. No incluye comidas.",
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
      "Aterrizaje en el aeropuerto de Narita, trámites de aduana con el código QR de Visit Japan Web y recogida de equipajes. Traslado en tren Narita Express hasta Shinagawa y conexión en tren bala Shinkansen Nozomi directo hasta Kioto para hacer el check-in en el hotel. Terminaremos la jornada con una primera toma de contacto con la ciudad, cenando algo rápido por los alrededores de la estación.",
    history:
      "Kioto fue la capital imperial de Japón durante más de mil años, desde 794 hasta 1868. Es el corazón cultural y espiritual del país. Al haber sobrevivido casi intacta a los bombardeos de la Segunda Guerra Mundial, conserva gran parte de su milenaria arquitectura tradicional de madera.",
    schedule: [
      { time: "🍜 COMER EN JAPÓN", text: "Consejos prácticos: Desayuno habitual: aproximadamente 07:00–09:00. Comida: aproximadamente 11:30–14:00. Cena: aproximadamente 17:30–21:00. Muchos restaurantes pequeños cierran entre comida y cena. En días con salida muy temprana, comprar desayuno la noche anterior en un konbini. En excursiones con horarios ajustados, llevar un onigiri/sandwich de emergencia. Los konbini (7-Eleven, Lawson, FamilyMart) son una opción práctica y barata para onigiri, sandwiches, bentos, fruta, yogur, karaage y bebidas. Una comida sencilla de ramen/udon/donburi puede costar aproximadamente ¥500–1.500. No reservar normalmente para ramen, udon, donburi, comida rápida japonesa, izakaya informal o puestos de comida. Reservar solo restaurantes especiales/populares cuando realmente queramos cenar allí. En mercados y zonas de comida callejera, respetar las normas locales sobre dónde comer. En Japón no es habitual comer caminando por calles comerciales; en Nishiki Market está expresamente desaconsejado." },
      { time: "12:55", text: "1. LLEGADA A NARITA\\nAterrizaje en Narita.\\n\\nHay que realizar inmigración, recogida de equipaje facturado, aduanas, y salida a la zona pública del aeropuerto.\\nRecuerda tener preparado el código QR de Visit Japan Web de los 5 viajeros para agilizar los trámites.\\n\\n💡 Consejo: El tiempo real de salida del aeropuerto puede variar bastante según inmigración, equipaje y aduanas. Por eso NO tenemos comprado de antemano el Narita Express." },
      { time: "~14:45", text: "2. NARITA → SHINAGAWA (N'EX)\\n🚂 NARITA EXPRESS (N'EX) — ⏳ PENDIENTE / COMPRAR EN NARITA\\n\\nTrayecto: Narita Airport → Shinagawa\\n(El horario de las ~14:45 es solo un objetivo orientativo).\\n\\nAl salir de aduanas, seguir las indicaciones de JR / Narita Express. Comprar el billete en las máquinas de JR o en una oficina/taquilla JR del aeropuerto.\\n\\nIMPORTANTE:\\n- NO es metro. Es un tren JR de larga distancia.\\n- Se toma en la estación JR del aeropuerto.\\n- El billete NO está comprado todavía.\\n- NO queremos fijar obligatoriamente un tren concreto antes de volar porque el vuelo puede retrasarse.\\n- Lo compraremos EN EL PROPIO AEROPUERTO DE NARITA cuando tengamos una estimación realista de tiempo.\\n- Para este trayecto se necesita billete de N'EX. No utilizar Smart EX.\\n- Somos 5 personas: comprar los 5 billetes juntos y pedir asientos juntos si es posible.\\n\\nNota: Si el vuelo se retrasa, NO perdemos ningún billete de N'EX porque todavía no lo hemos comprado. Simplemente compraremos el siguiente N'EX que nos permita llegar a tiempo a Shinagawa." },
      { time: "~15:55–16:10", text: "Llegada orientativa a Shinagawa en N'EX, dependiendo del tren de Narita que consigamos.\\n\\nObjetivo: estar ya dentro de Shinagawa con tiempo suficiente para localizar las vías del Shinkansen, ir al baño y comprar comida/bebida si hace falta." },
      { time: "17:19", text: "3. SHINAGAWA → KYOTO (NOZOMI 53)\\n🚄 NOZOMI 53 — ✅ RESERVADO / COMPRADO\\n\\nSalida: 17:19 | Llegada: 19:23\\nPasajeros: 5 adultos\\nTren: NOZOMI 53 (Serie N700, 16 coches)\\nCoche: 13 | Asientos: 13C, 13D, 13E, 14D, 14E\\nReserva Smart EX: Número de reserva 2000\\nPrecio total: ¥68.850 (¥13.770/persona)\\nTarifa: smart EX Ordinary\\n\\n⚠️ Este billete YA está comprado y confirmado. No hay que volver a comprarlo.\\n\\n🗻 VENTANAS PARA INTENTAR VER EL MONTE FUJI\\nLos asientos 13E y 14E son las dos ventanas reservadas del grupo. El objetivo es intentar ver el Monte Fuji durante el trayecto. El Fuji se observa desde el lado E en este sentido de viaje. La visibilidad depende de la meteorología y de las nubes, así que no está garantizado." },
      { time: "🧳 EQUIPAJE", text: "Viajamos con maletas grandes de facturación, pero no especialmente gigantes. La reserva de equipaje oversized solo es necesaria si una pieza supera los 160 cm sumando alto + ancho + fondo. (Ejemplo: 75 + 50 + 30 = 155 cm → no oversized). No hace falta reservar espacio oversized para una maleta normal que no supere los 160 cm." },
      { time: "⚠️ PLAN SI EL VUELO SE RETRASA", text: "1. El N'EX NO está reservado previamente.\\n2. Al llegar a Narita compramos el siguiente N'EX disponible que nos permita llegar a Shinagawa.\\n3. El Shinkansen NOZOMI 53 sí está reservado para las 17:19.\\n4. Debemos intentar llegar a Shinagawa con margen suficiente.\\n5. Si el N'EX se retrasa y existe riesgo real de no llegar a tiempo al NOZOMI 53, debemos intentar modificar la reserva del Shinkansen desde Smart EX / My Trips ANTES de que salga el tren, seleccionando otro Nozomi disponible.\\n6. No asumir que podemos simplemente subirnos a otro Nozomi con el mismo billete: si perdemos el tren reservado, primero hay que gestionar el cambio de reserva según las condiciones de Smart EX.\\n7. Si el vuelo llega con normalidad, el plan previsto es comprar el N'EX y dirigirse a Shinagawa con margen para el NOZOMI 53 de las 17:19." },
      { time: "~19:00", text: "Llegada a la estación de Kioto (JR Kyoto Station). Salimos por la salida Hachijo East Exit (八条東口). Desde ahí son solo unos 5 minutos andando hasta nuestro hotel (Hotel Keihan Kyoto Hachijoguchi)." },
      { time: "🍜 CENA EN KYOTO STATION", text: "🍣 19:00–20:30 — CENA: KAITEN-SUSHI UOGASHI. Restaurante recomendado en AEON MALL KYOTO — Sakura Building, 4F. A unos 5 min andando desde Kyoto Station Hachijo Exit (muy cómodo tras llegar en Shinkansen). Kaiten-zushi (sushi en cinta transportadora). Precio orientativo: ¥2.000–3.000/persona. Horario: 11:00–22:00 (último pedido aprox 21:30). No es necesario reservar. Qué probar: sushi variado; piezas de pescado fresco; nigiri; platos especiales del día; algún acompañamiento caliente. 💡 Tip: La hora real de la cena dependerá de la llegada a Kyoto y del traslado al hotel." },
      { time: "🍙 PREPARACIÓN DESAYUNO DÍA 2", text: "⚠️ Comprar esta noche el desayuno del Día 2 en un konbini porque la salida es demasiado temprana para desayunar tranquilamente en el hotel. Recomendación: 1–2 onigiri por persona; sandwich de huevo; banana/fruta; café o bebida; yogur opcional." },
      { time: "📊 RESUMEN: QUÉ ESTÁ COMPRADO / QUÉ FALTA", text: "✅ COMPRADO\\n- Shinkansen NOZOMI 53 Shinagawa → Kyoto (17:19 → 19:23)\\n- 5 personas\\n- Coche 13, Asientos 13C, 13D, 13E, 14D, 14E\\n- Smart EX (Reserva 2000)\\n\\n⏳ PENDIENTE\\n- Narita Express (N'EX) Narita → Shinagawa\\n- Comprar en Narita después de aterrizar\\n- Elegir el siguiente tren adecuado según la hora real de salida del aeropuerto.\\n\\nNO compres el N'EX con una hora fija con demasiada antelación: el vuelo puede retrasarse." }
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
      { time: "07:00", text: "Despertar. 🍙 Desayuno para llevar comprado la noche anterior. Comer antes de llegar a Fushimi Inari o durante el trayecto." },
      { time: "07:45–08:00", text: "🚆 JR Nara Line: Kyoto Station → Inari Station (~5 min). Sin reserva. Utilizar IC card o comprar billete sencillo en la estación. Inari Station está justo al lado de Fushimi Inari." },
      { time: "08:00–10:15", text: "Santuario Fushimi Inari. 💡 Consejo: llegar temprano es especialmente recomendable para evitar las mayores aglomeraciones. No es necesario subir hasta la cima del Monte Inari; si el tiempo o el cansancio aprietan, hacer una subida parcial y regresar." },
      { time: "10:20–10:30", text: "🚆 JR Nara Line: Inari → Nara. Tren directo hacia Nara, sin transbordo, aproximadamente 50–55 min. No requiere reserva. En Inari, comprobar que el servicio elegido para en Inari y continúa hacia Nara." },
      { time: "Transporte", text: "🚌 ****Desde JR Nara Station → Tōdai-ji:**\n**\n Bus local de Nara Kotsu hasta la zona de Tōdai-ji Daibutsuden/Kasuga Taisha-mae y después unos minutos andando. \n\n**\n**Alternativa:** ** taxi desde JR Nara Station si vamos justos de tiempo. También es posible ir andando, pero requiere más tiempo. No reservar por adelantado." },
      { time: "11:30–12:30", text: "🏯 Visita del Daibutsuden y del Gran Buda. La visita al interior del Gran Buda es la parte principal; después podemos recorrer brevemente el recinto. No reservar entrada anticipadamente." },
      { time: "12:30–14:00", text: "🦌 Parque de Nara y ciervos. 🦌 Si compramos shika senbei para los ciervos, darles las galletas y enseñar las manos vacías cuando se terminen: algunos ciervos pueden ponerse bastante insistentes si creen que todavía tenemos comida." },
      { time: "14:00–15:00", text: "🍜 Comida en Nara." },
      { time: "15:00–15:45", text: "Paseo tranquilo por Nara. Nigatsu-do opcional si vamos bien de tiempo." },
      { time: "15:45–16:15", text: "🚆 JR Nara → Kyoto. Coger el siguiente servicio conveniente hacia Kyoto. No requiere reserva. Utilizar IC card o comprar billete sencillo. Si hay un Miyakoji Rapid conveniente, puede utilizarse para reducir el tiempo de viaje." },
      { time: "17:00–18:30", text: "🌇 Paseo por Pontocho, Kamogawa, Miyagawacho y Gion. El atardecer será aproximadamente sobre las 18:15, por lo que esta franja permite disfrutar también de la hora azul. Yasaka Jinja puede visitarse opcionalmente si vamos bien de tiempo. 🚶 Una vez en la zona de Gion/Pontocho, hacer el recorrido principalmente a pie. Esta es una buena noche para cenar por Pontocho/Gion. Categorías recomendadas: gyukatsu; yakitori; ramen; izakaya; okonomiyaki. Opción concreta: GYUKATSU Kyoto Katsugyu Pontocho Honten: gyukatsu, aproximadamente ¥2.000–6.000, abierto hasta aproximadamente 22:30." },
      { time: "🎫", text: "****RESERVAS:**\n**\nno es necesario reservar por adelantado ninguno de los trenes de este día. Todos los trayectos ferroviarios del día son servicios regionales/locales. Se pueden pagar sobre la marcha con IC card o mediante billete sencillo comprado en las máquinas de la estación. No tenemos Japan Rail Pass y no es necesario para este día." }
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
      { time: "08:00–08:30", text: "🚌 Salida hacia Ginkaku-ji. ****Desde el Hotel Keihan Kyoto Hachijoguchi caminar hasta Kyoto Station. Tomar el Kyoto City Bus nº 5 o nº 7 con destino hacia Ginkaku-ji y bajar en Ginkakuji-michi. Duración aproximada:**\n**\n 35–45 min puerta a puerta, dependiendo del tráfico. Alternativa si el tráfico es malo: usar metro + bus según Google Maps/Navitime en ese momento. Pago: No reservar. Usar IC card. También se puede comprar billete sencillo." },
      { time: "08:30–10:00", text: "🩶 Ginkaku-ji (Pabellón de Plata). Horario oficial en septiembre: 08:30–17:00. Visitar: Pabellón de Plata, Jardines, Estanque, Camino elevado del jardín. No requiere reserva." },
      { time: "10:00–11:00", text: "🚶 Paseo de la Filosofía. Salir de Ginkaku-ji y recorrer andando hacia el sur siguiendo el canal. Es un tramo principalmente peatonal." },
      { time: "11:00–13:15", text: "⛩️ Eikando + Nanzen-ji. Primero Eikando y después Nanzen-ji. Eikando: Entrada aproximadamente ¥1.000. En temporada normal abre 09:00–17:00. No requiere reserva. Llevar una bolsa para los zapatos. Nanzen-ji: En septiembre abre 08:40–17:00. No requiere reserva. Si se quiere entrar en el Hojo Garden o subir a la Sanmon, pagar entrada allí. \n\n**\n**IMPORTANTE:**\n**\nNanzen-ji y Eikando están muy cerca y este orden mantiene el recorrido lógico hacia el sur." },
      { time: "13:15–13:45", text: "🚇 Nanzen-ji → centro de Kyoto. Caminar aproximadamente 10 min hasta Keage Station. Tomar Kyoto Subway Tozai Line: Keage → Karasuma Oike. ****Desde Karasuma Oike:**\n**\n caminar hacia Nishiki Market, aproximadamente 15 min; o continuar con la combinación de metro que resulte más conveniente. No reservar. Pagar con IC card." },
      { time: "13:45–16:00", text: "🍣 Mercado de Nishiki. Comida y recorrido por el mercado. Consejo: No intentar recorrer absolutamente todos los puestos. Elegir algunos productos/comidas y comer delante del propio establecimiento. \n\n**\n**IMPORTANTE:**\n**\nNo hacer \\\"tabearuki\\\" (comer mientras se camina). El propio mercado pide evitarlo. Nishiki no tiene una hora única de cierre: cada tienda tiene su propio horario. Muchas tiendas funcionan aproximadamente entre 09:00/10:00 y 17:00/18:00. 🍣 Comer aquí principalmente picando diferentes especialidades, no necesariamente haciendo una comida formal. Qué buscar: dashimaki tamago; yuba; tofu; tsukemono; fu; matcha; pescado/marisco preparado. NO comer caminando. Comprar → apartarse → comer delante del puesto o dentro del establecimiento.\n⚠️ IMPORTANTE: Hoy es miércoles 9 de septiembre. Nishiki Market NO cierra como mercado completo, pero muchos comercios individuales descansan los miércoles. Por ello, no depender exclusivamente de Nishiki para comer. Si hay demasiados puestos cerrados, buscar comida en Shijo/Teramachi/Kawaramachi, manteniendo el mismo recorrido general." },
      { time: "16:00–17:30", text: "🏮 Pontocho → Miyagawacho. Recorrido andando. No hace falta transporte." },
      { time: "17:30–19:00", text: "🏮 Gion. Recorrido: Hanamikoji, zona de Ichiriki, Shirakawa, Tatsumi Jinja. Mantener el recorrido a pie. Consejo: Respetar la privacidad de las geishas/maiko y no bloquear calles ni perseguirlas para hacer fotografías. Si queremos cenar en Gion/Pontocho, normalmente es mejor empezar entre 18:00 y 19:00. Para restaurantes kaiseki o muy populares, reservar con antelación; para opciones informales, mantener flexibilidad." },
      { time: "🎫 RESERVAS", text: "No es necesario reservar ningún transporte. No reservar: Bus, Metro, Entradas de Ginkaku-ji, Eikando, Nanzen-ji, Nishiki Market. Todos los transportes pueden pagarse sobre la marcha con IC card." }
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
      "Exploraremos el noroeste empezando por el brillante Pabellón Dorado y el sendero Kinukake no Michi. Al mediodía, un tranvía nos lleva a Arashiyama, priorizando la zona histórica superior antes de bajar por el famoso bosque de bambú.",
    history:
      "El Kinkakuji (Pabellón Dorado) fue la suntuosa villa de retiro del shogun Ashikaga Yoshimitsu a finales del siglo XIV. Arashiyama lleva siendo destino vacacional de la nobleza imperial desde el periodo Heian.",
    schedule: [
      { time: "07:30", text: "Despertar. 🍳 Desayuno en el hotel desde las 07:00 o desayuno ligero comprado previamente." },
      { time: "08:00–09:00", text: "🚇 Hotel → Kinkaku-ji. ****Desde el hotel caminar hasta Kyoto Station. Tomar Kyoto Subway Karasuma Line:**\n**\n Kyoto → Kitaoji. En Kitaoji: seguir las indicaciones hacia Kitaoji Bus Terminal; utilizar la zona azul; tomar bus nº 204 o 205 hacia Kinkaku-ji; bajar en Kinkakuji-michi. ****Desde Kinkakuji-michi:**\n**\n aprox. 5 min andando hasta la entrada. Esta combinación es preferible al bus 205 directo desde Kyoto Station porque evita parte del tráfico y las aglomeraciones. No reservar. Usar IC card." },
      { time: "09:00–10:15", text: "🏯 Kinkaku-ji (Pabellón Dorado). \n\n**\n**IMPORTANTE:**\n**\nLa hora anterior de 08:30 era incorrecta. Kinkaku-ji abre a las 09:00. Entrada: aprox. ¥500. No requiere reserva. Consejo: Intentar llegar justo a la apertura para disfrutar del recinto con menos gente." },
      { time: "10:15–12:15", text: "🚶 Sendero Kinukake no Michi. Recorrer en este orden: 1. Kinkaku-ji 2. Ryoan-ji 3. Ninna-ji" },
      { time: "10:15–11:00", text: "🏯 Ryoan-ji. ****Desde Kinkaku-ji caminar por Kinukake no Michi. Distancia aproximada:**\n**\n 1,5 km / 20 min. Ryoan-ji abre en septiembre 08:00–17:00. Entrada: aprox. ¥600. No requiere reserva. Visitar especialmente: jardín de piedras; Hojo; jardín." },
      { time: "11:00–12:15", text: "🏯 Ninna-ji. Continuar andando desde Ryoan-ji hacia Ninna-ji. Distancia aproximada: 10–15 min. Ninna-ji abre en septiembre 09:00–17:00. La entrada a las zonas especiales puede tener coste adicional. No requiere reserva." },
      { time: "12:15–12:40", text: "🚋 Ninna-ji → Arashiyama. Caminar hasta Omuro-Ninnaji Station. Tomar Randen Kitano Line hacia Katabiranotsuji. En Katabiranotsuji hacer transbordo a la Randen Arashiyama Line hacia Arashiyama. Bajar en Arashiyama Station. Duración aproximada total: 20–25 min. \n\n**\n**IMPORTANTE:**\n**\nRanden NO es un tren JR. No necesita Japan Rail Pass. Tarifa actual de Randen: ¥250 por adulto por trayecto. Se puede pagar con IC card. Al subir NO hay que tocar la IC card. Se paga al bajar/en la estación según corresponda. No reservar." },
      { time: "12:40–13:20", text: "🍜 Comida rápida en Arashiyama. Mantener comida rápida para no comprometer la parte de Otagi.\n⚠️ No retrasar demasiado la comida. En Arashiyama muchos restaurantes tienen último pedido alrededor de las 14:00 y algunos cierran la cocina por la tarde. Qué comer: udon; soba; tempura; donburi; curry; onigiri/bento si vamos con prisa. Si vemos que vamos justos de tiempo, comprar onigiri/sandwich/bento en la zona de Arashiyama y continuar. Es preferible esto a perder tiempo esperando mesa." },
      { time: "13:20–13:50", text: "🚌 Arashiyama → Otagi Nenbutsu-ji. \n\n**\n**IMPORTANTE:**\n**\nNO hacer toda la subida andando desde Arashiyama. La propia web de Otagi recomienda llegar en taxi o bus y realizar después el recorrido cuesta abajo. Opción recomendada: Kyoto Bus nº 94 hacia Kiyotaki. Subir en una parada de la zona de Arashiyama y bajar en Otagidera-mae. Duración aproximada: 20–25 min. \n\n**\n**Alternativa:** ** Taxi desde la zona de Arashiyama. El taxi es más caro pero puede ahorrar tiempo si vamos justos. No reservar el bus." },
      { time: "13:50–14:45", text: "🏯 Otagi Nenbutsu-ji. \n\n**\n**IMPORTANTE:**\n**\nAhora se visita el jueves 10 de septiembre. Horario: 09:00–16:00. Está cerrado los miércoles y sábados, por lo que el cambio de día soluciona el problema. Entrada: ¥1.000. No requiere reserva. Visitar especialmente las aproximadamente 1.200 estatuas de rakan." },
      { time: "14:45–15:30", text: "🚶 Saga-Toriimoto. ****Desde Otagi comenzar el descenso andando. Recorrer la zona histórica de Saga-Toriimoto. \n\n**\n**IMPORTANTE:**\n**\n**\n**\nEste sentido del recorrido es deliberado: Otagi → Saga-Toriimoto → bosque de bambú → centro de Arashiyama. Es el sentido recomendado por el propio templo." },
      { time: "15:30–17:00", text: "🎋 Bosque de bambú de Arashiyama. Bajar andando hacia el centro atravesando el bosque de bambú. Consejo: No esperar encontrar el bosque completamente vacío. Es una zona muy concurrida. El tramo desde Saga-Toriimoto hacia el bosque permite disfrutar de una transición progresiva desde la zona rural/histórica hasta el Arashiyama más turístico. 🍵 Snack opcional después del bosque de bambú: matcha; dango; taiyaki; helado; melon pan." },
      { time: "17:00", text: "🚆 Regreso a Kyoto. Caminar hasta JR Saga-Arashiyama Station. Tomar JR Sagano/San-in Line: Saga-Arashiyama → Kyoto. Trayecto directo, aproximadamente 15–20 min. No reservar. Usar IC card o billete sencillo. \n\n**\n**IMPORTANTE:**\n**\nEste tren sí es JR, pero NO requiere Japan Rail Pass. Se puede pagar normalmente con IC card. Esta noche puede ser buena para una cena tranquila cerca de Kyoto Station o Pontocho, según energía." },
      { time: "🎫 RESERVAS", text: "NO reservar ningún transporte de este día. No reservar: Metro, Bus 204/205, Randen, Kyoto Bus nº 94, JR Saga-Arashiyama → Kyoto. Tampoco es necesario reservar: Kinkaku-ji, Ryoan-ji, Ninna-ji, Otagi Nenbutsu-ji. Comprar las entradas directamente en cada recinto. JAPAN RAIL PASS: No tenemos Japan Rail Pass. NO modificar el itinerario por este motivo. Los transportes de este día pueden utilizarse y pagarse individualmente. IC card: Kyoto Subway, Kyoto City Bus, Randen, Kyoto Bus, JR local." }
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
      { time: "07:30", text: "Despertar. 🍳 Desayuno en el hotel a las 07:00. Kiyomizu-dera abre muy temprano, por lo que no conviene retrasar la salida." },
      { time: "08:00–08:30", text: "🚍 HOTEL → KIYOMIZU-DERA. ****Desde el Hotel Keihan Kyoto Hachijoguchi caminar hasta Kyoto Station. Opción principal:**\n**\n Kyoto City Bus 100 o 206 desde Kyoto Station. Bajar en Gojozaka. Caminar aproximadamente 10 min hasta Kiyomizu-dera. \n\n**\n**Alternativa:** ** Utilizar el nuevo Kiyomizu-dera Line de Okoshi Bus, disponible los días laborables desde julio de 2026, si el horario del momento resulta conveniente. No reservar. Pagar con IC card o billete correspondiente. Los buses de Higashiyama pueden sufrir congestión. Salir con margen." },
      { time: "08:30–10:30", text: "🏯 KIYOMIZU-DERA. Abre a las 06:00 y el 11 de septiembre cierra a las 18:00. Visitar: Main Hall / escenario de Kiyomizu, Otowa-no-taki, Pagoda y alrededores, Calles de Kiyomizu-zaka al salir. No requiere reserva. 💡 Tip: Kiyomizu-dera a primera hora es una buena elección para evitar aglomeraciones." },
      { time: "10:30–12:30", text: "🚶 HIGASHIYAMA → YASAKA → MARUYAMA → CHION-IN. Hacer todo el recorrido andando: Kiyomizu-dera → Ninenzaka/Sannenzaka → Yasaka Jinja → Maruyama Park → Chion-in. 💡 Tip: Esta zona se disfruta mejor caminando y conviene no intentar seguir una ruta demasiado rígida por las callejuelas. No intentar hacerlo todo en Higashiyama deprisa: el atractivo está precisamente en las calles y pequeñas tiendas entre templos." },
      { time: "12:30", text: "⛩️ CHION-IN. Visitar el recinto y la Sanmon. El recinto abre desde las 06:00; las visitas/recepciones de las zonas interiores empiezan a las 09:00. Si se quiere visitar alguno de los jardines interiores, comprobar su apertura y comprar la entrada allí. No reservar." },
      { time: "12:30–13:00", text: "🚶 CHION-IN → HEIAN JINGU. Continuar andando hacia Heian Jingu." },
      { time: "13:00–13:30", text: "⛩️ HEIAN JINGU. Visitar el santuario y su gran torii. El recinto abre desde las 06:00. Si se quiere visitar el jardín (Shin-en), su horario el 11 de septiembre es aproximadamente 08:30–18:00, última entrada 17:30. No requiere reserva." },
      { time: "13:30–14:15", text: "🍜 COMIDA EN KYOTO. \n\n**\n**IMPORTANTE:**\n**\nIntentar terminar aproximadamente sobre las 14:15 para conservar margen para el tren a Osaka.\n⚠️ Esta comida debe ser rápida. Tenemos el tren hacia Osaka a las 14:30. Recomendación: comer cerca del camino hacia Kyoto Station; ramen; udon/soba; curry; donburi; teishoku rápido. No reservar restaurante para esta comida. \n\n**\n**Alternativa:** ** Comprar bento/ekiben en Kyoto Station si vamos justos." },
      { time: "14:15–14:30", text: "🚶 Traslado a Kyoto Station." },
      { time: "14:30", text: "🚆 KYOTO → OSAKA. Tomar JR Kyoto Line desde Kyoto Station hasta Osaka Station. Preferir un Special Rapid (新快速) si hay uno conveniente. Trayecto aproximadamente 30 min. Sin reserva. No necesita JR Pass. Pagar con IC card o billete sencillo." },
      { time: "~15:00", text: "🚆 OSAKA STATION → MORINOMIYA. Desde Osaka Station tomar JR Osaka Loop Line hacia Morinomiya. No reservar. Pagar con IC card." },
      { time: "~15:15–15:30", text: "🚶 MORINOMIYA → OSAKA CASTLE. Caminar por Osaka Castle Park hasta el castillo. Calcular aproximadamente 15–20 min." },
      { time: "15:30–18:00", text: "🏯 OSAKA CASTLE. \n\n**\n**IMPORTANTE:**\n**\nEl Museo del Castillo de Osaka abre 09:00–18:00, última entrada 17:30. ENTRAR AL INTERIOR DEL CASTILLO: Mantener como visita principal el museo de la torre y el mirador. Entrada: ¥1.200 adulto. No es necesario reservar anticipadamente para este día. Comprar la entrada en el propio castillo. Se puede pagar con efectivo, tarjeta e IC card. 💡 Tip: En Osaka Castle, reservar aproximadamente 1,5–2 h para museo + mirador + exteriores." },
      { time: "18:00–18:30", text: "🚇 OSAKA CASTLE → DOTONBORI. Desde Morinomiya utilizar Osaka Metro hacia la zona de Namba/Dotonbori. No reservar. Utilizar IC card." },
      { time: "18:30–21:15", text: "🌃 DOTONBORI + SHINSEKAI. Paseo nocturno y comida callejera. Priorizar: Dotonbori, Glico, Ebisu Bridge, Hozenji Yokocho. Si queda tiempo y energía, continuar hacia Shinsekai. 💡 Tips: En Dotonbori no hace falta reservar para probar comida callejera; elegir puestos/restaurantes sobre la marcha. Dotonbori es especialmente interesante después de anochecer, por lo que mantener la llegada sobre las 18:30 es buena idea. 🍜 Osaka Food Crawl — qué probar: 1. Takoyaki 🐙 (Compartir una ración. Opción: Takoyaki Wanaka Dotonbori. Presupuesto aprox: ¥500–1.000). 2. Okonomiyaki (Compartir o pedir uno por persona según hambre. Opción: CHIBO Dotonbori. Presupuesto aprox: ¥2.000–3.000 por persona). 3. Kushikatsu (Si llegamos a Shinsekai. Probar varias brochetas. Es una de las especialidades históricas de la zona). 4. Hozenji Yokocho (Buena alternativa para salir del tramo más turístico de Dotonbori. Buscar un izakaya pequeño o restaurante local).\n⚠️ No entrar automáticamente en el restaurante con el cartel más grande de Dotonbori. La zona principal es muy turística y algunos locales cobran más por ubicación. Entre aproximadamente 18:00 y 22:00 Dotonbori se llena mucho. Mantener juntos al grupo de 5 personas y tener un punto de encuentro claro. 💴 Presupuesto gastronómico Osaka: Para una noche de food crawl sencilla en Dotonbori/Shinsekai, calcular aproximadamente ¥2.500–4.000 por persona si combinamos takoyaki + okonomiyaki/kushikatsu + bebida, aunque depende de cuánto comamos." },
      { time: "~21:15–21:30", text: "🚆 OSAKA → KYOTO. Regreso a Kyoto mediante JR. No reservar. Utilizar IC card o billete sencillo." },
      { time: "🎫 RESERVAS DEL DÍA", text: "NO reservar ningún transporte.\nNO utilizar SmartEX.\nNO utilizar JR-WEST Online.\nNo necesitamos Japan Rail Pass.\nTodos los trayectos pueden pagarse individualmente con IC card.\nRESUMEN DE TRANSPORTE: Hotel → Kiyomizu: Bus 100/206 o Kiyomizu-dera Line → IC card/billete.\nKiyomizu → Yasaka → Maruyama → Chion-in → Heian: A pie.\nHeian → Kyoto Station: A pie + transporte urbano si fuera necesario.\nKyoto → Osaka: JR Kyoto Line Special Rapid → IC card/billete.\nOsaka → Morinomiya: JR Osaka Loop Line → IC card/billete.\nMorinomiya → Osaka Castle: A pie.\nOsaka Castle → Dotonbori: Osaka Metro → IC card.\nDotonbori → Kyoto: JR/metro según ubicación → IC card/billete." },
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
      "Despacharemos el equipaje grande a Tokio y viajaremos ligeros hacia la costa del Mar de Japón. Día en Kanazawa: Kenroku-en (uno de los mejores jardines del país), marisco y antiguos barrios samuráis.",
    history:
      "Kanazawa fue el dominio del poderoso clan Maeda durante el periodo Edo, rivalizando con Kioto en riqueza y cultura. Al esquivar los bombardeos modernos, conserva su trazado urbano feudal.",
    schedule: [
      { time: "07:30", text: "🧳 Despertar y envío de maletas. El Hotel Keihan Kyoto Hachijoguchi dispone de servicio de envío de equipaje. Enviar la maleta grande directamente al hotel de Tokyo y viajar con mochila/equipaje pequeño.\n⚠️ Confirmar en recepción el día del envío la fecha prevista de entrega en el hotel de Tokyo. No dar por hecho que llegará al día siguiente. Preparar en la mochila todo lo necesario para los días intermedios hasta recuperar la maleta. 🍳 Desayuno: Desayunar en el Hotel Keihan Kyoto Hachijoguchi si está incluido, o comprar algo sencillo la noche anterior si necesitamos salir con máxima rapidez. (Nota: El Hotel Resol Trinity Kanazawa ofrece desayuno buffet 07:00–10:00, pero como llegamos ese mismo día a Kanazawa no aplica para esta mañana)." },
      { time: "08:10 aprox.", text: "🚆 KYOTO → TSURUGA → KANAZAWA. Hotel Keihan Kyoto Hachijoguchi → Kyoto Station: aproximadamente 5 minutos andando hasta Hachijo East Exit. Salir con margen suficiente para estar en el andén unos 10–15 minutos antes. 1. Limited Express THUNDERBIRD: Kyoto Station → Tsuruga Station. Aproximadamente 50–55 min. Asiento reservado obligatorio. No hay vagones de asiento no reservado. 2. En Tsuruga: Hacer transbordo al Hokuriku Shinkansen. Seguir las señales de conexión Thunderbird → Shinkansen. No salir de la estación innecesariamente. El transbordo está diseñado específicamente para conectar Thunderbird con Hokuriku Shinkansen. 3. Hokuriku Shinkansen Tsurugi: Tsuruga → Kanazawa. Aproximadamente 40 min. Duración total aproximada: 1h40–2h." },
      { time: "11:00–12:15", text: "🌳 JARDÍN KENROKU-EN. Abierto todos los días. Horario en septiembre: 07:00–18:00. Entrada aproximada: ¥320. No requiere reserva. Qué buscar: Kasumigaike Pond, Kotoji-toro, Karasaki Pine, Uchihashi-tei, vistas del jardín y sus distintos niveles. 💡 Tip: Kenroku-en es grande; no intentar verlo absolutamente todo. Hacer una ruta circular por los puntos principales." },
      { time: "12:15–13:30 aprox.", text: "🏯 NAGAMACHI SAMURAI DISTRICT. Paseo por: calles de muros de tierra; canales; antiguas residencias samurái. El barrio es residencial y se puede recorrer gratuitamente caminando. Si queremos entrar en una residencia, priorizar Nomura-ke: Abierta 08:30–17:30 en septiembre. Entrada ¥550. No requiere reserva. Jardín interior especialmente interesante." },
      { time: "13:30/14:00–15:30", text: "🍣 COMIDA EN OMICHO MARKET. Uno de los grandes mercados gastronómicos de Kanazawa, famoso por el pescado y marisco fresco del Mar de Japón. Priorizar: kaisendon; sushi; amaebi (gamba dulce); nodoguro; pescado local; productos frescos de Ishikawa. Septiembre no es la temporada principal del cangrejo y la buri/seriola; el mercado destaca especialmente estos productos alrededor de noviembre. No hacer del cangrejo el objetivo principal de esta comida. 💡 Tip: Muchos restaurantes/puestos empiezan a cerrar por la tarde. No retrasar demasiado la comida. En foros recientes viajeros recomiendan explorar también Omicho Ichibakan y su segunda planta, donde hay pequeños restaurantes locales. Presupuesto orientativo: comida sencilla: ¥1.000–2.000; kaisendon/sushi más completo: ¥2.000–4.000+. No hacer reserva obligatoria para la comida." },
      { time: "16:30–18:00", text: "🏮 HIGASHI CHAYA DISTRICT. Pasear por las calles históricas y las casas de té. Opcional: SHIMA — antigua casa de té, abierta 09:30–17:30 en septiembre. Entrada: ¥500 + suplemento opcional por té/dulce. Si queréis entrar en SHIMA, hacerlo antes de las 17:15 para tener margen. Opción gastronómica: matcha + wagashi; helado de matcha; helado con hoja de oro." },
      { time: "19:00–21:00", text: "🍜 CENA EN KANAZAWA. Recomendar quedarse en el centro de Kanazawa, preferentemente cerca de: Korinbo; Katamachi; Musashigatsuji/Omicho; Kanazawa Station. Qué probar: oden de Kanazawa; sushi; pescado del Mar de Japón; nodoguro; Kaga cuisine; wagyu/Noto beef si apetece gastar más. Presupuesto: informal: ¥1.000–2.500; restaurante local medio: ¥2.500–5.000; cena especial: ¥8.000+. Para una cena especial o restaurante pequeño muy popular, reservar. Para izakaya/restaurante informal, mantener flexibilidad." },
      { time: "🚌 TRANSPORTE", text: "Cómo moverse por Kanazawa: Los principales puntos turísticos están muy cerca entre sí, pero el Loop Bus resulta muy práctico. Kanazawa Loop Bus: ¥220 por trayecto. Acepta IC cards nacionales y pago contactless. También existe ONE DAY PASS por ¥800. ONE DAY PASS solo merece especialmente la pena si vamos a utilizar el bus 4 veces o más. Importante: El ONE DAY PASS no se compra a bordo del bus. Se puede comprar en el Centro de Información Turística de la estación, centros Hokutetsu, algunos hoteles o digitalmente." },
      { time: "🎫 RESERVAS DEL DÍA", text: "⚠️ ESTE TREN SÍ HAY QUE RESERVARLO POR ADELANTADO. Reservar Kyoto → Kanazawa completo (Thunderbird + Hokuriku Shinkansen). Reservar asiento ordinario. No necesitamos Japan Rail Pass. No utilizar IC card para pagar este trayecto. Precio orientativo: ¥7.720 por persona, asiento ordinario reservado. Reservar en JR-WEST ONLINE TRAIN RESERVATION desde un mes antes de la fecha de viaje. Como viajamos 5 personas, reservar todos los asientos juntos si el sistema lo permite." },
      { time: "💡 TIPS", text: "Tips de Kanazawa: Kanazawa es mucho más compacta que Kyoto; caminar entre varias zonas es perfectamente viable. Llevar efectivo aunque muchos lugares acepten tarjeta/IC. En Omicho, mirar primero y decidir después; no comprar lo primero que parezca atractivo. Para seafood bowls, comparar tamaños/precios antes de sentarse. En Higashi Chaya, la mayoría de tiendas tradicionales cierran antes que los restaurantes. El barrio de Nagamachi es residencial: mantener un tono discreto y respetar las viviendas. Si llueve, Kanazawa sigue siendo bastante manejable porque muchas zonas comerciales están cubiertas, pero llevar paraguas." }
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
      { time: "08:40", text: "🚌 Nohi Bus Kanazawa → Shirakawa-go. Salida: 08:40. Reserva: 12GO31991741. 5 asientos confirmados. Duración aproximada: 1h25. Llegada prevista: 10:05. Reserva obligatoria para este servicio. No es JR. No utiliza Japan Rail Pass. No utilizar IC card: llevamos la reserva/billete del autobús. 💡 Tip: Llegar a la parada con margen. Tener localizada la reserva en el móvil y/o una copia accesible." },
      { time: "10:05", text: "Llegada a Shirakawa-go. Desde Shirakawa-go Bus Terminal comienza el recorrido a pie por Ogimachi. El centro histórico está a pocos minutos de la terminal." },
      { time: "10:05–11:45", text: "SHIRAKAWA-GO. Recorrer Ogimachi: casas gassho-zukuri, calles tradicionales, canales, Shirakawa Hachiman Shrine, vistas de las montañas. Priorizar disfrutar del pueblo antes que intentar entrar en muchas casas. Visita interior recomendada: Wada House (09:00–17:00, ¥400, a unos 3–4 min de la terminal, sin reserva, pago en efectivo). Opcional: Open-Air Museum (08:40–17:00 en septiembre, ¥600, a 12 min andando. Solo entrar si vamos bien de tiempo)." },
      { time: "11:45–12:30", text: "🍜 COMIDA EN SHIRAKAWA-GO. No retrasar demasiado la comida porque el bus a Takayama sale a las 13:15 y debemos estar de vuelta en la terminal con margen. Qué probar: Hida beef, hoba miso, soba, udon, tofu de Shirakawa-go, verduras locales. \n\n**\n**Opciones:**\n**\n1. YOUCYA UDON (opción rápida); 2. Hiiragi (Hida beef A4/A5); 3. Magoemon (opción tradicional pequeña, valorar reserva). No hacer reserva obligatoria. 💡 Tip: Muchos restaurantes son pequeños y con horarios variables. Si encontramos una opción adecuada abierta y con poca espera, aprovecharla." },
      { time: "12:30–13:00", text: "ÚLTIMO PASEO + REGRESO A TERMINAL. Dejar aproximadamente 15–20 minutos de margen para volver a Shirakawa-go Bus Terminal. No alejarse de la zona central." },
      { time: "13:15", text: "🚌 Nohi Bus Shirakawa-go → Takayama. Salida: 13:15. Reserva: 12GO31992254. 5 asientos confirmados. Duración aproximada: 50 min. Llegada prevista a Takayama Bus Terminal: 14:05. Reserva obligatoria. No es JR. No requiere Japan Rail Pass. No utilizar IC card: utilizar la reserva/billete del autobús." },
      { time: "14:05", text: "Llegada a Takayama. ****Desde Takayama Bus Terminal hasta Hotel Wood Takayama:**\n**\n aproximadamente 12 minutos andando. El hotel está prácticamente junto al casco histórico, por lo que NO necesitamos taxi ni transporte urbano. El check-in oficial es a las 15:00. Podemos dejar el equipaje en recepción si la habitación todavía no está disponible." },
      { time: "14:20–17:30", text: "CASCO ANTIGUO DE TAKAYAMA. Recorrer: Sanmachi Suji, calles tradicionales, pequeñas tiendas, sake breweries, edificios históricos, Nakabashi y alrededores. \n\n**\n**IMPORTANTE:**\n**\nMuchas tiendas y atracciones del casco antiguo cierran alrededor de las 17:00. Aprovechar esta franja para compras y visitas interiores. Después de las 17:00: Quedarse por la zona, descansar en el hotel o dar un paseo tranquilo por las calles cuando haya menos gente. 🍡 SNACK OPCIONAL: Probar alguna especialidad callejera de Hida (Hida beef sushi, croquette, mitarashi dango, pudding, sake local). No llenar demasiado el estómago si queremos cenar Hida beef." },
      { time: "19:00", text: "🥩 Cena especial de Hida beef. Para 5 personas y siendo domingo, RESERVA RECOMENDADA. No dejar esta cena completamente a la improvisación. Qué probar: Hida beef A4/A5, yakiniku, sukiyaki, hoba miso, Hida beef sushi. Presupuesto: comida informal ¥2.000–4.000/persona; cena de Hida beef más completa ¥4.000–8.000+; opción premium puede superar ¥10.000/persona. Si queremos que esta sea una de las comidas especiales, reservar restaurante con antelación." },
      { time: "🎫 RESERVAS", text: "YA RESERVADO: Kanazawa → Shirakawa-go (08:40, 5 plazas) y Shirakawa-go → Takayama (13:15, 5 plazas). NO necesitamos Japan Rail Pass, trenes, ni IC card para estos buses.\nPENDIENTE / RECOMENDADO: reservar cena de Hida beef para 5 personas a las 19:00." },
      { time: "🚍 RESUMEN DE TRANSPORTE", text: "Kanazawa → Shirakawa-go: Nohi Bus reservado, 08:40 → 10:05.\nShirakawa-go: Todo a pie.\nShirakawa-go → Takayama: Nohi Bus reservado, 13:15 → 14:05.\nTakayama Bus Terminal → Hotel Wood: aprox. 12 min andando.\nHotel → Sanmachi: al lado.\nNo necesitamos Japan Rail Pass ni trenes hoy." },
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
      "La Nakasendo era una de las cinco grandes rutas feudales del periodo Edo que conectaban Kioto con Edo (Tokio). Magome y Tsumago operaban como \"estaciones de posta\" (juku) donde samuráis, daimyos y mercaderes descansaban en sus viajes a pie.",
    schedule: [
      { time: "07:00", text: "🍙 Despertar y desayuno rápido. El Hotel Wood Takayama no debe ser nuestra fuente de desayuno esta mañana si no está incluido en la reserva. Comprar el desayuno la noche anterior: onigiri, sandwich, pan, fruta, café/bebida. Comer antes de salir o llevarlo para el autobús. 💡 Tip: Salir con todo preparado porque tenemos un autobús reservado a las 08:00." },
      { time: "07:20", text: "🚶 Salir del Hotel Wood Takayama hacia Takayama Nohi Bus Center. El trayecto es aproximadamente 10–15 minutos andando. Llegar con margen suficiente antes de las 08:00." },
      { time: "08:00", text: "🚌 Nohi Bus directo Takayama → Magome. Salida: Takayama Nohi Bus Center (08:00). Llegada: Magome (10:45). Duración: aprox. 2 h 45 min. Precio orientativo: ¥5.000/persona. \n\n**\n**IMPORTANTE:**\n**\nEste servicio requiere reserva previa. No utiliza Japan Rail Pass. No es un tren. No necesitamos IC card. Reservar online a través de Japan Bus Online / Nohi Bus. Reservar para 5 personas.\n⚠️ RESERVAR POR ADELANTADO: Este autobús evita Takayama → Nagoya → Nakatsugawa → Magome. Es mucho más sencillo y deja la mañana perfectamente encajada para la ruta Nakasendo. Confirmar reserva para el 14/09/2026." },
      { time: "10:45", text: "📍 Llegada a Magome. Comenzamos aquí la Ruta Nakasendo. Antes de iniciar la caminata, dejar el equipaje grande en el servicio de transporte de equipaje." },
      { time: "10:45–11:15", text: "🧳 ENVIAR EQUIPAJE A TSUMAGO. El servicio permite dejar maletas en la oficina de turismo de Magome entre 08:30 y 11:30 (¥500/pieza). Recogeremos las maletas en Tsumago después de las 13:00. \n\n**\n**IMPORTANTE:**\n**\nLlegamos a las 10:45, hay tiempo para dejarlo antes de las 11:30. Llevar durante la caminata únicamente una mochila pequeña con agua, documentación, móvil, batería y dinero. NO llevar maletas grandes durante la ruta (el sendero tiene piedras y desnivel)." },
      { time: "11:15", text: "🥾 Ruta Nakasendo: Magome → Tsumago. Aproximadamente 8 km y unas 3 horas a ritmo tranquilo. El sentido Magome → Tsumago tiene menos subida. Info práctica: dificultad fácil–moderada; sendero bien señalizado; tramos de bosque y asfalto; llevar agua. Hay campanas para ahuyentar osos en varios puntos, utilizarlas al pasar." },
      { time: "12:30–13:00", text: "🍙 COMIDA / SNACK DURANTE LA RUTA. Llevar comida desde Takayama/Magome. No depender de encontrar un restaurante durante la caminata. Comprar: onigiri, sandwich, fruta, bebida. La prioridad es no alargar la caminata porque debemos recoger el equipaje y coger el bus de vuelta a Magome. Si encontramos una casa de té abierta, podemos parar, pero no depender de ello." },
      { time: "14:15 aprox.", text: "🏘️ Llegada a Tsumago. Paseo corto por Tsumago mientras nos dirigimos a la oficina de información turística. El objetivo principal de Tsumago este día es terminar la ruta y recoger el equipaje." },
      { time: "14:15–14:22", text: "🧳 Recoger maletas en Tsumago y BUS TSUMAGO → MAGOME. Recoger equipaje en la oficina de turismo (horario 08:30–17:00). 🚍 14:22 — BUS local Magome Line. Salida Tsumago: 14:22. Llegada Magome: 14:50. Duración: 28 min. Precio: ¥1.000/persona. No requiere JR Pass. No hace falta reservar. Pago en efectivo al conductor o en la oficina de Tsumago. \n\n**\n**IMPORTANTE:**\n**\nEste bus es imprescindible para volver a Magome a dormir." },
      { time: "14:50", text: "📍 Regreso a Magome. Ya tenemos el equipaje con nosotros." },
      { time: "15:00–17:30", text: "Pasear tranquilamente por Magome-juku, sus casas tradicionales y calles históricas. Esta franja sirve para: check-in, dejar equipaje, descansar, ducharse y disfrutar del pueblo. \n\n**\n**IMPORTANTE:**\n**\nMuchas tiendas y restaurantes cierran temprano. No dejar compras ni comida para última hora." },
      { time: "18:00", text: "🍱 CENA EN MAGOME CHAYA. La cena se sirve EXACTAMENTE a las 18:00 y termina aprox. a las 19:00. Precio: ¥3.630/persona (¥18.150 para 5). La cena debe estar confirmada previamente. \n\n**\n**IMPORTANTE:**\n**\nNo llegar tarde. El restaurante está justo enfrente del alojamiento.\n⚠️ NO HAY DESAYUNO para la mañana siguiente: Magome Chaya no ofrece desayuno. Comprar con antelación, el pueblo no tiene comercios abiertos a primera hora." },
      { time: "🎫 RESERVAS NECESARIAS", text: "YA RESERVADO: Hotel Wood Takayama, Magome Chaya.\nRESERVAR: 🚌 Nohi Bus Takayama → Magome (14/09/2026, 08:00, 5 pax). NO\nRESERVAR: 🚍 Tsumago → Magome (bus local 14:22).\nEQUIPAJE: 🧳 Magome → Tsumago (dejar 08:30-11:30, recoger tras 13:00, ¥500/pieza)." },
      { time: "🚍 RESUMEN DE TRANSPORTE", text: "🏨 Hotel Wood Takayama\n↓ 10–15 min andando\n↓ 🚌 Takayama Nohi Bus Center\n↓ 08:00–10:45 🚌 Nohi Bus directo\n↓ 📍 Magome\n↓ dejar equipaje\n↓ 🥾 8 km / ~3 h\n↓ 📍 Tsumago\n↓ recoger equipaje\n↓ 🚌 14:22–14:50\n↓ 📍 Magome\n↓ 🏨 Magome Chaya\n↓ 🍱 Cena 18:00." },
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
      { time: "08:15", text: "🚌 08:15 — BUS LOCAL MAGOME → NAKATSUGAWA\nSalida: Magome — 08:15\nLlegada: Nakatsugawa Station — 08:40\nDuración: aprox. 25 min.\nTipo: bus local.\nReserva: NO se puede reservar.\nJapan Rail Pass: NO incluido.\nPago: comprar/pagar localmente según las instrucciones del operador.\nPrecio orientativo: ¥800/persona.\n\n**\n**IMPORTANTE:**\n**\nEl 15 de septiembre de 2026 es martes, por lo que corresponde el horario laborable.\nLlegar a la parada unos minutos antes.\nEste bus es necesario para conectar Magome con la red ferroviaria de JR." },
      { time: "08:40", text: "08:40 — Llegada a Nakatsugawa Station. Tenemos margen suficiente para localizar el andén del Limited Express Shinano." },
      { time: "09:57", text: "🚆 09:57 — JR Limited Express SHINANO 4\nNakatsugawa → Nagoya\nSalida: 09:57\nLlegada: 10:53\nDuración: aprox. 56 min.\nRecomendación: ASIENTO RESERVADO para los 5 viajeros.\nNo necesitamos Japan Rail Pass.\nEl Limited Express requiere billete + suplemento Limited Express.\n\n⚠️ RESERVA RECOMENDADA\nAunque no es un tren tan crítico como el Shinkansen, al viajar 5 personas reservaría los 5 asientos juntos para evitar separarnos.\nLos asientos reservados pueden comprarse/reservarse con antelación en los canales oficiales de JR Central o en una estación JR.\nNO utilizar IC card como sustituto del billete completo del Limited Express." },
      { time: "10:53", text: "10:53 — Llegada a Nagoya. Transbordo al Tokaido Shinkansen. Tenemos aproximadamente 20–30 minutos dependiendo del Shinkansen elegido.\nComprar aquí un EKIBEN si no hemos comido antes.\nNo sentarse a comer en la estación: comprar comida para llevar y comerla en el Shinkansen.\nRecomendación: ekiben, sandwich, sushi/bento, bebida." },
      { time: "11:00–12:30", text: "🍱 COMIDA\nComprar un ekiben en Nagoya Station y comer durante el Shinkansen.\nEs una de las formas más prácticas de aprovechar el trayecto.\nNo reservar restaurante para esta comida." },
      { time: "~11:15", text: "🚅 ~11:15–11:30 — Tokaido Shinkansen NOZOMI\nNagoya → Tokyo\nDuración: aprox. 1h40.\nLlegada aproximada: ~13:00.\n\n\n**\n**IMPORTANTE:**\n**\nRESERVAR POR ADELANTADO para 5 personas.\nPreferencia: asientos juntos.\nNo necesitamos Japan Rail Pass.\nReservar mediante Smart EX / Tokaido Sanyo Kyushu Shinkansen Online Reservation.\nComo somos 5, reservar los cinco asientos juntos si es posible.\n\n🧳 Si viajamos con maletas grandes:\nComprobar las dimensiones antes de reservar.\nSi alguna maleta tiene dimensiones totales superiores a 160 cm, reservar asiento con espacio para equipaje oversized.\nNo asumir que podremos colocar una maleta grande donde queramos." },
      { time: "~13:00", text: "~13:00 — Llegada a Tokyo Station. Desde Tokyo Station continuar en transporte público hasta KOKO HOTEL Residence Asakusa Kappabashi." },
      { time: "~13:30", text: "🚇 TOKYO STATION → KOKO HOTEL RESIDENCE ASAKUSA KAPPABASHI\nEl hotel está en: 3-24-2 Nishi-Asakusa, Taito-ku.\n\n**\n**Opciones:**\n**\nOpción sencilla: JR desde Tokyo → Ueno + Tokyo Metro Ginza Line Ueno → Tawaramachi + 10 min andando hasta el hotel.\nAlternativamente: Tokyo → Ueno y después taxi si llevamos mucho equipaje.\nEl hotel está aproximadamente:\n- 4 min andando desde Tsukuba Express Asakusa Station B\n- 10 min desde Tawaramachi Station\n- 10 min desde Iriya Station.\n\nNo reservar este transporte.\nSe paga allí mediante IC card/billete.\nCon 5 personas y maletas, si estamos cansados, valorar taxi desde Tokyo Station directamente al hotel. No es obligatorio reservarlo." },
      { time: "~14:00–15:00", text: "HOTEL\nLlegada a KOKO HOTEL Residence Asakusa Kappabashi.\nCheck-in oficial desde las 15:00.\nSi llegamos antes, dejar las maletas en recepción si el hotel lo permite y salir hacia Akihabara.\nEl hotel está muy bien situado para continuar hacia Akihabara mediante transporte público." },
      { time: "15:00–19:00", text: "Tarde en Akihabara.\nRecorrer: Akihabara Electric Town, Radio Kaikan, Mandarake, tiendas de electrónica, anime/manga, figuras, arcades, tiendas de segunda mano.\n\nMandarake Complex: 12:00–20:00. Abierto todos los días. Por tanto, la visita a las 15:00 encaja perfectamente." },
      { time: "🍜 COMIDA/CENA", text: "COMIDA\nComo el desayuno será temprano y la comida principal será en el Shinkansen, no es necesario reservar una comida en Akihabara.\nSi tenemos hambre al llegar, comer algo rápido en Akihabara. Opciones típicas: ramen, curry, gyudon, kaiten sushi, tonkatsu, comida rápida japonesa.\n\nCENA\nDejar la cena para Akihabara o Asakusa.\nNo asumir que todos los restaurantes permanecen abiertos hasta muy tarde.\nPara un restaurante concreto y siendo 5 personas, reservar si se decide uno popular." },
      { time: "🚆 TRANSPORTE DEL DÍA", text: "1. 🚌 Magome → Nakatsugawa: 08:15 → 08:40. Sin reserva. ¥800 aprox. Pago local.\n2. 🚆 Nakatsugawa → Nagoya: Limited Express Shinano 4. 09:57 → 10:53.\n\nRESERVA RECOMENDADA para 5.\n3. 🚅 Nagoya → Tokyo: Nozomi. ~11:15–11:30 → ~13:00.\n\nRESERVAR POR ADELANTADO para 5.\n4. 🚇 Tokyo → Asakusa/Kappabashi: Metro/JR. Sin reserva. IC card.\n5. 🚇 Asakusa → Akihabara: Transporte urbano. Sin reserva. IC card." },
      { time: "🎫 RESERVAS", text: "🔴 PRIORIDAD ALTA\n\nRESERVAR Shinkansen Nozomi Nagoya → Tokyo para 5 personas.\n\n🟠 PRIORIDAD MEDIA\n\nRESERVAR Limited Express Shinano 4 Nakatsugawa → Nagoya para 5 personas.\n\n🟢 NO RESERVAR\nBus local Magome → Nakatsugawa.\n\n🟢 NO RESERVAR\nTokyo → hotel.\n\n🟢 NO RESERVAR\nTransporte urbano en Tokyo." },
      { time: "💡 PUNTOS IMPORTANTES", text: "\n⚠️ No confiar en los horarios antiguos de 08:50 y 09:30 que aparecían anteriormente: no corresponden a los servicios que debemos utilizar el 15/09/2026.\n\n⚠️ Comprar el desayuno el día anterior porque Magome Chaya no ofrece desayuno.\n\n⚠️ Como somos 5, reservar juntos los dos trenes con asiento reservado siempre que sea posible.\n\n⚠️ El Shinkansen es el transporte que más nos interesa asegurar con antelación." }
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
      { time: "06:15", text: "Comprobar cámaras web en directo en mtfujitoday.com e isfujivisible.com desde el hotel en Tokio (la regla de oro matutina)." },
      { time: "07:08", text: "🚇 Hotel → Ueno → Estación de Tokio. (Ej: Línea Keihin-Tohoku desde Ueno a las 07:08, llegada 07:15). Caminar 5 min al andén del Shinkansen." },
      { time: "07:27", text: "🚅 Tokaido-Sanyo Shinkansen KODAMA 805. Salida de Tokio a las 07:27, llegada a Mishima a las 08:20. \n\n**\n**IMPORTANTE:**\n**\nDebe ser el Kodama para que pare en Mishima." },
      { time: "08:25", text: "Encuentro en la Salida Sur de la Estación de Mishima con el guía Ken Kaneshima e inicio de la ruta en mini-van privada." },
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
  { day: 1, date: "2026-09-07", name: "Narita Express (N'EX)", from: "Aeropuerto de Narita", to: "Estación de Shinagawa", type: "Línea JR", real: 19, jpy: 3330, coverage: "jr", purchased: false, advance: true },
  { day: 1, date: "2026-09-07", name: "Shinkansen Nozomi 53", from: "Estación de Shinagawa", to: "Kioto", type: "Línea JR (Tren Bala)", real: 90, jpy: 14170, coverage: "jr", note: "✓ Reservado (Ref: 2000) · Salida 17:19 → Llegada 19:23 · Coche 13 · Asientos: 13-C, 13-D, 13-E, 14-D, 14-E", purchased: true, advance: true },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Kioto", to: "Inari Station", type: "Línea JR Local", real: 1, jpy: 200, coverage: "jr", purchased: false, advance: false },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Inari Station", to: "Nara", type: "Línea JR Local", real: 4.2, jpy: 680, coverage: "jr", purchased: false, advance: false },
  { day: 2, date: "2026-09-08", name: "Tren Línea JR Nara", from: "Nara", to: "Kioto", type: "Línea JR Local", real: 4.5, jpy: 720, coverage: "jr", purchased: false, advance: false },
  { day: 3, date: "2026-09-09", name: "Bus y Metro", from: "Kioto", to: "Mercado Nishiki / Gion", type: "Operador Privado / Local", real: 4, jpy: 600, coverage: "no-jr", purchased: false, advance: false },
  { day: 4, date: "2026-09-10", name: "Metro y Bus 205", from: "Kioto", to: "Kinkakuji", type: "Operador Privado / Local", real: 3, jpy: 500, coverage: "no-jr", purchased: false, advance: false },
  { day: 4, date: "2026-09-10", name: "Tranvía Randen", from: "Ninna-ji", to: "Arashiyama", type: "Operador Privado", real: 1.5, jpy: 250, coverage: "no-jr", purchased: false, advance: false },
  { day: 4, date: "2026-09-10", name: "Tren JR Línea San-In", from: "Arashiyama", to: "Kioto", type: "Línea JR Local", real: 1.5, jpy: 240, coverage: "jr", purchased: false, advance: false },
  { day: 5, date: "2026-09-11", name: "Tren rápido JR (ida y vuelta)", from: "Kioto", to: "Osaka", type: "Línea JR Local", real: 7, jpy: 1160, coverage: "jr", purchased: false, advance: false },
  { day: 6, date: "2026-09-12", name: "Thunderbird + Hokuriku Shinkansen", from: "Kioto", to: "Kanazawa", type: "Línea JR Exprés", real: 43.5, jpy: 7720, coverage: "jr", purchased: false, advance: true },
  { day: 7, date: "2026-09-13", name: "Nohi Bus Kanazawa → Shirakawa-go", from: "Kanazawa Sta.", to: "Shirakawa-go Bus Terminal", type: "Operador Privado (Bus)", real: 19.12, jpy: 3100, coverage: "no-jr", note: "✓ Reservado · Booking 12GO31991741 · Salida 08:40 · 5 asientos confirmados", purchased: true, advance: true },
  { day: 7, date: "2026-09-13", name: "Nohi Bus Shirakawa-go → Takayama", from: "Shirakawa-go Bus Terminal", to: "Takayama Nohi Bus Center", type: "Operador Privado (Bus)", real: 20.03, jpy: 3250, coverage: "no-jr", note: "✓ Reservado · Booking 12GO31992254 · Salida 13:15 · 5 asientos confirmados", purchased: true, advance: true },
  { day: 8, date: "2026-09-14", name: "Nohi Bus directo Takayama → Magome", from: "Takayama Nohi Bus Center", to: "Magome", type: "Operador Privado (Bus)", real: 25, jpy: 4000, coverage: "no-jr", note: "Reservar 5 plazas · 08:00–10:45 · ¥5.000/persona", purchased: false, advance: true },
  { day: 9, date: "2026-09-15", name: "Bus local Magome → Nakatsugawa", from: "Magome", to: "Nakatsugawa", type: "Operador Privado (Bus)", real: 3, jpy: 500, coverage: "no-jr", note: "Salida 08:15 → Llegada 08:40 · ¥800/persona · Sin reserva", purchased: false, advance: false },
  { day: 9, date: "2026-09-15", name: "JR Limited Express Shinano 4", from: "Nakatsugawa", to: "Nagoya", type: "Línea JR Exprés", real: 15, jpy: 3070, coverage: "jr", note: "09:57 → 10:53 · Reservar asiento para 5 personas", purchased: false, advance: true },
  { day: 9, date: "2026-09-15", name: "Shinkansen Nozomi", from: "Nagoya", to: "Tokio", type: "Línea JR (Tren Bala)", real: 50, jpy: 11300, coverage: "jr", note: "~11:15–11:30 → ~13:00 · Nozomi requiere billete especial suplementario con JR Pass", purchased: false, advance: true },
  { day: 10, date: "2026-09-16", name: "Tren elevado Yurikamome", from: "Tokio", to: "Isla de Odaiba", type: "Operador Privado", real: 2, jpy: 330, coverage: "no-jr", purchased: false, advance: false },
  { day: "10-14", date: "16-20 sept", name: "Metro y trenes locales (5 días)", from: "Tokio", to: "Tokio (varios)", type: "Operador Privado / Local", real: 25, jpy: 4000, coverage: "no-jr", purchased: false, advance: false },
  { day: 14, date: "2026-09-20", name: "Shinkansen ida y vuelta (Excursión Fuji)", from: "Tokio", to: "Mishima / Shin-Fuji", type: "Línea JR (Tren Bala)", real: 62, jpy: 9000, coverage: "jr", note: "Tokio→Mishima (Kodama 805) y regreso Shin-Fuji→Tokio", purchased: false, advance: true },
  { day: 15, date: "2026-09-21", name: "Narita Express (N'EX)", from: "Estación de Tokio", to: "Aeropuerto de Narita", type: "Línea JR", real: 19, jpy: 3330, coverage: "jr", purchased: false, advance: true },
];

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
        "Magome Chaya (14–15 sept, 1 noche, con cena sin desayuno): 178,98€ grupo · 35,80€/persona.",
        "KOKO HOTEL Residence Asakusa Kappabashi (15–21 sept, 6 noches): 1.952,50€ grupo · 390,50€/persona.",
      ],
    },
    {
      title: "Transporte nacional",
      perPerson: "~419€",
      total: "~2.097€",
      details: [
        "Trenes sueltos (NEX, Shinkansens, ruta Alpes, Fuji, Tokio): ~340€/persona.",
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
  totalPerPerson: "~2.605€ – 2.705€ (vuelos incluidos)",
  totalGroup: "~12.800€ – 13.300€ (5 personas)",
};
