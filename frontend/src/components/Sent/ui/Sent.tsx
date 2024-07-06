import { TextField, IconButton, Grid, Typography } from '@mui/material'
import { FormEventHandler, useState } from 'react'
import SendIcon from '@mui/icons-material/ArrowForwardRounded'
interface SentProps {
  askQuestion: (text: string) => void
  isLoading: boolean
}

const Sent = ({ askQuestion, isLoading }: SentProps) => {
  const [value, setValue] = useState('')
  const sendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    askQuestion(value)
    setValue('')
  }

  return (
    <Grid container alignItems={'center'} p={1} width={'100%'}>
      <form
        style={{
          flex: 1,
          display: 'flex',
          maxWidth: '768px',
          margin: '0 auto',
        }}
        onSubmit={sendMessage}
      >
        <TextField
          multiline
          maxRows={5}
          variant="standard"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText=""
          sx={{
            flexGrow: 1,
            marginX: '8px',
            borderRadius: '26px',
            padding: '6px',
            boxShadow:
              '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
          }}
          InputProps={{
            startAdornment: <div style={{ margin: '0 10px' }} />,
            endAdornment: (
              <IconButton
                disabled={isLoading}
                type="submit"
                color="primary"
                sx={{ marginTop: 'auto' }}
              >
                <SendIcon />
              </IconButton>
            ),
            disableUnderline: true,
          }}
        />
      </form>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mt: 1, textAlign: 'center', width: '100%', fontSize: "0.67rem" }}
      >
        Важно: Система может не найти ваш вопрос и выдать неправильную ссылку, в
        таком случае обращайтесь в службу технической поддержки
      </Typography>
    </Grid>
  )
}

export default Sent
