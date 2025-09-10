// src/contexts/DataContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { load, save } from '../utils/storage'
import { uid } from '../utils/helpers'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [groups, setGroups] = useState(load('studybuddy_groups', []))

  useEffect(() => {
    save('studybuddy_groups', groups)
  }, [groups])

  const createGroup = ({ name, icon, members, topics, ownerEmail }) => {
    if (!members.includes(ownerEmail)) members.push(ownerEmail)
    const g = {
      id: uid('g_'),
      name,
      icon,
      members,
      topics: topics.map((t) => ({ id: uid('t_'), title: t.trim(), covered: false })),
      messages: [{ id: uid('m_'), sender: ownerEmail, type: 'text', text: `Group '${name}' created!`, time: Date.now() }]
    }
    setGroups((s) => [g, ...s])
    return g
  }

  const updateGroup = (id, patch) => {
    setGroups((s) => s.map((g) => (g.id === id ? { ...g, ...patch } : g)))
  }

  const addMessage = (groupId, message) => {
    setGroups((s) => s.map((g) => (g.id === groupId ? { ...g, messages: [...g.messages, { id: uid('m_'), ...message, time: Date.now() }] } : g)))
  }

  const toggleTopic = (groupId, topicId) => {
    setGroups((s) =>
      s.map((g) =>
        g.id === groupId
          ? { ...g, topics: g.topics.map((t) => (t.id === topicId ? { ...t, covered: !t.covered } : t)) }
          : g
      )
    )
  }

  const reorderGroups = (newOrder) => {
    // newOrder is array of ids
    const map = Object.fromEntries(groups.map((g) => [g.id, g]))
    const ordered = newOrder.map((id) => map[id]).filter(Boolean)
    setGroups(ordered)
  }

  const removeMember = (groupId, email) => {
    setGroups((s) => s.map((g) => (g.id === groupId ? { ...g, members: g.members.filter((m) => m !== email) } : g)))
  }

  return (
    <DataContext.Provider value={{ groups, setGroups, createGroup, updateGroup, addMessage, toggleTopic, reorderGroups, removeMember }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
