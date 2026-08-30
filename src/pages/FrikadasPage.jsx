import { useState, useEffect, useRef } from "react";
import { AlertTriangle, CalendarDays, ChevronDown, ExternalLink, MapPin, Sparkles, Ticket } from "lucide-react";
import { useT, useContent } from "../i18n/LanguageContext";
import { frikSections } from "../data/frikadas";
import { geekStops } from "../data/popCulture";
import { stopStyle, stopsBySection, standaloneStops } from "../data/geekRouteMap";
import { useHighlight } from "../context/HighlightContext";
import { slug } from "../utils/slug";

const stopById = Object.fromEntries(geekStops.map((stop) => [stop.id, stop]));

function RouteStop({ stop, day }) {
  const state = stopStyle[stop.status];
  return (
    <article className="rounded-xl overflow-hidden border mt-4" style={{ borderColor: state.color + "55", background: "var(--paper)" }}>
      <div className="px-3 py-2 flex items-center gap-2" style={{ background: state.color + "12", borderBottom: `1px solid ${state.color}30` }}>
        <CalendarDays size={14} style={{ color: state.color }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Día {stop.day} · {day?.weekday} {day?.date.slice(8)} sept</span>
        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "white", background: state.color, padding: "3px 7px", borderRadius: 99 }}>{state.label}</span>
      </div>
      <div className="p-3.5">
        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--indigo)", margin: 0 }}>{stop.title}</p>
        <p className="flex items-center gap-1.5" style={{ color: "var(--ink-soft)", fontSize: 12, margin: "6px 0 10px" }}><MapPin size={13} />{stop.place}</p>
        <p style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.55, margin: "0 0 8px" }}><strong>En vuestro día:</strong> {stop.plan}</p>
        <div className="rounded-lg p-2.5 flex gap-2" style={{ background: "rgba(29,53,87,.055)" }}>
          <Ticket size={14} style={{ color: "var(--indigo)", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.45, margin: 0 }}>{stop.access}</p>
        </div>
        <a href={stop.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-2.5" style={{ color: "var(--shu)", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
          Fuente oficial <ExternalLink size={12} />
        </a>
      </div>
    </article>
  );
}

function SectionCard({ section, stops = [], isOpen, onToggle }) {
  const { highlightId } = useHighlight();
  const anchorId = slug("frikadas", section.id);
  const ref = useRef(null);
  const isHighlighted = highlightId === anchorId;

  useEffect(() => {
    if (isHighlighted && ref.current) {
      const t = window.setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
  }, [isHighlighted]);

  return (
    <div
      id={anchorId}
      ref={ref}
      className={"rounded-2xl border overflow-hidden mb-3" + (isHighlighted ? " search-highlight-pulse" : "")}
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
          {stops.map((stop) => <RouteStop key={stop.id} stop={stop} day={dayInfo[stop.day]} />)}
        </div>
      )}
    </div>
  );
}

export default function FrikadasPage() {
  const t = useT();
  const { days } = useContent();
  const dayInfo = Object.fromEntries(days.map((day) => [day.num, day]));
  const [openId, setOpenId] = useState(null);
  const { highlightId } = useHighlight();

  function handleToggle(id) {
    setOpenId((current) => (current === id ? null : id));
  }

  // Si llegamos desde una búsqueda que apunta a una sección de Frikadas,
  // se abre automáticamente ese acordeón (si venía cerrado) antes de que
  // SectionCard intente hacer scroll hasta él.
  useEffect(() => {
    if (!highlightId) return;
    const match = highlightId.match(/^frikadas-(.+)$/);
    if (match) setOpenId(match[1]);
  }, [highlightId]);

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

      <div className="rounded-xl p-3 mb-5 flex gap-2" style={{ background: "rgba(188,71,73,.08)", border: "1px solid rgba(188,71,73,.22)" }}>
        <AlertTriangle size={16} style={{ color: "var(--shu)", flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5 }}>En cada franquicia, las tarjetas de ruta indican el día, si realmente pasáis por allí y si hace falta entrada o reserva. Comprueba antes los avisos marcados como «Confirmar antes».</p>
      </div>

      {frikSections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          stops={(stopsBySection[section.id] || []).map((id) => stopById[id])}
          isOpen={openId === section.id}
          onToggle={() => handleToggle(section.id)}
        />
      ))}

      <SectionCard
        section={{ id: "ruta-especial", label: "Gundam y arte digital", emoji: "🤖", color: "#4b5c84", intro: "Dos experiencias de la ruta que no pertenecen a las franquicias anteriores." , items: [] }}
        stops={standaloneStops.map((id) => stopById[id])}
        isOpen={openId === "ruta-especial"}
        onToggle={() => handleToggle("ruta-especial")}
      />
    </div>
  );
}
