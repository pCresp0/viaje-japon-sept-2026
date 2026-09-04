import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Aparece progresivamente con un degradado/desvanecimiento suave
 * a medida que el usuario hace scroll hacia abajo en el contenedor principal.
 */
export default function ScrollToTopButton({ containerRef, resetKey }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [resetKey]);

  useEffect(() => {
    const el = containerRef?.current || document.getElementById("main-scroll-container");
    if (!el) return;

    // Rango de scroll donde la flecha aparece de forma progresiva
    const FADE_START = 80;
    const FADE_END = 320;

    let ticking = false;

    const updateProgress = () => {
      const top = el.scrollTop || 0;
      const maxScroll = el.scrollHeight - el.clientHeight;

      if (top <= FADE_START) {
        setProgress(0);
      } else if (top >= FADE_END || (maxScroll > 100 && top >= maxScroll - 40)) {
        setProgress(1);
      } else {
        const raw = (top - FADE_START) / (FADE_END - FADE_START);
        setProgress(Math.round(raw * 100) / 100);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, resetKey]);

  const isVisible = progress > 0;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => {
        const el = containerRef?.current || document.getElementById("main-scroll-container");
        el?.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="fixed z-[90] flex items-center justify-center rounded-full cursor-pointer border border-white/20 active:scale-95 focus:outline-hidden"
      style={{
        right: "max(16px, env(safe-area-inset-right, 0px))",
        bottom: "max(20px, calc(16px + env(safe-area-inset-bottom, 0px)))",
        width: 44,
        height: 44,
        background: "linear-gradient(135deg, var(--indigo) 0%, #2b4c7e 100%)",
        color: "white",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 8}px) scale(${0.88 + 0.12 * progress})`,
        pointerEvents: progress > 0.15 ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.25s ease-out, transform 0.25s ease-out, box-shadow 0.25s ease-out, visibility 0.25s",
        boxShadow: `0 ${4 + 6 * progress}px ${12 + 8 * progress}px -3px rgba(29, 53, 87, ${0.35 * progress})`,
      }}
    >
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  );
}
