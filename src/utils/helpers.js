// src/utils/helpers.js
export const uid = (prefix = '') =>
  prefix + Math.random().toString(36).slice(2, 9)

export const emailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
