import { useState } from "react";
import { checkPassword, setUnlocked } from "../utils/auth";
import { Lock } from "lucide-react";

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setChecking(true);
    const ok = await checkPassword(value);
    setChecking(false);
    if (ok) {
      setUnlocked();
      onUnlock();
    } else {
      setError(true);
      setValue("");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--indigo)" }}
    >
      <div className="w-full max-w-xs text-center">
        <div
          className="mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <Lock size={24} color="white" />
        </div>
        <p className="eyebrow text-white/60">Solo para el grupo</p>
        <h1 className="font-display text-2xl text-white mt-1 mb-6">Viaje a Japón 🗻</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            autoFocus
            type="password"
            inputMode="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="Contraseña"
            className="w-full rounded-xl px-4 py-3 text-center text-lg outline-none"
            style={{ background: "rgba(255,255,255,0.95)", color: "var(--ink)" }}
          />
          {error && <p className="text-sm" style={{ color: "#F4A9A9" }}>Contraseña incorrecta</p>}
          <button
            type="submit"
            disabled={checking || !value}
            className="w-full rounded-xl py-3 font-medium disabled:opacity-50"
            style={{ background: "var(--shu)", color: "white" }}
          >
            {checking ? "Comprobando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
