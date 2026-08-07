# 🗻 Viaje a Japón — Septiembre 2026 🇯🇵

Guía de viaje interactiva, *mobile-first* e instalable como **Progressive Web App (PWA)**, diseñada para un grupo de 5 amigos (*"Viaje Morisqueño"*) durante su ruta por Japón del **6 al 21 de septiembre de 2026**.

Sustituye a los tradicionales documentos en PDF/Excel por una aplicación estática de alto rendimiento, optimizada para **funcionar al 100% sin conexión a internet** mediante la interceptación de peticiones de red vía Service Workers. Ideal para su uso en movimiento (metro, zonas rurales o áreas sin cobertura de datos).

---

## ✨ Funcionalidades y Módulos

- 🏠 **Inicio & Hoy** — Detección automática en tiempo real del día del viaje iterando sobre el estado temporal local. Muestra el itinerario activo del día o una cuenta atrás algorítmica hasta el despegue.
- 📅 **Calendario** — Vista mensual interactiva renderizada en CSS Grid. Al pulsar en cualquier nodo diario, se invoca un componente modal con la agenda completa.
- 🚇 **Itinerario (15 Días)** — Navegación visual mediante un componente custom (`RouteLine`) inspirado en los diagramas de tránsito metropolitano de Tokio, separando lógicamente el viaje en 3 clústeres geográficos (Kansai, Alpes Japoneses y Gran Tokio).
- ✈️ **Vuelos & Hoteles** — Integración centralizada de telemetría de vuelos (Qatar Airways QR148/QR809) y geolocalización de alojamientos mediante enlaces profundos (Deep Links) a Google Maps y códigos PIN de Booking.
- 🚆 **Transportes** — Guía operativa sobre logística ferroviaria (Shinkansen, tarjetas IC) y logística de equipajes (Takkyubin).
- 🗺️ **Mapa Interactivo (Leaflet)** — Renderizado espacial interactivo sin dependencias de APIs de pago comerciales, situando coordenadas geoespaciales clave de la ruta. Incluye sistema de **filtros por categorías** (Ruta completa, Hoteles, Excursiones, Transportes) para facilitar la visualización.
- 🌤️ **Clima Dinámico** — Sistema de previsión meteorológica simulado para las fechas del viaje (basado en promedios históricos de septiembre) con información sobre temperaturas, lluvias, ropa recomendada y eventos naturales.
- 🗣️ **Frases y TTS (Text-to-Speech)** — Glosario interactivo en japonés que aprovecha la **Web Speech API (`window.speechSynthesis`)** nativa del navegador para síntesis de voz en tiempo real sin requerir *assets* de audio externos.
- 🌍 **Sistema Multi-idioma (i18n)** — Arquitectura de internacionalización centralizada (`LanguageContext`) mediante React Context, soportando **4 idiomas simultáneos** (Español, English, Français, Tagalog) sin duplicar datos estructurados ni requerir dependencias pesadas como `react-i18next`.
- 📋 **Preparativos** — Checklist interactivo de tareas organizativas implementando **persistencia de estado local (`localStorage`)** para mantener la sincronización entre sesiones.
- 💰 **Presupuesto** — Desglose financiero calculado dinámicamente desde el modelo de datos.
- 🛠️ **Herramientas** — Reloj sincronizado con el huso horario oficial de Japón (JST) y conversor de divisas interactivo JPY ↔ EUR.

---

## 🧱 Arquitectura y Stack Técnico

El proyecto está diseñado siguiendo principios arquitectónicos modernos de **Jamstack (JavaScript, APIs, and Markup)**, maximizando el rendimiento (TTFB/LCP) y garantizando la robustez offline.

