# 🗻 Viaje a Japón — Septiembre 2026 🇯🇵

Guía de viaje interactiva, *mobile-first* e instalable como **Progressive Web App (PWA)**, diseñada a medida para un grupo de 5 amigos (*"Viaje Morisqueño"*) durante su ruta por Japón del **6 al 21 de septiembre de 2026**.

Esta aplicación ha sido concebida para **sustituir por completo** a los tradicionales PDFs, excels o grupos de WhatsApp llenos de mensajes perdidos. Agrupa todo: itinerarios, reservas, códigos PIN, billetes de tren interactivos con QR, mapas vectoriales, meteorología en tiempo real y consejos culturales, en una plataforma ultra rápida y 100% disponible **sin conexión a internet**.

---

## 🏛️ Arquitectura de la Solución

El proyecto nace con un objetivo claro: **Cero latencia, cero caídas y disponibilidad offline total**. En un viaje internacional (y especialmente en Japón, donde las zonas rurales o los túneles del Shinkansen pueden carecer de cobertura), depender de la nube para consultar un billete de tren o el PIN de un hotel es un riesgo.

Por ello, la aplicación sigue una arquitectura **Jamstack (Client-Side Rendering estático)** extrema:
1. **Sin Backend en tiempo real:** Todos los datos (itinerarios, hoteles, vuelos, billetes y guías) están incrustados directamente en el código (`src/data/trip.js`, `history.js`, `guides.js`). Cargar la página web *es* cargar la base de datos completa.
2. **Offline-First (PWA):** Usamos `vite-plugin-pwa` (Workbox) para generar un *Service Worker* que intercepta todas las peticiones de red. En la primera visita, la app descarga y almacena en caché todo el código HTML, CSS, JS y recursos gráficos. A partir de ese momento, la app funciona interceptando las URLs y sirviendo los archivos desde la memoria del teléfono en milisegundos.
3. **Estado local y de sesión:** La única persistencia dinámica que necesita la app (como las tareas de preparativos marcadas como hechas o el idioma seleccionado) se almacena en el `localStorage` del dispositivo. No hay cuentas de usuario ni inicios de sesión.

---

## 🛠️ Tecnologías Utilizadas (El Stack)

He seleccionado meticulosamente el stack tecnológico priorizando el rendimiento en dispositivos móviles de gama media y la facilidad de mantenimiento:

### 1. React 19 + Vite 8
* **Por qué:** Vite proporciona un entorno de desarrollo casi instantáneo gracias al Hot Module Replacement (HMR) y empaqueta el código para producción usando Rollup, generando *chunks* de JavaScript altamente optimizados. React nos permite organizar la UI en componentes modulares y reactivos.

### 2. Tailwind CSS v4 + Diseño Mobile-First
* **Por qué:** Permite construir la interfaz de usuario directamente con clases utilitarias (`flex`, `rounded-2xl`, `bg-paper`), sin hojas de estilo CSS kilométricas. Asegura un diseño **estrictamente responsive**, con soporte nativo para *Safe Area Insets* de iOS (notch / barra de inicio del iPhone) y controles segmentados (*Segmented Controls*) de alto contraste.

### 3. Sistema Multi-idioma Propio (i18n Context)
* **Por qué:** En lugar de instalar dependencias pesadas como `react-i18next`, desarrollé una arquitectura de internacionalización a medida mediante *React Context*. El sistema fusiona un dataset base (los datos estructurales y numéricos del viaje en `trip.js`) con diccionarios puramente textuales para cada idioma (`es.js`, `en.js`, `fr.js`, `tl.js`).
* **Soporte:** Español 🇪🇸, English 🇬🇧, Français 🇫🇷 y Tagalog 🇵🇭.

### 4. Leaflet (Mapas Vectoriales)
* **Por qué:** Integrar Google Maps API requiere claves, tarjetas de crédito y carga *scripts* externos muy pesados que rompen el modo offline. Leaflet, combinado con OpenStreetMap, permite renderizar mapas de forma ligera, DOM-basada e integrarse perfectamente en el entorno cerrado de la aplicación.

### 5. Web Speech API (Text-to-Speech)
* **Por qué:** En los apartados de "Historia de Japón" y "Frases y Etiqueta", se usa `window.speechSynthesis`, una API nativa de los navegadores, para reproducir textos y pronunciaciones reales generadas por el propio dispositivo sin descargar cientos de MBs de audio.

### 6. Lucide React (Iconografía)
* **Por qué:** Permite importar únicamente los iconos SVG que estamos usando mediante *tree-shaking*, manteniendo el tamaño del bundle al mínimo.

---

## ✨ Funcionalidades Destacadas

