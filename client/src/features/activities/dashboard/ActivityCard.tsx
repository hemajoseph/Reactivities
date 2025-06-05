import { Card,CardContent,Typography,Chip,Button, Box, CardHeader, Avatar, Divider } from '@mui/material'
import { Link } from 'react-router';
import { AccessTime, Place } from '@mui/icons-material';

import { formatDate } from '../../../lib/util/util';

type Props = {
  activity: Activity
}   

function ActivityCard({activity}:Props) {
  //const {deleteActivity} = useActivities();

  const isHost = false;
  const isGoing = false;
  const label = isHost ? 'You are hosting this activity' : 'You are going to this activity'; 
  const isCancelled = false;
  const color = isHost ? 'Secondary' : isGoing ? 'warning' : 'default';
  
  return (
    <Card elevation={3} sx={{borderRadius: 3}}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
          <CardHeader avatar={<Avatar sx={{height: 80, width:80}}/>} title={activity.title}
            titleTypographyProps={{fontWeight: 'bold', fontSize: 20}}
            subheader={<>Hosted by {' '} <Link to={'/profiles/bob'} >Bob</Link></>}
          />
      
          <Box display='flex' flexDirection='column' gap={2}>
            { (isHost || isGoing) && <Chip label={label} color={color} sx={{borderRadius: 2}} /> }
            {isCancelled && <Chip label='This activity has been cancelled' color='error' sx={{borderRadius: 2}} />}
            
          </Box>
       </Box>
      <Divider sx={{mb: 3}} />

        <CardContent>
          <Box display='flex' alignItems='center' mb={2} px={2}>
              <Box display={'flex'} alignItems='center' sx={{flexGrow: 0}}>
                <AccessTime sx={{mr: 1}} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {formatDate(activity.date)}
                </Typography>
              </Box>
              <Place sx={{ml: 3, mr: 1}} />
             
              <Typography variant="body2">{activity.venue}</Typography>
          
          </Box>
          <Divider />
          <Box display='flex' gap={2} sx={{backgroundColor: 'grey.200', py: 3, pl:3}}>
              Attendies go here  
          </Box>
         </CardContent> 
         <CardContent sx={{pb: 2}}>  
            <Typography variant="body2">{activity.description}</Typography>
           
              <Button 
                  component={Link} to={`/activities/${activity.id}`} 
                  size="medium" 
                  variant="contained"
                  sx={{display: 'flex', justifySelf: 'self-end', borderRadius: 3}} > {/*alighned the View button to the right*/}
                    View
              </Button>
                       
         </CardContent>
    </Card>
  )
}

export default ActivityCard