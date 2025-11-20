import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ActivityLogs from './pages/ActivityLogs';
import LogHours from './pages/LogHours';
import Clinics from './pages/Clinics';
import AddClinic from './pages/AddClinic';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import AdmissionsGuide from './pages/AdmissionsGuide';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import WelcomeModal from './components/WelcomeModal';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <WelcomeModal />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="activity-logs" element={<ActivityLogs />} />
              <Route path="log-hours" element={<LogHours />} />
              <Route path="map" element={<Clinics />} />
              <Route path="clinics" element={<Clinics />} />
              <Route path="clinics/add" element={<AddClinic />} />
              <Route path="admissions-guide" element={<AdmissionsGuide />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
