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
    { title: "Mag-book ng Hida Express panoramic train (Takayama → Nagoya)", detail: "Araw 8 (Set 14): panoramic train mula Takayama papuntang Nagoya. Sikat sa Setyembre kaya nauubos agad ang upuan. Dahil walang JR Pass, bilhin ang tiket nang mas maaga.", deadline: "Ilang linggo bago" },
    { title: "Mag-book ng Thunderbird train (Kyoto → Kanazawa)", detail: "Araw 6 (Set 12): Thunderbird train Kyoto hanggang Kanazawa. Peak season ang Setyembre. Dahil walang JR Pass, bilhin ang tiket nang mas maaga.", deadline: "Ilang linggo bago" },
    { title: "Mag-book ng Shinkansen seats", detail: "Dalawang mahalagang bullet trains: Araw 1 Tokyo papuntang Kyoto at Araw 9 Nagoya papuntang Tokyo. Mag-book online at i-reserve ang upuan para sa malalaking bagahe.", deadline: "Ilang linggo bago" },
    { title: "Mag-book ng Narita Express (N'EX)", detail: "Tren mula airport papuntang siyudad (Araw 1) at pabalik (Araw 15). Walang JR Pass, mas mabuting mag-book online o pagdating sa airport.", deadline: "Bago dumating o sa airport" },
    { title: "Mag-book ng JR Shinano train", detail: "Araw 8 at 9: JR Shinano Limited Express sa pagitan ng Nagoya at Nakatsugawa. Inirerekomenda na i-book nang maaga dahil walang JR Pass.", deadline: "Ilang linggo bago" },
    { title: "Tingnan ang oras ng bus Magome → Nakatsugawa (Araw 9)", detail: "Umaga ng araw 9 (Set 15), sumakay ng bus. Madalang ang bus kaya tingnan ang oras. Papunta sa JR Shinano.", deadline: "Tingnan sa gabi ng Set 14" },
    { title: "I-ayos ang pagpapadala ng bagahe Kyoto → Tokyo", detail: "Umaga ng araw 6, ipadala ang malalaking maleta mula Kyoto hotel patungong Tokyo (Takkyubin).", deadline: "Kumpirmahin sa mga hotel" },
    { title: "Mag-book ng backpack forwarding Magome ↔ Tsumago", detail: "Luggage transport service sa Nakasendo trail. Kadalasang na-book sa tourist office sa parehong araw.", deadline: "Kumpirmahin bago" },
    { title: "Kumpirmahin ang hapunan sa Magome Chaya", detail: "Mag-reply sa email ni Jeng upang kumpirmahin ang hapunan para sa 5 sa 18:00 h at abisuhan kung may food allergies.", deadline: "Bago bumiyahe" },
    { title: "Bumili ng tickets online (TeamLab at Shibuya Sky)", detail: "Bumili na ng online tickets para sa teamLab museum at Shibuya Sky (sunset slot) dahil mabilis itong maubos.", deadline: "Sa lalong madaling panahon" },
    { title: "Internet at lokal na transportasyon", detail: "Bumili ng eSIMs (Airalo, Ubigi, atbp.) at idagdag ang digital Suica card nang direkta sa Apple Wallet para lagyan ng pondo.", deadline: "Bago bumiyahe" },
    { title: "Almusal sa Nakasendo route", detail: "Bumili ng almusal sa isang konbini sa Takayama o Nakatsugawa sa araw 14, dahil walang pagkain sa umaga sa rural inn.", deadline: "Araw 14 sa Japan" }
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
