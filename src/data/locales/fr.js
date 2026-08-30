// Superposición de traducción — fr
// Sólo contiene texto traducido; todo lo demás se hereda.

import { days } from "./trip_days_fr";
import { historyPeriods, furtherReading } from "./history_fr";
import { guides } from "./guides_fr";
import { popCulture } from "./popCulture_fr";
import { tripMeta, flights, blocks, stays, transports, budget } from "./trip_extra_fr";
import { stops as mapStops, filterData as mapFilterData, mapLabels } from "./mapData_fr";
import { weatherData, dailyWeather, weatherLabels } from "./weatherData_fr";

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
    { title: "Incontournables" },
    { title: "Par zone du voyage" },
    { title: "Cuisine de rue & rapide" },
    { title: "Douceurs & boissons" }
  ],
  foods: [
    { name: "Ramen", where: "Partout · Ippudo et locaux", desc: "Nouilles dans un bouillon riche (shoyu, miso, tonkotsu...). Chaque quartier au Japon a son style. Commandez ce qui vous tente au distributeur ou au bar.", tip: "Dans beaucoup d'endroits, on commande sur un distributeur : choisissez, payez, et donnez le ticket au chef." },
    { name: "Sushi / sashimi", where: "Toyosu, marchés, kaiten-zushi", desc: "Riz vinaigré avec poisson cru (sushi) ou juste le poisson (sashimi). Ça vaut le coup à Toyosu ou dans un bon resto de quartier.", tip: "Le wasabi est souvent déjà dans le nigiri : pas besoin d'en rajouter. Le gingembre nettoie le palais entre les pièces." },
    { name: "Tempura", where: "Kyoto, Tokyo", desc: "Légumes et fruits de mer frits très légers. Kyoto a d'excellents endroits ; aussi disponible en menu du jour (teishoku).", tip: "Trempez-le dans le tentsuyu (bouillon) ou saupoudrez juste de sel. Ne le détrempez pas." },
    { name: "Tonkatsu", where: "Tokyo · Katsukura et similaires", desc: "Côtelette de porc panée, croustillante à l'extérieur et juteuse à l'intérieur. Souvent servie avec du riz, de la soupe miso et du chou râpé.", tip: "Écrasez la sauce dans le mortier de sésame à votre table : c'est bien meilleur." },
    { name: "Wagyu / yakiniku", where: "Takayama (bœuf de Hida), Tokyo", desc: "Bœuf japonais intensément persillé. À Takayama, le bœuf de Hida rivalise avec celui de Kobe. Grillé à table ou en steakhouse.", tip: "Petits morceaux : ça cuit à la perfection en quelques secondes. Ne le laissez pas carboniser." },
    { name: "Okonomiyaki", where: "Osaka · Dotonbori / Shinsekai", desc: "Crêpe salée au chou, pâte et garnitures (porc, fruits de mer...). À Osaka, vous le cuisinez souvent vous-même sur la plaque chauffante de la table.", tip: "Style d'Osaka = tout mélanger. Style d'Hiroshima = en couches. Essayez celui d'Osaka pendant ce voyage." },
    { name: "Takoyaki", where: "Osaka · cuisine de rue", desc: "Boulettes de pâte avec un morceau de poulpe, sauce, mayonnaise et katsuobushi (bonite fumée qui 'danse' avec la chaleur).", tip: "Elles sont bouillantes à l'intérieur : prenez la première bouchée avec précaution." },
    { name: "Kushikatsu", where: "Osaka · Shinsekai", desc: "Brochettes panées et frites (viande, légumes, fromage...). Une spécialité du quartier de Shinsekai.", tip: "Règle sacrée : ne trempez pas deux fois votre bâtonnet dans la sauce commune (pas de double trempage)." },
    { name: "Kaiseki", where: "Kyoto", desc: "Menu dégustation de saison, plat par plat, très visuel. La haute gastronomie japonaise ancrée dans la cérémonie du thé.", tip: "Pour un repas abordable, cherchez le 'kaiseki lunch' à midi — moins cher que le dîner." },
    { name: "Matcha et wagashi", where: "Kyoto · Uji / Gion", desc: "Thé vert en poudre fouetté et douceurs traditionnelles (mochi, yokan...). À Kyoto, le matcha est une religion.", tip: "L'amertume du matcha s'équilibre avec le sucré : mangez le wagashi d'abord ou en même temps." },
    { name: "Brioche au bœuf de Hida / mitarashi", where: "Takayama · vieille ville", desc: "À Sanmachi Suji : brioches vapeur au bœuf de Hida, brochettes mitarashi dango et saké local.", tip: "Idéal pour une collation entre les temples et les rues en bois." },
    { name: "Unagi (anguille)", where: "Tokyo, Kyoto", desc: "Anguille grillée avec sauce aigre-douce sur du riz (unadon / unaju). Très appréciée en été, mais on en mange toute l'année.", tip: "Cher mais une expérience unique. Commandez un unajū si vous voulez la boîte laquée complète." },
    { name: "Onigiri", where: "Konbini (7-Eleven, FamilyMart, Lawson)", desc: "Triangles de riz garnis (saumon, umeboshi, thon-mayo...) enveloppés d'algue nori. Petit-déjeuner ou collation parfait.", tip: "L'emballage du konbini a un truc : tirez les languettes dans l'ordre 1-2-3 pour ne pas mouiller l'algue." },
    { name: "Gyoza", where: "Ramen shops et izakayas", desc: "Raviolis grillés, croustillants d'un côté. Presque toujours au porc et aux légumes.", tip: "Sauce typique : sauce soja + vinaigre + quelques gouttes de rayu (huile pimentée)." },
    { name: "Yakitori", where: "Shinjuku · Omoide Yokocho, izakayas", desc: "Brochettes de poulet (et plus) grillées, au sel ou sauce tare. Parfait avec une beer en fin de journée.", tip: "À Omoide Yokocho, l'ambiance fait le plat : étroit, fumée et néons." },
    { name: "Karaage", where: "Izakayas, konbinis", desc: "Poulet frit mariné. Croustillant, juteux, addictif. Qualité surprenante même au 7-Eleven.", tip: "Passe au niveau supérieur avec de la mayonnaise japonaise (Kewpie)." },
    { name: "Udon / soba", where: "Gares, Kyoto, Tokyo", desc: "Udon = nouilles épaisses de blé. Soba = sarrasin, plus fines. Dans un bouillon chaud ou froides avec une trempette (zaru).", tip: "Il fait encore chaud en septembre : le zaru soba froid est très agréable." },
    { name: "Ekiben", where: "Gares de Shinkansen", desc: "Bento de gare, spécialité locale à manger dans le train. Fait partie du rituel du Shinkansen.", tip: "Beaucoup de choix à Nagoya ou Tokyo Station avant le Nozomi. Achetez-en un différent à chaque long trajet." },
    { name: "Taiyaki / mochi", where: "Asakusa, foires, Nakamise", desc: "Taiyaki : gaufre en forme de poisson fourrée d'anko (pâte de haricot rouge) ou de crème. Mochi : gâteau de riz gluant.", tip: "À Nakamise (Asakusa), il y a des stands classiques pour grignoter en marchant." },
    { name: "Saké / highball", where: "Izakayas, Takayama, Kyoto", desc: "Saké (nihonshu) froid ou chaud selon le type. Highball = whisky + eau gazeuse, très populaire et rafraîchissant.", tip: "Très bon saké local à Takayama. Commandez 'karakuchi' si vous le voulez plus sec." },
    { name: "Petit-déjeuner japonais", where: "Hôtels, kissaten", desc: "Riz, soupe miso, poisson grillé, natto ou œuf, algues et tsukemono. Complet et salé.", tip: "Si l'hôtel le propose, essayez-le au moins une fois. Alternative pas chère : onigiri + café au konbini." }
  ],
  pendingItems: [
    {
      id: "cena-magome",
      category: "logistica",
      urgency: "alta",
      title: "🔴 Confirmer Dîner Magome Chaya (Juan Carlos)",
      detail: "👤 Responsable: Juan Carlos\n📅 14/09/2026\n👥 5 personnes\n🍱 Dîner Minshuku\n⏰ Heure: exactement 18:00\n📍 Magome Chaya\n⚠️ L'hébergement exige une confirmation pour servir le dîner. Juan Carlos doit envoyer un e-mail à Jeng : 5 personnes, arrivée 14/09, heure 18:00. Sans confirmation, pas de dîner (¥3.630/personne).",
      deadline: "Fais-le maintenant (Juan Carlos)",
    },
    {
      id: "recogida-billetes-jrwest",
      title: "🎟️ RETIRER BILLETS JR-WEST — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Recommandé le soir)\n📍 Kyoto Station (Machines vertes 5489)\n🎟️ Retirer physiquement la réservation JR-West nº 47932.\n⚠️ REQUIS :\n- Carte physique Mastercard (**8625) utilisée pour le paiement.\n- Numéro de réservation (47932).\n- Identification Number (PIN) à 4 chiffres.",
      deadline: "11/09/2026",
    },
    {
      id: "shinano-recogida",
      category: "logistica",
      urgency: "alta",
      title: "🎫 RÉCUPÉRER BILLETS PHYSIQUES — Shinano 4 (DÉJÀ PAYÉ)",
      detail: "📅 15/09/2026 (ou plus tôt en gare JR-WEST si possible)\n🚆 Shinano 4 · Nakatsugawa 09:57 → Nagoya 10:53\n🟢 Réservation FAITE : nº 42093 · Receipt AEE6606M · ¥14.350\n📍 Récupérer HORS des portiques\n⚠️ APPORTER : Mastercard physique **8625 · PIN = anniversaire de Pablo · Réservation 42093\nPLAN B : à Nakatsugawa ~08:40 (77 min avant le départ).",
      deadline: "Avant de monter dans le Shinano 4 (15/09 09:57)",
    },
    {
      id: "maletas-dimensiones",
      category: "logistica",
      urgency: "media",
      title: "🧳 Vérifier les dimensions des valises",
      detail: "📅 Avant le voyage\n👥 5 valises\n🚄 Pertinent pour le Shinkansen (ex. Nozomi 358 déjà acheté en Ordinary Car)\n⚠️ Mesurer longueur + largeur + hauteur :\n- ≤ 160 cm : OK sans zone spéciale\n- >160 cm et ≤250 cm : siège avec oversized baggage requis\nNe pas modifier les réservations existantes sans mesurer.",
      deadline: "Avant de voler",
    },
    {
      id: "nozomi-vuelta-prep",
      category: "logistica",
      urgency: "media",
      title: "📱 Préparer l'accès Smart EX — Nozomi 358 (DÉJÀ ACHETÉ)",
      detail: "📅 15/09/2026\n🚄 Nozomi 358 · Nagoya 11:29 → Tokyo 13:06\n🟢 Réservation FAITE : Smart EX nº 2002 · ¥54.500 · Voiture 12\n📱 Sauvegarder le QR-Ticket (option principale) ou désigner une IC card\n📧 Garder l'e-mail/confirmation Smart EX sur le téléphone\n⚠️ PAS un retrait physique obligatoire type JR-WEST.",
      deadline: "Avant le 15/09",
    },
    {
      id: "entradas-tokio",
      category: "reserva",
      urgency: "media",
      title: "🟠 Acheter les billets TeamLab / Shibuya Sky / Mori Tower",
      detail: "📅 Pendant les jours de Tokyo (16-19 sept)\n👥 5 personnes\n🎟️ Billets numériques\n📍 Tokyo\n⚠️ Shibuya Sky (coucher de soleil) et Mori Tower s'épuisent très vite. Acheter dès l'ouverture des ventes (souvent 4 semaines avant à minuit au Japon).",
      deadline: "4 semaines avant (~18/08/2026)",
    },
    {
      id: "shinkansen-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Réserver Shinkansen Excursion Fuji (Aller/Retour)",
      detail: "📅 20/09/2026\n👥 5 personnes\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805 (Aller 07:27) et retour Shin-Fuji→Tokyo\n📍 Tokyo ↔ Mishima / Shin-Fuji\n💳 Acheter : Smart EX App/Web\n⚠️ Excursion avec le guide Ken déjà confirmée pour le 20/09. Acheter les billets Smart EX (1 mois avant / 20 août 10:00 JST). Quitter l'hôtel ~06:30.",
      deadline: "1 mois avant (20/08/2026)",
    },
    {
      id: "cena-takayama",
      category: "reserva",
      urgency: "media",
      title: "🟠 Réserver le dîner de bœuf Hida à Takayama",
      detail: "📅 13/09/2026\n👥 5 personnes\n🥩 Restaurant local Wagyu/Hida beef\n⏰ Cible : ~19:00\n📍 Takayama\n⚠️ Dimanche soir : beaucoup de commerces ferment à 17:00. Fortement recommandé de réserver pour dîner à 5.",
      deadline: "Avant de voyager",
    },
    {
      id: "narita-transporte-vuelta",
      category: "reserva",
      urgency: "media",
      title: "🟠 Décider / Réserver Transport vers Narita (Skyliner ou N'EX)",
      detail: "📅 21/09/2026\n👥 5 personnes\n🚆 Keisei Skyliner (recommandé depuis Keisei-Ueno) ou JR N'EX (depuis Tokyo Station)\n📍 KOKO HOTEL Asakusa → Aéroport de Narita\n💡 Depuis Asakusa/Kappabashi, taxi jusqu'à Keisei-Ueno puis Skyliner direct. Le N'EX reste une alternative.\n⚠️ Vérifier les horaires sept. 2026 et réserver pour le vol 17:25.",
      deadline: "🟠 DÉCIDER / RÉSERVER",
    },
    {
      id: "esim-suica",
      category: "logistica",
      urgency: "media",
      title: "🟠 Logistique numérique : Suica et Visit Japan Web",
      detail: "📱 iPhone : app officielle 'Welcome Suica Mobile' dans Apple Wallet.\n🤖 Android étranger : pas de Welcome Suica Mobile — acheter une carte physique à Narita.\n💳 Welcome Suica : pas de dépôt ¥500 ; solde non remboursable. Recharge initiale recommandée ¥3.000–¥5.000/pers.\n🌐 Visit Japan Web : QR immigration/douanes pour les 5.",
      deadline: "Jours avant de voler",
    },
    {
      id: "equipaje",
      category: "logistica",
      urgency: "baja",
      title: "🟡 Gérer l'expédition des bagages (Takkyubin)",
      detail: "📅 12/09/2026 (Matin du check-out)\n👥 5 grandes valises\n📦 Messagerie (Yamato/Sagawa)\n📍 Hôtel Keihan Kyoto → KOKO HOTEL Residence Asakusa Kappabashi (Tokyo)\n⚠️ Envoyer les grandes valises de Kyoto à Tokyo pour voyager dans les Alpes avec un sac à dos uniquement.",
      deadline: "12 sept (matin du check-out)",
    },
    {
      id: "mochilas-magome",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Expédition de sacs à dos Nakasendo (Magome ↔ Tsumago)",
      detail: "📅 14/09/2026\n📍 Office de tourisme Magome (08:30–11:30)\n⚠️ Déposer les sacs à Magome (¥500/pièce) pour la marche de 8 km ; récupérer à Tsumago après 13:00.",
      deadline: "14 sept (même jour)",
    },
    {
      id: "desayunos",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Petits-déjeuners de commodité (Konbini)",
      detail: "📅 Soirs du 7 sept (Fushimi Inari) et 14 sept (Magome pour le bus)\n📍 7-Eleven / Lawson / FamilyMart\n⚠️ Magome Chaya ne propose pas de petit-déjeuner ; acheter la veille.",
      deadline: "7 et 14 sept (même jour)",
    },
  ],
  categoryLabels: {
    reserva: { label: "Réservations" },
    logistica: { label: "Logistique" }
  },
  urgencyConfig: {
    alta: { label: "Urgent" },
    media: { label: "Important" },
    baja: { label: "Quand possible" }
  }
};