- 🗓️ **Itinerario Doble (Detallado & Vista Rápida):**
  - **Detalle completo:** Horarios exhaustivos, recomendaciones, advertencias de pago en efectivo, reservas y notas históricas.
  - **Vista rápida:** Línea de tiempo visual tipo metro con horas exactas, nodos temáticos, lore resumido y enlaces directos al mapa.
  - **Cabeceras unificadas:** Botones de cambio de vista, mapa y cierre organizados en el mismo orden intuitivo.
- 🎫 **Billetes de Transporte Reales & QR:** Fichas interactivas para Shinkansen Hikari (Tokio→Kioto), Thunderbird (Kioto→Kanazawa), Nohi Bus (Takayama→Magome), Shinano (Nagiso→Nagoya) y Shinkansen Nozomi (Nagoya→Tokio) con coches, asientos, códigos QR de reserva y enlace a billetes oficiales. En el Día 1 se incluye además el **código QR de Visit Japan Web** para el control de aduanas e inmigración.
- 📜 **Historia de Japón & Multimedia en 4 Bloques:**
  - **Historia de Japón (Shu / Rojo bermellón):** Periodos cronológicos desplegables con audio Text-to-Speech nativo y referencias a los lugares que se verán en la ruta (*"Lo veréis en el viaje"*).
  - **Podcasts (Morado Apple Podcasts):** Episodios recomendados con enlace directo a la app de podcasts.
  - **Documentales (Rojo YouTube):** Selección de documentales de alta calidad con enlace a YouTube.
  - **Libros recomendados (Azul Índigo):** Clásicos imprescindibles (*Breve historia de Japón*, *El libro del té*, *Historia de los samuráis*) con botones directos para **lectura online gratuita**.
- 🔍 **Buscador Global Inteligente:** Motor de búsqueda reactivo que indexa instantáneamente todo el contenido (lugares, hoteles, billetes, historia, gastronomía, frikadas). Al seleccionar un resultado, navega al lugar exacto, despliega los acordeones necesarios y lo resalta con una animación luminosa.
- 🌦️ **Meteorología en Tiempo Real (Offline-friendly):** Integración con la API de Open-Meteo para las ciudades del itinerario (Tokio, Kioto, Osaka, Kanazawa, Takayama, Magome), con guardado en caché local de 12 horas.
- 🗺️ **Mapa Interactivo Sincronizado:** Filtro por categorías (Lugares, Hoteles, Transportes) y por días específicos, con centrado dinámico de coordenadas.
- 👾 **Cultura Pop (Frikadas):** Puntos de interés cruzados con anime, manga y videojuegos (Pokémon, Studio Ghibli, Digimon, Nintendo, Persona, Tekken).
- 💰 **Presupuesto Real y Pagado:** Desglose del presupuesto estimado vs. real pagado (vuelos Qatar Airways, 4 hoteles de Booking pagados por Juancar, hotel de Magome Chaya a pagar en efectivo, seguro Heymondo y eSIMs de Holafly), con resumen **"(todo incluido)"**.
- 📋 **Lista de Tareas Persistente:** Cosas pendientes divididas en *"Antes de viajar"* y *"Durante el viaje"* con checkboxes guardados en el `localStorage`.
- 🖨️ **Modo Impresión:** Vistas optimizadas para generar el itinerario en PDF o en papel.

---

## 📴 Instrucciones de Instalación como App

Al ser una Progressive Web App (PWA), la aplicación es instalable directamente desde el navegador, sin pasar por App Store o Google Play.

### En iPhone (Safari):
1. Abre la web en Safari.
2. Toca el botón **Compartir** (el cuadrado con la flecha hacia arriba) en la barra inferior.
3. Selecciona **"Añadir a la pantalla de inicio"**.

### En Android (Chrome):
1. Abre la web en Chrome.
2. Toca el botón de **Menú (⋮)** en la esquina superior derecha.
3. Selecciona **"Instalar aplicación"** o **"Añadir a la pantalla de inicio"**.

---

## 🚀 Despliegue y Mantenimiento Local

El código fuente está integrado con un *pipeline* CI/CD en **Vercel**, configurado para reconstruir y desplegar la página a nivel mundial (Edge Network) con cada `git push` a la rama `main`.

1. **Clonar repositorio:**
   ```bash
   git clone https://github.com/pCresp0/viaje-japon-sept-2026.git
   cd viaje-japon-sept-2026
   ```

2. **Instalar dependencias y arrancar:**
   ```bash
   npm install
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

Cualquier actualización de horarios de trenes o precios de hoteles basta con editar `src/data/trip.js` o los ficheros correspondientes y hacer un commit. No hay bases de datos que migrar.

---
*Desarrollado para la expedición Morisqueña a Japón 2026 🇯🇵*
