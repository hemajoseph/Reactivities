
import { Card, CardActions, CardContent, CardMedia,Button,Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';

/* type Props = {
  selectedActivity: Activity, 
  cancelSelectActivity: () => void
  openForm: (id?: string) => void
}
 */
function ActivityDetail(/* {selectedActivity,cancelSelectActivity,openForm}:Props */) { //Created using RFCE snippet
  //const {activities} = useActivities();
  //const activity = activities?.find((x) => x.id === selectedActivity.id);
  
  const navigate = useNavigate();
  const {id}= useParams();
  const {activity, isLoadingActivity} = useActivities(id);

  if(isLoadingActivity) return <Typography>Loading</Typography>
  if(!activity) return <Typography>Activity Not Found</Typography>
  
  return (
    <Card sx={{borderradius: 3}}>
        <CardMedia component='img' src={`/images/categoryImages/${activity.category}.jpg`} />
        <CardContent>
            <Typography variant="h5" color="text.secondary">{activity.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">{activity.date} / {activity.venue}</Typography>
            <Typography variant="body1" color="text.secondary">{activity.description}</Typography>
           
       </CardContent>
        <CardActions >  
            <Button component={Link} to={`/manage/${activity.id}`} size="medium" color="primary" >Edit</Button>
            <Button onClick={()=> navigate('/activities')} size="medium" color="inherit" >Cancel</Button>    
        </CardActions>
    </Card>
  )
}

export default ActivityDetail