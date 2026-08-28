export const tripMeta = {
  title: "Voyage Morisqueño au Japon",
  subtitle: "Septembre 2026",
  welcomeParagraphs: [
    "Bienvenue au voyage Morisqueño au Japon ! Ce site est la <strong>base du voyage pour nous 5</strong>. Vous y trouverez nos vols, les hôtels avec code PIN et confirmation, les bus déjà réservés, le plan au jour le jour et ce qu'il reste à finaliser.",
    "C'est notre <strong>guide de groupe privé</strong> : itinéraire, réservations, hôtels, transports, carte et astuces. Tout ce dont nous avons besoin sur notre téléphone, sans dépendre de discussions ou de PDF éparpillés.",
    "Toutes les sections ci-dessous sont cliquables pour accéder aux détails. Vous pouvez également utiliser le <strong>menu en haut à gauche</strong> pour naviguer rapidement dans toutes les sections à tout moment. Une fois le voyage commencé (à partir du 6-7 septembre), le site s'ouvrira automatiquement sur l'onglet « Aujourd'hui » avec les détails du jour.",
    "De plus, vous pouvez <strong>changer la langue</strong> de l'application à tout moment (Español, English, Français, Tagalog) en utilisant le bouton en haut."
  ],
  about: {
    title: "À propos du site",
    description: "Cette application web a été conçue dans un but précis : <strong>ne pas dépendre d'Internet pendant le voyage</strong>. Au Japon, la connexion peut échouer dans les trains à grande vitesse, les zones rurales, ou en cas de problèmes avec l'eSIM. C'est pourquoi, au lieu d'utiliser une base de données cloud traditionnelle nécessitant une connectivité constante, nous avons opté pour une architecture <strong>Single Source of Truth (SSOT)</strong> côté client.\n\nL'ensemble de l'itinéraire, des vols, des hébergements et des traductions se trouve dans l'application elle-même (<code>trip.js</code>), qui est empaquetée en tant que <strong>PWA (Progressive Web App)</strong> à l'aide de Vite. Cela permet au navigateur de mettre en cache tout le contenu via des Service Workers dès la première visite. Grâce à cette conception, la navigation entre les jours ou le changement de langue est instantané, avec une latence nulle, et fonctionne 100 % hors ligne.\n\nDe plus, l'écosystème React nous permet de séparer l'interface en composants modulaires, facilitant un design strict Mobile-First stylisé avec TailwindCSS et des animations fluides avec Framer Motion, garantissant une expérience utilisateur de type native. Tout le code source est public et peut être consulté dans notre dépôt.",
    github: "Voir le code source sur GitHub"
  }
};

export const flights = {
  out: {
    label: "Aller",
    text: "Départ Dim 6 sept de Madrid (T4S) à 09:05 (Qatar Airways QR148). Escale à Doha (aéroport à terminal unique). Arrivée à Narita (NRT), Terminal 2, le Lun 7 sept à 12:55.",
    leg1: { route: "Madrid → Doha" },
    leg2: { route: "Doha → Narita" },
    depart: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Terminal unique — tous les vols Qatar Airways",
      connection: "Aéroport à terminal unique : pas besoin de changer de bâtiment ou de s'enregistrer à nouveau. Du hall A au E, il faut environ 15 min à pied ; entre les halls proches, environ 9 min en moyenne (90 sec en train). La porte d'embarquement ferme 20 min avant le départ.",
    },
  },
  back: {
    label: "Retour",
    text: "Départ Lun 21 sept de Narita (Terminal 2) à 17:25 (Qatar Airways QR809). Escale à Doha. Arrivée à Madrid (T4S) le Mar 22 sept à 08:15.",
    leg1: { route: "Narita → Doha" },
    leg2: { route: "Doha → Madrid" },
    depart: { terminal: "T2" },
    arrive: { terminal: "T4S (Satellite)" },
    layover: {
      terminal: "Terminal unique — tous les vols Qatar Airways",
      connection: "Même aéroport à terminal unique qu'à l'aller : pas de changement de bâtiment. Suivez les panneaux de transit violets jusqu'à la porte de correspondance ; le trajet le plus long (entre les extrémités de l'aéroport) prend environ 15 min à pied.",
    },
  },
};

