// Cosas pendientes de decidir o reservar antes del viaje.
// Extraído de la planificación: alojamientos duplicados, actividades que
// requieren reserva anticipada y avisos logísticos.

// Cosas pendientes de decidir o reservar antes del viaje.
// Ordenadas por orden de proximidad (lo más urgente/próximo arriba, lo más lejano abajo).

export const pendingItems = [
  {
    id: "cena-magome",
    category: "logistica",
    urgency: "alta",
    title: "🔴 Confirmar Cena Magome Chaya",
    detail: "📅 14/09/2026\n👥 5 personas\n🍱 Cena de Minshuku\n⏰ Hora: 18:00 exactas\n📍 Magome Chaya\n⚠️ El alojamiento exige confirmación para servir la cena. Enviar email a Jeng indicando: 5 comensales, llegada 14/09, hora 18:00. Sin confirmación no hay cena (¥3.630/persona).",
    deadline: "Hacer ya",
  },
  {
    id: "tour-fuji",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Excursión Privada Fuji",
    detail: "📅 20/09/2026 (o días previos según clima)\n👥 5 personas\n🚐 Mini-van privada con Ken Kaneshima\n⏰ Día completo\n📍 Tokio ↔ Lagos del Fuji\n⚠️ Según itinerario: Contactar para confirmar disponibilidad y bloquear el día con el guía Ken.",
    deadline: "Hacer cuanto antes",
  },
  {
    id: "kyoto-kanazawa",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Kioto → Kanazawa",
    detail: "📅 12/09/2026\n👥 5 personas\n🚆 Thunderbird + Hokuriku Shinkansen\n⏰ Salida objetivo: ~08:10\n📍 Kyoto → Tsuruga → Kanazawa\n💳 Comprar: JR-WEST ONLINE TRAIN RESERVATION (Por adelantado)\n⚠️ Reservar asientos juntos ordinarios para 5 personas. Es un billete combinado.",
    deadline: "1 mes antes (12/08/2026 10:00 JST)",
  },
  {
    id: "bus-magome",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Nohi Bus Takayama → Magome",
    detail: "📅 14/09/2026\n👥 5 personas\n🚌 Nohi Bus Directo\n⏰ Salida objetivo: 08:00\n📍 Takayama Nohi Bus Center → Magome\n💳 Comprar: Japan Bus Online / Web de Nohi Bus (Por adelantado)\n⚠️ Es el bus directo. Se llena rápido en temporada alta.",
    deadline: "1 mes antes (14/08/2026)",
  },
  {
    id: "shinano",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar JR Shinano (Nakatsugawa → Nagoya)",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 JR Shinano Limited Express 4\n⏰ Salida objetivo: ~09:57\n📍 Nakatsugawa → Nagoya\n💳 Comprar: JR Central (SmartEX/JR-West online) (Por adelantado)\n⚠️ Tren popular para volver de los Alpes. Reservar juntos para 5 personas.",
    deadline: "1 mes antes (15/08/2026)",
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
    id: "entradas-tokio",
    category: "reserva",
    urgency: "media",
    title: "🟠 Comprar Entradas TeamLab / Shibuya Sky / Mori Tower",
    detail: "📅 Durante los días de Tokio (16-19 sep)\n👥 5 personas\n🎟️ Entradas digitales\n📍 Tokio\n⚠️ Shibuya Sky (atardecer) y Mori Tower se agotan muy rápido. Se deben sacar el primer día que abran (suelen abrir 4 semanas antes a medianoche en Japón).",
    deadline: "4 semanas antes (~18/08/2026)",
  },
  {
    id: "shinkansen-fuji",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Kodama (Excursión Fuji Ida/Vuelta)",
    detail: "📅 20/09/2026\n👥 5 personas\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805 (Ida) y regreso\n⏰ Salida objetivo: 07:27\n📍 Tokio ↔ Mishima/Shin-Fuji\n💳 Comprar: SmartEX App/Web (Por adelantado)\n⚠️ OBLIGATORIO: Tomar este tren específico para la ida para llegar a la hora de encuentro con el guía Ken.",
    deadline: "1 mes antes (20/08/2026)",
  },
  {
    id: "cena-takayama",
    category: "reserva",
    urgency: "media",
    title: "🟠 Reservar Cena de Hida Beef en Takayama",
    detail: "📅 13/09/2026\n👥 5 personas\n🥩 Restaurante local\n⏰ Salida objetivo: ~19:00\n📍 Takayama\n⚠️ Es domingo y las tiendas de Takayama cierran pronto (17:00). Los restaurantes populares se llenan. Para cenar juntos wagyu/Hida beef sin hacer cola, es muy recomendable llevar reserva.",
    deadline: "Antes de viajar",
  },
  {
    id: "narita-express-vuelta",
    category: "reserva",
    urgency: "media",
    title: "🟠 Reservar Narita Express (N'EX) Vuelta",
    detail: "📅 21/09/2026\n👥 5 personas\n🚆 JR Narita Express\n📍 Tokio → Aeropuerto de Narita\n💳 Comprar: JR East Web o taquillas (Por adelantado)\n⚠️ El N'EX requiere asiento reservado. Para asegurar la llegada al aeropuerto, comprad el de vuelta al menos el día anterior.",
    deadline: "Antes de viajar",
  },
  {
    id: "esim-suica",
    category: "logistica",
    urgency: "media",
    title: "🟠 Logística Digital: eSIM, Suica y Visit Japan Web",
    detail: "📅 Antes del vuelo (Septiembre)\n👥 5 personas\n📱 Móvil\n⚠️ Comprar eSIMs y configurar las Suica digitales en Apple Wallet. Generar códigos QR de Visit Japan Web.",
    deadline: "Días antes de volar",
  },
  {
    id: "equipaje",
    category: "logistica",
    urgency: "baja",
    title: "🟡 Gestionar Envío de Equipaje (Takkyubin)",
    detail: "📅 12/09/2026 (Mañana)\n👥 5 maletas grandes\n📦 Servicio de paquetería (Yamato/Sagawa)\n📍 Hotel Kioto → Hotel Tokio\n⚠️ Confirmar al hacer check-in en Kioto si pueden enviar las maletas directamente a Tokio (Koko Hotel) para viajar por los Alpes solo con mochila. Guardar los resguardos.",
    deadline: "12 Sept (durante el viaje)",
  },
  {
    id: "mochilas-magome",
    category: "logistica",
    urgency: "baja",
    title: "🟢 Envío Mochilas Nakasendo (Magome ↔ Tsumago)",
    detail: "📅 14/09/2026\n📍 Oficina de Turismo Magome (08:30–11:30)\n⚠️ Dejar las mochilas en Magome para caminar ligeros hasta Tsumago. ¥500 por bulto aprox.",
    deadline: "14 Sept (mismo día)",
  },
  {
    id: "desayunos",
    category: "logistica",
    urgency: "baja",
    title: "🟢 Desayunos de Convivencia",
    detail: "📅 7 Sept (para Fushimi Inari) y 14 Sept (en Magome para el tren)\n📍 Konbini local\n⚠️ El alojamiento de Magome no da desayuno y la salida a Fushimi Inari del día 2 es demasiado temprana. Comprar en konbinis la noche antes.",
    deadline: "7 y 14 Sept (mismo día)",
  },
];

export const categoryLabels = {
  reserva: { label: "Reservas y Billetes", emoji: "🎟️" },
  logistica: { label: "Logística y Organización", emoji: "📦" },
};

export const urgencyConfig = {
  alta: { label: "Urgente", color: "#bc4749" },
  media: { label: "Importante", color: "#c9a227" },
  baja: { label: "En destino / Cuando puedas", color: "#2e7d5b" },
};
