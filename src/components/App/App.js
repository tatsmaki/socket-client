import React, { useState, useEffect } from 'react'
import { socket } from 'socket'
import { JOIN_ROOM, RECEIVE_MESSAGE, SENT_MESSAGE } from 'constants'

const App = () => {
  const [newMessage, setNewMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const handleIncomingMessage = (incomingMessage) => {
    setChatHistory((prevState) => ({
      ...prevState,
      incomingMessage,
    }))
  }

  const addSocketListeners = () => {
    socket.emit(JOIN_ROOM, 'room_name')
    socket.on(RECEIVE_MESSAGE, handleIncomingMessage)
  }

  const removeSocketListeners = () => {
    socket.off(RECEIVE_MESSAGE, handleIncomingMessage)
  }

  useEffect(() => {
    addSocketListeners()
    return () => removeSocketListeners()
  }, [])

  const handleSentMessage = () => {
    socket.emit(SENT_MESSAGE, newMessage)
  }

  return (
    <div>
      <div>
        {chatHistory.map((chatMessage) => (
          <span>{chatMessage}</span>
        ))}
      </div>
      <input value={newMessage} onChange={setNewMessage} />
      <button type="button" onClick={handleSentMessage}>
        Sent
      </button>
    </div>
  )
}

export { App }
