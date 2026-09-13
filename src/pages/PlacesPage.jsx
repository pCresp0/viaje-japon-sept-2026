import { useState } from "react";
import { MapPin, Utensils, Coffee, Mountain, ChevronDown } from "lucide-react";
import GuideCard from "../components/GuideCard";
import { formatDateShort } from "../utils/date";
import { useT, useContent } from "../i18n/LanguageContext";

// Lugares que tienen guía detallada disponible (id del lugar → id de la guía)
const guideFor = {
  kiyomizu: "kiyomizu-dera",
  fushimi: "fushimi-inari",
  arashiyama: "arashiyama",
  kinkaku: "kinkaku-ji",
  ginkaku: "ginkaku-ji",
  senso: "senso-ji",
  meiji: "meiji-jingu",
  fuji: "fuji",
};

/** Orden cronológico del viaje. `day` = nº de día del itinerario (null = flexible / opcional). */
const places = [
  {
    category: "Templos",
    icon: MapPin,
    color: "#bc4749",
    items: [
      { id: "fushimi", name: "Fushimi Inari", city: "Kioto", day: 2, desc: "Miles de torii rojos — uno de los lugares más fotografiados de Japón." },
      { id: "kinkaku", name: "Kinkaku-ji (Templo Dorado)", city: "Kioto", day: 3, desc: "Pabellón cubierto de oro — espectacular reflejado en el agua." },
      { id: "arashiyama", name: "Arashiyama Bamboo Grove", city: "Kioto", day: 3, desc: "Bosque de bambú — sereno y místico." },
      { id: "ginkaku", name: "Ginkaku-ji (Templo Plateado)", city: "Kioto", day: 4, desc: "Complemento del Dorado — diferente pero igualmente hermoso." },
      { id: "kiyomizu", name: "Kiyomizu-dera", city: "Kioto", day: 5, desc: "Templo de madera suspendido sobre acantilado — icónico." },
      { id: "senso", name: "Senso-ji", city: "Tokio", day: 10, desc: "Templo budista más antiguo de Tokio, en Asakusa." },
      { id: "meiji", name: "Meiji Jingu", city: "Tokio", day: 11, desc: "Santuario sintoísta rodeado de bosque — muy tranquilo." },
      { id: "tsurugaoka", name: "Tsurugaoka Hachimangu", city: "Kamakura", day: null, desc: "Santuario histórico — si hay tiempo de parada." },
    ],
  },
  {
    category: "Restaurantes",
    icon: Utensils,
    color: "#2e7d5b",
    items: [
      { id: "sushi-sakura", name: "Sushi Sakura", city: "Kioto", day: 1, desc: "Sushi fresco, ambiente tradicional." },
      { id: "sukiyaki-yama", name: "Sukiyaki Yamamoto", city: "Kioto", day: 3, desc: "Sukiyaki de wagyu premium." },
      { id: "okonomiyaki", name: "Okonomiyaki Kiji", city: "Kioto", day: 4, desc: "Okonomiyaki casero — lo mejor de lo mejor." },
      { id: "kawakami", name: "Kawakami", city: "Takayama", day: 7, desc: "Hida beef — carne local premium de la región." },
      { id: "tonkatsu-katsukura", name: "Tonkatsu Katsukura", city: "Tokio", day: 11, desc: "Milanesa de cerdo crujiente — adictivo." },
      { id: "tsukiji-sushi", name: "Tsukiji Outer Market Sushi", city: "Tokio", day: 12, desc: "Sushi al lado del mercado — ultra fresco." },
      { id: "ramen-ippudo", name: "Ippudo Ramen", city: "Múltiples", day: null, desc: "Cadena buena, confiable, en varias ciudades." },
    ],
  },
  {
    category: "Cafeterías y Cafés",
    icon: Coffee,
    color: "#1d3557",
    items: [
      { id: "vermillion-cafe", name: "Vermillion Café", city: "Kioto", day: 2, desc: "Cerca de Fushimi Inari — café moderno con buenas vistas." },
      { id: "cafe-yusui", name: "Café Yusui", city: "Kioto", day: 4, desc: "Café tradicional con vistas al río — ambiente perfecto." },
      { id: "starbucks-asakusa", name: "Starbucks Asakusa", city: "Tokio", day: 10, desc: "Starbucks con vistas al Senso-ji — surreal." },
      { id: "blue-bottle", name: "Blue Bottle Coffee", city: "Tokio", day: 11, desc: "Café de especialidad, ambiente hipster." },
      { id: "komeda", name: "Komeda Coffee", city: "Múltiples", day: null, desc: "Cadena japonesa asequible con buen ambiente." },
    ],
  },
];

function sortByTripDay(items) {
  return [...items].sort((a, b) => {
    const da = a.day == null ? 999 : a.day;
    const db = b.day == null ? 999 : b.day;
    return da - db;
  });
}

