import { Search, X } from "lucide-react";

export default function SearchResultHighlight({ result, onClear }) {
  if (!result) return null;
  return (
    <div className="mx-4 mt-3 rounded-xl p-3 flex items-start gap-2.5" style={{ background: "#fff7dc", border: "1px solid #e8b74a" }}>
      <Search size={16} style={{ color: "#9a7100", flexShrink: 0, marginTop: 2 }} />
      <div className="flex-1 min-w-0">
        <p style={{ margin: 0, fontSize: 10.5, color: "#806000", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase" }}>Resultado de búsqueda · {result.category}</p>
        <p style={{ margin: "2px 0 0", fontSize: 13.5, color: "var(--ink)", fontWeight: 700, lineHeight: 1.35 }}>{result.title}</p>
        {result.subtitle && <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--ink-soft)" }}>{result.subtitle}</p>}
      </div>
      <button onClick={onClear} aria-label="Quitar destacado" style={{ background: "none", border: 0, color: "#806000", padding: 2 }}><X size={16} /></button>
    </div>
  );
}
