import { useState, useEffect, useRef } from "react";
import Nav, { Sidebar, DesktopTopBar } from "./components/Nav";
import Footer from "./components/Footer";
import AccessGate, { isUnlocked } from "./components/AccessGate";
import InicioPage from "./pages/InicioPage";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import Itinerary from "./pages/Itinerary";
import InfoPage from "./pages/InfoPage";
import BudgetPage from "./pages/BudgetPage";
import TransportPage from "./pages/TransportPage";
import HotelsPage from "./pages/HotelsPage";
import PlacesPage from "./pages/PlacesPage";
import FoodsPage from "./pages/FoodsPage";
import MapPage from "./pages/MapPage";
import WeatherPage from "./pages/WeatherPage";
import PhrasesPage from "./pages/PhrasesPage";
import PrepPage from "./pages/PrepPage";
import UtilsPage from "./pages/UtilsPage";
import EmergencyPage from "./pages/EmergencyPage";
import PendingPage from "./pages/PendingPage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";
import { getTripStatus } from "./utils/date";

function defaultTab() {
  // Antes del viaje → Inicio. Cuando empieza (o ya terminó) → Hoy.
  return getTripStatus().phase === "before" ? "inicio" : "hoy";
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [tab, setTab] = useState(defaultTab);
  const [openDay, setOpenDay] = useState(getTripStatus().day?.num ?? null);
  const scrollContainerRef = useRef(null);

  function goToDay(num) {
    setOpenDay(num);
    setTab("itinerario");
  }

  function handleSearchNavigate({ tab: nextTab, day }) {
    if (day != null) setOpenDay(day);
    setTab(nextTab);
  }

  // Scroll to top of the scrollable container when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [tab]);

  if (!unlocked) {
    return <AccessGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", height: "100dvh" }}>

      {/* Desktop: cabecera a todo el ancho (lupa + idioma a la derecha) */}
      <DesktopTopBar active={tab} onNavigate={handleSearchNavigate} />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* Mobile top bar + drawer */}
        <Nav active={tab} onChange={setTab} onNavigate={handleSearchNavigate} />

        {/* Desktop sidebar */}
        <Sidebar active={tab} onChange={setTab} />

        {/* Right column — scrollable */}
        <div ref={scrollContainerRef} style={{
          flex: 1, display: "flex", flexDirection: "column",
          minWidth: 0, overflowY: "auto", height: "100%",
        }}>

          <main style={{
            flex: 1,
            width: "100%",
            maxWidth: 1100,
            margin: "0 auto",
            // Solo móvil: offset bajo la top bar fija (+ seal que tapa el hueco del fondo)
            paddingTop: "var(--mobile-topbar)",
          }}>
            <div>
              {tab === "pendientes"   && <PendingPage />}
              {tab === "historia"     && <HistoryPage />}
              {tab === "inicio"       && <InicioPage onNavigate={setTab} />}
              {tab === "hoy"          && <Home onGoToDay={goToDay} />}
              {tab === "calendario"   && <CalendarPage />}
              {tab === "itinerario"   && <Itinerary openDay={openDay} setOpenDay={setOpenDay} />}
              {tab === "vuelos"       && <InfoPage />}
              {tab === "hoteles"      && <HotelsPage />}
              {tab === "transportes"  && <TransportPage />}
              {tab === "presupuesto"  && <BudgetPage />}
              {tab === "lugares"      && <PlacesPage />}
              {tab === "comidas"      && <FoodsPage />}
              {tab === "mapa"         && <MapPage />}
              {tab === "clima"        && <WeatherPage />}
              {tab === "frases"       && <PhrasesPage />}
              {tab === "preparativos" && <PrepPage />}
              {tab === "herramientas" && <UtilsPage />}
              {tab === "emergencias"  && <EmergencyPage />}
              {tab === "about"        && <AboutPage />}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
