export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--line)",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    }}>
      <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0 }}>
        Web desarrollada por{" "}
        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Pablo Crespo Bellido</strong>
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/pablocrespobellido/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{
            width: 38, height: 38,
            borderRadius: "50%",
            background: "var(--paper-raised)",
            border: "1px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-soft)",
            transition: "border-color 0.15s, color 0.15s",
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#0077b5"; e.currentTarget.style.color = "#0077b5"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink-soft)"; }}
        >
          {/* LinkedIn SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/pCresp0/viaje-japon-sept-2026"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{
            width: 38, height: 38,
            borderRadius: "50%",
            background: "var(--paper-raised)",
            border: "1px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--ink-soft)",
            transition: "border-color 0.15s, color 0.15s",
            textDecoration: "none",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.color = "var(--ink)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink-soft)"; }}
        >
          {/* GitHub SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
