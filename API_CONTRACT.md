# Contrato de API

La interfaz usa el mismo contrato tanto con mocks como con API. Para activar los adaptadores HTTP, copia `.env.example` a `.env.local`, define `VITE_DATA_SOURCE=api` y configura `VITE_API_BASE_URL`. El valor predeterminado siempre es `mock`.

## Convenciones

- URL base: `VITE_API_BASE_URL`, sin barra final; los endpoints siguientes se añaden a esa base.
- Formato: JSON con `Content-Type: application/json`.
- Autorización temporal: si se define `VITE_API_TOKEN`, se envía como `Authorization: Bearer <token>`. No uses secretos de producción en variables `VITE_*`; son visibles en el navegador.
- Errores: respuestas no exitosas deben incluir `{ "message": "descripción legible" }`.
- Listados: deben devolver exactamente `{ "items": [], "total": 0, "page": 1, "itemsPerPage": 5 }`.

## Modelos

`User`:

```json
{ "id": "string", "name": "string", "email": "string", "role": "Administradora|Editor|Consulta", "status": "Activo|Invitado|Inactivo", "createdAt": "ISO-8601", "updatedAt": "ISO-8601" }
```

`CatalogItem` (mostrado como registro):

```json
{ "id": "string", "name": "string", "category": "string", "status": "Activo|Borrador|Archivado", "createdAt": "ISO-8601", "updatedAt": "ISO-8601" }
```

`Activity`:

```json
{ "id": "string", "title": "string", "description": "string", "icon": "mdi-icon-name", "createdAt": "ISO-8601" }
```

`Session` (adaptador preparado, aún no activado):

```json
{ "user": { "id": "string", "name": "string", "email": "string", "role": "string" }, "token": "string" }
```

## Endpoints

| Recurso | Operaciones |
| --- | --- |
| `/users` | `GET /users?search=&page=&itemsPerPage=`, `GET /users/:id`, `POST /users`, `PATCH /users/:id`, `DELETE /users/:id` |
| `/records` | `GET /records?search=&page=&itemsPerPage=`, `GET /records/:id`, `POST /records`, `PATCH /records/:id`, `DELETE /records/:id` |
| `/activity` | Mismo contrato CRUD; la UI actual consume `GET` y crea entradas locales al cambiar usuarios o registros. |
| `/auth/login`, `/auth/logout` | `POST`; el adaptador está en `src/repositories/api/authApiRepository.js` para integrar la sesión real en una siguiente iteración. |

Al alternar la fuente, las vistas y stores no cambian: los repositorios resuelven `mock` o `api` con el mismo contrato.
