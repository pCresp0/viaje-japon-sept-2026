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
    title: "🔴 Confirmar Cena Magome Chaya (Juan Carlos)",
    detail: "👤 Responsable: Juan Carlos\n📅 14/09/2026\n👥 5 personas\n🍱 Cena de Minshuku\n⏰ Hora: 18:00 exactas\n📍 Magome Chaya\n⚠️ El alojamiento exige confirmación para servir la cena. Juan Carlos debe enviar email a Jeng indicando: 5 comensales, llegada 14/09, hora 18:00. Sin confirmación no hay cena (¥3.630/persona).",
    deadline: "Hacer ya (Juan Carlos)",
  },
  {
    id: "recogida-billetes-jrwest",
    category: "logistica",
    urgency: "alta",
    title: "🎟️ RECOGER BILLETES JR-WEST — KYOTO → KANAZAWA",
    detail: "📅 11/09/2026 (Recomendado tarde/noche)\n📍 Kyoto Station (Máquinas verdes 5489)\n🎟️ Recoger físicamente la reserva JR-West nº 47932.\n⚠️ OBLIGATORIO LLEVAR:\n- La tarjeta física Mastercard (**8625) utilizada para el pago.\n- El número de reserva (47932).\n- Recordar el Identification Number (PIN) de 4 dígitos.",
    deadline: "11/09/2026",
  },
  {
    id: "bus-magome",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Nohi Bus Takayama → Magome",
    detail: "📅 14/09/2026\n👥 5 personas\n🚌 Nohi Bus Directo\n⏰ Salida: 08:00 → Llegada aprox: 10:45\n📍 Takayama Nohi Bus Center → Magome\n💳 Comprar: Japan Bus Online / Web oficial de Nohi Bus\n💰 Precio: ¥5.000 por persona (¥25.000 total grupo)\n⚠️ Bus directo imprescindible para la ruta Nakasendo. Reserva obligatoria.",
    deadline: "🔴 RESERVAR AHORA",
  },
  {
    id: "shinano",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar JR Limited Express Shinano 4",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 JR Shinano Limited Express 4\n⏰ Horario: 09:57 → 10:53\n📍 Nakatsugawa → Nagoya\n💳 Comprar: Canales oficiales de JR / taquilla en estación\n⚠️ NO se reserva por Smart EX (es un tren convencional Limited Express). Recomendar comprar el billete completo con asiento reservado.",
    deadline: "🔴 RESERVAR / COMPRAR",
  },
  {
    id: "nozomi-vuelta",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Nozomi (Nagoya → Tokio)",
    detail: "📅 15/09/2026\n👥 5 personas\n🚆 Tokaido Shinkansen Nozomi\n⏰ Salida objetivo: ~11:20–11:30 (deja margen suficiente tras llegar el Shinano a las 10:53; NO reservar a las 11:00)\n📍 Nagoya → Tokio\n💳 Comprar: Smart EX App/Web\n🧳 Equipaje: Medir maletas antes de reservar. Si largo+ancho+alto > 160 cm, seleccionar 'Seat with Oversized Baggage Area'. Si ≤ 160 cm, asiento ordinario estándar.",
    deadline: "🔴 RESERVAR AHORA / CUANDO SE ABRA",
  },
  {
    id: "entradas-tokio",
    category: "reserva",
    urgency: "media",
    title: "🟠 Comprar Entradas TeamLab / Shibuya Sky / Mori Tower",
    detail: "📅 Durante los días de Tokio (16-19 sep)\n👥 5 personas\n🎟️ Entradas digitales\n📍 Tokio\n⚠️ Shibuya Sky (atardecer) y Mori Tower se agotan con rapidez. Comprar en cuanto abran ventas (habitualmente 4 semanas antes a medianoche en Japón).",
    deadline: "4 semanas antes (~18/08/2026)",
  },
  {
    id: "shinkansen-fuji",
    category: "reserva",
    urgency: "alta",
    title: "🔴 Reservar Shinkansen Excursión Fuji (Ida/Vuelta)",
    detail: "📅 20/09/2026\n👥 5 personas\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805 (Ida 07:27) y regreso Shin-Fuji→Tokio\n📍 Tokio ↔ Mishima / Shin-Fuji\n💳 Comprar: Smart EX App/Web\n⚠️ Excursión con el guía Ken ya confirmada para el 20/09. Comprar billetes de Shinkansen en Smart EX (1 mes antes / 20 de agosto a las 10:00 JST). Recordar salir del hotel ~06:30 para caminar a Tawaramachi, tomar Ginza Line a Ueno y conectar a Tokyo Station con margen.",
    deadline: "1 mes antes (20/08/2026)",
  },
  {
    id: "cena-takayama",
    category: "reserva",
    urgency: "media",
    title: "🟠 Reservar Cena de Hida Beef en Takayama",
    detail: "📅 13/09/2026\n👥 5 personas\n🥩 Restaurante local de Wagyu/Hida beef\n⏰ Salida objetivo: ~19:00\n📍 Takayama\n⚠️ Domingo noche: muchas tiendas y locales cierran a las 17:00. Muy recomendable llevar reserva previa para cenar juntos los 5.",
    deadline: "Antes de viajar",
  },
  {
    id: "narita-transporte-vuelta",
    category: "reserva",
    urgency: "media",
    title: "🟠 Decidir / Reservar Transporte a Narita (Skyliner o N'EX)",
    detail: "📅 21/09/2026\n👥 5 personas\n🚆 Keisei Skyliner (Recomendado desde Keisei-Ueno) o JR N'EX (desde Tokyo Station)\n📍 KOKO HOTEL Asakusa → Aeropuerto de Narita\n💡 Recomendación: Por ubicación del hotel en Asakusa/Kappabashi, es más cómodo tomar taxi con maletas hasta Keisei-Ueno y allí el Keisei Skyliner directo a Narita. El N'EX sigue siendo alternativa válida.\n⚠️ Comprobar horarios definitivos de septiembre 2026 y reservar con antelación o al llegar a Japón para el vuelo de las 17:25.",
    deadline: "🟠 DECIDIR / RESERVAR",
  },
  {
    id: "esim-suica",
    category: "logistica",
    urgency: "media",
    title: "🟠 Logística Digital: Suica y Visit Japan Web",
    detail: "📱 iPhone: App oficial 'Welcome Suica Mobile' en Apple Wallet (requiere localización activa; si la emisión/recarga falla desde España por restricciones de país, crearla al aterrizar en Japón).\n🤖 Android extranjero: No dispone de Welcome Suica Mobile. El hermano con Android debe adquirir una tarjeta física Welcome Suica en Narita.\n💳 Tarjeta Welcome Suica: Sin depósito de 500¥; saldo no reembolsable. Recarga inicial recomendada: ¥3.000–¥5.000 por persona.\n🌐 Visit Japan Web: Códigos QR de inmigración y aduanas generados para los 5 viajeros.",
    deadline: "Días antes de volar",
  },
  {
    id: "equipaje",
    category: "logistica",
    urgency: "baja",
    title: "🟡 Gestionar Envío de Equipaje (Takkyubin)",
    detail: "📅 12/09/2026 (Mañana del check-out)\n👥 5 maletas grandes\n📦 Servicio de paquetería (Yamato/Sagawa)\n📍 Hotel Keihan Kioto → KOKO HOTEL Residence Asakusa Kappabashi (Tokio)\n⚠️ Enviar maletas grandes desde Kioto a Tokio para viajar por los Alpes (Kanazawa, Shirakawa-go, Takayama, Magome, Tsumago) ligeros solo con mochila. Estaremos sin maleta grande durante los días 12, 13, 14 y parte del 15. El 12/09 confirmar en recepción de Kioto el envío, verificar que el hotel de Tokio acepta recepción y guardar resguardos/tracking.",
    deadline: "12 Sept (mañana del check-out)",
  },
  {
    id: "mochilas-magome",
    category: "logistica",
    urgency: "baja",
    title: "🟢 Envío Mochilas Nakasendo (Magome ↔ Tsumago)",
    detail: "📅 14/09/2026\n📍 Oficina de Turismo Magome (08:30–11:30)\n⚠️ Dejar mochilas/bultos en Magome (¥500/pieza) para hacer la caminata de 8 km y recogerlos en Tsumago tras las 13:00.",
    deadline: "14 Sept (mismo día)",
  },
  {
    id: "desayunos",
    category: "logistica",
    urgency: "baja",
    title: "🟢 Desayunos de Convivencia (Konbini)",
    detail: "📅 Noches del 7 Sept (para madrugón a Fushimi Inari) y 14 Sept (en Magome para el bus)\n📍 7-Eleven / Lawson / FamilyMart\n⚠️ Magome Chaya no ofrece desayuno y las mañanas tempranas requieren llevar comida comprada la noche previa.",
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
