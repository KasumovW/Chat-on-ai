import { Grid } from '@mui/material'
import { Chat } from 'components/Chat'
import { Header } from 'components/Header'
import { Sent } from 'components/Sent'


function App() {
  return (
    <Grid direction={'column'} container height={'100vh'}>
      <Header />
      <Chat />
      <Sent />
    </Grid>
  )
}

export default App
