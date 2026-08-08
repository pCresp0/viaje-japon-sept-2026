import { AlertTriangle, CalendarDays, ExternalLink, MapPin, Ticket } from "lucide-react";
import { geekStops } from "../data/popCulture";
import { days } from "../data/trip";
import { useT } from "../i18n";

const styles = {
  "en-ruta": { label: "Ya está en la ruta", color: "#2e7d5b" },
  "desvio-corto": { label: "Desvío corto", color: "#1d6fb8" },
  "requiere-reserva": { label: "Reserva necesaria", color: "#b47808" },
  confirmar: { label: "Confirmar antes", color: "#a65a18" },
  "no-disponible": { label: "No estará disponible", color: "#bc4749" },
};

const dayInfo = Object.fromEntries(days.map((d) => [d.num, d]));

export function TripGeekStops() {
  const t = useT();
  return (
    <section className="mt-8">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("geek.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("geek.title")}</h2>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.55 }}>
          Cada parada está cruzada con el día real de la ruta: qué relación tiene, si pasáis por allí y qué hay que reservar.
        </p>
      </div>

      <div className="rounded-2xl p-4 mb-6 flex gap-3" style={{ background: "rgba(188,71,73,.08)", border: "1px solid rgba(188,71,73,.25)" }}>
        <AlertTriangle size={19} style={{ color: "var(--shu)", flexShrink: 0, marginTop: 2 }} />
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink)", lineHeight: 1.55 }}>
          Datos revisados para septiembre de 2026. Las tiendas y exposiciones temporales pueden cambiar: las tarjetas con <strong>«Confirmar antes»</strong> deben revisarse en su enlace oficial antes de salir.
        </p>
      </div>

      <div className="space-y-4">
        {geekStops.map((stop) => {
          const day = dayInfo[stop.day];
          const state = styles[stop.status];
          return (
            <article key={stop.id} className="rounded-2xl overflow-hidden border" style={{ borderColor: state.color + "55", background: "var(--paper-raised)" }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ background: state.color + "12", borderBottom: `1px solid ${state.color}30` }}>
                <CalendarDays size={15} style={{ color: state.color }} />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Día {stop.day} · {day?.weekday} {day?.date.slice(8)} sept</span>
                <span style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 700, color: "white", background: state.color, padding: "3px 8px", borderRadius: 99 }}>{state.label}</span>
              </div>
              <div className="p-4">
                <p className="eyebrow" style={{ color: state.color, marginBottom: 4 }}>{stop.franchise}</p>
                <h3 style={{ color: "var(--indigo)", fontSize: 17, lineHeight: 1.25, margin: 0 }}>{stop.title}</h3>
                <p className="flex items-center gap-1.5" style={{ color: "var(--ink-soft)", fontSize: 12.5, margin: "7px 0 13px" }}><MapPin size={14} />{stop.place}</p>
                <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.55, margin: "0 0 10px" }}><strong>La conexión:</strong> {stop.relation}</p>
                <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.55, margin: "0 0 10px" }}><strong>En vuestro día:</strong> {stop.plan}</p>
                <div className="rounded-xl p-3 flex gap-2" style={{ background: "rgba(29,53,87,.055)" }}>
                  <Ticket size={15} style={{ color: "var(--indigo)", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, margin: 0 }}>{stop.access}</p>
                </div>
                <a href={stop.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-3" style={{ color: "var(--shu)", fontSize: 12.5, fontWeight: 700, textDecoration: "none" }}>
                  Consultar fuente oficial <ExternalLink size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function GeekPage() {
  return <div className="px-4 pt-3 pb-12"><TripGeekStops /></div>;
}
