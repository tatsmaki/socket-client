import React, { useState, useEffect } from 'react'
import { socket } from 'socket'
import {
  JOIN_ROOM,
  RECEIVE_MESSAGE,
  SENT_MESSAGE,
  USER_DISCONNECTED,
} from 'constants'

const App = () => {
  const [newMessage, setNewMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const joinSocketRoom = () => {
    socket.emit(JOIN_ROOM, { room: 'room_name', id: Math.random() })
  }

  const handleIncomingMessage = (incomingMessage) => {
    setChatHistory((prevState) => [...prevState, incomingMessage])
  }

  const handleUserDisconnect = (userId) => {
    handleIncomingMessage(`${userId} disconnected`)
  }

  const addSocketListeners = () => {
    socket.on(RECEIVE_MESSAGE, handleIncomingMessage)
    socket.on(USER_DISCONNECTED, handleUserDisconnect)
  }

  const removeSocketListeners = () => {
    socket.off(RECEIVE_MESSAGE, handleIncomingMessage)
    socket.off(USER_DISCONNECTED, handleUserDisconnect)
  }

  useEffect(() => {
    joinSocketRoom()
    addSocketListeners()
    return () => removeSocketListeners()
  }, [])

  const handleSentMessage = () => {
    socket.emit(SENT_MESSAGE, newMessage)
    setNewMessage('')
  }

  return (
    <div>
      <div>
        {chatHistory.map((chatMessage) => (
          <div>{chatMessage}</div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      <button type="button" onClick={handleSentMessage}>
        Sent
      </button>
    </div>
  )
}

export { App }
