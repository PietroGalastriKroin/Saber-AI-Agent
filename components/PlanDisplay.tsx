
import React, { useState, useMemo } from 'react';

interface PlanDisplayProps {
  plan: string;
  onStartOver: () => void;
}

interface Section {
  title: string;
  content: string;
}

const icons: { [key: string]: React.FC<{className: string}> } = {
  "Visão Geral do Projeto": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  "Roteiro Detalhado dos Desafios": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  "Planejamento de Logística e Materiais": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  "Alinhamento com a BNCC": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" /></svg>,
  "Estratégias de Avaliação e Mensuração (KPIs)": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  "Manual de Orientação para Facilitadores": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  "Visão de Impacto Esperado": ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};


const AccordionItem: React.FC<{ section: Section; isOpen: boolean; onClick: () => void }> = ({ section, isOpen, onClick }) => {
  const Icon = icons[section.title] || icons["Visão Geral do Projeto"];

  return (
    <div className="border border-lime-200 bg-white rounded-lg shadow-sm mb-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left text-blue-900 hover:bg-lime-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-lime-500" />
          <span className="font-semibold text-lg">{section.title}</span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-5 border-t border-lime-200">
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}>
          </div>
        </div>
      )}
    </div>
  );
};


export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onStartOver }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = useMemo<Section[]>(() => {
    return plan.split('## ').slice(1).map(sectionText => {
      const parts = sectionText.split('\n');
      const title = parts[0].trim();
      const content = parts.slice(1).join('\n').trim();
      return { title, content };
    });
  }, [plan]);

  const handleToggle = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 sm:mb-0">Seu Plano de Projeto Personalizado</h2>
            <button
            onClick={onStartOver}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
            Criar Novo Projeto
            </button>
        </div>

      {sections.map((section, index) => (
        <AccordionItem
          key={index}
          section={section}
          isOpen={openSection === section.title}
          onClick={() => handleToggle(section.title)}
        />
      ))}
    </div>
  );
};
