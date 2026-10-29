// src/pages/Reports.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { getStoredData, getNormalizedLeaves, STORAGE_KEYS } from '../services/storage';

export default function Reports() {
  const [reportType, setReportType] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todas');

  const employees = getStoredData(STORAGE_KEYS.EMPLOYEES, []);
  const leaves = getNormalizedLeaves();
  const vacations = getStoredData(STORAGE_KEYS.VACATIONS, []);

  const handleClearFilters = () => {
    setReportType('Todos');
    setSearchTerm('');
    setStatusFilter('Todas');
  };

  // Filtragem Consolidada
  const getFilteredData = () => {
    let result = [];

    // Férias
    if (reportType === 'Todos' || reportType === 'Férias') {
      vacations.forEach(v => {
        result.push({
          Origem: 'Férias',
          NIF: String(v.nif),
          Nome: employees.find(e => e.nif === v.nif)?.name || 'N/A',
          Detalhe: `Período Aquisitivo: ${v.period || 'N/A'}`,
          DataInicio: v.startDate || 'N/A',
          DataFim: v.endDate || 'N/A',
          Situação: v.status || 'Regular'
        });
      });
    }

    // Afastamentos
    if (reportType === 'Todos' || reportType === 'Afastamentos') {
      leaves.forEach(l => {
        result.push({
          Origem: 'Afastamento',
          NIF: String(l.nif),
          Nome: employees.find(e => e.nif === l.nif)?.name || 'N/A',
          Detalhe: `Tipo: ${l.leaveType || 'Não informado'}`,
          DataInicio: l.startDate || 'N/A',
          DataFim: l.endDate || 'N/A',
          Situação: l.status || 'Regular'
        });
      });
    }

    // Colaboradores
    if (reportType === 'Colaboradores') {
      employees.forEach(e => {
        result.push({
          Origem: 'Colaborador',
          NIF: String(e.nif),
          Nome: e.name,
          Detalhe: `Nascimento: ${e.birthDate ? e.birthDate.split('-').reverse().join('/') : 'N/A'}`,
          DataInicio: 'N/A',
          DataFim: 'N/A',
          Situação: 'Regular'
        });
      });
    }

    // Aplicar Filtro de Busca (Nome ou NIF)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.Nome.toLowerCase().includes(term) || item.NIF.toLowerCase().includes(term)
      );
    }

    // Aplicar Filtro de Situação
    if (statusFilter !== 'Todas') {
      result = result.filter(item => item.Situação === statusFilter);
    }

    return result;
  };

  const filteredData = getFilteredData();

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert('Nenhum dado encontrado para os filtros selecionados.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatorio_RH_Plus');

    const fileName = `Relatorio_RH_Plus_${reportType}_${new Date().toISOString().slice(0,10)}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Relatórios Administrativos</h1>

      {/* Painel de Filtros */}
      <div className="bg-white p-5 rounded-lg shadow-sm border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Relatório</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border rounded text-sm focus:outline-none"
            >
              <option value="Todos">Todos</option>
              <option value="Férias">Férias</option>
              <option value="Afastamentos">Afastamentos</option>
              <option value="Colaboradores">Colaboradores</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Buscar por Nome ou NIF</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome ou NIF..."
              className="w-full p-2 border rounded text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Situação</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded text-sm focus:outline-none"
            >
              <option value="Todas">Todas</option>
              <option value="Regular">Regular</option>
              <option value="Próximo do vencimento">Próximo do vencimento</option>
              <option value="Vencido">Vencido</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
          >
            Limpar Filtros
          </button>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 text-sm text-white bg-green-600 font-medium rounded hover:bg-green-700 shadow-sm"
          >
            Exportar Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Tabela Resultante */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 border-b">Origem</th>
              <th className="p-3 border-b">NIF</th>
              <th className="p-3 border-b">Nome Colaborador</th>
              <th className="p-3 border-b">Detalhe / Tipo</th>
              <th className="p-3 border-b">Situação</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">Nenhum registro encontrado para a consulta.</td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold text-blue-700">{row.Origem}</td>
                  <td className="p-3 font-mono">{row.NIF}</td>
                  <td className="p-3 font-medium">{row.Nome}</td>
                  <td className="p-3 text-gray-600">{row.Detalhe}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded font-semibold ${
                      row.Situação === 'Vencido' ? 'bg-red-100 text-red-800' :
                      row.Situação === 'Próximo do vencimento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {row.Situação}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}