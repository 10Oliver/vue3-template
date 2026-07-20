# Vue 3 Template (Vuetify & Vite)

Esta es una plantilla base para el desarrollo rápido de aplicaciones web modernas utilizando **Vue 3** y **Vuetify 3**. El proyecto viene preconfigurado con una estructura estándar, soporte para diseño responsivo, manejo de estado global con Pinia y enrutamiento con Vue Router.

## 🚀 Tecnologías Principales

- **Vue 3**: Framework progresivo de JavaScript para construir interfaces de usuario.
- **Vuetify 3**: Biblioteca de componentes UI basada en Material Design.
- **Vite**: Herramienta de compilación ultrarrápida para desarrollo moderno.
- **Pinia**: Gestor de estado global intuitivo y modular.
- **Vue Router**: Enrutador oficial para aplicaciones de página única (SPA).
- **unplugin-vue-components**: Importación automática de componentes.

## 📦 Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

## 🛠️ Instalación y Configuración

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/10Oliver/vue3-template.git
   cd vue3-template
   ```

2. **Instalar dependencias:**
   Utilizando tu gestor de paquetes preferido:
   ```bash
   npm install
   # o si prefieres yarn
   yarn install
   # o pnpm
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo:**
   Levanta la aplicación localmente con recarga en caliente (HMR):
   ```bash
   npm run dev
   # o yarn dev / pnpm dev
   ```
   Por defecto, la aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

4. **Compilar para producción:**
   Genera los archivos optimizados listos para desplegar:
   ```bash
   npm run build
   # o yarn build / pnpm build
   ```

5. **Vista previa de producción:**
   Prueba localmente la versión compilada de producción:
   ```bash
   npm run preview
   # o yarn preview / pnpm preview
   ```

## ✅ Calidad

Antes de entregar cambios, ejecuta los controles disponibles:

```bash
npm run lint
npm run test:run
npm run build
```

- `lint` valida JavaScript y la estructura base de componentes Vue.
- `test:run` ejecuta las pruebas unitarias una sola vez.
- `build` genera la compilación de producción.

## 📂 Estructura de Directorios

- `src/components/`: Componentes reutilizables de Vue.
- `src/pages/`: Páginas principales de la aplicación.
- `src/plugins/`: Configuraciones de plugins como Vuetify, Pinia y Vue Router.
- `src/assets/`: Recursos estáticos como imágenes o estilos globales.
- `public/`: Archivos públicos servidos directamente.
