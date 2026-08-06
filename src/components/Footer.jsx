import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 px-4 pb-8 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>
          Web hecha por{" "}
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>Pablo Crespo Bellido</span>
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/pCresp0/viaje-japon-sept-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ fontSize: 12, color: "var(--ink-soft)" }}
          >
            <ExternalLink size={12} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pablocrespobellido/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ fontSize: 12, color: "#0077b5" }}
          >
            <ExternalLink size={12} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
