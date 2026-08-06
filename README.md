# 🗻 Viaje a Japón — Septiembre 2026

Guía de viaje interactiva para un grupo de amigos, pensada para usarse **desde el móvil, durante el viaje, con o sin conexión**. Sustituye al típico documento de Word / Excel por una web ligera, instalable como app, que centraliza itinerario, vuelos, alojamientos y presupuesto.

🔗 **Producción:** https://pcresp0.github.io/viaje-japon-sept-2026/
🔒 Acceso restringido al grupo mediante contraseña (ver [Acceso y seguridad](#-acceso-y-seguridad)).

---

## ✨ Funcionalidades

- **Hoy** — detecta automáticamente en qué día del viaje estás (según la fecha del dispositivo) y muestra el plan de ese día sin tener que buscarlo.
- **Itinerario** — los 15 días del viaje, navegables mediante una línea de "mapa de metro" que agrupa los días por bloque geográfico (Kioto/Nara/Osaka, Alpes Japoneses, Tokio).
- **Viaje** — vuelos confirmados (con seguimiento en vivo) y alojamientos de cada noche, con enlace directo a la reserva y a Google Maps.
- **Presupuesto** — desglose por categorías (vuelos, alojamiento, transporte, comida, extras) y detalle día a día de los transportes, con coste real vs. coste cubierto por JR Pass.
- **Funciona sin conexión** — Progressive Web App (PWA): instalable en la pantalla de inicio (Android/iOS/escritorio) y con todo el contenido cacheado para consultarlo sin datos móviles.
- **Acceso con contraseña** — pantalla de bloqueo antes de mostrar ningún contenido del viaje.

## 🧱 Stack técnico

| Capa | Elección | Por qué |
|---|---|---|
| Framework | [React 19](https://react.dev/) + [Vite](https://vite.dev/) | SPA ligera, build rápido, sin necesidad de servidor (todo estático) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) | Utilidades atómicas + tokens de diseño propios vía CSS variables |
| Iconos | [lucide-react](https://lucide.dev/) | Set de iconos ligero, sin dependencias de red |
| PWA / offline | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) | Genera el Service Worker y el manifest automáticamente en el build |
| Hosting | GitHub Pages | Gratuito, no requiere backend — todo el contenido es estático |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) | Build y despliegue automático en cada `push` a `main` |

No hay backend ni base de datos: **todo el contenido del viaje vive en un único fichero de datos** (`src/data/trip.js`), extraído de la planificación original (Word + Excel). Esto hace que actualizar el itinerario sea editar ese archivo y hacer `push` — el resto de la web (UI, navegación, PWA) no cambia.

## 🗂️ Arquitectura y estructura de carpetas

```
src/
├── data/
│   └── trip.js          # Única fuente de verdad: vuelos, días, alojamientos, presupuesto, transportes
├── utils/
│   ├── date.js           # Lógica de "¿qué día del viaje es hoy?"
│   ├── auth.js            # Hash de la contraseña de acceso (SHA-256 vía Web Crypto)
│   └── maps.js             # Generador de enlaces a Google Maps
├── components/
│   ├── PasswordGate.jsx     # Pantalla de bloqueo inicial
│   ├── BottomNav.jsx         # Navegación inferior (4 pestañas, mobile-first)
│   ├── RouteLine.jsx          # El "mapa de metro" — elemento de navegación visual entre los 15 días
│   └── DayCard.jsx              # Tarjeta de detalle de un día (resumen, horario, alojamiento, contexto histórico)
├── pages/
│   ├── Home.jsx           # Pestaña "Hoy"
│   ├── Itinerary.jsx       # Pestaña "Itinerario" (acordeón de los 15 días)
│   ├── InfoPage.jsx         # Pestaña "Viaje" (vuelos + alojamientos)
│   └── BudgetPage.jsx        # Pestaña "Presupuesto"
├── App.jsx                # Enrutado por pestañas (estado local, sin react-router)
└── main.jsx                # Punto de entrada
```

**Por qué no hay router de verdad:** al ser una app de 4 pestañas sin URLs que compartir por separado, un `useState` en `App.jsx` es más simple y evita problemas de recarga en GitHub Pages (que no sirve rutas del lado del servidor).

## 🎨 Sistema de diseño

Paleta y tipografía definidas como variables CSS en `src/index.css`:

- **Índigo** (`--indigo`, `#1D3557`) — color de marca, cabecera, bloque "Tokio".
- **Rojo shu/torii** (`--shu`, `#BC4749`) — acento de interacción, bloque "Kioto".
- **Verde bosque** (`--forest`, `#2E7D5B`) — bloque "Alpes Japoneses".
- **Oro** (`--gold`) — cifras de presupuesto.
- **Papel** (`--paper`) — fondo neutro, pensado para legibilidad al aire libre / luz solar directa.

Tipografía: fuentes de sistema (serif para titulares tipo sello, sans para el cuerpo) — **sin dependencias de Google Fonts**, para que la web no dependa de red externa incluso en el primer arranque offline.

**Elemento distintivo:** `RouteLine.jsx` dibuja los 15 días como estaciones de una línea de metro/tren, coloreadas por bloque del viaje, con el día actual resaltado — un guiño directo a los mapas de líneas de tren japonesas que vais a usar constantemente durante el viaje.

## 🔒 Acceso y seguridad

La web pide una contraseña antes de mostrar nada. Importante entender **qué protege y qué no**:

- La contraseña **no se guarda en texto plano** en el código: solo se guarda su hash SHA-256 (`src/utils/auth.js`), y se compara contra el hash de lo que el usuario escribe.
- Esto **no es seguridad real de nivel producción**: el repositorio es público, así que el hash es visible, y una contraseña corta podría romperse por fuerza bruta offline por alguien con conocimientos técnicos y motivación.
- Su objetivo es más modesto y realista para este caso de uso: **evitar que un visitante casual del repo de GitHub vea el contenido del viaje** (fechas, hoteles, códigos PIN de reserva, etc.), no protegerlo de un atacante decidido.
- Una vez introducida correctamente, la contraseña se recuerda en el dispositivo (`localStorage`) para no tener que repetirla en cada visita.

## 📴 Offline / PWA

`vite-plugin-pwa` genera un Service Worker (Workbox) que cachea el "app shell" (HTML, JS, CSS) y todos los datos del viaje en el primer acceso con conexión. A partir de ahí, la web funciona sin datos móviles — útil para consultarla en el metro o en zonas sin cobertura.

**Para instalarla en el móvil:**
- **Android (Chrome):** menú ⋮ → "Añadir a pantalla de inicio".
- **iOS (Safari):** botón compartir → "Añadir a pantalla de inicio".

Los enlaces externos (reservas de Booking.com, Google Maps, seguimiento de vuelos) sí requieren conexión — solo el contenido propio de la guía funciona sin ella.

## 🛠️ Desarrollo local

```bash
npm install
npm run dev       # servidor de desarrollo con recarga en caliente
npm run build      # build de producción a dist/
npm run preview     # sirve el build de producción localmente
```

## 🚀 Despliegue

Automático vía GitHub Actions (`.github/workflows/deploy.yml`): cada `push` a `main` dispara un build (`npm ci && npm run build`) y publica `dist/` en GitHub Pages a través de `actions/deploy-pages`.

**Requisito de configuración (una sola vez):** en el repo → *Settings → Pages → Build and deployment → Source* debe estar puesto en **"GitHub Actions"** (no "Deploy from a branch").

## ✏️ Cómo actualizar el contenido

Todo el contenido vive en `src/data/trip.js`:

- `flights` — vuelos de ida y vuelta.
- `blocks` — los 3 bloques/tramos del viaje (Kioto/Nara/Osaka, Alpes, Tokio).
- `stays` — alojamientos de cada noche (nombre, precio, PIN de reserva, enlace).
- `days` — array con los 15 días (resumen, horario detallado, contexto histórico, gasto estimado).
- `transports` — coste de cada trayecto, con y sin JR Pass.
- `budget` — desglose de presupuesto estimado.

Basta con editar ese fichero y hacer `git push` a `main`: el despliegue es automático.

---

*Construido con la ayuda de Claude a partir de la planificación original del viaje (Word + Excel).*
