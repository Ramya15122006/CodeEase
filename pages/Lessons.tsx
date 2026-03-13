
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
    <div className="space-y-24 pb-32">
      <header className="relative p-16 md:p-20 rounded-[3rem] ce-glass border border-[#BDD8E9]/10">
        <div className="inline-block px-4 py-1 bg-[#0A4174] text-[#7BBDE8] rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Learning Pathways</div>
        <h1 className="text-5xl md:text-7xl font-black text-[#BDD8E9] tracking-tighter uppercase mb-4">Master Your <span className="ce-gradient-text italic">Curriculum.</span></h1>
        <p className="text-xl text-[#6EA2B3] font-bold italic opacity-80 max-w-2xl">Structured 9-section modules designed for BTech students. Each path includes visual logic flows, interactive labs, and graduation assessments.</p>
      </header>

      <section className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-[#7BBDE8] pl-8">
          <div>
            <h2 className="text-5xl font-black tracking-tighter uppercase text-[#BDD8E9]">Specialist <span className="text-[#7BBDE8] italic">Paths</span></h2>
            <p className="text-[#6EA2B3] font-bold mt-2">Select a language to begin your journey from zero to certified master.</p>
          </div>
          <Link to="/exam-hall" className="px-8 py-4 ce-glass text-[#BDD8E9] border border-[#BDD8E9]/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#BDD8E9]/10 transition-all">
            Go to Exam Hall 📝
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURRICULUM_DATA.map((path) => (
            <div key={path.id} className="ce-glass p-12 rounded-[3.5rem] flex flex-col justify-between border border-[#BDD8E9]/5 hover:border-[#7BBDE8]/30 transition-all group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 ${path.accent} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{path.icon}</div>
                  <span className="px-4 py-1 bg-white/5 border border-white/5 text-[#6EA2B3] rounded-lg text-[9px] font-black uppercase tracking-widest">{path.difficulty}</span>
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-[#BDD8E9] tracking-tight leading-tight">{path.name}</h3>
                  <p className="text-[#6EA2B3] text-sm mt-4 font-bold italic leading-relaxed opacity-80">{path.description}</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                <div className="flex gap-2">
                   {[1,2,3,4,5,6,7,8,9].map(n => (
                     <div key={n} className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${path.accent} opacity-20`} style={{ width: '100%' }} />
                     </div>
                   ))}
                </div>
                <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest text-center">9 Core Logic Modules</p>
                <Link to={path.path} className="block w-full py-5 bg-[#BDD8E9] text-[#001D39] rounded-[1.5rem] font-black text-sm uppercase text-center shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">Start Specialty 🚀</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logic Sandbox CTA */}
      <section className="ce-glass p-16 rounded-[4rem] border border-indigo-500/20 relative overflow-hidden">
         <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <div className="text-8xl">🧪</div>
            <div className="flex-1 space-y-4">
               <h2 className="text-4xl font-black text-[#BDD8E9] uppercase tracking-tighter">Need a <span className="text-indigo-400">Logic Sandbox?</span></h2>
               <p className="text-lg text-[#6EA2B3] font-bold italic max-w-xl">Not ready for a curriculum? Experiment freely in our AI Sandbox and let Codey explain your logic step-by-step.</p>
            </div>
            <Link to="/practice" className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-2xl hover:bg-indigo-500 transition-colors">Enter Sandbox</Link>
         </div>
      </section>
    </div>
  );
};
