import { Box, Avatar, Typography } from '@mui/material'
import Markdown from 'markdown-to-jsx'
import './markdownStyles.css'
import { useEffect, useState } from 'react'
interface MessageProps {
  text: string
  time: string
  sender: string
  isUser: boolean
  texting?: boolean
}

const Message = ({
  text: propsText,
  time,
  sender,
  isUser,
  texting = false,
}: MessageProps) => {
  const [text, setText] = useState(isUser ? propsText : propsText.slice(0, 5))

useEffect(() => {
  if (isUser === false) {
    let i = 1
    const interval = setInterval(() => {
      setText(() => {
        const newText = propsText.slice(0, (i + 1) * 5)
        if (propsText.length <= newText.length) {
          clearInterval(interval)
        }
        i++
        return newText
      })
    }, 100)
  }
}, [isUser, propsText])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        mb: 2,
      }}
    >
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
        {!isUser && (
          <Typography variant="caption" sx={{ mb: 0.5 }}>
            {sender}
          </Typography>
        )}
        <Box
          sx={{
            backgroundColor: isUser ? '#3f4ef4' : '#e5f3ff',
            color: isUser ? '#fff' : '#000',
            p: 1,
            borderRadius: 2,
            maxWidth: '95%',
          }}
        >
          {texting ? (
            <div className="loader"></div>
          ) : isUser ? (
            <Typography variant="body2">{text}</Typography>
          ) : (
            <Markdown className="markdown-body">{text}</Markdown>
          )}
        </Box>
        <Typography variant="caption" sx={{ mt: 0.5, color: 'gray' }}>
          {time}
        </Typography>
      </Box>
    </Box>
  )
}

export default Message
