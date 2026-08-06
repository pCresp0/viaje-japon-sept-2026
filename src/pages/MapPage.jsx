import { MapPin } from "lucide-react";

const locations = [
  { city: "Kioto", lat: 35.0116, lng: 135.7681, emoji: "⛩️", stay: "7 noches", hotels: "Keihan Kyoto Hachijoguchi, Kyoto Tower Annex" },
  { city: "Kanazawa", lat: 36.5944, lng: 136.6561, emoji: "🏯", stay: "1 noche", hotels: "Hotel Resol Trinity Kanazawa" },
  { city: "Takayama", lat: 36.1427, lng: 137.1181, emoji: "🏮", stay: "2 noches", hotels: "Hida Takayama Washington, Hotel Wood Takayama" },
  { city: "Tsumago", lat: 36.0089, lng: 137.5650, emoji: "🚶", stay: "1 noche", hotels: "Tsumagoi Prince Hotel, Manza Kogen" },
  { city: "Tokio", lat: 35.6762, lng: 139.6503, emoji: "🗼", stay: "6 noches", hotels: "KOKO HOTEL Asakusa, Hotel Keihan Asakusa" },
];

export default function MapPage() {
  return (
    <div className="px-4 pt-6 pb-12 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Ubicaciones clave</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>Mapa del viaje</h2>
      </div>

      {/* Map iframe (Google Maps or OpenStreetMap) */}
      <div className="rounded-2xl overflow-hidden mb-6 border" style={{ borderColor: "var(--line)", height: 400 }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6965629.5644915585!2d136.5!3d35.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sjp!4v1693472846821"
          style={{ width: "100%", height: "100%" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Location cards */}
      <p className="eyebrow mb-3" style={{ color: "var(--ink-soft)" }}>Paradas del viaje</p>
      <div className="space-y-3">
        {locations.map((loc, idx) => (
          <div key={idx} className="rounded-xl p-4 border"
            style={{ borderColor: "var(--line)", background: "var(--paper-raised)" }}>
            <div className="flex items-start gap-3 mb-2">
              <span style={{ fontSize: 20 }}>{loc.emoji}</span>
              <div className="flex-1">
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>
                  {loc.city}
                </p>
                <p style={{ fontSize: 12, color: "var(--shu)", fontWeight: 600 }}>
                  {loc.stay}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "var(--indigo)",
                  color: "white",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Ver mapa
              </a>
            </div>
            <p style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              {loc.hotels}
            </p>
          </div>
        ))}
      </div>

      {/* Info box */}
      <div className="rounded-xl p-4 mt-6" style={{ background: "var(--indigo)", color: "white" }}>
        <p style={{ fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
          💡 Todos los alojamientos están ubicados en el mapa. Pulsa "Ver mapa" en cualquiera para más detalles de dirección y cómo llegar desde la estación.
        </p>
      </div>
    </div>
  );
}
