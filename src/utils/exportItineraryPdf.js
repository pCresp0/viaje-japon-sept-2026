import { jsPDF } from "jspdf";
import { tripMeta, flights, stays } from "../data/trip";
import { guides, guidesByDay } from "../data/guides";
import { guideImages } from "../data/guideImages";
import { popCulture } from "../data/popCulture";

// Genera el PDF del itinerario y lo descarga directamente (doc.save()),
// sin pasar por el diálogo de impresión del navegador. A cambio de la
// comodidad de reutilizar CSS que daba window.print(), aquí hay que
// maquetar a mano: texto con salto de línea calculado, imágenes cargadas
// y escaladas SIN recortar (conservando su proporción real, no
// object-fit:cover), y enlaces como anotaciones de clic reales sobre
// las coordenadas exactas del texto — un PDF de verdad, no una foto de
// la pantalla.

const PAGE_W = 210, PAGE_H = 297; // A4 en mm
const MARGIN_X = 16, MARGIN_TOP = 18, MARGIN_BOTTOM = 16;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const COLOR_INK = "#1b1f27";
const COLOR_SOFT = "#5a6070";
const COLOR_SHU = "#7a2c2e";
const COLOR_INDIGO = "#1d3557";
const COLOR_PAPER = "#f7f0e3";
const COLOR_LINE = "#e6dcc4";

const franchiseLabel = { pokemon: "Pokémon", digimon: "Digimon", pelicula: "Película" };

