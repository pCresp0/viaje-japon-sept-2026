import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Aparece tras ~400px de scroll en el contenedor principal y vuelve arriba del apartado. */
export default function ScrollToTopButton({ containerRef, resetKey }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, [resetKey]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const THRESHOLD = 400;
    const onScroll = () => {
      setVisible(el.scrollTop > THRESHOLD);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef, resetKey]);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      title="Volver arriba"
      onClick={() => {
        containerRef?.current?.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="fixed z-[90] flex items-center justify-center rounded-full border-none cursor-pointer shadow-lg transition-opacity hover:opacity-90 active:scale-95 animate-in fade-in duration-200"
      style={{
        right: "max(16px, env(safe-area-inset-right, 0px))",
        bottom: "max(20px, calc(16px + env(safe-area-inset-bottom, 0px)))",
        width: 44,
        height: 44,
        background: "var(--indigo)",
        color: "white",
      }}
    >
      <ArrowUp size={22} strokeWidth={2.4} />
    </button>
  );
}
