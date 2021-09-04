import randomWords from 'random-words'

export const JOIN_ROOM = 'join_room'
export const RECEIVE_MESSAGE = 'receive_message'
export const SENT_MESSAGE = 'sent_message'
export const USER_CONNECTED = 'user_connected'
export const USER_DISCONNECTED = 'user_disconnected'

export const USER_ID = randomWords({ exactly: 2, join: '' })
