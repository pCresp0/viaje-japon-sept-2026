export const tripMeta = {
  title: "Morisqueño Trip to Japan",
  subtitle: "September 2026",
  welcomeParagraphs: [
    "Welcome to the Morisqueño Trip to Japan! This website is the <strong>base for the 5 of us</strong>. Here you can find our flights, hotels with PINs and confirmations, booked buses, the day-by-day plan, and what's still pending.",
    "This is our <strong>private group guide</strong>: itinerary, reservations, hotels, transport, map, and tips. Everything we need on our phones, without relying on chats or loose PDFs.",
    "All the sections below are clickable so you can see the details. You can also use the <strong>menu on the top left</strong> to quickly navigate through all sections at any time. The web opens directly on the <strong>Itinerary</strong>, displaying the details for the current day (opening Day 0 by default before departure).",
    "Additionally, you can <strong>change the application language</strong> at any time (Español, English, Français, Tagalog) using the button at the top."
  ],
  about: {
    title: "About the web",
    features: [
      {
        icon: "📡",
        title: "100% Offline by Design",
        text: "This web application was designed to <strong>never rely on internet during the trip</strong>. On bullet trains, in rural areas, or during eSIM issues, the app keeps running 100%. It uses a client-side <strong>Single Source of Truth (SSOT)</strong> architecture, packaged as a PWA with Workbox Service Worker."
      },
      {
        icon: "🗓️",
        title: "Dual Itinerary (Detailed & Quick View)",
        text: "Each of the 15 trip days features two modes: <strong>Full Detail</strong> (with timetables, tips, alerts, and lore) and <strong>Quick View</strong> (a visual metro-style timeline with essential stops and times), plus direct map links for each day."
      },
      {
        icon: "🎫",
        title: "Transit Tickets & Interactive QRs",
        text: "Faithful digital passes for booked trains and buses (Shinkansen Hikari & Nozomi, Thunderbird, Shinano, Nohi Bus) with cars, reserved seats, official QR codes, and the Visit Japan Web QR integrated on Day 1."
      },
      {
        icon: "📜",
        title: "Japanese History, Podcasts, Documentaries & Books",
        text: "Multimedia section organized into 4 collapsible thematic blocks: <strong>Chronological history</strong> with native Text-to-Speech audio and trip references, <strong>Podcasts</strong> (Apple Podcasts), <strong>Documentaries</strong> (YouTube), and <strong>Recommended books</strong> with direct online reading links."
      },
      {
        icon: "🔍",
        title: "Smart Global Search",
        text: "Reactive search engine that instantly indexes all content (places, hotels, tickets, history, food, pop culture). Clicking a result jumps straight to the exact item, auto-opening panels and highlighting it."
      },
      {
        icon: "🌦️",
        title: "Real-Time Weather with Cache",
        text: "Integration with the Open-Meteo API for all route cities (Tokyo, Kyoto, Osaka, Kanazawa, Takayama, Magome), with 12-hour local caching to check weather anytime offline."
      },
      {
        icon: "🗺️",
        title: "Lightweight Vector Maps (Leaflet)",
        text: "Offline-friendly interactive map based on OpenStreetMap and Leaflet, with dynamic filtering by category and trip day, requiring no paid APIs or heavy external scripts."
      },
      {
        icon: "👾",
        title: "Pop Culture & Frikadas",
        text: "Thematic guide linking route locations to iconic universes of anime, gaming, and cinema (Pokémon, Studio Ghibli, Nintendo, Digimon, Persona, Tekken)."
      },
      {
        icon: "💰",
        title: "Real Budget & Persistent Tasks",
        text: "Accurate tracking of estimated and paid expenses (Booking hotels, Magome Chaya cash-only, insurance, eSIMs) and packing/prep checklists saved in <code>localStorage</code>."
      },
      {
        icon: "🌐",
        title: "Native Multi-Language (4 Languages)",
        text: "Custom i18n architecture in React Context supporting <strong>Spanish, English, French, and Tagalog</strong>, dynamically merging localized strings with structural trip data."
      }
    ],
    github: "View source code on GitHub"
  }
};

