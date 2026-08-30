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
import FrikadasPage from "./pages/FrikadasPage";
import FujiAlertBanner from "./components/FujiAlertBanner";
import SearchResultHighlight from "./components/SearchResultHighlight";
import ErrorBoundary from "./components/ErrorBoundary";
import { useHighlight } from "./context/HighlightContext";
import { slug } from "./utils/slug";
import { getTripStatus } from "./utils/date";

function defaultTab() {
  // Antes del viaje → Inicio. Cuando empieza (o ya terminó) → Hoy.
  return getTripStatus().phase === "before" ? "inicio" : "hoy";
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [tab, setTab] = useState(defaultTab);
  const [openDay, setOpenDay] = useState(getTripStatus().day?.num ?? null);
  const [quickView, setQuickView] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [mapInitialDay, setMapInitialDay] = useState(null);
  const scrollContainerRef = useRef(null);
  const { triggerHighlight } = useHighlight();

  function goToDay(num) {
    setOpenDay(num);
    setQuickView(false); // Default to full view when searching/home
    setTab("itinerario");
    // Mismo pulso dorado que usa el buscador: confirma visualmente a qué
    // día concreto se ha saltado, venga la navegación de "Hoy" o del mapa.
    window.setTimeout(() => triggerHighlight(slug("itinerary-day", num)), 120);
  }

  function goToDayQuickView(num) {
    setOpenDay(num);
    setQuickView(true);
    setTab("itinerario");
  }

  function goToMapDay(num) {
    setMapInitialDay(num);
    setTab("mapa");
    // Se consume una sola vez al montar MapPage: si luego se vuelve al
    // Mapa desde el menú normal, que no arrastre el filtro de este día.
    window.setTimeout(() => setMapInitialDay(null), 300);
  }

  function handleSearchNavigate(result) {
    const { tab: nextTab, day, targetId } = result;
    setSearchResult(result);
    if (day != null) setOpenDay(day);
    setTab(nextTab);
    // Se dispara con un pequeño margen para dar tiempo a que la nueva
    // página (y, si hace falta, el día/acordeón correspondiente) se
    // monten antes de intentar el scrollIntoView.
    if (targetId) {
      window.setTimeout(() => triggerHighlight(targetId), 120);
    }
  }

  // Scroll to top of the scrollable container when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [tab]);

  // Prevenir que el botón "atrás" en móviles salga de la app accidentalmente
  useEffect(() => {
    window.history.pushState({ preventBack: true }, "");

    const handlePopState = (e) => {
      if (!e.state || !e.state.preventBack) {
        const confirmExit = window.confirm("¿Seguro que quieres salir de la aplicación?");
        if (confirmExit) {
          window.history.back();
        } else {
          window.history.pushState({ preventBack: true }, "");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (!unlocked) {
    return <AccessGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="full-viewport-height app-shell" style={{ display: "flex", flexDirection: "column" }}>

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
            // Solo móvil: offset bajo la top bar fija
            paddingTop: "var(--mobile-topbar)",
          }}>
            {/* Banner global de aviso de visibilidad y cancelaciones del Monte Fuji (activo del 12 al 20 de sept) */}
            <FujiAlertBanner />

            {searchResult?.tab === tab && <SearchResultHighlight result={searchResult} onClear={() => setSearchResult(null)} />}
            <ErrorBoundary resetKey={tab}>
              <div>
                {tab === "pendientes"   && <PendingPage />}
                {tab === "historia"     && <HistoryPage />}
                {tab === "inicio"       && <InicioPage onNavigate={setTab} />}
                {tab === "hoy"          && <Home onGoToDay={goToDay} />}
                {tab === "calendario"   && <CalendarPage onGoToDayQuickView={goToDayQuickView} />}
                {tab === "itinerario"   && <Itinerary openDay={openDay} setOpenDay={setOpenDay} quickView={quickView} setQuickView={setQuickView} onGoToMapDay={goToMapDay} />}
                {tab === "vuelos"       && <InfoPage />}
                {tab === "hoteles"      && <HotelsPage />}
                {tab === "transportes"  && <TransportPage onNavigate={handleSearchNavigate} />}
                {tab === "presupuesto"  && <BudgetPage />}
                {tab === "lugares"      && <PlacesPage />}
                {tab === "comidas"      && <FoodsPage />}
                {tab === "mapa"         && <MapPage onGoToDay={goToDay} initialDay={mapInitialDay} />}
                {tab === "clima"        && <WeatherPage />}
                {tab === "frases"       && <PhrasesPage />}
                {tab === "preparativos" && <PrepPage />}
                {tab === "herramientas" && <UtilsPage />}
                {tab === "emergencias"  && <EmergencyPage />}
                {tab === "frikadas"     && <FrikadasPage />}
                {tab === "about"        && <AboutPage />}
              </div>
            </ErrorBoundary>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
