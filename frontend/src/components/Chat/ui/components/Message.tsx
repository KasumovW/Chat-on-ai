import { Box, Avatar, Typography } from '@mui/material'

interface MessageProps {
  text: string
  time: string
  sender: string
  isUser: boolean
}

const Message = ({ text, time, sender, isUser }: MessageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        mb: 2,
      }}
    >
      {/* Аватар */}
      {!isUser && (
        <Avatar
          src="/path/to/avatar.jpg"
          alt="Avatar"
          sx={{ width: 40, height: 40, mr: 1 }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Имя отправителя */}
        {!isUser && (
          <Typography variant="caption" sx={{ mb: 0.5 }}>
            {sender}
          </Typography>
        )}
        {/* Текст сообщения */}
        <Box
          sx={{
            backgroundColor: isUser ? '#3f4ef4' : '#e5f3ff',
            color: isUser ? '#fff' : '#000',
            p: 1,
            borderRadius: 2,
            maxWidth: '300px',
          }}
        >
          <Typography variant="body2">{text}</Typography>
        </Box>
        {/* Время отправки */}
        <Typography variant="caption" sx={{ mt: 0.5, color: 'gray' }}>
          {time}
        </Typography>
      </Box>
    </Box>
  )
}

export default Message
