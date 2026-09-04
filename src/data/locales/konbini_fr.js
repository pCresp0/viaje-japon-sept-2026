// Guide des Konbinis et Supermarchés — Français

export const konbiniRules = [
  {
    icon: "🔥",
    title: "Faire réchauffer son plat à la caisse",
    desc: "En caisse, on vous demandera « Atatamemasu ka ? » (Voulez-vous qu'on le réchauffe ?). Dites « Hai, onegaishimasu », et ils le passeront au micro-ondes professionnel en 20 secondes.",
  },
  {
    icon: "☕",
    title: "Le rituel du café glacé et des frappés",
    desc: "Pour un café glacé ou un frappé : prenez le gobelet avec glaçons ou la base surgelée dans le congélateur, payez en caisse, puis placez-le vous-même dans la machine automatique.",
  },
  {
    icon: "🏷️",
    title: "Attention aux éditions « 期間限定 » (Kikan Gentei)",
    desc: "Signifie « Édition Limitée Saisonnière ». En septembre, profitez des saveurs d'automne : châtaigne (kuri), patate douce (satsumaimo) et raisin Shine Muscat.",
  },
  {
    icon: "🏮",
    title: "Réductions du soir (Mikiri Hin)",
    desc: "Dès 19h30–20h00, les supermarchés et certains konbinis collent des étiquettes à -20 %, -30 % ou -50 % (半額, hangaku) sur les sushis frais et bentos du jour.",
  },
];