function mm(pt) {
  // jsPDF con unit:"mm" ya trabaja en mm; el alto de línea aproximado
  // para un tamaño de fuente en pt se calcula así (1pt ≈ 0.3528mm).
  return pt * 0.3528;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function exportItineraryPdf(days, { onProgress } = {}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_TOP;

  function ensureSpace(h) {
    if (y + h > PAGE_H - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
  }

  function text(str, { size = 10, color = COLOR_INK, bold = false, italic = false,
    x = MARGIN_X, width = CONTENT_W, lineHeight = 1.42, gapAfter = 1.5 } = {}) {
    if (!str) return;
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : italic ? "italic" : "normal");
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(String(str), width);
    const lh = mm(size) * lineHeight;
    for (const line of lines) {
      ensureSpace(lh);
      doc.text(line, x, y);
      y += lh;
    }
    y += gapAfter;
  }

  function link(str, url, { size = 9, color = COLOR_SHU, x = MARGIN_X, gapAfter = 2 } = {}) {
    if (!url) { text(str, { size, color, x }); return; }
    doc.setFontSize(size);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(color);
    const lh = mm(size) * 1.3;
    ensureSpace(lh);
    doc.textWithLink(str, x, y, { url });
    y += lh + gapAfter;
  }

  function divider() {
    ensureSpace(4);
    doc.setDrawColor(COLOR_LINE);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_X, y, MARGIN_X + CONTENT_W, y);
    y += 4;
  }

  async function image(src, { maxW = CONTENT_W, maxH = 75, gapAfter = 3 } = {}) {
    try {
      const img = await loadImage(src);
      const ratio = img.naturalWidth / img.naturalHeight;
      let w = maxW, h = maxW / ratio;
      // Ajuste "contain": si con el ancho completo se pasa del alto
      // máximo, se reescala por el alto en vez de recortar la imagen.
      if (h > maxH) { h = maxH; w = maxH * ratio; }
      ensureSpace(h + gapAfter);
      const x = MARGIN_X + (maxW - w) / 2;
      const format = /\.png$/i.test(src) ? "PNG" : "JPEG";
      doc.addImage(img, format, x, y, w, h, undefined, "FAST");
      y += h + gapAfter;
    } catch {
      // Si una imagen no carga, se omite sin romper el resto del PDF.
    }
  }

  // ── Portada ─────────────────────────────────────────────────────────
  text(tripMeta.subtitle?.toUpperCase(), { size: 10, bold: true, color: COLOR_SHU, gapAfter: 1 });
  text(tripMeta.title, { size: 24, bold: true, color: COLOR_INDIGO, gapAfter: 2 });
  text(`${tripMeta.people} viajeros · ${tripMeta.start} → ${tripMeta.end}`, { size: 11, color: COLOR_SOFT, gapAfter: 6 });

  divider();
  text("VUELOS", { size: 10, bold: true, color: COLOR_INDIGO, gapAfter: 2 });
  for (const f of [flights.out, flights.back]) {
    text(`${f.label} · ${f.flightNumber}`, { size: 10, bold: true, gapAfter: 0.5 });
    text(f.text, { size: 9.5, color: COLOR_SOFT, gapAfter: 1 });
    if (f.trackUrl) link("Seguir vuelo en vivo ↗", f.trackUrl, { gapAfter: 4 });
  }

  y += 4;
  text(
    `Documento generado desde la guía de viaje — ${new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}`,
    { size: 8, color: COLOR_SOFT }
  );

  // ── Un día por página ───────────────────────────────────────────────
  let dayIndex = 0;
  for (const day of days) {
    doc.addPage();
    y = MARGIN_TOP;
    dayIndex++;
    onProgress?.(dayIndex, days.length);

    // Cabecera del día
    doc.setDrawColor(COLOR_SHU);
    doc.setLineWidth(1);
    doc.line(MARGIN_X, y, MARGIN_X + CONTENT_W, y);
    y += 5;
    text(`DÍA ${day.num} · ${day.weekday?.toUpperCase()} ${day.date}`, { size: 9.5, bold: true, color: COLOR_SHU, gapAfter: 1 });
    text(day.title, { size: 17, bold: true, color: COLOR_INDIGO, gapAfter: 0.5 });
    text(day.cities, { size: 10.5, color: COLOR_SOFT, gapAfter: 3 });

    text(day.summary, { size: 10.5, gapAfter: 4 });

    // Horario
    if (day.schedule?.length) {
      for (const s of day.schedule) {
        const timeW = 16;
        const textW = CONTENT_W - timeW - 2;
        doc.setFontSize(9.5);
        doc.setFont("helvetica", "bold");
        const lines = doc.splitTextToSize(s.text, textW);
        const lh = mm(9.5) * 1.4;
        const blockH = Math.max(lh, lines.length * lh);
        ensureSpace(blockH + 1.5);
        doc.setTextColor(COLOR_SHU);
        doc.text(s.time, MARGIN_X, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(COLOR_INK);
        let ly = y;
        for (const line of lines) {
          doc.text(line, MARGIN_X + timeW, ly);
          ly += lh;
        }
        y += blockH + 1.5;
      }
      y += 2;
    }

    // Contexto histórico
    if (day.history) {
      ensureSpace(10);
      doc.setFillColor(COLOR_PAPER);
      const histLines = doc.splitTextToSize(day.history, CONTENT_W - 6);
      const histH = histLines.length * mm(9) * 1.4 + 6;
      ensureSpace(histH);
      doc.roundedRect(MARGIN_X, y, CONTENT_W, histH, 1.5, 1.5, "F");
      let hy = y + 4.5;
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(COLOR_SOFT);
      for (const line of histLines) {
        doc.text(line, MARGIN_X + 3, hy);
        hy += mm(9) * 1.4;
      }
      y += histH + 3;
    }

    // Hotel de esa noche
    const stay = stays.find((s) => s.afterDay === day.num);
    if (stay) {
      const opt = stay.options[0];
      ensureSpace(6);
      text(`🏨 ${opt.name} — ${stay.city} · ${stay.nights}`, { size: 9.5, bold: true, gapAfter: 0.5 });
      const details = [opt.address, opt.phone, opt.confirmation && `Confirmación: ${opt.confirmation}`, opt.pin && `PIN: ${opt.pin}`]
        .filter(Boolean).join(" · ");
      text(details, { size: 8.5, color: COLOR_SOFT, gapAfter: 1 });
      if (opt.url) link("Ver reserva ↗", opt.url, { size: 8.5, gapAfter: 3 });
    }

    // Guías de los lugares del día — TODO el contenido, sin acordeones
    const placeIds = guidesByDay[day.num] || [];
    if (placeIds.length) {
      y += 2;
      text("📖 QUÉ VAMOS A VER", { size: 10, bold: true, color: COLOR_INDIGO, gapAfter: 2 });

      for (const id of placeIds) {
        const g = guides[id];
        if (!g) continue;

        ensureSpace(14);
        divider();

        const img = guideImages[id];
        if (img) await image(img, { maxH: 70 });

        text(`${g.name}  ${g.jp || ""}`, { size: 12, bold: true, color: COLOR_INDIGO, gapAfter: 0.5 });
        text(`${g.founded || ""}${g.founded && g.tagline ? " · " : ""}${g.tagline || ""}`, { size: 8.5, color: COLOR_SOFT, gapAfter: 2 });

        for (const section of g.sections || []) {
          text(section.title, { size: 9.5, bold: true, color: COLOR_INDIGO, gapAfter: 0.5 });
          text(section.body, { size: 9.5, gapAfter: 2 });
        }

        if (g.curiosities?.length) {
          text("CURIOSIDADES", { size: 8.5, bold: true, color: COLOR_SOFT, gapAfter: 1 });
          for (const c of g.curiosities) {
            text(`•  ${c}`, { size: 8.5, gapAfter: 1, width: CONTENT_W - 3 });
          }
          y += 1;
        }

        if (g.tip) {
          text(`💡 ${g.tip}`, { size: 8.5, italic: true, color: COLOR_SHU, gapAfter: 2 });
        }

        const refs = popCulture[id];
        if (refs?.length) {
          for (const r of refs) {
            text(`${franchiseLabel[r.franchise] || r.franchise} · ${r.title}: ${r.detail}`, { size: 8.5, gapAfter: 1.5 });
          }
        }

        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.name)}`;
        link("Ver en Google Maps ↗", mapsUrl, { size: 8.5, gapAfter: 3 });
      }
    }
  }

  // ── Pie de página con número, en todas las páginas salvo la portada ──
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_SOFT);
    doc.text(`Página ${i - 1} de ${totalPages - 1}`, PAGE_W - MARGIN_X, PAGE_H - 8, { align: "right" });
    doc.text(tripMeta.title, MARGIN_X, PAGE_H - 8);
  }

  doc.save("itinerario-japon-2026.pdf");
}
