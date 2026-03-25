
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Explorer');

  useEffect(() => {
    const sessionRaw = localStorage.getItem('ce_user_session');
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      setUserName(session.displayName || session.email.split('@')[0]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ce_user_session');
    navigate('/auth');
  };
  
  const navItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
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
      <aside className="hidden md:flex w-80 bg-[#001D39] border-r border-white/5 flex-col sticky top-0 h-screen overflow-hidden shadow-2xl">
        <div className="p-12 border-b border-white/5">
          <h1 className="text-4xl ce-heading italic">
            Code<br/>
            <span className="ce-gradient-text">Ease.</span>
          </h1>
          <p className="text-[10px] text-[#49769F] mt-4 font-black tracking-[0.4em] uppercase opacity-80">The Logic Playground</p>
        </div>

        <nav className="flex-1 p-8 space-y-3 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-5 p-5 rounded-[var(--ce-radius-md)] transition-all duration-300 ce-btn ${
                location.pathname === item.path ? 'bg-[#0A4174] text-white shadow-2xl border border-white/10' : 'text-[#6EA2B3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-semibold tracking-tight text-sm uppercase tracking-[0.1em]">{item.name}</span>
            </Link>
          ))}
          
          <div className="mt-10 pt-10 border-t border-white/5 space-y-3">
             <p className="text-[10px] font-bold text-[#49769F] uppercase tracking-[0.4em] ml-5 mb-6">Tutorials</p>
             {tutorialItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-5 p-5 rounded-[var(--ce-radius-md)] transition-all duration-300 ce-btn ${
                    location.pathname === item.path ? 'bg-[#4E8EA2] text-white shadow-xl' : 'text-[#6EA2B3]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold tracking-tight text-sm uppercase tracking-[0.1em]">{item.name}</span>
                </Link>
             ))}
          </div>
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-4 px-4">
            <div className="w-10 h-10 rounded-full bg-[#7BBDE8] flex items-center justify-center font-bold text-[#001D39] text-xs">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#BDD8E9] truncate uppercase tracking-widest">{userName}</p>
              <p className="text-[8px] font-medium text-[#6EA2B3] uppercase tracking-widest">Active Session</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-[var(--ce-radius-sm)] text-rose-400 hover:bg-rose-500/10 transition-all font-semibold tracking-tight ce-btn"
          >
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto ce-mesh-hero">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
