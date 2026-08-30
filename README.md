# 🗻 Viaje a Japón — Septiembre 2026 🇯🇵

Guía de viaje interactiva, *mobile-first* e instalable como **Progressive Web App (PWA)**, diseñada a medida para un grupo de 5 amigos (*"Viaje Morisqueño"*) durante su ruta por Japón del **6 al 21 de septiembre de 2026**.

Esta aplicación ha sido concebida para **sustituir por completo** a los tradicionales PDFs, excels o grupos de WhatsApp llenos de mensajes perdidos. Agrupa todo: itinerarios, reservas, códigos PIN, billetes, mapas y consejos, en una única plataforma ultra rápida y 100% disponible **sin conexión a internet**.

---

## 🏛️ Arquitectura de la Solución

El proyecto nace con un objetivo claro: **Cero latencia, cero caídas y disponibilidad offline total**. En un viaje internacional (y especialmente en Japón, donde las zonas rurales o el metro pueden carecer de cobertura), depender de la nube para consultar un billete de tren o el PIN de un hotel es un riesgo.

Por ello, la aplicación sigue una arquitectura **Jamstack (Client-Side Rendering estático)** extrema:
1. **Sin Backend en tiempo real:** Todos los datos (itinerarios, hoteles, vuelos) están incrustados directamente en el código JavaScript (en `src/data/trip.js`). Esto significa que cargar la página web *es* cargar la base de datos completa.
2. **Offline-First (PWA):** Usamos `vite-plugin-pwa` (Workbox) para generar un *Service Worker* que intercepta todas las peticiones de red. En la primera visita, la app descarga y almacena en caché todo el código HTML, CSS, JS y recursos gráficos. A partir de ese momento, la app funciona interceptando las URLs y sirviendo los archivos desde la memoria del teléfono en milisegundos.
3. **Estado local y de sesión:** La única persistencia dinámica que necesita la app (como las tareas de preparativos marcadas como hechas o el idioma seleccionado) se almacena en el `localStorage` del dispositivo. No hay cuentas de usuario ni inicios de sesión.

---

## 🛠️ Tecnologías Utilizadas (El Stack)

He seleccionado meticulosamente el stack tecnológico priorizando el rendimiento en dispositivos móviles de gama media y la facilidad de mantenimiento:

### 1. React 19 + Vite 8
* **Por qué:** Vite proporciona un entorno de desarrollo casi instantáneo gracias al Hot Module Replacement (HMR) y empaqueta el código para producción usando Rollup, generando *chunks* de JavaScript altamente optimizados. React nos permite organizar la UI en componentes reusables (como el `Nav` superior o las `Cards` de lugares).

### 2. Tailwind CSS v4
* **Por qué:** Permite construir la interfaz de usuario directamente en el HTML usando clases utilitarias (`flex`, `rounded-2xl`, `bg-paper`), sin tener que mantener hojas de estilo CSS kilométricas. Además, Tailwind asegura un diseño **estrictamente responsive y *Mobile-First***, con soporte nativo para *Safe Area Insets* de iOS (para que la app no se superponga con el "notch" o la barra de inicio del iPhone). Combinado con selectores nativos (*Segmented Controls*) de estilo iOS, el aspecto final es totalmente premium.

### 3. Sistema Multi-idioma Propio (i18n Context)
* **Por qué:** En lugar de instalar dependencias pesadas como `react-i18next`, desarrollé una arquitectura de internacionalización a medida mediante *React Context*. El sistema fusiona un dataset base (los datos estructurales y numéricos del viaje en `trip.js`) con diccionarios puramente textuales para cada idioma (`es.js`, `en.js`, `fr.js`, `tl.js`).
* **Ventajas:** Cambiar de precio un hotel se hace en un único sitio. Si falta una traducción en Tagalo, el sistema muestra el texto en español por defecto para evitar pantallas vacías.

