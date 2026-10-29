// src/components/InteractionCounter.jsx
import React, { useState, useEffect } from 'react';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../services/storage';

export default function InteractionCounter() {
  const [count, setCount] = useState(() => {
    return getStoredData(STORAGE_KEYS.COUNTER, 0);
  });

  useEffect(() => {
    setStoredData(STORAGE_KEYS.COUNTER, count);
  }, [count]);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        Demonstração React — useState
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Contador de Interações
      </p>
      
      <div className="flex items-center space-x-4">
        <div className="text-3xl font-extrabold text-blue-600 bg-blue-50 px-4 py-2 rounded-md border border-blue-100">
          {count}
        </div>
        <button
          onClick={handleIncrement}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm"
        >
          Adicionar
        </button>
        <button
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Zerar
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        * Cada clique incrementa o estado dinâmico via React useState.
      </p>
    </div>
  );
}