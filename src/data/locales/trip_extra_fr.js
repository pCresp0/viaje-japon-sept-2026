export const tripMeta = {
  title: "Voyage Morisqueño au Japon",
  subtitle: "Septembre 2026",
  welcomeParagraphs: [
    "Bienvenue au voyage Morisqueño au Japon ! Ce site est la <strong>base du voyage pour nous 5</strong>. Vous y trouverez nos vols, les hôtels avec code PIN et confirmation, les bus déjà réservés, le plan au jour le jour et ce qu'il reste à finaliser.",
    "C'est notre <strong>guide de groupe privé</strong> : itinéraire, réservations, hôtels, transports, carte et astuces. Tout ce dont nous avons besoin sur notre téléphone, sans dépendre de discussions ou de PDF éparpillés.",
    "Toutes les sections ci-dessous sont cliquables pour accéder aux détails. Vous pouvez également utiliser le <strong>menu en haut à gauche</strong> pour naviguer rapidement dans toutes les sections à tout moment. Le site s'ouvre directement sur l'<strong>Itinéraire</strong> avec les détails du jour (ouvrant le Jour 0 par défaut avant le départ).",
    "De plus, vous pouvez <strong>changer la langue</strong> de l'application à tout moment (Español, English, Français, Tagalog) en utilisant le bouton en haut."
  ],
  about: {
    title: "À propos du site",
    features: [
      {
        icon: "📡",
        title: "100% Hors ligne par conception",
        text: "Cette application web a été conçue pour <strong>ne jamais dépendre d'Internet pendant le voyage</strong>. Dans les trains à grande vitesse, les zones rurales ou lors de pannes d'eSIM, l'application reste 100% opérationnelle grâce à son architecture <strong>Single Source of Truth (SSOT)</strong> côté client, packagée en PWA avec Service Worker."
      },
      {
        icon: "🗓️",
        title: "Double Itinéraire (Détaillé & Vue Rapide)",
        text: "Chacun des 15 jours de voyage dispose de deux modes : <strong>Détail complet</strong> (avec horaires, conseils, alertes et explications) et <strong>Vue rapide</strong> (une ligne de métro visuelle avec les horaires et arrêts clés), ainsi que l'accès direct à la carte de chaque journée."
      },
      {
        icon: "🎫",
        title: "Billets de Transport & QR Interactifs",
        text: "Fiches numériques fidèles pour les trains et bus réservés (Shinkansen Hikari & Nozomi, Thunderbird, Shinano, Nohi Bus) avec voitures, sièges, codes QR officiels et le QR d'arrivée de Visit Japan Web intégré au Jour 1."
      },
      {
        icon: "📜",
        title: "Histoire du Japon, Podcasts, Documentaires & Livres",
        text: "Section multimédia organisée en 4 blocs thématiques repliables : <strong>Histoire chronologique</strong> avec synthèse vocale Text-to-Speech et repères du voyage, <strong>Podcasts</strong> (Apple Podcasts), <strong>Documentaires</strong> (YouTube) et <strong>Livres recommandés</strong> avec lecture en ligne."
      },
      {
        icon: "🔍",
        title: "Recherche Globale Intelligente",
        text: "Moteur de recherche réactif qui indexe instantanément tout le contenu (lieux, hôtels, billets, histoire, gastronomie, culture pop). En un clic, l'application vous amène au résultat exact en ouvrant les panneaux nécessaires."
      },
      {
        icon: "🌦️",
        title: "Météo en Temps Réel avec Cache",
        text: "Intégration de l'API Open-Meteo pour les villes du parcours (Tokyo, Kyoto, Osaka, Kanazawa, Takayama, Magome), avec mise en cache locale de 12 heures pour consultation hors ligne."
      },
      {
        icon: "🗺️",
        title: "Cartes Vectorielles Légères (Leaflet)",
        text: "Carte interactive adaptée au mode hors ligne basée sur OpenStreetMap et Leaflet, avec filtrage par catégorie et par jour de voyage, sans API payante ni scripts lourds."
      },
      {
        icon: "👾",
        title: "Culture Pop & Frikadas",
        text: "Guide thématique reliant les étapes du voyage aux grands univers du jeu vidéo, des mangas et de l'animation (Pokémon, Studio Ghibli, Nintendo, Digimon, Persona, Tekken)."
      },
      {
        icon: "💰",
        title: "Budget Réel & Tâches Persistantes",
        text: "Suivi rigoureux des dépenses estimées et déjà payées (hôtels Booking, hôtel Magome Chaya en espèces, assurances, eSIMs) et check-list de préparatifs sauvegardée dans le <code>localStorage</code>."
      },
      {
        icon: "🌐",
        title: "Multi-langue Natif (4 Langues)",
        text: "Architecture i18n sur mesure en React Context prenant en charge <strong>l'Espagnol, l'Anglais, le Français et le Tagalog</strong>, fusionnant dynamiquement les textes traduits avec les données du voyage."
      }
    ],
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
        note: "À partir de mars 2026, Kyoto applique une nouvelle taxe de séjour. Pour les hébergements de moins de 6 000 ¥ (~33€) par personne/nuit, la taxe est EXEMPTÉE. S'il dépasse 6 000 ¥ (~33€), c'est 400 ¥ (~2€) par personne/nuit. À payer à l'hôtel. Repas non inclus.",
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
  { name: "JR Shinano Limited Express", from: "Nakatsugawa", to: "Nagoya", type: "Ligne JR Express", note: "✅ Réservé · Shinano 4 · 09:57 → 10:53 · Voiture 4 · Rés. 42093" },
  { name: "Shinkansen Nozomi 358", from: "Nagoya", to: "Tokyo", type: "Ligne JR (Train à grande vitesse)", note: "✅ Acheté · Smart EX 2002 · 11:29 → 13:06 · Voiture 12 · QR-Ticket" },
  { name: "Train aérien Yurikamome", from: "Tokyo", to: "Île d'Odaiba", type: "Opérateur Privé" },
  { name: "Métro et trains locaux (5 jours)", from: "Tokyo", to: "Tokyo (divers)", type: "Opérateur Privé / Local" },
  { name: "Narita Express (N'EX)", from: "Gare de Tokyo", to: "Aéroport de Narita", type: "Ligne JR (hors validité JR Pass)" },
];

export const budget = {
  note: "Vols, hôtels et billets longue distance confirmés (Revolut). Excursions Fuji + estimations urbaines en attente. Le JR Pass ne vaut pas le coup (voir analyse ci-dessous).",
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
        "<strong>✅ 4 hôtels sur 5 déjà payés par Juancar sur Booking (3 033,86€ groupe · 606,77€/personne)</strong> :",
        "• Hotel Keihan Kyoto Hachijoguchi (7–12 sept, 5 nuits) : 669,86€ groupe · 133,97€/personne ✓",
        "• Hotel Resol Trinity Kanazawa (12–13 sept, 1 nuit) : 161,89€ groupe · 32,38€/personne ✓",
        "• Hotel Wood Takayama (13–14 sept, 1 nuit) : 274,98€ groupe · 55,00€/personne ✓",
        "• KOKO HOTEL Residence Asakusa Kappabashi (15–21 sept, 6 nuits) : 1 927,13€ groupe · 385,43€/personne ✓",
        "<strong>⚠️ En attente de paiement sur place à l'hôtel en espèces</strong> :",
        "• Magome Chaya (14–15 sept, 1 nuit, avec dîner) : ~178,98€ groupe (~32 000 ¥) · 35,80€/personne. À payer en liquide à l'auberge (retirer de l'argent avant).",
      ],
    },
    {
      title: "Transports Intérieurs",
      details: [
        "<strong>Déjà acheté ≈ 1 287€ groupe (~257€/personne)</strong> — Nozomi 53 373,27€ · Thunderbird/Kagayaki 209,38€ · Nohi Magome 135,61€ · Shinano 4 77,84€ · Nozomi 358 295,62€ · Nohi jour 7 (Kanazawa↔Shirakawa↔Takayama) ≈ 196€.",
        "Encore estimé ≈ 156€/personne : N'EX arrivée, JR locaux, métro Tokyo, Shinkansen Fuji (Kodama), Skyliner/N'EX retour.",
        "Total transport est. ≈ 414€/personne · ~2 068€ groupe. Taux Revolut ~184 ¥/€.",
        "Japan Rail Pass Ordinary (jrpass.com) : 284€ / 455€ / 568€ (7/14/21 jours) — <strong>ne vaut pas le coup</strong> (analyse ci-dessous).",
      ],
    },
    {
      title: "Excursions Mont Fuji",
      details: [
        "<strong>Tour Ken Kaneshima (jour 14, confirmé) :</strong> 13 000 ¥ (~70€)/personne · ~350€ groupe (mini-van + entrées).",
        "<strong>GetYourGuide (jours 10–13, 4 dates réservées) :</strong> 210€ groupe / 42€/personne pour le jour utilisé. Annulation gratuite 24h avant pour le reste (remboursement 100 %). Paiement prévu ~13 sept.",
        "Si le ciel est dégagé un jour 10–13 on peut faire GYG et annuler le reste ; Ken le jour 14 est indépendant. Le Shinkansen Fuji est dans Transports.",
      ],
    },
    {
      title: "Repas et Boissons (14 jours)",
      details: [
        "Petit-déjeuner ~5€, déjeuner décontracté/ramen ~10€, bon dîner/sushi ~20€. Env. 40€/jour (sans compter les 2 dîners inclus dans les hébergements : Magome Chaya et dîner wagyu à Takayama).",
      ],
    },
    {
      title: "Assurance, eSIM et extras",
      details: [
        "Assurance Heymondo Japon : 273,60€ (4 personnes · Revolut).",
        "eSIM Holafly : 164,88€ (4 personnes · Revolut).",
        "Entrées (temples, TeamLab, belvédères), Takkyubin Kyoto→Tokyo et divers ~150€/personne à titre indicatif.",
      ],
    },
  ],
  totalPerPerson: "~2 735€ – 2 880€ (tout inclus)",
  totalGroup: "~13 680€ – 14 400€ (5 personnes)",
};
