import React, { useState, useEffect } from 'react';
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
}