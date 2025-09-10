// src/pages/Profile.jsx
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import AvatarPicker from '../components/AvatarPicker'
import { useData } from '../contexts/DataContext'

const Profile = () => {
  const { users, currentEmail, setUsers } = useAuth()
  const { groups } = useData()
  const user = users.find(u => u.email === currentEmail)
  const [avatar, setAvatar] = useState(user?.avatar || null)
  const [name, setName] = useState(user?.name || '')

  const save = () => {
    const newUsers = users.map(u => u.email === currentEmail ? { ...u, avatar, name } : u)
    setUsers(newUsers)
    alert('Profile saved (mock).')
  }

  const joined = groups.filter(g => g.members.includes(currentEmail))

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Profile</h2>
        <label>Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <label>Avatar</label>
        <AvatarPicker value={avatar} onChange={setAvatar} />
        <div className="form-row">
          <button className="btn-primary" onClick={save}>Save</button>
        </div>
      </div>

      <div className="profile-stats">
        <h3>Stats</h3>
        <div className="badges">
          <span className="badge">Groups Joined: {joined.length}</span>
          <span className="badge">Messages: {/* naive count */} {groups.reduce((acc,g)=>acc + g.messages.filter(m=>m.sender===currentEmail).length,0)}</span>
        </div>

        <h3>Joined Groups</h3>
        <ul>
          {joined.map(g => <li key={g.id}><a href={`/group/${g.id}`}>{g.name}</a></li>)}
        </ul>
      </div>
    </div>
  )
}

export default Profile
