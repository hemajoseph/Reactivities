import React from 'react'  
import { Card, CardActions, CardContent, CardMedia,Button,Typography } from '@mui/material'

type Props = {activity: Activity, 
  cancelSelectActivity: () => void
  openForm: (id?: string) => void
}

function ActivityDetail({activity,cancelSelectActivity,openForm}:Props) { //Created using RFCE snippet
  return (
    <Card sx={{borderradius: 3}}>
        <CardMedia component='img' src={`/images/categoryImages/${activity.category}.jpg`} />
        <CardContent>
            <Typography variant="h5" color="text.secondary">{activity.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{activity.date} / {activity.venue}</Typography>
            <Typography variant="body1" color="text.secondary">{activity.description}</Typography>
           
       </CardContent>
        <CardActions >  
            <Button onClick={() => openForm(activity.id)} size="medium" color="primary" >Edit</Button>
            <Button onClick={cancelSelectActivity} size="medium" color="inherit" >Cancel</Button>    
        </CardActions>
    </Card>
  )
}

export default ActivityDetail