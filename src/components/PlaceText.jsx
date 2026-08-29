import { tokenizePlaces, placeMapsUrl } from "../utils/linkifyPlaces";

export default function PlaceText({ text, linkStyle, className, style, as: Tag = "span" }) {
  const parts = tokenizePlaces(text);

  return (
    <Tag className={className} style={style}>
      {parts.map((p, i) => {
        if (p.type === "url") {
          const href = p.value.startsWith("http://") || p.value.startsWith("https://")
            ? p.value
            : `https://${p.value}`;
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-0.5 font-semibold text-indigo-700 dark:text-indigo-400 hover:underline"
              style={{
                color: "var(--indigo)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                fontWeight: 700,
                ...linkStyle,
              }}
            >
              {p.value} ↗
            </a>
          );
        }

        if (p.type === "place") {
          return (
            <a
              key={i}
              href={placeMapsUrl(p.value)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: "inherit",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                textUnderlineOffset: 3,
                fontWeight: 600,
                ...linkStyle,
              }}
            >
              {p.value}
            </a>
          );
        }
        
        if (p.type === "bold") {
          return <strong key={i} style={{ fontWeight: 700, color: "var(--ink-bold)" }}>{p.value}</strong>;
        }

        return <span key={i}>{p.value}</span>;
      })}
    </Tag>
  );
}
