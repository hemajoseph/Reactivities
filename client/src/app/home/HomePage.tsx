import { Group } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router';
import Paper from '@mui/material/Paper';

export default function HomePage() {
  return (
    <Paper sx={
        {
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            alignItems: 'center', 
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundImage: 'linear-gradient(135deg,rgba(24, 42, 115, 0.75) 0%, #218aae 69%, #20a7ac 89%)'

        }}>
    
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', gap: 3, color: 'white`'}}>
          <Group sx={{height: 100, width: 100}} fontSize='large' />
          <Typography variant='h1'>
            Reactivities
          </Typography>
          <Typography variant='h1'>
            Welcome to Reactivities
          </Typography>
          <Button component={Link} to='/activities' variant='contained' size='large' sx={{height: 80, borderRadius: 4,fontSize: '1.5rem'}}>
            Take me to the activities!
          </Button>
      </Box>
    </Paper>
  )
}
