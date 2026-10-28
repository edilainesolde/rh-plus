export const formatDateBR = (dateString) => {
  if (!dateString) return '-';
  const [year, month, day] = dateString.split('-');
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
};

export const getDaysRemaining = (targetDateStr) => {
  if (!targetDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = targetDateStr.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  targetDate.setHours(0, 0, 0, 0);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const classifyStatus = (targetDateStr) => {
  const days = getDaysRemaining(targetDateStr);
  if (days < 0) return { key: 'VENCIDO', label: 'Vencido', color: 'bg-red-100 text-red-800 border-red-300' };
  if (days === 0) return { key: 'HOJE', label: 'Vence hoje', color: 'bg-amber-100 text-amber-900 border-amber-300 font-bold' };
  if (days > 0 && days <= 30) return { key: 'ALERTA', label: 'Vence em até 30 dias', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
  return { key: 'REGULAR', label: 'Regular', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
};

export const sanitizeNIF = (nif) => {
  if (!nif) return '';
  return nif.toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
};