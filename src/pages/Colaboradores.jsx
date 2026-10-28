import React, { useState } from 'react';
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
}