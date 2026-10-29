// src/pages/About.jsx
import React from 'react';

export default function About() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="bg-slate-800 text-white p-8 rounded-lg shadow-md space-y-3">
        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Institucional</span>
        <h1 className="text-3xl font-extrabold">Sobre o RH Plus</h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          Projeto desenvolvido para o <strong>SENAI CFP 404 — Sorocaba Itavuvu</strong>, visando centralizar a gestão administrativa de Recursos Humanos e otimizar processos internos.
        </p>
      </div>

      {/* Cartão de Origem e Motivação */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Origem e Motivação</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          O <strong>RH Plus</strong> é um projeto idealizado por <strong>Edilaine Paulino Soldé</strong>, a partir de uma dificuldade presenciada em seu ambiente de trabalho: a necessidade de consultar informações administrativas simples que estavam distribuídas em diversas planilhas de Excel.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed">
          A dispersão dessas informações pode tornar as consultas mais demoradas, dificultar a localização de registros e aumentar a dependência de controles manuais. Diante dessa necessidade, surgiu a proposta de desenvolver uma aplicação web que centralize informações administrativas relevantes, facilitando o acompanhamento de prazos, vencimentos de férias, registros de afastamento e datas importantes.
        </p>
      </div>

      {/* Cartão de Objetivos */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Objetivos do Projeto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
          <div className="p-3 bg-blue-50 rounded border border-blue-100 flex items-start space-x-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Centralizar informações administrativas em um único local.</span>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100 flex items-start space-x-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Facilitar a consulta rápida e organizada de dados.</span>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100 flex items-start space-x-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Acompanhar vencimentos e prazos críticos com alertas.</span>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100 flex items-start space-x-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Organizar registros de férias e afastamentos de forma padronizada.</span>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100 flex items-start space-x-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Disponibilizar relatórios filtrados para exportação em Excel (.xlsx).</span>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100 flex items-start space-x-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>Reduzir a dependência de múltiplas planilhas dispersas.</span>
          </div>
        </div>
      </div>
    </div>
  );
}