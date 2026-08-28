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
    { name: "Yakitori", where: "Shinjuku · Omoide Yokocho, izakayas", desc: "Brochettes de poulet (et plus) grillées, au sel ou sauce tare. Parfait avec une bière en fin de journée.", tip: "À Omoide Yokocho, l'ambiance fait le plat : étroit, fumée et néons." },
    { name: "Karaage", where: "Izakayas, konbinis", desc: "Poulet frit mariné. Croustillant, juteux, addictif. Qualité surprenante même au 7-Eleven.", tip: "Passe au niveau supérieur avec de la mayonnaise japonaise (Kewpie)." },
    { name: "Udon / soba", where: "Gares, Kyoto, Tokyo", desc: "Udon = nouilles épaisses de blé. Soba = sarrasin, plus fines. Dans un bouillon chaud ou froides avec une trempette (zaru).", tip: "Il fait encore chaud en septembre : le zaru soba froid est très agréable." },
    { name: "Ekiben", where: "Gares de Shinkansen", desc: "Bento de gare, spécialité locale à manger dans le train. Fait partie du rituel du Shinkansen.", tip: "Beaucoup de choix à Nagoya ou Tokyo Station avant le Nozomi. Achetez-en un différent à chaque long trajet." },
    { name: "Taiyaki / mochi", where: "Asakusa, foires, Nakamise", desc: "Taiyaki : gaufre en forme de poisson fourrée d'anko (pâte de haricot rouge) ou de crème. Mochi : gâteau de riz gluant.", tip: "À Nakamise (Asakusa), il y a des stands classiques pour grignoter en marchant." },
    { name: "Saké / highball", where: "Izakayas, Takayama, Kyoto", desc: "Saké (nihonshu) froid ou chaud selon le type. Highball = whisky + eau gazeuse, très populaire et rafraîchissant.", tip: "Très bon saké local à Takayama. Commandez 'karakuchi' si vous le voulez plus sec." },
    { name: "Petit-déjeuner japonais", where: "Hôtels, kissaten", desc: "Riz, soupe miso, poisson grillé, natto ou œuf, algues et tsukemono. Complet et salé.", tip: "Si l'hôtel le propose, essayez-le au moins une fois. Alternative pas chère : onigiri + café au konbini." }
  ],
  pendingItems: [
    { title: "Réserver le train panoramique Hida Express (Takayama → Nagoya)", detail: "Jour 8 (14 sept) : train panoramique. Très populaire en septembre, les places réservées s'épuisent vite. Sans JR Pass, acheter les billets à l'avance.", deadline: "Des semaines à l'avance" },
    { title: "Réserver le train Thunderbird (Kyoto → Kanazawa)", detail: "Jour 6 (12 sept) : train Thunderbird. Septembre est la haute saison à Kanazawa. Sans JR Pass, acheter les billets à l'avance.", deadline: "Des semaines à l'avance" },
    { title: "Réserver les sièges Shinkansen", detail: "Deux trains à grande vitesse clés : Jour 1 Tokyo → Kyoto et Jour 9 Nagoya → Tokyo. Sans JR Pass, réserver en ligne (SmartEX ou Klook) avec bagages volumineux si besoin.", deadline: "Des semaines à l'avance" },
    { title: "Réserver le Narita Express (N'EX)", detail: "Trains de l'aéroport au centre-ville (Jour 1) et retour (Jour 15). Sans JR Pass, il est conseillé de réserver en ligne ou à l'aéroport.", deadline: "Des semaines à l'avance ou à l'arrivée" },
    { title: "Réserver le train JR Shinano", detail: "Jours 8 et 9 : JR Shinano Limited Express entre Nagoya et Nakatsugawa. Recommandé de réserver à l'avance sans JR Pass.", deadline: "Des semaines à l'avance" },
    { title: "Vérifier les horaires de bus Magome → Nakatsugawa (Jour 9)", detail: "Le matin du jour 9 (15 sept), bus local très peu fréquent. Relie avec le JR Shinano.", deadline: "Vérifier le soir du 14 sept" },
    { title: "Organiser l'envoi de bagages Kyoto → Tokyo", detail: "Matin du jour 6, envoyer les grosses valises de l'hôtel de Kyoto vers celui de Tokyo (Takkyubin). Voyagez léger dans les Alpes.", deadline: "Confirmer avec les hôtels avant" },
    { title: "Réserver l'envoi de sacs à dos Magome ↔ Tsumago", detail: "Service de transport de bagages sur la route Nakasendo. Se réserve à l'office de tourisme le jour même.", deadline: "Confirmer les horaires avant" },
    { title: "Confirmer le dîner au Magome Chaya", detail: "Répondre à l'e-mail de Jeng pour confirmer le dîner pour 5 à 18h00 et prévenir en cas d'allergies alimentaires.", deadline: "Avant le voyage" },
    { title: "Acheter les billets en ligne (TeamLab & Shibuya Sky)", detail: "Acheter dès maintenant les billets en ligne pour le musée teamLab et Shibuya Sky (créneau du coucher du soleil) car ils partent vite.", deadline: "Dès que possible" },
    { title: "Internet et transport local", detail: "Achetez les eSIMs (Airalo, Ubigi) et ajoutez la carte Suica numérique directement dans Apple Wallet pour la recharger.", deadline: "Avant de voyager" },
    { title: "Petit-déjeuner route Nakasendo", detail: "Acheter un petit-déjeuner dans un konbini à Takayama ou Nakatsugawa le jour 14, car l'auberge rurale n'en sert pas.", deadline: "Jour 14 au Japon" }
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
