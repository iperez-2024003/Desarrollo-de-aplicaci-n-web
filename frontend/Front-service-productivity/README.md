# Front-service-productivity

Frontend del microservicio de **productividad** del Sistema de Gestion de Tareas
(Fundacion Kinal). Consume los endpoints de `service-productivity` y presenta las
metricas personales del usuario autenticado.

## Tecnologias

- **React 18** + **Vite** — interfaz y bundler
- **Tailwind CSS** — estilos
- **React Router** — enrutamiento y rutas protegidas
- **Zustand** — estado global de la sesion (solo lectura)
- **Axios** — cliente HTTP con interceptores JWT

> **Nota:** el inicio de sesion NO forma parte de este frontend; lo gestiona el
> modulo de autenticacion (`service-auth`). Aqui solo se consume el token JWT ya
> emitido, enviandolo en la cabecera `x-token`.

## Arquitectura

Se sigue la misma organizacion modular que los microservicios del backend
(`config/`, `services/`, `utils/`, componentes por dominio):

```
src/
├── config/        # cliente Axios (auth + productividad) e interceptores
├── services/      # una funcion por endpoint del backend
├── store/         # store de autenticacion (Zustand)
├── hooks/         # useFetch generico
├── components/
│   ├── layout/    # sidebar, topbar, layout y rutas protegidas
│   ├── ui/        # componentes reutilizables (tarjetas, badges, estados)
│   └── productivity/  # componentes especificos del dominio
├── pages/         # una vista por funcion del servicio
└── utils/         # constantes, formato y almacenamiento de sesion
```

## Funciones del servicio cubiertas

Cada funcion del microservicio `service-productivity` tiene su propia vista:

| Funcion del servicio        | Endpoint                                   | Vista            |
| --------------------------- | ------------------------------------------ | ---------------- |
| `getDashboard`              | `GET /api/v1/productivity/dashboard`       | `/` Resumen      |
| `getCompletedPercentage`    | `GET /api/v1/productivity/completed-percentage` | `/completadas` |
| `getPendingTasks`           | `GET /api/v1/productivity/pending`         | `/pendientes`    |
| `getOverdueTasks`           | `GET /api/v1/productivity/overdue`         | `/vencidas`      |
| `getPrioritySummary`        | `GET /api/v1/productivity/priority-summary`| `/prioridades`   |

Este frontend consume **exclusivamente** el servicio de productividad; no realiza
peticiones a `service-auth` ni a `service-tasks`. El token JWT lo emite el
frontend de autenticacion y lo guarda en `localStorage` bajo la clave `token`;
aqui simplemente se lee esa misma clave y se envia en la cabecera `x-token`. No
implementa pantalla de login.

## Configuracion

Copia el archivo de ejemplo y ajusta las URLs si es necesario:

```bash
cp .env.example .env
```

```env
VITE_PRODUCTIVITY_API_URL=http://localhost:3002/api/v1
# Solo para pruebas aisladas en desarrollo: pega un token JWT valido.
VITE_DEV_TOKEN=
```

## Ejecucion

```bash
pnpm install     # instalar dependencias
pnpm dev         # entorno de desarrollo (http://localhost:5175)
pnpm build       # compilar para produccion
pnpm preview     # previsualizar el build
```

> Usa el puerto **5175** para no chocar con los frontends de auth y tasks (5173).
>
> Requiere que el servicio `service-productivity` (3002) este en ejecucion y que
> exista un token JWT valido en `localStorage` (clave `token`), generado al
> iniciar sesion desde el frontend de autenticacion.
