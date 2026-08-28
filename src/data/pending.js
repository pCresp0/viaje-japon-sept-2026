// Cosas pendientes de decidir o reservar antes del viaje.
// Extraído de la planificación: alojamientos duplicados, actividades que
// requieren reserva anticipada y avisos logísticos.

export const pendingItems = [
  {
    id: "nozomi-ida",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Nozomi (Ida)",
    detail: "📅 07/09/2026\n👥 5 personas\n🚆 Shinkansen Nozomi\n⏰ Salida objetivo: ~16:54\n📍 Shinagawa → Kioto\n💳 Comprar: SmartEX App/Web\n⚠️ OBLIGATORIO: Asientos con 'Oversized Baggage' para maletas grandes. Reservar juntos (ventanillas derechas E para ver Fuji).",
    deadline: "1 mes antes (07/08/2026 10:00 JST)",
  },
  {
    id: "kyoto-kanazawa",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Kioto → Kanazawa",
    detail: "📅 12/09/2026\n👥 5 personas\n🚆 Thunderbird + Hokuriku Shinkansen\n⏰ Salida objetivo: ~08:10\n📍 Kyoto → Tsuruga → Kanazawa\n💳 Comprar: JR-WEST ONLINE TRAIN RESERVATION\n⚠️ Reservar asientos juntos ordinarios. Es un billete combinado.",
    deadline: "1 mes antes (12/08/2026 10:00 JST)",
  },
  {
    id: "bus-magome",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Nohi Bus Takayama → Magome",
    detail: "📅 14/09/2026\n👥 5 personas\n🚌 Nohi Bus Directo\n⏰ Salida objetivo: 08:00\n📍 Takayama Nohi Bus Center → Magome\n💳 Comprar: Japan Bus Online / Web de Nohi Bus\n⚠️ Es el bus directo. Se llena rápido en temporada alta.",
    deadline: "1 mes antes",
  },
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
    detail: "📅 20/09/2026 (o días previos según clima)\n👥 5 personas\n🚐 Mini-van privada con Ken Kaneshima\n⏰ Día completo\n📍 Tokio ↔ Lagos del Fuji\n⚠️ Según itinerario: Reservar 3-4 días y cancelar los de peor clima. Contactar por web o teléfono para confirmar política de cancelación y bloquear los días.",
    deadline: "Hacer cuanto antes",
  },
  {
    id: "nozomi-vuelta",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Nozomi (Vuelta a Tokio)",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 Shinkansen Nozomi\n⏰ Salida objetivo: ~11:00\n📍 Nagoya → Tokio\n💳 Comprar: SmartEX App/Web\n⚠️ OBLIGATORIO: Asientos con 'Oversized Baggage'.",
    deadline: "1 mes antes (15/08/2026 10:00 JST)",
  },
  {
    id: "shinano",
    category: "reserva",
    urgency: "media",
    title: "🟠 Reservar JR Shinano (Nakatsugawa → Nagoya)",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 JR Shinano Limited Express 4\n⏰ Salida objetivo: ~09:57\n📍 Nakatsugawa → Nagoya\n💳 Comprar: JR Central (SmartEX/JR-West online)\n⚠️ Tren popular para volver de los Alpes. Reservar juntos.",
    deadline: "1 mes antes",
  },
  {
    id: "entradas-tokio",
    category: "reserva",
    urgency: "media",
    title: "🟠 Comprar Entradas TeamLab / Shibuya Sky / Mori Tower",
    detail: "📅 Durante los días de Tokio (16-19 sep)\n👥 5 personas\n🎟️ Entradas digitales\n📍 Tokio\n⚠️ Shibuya Sky (atardecer) y Mori Tower se agotan muy rápido. Si el grupo va a subir, se deben sacar el primer día que abran (suelen abrir 4 semanas antes a medianoche en Japón).",
    deadline: "1 mes antes",
  },
  {
    id: "esim-suica",
    category: "logistica",
    urgency: "media",
    title: "🟠 Logística Digital: eSIM, Suica y Visit Japan Web",
    detail: "📅 Antes del vuelo (Septiembre)\n👥 5 personas\n📱 Móvil\n⚠️ Comprar eSIMs y configurar las Suica digitales en Apple Wallet. Generar códigos QR de Visit Japan Web.",
    deadline: "Antes de viajar",
  },
  {
    id: "equipaje",
    category: "logistica",
    urgency: "baja",
    title: "🟡 Gestionar Envío de Equipaje (Takkyubin)",
    detail: "📅 12/09/2026 (Mañana)\n👥 5 maletas grandes\n📦 Servicio de paquetería (Yamato/Sagawa)\n📍 Hotel Kioto → Hotel Tokio\n⚠️ Confirmar al hacer check-in en Kioto si pueden enviar las maletas directamente a Tokio (Koko Hotel) para viajar por los Alpes solo con mochila. Guardar los resguardos.",
    deadline: "Durante el viaje",
  },
  {
    id: "cena-takayama",
    category: "reserva",
    urgency: "baja",
    title: "🟡 Reservar Cena de Hida Beef en Takayama",
    detail: "📅 13/09/2026\n👥 5 personas\n🥩 Restaurante local\n⏰ Salida objetivo: ~19:00\n📍 Takayama\n⚠️ Es domingo y las tiendas de Takayama cierran pronto (17:00). Los restaurantes populares se llenan. Para cenar juntos wagyu/Hida beef sin hacer cola, es muy recomendable llevar reserva.",
    deadline: "Antes de viajar",
  },
  {
    id: "mochilas-magome",
    category: "logistica",
    urgency: "baja",
    title: "🟢 Envío Mochilas Nakasendo (Magome ↔ Tsumago)",
    detail: "📅 14/09/2026\n📍 Oficina de Turismo Magome (08:30–11:30)\n⚠️ Dejar las mochilas en Magome para caminar ligeros hasta Tsumago. ¥500 por bulto aprox.",
    deadline: "Mismo día",
  },
  {
    id: "desayunos",
    category: "logistica",
    urgency: "baja",
    title: "🟢 Desayunos de Convivencia",
    detail: "📅 7 Sept (para Fushimi Inari) y 14 Sept (en Magome para el tren)\n📍 Konbini local\n⚠️ El alojamiento de Magome no da desayuno y la salida a Fushimi Inari del día 2 es demasiado temprana. Comprar en konbinis la noche antes.",
    deadline: "Mismo día",
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