export const konbiniChains = [
  {
    badge: "Le roi des plats cuisinés de qualité et des marques propres",
    vibe: "L'enseigne avec les exigences de fraîcheur les plus élevées du Japon. Sa marque 'Seven Premium' rivalise sans rougir avec de vrais restaurants.",
    specialty: "Sandwichs aux œufs, bentos haut de gamme, café fraîchement moulu et ramen étoilés Michelin.",
    bestFor: "Petits-déjeuners express, café du matin et dîners gourmands sans prise de tête.",
    items: [
      {
        name: "Tamago Sando (Sandwich salade d'œufs)",
        highlight: "⭐ Le plus célèbre du monde (le préféré d'Anthony Bourdain)",
        desc: "Pain shokupan blanc ultra-moelleux sans croûte, garni d'une salade d'œufs crémeuse sublimée par la mayonnaise japonaise Kewpie. Une véritable obsession culinaire.",
        tag: "Petit-déjeuner / Snack",
        tip: "Chez 7-Eleven, l'œuf est nettement plus crémeux et savoureux que dans n'importe quelle autre enseigne.",
      },
      {
        name: "Onigiris Seven Premium (Saumon grillé et Thon-Mayo)",
        highlight: "🍙 Algue toujours ultra-croustillante",
        desc: "L'emballage breveté protège la feuille de nori de l'humidité du riz jusqu'à ce que vous tiriez sur les languettes 1-2-3. La version saumon braisé (Benisake) contient de vrais morceaux juteux.",
        tag: "Classique",
        tip: "Pour manger sur le pouce, prenez le sachet triangulaire craquant ; pour du riz assaisonné compact, choisissez les formes rondes.",
      },
      {
        name: "Café fraîchement moulu en machine (Seven Café)",
        highlight: "☕ Qualité digne d'un barista pour une somme dérisoire",
        desc: "Grains 100 % arabica moulus à la minute. Pour un Iced Coffee, prenez le gobelet de glaçons au congélateur, payez en caisse et lancez la machine.",
        tag: "Boisson",
        tip: "Le café noir glacé (Iced Black Coffee) est idéal pour se réveiller lors des chaudes matinées de septembre.",
      },
      {
        name: "Seven Smoothies mixés en magasin",
        highlight: "🍓 Phénomène viral à Tokyo et Kyoto",
        desc: "Gobelets de fruits et légumes surgelés. Après paiement, scannez le code-barres sur le mixeur futuriste en magasin, insérez le gobelet et savourez un smoothie frais en 60 secondes.",
        tag: "Fruit / Santé",
        tip: "Les parfums Mangue & Orange ou Fraise & Banane au lait sont ultra-rafraîchissants.",
      },
      {
        name: "Ramen instantanés d'exception (Nakiryu / Ippudo / Tomita)",
        highlight: "🍜 Nouilles de niveau restaurant étoilé Michelin",
        desc: "Bols de ramen élaborés en collaboration directe avec des institutions légendaires (le bouillon Dandan épicé au sésame étoilé de Nakiryu, ou le tsukemen dense de Tomita).",
        tag: "Dîner rapide",
        tip: "Emportez-le à l'hôtel, versez l'eau bouillante de la bouilloire et ajoutez les sachets de bouillon concentré.",
      },
    ],
  },
  {
    badge: "Le temple du poulet frit croustillant et des frappés",
    vibe: "Célèbre pour son carillon d'entrée culte, ses snacks chauds au comptoir et sa gamme streetwear design 'Convenience Wear'.",
    specialty: "Famichiki, Frappés au café/lait glacé, Soufflé Pudding et chaussettes rétro.",
    bestFor: "Goûters chauds et salés, desserts gourmands et envie de poulet frit au retour à l'hôtel.",
    items: [
      {
        name: "Famichiki (Poulet frit désossé)",
        highlight: "🍗 Le roi absolu et incontesté du poulet frit au Japon",
        desc: "Cuisse de poulet désossée, ultra-croustillante à l'extérieur et incroyablement juteuse à cœur. Servi dans une pochette thermique prédécoupée pour ne pas se tacher les doigts.",
        tag: "Snack chaud",
        tip: "Commandez-le en montrant la vitrine chauffante : « Famichiki hitotsu kudasai ».",
      },
      {
        name: "Famichiki Bun (L'astuce secrète du burger)",
        highlight: "🍔 Le combo malin des habitués",
        desc: "Au rayon boulangerie, achetez le pain burger vendu déjà nappé de sauce tartare japonaise. Insérez-y votre Famichiki chaud : vous obtenez l'un des meilleurs burgers au poulet pour à peine 2 €.",
        tag: "Astuce / Repas",
        tip: "Prenez le pain en rayon et commandez le Famichiki chaud en caisse ; assemblez-le aussitôt.",
      },
      {
        name: "Frappés en machine FamilyMart",
        highlight: "🍧 Boisson glacée interactive",
        desc: "Gobelet de glace pilée et crème glacée au congélateur. Pressez le gobelet pour casser le bloc, payez, placez-le sous la machine et appuyez sur 'Frappé' pour injecter du lait chaud moussé.",
        tag: "Boisson gourmande",
        tip: "En septembre, cherchez le parfum Matcha d'Uji ou les saveurs de fruits d'automne.",
      },
      {
        name: "Soufflé Pudding (Flan japonais et gâteau soufflé)",
        highlight: "🍮 Le dessert star de la pâtisserie Famima",
        desc: "Un flan au caramel fondant (Purin) surmonté d'une crème fouettée légère et d'un soufflé au fromage moelleux qui tremble au moindre mouvement de cuillère.",
        tag: "Dessert / Douceur",
        tip: "Numéro 1 des ventes au rayon frais de FamilyMart, à ne surtout pas manquer.",
      },
      {
        name: "Ligne Convenience Wear (Chaussettes rayées rétro)",
        highlight: "🧦 Phénomène de mode urbaine créé avec Facetasm",
        desc: "FamilyMart a révolutionné le vêtement basique avec le créateur Hiromichi Ochiai. Leurs chaussettes aux bandes emblématiques bleu et vert sont devenues un souvenir culte.",
        tag: "Souvenir / Mode",
        tip: "Coton épais japonais très confortable : un souvenir stylé et bon marché.",
      },
    ],
  },
  {
    badge: "Le paradis de la haute pâtisserie 'Uchi Café' et de Karaage-kun",
    vibe: "Son logo en bouteille de lait rappelle son origine laitière. Incontestablement le konbini avec les meilleures crèmes fraîches, gâteaux et bouchées de poulet.",
    specialty: "Karaage-kun (bouchées de poulet en boîte), Premium Roll Cake et gâteaux au fromage Uchi Café.",
    bestFor: "S'offrir un dessert raffiné le soir ou grignoter des bouchées de poulet croustillantes en chemin.",
    items: [
      {
        name: "Karaage-kun (Bouchées de poulet frit)",
        highlight: "🐓 La boîte hexagonale au coq la plus attachante du Japon",
        desc: "Cinq beignets de poulet tendres et juteux avec un cure-dent en bois pour manger proprement. Parfums incontournables : Regular (sel/poivre), Red (légèrement pimenté) et Cheese (cœur fromage fondu).",
        tag: "Snack chaud",
        tip: "Découvrez toujours l'édition limitée du moment (期間限定) : curry japonais, citron ou barbecue fumé.",
      },
      {
        name: "Premium Roll Cake (Uchi Café)",
        highlight: "🍰 Se déguste à la cuillère tant la crème est légère",
        desc: "Un disque de génoise aérée garni d'une crème fouettée au lait frais d'Hokkaido si pure et délicate qu'elle rivalise avec les grandes pâtisseries de Ginza.",
        tag: "Dessert / Pâtisserie",
        tip: "Demandez une cuillère en caisse (« Supūn onegaishimasu ») pour le savourer directement dans sa barquette.",
      },
      {
        name: "Baschee (Cheesecake façon basque)",
        highlight: "🧀 Le phénomène qui a battu tous les records de vente au Japon",
        desc: "Un cheesecake au dessus caramélisé et au cœur fondant ultra-onctueux. Le plus grand succès de l'histoire des desserts de konbini.",
        tag: "Pâtisserie / Douceur",
        tip: "À savourer avec un thé vert froid non sucré (Oolong ou Ryokucha).",
      },
      {
        name: "Onigiris au riz de Niigata (Kinshari)",
        highlight: "🍙 Pour les puristes du riz japonais",
        desc: "Lawson utilise du riz d'exception Koshihikari façonné sans excès de pression, offrant des grains fondants comme faits maison, avec de la poitrine de porc grillée ou des œufs de saumon (ikura).",
        tag: "Repas / Riz",
        tip: "La gamme haut de gamme 'Kinshari' se repère à son élégant emballage noir et or.",
      },
      {
        name: "Natural Lawson (Gamme bio et équilibrée)",
        highlight: "🥗 Pour trouver des fruits frais, matcha bio et en-cas végans",
        desc: "À Tokyo et Kyoto, repérez les devantures bordeaux 'Natural Lawson'. Ils proposent jus pressés à froid, salades bio, pains au levain et snacks équilibrés.",
        tag: "Santé / Bio",
        tip: "Idéal pour compenser après plusieurs repas riches en ramen et fritures.",
      },
    ],
  },
  {
    badge: "Les rois de la glace 'Soft Cream' et de la cuisine minute",
    vibe: "Moins répandu que les trois géants, mais adoré des Japonais pour sa cuisine chaude sur commande et son espace de restauration sur place (eat-in).",
    specialty: "Soft Cream au lait d'Hokkaido, frites découpées en X et coupes glacées Halohalo.",
    bestFor: "Déguster une glace artisanale à l'italienne inégalable ou des frites croustillantes faites à la demande.",
    items: [
      {
        name: "Soft Cream à la vanille d'Hokkaido",
        highlight: "🍦 Considérée comme la meilleure glace en cornet du Japon",
        desc: "Élaborée avec du lait entier et de la crème fraîche des pâturages d'Hokkaido dans un cornet gaufré croustillant. Une texture veloutée et un goût lacté qui surpassent les fast-foods occidentaux.",
        tag: "Glace incontournable",
        tip: "En septembre, un parfum d'automne est souvent proposé en alternance : melon de Yubari ou chocolat noir belge.",
      },
      {
        name: "Halohalo (Granité de fruits + Soft Cream)",
        highlight: "🍧 Le rafraîchissement ultime de la fin de l'été",
        desc: "Coupe de fruits surgelés finement tranchés (fraise ou melon) avec sirop et gelées, coiffée de leur légendaire glace Soft Cream. Mélangez l'ensemble avant de déguster.",
        tag: "Dessert glacé",
        tip: "Commandez-le au comptoir cuisine et ils vous le préparent à la minute.",
      },
      {
        name: "X-Fried Potatoes (Frites en croix)",
        highlight: "🍟 Découpe brevetée en forme de 'X'",
        desc: "Sa forme cruciforme offre 4 arêtes extérieures hyper croustillantes tout en gardant un cœur moelleux comme de la purée. Cuites à la demande dans la cuisine du magasin.",
        tag: "Snack chaud",
        tip: "Demandez le sachet de sauce tomate ou mayonnaise proposé lors du règlement.",
      },
    ],
  },
  {
    badge: "Souvenirs gourmands, KitKats insolites et festival d'autocollants bradés",
    vibe: "Donki est le bazar géant ouvert 24h/24 pour dénicher friandises insolites et cosmétiques détaxés ; les supermarchés de quartier (Life, Seiyu, Aeon) sont le secret pour dîner de sushis à moitié prix.",
    specialty: "Kit Kats aux saveurs japonaises, bières artisanales, snacks au matcha et plateaux de sashimi bradés dès 20h.",
    bestFor: "Remplir sa valise de cadeaux comestibles et dîner comme des rois à l'hôtel pour moins de 5 €.",
    items: [
      {
        name: "Kit Kats aux parfums rares chez Don Quijote",
        highlight: "🍫 Le cadeau gourmand indispensable à ramener en Europe",
        desc: "Donki consacre des allées entières à des saveurs introuvables chez nous : Matcha intense d'Uji, Saké japonais (0,4 % d'alcool), Cheesecake de Tokyo, Wasabi, Fraise de Tochigi ou Patate douce grillée.",
        tag: "Souvenir gourmand",
        tip: "Pour tout achat supérieur à 5 500 ¥ chez Don Quijote, présentez votre passeport en caisse pour obtenir la détaxe de 10 % (Tax Free).",
      },
      {
        name: "Réductions du soir au supermarché (Autocollants 半額 Hangaku)",
        highlight: "🏷️ L'astuce économique suprême au Japon",
        desc: "Entre 19h30 et 20h30, les supermarchés de quartier (comme la chaîne LIFE près des hôtels à Kyoto et Tokyo) soldent leurs produits frais : plateaux de 12 sushis, bols de sashimi, tempuras et bentos étiquetés à -20 %, -30 % puis -50 % (半額).",
        tag: "Supermarché / Bon plan",
        tip: "Les locaux guettent discrètement l'employé avec son pistolet à étiquettes. Les produits sont du jour et d'une fraîcheur irréprochable.",
      },
      {
        name: "Boissons énergisantes et récupératrices (Ukon no Chikara)",
        highlight: "⚡ L'élixir anti-fatigue et anti-gueule de bois des salarymen",
        desc: "Petites fioles au curcuma (Ukon no Chikara) bues avant les soirées izakaya pour éviter la gueule de bois, ou boissons isotoniques (Pocari Sweat / Aquarius) pour réhydrater le corps après 20 000 pas sous la chaleur.",
        tag: "Forme & Récupération",
        tip: "Gardez toujours une bouteille de Pocari Sweat dans votre sac le matin avant de marcher dans les temples.",
      },
    ],
  },
];
