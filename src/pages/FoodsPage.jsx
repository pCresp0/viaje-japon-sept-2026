import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { foods, foodCategories } from "../data/foods";

function FoodCard({ food, accent }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <article
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      <div
        style={{
          height: 160,
          background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {imgOk ? (
          <img
            src={food.image}
            alt={food.name}
            onError={() => setImgOk(false)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            color: accent, opacity: 0.45, fontFamily: "var(--font-display)", fontSize: 28,
          }}>
            {food.jp.split("·")[0].trim().slice(0, 4)}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg" style={{ color: "var(--indigo)", margin: 0, lineHeight: 1.2 }}>
            {food.name}
          </h3>
          {food.price && (
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--shu)", whiteSpace: "nowrap" }}>
              {food.price}
            </span>
          )}
        </div>
        <p style={{ fontSize: 12, color: "var(--ink-soft)", margin: "4px 0 0" }}>{food.jp}</p>
        <p style={{ fontSize: 12, color: accent, fontWeight: 600, margin: "6px 0 0" }}>{food.where}</p>
        <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.5, margin: "10px 0 0" }}>
          {food.desc}
        </p>
        {food.tip && (
          <p className="rounded-lg px-3 py-2 mt-3" style={{
            fontSize: 12.5, margin: "10px 0 0", lineHeight: 1.45,
            background: "var(--paper)", color: "var(--ink-soft)",
          }}>
            💡 {food.tip}
          </p>
        )}
      </div>
    </article>
  );
}

export default function FoodsPage() {
  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Gastronomía</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Comidas típicas
        </h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          Qué probar en el viaje, dónde encaja en la ruta y un tip práctico.
        </p>
      </div>

      {foodCategories.map((cat) => {
        const items = foods.filter((f) => f.category === cat.id);
        if (!items.length) return null;
        return (
          <section key={cat.id} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed size={16} style={{ color: cat.color }} />
              <h3 className="eyebrow" style={{ color: cat.color, margin: 0 }}>{cat.title}</h3>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                gap: 14,
              }}
            >
              {items.map((food) => (
                <FoodCard key={food.id} food={food} accent={cat.color} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
