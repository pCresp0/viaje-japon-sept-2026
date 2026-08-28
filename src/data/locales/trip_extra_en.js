export const tripMeta = {
  title: "Morisqueño Trip to Japan",
  subtitle: "September 2026",
  welcomeParagraphs: [
    "Welcome to the Morisqueño Trip to Japan! This website is the <strong>base for the 5 of us</strong>. Here you can find our flights, hotels with PINs and confirmations, booked buses, the day-by-day plan, and what's still pending.",
    "This is our <strong>private group guide</strong>: itinerary, reservations, hotels, transport, map, and tips. Everything we need on our phones, without relying on chats or loose PDFs.",
    "All the sections below are clickable so you can see the details. You can also use the <strong>menu on the top left</strong> to quickly navigate through all sections at any time. Once the trip begins (around Sept 6–7), the web will automatically open on the 'Today' tab with the details for that day.",
    "Additionally, you can <strong>change the application language</strong> at any time (Español, English, Français, Tagalog) using the button at the top."
  ],
  about: {
    title: "About the web",
    description: "This web application was custom-built for our trip using React, Vite, and TailwindCSS. Its design prioritizes speed, offline accessibility (as a PWA), and modern aesthetics without sacrificing performance. All source code is public and can be freely consulted in our repository.",
    github: "View source code on GitHub"
  }
};

export const flights = {
  out: {
    label: "Outbound",
    text: "Departure Sun Sep 6 from Madrid (T4S) at 09:05 (Qatar Airways QR148). Layover in Doha (single terminal airport). Arrival at Narita (NRT), Terminal 2, on Mon Sep 7 at 12:55.",
    leg1: { route: "Madrid → Doha" },
    leg2: { route: "Doha → Narita" },
    depart: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Single terminal — all Qatar Airways flights",
      connection: "Single terminal airport: no need to change buildings or check in again. From concourse A to E takes about 15 min walking; between close concourses, about 9 min on average (90 sec by train). The boarding gate closes 20 min before departure.",
    },
  },
  back: {
    label: "Inbound",
    text: "Departure Mon Sep 21 from Narita (Terminal 2) at 17:25 (Qatar Airways QR809). Layover in Doha. Arrival at Madrid (T4S) on Tue Sep 22 at 08:15.",
    leg1: { route: "Narita → Doha" },
    leg2: { route: "Doha → Madrid" },
    depart: { terminal: "T2" },
    arrive: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Single terminal — all Qatar Airways flights",
      connection: "Same single terminal airport as the outbound flight: no building change. Follow the purple transit signs to the connection gate; the longest walk (between airport ends) is about 15 min.",
    },
  },
};

export const blocks = [
  {
    title: "Kyoto, Nara and Osaka",
    sleepSummary: "In Kyoto (4 nights)",
    bestArea: "Near Kyoto Station (maximum convenience for trains) or in Karasuma / Kawaramachi (more nightlife and restaurants).",
  },
  {
    title: "Japanese Alps and Nakasendo Route",
    sleepSummary: "Kanazawa → Takayama → Magome/Tsumago (1 night each)",
    bestArea: "Kanazawa: near the station or Omicho market. Takayama: historic center or near the station. Magome/Tsumago: a rural Minshuku right on the route.",
    logisticaTip: "On the morning of day 6, you send your large suitcases from the Kyoto hotel directly to the Tokyo hotel for about €15/suitcase. You travel these days with just a backpack.",
  },
  {
    title: "Tokyo and Mt. Fuji Excursion",
    sleepSummary: "In Tokyo (6 nights)",
    bestArea: "Shinjuku or Shibuya (lots of nightlife and direct connection to the airport and Fuji) or Ueno/Akihabara (cheaper, better for pop culture).",
    fujiStrategy: "We will not stay overnight at Fuji so as not to risk waking up to a cloudy day. Full-day tour with Spanish-speaking guide: Ken Kaneshima · Excursiones Fujiyama (excursionesfujiyama.com · +81 90-5863-1635). Pending booking. Ideally: book 3–4 consecutive days, check the weather the night before and do the first one that wakes up clear, canceling the rest. Confirm the cancellation policy beforehand.",
  },
];

