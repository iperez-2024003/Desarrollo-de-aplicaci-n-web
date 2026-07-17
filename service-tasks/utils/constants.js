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

export const TRANSICIONES_ESTADO = Object.freeze({
  [ESTADOS.PENDIENTE]: [ESTADOS.EN_PROGRESO, ESTADOS.CANCELADA],
  [ESTADOS.EN_PROGRESO]: [ESTADOS.COMPLETADA, ESTADOS.CANCELADA, ESTADOS.PENDIENTE],
  [ESTADOS.COMPLETADA]: [ESTADOS.PENDIENTE],
  [ESTADOS.CANCELADA]: [ESTADOS.PENDIENTE],
});

export const VALORES_PRIORIDAD = Object.freeze({
  [PRIORIDADES.BAJA]: 1,
  [PRIORIDADES.MEDIA]: 2,
  [PRIORIDADES.ALTA]: 3,
  [PRIORIDADES.CRITICA]: 4,
});
