# 🗻 Viaje a Japón — Septiembre 2026 🇯🇵

Guía de viaje interactiva, *mobile-first* e instalable como **Progressive Web App (PWA)**, diseñada para un grupo de 5 amigos (*"Viaje Morisqueño"*) durante su ruta por Japón del **6 al 21 de septiembre de 2026**.

Sustituye a los tradicionales documentos en PDF/Excel por una aplicación estática de alto rendimiento, optimizada para **funcionar al 100% sin conexión a internet** durante el viaje (en el metro, zonas rurales o sin cobertura de datos).

---

## ✨ Funcionalidades y Módulos

- 🏠 **Inicio & Hoy** — Detección automática en tiempo real del día del viaje en función de la fecha del dispositivo (mostrando el itinerario activo del día) o cuenta atrás interactiva hasta la salida con resumen del primer día.
- 📅 **Calendario** — Vista mensual interactiva de Septiembre 2026 en cuadrícula, coloreada por bloques geográficos. Al pulsar en cualquier día se despliega una hoja modal con la agenda completa.
- 🚇 **Itinerario (15 Días)** — Navegación visual mediante un componente estilizado de mapa de metro/tren japonés (`RouteLine`), separando el viaje en 3 tramos (Kansai, Alpes Japoneses y Tokio) con horarios, actividades y contexto.
- ✈️ **Vuelos & Hoteles (Info)** — Registro completo de vuelos confirmados con **Qatar Airways** (QR148/QR809 vía Doha) con enlace de seguimiento en vivo (*FlightAware*), así como alojamientos de cada noche con PIN de reserva de Booking y acceso directo a Google Maps.
- 🚆 **Transportes** — Guía de tarjetas IC (Suica/Pasmo), billetes de Shinkansen, envíos de equipaje (*Takkyubin*) y comparativa financiera del coste real vs. pases JR Pass.
- 🏛️ **Lugares Imprescindibles** — Catálogo de monumentos, templos y puntos de interés agrupados por regiones con etiquetas descriptivas.
- 🍜 **Gastronomía (Comidas)** — Guía de platos típicos de la cocina japonesa (Ramen, Takoyaki, Kaiseki, Okonomiyaki...) con consejos de consumo y dónde probarlos.
- 🗺️ **Mapa Interactivo** — Renderizado espacial interactivo con **Leaflet** que sitúa las paradas clave, aeropuertos y nodos de transporte del recorrido.
- 🌤️ **Clima** — Previsiones meteorológicas por ciudades para el mes de septiembre y recomendaciones prácticas de vestimenta.
- 🗣️ **Frases y Etiqueta Cultural** — Glosario interactivo en japonés con **síntesis de voz nativa (TTS vía Web Speech API)** para escuchar la pronunciación correcta, acompañado de normas de comportamiento local (onsen, propinas, palillos, colas).
- 📋 **Preparativos** — Checklist interactivo de documentación (Pasaporte, Visit Japan Web), electrónica, seguro y divisas, con **persistencia de estado local (`localStorage`)**.
- 💰 **Presupuesto** — Desglose de costes estimados (totales y por persona) categorizados por vuelos, alojamientos, transporte, comidas y entradas.
- 🛠️ **Herramientas** — Reloj con hora oficial de Japón (JST) en tiempo real y conversor interactivo de divisas Yen (JPY) ↔ Euro (EUR).
- 🚨 **Emergencias** — Teléfonos de urgencia en Japón (110 Policía, 119 Ambulancia/Fuego), contacto de la Embajada de España en Tokio y datos del seguro de viaje.
- 📝 **Cosas Pendientes** — Checklist de tareas organizativas del grupo previas al viaje, con contador de progreso e **indicador visual animado** en la navegación.
- 📜 **Historia de Japón** — Resumen divulgativo por épocas históricas para contextualizar los lugares a visitar.

---

## 🧱 Stack Técnico e Infraestructura

| Capa | Tecnología | Fundamentación Técnica |
|---|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) | Arquitectura SPA estática, tiempos de compilación instantáneos y cero dependencia de backend. |
| **Estilos & UI** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) | Utilidades atómicas de última generación combinadas con variables CSS nativas para el sistema de diseño. |
| **Componentes de Mapa** | [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) | Renderizado de mapas vectoriales interactivos sin necesidad de APIs de pago o librerías pesadas. |
| **Audio / TTS** | Web Speech API (`window.speechSynthesis`) | Pronunciación nativa de japonés sin carga de archivos de audio externos. |
| **PWA & Cacheing** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) | Service Worker automático con estrategias `skipWaiting` y `clientsClaim` para actualización inmediata de activos offline. |
| **Iconografía** | [Lucide React](https://lucide.dev/) | Librería de iconos SVG ligeros integrados en el bundle, eliminando peticiones HTTP externas. |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) | Despliegue continuo automatizado en cada `push` a la rama `main`. |

### 📂 Estructura de Proyecto

```
viaje-japon-sept-2026/
├── public/                 # Favicons, manifest de la PWA e imágenes estáticas (olas, og-image)
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Nav.jsx         # Cabecera fija móvil (TopBar) + menú lateral desplegable (Drawer)
│   │   ├── BottomNav.jsx   # Barra de navegación móvil inferior
│   │   ├── DayCard.jsx     # Tarjeta de detalle diario
│   │   ├── GuideCard.jsx   # Tarjetas de guías temáticas
│   │   ├── RouteLine.jsx   # Componente visual "Línea de Metro/Tren" del itinerario
│   │   └── Footer.jsx      # Pie de página global
│   ├── data/
│   │   └── trip.js         # Única fuente de verdad: vuelos, alojamientos, presupuesto, días y transportes
│   ├── pages/              # 16 Vistas independientes (Home, Calendario, Itinerario, Info, etc.)
│   ├── utils/
│   │   ├── date.js         # Cálculo inteligente del día del viaje y estado actual
│   │   └── maps.js         # Generación de URLs dinámicas a Google Maps
│   ├── App.jsx             # Enrutado por estado local (`useState`) para máxima velocidad y compatibilidad PWA
│   ├── index.css           # Tokens de diseño, fuentes de sistema y animaciones
│   └── main.jsx            # Punto de entrada de React
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
