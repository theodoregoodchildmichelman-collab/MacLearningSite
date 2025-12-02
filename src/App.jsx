import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView'; // We will create this next

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardWrapper />} />
          <Route path="chapters" element={<DashboardWrapper />} />
          <Route path="lesson" element={<LessonViewWrapper />} />
          <Route path="chapter/:id" element={<LessonViewWrapper />} />
          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </UserProvider>
  );
}

const DashboardWrapper = () => {
  const navigate = useNavigate();
  return <Dashboard onStartLesson={() => navigate('/lesson')} />;
};

const LessonViewWrapper = () => {
  const navigate = useNavigate();
  return <LessonView onBack={() => navigate('/')} />;
};

export default App;
