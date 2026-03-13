
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Lessons } from './pages/Lessons';
import { LessonDetail } from './pages/LessonDetail';
import { Forum } from './pages/Forum';
import { Profile } from './pages/Profile';
import { Practice } from './pages/Practice';
import { CTutorial } from './pages/CTutorial';
import { PythonTutorial } from './pages/PythonTutorial';
import { JavaTutorial } from './pages/JavaTutorial';
import { ExamHall } from './pages/ExamHall';
import { ProgressTracker } from './pages/ProgressTracker';
import { LiveEditor } from './pages/LiveEditor';
import { Auth } from './pages/Auth';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth page is outside of the main layout */}
        <Route path="/auth" element={<Auth />} />
        
        {/* All other routes are wrapped in Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/lessons" element={<Layout><Lessons /></Layout>} />
        <Route path="/lesson/:id" element={<Layout><LessonDetail /></Layout>} />
        <Route path="/forum" element={<Layout><Forum /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/practice" element={<Layout><Practice /></Layout>} />
        <Route path="/tutorial/c" element={<Layout><CTutorial /></Layout>} />
        <Route path="/tutorial/python" element={<Layout><PythonTutorial /></Layout>} />
        <Route path="/tutorial/java" element={<Layout><JavaTutorial /></Layout>} />
        <Route path="/exam-hall" element={<Layout><ExamHall /></Layout>} />
        <Route path="/progress" element={<Layout><ProgressTracker /></Layout>} />
        <Route path="/compiler" element={<Layout><LiveEditor /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
