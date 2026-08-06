// Cosas pendientes de decidir o reservar antes del viaje.
// Extraído de la planificación: alojamientos duplicados, actividades que
// requieren reserva anticipada y avisos logísticos.

export const pendingItems = [
  // ── DECISIONES DE ALOJAMIENTO ──────────────────────────────────────
  {
    id: "hotel-kioto",
    category: "alojamiento",
    urgency: "media",
    title: "Elegir hotel en Kioto",
    detail: "Hay dos reservas activas para las mismas 5 noches (7–12 sept). Hay que quedarse con una y cancelar la otra.",
    options: [
      { name: "Hotel Keihan Kyoto Hachijoguchi", note: "668€ · PIN 2281" },
      { name: "Kyoto Tower Hotel Annex", note: "694€ · PIN 3350" },
    ],
    deadline: "Antes de que expire la cancelación gratuita",
  },
  {
    id: "hotel-takayama",
    category: "alojamiento",
    urgency: "media",
    title: "Elegir hotel en Takayama",
    detail: "Dos reservas para la misma noche (13–14 sept). Hay 105€ de diferencia entre ambas.",
    options: [
      { name: "Hida Takayama Washington Hotel Plaza", note: "168,68€ · PIN 6364" },
      { name: "Hotel Wood Takayama", note: "274,25€ · PIN 7717" },
    ],
    deadline: "Antes de que expire la cancelación gratuita",
  },
  {
    id: "hotel-tsumago",
    category: "alojamiento",
    urgency: "alta",
    title: "Revisar y elegir alojamiento en Tsumago",
    detail:
      "⚠️ Importante: los dos hoteles reservados (Tsumagoi Prince y Manza Kogen) están en una zona de onsen de Gunma, NO en el pueblo de Tsumago de la ruta Nakasendo (Nagano). Están a varias horas de distancia. Conviene verificar la reserva y, si es un error, buscar un minshuku en Tsumago o Magome.",
    options: [
      { name: "Tsumagoi Prince Hotel", note: "243€ · PIN 5848 — ¿Gunma?" },
      { name: "Manza Kogen Hotel", note: "150,39€ · PIN 3979 — ¿Gunma?" },
    ],
    deadline: "Cuanto antes — puede requerir buscar alojamiento nuevo",
  },
  {
    id: "hotel-tokio",
    category: "alojamiento",
    urgency: "media",
    title: "Elegir hotel en Tokio",
    detail: "Dos reservas para las mismas 6 noches (15–21 sept). Es la reserva más cara del viaje, con 323€ de diferencia.",
    options: [
      { name: "KOKO HOTEL Residence Asakusa Kappabashi", note: "1922,03€ · PIN 3322" },
      { name: "Hotel Keihan Asakusa", note: "1598,62€ · PIN 8953" },
    ],
    deadline: "Antes de que expire la cancelación gratuita",
  },

  // ── RESERVAS CON FECHA CRÍTICA ─────────────────────────────────────
  {
    id: "pokemon-cafe",
    category: "reserva",
    urgency: "alta",
    title: "Reservar Pokémon Café (Tokio)",
    detail:
      "Se reserva online exactamente 31 días antes y se agota en segundos. Para la comida del día 13 (19 sept), la reserva se abre el 19 de agosto.",
    deadline: "19 de agosto de 2026 — exactamente 31 días antes",
  },
  {
    id: "tour-fuji",
    category: "reserva",
    urgency: "alta",
    title: "Contratar tour al Monte Fuji",
    detail:
      "Tour de día completo con guía en español, con ken kaneshima (Excursiones Fujiyama). La estrategia es reservar 3–4 días consecutivos y hacer el primero que amanezca despejado, cancelando el resto. Confirmar antes que su política de cancelación lo permite.",
    deadline: "Con semanas de antelación — confirmar antes la política de cancelación",
  },
  {
    id: "bus-shirakawa",
    category: "reserva",
    urgency: "alta",
    title: "Reservar Nohi Bus a Shirakawa-go",
    detail:
      "Bus de Kanazawa a Shirakawa-go (día 7, 1h 15m). Los asientos son reservados y en temporada alta se llena con semanas de antelación. Reservar online.",
    deadline: "Con varias semanas de antelación",
  },

  // ── LOGÍSTICA A ORGANIZAR ──────────────────────────────────────────
  {
    id: "takkyubin",
    category: "logistica",
    urgency: "media",
    title: "Organizar envío de maletas Kioto → Tokio",
    detail:
      "La mañana del día 6 se envían las maletas grandes desde el hotel de Kioto directo al de Tokio (Takkyubin, ~15€/maleta). Durante los Alpes se viaja solo con mochila. Conviene avisar en recepción y confirmar que el hotel de Tokio acepta la entrega anticipada.",
    deadline: "Confirmar con ambos hoteles antes de viajar",
  },
  {
    id: "forwarding-nakasendo",
    category: "logistica",
    urgency: "baja",
    title: "Reservar forwarding de mochilas Magome ↔ Tsumago",
    detail:
      "Servicio de transporte de equipaje entre los dos extremos de la ruta Nakasendo (~5€/bulto), para hacer la caminata ligeros. Suele contratarse en la oficina de turismo el mismo día, pero conviene confirmar horarios y si opera en esas fechas.",
    deadline: "Confirmar horarios antes del día 8",
  },
  {
    id: "cena-minshuku",
    category: "logistica",
    urgency: "baja",
    title: "Confirmar cena en el minshuku",
    detail:
      "La cena casera del minshuku (día 8) es a las 18:30 en punto y no admite retrasos. Hay que ajustar la caminata de la Nakasendo para llegar con margen y confirmar la hora al reservar.",
    deadline: "Al confirmar el alojamiento de Tsumago",
  },
  {
    id: "jr-pass",
    category: "logistica",
    urgency: "media",
    title: "Decidir si comprar JR Pass",
    detail:
      "Comparar el coste de los trayectos sueltos (~366€/persona) frente al JR Pass. Según la planificación, con este itinerario el JR Pass sale peor, pero conviene rehacer el cálculo con los trayectos definitivos antes de descartarlo.",
    deadline: "Antes de viajar — el pass se compra desde España",
  },
  {
    id: "entradas-tokio",
    category: "reserva",
    urgency: "media",
    title: "Sacar entradas online (TeamLab y museos)",
    detail:
      "TeamLab funciona con entrada por franja horaria y se agota con antelación. Revisar también entradas para el mirador de Roppongi y los museos que queráis visitar en Tokio.",
    deadline: "Semanas antes, según disponibilidad",
  },
];

export const categoryLabels = {
  alojamiento: { label: "Alojamiento", emoji: "🏨" },
  reserva: { label: "Reservas", emoji: "🎟️" },
  logistica: { label: "Logística", emoji: "📦" },
};

export const urgencyConfig = {
  alta: { label: "Urgente", color: "#bc4749" },
  media: { label: "Importante", color: "#c9a227" },
  baja: { label: "Cuando puedas", color: "#2e7d5b" },
};
