import styled from 'styled-components'

export const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 5px;
  margin: 5px;
  font-size: 16px;
  border-radius: 8px;
  box-shadow: 0 0 2px gray;
  margin-left: ${({ isMyMessage }) => (isMyMessage ? 'auto' : '5px')};
`

export const StyledMessageOwner = styled.span`
  font-size: 12px;
  color: gray;
`
