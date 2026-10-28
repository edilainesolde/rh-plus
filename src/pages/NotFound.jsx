import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-bold">Página não encontrada (404)</h2>
      <Link to="/" className="text-sky-600 text-xs font-bold underline mt-2 inline-block">Voltar ao Dashboard</Link>
    </div>
  );
}