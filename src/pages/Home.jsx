import { tripMeta, flights, blocks, days } from "../data/trip";
import { getTripStatus, formatDateLong, diffDays } from "../utils/date";
import DayCard from "../components/DayCard";
import RouteLine from "../components/RouteLine";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";

export default function Home({ onGoToDay }) {
  const status = getTripStatus();

  return (
    <div className="px-4 pt-5 pb-8 max-w-lg mx-auto space-y-5">
      <div>
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          {tripMeta.subtitle}
        </p>
        <h1 className="font-display text-3xl leading-tight" style={{ color: "var(--indigo)" }}>
          {tripMeta.title}
        </h1>
      </div>

      <RouteLine
        currentDay={status.day?.num}
        onSelectDay={onGoToDay}
      />

      {status.phase === "before" && <BeforeTrip daysUntil={status.daysUntil} />}
      {status.phase === "during" && status.day && (
        <div>
          <p className="eyebrow mb-2" style={{ color: "var(--ink-soft)" }}>
            Hoy
          </p>
          <DayCard day={status.day} defaultOpenHistory={false} />
        </div>
      )}
      {status.phase === "during" && !status.day && <TransitDay />}
      {status.phase === "after" && <AfterTrip />}
    </div>
  );
}

function BeforeTrip({ daysUntil }) {
  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "var(--indigo)" }}
      >
        <p className="eyebrow text-white/70">Faltan</p>
        <p className="font-display text-5xl text-white my-1">{daysUntil}</p>
        <p className="text-white/80 text-sm">
          {daysUntil === 1 ? "día para el despegue ✈️" : "días para el despegue ✈️"}
        </p>
      </div>
      <FlightCard flight={flights.out} icon={PlaneTakeoff} />
      <BlocksOverview />
    </div>
  );
}

function TransitDay() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
        <p className="eyebrow" style={{ color: "var(--shu)" }}>
          Hoy: día de viaje
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--ink)" }}>
          Salida hacia Japón — el itinerario detallado empieza al aterrizar.
        </p>
      </div>
      <FlightCard flight={flights.out} icon={PlaneTakeoff} />
    </div>
  );
}

function AfterTrip() {
  return (
    <div className="rounded-2xl p-6 text-center" style={{ background: "var(--indigo)" }}>
      <p className="font-display text-2xl text-white">お帰りなさい 🇯🇵</p>
      <p className="text-white/80 text-sm mt-2">
        El viaje ha terminado. Podéis seguir consultando el itinerario y el presupuesto cuando queráis recordarlo.
      </p>
    </div>
  );
}

function FlightCard({ flight, icon: Icon }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
      <div className="flex items-center gap-2" style={{ color: "var(--indigo)" }}>
        <Icon size={18} />
        <p className="eyebrow">{flight.label} · {flight.flightNumber}</p>
      </div>
      <p className="text-sm mt-2" style={{ color: "var(--ink)" }}>
        {flight.text}
      </p>
      <a
        href={flight.trackUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 text-sm font-medium"
        style={{ color: "var(--shu)" }}
      >
        Seguir vuelo en vivo ↗
      </a>
    </div>
  );
}

function BlocksOverview() {
  return (
    <div className="space-y-2">
      {blocks.map((b) => (
        <div
          key={b.id}
          className="rounded-xl p-4 flex items-start gap-3"
          style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}
        >
          <span className="text-xl leading-none mt-0.5">{b.emoji}</span>
          <div>
            <p className="font-medium text-sm" style={{ color: b.color }}>
              {b.title}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
              Días {b.days[0]}–{b.days[b.days.length - 1]} · {b.sleepSummary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
