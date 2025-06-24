import { Divider, Paper, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router';

function ServerError() {
const {state} = useLocation();
const error = state?.error;
console.log('Logging ma err: ' + error);
  return (
    <Paper>
        {error ? (
            <>
            <Typography gutterBottom variant="h3" color="secondary">
                {error.message || "There has been an error(default)"}
            </Typography>
            <Divider/>
           <Typography gutterBottom variant="body1" color="secondary">
                {error.details || "Internal Server error(default)"}
            </Typography>
            </>
            ) : 
            <Typography gutterBottom variant="h5" color="secondary">
                Server Error
            </Typography>
    }
    </Paper>
  )
}

export default ServerError