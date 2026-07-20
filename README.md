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

## 🔐 Sesión demo

La plantilla incluye una sesión local para navegar y probar la interfaz sin backend.

- Correo: `admin@adminkit.local`
- Contraseña: `Admin123*`

La sesión se guarda únicamente en `localStorage`, sin almacenar la contraseña. Las rutas administrativas requieren sesión y el cierre de sesión elimina esos datos locales. En una integración real, sustituye el repositorio mock de `src/repositories/authRepository.js` por el adaptador de tu API.

## 🗂️ Datos demo

Usuarios, registros y actividad tienen repositorios mock con los métodos `list`, `getById`, `create`, `update` y `remove`. Los datos se guardan en `localStorage` con prefijos `adminkit.*`, por lo que sobreviven una recarga y pueden reiniciarse desde las herramientas del navegador. La interfaz incluye búsqueda, filtros, paginación, creación, edición y eliminación confirmada para usuarios y registros.

## 📂 Estructura de Directorios

- `src/components/`: Componentes reutilizables de Vue.
- `src/views/`: Vistas y pantallas de la aplicación.
- `src/repositories/`: Adaptadores de datos; actualmente contiene el acceso demo de autenticación.
- `src/store/`: Estado global de interfaz y sesión.
- `src/plugins/`: Configuraciones de plugins como Vuetify, Pinia y Vue Router.
- `src/assets/`: Recursos estáticos como imágenes o estilos globales.
- `public/`: Archivos públicos servidos directamente.
