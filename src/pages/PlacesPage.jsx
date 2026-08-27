import { MapPin, Utensils, Coffee, Mountain } from "lucide-react";
import GuideCard from "../components/GuideCard";
import { days } from "../data/trip";
import { formatDateShort } from "../utils/date";
import { useT } from "../i18n/LanguageContext";

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

const dayByNum = Object.fromEntries(days.map((d) => [d.num, d]));

function dayLabel(dayNum) {
  if (dayNum == null) return null;
  const d = dayByNum[dayNum];
  if (!d) return `Día ${dayNum}`;
  return `Día ${dayNum} · ${formatDateShort(d.date)}`;
}

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
  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("places.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("places.title")}</h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.45, marginBottom: 0 }}>
          Ordenados según el itinerario del viaje.
        </p>
      </div>

      {/* Excursión Monte Fuji — destacada */}
      <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        <div className="flex items-center gap-3 px-5 py-4" style={{ background: "#1d3557" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Mountain size={18} style={{ color: "white" }} />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>
              Excursión Exclusiva al Monte Fuji{" "}
              <span style={{ fontWeight: 500, opacity: 0.85 }}>
                ({dayLabel(11)})
              </span>
            </p>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.7)", margin: 0 }}>
              Jueves 17 de septiembre · Tour de 8 horas en mini-van privada
            </p>
          </div>
        </div>

        <div className="px-5 py-4 space-y-4">
          <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.6, margin: 0 }}>
            Descubrid la esencia del Japón rural con este tour de día completo para grupos reducidos con <strong>guía oficial en español</strong> (Ken Kaneshima). Recorreremos la Pagoda Chureito, santuarios milenarios, aldeas tradicionales de paja, el místico bosque de lava y las cataratas de la falda del volcán.
          </p>

          {/* Quick specs grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 150px), 1fr))", gap: 10 }}>
            <div className="p-2.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2, fontWeight: 600 }}>Precio</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--shu)", margin: 0 }}>13.000 ¥ / pers.</p>
              <p style={{ fontSize: 9.5, color: "var(--ink-soft)", margin: 0 }}>Entradas + mini-van inc.</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2, fontWeight: 600 }}>Punto de inicio</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Mishima Sta. (08:20 AM)</p>
              <p style={{ fontSize: 9.5, color: "var(--ink-soft)", margin: 0 }}>Salida Sur · 50 min de Tokio</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2, fontWeight: 600 }}>Punto de fin</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Shin-Fuji Sta. (~17:30)</p>
              <p style={{ fontSize: 9.5, color: "var(--ink-soft)", margin: 0 }}>Tren bala · 60 min a Tokio</p>
            </div>
            <div className="p-2.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
              <p style={{ fontSize: 10, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2, fontWeight: 600 }}>Contacto Guía</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Ken Kaneshima</p>
              <a href="tel:+819058631635" style={{ fontSize: 10.5, color: "var(--indigo)", fontWeight: 600, textDecoration: "none" }}>+81 90-5863-1635</a>
            </div>
          </div>

          {/* Lugares a visitar */}
          <div className="p-3.5 rounded-xl border" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>🗺️ Itinerario del Tour (6 Paradas Principales):</p>
            <ol style={{ fontSize: 12, color: "var(--ink)", paddingLeft: 18, lineHeight: 1.6, margin: 0 }} className="space-y-1">
              <li><strong>Pagoda Chureito:</strong> La postal icónica de 5 pisos con el Monte Fuji de fondo.</li>
              <li><strong>Santuario Kitaguchi Hongu:</strong> Inicio histórico de peregrinos entre cedros gigantes milenarios.</li>
              <li><strong>Aldea Oshino Hakkai:</strong> Estanques cristalinos de agua de deshielo y casas de tejado de paja.</li>
              <li><strong>Comida típica (Houtou):</strong> Parada para probar los famosos fideos anchos en sopa caliente de miso.</li>
              <li><strong>Bosque de Aokigahara:</strong> El 'Mar de Árboles' sobre suelo de lava volcánica y raíces retorcidas.</li>
              <li><strong>Cataratas Shiraito & Lagos:</strong> Cascadas en hilos de seda blanca y ruta panorámica de lagos (Yamanakako, Saiko, Motosuko).</li>
            </ol>
          </div>

          {/* Herramientas de predicción de visibilidad y webcams */}
          <div className="rounded-xl p-3.5" style={{ background: "rgba(29,53,87,0.06)", border: "1px solid rgba(29,53,87,0.18)" }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--indigo)", marginBottom: 4 }}>
              📷 Predicción de Visibilidad y Cámaras Web en Directo
            </p>
            <p style={{ fontSize: 11.5, color: "var(--ink)", lineHeight: 1.5, marginBottom: 8 }}>
              <strong>La Regla de Oro:</strong> Las mañanas tempranas son la garantía. Abrid las webcams en directo desde el hotel a las <strong>06:30 AM</strong>; si la montaña no es visible a las 07:00 AM, es improbable que se despeje más tarde (a partir de las 09:00 AM el calor forma nubes).
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://isfujivisible.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border flex items-center gap-1"
                style={{ background: "white", borderColor: "var(--line)", color: "var(--indigo)", textDecoration: "none" }}
              >
                🌐 isfujivisible.com (Score 1-10) ↗
              </a>
              <a
                href="https://mtfujitoday.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border flex items-center gap-1"
                style={{ background: "white", borderColor: "var(--line)", color: "var(--forest)", textDecoration: "none" }}
              >
                📹 mtfujitoday.com (Webcams) ↗
              </a>
              <a
                href="https://excursionesfujiyama.com/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border flex items-center gap-1"
                style={{ background: "white", borderColor: "var(--line)", color: "var(--shu)", textDecoration: "none" }}
              >
                🚐 excursionesfujiyama.com ↗
              </a>
            </div>
          </div>

          <div style={{ marginTop: 4 }}>
            <GuideCard id="fuji" accent="#1d3557" />
          </div>
        </div>
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
