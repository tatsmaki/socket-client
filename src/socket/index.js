import { io } from 'socket.io-client'

const socket = io(process.env.API, {
  transports: ['websocket'],
})

export { socket }
