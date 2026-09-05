// Historia de Japón — contenido extenso organizado por periodos, con
// referencias cruzadas a los lugares concretos del itinerario.
//
// Fuentes de referencia usadas para verificar cronología y datos:
// Mikiso Hane, "Breve historia de Japón" (Alianza); Pérez Riobó / San
// Emeterio, "Japón en su historia" (Satori); Jonathan López-Vera,
// "Historia de los samuráis" (Alianza) y su blog historiasamurai.com;
// cronologías de periodos japoneses de uso académico estándar.

export const historyPeriods = [
  {
    id: "religion",
    era: "Desde los orígenes hasta hoy",
    title: "Creencias: Sintoísmo y Budismo",
    summary: "El alma de Japón: la convivencia pacífica y el sincretismo entre los kami autóctonos y el budismo continental.",
    content: [
      {
        heading: "Sintoísmo (Shintō)",
        text: "El Sintoísmo ('El camino de los dioses') es la religión autóctona de Japón. No tiene fundador, ni textos sagrados absolutos, ni dogmas estrictos. Se basa en la veneración de los 'kami', espíritus o deidades que habitan en la naturaleza (montañas, árboles milenarios, cascadas) y en conceptos abstractos o antepasados célebres. Se centra en la pureza ritual y la celebración de la vida. Los santuarios sintoístas se reconocen por sus puertas 'torii' (frecuentemente rojas), que marcan el paso de lo profano a lo sagrado. Durante el viaje, veréis este misticismo natural en lugares como el santuario Fushimi Inari o en los gigantescos árboles de los Alpes Japoneses.",
      },
      {
        heading: "Budismo (Bukkyō)",
        text: "El Budismo llegó a Japón en el siglo VI d.C. desde Corea y China. A diferencia del sintoísmo, trajo consigo una compleja doctrina filosófica sobre el sufrimiento, la reencarnación y la salvación, así como un arte y una arquitectura monumentales. Se instaló fuertemente en las clases gobernantes y transformó la cultura del país. Sus lugares de culto son los templos (tera / ji), que suelen tener pagodas, estatuas de Buda y enormes campanas. El Tōdai-ji en Nara y el Sanjūsangen-dō en Kioto son ejemplos impresionantes de su poderío.",
      },
      {
        heading: "Sincretismo: 'Nacer sintoísta, morir budista'",
        text: "En lugar de enfrentarse, ambas religiones se fusionaron (Shinbutsu-shūgō). Los kami pasaron a considerarse manifestaciones locales de los budas. Hoy en día, la mayoría de los japoneses practican ambas religiones según la ocasión: las celebraciones de la vida (nacimientos, bodas, festivales locales o Matsuri) se hacen por el rito sintoísta, mientras que los funerales y el culto a los antepasados se rigen por el rito budista. Esta coexistencia pacífica y pragmática es fundamental para entender la mentalidad japonesa moderna.",
      },
    ],
    seeOnTrip: [
      { id: "fushimi-inari", note: "El santuario sintoísta más importante dedicado a Inari (kami del arroz y los negocios), famoso por sus miles de toriis rojos (Día 2)." },
      { id: "todai-ji", note: "El centro del budismo en el Japón antiguo, con la estatua de Buda de bronce más grande del mundo bajo el techo de madera más grande del mundo (Día 2)." },
      { id: "senso-ji", note: "El templo budista más antiguo e importante de Tokio en Asakusa (Día 10)." },
    ],
  },
  {
    id: "origenes",
    era: "14.000 a.C. – 538 d.C.",
    title: "Prehistoria y Antigüedad: Jōmon, Yayoi y Kofun",
    image: "/images/history/jomon-dogu.jpg",
    imageCaption: "Estatuilla ritual 'dogū' de arcilla del periodo Jōmon (Museo Nacional de Tokio).",
    summary: "Cazadores-recolectores con la cerámica más antigua, la llegada del arroz y los gigantescos túmulos funerarios.",
    content: [
      {
        heading: "El periodo Jōmon (14.000 a.C. – 300 a.C.)",
        text: "La historia de Japón arranca con una cultura de cazadores-recolectores semisedentarios conocida como Jōmon (縄文, 'marca de cuerda'), por la técnica con la que decoraban su cerámica presionando cuerdas trenzadas sobre la arcilla húmeda. Es una de las cerámicas más antiguas conocidas en el mundo. Fabricaban unas fascinantes figurillas de arcilla llamadas 'dogū', de función ritual.",
      },
      {
        heading: "La revolución Yayoi (300 a.C. – 300 d.C.)",
        text: "Llegó desde la península de Corea una nueva oleada de población, el pueblo Yayoi, que trajo consigo dos tecnologías que transformaron el archipiélago: el cultivo del arroz en campos inundados y la metalurgia del bronce y el hierro. El arroz exigía trabajo coordinado a gran escala, lo que aceleró la formación de jerarquías sociales y los primeros reinos.",
      },
      {
        heading: "El periodo Kofun (300 d.C. – 538 d.C.)",
        text: "Llamado así por los 'kofun', enormes túmulos funerarios de tierra (a menudo en forma de ojo de cerradura) construidos para los líderes de los clanes. Es la época en la que el clan Yamato consolida su poder sobre gran parte del centro de Japón, estableciendo la línea imperial de la que desciende la actual monarquía nipona. Para proteger estas tumbas se colocaban figuras cilíndricas de arcilla llamadas 'haniwa'.",
      },
    ],
    seeOnTrip: [],
  },
  {
    id: "asuka",
    era: "538 – 710",
    title: "Periodo Asuka: La llegada del budismo",
    summary: "El budismo transforma Japón, se adopta la escritura china y nace la primera constitución nipona.",
    content: [
      {
        heading: "La introducción del budismo",
        text: "En el año 538 d.C., un rey coreano envió al emperador de Japón una estatua de Buda y unos sutras (textos sagrados), marcando la introducción oficial del budismo. Esto desató un conflicto entre el clan Soga (pro-budista) y los clanes Mononobe y Nakatomi (defensores de los ritos nativos, futuros sintoístas). Los Soga triunfaron y el budismo se convirtió en religión de Estado, trayendo consigo la arquitectura, el arte y la cultura continental (china y coreana).",
      },
      {
        heading: "El Príncipe Shōtoku",
        text: "El gran impulsor de esta época fue el Príncipe Shōtoku, un erudito que redactó en el año 604 la 'Constitución de los Diecisiete Artículos', un código ético basado en principios confucianos y budistas que instaba a la armonía (wa). También fomentó el envío de misiones diplomáticas a China para importar directamente sus conocimientos.",
      },
      {
        heading: "Las Reformas Taika",
        text: "En el 645, tras un golpe de Estado contra los Soga, se iniciaron las Reformas Taika. Basadas en el modelo imperial chino, centralizaron el poder: toda la tierra pasó a ser teóricamente propiedad del emperador, quien la redistribuía a los campesinos a cambio de impuestos. Japón empezaba a organizarse como un estado unificado bajo leyes escritas (Ritsuryō).",
      },
    ],
    seeOnTrip: [],
  },
  {
    id: "nara",
    era: "710 – 794",
    title: "Periodo Nara: La primera capital fija",
    image: "/images/history/nara-daibutsu.jpg",
    imageCaption: "El Gran Buda Daibutsu de bronce en el templo Tōdai-ji de Nara, consagrado en el año 752.",
    summary: "Se construye la primera gran capital imperial inspirada en China y el monumental budismo de Estado.",
    content: [
      {
        heading: "Heijō-kyō (Nara)",
        text: "Hasta este periodo, la capital se trasladaba con cada nuevo emperador (ya que la muerte se consideraba impura en el sintoísmo). En el 710, se fundó Heijō-kyō (la actual Nara) como primera capital permanente, diseñada como una cuadrícula siguiendo el modelo de la capital china de la dinastía Tang, Chang'an. Durante estas décadas se compilaron los primeros libros históricos de Japón (Kojiki y Nihon Shoki) para legitimar el origen divino del emperador.",
      },
      {
        heading: "El esplendor del budismo y el Tōdai-ji",
        text: "La corte de Nara abrazó el budismo con fervor para proteger el estado. En el año 752 se inauguró el inmenso templo Tōdai-ji y su colosal Buda de bronce (Daibutsu) de 15 metros, encargado por el emperador Shōmu. El proyecto consumió tantas reservas de bronce y oro del país que casi arruinó la economía, pero demostró el abrumador poder central.",
      },
    ],
    seeOnTrip: [
      { id: "todai-ji", note: "El Templo del Gran Buda es el corazón de este periodo histórico; pasearéis por el mismo recinto inaugurado en el siglo VIII." },
      { id: "nara-park", note: "Los ciervos de Nara, considerados mensajeros divinos del santuario Kasuga Taisha, llevan allí desde esta época (Día 2)." },
    ],
  },
  {
    id: "heian",
    era: "794 – 1185",
    title: "Periodo Heian: La corte clásica de Kioto",
    image: "/images/history/heian-genji.jpg",
    imageCaption: "Ilustración clásica del 'Genji Monogatari' (La historia de Genji), obra maestra de la literatura cortesana de Heian.",
    summary: "Casi 400 años de paz y extraordinario refinamiento estético cortesano en la nueva capital, Kioto.",
    content: [
      {
        heading: "El traslado a Heian-kyō",
        text: "Para escapar de la creciente e invasiva influencia política de los monasterios budistas de Nara, el emperador Kanmu trasladó la capital en el 794 a Heian-kyō ('Capital de la Paz y la Tranquilidad'), hoy Kioto. Sería la residencia del emperador durante más de mil años.",
      },
      {
        heading: "El refinamiento de la corte y el clan Fujiwara",
        text: "Aunque el emperador reinaba, quien realmente gobernaba desde las sombras era el poderoso clan Fujiwara, que casaba a sus hijas con los emperadores. La aristocracia Heian vivía en una burbuja de extremo refinamiento: dedicaban su vida a la poesía, la caligrafía, la apreciación de la naturaleza y los amoríos cortesanos, desarrollando un sentido de la melancolía por lo efímero conocido como 'mono no aware'.",
      },
      {
        heading: "El nacimiento de la literatura japonesa",
        text: "La invención del silabario fonético 'kana' permitió escribir en japonés fluido (hasta entonces se usaba chino clásico). Fueron las damas de la corte, aisladas tras los biombos pero altamente cultivadas, quienes crearon las grandes obras literarias: Sei Shōnagon escribió 'El libro de la almohada' (observaciones de la corte), y Murasaki Shikibu completó hacia el año 1000 'La historia de Genji' (Genji Monogatari), considerada la primera novela psicológica de la historia humana.",
      },
    ],
    seeOnTrip: [
      { id: "kiyomizu-dera", note: "Aunque de orígenes anteriores, su fama creció durante este periodo clásico (Día 3)." },
      { id: "fushimi-inari", note: "La veneración de la corte en Heian hizo prosperar enormemente los santuarios de la zona (Día 2)." },
    ],
  },
  {
    id: "kamakura-muromachi",
    era: "1185 – 1573",
    title: "Kamakura y Muromachi: La era samurái",
    image: "/images/history/muromachi-kinkakuji.jpg",
    imageCaption: "El Pabellón Dorado (Kinkaku-ji) en Kioto, emblema de la cultura artística y zen del shogunato Ashikaga (periodo Muromachi).",
    summary: "El poder pasa de la corte a los guerreros: shogunes, código bushido y dos siglos de inestabilidad.",
    content: [
      {
        heading: "El primer shogunato (Kamakura)",
        text: "Mientras los nobles de Kioto escribían poesía, en las provincias ganaban poder los clanes guerreros (samuráis). En 1185, tras las brutales Guerras Genpei, Minamoto no Yoritomo estableció un gobierno militar (bakufu) en Kamakura. Yoritomo fue nombrado Shōgun. El emperador se quedó en Kioto como figura ceremonial, pero el poder real lo tenían los militares.",
      },
      {
        heading: "Invasiones mongolas y 'Kamikaze'",
        text: "A finales del siglo XIII, el Imperio Mongol de Kublai Kan intentó invadir Japón dos veces (1274 y 1281). En ambas ocasiones, enormes tifones destruyeron las flotas invasoras, lo que los japoneses llamaron 'kamikaze' (viento divino). Aunque salvaron a Japón, las defensas arruinaron económicamente al shogunato Kamakura, lo que provocó su caída.",
      },
      {
        heading: "Periodo Muromachi y Cultura Higashiyama",
        text: "El clan Ashikaga trasladó el shogunato de vuelta a Kioto (distrito de Muromachi) en 1336. Aunque políticamente fue una era inestable, culturalmente fue brillante. Shogunes como Ashikaga Yoshimasa impulsaron la Cultura Higashiyama: de esta época nacen los jardines zen de rocas (karesansui), la ceremonia del té, el teatro Nō y la estética de la imperfección (wabi-sabi), simbolizados en el Kinkaku-ji (Pabellón de Oro) y el Ginkaku-ji (Pabellón de Plata).",
      },
      {
        heading: "Sengoku Jidai: Los estados en guerra",
        text: "En 1467 estalló la Guerra Ōnin por la sucesión del shogunato, arrasando Kioto. El poder central colapsó y Japón entró en el Sengoku Jidai, más de cien años de guerras civiles donde los señores feudales (daimyō) luchaban sangrientamente por el control del territorio.",
      },
    ],
    seeOnTrip: [
      { id: "kinkaku-ji", note: "El famoso Pabellón de Oro, villa de retiro del shōgun Ashikaga Yoshimitsu (Día 3)." },
      { id: "ginkaku-ji", note: "El Pabellón de Plata, cumbre de la estética zen de este periodo (Día 3)." },
    ],
  },
  {
    id: "azuchi-momoyama",
    era: "1573 – 1603",
    title: "Azuchi-Momoyama: Los grandes unificadores",
    image: "/images/history/azuchi-himeji.jpg",
    imageCaption: "Torre principal del Castillo de Himeji, cumbre de la arquitectura señorial y defensiva del periodo Azuchi-Momoyama.",
    summary: "Tres caudillos militares logran unificar Japón mediante la guerra, introduciendo los grandes castillos.",
    content: [
      {
        heading: "Oda Nobunaga",
        text: "El proceso de unificación del país tras un siglo de guerras fue liderado por tres figuras sucesivas. El primero fue Oda Nobunaga, un daimyō brillante e implacable que, utilizando por primera vez arcabuces de fuego comprados a los portugueses, aplastó a sus rivales y a los monjes guerreros. Fue traicionado por uno de sus generales y forzado a suicidarse en Kioto en 1582.",
      },
      {
        heading: "Toyotomi Hideyoshi",
        text: "El general Toyotomi Hideyoshi vengó a Nobunaga y completó la unificación. Nacido campesino, ascendió a líder absoluto, mandó construir el imponente Castillo de Osaka y prohibió que nadie excepto los samuráis portara armas, cerrando la movilidad social. En su megalomanía, intentó invadir Corea sin éxito.",
      },
      {
        heading: "La era de los Castillos",
        text: "Este corto periodo dio lugar a la construcción de los grandes castillos defensivos de múltiples pisos (como Himeji o Matsumoto), no solo como fortalezas, sino como formidables símbolos de poder de los daimyō locales, finamente decorados con biombos dorados en sus interiores.",
      },
    ],
    seeOnTrip: [
      { id: "osaka", note: "El Castillo de Osaka fue originalmente construido por Hideyoshi en 1583 como base de su inmenso poder (Día 5)." },
    ],
  },
  {
    id: "edo",
    era: "1603 – 1868",
    title: "Periodo Edo: Paz forzada y aislamiento",
    image: "/images/history/edo-kanagawa.jpg",
    imageCaption: "'Bajo la ola en Kanagawa' de Katsushika Hokusai (c. 1831), cumbre del ukiyo-e y la cultura urbana de la era Edo.",
    summary: "265 años de paz interna estricta bajo los Tokugawa y cierre casi total del país al mundo exterior.",
    content: [
      {
        heading: "Tokugawa Ieyasu y el sistema feudal",
        text: "Tras la batalla de Sekigahara (1600), Tokugawa Ieyasu se erigió como vencedor absoluto y fundó el shogunato Tokugawa en Edo (actual Tokio). Para evitar rebeliones, impuso un estricto sistema de clases (samuráis, campesinos, artesanos y mercaderes) y el 'sankin-kōtai', una ley que obligaba a los señores feudales a vivir en Edo años alternos, dejando a sus familias como rehenes permanentes.",
      },
      {
        heading: "Sakoku: El país cerrado",
        text: "Para eliminar la influencia cristiana y extranjera que veían como amenaza, los Tokugawa decretaron el Sakoku en 1639. Se expulsó a los extranjeros y se prohibió salir a los japoneses bajo pena de muerte. Solo se permitió comercio controlado con holandeses y chinos en el puerto de Nagasaki.",
      },
      {
        heading: "El mundo flotante y las rutas postales",
        text: "Esta larga paz propició un florecimiento de la cultura urbana popular (el 'Ukiyo' o mundo flotante): floreció el teatro Kabuki, los grabados Ukiyo-e (como los de Hokusai), y nacieron las casas de geishas. El tráfico generado por el 'sankin-kōtai' impulsó redes de carreteras como la ruta Nakasendō, jalonada de pueblos-posta (juku) para alojar a los viajeros.",
      },
    ],
    seeOnTrip: [
      { id: "nakasendo", note: "Recorreréis a pie un tramo original empedrado de la ruta Nakasendō, entre las antiguas postas de Magome y Tsumago, que conservan su aspecto de la era Edo (Día 8)." },
      { id: "takayama", note: "El barrio de Sanmachi Suji en Takayama mantiene intactas las casas de mercaderes del periodo Edo (Día 7)." },
      { id: "shirakawa-go", note: "Sus aldeas de montaña vivieron este periodo casi aisladas, desarrollando las famosas casas con tejado de paja 'gasshō-zukuri' (Día 7)." },
    ],
  },
  {
    id: "meiji",
    era: "1868 – 1912",
    title: "Restauración Meiji: La modernización exprés",
    image: "/images/history/meiji-yamagata.jpg",
    imageCaption: "'Vistas de la ciudad de Yamagata' por Takahashi Yuichi (1881-1882), reflejando la rápida occidentalización de la era Meiji.",
    summary: "En apenas 45 años, Japón salta del feudalismo a convertirse en una potencia mundial industrializada.",
    content: [
      {
        heading: "El fin del shogunato",
        text: "En 1853, los 'barcos negros' estadounidenses del Comodoro Perry obligaron a Japón a abrir sus puertos. La crisis provocó el colapso del shogunato Tokugawa. En 1868, el poder retornó nominalmente al emperador Meiji. Edo pasó a llamarse Tokio ('Capital del Este') y se convirtió en la nueva capital.",
      },
      {
        heading: "Occidentalización acelerada",
        text: "Japón entendió que, si no se modernizaba rápido, sería colonizado por Occidente. Se abolieron los privilegios samuráis (lo que provocó rebeliones fallidas, como la de Saigō Takamori), se instauró la educación obligatoria, el ejército conscripto, la industria pesada, el ferrocarril, la ropa occidental y una constitución al estilo prusiano.",
      },
      {
        heading: "El nacimiento de un Imperio",
        text: "La rápida industrialización requirió recursos que Japón no tenía, llevándolo al expansionismo. Japón sorprendió al mundo derrotando a China (1894-95) y, asombrosamente para las potencias occidentales, a Rusia (1904-05), consolidándose como el principal imperio de Asia y anexionándose Corea y Taiwán.",
      },
    ],
    seeOnTrip: [
      { id: "meiji-jingu", note: "El majestuoso santuario rodeado de bosque en pleno Tokio, dedicado a los espíritus del Emperador Meiji y su emperatriz (Día 9)." },
    ],
  },
  {
    id: "taisho",
    era: "1912 – 1926",
    title: "Periodo Taishō: Democracia y efervescencia cultural",
    image: "/images/history/taisho-tokio.jpg",
    imageCaption: "Calles comerciales de Tokio en la década de 1920: tranvías, automóviles y el cosmopolitismo de la Democracia Taishō.",
    summary: "Una era breve pero vibrante, caracterizada por la liberalización política y la mezcla cultural Oriente-Occidente.",
    content: [
      {
        heading: "La Democracia Taishō",
        text: "Bajo el reinado del enfermizo emperador Taishō, el poder político se desplazó de la reducida élite oligárquica hacia el parlamento y los partidos políticos democráticos. En 1925 se instauró el sufragio universal masculino (aunque se reprimió duramente a los comunistas y disidentes).",
      },
      {
        heading: "Modernidad urbana y el Gran Terremoto",
        text: "En las ciudades surgieron los 'Mobo' y 'Moga' (chicos y chicas modernos), que escuchaban jazz, bebían café y rompían con las tradiciones. Fue la edad de oro de la literatura moderna japonesa. Sin embargo, en 1923 el devastador Gran Terremoto de Kantō arrasó Tokio y Yokohama, dejando más de 100.000 muertos y forzando una reconstrucción masiva de la capital.",
      },
    ],
    seeOnTrip: [],
  },
  {
    id: "guerra-posguerra",
    era: "1926 – 1989",
    title: "Periodo Shōwa: Guerra, catástrofe y milagro",
    image: "/images/history/showa-shinkansen.jpg",
    imageCaption: "Inauguración de la línea Tokaido Shinkansen (1964), símbolo mundial del milagro económico japonés de posguerra.",
    summary: "Del militarismo y la Segunda Guerra Mundial, a las bombas atómicas y el espectacular renacer económico.",
    content: [
      {
        heading: "Militarismo y Segunda Guerra Mundial",
        text: "Con el emperador Hirohito (Shōwa), los militares tomaron el control de Japón, invadiendo Manchuria y China en los años 30. En 1941 atacaron Pearl Harbor, iniciando la guerra en el Pacífico. Tras feroces batallas e inmensos sufrimientos civiles, Japón fue sometido a terribles bombardeos incendiarios (Tokio quedó reducida a cenizas).",
      },
      {
        heading: "Las bombas atómicas y la rendición",
        text: "En agosto de 1945, Estados Unidos lanzó bombas atómicas sobre Hiroshima y Nagasaki. Días después, Japón se rindió incondicionalmente. El país fue ocupado por tropas estadounidenses (lideradas por MacArthur) hasta 1952. Se promulgó una constitución pacifista que renuncia a la guerra y redujo al emperador a un 'símbolo del Estado'.",
      },
      {
        heading: "El 'Milagro Económico Japonés'",
        text: "Desde las cenizas, gracias a la disciplina, la ayuda estadounidense y la Guerra de Corea, Japón experimentó un crecimiento económico asombroso en los años 60, 70 y 80. Liderando en electrónica y automoción (Sony, Toyota, Panasonic), se convirtió en la segunda potencia económica mundial. Los Juegos Olímpicos de Tokio 1964 y el lanzamiento del tren bala (Shinkansen) simbolizaron su regreso triunfal a la modernidad global.",
      },
    ],
    seeOnTrip: [
      { id: "akihabara", note: "El barrio nació tras la guerra como mercado negro de piezas de radio, sentando las bases de la capital tecnológica que es hoy (Día 10)." },
      { id: "senso-ji", note: "El gran templo de Tokio fue completamente destruido en los bombardeos de 1945 y reconstruido en posguerra (Día 10)." },
    ],
  },
  {
    id: "japon-hoy",
    era: "1989 – hoy",
    title: "Heisei, Reiwa y el Japón Contemporáneo",
    image: "/images/history/heisei-shibuya.jpg",
    imageCaption: "El cruce de Shibuya iluminado de noche, epicentro del Japón contemporáneo (eras Heisei y Reiwa).",
    summary: "De la 'década perdida' económica al florecimiento del poder blando (manga, anime y videojuegos).",
    content: [
      {
        heading: "Estallido de la burbuja y Periodo Heisei",
        text: "A principios de los 90, la colosal burbuja inmobiliaria y bursátil japonesa estalló, dando paso a varias 'décadas perdidas' de estancamiento económico y baja natalidad. Pese a ello, la calidad de vida y seguridad de Japón se mantuvieron altísimas. Se sucedieron desastres naturales marcantes, como el terremoto de Kobe (1995) y el triple desastre de Fukushima (2011).",
      },
      {
        heading: "Cool Japan: Potencia cultural global",
        text: "A pesar del bache económico, Japón conquistó el mundo con su 'soft power': el anime (Studio Ghibli), el manga, y los videojuegos (Nintendo, PlayStation) se convirtieron en fenómenos globales. La estética japonesa, su gastronomía y su mezcla única de hipertecnología y tradición arraigada han convertido al país en un imán turístico mundial.",
      },
      {
        heading: "La Era Reiwa (2019-presente)",
        text: "Con la abdicación de Akihito y el ascenso del emperador Naruhito en 2019, comenzó la era Reiwa ('Hermosa Armonía'). Es el Japón sofisticado, pop, hiperconectado y exquisitamente educado que vais a explorar durante este viaje.",
      },
    ],
    seeOnTrip: [
      { id: "shibuya", note: "El gigantesco cruce, la estatua de Hachiko y los neones: la imagen por antonomasia del Japón contemporáneo (Días 9 y 12)." },
      { id: "akihabara", note: "Epicentro de la subcultura otaku, el manga, el anime y los maid cafes (Día 10)." },
      { id: "teamlab", note: "El arte digital en 3D de teamLab Planets es un símbolo de la tecnología inmersiva del Tokio de hoy (Día 11)." },
    ],
  },
];

