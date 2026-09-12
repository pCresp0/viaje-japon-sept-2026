import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PlaceText from "./PlaceText";
import { useT } from "../i18n/LanguageContext";

// Marcadores que indican el inicio del bloque de "detalles técnicos"
// (Suica, reserva, compra, consejo, podcast...) que se pliega bajo el
// desplegable. En cuanto aparece el PRIMERO de estos, todo lo que va
// después (incluido él) pasa a la parte plegable -- lo de antes (la
// descripción, el "dónde subir", avisos importantes...) se queda
// siempre visible.
const DETAIL_MARKERS = [
  /🎫\s*\*\*SUICA/i,
  /📅\s*\*\*RESERVA/i,
  /🛒\s*\*\*COMPRA/i,
  /💡\s*Tip:/i,
  /🎧\s*\*\*Podcast/i,
];

function findSplitIndex(text) {
  let earliest = -1;
  for (const marker of DETAIL_MARKERS) {
    const m = text.match(marker);
    if (m && m.index != null) {
      if (earliest === -1 || m.index < earliest) earliest = m.index;
    }
  }
  return earliest;
}

/**
 * Muestra el texto de una parada del horario, separando lo esencial
 * (siempre visible) del bloque de detalles técnicos de transporte
 * (Suica, reserva, compra, tip, podcast), que se oculta tras un
 * desplegable "Ver más detalles" para no saturar la vista a simple
 * vista. Si el texto no tiene ninguno de esos marcadores (no es una
 * parada de transporte con ese formato), se muestra entero, igual
 * que antes.
 */
export default function ScheduleEntryBody({ text, textClassName, textStyle, linkStyle }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const splitIdx = findSplitIndex(text);

  if (splitIdx === -1) {
    return (
      <PlaceText as="p" text={text} className={textClassName} style={textStyle} linkStyle={linkStyle} />
    );
  }

  const mainText = text.slice(0, splitIdx).trim();
  const detailText = text.slice(splitIdx).trim();

  return (
    <div>
      {mainText && (
        <PlaceText as="p" text={mainText} className={textClassName} style={textStyle} linkStyle={linkStyle} />
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 mt-1.5 text-[12px] font-bold"
        style={{ color: "var(--shu)" }}
      >
        <ChevronDown size={13} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
        {open ? t("schedule.hideDetails") : t("schedule.showDetails")}
      </button>
      {open && (
        <div className="mt-1.5 pt-2" style={{ borderTop: "1px dashed var(--line)" }}>
          <PlaceText as="p" text={detailText} className={textClassName} style={textStyle} linkStyle={linkStyle} />
        </div>
      )}
    </div>
  );
}
