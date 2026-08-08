import { useState, useEffect, useMemo } from "react";

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
  const [filter, setFilter] = useState("");

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

  const filtered = useMemo(() => {
    if (!filter) return voices;
    const f = filter.toLowerCase();
    return voices.filter((v) => v.lang?.toLowerCase().startsWith(f));
  }, [voices, filter]);

  if (!enabled) return null;

  const grouped = filtered.reduce((acc, v) => {
    const key = v.lang || "?";
    (acc[key] ||= []).push(v);
    return acc;
  }, {});

  const quickFilters = [
    { code: "", label: `Todas (${voices.length})` },
    { code: "ja", label: "Japonés" },
    { code: "es", label: "Español" },
    { code: "en", label: "Inglés" },
    { code: "fr", label: "Francés" },
    { code: "tl", label: "Tagalo" },
    { code: "fil", label: "Filipino" },
  ];

  return (
    <div style={{
      position: "fixed", bottom: 12, left: 12, right: 12,
      maxHeight: "60vh", overflowY: "auto",
      background: "rgba(20,20,20,0.96)", color: "#fff",
      borderRadius: 12, padding: 14, zIndex: 99999,
      fontSize: 11, fontFamily: "monospace", lineHeight: 1.5,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 8 }}>
        🔊 Voces detectadas ({voices.length} total)
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {quickFilters.map((qf) => (
          <button
            key={qf.code}
            onClick={() => setFilter(qf.code)}
            style={{
              fontSize: 10.5, padding: "4px 10px", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.25)",
              background: filter === qf.code ? "#e8b74a" : "transparent",
              color: filter === qf.code ? "#1b1f27" : "#fff",
              fontWeight: filter === qf.code ? 700 : 400,
              cursor: "pointer",
            }}
          >
            {qf.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p>Sin resultados para este filtro.</p>}
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