export const flights = {
  out: {
    label: "Outbound",
    text: "Departure Sun Sep 6 from Madrid (T4S) at 09:05 (Qatar Airways QR148). Layover in Doha of 3h 45m (16:50 → 20:35). Arrival at Narita (NRT), Terminal 2, on Mon Sep 7 at 12:55.",
    leg1: { route: "Madrid → Doha" },
    leg2: { route: "Doha → Narita" },
    depart: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Single terminal — all Qatar Airways flights",
      connection: "Layover in Doha of 3h 45m (16:50 → 20:35). Single terminal airport: no need to change buildings or check in again. From concourse A to E takes about 15 min walking; between close concourses, about 9 min on average (90 sec by train). The boarding gate closes 20 min before departure.",
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
        note: "Starting March 2026, Kyoto applies a new tourist tax. For accommodations under ¥6,000 (~33€) per person/night, the tax is EXEMPT. If it exceeds ¥6,000 (~33€), it is ¥400 (~2€) per person/night. To be paid at the hotel. Meals not included.",
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
  { name: "JR Shinano Limited Express", from: "Nakatsugawa", to: "Nagoya", type: "Express JR Line", note: "✅ Booked · Shinano 4 · 09:57 → 10:53 · Car 4 · Res. 42093" },
  { name: "Shinkansen Nozomi 358", from: "Nagoya", to: "Tokyo", type: "JR Line (Bullet Train)", note: "✅ Purchased · Smart EX 2002 · 11:29 → 13:06 · Car 12 · QR-Ticket" },
  { name: "Yurikamome Elevated Train", from: "Tokyo", to: "Odaiba Island", type: "Private Operator" },
  { name: "Subway and local trains (5 days)", from: "Tokyo", to: "Tokyo (various)", type: "Private / Local Operator" },
  { name: "Narita Express (N'EX)", from: "Tokyo Station", to: "Narita Airport", type: "JR Line (outside JR Pass validity)" },
];

export const budget = {
  note: "Flights, hotels and long-distance tickets confirmed (Revolut). Fuji tours + urban estimates still pending. JR Pass not worth it (see analysis below).",
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
        "<strong>✅ 4 out of 5 hotels already paid by Juancar on Booking (3,033.86€ group · 606.77€/person)</strong>:",
        "• Hotel Keihan Kyoto Hachijoguchi (Sep 7–12, 5 nights): 669.86€ group · 133.97€/person ✓",
        "• Hotel Resol Trinity Kanazawa (Sep 12–13, 1 night): 161.89€ group · 32.38€/person ✓",
        "• Hotel Wood Takayama (Sep 13–14, 1 night): 274.98€ group · 55.00€/person ✓",
        "• KOKO HOTEL Residence Asakusa Kappabashi (Sep 15–21, 6 nights): 1,927.13€ group · 385.43€/person ✓",
        "<strong>⚠️ Pending payment at the hotel in cash</strong>:",
        "• Magome Chaya (Sep 14–15, 1 night, with dinner): ~178.98€ group (~32,000 ¥) · 35.80€/person. To be paid on site in cash (withdraw money beforehand).",
      ],
    },
    {
      title: "Domestic Transportation",
      details: [
        "<strong>Already purchased ≈ 1,287€ group (~257€/person)</strong> — Nozomi 53 373.27€ · Thunderbird/Kagayaki 209.38€ · Nohi Magome 135.61€ · Shinano 4 77.84€ · Nozomi 358 295.62€ · Day 7 Nohi (Kanazawa↔Shirakawa↔Takayama) ≈ 196€.",
        "Still estimated ≈ 156€/person: arrival N'EX, local JR, Tokyo metro, Fuji Shinkansen (Kodama), return Skyliner/N'EX.",
        "Total transport est. ≈ 414€/person · ~2,068€ group. Revolut rate ~184 ¥/€.",
        "Japan Rail Pass Ordinary (jrpass.com): 284€ / 455€ / 568€ (7/14/21 days) — <strong>not worth it</strong> (analysis below).",
      ],
    },
    {
      title: "Mount Fuji Excursions",
      details: [
        "<strong>Ken Kaneshima tour (day 14, confirmed):</strong> ¥13,000 (~70€)/person · ~350€ group (mini-van + admissions).",
        "<strong>GetYourGuide (days 10–13, 4 dates reserved):</strong> 210€ group / 42€/person for the day used. Free cancellation 24h before for the rest (100% refund). Charge scheduled ~Sep 13.",
        "If the sky is clear on a day 10–13 you can do GYG and cancel the rest; Ken on day 14 is independent. Fuji Shinkansen is under Transport.",
      ],
    },
    {
      title: "Food and Drinks (14 days)",
      details: [
        "Breakfast ~5€, casual lunch/ramen ~10€, good dinner/sushi ~20€. Approx. 40€/day (not counting the 2 dinners included in accommodations: Magome Chaya and wagyu dinner in Takayama).",
      ],
    },
    {
      title: "Insurance, eSIM and extras",
      details: [
        "Heymondo Japan insurance: 273.60€ (4 people · Revolut).",
        "Holafly eSIM: 164.88€ (4 people · Revolut).",
        "Tickets (temples, TeamLab, viewpoints), Takkyubin Kyoto→Tokyo and misc. extras ~150€/person orientative.",
      ],
    },
  ],
  totalPerPerson: "~2,735€ – 2,880€ (all included)",
  totalGroup: "~13,680€ – 14,400€ (5 people)",
};
