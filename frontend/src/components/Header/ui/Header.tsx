import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import {
  Select,
  MenuItem,
  Box,
  Hidden,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const Header = ({ toggleTheme }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const hrefs = [
    {
      title: 'Документация пользователей',
      href: 'https://www.rustore.ru/help/users/about-rustore',
    },
    {
      title: 'Документация разработчиков',
      href: 'https://www.rustore.ru/help/developers/',
    },
    {
      title: 'RuStore SDK',
      href: 'https://www.rustore.ru/help/sdk/',
    },
    {
      title: 'RuStore API',
      href: 'https://www.rustore.ru/help/work-with-rustore-api/',
    },
    {
      title: 'Сценарии использования',
      href: 'https://www.rustore.ru/help/guides/',
    },
  ]

  const menuItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {hrefs.map(({ title, href }) => (
          <ListItem button key={title} component="a" href={href}>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 2 }}
          >
            {/* <img src="https://path-to-your-logo" alt="RuStore Logo" style={{ height: '30px' }} /> */}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 0, marginRight: 4 }}>
            RuStore
          </Typography>
          <Hidden mdDown>
            {hrefs.map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                color="inherit"
                underline="none"
                sx={{
                  fontSize: '0.875rem',
                  marginLeft: 2,
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {title}
              </Link>
            ))}
          </Hidden>
          <Box sx={{ flexGrow: 1 }} />
          <Hidden smDown>
            <Select
              value="Русский"
              disableUnderline
              sx={{
                color: 'white',
                marginLeft: 2,
                marginRight: 2,
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                },
                '.MuiSelect-icon': {
                  color: 'white',
                },
              }}
            >
              <MenuItem value="Русский">Русский</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </Select>
            <IconButton sx={{ color: 'white' }}>
              <SearchIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }} onClick={toggleTheme}>
              <Brightness4Icon />
            </IconButton>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
      </Drawer>
    </Box>
  )
}

export default Header
