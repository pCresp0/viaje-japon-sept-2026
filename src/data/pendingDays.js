// Días que se habían planeado pero que finalmente no se hicieron en este viaje
// (por ejemplo, por mal tiempo). Se guardan aquí, fuera del itinerario de los
// 15 días, como referencia para un futuro viaje -- no se borran, solo se
// ocultan de la vista principal. Estructura multilingüe propia (no pasa por
// el sistema de fusión de content.js).

const nikkoSchedule = {
  es: [
    { time: "06:30", text: "Despertar." },
    { time: "06:50", text: "Salida hacia la Estación de Tobu-Asakusa (misma zona que el hotel, 15-25 min andando)." },
    { time: "~07:15", text: "Llegada a la estación. Recogida de billetes físicos si es necesario, antes de embarcar." },
    { time: "07:30", text: "🚅 Limited Express Kegon, Asakusa → Tobu-Nikko. Llegada a Tobu-Nikko a las 09:20 (1 h 50 min de trayecto). Recomendado el Tobu World Heritage Pass (~¥4.160/persona ≈ 22,60€), que incluye ida y vuelta en Limited Express más autobuses ilimitados por Nikko durante 2 días." },
    { time: "09:20", text: "Llegada a Tobu-Nikko Station. Recogida de folletos/mapa en el centro de turismo de la estación." },
    { time: "~09:40", text: "🚌 Bus hacia la zona de templos. Parada justo enfrente de la estación, dirección Chuzenji-onsen/Yumoto-onsen -- bajar en \"Shinkyo\" o \"Nishisando-iriguchi\". Salidas cada 15-30 min durante toda la mañana." },
    { time: "10:00–13:00", text: "🏯 Santuario Toshogu y alrededores. Puente Shinkyo (el puente rojo icónico sobre el río Daiya, símbolo de Nikko). Complejo de Toshogu: la puerta Yomeimon profusamente decorada, el relieve del 'mono que no ve, no oye, no habla', y el mausoleo de Tokugawa Ieyasu. Rinno-ji y Futarasan Jinja, los otros dos templos del conjunto Patrimonio de la Humanidad. Entrada combinada aprox. ¥2.100/persona." },
    { time: "13:00–13:45", text: "🍜 Almuerzo local: probar el yuba (piel de tofu), especialidad de Nikko desde hace siglos." },
    { time: "~13:55", text: "🚌 Bus hacia el lago Chuzenji, por la carretera de montaña Irohazaka (curvas muy pronunciadas, vistas espectaculares). Trayecto de 40-50 min." },
    { time: "14:40–16:30", text: "🏔️ Lago Chuzenji y cataratas Kegon. El lago, a los pies del monte Nantai. Las cataratas Kegon, de 97 m de caída, se ven bien de forma gratuita desde la plataforma superior, o con ascensor a la plataforma inferior (entrada aprox. ¥570)." },
    { time: "~16:40", text: "🚌 Bus de vuelta a Tobu-Nikko. Trayecto de 40-50 min." },
    { time: "17:44", text: "🚅 Limited Express Revaty Kegon, Tobu-Nikko → Asakusa. Llegada a Asakusa a las 19:35 (1 h 51 min de trayecto)." },
  ],
  en: [
    { time: "06:30", text: "Wake up." },
    { time: "06:50", text: "Head to Tobu-Asakusa Station (same area as the hotel, 15-25 min on foot)." },
    { time: "~07:15", text: "Arrival at the station. Pick up physical tickets if needed, before boarding." },
    { time: "07:30", text: "🚅 Limited Express Kegon, Asakusa → Tobu-Nikko. Arrival at Tobu-Nikko at 09:20 (1h 50min journey). Recommended: the Tobu World Heritage Pass (~¥4,160/person ≈ €22.60), including the round trip Limited Express plus unlimited buses around Nikko for 2 days." },
    { time: "09:20", text: "Arrival at Tobu-Nikko Station. Pick up brochures/map at the station's tourist center." },
    { time: "~09:40", text: "🚌 Bus toward the temple area. Stop right in front of the station, bound for Chuzenji-onsen/Yumoto-onsen -- get off at \"Shinkyo\" or \"Nishisando-iriguchi\". Departures every 15-30 min all morning." },
    { time: "10:00–13:00", text: "🏯 Toshogu Shrine and surroundings. Shinkyo Bridge (the iconic red bridge over the Daiya River, symbol of Nikko). Toshogu complex: the lavishly decorated Yomeimon Gate, the relief of the 'see no evil, hear no evil, speak no evil' monkeys, and the mausoleum of Tokugawa Ieyasu. Rinno-ji and Futarasan Jinja, the other two temples in the World Heritage ensemble. Combined admission approx. ¥2,100/person." },
    { time: "13:00–13:45", text: "🍜 Local lunch: try yuba (tofu skin), a Nikko specialty for centuries." },
    { time: "~13:55", text: "🚌 Bus toward Lake Chuzenji, along the Irohazaka mountain road (very sharp curves, spectacular views). 40-50 min ride." },
    { time: "14:40–16:30", text: "🏔️ Lake Chuzenji and Kegon Falls. The lake, at the foot of Mount Nantai. Kegon Falls, a 97m drop, is clearly visible for free from the upper platform, or by elevator to the lower platform (admission approx. ¥570)." },
    { time: "~16:40", text: "🚌 Bus back to Tobu-Nikko. 40-50 min ride." },
    { time: "17:44", text: "🚅 Limited Express Revaty Kegon, Tobu-Nikko → Asakusa. Arrival at Asakusa at 19:35 (1h 51min journey)." },
  ],
  fr: [
    { time: "06:30", text: "Réveil." },
    { time: "06:50", text: "Direction la gare de Tobu-Asakusa (même zone que l'hôtel, 15-25 min à pied)." },
    { time: "~07:15", text: "Arrivée à la gare. Récupération des billets physiques si nécessaire, avant d'embarquer." },
    { time: "07:30", text: "🚅 Limited Express Kegon, Asakusa → Tobu-Nikko. Arrivée à Tobu-Nikko à 09h20 (1h50 de trajet). Recommandé : le Tobu World Heritage Pass (~¥4 160/personne ≈ 22,60 €), incluant l'aller-retour en Limited Express plus des bus illimités dans Nikko pendant 2 jours." },
    { time: "09:20", text: "Arrivée à la gare de Tobu-Nikko. Récupération de brochures/carte au centre touristique de la gare." },
    { time: "~09:40", text: "🚌 Bus vers la zone des temples. Arrêt juste devant la gare, direction Chuzenji-onsen/Yumoto-onsen -- descendre à \"Shinkyo\" ou \"Nishisando-iriguchi\". Départs toutes les 15-30 min toute la matinée." },
    { time: "10:00–13:00", text: "🏯 Sanctuaire Toshogu et alentours. Pont Shinkyo (le célèbre pont rouge sur la rivière Daiya, symbole de Nikko). Complexe de Toshogu : la porte Yomeimon richement décorée, le relief des singes 'je ne vois rien, je n'entends rien, je ne dis rien', et le mausolée de Tokugawa Ieyasu. Rinno-ji et Futarasan Jinja, les deux autres temples de l'ensemble du patrimoine mondial. Entrée combinée environ ¥2 100/personne." },
    { time: "13:00–13:45", text: "🍜 Déjeuner local : goûter le yuba (peau de tofu), spécialité de Nikko depuis des siècles." },
    { time: "~13:55", text: "🚌 Bus vers le lac Chuzenji, par la route de montagne Irohazaka (virages très serrés, vues spectaculaires). 40-50 min de trajet." },
    { time: "14:40–16:30", text: "🏔️ Lac Chuzenji et chutes de Kegon. Le lac, au pied du mont Nantai. Les chutes de Kegon, une chute de 97 m, bien visibles gratuitement depuis la plateforme supérieure, ou en ascenseur jusqu'à la plateforme inférieure (entrée environ ¥570)." },
    { time: "~16:40", text: "🚌 Bus retour vers Tobu-Nikko. 40-50 min de trajet." },
    { time: "17:44", text: "🚅 Limited Express Revaty Kegon, Tobu-Nikko → Asakusa. Arrivée à Asakusa à 19h35 (1h51 de trajet)." },
  ],
  tl: [
    { time: "06:30", text: "Gising na." },
    { time: "06:50", text: "Papuntang Tobu-Asakusa Station (parehong lugar ng hotel, 15-25 min na lakad)." },
    { time: "~07:15", text: "Pagdating sa estasyon. Kunin ang physical tickets kung kailangan, bago sumakay." },
    { time: "07:30", text: "🚅 Limited Express Kegon, Asakusa → Tobu-Nikko. Pagdating sa Tobu-Nikko ng 09:20 (1h 50min na biyahe). Inirerekomenda ang Tobu World Heritage Pass (~¥4,160/tao ≈ 22,60€), kasama ang round trip sa Limited Express plus unlimited na bus sa Nikko sa loob ng 2 araw." },
    { time: "09:20", text: "Pagdating sa Tobu-Nikko Station. Kumuha ng brochure/mapa sa tourist center ng estasyon." },
    { time: "~09:40", text: "🚌 Bus patungo sa temple area. Hintuan mismo sa harap ng estasyon, patungong Chuzenji-onsen/Yumoto-onsen -- bumaba sa \"Shinkyo\" o \"Nishisando-iriguchi\". May alis tuwing 15-30 min buong umaga." },
    { time: "10:00–13:00", text: "🏯 Toshogu Shrine at paligid nito. Shinkyo Bridge (ang kilalang pulang tulay sa Ilog Daiya, simbolo ng Nikko). Toshogu complex: ang mayamang dekorasyon na Yomeimon Gate, ang relief ng mga unggoy na 'walang nakita, walang narinig, walang sinabi', at ang mausoleum ni Tokugawa Ieyasu. Rinno-ji at Futarasan Jinja, ang dalawa pang templo sa World Heritage ensemble. Kombinadong entrance mga ¥2,100/tao." },
    { time: "13:00–13:45", text: "🍜 Lokal na tanghalian: subukan ang yuba (balat ng tofu), specialty ng Nikko sa loob ng mga siglo." },
    { time: "~13:55", text: "🚌 Bus patungo sa Lake Chuzenji, sa Irohazaka mountain road (matatarik na kurbada, magagandang tanawin). 40-50 min na biyahe." },
    { time: "14:40–16:30", text: "🏔️ Lake Chuzenji at Kegon Falls. Ang lawa, sa paanan ng Mount Nantai. Ang Kegon Falls, 97m ang taas, malinaw na makikita nang libre mula sa itaas na plataporma, o gamit ang elevator papunta sa mas mababang plataporma (entrance mga ¥570)." },
    { time: "~16:40", text: "🚌 Bus pabalik sa Tobu-Nikko. 40-50 min na biyahe." },
    { time: "17:44", text: "🚅 Limited Express Revaty Kegon, Tobu-Nikko → Asakusa. Pagdating sa Asakusa ng 19:35 (1h 51min na biyahe)." },
  ],
};

