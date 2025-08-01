
import {Box,Typography} from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../lib/hooks/useActivities';

function ActivityList() {
  const {activities, isLoading } = useActivities();
     if (isLoading) return (<Typography>Loadingg...</Typography> )  
      if (!activities) return (<Typography>No activities found</Typography> ) 
         
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
          {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
          ))}  
    </Box>
  )
}

export default ActivityList