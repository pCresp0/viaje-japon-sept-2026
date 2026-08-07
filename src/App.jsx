import { useState, useEffect, useRef } from "react";
import Nav, { Sidebar } from "./components/Nav";
import Footer from "./components/Footer";
import AccessGate, { isUnlocked } from "./components/AccessGate";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import Itinerary from "./pages/Itinerary";
import InfoPage from "./pages/InfoPage";
import BudgetPage from "./pages/BudgetPage";
import TransportPage from "./pages/TransportPage";
import HotelsPage from "./pages/HotelsPage";
import PlacesPage from "./pages/PlacesPage";
import MapPage from "./pages/MapPage";
import WeatherPage from "./pages/WeatherPage";
import PhrasesPage from "./pages/PhrasesPage";
import PrepPage from "./pages/PrepPage";
import UtilsPage from "./pages/UtilsPage";
import EmergencyPage from "./pages/EmergencyPage";
import PendingPage from "./pages/PendingPage";
import HistoryPage from "./pages/HistoryPage";
import { getTripStatus } from "./utils/date";

export default function App() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [tab, setTab] = useState("hoy");
  const [openDay, setOpenDay] = useState(getTripStatus().day?.num ?? null);
  const scrollContainerRef = useRef(null);

  function goToDay(num) {
    setOpenDay(num);
    setTab("itinerario");
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
    <div style={{ display: "flex", height: "100vh", height: "100dvh" }}>

      {/* Desktop sidebar — fixed height, no scroll */}
      <Sidebar active={tab} onChange={setTab} />

      {/* Right column — scrollable */}
      <div ref={scrollContainerRef} style={{
        flex: 1, display: "flex", flexDirection: "column",
        minWidth: 0, overflowY: "auto", height: "100%",
      }}>

        {/* Mobile top bar + drawer */}
        <Nav active={tab} onChange={setTab} />

        {/* Page content — grows to fill space */}
        <main style={{
          flex: 1,
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          paddingTop: "calc(58px + env(safe-area-inset-top))",
        }}>
          <div className="md-no-top-pad">
            {tab === "pendientes"   && <PendingPage />}
            {tab === "historia"     && <HistoryPage />}
            {tab === "hoy"          && <Home onGoToDay={goToDay} />}
            {tab === "calendario"   && <CalendarPage />}
            {tab === "itinerario"   && <Itinerary openDay={openDay} setOpenDay={setOpenDay} />}
            {tab === "vuelos"       && <InfoPage />}
            {tab === "hoteles"      && <HotelsPage />}
            {tab === "transportes"  && <TransportPage />}
            {tab === "presupuesto"  && <BudgetPage />}
            {tab === "lugares"      && <PlacesPage />}
            {tab === "mapa"         && <MapPage />}
            {tab === "clima"        && <WeatherPage />}
            {tab === "frases"       && <PhrasesPage />}
            {tab === "preparativos" && <PrepPage />}
            {tab === "herramientas" && <UtilsPage />}
            {tab === "emergencias"  && <EmergencyPage />}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
