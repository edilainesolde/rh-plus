// src/pages/Employees.jsx
import React, { useState, useEffect } from 'react';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../services/storage';

export default function Employees() {
  const [employees, setEmployees] = useState(() => 
    getStoredData(STORAGE_KEYS.EMPLOYEES, [
      { nif: '102938', name: 'Carlos Eduardo Silva', birthDate: '1988-05-14', role: 'Assistente Administrativo' },
      { nif: '405968', name: 'Mariana Oliveira', birthDate: '1992-11-20', role: 'Analista de RH' }
    ])
  );

  const [formData, setFormData] = useState({ name: '', birthDate: '', nif: '', role: '' });
  const [editingNif, setEditingNif] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setStoredData(STORAGE_KEYS.EMPLOYEES, employees);
  }, [employees]);

  const validateDate = (dateString) => {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate <= today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.nif) {
      setError('Todos os campos obrigatórios (*) devem ser preenchidos.');
      return;
    }

    if (!validateDate(formData.birthDate)) {
      setError('A Data de Nascimento não pode ser uma data futura.');
      return;
    }

    if (!editingNif && employees.some(emp => emp.nif === formData.nif)) {
      setError('Já existe um colaborador cadastrado com este NIF.');
      return;
    }

    setError('');
    if (editingNif) {
      setEmployees(employees.map(emp => emp.nif === editingNif ? formData : emp));
      setEditingNif(null);
    } else {
      setEmployees([...employees, formData]);
    }

    setFormData({ name: '', birthDate: '', nif: '', role: '' });
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingNif(emp.nif);
  };

  const handleDelete = (nif) => {
    if (window.confirm(`Confirma a exclusão do colaborador NIF: ${nif}?`)) {
      setEmployees(employees.filter(emp => emp.nif !== nif));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Cadastro de Colaboradores</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Formulário com Rótulos Visíveis e Consistentes */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nome completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Data de nascimento *
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              NIF (Identificador Único) *
            </label>
            <input
              type="text"
              value={formData.nif}
              disabled={!!editingNif}
              onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="Número de Identificação"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          {editingNif && (
            <button
              type="button"
              onClick={() => {
                setEditingNif(null);
                setFormData({ name: '', birthDate: '', nif: '', role: '' });
              }}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
          >
            {editingNif ? 'Atualizar Colaborador' : 'Salvar Colaborador'}
          </button>
        </div>
      </form>

      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 border-b">NIF</th>
              <th className="p-3 border-b">Nome Completo</th>
              <th className="p-3 border-b">Data de Nascimento</th>
              <th className="p-3 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.nif} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono font-medium text-slate-800">{emp.nif}</td>
                <td className="p-3 font-medium text-gray-800">{emp.name}</td>
                <td className="p-3 text-gray-600">
                  {emp.birthDate ? emp.birthDate.split('-').reverse().join('/') : 'Não informada'}
                </td>
                <td className="p-3 text-center space-x-3">
                  <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:underline text-xs">Editar</button>
                  <button onClick={() => handleDelete(emp.nif)} className="text-red-600 hover:underline text-xs">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}