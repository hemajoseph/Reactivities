import { Paper, Typography,Box ,Button,TextField} from '@mui/material'
import { FormEvent } from 'react'


type Props = {
  closeForm: () => void  
  activity?: Activity
  submitForm: (activity: Activity) => void
}

function ActivityForm({closeForm,activity,submitForm}: Props) {
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const formData  = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    }); 
    
    if (activity)  data.id = activity.id;
    console.log(data);
    submitForm(data as unknown as Activity);
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
           <TextField name='date' label='Date' type='datetime' defaultValue={activity ? activity.date : ''} /> 
           <TextField name='city' label='City' defaultValue={activity ? activity.city : ''} /> 
           <TextField name='venue' label='Venue' defaultValue={activity ? activity.venue : ''}/> 
           <Box display='flex' justifyContent='end' gap={3}>
                <Button color='inherit' onClick={closeForm}>Cancel</Button>
                <Button type="submit" variant='contained' color='success'>Submit</Button>
           </Box>
        </Box>
    </Paper>
  )
}

export default ActivityForm