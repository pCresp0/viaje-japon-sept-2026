import { useState } from "react";
import { Compass, Route, Plane, Wallet, X, Menu, CalendarDays, MessageCircle, Backpack, ShieldAlert, Train, Heart, Map, Cloud, Clock, ListTodo, Landmark } from "lucide-react";

export const tabs = [
  { id: "pendientes",   label: "Cosas pendientes", icon: ListTodo, alert: true },
  { id: "historia",     label: "Historia de Japón", icon: Landmark },
  { id: "hoy",          label: "Hoy",          icon: Compass      },
  { id: "calendario",   label: "Calendario",   icon: CalendarDays },
  { id: "itinerario",   label: "Itinerario",   icon: Route        },
  { id: "info",         label: "Viaje",        icon: Plane        },
  { id: "transporte",   label: "Transporte",   icon: Train        },
  { id: "presupuesto",  label: "Presupuesto",  icon: Wallet       },
  { id: "lugares",      label: "Lugares",      icon: Heart        },
  { id: "mapa",         label: "Mapa",         icon: Map          },
  { id: "clima",        label: "Clima",        icon: Cloud        },
  { id: "frases",       label: "Frases",       icon: MessageCircle },
  { id: "preparativos", label: "Preparativos", icon: Backpack     },
  { id: "herramientas", label: "Herramientas", icon: Clock        },
  { id: "emergencias",  label: "Emergencias",  icon: ShieldAlert  },
];

const sidebarBg = {
  backgroundImage: "url('/waves-sidebar.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center top",
};

const overlay = {
  position: "absolute", inset: 0,
  background: "linear-gradient(160deg, rgba(77,28,30,0.94) 0%, rgba(122,44,46,0.89) 100%)",
};

function NavItems({ active, onChange, onClose }) {
  return tabs.map((t) => {
    const Icon = t.icon;
    const isActive = active === t.id;
    return (
      <button
        key={t.id}
        onClick={() => { onChange(t.id); onClose?.(); }}
        className="flex items-center gap-3 w-full text-left transition-all"
        style={{
          padding: "11px 16px",
          borderRadius: 10,
          background: isActive
            ? "rgba(255,255,255,0.15)"
            : t.alert ? "rgba(255,255,255,0.07)" : "transparent",
          color: isActive ? "#fff" : t.alert ? "#fff" : "rgba(255,255,255,0.8)",
          borderLeft: isActive ? "3px solid #e8b74a" : "3px solid transparent",
          fontWeight: isActive || t.alert ? 700 : 500,
          marginBottom: t.alert ? 8 : 0,
        }}
      >
        <Icon size={17} strokeWidth={isActive || t.alert ? 2.4 : 2} />
        <span style={{ fontSize: 14, letterSpacing: "0.01em" }}>{t.label}</span>
        {t.alert && <span className="alert-dot" aria-hidden="true" />}
      </button>
    );
  });
}

/* ── Drawer (mobile) ─────────────────────────────────────────────── */
function Drawer({ active, onChange, open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)", zIndex: 200 }}
          onClick={onClose}
        />
      )}
      <aside
        className="fixed top-0 left-0 h-full flex flex-col"
        style={{
          width: 252,
          zIndex: 210,
          ...sidebarBg,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "6px 0 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div style={{ ...overlay, display: "flex", flexDirection: "column" }}>
          {/* header */}
          <div className="flex items-center justify-between px-5 pt-12 pb-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ fontSize: 20 }}>🇯🇵</span>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 15,
                  fontWeight: 700, color: "#fff", letterSpacing: "0.02em"
                }}>Japón 2026</span>
              </div>
            </div>
            <button onClick={onClose}
              style={{ color: "rgba(255,255,255,0.5)", padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* nav */}
          <nav className="flex flex-col gap-0.5 p-3 flex-1">
            <NavItems active={active} onChange={onChange} onClose={onClose} />
          </nav>

        </div>
      </aside>
    </>
  );
}

/* ── Mobile top bar ──────────────────────────────────────────────── */
export function TopBar({ active, onOpenDrawer }) {
  const currentTab = tabs.find((t) => t.id === active);
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center gap-3 px-4"
      style={{
        height: 58,
        zIndex: 150,
        background: "var(--shu-darker)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <button onClick={onOpenDrawer}
        style={{ color: "rgba(255,255,255,0.8)", padding: 4 }}>
        <Menu size={21} />
      </button>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 20,
        fontWeight: 700, color: "#fff", flex: 1,
        letterSpacing: "0.01em",
      }}>
        {currentTab?.label}
      </span>
      <span style={{ fontSize: 20 }}>🇯🇵</span>
    </header>
  );
}

/* ── Desktop sidebar ─────────────────────────────────────────────── */
export function Sidebar({ active, onChange }) {
  return (
    <aside
      className="hidden md:flex flex-col h-screen sticky top-0 shrink-0"
      style={{ width: 230, ...sidebarBg }}
    >
      <div style={{ ...overlay, display: "flex", flexDirection: "column" }}>
        {/* logo */}
        <div className="px-6 pt-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: 22 }}>🇯🇵</span>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 16,
              fontWeight: 700, color: "#fff",
            }}>Japón 2026</span>
          </div>
        </div>

        {/* nav */}
        <nav className="flex flex-col gap-0.5 p-3 flex-1">
          <NavItems active={active} onChange={onChange} />
        </nav>

      </div>
    </aside>
  );
}

/* ── Mobile export ───────────────────────────────────────────────── */
export default function Nav({ active, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <TopBar active={active} onOpenDrawer={() => setOpen(true)} />
      <Drawer active={active} onChange={onChange} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
