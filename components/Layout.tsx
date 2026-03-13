
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Lessons', path: '/lessons', icon: '📚' },
    { name: 'My Progress', path: '/progress', icon: '📊' },
    { name: 'Compiler', path: '/compiler', icon: '⚡' },
    { name: 'Exam Hall', path: '/exam-hall', icon: '📝' },
    { name: 'Sandbox', path: '/practice', icon: '🧪' },
    { name: 'Community', path: '/forum', icon: '🤝' },
    { name: 'Profile', path: '/profile', icon: '🏆' },
  ];

  const tutorialItems = [
    { name: 'C', path: '/tutorial/c', icon: '📖' },
    { name: 'Python', path: '/tutorial/python', icon: '🐍' },
    { name: 'Java', path: '/tutorial/java', icon: '☕' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#001D39]">
      <aside className="hidden md:flex w-80 bg-[#001D39] border-r border-[#49769F]/20 flex-col sticky top-0 h-screen overflow-hidden">
        <div className="p-10 border-b border-[#49769F]/10">
          <h1 className="text-3xl font-black italic tracking-tighter leading-none text-[#BDD8E9]">
            Code<br/>
            <span className="text-[#7BBDE8]">Ease.</span>
          </h1>
          <p className="text-[10px] text-[#49769F] mt-3 font-extrabold tracking-[0.3em] uppercase">The Logic Playground</p>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-4 rounded-[1.2rem] transition-all ${
                location.pathname === item.path ? 'bg-[#0A4174] text-[#BDD8E9] shadow-lg border border-[#49769F]/30' : 'text-[#6EA2B3] hover:bg-[#0A4174]/30'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-bold tracking-tight">{item.name}</span>
            </Link>
          ))}
          
          <div className="mt-8 pt-8 border-t border-[#49769F]/10 space-y-2">
             <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest ml-4 mb-4">Tutorials</p>
             {tutorialItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 p-4 rounded-[1.2rem] transition-all ${
                    location.pathname === item.path ? 'bg-[#4E8EA2] text-white shadow-md' : 'text-[#6EA2B3]/70 hover:text-[#BDD8E9] hover:bg-[#0A4174]/20'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-bold tracking-tight">{item.name}</span>
                </Link>
             ))}
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto ce-mesh-hero">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
