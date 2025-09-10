// src/pages/CreateGroup.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarPicker from '../components/AvatarPicker'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'

const ICONS = ['📚','✏️','🧪','🔬','🧮','📐','💡','📝','🎧','🖥️']

const CreateGroup = () => {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState(ICONS[0])
  const [memberEmails, setMemberEmails] = useState('')
  const [topicsText, setTopicsText] = useState('')
  const [error, setError] = useState('')
  const { currentEmail, users } = useAuth()
  const { createGroup } = useData()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const membersArr = memberEmails.split(',').map(s=>s.trim()).filter(Boolean)
    if (membersArr.length < 2) { setError('Please invite at least 2 members (comma-separated emails).'); return }
    const topicsArr = (topicsText || '').split(',').map(s=>s.trim()).filter(Boolean)
    const group = createGroup({ name, icon, members: membersArr, topics: topicsArr, ownerEmail: currentEmail })
    // show fun confetti (basic)
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    document.body.appendChild(confetti)
    setTimeout(()=>confetti.remove(), 1500)
    navigate(`/group/${group.id}`)
  }

  return (
    <div className="create-group-page">
      <div className="create-card">
        <h2>Create Group</h2>
        <form onSubmit={submit}>
          <label>Group name</label>
          <input required value={name} onChange={(e)=>setName(e.target.value)} />

          <label>Icon</label>
          <div className="icon-grid">
            {ICONS.map(ic => (
              <button type="button" key={ic} className={`icon-thumb ${icon===ic ? 'selected' : ''}`} onClick={()=>setIcon(ic)} aria-pressed={icon===ic}>{ic}</button>
            ))}
          </div>

          <label>Invite members (comma-separated institute emails)</label>
          <input placeholder="student1@university.edu, student2@university.edu" value={memberEmails} onChange={(e)=>setMemberEmails(e.target.value)} />

          <label>Initial syllabus topics (comma-separated)</label>
          <textarea placeholder="Chapter 1, Chapter 2" value={topicsText} onChange={(e)=>setTopicsText(e.target.value)} />

          {error && <div className="input-error">{error}</div>}

          <div className="form-row">
            <button className="btn-primary" type="submit">Create Group</button>
            <button type="button" className="btn" onClick={()=>navigate('/dashboard')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGroup
