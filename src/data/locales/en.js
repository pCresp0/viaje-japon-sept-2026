// Superposición de traducción — en
// Sólo contiene texto traducido; todo lo demás se hereda.

import { days } from "./trip_days_en";
import { historyPeriods, furtherReading } from "./history_en";
import { guides } from "./guides_en";
import { popCulture } from "./popCulture_en";
import { tripMeta, flights, blocks, stays, transports, budget } from "./trip_extra_en";
import { stops as mapStops, filterData as mapFilterData, mapLabels } from "./mapData_en";
import { weatherData, dailyWeather, weatherLabels } from "./weatherData_en";

export default {
  weatherData, dailyWeather, weatherLabels,
  mapStops, mapFilterData, mapLabels,
  tripMeta,
  flights,
  blocks,
  stays,
  transports,
  budget,
  popCulture,
  guides,
  historyPeriods,
  furtherReading,
  days,
  foodCategories: [
    { title: "Must-try" },
    { title: "By trip area" },
    { title: "Street & fast food" },
    { title: "Sweets & drinks" }
  ],
  foods: [
    { name: "Ramen", where: "Nationwide · Ippudo and local spots", desc: "Noodles in rich broth (shoyu, miso, tonkotsu...). Every neighborhood in Japan has its style. Order whatever looks good at the ticket machine or bar.", tip: "In many places you order from a vending machine: select your dish, pay, and give the ticket to the chef." },
    { name: "Sushi / sashimi", where: "Toyosu, markets, kaiten-zushi", desc: "Vinegared rice with raw fish (sushi) or just the fish (sashimi). Definitely worth it at Toyosu or a good local neighborhood spot.", tip: "Wasabi is often already in the nigiri: no need to spread more. Ginger cleanses the palate between pieces." },
    { name: "Tempura", where: "Kyoto, Tokyo", desc: "Very light battered vegetables and seafood. Kyoto has excellent places; also available in daily menus (teishoku).", tip: "Dip it in tentsuyu (broth) or just sprinkle with salt. Don't soak it." },
    { name: "Tonkatsu", where: "Tokyo · Katsukura and similar", desc: "Breaded pork cutlet, crispy outside and juicy inside. Usually served with rice, miso, and shredded cabbage.", tip: "Crush the sauce in the sesame mortar at your table: it tastes much better." },
    { name: "Wagyu / yakiniku", where: "Takayama (Hida beef), Tokyo", desc: "Intensely marbled Japanese beef. In Takayama, Hida beef rivals Kobe. Grilled at the table or in a steakhouse.", tip: "Small pieces: cooks to perfection in seconds. Don't let it char." },
    { name: "Okonomiyaki", where: "Osaka · Dotonbori / Shinsekai", desc: "Savory pancake with cabbage, batter, and toppings (pork, seafood...). In Osaka, you often cook it yourself on the table grill.", tip: "Osaka style = mix everything. Hiroshima style = in layers. Try the Osaka one on this trip." },
    { name: "Takoyaki", where: "Osaka · street food", desc: "Dough balls with a piece of octopus, sauce, mayonnaise, and katsuobushi (smoked bonito that 'dances' with the heat).", tip: "They are boiling inside: take the first bite carefully." },
    { name: "Kushikatsu", where: "Osaka · Shinsekai", desc: "Breaded and deep-fried skewers (meat, vegetables, cheese...). A specialty of the Shinsekai neighborhood.", tip: "Sacred rule: do not dip the stick twice in the shared sauce (no double dipping)." },
    { name: "Kaiseki", where: "Kyoto", desc: "Seasonal tasting menu, dish by dish, very visual. Japanese haute cuisine rooted in the tea ceremony.", tip: "If you want an affordable one, look for 'kaiseki lunch' at noon — cheaper than dinner." },
    { name: "Matcha and wagashi", where: "Kyoto · Uji / Gion", desc: "Whisked powdered green tea and traditional sweets (mochi, yokan...). In Kyoto, matcha is a religion.", tip: "The bitterness of the matcha is balanced by the sweet: eat the wagashi first or at the same time." },
    { name: "Hida beef bun / mitarashi", where: "Takayama · old town", desc: "In Sanmachi Suji: steamed buns with Hida beef, mitarashi dango skewers, and local sake.", tip: "Perfect for a snack between temples and wooden streets." },
    { name: "Unagi (eel)", where: "Tokyo, Kyoto", desc: "Grilled eel with sweet-savory sauce over rice (unadon / unaju). Highly appreciated in summer, but eaten year-round.", tip: "Expensive but a clear experience. Order unajū if you want the full lacquered box." },
    { name: "Onigiri", where: "Konbini (7-Eleven, FamilyMart, Lawson)", desc: "Rice triangles with filling (salmon, umeboshi, tuna-mayo...) wrapped in nori. Perfect breakfast or snack.", tip: "The konbini wrapper has a trick: pull the tabs in 1-2-3 order so you don't wet the seaweed." },
    { name: "Gyoza", where: "Ramen shops and izakayas", desc: "Pan-fried dumplings, crispy on one side. Almost always pork and vegetable.", tip: "Typical sauce: soy sauce + vinegar + a few drops of rayu (chili oil)." },
    { name: "Yakitori", where: "Shinjuku · Omoide Yokocho, izakayas", desc: "Grilled chicken (and more) skewers, with salt or tare sauce. Perfect with a beer at the end of the day.", tip: "In Omoide Yokocho the atmosphere is the dish: narrow, smoke, and neon." },
    { name: "Karaage", where: "Izakayas, konbinis", desc: "Marinated fried chicken. Crispy, juicy, addictive. Also surprisingly high quality at 7-Eleven.", tip: "Elevates to another level with Japanese mayonnaise (Kewpie)." },
    { name: "Udon / soba", where: "Stations, Kyoto, Tokyo", desc: "Udon = thick wheat noodles. Soba = buckwheat, thinner. In hot broth or cold with dip (zaru).", tip: "It's still warm in September: cold zaru soba is very pleasant." },
    { name: "Ekiben", where: "Shinkansen stations", desc: "Station bento, local specialty to eat on the train. Part of the Shinkansen ritual.", tip: "Plenty available at Nagoya or Tokyo Station before the Nozomi. Buy a different one for each long trip." },
    { name: "Taiyaki / mochi", where: "Asakusa, fairs, Nakamise", desc: "Taiyaki: fish-shaped waffle filled with anko (sweet bean paste) or cream. Mochi: glutinous rice cake.", tip: "In Nakamise (Asakusa) there are classic stalls to snack while you walk." },
    { name: "Sake / highball", where: "Izakayas, Takayama, Kyoto", desc: "Sake (nihonshu) cold or hot depending on the type. Highball = whisky + soda, very popular and refreshing.", tip: "Very good local sake in Takayama. Order 'karakuchi' if you want it drier." },
    { name: "Japanese breakfast", where: "Hotels, kissaten", desc: "Rice, miso, grilled fish, natto or egg, seaweed, and tsukemono. Complete and savory.", tip: "If the hotel offers it, try it at least one day. Cheap alternative: onigiri + coffee at konbini." }
  ],
  pendingItems: [
    {
      id: "cena-magome",
      category: "logistica",
      urgency: "alta",
      title: "🔴 Confirm Dinner Magome Chaya (Juan Carlos)",
      detail: "👤 Responsible: Juan Carlos\n📅 14/09/2026\n👥 5 people\n🍱 Minshuku Dinner\n⏰ Time: exactly 18:00\n📍 Magome Chaya\n⚠️ Accommodation requires confirmation to serve dinner. Juan Carlos must email Jeng: 5 guests, arrival 14/09, time 18:00. Without confirmation there is no dinner (¥3,630/person).",
      deadline: "Do it now (Juan Carlos)",
    },
    {
      id: "recogida-billetes-jrwest",
      title: "🎟️ PICK UP JR-WEST TICKETS — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Recommended evening)\n📍 Kyoto Station (Green machines 5489)\n🎟️ Physically pick up JR-West reservation #47932.\n⚠️ REQUIRED:\n- Physical Mastercard (**8625) used for payment.\n- Reservation number (47932).\n- 4-digit Identification Number (PIN).",
      deadline: "11/09/2026",
    },
    {
      id: "shinano-recogida",
      category: "logistica",
      urgency: "alta",
      title: "🎫 COLLECT PHYSICAL TICKETS — Shinano 4 (ALREADY PAID)",
      detail: "📅 15/09/2026 (or earlier at a JR-WEST station if possible)\n🚆 Shinano 4 · Nakatsugawa 09:57 → Nagoya 10:53\n🟢 Reservation DONE: No. 42093 · Receipt AEE6606M · ¥14,350\n📍 Collect OUTSIDE ticket gates\n⚠️ BRING: physical Mastercard ending 8625 · PIN = Pablo's birthday · Reservation 42093\nPLAN B: at Nakatsugawa ~08:40 (77 min before departure).",
      deadline: "Before boarding Shinano 4 (15/09 09:57)",
    },
    {
      id: "maletas-dimensiones",
      category: "logistica",
      urgency: "media",
      title: "🧳 Check suitcase dimensions",
      detail: "📅 Before the trip\n👥 5 suitcases\n🚄 Relevant for Shinkansen (e.g. Nozomi 358 already purchased in Ordinary Car)\n⚠️ Measure length + width + height:\n- ≤ 160 cm: OK without special zone\n- >160 cm and ≤250 cm: would need oversized baggage seat\nDo not change existing bookings without measuring real dimensions.",
      deadline: "Before flying",
    },
    {
      id: "nozomi-vuelta-prep",
      category: "logistica",
      urgency: "media",
      title: "📱 Prepare Smart EX access — Nozomi 358 (ALREADY PURCHASED)",
      detail: "📅 15/09/2026\n🚄 Nozomi 358 · Nagoya 11:29 → Tokyo 13:06\n🟢 Reservation DONE: Smart EX No. 2002 · ¥54,500 · Car 12\n📱 Save QR-Ticket (primary option) or designate IC card\n📧 Keep Smart EX email/confirmation on the phone\n⚠️ NOT a mandatory JR-WEST-style physical pickup.",
      deadline: "Before 15/09",
    },
    {
      id: "entradas-tokio",
      category: "reserva",
      urgency: "media",
      title: "🟠 Buy Tickets TeamLab / Shibuya Sky / Mori Tower",
      detail: "📅 During Tokyo days (16-19 sept)\n👥 5 people\n🎟️ Digital tickets\n📍 Tokyo\n⚠️ Shibuya Sky (sunset) and Mori Tower sell out very fast. Buy as soon as sales open (usually 4 weeks before at midnight in Japan).",
      deadline: "4 weeks before (~18/08/2026)",
    },
    {
      id: "shinkansen-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Book Shinkansen for Fuji Excursion (Round trip)",
      detail: "📅 20/09/2026\n👥 5 people\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805 (Outbound 07:27) and return Shin-Fuji→Tokyo\n📍 Tokyo ↔ Mishima / Shin-Fuji\n💳 Buy: Smart EX App/Web\n⚠️ Tour with guide Ken already confirmed for 20/09. Buy Shinkansen tickets on Smart EX (1 month before / 20 August 10:00 JST). Leave hotel ~06:30 to walk to Tawaramachi, Ginza Line to Ueno, connect to Tokyo Station with margin.",
      deadline: "1 month before (20/08/2026)",
    },
    {
      id: "cena-takayama",
      category: "reserva",
      urgency: "media",
      title: "🟠 Book Hida Beef Dinner in Takayama",
      detail: "📅 13/09/2026\n👥 5 people\n🥩 Local Wagyu/Hida beef restaurant\n⏰ Target: ~19:00\n📍 Takayama\n⚠️ Sunday night: many shops close at 17:00. Highly recommended to book ahead to dine together as 5.",
      deadline: "Before traveling",
    },
    {
      id: "narita-transporte-vuelta",
      category: "reserva",
      urgency: "media",
      title: "🟠 Decide / Book Transport to Narita (Skyliner or N'EX)",
      detail: "📅 21/09/2026\n👥 5 people\n🚆 Keisei Skyliner (Recommended from Keisei-Ueno) or JR N'EX (from Tokyo Station)\n📍 KOKO HOTEL Asakusa → Narita Airport\n💡 Recommendation: From Asakusa/Kappabashi hotel, easier to take a taxi with luggage to Keisei-Ueno then Skyliner direct to Narita. N'EX remains a valid alternative.\n⚠️ Check final Sept 2026 schedules and book ahead or on arrival for the 17:25 flight.",
      deadline: "🟠 DECIDE / BOOK",
    },
    {
      id: "esim-suica",
      category: "logistica",
      urgency: "media",
      title: "🟠 Digital Logistics: Suica and Visit Japan Web",
      detail: "📱 iPhone: official 'Welcome Suica Mobile' in Apple Wallet (needs location on; if issue/recharge fails from Spain due to country restrictions, create it on landing in Japan).\n🤖 Foreign Android: no Welcome Suica Mobile. Android user must buy a physical Welcome Suica at Narita.\n💳 Welcome Suica card: no ¥500 (~3€) deposit; balance non-refundable. Recommended initial top-up: ¥3,000–¥5,000 (~16–27€) per person.\n🌐 Visit Japan Web: immigration/customs QR codes generated for all 5 travelers.",
      deadline: "Days before flying",
    },
    {
      id: "equipaje",
      category: "logistica",
      urgency: "baja",
      title: "🟡 Manage Luggage Forwarding (Takkyubin)",
      detail: "📅 12/09/2026 (Checkout morning)\n👥 5 large suitcases\n📦 Courier (Yamato/Sagawa)\n📍 Hotel Keihan Kyoto → KOKO HOTEL Residence Asakusa Kappabashi (Tokyo)\n⚠️ Send large bags from Kyoto to Tokyo to travel the Alps with backpacks only. Without large luggage on days 12, 13, 14 and part of 15. On 12/09 confirm at Kyoto reception, verify Tokyo hotel accepts delivery, keep tracking.",
      deadline: "12 Sept (checkout morning)",
    },
    {
      id: "mochilas-magome",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Backpack Forwarding Nakasendo (Magome ↔ Tsumago)",
      detail: "📅 14/09/2026\n📍 Magome Tourist Office (08:30–11:30)\n⚠️ Drop bags in Magome (¥500/piece (~3€)) for the 8 km hike; collect in Tsumago after 13:00.",
      deadline: "14 Sept (same day)",
    },
    {
      id: "desayunos",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Convenience Breakfasts (Konbini)",
      detail: "📅 Nights of 7 Sept (early Fushimi Inari) and 14 Sept (Magome for the bus)\n📍 7-Eleven / Lawson / FamilyMart\n⚠️ Magome Chaya has no breakfast; early mornings need food bought the night before.",
      deadline: "7 and 14 Sept (same day)",
    },
  ],
  categoryLabels: {
    reserva: { label: "Reservations" },
    logistica: { label: "Logistics" }
  },
  urgencyConfig: {
    alta: { label: "Urgent" },
    media: { label: "Important" },
    baja: { label: "Whenever possible" }
  }
};
