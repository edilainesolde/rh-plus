import React from 'react';
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
}