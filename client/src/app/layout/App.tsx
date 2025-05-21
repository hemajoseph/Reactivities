
import { useState } from 'react'

import axios from 'axios'
import Navbar from './NavBar'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Typography } from '@mui/material'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { useActivities } from '../../lib/hooks/useActivities'

function App() {

  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending } = useActivities();
  
  /* const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      return response.data;
    }
  }) */

  const handleSelectActivity = (id: string) => {
    return (
      setSelectedActivity(activities!.find((x) => x.id === id))
    )
  }
  
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }


  

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(!editMode);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

console.log(`activities: ${activities}`);
  console.log(`isPending: ${isPending}`);

  return (
    <>
        <CssBaseline />
      <Navbar openForm = {handleOpenForm} />
      <Container maxWidth="xl" sx={{mt:3}}>
        {!activities || isPending ? (
            <Typography>Loadingg...</Typography>   
        ): (
              <ActivityDashboard activities={activities} selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity} cancelSelectActivity={handleCancelSelectActivity}
          openForm = {handleOpenForm} editMode={editMode} closeForm = {handleFormClose} 
          />
        )}
        
      </Container>
   
   </>
  )
}
export default App
