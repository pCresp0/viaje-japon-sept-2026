import { useState, useEffect, useCallback, useRef } from "react";
import { pickBestVoice } from "./voicePicker";

// Versión genérica de useJapaneseSpeech: lee texto en el idioma que se le
// indique (BCP-47), en vez de estar fijado siempre a japonés. Se usa para
// leer en voz alta contenido largo (p. ej. Historia de Japón) en el
// idioma que tenga activo la app en cada momento.
//
// Mapea los códigos internos de la app (es/en/fr/tl) a códigos BCP-47
// reales que entiende la Web Speech API. 'tl' no siempre tiene voz nativa
// instalada en el dispositivo; si no la hay, el navegador cae a su voz
// por defecto para ese idioma o simplemente no reproduce nada, y el
// estado de error queda disponible para avisar en la interfaz.
const BCP47 = { es: "es-ES", en: "en-US", fr: "fr-FR", tl: "fil-PH" };

function pickVoice(voices, bcp47) {
  return pickBestVoice(voices, bcp47);
}

export function useTextSpeech(langCode) {
  const bcp47 = BCP47[langCode] || "es-ES";
  const [supported, setSupported] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [lastError, setLastError] = useState(null);
  const voiceRef = useRef(null);
  const voiceLangRef = useRef(null);

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
      const v = pickVoice(voices, bcp47);
      if (v) {
        voiceRef.current = v;
        voiceLangRef.current = bcp47;
        clearTimeout(pollTimer);
        return true;
      }
      return false;
    }

    if (!loadVoices()) {
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
  }, [bcp47]);

  const speak = useCallback((text, id) => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    if (speakingId === id) {
      synth.cancel();
      setSpeakingId(null);
      return;
    }

    function fire() {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = bcp47;
      if (voiceRef.current && voiceLangRef.current === bcp47) {
        utterance.voice = voiceRef.current;
      }
      utterance.rate = 0.95;
      utterance.volume = 1;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = (e) => {
        setSpeakingId(null);
        setLastError(e?.error || "unknown");
      };

      setLastError(null);
      setSpeakingId(id);
      synth.speak(utterance);

      // Mismo truco que en useJapaneseSpeech: Chrome/Android pausa la
      // síntesis sola tras ~15s de inactividad sin disparar error. Como
      // aquí los textos pueden ser largos (párrafos de historia), se
      // mantiene el resume activo más tiempo.
      let resumeCount = 0;
      const resumeTimer = setInterval(() => {
        if (!synth.speaking || resumeCount > 120) {
          clearInterval(resumeTimer);
          return;
        }
        synth.pause();
        synth.resume();
        resumeCount += 1;
      }, 250);
    }

    if (synth.speaking || synth.pending) {
      synth.cancel();
      setTimeout(fire, 50);
    } else {
      fire();
    }
  }, [supported, speakingId, bcp47]);

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeakingId(null);
  }, [supported]);

  return { supported, speakingId, lastError, speak, stop };
}
