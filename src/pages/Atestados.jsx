import React from 'react';
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
}