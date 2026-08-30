export const tripMeta = {
  title: "Morisqueño Trip sa Japan",
  subtitle: "Setyembre 2026",
  welcomeParagraphs: [
    "Maligayang pagdating sa Morisqueño Trip sa Japan! Ang website na ito ang <strong>basehan para sa ating lima</strong>. Nandito ang ating mga flight, hotel na may PIN at kumpirmasyon, mga bus na nai-book na, ang plano araw-araw, at kung ano pa ang kailangang tapusin.",
    "Ito ang ating <strong>pribadong gabay</strong>: itinerary, mga reserbasyon, hotel, transportasyon, mapa, at mga tip. Lahat ng kailangan natin sa ating mga telepono, nang hindi umaasa sa mga chat o nakakalat na PDF.",
    "Lahat ng mga seksyon sa ibaba ay pwedeng i-click para makita ang mga detalye. Maaari mo ring gamitin ang <strong>menu sa itaas sa kaliwa</strong> upang mabilis na mag-navigate sa lahat ng mga seksyon anumang oras. Kapag nagsimula na ang biyahe (mula Sept 6–7), awtomatikong magbubukas ang web sa tab na 'Ngayon' kasama ang mga detalye para sa araw na iyon.",
    "Maaari mo ring <strong>baguhin ang wika</strong> ng application anumang oras (Español, English, Français, Tagalog) gamit ang pindutan sa itaas."
  ],
  about: {
    title: "Tungkol sa web",
    features: [
      {
        icon: "📡",
        title: "100% Offline by Design",
        text: "Ang web app na ito ay idinisenyo nang may malinaw na layunin: <strong>na huwag umasa sa internet habang naglalakbay</strong>. Kapag nasa Japan ka, maaaring mawalan ng koneksyon sa mga bullet train o rural na lugar. Kaya naman pinili namin ang client-side na <strong>Single Source of Truth (SSOT)</strong> architecture sa halip na cloud database."
      },
      {
        icon: "⚡",
        title: "PWA Architecture & Performance",
        text: "Ang buong itinerary, mga flight, mga tirahan, at mga pagsasalin ay nasa app mismo (<code>trip.js</code>), na naka-bundle bilang isang <strong>PWA (Progressive Web App)</strong> gamit ang Vite. I-cache ng browser ang lahat sa pamamagitan ng Service Workers, na tinitiyak ang zero latency sa pag-navigate."
      },
      {
        icon: "🎨",
        title: "React, Tailwind & Framer Motion",
        text: "Pinapayagan kami ng React ecosystem na gumamit ng mga modular na component, na nagpapadali sa isang Mobile-First na disenyo gamit ang TailwindCSS at tuluy-tuloy na mga animation sa Framer Motion, na nagbibigay ng native-like na karanasan."
      }
    ],
    github: "Tingnan ang source code sa GitHub"
  }
};

export const flights = {
  out: {
    label: "Pag-alis",
    text: "Pag-alis Linggo Set 6 mula Madrid (T4S) nang 09:05 (Qatar Airways QR148). Layover sa Doha (single terminal airport). Pagdating sa Narita (NRT), Terminal 2, sa Lun Set 7 nang 12:55.",
    leg1: { route: "Madrid → Doha" },
    leg2: { route: "Doha → Narita" },
    depart: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Single terminal — lahat ng Qatar Airways flights",
      connection: "Single terminal airport: hindi na kailangang lumipat ng building o mag-check in ulit. Mula concourse A hanggang E ay aabutin ng 15 min paglalakad; sa pagitan ng magkakalapit na concourse, mga 9 min sa average (90 sec sa tren). Nagsasara ang boarding gate 20 min bago ang pag-alis.",
    },
  },
  back: {
    label: "Pauwi",
    text: "Pag-alis Lun Set 21 mula Narita (Terminal 2) nang 17:25 (Qatar Airways QR809). Layover sa Doha. Pagdating sa Madrid (T4S) sa Mar Set 22 nang 08:15.",
    leg1: { route: "Narita → Doha" },
    leg2: { route: "Doha → Madrid" },
    depart: { terminal: "T2" },
    arrive: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Single terminal — lahat ng Qatar Airways flights",
      connection: "Parehong single terminal airport sa pag-alis: walang pagbabago ng building. Sundan ang purple transit signs papunta sa connection gate; ang pinakamahabang lakarin (sa pagitan ng dulo ng airport) ay aabutin ng mga 15 min.",
    },
  },
};

