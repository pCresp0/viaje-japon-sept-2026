import { useState } from "react";
import Nav, { Sidebar } from "./components/Nav";
import PasswordGate from "./components/PasswordGate";
import Home from "./pages/Home";
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar + drawer */}
        <Nav active={tab} onChange={setTab} />

        {/* Page content */}
        <main
          className="flex-1 w-full mx-auto px-0 md:px-8 md:py-8"
          style={{
            maxWidth: 1100,
            paddingTop: "calc(56px + env(safe-area-inset-top))",
          }}
        >
          {/* On desktop remove the mobile top-padding */}
          <div className="md:[padding-top:0]">
            {tab === "hoy"          && <Home onGoToDay={goToDay} />}
            {tab === "itinerario"   && <Itinerary openDay={openDay} setOpenDay={setOpenDay} />}
            {tab === "info"         && <InfoPage />}
            {tab === "presupuesto"  && <BudgetPage />}
          </div>
        </main>
      </div>
    </div>
  );
}
