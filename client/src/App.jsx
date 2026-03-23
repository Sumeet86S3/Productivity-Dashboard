import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Goals from './pages/Goals';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-cyan-950 text-white md:flex">
                  <Sidebar />
                  <main className="flex-1 p-4 md:p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-800/40 p-4 text-white shadow-xl backdrop-blur-lg border border-white/10">
                      <h1 className="text-xl font-extrabold tracking-tight">✨ Productivity Hub</h1>
                      <p className="text-sm text-slate-300">A sleek dashboard for your tasks, notes, and goals.</p>
                    </div>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/goals" element={<Goals />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

