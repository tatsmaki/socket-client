import React from 'react'
import { USER_ID } from 'constants'
import { StyledMessage, StyledMessageOwner } from './styles'

const Message = ({ children, from }) => {
  const isMyMessage = from === USER_ID

  return (
    <StyledMessage isMyMessage={isMyMessage}>
      <span>{children}</span>
      <StyledMessageOwner>{!isMyMessage && from}</StyledMessageOwner>
    </StyledMessage>
  )
}

export { Message }
