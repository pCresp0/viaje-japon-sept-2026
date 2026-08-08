import { useState, useEffect } from "react";

/**
 * Panel de diagnóstico de voces disponibles para síntesis de voz.
 * Sólo se muestra si la URL lleva ?voicedebug=1 — invisible en el uso
 * normal de la app. Sirve para ver, sin abrir la consola del navegador,
 * qué voces detecta realmente el dispositivo y así saber si tiene
 * sentido intentar elegir una "mejor" o si sólo hay una disponible.
 */
export default function VoiceDebugPanel() {
  const [enabled, setEnabled] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    try {
      setEnabled(new URLSearchParams(window.location.search).get("voicedebug") === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!enabled || !("speechSynthesis" in window)) return;
    function load() {
      setVoices([...window.speechSynthesis.getVoices()]);
    }
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, [enabled]);

  if (!enabled) return null;

  const grouped = voices.reduce((acc, v) => {
    const key = v.lang || "?";
    (acc[key] ||= []).push(v);
    return acc;
  }, {});

  return (
    <div style={{
      position: "fixed", bottom: 12, left: 12, right: 12,
      maxHeight: "50vh", overflowY: "auto",
      background: "rgba(20,20,20,0.94)", color: "#fff",
      borderRadius: 12, padding: 14, zIndex: 99999,
      fontSize: 11, fontFamily: "monospace", lineHeight: 1.5,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 8 }}>
        🔊 Voces detectadas ({voices.length} total)
      </p>
      {voices.length === 0 && <p>Ninguna voz cargada todavía…</p>}
      {Object.entries(grouped).sort().map(([lang, list]) => (
        <div key={lang} style={{ marginBottom: 8 }}>
          <p style={{ color: "#e8b74a", fontWeight: 700 }}>{lang} ({list.length})</p>
          {list.map((v, i) => (
            <p key={i} style={{ marginLeft: 8 }}>
              • {v.name} — {v.localService ? "local (más robótica)" : "red (mejor calidad)"}
              {v.default ? " · por defecto" : ""}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
