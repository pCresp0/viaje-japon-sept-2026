// Cosas pendientes de decidir o reservar antes del viaje.
// Extraído de la planificación: alojamientos duplicados, actividades que
// requieren reserva anticipada y avisos logísticos.

export const pendingItems = [
  // ── RESERVAS CON FECHA CRÍTICA ─────────────────────────────────────
  {
    id: "tour-fuji",
    category: "reserva",
    urgency: "alta",
    title: "Reservar excursión al Monte Fuji (Ken Kaneshima)",
    detail:
      "Tour de día completo con guía en español · Excursiones Fujiyama (excursionesfujiyama.com). Contacto: Ken Kaneshima, +81 90-5863-1635. Estrategia: reservar 3–4 días consecutivos; la noche anterior miráis el tiempo y si amanece despejado vais ese día, cancelando el resto. Confirmar antes su política de cancelación.",
    deadline: "Con semanas de antelación — pendiente de reservar",
  },
  {
    id: "hida-express-reserva",
    category: "reserva",
    urgency: "alta",
    title: "Reservar tren Hida Express panorámico (Takayama → Nagoya)",
    detail:
      "Día 8 (14 sept): tren panorámico Hida Express de Takayama a Nagoya (2h 30m, ~34€ sin JR Pass). Tren muy popular en septiembre, los asientos reservados se agotan. Con JR Pass la reserva de asiento es gratuita; sin él hay que comprar el billete con antelación en JR Central.",
    deadline: "Con varias semanas de antelación",
  },
  {
    id: "thunderbird-reserva",
    category: "reserva",
    urgency: "media",
    title: "Reservar tren Thunderbird (Kioto → Kanazawa)",
    detail:
      "Día 6 (12 sept): tren Thunderbird de Kioto a Kanazawa (2h, ~43,50€ sin JR Pass). Septiembre es temporada alta en Kanazawa. Con JR Pass la reserva de asiento es gratuita; sin él comprar billete en JR West o taquilla.",
    deadline: "Con algunas semanas de antelación",
  },
  {
    id: "shinkansen-asientos",
    category: "reserva",
    urgency: "media",
    title: "Reservar asientos en los Shinkansen",
    detail:
      "Dos trenes bala clave del viaje: Día 1 (7 sept) Shinkansen Hikari de Estación de Tokio a Kioto (2h 30m, ~85€ sin JR Pass) y Día 9 (15 sept) Shinkansen Nagoya → Tokio (1h 40m, ~50€ sin JR Pass). Con JR Pass la reserva de asiento es gratuita. Sin él, comprar billetes online (Shinkansen booking, Klook) o en taquilla en Narita.",
    deadline: "Resolver el JR Pass primero, luego reservar con semanas de antelación",
  },

  // ── LOGÍSTICA A ORGANIZAR ──────────────────────────────────────────
  {
    id: "bus-magome-horario",
    category: "logistica",
    urgency: "baja",
    title: "Revisar horario bus Magome → Nakatsugawa (Día 9)",
    detail:
      "La mañana del día 9 (15 sept) hay que coger un bus local desde Magome hasta la estación de Nakatsugawa (~25 min, ~3€). Al ser una ruta rural, los autobuses son poco frecuentes. Suele salir alrededor de las 08:50 ó 09:10. Este bus es el primer eslabón de la cadena: enlaza con el JR Shinano a Nagoya y después con el Shinkansen Nozomi de las 11:00.",
    deadline: "Revisar la noche del 14 sept (mientras estáis en Magome Chaya)",
  },
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
    title: "Confirmar cena en Magome Chaya",
    detail:
      "La cena casera del minshuku (día 8) es a las 18:30 en punto y no admite retrasos. Hay que ajustar la caminata de la Nakasendo para llegar con margen. Confirmar la hora con Magome Chaya antes de viajar.",
    deadline: "Antes del viaje — contactar con Magome Chaya para confirmar",
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
  reserva: { label: "Reservas", emoji: "🎟️" },
  logistica: { label: "Logística", emoji: "📦" },
};

export const urgencyConfig = {
  alta: { label: "Urgente", color: "#bc4749" },
  media: { label: "Importante", color: "#c9a227" },
  baja: { label: "Cuando puedas", color: "#2e7d5b" },
};
