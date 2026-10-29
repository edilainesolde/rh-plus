// src/services/storage.js

const STORAGE_KEYS = {
  EMPLOYEES: 'rhplus_employees',
  HOLIDAYS: 'rhplus_holidays',
  LEAVES: 'rhplus_leaves',
  VACATIONS: 'rhplus_vacations',
  COUNTER: 'rhplus_interaction_counter'
};

const INITIAL_HOLIDAYS = [
  {
    id: '1',
    name: 'Aniversário de Sorocaba',
    date: '2026-08-15',
    category: 'Feriado municipal',
    isDayOff: true,
    description: 'Feriado municipal confirmado para a cidade de Sorocaba/SP.'
  },
  {
    id: '2',
    name: 'Dia do Trabalhador',
    date: '2026-05-01',
    category: 'Feriado nacional',
    isDayOff: true,
    description: 'Feriado nacional oficial.'
  },
  {
    id: '3',
    name: 'Dia Profissional de RH',
    date: '2026-06-03',
    category: 'Data comemorativa',
    isDayOff: false,
    description: 'Data comemorativa - Não se aplica folga automática.'
  }
];

export const getStoredData = (key, initialValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(`Erro ao carregar chave ${key}:`, error);
    return initialValue;
  }
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Erro ao salvar chave ${key}:`, error);
  }
};

export const getNormalizedLeaves = () => {
  const rawLeaves = getStoredData(STORAGE_KEYS.LEAVES, []);
  return rawLeaves.map((item) => ({
    ...item,
    leaveType: item.leaveType || item.tipoAfastamento || 'Não informado',
    status: item.status || 'Regular'
  }));
};

export { STORAGE_KEYS, INITIAL_HOLIDAYS };