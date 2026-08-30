// Guías detalladas de cada lugar del itinerario.
// Contenido opcional: se muestra sólo cuando el usuario pulsa "Saber más".
//
// Cada entrada tiene:
//   name       — nombre del lugar
//   jp         — nombre en japonés
//   founded    — fecha o periodo de fundación
//   tagline    — resumen de una línea
//   sections   — bloques de contenido { title, body }
//   curiosities— lista de datos curiosos
//   tip        — consejo práctico para la visita

export const guides = {
  // ══════════════════════════════════════════════════════════════════
  // KIOTO Y ALREDEDORES
  // ══════════════════════════════════════════════════════════════════

  "fushimi-inari": {
    name: "Fushimi Inari Taisha",
    jp: "伏見稲荷大社",
    founded: "Año 711",
    wiki: "Fushimi Inari-taisha",
    tagline: "El santuario de los diez mil torii rojos, dedicado al dios del arroz y la prosperidad.",
    sections: [
      {
        title: "Qué es exactamente",
        body: "Es el santuario principal (taisha) de los aproximadamente 30.000 santuarios dedicados a Inari que hay repartidos por todo Japón. Inari es la deidad sintoísta del arroz, la fertilidad, la agricultura y, por extensión moderna, la prosperidad de los negocios. No es un templo budista sino un santuario sintoísta: la diferencia se nota en la puerta de entrada (torii) y en que no hay estatuas de Buda.",
      },
      {
        title: "Historia",
        body: "Fue fundado en el año 711, antes incluso de que Kioto fuera capital, por el clan Hata, una familia de inmigrantes de origen coreano que dominaba las técnicas de cultivo del arroz y la sericultura. En 816 el monje Kūkai lo trasladó a su emplazamiento actual. Sobrevivió a la Guerra Ōnin (1467-1477), que arrasó gran parte de Kioto, aunque los edificios principales fueron reconstruidos en 1499. La estructura principal que se ve hoy data de ese año.",
      },
      {
        title: "Los torii y por qué son tantos",
        body: "El camino de torii (senbon torii, 'mil torii', aunque en realidad son más de 10.000) empezó a formarse en el periodo Edo. Cada torii es una donación de una persona o empresa que pide o agradece prosperidad. En la parte trasera de cada uno están grabados el nombre del donante y la fecha. Los precios van desde unos 400.000 ¥ por uno pequeño hasta más de un millón por los grandes. Cuando uno se pudre, se retira y se vende el espacio de nuevo, así que el túnel está en renovación constante.",
      },
      {
        title: "Los zorros",
        body: "Verás cientos de estatuas de zorros (kitsune) por todo el recinto. No son la deidad, sino sus mensajeros. Casi siempre llevan algo en la boca: una llave (la del granero de arroz), una gavilla de arroz, una joya o un pergamino. La creencia popular japonesa atribuye a los zorros la capacidad de transformarse y poseer a las personas, lo que les da un aura ambivalente entre lo protector y lo inquietante.",
      },
      {
        title: "La subida al monte Inari",
        body: "El recorrido completo sube hasta la cima del monte Inari (233 m) y son unas 2-3 horas ida y vuelta. La mayoría de los turistas se dan la vuelta en el mirador de Yotsutsuji (unos 30-45 minutos de subida), desde donde hay buenas vistas de Kioto. A partir de ahí el camino se vacía casi por completo y se llena de pequeños altares privados con velas.",
      },
    ],
    curiosities: [
      "Aparece en la película 'Memorias de una geisha' (2005), en la escena en la que la protagonista corre de niña entre los torii.",
      "Es gratuito y está abierto las 24 horas, todos los días del año — algo poco común en los grandes monumentos de Japón.",
      "El 'inari-zushi' (bolsita de tofu frito rellena de arroz) se llama así porque se cree que el tofu frito es la comida favorita de los zorros.",
    ],
    tip: "Llegar antes de las 8:00 o después de las 16:00 marca la diferencia entre hacer fotos del túnel vacío o de una fila de gente.",
  },

  "todai-ji": {
    name: "Todai-ji y el Gran Buda",
    jp: "東大寺",
    founded: "Año 752",
    wiki: "Tōdai-ji",
    tagline: "El edificio de madera más grande del mundo durante siglos, con un Buda de bronce de 15 metros.",
    sections: [
      {
        title: "Qué es",
        body: "Es el 'Gran Templo del Este', el templo principal de la escuela budista Kegon y, durante siglos, el centro de la red de templos provinciales de todo Japón. Su sala principal, el Daibutsuden, alberga el Daibutsu: una estatua de bronce de Buda Vairocana de casi 15 metros de altura y unas 500 toneladas.",
      },
      {
        title: "Por qué se construyó",
        body: "El emperador Shōmu ordenó su construcción en el año 743, en plena crisis: una epidemia de viruela había matado a un tercio de la población japonesa (incluidos los cuatro hermanos Fujiwara que dominaban la corte), había hambrunas y revueltas. El proyecto fue un acto de fe estatal para pacificar el país, y también una demostración de poder centralizado. Consumió tanto bronce que casi arruinó la economía del país, y la producción de cobre de Japón quedó agotada durante años.",
      },
      {
        title: "Destruido y reconstruido dos veces",
        body: "Esto es importante: lo que verás no es el edificio original. El Daibutsuden fue quemado en 1180 durante la guerra Genpei y reconstruido; volvió a arder en 1567 durante las guerras civiles del periodo Sengoku, y la cabeza del Buda se derritió. La estatua estuvo casi 100 años a la intemperie. El edificio actual es de 1709 y, aunque sigue siendo enorme, es un 30% más pequeño que el original: no había fondos ni árboles suficientemente grandes para replicarlo. De la estatua original sólo quedan partes de la base y las piernas; la cabeza es del periodo Edo.",
      },
      {
        title: "Los ciervos de Nara",
        body: "Los más de 1.000 ciervos sika que campan libres por el parque no son una atracción turística montada: en el sintoísmo se consideraban mensajeros de los dioses y estuvieron protegidos por ley desde el siglo VIII — matar uno se castigaba con la muerte hasta 1637. Hoy son Monumento Natural Nacional. Han aprendido a inclinar la cabeza para pedir galletas (shika senbei), un comportamiento que no es innato sino aprendido de la interacción con visitantes.",
      },
    ],
    curiosities: [
      "En una de las columnas del interior hay un agujero del mismo tamaño que una fosa nasal del Buda. La creencia dice que quien consigue pasar por él tendrá la iluminación en su próxima vida. Los niños pasan sin problema; los adultos, con dificultad.",
      "Los ciervos pueden ser agresivos si llevas comida visible. También muerden mapas y folletos, así que guarda el papel.",
      "La ceremonia de 'apertura de ojos' del Buda en 752 reunió a 10.000 monjes y asistieron delegaciones de India, China y Vietnam — fue un acontecimiento internacional.",
    ],
    tip: "El templo Nigatsu-do, subiendo la colina detrás del Daibutsuden, es gratuito, casi siempre está vacío y tiene la mejor vista panorámica de Nara.",
  },

  "kinkaku-ji": {
    name: "Kinkaku-ji (Pabellón Dorado)",
    jp: "金閣寺",
    founded: "1397 (edificio actual: 1955)",
    wiki: "Kinkaku-ji",
    tagline: "Un pabellón cubierto de pan de oro sobre un estanque — y una reconstrucción tras un incendio provocado.",
    sections: [
      {
        title: "Qué es",
        body: "Formalmente se llama Rokuon-ji. Era la villa de retiro del shogun Ashikaga Yoshimitsu, que se retiró oficialmente del poder en 1394 pero siguió gobernando en la práctica desde aquí. A su muerte, según su testamento, se convirtió en templo zen de la escuela Rinzai.",
      },
      {
        title: "El detalle arquitectónico que casi nadie ve",
        body: "Los tres pisos del pabellón están construidos en tres estilos distintos, y esa es la clave del edificio. El primero es estilo shinden, el de los palacios aristocráticos del periodo Heian, y no lleva oro. El segundo es estilo buke, el de las casas de samuráis, cubierto de pan de oro. El tercero es estilo zenshū-butsuden, el de las salas budistas zen chinas, también dorado. Yoshimitsu estaba representando visualmente cómo el poder había pasado de la aristocracia a los guerreros y de ahí a la autoridad espiritual — que él encarnaba.",
      },
      {
        title: "El incendio de 1950",
        body: "El edificio que ves es de 1955. En julio de 1950, un joven monje novicio de 22 años llamado Hayashi Yōken lo roció con combustible y le prendió fuego, y luego intentó suicidarse en la colina de detrás. Sobrevivió. En el juicio declaró que le atormentaba la belleza del pabellón y el contraste con su propia fealdad y tartamudez, y que odiaba ver el templo convertido en negocio turístico. Murió de tuberculosis en 1956. El suceso conmocionó a Japón y Yukio Mishima escribió a partir de él su novela 'El pabellón de oro' (1956), una de las obras clave de la literatura japonesa del siglo XX.",
      },
      {
        title: "El oro actual",
        body: "La reconstrucción de 1955 fue fiel al original, pero en 1987 se volvió a recubrir con un pan de oro cinco veces más grueso que el que tenía originalmente, además de repintar todo el lacado interior. Costó unos 740 millones de yenes de la época. Irónicamente, el pabellón actual brilla mucho más de lo que jamás brilló el de Yoshimitsu.",
      },
    ],
    curiosities: [
      "El fénix dorado de la cumbre del tejado sí es original: se salvó del incendio porque estaba retirado para restauración.",
      "El estanque, Kyōko-chi ('espejo de agua'), está diseñado para que el reflejo sea parte de la obra. Las islas y rocas representan escenas de la cosmología budista.",
      "No se puede entrar al pabellón. Nunca ha estado abierto al público por dentro.",
    ],
    tip: "El recorrido es de sentido único y bastante corto (30-40 min). Se ve mejor con sol de mañana, cuando la luz da de frente al pabellón.",
  },

  "ginkaku-ji": {
    name: "Ginkaku-ji (Pabellón de Plata)",
    jp: "銀閣寺",
    founded: "1482",
    wiki: "Ginkaku-ji",
    tagline: "El pabellón que nunca fue plateado, y donde nació buena parte de la estética japonesa moderna.",
    sections: [
      {
        title: "La plata que no existe",
        body: "Lo primero que sorprende: no tiene nada de plata. El nombre es posterior y probablemente irónico o comparativo con el Pabellón Dorado de su abuelo. Hay dos teorías: que se planeó recubrirlo de plata y nunca se hizo por falta de fondos durante la Guerra Ōnin, o que el nombre viene del reflejo plateado de la luna sobre la laca negra del edificio. Análisis modernos de 2007 confirmaron que nunca hubo recubrimiento plateado.",
      },
      {
        title: "Historia",
        body: "Lo construyó Ashikaga Yoshimasa, nieto del constructor del Kinkaku-ji, como villa de retiro. Yoshimasa fue un shogun desastroso políticamente: su indecisión sobre la sucesión desencadenó la Guerra Ōnin, que destruyó Kioto y sumió a Japón en un siglo de guerra civil. Mientras la ciudad ardía, él se dedicaba aquí al arte, la poesía y la ceremonia del té.",
      },
      {
        title: "Por qué importa culturalmente",
        body: "Ese retiro de Yoshimasa dio lugar a la 'cultura Higashiyama', que es el origen de buena parte de lo que hoy consideramos estética japonesa: la ceremonia del té formalizada, el ikebana, el teatro nō, la jardinería de rocas, la arquitectura shoin (con tatami, tokonoma y puertas correderas) y la estética wabi-sabi de la belleza en lo imperfecto y austero. La sala Tōgu-dō del recinto contiene el que se considera el primer cuarto de té de Japón, de 4,5 tatamis.",
      },
      {
        title: "El jardín de arena",
        body: "El 'Mar de Arena Plateada' (Ginshadan) y el cono truncado del 'Monte Fuji de la Contemplación de la Luna' (Kōgetsudai) son de arena blanca rastrillada. No son originales del siglo XV: aparecen documentados desde el periodo Edo. Se rastrillan a mano constantemente y su forma exacta se mantiene con plantillas.",
      },
    ],
    curiosities: [
      "Solo dos edificios del recinto son originales del siglo XV: el propio pabellón y el Tōgu-dō. Ambos son Tesoro Nacional.",
      "El musgo del jardín tiene más de 100 variedades y es uno de los jardines de musgo más cuidados de Kioto.",
      "El Paseo de la Filosofía que sale de aquí debe su nombre a Kitarō Nishida, filósofo de la Escuela de Kioto, que lo recorría a diario meditando.",
    ],
    tip: "Se disfruta mucho más si se hace después del Kinkaku-ji, para captar el contraste deliberado entre ostentación y austeridad.",
  },

  "kiyomizu-dera": {
    name: "Kiyomizu-dera",
    jp: "清水寺",
    founded: "Año 778 (edificios actuales: 1633)",
    wiki: "Kiyomizu-dera",
    tagline: "Una plataforma de madera suspendida sobre el vacío, construida sin un solo clavo.",
    sections: [
      {
        title: "Qué es",
        body: "Templo budista de la escuela Hossō, fundado en 778, antes de que Kioto fuera capital. Su nombre significa 'templo del agua pura', por la cascada Otowa que brota en el recinto y que fue el motivo original de su fundación: el monje Enchin tuvo una visión que le llevó hasta este manantial.",
      },
      {
        title: "La plataforma",
        body: "El escenario (butai) sobresale 13 metros sobre la ladera, sostenido por 168 pilares de zelkova japonesa de hasta 12 metros. Todo el conjunto está ensamblado mediante juntas de carpintería, sin un solo clavo. Los edificios actuales son de 1633, reconstruidos por orden del shogun Tokugawa Iemitsu tras uno de los muchos incendios que ha sufrido el templo — ha ardido más de nueve veces a lo largo de su historia.",
      },
      {
        title: "'Saltar del escenario de Kiyomizu'",
        body: "Es una expresión japonesa equivalente a 'lanzarse a la piscina' o tomar una decisión drástica. Viene de una creencia del periodo Edo: quien sobreviviera al salto de 13 metros vería cumplido su deseo. Los registros documentan 234 saltos entre 1694 y 1864, con una tasa de supervivencia del 85% (la vegetación de abajo amortiguaba). La práctica se prohibió en 1872.",
      },
      {
        title: "La cascada Otowa",
        body: "En la base del templo, tres chorros de agua caen desde donde los visitantes beben con cazos de mango largo. Cada chorro concede algo distinto: longevidad, éxito académico y suerte en el amor. La tradición dice que beber de los tres se considera codicioso y anula el efecto — hay que elegir uno.",
      },
      {
        title: "Jishu Jinja",
        body: "Dentro del recinto hay un santuario dedicado al dios del amor y el emparejamiento. Tiene dos piedras separadas 18 metros: si consigues caminar de una a otra con los ojos cerrados, encontrarás el amor. Si necesitas que alguien te guíe, necesitarás un intermediario en la vida real.",
      },
    ],
    curiosities: [
      "Fue candidato en 2007 a las Nuevas Siete Maravillas del Mundo.",
      "La restauración del tejado terminó en 2020 tras varios años con andamios; ahora se ve completo por primera vez en casi una década.",
      "Las cuestas de acceso (Sannenzaka y Ninenzaka) tienen una leyenda: tropezar en ellas trae tres o dos años de mala suerte respectivamente. Están empedradas y son resbaladizas, así que la advertencia es medio en serio.",
    ],
    tip: "Abre a las 6:00 de la mañana. Es de los pocos templos importantes que se pueden ver prácticamente solos si madrugas.",
  },

  "arashiyama": {
    name: "Arashiyama y el bosque de bambú",
    jp: "嵐山",
    founded: "Periodo Heian (s. VIII-XII)",
    wiki: "Arashiyama",
    tagline: "El retiro aristocrático de la corte Heian, con un bosque de bambú que suena distinto a todo.",
    sections: [
      {
        title: "Qué es",
        body: "Un distrito en el oeste de Kioto, al pie del monte Arashiyama ('montaña de la tormenta'). Desde el periodo Heian fue el lugar de segunda residencia de la aristocracia de la corte, que venía a contemplar los cerezos en primavera y los arces en otoño. Es Lugar de Belleza Escénica designado a nivel nacional.",
      },
      {
        title: "El bosque de bambú",
        body: "El Sagano Bamboo Grove es un sendero de unos 400 metros entre cañas de bambú moso de hasta 20 metros. No es un bosque natural: se plantó y se mantiene deliberadamente, y el bambú se cosecha para artesanía. El Ministerio de Medio Ambiente japonés lo incluyó en su lista de los '100 paisajes sonoros de Japón' por el sonido particular que hace el viento entre las cañas, combinado con el crujido de los tallos al rozarse.",
      },
      {
        title: "El puente Togetsukyo",
        body: "El 'puente que cruza la luna' data originalmente del siglo IX, aunque la estructura actual es de 1934 (con núcleo de hormigón revestido de madera para conservar el aspecto). Su nombre viene de un comentario del emperador Kameyama en el siglo XIII, al ver la luna parecer cruzar el puente.",
      },
      {
        title: "Otagi Nenbutsu-ji",
        body: "Subiendo por Saga-Toriimoto está este templo, mucho menos visitado. Contiene 1.200 estatuas de rakan (discípulos de Buda) talladas entre 1981 y 1991 no por escultores profesionales, sino por visitantes aficionados guiados por el escultor Kōchō Nishimura. Por eso cada una tiene una expresión completamente distinta y algunas son abiertamente humorísticas: hay rakan con raquetas de tenis, con cámaras de fotos, con gatos. Están cubiertas de musgo y el conjunto es extraordinario.",
      },
    ],
    curiosities: [
      "El parque de monos Iwatayama, en lo alto de la colina, tiene unos 120 macacos japoneses en libertad y una vista panorámica de Kioto. La subida son 20 minutos empinados.",
      "El tren panorámico Sagano Romantic Train recorre el desfiladero del río Hozu; en temporada alta hay que reservar.",
      "El templo Tenryū-ji, Patrimonio de la Humanidad, tiene un jardín de 1339 diseñado por Musō Soseki que se conserva prácticamente sin cambios — algo rarísimo.",
    ],
    tip: "El bosque de bambú se llena muchísimo desde las 9:00. Ir a primera hora o al final del día cambia completamente la experiencia.",
  },

  "gion": {
    name: "Gion y los barrios de geishas",
    jp: "祇園",
    founded: "Siglo XVI",
    wiki: "Gion, Kyoto",
    tagline: "El distrito de geishas más famoso de Japón, donde todavía trabajan unas 200 profesionales.",
    sections: [
      {
        title: "Qué es un hanamachi",
        body: "Gion es un hanamachi ('ciudad de flores'), uno de los cinco que quedan en Kioto junto a Pontocho, Miyagawachō, Kamishichiken y Gion Higashi. Son distritos donde viven y trabajan las geiko (así se llaman las geishas en Kioto) y las maiko (aprendices). Surgieron en el siglo XVI como zona de casas de té para peregrinos que iban al santuario Yasaka.",
      },
      {
        title: "Geiko, no geisha",
        body: "En Kioto el término correcto es geiko ('mujer de arte'). Son artistas profesionales especializadas en danza tradicional, canto, shamisen, ceremonia del té y conversación. No son ni han sido prostitutas: esa confusión viene de las oiran, cortesanas de otro gremio, y se agravó durante la ocupación estadounidense de posguerra, cuando prostitutas se vestían de geisha para atraer soldados. Una maiko empieza su formación a los 15-16 años y tarda unos cinco en convertirse en geiko.",
      },
      {
        title: "Cómo distinguirlas",
        body: "Una maiko lleva el obi colgando hasta casi el suelo (darari obi), sandalias altas de madera (okobo), maquillaje blanco con el labio inferior pintado sólo parcialmente el primer año, y flores elaboradas en el pelo que cambian cada mes. Una geiko lleva el obi corto y anudado, peluca en vez de pelo propio, y adornos mucho más sobrios. Si ves a alguien con kimono haciéndose fotos en plena calle, casi con total seguridad es una turista con kimono alquilado.",
      },
      {
        title: "La calle Hanamikoji",
        body: "Es la arteria principal, con ochaya (casas de té) de fachada de madera y celosías. Estos establecimientos funcionan por presentación: no se puede entrar sin ser cliente recomendado por otro cliente, un sistema llamado ichigen-san okotowari. Una velada con geiko puede costar varios cientos de euros por persona.",
      },
    ],
    curiosities: [
      "Desde 2019 está prohibido hacer fotografías en las calles privadas de Gion, con multas de 10.000 ¥. En 2024 se cerraron varios callejones al turismo por el acoso a las maiko.",
      "El número de geiko y maiko ha caído de unas 80.000 en los años 20 a unas 1.000 en todo Japón, de las cuales unas 200 están en Kioto.",
      "El riachuelo Shirakawa, con sus sauces y casas de madera, es probablemente el rincón más fotografiado de Kioto al atardecer.",
    ],
    tip: "Entre las 17:30 y las 18:30 es cuando las maiko se desplazan a sus citas. Si ves una, no la pares ni la persigas: van con prisa a trabajar.",
  },

  "nishiki": {
    name: "Mercado de Nishiki",
    jp: "錦市場",
    founded: "Siglo XIV",
    wiki: "Nishiki Market",
    tagline: "'La cocina de Kioto': 400 metros de callejón cubierto con 130 puestos, muchos con siglos de historia.",
    sections: [
      {
        title: "Historia",
        body: "Los primeros puestos de pescado documentados aquí datan de 1310, aunque la zona ya funcionaba como mercado antes. Se estableció aquí porque el subsuelo tiene aguas subterráneas frías que permitían conservar el pescado antes de la refrigeración. Muchas tiendas llevan en la misma familia cinco o más generaciones.",
      },
      {
        title: "Qué encontrar",
        body: "Es el sitio para ver los ingredientes específicos de la cocina de Kioto: tsukemono (encurtidos, especialmente el shibazuke morado y el senmaizuke de nabo), yuba (nata de tofu), fu (gluten de trigo), tofu fresco, matcha, dashimaki tamago (tortilla enrollada con caldo), y verduras kyō-yasai autóctonas de Kioto que no se cultivan en ningún otro sitio.",
      },
      {
        title: "El techo",
        body: "La cubierta de vidrio con franjas rojas, amarillas y verdes es de 1993. Los colores no son decorativos al azar: se eligieron para reproducir el ambiente cromático de los antiguos toldos de tela del mercado.",
      },
    ],
    curiosities: [
      "Comer andando está mal visto en Japón y en Nishiki lo han pedido explícitamente con carteles: la idea es comprar y comer parado junto al puesto.",
      "El callejón mide unos 400 metros y a veces sólo 3-5 metros de ancho, así que en hora punta se avanza muy despacio.",
      "En el extremo este conecta directamente con el santuario Nishiki Tenmangū, encajado entre edificios comerciales.",
    ],
    tip: "Muchos puestos cierran sobre las 17:00-18:00 y algunos los miércoles. Mejor ir a media mañana.",
  },

  "osaka": {
    name: "Osaka: castillo y Dotonbori",
    jp: "大阪",
    founded: "Castillo: 1583",
    wiki: "Osaka Castle",
    tagline: "La cocina de Japón y la ciudad de los mercaderes, con un castillo que es puro símbolo.",
    sections: [
      {
        title: "El castillo",
        body: "Lo construyó Toyotomi Hideyoshi en 1583 como el castillo más grande de Japón, símbolo de la unificación del país que él había completado. Fue destruido en 1615 por Tokugawa Ieyasu en el sitio de Osaka, que acabó con el clan Toyotomi. Se reconstruyó, y la torre volvió a arder por un rayo en 1665.",
      },
      {
        title: "Lo que verás realmente",
        body: "Conviene saberlo: la torre actual es de 1931, de hormigón armado, y por dentro es un museo moderno con ascensor. No es una reconstrucción arqueológica sino una recreación libre, financiada por donaciones ciudadanas. Lo que sí es auténtico y espectacular son los muros de piedra y los fosos, del siglo XVII: algunas rocas individuales pesan más de 100 toneladas y fueron transportadas por mar desde canteras a cientos de kilómetros.",
      },
      {
        title: "Dotonbori",
        body: "El canal se excavó en 1615 y la zona se convirtió en el distrito de teatros de Osaka (kabuki y bunraku). Hoy es la zona de neones, restaurantes y carteles gigantes. El letrero del corredor Glico lleva ahí desde 1935 y va por su sexta versión; el cangrejo mecánico del restaurante Kani Dōraku, desde 1960.",
      },
      {
        title: "Kuidaore",
        body: "Osaka tiene una palabra propia: kuidaore, 'arruinarse comiendo'. La ciudad fue durante siglos el centro de comercio de arroz de Japón y desarrolló una cultura gastronómica popular y sin pretensiones. De aquí salen el takoyaki (bolas de pulpo), el okonomiyaki (tortilla de repollo a la plancha) y el kushikatsu (brochetas rebozadas).",
      },
    ],
    curiosities: [
      "Regla estricta del kushikatsu: no se puede mojar dos veces la brocheta en la salsa comunitaria. Está escrito en todos los locales.",
      "En Osaka la gente se coloca a la derecha de las escaleras mecánicas; en Tokio, a la izquierda. Nadie sabe con certeza por qué.",
      "Shinsekai ('mundo nuevo') se construyó en 1912 inspirándose en París por el norte y Coney Island por el sur; su torre Tsūtenkaku imitaba a la Torre Eiffel.",
    ],
    tip: "El castillo por dentro se puede saltar sin remordimiento si vas justo de tiempo. El parque y los muros son lo que merece la pena.",
  },

  // ══════════════════════════════════════════════════════════════════
  // ALPES JAPONESES
  // ══════════════════════════════════════════════════════════════════

  "kenroku-en": {
    name: "Jardín Kenroku-en",
    jp: "兼六園",
    founded: "Siglo XVII",
    wiki: "Kenroku-en",
    tagline: "Uno de los tres grandes jardines de Japón, diseñado para cumplir seis atributos imposibles a la vez.",
    sections: [
      {
        title: "El nombre",
        body: "Kenroku-en significa 'jardín de las seis combinaciones'. Viene de un tratado paisajístico chino que sostenía que un jardín perfecto debe reunir seis atributos que normalmente se excluyen entre sí: amplitud y reclusión, artificio y antigüedad, agua abundante y vistas panorámicas. Tener las seis a la vez se consideraba imposible; este jardín se diseñó específicamente para lograrlo.",
      },
      {
        title: "Historia",
        body: "Lo desarrolló el clan Maeda, señores del dominio de Kaga, a lo largo de casi dos siglos, desde 1676. Los Maeda eran el clan más rico de Japón después del propio shogunato, y volcaron su fortuna en cultura y arte en parte como estrategia política: dedicarse ostentosamente a lo estético señalaba al shogun que no estaban invirtiendo en ejércitos. Se abrió al público en 1874.",
      },
      {
        title: "Qué buscar",
        body: "La linterna Kotoji-tōrō, de dos patas desiguales junto al estanque Kasumi, es el símbolo del jardín y de la ciudad. La fuente del jardín es la más antigua de Japón que funciona con presión natural, sin bomba: el agua sube por diferencia de nivel desde un estanque superior. En invierno se instalan los yukitsuri, conos de cuerdas que sostienen las ramas de los pinos para que no se rompan con el peso de la nieve — una imagen icónica, aunque en septiembre no estarán puestos.",
      },
    ],
    curiosities: [
      "Los otros dos 'grandes jardines' son Kairaku-en en Mito y Kōraku-en en Okayama.",
      "El barrio samurái de Nagamachi, cerca del jardín, conserva los muros de tierra originales y algunas casas visitables de los guerreros de rango medio del clan Maeda.",
      "El mercado Ōmichō lleva funcionando desde el siglo XVIII y es el mejor sitio de la costa del Mar de Japón para marisco, especialmente cangrejo.",
    ],
    tip: "Abre a las 7:00 en verano. La primera hora es cuando mejor se aprecia el atributo de 'reclusión' que en pleno día desaparece por completo.",
  },

  "shirakawa-go": {
    name: "Shirakawa-go",
    jp: "白川郷",
    founded: "Casas de los siglos XVII-XIX",
    wiki: "Shirakawa-go",
    tagline: "Aldea de casas con tejados de paja a dos aguas, Patrimonio de la Humanidad, en un valle aislado por la nieve.",
    sections: [
      {
        title: "Gasshō-zukuri",
        body: "El estilo de las casas se llama gasshō-zukuri, 'construido como manos en oración', porque el tejado a dos aguas muy inclinado recuerda a dos palmas juntas. La inclinación de unos 60 grados no es estética: esta zona recibe hasta 10 metros de nieve al año y un tejado plano colapsaría. La paja de susuki tiene entre 50 y 80 cm de grosor y aísla del frío extremo.",
      },
      {
        title: "Construidas sin clavos",
        body: "Toda la estructura está ensamblada con juntas de madera y atada con cuerdas de paja y viñas, sin un solo clavo metálico. Esto le da flexibilidad para absorber el peso de la nieve y los terremotos. Los tejados se rehacen cada 30-40 años en una operación comunitaria llamada yui, en la que participan cientos de vecinos en un solo día — un sistema de ayuda mutua que sigue vivo.",
      },
      {
        title: "Los pisos superiores y la seda",
        body: "El espacio bajo el tejado, de tres o cuatro plantas, no era vivienda: se usaba para criar gusanos de seda. La sericultura fue la base económica del valle durante siglos, junto con la producción de salitre para pólvora, que se obtenía del suelo bajo las casas. El humo del hogar (irori) de la planta baja subía y ahumaba la estructura, protegiéndola de insectos y podredumbre.",
      },
      {
        title: "Por qué sigue en pie",
        body: "El valle estuvo prácticamente aislado hasta que se abrieron las carreteras en los años 50 y 60. En 1961 la construcción de la presa de Miboro inundó varias aldeas vecinas y forzó el traslado de decenas de casas. La conciencia de estar perdiendo el patrimonio llevó a los vecinos a crear un pacto en 1971 comprometiéndose a no vender, alquilar ni destruir. Fue declarado Patrimonio de la Humanidad en 1995.",
      },
    ],
    curiosities: [
      "Ogimachi, la aldea principal, tiene unas 110 casas gasshō, de las cuales unas 20 son visitables o funcionan como minshuku.",
      "El mirador de Shiroyama, subiendo unos 15-20 minutos, da la vista clásica del valle completo.",
      "La casa Wada, la más grande, pertenece a la familia que gestionaba el comercio de salitre y se puede visitar por dentro.",
    ],
    tip: "El bus de Kanazawa se llena; ir con la reserva hecha es imprescindible. Con 3 horas se ve bien la aldea sin agobios.",
  },

  "takayama": {
    name: "Takayama",
    jp: "高山",
    founded: "Casco antiguo: siglo XVII",
    wiki: "Takayama, Gifu",
    tagline: "Un casco histórico de madera oscura intacto, en una ciudad que fue gobernada directamente por el shogun.",
    sections: [
      {
        title: "Por qué se conservó",
        body: "Takayama estaba tan aislada entre montañas que quedó al margen de las guerras y de la industrialización. En 1692 el shogunato Tokugawa se la arrebató al clan Kanamori y la puso bajo administración directa, precisamente por su valor maderero: los bosques de Hida abastecían las obras del shogunato. Eso trajo estabilidad y dinero, pero también prohibiciones de construcción ostentosa, que dieron a la ciudad su aspecto sobrio y homogéneo.",
      },
      {
        title: "Sanmachi Suji",
        body: "Las tres calles del barrio mercantil conservan casas de los siglos XVII-XIX con celosías de madera oscurecida, aleros bajos y sake-bayashi (bolas de ramas de cedro colgadas) que indican las destilerías de sake. Cuando la bola está verde, el sake nuevo acaba de salir; según se seca y se vuelve marrón, indica la maduración.",
      },
      {
        title: "Los carpinteros de Hida",
        body: "La región tiene una tradición de carpintería de más de 1.300 años. Era tan reconocida que durante el periodo Nara, en lugar de pagar impuestos en arroz, Hida enviaba carpinteros a la capital: unos 100 hombres al año trabajaban en la construcción de los templos y palacios de Nara y Kioto. Muchos de los grandes templos que veremos deben su estructura a artesanos de aquí.",
      },
      {
        title: "El festival de Takayama",
        body: "Se celebra en primavera (abril) y otoño (octubre) y está considerado uno de los tres festivales más bellos de Japón. Sus carrozas (yatai), algunas del siglo XVII, llevan marionetas mecánicas (karakuri) accionadas por varillas y cuerdas desde dentro. Aunque no coincidamos con el festival, varias carrozas se exponen todo el año en el Takayama Yatai Kaikan.",
      },
    ],
    curiosities: [
      "La ternera de Hida es de la misma raza que la de Kobe (wagyu negro japonés) y compite en calidad, con la ventaja de que aquí es bastante más barata.",
      "Los mercadillos matutinos (Jinya-mae y Miyagawa) funcionan desde el periodo Edo y abren de 7:00 a 12:00.",
      "El Takayama Jinya es el único edificio de gobierno provincial del periodo Edo que se conserva completo en todo Japón.",
    ],
    tip: "El casco antiguo se recorre en 2 horas, pero merece la pena reservar tiempo para el mercadillo de la mañana antes de coger el tren.",
  },

  "nakasendo": {
    name: "Ruta Nakasendō: Magome y Tsumago",
    jp: "中山道",
    founded: "Siglo XVII",
    wiki: "Nakasendō",
    tagline: "8 km del camino real del periodo Edo, entre dos pueblos-posta congelados en el tiempo.",
    sections: [
      {
        title: "Qué era el Nakasendō",
        body: "Una de las cinco carreteras oficiales (Gokaidō) que el shogunato Tokugawa estableció desde 1601 para conectar Edo (Tokio) con Kioto. El Nakasendō, 'camino a través de las montañas', medía 534 km y tenía 69 pueblos-posta (shukuba). Su alternativa costera era el Tōkaidō, más rápido pero con ríos que se desbordaban; el Nakasendō era más largo pero fiable todo el año, y era el que usaban las princesas y comitivas importantes.",
      },
      {
        title: "El sankin-kōtai",
        body: "El tráfico venía sobre todo de un sistema del shogunato: obligaba a todos los señores feudales a residir en Edo un año de cada dos, dejando a sus familias allí como rehenes permanentes. Eso generaba desfiles constantes de cientos o miles de personas por estos caminos, y arruinaba económicamente a los daimyō, que era exactamente la intención. Los pueblos-posta vivían de dar alojamiento y caballos a esas comitivas.",
      },
      {
        title: "Tsumago: la primera restauración",
        body: "Tsumago fue el primer pueblo de Japón en emprender una restauración histórica sistemática, en 1968. Los vecinos firmaron un pacto de tres noes: no vender, no alquilar, no destruir. Se enterraron los cables eléctricos, se retiraron las máquinas expendedoras y las señales modernas, y los coches están prohibidos de 9:00 a 17:00. El resultado es que no se ve un solo elemento del siglo XX en la calle principal.",
      },
      {
        title: "La caminata",
        body: "Los 8 km entre Magome y Tsumago se hacen en unas 2,5-3 horas. El sentido Magome→Tsumago es el recomendado porque Magome está más alto: se sube unos 300 m hasta el paso de Magome-tōge y luego se baja. Parte del camino es empedrado original del periodo Edo. Hay campanas repartidas por el bosque para ahuyentar osos, que se tocan al pasar — los avistamientos son muy raros pero la costumbre se mantiene.",
      },
    ],
    curiosities: [
      "Magome se quemó completamente dos veces, en 1895 y 1915, así que sus edificios son reconstrucciones; Tsumago conserva estructuras originales.",
      "El servicio de transporte de equipaje entre ambos pueblos funciona de finales de marzo a finales de noviembre, con entrega sobre las 13:00.",
      "En Tsumago se conservan dos honjin: los alojamientos reservados a daimyō y funcionarios de alto rango, con entrada separada y habitaciones elevadas.",
    ],
    tip: "Los minshuku sirven la cena a hora fija, normalmente 18:00-18:30. Conviene salir de Magome antes de las 14:30 para no ir con prisa.",
  },

  // ══════════════════════════════════════════════════════════════════
  // TOKIO
  // ══════════════════════════════════════════════════════════════════

  "senso-ji": {
    name: "Senso-ji y Asakusa",
    jp: "浅草寺",
    founded: "Año 645 (edificio actual: 1958)",
    wiki: "Sensō-ji",
    tagline: "El templo más antiguo de Tokio, reconstruido en hormigón tras los bombardeos de 1945.",
    sections: [
      {
        title: "La leyenda fundacional",
        body: "Según la tradición, en el año 628 dos hermanos pescadores encontraron una pequeña estatua dorada de Kannon, la bodhisattva de la compasión, en sus redes en el río Sumida. La devolvieron al agua y volvió a aparecer. El jefe de la aldea reconoció su valor sagrado, convirtió su casa en templo y en 645 se construyó el edificio formal. La estatua nunca se ha mostrado al público — ni siquiera los monjes la ven.",
      },
      {
        title: "Destruido en 1945",
        body: "El templo original sobrevivió siglos, incluido el gran terremoto de 1923. Pero en el bombardeo incendiario de Tokio del 10 de marzo de 1945 — la incursión aérea más mortífera de la historia, con unos 100.000 muertos en una noche — Asakusa quedó arrasada y el Senso-ji ardió por completo. Lo que ves es una reconstrucción de 1958, financiada por donaciones populares, hecha en hormigón armado precisamente para que no volviera a arder.",
      },
      {
        title: "Kaminarimon y el farol",
        body: "La 'puerta del trueno' lleva el farol rojo gigante de 3,9 metros y 700 kg. El actual es de 2013, donado como todos los anteriores por el fundador de Panasonic, Kōnosuke Matsushita, que atribuyó a Kannon la curación de su reumatismo. El farol se pliega en acordeón cuando pasan las carrozas de los festivales. A los lados están Raijin (dios del trueno) y Fūjin (dios del viento).",
      },
      {
        title: "Nakamise-dōri",
        body: "La calle comercial de 250 metros que lleva del Kaminarimon al templo funciona desde principios del siglo XVIII y es una de las calles comerciales más antiguas de Japón. Surgió cuando a los vecinos que limpiaban el recinto se les concedió el derecho a montar puestos. Hoy tiene unas 90 tiendas de dulces tradicionales, abanicos y artesanía.",
      },
      {
        title: "El omikuji",
        body: "Aquí es famoso el sistema de adivinación: se agita una caja metálica, sale un palito con un número, y se recoge el papel del cajón correspondiente. Senso-ji tiene fama de dar muchos kyō (mala suerte) — se dice que alrededor del 30%, cuando lo habitual en otros templos es mucho menos. Si sale mala suerte, se ata en las barras metálicas del recinto para dejarla allí.",
      },
    ],
    curiosities: [
      "El árbol de ginkgo del recinto sobrevivió al bombardeo y sigue vivo, con las cicatrices visibles.",
      "El humo del incensario grande (jōkōro) se atrae con la mano hacia la parte del cuerpo que se quiere curar.",
      "Desde el otro lado del río se ve el Tokyo Skytree (634 m), la torre más alta de Japón, en contraste directo con el templo.",
    ],
    tip: "De noche el templo queda espectacular: la iluminación se mantiene encendida desde el atardecer hasta las 23:00 aprox., la calle Nakamise cierra sobre las 18:00-19:00 y el recinto se queda con hasta un 70-80% menos de gente que de día — una visita completamente distinta. Justo enfrente de la puerta Kaminarimon está el Asakusa Culture Tourist Information Center (edificio de madera y cristal del arquitecto Kengo Kuma): entrada libre, y su mirador gratuito de la 8ª planta abre hasta las 22:00, con vistas de la puerta, la calle Nakamise, el templo iluminado y el Tokyo Skytree de fondo. Como os alojáis en Asakusa toda esa parte del viaje, no hace falta encajarlo en un día concreto: podéis acercaros cualquier noche sin desviaros de la ruta.",
  },

  "meiji-jingu": {
    name: "Meiji Jingū",
    jp: "明治神宮",
    founded: "1920 (reconstruido en 1958)",
    wiki: "Meiji Shrine",
    tagline: "Un bosque de 100.000 árboles plantado a mano en pleno Tokio, dedicado al emperador de la modernización.",
    sections: [
      {
        title: "A quién está dedicado",
        body: "Al emperador Meiji (1852-1912) y a la emperatriz Shōken. Bajo su reinado Japón pasó de ser un país feudal cerrado a una potencia industrial en apenas 45 años: se abolieron los samuráis, se creó un ejército moderno, se instauró una constitución y se ganó una guerra a Rusia. Al morir, una petición popular reclamó un santuario en su memoria.",
      },
      {
        title: "El bosque es artificial",
        body: "Esto es lo más sorprendente del lugar. Los 70 hectáreas de bosque que rodean el santuario no son un bosque antiguo preservado: se plantaron desde cero entre 1915 y 1920. Ciudadanos de todo Japón donaron unos 100.000 árboles de 365 especies, y unos 110.000 voluntarios los plantaron a mano. Los botánicos diseñaron la plantación para que evolucionara por sí sola hacia un bosque autosuficiente en unos 150 años, sin mantenimiento. El plan está funcionando: hoy es un ecosistema estable con especies que llegaron solas.",
      },
      {
        title: "Reconstruido tras la guerra",
        body: "El santuario original de 1920 fue destruido en los bombardeos de 1945. El edificio actual se completó en 1958, de nuevo con fondos de donación pública.",
      },
      {
        title: "Los barriles de sake",
        body: "El muro de barriles decorados de la entrada son ofrendas de destilerías de todo Japón. Están vacíos: son barriles ceremoniales. Enfrente hay un muro paralelo de barricas de vino de Borgoña, donadas por bodegas francesas, en recuerdo de que el emperador Meiji fue un gran defensor de la adopción de costumbres occidentales, incluido el vino.",
      },
    ],
    curiosities: [
      "Es el santuario que más visitas de Año Nuevo recibe de todo Japón: más de tres millones de personas en los tres primeros días de enero.",
      "Es habitual ver bodas sintoístas tradicionales cruzando el patio, con la novia de blanco y sombrero shiromuku.",
      "Al lado está Harajuku y la calle Takeshita, el epicentro de la moda juvenil: el contraste entre ambos en 200 metros es brutal.",
    ],
    tip: "El paseo desde el torii de entrada hasta el santuario son unos 10-15 minutos entre árboles. Es parte de la experiencia, no un trámite.",
  },

  "shibuya": {
    name: "Shibuya",
    jp: "渋谷",
    founded: "Cruce actual: 1973",
    wiki: "Shibuya Crossing",
    tagline: "El cruce peatonal más transitado del mundo y el perro que esperó nueve años.",
    sections: [
      {
        title: "El cruce",
        body: "El Shibuya Scramble Crossing es un cruce diagonal en el que se detiene todo el tráfico a la vez y los peatones cruzan en todas direcciones. Pasan entre 1.000 y 3.000 personas en cada ciclo de semáforo, y hasta 500.000 al día en total. Su configuración actual es de 1973. La imagen se ha convertido en el símbolo visual de Tokio y aparece en 'Lost in Translation', 'Resident Evil' y 'Fast & Furious: Tokyo Drift'.",
      },
      {
        title: "Hachikō",
        body: "La estatua del perro junto a la salida es de 1934, aunque la actual es una réplica de 1948. Hachikō era un akita que acompañaba cada día a su dueño, el profesor Ueno, a la estación y le esperaba a la vuelta. El 21 de mayo de 1925 el profesor murió de una hemorragia cerebral en la universidad y no volvió. Hachikō siguió acudiendo a la estación cada día a la hora exacta del tren durante nueve años y nueve meses, hasta su muerte en 1935. Su cuerpo está disecado en el Museo Nacional de Ciencias de Ueno.",
      },
      {
        title: "Cómo verlo bien",
        body: "Las mejores vistas gratuitas son desde el Starbucks del Tsutaya (segunda planta, ventanales) y desde el paso elevado de la estación. De pago está el mirador Shibuya Sky, a 229 m, con terraza al aire libre — hay que reservar con antelación y el atardecer se agota rápido.",
      },
    ],
    curiosities: [
      "En Nochevieja y tras victorias importantes de la selección japonesa, el cruce se llena de decenas de miles de personas y la policía despliega el 'DJ Police', agentes con megáfono que dirigen a la multitud con humor.",
      "El nombre Shibuya significa literalmente 'valle amargo' — es efectivamente un valle, por eso todas las calles suben desde la estación.",
      "El edificio 109, la torre cilíndrica del cruce, es desde 1979 el templo de la moda juvenil femenina japonesa.",
    ],
    tip: "De noche con los neones encendidos es cuando la imagen es más espectacular. A partir de las 19:00 y con lluvia, mejor todavía por los reflejos.",
  },

  "akihabara": {
    name: "Akihabara",
    jp: "秋葉原",
    founded: "Como barrio electrónico: 1945",
    wiki: "Akihabara",
    tagline: "De mercado negro de radios en la posguerra a capital mundial del anime y el manga.",
    sections: [
      {
        title: "El origen",
        body: "Tras la guerra, en las ruinas alrededor de la estación de Akihabara se montó un mercado negro de componentes de radio, alimentado por estudiantes de la cercana Universidad Electrotécnica de Tokio que reparaban y montaban aparatos. El gobierno de ocupación toleró la actividad y en los años 50 el barrio ya era el centro de electrónica doméstica de Japón: aquí se compraron los primeros televisores, neveras y lavadoras del milagro económico japonés.",
      },
      {
        title: "La transformación",
        body: "En los 80 el negocio pasó de electrodomésticos a ordenadores personales, y con ellos llegaron el software, los videojuegos y el manga. En los 90, con el auge del anime y la cultura otaku, las tiendas de figuras, dōjinshi (manga autoeditado) y merchandising desplazaron a la electrónica. El término otaku, que originalmente era despectivo, se reapropió aquí.",
      },
      {
        title: "Qué hay",
        body: "Mandarake Complex (ocho plantas de manga y coleccionismo de segunda mano), Super Potato (videojuegos retro), Yodobashi Camera (nueve plantas de electrónica), los salones recreativos de Taito y GiGO con máquinas de premios y juegos de ritmo, y las tiendas de gachapon con cientos de máquinas de cápsulas.",
      },
      {
        title: "Los maid cafés",
        body: "Aparecieron a finales de los 90 como extensión de los cafés temáticos de anime. Las camareras van vestidas de doncella y tratan al cliente como 'amo', con juegos, canciones y dibujos en la comida. Es un fenómeno específicamente japonés de servicio-espectáculo, no un local de contacto físico. Suelen cobrar entrada por tiempo además del consumo, y está prohibido fotografiar al personal.",
      },
    ],
    curiosities: [
      "Los domingos por la tarde la calle principal, Chūō-dōri, se cierra al tráfico y se convierte en 'paraíso peatonal' (hokōsha tengoku).",
      "El nombre viene de un santuario dedicado a un dios del fuego que estuvo aquí — irónico para un barrio que ardió repetidamente.",
      "Super Potato tiene en la última planta un salón recreativo con máquinas de los 80 en funcionamiento y a 100 ¥ la partida.",
    ],
    tip: "Los precios de segunda mano en Mandarake y Book-Off son sorprendentemente buenos, y el estado de conservación de los artículos japoneses de segunda mano suele ser impecable.",
  },

  "teamlab": {
    name: "teamLab",
    jp: "チームラボ",
    founded: "2001 (colectivo)",
    wiki: "TeamLab",
    tagline: "Arte digital inmersivo donde las obras reaccionan a tu presencia y nunca se repiten.",
    sections: [
      {
        title: "Qué es",
        body: "teamLab es un colectivo interdisciplinar japonés fundado en 2001 por Toshiyuki Inoko, que reúne a artistas, programadores, ingenieros, animadores, matemáticos y arquitectos. Sus instalaciones no son proyecciones de vídeo grabado: son programas que se renderizan en tiempo real y cambian según la presencia y el movimiento de los visitantes. Ninguna imagen se repite nunca — lo que ves no lo verá nadie más igual.",
      },
      {
        title: "El concepto",
        body: "La idea central es disolver la frontera entre el espectador y la obra, y entre las propias obras: las mariposas de una sala pueden volar a otra y morir si las tocas; las flores nacen, florecen y se marchitan según el ciclo real del año. Se inspiran en la pintura tradicional japonesa, que no usa perspectiva única y permite al espectador moverse por el espacio pictórico.",
      },
      {
        title: "Los espacios en Tokio",
        body: "teamLab Planets, en Toyosu, es el que combina agua: se recorre descalzo y hay salas donde se camina con el agua por las rodillas, con peces koi proyectados que se convierten en flores al chocar contigo. teamLab Borderless, reabierto en Azabudai Hills en 2024, es el laberinto sin mapa donde las obras migran entre salas.",
      },
    ],
    curiosities: [
      "En Planets hay que ir con ropa que se pueda remangar por encima de la rodilla; prestan pantalones cortos si hace falta.",
      "Los suelos de espejo hacen que las faldas no sean buena idea; ofrecen mallas en la entrada.",
      "Las entradas son por franja horaria y se agotan con semanas de antelación, especialmente fines de semana.",
    ],
    tip: "Reservar online con antelación es prácticamente obligatorio. Ir a última hora del día suele estar menos concurrido.",
  },

  "fuji": {
    name: "Monte Fuji",
    jp: "富士山",
    founded: "Cono actual: hace 10.000 años",
    wiki: "Mount Fuji",
    tagline: "Volcán activo, montaña sagrada y el símbolo más reconocible de Japón — cuando se deja ver.",
    sections: [
      {
        title: "La montaña",
        body: "Con 3.776 metros es el pico más alto de Japón. Es un estratovolcán activo, no extinto: su última erupción fue la de Hōei, en diciembre de 1707, que duró 16 días y cubrió Edo (a 100 km) con varios centímetros de ceniza. Se formó por la superposición de tres volcanes, y el cono actual y casi perfectamente simétrico tiene unos 10.000 años.",
      },
      {
        title: "Montaña sagrada",
        body: "Es objeto de culto desde al menos el siglo VII. El sintoísmo la asocia a la diosa Konohanasakuya-hime, cuyo santuario principal (Fujisan Hongū Sengen Taisha) posee legalmente el terreno por encima de los 3.360 metros. Hasta 1868 las mujeres tenían prohibido subir. Fue declarada Patrimonio de la Humanidad en 2013, y no por su valor natural sino cultural: por su influencia en el arte y la peregrinación.",
      },
      {
        title: "Por qué cuesta tanto verlo",
        body: "Esto es clave para planificar: el Fuji está despejado bastante menos de lo que la gente espera. En verano, la visibilidad clara es de apenas unos días al mes por la humedad y las nubes que genera la propia montaña. Los mejores meses son de noviembre a febrero. En septiembre las probabilidades son intermedias, y casi siempre mejores a primera hora de la mañana, antes de que el calor forme nubes. De ahí que la estrategia de reservar varios días y ejecutar el que amanezca despejado tenga todo el sentido.",
      },
      {
        title: "Tour Exclusivo: Lugares a Visitar",
        body: "El recorrido de 8h en mini-van con Ken Kaneshima incluye los enclaves más espectaculares de la región:\n1. Pagoda Chureito (Arakurayama Sengen): la postal clásica de 5 pisos con el Fuji al fondo.\n2. Santuario Kitaguchi Hongu Fuji Sengen Jinja: inicio histórico de peregrinos entre cedros gigantes.\n3. Aldea Oshino Hakkai: 8 estanques cristalinos de deshielo volcánico y casas con tejados de paja.\n4. Bosque de Aokigahara: el 'Mar de Árboles' sobre roca de lava endurecida.\n5. Cataratas Shiraito: cascada natural que brota de la roca como hilos de seda blanca.\n6. Ruta de los Lagos: vistas panorámicas desde las orillas de Yamanakako, Saiko y Motosuko.",
      },
      {
        title: "Gastronomía Local: Fideos Houtou",
        body: "Al mediodía parada en restaurante tradicional para degustar Houtou (fideos planos y anchos cocinados a fuego lento en caldo caliente de miso con calabaza y verduras de temporada de la montaña), el plato insignia de la prefectura de Yamanashi.",
      },
      {
        title: "Logística y Precios",
        body: "• Precio: 13.000 ¥ / persona (incluye mini-van privada y todas las entradas a los recintos). Comidas y bebidas no incluidas.\n• Punto de inicio: Estación de Mishima (Salida Sur) a las 08:20 AM (~50 min desde Tokio en Shinkansen).\n• Punto final: Estación de tren bala Shin-Fuji sobre las 17:30 (~60 min a Tokio en Shinkansen).\n• Idioma: Guía oficial en español (Ken Kaneshima · excursionesfujiyama.com · +81 90-5863-1635).",
      },
      {
        title: "Predicción de Visibilidad y Cámaras Web",
        body: "• isfujivisible.com: Algoritmo técnico con puntuación de 1 a 10 y previsión por tramos horarios.\n• mtfujitoday.com: Previsión a 7 días y acceso directo a webcams en directo de la zona.\n• La Regla de Oro: Abrir las cámaras web a las 06:30 AM desde el hotel en Tokio. Si a las 07:00 AM no se ve, es altamente improbable que aparezca más tarde (a partir de las 09:00 AM el calor evapora humedad y crea nubes sobre el cono).",
      },
    ],
    curiosities: [
      "La temporada oficial de ascenso a pie es de julio a principios de septiembre; fuera de esas fechas las estaciones cierran y subir es peligroso.",
      "Hay un dicho japonés: 'Es sabio subir el Fuji una vez, y necio subirlo dos'.",
      "El primer sueño del año con el Fuji se considera de muy buena suerte, especialmente combinado con un halcón y una berenjena.",
    ],
    tip: "Tour reservado el Domingo 20 de septiembre (Día 14) con Ken Kaneshima (Excursiones Fujiyama · +81 90-5863-1635 · excursionesfujiyama.com) + 4 reservas flexibles en GetYourGuide del 16 al 19 de septiembre. Comprobar cámaras web a las 06:30 AM.",
  },
};

