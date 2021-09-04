import React, { useState, useEffect } from 'react'
import { Message } from 'components/blocks/Message'
import { socket } from 'socket'
import {
  JOIN_ROOM,
  RECEIVE_MESSAGE,
  SENT_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  USER_ID,
} from 'constants'

const App = () => {
  const [newMessage, setNewMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const handleIncomingMessage = ({ message, from }) => {
    setChatHistory((prevState) => [
      ...prevState,
      { message, from, id: prevState.length },
    ])
  }

  const joinSocketRoom = () => {
    socket.emit(JOIN_ROOM, {
      room: 'room_name',
      id: USER_ID,
    })
    handleIncomingMessage({ message: `Hi, ${USER_ID}.` })
  }

  const handleUserConnect = (userId) => {
    handleIncomingMessage({ message: `${userId} connected` })
  }

  const handleUserDisconnect = (userId) => {
    handleIncomingMessage({ message: `${userId} disconnected` })
  }

  const addSocketListeners = () => {
    socket.on(RECEIVE_MESSAGE, handleIncomingMessage)
    socket.on(USER_CONNECTED, handleUserConnect)
    socket.on(USER_DISCONNECTED, handleUserDisconnect)
  }

  const removeSocketListeners = () => {
    socket.off(RECEIVE_MESSAGE, handleIncomingMessage)
    socket.off(USER_CONNECTED, handleUserConnect)
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
      <input
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      <button type="button" onClick={handleSentMessage}>
        Sent
      </button>
      <div>
        {chatHistory.map(({ id, message, from }) => (
          <Message key={id} from={from}>
            {message}
          </Message>
        ))}
      </div>
    </div>
  )
}

export { App }
