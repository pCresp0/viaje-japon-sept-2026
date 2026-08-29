export function exportTransportExcel(transports, title = "Itinerario_Transportes") {
  // Configurar las cabeceras
  const headers = ["Día", "Fecha", "Transporte", "Origen", "Destino", "Tipo", "Coste Real (€)", "Estado"];
  
  // Procesar los datos
  const rows = transports.map(t => {
    return [
      t.day,
      t.date,
      `"${(t.name || "").replace(/"/g, '""')}"`,
      `"${(t.from || "").replace(/"/g, '""')}"`,
      `"${(t.to || "").replace(/"/g, '""')}"`,
      `"${(t.type || "").replace(/"/g, '""')}"`,
      t.real,
      t.purchased ? "Comprado" : "Pendiente"
    ].join(";");
  });

  // Unir cabeceras y filas (usamos BOM para que Excel reconozca los acentos correctamente)
  const csvContent = "\uFEFF" + headers.join(";") + "\n" + rows.join("\n");
  
  // Crear el Blob
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  // Crear el enlace de descarga
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${title}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  
  // Hacer clic y limpiar
  link.click();
  document.body.removeChild(link);
}
