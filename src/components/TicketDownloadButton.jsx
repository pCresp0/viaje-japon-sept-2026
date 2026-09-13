import { FileDown } from "lucide-react";

/**
 * Botón compacto para abrir un billete/voucher en PDF ya subido a
 * /public/images/tickets/. Un único botón (antes había dos y quedaba
 * mal) -- al abrir el PDF en el visor del móvil, desde ahí mismo se
 * puede guardar, compartir o imprimir con las herramientas propias
 * del visor.
 */
export default function TicketDownloadButton({ pdfPath, label = "Billete (PDF)" }) {
  return (
    <a
      href={pdfPath}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-600 bg-amber-600 text-white hover:bg-amber-700 shadow-xs cursor-pointer transition-colors no-underline mt-2"
    >
      <FileDown size={14} /> Ver {label}
    </a>
  );
}
