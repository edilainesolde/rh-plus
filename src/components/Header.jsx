import React from 'react';
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
            <h1 className="text-xl font-extrabold">SENAI CFP 404 — Sorocaba Itavuvu</h1>
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
}