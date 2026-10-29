import fs from 'fs';
import path from 'path';

const files = {
  'package.json': JSON.stringify({
    name: "senai-gestao-prazos-rh",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      "lucide-react": "^0.344.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.22.3",
      xlsx: "^0.18.5"
    },
    devDependencies: {
      "@types/react": "^18.2.66",
      "@types/react-dom": "^18.2.22",
      "@vitejs/plugin-react": "^4.2.1",
      autoprefixer: "^10.4.18",
      postcss: "^8.4.35",
      tailwindcss: "^3.4.1",
      vite: "^5.1.6"
    }
  }, null, 2),

  'vite.config.js': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        senai: {
          light: '#e0f2fe',
          brand: '#0284c7',
          dark: '#0369a1',
          navy: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
};`,

  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,

  'index.html': `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestão de RH</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

  'src/styles/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-800 antialiased font-sans min-h-screen;
  }
}`,

  'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

  'src/utils/dateUtils.js': `export const formatDateBR = (dateString) => {
  if (!dateString) return '-';
  const [year, month, day] = dateString.split('-');
  return \`\${day.padStart(2, '0')}/\${month.padStart(2, '0')}/\${year}\`;
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
};`,

  'src/utils/exportExcel.js': `import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName = 'relatorio_senai.xlsx', sheetName = 'Dados') => {
  if (!data || data.length === 0) {
    alert('Não há dados disponíveis para exportação.');
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
};`,

  'src/services/apiService.js': `export const fetchExternalNotice = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) throw new Error('Falha na resposta.');
    const data = await response.json();
    return {
      sucesso: true,
      titulo: "Informativo do Sistema",
      conteudo: data.body,
      origem: "API Pública de Demonstração"
    };
  } catch (error) {
    return { sucesso: false, mensagem: error.message };
  }
};`,

  'src/data/initialData.js': `export const initialColaboradores = [
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
];`,

  'src/context/AppContext.jsx': `import React, { createContext, useState, useContext } from 'react';
import { initialColaboradores, initialFerias, initialAtestados, initialLicencasRegistradas } from '../data/initialData';
import { sanitizeNIF } from '../utils/dateUtils';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [colaboradores, setColaboradores] = useState(initialColaboradores);
  const [ferias, setFerias] = useState(initialFerias);
  const [atestados, setAtestados] = useState(initialAtestados);
  const [licencas, setLicencas] = useState(initialLicencasRegistradas);
  const [interactionCount, setInteractionCount] = useState(0);

  const incrementCount = () => setInteractionCount(prev => prev + 1);

  const addColaborador = (novo) => {
    const sanitizedInputNIF = sanitizeNIF(novo.nif);
    if (!novo.nome.trim()) return { sucesso: false, mensagem: 'Nome é obrigatório.' };
    if (!novo.dataNascimento) return { sucesso: false, mensagem: 'Data de nascimento é obrigatória.' };
    if (!sanitizedInputNIF) return { sucesso: false, mensagem: 'NIF é obrigatório.' };

    const nifExiste = colaboradores.some(c => sanitizeNIF(c.nif) === sanitizedInputNIF);
    if (nifExiste) return { sucesso: false, mensagem: 'NIF já cadastrado.' };

    setColaboradores(prev => [...prev, { ...novo, id: Date.now().toString(), nif: novo.nif.trim().toUpperCase() }]);
    return { sucesso: true, mensagem: 'Colaborador cadastrado com sucesso!' };
  };

  const addFerias = (registro) => {
    setFerias(prev => [...prev, { ...registro, id: \`F-\${Date.now()}\` }]);
    return { sucesso: true, mensagem: 'Registro salvo com sucesso.' };
  };

  const updateAtestadoStatus = (id, novaSituacao) => {
    setAtestados(prev => prev.map(a => a.id === id ? { ...a, situacao: novaSituacao } : a));
  };

  const addAtestado = (novo) => {
    setAtestados(prev => [...prev, { ...novo, id: \`AT-\${Date.now()}\` }]);
    return { sucesso: true, mensagem: 'Atestado registrado.' };
  };

  const addLicenca = (nova) => {
    setLicencas(prev => [...prev, { ...nova, id: \`LIC-\${Date.now()}\` }]);
    return { sucesso: true, mensagem: 'Licença registrada.' };
  };

  return (
    <AppContext.Provider value={{
      colaboradores, ferias, atestados, licencas, interactionCount,
      incrementCount, addColaborador, addFerias, addAtestado, updateAtestadoStatus, addLicenca
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);`,

  'src/components/Header.jsx': `import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-sky-900 text-white border-b-4 border-sky-400">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center space-x-3">
          <div className="bg-sky-600 p-2.5 rounded-lg shadow">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">RH Plus</h1>
            <p className="text-sky-200 text-sm font-medium">Gestão de Prazos e Rotinas de RH</p>
          </div>
        </div>
        <div className="flex items-center bg-sky-950/60 px-3 py-1.5 rounded-full text-xs text-sky-200 border border-sky-700/50">
          <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-400" />
          <span>Ambiente Seguro - LGPD</span>
        </div>
      </div>
    </header>
  );
}`,

  'src/components/Sidebar.jsx': `import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, BookOpenCheck, FileSpreadsheet, Code2, Info } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/colaboradores', label: 'Colaboradores', icon: Users },
    { to: '/ferias', label: 'Controle de Férias', icon: Calendar },
    { to: '/atestados', label: 'Atestados', icon: FileText },
    { to: '/licencas', label: 'Licenças e Faltas', icon: BookOpenCheck },
    { to: '/relatorios', label: 'Relatórios Excel', icon: FileSpreadsheet },
    { to: '/conceitos', label: 'Conceitos React', icon: Code2 },
    { to: '/sobre', label: 'Sobre o Projeto', icon: Info },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shadow-sm flex-shrink-0">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                \`flex items-center px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all \${
                  isActive ? 'bg-sky-100 text-sky-800 border-l-4 border-sky-600' : 'text-slate-600 hover:bg-slate-100'
                }\`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}`,

  'src/pages/Dashboard.jsx': `import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Users, CalendarCheck, CalendarX, FileText, CheckCircle, Plus } from 'lucide-react';
import { classifyStatus, formatDateBR, getDaysRemaining } from '../utils/dateUtils';
import { fetchExternalNotice } from '../services/apiService';

export default function Dashboard() {
  const { colaboradores, ferias, atestados, interactionCount, incrementCount } = useApp();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    fetchExternalNotice().then(setNotice);
  }, []);

  const totalColab = colaboradores.length;
  const feriasAlerta = ferias.filter(f => ['ALERTA', 'HOJE'].includes(classifyStatus(f.dataVencimento).key)).length;
  const feriasVencidas = ferias.filter(f => classifyStatus(f.dataVencimento).key === 'VENCIDO').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">Painel Principal - Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl"><p className="text-xs uppercase font-bold text-slate-500">Colaboradores</p><h3 className="text-2xl font-black">{totalColab}</h3></div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl"><p className="text-xs uppercase font-bold text-slate-500">Férias a Vencer</p><h3 className="text-2xl font-black">{feriasAlerta}</h3></div>
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl"><p className="text-xs uppercase font-bold text-slate-500">Férias Vencidas</p><h3 className="text-2xl font-black">{feriasVencidas}</h3></div>
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl"><p className="text-xs uppercase font-bold text-slate-500">Atestados Pendentes</p><h3 className="text-2xl font-black">{atestados.filter(a => a.situacao !== 'Registrado').length}</h3></div>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl"><p className="text-xs uppercase font-bold text-slate-500">Atestados Concluídos</p><h3 className="text-2xl font-black">{atestados.filter(a => a.situacao === 'Registrado').length}</h3></div>
      </div>

      <div className="bg-sky-50 border border-sky-200 p-5 rounded-xl flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase text-sky-800">Demonstração React — useState</span>
          <h3 className="text-lg font-bold">Contador de Interações</h3>
        </div>
        <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-sky-200">
          <span className="text-xl font-black text-sky-700">{interactionCount}</span>
          <button onClick={incrementCount} className="bg-sky-600 text-white text-xs font-bold px-3 py-2 rounded-md flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}`,

  'src/pages/Colaboradores.jsx': `import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateBR } from '../utils/dateUtils';

export default function Colaboradores() {
  const { colaboradores, addColaborador } = useApp();
  const [nome, setNome] = useState('');
  const [nif, setNif] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addColaborador({ nome, nif, dataNascimento });
    setMsg(res.mensagem);
    if (res.sucesso) { setNome(''); setNif(''); setDataNascimento(''); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">Gestão de Colaboradores</h2>
      {msg && <div className="p-3 bg-sky-100 text-sky-900 rounded font-bold text-xs">{msg}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        <h3 className="font-bold text-sm">Novo Cadastro</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input type="text" placeholder="Nome Completo *" value={nome} onChange={e => setNome(e.target.value)} className="p-2 border rounded text-sm" />
          <input type="text" placeholder="NIF Individual *" value={nif} onChange={e => setNif(e.target.value)} className="p-2 border rounded text-sm font-mono" />
          <input type="date" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} className="p-2 border rounded text-sm" />
        </div>
        <button type="submit" className="bg-sky-600 text-white font-bold text-xs px-4 py-2 rounded">Cadastrar Colaborador</button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase font-bold">
            <tr><th className="p-3">NIF</th><th className="p-3">Nome</th><th className="p-3">Nascimento</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {colaboradores.map(c => (
              <tr key={c.id}><td className="p-3 font-mono font-bold">{c.nif}</td><td className="p-3">{c.nome}</td><td className="p-3">{formatDateBR(c.dataNascimento)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,

  'src/pages/Ferias.jsx': `import React from 'react';
import { useApp } from '../context/AppContext';
import { classifyStatus, formatDateBR } from '../utils/dateUtils';

export default function Ferias() {
  const { colaboradores, ferias } = useApp();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">Controle de Férias</h2>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase font-bold">
            <tr><th className="p-3">NIF</th><th className="p-3">Colaborador</th><th className="p-3">Vencimento</th><th className="p-3">Situação</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ferias.map(f => {
              const colab = colaboradores.find(c => c.nif === f.nif);
              const status = classifyStatus(f.dataVencimento);
              return (
                <tr key={f.id}>
                  <td className="p-3 font-mono font-bold">{f.nif}</td>
                  <td className="p-3">{colab ? colab.nome : 'N/I'}</td>
                  <td className="p-3">{formatDateBR(f.dataVencimento)}</td>
                  <td className="p-3"><span className={\`px-2 py-0.5 rounded text-xs font-bold \${status.color}\`}>{status.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,

  'src/pages/Atestados.jsx': `import React from 'react';
import { useApp } from '../context/AppContext';
import { formatDateBR } from '../utils/dateUtils';

export default function Atestados() {
  const { colaboradores, atestados, updateAtestadoStatus } = useApp();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold">Controle de Atestados</h2>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase font-bold">
            <tr><th className="p-3">NIF</th><th className="p-3">Colaborador</th><th className="p-3">Recebimento</th><th className="p-3">Situação</th><th className="p-3">Ação</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {atestados.map(a => {
              const colab = colaboradores.find(c => c.nif === a.nif);
              return (
                <tr key={a.id}>
                  <td className="p-3 font-mono font-bold">{a.nif}</td>
                  <td className="p-3">{colab ? colab.nome : 'N/I'}</td>
                  <td className="p-3">{formatDateBR(a.dataRecebimento)}</td>
                  <td className="p-3"><span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-xs font-bold">{a.situacao}</span></td>
                  <td className="p-3">
                    <select value={a.situacao} onChange={e => updateAtestadoStatus(a.id, e.target.value)} className="p-1 border rounded text-xs">
                      <option value="Aguardando conferência">Aguardando conferência</option>
                      <option value="Em análise administrativa">Em análise administrativa</option>
                      <option value="Registrado">Registrado</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,

  'src/pages/Licencas.jsx': `import React from 'react';
export default function Licencas() {
  return <div className="space-y-4"><h2 className="text-2xl font-extrabold">Licenças e Faltas Remuneradas</h2><p className="text-sm">Resumo dos itens 23 a 31 do Acordo Coletivo do SENAI.</p></div>;
}`,

  'src/pages/Relatorios.jsx': `import React from 'react';
import { useApp } from '../context/AppContext';
import { exportToExcel } from '../utils/exportExcel';

export default function Relatorios() {
  const { colaboradores } = useApp();
  const handleExport = () => {
    exportToExcel(colaboradores.map(c => ({ 'NIF': c.nif, 'Nome': c.nome, 'Nascimento': c.dataNascimento })), 'colaboradores_senai.xlsx');
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold">Relatórios Excel</h2>
      <button onClick={handleExport} className="bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded shadow">Exportar Colaboradores (.XLSX)</button>
    </div>
  );
}`,

  'src/pages/ConceitosReact.jsx': `import React from 'react';
export default function ConceitosReact() {
  return <div className="space-y-4"><h2 className="text-2xl font-extrabold">Conceitos React</h2><p className="text-sm">useState, useEffect, React Router DOM, Formulários Controlados e Consumo de APIs.</p></div>;
}`,

  'src/pages/Sobre.jsx': `import React from 'react';
export default function Sobre() {
  return <div className="space-y-4"><h2 className="text-2xl font-extrabold">Sobre o Projeto</h2><p className="text-sm">Sistema desenvolvido para a unidade SENAI CFP 404 Sorocaba Itavuvu.</p></div>;
}`,

  'src/pages/NotFound.jsx': `import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-bold">Página não encontrada (404)</h2>
      <Link to="/" className="text-sky-600 text-xs font-bold underline mt-2 inline-block">Voltar ao Dashboard</Link>
    </div>
  );
}`,

  'src/App.jsx': `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Colaboradores from './pages/Colaboradores';
import Ferias from './pages/Ferias';
import Atestados from './pages/Atestados';
import Licencas from './pages/Licencas';
import Relatorios from './pages/Relatorios';
import ConceitosReact from './pages/ConceitosReact';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Header />
          <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/colaboradores" element={<Colaboradores />} />
                <Route path="/ferias" element={<Ferias />} />
                <Route path="/atestados" element={<Atestados />} />
                <Route path="/licencas" element={<Licencas />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/conceitos" element={<ConceitosReact />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
});

console.log('✅ Todos os arquivos e pastas do projeto SENAI foram gerados com sucesso!');