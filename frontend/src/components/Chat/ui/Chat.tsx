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
    <Grid
      flex={1}
      justifyContent={"center"}
      container
      sx={{ overflowY: "auto" }}
    >
      <Grid item sx={{ p: 2, maxWidth: "768px", width: "100%" }}>
        {messages.map((item, index) => {
          const { time, isUser } = item;
          return (
            <Message
              messageProps={item}
              key={index}
              time={time}
              sender={isUser ? "User" : "Assistant"}
              isUser={isUser}
            />
          );
        })}
        {isTexting && (
          <Message
            texting
            messageProps={{ message: "", time: "", isUser: false }}
            time=""
            sender="Assistant"
            isUser={false}
          />
        )}
        <div ref={messagesEndRef} />
      </Grid>
    </Grid>
  )
}

export default Chat
