
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LESSONS } from '../constants';
// Fixed: Removed getHint import as it is not exported by geminiService and not used in this component
import { explainCode, getLogicSteps } from '../services/geminiService';

export const LessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = LESSONS.find(l => l.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [logicSteps, setLogicSteps] = useState<{ step: string; explanation: string }[] | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (lesson) {
      setCode(lesson.steps[currentStep].codeSnippet);
      setExplanation(null);
      setLogicSteps(null);
      setHint(null);
      setSuccess(false);
      setOutput(null);
    }
  }, [currentStep, lesson]);

  if (!lesson) return <div className="p-20 text-center font-bold text-[#6EA2B3]">Lesson not found!</div>;

  const activeStep = lesson.steps[currentStep];

  const handleRun = () => {
    setOutput('Checking your solution...');
    setTimeout(() => {
      const regex = new RegExp(activeStep.solutionRegex, 'i');
      if (regex.test(code)) {
        setOutput('✅ Amazing! You got it right.');
        setSuccess(true);
      } else {
        setOutput('❌ Not quite there yet. Let\'s check the hint or ask Codey!');
        setSuccess(false);
      }
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 min-h-[calc(100vh-10rem)]">
      <div className="lg:col-span-5 space-y-8 overflow-y-auto">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/lessons')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-[#7BBDE8]/30 text-white hover:bg-[#0A4174]/50 transition-colors">←</button>
          <div>
            <h1 className="text-3xl font-black text-[#BDD8E9]">{activeStep.title}</h1>
            <p className="text-[10px] font-black text-[#7BBDE8] tracking-widest uppercase mt-1">{lesson.language} • Step {currentStep + 1} of {lesson.steps.length}</p>
          </div>
        </div>

        <div className="text-[#BDD8E9]/80 leading-relaxed text-lg space-y-4">
          {activeStep.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="ce-glass border border-[#7BBDE8]/20 rounded-3xl p-8 relative">
          <h3 className="font-black text-[#7BBDE8] flex items-center gap-2 mb-3 tracking-tight">🎯 YOUR TASK</h3>
          <p className="text-[#BDD8E9] text-lg font-bold">{activeStep.task}</p>
        </div>

        <div className="space-y-4">
          {explanation && <div className="ce-glass p-8 rounded-3xl border border-[#7BBDE8]/10">
            <h4 className="font-black text-[#7BBDE8] uppercase text-xs mb-4">🤖 Codey's Explanation</h4>
            <p className="text-[#BDD8E9] text-sm italic">{explanation}</p>
          </div>}
          {logicSteps && <div className="space-y-4">
            {logicSteps.map((s, idx) => (
              <div key={idx} className="bg-[#001D39]/50 p-5 rounded-2xl border border-[#49769F]/20">
                <p className="font-bold text-[#BDD8E9]">{s.step}</p>
                <p className="text-xs text-[#6EA2B3] mt-1">{s.explanation}</p>
              </div>
            ))}
          </div>}
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex-1 bg-slate-900 rounded-[2.5rem] overflow-hidden border-8 border-slate-800 flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent text-[#7BBDE8] p-10 mono text-xl outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
          <div className="p-6 bg-slate-800/50 border-t border-slate-700">
            <div className={`p-4 rounded-xl mono text-sm ${output?.includes('✅') ? 'text-emerald-400' : 'text-slate-400'}`}>
              {output || "// Output will appear here..."}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleRun} className="col-span-2 py-5 bg-[#7BBDE8] text-[#001D39] rounded-[2rem] font-black text-lg shadow-xl uppercase">🚀 RUN CODE</button>
          <button onClick={async () => { setIsProcessing(true); setExplanation(await explainCode(code, lesson.language)); setLogicSteps(null); setIsProcessing(false); }} disabled={isProcessing} className="py-4 ce-glass text-white rounded-2xl font-bold uppercase text-xs">🤔 Ask Codey</button>
          <button onClick={async () => { setIsProcessing(true); setLogicSteps(await getLogicSteps(code, lesson.language)); setExplanation(null); setIsProcessing(false); }} disabled={isProcessing} className="py-4 ce-glass text-white rounded-2xl font-bold uppercase text-xs">🗺️ Visualize Logic</button>
        </div>
        {success && (
          <button
            onClick={() => { if (currentStep < lesson.steps.length - 1) { setCurrentStep(currentStep + 1); } else { navigate('/lessons'); } }}
            className="w-full py-6 bg-emerald-500 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:scale-[1.02] transition-all"
          >
            {currentStep < lesson.steps.length - 1 ? 'NEXT STEP 🏁' : 'FINISH LESSON 🎓'}
          </button>
        )}
      </div>
    </div>
  );
};