export default function PlacesPage() {
  const t = useT();
  const { days } = useContent();
  const [gygOpen, setGygOpen] = useState(false);

  const dayByNum = Object.fromEntries(days.map((d) => [d.num, d]));

  function dayLabel(dayNum) {
    if (dayNum == null) return null;
    const d = dayByNum[dayNum];
    if (!d) return `Día ${dayNum}`;
    return `Día ${dayNum} · ${formatDateShort(d.date)}`;
  }

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("places.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("places.title")}</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.45, marginBottom: 0 }}>
          Ordenados según el itinerario del viaje.
        </p>
      </div>

      {/* 1. Excursión confirmada al Monte Fuji con GetYourGuide */}
      <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        <button
          type="button"
          onClick={() => setGygOpen((v) => !v)}
          className="w-full text-left flex items-center gap-3 px-5 py-4 border-none cursor-pointer"
          style={{ background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Mountain size={18} style={{ color: "white" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>
                Excursión GetYourGuide · Monte Fuji, Lago Kawaguchi y Chureito
              </p>
              <span style={{ background: "rgba(255,255,255,0.25)", color: "white", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                Confirmado
              </span>
            </div>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.9)", margin: 0 }}>
              Miércoles 16 de septiembre · Reserva ya confirmada, sin necesidad de cancelar nada
            </p>
          </div>
          <ChevronDown
            size={20}
            className={`shrink-0 transition-transform ${gygOpen ? "rotate-180" : ""}`}
            style={{ color: "rgba(255,255,255,0.9)" }}
          />
        </button>

        {gygOpen && (
        <div className="px-5 py-4 space-y-4">
          <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
            Reserva confirmada en GetYourGuide (Japan Visionary Tour) para el <strong>16 de septiembre</strong>. Comprobad de todos modos la visibilidad del Fuji esa mañana con las webcams, simplemente para saber qué esperar del día -- no hace falta cancelar ni reservar nada más.
          </p>

          {/* Reserva confirmada */}
          <div className="p-3.5 rounded-xl border flex flex-col justify-between" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Miércoles 16 Sept (08:30)</p>
              <p style={{ fontSize: 11.5, fontWeight: 600, color: "var(--forest)", marginTop: 3, marginBottom: 0 }}>
                ✅ Confirmada
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t" style={{ borderColor: "var(--line)" }}>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border" style={{ background: "rgba(2, 132, 199, 0.08)", borderColor: "rgba(2, 132, 199, 0.3)", color: "#0284c7" }}>
                GYGX7M7NZBNL
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded border" style={{ background: "var(--paper-raised)", borderColor: "var(--line)", color: "var(--ink-soft)" }}>
                PIN: 3342WSa=
              </span>
            </div>
          </div>

          {/* Logística y aviso de comida */}
          <div className="p-4 rounded-xl border space-y-2.5" style={{ background: "var(--paper)", borderColor: "rgba(2, 132, 199, 0.25)" }}>
            <p className="flex items-center gap-1.5" style={{ fontSize: 13, fontWeight: 700, color: "var(--indigo)", margin: 0 }}>
              <span>ℹ️</span> Información Clave de la Excursión (GetYourGuide):
            </p>
            <ul className="space-y-1.5 pl-4 list-disc" style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5, margin: 0 }}>
              <li><strong>Punto de encuentro:</strong> Tokyo Mode Gakuen (1-7-3 Nishishinjuku, Shinjuku). Llegar antes de las <strong>08:25 AM</strong> (salida a las 08:30 AM).</li>
              <li><strong>🍱 Comida NO incluida:</strong> La actividad no incluye comida. No está permitido comer dentro del autobús. Conviene comprar snacks/desayuno antes de subir y llevar <strong>efectivo ¥</strong> para comprar en los puestos locales de Oshino Hakkai y Saiko.</li>
              <li><strong>👟 400 escalones:</strong> Llevar calzado cómodo para subir al mirador de la Pagoda Chureito en el Parque Arakurayama Sengen.</li>
              <li><strong>Paradas incluidas:</strong> Lago Kawaguchiko y Parque Oishi, Aldea Saiko Iyashi-no-Sato Nemba (entrada incluida), Manantiales Oshino Hakkai y Pagoda Chureito.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://www.getyourguide.com/es-es/tokio-l193/tokio-monte-fuji-pagoda-chureito-lago-kawaguchi-y-oshino-hakkai-t792363/"
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition-opacity hover:opacity-85"
              style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--indigo)", textDecoration: "none" }}
            >
              🎟️ Ver Reserva en GetYourGuide ↗
            </a>
            <a
              href="https://www.google.com/maps/place/35.6916642,139.6969475/@35.6916642,139.6969475,16z"
              target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition-opacity hover:opacity-85"
              style={{ background: "var(--paper)", borderColor: "var(--line)", color: "var(--forest)", textDecoration: "none" }}
            >
              <img src="/icons/google-maps.png" alt="" width={14} height={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 2 }} />
              Punto de Encuentro en Maps (Tokyo Mode Gakuen) ↗
            </a>
          </div>
        </div>
        )}
      </div>


      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
        gap: 20,
        alignItems: "start",
      }}>
        {places.map((category, catIdx) => {
          const Icon = category.icon;
          const items = sortByTripDay(category.items);

          return (
            <div key={catIdx} className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
              <div className="flex items-center gap-3 px-5 py-4"
                style={{ background: category.color }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color: "white" }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>{category.category}</p>
                </div>
                <span style={{
                  fontSize: 11.5, color: "white", fontWeight: 700,
                  background: "rgba(255,255,255,0.18)",
                  padding: "3px 9px", borderRadius: 20,
                }}>
                  {items.length}
                </span>
              </div>

              {items.map((place, idx) => {
                const when = dayLabel(place.day);
                return (
                  <div
                    key={place.id}
                    style={{ borderTop: idx > 0 ? "1px solid var(--line)" : "none" }}
                  >
                    <div className="px-5 py-4">
                      <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                        {place.name}
                        <span style={{ fontWeight: 500, color: "var(--shu)", marginLeft: 4 }}>
                          {when ? `(${when})` : "(flexible)"}
                        </span>
                      </p>
                      <p style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 2 }}>
                        {place.city}
                      </p>
                      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>
                        {place.desc}
                      </p>

                      {guideFor[place.id] && (
                        <div style={{ marginTop: 10 }}>
                          <GuideCard id={guideFor[place.id]} accent={category.color} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
