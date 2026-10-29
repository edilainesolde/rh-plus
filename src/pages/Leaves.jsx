// src/pages/Leaves.jsx
import React, { useState, useEffect } from 'react';
import { getNormalizedLeaves, setStoredData, getStoredData, STORAGE_KEYS } from '../services/storage';

export default function Leaves() {
  const [leaves, setLeaves] = useState(() => getNormalizedLeaves());
  const [employees] = useState(() => getStoredData(STORAGE_KEYS.EMPLOYEES, []));

  const [formData, setFormData] = useState({
    nif: '',
    leaveType: 'Atestado médico',
    startDate: '',
    endDate: '',
    status: 'Regular'
  });

  const leaveTypes = [
    'Atestado médico',
    'Atestado odontológico',
    'Declaração de comparecimento',
    'Afastamento relacionado à licença',
    'Outro tipo de documento'
  ];

  useEffect(() => {
    setStoredData(STORAGE_KEYS.LEAVES, leaves);
  }, [leaves]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nif || !formData.startDate || !formData.leaveType) {
      alert('Preencha os campos obrigatórios (*).');
      return;
    }

    const newRecord = {
      ...formData,
      id: Date.now().toString()
    };

    setLeaves([...leaves, newRecord]);
    setFormData({ nif: '', leaveType: 'Atestado médico', startDate: '', endDate: '', status: 'Regular' });
  };

  const getEmployeeName = (nif) => {
    const emp = employees.find(e => e.nif === nif);
    return emp ? emp.name : `NIF: ${nif}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Registro de Afastamento</h1>
          <p className="text-sm text-gray-500">Controle administrativo de licenças e atestados dos colaboradores</p>
        </div>
      </div>

      {/* Form de Afastamento */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Colaborador (NIF) *</label>
            <select
              value={formData.nif}
              onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none"
            >
              <option value="">Selecione o Colaborador</option>
              {employees.map(emp => (
                <option key={emp.nif} value={emp.nif}>{emp.name} (NIF: {emp.nif})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de afastamento *</label>
            <select
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none"
            >
              {leaveTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Data Inicial *</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Data Final / Retorno</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
            Salvar Registro
          </button>
        </div>
      </form>

      {/* Tabela de Registros */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 border-b">NIF</th>
              <th className="p-3 border-b">Colaborador</th>
              <th className="p-3 border-b">Tipo de Afastamento</th>
              <th className="p-3 border-b">Período</th>
              <th className="p-3 border-b">Situação</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">Nenhum registro de afastamento encontrado.</td>
              </tr>
            ) : (
              leaves.map(item => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono font-medium">{item.nif}</td>
                  <td className="p-3">{getEmployeeName(item.nif)}</td>
                  <td className="p-3 font-semibold text-slate-700">
                    {item.leaveType || 'Não informado'}
                  </td>
                  <td className="p-3 text-gray-600">
                    {item.startDate.split('-').reverse().join('/')} {item.endDate ? `até ${item.endDate.split('-').reverse().join('/')}` : ''}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800 font-medium">
                      {item.status || 'Regular'}
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