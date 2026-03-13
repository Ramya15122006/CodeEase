import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="space-y-32 pb-32">
      <section className="relative p-12 md:p-24 rounded-[3rem] overflow-hidden text-center ce-glass border border-[#BDD8E9]/10">
        <div className="relative z-10 space-y-10">
          <div className="inline-block px-5 py-2 ce-glass border border-[#7BBDE8]/30 rounded-full text-[#BDD8E9] text-[10px] font-black uppercase tracking-[0.3em] ce-animate-float">The Student's First Coding Ally</div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#BDD8E9]">Coding made<br /><span className="ce-gradient-text italic">accessible.</span></h1>
          <p className="text-lg md:text-2xl text-[#6EA2B3] max-w-3xl mx-auto leading-relaxed font-semibold opacity-90">Ditch the complexity. Master core logic through AI-driven visual maps and a calm, structured learning environment.</p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Link to="/lessons" className="px-10 py-5 bg-[#7BBDE8] text-[#001D39] rounded-[1.5rem] font-black text-lg shadow-xl hover:scale-105 transition-all uppercase tracking-widest">Start Mission 🚀</Link>
            <Link to="/practice" className="px-10 py-5 ce-glass text-[#BDD8E9] border-2 border-[#BDD8E9]/20 rounded-[1.5rem] font-black text-lg hover:bg-[#BDD8E9]/10 transition-all uppercase tracking-widest">Sandbox Mode</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Logic Visualizer", desc: "Watch code execute through step-by-step logic maps. No more guessing how loops work.", icon: "🗺️" },
          { title: "AI Code Mentor", desc: "Codey explains syntax using relatable analogies, reducing the fear of empty screens.", icon: "🤖" },
          { title: "Achievement Hall", desc: "Earn badges for logic mastery and consistency. Build a profile that showcases your progress.", icon: "🏆" }
        ].map((item, idx) => (
          <div key={idx} className="ce-glass p-12 rounded-[2.5rem] border border-[#BDD8E9]/10 hover:border-[#7BBDE8]/40 transition-all group">
            <div className="w-16 h-16 bg-[#0A4174] rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:rotate-12 transition-transform shadow-lg">{item.icon}</div>
            <h3 className="text-3xl font-black text-[#BDD8E9] mb-4 tracking-tight uppercase">{item.title}</h3>
            <p className="text-[#6EA2B3] leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};