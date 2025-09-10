// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { load, save } from '../utils/storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentEmail, setCurrentEmail] = useState(load('studybuddy_currentUserEmail', null))
  const [users, setUsers] = useState(load('studybuddy_users', []))

  useEffect(() => {
    save('studybuddy_users', users)
  }, [users])

  useEffect(() => {
    save('studybuddy_currentUserEmail', currentEmail)
  }, [currentEmail])

  const login = (email, nameIfNew = '') => {
    // if user exists, set current; else create
    let u = users.find((x) => x.email === email)
    if (!u) {
      u = { id: 'u_' + Math.random().toString(36).slice(2, 9), name: nameIfNew || email.split('@')[0], email, avatar: null, joinedGroups: [] }
      const newUsers = [...users, u]
      setUsers(newUsers)
    }
    setCurrentEmail(email)
    return u
  }

  const logout = () => {
    setCurrentEmail(null)
    // optional: clear localStorage except data? spec asked logout clears localStorage and redirects — we will clear all and re-seed minimal next load
    localStorage.clear()
    localStorage.setItem('studybuddy_init', '1') // preserve seed flag to avoid infinite reset
    window.location.href = '/'
  }

  const switchUser = (email) => {
    setCurrentEmail(email)
  }

  return (
    <AuthContext.Provider value={{ currentEmail, users, setUsers, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
