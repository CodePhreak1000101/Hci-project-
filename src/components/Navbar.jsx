// src/components/Navbar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { currentEmail, users, logout, switchUser } = useAuth()
  const navigate = useNavigate()

  const userList = users || []

  return (
    <nav className="nav-bar" role="navigation" aria-label="Main navigation">
      <div className="nav-left">
        <Link to="/dashboard" className="brand" aria-label="StudyBuddy home">
          <span className="logo">StudyBuddy</span>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/create-group" className="nav-link">Create Group</Link>
        <Link to="/profile" className="nav-link">Profile</Link>

        <div className="profile-dropdown" aria-haspopup="true">
          <button className="profile-btn" aria-label="Open profile menu">
            {currentEmail ? currentEmail : 'Not logged in'}
          </button>
          <div className="profile-menu" role="menu" aria-label="Profile menu">
            {userList.map((u) => (
              <button key={u.email} onClick={() => { switchUser(u.email); navigate('/dashboard') }} className="profile-menu-item" role="menuitem">
                {u.email}
              </button>
            ))}
            <button onClick={logout} className="profile-menu-item logout" role="menuitem">Logout (clear data)</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
