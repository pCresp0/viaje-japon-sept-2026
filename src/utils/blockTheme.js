/** Colores de los 3 bloques del viaje (alineados con itinerario / días). */
export const BLOCK_COLORS = {
  kioto: {
    id: "kioto",
    base: "#BC4749",
    deep: "#7A2C2E",
    soft: "rgba(188, 71, 73, 0.08)",
  },
  alpes: {
    id: "alpes",
    base: "#2E7D5B",
    deep: "#1A4A35",
    soft: "rgba(46, 125, 91, 0.08)",
  },
  tokio: {
    id: "tokio",
    base: "#1D3557",
    deep: "#12213A",
    soft: "rgba(29, 53, 87, 0.06)",
  },
};

/**
 * Fondo del header de billete.
 * Mismo bloque → degradado suave del tono.
 * Cruce de bloques → izquierda origen, derecha destino, difuminado.
 */
export function ticketHeaderBackground(fromBlock, toBlock = fromBlock) {
  const from = BLOCK_COLORS[fromBlock] || BLOCK_COLORS.tokio;
  const to = BLOCK_COLORS[toBlock] || from;

  if (fromBlock === toBlock) {
    return `linear-gradient(135deg, ${from.base} 0%, ${from.deep} 100%)`;
  }

  // Transición ancha y suave (≈40% central difuminado)
  return `linear-gradient(100deg,
    ${from.base} 0%,
    ${from.base} 22%,
    ${from.deep} 38%,
    ${to.deep} 62%,
    ${to.base} 78%,
    ${to.base} 100%)`;
}

/** Color sólido para botones / acentos (prioriza el bloque de llegada). */
export function ticketAccentColor(fromBlock, toBlock = fromBlock) {
  const to = BLOCK_COLORS[toBlock] || BLOCK_COLORS[fromBlock] || BLOCK_COLORS.tokio;
  return to.base;
}

export function ticketSoftBackground(fromBlock, toBlock = fromBlock) {
  const to = BLOCK_COLORS[toBlock] || BLOCK_COLORS[fromBlock] || BLOCK_COLORS.tokio;
  return to.soft;
}
