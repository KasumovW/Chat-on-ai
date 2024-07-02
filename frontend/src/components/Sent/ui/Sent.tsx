import { TextField, IconButton, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { FormEventHandler, useState } from 'react'

interface SentProps {
  askQuestion: (text: string) => void
}

const Sent = ({ askQuestion }: SentProps) => {
  const [value, setValue] = useState('')
  const sendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    askQuestion(value)
    setValue('')
  }

  return (
    <Grid
      container
      alignItems={'center'}
      p={1}
      bgcolor={'#fff'}
      width={'100%'}
      borderTop={'1px solid #e0e0e0'}
    >
      <form
        style={{
          flexGrow: 1,
          display: 'flex',
        }}
        onSubmit={sendMessage}
      >
        <TextField
          placeholder="Reply..."
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ flexGrow: 1, marginX: '8px' }}
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </form>
    </Grid>
  )
}

export default Sent
