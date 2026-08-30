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
      id: "nozomi-ida",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Book Shinkansen Nozomi (Outbound)",
      detail: "📅 07/09/2026\n👥 5 people\n🚆 Shinkansen Nozomi\n⏰ Target departure: ~16:54\n📍 Shinagawa → Kyoto\n💳 Buy: SmartEX App/Web\n⚠️ MANDATORY: Seats with 'Oversized Baggage' for large suitcases. Book together (right side window E seats to see Fuji).",
      deadline: "1 month before (07/08/2026 10:00 JST)",
    },
    {
      id: "recogida-billetes-jrwest",
      title: "🎟️ PICK UP JR-WEST TICKETS — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Recommended evening)\n📍 Kyoto Station (Green machines 5489)\n🎟️ Physically pick up JR-West reservation #47932.\n⚠️ REQUIRED:\n- Physical Mastercard (**8625) used for payment.\n- Reservation number (47932).\n- 4-digit Identification Number (PIN).",
      deadline: "11/09/2026",
    },

    {
      id: "cena-magome",
      category: "logistica",
      urgency: "alta",
      title: "🔴 Confirm Dinner Magome Chaya (Juan Carlos)",
      detail: "👤 Responsible: Juan Carlos\n📅 14/09/2026\n👥 5 people\n🍱 Minshuku Dinner\n⏰ Time: exactly 18:00\n📍 Magome Chaya\n⚠️ Accommodation requires confirmation to serve dinner. Juan Carlos must send an email to Jeng indicating: 5 guests, arrival 14/09, time 18:00. Without confirmation there is no dinner (¥3,630/person).",
      deadline: "Do it now (Juan Carlos)",
    },
    {
      id: "tour-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Book Private Fuji Tour",
      detail: "📅 20/09/2026 (or previous days depending on weather)\n👥 5 people\n🚐 Private mini-van with Ken Kaneshima\n⏰ Full day\n📍 Tokyo ↔ Fuji Lakes\n⚠️ According to itinerary: Book 3-4 days and cancel the worst weather ones. Contact via web or phone to confirm cancellation policy and block the days.",
      deadline: "Do it ASAP",
    },
    {
      id: "nozomi-vuelta",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Book Shinkansen Nozomi (Return to Tokyo)",
      detail: "📅 15/09/2026\n👥 5 people\n🚆 Shinkansen Nozomi\n⏰ Target departure: ~11:00\n📍 Nagoya → Tokyo\n💳 Buy: SmartEX App/Web\n⚠️ MANDATORY: Seats with 'Oversized Baggage'.",
      deadline: "1 month before (15/08/2026 10:00 JST)",
    },
    {
      id: "shinano",
      category: "reserva",
      urgency: "media",
      title: "🟠 Book JR Shinano (Nakatsugawa → Nagoya)",
      detail: "📅 15/09/2026\n👥 5 people\n🚆 JR Shinano Limited Express 4\n⏰ Target departure: ~09:57\n📍 Nakatsugawa → Nagoya\n💳 Buy: JR Central (SmartEX/JR-West online)\n⚠️ Popular train to return from the Alps. Book together.",
      deadline: "1 month before",
    },
    {
      id: "entradas-tokio",
      category: "reserva",
      urgency: "media",
      title: "🟠 Buy Tickets TeamLab / Shibuya Sky / Mori Tower",
      detail: "📅 During Tokyo days (16-19 sept)\n👥 5 people\n🎟️ Digital tickets\n📍 Tokyo\n⚠️ Shibuya Sky (sunset) and Mori Tower sell out very fast. If the group wants to go, tickets must be bought the first day they open (usually open 4 weeks before at midnight in Japan).",
      deadline: "1 month before",
    },
    {
      id: "esim-suica",
      category: "logistica",
      urgency: "media",
      title: "🟠 Digital Logistics: eSIM, Suica and Visit Japan Web",
      detail: "📅 Before flight (September)\n👥 5 people\n📱 Mobile\n⚠️ Buy eSIMs and setup digital Suica in Apple Wallet. Generate Visit Japan Web QR codes.",
      deadline: "Before traveling",
    },
    {
      id: "equipaje",
      category: "logistica",
      urgency: "baja",
      title: "🟡 Manage Luggage Forwarding (Takkyubin)",
      detail: "📅 12/09/2026 (Morning)\n👥 5 large suitcases\n📦 Courier service (Yamato/Sagawa)\n📍 Kyoto Hotel → Tokyo Hotel\n⚠️ Confirm when checking in at Kyoto if they can send luggage directly to Tokyo (Koko Hotel) to travel the Alps only with a backpack. Keep the receipts.",
      deadline: "During trip",
    },
    {
      id: "cena-takayama",
      category: "reserva",
      urgency: "baja",
      title: "🟡 Book Dinner for Hida Beef in Takayama",
      detail: "📅 13/09/2026\n👥 5 people\n🥩 Local restaurant\n⏰ Target departure: ~19:00\n📍 Takayama\n⚠️ It is Sunday and Takayama shops close early (17:00). Popular restaurants get full. To dine wagyu/Hida beef together without queuing, booking is highly recommended.",
      deadline: "Before traveling",
    },
    {
      id: "mochilas-magome",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Backpack Forwarding Nakasendo (Magome ↔ Tsumago)",
      detail: "📅 14/09/2026\n📍 Magome Tourist Office (08:30–11:30)\n⚠️ Drop backpacks in Magome to walk light to Tsumago. ~¥500 per piece.",
      deadline: "Same day",
    },
    {
      id: "desayunos",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Convenience Breakfasts",
      detail: "📅 Sept 7 (for Fushimi Inari) and Sept 14 (in Magome for the train)\n📍 Local konbini\n⚠️ Magome accommodation does not provide breakfast and the departure to Fushimi Inari on Day 2 is too early. Buy at konbinis the night before.",
      deadline: "Same day",
    },
    {
      id: "shinkansen-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Book Shinkansen Kodama (Fuji Tour)",
      detail: "📅 20/09/2026\n👥 5 people\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805\n⏰ Target departure: 07:27\n📍 Tokyo → Mishima\n💳 Buy: SmartEX App/Web\n⚠️ MANDATORY: Take this specific train to arrive on time for the meeting with guide Ken (08:25). Book seats together.",
      deadline: "1 month before"
    },
    {
      id: "narita-express",
      category: "reserva",
      urgency: "media",
      title: "🟠 Book Narita Express (N'EX)",
      detail: "📅 07/09/2026 (Arrival) and 21/09/2026 (Departure)\n👥 5 people\n🚆 JR Narita Express\n📍 Narita ↔ Tokyo/Shinagawa\n💳 Buy: JR East Web or at the airport\n⚠️ N'EX requires a reserved seat. You can buy it upon arrival, but for 5 people it's better to book it online to sit together.",
      deadline: "Before traveling"
    }
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
