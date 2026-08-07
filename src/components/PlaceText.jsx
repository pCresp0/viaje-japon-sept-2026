import { tokenizePlaces, placeMapsUrl } from "../utils/linkifyPlaces";

export default function PlaceText({ text, linkStyle, className, style, as: Tag = "span" }) {
  const parts = tokenizePlaces(text);

  return (
    <Tag className={className} style={style}>
      {parts.map((p, i) =>
        p.type === "place" ? (
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
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </Tag>
  );
}
