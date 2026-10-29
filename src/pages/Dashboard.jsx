// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import InteractionCounter from '../components/InteractionCounter';
import { getStoredData, setStoredData, STORAGE_KEYS, INITIAL_HOLIDAYS } from '../services/storage';

export default function Dashboard() {
  const [holidays, setHolidays] = useState(() => 
    getStoredData(STORAGE_KEYS.HOLIDAYS, INITIAL_HOLIDAYS)
  );
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    category: 'Feriado nacional',
    isDayOff: false,
    description: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setStoredData(STORAGE_KEYS.HOLIDAYS, holidays);
  }, [holidays]);

  const categories = [
    'Feriado nacional',
    'Feriado estadual',
    'Feriado municipal',
    'Data comemorativa',
    'Data institucional'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.date) {
      setErrorMsg('Por favor, preencha o Nome e a Data obrigatoriamente.');
      return;
    }

    setErrorMsg('');
    if (editingId) {
      setHolidays(holidays.map(h => h.id === editingId ? { ...formData, id: editingId } : h));
      setEditingId(null);
    } else {
      const newEntry = { ...formData, id: Date.now().toString() };
      setHolidays([...holidays, newEntry]);
    }

    setFormData({ name: '', date: '', category: 'Feriado nacional', isDayOff: false, description: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente remover esta data comemorativa/feriado?')) {
      setHolidays(holidays.filter(h => h.id !== id));
    }
  };

  // Ordenação cronológica
  const sortedHolidays = [...holidays].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho Institucional */}
      <div className="bg-slate-800 text-white p-4 rounded-lg shadow flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">SENAI CFP 404 — Sorocaba Itavuvu</h1>
        <span className="bg-blue-500 text-xs px-3 py-1 rounded-full uppercase font-semibold">Sistema RH Plus</span>
      </div>

      {/* Demonstração React useState */}
      <InteractionCounter />

      {/* Seção Datas Comemorativas e Feriados */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Datas Comemorativas e Feriados</h2>
            <p className="text-sm text-gray-500">Gestão do calendário administrativo para Sorocaba e região</p>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
            {errorMsg}
          </div>
        )}

        {/* Formulário de Cadastro / Edição */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Aniversário de Sorocaba"
              className="w-full text-sm p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Data *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full text-sm p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Categoria</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-sm p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Descrição (Opcional)</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Observações administrativas..."
              className="w-full text-sm p-2 border rounded border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2 pt-5">
            <input
              type="checkbox"
              id="isDayOff"
              checked={formData.isDayOff}
              onChange={(e) => setFormData({ ...formData, isDayOff: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="isDayOff" className="text-xs font-medium text-gray-700">
              Confirmado como Dia de Folga
            </label>
          </div>

          <div className="md:col-span-3 flex justify-end space-x-2 mt-2">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', date: '', category: 'Feriado nacional', isDayOff: false, description: '' });
                }}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 font-medium"
            >
              {editingId ? 'Salvar Alteração' : 'Cadastrar Data'}
            </button>
          </div>
        </form>

        {/* Listagem de Datas */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="p-3 border-b">Data</th>
                <th className="p-3 border-b">Evento</th>
                <th className="p-3 border-b">Categoria</th>
                <th className="p-3 border-b">Natureza</th>
                <th className="p-3 border-b text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedHolidays.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">Nenhuma data cadastrada.</td>
                </tr>
              ) : (
                sortedHolidays.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <td className="p-3 font-semibold text-slate-700">{item.date.split('-').reverse().join('/')}</td>
                    <td className="p-3">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      {item.description && <div className="text-xs text-gray-400">{item.description}</div>}
                    </td>
                    <td className="p-3 text-gray-600">{item.category}</td>
                    <td className="p-3">
                      {item.isDayOff ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Dia de Folga
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Data Comemorativa
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline text-xs">Editar</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-xs">Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 