export const blocks = [
  {
    title: "Kyoto, Nara at Osaka",
    sleepSummary: "Sa Kyoto (4 gabi)",
    bestArea: "Malapit sa Kyoto Station (pinaka-convenient para sa mga tren) o sa Karasuma / Kawaramachi (mas maraming nightlife at restaurants).",
  },
  {
    title: "Japanese Alps at Nakasendo Route",
    sleepSummary: "Kanazawa → Takayama → Magome/Tsumago (1 gabi bawat isa)",
    bestArea: "Kanazawa: malapit sa istasyon o Omicho market. Takayama: historic center o malapit sa istasyon. Magome/Tsumago: isang rural na Minshuku mismong nasa ruta.",
    logisticaTip: "Sa umaga ng ika-6 na araw, ipapadala niyo ang inyong malalaking maleta mula sa Kyoto hotel direkta sa Tokyo hotel sa halagang humigit-kumulang €15/maleta. Magbibiyahe kayo sa mga araw na ito dala lang ang backpack.",
  },
  {
    title: "Tokyo at Mt. Fuji Excursion",
    sleepSummary: "Sa Tokyo (6 gabi)",
    bestArea: "Shinjuku o Shibuya (maraming nightlife at direktang koneksyon sa airport at Fuji) o Ueno/Akihabara (mas mura, mas maganda para sa pop culture).",
    fujiStrategy: "Hindi tayo magpapalipas ng gabi sa Fuji para hindi tayo malasin na magising sa maulap na araw. Buong araw na tour kasama ang Spanish guide: Ken Kaneshima · Excursiones Fujiyama (excursionesfujiyama.com · +81 90-5863-1635). Nakabinbin ang booking. Ang ideyal: mag-book ng 3-4 na magkakasunod na araw, i-check ang panahon sa gabi bago ang tour at piliin ang unang malinaw na araw, i-cancel ang iba. Kumpirmahin muna ang cancellation policy.",
  },
];

