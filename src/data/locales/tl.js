// Superposición de traducción — tl
// Sólo contiene texto traducido; todo lo demás se hereda.

import { days } from "./trip_days_tl";
import { historyPeriods, furtherReading } from "./history_tl";
import { guides } from "./guides_tl";
import { popCulture } from "./popCulture_tl";
import { tripMeta, flights, blocks, stays, transports, budget } from "./trip_extra_tl";
import { stops as mapStops, filterData as mapFilterData, mapLabels } from "./mapData_tl";
import { weatherData, dailyWeather, weatherLabels } from "./weatherData_tl";

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
    { title: "Dapat subukan" },
    { title: "Ayon sa lugar ng biyahe" },
    { title: "Street & fast food" },
    { title: "Matamis & inumin" }
  ],
  foods: [
    { name: "Ramen", where: "Buong bansa · Ippudo at lokal na kainan", desc: "Noodles sa malinamnam na sabaw (shoyu, miso, tonkotsu...). Bawat lugar sa Japan ay may sariling istilo. Umorder ng kahit ano sa ticket machine o bar.", tip: "Sa maraming lugar, kailangan umorder sa vending machine: pumili, magbayad, at ibigay ang ticket sa chef." },
    { name: "Sushi / sashimi", where: "Toyosu, palengke, kaiten-zushi", desc: "Kanin na may suka at hilaw na isda (sushi) o yung isda lang (sashimi). Sulit sa Toyosu o sa magandang lokal na kainan.", tip: "Kadalasan, may wasabi na sa nigiri: hindi na kailangan maglagay pa. Ang luya ay pampatanggal umay sa pagitan ng mga piraso." },
    { name: "Tempura", where: "Kyoto, Tokyo", desc: "Magaan na piniritong gulay at seafood. May magagandang kainan sa Kyoto; madalas ding nasa daily menu (teishoku).", tip: "Isawsaw sa tentsuyu (sabaw) o budburan ng asin. Wag masyadong ibabad." },
    { name: "Tonkatsu", where: "Tokyo · Katsukura at katulad", desc: "Breaded pork cutlet, malutong sa labas at juicy sa loob. Karaniwang inihahain kasama ng kanin, miso, at ginayat na repolyo.", tip: "Durugin ang sauce sa sesame mortar sa inyong mesa: mas masarap." },
    { name: "Wagyu / yakiniku", where: "Takayama (Hida beef), Tokyo", desc: "Baka sa Japan na may matinding marbling. Sa Takayama, halos kasing-sarap ng Kobe ang Hida beef. Iniihaw sa mesa o sa steakhouse.", tip: "Maliliit na piraso: naluluto nang perpekto sa ilang segundo. Huwag hayaang masunog." },
    { name: "Okonomiyaki", where: "Osaka · Dotonbori / Shinsekai", desc: "Savory pancake na may repolyo, batter, at toppings (baboy, seafood...). Sa Osaka, ikaw mismo ang magluluto sa grill sa mesa.", tip: "Osaka style = ihalo lahat. Hiroshima style = naka-layers. Subukan ang sa Osaka sa biyaheng ito." },
    { name: "Takoyaki", where: "Osaka · street food", desc: "Balls of dough na may pusit, sauce, mayonnaise, at katsuobushi (smoked bonito na 'sumasayaw' sa init).", tip: "Mainit ito sa loob: dahan-dahan sa unang kagat." },
    { name: "Kushikatsu", where: "Osaka · Shinsekai", desc: "Breaded at deep-fried na tuhog (karne, gulay, keso...). Espesyalidad ng Shinsekai.", tip: "Sagradong patakaran: bawal isawsaw nang dalawang beses ang stick sa shared sauce (no double dipping)." },
    { name: "Kaiseki", where: "Kyoto", desc: "Seasonal tasting menu, kada putahe, at napakaganda sa paningin. Japanese haute cuisine na galing sa tea ceremony.", tip: "Kung gusto ng abot-kaya, maghanap ng 'kaiseki lunch' sa tanghali — mas mura kaysa sa hapunan." },
    { name: "Matcha at wagashi", where: "Kyoto · Uji / Gion", desc: "Hinalong powdered green tea at tradisyonal na matatamis (mochi, yokan...). Sa Kyoto, parang relihiyon ang matcha.", tip: "Ang pait ng matcha ay nababalanse ng tamis: kainin muna ang wagashi o sabay." },
    { name: "Hida beef bun / mitarashi", where: "Takayama · old town", desc: "Sa Sanmachi Suji: steamed buns na may Hida beef, mitarashi dango skewers, at lokal na sake.", tip: "Perpektong meryenda sa pagitan ng mga templo at kalye na gawa sa kahoy." },
    { name: "Unagi (igat)", where: "Tokyo, Kyoto", desc: "Inihaw na igat na may sweet-savory sauce sa ibabaw ng kanin (unadon / unaju). Gustong-gusto tuwing tag-init, pero kinakain buong taon.", tip: "Mahal pero isang kakaibang karanasan. Umorder ng unajū kung gusto mo ng buong lacquered box." },
    { name: "Onigiri", where: "Konbini (7-Eleven, FamilyMart, Lawson)", desc: "Trianggulong kanin na may palaman (salmon, umeboshi, tuna-mayo...) at balot ng nori. Perpektong almusal o meryenda.", tip: "Ang konbini wrapper ay may sikreto: hilahin ang tabs sa 1-2-3 na pagkakasunod-sunod para hindi mabasa ang damong-dagat." },
    { name: "Gyoza", where: "Mga ramen shop at izakaya", desc: "Pan-fried na dumplings, malutong sa isang gilid. Halos palaging may baboy at gulay.", tip: "Tipikal na sawsawan: toyo + suka + ilang patak ng rayu (chili oil)." },
    { name: "Yakitori", where: "Shinjuku · Omoide Yokocho, mga izakaya", desc: "Inihaw na manok (at iba pa) na tuhog, na may asin o tare sauce. Bagay na bagay sa beer sa pagtatapos ng araw.", tip: "Sa Omoide Yokocho ang ambiance ay ang putahe: masikip, mausok, at may neon lights." },
    { name: "Karaage", where: "Mga izakaya, konbini", desc: "Marinated fried chicken. Malutong, juicy, at nakakaadik. Napakaganda rin ng kalidad sa 7-Eleven.", tip: "Nag-iimprove kapag may Japanese mayonnaise (Kewpie)." },
    { name: "Udon / soba", where: "Mga istasyon, Kyoto, Tokyo", desc: "Udon = makapal na wheat noodles. Soba = buckwheat, mas manipis. Sa mainit na sabaw o malamig na may dip (zaru).", tip: "Mainit pa rin sa Setyembre: masarap ang malamig na zaru soba." },
    { name: "Ekiben", where: "Mga istasyon ng Shinkansen", desc: "Station bento, lokal na espesyalidad para kainin sa tren. Bahagi ng ritwal ng Shinkansen.", tip: "Maraming mabibili sa Nagoya o Tokyo Station bago mag-Nozomi. Bumili ng iba't iba sa bawat mahabang biyahe." },
    { name: "Taiyaki / mochi", where: "Asakusa, fairs, Nakamise", desc: "Taiyaki: fish-shaped waffle na may anko (sweet bean paste) o cream. Mochi: glutinous rice cake.", tip: "Sa Nakamise (Asakusa) may mga klasikal na stalls kung saan makakabili ng makakain habang naglalakad." },
    { name: "Sake / highball", where: "Mga izakaya, Takayama, Kyoto", desc: "Sake (nihonshu) malamig o mainit depende sa klase. Highball = whisky + soda, sikat at nakakarefresh.", tip: "Masarap ang lokal na sake sa Takayama. Umorder ng 'karakuchi' kung gusto mong mas dry." },
    { name: "Japanese breakfast", where: "Mga hotel, kissaten", desc: "Kanin, miso, inihaw na isda, natto o itlog, seaweed, at tsukemono. Kumpleto at malinamnam.", tip: "Kung inaalok ito sa hotel, subukan kahit isang araw. Murang alternatibo: onigiri + kape sa konbini." }
  ],
  pendingItems: [
    {
      id: "cena-magome",
      category: "logistica",
      urgency: "alta",
      title: "🔴 Kumpirmahin ang Hapunan sa Magome Chaya (Juan Carlos)",
      detail: "👤 Responsable: Juan Carlos\n📅 14/09/2026\n👥 5 mga tao\n🍱 Minshuku Dinner\n⏰ Oras: saktong 18:00\n📍 Magome Chaya\n⚠️ Kailangan ng kumpirmasyon. Dapat mag-email si Juan Carlos kay Jeng: 5 bisita, dating 14/09, oras 18:00. Walang hapunan kung walang kumpirmasyon (¥3,630/tao (~20€)).",
      deadline: "Gawin mo na ngayon (Juan Carlos)",
    },
    {
      id: "recogida-billetes-jrwest",
      title: "🎟️ KUNIN ANG JR-WEST TICKETS — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Inirerekomenda sa gabi)\n📍 Kyoto Station (Green machines 5489)\n🎟️ Kunin nang personal ang JR-West reservation #47932.\n⚠️ KAILANGAN:\n- Pisikal na Mastercard (**8625) na ginamit pambayad.\n- Reservation number (47932).\n- 4-digit Identification Number (PIN).",
      deadline: "11/09/2026",
    },
    {
      id: "shinano-recogida",
      category: "logistica",
      urgency: "alta",
      title: "🎫 KUNIN ANG PISIKAL NA TICKETS — Shinano 4 (BAYAD NA)",
      detail: "📅 15/09/2026 (o mas maaga sa JR-WEST station kung pwede)\n🚆 Shinano 4 · Nakatsugawa 09:57 → Nagoya 10:53\n🟢 Reserbasyon TAPOS: No. 42093 · Receipt AEE6606M · ¥14,350\n📍 Kunin SA LABAS ng gates\n⚠️ DALHIN: physical Mastercard **8625 · PIN = kaarawan ni Pablo · Reservation 42093\nPLAN B: sa Nakatsugawa ~08:40 (77 min bago umalis).",
      deadline: "Bago sumakay sa Shinano 4 (15/09 09:57)",
    },
    {
      id: "maletas-dimensiones",
      category: "logistica",
      urgency: "media",
      title: "🧳 Suriin ang sukat ng mga maleta",
      detail: "📅 Bago ang biyahe\n👥 5 maleta\n🚄 Relevant sa Shinkansen (hal. Nozomi 358 nabili na sa Ordinary Car)\n⚠️ Sukatin ang length + width + height:\n- ≤ 160 cm: OK nang walang special zone\n- >160 cm at ≤250 cm: kailangan ng oversized baggage seat\nHuwag baguhin ang existing bookings nang hindi sinusukat.",
      deadline: "Bago lumipad",
    },
    {
      id: "nozomi-vuelta-prep",
      category: "logistica",
      urgency: "media",
      title: "📱 Ihanda ang Smart EX access — Nozomi 358 (NABILI NA)",
      detail: "📅 15/09/2026\n🚄 Nozomi 358 · Nagoya 11:29 → Tokyo 13:06\n🟢 Reserbasyon TAPOS: Smart EX No. 2002 · ¥54,500 · Car 12\n📱 I-save ang QR-Ticket (pangunahing opsyon) o mag-designate ng IC card\n📧 Panatilihin ang Smart EX email/confirmation sa phone\n⚠️ HINDI mandatory JR-WEST-style physical pickup.",
      deadline: "Bago ang 15/09",
    },
    {
      id: "entradas-tokio",
      category: "reserva",
      urgency: "media",
      title: "🟠 Bumili ng mga tiket TeamLab / Shibuya Sky / Mori Tower",
      detail: "📅 Sa mga araw ng Tokyo (16-19 sept)\n👥 5 mga tao\n🎟️ Digital tickets\n📍 Tokyo\n⚠️ Mabilis maubos ang Shibuya Sky (sunset) at Mori Tower. Bumili sa unang araw ng pagbubukas (karaniwan 4 linggo bago sa hatinggabi sa Japan).",
      deadline: "4 linggo bago (~18/08/2026)",
    },
    {
      id: "shinkansen-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Mag-book ng Shinkansen Excursion Fuji (Round trip)",
      detail: "📅 20/09/2026\n👥 5 mga tao\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805 (Outbound 07:27) at balik Shin-Fuji→Tokyo\n📍 Tokyo ↔ Mishima / Shin-Fuji\n💳 Bumili: Smart EX App/Web\n⚠️ Excursion kasama si Ken confirmed na. Bumili sa Smart EX (1 buwan bago / 20 Agosto 10:00 JST). Umalis sa hotel ~06:30.",
      deadline: "1 buwan bago (20/08/2026)",
    },
    {
      id: "cena-takayama",
      category: "reserva",
      urgency: "media",
      title: "🟠 Mag-book ng Hapunan Hida Beef sa Takayama",
      detail: "📅 13/09/2026\n👥 5 mga tao\n🥩 Lokal na Wagyu/Hida beef restaurant\n⏰ Target: ~19:00\n📍 Takayama\n⚠️ Linggo ng gabi: maraming tindahan nagsasara nang 17:00. Highly recommended mag-book para makakain ang lima nang sabay.",
      deadline: "Bago maglakbay",
    },
    {
      id: "narita-transporte-vuelta",
      category: "reserva",
      urgency: "media",
      title: "🟠 Magdesisyon / Mag-book ng Transport papuntang Narita (Skyliner o N'EX)",
      detail: "📅 21/09/2026\n👥 5 mga tao\n🚆 Keisei Skyliner (Recommended mula Keisei-Ueno) o JR N'EX (mula Tokyo Station)\n📍 KOKO HOTEL Asakusa → Narita Airport\n💡 Mula Asakusa/Kappabashi, mas madaling taxi papuntang Keisei-Ueno tapos Skyliner. Valid pa rin ang N'EX.\n⚠️ Suriin ang Sept 2026 schedules at mag-book para sa flight 17:25.",
      deadline: "🟠 MAGDESISYON / MAG-BOOK",
    },
    {
      id: "esim-suica",
      category: "logistica",
      urgency: "media",
      title: "🟠 Digital Logistics: Suica at Visit Japan Web",
      detail: "📱 iPhone: official 'Welcome Suica Mobile' sa Apple Wallet.\n🤖 Foreign Android: walang Welcome Suica Mobile — bumili ng physical Welcome Suica sa Narita.\n💳 Welcome Suica: walang ¥500 (~3€) deposit; hindi refundable ang balance. Recommended top-up: ¥3,000–¥5,000 (~16–27€)/tao.\n🌐 Visit Japan Web: immigration/customs QR para sa lima.",
      deadline: "Ilang araw bago lumipad",
    },
    {
      id: "equipaje",
      category: "logistica",
      urgency: "baja",
      title: "🟡 Pamahalaan ang pagpapadala ng bagahe (Takkyubin)",
      detail: "📅 12/09/2026 (Umaga ng check-out)\n👥 5 malalaking maleta\n📦 Courier (Yamato/Sagawa)\n📍 Hotel Keihan Kyoto → KOKO HOTEL Residence Asakusa Kappabashi (Tokyo)\n⚠️ Ipadala ang malalaking maleta mula Kyoto papuntang Tokyo para bumiyahe sa Alps gamit lang ang backpack.",
      deadline: "12 Sept (umaga ng check-out)",
    },
    {
      id: "mochilas-magome",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Pagpapadala ng backpack Nakasendo (Magome ↔ Tsumago)",
      detail: "📅 14/09/2026\n📍 Magome Tourist Office (08:30–11:30)\n⚠️ Iwan ang bags sa Magome (¥500/piraso (~3€)) para sa 8 km hike; kunin sa Tsumago pagkatapos ng 13:00.",
      deadline: "14 Sept (parehong araw)",
    },
    {
      id: "desayunos",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Mga almusal sa convenience (Konbini)",
      detail: "📅 Gabi ng 7 Sept (Fushimi Inari) at 14 Sept (Magome para sa bus)\n📍 7-Eleven / Lawson / FamilyMart\n⚠️ Walang breakfast ang Magome Chaya; bumili gabi bago.",
      deadline: "7 at 14 Sept (parehong araw)",
    },
  ],
  categoryLabels: {
    reserva: { label: "Mga Booking" },
    logistica: { label: "Logistics" }
  },
  urgencyConfig: {
    alta: { label: "Urgent" },
    media: { label: "Importante" },
    baja: { label: "Kapag may oras" }
  }
};
