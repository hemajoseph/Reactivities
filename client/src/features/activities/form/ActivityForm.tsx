import { Paper, Typography,Box ,Button,TextField} from '@mui/material'
import { FormEvent } from 'react'
import { useActivities } from '../../../lib/hooks/useActivities'


type Props = {
  closeForm: () => void  
  activity?: Activity
}

function ActivityForm({closeForm,activity}: Props) {
  const {updateActivity, createActivity} = useActivities();
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const formData  = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    }); 
    
    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }
    //console.log(data);
    //submitForm(data as unknown as Activity);
  }

  return (
    <Paper>
        <Typography variant="h5" gutterBottom color="primary">
            Create activity
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
                <Button color='inherit' onClick={closeForm}>Cancel</Button>
                <Button type="submit" variant='contained' color='success' disabled={updateActivity.isPending}>Submit</Button>
           </Box>
        </Box>
    </Paper>
  )
}

export default ActivityForm