// Extrae los números de día de un texto tipo "Día 3", "Días 7–8",
// "Day 1", "Jour 14"... Funciona igual en cualquier idioma porque sólo
// busca dígitos, no palabras — así no depende de cómo esté traducida la
// etiqueta. Un rango como "7–8" devuelve [7, 8]; un día suelto, [3].
export function parseDayNumbers(dayStr) {
  const matches = String(dayStr || "").match(/\d+/g);
  if (!matches) return [];
  return matches.map(Number);
}
