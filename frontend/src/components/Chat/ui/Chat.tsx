import { IMessage } from 'hooks/useMessages'
import Message from './components/Message'
import { Grid } from '@mui/material'
import { useEffect, useRef } from 'react'

interface ChatProps {
  messages: IMessage[]
  isTexting: boolean
}

const Chat = ({ messages = [], isTexting }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Grid flex={1} item sx={{ p: 2, overflowY: 'auto' }}>
      {messages.map(({ message, time, isUser }, index) => (
        <Message
          key={index}
          text={message.answer}
          time={time}
          sender={isUser ? 'User' : 'Assistant'}
          isUser={isUser}
        />
      ))}
      {isTexting && (
        <Message texting text="..." time="" sender="Assistant" isUser={false} />
      )}
      <div ref={messagesEndRef} />
    </Grid>
  )
}

export default Chat
