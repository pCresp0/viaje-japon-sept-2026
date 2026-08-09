// Convierte cualquier texto en un id seguro para usar como atributo
// HTML id (sin espacios, sin acentos, sin caracteres especiales).
// Se usa tanto al construir el índice de búsqueda (targetId) como al
// renderizar los anclajes reales en cada página, para que ambos lados
// generen exactamente el mismo string sin duplicar lógica.
export function slug(...parts) {
  return parts
    .filter((p) => p !== null && p !== undefined && p !== "")
    .join("-")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
