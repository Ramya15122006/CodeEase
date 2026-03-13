
import React, { useState, useEffect } from 'react';
import { BADGES } from '../constants';
import { Certification } from '../types';

export const Profile: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);
  const [viewingCert, setViewingCert] = useState<Certification | null>(null);

  useEffect(() => {
    const certsRaw = localStorage.getItem('ce_certificates');
    if (certsRaw) setCerts(JSON.parse(certsRaw));
    
    const badgesRaw = localStorage.getItem('ce_unlocked_badges');
    if (badgesRaw) setUnlockedBadgeIds(JSON.parse(badgesRaw));
  }, []);

  const userXP = 850 + (certs.length * 500); // Bonus XP for certificates
  const currentLevel = Math.floor(userXP / 500) + 1;
  const nextLevelXP = currentLevel * 500;
  const progressPercent = ((userXP % 500) / 500) * 100;

  return (
    <div className="space-y-24 pb-32">
      {/* Dynamic Profile Header */}
      <section className="relative p-12 md:p-24 rounded-[5rem] ce-glass shadow-2xl overflow-hidden border-b-[16px] border-indigo-600">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none text-[20rem] font-black italic -ml-20 -mb-20">EXP</div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-20">
          <div className="relative">
            <div className="w-64 h-64 rounded-[4rem] border-[12px] border-[#0A4174] shadow-2xl overflow-hidden relative group">
               <img src="https://picsum.photos/seed/codeease-vibrant/600/600" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="User" />
               <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-10 py-4 rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-500/40 whitespace-nowrap border-4 border-indigo-500 animate-pulse">
              LEVEL {currentLevel} • {certs.length > 0 ? 'SPECIALIST' : 'EXPLORER'}
            </div>
          </div>
          
          <div className="flex-1 space-y-12 w-full">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-[#BDD8E9] tracking-tighter italic">Student<span className="text-indigo-600">_Alpha</span></h1>
              <p className="text-[#6EA2B3] font-black uppercase tracking-[0.4em] text-[10px] mt-4 opacity-70">Computer Science Foundations • Semester 1</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total XP', val: userXP, icon: '✨', color: 'indigo' },
                { label: 'Rank', val: certs.length > 1 ? 'Gold' : (certs.length > 0 ? 'Silver' : 'Bronze'), icon: '🏆', color: 'emerald' },
                { label: 'Streak', val: '7 Days', icon: '🔥', color: 'rose' },
                { label: 'Certs', val: certs.length, icon: '📜', color: 'amber' }
              ].map((stat, i) => (
                <div key={i} className={`p-8 ce-glass rounded-[2.5rem] border border-white/5 shadow-inner group hover:scale-105 transition-transform`}>
                  <p className={`text-[10px] font-black text-[#7BBDE8] uppercase tracking-widest mb-3 opacity-60`}>{stat.label}</p>
                  <p className="text-3xl font-black text-[#BDD8E9] flex items-center gap-4">
                    <span className="text-2xl">{stat.icon}</span> {stat.val}
                  </p>
                </div>
              ))}
            </div>

            {/* Neon Progress Bar */}
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                 <p className="text-lg font-black text-[#7BBDE8] uppercase tracking-widest italic">XP Mastery Flow</p>
                 <p className="text-sm font-black text-[#6EA2B3] tracking-tighter">{userXP % 500} / 500 XP to next Milestone</p>
               </div>
               <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden border-4 border-[#001D39] shadow-inner p-1">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(99,102,241,0.5)]" 
                    style={{ width: `${progressPercent}%` }} 
                  />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Vault */}
      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <div className="h-16 w-3 bg-[#7BBDE8] rounded-full shadow-[0_0_20px_rgba(123,189,232,0.5)]" />
          <h2 className="text-6xl font-black text-[#BDD8E9] tracking-tighter uppercase italic">Certification <span className="text-indigo-400">Vault</span></h2>
        </div>

        {certs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map(cert => (
              <div 
                key={cert.id} 
                className="ce-glass p-10 rounded-[3.5rem] border border-[#BDD8E9]/10 relative group hover:border-[#7BBDE8]/40 transition-all overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 opacity-5 text-9xl">📜</div>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="text-5xl">🎓</div>
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      cert.performanceLevel === 'Advanced' ? 'bg-indigo-500 text-white' : 'bg-[#0A4174] text-[#7BBDE8]'
                    }`}>
                      {cert.performanceLevel}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#BDD8E9] uppercase tracking-tight leading-none">{cert.language}</h3>
                    <p className="text-[#6EA2B3] text-xs font-bold mt-2 italic">Issued on {cert.issueDate}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <button 
                      onClick={() => setViewingCert(cert)}
                      className="w-full py-4 bg-[#7BBDE8] text-[#001D39] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all"
                    >
                      View Certificate →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="ce-glass p-16 rounded-[4rem] border border-white/5 text-center space-y-6">
            <div className="text-7xl opacity-20 grayscale">📜</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#BDD8E9] uppercase">No Certifications Yet</h3>
              <p className="text-[#6EA2B3] font-bold italic opacity-60">Complete all topic exams for any language in the Exam Hall to earn your certificate.</p>
            </div>
            <button 
              onClick={() => window.location.hash = '/exam-hall'}
              className="px-10 py-4 bg-[#0A4174] text-[#BDD8E9] rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#7BBDE8] hover:text-[#001D39] transition-all"
            >
              Go to Exam Hall
            </button>
          </div>
        )}
      </section>

      {/* Certificate Modal */}
      {viewingCert && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#001D39]/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[1rem] w-full max-w-4xl p-1 shadow-2xl relative overflow-hidden">
              <div className="bg-[#001D39] p-12 md:p-20 text-center space-y-12 border-[20px] border-[#BDD8E9]/10 relative">
                 <div className="absolute top-10 left-10 text-4xl opacity-20 font-black italic">CODEEASE</div>
                 <div className="absolute bottom-10 right-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-white/5 border-2 border-[#BDD8E9]/20 flex items-center justify-center">
                       <div className="grid grid-cols-4 gap-1 p-2">
                          {[...Array(16)].map((_, i) => <div key={i} className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-[#7BBDE8]' : 'bg-transparent'}`} />)}
                       </div>
                    </div>
                    <p className="text-[8px] font-black text-[#49769F] mt-2 uppercase tracking-widest">VERIFY ID: {viewingCert.certificateId}</p>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[#7BBDE8] font-black uppercase tracking-[0.5em] text-xs">Certificate of Completion</p>
                    <h2 className="text-5xl md:text-7xl font-black text-[#BDD8E9] tracking-tighter uppercase leading-none">
                       {viewingCert.language} <span className="italic text-[#7BBDE8]">Master</span>
                    </h2>
                 </div>

                 <div className="py-12 border-y border-white/5 space-y-4">
                    <p className="text-[#6EA2B3] font-bold italic text-xl">This is to certify that</p>
                    <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tight">{viewingCert.studentName}</h3>
                    <p className="text-[#6EA2B3] font-medium max-w-2xl mx-auto leading-relaxed">
                       has successfully navigated the logical depths of {viewingCert.language}, completing all {viewingCert.totalTopics} modules with an average mastery score of {viewingCert.averageScore}%.
                    </p>
                 </div>

                 <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-12">
                    <div className="text-left space-y-2">
                       <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest">Performance Level</p>
                       <p className="text-3xl font-black text-[#BDD8E9] uppercase">{viewingCert.performanceLevel}</p>
                    </div>
                    <div className="text-center space-y-4">
                       <div className="w-64 h-px bg-white/20 mb-2"></div>
                       <p className="text-2xl font-black text-[#BDD8E9] italic tracking-tighter">Authorized Logic Agent</p>
                       <p className="text-[10px] font-black text-[#49769F] uppercase tracking-[0.3em]">CODEEASE ACADEMY</p>
                    </div>
                    <div className="text-right space-y-2">
                       <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest">Issue Date</p>
                       <p className="text-2xl font-black text-[#BDD8E9]">{viewingCert.issueDate}</p>
                    </div>
                 </div>
              </div>
              <div className="absolute top-6 right-6">
                <button onClick={() => setViewingCert(null)} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-all">×</button>
              </div>
              <div className="p-8 flex gap-4 bg-slate-900 border-t border-white/5">
                <button onClick={() => alert("Preparing PDF logic...")} className="flex-1 py-4 bg-[#7BBDE8] text-[#001D39] rounded-xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all shadow-xl">Download PDF</button>
                <button onClick={() => alert("Connecting to social streams...")} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all shadow-xl">Share Mastery</button>
              </div>
           </div>
        </div>
      )}

      {/* Colorful Badge Vault */}
      <section className="space-y-16">
        <div className="flex items-center gap-6">
          <div className="h-16 w-3 bg-[#7BBDE8] rounded-full shadow-[0_0_20px_rgba(123,189,232,0.5)]" />
          <h2 className="text-6xl font-black text-[#BDD8E9] tracking-tighter uppercase italic">Badge Vault</h2>
        </div>

        {['Learning', 'Mastery', 'Participation', 'Achievement'].map(cat => (
          <div key={cat} className="space-y-8">
            <h3 className="text-[10px] font-black text-[#49769F] uppercase tracking-[0.4em] ml-2">{cat} Hall of Fame</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
              {BADGES.filter(b => b.category === cat).map(badge => {
                const isUnlocked = unlockedBadgeIds.includes(badge.id) || badge.unlocked;
                return (
                  <div 
                    key={badge.id}
                    className={`group relative p-10 rounded-[4rem] border-4 text-center transition-all duration-500 ${
                      isUnlocked ? 'ce-glass border-[#BDD8E9]/10 shadow-2xl hover:-translate-y-4 hover:border-[#7BBDE8]/30' : 'bg-white/5 border-white/5 opacity-30 grayscale blur-[2px] cursor-not-allowed'
                    }`}
                  >
                    <div className="text-7xl mb-6 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">{badge.icon}</div>
                    <h4 className={`text-sm font-black leading-tight uppercase tracking-widest ${isUnlocked ? 'text-[#BDD8E9]' : 'text-[#6EA2B3]'}`}>{badge.name}</h4>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#001D39]/95 rounded-[4rem] flex flex-col items-center justify-center p-8 transition-opacity duration-300">
                      <p className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-[0.2em] mb-4">Requirement</p>
                      <p className="text-xs font-bold text-white uppercase text-center leading-relaxed italic">{badge.requirement}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
