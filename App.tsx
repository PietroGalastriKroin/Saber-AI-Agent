
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProjectForm } from './components/ProjectForm';
import { PlanDisplay } from './components/PlanDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateProjectPlan } from './services/geminiService';
import type { UserInput } from './types';
import { ChatBubble } from './components/ChatBubble';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleStart = () => {
    setShowForm(true);
  };

  const handleGeneratePlan = useCallback(async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setUserInput(input);
    setShowForm(false); 

    try {
      const plan = await generateProjectPlan(input);
      setGeneratedPlan(plan);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the project plan. Please check the console and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartOver = () => {
    setUserInput(null);
    setGeneratedPlan(null);
    setError(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {!generatedPlan && !isLoading && (
          <div className="w-full max-w-2xl text-center flex flex-col items-center">
            <ChatBubble onStart={handleStart} showForm={showForm} />
            {showForm && <ProjectForm onSubmit={handleGeneratePlan} />}
          </div>
        )}

        {isLoading && (
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-blue-800 animate-pulse">Gerando seu plano de projeto com a magia da IA...</p>
            <p className="mt-2 text-sm text-gray-600">Isso pode levar alguns instantes.</p>
          </div>
        )}

        {error && (
          <div className="w-full max-w-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {generatedPlan && !isLoading && (
          <div className="w-full max-w-4xl">
            <PlanDisplay plan={generatedPlan} onStartOver={handleStartOver} />
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Saberê! AI Project Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
