
import { Card, CardActions, CardContent, CardMedia,Button,Typography, Grid } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';
import ActivityDetailsChat from './ActivityDetailsChat';

/* type Props = {
  selectedActivity: Activity, 
  cancelSelectActivity: () => void
  openForm: (id?: string) => void
}
 */
function ActivityDetailPage(/* {selectedActivity,cancelSelectActivity,openForm}:Props */) { //Created using RFCE snippet
  //const {activities} = useActivities();
  //const activity = activities?.find((x) => x.id === selectedActivity.id);
  
  const navigate = useNavigate();
  const {id}= useParams();
  const {activity, isLoadingActivity} = useActivities(id);

  if(isLoadingActivity) return <Typography>Loading</Typography>
  if(!activity) return <Typography>Activity Not Found</Typography>
  
  return (
    <Grid container spacing={3}>
        <Grid size={8}>
          <ActivityDetailsHeader activity={activity} />
          <ActivityDetailsInfo activity={activity} />
          <ActivityDetailsChat />
        </Grid>
        <Grid size={4}>
          <ActivityDetailsSidebar />
         
        </Grid>
    </Grid>
  )
}

export default ActivityDetailPage