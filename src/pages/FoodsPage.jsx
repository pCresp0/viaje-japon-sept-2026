import { useState, useEffect, useRef } from "react";
import { UtensilsCrossed, Store, Sparkles, ChevronRight, Info, Flame, Coffee, Tag, ShoppingBag, MapPin, ExternalLink } from "lucide-react";
import { useContent, useT } from "../i18n/LanguageContext";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

function FoodCard({ food, accent }) {
  const [imgOk, setImgOk] = useState(true);
  const t = useT();
  const { highlightId } = useHighlight();
  const anchorId = slug("food", food.id);
  const isHighlighted = highlightId === anchorId;
  const cardRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      const timer = window.setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [isHighlighted]);

  return (
    <article
      id={anchorId}
      ref={cardRef}
      className={"rounded-2xl overflow-hidden border flex flex-col justify-between" + (isHighlighted ? " search-highlight-pulse" : "")}
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

function KonbiniView() {
  const { konbiniChains, konbiniRules } = useContent();
  const t = useT();
  const [selectedChain, setSelectedChain] = useState("all");
  const { highlightId } = useHighlight();

  useEffect(() => {
    if (highlightId && highlightId.startsWith("konbini-")) {
      const el = document.getElementById(highlightId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      }
    }
  }, [highlightId]);

  return (
    <div>
      {/* Intro Konbinis */}
      <div
        className="rounded-2xl p-4 sm:p-5 mb-6 border"
        style={{
          background: "linear-gradient(135deg, rgba(29,53,87,0.05) 0%, rgba(188,71,73,0.04) 100%)",
          borderColor: "rgba(29,53,87,0.15)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Store size={20} style={{ color: "var(--shu)" }} />
          <h3 className="font-bold text-base sm:text-lg" style={{ color: "var(--indigo)", margin: 0 }}>
            {t("foods.konbiniTitle")}
          </h3>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
          {t("foods.konbiniIntro")}
        </p>

        {/* 4 Reglas de Oro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {konbiniRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl border flex gap-2.5 items-start"
              style={{ background: "var(--paper-raised)", borderColor: "rgba(0,0,0,0.06)" }}
            >
              <span className="text-lg leading-none mt-0.5">{rule.icon}</span>
              <div>
                <h4 className="text-xs font-bold mb-0.5" style={{ color: "var(--ink)" }}>{rule.title}</h4>
                <p className="text-[11.5px] leading-relaxed" style={{ color: "var(--ink-soft)", margin: 0 }}>
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selector de cadena rápida */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <button
          onClick={() => setSelectedChain("all")}
          className="px-3 py-1.5 rounded-full shrink-0 text-xs font-semibold transition-colors"
          style={{
            backgroundColor: selectedChain === "all" ? "var(--indigo)" : "rgba(0,0,0,0.04)",
            color: selectedChain === "all" ? "#fff" : "var(--ink)",
            border: selectedChain === "all" ? "1px solid var(--indigo)" : "1px solid rgba(0,0,0,0.08)",
            cursor: "pointer",
          }}
        >
          {t("foods.allChains")}
        </button>
        {konbiniChains.map((c) => {
          const isAct = selectedChain === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedChain(c.id)}
              className="px-3 py-1.5 rounded-full shrink-0 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              style={{
                backgroundColor: isAct ? c.themeColor : "rgba(0,0,0,0.04)",
                color: isAct ? "#ffffff" : "var(--ink)",
                border: `1px solid ${isAct ? c.themeColor : "rgba(0,0,0,0.08)"}`,
                cursor: "pointer",
              }}
            >
              {c.logo && (
                <span className="w-4 h-4 rounded-sm bg-white p-0.5 flex items-center justify-center shrink-0">
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                  />
                </span>
              )}
              <span>{c.id === "donki-supers" ? "Donki" : c.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Listado de Cadenas y Productos */}
      <div className="space-y-8">
        {konbiniChains
          .filter((c) => selectedChain === "all" || selectedChain === c.id)
          .map((chain) => (
            <section
              key={chain.id}
              id={`konbini-${chain.id}`}
              className="rounded-2xl border overflow-hidden p-4 sm:p-6"
              style={{
                background: "var(--paper-raised)",
                borderColor: chain.borderColor,
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
              }}
            >
              {/* Header de la Cadena */}
              <div className="border-b pb-4 mb-5" style={{ borderColor: "var(--line)" }}>
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {chain.logo && (
                      <div
                        className="h-8 px-2 py-1 rounded-xl bg-white border flex items-center justify-center shrink-0 shadow-xs"
                        style={{ borderColor: "rgba(0,0,0,0.08)" }}
                      >
                        <img
                          src={chain.logo}
                          alt={chain.name}
                          className="h-5 w-auto max-w-[75px] object-contain"
                          onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-black tracking-wider text-white uppercase shadow-sm"
                      style={{ backgroundColor: chain.themeColor }}
                    >
                      {chain.name}
                    </span>
                    <span className="text-xs font-medium" style={{ color: "var(--ink-soft)" }}>
                      {chain.jp}
                    </span>

                    {/* Botón Ver cercanos en Google Maps */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chain.mapQuery || chain.name)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-transform active:scale-95"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        color: "var(--ink)",
                        border: "1px solid var(--line)",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                        textDecoration: "none",
                      }}
                      title={t("foods.searchNearby", { chain: chain.name })}
                    >
                      <MapPin size={12} style={{ color: chain.themeColor }} />
                      <span>{t("foods.seeNearby")}</span>
                      <ExternalLink size={10} style={{ opacity: 0.55 }} />
                    </a>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background: chain.bgLight, color: chain.themeColor, border: `1px solid ${chain.borderColor}` }}
                  >
                    {chain.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm mt-2 leading-relaxed" style={{ color: "var(--ink)" }}>
                  {chain.vibe}
                </p>

                <div className="mt-3 flex flex-col sm:flex-row gap-2 text-[12px]">
                  <div
                    className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 border"
                    style={{
                      backgroundColor: "rgba(180, 83, 9, 0.08)",
                      borderColor: "rgba(180, 83, 9, 0.22)",
                      color: "var(--ink)",
                    }}
                  >
                    <span>🎯</span>
                    <span>
                      <strong style={{ color: "#b45309" }}>{t("foods.specialty")}</strong> {chain.specialty}
                    </span>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-lg flex items-center gap-1.5 border"
                    style={{
                      backgroundColor: "rgba(15, 118, 110, 0.08)",
                      borderColor: "rgba(15, 118, 110, 0.22)",
                      color: "var(--ink)",
                    }}
                  >
                    <span>💡</span>
                    <span>
                      <strong style={{ color: "#0f766e" }}>{t("foods.bestFor")}</strong> {chain.bestFor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items recomendados de la cadena */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                  gap: 14,
                }}
              >
                {chain.items.map((item, idx) => {
                  const itemId = slug("konbini", `${chain.id}-${idx}`);
                  return (
                    <div
                      key={idx}
                      id={itemId}
                      className="rounded-xl border p-4 flex flex-col justify-between"
                      style={{
                        background: "var(--paper)",
                        borderColor: "var(--line)",
                      }}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-sm sm:text-base leading-snug" style={{ color: "var(--ink)" }}>
                            {item.name}
                          </h4>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-1" style={{ background: "rgba(0,0,0,0.06)", color: "var(--ink)" }}>
                            {item.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11.5px] font-medium" style={{ color: "var(--ink-soft)" }}>
                            {item.jp}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${chain.themeColor}15`, color: chain.themeColor }}>
                            {item.tag}
                          </span>
                        </div>

                        {item.highlight && (
                          <div
                            className="text-[11.5px] font-medium px-2.5 py-1 rounded-md mb-2.5 border"
                            style={{
                              background: "rgba(217, 119, 6, 0.09)",
                              borderColor: "rgba(217, 119, 6, 0.25)",
                              color: "var(--ink)",
                            }}
                          >
                            <span className="font-bold" style={{ color: "#b45309" }}>{item.highlight}</span>
                          </div>
                        )}

                        <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--ink)" }}>
                          {item.desc}
                        </p>
                      </div>

                      {item.tip && (
                        <div
                          className="rounded-lg p-2.5 mt-2"
                          style={{ background: "var(--paper-raised)", borderLeft: `3px solid ${chain.themeColor}` }}
                        >
                          <p className="text-[11.5px] leading-snug m-0" style={{ color: "var(--ink-soft)" }}>
                            💡 <strong>{t("foods.tip")}</strong> {item.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}

export default function FoodsPage() {
  const { foods, foodCategories } = useContent();
  const [mainTab, setMainTab] = useState("konbini"); // "tradicional" o "konbini"
  const [filter, setFilter] = useState("all");
  const t = useT();
  const { highlightId } = useHighlight();

  useEffect(() => {
    if (highlightId) {
      if (highlightId.startsWith("konbini-")) {
        setMainTab("konbini");
      } else if (highlightId.startsWith("food-")) {
        setMainTab("tradicional");
      }
    }
  }, [highlightId]);

  const filterButtons = [
    { id: "all", label: t("foods.filterAll") },
    { id: "desayuno", label: t("foods.filterBreakfast") },
    { id: "comida", label: t("foods.filterMeal") },
    { id: "salado", label: t("foods.filterSalty") },
    { id: "dulce", label: t("foods.filterSweet") },
    { id: "bebida", label: t("foods.filterDrink") },
    { id: "street", label: t("foods.filterStreet") },
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

      {/* Selector de Pestaña Principal: Gastronomía Tradicional vs Konbinis & Markets */}
      <div className="flex gap-2 p-1 rounded-xl mb-5 max-w-md" style={{ background: "rgba(0,0,0,0.05)" }}>
        <button
          onClick={() => setMainTab("konbini")}
          className="flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
          style={{
            backgroundColor: mainTab === "konbini" ? "var(--paper-raised)" : "transparent",
            color: mainTab === "konbini" ? "var(--shu)" : "var(--ink-soft)",
            boxShadow: mainTab === "konbini" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Store size={15} />
          <span>{t("foods.tabKonbini")}</span>
        </button>

        <button
          onClick={() => setMainTab("tradicional")}
          className="flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
          style={{
            backgroundColor: mainTab === "tradicional" ? "var(--paper-raised)" : "transparent",
            color: mainTab === "tradicional" ? "var(--indigo)" : "var(--ink-soft)",
            boxShadow: mainTab === "tradicional" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <UtensilsCrossed size={15} />
          <span>{t("foods.tabTraditional")}</span>
        </button>
      </div>

      {/* Vista de Konbini */}
      {mainTab === "konbini" && <KonbiniView />}

      {/* Vista Tradicional */}
      {mainTab === "tradicional" && (
        <>
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
                {t("foods.showingResults", { count: filteredFoods.length })}
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
        </>
      )}
    </div>
  );
}

