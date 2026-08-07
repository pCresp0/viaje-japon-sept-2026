import { useState } from "react";
import { Heart, MapPin, Utensils, Coffee } from "lucide-react";
import GuideCard from "../components/GuideCard";

// Lugares que tienen guía detallada disponible (id del lugar → id de la guía)
const guideFor = {
  kiyomizu: "kiyomizu-dera",
  fushimi: "fushimi-inari",
  arashiyama: "arashiyama",
  kinkaku: "kinkaku-ji",
  ginkaku: "ginkaku-ji",
  senso: "senso-ji",
  meiji: "meiji-jingu",
};

const STORAGE_KEY = "trip-favorites-v1";

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveFavorites(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {}
}

const places = [
  {
    category: "Templos",
    icon: MapPin,
    color: "#bc4749",
    items: [
      { id: "kiyomizu", name: "Kiyomizu-dera", city: "Kioto", desc: "Templo de madera suspendido sobre acantilado — icónico." },
      { id: "fushimi", name: "Fushimi Inari", city: "Kioto", desc: "Miles de torii rojos — uno de los lugares más fotografiados de Japón." },
      { id: "arashiyama", name: "Arashiyama Bamboo Grove", city: "Kioto", desc: "Bosque de bambú — sereno y místico." },
      { id: "kinkaku", name: "Kinkaku-ji (Templo Dorado)", city: "Kioto", desc: "Pabellón cubierto de oro — espectacular reflejado en el agua." },
      { id: "ginkaku", name: "Ginkaku-ji (Templo Plateado)", city: "Kioto", desc: "Complemento del Dorado — diferente pero igualmente hermoso." },
      { id: "senso", name: "Senso-ji", city: "Tokio", desc: "Templo budista más antiguo de Tokio, en Asakusa." },
      { id: "meiji", name: "Meiji Jingu", city: "Tokio", desc: "Santuario sintoísta rodeado de bosque — muy tranquilo." },
      { id: "tsurugaoka", name: "Tsurugaoka Hachimangu", city: "Kamakura", desc: "Santuario histórico — si hay tiempo de parada." },
    ],
  },
  {
    category: "Restaurantes",
    icon: Utensils,
    color: "#2e7d5b",
    items: [
      { id: "sushi-sakura", name: "Sushi Sakura", city: "Kioto", desc: "Sushi fresco, ambiente tradicional." },
      { id: "okonomiyaki", name: "Okonomiyaki Kiji", city: "Kioto", desc: "Okonomiyaki casero — lo mejor de lo mejor." },
      { id: "sukiyaki-yama", name: "Sukiyaki Yamamoto", city: "Kioto", desc: "Sukiyaki de wagyu premium." },
      { id: "ramen-ippudo", name: "Ippudo Ramen", city: "Múltiples", desc: "Cadena buena, confiable, en varias ciudades." },
      { id: "tonkatsu-katsukura", name: "Tonkatsu Katsukura", city: "Tokio", desc: "Milanesa de cerdo crujiente — adictivo." },
      { id: "tsukiji-sushi", name: "Tsukiji Outer Market Sushi", city: "Tokio", desc: "Sushi al lado del mercado — ultra fresco." },
      { id: "kawakami", name: "Kawakami", city: "Takayama", desc: "Hida beef — carne local premium de la región." },
    ],
  },
  {
    category: "Cafeterías y Cafés",
    icon: Coffee,
    color: "#1d3557",
    items: [
      { id: "cafe-yusui", name: "Café Yusui", city: "Kioto", desc: "Café tradicional con vistas al río — ambiente perfecto." },
      { id: "vermillion-cafe", name: "Vermillion Café", city: "Kioto", desc: "Café moderno, buenas vistas de la ciudad." },
      { id: "starbucks-asakusa", name: "Starbucks Asakusa", city: "Tokio", desc: "Starbucks con vistas al Senso-ji — surreal." },
      { id: "blue-bottle", name: "Blue Bottle Coffee", city: "Tokio", desc: "Café de especialidad, ambiente hipster." },
      { id: "komeda", name: "Komeda Coffee", city: "Múltiples", desc: "Cadena japonesa asequible con buen ambiente." },
    ],
  },
];

export default function PlacesPage() {
  const [favorites, setFavorites] = useState(loadFavorites);

  function toggleFavorite(id) {
    const next = { ...favorites, [id]: !favorites[id] };
    setFavorites(next);
    saveFavorites(next);
  }

  const totalVisited = Object.values(favorites).filter(Boolean).length;
  const totalPlaces = places.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="mb-2">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Lugares imprescindibles</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Lugares favoritos</h2>
      </div>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 24 }}>
        {totalVisited} de {totalPlaces} visitados — pulsa el corazón para marcar.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
        gap: 20,
        alignItems: "start",
      }}>
        {places.map((category, catIdx) => {
          const Icon = category.icon;
          const categoryVisited = category.items.filter(i => favorites[i.id]).length;
          
          return (
            <div key={catIdx} className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
              {/* header */}
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
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{category.category}</p>
                </div>
                <span style={{
                  fontSize: 11.5, color: "white", fontWeight: 700,
                  background: "rgba(255,255,255,0.18)",
                  padding: "3px 9px", borderRadius: 20,
                }}>
                  {categoryVisited}/{category.items.length}
                </span>
              </div>

              {/* places */}
              {category.items.map((place, idx) => (
                <div
                  key={place.id}
                  style={{
                    borderTop: idx > 0 ? "1px solid var(--line)" : "none",
                    background: favorites[place.id] ? `${category.color}08` : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div className="flex items-start gap-3 w-full text-left px-5 py-4">
                    <button
                      onClick={() => toggleFavorite(place.id)}
                      aria-label={favorites[place.id] ? "Quitar de visitados" : "Marcar como visitado"}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        marginTop: 1,
                        flexShrink: 0,
                      }}
                    >
                      {favorites[place.id]
                        ? <Heart size={18} style={{ color: category.color, fill: category.color }} />
                        : <Heart size={18} style={{ color: "var(--line)", fill: "none" }} />
                      }
                    </button>

                    <div className="flex-1 min-w-0">
                      <p style={{
                        fontSize: 14, fontWeight: 700,
                        color: favorites[place.id] ? category.color : "var(--ink)",
                        textDecoration: favorites[place.id] ? "line-through" : "none",
                      }}>
                        {place.name}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 2 }}>
                        {place.city}
                      </p>
                      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                        {place.desc}
                      </p>

                      {guideFor[place.id] && (
                        <div style={{ marginTop: 10 }}>
                          <GuideCard id={guideFor[place.id]} accent={category.color} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
