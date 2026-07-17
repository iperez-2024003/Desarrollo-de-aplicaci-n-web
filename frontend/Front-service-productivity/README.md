# Front-service-productivity

Frontend del microservicio de **productividad** del Sistema de Gestion de Tareas
(Fundacion Kinal). Consume los endpoints de `service-productivity` y presenta las
metricas personales del usuario autenticado.

## Tecnologias

- **React 18** + **Vite** — interfaz y bundler
- **Tailwind CSS** — estilos
- **React Router** — enrutamiento y rutas protegidas
- **Zustand** — estado global de autenticacion
- **Axios** — cliente HTTP con interceptores JWT

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

La autenticacion se realiza contra `service-auth`
(`POST /api/v1/auth/login`) y el token JWT se envia en la cabecera `x-token`.

## Configuracion

Copia el archivo de ejemplo y ajusta las URLs si es necesario:

```bash
cp .env.example .env
```

```env
VITE_AUTH_API_URL=http://localhost:3001/api/v1
VITE_PRODUCTIVITY_API_URL=http://localhost:3002/api/v1
```

## Ejecucion

```bash
pnpm install     # instalar dependencias
pnpm dev         # entorno de desarrollo (http://localhost:5173)
pnpm build       # compilar para produccion
pnpm preview     # previsualizar el build
```

> Requiere que `service-auth` (3001), `service-tasks` (3000) y
> `service-productivity` (3002) esten en ejecucion.
