
import { Box, Button, ButtonGroup, List, ListItemText, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../lib/stores/useStore';

const Counter = observer(function Counter() {
    const {counterStore} = useStore();
  return (
    <Box sx={{display: 'flex'}}>
        <Box>
            <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
            <Typography variant="h6" gutterBottom>Current count: {counterStore.count}</Typography>
            {/* <Observer> //Commented code used before for Observer tab instead of observer function
                1. observer is a higher-order component that wraps the component and makes it reactive. 
                {() => (
                    <>
                        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
                        <Typography variant="h6" gutterBottom>Current count: {counterStore.count}</Typography>
                            
                    </>
                )}
            </Observer> */}
            <ButtonGroup>
                <Button onClick={() => counterStore.decrement()} color="error" variant="contained">Decrement</Button>
                <Button onClick={() => counterStore.increment()} color="success" variant="contained">Increment</Button>
                <Button onClick={() => counterStore.increment(5)} color="primary" variant="contained">Increment by 5</Button>
                    
            </ButtonGroup>
        </Box>
        <Box>
                <Typography variant="h6">Counter Events ({counterStore.eventsCount})</Typography>
                <List>
                    {counterStore.events.map((event, index) => (
                        <ListItemText key={index}>{event}</ListItemText>
                    ))}
                </List>
        </Box>
    </Box>
  )
} )  

export default Counter