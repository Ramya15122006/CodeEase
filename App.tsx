
import React, { Suspense, lazy } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy load page components
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Lessons = lazy(() => import('./pages/Lessons').then(m => ({ default: m.Lessons })));
const LessonDetail = lazy(() => import('./pages/LessonDetail').then(m => ({ default: m.LessonDetail })));
const Forum = lazy(() => import('./pages/Forum').then(m => ({ default: m.Forum })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const Practice = lazy(() => import('./pages/Practice').then(m => ({ default: m.Practice })));
const CTutorial = lazy(() => import('./pages/CTutorial').then(m => ({ default: m.CTutorial })));
const PythonTutorial = lazy(() => import('./pages/PythonTutorial').then(m => ({ default: m.PythonTutorial })));
const JavaTutorial = lazy(() => import('./pages/JavaTutorial').then(m => ({ default: m.JavaTutorial })));
const ExamHall = lazy(() => import('./pages/ExamHall').then(m => ({ default: m.ExamHall })));
const ProgressTracker = lazy(() => import('./pages/ProgressTracker').then(m => ({ default: m.ProgressTracker })));
const LiveEditor = lazy(() => import('./pages/LiveEditor').then(m => ({ default: m.LiveEditor })));
const Auth = lazy(() => import('./pages/Auth').then(m => ({ default: m.Auth })));

// Loading component for Suspense
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#001D39]">
    <div className="w-12 h-12 border-4 border-[#7BBDE8]/20 border-t-[#7BBDE8] rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = localStorage.getItem('ce_user_session');
  if (!session) {
    return <Auth />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Auth page is available directly */}
          <Route path="/auth" element={<Auth />} />
          
          {/* All other routes are protected and wrapped in Layout */}
          <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
          <Route path="/lessons" element={<ProtectedRoute><Layout><Lessons /></Layout></ProtectedRoute>} />
          <Route path="/lesson/:id" element={<ProtectedRoute><Layout><LessonDetail /></Layout></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><Layout><Forum /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><Layout><Practice /></Layout></ProtectedRoute>} />
          <Route path="/tutorial/c" element={<ProtectedRoute><Layout><CTutorial /></Layout></ProtectedRoute>} />
          <Route path="/tutorial/python" element={<ProtectedRoute><Layout><PythonTutorial /></Layout></ProtectedRoute>} />
          <Route path="/tutorial/java" element={<ProtectedRoute><Layout><JavaTutorial /></Layout></ProtectedRoute>} />
          <Route path="/exam-hall" element={<ProtectedRoute><Layout><ExamHall /></Layout></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Layout><ProgressTracker /></Layout></ProtectedRoute>} />
          <Route path="/compiler" element={<ProtectedRoute><Layout><LiveEditor /></Layout></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
