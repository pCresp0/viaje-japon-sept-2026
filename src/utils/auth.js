const SALT = "japon2026";
// SHA-256("japon2026" + "pokemon"), precomputed. The real password is never
// stored in the source — only this hash, so it can't be read directly from
// the code.
const PASSWORD_HASH =
  "7ac1efedc16dd826aafe860a58c1304cf305af1e7d3ff248ef14f6b7bd48a5c7";

export async function checkPassword(input) {
  const enc = new TextEncoder().encode(SALT + input.trim().toLowerCase());
  const buf = await crypto.subtle.digest("SHA-256", enc);
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === PASSWORD_HASH;
}

const STORAGE_KEY = "trip-unlocked-v1";

export function isUnlocked() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setUnlocked() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage not available (private browsing, etc.) — just skip persisting.
  }
}
