import { useState } from "react";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import InfoPage from "./pages/InfoPage";
import BudgetPage from "./pages/BudgetPage";
import { getTripStatus } from "./utils/date";

export default function App() {
  const [tab, setTab] = useState("hoy");
  const [openDay, setOpenDay] = useState(getTripStatus().day?.num ?? 1);

  function goToDay(num) {
    setOpenDay(num);
    setTab("itinerario");
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
