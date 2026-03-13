
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Topic {
  id: string;
  name: string;
  url: string;
}

interface LanguageProgress {
  id: string;
  name: string;
  icon: string;
  color: string;
  basePath: string;
  topics: Topic[];
}

const LANGUAGES: LanguageProgress[] = [
  {
    id: 'c',
    name: 'C Language',
    icon: '⚙️',
    color: '#7BBDE8',
    basePath: '/tutorial/c',
    topics: [
      { id: 'c-intro', name: 'Introduction', url: '?topic=c-intro' },
      { id: 'c-keywords', name: 'Keywords', url: '?topic=c-keywords' },
      { id: 'c-vars-datatypes', name: 'Variables & Data Types', url: '?topic=c-vars-datatypes' },
      { id: 'c-io-scanf', name: 'Input / Output', url: '?topic=c-io-scanf' },
      { id: 'c-conditions', name: 'Logic & Conditions', url: '?topic=c-conditions' },
      { id: 'c-loops', name: 'Looping Mastery', url: '?topic=c-loops' },
      { id: 'c-arrays', name: 'Arrays', url: '?topic=c-arrays' },
      { id: 'c-strings', name: 'Strings', url: '?topic=c-strings' },
      { id: 'c-functions', name: 'Functions', url: '?topic=c-functions' },
      { id: 'c-struct-union', name: 'Structures & Unions', url: '?topic=c-struct-union' },
      { id: 'c-files', name: 'File Handling', url: '?topic=c-files' },
      { id: 'c-pointers-basics', name: 'Pointer Power', url: '?topic=c-pointers-basics' },
      { id: 'c-dma-logic', name: 'Dynamic Memory', url: '?topic=c-dma-logic' },
      { id: 'c-project-calc', name: 'Mini Projects', url: '?topic=c-project-calc' },
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: '#34d399',
    basePath: '/tutorial/python',
    topics: [
      { id: 'py-intro', name: 'Introduction', url: '?topic=py-intro' },
      { id: 'py-install', name: 'Installation', url: '?topic=py-install' },
      { id: 'py-operators', name: 'Operators', url: '?topic=py-operators' },
      { id: 'py-conditions', name: 'Decisions', url: '?topic=py-conditions' },
      { id: 'py-loops-for', name: 'For Loops', url: '?topic=py-loops-for' },
      { id: 'py-loops-while', name: 'While Loops', url: '?topic=py-loops-while' },
      { id: 'py-funcs-def', name: 'Functions', url: '?topic=py-funcs-def' },
      { id: 'py-funcs-args', name: 'Return Values', url: '?topic=py-funcs-args' },
      { id: 'py-strings-slicing', name: 'Text Slicing', url: '?topic=py-strings-slicing' },
      { id: 'py-strings-methods', name: 'String Methods', url: '?topic=py-strings-methods' },
      { id: 'py-collections', name: 'Lists, Tuples & More', url: '?topic=py-collections' },
      { id: 'py-numpy', name: 'Arrays & NumPy', url: '?topic=py-numpy' },
      { id: 'py-class', name: 'Classes & Objects', url: '?topic=py-class' },
      { id: 'py-init', name: 'Constructors', url: '?topic=py-init' },
      { id: 'py-inheritance', name: 'Inheritance', url: '?topic=py-inheritance' },
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: '#fbbf24',
    basePath: '/tutorial/java',
    topics: [
      { id: 'java-intro', name: 'Java Basics', url: '?topic=java-intro' },
      { id: 'java-jvm-architecture', name: 'JVM Architecture', url: '?topic=java-jvm-architecture' },
      { id: 'java-keywords', name: 'Keywords', url: '?topic=java-keywords' },
      { id: 'java-scanner', name: 'Scanner & Input', url: '?topic=java-scanner' },
      { id: 'java-datatypes', name: 'Data Types', url: '?topic=java-datatypes' },
      { id: 'java-if-else', name: 'Decisions', url: '?topic=java-if-else' },
      { id: 'java-loops', name: 'Looping Logic', url: '?topic=java-loops' },
      { id: 'java-methods-basics', name: 'Method Creation', url: '?topic=java-methods-basics' },
      { id: 'java-methods-params', name: 'Parameters & Return', url: '?topic=java-methods-params' },
      { id: 'java-methods-overloading', name: 'Method Overloading', url: '?topic=java-methods-overloading' },
      { id: 'java-strings-methods', name: 'String Methods', url: '?topic=java-strings-methods' },
      { id: 'java-stringbuilder', name: 'StringBuilder', url: '?topic=java-stringbuilder' },
      { id: 'java-arrays-1d', name: '1D Arrays', url: '?topic=java-arrays-1d' },
      { id: 'java-arrays-2d', name: '2D Arrays', url: '?topic=java-arrays-2d' },
      { id: 'java-arrays-sorting', name: 'Sorting Logic', url: '?topic=java-arrays-sorting' },
      { id: 'java-oop-classes', name: 'OOP Fundamentals', url: '?topic=java-oop-classes' },
      { id: 'java-inheritance', name: 'Inheritance', url: '?topic=java-inheritance' },
      { id: 'java-try-catch', name: 'Try/Catch Errors', url: '?topic=java-try-catch' },
      { id: 'java-throw-throws', name: 'Throw/Throws Logic', url: '?topic=java-throw-throws' },
      { id: 'java-custom-exception', name: 'Custom Exceptions', url: '?topic=java-custom-exception' },
      { id: 'java-arraylist', name: 'Collections', url: '?topic=java-arraylist' },
      { id: 'java-file-io', name: 'File I/O', url: '?topic=java-file-io' },
    ]
  }
];

export const ProgressTracker: React.FC = () => {
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [activeLang, setActiveLang] = useState<string | null>(null);

  const loadProgress = () => {
    const saved = localStorage.getItem('ce_progress_map');
    if (saved) {
      setCompletedTopics(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadProgress();
    window.addEventListener('storage', loadProgress);
    return () => window.removeEventListener('storage', loadProgress);
  }, []);

  const calculateProgress = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    if (!lang) return 0;
    const completed = lang.topics.filter(t => completedTopics[t.id]).length;
    return Math.round((completed / lang.topics.length) * 100);
  };

  const handleTopicClick = (basePath: string, topicUrl: string) => {
    navigate(`${basePath}${topicUrl}`);
  };

  const getMotivationMessage = (percentage: number) => {
    if (percentage === 0) return "Ready to start your journey?";
    if (percentage < 30) return "Great first steps! Keep pushing.";
    if (percentage < 60) return "You're getting the hang of this!";
    if (percentage < 100) return "Almost a Specialist! Focus on the finish line.";
    if (percentage === 100) return "🏆 Legendary Mastery Achieved!";
    return "Impressive progress!";
  };

  return (
    <div className="space-y-16 pb-32 animate-in fade-in duration-700">
      <header className="relative p-12 md:p-20 rounded-[4rem] ce-glass border border-[#BDD8E9]/10 overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[18rem] font-black pointer-events-none select-none italic">XP</div>
        <div className="relative z-10">
          <div className="inline-block px-5 py-2 bg-[#0A4174] text-[#7BBDE8] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Learning Dashboard</div>
          <h1 className="text-5xl md:text-7xl font-black text-[#BDD8E9] tracking-tighter uppercase leading-none">Proficiency <span className="ce-gradient-text italic">Tracker.</span></h1>
          <p className="text-xl text-[#6EA2B3] mt-4 font-bold italic opacity-80 max-w-xl">Click any module to jump straight to the tutorial. Your progress is saved automatically.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LANGUAGES.map(lang => {
          const progress = calculateProgress(lang.id);
          return (
            <div 
              key={lang.id} 
              onClick={() => setActiveLang(lang.id)}
              className={`ce-glass p-10 rounded-[3.5rem] border transition-all cursor-pointer group ${
                activeLang === lang.id ? 'border-[#7BBDE8] shadow-2xl ring-4 ring-[#7BBDE8]/10' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{lang.icon}</div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest mb-1">Mastery</p>
                  <p className="text-4xl font-black text-[#BDD8E9]">{progress}%</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-[#BDD8E9] uppercase tracking-tight">{lang.name}</h3>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(123,189,232,0.4)]"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: lang.color
                    }}
                  />
                </div>
                <p className="text-[10px] font-black text-[#6EA2B3] uppercase tracking-widest italic">{getMotivationMessage(progress)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {activeLang && (
        <section className="ce-glass p-12 md:p-16 rounded-[4rem] border border-[#BDD8E9]/10 animate-in slide-in-from-bottom-10 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-4xl font-black text-[#BDD8E9] uppercase tracking-tighter">
                {LANGUAGES.find(l => l.id === activeLang)?.name} <span className="text-[#7BBDE8]">Syllabus</span>
              </h2>
              <p className="text-[#6EA2B3] font-bold italic mt-1">Jump to a module to master its internal logic.</p>
            </div>
            <div className="bg-white/5 px-8 py-4 rounded-3xl border border-white/10 flex items-center gap-4">
               <div className="text-3xl">🏅</div>
               <div>
                  <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest">Completed</p>
                  <p className="text-xl font-black text-[#BDD8E9]">
                    {LANGUAGES.find(l => l.id === activeLang)?.topics.filter(t => completedTopics[t.id]).length} / {LANGUAGES.find(l => l.id === activeLang)?.topics.length}
                  </p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANGUAGES.find(l => l.id === activeLang)?.topics.map((topic, i) => (
              <div 
                key={topic.id}
                onClick={() => handleTopicClick(LANGUAGES.find(l => l.id === activeLang)!.basePath, topic.url)}
                className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center gap-6 group/item hover:scale-[1.02] active:scale-[0.98] ${
                  completedTopics[topic.id] 
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg' 
                  : 'bg-white/5 border-white/5 hover:border-[#7BBDE8]/30'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 ${
                  completedTopics[topic.id] 
                  ? 'bg-emerald-500 text-white shadow-xl scale-110' 
                  : 'bg-[#001D39] text-[#6EA2B3] group-hover/item:text-[#BDD8E9]'
                }`}>
                  {completedTopics[topic.id] ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-lg font-black tracking-tight ${completedTopics[topic.id] ? 'text-emerald-400' : 'text-[#BDD8E9]'}`}>
                    {topic.name}
                  </p>
                  <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest mt-1">
                    {completedTopics[topic.id] ? 'Topic Mastered' : 'Master This Logic →'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
