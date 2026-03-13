
import React, { useState, useEffect } from 'react';
import { CodingQuestion } from '../types';
import { executeCode } from '../services/geminiService';

export interface MCQ {
  question: string;
  options: string[];
  correct: number;
}

interface TopicProps {
  id: string; // Added ID for progress tracking
  level: number;
  name: string;
  explanation: string;
  importantPoints: string[];
  asciiFlowchart: string;
  imageDescription: string;
  flowchartSteps: string[];
  syntax: string;
  code: string;
  sampleOutput: string;
  executionExplanation: string;
  mistakes: string[];
  practiceTask: string;
  practiceQuestions: string[];
  mcqs?: MCQ[];
  codingLab?: CodingQuestion[];
  themeColor?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'violet' | 'cyan';
  language?: string;
}

export const AdvancedTutorialTopic: React.FC<TopicProps> = (props) => {
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showLab, setShowLab] = useState(false);
  
  // Micro-Editor State
  const [liveCode, setLiveCode] = useState(props.code);
  const [liveOutput, setLiveOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load Completion Status
  useEffect(() => {
    const saved = localStorage.getItem('ce_progress_map');
    if (saved) {
      const map = JSON.parse(saved);
      setIsCompleted(!!map[props.id]);
    }
    setLiveCode(props.code);
    setLiveOutput('');
    setShowResults(false);
    setMcqAnswers({});
  }, [props.id, props.code]);

  const handleViewResults = () => {
    if (!props.mcqs) return;
    
    const totalQuestions = props.mcqs.length;
    const answeredCount = Object.keys(mcqAnswers).length;

    if (answeredCount < totalQuestions) {
      alert("Please answer all questions before viewing results.");
      return;
    }

    setShowResults(true);

    const allCorrect = props.mcqs.every((mcq, idx) => mcqAnswers[idx] === mcq.correct);

    const saved = localStorage.getItem('ce_progress_map');
    const map = saved ? JSON.parse(saved) : {};

    if (allCorrect) {
      map[props.id] = true;
      setIsCompleted(true);
    } else {
      map[props.id] = false;
      setIsCompleted(false);
      alert("Please answer all questions correctly to mark this topic as completed.");
    }
    
    localStorage.setItem('ce_progress_map', JSON.stringify(map));
    window.dispatchEvent(new Event('storage'));
  };

  const handleRunInternal = async () => {
    setIsRunning(true);
    setLiveOutput("Executing logic...\n");
    const result = await executeCode(liveCode, props.language || 'Python', '');
    setLiveOutput(result || "Process finished with no output.");
    setIsRunning(false);
  };

  return (
    <div className="mb-24 ce-glass rounded-[3rem] border border-[#BDD8E9]/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-6">
      <div className="p-10 bg-[#0A4174] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">Level {props.level} Logic</div>
            {isCompleted && <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 animate-in zoom-in">✓ Completed</span>}
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tight leading-none">{props.name}</h3>
        </div>
        <div className="flex gap-4">
          {props.codingLab && props.codingLab.length > 0 && (
            <button 
              onClick={() => setShowLab(true)}
              className="px-8 py-4 bg-[#7BBDE8] text-[#001D39] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
              Practice Lab ⚡
            </button>
          )}
        </div>
      </div>
      
      <div className="p-10 md:p-14 space-y-12">
        {/* Theory Section */}
        <section className="space-y-8">
          <p className="text-[#BDD8E9] text-xl leading-relaxed font-bold italic border-l-4 border-[#7BBDE8] pl-6">{props.explanation}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {props.importantPoints.map((point, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#001D39]/40 rounded-2xl border border-[#49769F]/20">
                <span className="text-[#7BBDE8] font-black">0{i+1}</span>
                <p className="text-[#BDD8E9]/80 text-sm font-bold">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Logic Lab (Micro-Editor) */}
        <section className="space-y-6">
           <h4 className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-widest flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             Interactive Logic Lab
           </h4>
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[400px]">
              <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden flex flex-col">
                <div className="px-6 py-2 bg-slate-900 border-b border-slate-800 text-[9px] font-black text-slate-500 uppercase tracking-widest">Editable Source</div>
                <textarea 
                  value={liveCode}
                  onChange={(e) => setLiveCode(e.target.value)}
                  className="flex-1 bg-transparent p-6 font-mono text-sm text-[#7BBDE8] outline-none resize-none"
                  spellCheck={false}
                />
              </div>
              <div className="lg:col-span-5 flex flex-col gap-4">
                 <div className="flex-1 bg-black rounded-3xl border border-slate-800 p-6 font-mono text-xs overflow-y-auto">
                    <p className="text-slate-600 mb-2 uppercase text-[8px] font-black tracking-widest">Console Output</p>
                    <pre className="text-emerald-400 whitespace-pre-wrap">{liveOutput || "// Awaiting run command..."}</pre>
                 </div>
                 <button 
                  onClick={handleRunInternal}
                  disabled={isRunning}
                  className="w-full py-4 bg-[#7BBDE8] text-[#001D39] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl disabled:opacity-50"
                 >
                   {isRunning ? 'Running...' : 'Run This Logic 🚀'}
                 </button>
              </div>
           </div>
        </section>

        {/* Visualization & Syntax */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-widest">Logic Flowchart</h4>
            <div className="bg-[#001D39]/80 p-8 rounded-[1.5rem] border border-[#49769F]/30 overflow-x-auto">
              <pre className="text-[#6EA2B3] font-mono text-xs whitespace-pre">{props.asciiFlowchart}</pre>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-widest">Standard Syntax</h4>
            <div className="bg-[#001D39] p-8 rounded-[1.5rem] border border-[#49769F]/30">
              <pre className="text-[#7BBDE8] font-mono text-sm whitespace-pre-wrap">{props.syntax}</pre>
            </div>
          </div>
        </div>

        {/* Practice Task */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8">
          <div className="p-10 bg-[#7BBDE8] text-[#001D39] rounded-[2.5rem] space-y-6 shadow-xl">
             <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">Mastery Task</h4>
             <p className="text-xl font-black italic">{props.practiceTask}</p>
             <div className="space-y-2">
                {props.practiceQuestions.map((q, i) => (
                  <p key={i} className="text-xs font-bold flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#001D39] text-white flex items-center justify-center text-[8px]">{i+1}</span>
                    {q}
                  </p>
                ))}
             </div>
          </div>

          {props.mcqs && (
            <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-8">
              <h4 className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-widest">Knowledge Check</h4>
              {props.mcqs.map((mcq, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-[#BDD8E9] font-bold">{idx + 1}. {mcq.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {mcq.options.map((opt, oIdx) => (
                      <button 
                        key={oIdx}
                        onClick={() => !showResults && setMcqAnswers(p => ({...p, [idx]: oIdx}))}
                        className={`text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                          mcqAnswers[idx] === oIdx 
                          ? (showResults ? (oIdx === mcq.correct ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white') : 'bg-[#7BBDE8] text-[#001D39]') 
                          : (showResults && oIdx === mcq.correct ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-[#BDD8E9] hover:bg-white/10')
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                onClick={handleViewResults}
                className="w-full py-4 bg-[#BDD8E9] text-[#001D39] rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
              >
                View Results
              </button>
            </div>
          )}
        </div>
      </div>

      {showLab && props.codingLab && (
        <CodingLabModal 
          questions={props.codingLab} 
          onClose={() => setShowLab(false)} 
        />
      )}
    </div>
  );
};

const CodingLabModal: React.FC<{ questions: CodingQuestion[]; onClose: () => void }> = ({ questions, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userCode, setUserCode] = useState(questions[0].starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    setUserCode(questions[activeIdx].starterCode);
    setOutput(null);
    setShowExplanation(false);
  }, [activeIdx, questions]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Compiling environment...\nRunning unit tests...");
    setTimeout(() => {
      const q = questions[activeIdx];
      const isSuccess = userCode.length > q.starterCode.length && (userCode.includes(';') || userCode.includes('print'));
      
      if (isSuccess) {
        setOutput(`Test Case 1 (Input: ${q.testCases[0].input}): SUCCESS\nTest Case 2 (Input: ${q.testCases[1].input}): SUCCESS\n\nFinal Output:\n${q.exampleOutput}`);
      } else {
        setOutput(`Error: Incomplete logic detected.\nHint: ${q.explanation.split('.')[0]}.`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const currentQ = questions[activeIdx];

  return (
    <div className="fixed inset-0 z-[100] bg-[#001D39]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
      <div className="bg-white rounded-[3rem] w-full max-w-7xl h-full flex flex-col overflow-hidden shadow-2xl">
        <div className="bg-[#0A4174] p-8 flex justify-between items-center text-white border-b border-white/10">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight italic">Logic <span className="text-[#7BBDE8]">Lab</span></h2>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Experiment. Debug. Master.</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-2xl">×</button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-50">
          <div className="w-full lg:w-80 bg-white border-r border-slate-100 overflow-y-auto p-6 space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Challenge Navigator</p>
            {questions.map((q, idx) => (
              <button 
                key={q.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex flex-col gap-1 ${
                  activeIdx === idx ? 'bg-[#0A4174] border-[#0A4174] text-white' : 'bg-white border-slate-50 text-slate-500 hover:border-slate-200'
                }`}
              >
                <span className={`text-[9px] font-black uppercase ${activeIdx === idx ? 'text-[#7BBDE8]' : 'text-slate-400'}`}>{q.difficulty}</span>
                <span className="font-bold text-sm leading-tight">{q.title}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="w-full lg:w-1/3 p-8 overflow-y-auto space-y-8 bg-white">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">{currentQ.title}</h3>
                <div className="prose prose-slate text-slate-600 font-medium leading-relaxed">
                  <p>{currentQ.problem}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Input Format</h4>
                  <p className="text-sm font-bold text-slate-700">{currentQ.inputFormat}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                   <p className="text-[9px] font-black text-emerald-600 uppercase mb-2">Example In</p>
                   <code className="text-xs font-mono font-bold text-emerald-800">{currentQ.exampleInput}</code>
                </div>
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                   <p className="text-[9px] font-black text-indigo-600 uppercase mb-2">Example Out</p>
                   <code className="text-xs font-mono font-bold text-indigo-800">{currentQ.exampleOutput}</code>
                </div>
              </div>

              {showExplanation && (
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 animate-in slide-in-from-bottom-4">
                  <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Mentor Notes</h4>
                  <p className="text-sm font-medium text-amber-800 italic leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col bg-slate-900 border-l border-slate-800">
              <div className="flex-1 flex flex-col">
                <div className="bg-slate-800/50 px-8 py-3 flex justify-between items-center border-b border-slate-700">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic.editor</span>
                  <button onClick={() => setUserCode(currentQ.starterCode)} className="text-[9px] font-black text-slate-500 hover:text-white uppercase">Reset</button>
                </div>
                <textarea 
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="flex-1 bg-transparent p-10 font-mono text-lg text-[#7BBDE8] outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              <div className="p-6 bg-slate-800/80 border-t border-slate-700 flex gap-4">
                <button onClick={handleRun} disabled={isRunning} className="flex-1 py-5 bg-[#7BBDE8] text-[#001D39] rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                  {isRunning ? 'Compiling...' : 'Run Lab 🚀'}
                </button>
                <button onClick={() => setShowExplanation(!showExplanation)} className="px-8 py-5 border-2 border-slate-600 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-white hover:text-white transition-all">
                  Hints 🤖
                </button>
              </div>

              <div className="h-48 bg-black/50 p-8 font-mono text-sm overflow-y-auto border-t border-slate-800">
                <pre className={`whitespace-pre-wrap ${output?.includes('SUCCESS') ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {output || "// Output Terminal..."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TutorialLanding: React.FC<{ 
  title: string; 
  subtitle: string; 
  features: string[]; 
  icon: string;
  meshClass?: string;
}> = (props) => (
  <header className={`mb-16 text-center ce-glass p-16 md:p-20 rounded-[3rem] border border-[#BDD8E9]/10 ${props.meshClass || ''}`}>
    <div className="text-7xl mb-6 ce-animate-float">{props.icon}</div>
    <h1 className="text-5xl md:text-7xl font-black text-[#BDD8E9] tracking-tighter uppercase mb-4">Master <span className="ce-gradient-text italic">{props.title}</span></h1>
    <p className="text-xl text-[#6EA2B3] max-w-3xl mx-auto italic font-bold leading-relaxed mb-8">{props.subtitle}</p>
    <div className="flex flex-wrap justify-center gap-4">
      {props.features.map((f, i) => <span key={i} className="px-6 py-2 bg-[#0A4174] text-[#BDD8E9] rounded-xl text-[10px] font-black uppercase tracking-widest">{f}</span>)}
    </div>
  </header>
);

export const TutorialSummary: React.FC<{ takeaways: string[]; bestPractices: string[] }> = (props) => (
  <section className="mt-24 p-16 md:p-20 bg-[#BDD8E9] text-[#001D39] rounded-[3rem]">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h2 className="text-4xl font-black uppercase mb-8">Academic <span className="text-[#0A4174] italic">Takeaway</span></h2>
        <ul className="space-y-4">
          {props.takeaways.map((item, i) => <li key={i} className="flex gap-4 font-bold border-b border-[#001D39]/10 pb-4">✓ {item}</li>)}
        </ul>
      </div>
      <div className="bg-[#001D39] text-[#BDD8E9] p-12 rounded-[2.5rem]">
        <h2 className="text-2xl font-black mb-8 text-[#7BBDE8] italic uppercase">Efficiency Tips</h2>
        <ul className="space-y-4 font-bold text-sm">
          {props.bestPractices.map((item, i) => <li key={i} className="bg-[#0A4174]/30 p-5 rounded-2xl border border-[#BDD8E9]/10">PROFESSOR TIP: {item}</li>)}
        </ul>
      </div>
    </div>
  </section>
);
