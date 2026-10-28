import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Colaboradores from './pages/Colaboradores';
import Ferias from './pages/Ferias';
import Atestados from './pages/Atestados';
import Licencas from './pages/Licencas';
import Relatorios from './pages/Relatorios';
import ConceitosReact from './pages/ConceitosReact';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
          <Header />
          <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
            <Sidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/colaboradores" element={<Colaboradores />} />
                <Route path="/ferias" element={<Ferias />} />
                <Route path="/atestados" element={<Atestados />} />
                <Route path="/licencas" element={<Licencas />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/conceitos" element={<ConceitosReact />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}