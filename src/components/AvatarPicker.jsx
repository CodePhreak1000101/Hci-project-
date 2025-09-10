// src/components/AvatarPicker.jsx
import React from 'react'

const ICONS = ['A','B','C','📚','✏️','🧪','🔬','🧮','📐','🧾','💡','🪄']

const AvatarPicker = ({ value, onChange }) => {
  return (
    <div className="avatar-picker" role="listbox" aria-label="Choose avatar">
      {ICONS.map((ic) => (
        <button key={ic} className={`avatar-option ${value === ic ? 'selected' : ''}`} onClick={() => onChange(ic)} aria-pressed={value === ic}>
          {ic}
        </button>
      ))}
    </div>
  )
}

export default AvatarPicker
