// src/components/Spinner.jsx
import React from 'react'

const Spinner = ({ size = 24 }) => (
  <div className="spinner" style={{ width: size, height: size }} aria-hidden="true"></div>
)

export default Spinner
