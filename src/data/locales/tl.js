// Superposición de traducción — tl
// Sólo contiene texto traducido; todo lo demás se hereda.

export default {
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
    { title: "Mag-book ng Mount Fuji Tour (Ken Kaneshima)", detail: "Buong araw na tour kasama ang Spanish guide. Mag-book ng 3-4 na magkakasunod na araw at magpasya base sa panahon. Kumpirmahin ang cancellation policy.", deadline: "Ilang linggo bago ang biyahe — naghihintay ng booking" },
    { title: "Mag-book ng Hida Express panoramic train (Takayama → Nagoya)", detail: "Araw 8 (Set 14): panoramic train mula Takayama hanggang Nagoya. Sikat sa Setyembre, mabilis maubos ang reserved seats.", deadline: "Ilang linggo bago ang biyahe" },
    { title: "Mag-book ng Thunderbird train (Kyoto → Kanazawa)", detail: "Araw 6 (Set 12): Thunderbird train mula Kyoto papuntang Kanazawa. Peak season ang Setyembre sa Kanazawa.", deadline: "Ilang linggo bago ang biyahe" },
    { title: "Mag-book ng mga upuan sa Shinkansen", detail: "Dalawang mahalagang bullet train: Araw 1 (Set 7) Tokyo hanggang Kyoto at Araw 9 (Set 15) Nagoya hanggang Tokyo.", deadline: "Ayusin muna ang JR Pass, tapos mag-book ng maaga" },
    { title: "Suriin ang schedule ng bus Magome → Nakatsugawa (Araw 9)", detail: "Umaga ng araw 9 (Set 15), sumakay ng lokal na bus mula Magome papuntang Nakatsugawa station. Bihira ang mga bus.", deadline: "Suriin sa gabi ng Set 14" },
    { title: "Ayusin ang pagpapadala ng bagahe Kyoto → Tokyo", detail: "Umaga ng araw 6, ipadala ang malalaking maleta mula sa hotel sa Kyoto direkta sa Tokyo (Takkyubin). Maglakbay nang magaan sa Alps.", deadline: "Kumpirmahin sa parehong hotel bago bumiyahe" },
    { title: "Mag-book ng backpack forwarding Magome ↔ Tsumago", detail: "Serbisyo ng paglipat ng bagahe sa magkabilang dulo ng Nakasendo trail para magaan ang paglalakad.", deadline: "Kumpirmahin ang mga schedule bago ang Araw 8" },
    { title: "Kumpirmahin ang hapunan sa Magome Chaya", detail: "Ang lutong-bahay na hapunan sa minshuku (Araw 8) ay eksaktong 18:30 at bawal ang late. Ayusin ang oras ng paglalakad.", deadline: "Bago bumiyahe — kontakin ang Magome Chaya" },
    { title: "Magpasya kung bibili ng JR Pass", detail: "Paghambingin ang gastos sa indibidwal na tiket kumpara sa JR Pass. Kalkulahin ulit bago magdesisyon.", deadline: "Bago bumiyahe — binibili ang pass sa sariling bansa" },
    { title: "Bumili ng online tickets (TeamLab at mga museo)", detail: "Ang TeamLab ay may time-slots at mabilis maubos. Suriin din ang Roppongi observation deck.", deadline: "Ilang linggo bago, depende sa availability" }
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