export const stays = [
  {
    city: "Kyoto",
    nights: "From Sep 7 to 12 (5 nights)",
    options: [
      {
        rooms: "2 rooms · Triple Moderate + Standard Double (2 beds)",
        guests: "5 adults",
        cancel: "Free cancellation up to 1 day before",
        note: "Starting March 2026, Kyoto applies a new tourist tax. For accommodations under ¥6,000 per person/night, the tax is EXEMPT. If it exceeds ¥6,000, it is ¥400 per person/night. To be paid at the hotel. Meals not included.",
      },
    ],
  },
  {
    city: "Kanazawa",
    nights: "From Sep 12 to 13 (1 night)",
    options: [
      {
        rooms: "2 rooms · Double (2 beds + 1 extra) + Standard Double",
        guests: "5 adults",
        cancel: "Free cancellation up to 2 days before",
        note: "Meals not included.",
      },
    ],
  },
  {
    city: "Takayama",
    nights: "From Sep 13 to 14 (1 night)",
    options: [
      {
        rooms: "2 rooms · Triple Superior + Standard Double (2 beds)",
        guests: "5 adults",
        cancel: "Free cancellation up to 3 days before",
        note: "Early check-out (10:00). Meals not included.",
      },
    ],
  },
  {
    city: "Magome",
    nights: "From Sep 14 to 15 (1 night)",
    options: [
      {
        rooms: "Minshuku · with dinner (no breakfast)",
        note: "Home-cooked dinner at a fixed time (~18:00). Confirm before the trip.",
      },
    ],
  },
  {
    city: "Tokyo",
    nights: "From Sep 15 to 21 (6 nights)",
    options: [
      {
        rooms: "Residence / apartment · 6 nights",
        guests: "5 adults",
      },
    ],
  },
];

export const transports = [
  { name: "Narita Express (N'EX)", from: "Narita Airport", to: "Tokyo Station", type: "JR Line" },
  { name: "Shinkansen Hikari", from: "Tokyo Station", to: "Kyoto", type: "JR Line (Bullet Train)" },
  { name: "JR Nara Line Train", from: "Kyoto", to: "Inari Station", type: "Local JR Line" },
  { name: "JR Nara Line Train", from: "Inari Station", to: "Nara", type: "Local JR Line" },
  { name: "JR Nara Line Train", from: "Nara", to: "Kyoto", type: "Local JR Line" },
  { name: "Subway and Bus 205", from: "Kyoto", to: "Kinkakuji", type: "Private / Local Operator" },
  { name: "Randen Tram", from: "Ninna-ji", to: "Arashiyama", type: "Private Operator" },
  { name: "JR San-In Line Train", from: "Arashiyama", to: "Kyoto", type: "Local JR Line" },
  { name: "Bus and Subway", from: "Kyoto", to: "Nishiki Market / Gion", type: "Private / Local Operator" },
  { name: "JR Rapid Train (round trip)", from: "Kyoto", to: "Osaka", type: "Local JR Line" },
  { name: "Thunderbird Train", from: "Kyoto", to: "Kanazawa", type: "Express JR Line" },
  { name: "Nohi Bus Kanazawa → Shirakawa-go", from: "Kanazawa Sta.", to: "Shirakawa-go Bus Terminal", type: "Private Operator (Bus)", note: "✓ Booked · Booking 12GO31991741 · Departure 08:40 · 5 confirmed seats" },
  { name: "Nohi Bus Shirakawa-go → Takayama", from: "Shirakawa-go Bus Terminal", to: "Takayama Nohi Bus Center", type: "Private Operator (Bus)", note: "✓ Booked · Booking 12GO31992254 · Departure 13:15 · 5 confirmed seats" },
  { name: "Hida Express Panoramic Train", from: "Takayama", to: "Nagoya", type: "Express JR Line" },
  { name: "JR Shinano Train and Local Bus", from: "Nagoya", to: "Magome", type: "Mixed (JR + Private Bus)" },
  { name: "Local Bus Magome → Nakatsugawa", from: "Magome", to: "Nakatsugawa", type: "Private Operator (Bus)", note: "⚠️ Infrequent — check schedule the night before (usually leaves ~08:50 or 09:10)" },
  { name: "JR Shinano Limited Express", from: "Nakatsugawa", to: "Nagoya", type: "Express JR Line", note: "~50 min. Arrival in Nagoya ~10:30 with a 30 min buffer for the Shinkansen" },
  { name: "Shinkansen Nozomi", from: "Nagoya", to: "Tokyo", type: "JR Line (Bullet Train)", note: "Leaves every 10-15 min — no risk of missing it. Arrival in Tokyo ~12:40" },
  { name: "Yurikamome Elevated Train", from: "Tokyo", to: "Odaiba Island", type: "Private Operator" },
  { name: "Subway and local trains (5 days)", from: "Tokyo", to: "Tokyo (various)", type: "Private / Local Operator" },
  { name: "Narita Express (N'EX)", from: "Tokyo Station", to: "Narita Airport", type: "JR Line (outside JR Pass validity)" },
];