export const pendingDays = {
  es: [
    {
      id: "nikko",
      title: "Excursión a Nikko",
      cities: "Nikko",
      reason: "No se hizo por mal tiempo (estaba prevista el domingo 20 de septiembre de 2026, movida desde el sábado por falta de disponibilidad de trenes).",
      summary: "Día completo de naturaleza y templos a 2 horas de Tokio en tren directo desde Asakusa (literalmente al lado del hotel): el santuario Toshogu, mausoleo del shogun Tokugawa Ieyasu y Patrimonio de la Humanidad, el Puente Shinkyo, las cataratas Kegon y el lago Chuzenji por la carretera de montaña Irohazaka.",
      history: "Nikko se desarrolló en torno al santuario Toshogu, construido en 1617 como mausoleo de Tokugawa Ieyasu, fundador del shogunato que gobernó Japón durante más de 250 años. Su nieto Iemitsu lo amplió hasta convertirlo en el complejo profusamente decorado que se ve hoy, con más de 5 millones de hojas de pan de oro repartidas entre sus edificios.",
      schedule: nikkoSchedule.es,
      money: "Aprox. 40€ (comidas) + 11,40€ entradas Toshogu + 22,60€ Tobu World Heritage Pass (por persona)",
    },
  ],
  en: [
    {
      id: "nikko",
      title: "Nikko Day Trip",
      cities: "Nikko",
      reason: "Didn't happen due to bad weather (was planned for Sunday, September 20, 2026, moved from Saturday due to train availability).",
      summary: "A full day of nature and temples 2 hours from Tokyo by direct train from Asakusa (literally next to the hotel): Toshogu Shrine, mausoleum of shogun Tokugawa Ieyasu and World Heritage Site, Shinkyo Bridge, Kegon Falls and Lake Chuzenji via the Irohazaka mountain road.",
      history: "Nikko grew up around Toshogu Shrine, built in 1617 as the mausoleum of Tokugawa Ieyasu, founder of the shogunate that ruled Japan for over 250 years. His grandson Iemitsu expanded it into the lavishly decorated complex seen today, with over 5 million sheets of gold leaf spread across its buildings.",
      schedule: nikkoSchedule.en,
      money: "Approx. €40 (meals) + €11.40 Toshogu admission + €22.60 Tobu World Heritage Pass (per person)",
    },
  ],
  fr: [
    {
      id: "nikko",
      title: "Excursion à Nikko",
      cities: "Nikko",
      reason: "Non réalisée à cause du mauvais temps (prévue le dimanche 20 septembre 2026, déplacée du samedi faute de disponibilité des trains).",
      summary: "Une journée complète de nature et de temples à 2 heures de Tokyo en train direct depuis Asakusa (littéralement à côté de l'hôtel) : le sanctuaire Toshogu, mausolée du shogun Tokugawa Ieyasu et site du patrimoine mondial, le pont Shinkyo, les chutes de Kegon et le lac Chuzenji par la route de montagne Irohazaka.",
      history: "Nikko s'est développée autour du sanctuaire Toshogu, construit en 1617 comme mausolée de Tokugawa Ieyasu, fondateur du shogunat qui a gouverné le Japon pendant plus de 250 ans. Son petit-fils Iemitsu l'a agrandi jusqu'à en faire le complexe richement décoré que l'on voit aujourd'hui, avec plus de 5 millions de feuilles d'or réparties sur ses bâtiments.",
      schedule: nikkoSchedule.fr,
      money: "Env. 40 € (repas) + 11,40 € entrées Toshogu + 22,60 € Tobu World Heritage Pass (par personne)",
    },
  ],
  tl: [
    {
      id: "nikko",
      title: "Nikko Day Trip",
      cities: "Nikko",
      reason: "Hindi natuloy dahil sa masamang panahon (nakatakda sana noong Linggo, Setyembre 20, 2026, inilipat mula Sabado dahil sa kakulangan ng available na tren).",
      summary: "Buong araw ng kalikasan at mga templo, 2 oras mula Tokyo sa direktang tren mula Asakusa (literal na katabi ng hotel): ang Toshogu Shrine, mausoleum ng shogun na si Tokugawa Ieyasu at UNESCO World Heritage Site, ang Shinkyo Bridge, ang Kegon Falls at Lake Chuzenji sa Irohazaka mountain road.",
      history: "Umunlad ang Nikko sa paligid ng Toshogu Shrine, itinayo noong 1617 bilang mausoleum ni Tokugawa Ieyasu, ang tagapagtatag ng shogunate na namuno sa Japan nang mahigit 250 taon. Pinalawak ito ng apo niyang si Iemitsu hanggang maging ang mayamang dekorasyon na kumplex na nakikita ngayon, na may mahigit 5 milyong piraso ng gold leaf na nakakalat sa mga gusali nito.",
      schedule: nikkoSchedule.tl,
      money: "Humigit-kumulang €40 (pagkain) + €11,40 Toshogu admission + €22,60 Tobu World Heritage Pass (bawat tao)",
    },
  ],
};

export const pendingSectionLabel = {
  es: "Cosas pendientes",
  en: "Pending for next time",
  fr: "À faire une prochaine fois",
  tl: "Mga Pending para sa Susunod",
};

export const pendingSectionSubtitle = {
  es: "Días que se habían planeado pero no se hicieron en este viaje -- quedan aquí como referencia para un futuro viaje a Japón.",
  en: "Days that were planned but didn't happen on this trip -- kept here as a reference for a future trip to Japan.",
  fr: "Journées qui avaient été prévues mais qui n'ont pas eu lieu lors de ce voyage -- conservées ici comme référence pour un prochain voyage au Japon.",
  tl: "Mga araw na naplano pero hindi natuloy sa biyaheng ito -- nandito bilang reference para sa susunod na biyahe sa Japan.",
};
