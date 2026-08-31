// Hash SHA-256 (hex) vía Web Crypto API — evita guardar contraseñas en
// texto plano en el repo. Nota: esto sigue siendo una comprobación en el
// cliente (no una autenticación real de servidor): cualquiera que abra el
// bundle puede ver el hash, pero ya no puede leer la contraseña a simple
// vista al clonar/mirar el repositorio.
export async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
