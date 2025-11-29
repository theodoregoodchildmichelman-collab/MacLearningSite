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
