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
      {
        place: "Fushimi Inari-taisha",
        desc: "El santuario sintoísta más importante dedicado a Inari (kami del arroz y los negocios), famoso por sus miles de toriis rojos.",
        day: 1,
      },
      {
        place: "Tōdai-ji",
        desc: "El centro del budismo en el Japón antiguo, con la estatua de Buda de bronce más grande del mundo bajo el techo de madera más grande del mundo.",
        day: 2,
      },
    ],
  },
  {
    id: "origenes",
    era: "14.000 a.C. – 300 d.C.",
    title: "Los orígenes: Jōmon y Yayoi",
    summary: "Cazadores-recolectores con la cerámica más antigua del mundo, y la llegada del arroz que lo cambió todo.",
    content: [
      {
        heading: "El periodo Jōmon",
        text: "La historia de Japón arranca, según la datación arqueológica estándar, hacia el 14.000 a.C., con una cultura de cazadores-recolectores semisedentarios conocida como Jōmon (縄文, 'marca de cuerda'), por la técnica con la que decoraban su cerámica presionando cuerdas trenzadas sobre la arcilla húmeda. Es, de hecho, una de las cerámicas más antiguas conocidas en el mundo. Vivían en poblados de cabañas semienterradas, pescaban, recolectaban castañas y marisco, y fabricaban unas figurillas de arcilla llamadas dogū, de función probablemente ritual, con formas a menudo bastante extrañas —algunas parecen llevar trajes espaciales, lo que ha alimentado teorías pseudocientíficas sin ningún fundamento arqueológico real—.",
      },
      {
        heading: "La revolución Yayoi",
        text: "Hacia el 300 a.C. (algunas dataciones lo adelantan al 1000 a.C.) llegó desde la península de Corea y el sur de China una nueva oleada de población, el pueblo Yayoi, que trajo consigo dos tecnologías que transformaron el archipiélago: el cultivo del arroz en campos inundados y la metalurgia del bronce y el hierro. El arroz exigía trabajo coordinado a gran escala —construir y mantener canales, sembrar y cosechar en comunidad— y eso aceleró la formación de jerarquías sociales, jefaturas y, con el tiempo, los primeros reinos. Casi todo lo que hoy asociamos con 'lo japonés' en términos de organización social y agrícola tiene su semilla en este cambio.",
      },
      {
        heading: "El mito fundacional",
        text: "La mitología sintoísta sitúa la fundación de la línea imperial en el año 660 a.C., cuando el emperador Jinmu, nieto de la diosa del sol Amaterasu, funda un reino en la región de Yamato (actual Nara). Es un relato mítico, no un hecho arqueológico verificable, pero es importante porque la casa imperial japonesa actual —la más antigua monárquicamente ininterrumpida del mundo, con el emperador Naruhito reinando desde 2019— reivindica descender directamente de esa línea legendaria.",
      },
    ],
    seeOnTrip: [],
  },

  {
    id: "nara-heian",
    era: "710 – 1185",
    title: "Nara y Heian: la corte clásica",
    summary: "Las primeras capitales permanentes, el nacimiento de la literatura japonesa y el refinamiento estético que veréis en Kioto.",
    content: [
      {
        heading: "Nara, la primera capital fija",
        text: "Hasta el siglo VIII, la capital japonesa se trasladaba con cada emperador, siguiendo la creencia sintoísta de que la muerte contaminaba un lugar. En 710 se rompió esa costumbre y se estableció una capital permanente en Nara (entonces llamada Heijō-kyō), inspirada directamente en el trazado urbanístico de la capital china Chang'an. Fue en Nara donde, en el año 752, se completó el templo Tōdai-ji con su gigantesco Buda de bronce, un proyecto estatal de una magnitud que casi arruinó la economía del país.",
      },
      {
        heading: "El traslado a Heian-kyō",
        text: "En 784 el emperador Kanmu trasladó la capital, primero brevemente a Nagaoka y, en 794, a Heian-kyō ('capital de la paz y la tranquilidad') — la ciudad que hoy conocemos como Kioto. Fue la capital imperial de Japón durante más de mil años, hasta 1868. El periodo Heian que da nombre a esta era (794-1185) es considerado la cumbre del refinamiento estético y literario de la corte clásica japonesa.",
      },
      {
        heading: "La cultura de la corte",
        text: "En este periodo se escribió, hacia el año 1000, el Genji Monogatari (La historia de Genji) de la dama de la corte Murasaki Shikibu, considerada por muchos la primera novela psicológica del mundo. Se desarrolló también el sistema de escritura kana, más simple que los caracteres chinos, que permitió a las mujeres de la corte —excluidas de la educación clásica en chino— escribir y publicar buena parte de la mejor literatura de la época. Es también el periodo en que se compuso la letra de Kimigayo, el actual himno nacional de Japón.",
      },
    ],
    seeOnTrip: [
      { id: "todai-ji", note: "El gran Buda y el templo que casi arruinó las arcas del Japón de Nara en el siglo VIII." },
      { id: "kiyomizu-dera", note: "Fundado en el año 778, antes incluso del traslado de la capital a Heian-kyō." },
      { id: "fushimi-inari", note: "Establecido en 711, antes de que Kioto fuera siquiera capital." },
    ],
  },

  {
    id: "kamakura-muromachi",
    era: "1185 – 1573",
    title: "La era de los samuráis",
    summary: "El poder pasa de la corte a los guerreros: shogunes, código bushido y dos siglos de guerra civil.",
    content: [
      {
        heading: "Las guerras Genpei y el primer shogunato",
        text: "En 1185, tras la derrota del clan Taira frente al clan Minamoto en las guerras Genpei, el samurái Minamoto no Yoritomo estableció el primer gobierno militar (bakufu) de la historia japonesa, con sede en la ciudad de Kamakura, muy lejos de la corte imperial de Kioto. A partir de aquí y hasta 1868, el patrón se repite con variaciones: el emperador conserva la legitimidad espiritual y ceremonial en Kioto, pero el poder político y militar real lo ejerce un shōgun en otro lugar. Es una situación con cierto paralelismo al del Sacro Emperador Romano-Germánico y el Papa en la Europa medieval: dos autoridades paralelas, una espiritual y otra temporal.",
      },
      {
        heading: "El bushidō y las invasiones mongolas",
        text: "Durante el periodo Kamakura se fue consolidando el bushidō, el código de conducta samurái basado en el honor, la lealtad y el desprecio a la muerte —aunque conviene saber que nunca existió como un texto único, oral o escrito, sino como una tradición de varios tratados posteriores que fueron sistematizando ideales previos—. Japón resistió dos intentos de invasión mongola, en 1274 y 1281; en la segunda, un tifón destruyó gran parte de la flota invasora, hecho que dio origen al término kamikaze ('viento divino'), reutilizado siglos después para los pilotos suicidas de la Segunda Guerra Mundial.",
      },
      {
        heading: "Muromachi: el Kioto de los pabellones dorado y plateado",
        text: "El periodo Muromachi (1336-1573) trasladó de nuevo el gobierno militar a Kioto, bajo el clan Ashikaga. Es la época en la que se construyeron el Kinkaku-ji (1397) y el Ginkaku-ji (1482), villas de retiro de dos shogunes de la misma familia —abuelo y nieto— que sentaron buena parte de la estética japonesa que hoy asociamos con lo 'clásico': la ceremonia del té formalizada, el jardín zen de rocas, el ikebana y la estética wabi-sabi.",
      },
      {
        heading: "El periodo Sengoku: cien años de guerra civil",
        text: "La Guerra Ōnin (1467-1477), desencadenada por una disputa de sucesión, arrasó gran parte de Kioto y sumió a Japón en el periodo Sengoku ('estados en guerra'), un siglo largo de fragmentación en el que decenas de señores feudales (daimyō) luchaban entre sí por el territorio. Es el escenario de buena parte del cine de samuráis de Kurosawa y de series como Shōgun.",
      },
    ],
    seeOnTrip: [
      { id: "kinkaku-ji", note: "Villa de retiro de Ashikaga Yoshimitsu (1397), reconstruida tras un incendio en 1955." },
      { id: "ginkaku-ji", note: "Construido en 1482 por su nieto Ashikaga Yoshimasa, mientras Kioto ardía en la Guerra Ōnin." },
      { id: "nakasendo", note: "La ruta y sus pueblos-posta se consolidarán como red de comunicaciones ya en el periodo Edo siguiente, pero el paso de montaña se usaba desde mucho antes." },
    ],
  },

  {
    id: "edo",
    era: "1603 – 1868",
    title: "El periodo Edo: paz, aislamiento y control",
    summary: "Dos siglos y medio de paz forzada bajo los Tokugawa, con Japón cerrado casi por completo al mundo exterior.",
    content: [
      {
        heading: "Tokugawa Ieyasu y la unificación",
        text: "Tras la muerte de Toyotomi Hideyoshi —quien había estado a punto de completar la unificación de Japón tras el Sengoku, y que en 1583 construyó el castillo de Osaka como símbolo de su poder— el samurái Tokugawa Ieyasu se impuso en la batalla de Sekigahara (1600) y se convirtió en shōgun en 1603, con capital en Edo (la actual Tokio). Su clan gobernaría Japón durante los siguientes 265 años.",
      },
      {
        heading: "El sistema sankin-kōtai",
        text: "El shogunato Tokugawa mantuvo la paz mediante un control férreo de los señores feudales. Uno de sus mecanismos más ingeniosos fue el sankin-kōtai: cada daimyō estaba obligado a residir en Edo un año de cada dos, dejando a su familia allí de forma permanente como rehenes. Esto generaba desfiles constantes de comitivas de cientos o miles de personas entre las provincias y la capital, y arruinaba económicamente a los señores feudales —que era exactamente la intención—. Para ese tráfico se establecieron cinco carreteras oficiales (Gokaidō), entre ellas el Nakasendō, con sus pueblos-posta donde las comitivas paraban a descansar.",
      },
      {
        heading: "Sakoku: el cierre del país",
        text: "A partir de la década de 1630, y en parte por temor a la influencia política del cristianismo tras la revuelta de Shimabara, el shogunato instauró el sakoku ('país cerrado'): prohibió a los japoneses salir del país y a los extranjeros entrar, con la única excepción de un puesto comercial holandés muy restringido en la isla artificial de Dejima, en Nagasaki. Japón permaneció así, prácticamente aislado del mundo, durante más de dos siglos.",
      },
      {
        heading: "Paz, cultura urbana y aislamiento de las montañas",
        text: "Paradójicamente, ese aislamiento y esa paz forzada por el control Tokugawa permitieron un enorme florecimiento cultural: el teatro kabuki, el grabado ukiyo-e (con Hokusai y sus Treinta y seis vistas del monte Fuji como máximo exponente), la consolidación de Edo como una de las ciudades más pobladas del mundo. En las zonas de montaña más remotas, como el valle de Shirakawa-go o la región de Takayama, el aislamiento geográfico —más que el político— dio lugar a formas de construcción y organización social propias, con muy poca influencia exterior hasta bien entrado el siglo XX.",
      },
    ],
    seeOnTrip: [
      { id: "nakasendo", note: "La red de carreteras que sostenía el sistema sankin-kōtai; Tsumago fue el primer pueblo de Japón en restaurar sistemáticamente su aspecto de este periodo, en 1968." },
      { id: "takayama", note: "Bajo administración directa del shogunato desde 1692 por el valor de sus bosques madereros." },
      { id: "shirakawa-go", note: "El aislamiento del valle, más geográfico que político, conservó las casas gasshō-zukuri prácticamente intactas." },
      { id: "osaka", note: "El castillo, construido por Hideyoshi en 1583, fue destruido por Tokugawa Ieyasu en 1615, precisamente para acabar con el clan rival." },
    ],
  },

  {
    id: "meiji",
    era: "1868 – 1912",
    title: "La Restauración Meiji: la modernización exprés",
    summary: "En 45 años, Japón pasa de shogunato feudal cerrado a potencia industrial y militar reconocida mundialmente.",
    content: [
      {
        heading: "El fin del shogunato",
        text: "En 1853 el comodoro estadounidense Matthew Perry llegó a la bahía de Edo con buques de guerra ('los barcos negros') y forzó la apertura comercial de Japón. La crisis que siguió —entre quienes querían mantener el aislamiento y quienes veían inevitable modernizarse— desembocó en la caída del shogunato Tokugawa y la restauración, en 1868, del poder efectivo del emperador, entonces el joven Meiji.",
      },
      {
        heading: "Una transformación sin precedentes",
        text: "Lo que siguió fue una de las modernizaciones más rápidas de la historia. En apenas 45 años, Japón abolió la clase samurái y sus privilegios feudales, creó un ejército y una armada modernos según modelos occidentales, promulgó una constitución (1889), estableció educación pública obligatoria, construyó ferrocarriles y una industria pesada, y adoptó el calendario gregoriano y una moneda nacional, el yen. Edo pasó a llamarse Tokio ('capital del este') y se convirtió en la nueva capital imperial.",
      },
      {
        heading: "De potencia regional a imperio",
        text: "La transformación no fue solo interna: Japón ganó guerras contra China (1894-95) y contra Rusia (1904-05) —esta última, la primera vez en la era moderna que una potencia asiática derrotaba a una europea—, y empezó a expandirse territorialmente, anexionándose Taiwán y, más tarde, Corea. El periodo Meiji sentó, para bien y para mal, las bases del Japón del siglo XX: tanto el país industrializado y tecnológico que hoy visitáis como el imperio militarista que llevaría a la Segunda Guerra Mundial.",
      },
    ],
    seeOnTrip: [
      { id: "meiji-jingu", note: "Santuario dedicado a este emperador, construido en 1920 con un bosque de 100.000 árboles plantado a mano." },
      { id: "osaka", note: "La torre actual del castillo, de hormigón armado, es de 1931 — ya plenamente de la era moderna que arrancó con Meiji." },
    ],
  },

  {
    id: "guerra-posguerra",
    era: "1926 – 1989",
    title: "Guerra, derrota y milagro económico",
    summary: "De la Segunda Guerra Mundial a la reconstrucción, y de ahí a convertirse en la segunda economía del mundo.",
    content: [
      {
        heading: "El camino a la guerra",
        text: "Tras la muerte del emperador Taishō en 1926 comenzó el periodo Shōwa, bajo el emperador Hirohito. Las décadas de 1920 y 1930 vieron el ascenso del militarismo japonés, la invasión de Manchuria (1931) y de China (1937), y finalmente la entrada en la Segunda Guerra Mundial con el ataque a Pearl Harbor en diciembre de 1941.",
      },
      {
        heading: "La destrucción de las ciudades",
        text: "Los bombardeos aliados devastaron las principales ciudades japonesas. El de Tokio del 10 de marzo de 1945 fue, en número de muertos en una sola noche —unos 100.000—, el ataque aéreo más letal de la historia, más que Hiroshima o Nagasaki individualmente. Asakusa y su templo Senso-ji, uno de los barrios más antiguos de la ciudad, quedaron completamente arrasados; lo que hoy se visita es una reconstrucción de 1958. En agosto de 1945, las bombas atómicas sobre Hiroshima y Nagasaki precipitaron la rendición japonesa, anunciada por el emperador el 15 de agosto — la primera vez que la población japonesa escuchaba su voz.",
      },
      {
        heading: "La ocupación aliada",
        text: "Entre 1945 y 1952, Japón estuvo bajo ocupación militar estadounidense, dirigida por el general Douglas MacArthur. Se redactó una nueva constitución pacifista (que sigue vigente), se desmanteló el aparato militar y se sentaron las bases legales y económicas del Japón democrático de posguerra. Kioto, por cierto, se salvó deliberadamente de los grandes bombardeos —a diferencia de Tokio, Osaka o Nagoya— precisamente por su valor histórico y cultural, lo que explica por qué conserva tanto patrimonio anterior al siglo XX.",
      },
      {
        heading: "El milagro económico",
        text: "Entre los años 50 y los 80, Japón protagonizó uno de los crecimientos económicos más rápidos de la historia, pasando de un país arrasado a la segunda economía mundial. Barrios como Akihabara, que en el mercado negro de la posguerra vendía componentes de radio recuperados de los escombros, se convirtieron en el escaparate de esa nueva pujanza tecnológica: aquí se compraron los primeros televisores, neveras y lavadoras del boom japonés.",
      },
    ],
    seeOnTrip: [
      { id: "senso-ji", note: "Arrasado en el bombardeo de 1945; el edificio actual es una reconstrucción de 1958, en hormigón para que no vuelva a arder." },
      { id: "akihabara", note: "Nació literalmente de las ruinas de la posguerra, como mercado negro de componentes electrónicos." },
      { id: "todai-ji", note: "Nara, como Kioto, quedó al margen de los grandes bombardeos por su valor patrimonial." },
    ],
  },

  {
    id: "japon-hoy",
    era: "1989 – hoy",
    title: "Heisei, Reiwa y el Japón contemporáneo",
    summary: "De la burbuja económica a la cultura pop global que ha hecho de Japón un imán turístico y cultural.",
    content: [
      {
        heading: "El estallido de la burbuja",
        text: "El periodo Heisei (1989-2019) comenzó con el estallido de una enorme burbuja especulativa inmobiliaria y bursátil, que dio paso a la llamada 'década perdida' de estancamiento económico en los años 90. A pesar de ello, fue también la época en la que la cultura pop japonesa —el manga, el anime, los videojuegos— se convirtió en un fenómeno de exportación cultural masiva a nivel mundial, con Akihabara como epicentro físico de ese universo.",
      },
      {
        heading: "Del samurái al robot: la imagen exterior de Japón",
        text: "El Japón que hoy fascina a viajeros de todo el mundo combina de forma muy visible ambas caras de su historia: templos y jardines de más de mil años conviviendo con los neones de Shibuya o Akihabara. No es casualidad que estudios de videojuegos y animación hayan bebido tan directamente de ese patrimonio histórico real para construir sus propios mundos de ficción — desde el Kinkaku-ji reconvertido en la Torre Campana de Pokémon hasta el cruce de Shibuya inmortalizado en Digimon y en decenas de películas.",
      },
      {
        heading: "La era Reiwa",
        text: "En abril de 2019 el emperador Akihito abdicó — algo que no ocurría desde hacía dos siglos— y su hijo Naruhito se convirtió en emperador, inaugurando la era Reiwa ('bella armonía'), la que vivís durante este viaje.",
      },
    ],
    seeOnTrip: [
      { id: "akihabara", note: "El epicentro físico de la explosión cultural del manga, el anime y los videojuegos japoneses." },
      { id: "shibuya", note: "El símbolo visual más reproducido del Japón urbano contemporáneo en cine y series de todo el mundo." },
      { id: "teamlab", note: "El arte digital japonés más reciente, heredero directo de siglos de estética visual propia." },
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
      title: "Japón a fondo",
      show: "Japonismo",
      url: "https://podcasts.apple.com/es/podcast/jap%C3%B3n-a-fondo/id1545542012",
      note: "El podcast en español por excelencia sobre Japón. Creado por los autores de Japonismo, cubre en detalle muchísimos destinos turísticos, historia, cultura y actualidad. Imprescindible.",
    },
    {
      title: "\"213. Japón, de los orígenes al imperialismo\"",
      show: "No es el fin del mundo",
      url: "https://podcasts.apple.com/es/podcast/213-jap%C3%B3n-de-los-or%C3%ADgenes-al-imperialismo/id1687260829?i=1000721920418",
      note: "Episodio de dos horas que recorre toda la historia japonesa, de los orígenes míticos a la Restauración Meiji. Buen punto de partida de conjunto antes del viaje.",
    },
    {
      title: "\"Episodio 74: Shogunato Tokugawa, el reinado de los samurái\"",
      show: "Cum Lingus Communicamus",
      url: "https://podcasts.apple.com/es/podcast/episodio-74-shogunato-tokugawa-el-reinado-de-los-samur%C3%A1i/id1872183992?i=1000746759090",
      note: "Centrado justo en el periodo Edo, con bibliografía citada al final del episodio (incluye a Mikiso Hane y Jonathan López-Vera).",
    },
    {
      title: "Nippon.com en español",
      show: "Nippon.com",
      url: "https://podcasts.apple.com/es/podcast/nippon-com-en-espa%C3%B1ol/id1761501245",
      note: "Podcast semanal en español con actualidad, historia y cultura japonesa contadas por especialistas — bueno para escuchar episodios sueltos según el tema que más os llame.",
    },
    {
      title: "\"Samurais\"",
      show: "Pasajes de la Historia",
      url: "https://podcasts.apple.com/es/podcast/samur%C3%A1is/id1740368587?i=1000660283378",
      note: "Un repaso clásico de radio a la clase samurái, desde el periodo Sengoku hasta su desaparición en la Restauración Meiji.",
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
