
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged 
} from 'firebase/auth';

// Firebase configuration (using placeholders - replace with actual keys if required)
const firebaseConfig = {
  apiKey: process.env.API_KEY, // Assuming API_KEY is set in env
  authDomain: "codeease-academy.firebaseapp.com",
  projectId: "codeease-academy",
  storageBucket: "codeease-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, store locally and redirect
        localStorage.setItem('ce_user_session', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }));
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate legacy auth and redirect
    setTimeout(() => {
      localStorage.setItem('ce_user_session', JSON.stringify({ email, displayName: email.split('@')[0] }));
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Store user info in local "database" (localStorage for pure frontend architecture)
      const usersRaw = localStorage.getItem('ce_users_collection');
      const users = usersRaw ? JSON.parse(usersRaw) : {};
      
      if (!users[user.uid]) {
        users[user.uid] = {
          name: user.displayName,
          email: user.email,
          createdAt: new Date().toISOString(),
          xp: 0,
          level: 1
        };
        localStorage.setItem('ce_users_collection', JSON.stringify(users));
      }
      
      // Persistence is handled by Firebase onAuthStateChanged
      setIsLoading(false);
      navigate('/');
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || "Failed to authenticate with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-['Plus_Jakarta_Sans'] bg-[#001D39] flex flex-col">
      {/* Background Layered Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-[#0A4174] rounded-[5rem] rotate-[15deg] blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[65%] bg-[#49769F] rounded-[5rem] rotate-[-12deg] blur-[120px] opacity-30"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-[#4E8EA2] rounded-[4rem] rotate-[45deg] blur-[150px] opacity-20"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[25%] h-[35%] bg-[#7BBDE8] rounded-full blur-[180px] opacity-10"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="relative z-20 px-8 py-6 flex flex-wrap items-center justify-between gap-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-12">
          <h2 className="text-2xl font-black text-[#BDD8E9] tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
            CODE<span className="text-[#7BBDE8]">EASE</span>
          </h2>
          <ul className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-[#6EA2B3]">
            <li className="hover:text-[#7BBDE8] cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</li>
            <li className="hover:text-[#7BBDE8] cursor-pointer transition-colors">Service</li>
            <li className="hover:text-[#7BBDE8] cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-[#7BBDE8] cursor-pointer transition-colors">About</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-xs text-[#BDD8E9] outline-none w-40 md:w-60 focus:w-72 focus:border-[#7BBDE8]/50 transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          {/* Glassmorphism Login Card */}
          <div className="bg-white/[0.03] backdrop-blur-[25px] border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Loading Spinner Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-50 bg-[#001D39]/60 backdrop-blur-sm flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#7BBDE8]/20 border-t-[#7BBDE8] rounded-full animate-spin"></div>
              </div>
            )}

            <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="text-6xl">🔒</div>
            </div>
            
            <header className="mb-10 text-center">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
                {isLogin ? 'Welcome Back' : 'Get Started'}
              </h1>
              <p className="text-[#6EA2B3] font-bold text-sm italic">
                {isLogin ? 'Logic awaits your command.' : 'Join the elite logic playground.'}
              </p>
            </header>

            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-[10px] font-black uppercase tracking-widest text-center animate-in slide-in-from-top-2">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-[0.2em] ml-2">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#001D39]/40 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#7BBDE8] focus:ring-4 focus:ring-[#7BBDE8]/10 transition-all" 
                  placeholder="name@university.edu"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-[0.2em] ml-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#001D39]/40 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#7BBDE8] focus:ring-4 focus:ring-[#7BBDE8]/10 transition-all" 
                  placeholder="••••••••"
                  required
                />
                {isLogin && (
                  <p className="text-right text-[9px] font-black text-[#6EA2B3] uppercase tracking-widest cursor-pointer hover:text-[#7BBDE8]">Forgot Password?</p>
                )}
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-gradient-to-r from-[#7BBDE8] to-[#4E8EA2] text-[#001D39] rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
              >
                {isLogin ? 'Sign In Now' : 'Sign Up Free'}
              </button>
            </form>

            <div className="mt-10 text-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-[#0c1e33] px-4 text-[#49769F]">Or Continue With</span>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                {/* Google Icon Button */}
                <button 
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group disabled:opacity-50"
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-black text-[#001D39] text-xs">G</div>
                </button>
                {/* Facebook Icon Placeholder */}
                <button 
                  disabled={isLoading}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-50"
                >
                   <div className="w-6 h-6 rounded-md bg-[#1877F2] flex items-center justify-center font-black text-white text-xs">f</div>
                </button>
              </div>

              <p className="text-sm font-bold text-[#6EA2B3]">
                {isLogin ? "Not a member yet?" : "Already a member?"} 
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-[#7BBDE8] hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-20 p-8 text-center">
        <p className="text-[10px] font-black text-[#49769F] uppercase tracking-[0.3em]">&copy; 2024 CODEEASE ACADEMY • BUILD WITH LOGIC</p>
      </footer>
    </div>
  );
};