### 4. Leaflet (Mapas Vectoriales)
* **Por qué:** Integrar Google Maps API requiere claves, tarjetas de crédito y carga *scripts* externos muy pesados que rompen el modo offline. Leaflet, combinado con OpenStreetMap, permite renderizar mapas de forma ligera, DOM-basada e integrarse perfectamente en el entorno cerrado de la aplicación, consumiendo una fracción de memoria en el dispositivo.

### 5. Web Speech API (Text-to-Speech)
* **Por qué:** En el apartado de "Frases y Etiqueta", se usó `window.speechSynthesis`, una API nativa de los navegadores, para generar audios en japonés generados dinámicamente por el dispositivo. Esto evita tener que descargar y empaquetar cientos de archivos `.mp3` de audio.

### 6. Lucide React (Iconografía)
* **Por qué:** Frente a librerías icónicas tradicionales (como FontAwesome) que inyectan miles de iconos inútiles en el código, Lucide permite importar únicamente los iconos SVG que estamos usando (Tree-shaking), manteniendo el tamaño de la aplicación al mínimo.

---

## ✨ Funcionalidades Destacadas

- 🏠 **Estado Dinámico ("Hoy"):** La app sabe qué día es. El componente de inicio detecta automáticamente en qué fase temporal se encuentra el usuario (Antes del viaje, Durante, Después) y renderiza la pantalla de "Hoy" con el itinerario de la jornada en curso (por defecto, el día 0 de viaje).
- 🚇 **Navegación tipo Metro:** El itinerario (`RouteLine`) usa un diseño de navegación vertical inspirado en los esquemas de trenes nipones.
- 👾 **Cultura Pop (Frikadas):** Un apartado dedicado a integrar localizaciones reales del viaje con franquicias como Pokémon, Studio Ghibli, Digimon y Nintendo.
- 📋 **Preparativos Persistentes:** Una lista de equipaje y tareas dividida inteligentemente entre "Antes de viajar" y "Durante el viaje", guardando el progreso en el dispositivo de forma persistente.
- 💰 **Calculadora de Presupuestos:** Desgloses automáticos por persona de costes de vuelos y reservas en función del número de integrantes del grupo (5).
- 🖨️ **Modo Impresión:** Vistas optimizadas para generar el itinerario en PDF o en papel.
- ⚡ **Lazy Loading:** División del código (*Code Splitting*) con React Suspense para asegurar tiempos de carga y un primer renderizado instantáneo.
- 🔍 **Buscador Global Inteligente:** Un motor de búsqueda integrado que permite encontrar al instante cualquier lugar, hotel, restaurante, concepto histórico o frikada a lo largo del viaje, saltando directamente al día y pestaña correspondiente con el resultado resaltado visualmente (incluso abriendo los acordeones necesarios automáticamente).
- 🌦️ **Meteorología en Tiempo Real (Offline-friendly):** Integración con la API de Open-Meteo para mostrar el tiempo en las distintas ciudades de la ruta. Las previsiones se guardan en el caché local del móvil durante 12 horas, garantizando que puedas consultar el clima del día incluso si te quedas sin conexión en la calle.
- 🗺️ **Mapa Interactivo Sincronizado:** Gracias a Leaflet, la app cuenta con un mapa vectorial interactivo que permite filtrar marcadores por categoría (Excursiones, Hoteles, Transportes) o por día específico, haciendo zoom dinámico automáticamente para una navegación perfecta por el terreno.
- 📅 **Calendario Integrado con "Vista Rápida":** Un calendario visual que no solo da una idea clara de la estructura del viaje y los bloques geográficos, sino que actúa como atajo directo a una "Vista Rápida" simplificada en el itinerario de cada día.

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

Cualquier actualización de horarios de trenes o precios de hoteles basta con editar `src/data/trip.js` y hacer un simple commit. No hay bases de datos que migrar.

---
*Desarrollado para la expedición Morisqueña a Japón 2026 🇯🇵*
