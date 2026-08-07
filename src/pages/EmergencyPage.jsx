import { Phone, MapPin, ShieldAlert, Building2, Hospital } from "lucide-react";

const emergencyNumbers = [
  { label: "Policía", number: "110", note: "Emergencias con la policía japonesa" },
  { label: "Ambulancia / Bomberos", number: "119", note: "Emergencias médicas o incendios" },
  { label: "Línea de ayuda turística (JNTO)", number: "050-3816-2787", note: "24h, en inglés — para cualquier problema como turista" },
];

const embassy = {
  name: "Embajada de España en Tokio",
  address: "1-3-29 Roppongi, Minato-ku, Tokio 106-0032",
  phone: "+81 3-3583-8531",
  emergencyPhone: "+81 90-6949-8659",
  note: "Teléfono de emergencia consular las 24h para casos graves (accidente, detención, fallecimiento).",
};

export default function EmergencyPage() {
  return (
    <div className="px-4 pt-3 pb-12">
      <div className="mb-6">
        <p className="eyebrow mb-1" style={{ color: "var(--shu)" }}>Por si acaso</p>
        <h2 className="font-display text-2xl" style={{ color: "var(--indigo)" }}>
          Emergencias y contactos
        </h2>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 8, lineHeight: 1.6 }}>
          Esperamos no necesitar nada de esto, pero mejor tenerlo a mano por si acaso.
        </p>
      </div>

      {/* Emergency numbers */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert size={16} style={{ color: "var(--shu)" }} />
          <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>Números de emergencia en Japón</p>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {emergencyNumbers.map((e, idx) => (
            <a
              key={idx}
              href={`tel:${e.number}`}
              className="rounded-xl p-4 flex items-center gap-3 transition-all"
              style={{ background: "var(--paper-raised)", border: "1px solid var(--line)", textDecoration: "none" }}
              onMouseEnter={ev => { ev.currentTarget.style.borderColor = "var(--shu)"; }}
              onMouseLeave={ev => { ev.currentTarget.style.borderColor = "var(--line)"; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(188,71,73,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Phone size={18} style={{ color: "var(--shu)" }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{e.label}</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "var(--shu)", fontFamily: "var(--font-display)" }}>{e.number}</p>
                <p style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 2 }}>{e.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Embassy */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={16} style={{ color: "var(--indigo)" }} />
          <p className="eyebrow" style={{ margin: 0, color: "var(--ink-soft)" }}>Embajada de España</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: "var(--indigo)", color: "white" }}>
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, fontFamily: "var(--font-display)" }}>{embassy.name}</p>

          <div className="flex items-start gap-2 mb-3">
            <MapPin size={15} style={{ color: "rgba(255,255,255,0.6)", marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{embassy.address}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <a href={`tel:${embassy.phone}`} className="flex-1 rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.08)", textDecoration: "none" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Teléfono general</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginTop: 2 }}>{embassy.phone}</p>
            </a>
            <a href={`tel:${embassy.emergencyPhone}`} className="flex-1 rounded-xl p-3"
              style={{ background: "rgba(188,71,73,0.25)", border: "1px solid rgba(188,71,73,0.5)", textDecoration: "none" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Emergencia 24h</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white", marginTop: 2 }}>{embassy.emergencyPhone}</p>
            </a>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 12, lineHeight: 1.5 }}>
            {embassy.note}
          </p>
        </div>
      </div>

      {/* Insurance reminder */}
      <div className="rounded-2xl p-5" style={{ background: "var(--paper-raised)", border: "1px solid var(--line)" }}>
        <div className="flex items-center gap-2 mb-2">
          <Hospital size={16} style={{ color: "var(--forest)" }} />
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Seguro de viaje</p>
        </div>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Recordad tener a mano el número de póliza y el teléfono de asistencia 24h de vuestro seguro de viaje antes de salir. En Japón la sanidad privada puede ser cara sin cobertura.
        </p>
      </div>
    </div>
  );
}
