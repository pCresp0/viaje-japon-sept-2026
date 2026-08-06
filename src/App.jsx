import { useState } from "react";
import Nav, { Sidebar } from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import Itinerary from "./pages/Itinerary";
import InfoPage from "./pages/InfoPage";
import BudgetPage from "./pages/BudgetPage";
import PhrasesPage from "./pages/PhrasesPage";
import PrepPage from "./pages/PrepPage";
import EmergencyPage from "./pages/EmergencyPage";
import { getTripStatus } from "./utils/date";

export default function App() {
  const [tab, setTab] = useState("hoy");
  const [openDay, setOpenDay] = useState(getTripStatus().day?.num ?? 1);

  function goToDay(num) {
    setOpenDay(num);
    setTab("itinerario");
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--paper)" }}>

      {/* Desktop sidebar — fixed height, no scroll */}
      <Sidebar active={tab} onChange={setTab} />

      {/* Right column — scrollable */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowY: "auto", height: "100vh" }}>

        {/* Mobile top bar + drawer */}
        <Nav active={tab} onChange={setTab} />

        {/* Page content — grows to fill space */}
        <main style={{
          flex: 1,
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          paddingTop: "calc(54px + env(safe-area-inset-top))",
        }}>
          <div className="md-no-top-pad">
            {tab === "hoy"          && <Home onGoToDay={goToDay} />}
            {tab === "calendario"   && <CalendarPage />}
            {tab === "itinerario"   && <Itinerary openDay={openDay} setOpenDay={setOpenDay} />}
            {tab === "info"         && <InfoPage />}
            {tab === "presupuesto"  && <BudgetPage />}
            {tab === "frases"       && <PhrasesPage />}
            {tab === "preparativos" && <PrepPage />}
            {tab === "emergencias"  && <EmergencyPage />}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
