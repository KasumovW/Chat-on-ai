import { Box, TextField, IconButton, InputAdornment } from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'

// Компонент ввода сообщения
const Sent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      {/* Иконка эмодзи */}
      <IconButton>
        <EmojiEmotionsIcon />
      </IconButton>

      {/* Поле ввода текста */}
      <TextField
        placeholder="Reply..."
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, marginX: '8px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* Иконка прикрепления файла */}
              <IconButton>
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Кнопка отправки */}
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default Sent
