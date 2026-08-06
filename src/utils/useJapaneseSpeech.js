import { useState, useEffect, useCallback, useRef } from "react";

// Reproduce texto en japonés usando la Web Speech API (SpeechSynthesis),
// nativa del navegador — sin backend, sin coste, sin depender de ningún
// servicio externo. Está soportada en Chrome, Safari (iOS/macOS) y Edge;
// la calidad de la voz depende del sistema operativo del usuario, pero
// la pronunciación es la real del motor de TTS japonés, no una
// aproximación fonética.

function pickJapaneseVoice(voices) {
  // Prioridad: voz específica ja-JP > cualquier voz cuyo lang empiece
  // por "ja" (por si algún navegador usa otra variante regional).
  return (
    voices.find((v) => v.lang === "ja-JP") ||
    voices.find((v) => v.lang?.toLowerCase().startsWith("ja")) ||
    null
  );
}

export function useJapaneseSpeech() {
  const [supported, setSupported] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const voiceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    setSupported(true);

    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      const jp = pickJapaneseVoice(voices);
      if (jp) {
        voiceRef.current = jp;
        setVoiceReady(true);
      }
    }

    loadVoices();
    // En muchos navegadores la lista de voces se carga de forma asíncrona
    // tras el primer render, así que hay que escuchar este evento además
    // de intentarlo directamente.
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const speak = useCallback((text, id) => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    // Si ya está hablando (esta u otra frase), lo primero es cortar,
    // así el botón funciona también como "detener" si se pulsa de nuevo.
    synth.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.rate = 0.85; // ligeramente más lento, más fácil de seguir
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    synth.speak(utterance);
  }, [supported, speakingId]);

  // Al desmontar (cambiar de pestaña), cortar cualquier audio en curso.
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  return { supported, voiceReady, speakingId, speak };
}
