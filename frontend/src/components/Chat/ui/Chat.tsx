import Message from './components/Message'
import { Grid } from '@mui/material'

const Chat = () => {
  return (
    <Grid flex={1} item sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
      <Message
        text="Hello, how are you doing?"
        time="08:15 AM"
        sender="User"
        isUser={true}
      />
      <Message
        text="I'm doing well, thank you! How can I help you today?"
        time="08:16 AM"
        sender="Assistant"
        isUser={false}
      />
      <Message
        text="I have a question about the return policy for a product I purchased."
        time="Just Now"
        sender="User"
        isUser={true}
      />
      <Message text="..." time="" sender="Assistant" isUser={false} />
    </Grid>
  )
}

export default Chat
