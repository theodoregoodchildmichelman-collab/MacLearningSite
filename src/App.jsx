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
        <div className="fixed bottom-0 left-0 bg-red-600 text-white z-[100] px-4 py-2 font-bold shadow-lg flex items-center gap-4 rounded-tr-lg">
          <span>DEBUG: UI OVERHAUL V2 ACTIVE</span>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="bg-white text-red-600 px-2 py-0.5 rounded text-xs hover:bg-red-50"
          >
            RESET TO DASHBOARD
          </button>
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
