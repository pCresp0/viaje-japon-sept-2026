import { useState } from "react";
import { Compass, Route, Plane, Wallet, X, Menu, CalendarDays, MessageCircle, Backpack, ShieldAlert, Train, Heart, Map, Cloud, Clock, ListTodo, Landmark, Hotel, UtensilsCrossed, Home, Info } from "lucide-react";
import { useT } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import GlobalSearch from "./GlobalSearch";

// El campo `labelKey` se resuelve en tiempo de render con la función de
// traducción, para que el menú cambie de idioma sin recargar la página.
export const tabs = [
  { id: "pendientes",   labelKey: "nav.pendientes",   descKey: "nav.desc.pendientes",   icon: ListTodo, alert: true },
  { id: "inicio",       labelKey: "nav.inicio",       descKey: "nav.desc.hoy",          icon: Home         },
  { id: "calendario",   labelKey: "nav.calendario",   descKey: "nav.desc.calendario",   icon: CalendarDays },
  { id: "itinerario",   labelKey: "nav.itinerario",   descKey: "nav.desc.itinerario",   icon: Route        },
  { id: "mapa",         labelKey: "nav.mapa",         descKey: "nav.desc.mapa",         icon: Map          },
  { id: "hoy",          labelKey: "nav.hoy",          descKey: "nav.desc.hoy",          icon: Compass      },
  { id: "vuelos",       labelKey: "nav.vuelos",       descKey: "nav.desc.vuelos",       icon: Plane        },
  { id: "hoteles",      labelKey: "nav.hoteles",      descKey: "nav.desc.hoteles",      icon: Hotel        },
  { id: "transportes",  labelKey: "nav.transportes",  descKey: "nav.desc.transportes",  icon: Train        },
  { id: "lugares",      labelKey: "nav.lugares",      descKey: "nav.desc.lugares",      icon: Heart        },
  { id: "comidas",      labelKey: "nav.comidas",      descKey: "nav.desc.comidas",      icon: UtensilsCrossed },
  { id: "clima",        labelKey: "nav.clima",        descKey: "nav.desc.hoy",          icon: Cloud        },
  { id: "historia",     labelKey: "nav.historia",     descKey: "nav.desc.historia",     icon: Landmark },
  { id: "frases",       labelKey: "nav.frases",       descKey: "nav.desc.frases",       icon: MessageCircle },
  { id: "preparativos", labelKey: "nav.preparativos", descKey: "nav.desc.preparativos", icon: Backpack     },
  { id: "presupuesto",  labelKey: "nav.presupuesto",  descKey: "nav.desc.presupuesto",  icon: Wallet       },
  { id: "herramientas", labelKey: "nav.herramientas", descKey: "nav.desc.herramientas", icon: Clock        },
  { id: "emergencias",  labelKey: "nav.emergencias",  descKey: "nav.desc.emergencias",  icon: ShieldAlert  },
  { id: "about",        labelKey: "nav.about",        descKey: "nav.desc.about",        icon: Info         },
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

// Cabecera / footer: mismas olas, overlay más opaco → patrón más atenuado
const chromeBg = {
  ...sidebarBg,
  position: "relative",
};

const chromeOverlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(160deg, rgba(77,28,30,0.97) 0%, rgba(122,44,46,0.95) 100%)",
  pointerEvents: "none",
};

