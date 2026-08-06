import { useState } from "react";
import { Compass, Route, Plane, Wallet, X, Menu } from "lucide-react";

const tabs = [
  { id: "hoy",          label: "Hoy",          icon: Compass },
  { id: "itinerario",   label: "Itinerario",   icon: Route   },
  { id: "info",         label: "Viaje",         icon: Plane   },
  { id: "presupuesto",  label: "Presupuesto",  icon: Wallet  },
];

/* ── Drawer (mobile) ─────────────────────────────────────────────────── */
function Drawer({ active, onChange, open, onClose }) {
  return (
    <>
      {/* backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={onClose}
        />
      )}

      {/* panel */}
      <aside
        className="fixed top-0 left-0 h-full z-50 flex flex-col"
        style={{
          width: 240,
          background: "var(--indigo)",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "4px 0 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* header */}
        <div
          className="flex items-center justify-between px-5 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🇯🇵</span>
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-display)" }}
            >
              Japón 2026
            </span>
          </div>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.6)" }}>
            <X size={20} />
          </button>
        </div>

        {/* items */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { onChange(t.id); onClose(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                style={{
                  background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                  borderLeft: isActive ? "3px solid var(--shu)" : "3px solid transparent",
                }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* footer */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            6 – 22 septiembre 2026
          </p>
        </div>
      </aside>
    </>
  );
}

/* ── Mobile top bar ──────────────────────────────────────────────────── */
export function TopBar({ active, onOpenDrawer }) {
  const currentTab = tabs.find((t) => t.id === active);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4"
      style={{
        height: 56,
        background: "var(--indigo)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.2)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <button
        onClick={onOpenDrawer}
        className="flex items-center justify-center rounded-lg"
        style={{ color: "rgba(255,255,255,0.85)", width: 36, height: 36 }}
      >
        <Menu size={22} />
      </button>
      <span
        className="text-sm font-semibold tracking-wide"
        style={{ color: "#fff", fontFamily: "var(--font-display)" }}
      >
        {currentTab?.label}
      </span>
      <span className="ml-auto text-lg">🇯🇵</span>
    </header>
  );
}

/* ── Desktop sidebar ─────────────────────────────────────────────────── */
export function Sidebar({ active, onChange }) {
  return (
    <aside
      className="hidden md:flex flex-col h-screen sticky top-0"
      style={{
        width: 220,
        minWidth: 220,
        background: "var(--indigo)",
        boxShadow: "2px 0 16px rgba(0,0,0,0.12)",
      }}
    >
      {/* logo */}
      <div
        className="flex items-center gap-3 px-6 py-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <span className="text-2xl">🇯🇵</span>
        <div>
          <p
            className="text-sm font-bold"
            style={{ color: "#fff", fontFamily: "var(--font-display)" }}
          >
            Japón 2026
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Sept 6 – 22
          </p>
        </div>
      </div>

      {/* nav items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
              style={{
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                borderLeft: isActive ? "3px solid var(--shu)" : "3px solid transparent",
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Grupo de 5 · Qatar Airways
        </p>
      </div>
    </aside>
  );
}

/* ── Combined export (mobile uses Drawer + TopBar) ───────────────────── */
export default function Nav({ active, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* mobile */}
      <div className="md:hidden">
        <TopBar active={active} onOpenDrawer={() => setOpen(true)} />
        <Drawer active={active} onChange={onChange} open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}
