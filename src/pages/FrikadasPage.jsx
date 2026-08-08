import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import { frikSections } from "../data/frikadas";

function SectionCard({ section, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl border overflow-hidden mb-3"
      style={{
        borderColor: isOpen ? section.color + "55" : "var(--line)",
        background: "var(--paper-raised)",
        transition: "border-color 0.2s",
      }}>
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-3 px-4 py-4"
        style={{ background: isOpen ? section.color + "14" : "transparent", transition: "background 0.2s" }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0, marginTop: 1,
          background: section.color + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 17,
        }}>
          {section.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>
            {section.label}
          </p>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 3 }}>
            {section.intro}
          </p>
        </div>

        <ChevronDown
          size={16}
          style={{
            color: section.color, flexShrink: 0, marginTop: 8,
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
          {section.items.map((item, i) => (
            <div key={i} style={{ marginBottom: i < section.items.length - 1 ? 20 : 0 }}>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: section.color, marginBottom: 6, lineHeight: 1.4 }}>
                {item.title}
              </p>
              <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FrikadasPage() {
  const t = useT();
  const [openId, setOpenId] = useState(null);

  function handleToggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("frikadas.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          {t("frikadas.title")} <Sparkles size={20} style={{ display: "inline", verticalAlign: -2, color: "var(--gold)" }} />
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
          Pokémon, Digimon, Dragon Ball y toda la cultura pop japonesa que tiene algo que ver con vuestra ruta —
          o que simplemente merece la pena saber por ser fan. Nombres siempre en español de España, y cuando hay
          un juego o una película concretos detrás, se cita por su nombre exacto. Pulsa cada apartado para desplegarlo.
        </p>
      </div>

      {frikSections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          isOpen={openId === section.id}
          onToggle={() => handleToggle(section.id)}
        />
      ))}
    </div>
  );
}