function NavItems({ active, onChange, onClose }) {
  const t = useT();
  return tabs.map((tab) => {
    const Icon = tab.icon;
    const isActive = active === tab.id;
    return (
      <button
        key={tab.id}
        onClick={() => { onChange(tab.id); onClose?.(); }}
        className="flex items-center gap-3 w-full text-left transition-all"
        style={{
          padding: "11px 16px",
          borderRadius: 10,
          background: isActive
            ? "rgba(255,255,255,0.15)"
            : tab.alert ? "rgba(255,255,255,0.07)" : "transparent",
          color: isActive ? "#fff" : tab.alert ? "#fff" : "rgba(255,255,255,0.8)",
          borderLeft: isActive ? "3px solid #e8b74a" : "3px solid transparent",
          fontWeight: isActive || tab.alert ? 700 : 500,
          marginBottom: tab.alert ? 8 : 0,
        }}
      >
        <Icon size={17} strokeWidth={isActive || tab.alert ? 2.4 : 2} />
        <span style={{ fontSize: 14, letterSpacing: "0.01em" }}>{t(tab.labelKey)}</span>
        {tab.alert && <span className="alert-dot" aria-hidden="true" />}
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

          {/* nav — scrollable si hay más items de los que caben */}
          <nav className="flex flex-col gap-0.5 p-3"
            style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <NavItems active={active} onChange={onChange} onClose={onClose} />
          </nav>

        </div>
      </aside>
    </>
  );
}

/* ── Mobile top bar ──────────────────────────────────────────────── */
export function TopBar({ active, onOpenDrawer, onNavigate }) {
  const t = useT();
  const currentTab = tabs.find((tab) => tab.id === active);
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center gap-3 px-4"
      style={{
        height: "var(--mobile-topbar)",
        paddingTop: "env(safe-area-inset-top, 0px)",
        boxSizing: "border-box",
        zIndex: 150,
        backgroundColor: "var(--shu-darker)",
        ...chromeBg,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "none",
        // Sombra de color sólido: tapa franjas subpíxel sin desalinear el contenido
        boxShadow: "0 2px 0 0 var(--shu-darker), 0 4px 14px rgba(0,0,0,0.18)",
      }}
    >
      <div style={chromeOverlay} />
      <button onClick={onOpenDrawer}
        style={{ color: "rgba(255,255,255,0.8)", padding: 4, position: "relative", zIndex: 1 }}>
        <Menu size={21} />
      </button>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 20,
        fontWeight: 700, color: "#fff", flex: 1,
        letterSpacing: "0.01em",
        position: "relative", zIndex: 1,
        minWidth: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {currentTab ? t(currentTab.labelKey) : ""}
      </span>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        <GlobalSearch variant="bar" onNavigate={onNavigate} />
        <LanguageSwitcher variant="bar" />
      </div>
    </header>
  );
}

/* ── Desktop full-width top bar ──────────────────────────────────── */
export function DesktopTopBar({ active, onNavigate }) {
  const t = useT();
  const currentTab = tabs.find((tab) => tab.id === active);
  return (
    <header
      className="hidden md:flex items-center gap-4 px-5 shrink-0"
      style={{
        height: 56,
        boxSizing: "border-box",
        zIndex: 150,
        backgroundColor: "var(--shu-darker)",
        ...chromeBg,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
      }}
    >
      <div style={chromeOverlay} />
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", gap: 8,
        flex: 1, minWidth: 0,
      }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>🇯🇵</span>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 17,
          fontWeight: 700, color: "#fff", letterSpacing: "0.01em",
        }}>
          Japón 2026
        </span>
        {currentTab && (
          <>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, margin: "0 2px" }}>·</span>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 15,
              fontWeight: 600, color: "rgba(255,255,255,0.78)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {t(currentTab.labelKey)}
            </span>
          </>
        )}
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        <GlobalSearch variant="desktop" onNavigate={onNavigate} />
        <LanguageSwitcher variant="bar" />
      </div>
    </header>
  );
}

/* ── Desktop sidebar ─────────────────────────────────────────────── */
export function Sidebar({ active, onChange }) {
  return (
    <aside
      className="hidden md:flex flex-col h-full sticky top-0 shrink-0"
      style={{ width: 230, ...sidebarBg }}
    >
      <div style={{ ...overlay, display: "flex", flexDirection: "column" }}>
        <nav className="flex flex-col gap-0.5 p-3"
          style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingTop: 14 }}>
          <NavItems active={active} onChange={onChange} />
        </nav>
      </div>
    </aside>
  );
}

/* ── Mobile export ───────────────────────────────────────────────── */
export default function Nav({ active, onChange, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <TopBar active={active} onOpenDrawer={() => setOpen(true)} onNavigate={onNavigate} />
      <Drawer active={active} onChange={onChange} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
