
import React, { useState } from 'react';
// Fixed: Removed getHint import as it is not exported by geminiService and not used in this component
import { explainCode } from '../services/geminiService';
import { Language } from '../types';

export const Practice: React.FC = () => {
  const [code, setCode] = useState('// Welcome to the CodeEase Sandbox!\n// Write any code here and click "Explain" to learn.');
  const [lang, setLang] = useState(Language.PYTHON);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleExplain = async () => {
    setIsProcessing(true);
    const text = await explainCode(code, lang);
    setResult(text || "I'm thinking... but couldn't quite find the words.");
    setIsProcessing(false);
  };

  const handleClear = () => {
    setCode('');
    setResult(null);
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Sandbox Mode 🧪</h1>
          <p className="text-slate-500 mt-2 italic">No tasks, no deadlines. Just you and your code.</p>
        </div>
        <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm self-start">
          {Object.values(Language).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                lang === l ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex-1 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border-4 border-slate-800">
            <div className="bg-slate-800/80 px-8 py-4 flex justify-between items-center border-b border-slate-700">
              <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">{lang} EDITOR</span>
              <button onClick={handleClear} className="text-slate-500 hover:text-white text-xs font-bold uppercase">Clear All</button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-10 mono text-indigo-300 outline-none resize-none leading-relaxed text-lg"
              spellCheck={false}
            />
          </div>
          <button
            onClick={handleExplain}
            disabled={isProcessing}
            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[2rem] font-black shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isProcessing ? '🤖 CODEY IS ANALYZING...' : '✨ EXPLAIN MY CODE'}
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 overflow-y-auto shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <span>🤖</span> Codey's Insights
          </h3>
          {result ? (
            <div className="prose prose-slate text-slate-600 leading-relaxed animate-in fade-in slide-in-from-right-4">
               {result.split('\n').map((line, i) => (
                 <p key={i} className="mb-4">{line}</p>
               ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
              <div className="text-5xl mb-4">✍️</div>
              <p className="font-medium text-slate-400">Write some code and let's <br /> learn together!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
