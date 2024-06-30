import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// Компонент заголовка
const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ height: '150px', backgroundColor: '#3f4ef4' }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Логотип */}
          <Avatar
            src="/path/to/logo.png"
            alt="RuBot"
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {/* Основной заголовок/название сайта */}
            <Typography variant="h6">RuBot</Typography>
            {/* Текст под заголовком */}
            <Typography variant="body2">
              Это чат-бот котрый ответит на ваши вопросы по документации RuStore
            </Typography>
          </Box>
          {/* Кнопка закрытия */}
          <IconButton color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
