import { useState, useEffect, useCallback, useRef } from "react";
import { pickBestVoice } from "./voicePicker";

// Reproduce texto en japonés usando la Web Speech API (SpeechSynthesis),
// nativa del navegador — sin backend, sin coste, sin depender de ningún
// servicio externo. Está soportada en Chrome, Safari (iOS/macOS) y Edge;
// la calidad de la voz depende del sistema operativo del usuario, pero
// la pronunciación es la real del motor de TTS japonés, no una
// aproximación fonética.

function pickJapaneseVoice(voices) {
  return pickBestVoice(voices, "ja-JP");
}

export function useJapaneseSpeech() {
  const [supported, setSupported] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [lastError, setLastError] = useState(null);
  const voiceRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    setSupported(true);

    let attempts = 0;
    let pollTimer;

    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      const jp = pickJapaneseVoice(voices);
      if (jp) {
        voiceRef.current = jp;
        setVoiceReady(true);
        clearTimeout(pollTimer);
        return true;
      }
      return false;
    }

    if (!loadVoices()) {
      // Algunos navegadores/WebViews no disparan "voiceschanged" de forma
      // fiable. Como red de seguridad adicional, se reintenta a mano unas
      // cuantas veces. Si tras esto no aparece voz japonesa específica,
      // speak() sigue funcionando igual: se deja que el navegador use la
      // voz por defecto para lang="ja-JP".
      const poll = () => {
        attempts += 1;
        if (loadVoices() || attempts > 10) return;
        pollTimer = setTimeout(poll, 300);
      };
      pollTimer = setTimeout(poll, 300);
    }

    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      clearTimeout(pollTimer);
    };
  }, []);

  const speak = useCallback((text, id) => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    // Si se pulsa la misma frase que ya está sonando, actúa como "parar".
    if (speakingId === id) {
      synth.cancel();
      setSpeakingId(null);
      return;
    }

    function fire() {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      if (voiceRef.current) utterance.voice = voiceRef.current;
      utterance.rate = 0.85; // ligeramente más lento, más fácil de seguir
      utterance.volume = 1;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = (e) => {
        setSpeakingId(null);
        setLastError(e?.error || "unknown");
      };

      setLastError(null);
      setSpeakingId(id);
      synth.speak(utterance);

      // Bug conocido de Chrome/Android: la síntesis se "pausa" sola tras
      // ~15s de inactividad y el audio deja de sonar sin disparar ningún
      // evento de error. Este truco fuerza que siga activa mientras dura
      // la frase (las frases de esta página son cortas, así que unos
      // pocos "resume" bastan).
      let resumeCount = 0;
      const resumeTimer = setInterval(() => {
        if (!synth.speaking || resumeCount > 20) {
          clearInterval(resumeTimer);
          return;
        }
        synth.pause();
        synth.resume();
        resumeCount += 1;
      }, 250);
    }

    if (synth.speaking || synth.pending) {
      // cancel() es asíncrono en la práctica: si se llama a speak() en el
      // mismo tick, muchos navegadores (Safari/iOS y Chrome) simplemente
      // descartan la nueva frase. Un pequeño margen soluciona esto.
      synth.cancel();
      setTimeout(fire, 50);
    } else {
      fire();
    }
  }, [supported, speakingId]);

  // Al desmontar (cambiar de pestaña), cortar cualquier audio en curso.
  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  return { supported, voiceReady, speakingId, lastError, speak };
}
