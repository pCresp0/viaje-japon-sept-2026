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
      id: "nozomi-ida",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Mag-book ng Shinkansen Nozomi (Outbound)",
      detail: "📅 07/09/2026\n👥 5 mga tao\n🚆 Shinkansen Nozomi\n⏰ Target na pag-alis: ~16:54\n📍 Shinagawa → Kyoto\n💳 Bumili: SmartEX App/Web\n⚠️ MANDATORY: Mga upuan na may 'Oversized Baggage' para sa malalaking maleta. Mag-book nang magkakasama (kanang window E seats para makita ang Fuji).",
      deadline: "1 buwan bago (07/08/2026 10:00 JST)",
    },
    {
      id: "recogida-billetes-jrwest",
      title: "🎟️ KUNIN ANG JR-WEST TICKETS — KYOTO → KANAZAWA",
      detail: "📅 11/09/2026 (Inirerekomenda sa gabi)\n📍 Kyoto Station (Green machines 5489)\n🎟️ Kunin nang personal ang JR-West reservation #47932.\n⚠️ KAILANGAN:\n- Pisikal na Mastercard (**8625) na ginamit pambayad.\n- Reservation number (47932).\n- 4-digit Identification Number (PIN).",
      deadline: "11/09/2026",
    },

    {
      id: "cena-magome",
      category: "logistica",
      urgency: "alta",
      title: "🔴 Kumpirmahin ang Hapunan sa Magome Chaya (Juan Carlos)",
      detail: "👤 Responsable: Juan Carlos\n📅 14/09/2026\n👥 5 mga tao\n🍱 Minshuku Dinner\n⏰ Oras: saktong 18:00\n📍 Magome Chaya\n⚠️ Kailangan ng kumpirmasyon ng accommodation para maghain ng hapunan. Dapat mag-email si Juan Carlos kay Jeng at sabihin: 5 bisita, dating 14/09, oras 18:00. Walang hapunan kung walang kumpirmasyon (¥3,630/tao).",
      deadline: "Gawin mo na ngayon (Juan Carlos)",
    },
    {
      id: "tour-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Mag-book ng Private Fuji Tour",
      detail: "📅 20/09/2026 (o mga nakaraang araw depende sa panahon)\n👥 5 mga tao\n🚐 Private mini-van kasama si Ken Kaneshima\n⏰ Buong araw\n📍 Tokyo ↔ Fuji Lakes\n⚠️ Ayon sa itinerary: Mag-book ng 3-4 araw at kanselahin ang mga araw na may pangit na panahon. Kontakin via web o telepono para kumpirmahin ang cancellation policy at i-block ang mga araw.",
      deadline: "Gawin ito sa lalong madaling panahon",
    },
    {
      id: "nozomi-vuelta",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Mag-book ng Shinkansen Nozomi (Return to Tokyo)",
      detail: "📅 15/09/2026\n👥 5 mga tao\n🚆 Shinkansen Nozomi\n⏰ Target na pag-alis: ~11:00\n📍 Nagoya → Tokyo\n💳 Bumili: SmartEX App/Web\n⚠️ MANDATORY: Mga upuan na may 'Oversized Baggage'.",
      deadline: "1 buwan bago (15/08/2026 10:00 JST)",
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
      id: "entradas-tokio",
      category: "reserva",
      urgency: "media",
      title: "🟠 Bumili ng mga tiket TeamLab / Shibuya Sky / Mori Tower",
      detail: "📅 Sa mga araw ng Tokyo (16-19 sept)\n👥 5 mga tao\n🎟️ Digital tickets\n📍 Tokyo\n⚠️ Mabilis maubos ang Shibuya Sky (sunset) at Mori Tower. Kung gusto pumunta ng grupo, kailangan bumili sa unang araw ng pagbubukas (karaniwan 4 linggo bago sa hatinggabi sa Japan).",
      deadline: "1 buwan bago",
    },
    {
      id: "esim-suica",
      category: "logistica",
      urgency: "media",
      title: "🟠 Digital Logistics: eSIM, Suica at Visit Japan Web",
      detail: "📅 Bago ang flight (Setyembre)\n👥 5 mga tao\n📱 Mobile\n⚠️ Bumili ng eSIMs at i-setup ang digital Suica sa Apple Wallet. Gumawa ng Visit Japan Web QR codes.",
      deadline: "Bago maglakbay",
    },
    {
      id: "equipaje",
      category: "logistica",
      urgency: "baja",
      title: "🟡 Pamahalaan ang pagpapadala ng bagahe (Takkyubin)",
      detail: "📅 12/09/2026 (Umaga)\n👥 5 malalaking maleta\n📦 Courier service (Yamato/Sagawa)\n📍 Kyoto Hotel → Tokyo Hotel\n⚠️ Kumpirmahin sa pag-check-in sa Kyoto kung pwede nilang ipadala diretso ang mga maleta sa Tokyo (Koko Hotel) para bumiyahe sa Alps gamit lang ang backpack. Itago ang mga resibo.",
      deadline: "Habang naglalakbay",
    },
    {
      id: "cena-takayama",
      category: "reserva",
      urgency: "baja",
      title: "🟡 Mag-book ng Hapunan para sa Hida Beef sa Takayama",
      detail: "📅 13/09/2026\n👥 5 mga tao\n🥩 Lokal na restaurant\n⏰ Target na pag-alis: ~19:00\n📍 Takayama\n⚠️ Linggo ngayon at maagang nagsasara ang mga tindahan sa Takayama (17:00). Napupuno ang mga sikat na restaurant. Para makakain ng wagyu/Hida beef nang sabay-sabay nang hindi pumipila, highly recommended ang pag-book.",
      deadline: "Bago maglakbay",
    },
    {
      id: "mochilas-magome",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Pagpapadala ng backpack Nakasendo (Magome ↔ Tsumago)",
      detail: "📅 14/09/2026\n📍 Magome Tourist Office (08:30–11:30)\n⚠️ Iwan ang mga backpack sa Magome para maglakad nang magaan pa-Tsumago. ~¥500 bawat piraso.",
      deadline: "Parehong araw",
    },
    {
      id: "desayunos",
      category: "logistica",
      urgency: "baja",
      title: "🟢 Mga almusal sa convenience",
      detail: "📅 Sept 7 (para sa Fushimi Inari) at Sept 14 (sa Magome para sa tren)\n📍 Lokal na konbini\n⚠️ Walang almusal ang accommodation sa Magome at masyadong maaga ang pag-alis pa-Fushimi Inari sa Araw 2. Bumili sa konbini gabi bago ang biyahe.",
      deadline: "Parehong araw",
    },
    {
      id: "shinkansen-fuji",
      category: "reserva",
      urgency: "alta",
      title: "🔴 Mag-book ng Shinkansen Kodama (Fuji Tour)",
      detail: "📅 20/09/2026\n👥 5 mga tao\n🚆 Tokaido-Sanyo Shinkansen KODAMA 805\n⏰ Target na pag-alis: 07:27\n📍 Tokyo → Mishima\n💳 Bumili: SmartEX App/Web\n⚠️ KINAKAILANGAN: Sumakay sa partikular na tren na ito para dumating sa oras ng pagkikita kasama ang guide na si Ken (08:25). Mag-book nang magkakasama.",
      deadline: "1 buwan bago"
    },
    {
      id: "narita-express",
      category: "reserva",
      urgency: "media",
      title: "🟠 Mag-book ng Narita Express (N'EX)",
      detail: "📅 07/09/2026 (Pagdating) at 21/09/2026 (Pag-alis)\n👥 5 mga tao\n🚆 JR Narita Express\n📍 Narita ↔ Tokyo/Shinagawa\n💳 Bumili: JR East Web o sa airport\n⚠️ Ang N'EX ay nangangailangan ng reserved seat. Maaari kang bumili pagdating, ngunit para sa 5 tao ay mas mabuting mag-book online para magkakasama.",
      deadline: "Bago bumiyahe"
    }
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
