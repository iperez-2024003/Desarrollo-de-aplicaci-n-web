// Utilidades de formato para la interfaz.

const meses = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
];

// Formatea una fecha ISO a "24 jul 2026". Devuelve '-' si no hay fecha.
export const formatDate = (value) => {
  if (!value) return 'Sin fecha';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';
  return `${date.getDate()} ${meses[date.getMonth()]} ${date.getFullYear()}`;
};

// Dias de diferencia respecto a hoy (negativo = vencida hace N dias).
export const daysFromNow = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const diff = date.getTime() - Date.now();
  return Math.round(diff / (1000 * 60 * 60 * 24));
};
