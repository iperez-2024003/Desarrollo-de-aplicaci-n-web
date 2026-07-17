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
