import { useState } from "react";
import { ChevronDown, BookOpen, Headphones, MapPinned, Scroll } from "lucide-react";
import { historyPeriods, furtherReading } from "../data/history";
import { guides } from "../data/guides";

function PeriodCard({ period, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border overflow-hidden mb-3"
      style={{ borderColor: open ? "var(--shu)44" : "var(--line)", background: "var(--paper-raised)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left flex items-start gap-3 px-5 py-4"
        style={{ background: open ? "var(--shu)0d" : "transparent" }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0, marginTop: 1,
          background: "var(--shu)18",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Scroll size={17} style={{ color: "var(--shu)" }} />
        </div>

        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--shu)", letterSpacing: "0.04em" }}>
            {period.era}
          </p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", marginTop: 1 }}>
            {period.title}
          </p>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 3 }}>
            {period.summary}
          </p>
        </div>

        <ChevronDown
          size={16}
          style={{
            color: "var(--shu)", flexShrink: 0, marginTop: 8,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {open && (
        <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
          {period.content.map((block, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--indigo)", marginBottom: 4 }}>
                {block.heading}
              </p>
              <p style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.7 }}>
                {block.text}
              </p>
            </div>
          ))}

          {period.seeOnTrip?.length > 0 && (
            <div style={{
              marginTop: 10, background: "var(--paper)", borderRadius: 10,
              padding: "12px 14px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <MapPinned size={13} style={{ color: "var(--forest)" }} />
                <span style={{
                  fontSize: 11, fontWeight: 700, color: "var(--ink-soft)",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  Lo veréis en el viaje
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {period.seeOnTrip.map((ref, i) => (
                  <div key={i} style={{ fontSize: 12.5, lineHeight: 1.55 }}>
                    <span style={{ fontWeight: 700, color: "var(--forest)" }}>
                      {guides[ref.id]?.name ?? ref.id}
                    </span>
                    <span style={{ color: "var(--ink)" }}> — {ref.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Para entender lo que vais a ver</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Historia de Japón
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
          Un recorrido por más de 2.000 años de historia japonesa, organizado por periodos, con referencias directas a los lugares concretos que vais a visitar durante el viaje. Pulsa cada periodo para desplegarlo.
        </p>
      </div>

      {historyPeriods.map((period) => (
        <PeriodCard key={period.id} period={period} />
      ))}

      {/* Further reading */}
      <div style={{ marginTop: 32 }}>
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Para profundizar</p>
        <h3 className="font-display text-xl" style={{ color: "var(--indigo)", marginBottom: 4 }}>
          Libros y podcasts recomendados
        </h3>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 16, lineHeight: 1.6 }}>
          Si alguna de estas historias os ha dejado con ganas de más, aquí tenéis por dónde seguir tirando del hilo.
        </p>

        {/* Books */}
        <div className="rounded-2xl border overflow-hidden mb-4"
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--indigo)" }}>
            <BookOpen size={16} color="#fff" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Libros</span>
          </div>
          {furtherReading.books.map((b, i) => (
            <div key={i} className="px-5 py-4"
              style={{ borderBottom: i < furtherReading.books.length - 1 ? "1px solid var(--line)" : "none" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{b.title}</p>
              <p style={{ fontSize: 12, color: "var(--shu)", fontWeight: 600, marginTop: 1, marginBottom: 5 }}>{b.author}</p>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{b.note}</p>
            </div>
          ))}
        </div>

        {/* Podcasts */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: "var(--forest)" }}>
            <Headphones size={16} color="#fff" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Podcasts</span>
          </div>
          {furtherReading.podcasts.map((p, i) => (
            <div key={i} className="px-5 py-4"
              style={{ borderBottom: i < furtherReading.podcasts.length - 1 ? "1px solid var(--line)" : "none" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{p.title}</p>
              <p style={{ fontSize: 12, color: "var(--forest)", fontWeight: 600, marginTop: 1, marginBottom: 5 }}>{p.show}</p>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
