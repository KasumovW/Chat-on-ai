import {
  AppBar,
  Toolbar,
} from '@mui/material'

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ height: '37.5px', backgroundColor: '#07f' }}
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
       
      </Toolbar>
    </AppBar>
  )
}

export default Header
