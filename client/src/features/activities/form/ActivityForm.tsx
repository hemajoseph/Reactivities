import { Paper, Typography,Box ,Button,TextField} from '@mui/material'
import { FormEvent } from 'react'
import { useActivities } from '../../../lib/hooks/useActivities'
import { useNavigate, useParams } from 'react-router';

function ActivityForm() {
  const {id} = useParams();
  const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => 
  {
      event.preventDefault(); 
      const formData  = new FormData(event.currentTarget);
      const data: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        data[key] = value;
      }); 
      
      if (activity) {
        data.id = activity.id;
        await updateActivity.mutateAsync(data as unknown as Activity);
        navigate(`/activities/${activity.id}`);
      
      } else {
        await createActivity.mutate(data as unknown as Activity, {
          onSuccess: (id) => {
            console.log('Returned ID:', id);
                        navigate(`/activities/${id}`)
                    }     
          });
      
      }
      //console.log(data);
      //submitForm(data as unknown as Activity);
  }

  if (isLoadingActivity) return <Typography>Loading activity...</Typography>;

  return (
    <Paper>
        <Typography variant="h5" gutterBottom color="primary">
            {activity ? 'Edit Activity' : 'Create Activity'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
           <TextField name='title' label='Title' defaultValue={activity ? activity.title : ''} /> 
           <TextField name='description' label='Description' defaultValue={activity ? activity.description : ''} /> 
           <TextField name='category' label='Category'  defaultValue={activity ? activity.category : ''}/> 
           <TextField name='date' label='Date' type='date' 
              defaultValue={activity?.date 
                ? new Date(activity.date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
              } 
            /> 
           <TextField name='city' label='City' defaultValue={activity ? activity.city : ''} /> 
           <TextField name='venue' label='Venue' defaultValue={activity ? activity.venue : ''}/> 
           <Box display='flex' justifyContent='end' gap={3}>
                <Button color='inherit'>Cancel</Button>
                <Button type="submit" variant='contained' color='success' disabled={updateActivity.isPending}>Submit</Button>
           </Box>
        </Box>
    </Paper>
  )
}

export default ActivityForm