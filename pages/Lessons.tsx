
import React from 'react';
import { Link } from 'react-router-dom';

const CURRICULUM_DATA = [
  {
    id: 'c',
    name: 'C Language Specialist',
    icon: '⚙️',
    description: 'Master the "Mother of all languages". Dive deep into memory management, pointers, and systems programming logic.',
    difficulty: 'Foundational',
    path: '/tutorial/c',
    accent: 'bg-[#7BBDE8]'
  },
  {
    id: 'python',
    name: 'Python Specialist',
    icon: '🐍',
    description: 'Go from basic logic to AI-ready architecture. Covering file handling, OOP, and advanced optimization techniques.',
    difficulty: 'Beginner to Advanced',
    path: '/tutorial/python',
    accent: 'bg-emerald-400'
  },
  {
    id: 'java',
    name: 'Java Specialist',
    icon: '☕',
    description: 'Master enterprise-level OOP. Learn the JVM architecture, Collections framework, and robust Exception Handling.',
    difficulty: 'Industry Standard',
    path: '/tutorial/java',
    accent: 'bg-amber-400'
  }
];

export const Lessons: React.FC = () => {
  return (
    <div className="space-y-40 pb-40">
      <header className="relative p-20 md:p-32 rounded-[4rem] ce-glass border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7BBDE8] opacity-5 blur-[120px]" />
        <div className="inline-block px-6 py-2 bg-[#0A4174] text-[#7BBDE8] rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10">Learning Pathways</div>
        <h1 className="text-6xl md:text-9xl ce-heading mb-8">Master Your <span className="ce-gradient-text italic">Curriculum.</span></h1>
        <p className="text-2xl text-[#BDD8E9]/80 font-bold italic max-w-3xl leading-relaxed">Structured 9-section modules designed for BTech students. Each path includes visual logic flows, interactive labs, and graduation assessments.</p>
      </header>

      <section className="space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-8 border-[#7BBDE8] pl-12">
          <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter uppercase text-white">Specialist <span className="text-[#7BBDE8] italic">Paths</span></h2>
            <p className="text-[#6EA2B3] text-xl font-bold">Select a language to begin your journey from zero to certified master.</p>
          </div>
          <Link to="/exam-hall" className="px-12 py-6 ce-glass text-white border-2 border-white/10 rounded-[var(--ce-radius-sm)] font-bold text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all shadow-2xl ce-btn">
            Go to Exam Hall 📝
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {CURRICULUM_DATA.map((path) => (
            <div key={path.id} className="ce-card p-14 flex flex-col justify-between border border-white/5 group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 ${path.accent} opacity-5 blur-[80px] group-hover:opacity-20 transition-opacity`} />
              
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <div className="text-7xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 drop-shadow-2xl">{path.icon}</div>
                  <span className="px-5 py-2 bg-white/5 border border-white/10 text-[#7BBDE8] rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]">{path.difficulty}</span>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-4xl font-bold text-white tracking-tight leading-tight uppercase">{path.name}</h3>
                  <p className="text-[#6EA2B3] text-lg font-medium italic leading-relaxed opacity-90">{path.description}</p>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 space-y-8">
                <div className="flex gap-3">
                   {[1,2,3,4,5,6,7,8,9].map(n => (
                     <div key={n} className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${path.accent} opacity-20`} style={{ width: '100%' }} />
                     </div>
                   ))}
                </div>
                <p className="text-[11px] font-bold text-[#49769F] uppercase tracking-[0.4em] text-center">9 Core Logic Modules</p>
                <Link to={path.path} className="block w-full py-6 ce-accent-btn rounded-[var(--ce-radius-sm)] font-bold text-sm uppercase text-center tracking-[0.2em] ce-btn">Start Specialty 🚀</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logic Sandbox CTA */}
      <section className="ce-glass p-20 rounded-[var(--ce-radius-lg)] border border-indigo-500/20 relative overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 text-center lg:text-left">
            <div className="text-9xl drop-shadow-2xl ce-animate-float">🧪</div>
            <div className="flex-1 space-y-6">
               <h2 className="text-5xl font-bold text-white uppercase tracking-tighter">Need a <span className="text-[#7BBDE8] italic">Logic Sandbox?</span></h2>
               <p className="text-xl text-[#6EA2B3] font-medium italic max-w-2xl leading-relaxed">Not ready for a curriculum? Experiment freely in our AI Sandbox and let Codey explain your logic step-by-step.</p>
            </div>
            <Link to="/practice" className="px-14 py-7 bg-indigo-600 text-white rounded-[var(--ce-radius-sm)] font-bold text-xl uppercase tracking-[0.2em] shadow-2xl hover:bg-indigo-500 transition-all ce-btn">Enter Sandbox</Link>
         </div>
      </section>
    </div>
  );
};
