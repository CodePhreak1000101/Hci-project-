// src/pages/NotFound.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setCount(c => c - 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (count <= 0) navigate('/dashboard')
  }, [count, navigate])

  return (
    <div className="notfound">
      <div className="illustration">🤔</div>
      <h2>Oops! Page not found.</h2>
      <p>Redirecting to dashboard in {count} seconds...</p>
      <button className="btn" onClick={() => navigate('/dashboard')}>Go to Dashboard now</button>
    </div>
  )
}

export default NotFound
