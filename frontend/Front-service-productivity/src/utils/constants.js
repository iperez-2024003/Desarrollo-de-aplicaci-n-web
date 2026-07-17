// Constantes compartidas con el backend (service-productivity/utils/constants.js)

export const PRIORIDADES = Object.freeze({
  BAJA: 'baja',
  MEDIA: 'media',
  ALTA: 'alta',
  CRITICA: 'critica',
});

export const ESTADOS = Object.freeze({
  PENDIENTE: 'pendiente',
  EN_PROGRESO: 'en_progreso',
  COMPLETADA: 'completada',
  CANCELADA: 'cancelada',
});

export const VALORES_PRIORIDAD = Object.freeze({
  [PRIORIDADES.BAJA]: 1,
  [PRIORIDADES.MEDIA]: 2,
  [PRIORIDADES.ALTA]: 3,
  [PRIORIDADES.CRITICA]: 4,
});

// Etiquetas legibles para mostrar en la interfaz
export const ETIQUETAS_ESTADO = Object.freeze({
  [ESTADOS.PENDIENTE]: 'Pendiente',
  [ESTADOS.EN_PROGRESO]: 'En progreso',
  [ESTADOS.COMPLETADA]: 'Completada',
  [ESTADOS.CANCELADA]: 'Cancelada',
});

export const ETIQUETAS_PRIORIDAD = Object.freeze({
  [PRIORIDADES.BAJA]: 'Baja',
  [PRIORIDADES.MEDIA]: 'Media',
  [PRIORIDADES.ALTA]: 'Alta',
  [PRIORIDADES.CRITICA]: 'Critica',
  sin_prioridad: 'Sin prioridad',
});

// Clases de Tailwind para colorear estados
export const COLORES_ESTADO = Object.freeze({
  [ESTADOS.PENDIENTE]: 'bg-amber-100 text-amber-700',
  [ESTADOS.EN_PROGRESO]: 'bg-brand-100 text-brand-700',
  [ESTADOS.COMPLETADA]: 'bg-emerald-100 text-emerald-700',
  [ESTADOS.CANCELADA]: 'bg-slate-200 text-slate-600',
});

// Clases de Tailwind para colorear prioridades
export const COLORES_PRIORIDAD = Object.freeze({
  [PRIORIDADES.BAJA]: 'bg-slate-100 text-slate-600',
  [PRIORIDADES.MEDIA]: 'bg-sky-100 text-sky-700',
  [PRIORIDADES.ALTA]: 'bg-orange-100 text-orange-700',
  [PRIORIDADES.CRITICA]: 'bg-red-100 text-red-700',
  sin_prioridad: 'bg-slate-100 text-slate-500',
});
