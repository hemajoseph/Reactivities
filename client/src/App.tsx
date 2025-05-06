
import { useEffect,useState } from 'react'
import './App.css'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import axios from 'axios'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then((response) => setActivities(response.data))
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <>
   <Typography variant='h3'>Reactivities</Typography>
   <List>
      {activities.map((activity) => (
          <ListItem key={activity.id}><ListItemText>{activity.title}</ListItemText></ListItem>
        ))}
   </List>
   </>
  )
}

export default App
