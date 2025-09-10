// src/components/GroupCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from './CircularProgress'

const GroupCard = ({ group, compact, onClick }) => {
  const covered = group.topics.filter(t => t.covered).length
  const total = group.topics.length || 1
  const pct = Math.round((covered / total) * 100)

  return (
    <div className={`group-card ${compact ? 'compact' : ''}`} onClick={onClick}>
      <div className="group-icon" aria-hidden="true">{group.icon || '📚'}</div>
      <div className="group-info">
        <div className="group-name">{group.name}</div>
        <div className="group-meta">{group.members.length} members</div>
      </div>
      <div className="group-progress-mini" aria-hidden="true">
        <CircularProgress size={48} stroke={6} percentage={pct} />
      </div>
      {!compact && <Link to={`/group/${group.id}`} className="open-link">Open</Link>}
    </div>
  )
}

export default GroupCard
