
import NavBar from './NavBar'
import CssBaseline from '@mui/material/CssBaseline'
import { Container } from '@mui/material'
import { Outlet, useLocation } from 'react-router'
import HomePage from '../home/HomePage';

function App() {

  const location = useLocation();
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
        {
          location.pathname === '/' ? <HomePage/> : (
            <>
              <NavBar />
              <Container maxWidth="xl" sx={{mt:3}}>
                <Outlet />          
              </Container>
            </>
          )
        }
         
   </>
  )
}
export default App
