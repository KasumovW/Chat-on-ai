'use client'

import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import {
  Box,
  Hidden,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { Logo } from '@/assets/Logo'

const Header = ({ toggleTheme }: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: any) => (event: any) => {
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
          <Logo />

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
