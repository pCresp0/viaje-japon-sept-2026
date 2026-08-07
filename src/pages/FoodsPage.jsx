import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { useContent, useT } from "../i18n/LanguageContext";

function FoodCard({ food, accent }) {
  const [imgOk, setImgOk] = useState(true);
  const t = useT();

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
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg leading-tight" style={{ color: "var(--ink)" }}>
                {food.name}
              </h3>
              <span className="font-bold text-sm px-2 py-0.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>
                {food.price}
              </span>
            </div>
            
            <p className="text-[12.5px] font-medium mb-3" style={{ color: "var(--ink-soft)" }}>
              {food.jp}
            </p>

            <div className="flex gap-2 items-start mb-3">
              <span style={{ color: accent, marginTop: 2 }}><UtensilsCrossed size={14} /></span>
              <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                <span className="opacity-70 mr-1">{t("foods.whereToTry")}:</span>
                {food.where}
              </p>
            </div>
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
  const { foods, foodCategories } = useContent();
  const [activeCat, setActiveCat] = useState("must");
  const t = useT();
  
  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("foods.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          {t("foods.title")}
        </h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          {t("foods.intro")}
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