export const blocks = [
  {
    title: "Kyoto, Nara et Osaka",
    sleepSummary: "À Kyoto (4 nuits)",
    bestArea: "Près de la gare de Kyoto (maximum de commodité pour les trains) ou à Karasuma / Kawaramachi (plus de vie nocturne et de restaurants).",
  },
  {
    title: "Alpes Japonaises et Route Nakasendo",
    sleepSummary: "Kanazawa → Takayama → Magome/Tsumago (1 nuit chacun)",
    bestArea: "Kanazawa : près de la gare ou du marché Omicho. Takayama : centre historique ou près de la gare. Magome/Tsumago : un Minshuku rural en pleine route.",
    logisticaTip: "Le matin du jour 6, vous envoyez vos grandes valises de l'hôtel de Kyoto directement à l'hôtel de Tokyo pour environ 15€/valise. Vous voyagez ces jours-là avec seulement un sac à dos.",
  },
  {
    title: "Tokyo et Excursion au Mont Fuji",
    sleepSummary: "À Tokyo (6 nuits)",
    bestArea: "Shinjuku ou Shibuya (beaucoup de vie nocturne et liaison directe avec l'aéroport et le Fuji) ou Ueno/Akihabara (moins cher, meilleur pour la culture pop).",
    fujiStrategy: "Nous ne passerons pas la nuit au Fuji pour ne pas risquer de nous réveiller avec un ciel couvert. Visite d'une journée complète avec guide hispanophone : Ken Kaneshima · Excursiones Fujiyama (excursionesfujiyama.com · +81 90-5863-1635). En attente de réservation. L'idéal : réserver 3–4 jours consécutifs, vérifier la météo la veille au soir et faire la visite le premier jour dégagé, en annulant le reste. Confirmez la politique d'annulation au préalable.",
  },
];

export const stays = [
  {
    city: "Kyoto",
    nights: "Du 7 au 12 sept (5 nuits)",
    options: [
      {
        rooms: "2 chambres · Triple Modérée + Double Standard (2 lits)",
        guests: "5 adultes",
        cancel: "Annulation gratuite jusqu'à 1 jour avant",
        note: "À partir de mars 2026, Kyoto applique une nouvelle taxe de séjour. Pour les hébergements de moins de 6 000 ¥ par personne/nuit, la taxe est EXEMPTÉE. S'il dépasse 6 000 ¥, c'est 400 ¥ par personne/nuit. À payer à l'hôtel. Repas non inclus.",
      },
    ],
  },
  {
    city: "Kanazawa",
    nights: "Du 12 au 13 sept (1 nuit)",
    options: [
      {
        rooms: "2 chambres · Double (2 lits + 1 lit d'appoint) + Double Standard",
        guests: "5 adultes",
        cancel: "Annulation gratuite jusqu'à 2 jours avant",
        note: "Repas non inclus.",
      },
    ],
  },
  {
    city: "Takayama",
    nights: "Du 13 au 14 sept (1 nuit)",
    options: [
      {
        rooms: "2 chambres · Triple Supérieure + Double Standard (2 lits)",
        guests: "5 adultes",
        cancel: "Annulation gratuite jusqu'à 3 jours avant",
        note: "Départ anticipé (10:00). Repas non inclus.",
      },
    ],
  },
  {
    city: "Magome",
    nights: "Du 14 au 15 sept (1 nuit)",
    options: [
      {
        rooms: "Minshuku · avec dîner (sans petit-déjeuner)",
        note: "Dîner fait maison à heure fixe (~18:00). Confirmer avant le voyage.",
      },
    ],
  },
  {
    city: "Tokyo",
    nights: "Du 15 au 21 sept (6 nuits)",
    options: [
      {
        rooms: "Résidence / appartement · 6 nuits",
        guests: "5 adultes",
      },
    ],
  },
];

