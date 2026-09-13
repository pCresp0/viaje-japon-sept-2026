import { FileDown, ExternalLink } from "lucide-react";

/**
 * Botón compacto para descargar o abrir un billete/voucher en PDF ya
 * subido a /public/images/tickets/. Pensado para paradas de
 * transporte donde solo hace falta el acceso directo al documento,
 * sin toda la parafernalia de una tarjeta de billete completa.
 */
export default function TicketDownloadButton({ pdfPath, filename, label = "Billete (PDF)" }) {
  return (
    <div className="flex items-center gap-2 flex-wrap mt-2">
      <a
        href={pdfPath}
        download={filename}
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-600 bg-amber-600 text-white hover:bg-amber-700 shadow-xs cursor-pointer transition-colors no-underline"
      >
        <FileDown size={14} /> Descargar {label}
      </a>
      <a
        href={pdfPath}
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors no-underline"
      >
        <ExternalLink size={12} /> Abrir
      </a>
    </div>
  );
}
