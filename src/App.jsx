import { useState } from "react";
import Nav, { Sidebar } from "./components/Nav";
import Footer from "./components/Footer";
import PasswordGate from "./components/PasswordGate";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import Itinerary from "./pages/Itinerary";
import InfoPage from "./pages/InfoPage";
import BudgetPage from "./pages/BudgetPage";
import { getTripStatus } from "./utils/date";
import { isUnlocked } from "./utils/auth";

export default function App() {
  const [unlocked, setUnlockedState] = useState(isUnlocked());
  const [tab, setTab] = useState("hoy");
  const [openDay, setOpenDay] = useState(getTripStatus().day?.num ?? 1);

  function goToDay(num) {
    setOpenDay(num);
    setTab("itinerario");
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlockedState(true)} />;
  }

  return (
    <div className="min-h-screen flex" style={{ background: "var(--paper)" }}>

      {/* Desktop sidebar */}
      <Sidebar active={tab} onChange={setTab} />

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar + drawer */}
        <Nav active={tab} onChange={setTab} />

        {/* Page */}
        <main
          className="flex-1 w-full mx-auto"
          style={{
            maxWidth: 1100,
            paddingTop: "calc(54px + env(safe-area-inset-top))",
          }}
        >
          <div className="md:pt-0">
            {tab === "hoy"          && <Home onGoToDay={goToDay} />}
            {tab === "calendario"   && <CalendarPage />}
            {tab === "itinerario"   && <Itinerary openDay={openDay} setOpenDay={setOpenDay} />}
            {tab === "info"         && <InfoPage />}
            {tab === "presupuesto"  && <BudgetPage />}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
