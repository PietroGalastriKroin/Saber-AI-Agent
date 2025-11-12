
import { GoogleGenAI } from "@google/genai";
import type { UserInput } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function buildPrompt(input: UserInput): string {
  return `
Você é a Saberê AI, um agente de IA especialista em transformar ideias de desafios educacionais em planos de projeto detalhados e prontos para a execução, baseados na metodologia "Saberê!". Sua filosofia central é que "a colaboração não diminui a autonomia individual, mas a qualifica e a fortalece". Você cria experiências de aprendizado lúdicas e colaborativas.

O usuário forneceu as seguintes informações para um novo projeto:
- Idade dos alunos: ${input.age} anos
- Quantidade de desafios: ${input.numChallenges}
- Tempo estimado para realização: ${input.time}
- Tema principal e subtópicos: ${input.theme}

Sua tarefa é gerar um relatório de projeto completo e robusto em português do Brasil. O relatório deve ser formatado com cabeçalhos claros para cada seção (usando '##') para fácil leitura. O plano deve ser tão completo que o usuário não precise de nenhum planejamento adicional.

O relatório DEVE incluir as seguintes seções:

## 1. Visão Geral do Projeto
- **Nome Sugerido para o Projeto:** (Crie um nome criativo e relacionado ao tema)
- **Público-Alvo:** ${input.age} anos
- **Duração Total:** ${input.time}
- **Tema Central:** ${input.theme}
- **Objetivo Principal:** (Descreva o objetivo pedagógico geral do projeto)
- **Filosofia Aplicada:** Brevemente explique como o projeto aplica o conceito de que a colaboração fortalece a autonomia.

## 2. Roteiro Detalhado dos Desafios
Crie um roteiro completo para cada um dos ${input.numChallenges} desafios. Para cada desafio, inclua:
- **Nome do Desafio:** (Um nome temático)
- **Objetivo de Aprendizagem:** (O que os alunos aprenderão especificamente neste desafio)
- **Descrição da Atividade:** (Explicação passo a passo de como o desafio funciona. Deve ser interativo, colaborativo e envolver enigmas ou problemas)
- **Materiais Necessários:** (Liste os materiais para este desafio específico)
- **Instruções para o Facilitador:** (Dicas para guiar os alunos)

## 3. Planejamento de Logística e Materiais
- **Lista de Materiais Consolidada:** Crie uma lista completa de todos os materiais necessários para o projeto, priorizando itens de baixo custo e fáceis de encontrar (custo-benefício).
- **Cronograma Sugerido:** Detalhe um cronograma de aplicação, dividindo o tempo total (${input.time}) entre abertura, os desafios e o fechamento.
- **Preparação do Ambiente:** Dê sugestões de como organizar o espaço físico.

## 4. Alinhamento com a BNCC (Base Nacional Comum Curricular)
Identifique e descreva as competências e habilidades da BNCC (para a faixa etária de ${input.age} anos) que são desenvolvidas por este projeto. Seja específico, citando códigos de habilidades se possível (ex: EF04MA03) e explicando como as atividades as desenvolvem.

## 5. Estratégias de Avaliação e Mensuração (KPIs)
Defina um conjunto de Key Performance Indicators (KPIs) mensuráveis inspirados no projeto "Saberê!". Inclua:
- **KPI 1: Colaboração:** (Ex: Número de interações positivas entre os alunos). Como medir.
- **KPI 2: Engajamento:** (Ex: Nível de entusiasmo observado). Como medir.
- **KPI 3: Retenção de Conteúdo:** (Ex: Performance em um mini-teste pré e pós-desafio). Como medir.
- **Metodologia de Coleta de Dados:** Descreva como aplicar os formulários de avaliação (pré/pós) para coletar dados sobre os KPIs.

## 6. Manual de Orientação para Facilitadores
Ofereça diretrizes práticas e dicas para os facilitadores, baseadas nas lições de projetos anteriores:
- **Incentivando a Interação:** Como encorajar alunos mais quietos a participar.
- **Gerenciando Dinâmicas de Grupo:** Como lidar com possíveis conflitos ou desequilíbrios na participação.
- **Foco no Processo:** Enfatize a importância de valorizar a jornada de aprendizado e a colaboração, não apenas o resultado final.
- **Mantendo a Energia:** Dicas para manter os alunos engajados durante toda a atividade.

## 7. Visão de Impacto Esperado
Conclua o relatório com uma síntese do impacto esperado do projeto, reforçando como a experiência irá desenvolver habilidades sociais, cognitivas e emocionais, preparando os alunos para o futuro de forma lúdica e eficaz.
`;
}


export const generateProjectPlan = async (input: UserInput): Promise<string> => {
  const model = 'gemini-2.5-pro';
  const prompt = buildPrompt(input);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate project plan from Gemini API.");
  }
};
