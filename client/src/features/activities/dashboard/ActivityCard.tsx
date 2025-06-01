import React from 'react'
import { Card,CardContent,Typography,CardActions,Chip,Button, Box } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities';
import { Link } from 'react-router';

type Props = {
  activity: Activity
}   

function ActivityCard({activity}:Props) {
  const {deleteActivity} = useActivities();
  
  console.log(`Title: ${activity.title} `);
  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
            <Typography variant="h5" color="text.secondary">{activity.title}</Typography>
            <Typography variant="body2" color="text.secondary">{activity.date}</Typography>
            <Typography variant="body2">{activity.description}</Typography>
            <Typography variant="subtitle1">{activity.city} / {activity.venue}</Typography>
         </CardContent> 
         <CardActions sx={{display:'flex', justifyContent:'space-between'}}>  
            <Chip label={activity.category} variant="outlined" />
            <Box display='flex' gap={1}>
              <Button component={Link} to={`/activities/${activity.id}`} size="medium" variant="contained" >View</Button>
              <Button onClick={() => deleteActivity.mutate(activity.id)} color='error' 
              size="medium" 
              variant="contained" 
              disabled = {deleteActivity.isPending}
              >DELETE</Button>
            </Box>
         </CardActions>
    </Card>
  )
}

export default ActivityCard