export const initialColaboradores = [
  { id: '1', nif: 'NIF-00101', nome: 'Carlos Eduardo Silva', dataNascimento: '1985-04-12' },
  { id: '2', nif: 'NIF-00102', nome: 'Mariana Oliveira Souza', dataNascimento: '1990-08-25' },
  { id: '3', nif: 'NIF-00103', nome: 'Roberto Alves Santos', dataNascimento: '1978-11-03' },
  { id: '4', nif: 'NIF-00104', nome: 'Fernanda Lima Costa', dataNascimento: '1992-01-15' },
  { id: '5', nif: 'NIF-00105', nome: 'Juliana Mendes Rocha', dataNascimento: '1988-06-30' }
];

const today = new Date();
const formatDate = (date) => date.toISOString().split('T')[0];

const datePast = new Date(today); datePast.setDate(today.getDate() - 10);
const dateToday = new Date(today);
const date15Days = new Date(today); date15Days.setDate(today.getDate() + 15);
const date45Days = new Date(today); date45Days.setDate(today.getDate() + 45);

export const initialFerias = [
  { id: 'F101', nif: 'NIF-00101', periodoAquisitivo: '2022/2023', dataVencimento: formatDate(datePast) },
  { id: 'F102', nif: 'NIF-00102', periodoAquisitivo: '2023/2024', dataVencimento: formatDate(dateToday) },
  { id: 'F103', nif: 'NIF-00103', periodoAquisitivo: '2023/2024', dataVencimento: formatDate(date15Days) },
  { id: 'F104', nif: 'NIF-00104', periodoAquisitivo: '2023/2024', dataVencimento: formatDate(date45Days) }
];

export const initialAtestados = [
  { id: 'AT-1', nif: 'NIF-00101', dataRecebimento: '2026-10-20', categoria: 'Atestado Médico', situacao: 'Aguardando conferência' },
  { id: 'AT-2', nif: 'NIF-00103', dataRecebimento: '2026-10-22', categoria: 'Declaração de Comparecimento', situacao: 'Em análise administrativa' },
  { id: 'AT-3', nif: 'NIF-00105', dataRecebimento: '2026-10-18', categoria: 'Atestado Médico', situacao: 'Registrado' }
];

export const initialLicencasRegistradas = [
  { id: 'LIC-01', nif: 'NIF-00102', tipo: 'Gala (Casamento)', dataOcorrencia: '2026-09-10', situacao: 'Deferido' }
];