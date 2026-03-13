
import React, { useState, useEffect, useRef } from 'react';
import { generateAIPracticeTest } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const TOPICS = {
  C: ['Basics', 'Data Types', 'Operators', 'Control Statements', 'Loops', 'Functions', 'Arrays', 'Pointers'],
  Python: ['Basics', 'Variables & Data Types', 'Operators', 'Conditional Statements', 'Loops', 'Functions', 'Lists & Tuples', 'Dictionaries'],
  Java: ['Basics', 'Data Types', 'Operators', 'Control Statements', 'OOP Concepts', 'Classes & Objects', 'Inheritance', 'Exception Handling'],
  SQL: ['Basics', 'Data Types', 'SELECT Queries', 'WHERE Clause', 'Joins', 'Constraints', 'Group By & Having'],
  HTML: ['Basics', 'Elements & Attributes', 'Headings & Paragraphs', 'Links & Images', 'Lists', 'Tables', 'Forms', 'Semantic Tags']
};

export const AITestGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'select' | 'loading' | 'test' | 'result'>('select');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [testData, setTestData] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (step === 'test') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setStep('result');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  const handleGenerate = async () => {
    if (!selectedLang || !selectedTopic) return;
    setStep('loading');
    try {
      const data = await generateAIPracticeTest(selectedLang, selectedTopic);
      if (!data || !data.questions) throw new Error("Invalid data");
      setTestData(data);
      setTimeLeft(900);
      setUserAnswers({});
      setStep('test');
    } catch (err) {
      alert("Something went wrong generating the test. Try again.");
      setStep('select');
    }
  };

  const calculateScore = () => {
    if (!testData) return 0;
    let score = 0;
    testData.questions.forEach((q: any) => {
      if (userAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const scrollToQuestion = (id: number) => {
    const el = document.getElementById(`q-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (step === 'select') {
    return (
      <div className="max-w-6xl mx-auto py-12 px-6">
        <header className="relative p-12 md:p-20 rounded-[4rem] border border-slate-100 bg-white shadow-sm mb-12 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6">
              AI Exam <span className="text-indigo-600">Hall</span>
            </h1>
            <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-bold italic max-w-2xl">
              Tailor-made assessments powered by Gemini. Prove your mastery with high-stakes randomized logic challenges.
            </p>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[20rem] font-black pointer-events-none select-none">
            TEST
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="glass-card rounded-[3.5rem] p-10 border border-white/50 shadow-2xl">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
                01. Choose Your Arsenal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {Object.keys(TOPICS).map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLang(lang); setSelectedTopic(''); }}
                    className={`group relative py-8 rounded-3xl font-black text-lg uppercase tracking-widest transition-all border-4 ${
                      selectedLang === lang 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xl scale-105' 
                      : 'bg-white text-slate-500 border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30'}`}
                  >
                    <span className="relative z-10">{lang}</span>
                    <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                  </button>
                ))}
              </div>
            </div>

            {selectedLang && (
              <div className="glass-card rounded-[3.5rem] p-10 border border-white/50 shadow-2xl animate-in fade-in slide-in-from-bottom-6">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-8">
                  <div className="w-12 h-1 bg-violet-500 rounded-full"></div>
                  02. Define The Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {TOPICS[selectedLang as keyof typeof TOPICS].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`p-6 rounded-[2rem] text-left font-bold transition-all border-2 ${
                        selectedTopic === topic 
                        ? 'bg-violet-600 border-violet-600 text-white shadow-xl scale-[1.02]' 
                        : 'bg-white/50 border-slate-100 text-slate-500 hover:bg-white hover:border-violet-200'}`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
             <div className="glass-card rounded-[3rem] p-10 border border-white/50 shadow-xl bg-gradient-to-br from-indigo-50 to-white">
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">Test Specs</h3>
                <ul className="space-y-6">
                  {[
                    { label: 'Total MCQs', val: '10 Questions', icon: '📝' },
                    { label: 'Time Limit', val: '15 Minutes', icon: '⏱️' },
                    { label: 'Difficulty', val: 'Adaptive', icon: '⚖️' },
                    { label: 'Passing', val: '70% Accuracy', icon: '🎯' }
                  ].map((spec, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="text-2xl">{spec.icon}</span>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{spec.label}</p>
                        <p className="font-bold text-slate-800">{spec.val}</p>
                      </div>
                    </li>
                  ))}
                </ul>
             </div>

             <button
                disabled={!selectedTopic}
                onClick={handleGenerate}
                className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-[0.2em] flex flex-col items-center justify-center gap-2"
              >
                <span>Initialize AI ⚡</span>
                <span className="text-[10px] opacity-60">Generate Custom Test</span>
              </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 px-6">
        <div className="relative">
          <div className="w-40 h-40 border-[16px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-2xl" />
          <div className="absolute inset-0 flex items-center justify-center text-6xl animate-pulse">🧠</div>
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Consulting Codey...</h2>
          <p className="text-slate-500 text-xl font-medium italic max-w-md mx-auto">
            "Scanning {selectedLang} documentation and building your {selectedTopic} challenge."
          </p>
          <div className="flex gap-3 justify-center pt-6">
            <span className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce delay-75"></span>
            <span className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce delay-150"></span>
            <span className="w-3 h-3 rounded-full bg-violet-600 animate-bounce delay-300"></span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const answeredCount = Object.keys(userAnswers).length;
    const progress = (answeredCount / 10) * 100;

    return (
      <div className="max-w-6xl mx-auto py-10 px-6 pb-48">
        {/* Sticky Exam Hub */}
        <div className="sticky top-4 z-40 glass-card p-6 rounded-[2.5rem] border border-white/50 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-lg">⚡</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">{testData.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Live Assessment</span>
                  <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{selectedLang} / {selectedTopic}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-12">
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Remaining</p>
                  <p className={`font-mono font-black text-4xl ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-slate-900'}`}>{formatTime(timeLeft)}</p>
               </div>
               <div className="h-14 w-1 bg-slate-100 rounded-full" />
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completion</p>
                  <p className="font-black text-4xl text-indigo-600">{answeredCount}<span className="text-slate-300">/10</span></p>
               </div>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500 shadow-sm" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Question Feed */}
          <div className="lg:col-span-9 space-y-12">
            {testData.questions.map((q: any, idx: number) => (
              <div id={`q-${q.id}`} key={q.id} className="glass-card rounded-[3.5rem] p-12 border border-white/50 shadow-xl space-y-8 hover:shadow-2xl transition-all scroll-mt-32 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-slate-100 group-hover:bg-indigo-500 transition-colors" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">#{idx + 1}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">{q.difficulty}</span>
                  </div>
                  {userAnswers[q.id] && (
                    <span className="text-emerald-500 font-black text-sm uppercase tracking-widest animate-in fade-in zoom-in">Answered ✓</span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-800 leading-tight tracking-tight max-w-3xl">{q.question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt: any) => (
                    <button
                      key={opt.label}
                      onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: opt.label }))}
                      className={`p-6 rounded-[2.5rem] border-4 text-left transition-all flex items-center gap-6 group/opt ${
                        userAnswers[q.id] === opt.label 
                        ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-[1.02]' 
                        : 'border-slate-50 bg-white hover:border-indigo-100 hover:bg-slate-50'}`}
                    >
                      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${
                        userAnswers[q.id] === opt.label ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 group-hover/opt:bg-indigo-100 group-hover/opt:text-indigo-600'}`}>{opt.label}</span>
                      <span className="font-bold text-slate-700 leading-tight text-lg">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Question Navigator Sidebar */}
          <div className="lg:col-span-3 sticky top-60 h-fit">
            <div className="glass-card rounded-[3rem] p-8 border border-white/50 shadow-xl space-y-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Navigator</h4>
              <div className="grid grid-cols-5 gap-3">
                {testData.questions.map((q: any, i: number) => (
                  <button
                    key={q.id}
                    onClick={() => scrollToQuestion(q.id)}
                    className={`w-full aspect-square rounded-xl flex items-center justify-center font-black text-xs transition-all ${
                      userAnswers[q.id] 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-400 hover:bg-indigo-100 hover:text-indigo-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <button
                  onClick={() => setStep('result')}
                  className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-indigo-600 transition-all uppercase tracking-widest shadow-xl"
                >
                  Submit 🏁
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Final Submission Required</p>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6">
           <button
            onClick={() => {
              if (window.confirm("Are you sure you want to finish the assessment?")) {
                setStep('result');
              }
            }}
            className="w-full py-8 bg-slate-900 text-white rounded-[3rem] font-black text-2xl shadow-2xl hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4"
           >
             Finish & Evaluate Results 🏁
           </button>
        </div>
      </div>
    );
  }

  const score = calculateScore();
  const pass = score >= 7;

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="glass-card rounded-[4.5rem] p-16 border border-white/50 shadow-2xl overflow-hidden relative text-center">
        <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-r ${pass ? 'from-emerald-400 to-teal-500' : 'from-rose-400 to-orange-500'}`} />
        
        <div className="mb-12">
          <div className="text-9xl mb-8 drop-shadow-2xl animate-bounce duration-1000">
            {pass ? '🎓' : '🔥'}
          </div>
          <h1 className="text-6xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
            {pass ? 'Certified Master' : 'Incomplete Logic'}
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-sm">{testData.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center max-w-3xl mx-auto">
           <div className="bg-slate-50 p-12 rounded-[3.5rem] border-4 border-white shadow-inner">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Mastery Rating</p>
              <div className="relative inline-block">
                <p className={`text-9xl font-black leading-none ${pass ? 'text-indigo-600' : 'text-rose-500'}`}>
                  {score}<span className="text-4xl text-slate-300">/10</span>
                </p>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i < score ? (pass ? 'bg-indigo-500' : 'bg-rose-500') : 'bg-slate-200'}`} />
                ))}
              </div>
           </div>
           
           <div className="space-y-6 text-left">
              <div className={`p-8 rounded-[2.5rem] border-l-8 ${pass ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Report</p>
                <p className={`text-4xl font-black tracking-tighter ${pass ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {pass ? 'PASSED' : 'FAILED'}
                </p>
                <p className="text-slate-500 font-bold mt-2 text-sm italic">
                  {pass ? 'You have successfully proven your proficiency in this logic domain.' : 'Minimum 7 correct answers required to pass. Keep practicing!'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-6 rounded-3xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Taken</p>
                   <p className="text-xl font-black text-slate-900">{formatTime(900 - timeLeft)}</p>
                 </div>
                 <div className="bg-white p-6 rounded-3xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accuracy</p>
                   <p className="text-xl font-black text-slate-900">{score * 10}%</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Detailed Question Review */}
        <div className="text-left space-y-8 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Performance Review</h3>
          </div>
          
          <div className="space-y-6">
            {testData.questions.map((q: any) => {
              const isCorrect = userAnswers[q.id] === q.correct;
              return (
                <div key={q.id} className={`p-8 rounded-[3rem] border-2 flex flex-col md:flex-row gap-6 items-start md:items-center ${isCorrect ? 'bg-emerald-50/30 border-emerald-100' : 'bg-rose-50/30 border-rose-100'}`}>
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-sm ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                     {isCorrect ? '✓' : '✗'}
                   </div>
                   <div className="flex-1 space-y-2">
                     <p className="text-slate-800 font-bold leading-tight">{q.question}</p>
                     <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest">
                       <span className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>Your Answer: {userAnswers[q.id] || 'N/A'}</span>
                       {!isCorrect && <span className="text-indigo-600">Correct: {q.correct}</span>}
                     </div>
                   </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
           <button onClick={() => setStep('select')} className="flex-1 py-7 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-600 transition-all shadow-2xl uppercase tracking-widest">New Assessment</button>
           <button onClick={() => navigate('/lessons')} className="flex-1 py-7 bg-white border-4 border-slate-100 text-slate-700 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all uppercase tracking-widest">Return to Tutorials</button>
        </div>
      </div>
    </div>
  );
};
