// src/components/ChatPanel.jsx
import React, { useEffect, useRef, useState } from 'react'
import { fileToBase64 } from '../utils/helpers'
import Spinner from './Spinner'

const ChatPanel = ({ group, currentUserEmail, onSendMessage }) => {
  const [text, setText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [sending, setSending] = useState(false)
  const [chunks, setChunks] = useState([])
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [group.messages])

  // Request microphone permission and create media recorder
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Recording not supported in your browser.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      setMediaRecorder(mr)
      setChunks([])
      mr.ondataavailable = (e) => setChunks((c) => [...c, e.data])
      mr.start()
      setIsRecording(true)
    } catch (err) {
      console.error(err)
      alert('Microphone permission denied.')
    }
  }

  const stopRecording = () => {
    if (!mediaRecorder) return
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        sendMessage({ type: 'audio', audio: base64 })
      }
      reader.readAsDataURL(blob)
      setIsRecording(false)
      setMediaRecorder(null)
      setChunks([])
    }
    mediaRecorder.stop()
  }

  const onDrop = async (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) await handleFileUpload(f)
  }

  const handleFileUpload = async (file) => {
    setSending(true)
    try {
      const base64 = await fileToBase64(file)
      sendMessage({ type: 'image', image: base64 })
    } catch (e) {
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  const sendMessage = (payload) => {
    const message = {
      sender: currentUserEmail,
      ...payload
    }
    onSendMessage(message)
    setText('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    sendMessage({ type: 'text', text: text.trim() })
  }

  return (
    <div className="chat-panel" onDrop={onDrop} onDragOver={(e)=>e.preventDefault()} aria-live="polite">
      <div className="messages" role="log" aria-label="Chat messages">
        {group.messages.map((m) => (
          <div key={m.id} className={`msg ${m.sender === currentUserEmail ? 'mine' : 'their'}`}>
            <div className="msg-meta">{m.sender.split('@')[0]}</div>
            <div className="msg-body">
              {m.type === 'text' && <div className="msg-text">{m.text}</div>}
              {m.type === 'image' && <img src={m.image} alt="shared" className="msg-image" />}
              {m.type === 'audio' && (
                <audio controls src={m.audio} className="msg-audio" />
              )}
            </div>
            <div className="msg-time">{new Date(m.time).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit} aria-label="Send message form">
        <input aria-label="Message input" placeholder="Type a message and press Enter" value={text} onChange={(e)=>setText(e.target.value)} />
        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e)=>handleFileUpload(e.target.files[0])} />
        <div className="chat-actions">
          <button type="button" title="Upload image" onClick={()=>fileInputRef.current.click()} aria-label="Upload image">🖼</button>

          {isRecording ? (
            <button type="button" onClick={stopRecording} aria-label="Stop recording" className="recording-btn">■ Stop</button>
          ) : (
            <button type="button" onClick={startRecording} aria-label="Start recording">🎤</button>
          )}

          <button type="submit" aria-label="Send message" className="send-btn">{sending ? <Spinner /> : 'Send'}</button>
        </div>
      </form>
    </div>
  )
}

export default ChatPanel
