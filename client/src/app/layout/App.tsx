
import NavBar from './NavBar'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { Outlet } from 'react-router'

function App() {

  
  /* const {data: activities, isPending} = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      return response.data;
    }
  }) */

  return (
    <>
        <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{mt:3}}>
        <Outlet />          
      </Container>
   
   </>
  )
}
export default App
