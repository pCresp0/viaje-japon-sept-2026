import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const STORAGE_KEY = "viaje-japon-auth-v1";
const PASSWORD = "pokem0n";

export function isUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function unlock() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {}
}

export default function AccessGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (value === PASSWORD) {
      unlock();
      onUnlock();
      return;
    }
    setError(true);
    setValue("");
  }

  return (
    <div
      className="full-viewport-min-height"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 20px",
        position: "relative",
        overflow: "hidden",
        // Sin fondo propio: se ve el paper + olas de body, igual que la app
        background: "transparent",
      }}
    >
      {/* Motivos japoneses decorativos */}
      <span aria-hidden style={deco(18, "8%", "12%", "var(--shu)", 0.08)}>⛩</span>
      <span aria-hidden style={deco(72, "78%", "8%", "var(--indigo)", 0.07)}>旅</span>
      <span aria-hidden style={deco(42, "12%", "72%", "var(--gold)", 0.12)}>✿</span>
      <span aria-hidden style={deco(56, "85%", "68%", "var(--shu)", 0.07)}>日</span>
      <span aria-hidden style={deco(28, "70%", "82%", "var(--forest)", 0.1)}>〜</span>
      <span aria-hidden style={deco(36, "6%", "42%", "var(--indigo)", 0.06)}>本</span>

      <form
        onSubmit={submit}
        className="w-full max-w-sm"
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 20,
          overflow: "hidden",
          background: "var(--paper-raised)",
          border: "1px solid var(--line)",
          boxShadow: "0 16px 48px rgba(77, 28, 30, 0.14)",
        }}
      >
        {/* Cabecera al estilo chrome de la app */}
        <div
          style={{
            position: "relative",
            padding: "28px 24px 22px",
            backgroundColor: "var(--shu-darker)",
            backgroundImage: "url('/waves-sidebar.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(160deg, rgba(77,28,30,0.94) 0%, rgba(122,44,46,0.9) 100%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 36, lineHeight: 1, marginBottom: 10 }}>🇯🇵</div>
            <p
              className="eyebrow"
              style={{
                color: "rgba(255,255,255,0.75)",
                margin: "0 0 6px",
                letterSpacing: "0.16em",
              }}
            >
              旅 · Japón 2026
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: 26,
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              Viaje Morisqueño
            </h1>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 13,
                opacity: 0.78,
                letterSpacing: "0.04em",
              }}
            >
              六 — 二十一 · 九月
            </p>
          </div>
        </div>

        <div style={{ padding: "22px 24px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(188,71,73,0.12)",
                color: "var(--shu)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Lock size={17} strokeWidth={2.4} />
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--indigo)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Acceso
              </p>
              <p style={{ margin: 0, fontSize: 12, color: "var(--ink-soft)" }}>
                Introduce la clave
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              id="trip-pass"
              type={showPassword ? "text" : "password"}
              autoFocus
              autoComplete="current-password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(false);
              }}
              placeholder="************"
              aria-label="Clave"
              className="w-full rounded-xl px-3.5 py-3.5 pr-10 text-sm outline-none access-pass-input"
              style={{
                background: "var(--paper)",
                border: `1.5px solid ${error ? "var(--shu)" : "var(--line)"}`,
                color: "var(--ink)",
                letterSpacing: showPassword ? "0.05em" : "0.18em",
                transition: "border-color 0.15s",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              style={{ padding: 4 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && (
            <p style={{ fontSize: 12.5, color: "var(--shu)", marginTop: 8, marginBottom: 0 }}>
              Clave incorrecta
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl mt-4 py-3.5 text-sm font-semibold"
            style={{
              background: "linear-gradient(160deg, var(--shu) 0%, var(--shu-deep) 100%)",
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(188,71,73,0.28)",
              letterSpacing: "0.04em",
            }}
          >
            Entrar · 入る
          </button>
        </div>
      </form>
    </div>
  );
}

function deco(size, left, top, color, opacity) {
  return {
    position: "absolute",
    left,
    top,
    fontSize: size,
    color,
    opacity,
    pointerEvents: "none",
    userSelect: "none",
    lineHeight: 1,
    fontFamily: "var(--font-display)",
  };
}
