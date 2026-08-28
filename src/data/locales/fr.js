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
      id: "nozomi-ida",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Réserver Shinkansen Nozomi (Aller)",
      detail: "📅 07/09/2026\n👥 5 personnes\n🚆 Shinkansen Nozomi\n⏰ Départ ciblé: ~16:54\n📍 Shinagawa → Kyoto\n💳 Acheter : SmartEX App/Web\n⚠️ OBLIGATOIRE : Sièges avec 'Oversized Baggage' pour grandes valises. Réservez ensemble (sièges E côté fenêtre droite pour voir Fuji).",
      deadline: "1 mois avant (07/08/2026 10:00 JST)",
    },
    {
      id: "kyoto-kanazawa",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Réserver Kyoto → Kanazawa",
      detail: "📅 12/09/2026\n👥 5 personnes\n🚆 Thunderbird + Hokuriku Shinkansen\n⏰ Départ ciblé: ~08:10\n📍 Kyoto → Tsuruga → Kanazawa\n💳 Acheter : JR-WEST ONLINE TRAIN RESERVATION\n⚠️ Réservez des sièges standard ensemble. C'est un billet combiné.",
      deadline: "1 mois avant (12/08/2026 10:00 JST)",
    },
    {
      id: "bus-magome",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Réserver Nohi Bus Takayama → Magome",
      detail: "📅 14/09/2026\n👥 5 personnes\n🚌 Nohi Bus Direct\n⏰ Départ ciblé: 08:00\n📍 Takayama Nohi Bus Center → Magome\n💳 Acheter : Japan Bus Online / Nohi Bus Web\n⚠️ C'est le bus direct. Se remplit rapidement en haute saison.",
      deadline: "1 mois avant",
    },
    {
      id: "cena-magome",
      category: "logistica",
      urgency: "alta",
      title: "🔴 Confirmer Dîner Magome Chaya",
      detail: "📅 14/09/2026\n👥 5 personnes\n🍱 Dîner Minshuku\n⏰ Heure: exactement 18:00\n📍 Magome Chaya\n⚠️ L'hébergement exige une confirmation pour servir le dîner. Envoyez un e-mail à Jeng en indiquant: 5 personnes, arrivée le 14/09, heure 18:00. Sans confirmation, il n'y a pas de dîner (¥3,630/personne).",
      deadline: "Fais-le maintenant",
    },
    {
      id: "tour-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Réserver Excursion Privée Fuji",
      detail: "📅 20/09/2026 (ou jours précédents selon la météo)\n👥 5 personnes\n🚐 Mini-van privé avec Ken Kaneshima\n⏰ Journée complète\n📍 Tokyo ↔ Lacs Fuji\n⚠️ Selon l'itinéraire: Réservez 3-4 jours et annulez ceux avec le pire temps. Contactez via web ou téléphone pour confirmer la politique d'annulation et bloquer les jours.",
      deadline: "Fais-le dès que possible",
    },
    {
      id: "nozomi-vuelta",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Réserver Shinkansen Nozomi (Retour à Tokyo)",
      detail: "📅 15/09/2026\n👥 5 personnes\n🚆 Shinkansen Nozomi\n⏰ Départ ciblé: ~11:00\n📍 Nagoya → Tokyo\n💳 Acheter : SmartEX App/Web\n⚠️ OBLIGATOIRE : Sièges avec 'Oversized Baggage'.",
      deadline: "1 mois avant (15/08/2026 10:00 JST)",
    },
    {
      id: "shinano",
      category: "reserva",
      urgency: "media",
      title: "🟠 Réserver JR Shinano (Nakatsugawa → Nagoya)",
      detail: "📅 15/09/2026\n👥 5 personnes\n🚆 JR Shinano Limited Express 4\n⏰ Départ ciblé: ~09:57\n📍 Nakatsugawa → Nagoya\n💳 Acheter : JR Central (SmartEX/JR-West online)\n⚠️ Train populaire pour revenir des Alpes. Réservez ensemble.",
      deadline: "1 mois avant",
    },
    {
      id: "entradas-tokio",
      category: "reserva",
      urgency: "media",
      title: "🟠 Acheter les billets TeamLab / Shibuya Sky / Mori Tower",
      detail: "📅 Pendant les jours de Tokyo (16-19 sept)\n👥 5 personnes\n🎟️ Billets numériques\n📍 Tokyo\n⚠️ Shibuya Sky (coucher de soleil) et Mori Tower s'épuisent très vite. Si le groupe veut y aller, les billets doivent être achetés le premier jour de leur ouverture (généralement 4 semaines avant à minuit au Japon).",
      deadline: "1 mois avant",
    },
    {
      id: "esim-suica",
      category: "logistica",
      urgency: "media",
      title: "🟠 Logistique numérique: eSIM, Suica et Visit Japan Web",
      detail: "📅 Avant le vol (Septembre)\n👥 5 personnes\n📱 Mobile\n⚠️ Achetez les eSIMs et configurez la Suica numérique dans Apple Wallet. Générez les codes QR Visit Japan Web.",
      deadline: "Avant de voyager",
    },
    {
      id: "equipaje",
      category: "logistica",
      urgency: "baja",
      title: "🟡 Gérer l'expédition des bagages (Takkyubin)",
      detail: "📅 12/09/2026 (Matin)\n👥 5 grandes valises\n📦 Service de messagerie (Yamato/Sagawa)\n📍 Hôtel Kyoto → Hôtel Tokyo\n⚠️ Confirmez lors du check-in à Kyoto s'ils peuvent envoyer les valises directement à Tokyo (Koko Hotel) pour voyager dans les Alpes uniquement avec un sac à dos. Gardez les reçus.",
      deadline: "Pendant le voyage",
    },
    {
      id: "cena-takayama",
      category: "reserva",
      urgency: "baja",
      title: "🟡 Réserver le dîner de bœuf Hida à Takayama",
      detail: "📅 13/09/2026\n👥 5 personnes\n🥩 Restaurant local\n⏰ Départ ciblé: ~19:00\n📍 Takayama\n⚠️ C'est dimanche et les magasins de Takayama ferment tôt (17:00). Les restaurants populaires sont pleins. Pour dîner wagyu/bœuf Hida ensemble sans faire la queue, il est fortement recommandé de réserver.",
      deadline: "Avant de voyager",
    },
    {
      id: "mochilas-magome",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Expédition de sacs à dos Nakasendo (Magome ↔ Tsumago)",
      detail: "📅 14/09/2026\n📍 Office de tourisme de Magome (08:30–11:30)\n⚠️ Déposez les sacs à dos à Magome pour marcher léger jusqu'à Tsumago. ~¥500 par pièce.",
      deadline: "Le même jour",
    },
    {
      id: "desayunos",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Petits-déjeuners de commodité",
      detail: "📅 7 sept (pour Fushimi Inari) et 14 sept (à Magome pour le train)\n📍 Konbini local\n⚠️ L'hébergement de Magome ne fournit pas de petit-déjeuner et le départ pour Fushimi Inari le jour 2 est trop tôt. Achetez aux konbinis la veille.",
      deadline: "Le même jour",
    }
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
