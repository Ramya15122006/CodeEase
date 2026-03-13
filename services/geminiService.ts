
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function explainCode(code: string, language: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Please explain this ${language} code for a total beginner. Use encouraging language and friendly analogies. Code snippet:\n${code}`,
      config: {
        systemInstruction: "You are 'Codey', a friendly and patient coding tutor. Your goal is to make programming feel easy and fun. Use simple analogies like cooking, gardening, or building with Legos. Never use overly technical jargon without explaining it first.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Explain Error:", error);
    return "Oops! My circuits got a bit tangled. Can you try that again?";
  }
}

export async function executeCode(code: string, language: string, input: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a virtual machine executing ${language} code. 
      Input Stream provided by user: "${input}"
      Code to execute:
      ${code}
      
      Instructions:
      1. Simulate the exact output of this code.
      2. If the code requires input, use the "Input Stream" provided above.
      3. Return ONLY the final output as seen in a terminal.
      4. If there are syntax or runtime errors, describe them briefly as a compiler error.`,
      config: {
        systemInstruction: "You are a precise code execution engine. You do not explain. You only output the raw result of the execution. No pleasantries.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Execution Error:", error);
    return "Runtime Error: Execution environment timed out or encountered an internal fault.";
  }
}

export async function getLogicSteps(code: string, language: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Break down the logic of this ${language} code into simple steps. Explain "how the computer thinks" for each part. Code:\n${code}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.STRING, description: 'Short summary of the action' },
              explanation: { type: Type.STRING, description: 'Friendly explanation of why the computer does this' }
            },
            required: ['step', 'explanation']
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Logic Steps Error:", error);
    return [{ step: "Logic Map Error", explanation: "I had a tiny bit of trouble visualizing this." }];
  }
}

export async function generateAIPracticeTest(language: string, topic: string) {
  const prompt = `
    Act as an experienced Computer Science professor. Create a highly randomized 10-question practice test for ${language} on the topic of "${topic}".
    
    Difficulty Distribution Rules:
    - 3 Easy questions
    - 4 Medium questions
    - 3 Hard questions
    
    Every question must have:
    1. A clear problem statement.
    2. 4 distinct options labeled A, B, C, D.
    3. Exactly one correct option.
    4. A concise logical explanation of WHY that answer is correct.
    
    Ensure questions are fresh and do not repeat common patterns. Return as valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  question: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: { 
                        label: { type: Type.STRING }, 
                        text: { type: Type.STRING } 
                      },
                      required: ['label', 'text']
                    }
                  },
                  correct: { type: Type.STRING, description: 'The label (A, B, C, or D) of the correct answer' },
                  explanation: { type: Type.STRING, description: 'A short explanation for the student' }
                },
                required: ['id', 'question', 'options', 'correct', 'difficulty', 'explanation']
              }
            }
          },
          required: ['title', 'questions']
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Practice Test Error:", error);
    throw new Error("Failed to generate practice test.");
  }
}
