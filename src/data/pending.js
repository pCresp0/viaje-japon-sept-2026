// Cosas pendientes de decidir o reservar antes del viaje.
// Extraído de la planificación: alojamientos duplicados, actividades que
// requieren reserva anticipada y avisos logísticos.

export const pendingItems = [
  {
    id: "kyoto-kanazawa",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Kioto → Kanazawa",
    detail: "📅 12/09/2026\n👥 5 personas\n🚆 Thunderbird + Hokuriku Shinkansen\n⏰ Salida objetivo: ~08:10\n📍 Kyoto → Tsuruga → Kanazawa\n💳 Comprar: JR-WEST ONLINE TRAIN RESERVATION (Por adelantado)\n⚠️ Reservar asientos juntos ordinarios. Es un billete combinado.",
    deadline: "1 mes antes (12/08/2026 10:00 JST)",
  },
  {
    id: "bus-magome",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Nohi Bus Takayama → Magome",
    detail: "📅 14/09/2026\n👥 5 personas\n🚌 Nohi Bus Directo\n⏰ Salida objetivo: 08:00\n📍 Takayama Nohi Bus Center → Magome\n💳 Comprar: Japan Bus Online / Web de Nohi Bus (Por adelantado)\n⚠️ Es el bus directo. Se llena rápido en temporada alta.",
    deadline: "1 mes antes",
  },
  {
    id: "shinano",
    category: "reserva",
    urgency: "media",
    title: "🟠 Reservar JR Shinano (Nakatsugawa → Nagoya)",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 JR Shinano Limited Express 4\n⏰ Salida objetivo: ~09:57\n📍 Nakatsugawa → Nagoya\n💳 Comprar: JR Central (SmartEX/JR-West online) (Por adelantado)\n⚠️ Tren popular para volver de los Alpes. Reservar juntos.",
    deadline: "1 mes antes",
  },
  {
    id: "nozomi-vuelta",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Nozomi (Nagoya → Tokio)",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 Shinkansen Nozomi\n⏰ Salida objetivo: ~11:00\n📍 Nagoya → Tokio\n💳 Comprar: SmartEX App/Web (Por adelantado)\n⚠️ OBLIGATORIO: Asientos con 'Oversized Baggage' si lleváis maletas grandes.",
    deadline: "1 mes antes (15/08/2026 10:00 JST)",
  },
  {
    id: "shinkansen-fuji",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Kodama (Excursión Fuji Ida/Vuelta)",
    detail: "📅 20/09/2026\n👥 5 personas\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805 (Ida) y regreso\n⏰ Salida objetivo: 07:27\n📍 Tokio ↔ Mishima/Shin-Fuji\n💳 Comprar: SmartEX App/Web (Por adelantado)\n⚠️ OBLIGATORIO: Tomar este tren específico para la ida para llegar a la hora de encuentro con el guía Ken.",
    deadline: "1 mes antes",
  },
  {
    id: "narita-express-vuelta",
    category: "reserva",
    urgency: "media",
    title: "🟠 Reservar Narita Express (N'EX) Vuelta",
    detail: "📅 21/09/2026\n👥 5 personas\n🚆 JR Narita Express\n📍 Tokio → Aeropuerto de Narita\n💳 Comprar: JR East Web o taquillas (Por adelantado)\n⚠️ El N'EX requiere asiento reservado. Para asegurar la llegada al aeropuerto, comprad el de vuelta al menos el día anterior.",
    deadline: "Antes de viajar",
  }
];

export const categoryLabels = {
  reserva: { label: "Billetes por Adelantado", emoji: "🎟️" },
};

export const urgencyConfig = {
  alta: { label: "Urgente", color: "#bc4749" },
  media: { label: "Importante", color: "#c9a227" },
  baja: { label: "Cuando puedas", color: "#2e7d5b" },
};
