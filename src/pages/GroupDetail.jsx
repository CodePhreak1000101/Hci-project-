// src/pages/GroupDetail.jsx
import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import { useAuth } from '../contexts/AuthContext'
import CircularProgress from '../components/CircularProgress'
import ChatPanel from '../components/ChatPanel'
import Modal from '../components/Modal'
import AvatarPicker from '../components/AvatarPicker'

const GroupDetail = () => {
  const { id } = useParams()
  const { groups, addMessage, toggleTopic, updateGroup, removeMember } = useData()
  const { currentEmail, users } = useAuth()
  const navigate = useNavigate()
  const group = groups.find((g)=>g.id === id)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [confirmLeave, setConfirmLeave] = useState(false)

  if (!group) return <div>Group not found</div>

  const covered = group.topics.filter(t => t.covered).length
  const pct = Math.round((covered / (group.topics.length || 1)) * 100)

  const sendMessage = (msg) => {
    addMessage(group.id, msg)
  }

  return (
    <div className="group-detail">
      <div className="group-header">
        <div className="group-left">
          <div className="group-icon-large" aria-hidden>{group.icon}</div>
          <div>
            <h2>{group.name}</h2>
            <div className="member-bubbles">
              {group.members.map((m)=> <span key={m} className="bubble" title={m}>{m.split('@')[0]}</span>)}
            </div>
          </div>
        </div>
        <div className="group-right">
          <CircularProgress size={200} stroke={14} percentage={pct} />
        </div>
      </div>

      <div className="group-body">
        <section className="syllabus">
          <h3>Syllabus</h3>
          <ul>
            {group.topics.map((t) => (
              <li key={t.id} className="topic-row">
                <label>
                  <input type="checkbox" checked={t.covered} onChange={() => toggleTopic(group.id, t.id)} aria-label={`Mark ${t.title} covered`} />
                  <span className="topic-title">{t.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="chat-section">
          <h3>Chat</h3>
          <ChatPanel group={group} currentUserEmail={currentEmail} onSendMessage={sendMessage} />
        </section>

        <aside className="group-side">
          <button className="btn" onClick={()=>setShowInvite(true)}>Invite</button>
          <button className="btn" onClick={()=>setConfirmLeave(true)}>Leave Group</button>
          <button className="btn" onClick={() => {
            // mock export
            const data = JSON.stringify(group, null, 2)
            const blob = new Blob([data], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${group.name.replace(/\s+/g,'_')}_progress.json`
            a.click()
            URL.revokeObjectURL(url)
          }}>Export Progress</button>
        </aside>
      </div>

      <Modal isOpen={showInvite} onClose={()=>setShowInvite(false)} title="Invite member">
        <p>Invite by email</p>
        <input value={inviteEmail} onChange={(e)=>setInviteEmail(e.target.value)} placeholder="student4@university.edu" />
        <div className="form-row">
          <button className="btn-primary" onClick={()=>{
            if (!inviteEmail) return
            if (!group.members.includes(inviteEmail)) {
              updateGroup(group.id, { members: [...group.members, inviteEmail] })
              setInviteEmail('')
              setShowInvite(false)
            }
          }}>Invite</button>
          <button className="btn" onClick={()=>setShowInvite(false)}>Cancel</button>
        </div>
      </Modal>

      <Modal isOpen={confirmLeave} onClose={()=>setConfirmLeave(false)} title="Confirm leave">
        <p>Are you sure you want to leave this group?</p>
        <div className="form-row">
          <button className="btn-primary" onClick={()=>{
            removeMember(group.id, currentEmail)
            setConfirmLeave(false)
            navigate('/dashboard')
          }}>Yes, leave</button>
          <button className="btn" onClick={()=>setConfirmLeave(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  )
}

export default GroupDetail
