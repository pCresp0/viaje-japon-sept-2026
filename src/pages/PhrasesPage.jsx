import { useState } from "react";
import { MessageCircle, Utensils, TrainFront, ShoppingBag, Info, Volume2 } from "lucide-react";
import { useJapaneseSpeech } from "../utils/useJapaneseSpeech";
import { Highlightable } from "../context/HighlightContext";
import { slug } from "../utils/slug";

export const categories = [
  {
    id: "basics",
    title: "Básicos",
    icon: MessageCircle,
    color: "#bc4749",
    phrases: [
      { jp: "こんにちは", romaji: "Konnichiwa", es: "Hola (buenas tardes)" },
      { jp: "おはようございます", romaji: "Ohayou gozaimasu", es: "Buenos días" },
      { jp: "こんばんは", romaji: "Konbanwa", es: "Buenas noches (al llegar)" },
      { jp: "ありがとうございます", romaji: "Arigatou gozaimasu", es: "Muchas gracias" },
      { jp: "すみません", romaji: "Sumimasen", es: "Perdón / disculpe (también para llamar la atención)" },
      { jp: "お願いします", romaji: "Onegaishimasu", es: "Por favor" },
      { jp: "はい / いいえ", romaji: "Hai / Iie", es: "Sí / No" },
      { jp: "わかりません", romaji: "Wakarimasen", es: "No lo entiendo" },
      { jp: "英語を話せますか？", romaji: "Eigo wo hanasemasu ka?", es: "¿Habla inglés?" },
      { jp: "トイレはどこですか？", romaji: "Toire wa doko desu ka?", es: "¿Dónde está el baño?" },
    ],
  },
  {
    id: "restaurant",
    title: "En el restaurante",
    icon: Utensils,
    color: "#2e7d5b",
    phrases: [
      { jp: "いただきます", romaji: "Itadakimasu", es: "Se dice antes de empezar a comer" },
      { jp: "ごちそうさまでした", romaji: "Gochisousama deshita", es: "Se dice al terminar de comer, dando las gracias" },
      { jp: "メニューをお願いします", romaji: "Menyuu wo onegaishimasu", es: "La carta, por favor" },
      { jp: "おすすめは何ですか？", romaji: "Osusume wa nan desu ka?", es: "¿Qué recomienda?" },
      { jp: "お会計お願いします", romaji: "Okaikei onegaishimasu", es: "La cuenta, por favor" },
      { jp: "美味しかったです", romaji: "Oishikatta desu", es: "Estaba delicioso" },
    ],
  },
  {
    id: "transport",
    title: "En transporte",
    icon: TrainFront,
    color: "#1d3557",
    phrases: [
      { jp: "駅はどこですか？", romaji: "Eki wa doko desu ka?", es: "¿Dónde está la estación?" },
      { jp: "この電車は〜に行きますか？", romaji: "Kono densha wa ~ ni ikimasu ka?", es: "¿Este tren va a...?" },
      { jp: "次の駅は何ですか？", romaji: "Tsugi no eki wa nan desu ka?", es: "¿Cuál es la próxima parada?" },
      { jp: "切符はどこで買えますか？", romaji: "Kippu wa doko de kaemasu ka?", es: "¿Dónde puedo comprar billetes?" },
    ],
  },
  {
    id: "shopping",
    title: "De compras",
    icon: ShoppingBag,
    color: "#c9a227",
    phrases: [
      { jp: "いくらですか？", romaji: "Ikura desu ka?", es: "¿Cuánto cuesta?" },
      { jp: "これをください", romaji: "Kore wo kudasai", es: "Esto, por favor (para pedir/comprar)" },
      { jp: "カードは使えますか？", romaji: "Kaado wa tsukaemasu ka?", es: "¿Puedo pagar con tarjeta?" },
      { jp: "免税できますか？", romaji: "Menzei dekimasu ka?", es: "¿Se puede desgravar el IVA (tax-free)?" },
    ],
  },
];

