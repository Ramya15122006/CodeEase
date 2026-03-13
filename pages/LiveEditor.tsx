
import React, { useState, useEffect } from 'react';
import { executeCode } from '../services/geminiService';

const TEMPLATES = {
  C: `#include <stdio.h>\n\nint main() {\n    char name[50];\n    printf("Enter your name: ");\n    scanf("%s", name);\n    printf("Hello, %s! Welcome to C.", name);\n    return 0;\n}`,
  Python: `name = input("Enter your name: ")\nprint(f"Hello, {name}! Welcome to Python.")\n\n# Try some logic\nfor i in range(3):\n    print(f"Iteration {i+1}")`,
  Java: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter your name: ");\n        String name = sc.next();\n        System.out.println("Hello, " + name + "! Welcome to Java.");\n    }\n}`
};

export const LiveEditor: React.FC = () => {
  const [lang, setLang] = useState<'C' | 'Python' | 'Java'>('Python');
  const [code, setCode] = useState(TEMPLATES.Python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleReset = () => {
    if (window.confirm("This will clear your current progress. Continue?")) {
      setCode(TEMPLATES[lang]);
      setOutput('');
      setInput('');
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Compiling and executing...\n");
    const result = await executeCode(code, lang, input);
    setOutput(result || "Process finished with no output.");
    setIsRunning(false);
  };

  useEffect(() => {
    setCode(TEMPLATES[lang]);
    setOutput('');
  }, [lang]);

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-8 border-[#7BBDE8] pl-10">
        <div>
          <h1 className="text-5xl font-black text-[#BDD8E9] uppercase tracking-tighter">Live <span className="text-[#7BBDE8]">Compiler</span></h1>
          <p className="text-[#6EA2B3] font-bold italic mt-2">Experimental Logic Laboratory. No installation required.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="px-6 py-3 bg-white/5 border border-white/10 text-rose-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/10 transition-all"
          >
            Reset Code 🔄
          </button>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="px-10 py-3 bg-[#7BBDE8] text-[#001D39] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isRunning ? 'Executing...' : 'Run Logic 🚀'}
          </button>
        </div>
      </header>

      <div className="flex gap-3 p-1 bg-[#001D39] border border-white/10 rounded-2xl w-fit">
        {(['C', 'Python', 'Java'] as const).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              lang === l ? 'bg-[#0A4174] text-[#7BBDE8] shadow-lg border border-[#7BBDE8]/30' : 'text-[#49769F] hover:text-[#BDD8E9]'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]">
        {/* Editor Panel */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 rounded-[2.5rem] border-4 border-slate-800 overflow-hidden shadow-2xl">
          <div className="px-8 py-4 bg-slate-800/50 flex justify-between items-center border-b border-slate-700">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">{lang}.script</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/30"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/30"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-12 bg-slate-800/30 border-r border-slate-700/50 flex flex-col items-center py-8 text-slate-600 font-mono text-sm select-none">
               {[...Array(50)].map((_, i) => <span key={i} className="leading-[1.6]">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-8 mono text-lg text-[#7BBDE8] outline-none resize-none leading-[1.6]"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Input / Output Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Input Box */}
          <div className="h-1/3 bg-[#0A4174]/20 rounded-[2rem] border border-white/5 p-8 flex flex-col">
            <label className="text-[10px] font-black text-[#49769F] uppercase tracking-widest mb-4">Input Stream (Stdin)</label>
            <textarea 
              placeholder="Paste inputs here (one per prompt)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[#BDD8E9] font-mono text-sm outline-none resize-none"
            />
          </div>

          {/* Terminal Console */}
          <div className="flex-1 bg-black rounded-[2.5rem] border-4 border-slate-800 shadow-inner flex flex-col">
            <div className="px-8 py-4 bg-slate-900 flex justify-between items-center border-b border-slate-800">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">System Output</span>
              <button 
                onClick={() => setOutput('')}
                className="text-[9px] font-black text-slate-600 hover:text-slate-400 uppercase"
              >
                Clear Console
              </button>
            </div>
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
              <pre className={`mono text-sm leading-relaxed ${output.includes('Error') ? 'text-rose-400' : 'text-emerald-400'}`}>
                {output || <span className="text-slate-700 italic">// Awaiting execution results...</span>}
              </pre>
              {isRunning && (
                <div className="mt-4 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
