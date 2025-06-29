import { Paper, Typography,Box ,Button} from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import {activitySchema, ActivitySchema} from '../../../lib/schemas/activitySchema';
import {zodResolver} from '@hookform/resolvers/zod';
import TextInput from '../../../app/shared/components/TextInput';
import SelectInput from '../../../app/shared/components/SelectInput';
import { categoryOptions } from './categoryOptions';
import LocationInput from '../../../app/shared/components/LocationInput';
import DateTimeInput from '../../../app/shared/components/DateTimeInput';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function ActivityForm() {
  const {control, reset, handleSubmit} = useForm<ActivitySchema>({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema)
  });
  const {id} = useParams();
  const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (activity) reset({
      ...activity,
      location: {
        city: activity.city,
        venue: activity.venue,
        latitude: activity.latitude,
        longitude: activity.longitude 
      }
    });
   }, [activity, reset]);
  //IF activity changes, reset the form with the new activity data
  
  const onError = (errors) => {
      console.error("Validation Errors:", errors);
  }

  const onSubmit = async (data: ActivitySchema) => 
  {
    console.log("submission",data);
    const {location, ...rest} = data; // Destructure location from data
    const flattenedData = {...rest, ...location}; // Flatten the data object

    try{
      if(activity) {
        console.log("Updating activity", activity.id);
        console.log("Flattened Data", flattenedData);
        console.log("Activity Data", activity);
        
         updateActivity.mutate({...activity, ...flattenedData},{
            onSuccess: () => navigate (`/activities/${activity.id}`), // Navigate to the activity details page on success 
          })
       
      } else {
         createActivity.mutate(flattenedData,{
          onSuccess: (id) => navigate(`/activities/${id}`) // Navigate to the new activity details page on success
        })
      }
    }catch (error) {
        console.error('Error submitting activity:', error); 
    }
     
  }

  if (isLoadingActivity) return <Typography>Loading activity...</Typography>;

  return (
    <Paper>
        <Typography variant="h5" gutterBottom color="primary">
            {activity ? 'Edit Activity' : 'Create Activity'}
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit,onError)} display='flex' flexDirection='column' gap={3}>
           <TextInput label='Title' control={control} name='title'/>
           <TextInput label='Description' control={control} name='description' multiline rows={3}/>
           <Box display='flex' gap={3}>
            <SelectInput items={categoryOptions} label='Category' control={control} name='category'/>
            <DateTimeInput label='Date' control={control} name='date'></DateTimeInput>
          </Box>
            {/* <TextField {...register('category')} label='Category' defaultValue={activity ? activity.category : ''} /> */}
           <LocationInput label='Enter the loction' control={control} name='location'/>

           {/* <TextField {...register('title')} label='Title' defaultValue={activity ? activity.title : ''} 
              error={!!errors.title} helperText={errors.title?.message} /> 
           <TextField {...register('description')} label='Description' defaultValue={activity ? activity.description : ''} /> 
           <TextField {...register('category')} label='Category'  defaultValue={activity ? activity.category : ''}/> 
           <TextField {...register('date')} label='Date' type='date' 
              defaultValue={activity?.date 
                ? new Date(activity.date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
              } 
            /> 
           <TextField {...register('city')} label='City' defaultValue={activity ? activity.city : ''} /> 
           <TextField {...register('venue')} label='Venue' defaultValue={activity ? activity.venue : ''}/>  */}
           <Box display='flex' justifyContent='end' gap={3}>
                <Button color='inherit'>Cancel</Button>
                <Button type="submit" variant='contained' color='success' disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
           </Box>
        </Box>
    </Paper>
  )
}

export default ActivityForm