export const stays = [
  {
    city: "Kyoto",
    nights: "Mula Set 7 hanggang 12 (5 gabi)",
    options: [
      {
        rooms: "2 kwarto · Triple Moderate + Standard Double (2 kama)",
        guests: "5 matatanda",
        cancel: "Libreng cancellation hanggang 1 araw bago ang check-in",
        note: "Simula Marso 2026, nagpapatupad ang Kyoto ng bagong tourist tax. Para sa mga accommodation na mas mababa sa ¥6,000 bawat tao/gabi, EXEMPTED ang tax. Kung lalampas sa ¥6,000, ito ay ¥400 bawat tao/gabi. Babayaran sa hotel. Hindi kasama ang mga pagkain.",
      },
    ],
  },
  {
    city: "Kanazawa",
    nights: "Mula Set 12 hanggang 13 (1 gabi)",
    options: [
      {
        rooms: "2 kwarto · Double (2 kama + 1 extra) + Standard Double",
        guests: "5 matatanda",
        cancel: "Libreng cancellation hanggang 2 araw bago ang check-in",
        note: "Hindi kasama ang mga pagkain.",
      },
    ],
  },
  {
    city: "Takayama",
    nights: "Mula Set 13 hanggang 14 (1 gabi)",
    options: [
      {
        rooms: "2 kwarto · Triple Superior + Standard Double (2 kama)",
        guests: "5 matatanda",
        cancel: "Libreng cancellation hanggang 3 araw bago ang check-in",
        note: "Maagang check-out (10:00). Hindi kasama ang mga pagkain.",
      },
    ],
  },
  {
    city: "Magome",
    nights: "Mula Set 14 hanggang 15 (1 gabi)",
    options: [
      {
        rooms: "Minshuku · may kasamang hapunan (walang almusal)",
        note: "Lutong bahay na hapunan sa itinakdang oras (~18:00). Kumpirmahin bago ang biyahe.",
      },
    ],
  },
  {
    city: "Tokyo",
    nights: "Mula Set 15 hanggang 21 (6 gabi)",
    options: [
      {
        rooms: "Residence / apartment · 6 gabi",
        guests: "5 matatanda",
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
  { name: "Nohi Bus Kanazawa → Shirakawa-go", from: "Kanazawa Sta.", to: "Shirakawa-go Bus Terminal", type: "Private Operator (Bus)", note: "✓ Na-book · Booking 12GO31991741 · Pag-alis 08:40 · 5 kumpirmadong upuan" },
  { name: "Nohi Bus Shirakawa-go → Takayama", from: "Shirakawa-go Bus Terminal", to: "Takayama Nohi Bus Center", type: "Private Operator (Bus)", note: "✓ Na-book · Booking 12GO31992254 · Pag-alis 13:15 · 5 kumpirmadong upuan" },
  { name: "Hida Express Panoramic Train", from: "Takayama", to: "Nagoya", type: "Express JR Line" },
  { name: "JR Shinano Train and Local Bus", from: "Nagoya", to: "Magome", type: "Mixed (JR + Private Bus)" },
  { name: "Local Bus Magome → Nakatsugawa", from: "Magome", to: "Nakatsugawa", type: "Private Operator (Bus)", note: "⚠️ Madalang — i-check ang schedule sa gabi bago ang biyahe (karaniwang aalis ~08:50 o 09:10)" },
  { name: "JR Shinano Limited Express", from: "Nakatsugawa", to: "Nagoya", type: "Express JR Line", note: "✅ Naka-book · Shinano 4 · 09:57 → 10:53 · Car 4 · Res. 42093" },
  { name: "Shinkansen Nozomi 358", from: "Nagoya", to: "Tokyo", type: "JR Line (Bullet Train)", note: "✅ Nabili · Smart EX 2002 · 11:29 → 13:06 · Car 12 · QR-Ticket" },
  { name: "Yurikamome Elevated Train", from: "Tokyo", to: "Odaiba Island", type: "Private Operator" },
  { name: "Subway at local trains (5 araw)", from: "Tokyo", to: "Tokyo (iba't iba)", type: "Private / Local Operator" },
  { name: "Narita Express (N'EX)", from: "Tokyo Station", to: "Narita Airport", type: "JR Line (labas sa JR Pass validity)" },
];

export const budget = {
  note: "Kinakalkula gamit ang mga makatotohanang presyo at ang kasalukuyang ¥, napakamura para sa Europe.",
  categories: [
    {
      title: "Mga International Flight",
      details: [
        "Qatar Airways Madrid ↔ Tokyo (via Doha). 5 tao × 890€.",
        "Papunta: QR148 MAD→DOH + QR808 DOH→NRT (Set 6, 09:05 → Set 7, 12:55, 20h 50m).",
        "Pauwi: QR809 NRT→DOH + QR6952 DOH→MAD (Set 21, 17:25 → Set 22, 08:15, 21h 50m).",
        "Booking: ref. 40-892227078 · PIN 2534.",
      ],
    },
    {
      title: "Matutuluyan (14 gabi)",
      details: [
        "Hotel Keihan Kyoto Hachijoguchi (Set 7–12, 5 gabi): 678.68€ grupo · 135.74€/tao.",
        "Hotel Resol Trinity Kanazawa (Set 12–13, 1 gabi): 164€ grupo · 32.80€/tao.",
        "Hotel Wood Takayama (Set 13–14, 1 gabi): 279€ grupo · 55.80€/tao.",
        "Magome Chaya (Set 14–15, 1 gabi, kasama hapunan, walang almusal): 178.98€ grupo · 35.80€/tao.",
        "KOKO HOTEL Residence Asakusa Kappabashi (Set 15–21, 6 gabi): 1,952.50€ grupo · 390.50€/tao.",
      ],
    },
    {
      title: "Domestic Transport",
      details: [
        "<strong>Nabili na (Revolut, 5 pax):</strong> Nozomi 53 373.27€ · Thunderbird/Kagayaki 209.38€ · Nohi Magome 135.61€ · Shinano 4 77.84€ · Nozomi 358 295.62€ (+ Nohi araw 7 naka-book na).",
        "Subtotal ng long-distance tickets ≈ 1,287€ grupo (~257€/tao) + Alps buses araw 7.",
        "Tinataya pa: N'EX, local JR, Tokyo metro, Fuji Kodama, Skyliner/N'EX pauwi (~155€/tao).",
        "Approx. Revolut rate Ago 2026: ~184 ¥/€.",
      ],
    },
    {
      title: "Pagkain at Inumin (14 araw)",
      details: [
        "Almusal ~5€, kaswal na tanghalian/ramen ~10€, masarap na hapunan/sushi ~20€. Tinatayang 40€/araw (hindi kasama ang 2 hapunang kasama sa matutuluyan: Magome Chaya at wagyu dinner sa Takayama).",
      ],
    },
    {
      title: "Insurance, eSIM at extras",
      details: [
        "Heymondo Japan insurance: 273.60€ (4 tao · Revolut).",
        "Holafly eSIM: 164.88€ (4 tao · Revolut).",
        "Tickets (templo, TeamLab, viewpoints), Takkyubin Kyoto→Tokyo at iba pa ~150€/tao orientative.",
      ],
    },
  ],
  totalPerPerson: "~2,650€ – 2,750€ (kasama flights)",
  totalGroup: "~13,000€ – 13,500€ (5 tao)",
};
