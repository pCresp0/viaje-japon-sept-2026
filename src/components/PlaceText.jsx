import { tokenizePlaces, placeMapsUrl } from "../utils/linkifyPlaces";

function getUrlButtonInfo(href) {
  if (/maps\.app\.goo\.gl|google\.com\/maps/i.test(href)) {
    return {
      label: "📍 Maps ↗",
      bg: "rgba(29, 53, 87, 0.09)",
      color: "var(--indigo)",
      border: "1px solid rgba(29, 53, 87, 0.18)",
    };
  }
  if (/flightaware\.com/i.test(href)) {
    return {
      label: "✈️ Seguimiento de vuelo ↗",
      bg: "rgba(192, 57, 43, 0.09)",
      color: "var(--shu)",
      border: "1px solid rgba(192, 57, 43, 0.22)",
    };
  }
  if (/youtube\.com|youtu\.be/i.test(href)) {
    return {
      label: "▶️ Ver vídeo ↗",
      bg: "rgba(220, 38, 38, 0.09)",
      color: "#c53030",
      border: "1px solid rgba(220, 38, 38, 0.22)",
    };
  }
  if (/booking\.com/i.test(href)) {
    return {
      label: "🏨 Ver en Booking ↗",
      bg: "rgba(0, 53, 128, 0.09)",
      color: "#003580",
      border: "1px solid rgba(0, 53, 128, 0.2)",
    };
  }
  if (/getyourguide\.com/i.test(href)) {
    return {
      label: "🎟️ GetYourGuide ↗",
      bg: "rgba(230, 74, 25, 0.09)",
      color: "#d84315",
      border: "1px solid rgba(230, 74, 25, 0.22)",
    };
  }
  if (/drive\.google\.com/i.test(href)) {
    return {
      label: "📁 Ver en Drive ↗",
      bg: "rgba(25, 118, 210, 0.09)",
      color: "#1976d2",
      border: "1px solid rgba(25, 118, 210, 0.2)",
    };
  }
  if (/apple\.com\/.*podcast/i.test(href)) {
    return {
      label: "🎙️ Podcast ↗",
      bg: "rgba(142, 68, 173, 0.09)",
      color: "#8e44ad",
      border: "1px solid rgba(142, 68, 173, 0.2)",
    };
  }

  // Domain fallback
  try {
    const urlObj = new URL(href.startsWith("http") ? href : `https://${href}`);
    const host = urlObj.hostname.replace(/^www\./, "");
    return {
      label: `🔗 ${host} ↗`,
      bg: "rgba(29, 53, 87, 0.08)",
      color: "var(--indigo)",
      border: "1px solid rgba(29, 53, 87, 0.16)",
    };
  } catch {
    return {
      label: "🔗 Ver enlace ↗",
      bg: "rgba(29, 53, 87, 0.08)",
      color: "var(--indigo)",
      border: "1px solid rgba(29, 53, 87, 0.16)",
    };
  }
}

export default function PlaceText({ text, linkStyle, className, style, as: Tag = "span" }) {
  const parts = tokenizePlaces(text);

  return (
    <Tag className={className} style={style}>
      {parts.map((p, i) => {
        if (p.type === "url") {
          const href = p.value.startsWith("http://") || p.value.startsWith("https://")
            ? p.value
            : `https://${p.value}`;

          const info = getUrlButtonInfo(href);

          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 font-semibold transition-all hover:opacity-85 active:scale-95 shadow-2xs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: "0.76em",
                fontWeight: 600,
                padding: "2px 9px",
                borderRadius: 999,
                background: info.bg,
                color: info.color,
                textDecoration: "none",
                whiteSpace: "nowrap",
                verticalAlign: "middle",
                marginLeft: 4,
                marginRight: 2,
                border: info.border,
                ...linkStyle,
              }}
            >
              {info.label}
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
