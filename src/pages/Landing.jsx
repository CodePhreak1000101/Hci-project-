// src/pages/Landing.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { emailValid } from '../utils/helpers'
import { useAuth } from '../contexts/AuthContext'
import Modal from '../components/Modal'

const Landing = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showForgot, setShowForgot] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!emailValid(email)) { setError('Please input a valid institute email'); return }
    login(email)
    navigate('/dashboard')
  }

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">StudyBuddy</h1>
          <p className="hero-tag">Connect, Track, and Study Together!</p>
          <button className="cta" onClick={() => document.getElementById('login-form')?.scrollIntoView({ behavior: 'smooth' })}>Get started</button>
        </div>
        <div className="hero-right">
          <div className="hero-card" id="login-form" aria-label="Login form">
            <h3>Login</h3>
            <form onSubmit={submit}>
              <label>Email</label>
              <input type="email" aria-label="email" value={email} onChange={(e)=>setEmail(e.target.value)} required onFocus={(e)=>e.target.classList.add('focus')} onBlur={(e)=>e.target.classList.remove('focus')} />
              <label>Password</label>
              <input type="password" aria-label="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              {error && <div className="input-error" role="alert">{error}</div>}
              <div className="form-row">
                <button type="submit" className="btn-primary">Login</button>
                <a href="#!" onClick={(ev)=>{ev.preventDefault(); setShowForgot(true)}} className="link">Forgot Password?</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h3>What students say</h3>
        <div className="test-grid">
          <blockquote>"StudyBuddy made group study fun!" — Ali</blockquote>
          <blockquote>"I can track syllabus progress easily." — Sara</blockquote>
          <blockquote>"Perfect for remote collaboration." — Ahmed</blockquote>
        </div>
      </section>

      <Modal isOpen={showForgot} onClose={()=>setShowForgot(false)} title="Reset password">
        <p>Mock reset instructions: check your institute email. (This is a demo app — no real emails.)</p>
      </Modal>
    </div>
  )
}

export default Landing
