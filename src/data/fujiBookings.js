/**
 * Información de la reserva de la excursión al Monte Fuji (GetYourGuide,
 * confirmada para el 16 de septiembre).
 */

export const gygFujiActivity = {
  title: "Tokio: monte Fuji, parque Oishi, lago Kawaguchi y Oshino Hakkai",
  provider: "Japan Visionary Tour",
  providerPhone: "+81 80 4177 7353",
  providerEmail: "activity-provider-fs7zshgtsn6di2wj@reply.getyourguide.com",
  url: "https://www.getyourguide.com/es-es/tokio-l193/tokio-monte-fuji-pagoda-chureito-lago-kawaguchi-y-oshino-hakkai-t792363/",
  meetingPoint: "Tokyo Mode Gakuen (1 Chome-7-3 Nishishinjuku, Shinjuku City, Tokyo 160-0023)",
  meetingPointUrl: "https://maps.google.com/?q=35.691490,139.696457",
  meetingTime: "Encuentro a las 08:10 AM (salida puntual en autobús a las 08:20 AM)",
  duration: "Aprox. 10 horas",
  language: "Guía oficial en inglés",
  participants: "5 adultos",
  totalPrice: "210,00 € (42 € / persona)",
  paymentDate: "Programado para el 13 de septiembre de 2026",
  foodNotice: "⚠️ Comida NO incluida. No se permite comer en el autobús. Comprar snacks/bebidas antes o probar especialidades locales en las paradas (llevar dinero en efectivo ¥, muchas tiendas no aceptan tarjeta).",
  guideMessage: {
    receivedDate: "15 de septiembre de 2026, por WhatsApp",
    guideName: "Omar",
    flagColor: "Naranja",
    flagNumber: "19",
    meetingTimeUpdated: "08:10 AM",
    departureTimeUpdated: "08:20 AM",
    lateWarning: "El guía insiste en llegar puntual -- el autobús sale a las 08:20 en punto, sin margen de espera.",
    stationWarning: "Si vais en tren, calculad tiempo extra para orientaros dentro de la Estación de Shinjuku: es enorme (más de 200 salidas) y encontrar el punto de encuentro puede llevar más de lo esperado.",
    weatherNotice: "Se espera lluvia mañana. Llevar chubasquero o paraguas y calzado adecuado. El tiempo alrededor del Monte Fuji puede ser más frío y cambiar rápido -- vestir por capas.",
    restroomNotice: "Ir al baño antes de llegar al punto de encuentro: el trayecto en autobús hasta la primera parada dura aprox. 2 horas.",
  },
  hotelDepartureAdvice: "Desde el KOKO HOTEL Residence Asakusa Kappabashi, el trayecto hasta Shinjuku ronda los 40-45 minutos en metro/JR. Dado que hay que pasar por la Estación de Shinjuku (grande y fácil de perderse) y llegar con margen antes de las 08:10, se recomienda salir del hotel como muy tarde a las 07:10 -- idealmente hacia las 07:00 para ir sin agobios.",
  itineraryStops: [
    "Lago Kawaguchiko y Parque Oishi (40 min - campos florales y vistas)",
    "Saiko Iyashi-no-Sato Nenba (1 hora - pueblo tradicional de tejados de paja con entrada incluida)",
    "Oshino Hakkai (1 hora - 8 manantiales sagrados de agua de deshielo UNESCO)",
    "Parque Arakurayama Sengen y Santuario Arakura Fuji (subida de 400 escalones)",
    "Pagoda Chureito (la vista icónica de 5 pisos con el Monte Fuji)"
  ],
  bookings: [
    {
      dayNum: 10,
      date: "2026-09-16",
      dateFormatted: "Miércoles, 16 de septiembre de 2026",
      code: "GYGX7M7NZBNL",
      pin: "3342WSa=",
      cancelDeadline: "Antes de las 08:30 del 15 de septiembre",
      status: "✅ CONFIRMADO -- este es el día definitivo, ya no hay reservas alternativas en otros días"
    }
  ]
};

export const visibilityTools = {
  isFujiVisible: {
    name: "isfujivisible.com",
    url: "https://isfujivisible.com",
    desc: "Algoritmo técnico que cruza nubes, viento y humedad con puntuación 1 a 10 y previsión por tramos horarios."
  },
  mtFujiToday: {
    name: "mtfujitoday.com",
    url: "https://mtfujitoday.com",
    desc: "Previsión a 7 días y acceso directo a webcams en directo en Kawaguchiko y alrededores."
  },
  sideToCheck: "⚠️ IMPORTANTE — mirad SIEMPRE la vista NORTE (Kawaguchiko/Yamanashi), NO la vista Sur (Hakone/Mishima): estas webs muestran previsiones separadas para cada lado del Fuji, porque el tiempo puede estar despejado en un lado y nublado en el otro el mismo día. La excursión GYG confirmada del 16 de septiembre (Kawaguchiko, Parque Oishi, Oshino Hakkai, Pagoda Chureito) depende de que el Fuji se vea despejado desde el NORTE ese día -- comprobad esa vista la mañana del 16, no la de Hakone.",
  goldenRule: "Abrid las webcams en directo desde el hotel a las 06:30 AM. Si a las 07:00 AM no es visible, es altamente improbable que aparezca más tarde (a partir de las 09:00 AM el calor evapora humedad y crea nubes sobre el cono)."
};
