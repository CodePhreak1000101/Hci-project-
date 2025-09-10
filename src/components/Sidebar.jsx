// src/components/Sidebar.jsx
import React from 'react'
import GroupCard from './GroupCard'

const Sidebar = ({ groups, onSelect }) => {
  return (
    <aside className="sidebar" aria-label="Groups sidebar">
      <h3 className="sidebar-title">Your Groups</h3>
      <div className="sidebar-list">
        {groups.map((g) => (
          <div key={g.id} className="sidebar-item" draggable onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', g.id)
          }}>
            <GroupCard group={g} compact onClick={() => onSelect(g.id)} />
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
