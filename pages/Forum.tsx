
import React, { useState } from 'react';
import { MOCK_FORUM, XP_TABLE } from '../constants';
import { Language, ForumCategory, ForumPost } from '../types';

export const Forum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM);
  const [activeLang, setActiveLang] = useState<Language | 'All'>('All');
  const [activeCat, setActiveCat] = useState<ForumCategory | 'All'>('All');
  const [isPosting, setIsPosting] = useState(false);
  
  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newLang, setNewLang] = useState(Language.PYTHON);
  const [newCat, setNewCat] = useState(ForumCategory.BASICS);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      author: 'You',
      authorLevel: 1,
      title: newTitle,
      content: newContent,
      language: newLang,
      category: newCat,
      tags: ['student-post'],
      upvotes: 0,
      timestamp: new Date(),
      replies: []
    };

    setPosts([post, ...posts]);
    setIsPosting(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const filteredPosts = posts.filter(p => 
    (activeLang === 'All' || p.language === activeLang) &&
    (activeCat === 'All' || p.category === activeCat)
  );

  return (
    <div className="space-y-12 pb-32">
      {/* Community Header with Standard Styling */}
      <header className="relative p-12 md:p-16 rounded-[4rem] bg-white border border-slate-100 shadow-sm overflow-hidden text-slate-900">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">
              Peer Discussion <span className="text-indigo-600">Forum</span>
            </h1>
            <p className="text-slate-500 text-lg font-bold max-w-xl italic opacity-80">
              "No question is too small, no bug is too annoying." Collaborate, solve, and earn rewards.
            </p>
          </div>
          <button 
            onClick={() => setIsPosting(true)}
            className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-900/40 hover:bg-indigo-500 hover:-translate-y-1 transition-all uppercase tracking-widest"
          >
            Ask a Question +
          </button>
        </div>
        <div className="absolute -bottom-10 -left-10 text-[15rem] opacity-[0.03] font-black pointer-events-none select-none uppercase">
          CHAT
        </div>
      </header>

      {/* Filter Bar with Glassmorphism */}
      <div className="sticky top-24 z-30 py-4 px-4 glass-card rounded-3xl border border-white/50 shadow-xl flex gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {['All', ...Object.values(Language)].map(l => (
            <button
              key={l}
              onClick={() => setActiveLang(l as any)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeLang === l ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="w-px h-8 bg-slate-200 my-auto hidden md:block" />
        <div className="flex gap-2">
          {['All', ...Object.values(ForumCategory)].map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c as any)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCat === c ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight uppercase">Post Your <span className="text-indigo-600">Doubt</span></h2>
            <form onSubmit={handlePostSubmit} className="space-y-6">
              <input 
                placeholder="Question Heading (e.g. Why is my while loop infinite?)" 
                className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-400 outline-none font-bold text-slate-800 transition-all"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 font-bold text-slate-600 text-sm outline-none focus:border-indigo-400"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value as Language)}
                >
                  {Object.values(Language).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <select 
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 font-bold text-slate-600 text-sm outline-none focus:border-indigo-400"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as ForumCategory)}
                >
                  {Object.values(ForumCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <textarea 
                placeholder="Describe your problem... paste code snippets here!" 
                rows={6}
                className="w-full p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-400 outline-none font-medium text-slate-800 mono transition-all"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsPosting(false)} className="flex-1 py-4 text-slate-400 font-black uppercase tracking-widest text-sm hover:text-slate-600 transition-colors">Cancel</button>
                <button type="submit" className="flex-2 px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Broadcast Question 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feed with card accents */}
      <div className="space-y-8">
        {filteredPosts.map(post => (
          <div key={post.id} className="group bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all relative overflow-hidden">
            <div className="flex gap-8 relative z-10">
              {/* Vote Column */}
              <div className="flex flex-col items-center gap-3">
                <button 
                  onClick={() => handleUpvote(post.id)}
                  className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all text-2xl flex items-center justify-center font-bold shadow-sm"
                >
                  ▲
                </button>
                <span className="text-2xl font-black text-slate-900">{post.upvotes}</span>
                <button className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white transition-all text-2xl flex items-center justify-center font-bold shadow-sm">
                  ▼
                </button>
              </div>

              {/* Content Column */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black tracking-widest uppercase">
                  <span className="text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">{post.language}</span>
                  <span className="text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">{post.category}</span>
                  {post.isSolved && <span className="text-teal-600 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100 shadow-sm">✅ SOLVED</span>}
                  <span className="text-slate-400 ml-auto font-bold">@{post.author} (Lvl {post.authorLevel})</span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed font-medium text-lg line-clamp-3">
                  {post.content}
                </p>

                <div className="pt-8 flex items-center gap-8 border-t border-slate-50">
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-400">
                    <span className="text-indigo-400 text-xl">💬</span> {post.replies.length} Replies
                  </span>
                  <button className="text-sm font-black text-indigo-600 hover:text-indigo-800 hover:underline uppercase tracking-widest transition-colors">
                    Help this peer →
                  </button>
                  <div className="ml-auto flex gap-3">
                    {post.tags.map(t => <span key={t} className="text-[10px] font-black text-slate-300 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-tighter">#{t}</span>)}
                  </div>
                </div>

                {/* Top Reply Preview */}
                {post.replies.length > 0 && (
                  <div className="mt-8 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100/50 flex gap-6 animate-in slide-in-from-left-4">
                    <div className="text-3xl">💡</div>
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                        Top Answer by {post.replies[0].author}
                      </p>
                      <p className="text-base text-slate-700 font-bold leading-relaxed line-clamp-2 italic">{post.replies[0].content}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard CTA */}
      <section className="bg-slate-900 rounded-[5rem] p-16 md:p-24 text-center text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none">
          <div className="absolute top-20 left-20 text-[20rem] font-black">🏆</div>
        </div>
        <div className="relative z-10">
          <span className="px-5 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm mb-8 inline-block">Weekly Ranking</span>
          <h2 className="text-6xl font-black tracking-tighter mb-4 uppercase leading-none">Community <span className="text-indigo-400">Heroes</span></h2>
          <p className="text-slate-400 text-xl font-bold mb-16 max-w-2xl mx-auto italic opacity-80">
            Earn {XP_TABLE.BEST_ANSWER} XP for every 'Best Answer'. Help others to climb the ranks and unlock exclusive badges!
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { name: 'Sarah J.', xp: 2450, rank: 'Platinum', color: 'from-indigo-400 to-indigo-600' },
              { name: 'Alex M.', xp: 1900, rank: 'Gold', color: 'from-amber-400 to-amber-600' },
              { name: 'Priya K.', xp: 1200, rank: 'Silver', color: 'from-slate-300 to-slate-500' }
            ].map((hero, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/10 flex items-center gap-6 hover:scale-105 transition-all shadow-2xl group">
                <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${hero.color}`}>#{i+1}</span>
                <div className="text-left">
                  <p className="font-black text-2xl leading-tight group-hover:text-indigo-400 transition-colors">{hero.name}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{hero.rank} • {hero.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <button className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
              View Full Leaderboard →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
