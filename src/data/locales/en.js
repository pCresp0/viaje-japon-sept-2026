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
    { title: "Book Mount Fuji Tour (Ken Kaneshima)", detail: "Full day tour with Spanish guide. Book 3-4 consecutive days and decide based on weather. Confirm cancellation policy.", deadline: "Weeks in advance — pending booking" },
    { title: "Book Hida Express panoramic train (Takayama → Nagoya)", detail: "Day 8 (Sept 14): panoramic train from Takayama to Nagoya. Very popular in September, reserved seats sell out. Free seat reservation with JR Pass.", deadline: "Several weeks in advance" },
    { title: "Book Thunderbird train (Kyoto → Kanazawa)", detail: "Day 6 (Sept 12): Thunderbird train from Kyoto to Kanazawa. September is peak season in Kanazawa.", deadline: "A few weeks in advance" },
    { title: "Book Shinkansen seats", detail: "Two key bullet trains: Day 1 (Sept 7) Tokyo to Kyoto and Day 9 (Sept 15) Nagoya to Tokyo. Free reservation with JR Pass.", deadline: "Resolve JR Pass first, then book weeks in advance" },
    { title: "Check Magome → Nakatsugawa bus schedule (Day 9)", detail: "Morning of day 9 (Sept 15) take a local bus from Magome to Nakatsugawa station. Infrequent buses. Connects with JR Shinano.", deadline: "Check the night of Sept 14" },
    { title: "Organize luggage forwarding Kyoto → Tokyo", detail: "Morning of day 6, send large suitcases from Kyoto hotel directly to Tokyo (Takkyubin). Travel light during the Alps.", deadline: "Confirm with both hotels before traveling" },
    { title: "Book backpack forwarding Magome ↔ Tsumago", detail: "Luggage transport service between both ends of the Nakasendo trail to walk light. Usually booked at the tourist office same day.", deadline: "Confirm schedules before Day 8" },
    { title: "Confirm dinner at Magome Chaya", detail: "Minshuku homemade dinner (Day 8) is exactly at 18:30 with no delays allowed. Adjust Nakasendo walk to arrive on time.", deadline: "Before traveling — contact Magome Chaya to confirm" },
    { title: "Decide whether to buy JR Pass", detail: "Compare individual ticket costs vs JR Pass. Currently, JR Pass seems less cost-effective, but recalculate with final routes.", deadline: "Before traveling — pass is bought from home country" },
    { title: "Buy online tickets (TeamLab and museums)", detail: "TeamLab requires time-slot tickets and sells out early. Also check Roppongi observation deck and Tokyo museums.", deadline: "Weeks in advance, subject to availability" }
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
