import { useState } from "react";
import BottomNav from "./components/BottomNav";
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
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <main className="pb-24">
        {tab === "hoy" && <Home onGoToDay={goToDay} />}
        {tab === "itinerario" && <Itinerary openDay={openDay} setOpenDay={setOpenDay} />}
        {tab === "info" && <InfoPage />}
        {tab === "presupuesto" && <BudgetPage />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
