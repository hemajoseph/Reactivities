
import { AppBar, Toolbar,  Typography, Button,Box,Container, MenuItem } from '@mui/material'
import {Group} from '@mui/icons-material';
import React from 'react'

type Props = {
  openForm: () => void 
}

const NavBar = ({openForm}: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" sx={{backgroundImage: 'linear-gradient(135deg,rgba(24, 42, 115, 0.75) 0%, #218aae 69%, #20a7ac 89%)'}}>
      <Container maxWidth="xl">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
           <Box>
              <MenuItem sx={{display:'flex, gap: 2'}}>
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight='bold'>Reactivities</Typography>
              </MenuItem>
            </Box>
            <Box sx={{display: 'flex'}}>
             <MenuItem sx={{fontSize: '1.2rem', textTransform: 'upperCase', fontWeight: 'bold'}}>
             Activities
            </MenuItem>

            <MenuItem sx={{fontSize: '1.2rem', textTransform: 'upperCase', fontWeight: 'bold'}}>
             About
            </MenuItem>

            <MenuItem sx={{fontSize: '1.2rem', textTransform: 'upperCase', fontWeight: 'bold'}}>
             Contact
            </MenuItem>
            </Box>
            <Button size="large" variant="contained" color="warning" onClick={openForm} >Create activity </Button>
           
        </Toolbar>
        </Container>
    </AppBar>
    </Box>
  )
}

export default NavBar