export const furtherReading = {
  books: [
    {
      title: "Breve historia de Japón",
      author: "Mikiso Hane",
      url: "https://telegra.ph/Breve-historia-de-Jap%C3%B3n-08-31-52",
      note: "El clásico para empezar: 416 páginas que cubren desde la prehistoria hasta finales del siglo XX de forma amena y completa. Es la referencia que citan casi todos los podcasts de historia en español sobre Japón.",
    },
    {
      title: "Japón en su historia",
      author: "Andrés Pérez Riobó y Gonzalo San Emeterio Cabañes",
      note: "Obra en español de dos doctores en Historia, con mapas, gráficos y una recomendación de lecturas adicionales al final de cada capítulo. Muy útil como libro de consulta antes o después de cada etapa del viaje.",
    },
    {
      title: "Historia de los samuráis",
      author: "Jonathan López-Vera",
      url: "https://telegra.ph/Historia-de-los-samur%C3%A1is-09-01-28",
      note: "El especialista en español de referencia sobre el periodo Kamakura-Edo y la clase guerrera. Su blog, historiasamurai.com, es también una fuente fiable y amena para profundizar en cualquier anécdota samurái del viaje.",
    },
    {
      title: "El libro del té",
      author: "Okakura Kakuzō",
      url: "https://telegra.ph/El-libro-del-t%C3%A9-08-29-11",
      note: "Un ensayo breve y clásico (1906) sobre la ceremonia del té, el budismo zen y la estética japonesa — perfecto para entender el trasfondo cultural del Ginkaku-ji y los jardines zen que vais a visitar.",
    },
    {
      title: "La historia de Genji",
      author: "Murasaki Shikibu",
      note: "Escrita hacia el año 1000 en la corte Heian de Kioto. Extensísima, pero incluso leer el primer capítulo da una idea directa de la sensibilidad estética de la era que dejó su huella en toda la ciudad.",
    },
  ],
  podcasts: [
    {
      title: "Excursión a Narita (mucho más que un aeropuerto)",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 1 · Llegada / Narita",
      dayNum: 1,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000744244376",
      note: "Narita esconde mucho más que un aeropuerto internacional: el impresionante complejo del templo Naritasan Shinsho-ji, su animada calle tradicional Omotesando y su histórica devoción por la anguila asada (unagi). Ideal para escuchar durante el vuelo o en el trayecto del Narita Express.",
    },
    {
      title: "Kioto: la capital cultural de Japón",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Días 1 y 2 · Kioto",
      dayNum: 1,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000510578269",
      note: "Guía completa para orientarse en la milenaria capital imperial: templos de madera Patrimonio de la Humanidad, santuarios sintoístas, jardines zen y la atmósfera única de sus barrios históricos. Perfecto para escuchar durante las 2 horas en el Shinkansen Nozomi rumbo a Kioto.",
    },
    {
      title: "El mundo de las geishas: mitos, historia y realidad",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 3 · Kioto (Gion y Tradición)",
      dayNum: 3,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000646351257",
      note: "Un episodio imprescindible para desmitificar la figura de las geishas (geiko y maiko en Kioto): su rigurosa formación artística, las casas de té (ochaya), la vestimenta tradicional y las normas de etiqueta para cruzarse con ellas con respeto en Gion y Pontocho.",
    },
    {
      title: "Osaka: gastronomía, ambiente y diversión",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 5 · Excursión a Osaka",
      dayNum: 5,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000516234185",
      note: "Todo sobre la personalidad única de la capital de Kansai: la cultura del 'kuidaore' (comer hasta arruinarse), takoyaki, okonomiyaki, las luces de neón del Glico Man en Dotonbori, la atmósfera retro de Shinsekai y el Castillo. Ideal para el trayecto en tren de 30 min desde Kioto.",
    },
    {
      title: "Kanazawa: samuráis, jardines y artesanía",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 6 · Hacia los Alpes: Kanazawa",
      dayNum: 6,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000557567847",
      note: "Episodio dedicado a Kanazawa, la joya del clan Maeda: el jardín Kenroku-en (uno de los tres grandes jardines de Japón), las residencias samurái de Nagamachi, las casas de té de Higashi Chaya y los talleres de pan de oro. Para escuchar en el tren Thunderbird.",
    },
    {
      title: "Takayama y Shirakawa-go: el corazón de los Alpes Japoneses",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 7 · Shirakawa-go y Takayama",
      dayNum: 7,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000527462410",
      note: "Inmersión en los Alpes Japoneses: la arquitectura única de tejados de paja gassho-zukuri en Shirakawa-go, las calles de madera de Sanmachi Suji en Takayama, la ternera de Hida y las destilerías de sake. Perfecto para los trayectos en autobús alpino Nohi Bus.",
    },
    {
      title: "Ruta Nakasendo: senderismo entre pueblos de postal (Magome y Tsumago)",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 8 · Valle de Kiso (Ruta Nakasendo)",
      dayNum: 8,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000655007075",
      note: "Guía completa para la caminata histórica entre Magome y Tsumago por el antiguo camino feudal de Nakasendo: historia de las postas del periodo Edo, campanas contra osos, naturaleza del Valle de Kiso y consejos prácticos para la ruta a pie de 8 km.",
    },
    {
      title: "Los mejores lugares para ver el Monte Fuji",
      show: "Japón a fondo · Japonismo",
      dayBadge: "Día 14 · Excursión Monte Fuji",
      dayNum: 14,
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012?i=1000740790906",
      note: "Consejos clave para avistar el cono sagrado del Fuji: mejores miradores (Chureito Pagoda, lago Kawaguchiko, Mishima Skywalk), cómo comprobar la visibilidad meteorológica y qué lado del Shinkansen elegir para verlo desde el tren bala.",
    },
    {
      title: "\"213. Japón, de los orígenes al imperialismo\"",
      show: "No es el fin del mundo",
      dayBadge: "Historia general",
      url: "https://podcasts.apple.com/es/podcast/213-jap%C3%B3n-de-los-or%C3%ADgenes-al-imperialismo/id1687260829?i=1000721920418",
      note: "Episodio de dos horas que recorre toda la historia japonesa, de los orígenes míticos a la Restauración Meiji. Buen punto de partida de conjunto antes del viaje.",
    },
    {
      title: "\"Episodio 74: Shogunato Tokugawa, el reinado de los samurái\"",
      show: "Cum Lingus Communicamus",
      dayBadge: "Historia general",
      url: "https://podcasts.apple.com/es/podcast/episodio-74-shogunato-tokugawa-el-reinado-de-los-samur%C3%A1i/id1872183992?i=1000746759090",
      note: "Centrado justo en el periodo Edo, con bibliografía citada al final del episodio (incluye a Mikiso Hane y Jonathan López-Vera).",
    },
    {
      title: "\"Samurais\"",
      show: "Pasajes de la Historia",
      dayBadge: "Historia general",
      url: "https://podcasts.apple.com/es/podcast/samur%C3%A1is/id1740368587?i=1000660283378",
      note: "Un repaso clásico de radio a la clase samurái, desde el periodo Sengoku hasta su desaparición en la Restauración Meiji.",
    },
    {
      title: "Nippon.com en español",
      show: "Nippon.com",
      dayBadge: "Actualidad y cultura",
      url: "https://podcasts.apple.com/es/podcast/nippon-com-en-espa%C3%B1ol/id1761501245",
      note: "Podcast semanal en español con actualidad, historia y cultura japonesa contadas por especialistas — bueno para escuchar episodios sueltos según el tema que más os llame.",
    },
    {
      title: "Japón a fondo (Podcast completo)",
      show: "Japonismo",
      dayBadge: "Podcast de referencia",
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012",
      note: "El podcast en español por excelencia sobre Japón. Creado por los autores de Japonismo, cubre en detalle muchísimos destinos turísticos, historia, cultura y actualidad. Imprescindible.",
    },
  ],
  documentaries: [
    {
      title: "El verdadero Japón que la mayoría nunca verá | Documental 4K",
      channel: "YouTube",
      url: "https://www.youtube.com/watch?v=b23vUM4MdFM",
      note: "Un documental visualmente espectacular que explora tanto las grandes urbes como el Japón más rural y tradicional.",
    },
    {
      title: "La HISTORIA COMPLETA de Japón en 30 Minutos",
      channel: "YouTube",
      url: "https://www.youtube.com/watch?v=L_WGl2dE3NA",
      note: "Un resumen excelente y dinámico para entender las distintas eras y el desarrollo histórico y social del país de forma rápida.",
    },
  ],
};