| Capa | Tecnología | Fundamentación Técnica |
|---|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) | Arquitectura SPA estática. Vite proporciona Hot Module Replacement (HMR) casi instantáneo y una fase de *build* ultra-optimizada mediante Rollup. |
| **Estilos & UI** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) | Motor de utilidades atómicas *just-in-time* (JIT). Diseño completamente *responsive* implementando flexbox avanzado y soporte nativo para *Safe Area Insets* (`env(safe-area-inset-top)`) en dispositivos iOS/Android. |
| **Mapas Vectoriales**| [Leaflet](https://leafletjs.com/) + React-Leaflet | Renderizado de mapas DOM-basados, proporcionando una huella de memoria minúscula frente a alternativas WebGL. |
| **Soporte Offline PWA**| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) | Service Worker autogenerado con estrategias `skipWaiting` y `clientsClaim`. Caché exhaustiva de todos los *assets* estáticos (HTML, JS, CSS, WebP). |
| **Iconografía** | [Lucide React](https://lucide.dev/) | Iconos SVG optimizados mediante *tree-shaking*, integrados en el *bundle* de JavaScript para evitar latencia de red. |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) | Entorno de *Edge Computing*. Despliegues inmutables automatizados con cada `push` a la rama `main` en GitHub. |

### 📂 Topología de Directorios y Arquitectura de UI

La interfaz de usuario implementa un patrón **Dual Layout**: 
- **Desktop (`>= 768px`)**: Barra lateral adhesiva (*Sticky Sidebar*) clásica de aplicaciones web.
- **Mobile (`< 768px`)**: Implementación estricta *Mobile-First* con un encabezado anclado al Viewport (`position: fixed`) y un panel lateral deslizable (*Drawer*) fuera del flujo de scroll principal, evitando problemas de recálculo de layouts y comportamientos anómalos (rubber-banding) en iOS Safari.

```
viaje-japon-sept-2026/
├── public/                 # Assets estáticos (Favicons, manifest PWA, imágenes WebP)
├── src/
│   ├── components/         # Módulos de UI reutilizables
│   │   ├── Nav.jsx         # Controlador maestro de navegación (TopBar Mobile + Sidebar Desktop)
│   │   ├── AccessGate.jsx  # Capa de seguridad y control de acceso inicial
│   │   └── ...
│   ├── data/
│   │   ├── trip.js         # Single Source of Truth (SSOT). Datos base en Español.
│   │   └── locales/        # Superposiciones de traducción (EN, FR, TL).
│   ├── i18n/               # Sistema centralizado de internacionalización (Context & Hooks).
│   ├── pages/              # Módulos de vistas enrutadas
│   ├── utils/
├── index.html              # HTML5 semántico, metas de viewport-fit=cover y theme-color (#4d1c1e)
├── vite.config.js          # Configuración del empaquetador y plugins de PWA/Tailwind
└── package.json            # Dependencias y scripts de construcción
```

---

## 🎨 Sistema de Diseño y UX

- **Paleta Temática Japonesa:**
  - **Rojo Shu/Torii** (`#4d1c1e` / `#bc4749`): Color primario de marca, cabeceras y bloque Kansai (Kioto/Nara/Osaka).
  - **Verde Bosque** (`#2e7d5b`): Bloque geográfico de los Alpes Japoneses.
  - **Azul Índigo** (`#1d3557`): Bloque geográfico de Tokio y elementos de transporte.
  - **Oro** (`#c9a227`): Acentos de presupuestos y cifras destacadas.
  - **Papel Washi** (`#f7f0e3`): Fondo cálido neutro optimizado para legibilidad bajo luz solar directa.
- **Tipografía Nativa:** Uso de fuentes del sistema (Serif para encabezados y Sans-Serif para cuerpo) para garantizar rendimiento extremo y renderizado inmediato sin depender de Google Fonts ni red externa.
- **Header Móvil Permanente:** La cabecera móvil (`TopBar`) está anclada de forma fija al *viewport* con integración de la safe-area de iOS/Android (`env(safe-area-inset-top)`), permitiendo alternar entre secciones al instante desde cualquier punto de scroll.

---

## 📴 Soporte Offline / PWA (Progressive Web App)

El Service Worker generado por Workbox cachea automáticamente el *app shell* (HTML, JS, CSS) y todos los datos estáticos en el primer acceso.

### 📱 Instalación en Dispositivos Móviles:
- **iOS (Safari):** Pulsar el botón **Compartir** ➔ **"Añadir a la pantalla de inicio"**.
- **Android (Chrome):** Pulsar el menú **⋮** ➔ **"Instalar aplicación"** o **"Añadir a pantalla de inicio"**.

---

## 🛠️ Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/pCresp0/viaje-japon-sept-2026.git
   cd viaje-japon-sept-2026
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

5. **Previsualizar la build local:**
   ```bash
   npm run preview
   ```

---

## ✏️ Mantenimiento de Contenidos

Para actualizar cualquier información del viaje (fechas, precios, hoteles, itinerarios o tareas pendientes), **basta con modificar el archivo `src/data/trip.js`** y hacer un `git push` a `main`. Vercel desplegará los cambios en producción automáticamente en segundos.

---

*Desarrollado para el Viaje Morisqueño a Japón 2026 🇯🇵*
