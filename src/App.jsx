// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CreateGroup from './pages/CreateGroup'
import GroupDetail from './pages/GroupDetail'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { useAuth } from './contexts/AuthContext'

const App = () => {
  const { currentEmail } = useAuth()

  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content" role="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={currentEmail ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path="/create-group" element={currentEmail ? <CreateGroup /> : <Navigate to="/" replace />} />
          <Route path="/group/:id" element={currentEmail ? <GroupDetail /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={currentEmail ? <Profile /> : <Navigate to="/" replace />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="app-footer" role="contentinfo">
        <div>© {new Date().getFullYear()} StudyBuddy — Privacy | Terms</div>
      </footer>
    </div>
  )
}

export default App
