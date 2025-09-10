// src/pages/Dashboard.jsx
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import Sidebar from '../components/Sidebar'
import GroupCard from '../components/GroupCard'

const Dashboard = () => {
  const { users, currentEmail } = useAuth()
  const { groups, reorderGroups } = useData()
  const [query, setQuery] = useState('')

  // groups joined by current user
  const myGroups = useMemo(() => {
    return groups.filter((g) => g.members.includes(currentEmail))
      .filter((g) => g.name.toLowerCase().includes(query.toLowerCase()))
  }, [groups, currentEmail, query])

  const onDropGroupOrder = (e) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData('text/plain')
    // simple reorder: move dragged to top
    const ids = myGroups.map(g => g.id).filter(id => id !== draggedId)
    ids.unshift(draggedId)
    reorderGroups(ids.concat(groups.map(g=>g.id).filter(id=>!ids.includes(id)).map(id=>groups.find(x=>x.id===id))))
  }

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <Sidebar groups={myGroups} onSelect={(id)=>window.location.href=`/group/${id}`} />
      </div>

      <div className="dashboard-main" onDragOver={(e)=>e.preventDefault()} onDrop={onDropGroupOrder}>
        <div className="dash-top">
          <h2>Welcome back, {currentEmail}</h2>
          <div className="search-row">
            <input aria-label="Search groups" placeholder="Search groups..." value={query} onChange={(e)=>setQuery(e.target.value)} />
            <Link to="/create-group" className="btn-primary">Create New Group</Link>
          </div>
        </div>

        <div className="group-grid">
          {myGroups.length === 0 ? (
            <div className="empty-state">
              <h3>No groups yet</h3>
              <p>Create your first group to get started.</p>
              <Link to="/create-group" className="btn">Create Group</Link>
            </div>
          ) : (
            myGroups.map((g)=>(
              <GroupCard key={g.id} group={g} onClick={()=>window.location.href=`/group/${g.id}`} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
