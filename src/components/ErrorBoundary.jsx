import { Component } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

/**
 * Contiene los fallos de una sola pestaña/página para que un error ahí
 * no tire toda la app con una pantalla en blanco. Los error boundaries
 * de React sólo pueden ser componentes de clase — no existe el
 * equivalente en hooks —, así que esto se queda como clase aunque el
 * resto de la app use funciones.
 *
 * Se resetea automáticamente si cambia `resetKey` (usado en App.jsx para
 * pasar la pestaña activa: así, si el usuario navega a otro apartado y
 * vuelve al que falló, se le da una oportunidad nueva en vez de quedarse
 * "atascado" en el error para siempre).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Error capturado por ErrorBoundary:", error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-4 pt-10 pb-12" style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "#bc474918", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <AlertTriangle size={26} style={{ color: "var(--shu)" }} />
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>
            Este apartado ha fallado al cargar
          </p>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 20 }}>
            El resto de la app sigue funcionando con normalidad — prueba a
            recargar sólo esta parte, o cambia a otra pestaña y vuelve.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 20px", borderRadius: 999,
              background: "var(--shu)", color: "white",
              border: "none", fontSize: 13.5, fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={15} />
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
