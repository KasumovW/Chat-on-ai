import { TextField, IconButton, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

// Компонент ввода сообщения
const Sent = () => {
  return (
    <Grid
      container
      alignItems={'center'}
      p={1}
      bgcolor={'#fff'}
      width={'100%'}
      borderTop={'1px solid #e0e0e0'}
    >
      <TextField
        placeholder="Reply..."
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, marginX: '8px' }}
      />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Grid>
  )
}

export default Sent
