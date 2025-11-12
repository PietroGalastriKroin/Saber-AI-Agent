
import React, { useState } from 'react';
import type { UserInput } from '../types';

interface ProjectFormProps {
  onSubmit: (data: UserInput) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserInput>({
    age: '',
    numChallenges: '3',
    time: '',
    theme: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mt-4 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-white-900">Detalhes do Projeto</h2>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Idade dos Alunos (anos)</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Ex: 9-10"
            required
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          />
        </div>

        <div>
          <label htmlFor="numChallenges" className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Desafios</label>
          <input
            type="number"
            id="numChallenges"
            name="numChallenges"
            value={formData.numChallenges}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Tempo Estimado para Realização</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Ex: 2 horas"
            required
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          />
        </div>

        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">Tema Principal e Subtópicos</label>
          <textarea
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            rows={4}
            placeholder="Ex: Astronomia, com foco em planetas do sistema solar, fases da lua e constelações."
            required
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-lime-500 focus:border-lime-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-400 text-blue-900 font-bold py-3 px-4 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
        >
          Gerar Plano de Projeto
        </button>
      </form>
    </div>
  );
};
