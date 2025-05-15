
import { useEffect,useState } from 'react'

import axios from 'axios'
import Navbar from './NavBar'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then((response) => setActivities(response.data))
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const handleSelectActivity = (id: string) => {
    return (
      setSelectedActivity(activities.find((activity) => activity.id === id))
    )
  }
  
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleSubmitForm = (activity: Activity) => {
    
    if (activity.id) {
      
      //setActivities([...activities.filter(a => a.id !== activity.id), activity]);
       setActivities(activities.map(x=>x.id === activity.id ? activity : x))
    }
    else {  
      const newActivity = { ...activity, id: activities.length.toString() }
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
   setEditMode(false)
  }

   const handleDelete = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
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

  return (
    <>
        <CssBaseline />
      <Navbar openForm = {handleOpenForm} />
      <Container maxWidth="xl" sx={{mt:3}}>
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity} cancelSelectActivity={handleCancelSelectActivity}
          openForm = {handleOpenForm} editMode={editMode} closeForm = {handleFormClose} 
          submitForm={handleSubmitForm} deleteActivity={handleDelete} />
      </Container>
   
   </>
  )
}
export default App
