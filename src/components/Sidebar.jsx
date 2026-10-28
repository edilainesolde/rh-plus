import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, BookOpenCheck, FileSpreadsheet, Code2, Info } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/colaboradores', label: 'Colaboradores', icon: Users },
    { to: '/ferias', label: 'Controle de Férias', icon: Calendar },
    { to: '/atestados', label: 'Atestados', icon: FileText },
    { to: '/licencas', label: 'Licenças e Faltas', icon: BookOpenCheck },
    { to: '/relatorios', label: 'Relatórios Excel', icon: FileSpreadsheet },
    { to: '/conceitos', label: 'Conceitos React', icon: Code2 },
    { to: '/sobre', label: 'Sobre o Projeto', icon: Info },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shadow-sm flex-shrink-0">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive ? 'bg-sky-100 text-sky-800 border-l-4 border-sky-600' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}