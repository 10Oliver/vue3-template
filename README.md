# AdminKit — plantilla administrativa Vue 3

Plantilla base para aplicaciones administrativas con interfaz responsive, sesión demo, navegación protegida, CRUD local de usuarios y registros, y una capa de datos preparada para API.

## 🚀 Tecnologías Principales

- **Vue 3**: Framework progresivo de JavaScript para construir interfaces de usuario.
- **Vuetify 3**: Biblioteca de componentes UI basada en Material Design.
- **Vite**: Herramienta de compilación ultrarrápida para desarrollo moderno.
- **Pinia**: Gestor de estado global intuitivo y modular.
- **Vue Router**: Enrutador oficial para aplicaciones de página única (SPA).
- **unplugin-vue-components**: Importación automática de componentes.

## 📦 Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) **22.12 o superior**. El stack de Vite 8 requiere Node 20.19+ o 22.12+.

## 🛠️ Instalación y primera ejecución

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/10Oliver/vue3-template.git
   cd vue3-template
   ```

2. **Instalar dependencias:**
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

4. **Iniciar sesión:**

   - Correo: `admin@adminkit.local`
   - Contraseña: `Admin123*`

5. **Compilar para producción:**
   Genera los archivos optimizados listos para desplegar:
   ```bash
   npm run build
   # o yarn build / pnpm build
   ```

6. **Vista previa de producción:**
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

## 📦 Política de dependencias

El proyecto usa las versiones actuales compatibles de Vue 3.5, Pinia 4, Vue Router 5, Vuetify 3.12, Vite 8, Vitest 4 y ESLint 10. `vue-i18n` permanece en 9.14.5: es el último parche seguro de la rama compatible con Vuetify 3. La migración a `vue-i18n` 11 y Vuetify 4 debe hacerse conjuntamente como una actualización visual mayor.

## 🔐 Sesión demo

La plantilla incluye una sesión local para navegar y probar la interfaz sin backend.

- Correo: `admin@adminkit.local`
- Contraseña: `Admin123*`

La sesión se guarda únicamente en `localStorage`, sin almacenar la contraseña. Las rutas administrativas requieren sesión y el cierre de sesión elimina esos datos locales. La recuperación de contraseña es solo una pantalla de demostración: no envía correos ni modifica credenciales.

## 🗂️ Datos demo y API

Usuarios, registros y actividad tienen repositorios con los métodos `list`, `getById`, `create`, `update` y `remove`. El modo predeterminado es `mock`: los datos se guardan en `localStorage` con prefijos `adminkit.*`, sobreviven una recarga y pueden reiniciarse desde las herramientas del navegador.

Para preparar una API, copia `.env.example` a `.env.local` y configura `VITE_DATA_SOURCE=api` junto con `VITE_API_BASE_URL`. Las vistas y stores no cambian al alternar de fuente. Consulta [API_CONTRACT.md](API_CONTRACT.md) para endpoints, modelos, paginación, errores y la advertencia de seguridad sobre variables `VITE_*`.

## ✅ Comprobación manual

1. Intenta abrir `/dashboard` sin sesión: debe redirigir a `/login`.
2. Inicia sesión y confirma que el panel, Usuarios, Registros, Actividad y Ajustes están disponibles.
3. Crea, edita y elimina un usuario o registro; recarga la página para confirmar la persistencia local.
4. Revisa Actividad: cada cambio debe aparecer como un nuevo evento.
5. Cierra sesión y confirma que una ruta privada vuelve a redirigir al login.

## 📂 Estructura de Directorios

- `src/components/`: Componentes reutilizables de Vue.
- `src/views/`: Vistas y pantallas de la aplicación.
- `src/repositories/`: Contratos mock y adaptadores HTTP intercambiables.
- `src/store/`: Estado global de interfaz y sesión.
- `src/plugins/`: Configuraciones de plugins como Vuetify, Pinia y Vue Router.
- `src/assets/`: Recursos estáticos como imágenes o estilos globales.
- `public/`: Archivos públicos servidos directamente.
