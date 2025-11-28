import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView'; // We will create this next

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'lesson'

  return (
    <UserProvider>
      <Layout>
        <div className="fixed top-0 left-0 bg-red-600 text-white z-[100] px-4 py-2 font-bold shadow-lg">
          DEBUG: UI OVERHAUL V2 ACTIVE
        </div>
        {currentView === 'dashboard' && (
          <Dashboard onStartLesson={() => setCurrentView('lesson')} />
        )}
        {currentView === 'lesson' && (
          <LessonView onBack={() => setCurrentView('dashboard')} />
        )}
      </Layout>
    </UserProvider>
  );
}

export default App;