// Mapa de qué guías corresponden a cada día del itinerario
export const guidesByDay = {
  1: [],
  2: ["fushimi-inari", "todai-ji"],
  3: ["ginkaku-ji", "nishiki", "gion"],
  4: ["kinkaku-ji", "arashiyama"],
  5: ["kiyomizu-dera", "osaka"],
  6: ["kenroku-en"],
  7: ["shirakawa-go", "takayama"],
  8: ["nakasendo"],
  9: ["akihabara"],
  10: ["senso-ji", "teamlab"],
  11: ["meiji-jingu", "shibuya"],
  12: [],
  13: [],
  14: ["fuji"],
  15: [],
};

// Metadatos y palabras clave para vincular cada guía con los eventos del itinerario
export const guideMeta = {
  "fushimi-inari": {
    shortName: "Fushimi Inari",
    keywords: ["fushimi inari", "santuario fushimi"],
  },
  "todai-ji": {
    shortName: "Todai-ji y Gran Buda",
    keywords: ["todai-ji", "gran buda", "daibutsuden", "tōdai-ji"],
  },
  "kinkaku-ji": {
    shortName: "Kinkaku-ji (Pab. Dorado)",
    keywords: ["kinkaku-ji", "pabellon dorado", "kinkakuji"],
  },
  "ginkaku-ji": {
    shortName: "Ginkaku-ji (Pab. de Plata)",
    keywords: ["ginkaku-ji", "pabellon de plata", "ginkakuji"],
  },
  "kiyomizu-dera": {
    shortName: "Kiyomizu-dera",
    keywords: ["kiyomizu-dera", "kiyomizudera", "escenario de kiyomizu"],
  },
  "arashiyama": {
    shortName: "Arashiyama y Bambú",
    keywords: ["arashiyama", "bosque de bambu", "otagi nenbutsu", "saga-toriimoto"],
  },
  "gion": {
    shortName: "Gion y Geishas",
    keywords: ["gion", "hanamikoji", "pontocho", "miyagawacho"],
  },
  "nishiki": {
    shortName: "Mercado Nishiki",
    keywords: ["mercado de nishiki", "nishiki market", "mercado nishiki"],
  },
  "osaka": {
    shortName: "Castillo de Osaka y Dotonbori",
    keywords: ["castillo de osaka", "dotonbori", "shinsekai", "morinomiya"],
  },
  "kenroku-en": {
    shortName: "Jardín Kenroku-en",
    keywords: ["kenroku-en", "kenrokuen", "jardin kenroku"],
  },
  "shirakawa-go": {
    shortName: "Shirakawa-go",
    keywords: ["shirakawa-go", "shirakawago", "ogimachi"],
  },
  "takayama": {
    shortName: "Takayama (Sanmachi)",
    keywords: ["sanmachi", "casco historico de takayama", "villa de takayama", "calles tradicionales de sanmachi"],
  },
  "nakasendo": {
    shortName: "Ruta Nakasendo",
    keywords: ["ruta nakasendo", "caminata nakasendo", "sendero nakasendo", "nakasendo"],
  },
  "senso-ji": {
    shortName: "Senso-ji y Asakusa",
    keywords: ["senso-ji", "sensoji", "kaminarimon", "templo senso"],
  },
  "meiji-jingu": {
    shortName: "Santuario Meiji",
    keywords: ["meiji", "meiji jingu", "santuario meiji"],
  },
  "shibuya": {
    shortName: "Shibuya",
    keywords: ["cruce de shibuya", "shibuya crossing", "miyashita park"],
  },
  "akihabara": {
    shortName: "Akihabara",
    keywords: ["electric town", "radio kaikan", "mandarake", "tarde en akihabara"],
  },
  "teamlab": {
    shortName: "Odaiba y teamLab",
    keywords: ["odaiba", "gundam", "rainbow bridge", "yurikamome"],
  },
  "fuji": {
    shortName: "Monte Fuji",
    keywords: ["chureito", "oshino hakkai", "aokigahara", "shiraito", "pagoda chureito", "kitaguchi hongu", "lagos del fuji"],
  },
};
