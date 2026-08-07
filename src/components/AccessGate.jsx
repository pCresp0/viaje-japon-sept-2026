import { useState } from "react";
import { Lock } from "lucide-react";

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
      style={{
        minHeight: "100vh",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "var(--paper)",
      }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border p-6"
        style={{
          background: "var(--paper-raised)",
          borderColor: "var(--line)",
          boxShadow: "0 12px 40px rgba(29,53,87,0.08)",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "var(--indigo)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Lock size={20} color="white" />
        </div>

        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>
          Acceso privado
        </p>
        <h1 className="font-display text-2xl" style={{ color: "var(--indigo)", margin: 0 }}>
          Viaje a Japón
        </h1>
        <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, marginTop: 8 }}>
          Esta guía tiene datos del grupo. Introduce la clave para entrar.
        </p>

        <label
          htmlFor="trip-pass"
          style={{
            display: "block",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            marginTop: 20,
            marginBottom: 6,
          }}
        >
          Clave
        </label>
        <input
          id="trip-pass"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
          placeholder="••••••••"
          className="w-full rounded-xl px-3.5 py-3 text-sm outline-none"
          style={{
            background: "var(--paper)",
            border: `1px solid ${error ? "var(--shu)" : "var(--line)"}`,
            color: "var(--ink)",
          }}
        />
        {error && (
          <p style={{ fontSize: 12.5, color: "var(--shu)", marginTop: 8, marginBottom: 0 }}>
            Clave incorrecta
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl mt-4 py-3 text-sm font-semibold"
          style={{ background: "var(--indigo)", color: "white", border: "none", cursor: "pointer" }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
