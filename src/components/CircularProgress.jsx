// src/components/CircularProgress.jsx
import React from 'react'

const CircularProgress = ({ size = 200, stroke = 12, percentage = 0 }) => {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="c-progress" role="img" aria-label={`${percentage}% covered`}>
      <defs>
        <linearGradient id="progressGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#28A745" />
          <stop offset="100%" stopColor="#7AF078" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size/2},${size/2})`}>
        <circle cx="0" cy="0" r={radius} stroke="#eee" strokeWidth={stroke} fill="none" />
        <circle
          cx="0"
          cy="0"
          r={radius}
          stroke="url(#progressGrad)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
        <text x="0" y="5" textAnchor="middle" fontSize={size * 0.18} fontWeight="700" fill="#333">{percentage}%</text>
      </g>
    </svg>
  )
}

export default CircularProgress
