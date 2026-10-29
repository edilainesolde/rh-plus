// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Leaves from './pages/Leaves';
import Reports from './pages/Reports';
import About from './pages/About'; // Importando o arquivo físico que realmente existe
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/colaboradores" element={<Employees />} />
            <Route path="/afastamentos" element={<Leaves />} />
            <Route path="/relatorios" element={<Reports />} />
            <Route path="/sobre" element={<About />} />
            
            {/* Redirecionamentos de rotas antigas */}
            <Route path="/atestados" element={<Navigate to="/afastamentos" replace />} />
            <Route path="/conceitos-react" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}