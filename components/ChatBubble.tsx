
import React, { useState } from 'react';

interface ChatBubbleProps {
  onStart: () => void;
  showForm: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ onStart, showForm }) => {
  const [conversationStarted, setConversationStarted] = useState(false);

  const handleUserResponse = () => {
    setConversationStarted(true);
    setTimeout(() => {
        onStart();
    }, 500);
  };

  return (
    <div className="w-full max-w-2xl p-4 space-y-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center text-blue-900 font-bold text-lg">AI</div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-800">Olá! Sou o agente de IA da Saberê!, pronto para transformar suas ideias em projetos educacionais completos. Para começar, clique no botão abaixo.</p>
        </div>
      </div>
      
      {!conversationStarted && (
        <div className="flex justify-end">
            <button
                onClick={handleUserResponse}
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
            >
                Gostaria de desenvolver um projeto
            </button>
        </div>
      )}

      {conversationStarted && !showForm && (
        <>
            <div className="flex justify-end">
                <div className="bg-white-500 text-black p-4 rounded-lg shadow max-w-xs">
                    <p>Gostaria de desenvolver um projeto</p>
                </div>
            </div>
            <div className="flex items-start space-x-3 animate-fade-in">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center text-blue-900 font-bold text-lg">AI</div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-gray-800">Excelente! Para criar o plano perfeito, preciso de alguns detalhes. Por favor, preencha o formulário abaixo.</p>
                </div>
            </div>
        </>
      )}
    </div>
  );
};
