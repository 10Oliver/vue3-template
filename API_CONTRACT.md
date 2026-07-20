# Contrato de API

La interfaz usa el mismo contrato tanto con mocks como con API. Para activar los adaptadores HTTP, copia `.env.example` a `.env.local`, define `VITE_DATA_SOURCE=api` y configura `VITE_API_BASE_URL`. El valor predeterminado siempre es `mock`.

## Convenciones

- URL base: `VITE_API_BASE_URL`, sin barra final; los endpoints siguientes se añaden a esa base.
- Formato: JSON con `Content-Type: application/json`.
- Autorización temporal: si se define `VITE_API_TOKEN`, se envía como `Authorization: Bearer <token>`. No uses secretos de producción en variables `VITE_*`; son visibles en el navegador.
- Contexto de organización: la sesión autenticada determina la organización activa. La API nunca debe aceptar un `organizationId` enviado por el cliente para cambiar de organización ni devolver datos fuera de ese contexto.
- Errores: respuestas no exitosas deben incluir `{ "message": "descripción legible" }`.
- Listados: deben devolver exactamente `{ "items": [], "total": 0, "page": 1, "itemsPerPage": 5 }`.

## Modelos

`User`:

```json
{ "id": "string", "organizationId": "string", "name": "string", "email": "string", "role": "Administradora|Editor|Consulta", "status": "Activo|Invitado|Inactivo", "isPrimaryAdmin": "boolean", "createdAt": "ISO-8601", "updatedAt": "ISO-8601" }
```

`CatalogItem` (mostrado como registro):

```json
{ "id": "string", "organizationId": "string", "name": "string", "category": "string", "status": "Activo|Borrador|Archivado", "createdAt": "ISO-8601", "updatedAt": "ISO-8601" }
```

`Activity`:

```json
{ "id": "string", "organizationId": "string", "title": "string", "description": "string", "icon": "mdi-icon-name", "createdAt": "ISO-8601" }
```

`Session` (adaptador preparado, aún no activado):

```json
{ "user": { "id": "string", "name": "string", "email": "string", "role": "string", "isPrimaryAdmin": "boolean" }, "organization": { "id": "string", "name": "string" }, "token": "string" }
```

`OrganizationRegistration`:

```json
{ "organizationName": "string", "name": "string", "email": "string", "password": "string" }
```

## Endpoints

| Recurso | Operaciones |
| --- | --- |
| `/users` | `GET /users?search=&page=&itemsPerPage=`, `GET /users/:id`, `POST /users`, `PATCH /users/:id`, `DELETE /users/:id` |
| `/records` | `GET /records?search=&page=&itemsPerPage=`, `GET /records/:id`, `POST /records`, `PATCH /records/:id`, `DELETE /records/:id` |
| `/activity` | Mismo contrato CRUD; la UI actual consume `GET` y crea entradas locales al cambiar usuarios o registros. |
| `/organizations` | `GET /organizations/:id` solo para el contexto autorizado. La creación y selección de organizaciones se implementarán en una etapa posterior. |
| `/organization-modules` | `GET` y `PATCH` para los módulos de la organización activa; solo su administrador principal puede cambiarlos. |
| `/users/:id` | `PATCH` acepta `permissions` por módulo. La transferencia del administrador principal debe ser una operación transaccional dedicada. |
| `/organization-registrations` | `POST` recibe `OrganizationRegistration`, crea una solicitud pendiente y envía un enlace de verificación al correo. Debe responder con `202` sin exponer el token. |
| `/organization-registrations/verify` | `POST` con el token de verificación; activa la organización y crea su único administrador principal. Debe rechazar tokens inválidos o vencidos. |
| `/auth/login`, `/auth/logout` | `POST`; `login` devuelve la organización activa junto al usuario. El adaptador está en `src/repositories/api/authApiRepository.js` para integrar la sesión real en una siguiente iteración. |

Al alternar la fuente, las vistas y stores no cambian: los repositorios resuelven `mock` o `api` con el mismo contrato. En API, la sesión se conserva con el token devuelto por `/auth/login` y cada solicitud lo envía como `Bearer`. El backend debe aplicar el aislamiento por organización y la regla de exactamente un administrador principal de forma transaccional. Para el registro público debe almacenar contraseñas con un algoritmo de hash resistente, enviar el correo fuera de la respuesta HTTP y limitar solicitudes por IP/correo.