export const etiquette = [
  { title: "Propinas", text: "No se dan propinas en Japón — ni en restaurantes, ni en taxis, ni en hoteles. Insistir puede resultar incluso incómodo para quien la recibe." },
  { title: "Palillos", text: "Nunca se clavan verticalmente en el arroz (recuerda a los rituales funerarios) ni se pasa comida de palillos a palillos." },
  { title: "Volumen y móvil", text: "En el transporte público se habla bajo y las llamadas de teléfono están mal vistas. El modo silencio es la norma." },
  { title: "Zapatos", text: "Se descalzan al entrar en muchos restaurantes tradicionales, templos, ryokan y algunas casas. Fijaos si hay zapatero en la entrada." },
  { title: "Colas", text: "Los japoneses hacen cola de forma ordenada para todo — trenes, ascensores, tiendas. Se respeta el orden estrictamente." },
  { title: "Onsen (baños termales)", text: "Hay que ducharse a fondo antes de entrar al agua. Los tatuajes grandes pueden estar prohibidos en algunos onsen tradicionales." },
  { title: "Comer andando", text: "No está bien visto comer mientras se camina por la calle, salvo en zonas específicas de food stalls (como Nishiki o algunos festivales)." },
  { title: "Fumar", text: "No se puede fumar en la calle salvo en zonas designadas — sí se puede en muchos bares e izakayas." },
];

export default function PhrasesPage() {
  const [activeCategory, setActiveCategory] = useState("basics");
  const current = categories.find(c => c.id === activeCategory);
  const { supported, speakingId, lastError, speak } = useJapaneseSpeech();

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Idioma y cultura</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Frases y etiqueta
        </h2>
        {supported && (
          <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 6 }}>
            Pulsa <Volume2 size={12} style={{ display: "inline", verticalAlign: -1 }} /> junto a cualquier frase para escuchar la pronunciación real en japonés.
          </p>
        )}
        {lastError && (
          <div style={{
            marginTop: 10, padding: "8px 12px", borderRadius: 8,
            background: "#bc474915", border: "1px solid #bc474933",
          }}>
            <p style={{ fontSize: 11.5, color: "var(--shu)", lineHeight: 1.5, margin: 0 }}>
              No se ha podido reproducir el audio ({lastError}). Si estás en iPhone, comprueba que el interruptor lateral de silencio esté desactivado y que el volumen esté subido — la lectura en voz no suena con el móvil en silencio.
            </p>
          </div>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all"
              style={{
                background: isActive ? cat.color : "var(--paper-raised)",
                border: `1px solid ${isActive ? cat.color : "var(--line)"}`,
                color: isActive ? "#fff" : "var(--ink-soft)",
                fontSize: 13, fontWeight: 600,
              }}
            >
              <Icon size={14} />
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Phrase list */}
      <div className="rounded-2xl border overflow-hidden mb-10"
        style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        {current.phrases.map((p, idx) => {
          const id = `${current.id}-${idx}`;
          const isSpeaking = speakingId === id;
          return (
            <Highlightable key={idx} id={slug("phrase", current.id, p.romaji)}>
            <div className="px-5 py-4 flex items-start gap-3"
              style={{ borderBottom: idx < current.phrases.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span style={{ fontSize: 17, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                    {p.jp}
                  </span>
                  <span style={{ fontSize: 12, color: current.color, fontWeight: 600, fontStyle: "italic", whiteSpace: "nowrap" }}>
                    {p.romaji}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{p.es}</p>
              </div>

              {supported && (
                <button
                  onClick={() => speak(p.jp, id)}
                  aria-label={`Escuchar "${p.jp}" en japonés`}
                  className="speaker-btn"
                  style={{
                    flexShrink: 0, marginTop: 2,
                    width: 34, height: 34, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isSpeaking ? current.color : `${current.color}1c`,
                    border: `1.5px solid ${isSpeaking ? current.color : current.color + "40"}`,
                    boxShadow: isSpeaking
                      ? `0 2px 8px ${current.color}55`
                      : "0 1px 3px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}
                >
                  <Volume2
                    size={16}
                    style={{ color: isSpeaking ? "#fff" : current.color }}
                    className={isSpeaking ? "speaking-pulse" : ""}
                  />
                </button>
              )}
            </div>
            </Highlightable>
          );
        })}
      </div>

      {/* Etiquette section */}
      <div className="mb-4 flex items-center gap-2">
        <Info size={16} style={{ color: "var(--indigo)" }} />
        <p className="eyebrow" style={{ color: "var(--ink-soft)", margin: 0 }}>Normas de etiqueta</p>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {etiquette.map((e, idx) => (
          <Highlightable key={idx} id={slug("etiquette", e.title)}>
          <div className="rounded-xl p-4"
            style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
            <p style={{ fontSize: 13.5, fontWeight: 700, color: "var(--indigo)", marginBottom: 4 }}>{e.title}</p>
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>{e.text}</p>
          </div>
          </Highlightable>
        ))}
      </div>
    </div>
  );
}
