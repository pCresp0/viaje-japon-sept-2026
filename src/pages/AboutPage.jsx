import { useContent, useT } from "../i18n/LanguageContext";

export default function AboutPage() {
  const { tripMeta } = useContent();
  const t = useT();

  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>{t("about.eyebrow")}</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>{t("about.title")}</h2>
      </div>

      <div className="rounded-2xl border overflow-hidden mb-6" style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
        <div className="px-5 py-4 space-y-4">
          <div className="space-y-4">
            {tripMeta.about.features && tripMeta.about.features.map((feature, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-[14.5px] font-bold text-slate-900 dark:text-white mb-0.5">{feature.title}</h4>
                  <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed m-0" dangerouslySetInnerHTML={{ __html: feature.text }} />
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: "32px", padding: "16px", background: "rgba(188,71,73,0.05)", borderRadius: "12px", border: "1px solid rgba(188,71,73,0.15)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--shu)", marginBottom: 8, margin: 0 }}>{t("about.archTitle")}</h3>
            <ul style={{ paddingLeft: 18, margin: "8px 0 0", fontSize: 13.5, color: "var(--ink)", lineHeight: 1.6 }} className="space-y-1">
              <li><strong>React & Vite:</strong> {t("about.reactDesc")}</li>
              <li><strong>PWA (Offline):</strong> {t("about.pwaDesc")}</li>
              <li><strong>Tailwind CSS v4:</strong> {t("about.tailwindDesc")}</li>
              <li><strong>Multi-idioma (i18n):</strong> {t("about.i18nDesc")}</li>
              <li><strong>Mapas (Leaflet):</strong> {t("about.mapDesc")}</li>
            </ul>
          </div>
          
          <div style={{ marginTop: 24 }}>
            <a
              href="https://github.com/pCresp0/viaje-japon-sept-2026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 text-sm font-medium rounded-xl py-3"
              style={{ background: "var(--ink)", color: "var(--paper)", textDecoration: "none" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              {tripMeta.about.github}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
