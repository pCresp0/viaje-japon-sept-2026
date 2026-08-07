import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { uiStrings } from "./ui";
import { getContent } from "../data/content";

// Idiomas soportados. 'es' es el principal y actúa como fallback: si
// falta cualquier cadena o bloque de contenido en otro idioma, se usa
// el español en su lugar, de modo que la app nunca muestra huecos.
export const LANGUAGES = [
  { code: "es", label: "Español",  flag: "🇪🇸", short: "ES" },
  { code: "en", label: "English",  flag: "🇬🇧", short: "EN" },
  { code: "fr", label: "Français", flag: "🇫🇷", short: "FR" },
  { code: "tl", label: "Tagalog",  flag: "🇵🇭", short: "TL" },
];

export const DEFAULT_LANG = "es";
const STORAGE_KEY = "trip-lang-v1";

const LanguageContext = createContext(null);

function detectInitialLang() {
  // 1) Preferencia guardada explícitamente por el usuario.
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
  } catch {
    /* localStorage puede fallar en modo privado */
  }

  // 2) Idioma del navegador, si coincide con alguno soportado.
  try {
    const nav = (navigator.languages || [navigator.language || ""])
      .map((l) => l.slice(0, 2).toLowerCase());
    // 'fil' es el código ISO del filipino; el navegador puede dar 'fil' o 'tl'
    for (const code of nav) {
      if (code === "fi" || code === "tl") return "tl";
      if (LANGUAGES.some((l) => l.code === code)) return code;
    }
  } catch {
    /* entorno sin navigator */
  }

  // 3) Español por defecto.
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  function setLang(code) {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignorar */
    }
  }

  // Mantener el atributo lang del <html> sincronizado: importa para
  // lectores de pantalla, para la síntesis de voz y para el SEO.
  useEffect(() => {
    document.documentElement.lang = lang === "tl" ? "fil" : lang;
  }, [lang]);

  const value = useMemo(() => {
    const strings = { ...uiStrings.es, ...(uiStrings[lang] || {}) };

    // t('clave') devuelve la cadena traducida; si no existe en el idioma
    // activo cae a español, y si tampoco existe devuelve la propia clave
    // (así un fallo es visible en desarrollo en vez de un hueco en blanco).
    function t(key, vars) {
      let str = strings[key] ?? uiStrings.es[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replaceAll(`{${k}}`, v);
        }
      }
      return str;
    }

    return {
      lang,
      setLang,
      t,
      content: getContent(lang),
      languages: LANGUAGES,
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}

// Atajo para el caso más común: sólo necesitar la función de traducción.
export function useT() {
  return useLang().t;
}

// Atajo para acceder a los datos de contenido en el idioma activo.
export function useContent() {
  return useLang().content;
}
