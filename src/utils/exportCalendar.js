/**
 * Genera y descarga un archivo .ics con todo el itinerario del viaje
 * compatible con Apple Calendar, Google Calendar, Outlook, etc.
 */
export function downloadIcsCalendar(daysList) {
  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Viaje Morisqueño a Japon 2026//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Viaje a Japón 2026 🇯🇵",
    "X-WR-TIMEZONE:Asia/Tokyo"
  ];

  const nowStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  (daysList || []).forEach((day) => {
    if (!day.date) return;
    const dateFormatted = day.date.replace(/-/g, ""); // e.g. "20260906"
    
    // For all-day event in .ics, DTSTART is date and DTEND is the next date
    const parts = day.date.split("-").map(Number);
    const startDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    
    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
    const endDay = String(endDate.getDate()).padStart(2, "0");
    const endDateFormatted = `${endYear}${endMonth}${endDay}`;

    const summary = `🇯🇵 Día ${day.num}: ${day.title}`;
    const description = [
      `Día ${day.num} - ${day.title}`,
      `Ubicación: ${day.cities || ""}`,
      day.summary ? day.summary.replace(/\n/g, " ") : "",
      "---",
      "Detalle del itinerario en la web del Viaje a Japón 2026"
    ].join("\\n");

    icsContent.push("BEGIN:VEVENT");
    icsContent.push(`UID:japan-trip-2026-day-${day.num}@viaje-japon`);
    icsContent.push(`DTSTAMP:${nowStamp}`);
    icsContent.push(`DTSTART;VALUE=DATE:${dateFormatted}`);
    icsContent.push(`DTEND;VALUE=DATE:${endDateFormatted}`);
    icsContent.push(`SUMMARY:${summary}`);
    icsContent.push(`DESCRIPTION:${description}`);
    if (day.cities) {
      icsContent.push(`LOCATION:${day.cities}`);
    }
    icsContent.push("END:VEVENT");
  });

  icsContent.push("END:VCALENDAR");

  const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "viaje-japon-2026.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
