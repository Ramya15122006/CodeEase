
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAIPracticeTest } from '../services/geminiService';
import { Certification, TopicScore } from '../types';

interface Question {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface SubjectData {
  id: string;
  name: string;
  icon: string;
  topics: string[];
}

const SUBJECTS: SubjectData[] = [
  {
    id: 'c',
    name: 'C Programming',
    icon: '⚙️',
    topics: [
      'Basics', 'Data Types', 'Operators', 'Control Statements', 'Loops', 
      'Arrays', 'Strings', 'Functions', 'Pointers', 'Structures', 'File Handling'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    topics: [
      'Basics', 'Variables & Data Types', 'Operators', 'Conditional Statements', 'Loops',
      'Functions', 'Lists', 'Tuples', 'Sets', 'Dictionaries', 'Strings',
      'File Handling', 'OOP Concepts', 'Exception Handling'
    ]
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    topics: [
      'Basics', 'Data Types & Variables', 'Operators', 'Conditional Statements', 'Loops',
      'Arrays', 'Strings', 'Methods', 'OOP Concepts', 'Inheritance', 
      'Polymorphism', 'Interfaces & Abstract Classes', 'Exception Handling', 
      'Collections Framework', 'File Handling'
    ]
  }
];

export const ExamHall: React.FC = () => {
  const navigate = useNavigate();
  const [examState, setExamState] = useState<'lobby' | 'topic-select' | 'loading' | 'active' | 'result'>('lobby');
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  
  const [testData, setTestData] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef<any>(null);

  const [newCertificate, setNewCertificate] = useState<Certification | null>(null);
  const [showCertPopup, setShowCertPopup] = useState(false);

  // Timer logic
  useEffect(() => {
    if (examState === 'active') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeTaken(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [examState]);

  const handleStartSubject = (subject: SubjectData) => {
    setSelectedSubject(subject);
    setExamState('topic-select');
  };

  const handleFetchTest = async (topic: string) => {
    if (!selectedSubject) return;
    setSelectedTopic(topic);
    setExamState('loading');
    try {
      const data = await generateAIPracticeTest(selectedSubject.name, topic);
      setTestData(data);
      setCurrentQuestionIdx(0);
      setUserAnswers({});
      setTimeLeft(900);
      setTimeTaken(0);
      setExamState('active');
    } catch (err) {
      alert("Failed to reach Codey's brain. Please check your connection.");
      setExamState('topic-select');
    }
  };

  const handleAnswerSelect = (label: string) => {
    const qId = testData.questions[currentQuestionIdx].id;
    setUserAnswers(prev => ({ ...prev, [qId]: label }));
  };

  const saveTopicScore = (score: number) => {
    if (!selectedSubject) return;
    const scoresRaw = localStorage.getItem('ce_exam_scores');
    const scores: TopicScore[] = scoresRaw ? JSON.parse(scoresRaw) : [];
    
    // Remove existing score for this topic if any
    const filtered = scores.filter(s => s.subjectId !== selectedSubject.id || s.topicName !== selectedTopic);
    filtered.push({
      subjectId: selectedSubject.id,
      topicName: selectedTopic,
      score: score,
      timestamp: Date.now()
    });
    
    localStorage.setItem('ce_exam_scores', JSON.stringify(filtered));
    checkCertificationEligibility(filtered);
  };

  const checkCertificationEligibility = (allScores: TopicScore[]) => {
    if (!selectedSubject) return;
    
    // 1. Check if all topics of the selected language are completed
    const subjectScores = allScores.filter(s => s.subjectId === selectedSubject.id);
    const completedTopics = subjectScores.map(s => s.topicName);
    const isAllCompleted = selectedSubject.topics.every(t => completedTopics.includes(t));
    
    if (!isAllCompleted) return;

    // 2. Check if already has a certificate
    const certsRaw = localStorage.getItem('ce_certificates');
    const certs: Certification[] = certsRaw ? JSON.parse(certsRaw) : [];
    if (certs.some(c => c.language === selectedSubject.name)) return;

    // 3. Calculate average score
    const totalScore = subjectScores.reduce((acc, s) => acc + s.score, 0);
    const avgScorePct = (totalScore / (selectedSubject.topics.length * 10)) * 100;

    // 4. Achievement threshold: min 60% average
    if (avgScorePct >= 60) {
      const perfLevel = avgScorePct >= 85 ? 'Advanced' : (avgScorePct >= 70 ? 'Intermediate' : 'Beginner');
      const cert: Certification = {
        id: `CERT-${selectedSubject.id.toUpperCase()}-${Date.now()}`,
        studentName: 'Student_Alpha', // From Profile (mock)
        language: selectedSubject.name,
        totalTopics: selectedSubject.topics.length,
        averageScore: Math.round(avgScorePct),
        performanceLevel: perfLevel,
        issueDate: new Date().toLocaleDateString(),
        certificateId: `CE-${selectedSubject.id.toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      certs.push(cert);
      localStorage.setItem('ce_certificates', JSON.stringify(certs));
      
      // Unlock badge
      const unlockedBadgesRaw = localStorage.getItem('ce_unlocked_badges');
      const unlockedBadges: string[] = unlockedBadgesRaw ? JSON.parse(unlockedBadgesRaw) : [];
      const badgeId = `${selectedSubject.id}-master`;
      if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        localStorage.setItem('ce_unlocked_badges', JSON.stringify(unlockedBadges));
      }

      setNewCertificate(cert);
      setShowCertPopup(true);
    }
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const results = calculateResults();
    if (results) {
      saveTopicScore(results.correctCount);
    }
    
    setExamState('result');
  };

  const calculateResults = () => {
    if (!testData) return null;
    let correctCount = 0;
    testData.questions.forEach((q: Question) => {
      if (userAnswers[q.id] === q.correct) correctCount++;
    });

    const total = testData.questions.length;
    const percentage = (correctCount / total) * 100;
    
    let perfLevel: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
    if (correctCount >= 8) perfLevel = 'Advanced';
    else if (correctCount >= 5) perfLevel = 'Intermediate';

    return { correctCount, wrongCount: total - correctCount, percentage, perfLevel, total };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // UI: Lobby - Subject Select
  if (examState === 'lobby') {
    return (
      <div className="max-w-6xl mx-auto py-20 px-6 space-y-12 animate-in fade-in duration-700">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-black text-[#BDD8E9] uppercase tracking-tighter">Virtual <span className="ce-gradient-text">Exam Hall</span></h1>
          <p className="text-xl text-[#6EA2B3] font-bold italic opacity-80">Prove your logic mastery and earn digital certifications.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUBJECTS.map(subject => (
            <div key={subject.id} className="ce-glass p-12 rounded-[3.5rem] border border-[#BDD8E9]/10 hover:border-[#7BBDE8]/30 transition-all group flex flex-col items-center text-center space-y-8 shadow-2xl">
              <div className="text-8xl group-hover:scale-110 transition-transform duration-500">{subject.icon}</div>
              <h3 className="text-3xl font-black text-[#BDD8E9] uppercase tracking-tight">{subject.name}</h3>
              <button 
                onClick={() => handleStartSubject(subject)}
                className="w-full py-5 bg-[#7BBDE8] text-[#001D39] rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-all"
              >
                View Topic List →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // UI: Topic Selection
  if (examState === 'topic-select' && selectedSubject) {
    const scoresRaw = localStorage.getItem('ce_exam_scores');
    const scores: TopicScore[] = scoresRaw ? JSON.parse(scoresRaw) : [];
    const subjectScores = scores.filter(s => s.subjectId === selectedSubject.id);

    return (
      <div className="max-w-6xl mx-auto py-20 px-6 space-y-12 animate-in slide-in-from-bottom-10">
        <header className="flex items-center justify-between border-b border-white/5 pb-8">
          <div className="flex items-center gap-6">
            <span className="text-5xl">{selectedSubject.icon}</span>
            <div>
              <p className="text-[#7BBDE8] font-black uppercase text-[10px] tracking-widest">Logic Stream</p>
              <h2 className="text-4xl font-black text-[#BDD8E9] tracking-tight uppercase">{selectedSubject.name}</h2>
            </div>
          </div>
          <button onClick={() => setExamState('lobby')} className="px-8 py-3 ce-glass rounded-xl text-xs font-black uppercase text-[#6EA2B3] hover:text-white border border-white/10 transition-all tracking-widest">Back to Hall</button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedSubject.topics.map(topic => {
            const topicScore = subjectScores.find(s => s.topicName === topic);
            return (
              <button
                key={topic}
                onClick={() => handleFetchTest(topic)}
                className={`p-8 ce-glass rounded-[2rem] border text-left group transition-all flex flex-col justify-between h-full min-h-[160px] ${
                  topicScore ? 'border-emerald-500/30' : 'border-white/5 hover:border-[#7BBDE8]/40 hover:bg-white/5'
                }`}
              >
                <div>
                  <h4 className="text-xl font-bold text-[#BDD8E9] group-hover:text-[#7BBDE8] transition-colors leading-tight">{topic}</h4>
                  {topicScore && (
                    <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-emerald-500/10 rounded-lg">
                      <span className="text-emerald-400 text-[10px] font-black uppercase">Completed: {topicScore.score}/10</span>
                    </div>
                  )}
                </div>
                <p className="text-[9px] font-black text-[#49769F] uppercase mt-4 tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                  {topicScore ? 'Retest Challenge' : 'Initialize Test'} →
                </p>
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  // UI: Loading
  if (examState === 'loading') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-40 h-40 border-[12px] border-[#0A4174] border-t-[#7BBDE8] rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-5xl">🧠</div>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-black text-[#BDD8E9] uppercase tracking-tighter">Consulting Codey...</h3>
          <p className="text-[#6EA2B3] font-bold italic mt-2 max-w-sm">Generating 10 randomized logic challenges for <br/> <span className="text-[#7BBDE8] not-italic uppercase font-black tracking-widest text-lg">"{selectedTopic}"</span></p>
        </div>
      </div>
    );
  }

  // UI: Active Exam
  if (examState === 'active' && testData) {
    const question = testData.questions[currentQuestionIdx];
    const progress = ((Object.keys(userAnswers).length) / testData.questions.length) * 100;

    return (
      <div className="max-w-6xl mx-auto py-12 px-6 pb-48 relative">
        <div className="sticky top-24 z-50 p-6 ce-glass rounded-[2.5rem] border border-[#BDD8E9]/20 shadow-2xl mb-12 flex flex-col gap-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-[#001D39] flex items-center justify-center text-3xl shadow-inner border border-white/5">⚡</div>
                 <div>
                   <h2 className="text-xl font-black text-[#BDD8E9] uppercase leading-none">{selectedTopic}</h2>
                   <p className="text-[10px] font-black text-[#6EA2B3] uppercase tracking-widest mt-2">Challenge {currentQuestionIdx + 1} of {testData.questions.length}</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest mb-1">Time Remaining</p>
                 <p className={`font-mono text-3xl font-black ${timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-[#BDD8E9]'}`}>{formatTime(timeLeft)}</p>
              </div>
           </div>
           <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-[#7BBDE8] transition-all duration-500 shadow-[0_0_15px_rgba(123,189,232,0.4)]" style={{ width: `${progress}%` }} />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Navigator Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
            <h4 className="text-[10px] font-black text-[#49769F] uppercase tracking-[0.2em] ml-2">Quick Nav</h4>
            <div className="grid grid-cols-5 lg:grid-cols-2 gap-2">
              {testData.questions.map((q: any, i: number) => (
                <button
                  key={q.id}
                  onClick={() => { setCurrentQuestionIdx(i); scrollToTop(); }}
                  className={`p-4 rounded-xl font-black text-xs transition-all border ${
                    currentQuestionIdx === i ? 'bg-[#7BBDE8] text-[#001D39] border-[#7BBDE8]' : 
                    userAnswers[q.id] ? 'bg-indigo-500/20 text-[#7BBDE8] border-indigo-500/30' : 
                    'bg-white/5 text-[#49769F] border-transparent hover:border-white/10'
                  }`}
                >
                  {i + 1} {userAnswers[q.id] ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Question Body */}
          <div className="lg:col-span-9 order-1 lg:order-2 space-y-12 animate-in slide-in-from-right-10 duration-300">
             <div className="ce-glass p-12 md:p-16 rounded-[4rem] border border-[#BDD8E9]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                     question.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' : 
                     question.difficulty === 'Hard' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                   }`}>
                     {question.difficulty}
                   </span>
                </div>
                <div className="space-y-10">
                   <h3 className="text-3xl font-black text-[#BDD8E9] leading-tight tracking-tight">{question.question}</h3>
                   <div className="grid grid-cols-1 gap-4">
                      {question.options.map((opt: any) => (
                        <button 
                          key={opt.label}
                          onClick={() => handleAnswerSelect(opt.label)}
                          className={`text-left p-8 rounded-[2.5rem] border-2 transition-all flex items-center gap-6 group ${
                            userAnswers[question.id] === opt.label 
                            ? 'bg-indigo-600/30 border-indigo-400 shadow-xl' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-[#7BBDE8]/30'
                          }`}
                        >
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all ${
                             userAnswers[question.id] === opt.label ? 'bg-indigo-500 text-white' : 'bg-[#001D39] text-[#6EA2B3]'
                           }`}>
                             {opt.label}
                           </div>
                           <span className="text-xl font-bold text-[#BDD8E9]">{opt.text}</span>
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex gap-4 z-40">
           <button 
             onClick={() => { setCurrentQuestionIdx(prev => Math.max(0, prev - 1)); scrollToTop(); }}
             disabled={currentQuestionIdx === 0}
             className="flex-1 py-6 ce-glass text-white border border-white/10 rounded-[2.5rem] font-black uppercase text-xs hover:bg-white/10 transition-all disabled:opacity-20 shadow-2xl"
           >
             ← Previous
           </button>
           <button 
             onClick={() => {
                if (currentQuestionIdx < testData.questions.length - 1) {
                  setCurrentQuestionIdx(prev => prev + 1);
                  scrollToTop();
                } else {
                  if (confirm("Submit your logic for final evaluation?")) handleSubmit();
                }
             }}
             className={`flex-[2] py-8 rounded-[3rem] font-black text-xl uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all ${
               currentQuestionIdx === testData.questions.length - 1 ? 'bg-indigo-600 text-white' : 'bg-[#7BBDE8] text-[#001D39]'
             }`}
           >
             {currentQuestionIdx === testData.questions.length - 1 ? 'Finish & Submit Exam 🏁' : 'Next Challenge →'}
           </button>
        </div>
      </div>
    );
  }

  // UI: Results
  if (examState === 'result') {
    const results = calculateResults();
    if (!results) return null;

    return (
      <div className="max-w-5xl mx-auto py-20 px-6 space-y-16 animate-in zoom-in duration-700">
         {/* Success Popup for Certificate */}
         {showCertPopup && newCertificate && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#001D39]/80 backdrop-blur-lg">
             <div className="ce-glass p-12 rounded-[4rem] border border-[#BDD8E9]/20 max-w-2xl w-full text-center space-y-8 animate-in zoom-in-95 duration-500 shadow-[0_0_50px_rgba(123,189,232,0.3)]">
                <div className="text-9xl ce-animate-float">🎉</div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-[#BDD8E9] uppercase tracking-tighter">Certification Unlocked!</h2>
                  <p className="text-xl text-[#6EA2B3] font-bold italic leading-relaxed">Congratulations! You have successfully completed all tests in {newCertificate.language}.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setShowCertPopup(false); }}
                    className="w-full py-6 bg-[#7BBDE8] text-[#001D39] rounded-[2rem] font-black text-lg uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                  >
                    View Certificate 📜
                  </button>
                  <button 
                    onClick={() => setShowCertPopup(false)}
                    className="w-full py-4 text-[#BDD8E9] font-black uppercase text-xs tracking-widest opacity-60 hover:opacity-100"
                  >
                    Dismiss
                  </button>
                </div>
             </div>
           </div>
         )}

         {/* Results Header */}
         <div className="ce-glass p-16 rounded-[5rem] border border-[#BDD8E9]/10 text-center space-y-8 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-4 ${results.percentage >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <div className="text-9xl ce-animate-float">🏆</div>
            <div className="space-y-2">
               <h1 className="text-6xl font-black text-[#BDD8E9] tracking-tighter uppercase">{selectedTopic} Report</h1>
               <p className="text-xl text-[#6EA2B3] font-bold italic opacity-80">Final Logic Performance Assessment</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
               {[
                 { label: 'Topic Name', val: selectedTopic },
                 { label: 'Correct Logic', val: `${results.correctCount}/${results.total}` },
                 { label: 'Accuracy Score', val: `${Math.round(results.percentage)}%` },
                 { label: 'Proficiency Level', val: results.perfLevel, highlight: true }
               ].map((stat, i) => (
                 <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-inner">
                    <p className="text-[10px] font-black text-[#49769F] uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className={`text-2xl font-black ${stat.highlight ? 'text-[#7BBDE8]' : 'text-[#BDD8E9]'}`}>{stat.val}</p>
                 </div>
               ))}
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-center gap-12 text-[#6EA2B3] font-bold italic text-sm">
               <p>Total Time: {formatTime(timeTaken)}</p>
               <p>Wrong Answers: {results.wrongCount}</p>
            </div>
         </div>

         {/* Mastery Review */}
         <div className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="h-16 w-3 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
              <h2 className="text-5xl font-black text-[#BDD8E9] uppercase tracking-tighter italic">Logic <span className="text-[#7BBDE8]">Review</span></h2>
            </div>
            
            <div className="space-y-8">
               {testData.questions.map((q: Question) => {
                 const userAns = userAnswers[q.id];
                 const isCorrect = userAns === q.correct;
                 return (
                   <div key={q.id} className={`p-10 rounded-[3.5rem] border-2 transition-all ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div className="flex items-center gap-5">
                           <span className="w-12 h-12 rounded-2xl bg-[#001D39] flex items-center justify-center font-black text-xl text-[#7BBDE8] shadow-inner">{q.id}</span>
                           <h4 className="text-2xl font-bold text-[#BDD8E9] leading-tight">{q.question}</h4>
                        </div>
                        <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {isCorrect ? 'Correct Path' : 'Logic Deviation'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {q.options.map(opt => {
                          const isUserChoice = userAns === opt.label;
                          const isTheCorrectAns = q.correct === opt.label;
                          let borderClass = 'border-white/5';
                          let textClass = 'text-[#6EA2B3]';
                          
                          if (isTheCorrectAns) {
                            borderClass = 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]';
                            textClass = 'text-emerald-400 font-black';
                          } else if (isUserChoice && !isCorrect) {
                            borderClass = 'border-rose-500 bg-rose-500/10';
                            textClass = 'text-rose-400 font-black';
                          }

                          return (
                            <div key={opt.label} className={`p-6 rounded-[2rem] border-2 ${borderClass} flex items-center gap-5 transition-all duration-500`}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${isTheCorrectAns ? 'bg-emerald-500 text-[#001D39]' : (isUserChoice ? 'bg-rose-500 text-white' : 'bg-white/10 text-white/40')}`}>{opt.label}</div>
                              <span className={`text-lg ${textClass}`}>{opt.text}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-8 bg-[#001D39]/50 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                           <div className="text-8xl">ℹ️</div>
                        </div>
                        <p className="text-[10px] font-black text-[#7BBDE8] uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                           <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                           Logical Context
                        </p>
                        <p className="text-[#BDD8E9]/80 text-lg font-bold italic leading-relaxed">{q.explanation}</p>
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>

         <div className="flex flex-col md:flex-row gap-6 pb-20 sticky bottom-0 z-50 pt-10 bg-gradient-to-t from-[#001D39] via-[#001D39]/90 to-transparent">
            <button 
              onClick={() => handleFetchTest(selectedTopic)}
              className="flex-1 py-8 bg-[#7BBDE8] text-[#001D39] rounded-[2.5rem] font-black text-2xl uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              Regenerate Test 🔄
              <span className="text-[10px] font-black bg-black/10 px-3 py-1 rounded-full uppercase">New Logic Pool</span>
            </button>
            <button 
              onClick={() => setExamState('topic-select')}
              className="flex-1 py-8 ce-glass text-[#BDD8E9] border-2 border-white/10 rounded-[2.5rem] font-black text-2xl uppercase tracking-widest shadow-xl hover:bg-white/10 transition-all"
            >
              Back to Topics 📚
            </button>
         </div>
      </div>
    );
  }

  return null;
};
