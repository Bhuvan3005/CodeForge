import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TopicExplorer from './pages/TopicExplorer';
import TopicLesson from './pages/TopicLesson';
import ProblemGenerator from './pages/ProblemGenerator';
import ProblemList from './pages/ProblemList';
import ProblemSolver from './pages/ProblemSolver';
import AnalysisReport from './pages/AnalysisReport';
import TargetedPractice from './pages/TargetedPractice';
import ProgressAnalytics from './pages/ProgressAnalytics';
import LearningPath from './pages/LearningPath';
import SubmissionHistory from './pages/SubmissionHistory';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no sidebar) */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Problem Solver (full-screen, no sidebar) */}
        <Route path="/problems/:problemId" element={<ProblemSolver />} />

        {/* App routes (with sidebar) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topics" element={<TopicExplorer />} />
          <Route path="/topics/:topicSlug" element={<TopicLesson />} />
          <Route path="/generate" element={<ProblemGenerator />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/analysis/:submissionId" element={<AnalysisReport />} />
          <Route path="/learn/:conceptSlug" element={<TopicLesson />} />
          <Route path="/practice/:conceptSlug" element={<TargetedPractice />} />
          <Route path="/progress" element={<ProgressAnalytics />} />
          <Route path="/path" element={<LearningPath />} />
          <Route path="/history" element={<SubmissionHistory />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
