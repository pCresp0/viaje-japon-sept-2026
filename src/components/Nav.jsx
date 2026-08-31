import { useState, useEffect } from "react";
import { Compass, Route, Plane, Wallet, X, Menu, CalendarDays, MessageCircle, Backpack, ShieldAlert, Train, Heart, Map, Cloud, Clock, ListTodo, Landmark, Hotel, UtensilsCrossed, Home, Info, Sparkles, ChevronDown, ChevronRight } from "lucide-react";
import { useT } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import GlobalSearch from "./GlobalSearch";

// El campo `labelKey` se resuelve en tiempo de render con la función de
// traducción, para que el menú cambie de idioma sin recargar la página.
export const navStructure = [
  { type: "item", id: "pendientes", labelKey: "nav.pendientes", descKey: "nav.desc.pendientes", icon: ListTodo, alert: true },
  { type: "item", id: "inicio", labelKey: "nav.inicio", descKey: "nav.desc.hoy", icon: Home },
  { type: "item", id: "hoy", labelKey: "nav.hoy", descKey: "nav.desc.hoy", icon: Compass },
  
  { type: "group", id: "plan", labelKey: "nav.group.plan", items: [
      { id: "calendario", labelKey: "nav.calendario", descKey: "nav.desc.calendario", icon: CalendarDays },
      { id: "itinerario", labelKey: "nav.itinerario", descKey: "nav.desc.itinerario", icon: Route },
      { id: "mapa", labelKey: "nav.mapa", descKey: "nav.desc.mapa", icon: Map },
    ]
  },
  { type: "group", id: "viaje", labelKey: "nav.group.viaje", items: [
      { id: "vuelos", labelKey: "nav.vuelos", descKey: "nav.desc.vuelos", icon: Plane },
      { id: "hoteles", labelKey: "nav.hoteles", descKey: "nav.desc.hoteles", icon: Hotel },
      { id: "transportes", labelKey: "nav.transportes", descKey: "nav.desc.transportes", icon: Train },
    ]
  },
  { type: "group", id: "guia", labelKey: "nav.group.guia", items: [
      { id: "lugares", labelKey: "nav.lugares", descKey: "nav.desc.lugares", icon: Heart },
      { id: "comidas", labelKey: "nav.comidas", descKey: "nav.desc.comidas", icon: UtensilsCrossed },
      { id: "clima", labelKey: "nav.clima", descKey: "nav.desc.hoy", icon: Cloud },
      { id: "historia", labelKey: "nav.historia", descKey: "nav.desc.historia", icon: Landmark },
      { id: "frases", labelKey: "nav.frases", descKey: "nav.desc.frases", icon: MessageCircle },
    ]
  },
  { type: "group", id: "prep", labelKey: "nav.group.prep", items: [
      { id: "preparativos", labelKey: "nav.preparativos", descKey: "nav.desc.preparativos", icon: Backpack },
      { id: "presupuesto", labelKey: "nav.presupuesto", descKey: "nav.desc.presupuesto", icon: Wallet },
    ]
  },
  { type: "group", id: "util", labelKey: "nav.group.util", items: [
      { id: "herramientas", labelKey: "nav.herramientas", descKey: "nav.desc.herramientas", icon: Clock },
      { id: "emergencias", labelKey: "nav.emergencias", descKey: "nav.desc.emergencias", icon: ShieldAlert },
    ]
  },
  
  { type: "item", id: "frikadas", labelKey: "nav.frikadas", descKey: "nav.desc.frikadas", icon: Sparkles },
  { type: "item", id: "about", labelKey: "nav.about", descKey: "nav.desc.about", icon: Info },
];

export const tabs = navStructure.reduce((acc, curr) => {
  if (curr.type === "item") acc.push(curr);
  else if (curr.type === "group") acc.push(...curr.items);
  return acc;
}, []);

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

