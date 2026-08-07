import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { useContent, useT } from "../i18n/LanguageContext";

function FoodCard({ food, accent }) {
  const [imgOk, setImgOk] = useState(true);
  const t = useT();

  return (
    <article
      className="rounded-2xl overflow-hidden border flex flex-col justify-between"
      style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}
    >
      <div>
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
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg leading-tight" style={{ color: "var(--ink)" }}>
              {food.name}
            </h3>
            <span className="font-bold text-sm px-2 py-0.5 rounded-full shrink-0 ml-2" style={{ background: `${accent}15`, color: accent }}>
              {food.price}
            </span>
          </div>

          <p className="text-[12.5px] font-medium mb-2" style={{ color: "var(--ink-soft)" }}>
            {food.jp}
          </p>

          {/* Tags de tipo y momento de comida */}
          <div className="flex flex-wrap gap-1 mb-3">
            {food.meal?.includes("desayuno") && (
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(29,53,87,0.1)", color: "var(--indigo)" }}>
                ☕ Desayuno
              </span>
            )}
            {food.type === "salado" && (
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(188,71,73,0.1)", color: "var(--shu)" }}>
                🧂 Salado
              </span>
            )}
            {food.type === "dulce" && (
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(201,162,39,0.15)", color: "#b08500" }}>
                🍡 Dulce
              </span>
            )}
            {food.type === "bebida" && (
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(46,125,91,0.1)", color: "var(--forest)" }}>
                🍶 Bebida
              </span>
            )}
            {food.meal?.includes("comida") && (
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-soft)" }}>
                🍱 Comida
              </span>
            )}
            {food.meal?.includes("cena") && (
              <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.05)", color: "var(--ink-soft)" }}>
                🌙 Cena
              </span>
            )}
          </div>

          <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--ink)" }}>
            {food.desc}
          </p>

          <div className="flex gap-2 items-start mb-2">
            <span style={{ color: accent, marginTop: 2 }}><UtensilsCrossed size={14} /></span>
            <p className="text-xs font-medium" style={{ color: "var(--ink)" }}>
              <span className="opacity-70 mr-1">{t("foods.whereToTry")}:</span>
              {food.where}
            </p>
          </div>
        </div>
      </div>

      {food.tip && (
        <div className="px-4 pb-4">
          <p className="rounded-lg px-3 py-2" style={{
            fontSize: 12, margin: 0, lineHeight: 1.45,
            background: "var(--paper)", color: "var(--ink-soft)",
          }}>
            💡 {food.tip}
          </p>
        </div>
      )}
    </article>
  );
}

export default function FoodsPage() {
  const { foods, foodCategories } = useContent();
  const [filter, setFilter] = useState("all");
  const t = useT();

  const filterButtons = [
    { id: "all", label: "Todos" },
    { id: "desayuno", label: "☕ Desayuno" },
    { id: "comida", label: "🍱 Comida / Cena" },
    { id: "salado", label: "🧂 Salado" },
    { id: "dulce", label: "🍡 Dulce" },
    { id: "bebida", label: "🍶 Bebida" },
    { id: "street", label: "🍢 Callejero / Snack" },
  ];

  const filteredFoods = foods.filter((f) => {
    if (filter === "all") return true;
    if (filter === "desayuno") return f.meal?.includes("desayuno");
    if (filter === "comida") return f.meal?.includes("comida") || f.meal?.includes("cena");
    if (filter === "salado") return f.type === "salado";
    if (filter === "dulce") return f.type === "dulce";
    if (filter === "bebida") return f.type === "bebida";
    if (filter === "street") return f.category === "street" || f.meal?.includes("snack");
    return true;
  });

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-4">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("foods.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          {t("foods.title")}
        </h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.5 }}>
          {t("foods.intro")}
        </p>
      </div>

      {/* Barra de Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {filterButtons.map((btn) => {
          const isActive = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className="px-3.5 py-1.5 rounded-full shrink-0 transition-colors"
              style={{
                fontSize: 13,
                fontWeight: 500,
                backgroundColor: isActive ? "var(--shu)" : "rgba(0,0,0,0.04)",
                color: isActive ? "#ffffff" : "var(--ink)",
                border: isActive ? "1px solid var(--shu-deep)" : "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent"
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {filter === "all" ? (
        foodCategories.map((cat) => {
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                  gap: 14,
                }}
              >
                {items.map((food) => (
                  <FoodCard key={food.id} food={food} accent={cat.color} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <section className="mb-8">
          <p className="text-xs font-semibold mb-3" style={{ color: "var(--ink-soft)" }}>
            Mostrando {filteredFoods.length} resultados
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 14,
            }}
          >
            {filteredFoods.map((food) => {
              const cat = foodCategories.find((c) => c.id === food.category);
              return <FoodCard key={food.id} food={food} accent={cat?.color || "var(--shu)"} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}