export const transports = [
  { name: "Narita Express (N'EX)", from: "Aéroport de Narita", to: "Gare de Tokyo", type: "Ligne JR" },
  { name: "Shinkansen Hikari", from: "Gare de Tokyo", to: "Kyoto", type: "Ligne JR (Train à grande vitesse)" },
  { name: "Train Ligne JR Nara", from: "Kyoto", to: "Gare Inari", type: "Ligne JR Locale" },
  { name: "Train Ligne JR Nara", from: "Gare Inari", to: "Nara", type: "Ligne JR Locale" },
  { name: "Train Ligne JR Nara", from: "Nara", to: "Kyoto", type: "Ligne JR Locale" },
  { name: "Métro et Bus 205", from: "Kyoto", to: "Kinkakuji", type: "Opérateur Privé / Local" },
  { name: "Tramway Randen", from: "Ninna-ji", to: "Arashiyama", type: "Opérateur Privé" },
  { name: "Train JR Ligne San-In", from: "Arashiyama", to: "Kyoto", type: "Ligne JR Locale" },
  { name: "Bus et Métro", from: "Kyoto", to: "Marché Nishiki / Gion", type: "Opérateur Privé / Local" },
  { name: "Train rapide JR (aller-retour)", from: "Kyoto", to: "Osaka", type: "Ligne JR Locale" },
  { name: "Train Thunderbird", from: "Kyoto", to: "Kanazawa", type: "Ligne JR Express" },
  { name: "Bus Nohi Kanazawa → Shirakawa-go", from: "Gare de Kanazawa", to: "Gare routière de Shirakawa-go", type: "Opérateur Privé (Bus)", note: "✓ Réservé · Réservation 12GO31991741 · Départ 08:40 · 5 places confirmées" },
  { name: "Bus Nohi Shirakawa-go → Takayama", from: "Gare routière de Shirakawa-go", to: "Takayama Nohi Bus Center", type: "Opérateur Privé (Bus)", note: "✓ Réservé · Réservation 12GO31992254 · Départ 13:15 · 5 places confirmées" },
  { name: "Train panoramique Hida Express", from: "Takayama", to: "Nagoya", type: "Ligne JR Express" },
  { name: "Train JR Shinano et Bus local", from: "Nagoya", to: "Magome", type: "Mixte (JR + Bus Privé)" },
  { name: "Bus local Magome → Nakatsugawa", from: "Magome", to: "Nakatsugawa", type: "Opérateur Privé (Bus)", note: "⚠️ Peu fréquent — vérifier les horaires la veille au soir (départ généralement vers ~08:50 ou 09:10)" },
  { name: "JR Shinano Limited Express", from: "Nakatsugawa", to: "Nagoya", type: "Ligne JR Express", note: "~50 min. Arrivée à Nagoya vers ~10:30 avec une marge de 30 min pour le Shinkansen" },
  { name: "Shinkansen Nozomi", from: "Nagoya", to: "Tokyo", type: "Ligne JR (Train à grande vitesse)", note: "Part toutes les 10-15 min — aucun risque de le manquer. Arrivée à Tokyo vers ~12:40" },
  { name: "Train aérien Yurikamome", from: "Tokyo", to: "Île d'Odaiba", type: "Opérateur Privé" },
  { name: "Métro et trains locaux (5 jours)", from: "Tokyo", to: "Tokyo (divers)", type: "Opérateur Privé / Local" },
  { name: "Narita Express (N'EX)", from: "Gare de Tokyo", to: "Aéroport de Narita", type: "Ligne JR (hors validité JR Pass)" },
];

export const budget = {
  note: "Calculé avec des prix réalistes et le ¥ actuel, très bon marché pour l'Europe.",
  categories: [
    {
      title: "Vols Internationaux",
      details: [
        "Qatar Airways Madrid ↔ Tokyo (via Doha). 5 personnes × 890€.",
        "Aller : QR148 MAD→DOH + QR808 DOH→NRT (6 sept, 09:05 → 7 sept, 12:55, 20h 50m).",
        "Retour : QR809 NRT→DOH + QR6952 DOH→MAD (21 sept, 17:25 → 22 sept, 08:15, 21h 50m).",
        "Réservation : réf. 40-892227078 · PIN 2534.",
      ],
    },
    {
      title: "Hébergement (14 nuits)",
      details: [
        "Hotel Keihan Kyoto Hachijoguchi (7–12 sept, 5 nuits) : 678,68€ groupe · 135,74€/personne.",
        "Hotel Resol Trinity Kanazawa (12–13 sept, 1 nuit) : 164€ groupe · 32,80€/personne.",
        "Hotel Wood Takayama (13–14 sept, 1 nuit) : 279€ groupe · 55,80€/personne.",
        "Magome Chaya (14–15 sept, 1 nuit, avec dîner, sans petit-déjeuner) : 178,98€ groupe · 35,80€/personne.",
        "KOKO HOTEL Residence Asakusa Kappabashi (15–21 sept, 6 nuits) : 1 952,50€ groupe · 390,50€/personne.",
      ],
    },
    {
      title: "Transports Intérieurs",
      details: [
        "Trains individuels (NEX, Shinkansens, route des Alpes, Fuji, Tokyo) : ~340€/personne.",
        "Bus Nohi Kanazawa–Shirakawa-go–Takayama (réservé) : 39,15€/personne.",
        "Transports locaux (carte Suica) : ~80€/personne.",
      ],
    },
    {
      title: "Repas et Boissons (14 jours)",
      details: [
        "Petit-déjeuner ~5€, déjeuner décontracté/ramen ~10€, bon dîner/sushi ~20€. Env. 40€/jour (sans compter les 2 dîners inclus dans les hébergements : Magome Chaya et dîner wagyu à Takayama).",
      ],
    },
    {
      title: "Billets et Extras",
      details: ["Temples, musées, observatoire de Roppongi, TeamLab, transfert de bagages Takkyubin de Kyoto à Tokyo."],
    },
  ],
  totalPerPerson: "~2 560€ – 2 660€ (vols inclus)",
  totalGroup: "~12 800€ – 13 300€ (5 personnes)",
};
