import { Compass, Route, Plane, Wallet } from "lucide-react";

const tabs = [
  { id: "hoy", label: "Hoy", icon: Compass },
  { id: "itinerario", label: "Itinerario", icon: Route },
  { id: "info", label: "Viaje", icon: Plane },
  { id: "presupuesto", label: "Presupuesto", icon: Wallet },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t"
      style={{
        background: "var(--paper-raised)",
        borderColor: "var(--line)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="max-w-lg mx-auto grid grid-cols-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className="flex flex-col items-center justify-center gap-1 py-2.5 transition-colors"
              style={{ color: isActive ? "var(--indigo)" : "var(--ink-soft)" }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="text-[11px] font-medium">{t.label}</span>
              <span
                className="h-[3px] w-5 rounded-full"
                style={{ background: isActive ? "var(--shu)" : "transparent" }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
