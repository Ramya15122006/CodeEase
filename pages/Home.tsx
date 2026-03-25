import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="space-y-40 pb-40">
      <section className="relative p-16 md:p-32 rounded-[var(--ce-radius-lg)] overflow-hidden text-center ce-glass border border-white/10">
        <div className="relative z-10 space-y-12">
          <div className="inline-block px-6 py-2 ce-glass border border-[#7BBDE8]/30 rounded-full text-[#BDD8E9] text-[11px] font-bold uppercase tracking-[0.4em] ce-animate-float">The Student's First Coding Ally</div>
          <h1 className="text-7xl md:text-9xl ce-heading tracking-tighter">Coding made<br /><span className="ce-gradient-text italic">accessible.</span></h1>
          <p className="text-xl md:text-3xl text-[#BDD8E9]/80 max-w-4xl mx-auto leading-relaxed font-medium">Ditch the complexity. Master core logic through AI-driven visual maps and a calm, structured learning environment.</p>
          <div className="flex flex-wrap justify-center gap-8 pt-10">
            <Link to="/lessons" className="px-12 py-6 ce-accent-btn rounded-[var(--ce-radius-sm)] font-bold text-xl uppercase tracking-[0.2em] ce-btn">Start Mission 🚀</Link>
            <Link to="/practice" className="px-12 py-6 ce-glass text-white border-2 border-white/20 rounded-[var(--ce-radius-sm)] font-bold text-xl hover:bg-white/10 transition-all uppercase tracking-[0.2em] ce-btn">Sandbox Mode</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { title: "Logic Visualizer", desc: "Watch code execute through step-by-step logic maps. No more guessing how loops work.", icon: "🗺️" },
          { title: "AI Code Mentor", desc: "Codey explains syntax using relatable analogies, reducing the fear of empty screens.", icon: "🤖" },
          { title: "Achievement Hall", desc: "Earn badges for logic mastery and consistency. Build a profile that showcases your progress.", icon: "🏆" }
        ].map((item, idx) => (
          <div key={idx} className="ce-card p-14 border border-white/5 group">
            <div className="w-20 h-20 bg-[#0A4174] rounded-[var(--ce-radius-md)] flex items-center justify-center text-4xl mb-10 group-hover:rotate-12 transition-transform shadow-2xl border border-white/10">{item.icon}</div>
            <h3 className="text-4xl font-bold text-white mb-6 tracking-tight uppercase">{item.title}</h3>
            <p className="text-[#6EA2B3] text-lg leading-relaxed font-medium opacity-90">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};