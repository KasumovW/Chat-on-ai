import { IMessage } from 'hooks/useMessages'
import Message from './components/Message'
import { Grid } from '@mui/material'

interface ChatProps {
  messages: IMessage[]
  isTexting: boolean
}

const Chat = ({ messages = [], isTexting }: ChatProps) => {
  return (
    <Grid flex={1} item sx={{ p: 2, overflowY: 'auto' }}>
      {messages.map(({ message, time, isUser }) => (
        <Message
          text={message.answer}
          time={time}
          sender={isUser ? 'User' : 'Assistant'}
          isUser={isUser}
        />
      ))}
      {isTexting && <Message texting text="..." time="" sender="Assistant" isUser={false} />}
    </Grid>
  )
}

export default Chat
