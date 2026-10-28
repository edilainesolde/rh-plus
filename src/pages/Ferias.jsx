import React from 'react';
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
                  <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${status.color}`}>{status.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}