export const budget = {
  note: "Calculated with realistic prices and the current ¥, very cheap for Europe.",
  categories: [
    {
      title: "International Flights",
      details: [
        "Qatar Airways Madrid ↔ Tokyo (via Doha). 5 people × 890€.",
        "Outbound: QR148 MAD→DOH + QR808 DOH→NRT (Sep 6, 09:05 → Sep 7, 12:55, 20h 50m).",
        "Inbound: QR809 NRT→DOH + QR6952 DOH→MAD (Sep 21, 17:25 → Sep 22, 08:15, 21h 50m).",
        "Booking: ref. 40-892227078 · PIN 2534.",
      ],
    },
    {
      title: "Accommodation (14 nights)",
      details: [
        "Hotel Keihan Kyoto Hachijoguchi (Sep 7–12, 5 nights): 678.68€ group · 135.74€/person.",
        "Hotel Resol Trinity Kanazawa (Sep 12–13, 1 night): 164€ group · 32.80€/person.",
        "Hotel Wood Takayama (Sep 13–14, 1 night): 279€ group · 55.80€/person.",
        "Magome Chaya (Sep 14–15, 1 night, with dinner, no breakfast): 178.98€ group · 35.80€/person.",
        "KOKO HOTEL Residence Asakusa Kappabashi (Sep 15–21, 6 nights): 1,952.50€ group · 390.50€/person.",
      ],
    },
    {
      title: "Domestic Transportation",
      details: [
        "Individual trains (NEX, Shinkansens, Alps route, Fuji, Tokyo): ~340€/person.",
        "Nohi Bus Kanazawa–Shirakawa-go–Takayama (booked): 39.15€/person.",
        "Local transport (Suica card): ~80€/person.",
      ],
    },
    {
      title: "Food and Drinks (14 days)",
      details: [
        "Breakfast ~5€, casual lunch/ramen ~10€, good dinner/sushi ~20€. Approx. 40€/day (not counting the 2 dinners included in accommodations: Magome Chaya and wagyu dinner in Takayama).",
      ],
    },
    {
      title: "Tickets and Extras",
      details: ["Temples, museums, Roppongi observation deck, TeamLab, Takkyubin luggage forwarding from Kyoto to Tokyo."],
    },
  ],
  totalPerPerson: "~2,560€ – 2,660€ (flights included)",
  totalGroup: "~12,800€ – 13,300€ (5 people)",
};
