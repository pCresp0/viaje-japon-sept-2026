// Cosas pendientes de decidir o reservar antes del viaje.
// Extraído de la planificación: alojamientos duplicados, actividades que
// requieren reserva anticipada y avisos logísticos.

export const pendingItems = [
  {
    id: "shinkansen-nozomi-dia1",
    category: "reserva",
    urgency: "alta",
    title: "Reservar Shinkansen Nozomi Día 1 (Shinagawa → Kioto)",
    detail:
      "Día 1 (7 sept): Cómpralo con antelación desde España semanas antes en la app o web oficial SmartEX (https://smart-ex.jp/reservation/reserve_smart/sp/) de Shinagawa a Kioto (~90€). Al viajar 5 con maletas grandes, es OBLIGATORIO marcar 'Seat with an oversized baggage area' (última fila con espacio reservado detrás) y seleccionar los asientos E (ventanilla derecha) para ver el Monte Fuji ~40 min tras salir.",
    deadline: "Semanas antes del viaje",
  },
  {
    id: "nex-dia1",
    category: "logistica",
    urgency: "alta",
    title: "Comprar Narita Express - N'EX (Aeropuerto Narita → Shinagawa)",
    detail:
      "Día 1 (7 sept): NO se compra por adelantado. Al depender de la puntualidad del vuelo (aterriza 12:55) y colas de aduana/inmigración, se compra directamente al aterrizar en la planta B1 de Narita en las taquillas/máquinas rojas de JR para el siguiente tren disponible a Shinagawa (~19€, salen cada 30 min, 1h 10m sin transbordos).",
    deadline: "Al aterrizar en Narita (Planta B1)",
  },
  {
    id: "shinkansen-nozomi-dia9",
    category: "reserva",
    urgency: "alta",
    title: "Reservar Shinkansen Nozomi Día 9 (Nagoya → Tokio)",
    detail:
      "Día 9 (15 sept): tren bala Nozomi de Nagoya a Tokio (~50€, 1h 40m). Comprar con antelación en SmartEX reservando asientos con Oversized Baggage para las maletas grandes.",
    deadline: "Semanas antes del viaje",
  },
  {
    id: "hida-express-reserva",
    category: "reserva",
    urgency: "alta",
    title: "Reservar tren Hida Express panorámico (Takayama → Nagoya)",
    detail:
      "Día 8 (14 sept): tren panorámico Hida Express de Takayama a Nagoya (2h 30m, ~34€). Tren muy popular en septiembre, los asientos reservados se agotan. Al no tener JR Pass, hay que comprar el billete con antelación online o en taquilla JR.",
    deadline: "Semanas antes",
  },
  {
    id: "thunderbird-reserva",
    category: "reserva",
    urgency: "media",
    title: "Reservar tren Thunderbird (Kioto → Kanazawa)",
    detail:
      "Día 6 (12 sept): tren Thunderbird de Kioto a Kanazawa (2h, ~43,50€). Septiembre es temporada alta en Kanazawa. Al no tener JR Pass, comprar billete en JR West online o taquilla con antelación.",
    deadline: "Semanas antes",
  },
  {
    id: "shinano-reserva",
    category: "reserva",
    urgency: "media",
    title: "Reservar tren JR Shinano",
    detail:
      "Días 8 y 9: tren JR Shinano Limited Express entre Nagoya y Nakatsugawa (ida y vuelta a los Alpes, 50 min, ~15€). Recomendable reservarlo al no tener JR Pass.",
    deadline: "Semanas antes",
  },
  {
    id: "bus-magome-horario",
    category: "logistica",
    urgency: "alta",
    title: "Revisar horario bus Magome → Nakatsugawa (Día 9)",
    detail:
      "La mañana del día 9 hay que coger un bus local desde Magome a la estación de Nakatsugawa (~25 min, ~3€). Al ser ruta rural, hay pocos autobuses. Suele salir ~08:50 ó 09:10.",
    deadline: "Revisar la noche del 14 sept",
  },
  {
    id: "takkyubin",
    category: "logistica",
    urgency: "media",
    title: "Organizar envío de maletas Kioto → Tokio",
    detail:
      "La mañana del día 6 se envían las maletas grandes del hotel de Kioto al de Tokio (Takkyubin, ~15€/maleta). Viajáis por los Alpes solo con mochila.",
    deadline: "Confirmar con hoteles antes",
  },
  {
    id: "forwarding-nakasendo",
    category: "logistica",
    urgency: "baja",
    title: "Reservar forwarding de mochilas Magome ↔ Tsumago",
    detail:
      "Transporte de equipaje en la ruta Nakasendo (~5€/bulto), para caminar ligeros. Se contrata en la oficina de turismo el mismo día.",
    deadline: "Confirmar horarios antes",
  },
  {
    id: "cena-minshuku",
    category: "logistica",
    urgency: "alta",
    title: "Confirmar cena en Magome Chaya",
    detail:
      "Responder al correo de Jeng confirmando la cena para los 5 a las 18:00 h y avisar si alguien del grupo tiene alguna alergia alimentaria.",
    deadline: "Antes del viaje",
  },
  {
    id: "entradas-tokio",
    category: "reserva",
    urgency: "alta",
    title: "Sacar entradas online (TeamLab y Shibuya Sky)",
    detail:
      "Comprar ya online las entradas para el museo teamLab y para el mirador de Shibuya Sky (franja del atardecer), porque vuelan.",
    deadline: "Lo antes posible",
  },
  {
    id: "esim-suica",
    category: "logistica",
    urgency: "alta",
    title: "Internet y transporte local",
    detail:
      "Comprar las eSIM de datos (Airalo, Ubigi, etc.) y añadir la tarjeta Suica digital directamente a la aplicación Cartera (Apple Wallet) para recargarla.",
    deadline: "Antes de viajar",
  },
  {
    id: "desayuno-nakasendo",
    category: "logistica",
    urgency: "media",
    title: "Desayuno ruta Nakasendo",
    detail:
      "Comprar algo de desayuno en un konbini de Takayama o Nakatsugawa el día 14, ya que el alojamiento rural no sirve comida por la mañana.",
    deadline: "Día 14 en Japón",
  }
];

export const categoryLabels = {
  reserva: { label: "Reservas", emoji: "🎟️" },
  logistica: { label: "Logística", emoji: "📦" },
};

export const urgencyConfig = {
  alta: { label: "Urgente", color: "#bc4749" },
  media: { label: "Importante", color: "#c9a227" },
  baja: { label: "Cuando puedas", color: "#2e7d5b" },
};