function NavItems({ active, onChange, onClose, isMobile }) {
  const t = useT();
  const [openGroup, setOpenGroup] = useState(null);

  // Auto-expand active group on mount/change in mobile
  useEffect(() => {
    if (isMobile) {
      for (const node of navStructure) {
        if (node.type === "group" && node.items.some(i => i.id === active)) {
          setOpenGroup(node.id);
          break;
        }
      }
    }
  }, [active, isMobile]);

  function toggleGroup(id) {
    if (!isMobile) return;
    setOpenGroup(prev => prev === id ? null : id);
  }

  return (
    <div className="flex flex-col w-full pb-6">
      {navStructure.map((node) => {
        if (node.type === "item") {
          const tab = node;
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
                marginBottom: tab.alert ? 12 : 4,
                marginTop: tab.id === "frikadas" ? 12 : 0,
              }}
            >
              <Icon size={17} strokeWidth={isActive || tab.alert ? 2.4 : 2} />
              <span style={{ fontSize: 14, letterSpacing: "0.01em" }}>{t(tab.labelKey)}</span>
              {tab.alert && <span className="alert-dot" aria-hidden="true" />}
            </button>
          );
        } else if (node.type === "group") {
          const isOpen = !isMobile || openGroup === node.id;
          const hasActiveItem = node.items.some(i => i.id === active);
          
          return (
            <div key={node.id} className="mb-2 mt-1">
              <button
                onClick={() => toggleGroup(node.id)}
                className={`flex items-center justify-between w-full text-left px-4 py-2 ${!isMobile ? "cursor-default" : "cursor-pointer"} select-none transition-opacity hover:opacity-80`}
                style={{
                  color: (hasActiveItem && !isOpen) ? "#e8b74a" : "rgba(255,255,255,0.5)",
                }}
                disabled={!isMobile}
              >
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {t(node.labelKey)}
                </span>
                {isMobile && (
                  <span style={{ opacity: 0.5 }}>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                )}
              </button>
              
              <div 
                className="flex flex-col gap-0.5 overflow-hidden transition-all duration-300 ease-out"
                style={{ 
                  maxHeight: isOpen ? "400px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {node.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { onChange(tab.id); onClose?.(); }}
                      className="flex items-center gap-3 w-full text-left transition-all"
                      style={{
                        padding: "10px 16px 10px 32px",
                        borderRadius: 10,
                        background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                        borderLeft: isActive ? "3px solid #e8b74a" : "3px solid transparent",
                        fontWeight: isActive ? 700 : 500,
                      }}
                    >
                      <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
                      <span style={{ fontSize: 13.5, letterSpacing: "0.01em" }}>{t(tab.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
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
            style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 80 }}>
            <NavItems active={active} onChange={onChange} onClose={onClose} isMobile={true} />
          </nav>
          
          {/* Quick access bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-2 pb-5 pt-8"
               style={{ 
                 background: "linear-gradient(to top, rgba(35,27,27,1) 40%, rgba(35,27,27,0.95) 60%, rgba(35,27,27,0.7) 80%, rgba(35,27,27,0))",
                 borderTop: "none"
               }}>
            {[
              { id: "hoy", icon: Compass },
              { id: "calendario", icon: CalendarDays },
              { id: "itinerario", icon: Route },
              { id: "mapa", icon: Map },
              { id: "transportes", icon: Train }
            ].map(item => {
              const isActive = active === item.id;
              const Icon = item.icon;
              return (
                <button 
                  key={item.id}
                  onClick={() => { onChange(item.id); onClose(); }}
                  className="flex flex-col items-center justify-center p-2 rounded-xl transition-all"
                  style={{
                    color: isActive ? "#e8b74a" : "rgba(255,255,255,0.5)",
                    background: isActive ? "rgba(232, 183, 74, 0.15)" : "transparent",
                  }}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </button>
              )
            })}
          </div>

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
      className="hidden md:flex items-center gap-5 px-6 shrink-0"
      style={{
        height: 68,
        boxSizing: "border-box",
        zIndex: 150,
        backgroundColor: "var(--shu-darker)",
        ...chromeBg,
        borderBottom: "none",
        boxShadow: "0 2px 0 0 var(--shu-darker), 0 4px 14px rgba(0,0,0,0.12)",
      }}
    >
      <div style={chromeOverlay} />
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", gap: 10,
        flex: 1, minWidth: 0,
      }}>
        <span style={{ fontSize: 26, lineHeight: 1 }}>🇯🇵</span>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 22,
          fontWeight: 700, color: "#fff", letterSpacing: "0.01em",
        }}>
          Japón 2026
        </span>
        {currentTab && (
          <>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 20, margin: "0 4px" }}>·</span>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 19,
              fontWeight: 600, color: "rgba(255,255,255,0.82)",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {t(currentTab.labelKey)}
            </span>
          </>
        )}
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        <GlobalSearch variant="desktop" onNavigate={onNavigate} />
        <LanguageSwitcher variant="desktop" />
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
          <NavItems active={active} onChange={onChange} isMobile={false} />
        </nav>
      </div>
    </aside>
  );
}

/* ── Mobile export ───────────────────────────────────────────────── */
export default function Nav({ active, onChange, onNavigate, open, setOpen }) {
  return (
    <div className="md:hidden">
      <TopBar active={active} onOpenDrawer={() => setOpen(true)} onNavigate={onNavigate} />
      <Drawer active={active} onChange={onChange} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
