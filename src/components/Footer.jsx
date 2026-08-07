export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      flexShrink: 0,
      width: "100%",
      padding: "32px 24px",
      paddingBottom: "calc(32px + env(safe-area-inset-bottom, 0px))",
      marginTop: "auto",
    }}>
      {/* Fondo de olas (capa absoluta, no recorta el contenido) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/waves-sidebar.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          pointerEvents: "none",
        }}
      />
      {/* Overlay más opaco que el menú lateral → olas más atenuadas */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(77,28,30,0.97) 0%, rgba(122,44,46,0.95) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
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
    </footer>
  );
}
