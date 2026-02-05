import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TeamProvider } from './context/TeamContext';
import { Landing } from './screens/Landing';
import { CreateTeam } from './screens/CreateTeam';
import { JoinTeam } from './screens/JoinTeam';
import { TeamSetup } from './screens/TeamSetup';
import { Dashboard } from './screens/Dashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  // Enable dark mode globally
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <TeamProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/join-team" element={<JoinTeam />} />
          <Route path="/team-setup" element={<TeamSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster 
          position="top-right" 
          theme="dark"
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#fff',
            },
          }}
        />
      </BrowserRouter>
    </TeamProvider>
  );
}