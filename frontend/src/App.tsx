import { Grid } from '@mui/material'
import { Chat } from 'components/Chat'
import { Header } from 'components/Header'
import { Sent } from 'components/Sent'
import { useMessages } from 'hooks/useMessages'

function App() {
  const { askQuestion, messages, isLoading } = useMessages()

  return (
    <Grid direction={'column'} m={'auto'} container height={'100vh'}>
      <Header toggleTheme />
      <Chat isTexting={isLoading} messages={messages} />
      <Sent {...{ askQuestion, isLoading }} />
    </Grid>
  )
}

export default App
