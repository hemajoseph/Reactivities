import { SearchOff } from '@mui/icons-material'
import { Button, Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

function NotFound() {
  return (
    <Paper sx={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', p:6}}>
        <SearchOff sx={{fontSize: 100}}  color="primary"/>
        <Typography gutterBottom variant="h3">Ooooops Not Found</Typography>
        <Button fullWidth component={Link} to='/activities'>
            Return to activitieeeeees
        </Button>
    </Paper>
  )
}

export default NotFound