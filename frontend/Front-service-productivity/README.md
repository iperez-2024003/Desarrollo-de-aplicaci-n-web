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

El token JWT lo emite el modulo de autenticacion (`service-auth`) y se envia en
la cabecera `x-token`. Este frontend lo lee del almacenamiento compartido; no
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
pnpm dev         # entorno de desarrollo (http://localhost:5173)
pnpm build       # compilar para produccion
pnpm preview     # previsualizar el build
```

> Requiere que `service-tasks` (3000) y `service-productivity` (3002) esten en
> ejecucion, ademas de un token JWT valido emitido por `service-auth` (3001).
