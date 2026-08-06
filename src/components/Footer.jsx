export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(160deg, var(--shu-darker) 0%, var(--shu-deep) 100%)",
      padding: "40px 24px 32px",
      marginTop: "auto",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top section — info + links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 32,
          marginBottom: 32,
          paddingBottom: 32,
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}>
          {/* Left — branding & description */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <p style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
              }}>
                Viaje Japón 2026
              </p>
              <p style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
                marginTop: 4,
                lineHeight: 1.6,
              }}>
                Guía interactiva para el viaje de grupo a Japón, septiembre 2026. Itinerario, alojamientos, presupuesto y más.
              </p>
            </div>
          </div>

          {/* Right — quick links */}
          <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
            <div>
              <p style={{
                fontWeight: 600,
                color: "#fff",
                marginBottom: 8,
                fontSize: 12,
                letterSpacing: "0.06em",
              }}>Explorar</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><a href="#/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#e8b74a"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>Itinerario</a></li>
                <li><a href="#/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#e8b74a"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>Calendario</a></li>
                <li><a href="#/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#e8b74a"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>Presupuesto</a></li>
              </ul>
            </div>

            <div>
              <p style={{
                fontWeight: 600,
                color: "#fff",
                marginBottom: 8,
                fontSize: 12,
                letterSpacing: "0.06em",
              }}>Contacto</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                <li><a href="https://www.linkedin.com/in/pablocrespobellido/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#4db5e8"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>LinkedIn</a></li>
                <li><a href="https://github.com/pCresp0/viaje-japon-sept-2026" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section — credit + icons */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
        }}>
          <div style={{ display: "flex", gap: 12 }}>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/pablocrespobellido/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: 36, height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.75)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#4db5e8";
                e.currentTarget.style.color = "#4db5e8";
                e.currentTarget.style.background = "rgba(77,181,232,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
                width: 36, height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.75)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#fff";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          </div>

          <div style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}>
            <p style={{ margin: 0, marginBottom: 4 }}>
              Web diseñada y desarrollada por{" "}
              <strong style={{ color: "#fff", fontWeight: 600 }}>Pablo Crespo Bellido</strong>
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
              © 2026 · Viaje Japón
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
