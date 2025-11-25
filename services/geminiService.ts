import { GoogleGenAI } from "@google/genai";
import { TechStack } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTechExplanation = async (tech: TechStack, customQuery?: string): Promise<string> => {
  const modelId = 'gemini-2.5-flash';

  let prompt = "";

  if (customQuery) {
    prompt = `Você é um arquiteto de software sênior e especialista em Google AI Studio.
    O usuário está perguntando sobre: "${customQuery}" no contexto de ${tech}.
    
    Responda em Português do Brasil.
    Explique como o Gemini pode ajudar a criar isso.
    Forneça um exemplo de código prático e moderno.
    Use formatação Markdown para o código.`;
  } else {
    prompt = `Você é um arquiteto de software sênior e especialista em Google AI Studio.
    O usuário quer saber: "Posso criar aplicações em ${tech} usando o Gemini?"
    
    Responda em Português do Brasil.
    1. Confirme que é perfeitamente possível.
    2. Explique brevemente como funciona (o modelo gera o código, o usuário implementa).
    3. Gere um exemplo de código "Hello World" ou um componente básico robusto usando ${tech}.
       - Se for React/Next.js: Use Functional Components e Tailwind.
       - Se for Angular: Use Standalone Components modernos.
       - Se for HTML5 & CSS3: Use HTML semântico e CSS moderno (Flexbox/Grid).
       - Se for Python: Use um script limpo ou Flask/FastAPI básico.
       - Se for Java: Use uma classe simples ou Spring Boot controller.
       - Se for Flutter: Use um Widget básico.
       - Se for React Native (Expo): Use componentes funcionais e StyleSheet.
    Use formatação Markdown para o código.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: "Você é um assistente técnico amigável, didático e preciso. Responda sempre em Markdown bem formatado.",
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar uma resposta no momento.";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Ocorreu um erro ao comunicar com o Google AI Studio. Verifique sua chave de API ou tente novamente.";
  }
};