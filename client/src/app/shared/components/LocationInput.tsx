
import axios from 'axios';
import { Box, debounce, List, ListItemButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {FieldValues, useController, UseControllerProps} from 'react-hook-form'
import { LocationIQSuggestion } from '../../../lib/types';

type Props<T extends FieldValues> = {label: string} & UseControllerProps<T>

function LocationInput<T extends FieldValues>(props: Props<T>) {
    
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false);
    const [suggestions, setsuggestions] = useState<LocationIQSuggestion[]>([]);
    const [inputValue, setInputValue] = useState(field.value || ''); // Initialize inputValue with field value or empty string

    useEffect( () => {
        if (field.value && typeof field.value === 'object') {  
            setInputValue(field.value.venue || ''); // Set inputValue to the venue of the selected suggestion
        } else {
            setInputValue(field.value || ''); // Reset inputValue if field.value is not an object
        }   
    },[field.value]); // Update inputValue whenever field.value changes

    const locationUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.50b63d5dd8a24f3a0d2157245f0bc699&limit=5&dedupe=1&'
    const fetchSuggestions = useMemo(
        () => debounce( async (query:string) => {
            if(!query || query.length < 3) {
                setsuggestions([]);
                return;
            }
            setLoading(true);
            try {
                const res = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
                setsuggestions(res.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }  
        }, 500 )  //debounce fn end: wait until 3 char is typed for fetching suggestions. debouce call with 500 delay

    ,[locationUrl])  //takes a dep array, and will only recompute the value when the dependencies change. fetchSuggestions is a function that fetches suggestions from the LocationIQ API based on the input value. 

    const handleChange = async (value: string) => {
        field.onChange(value); // Update the form state
        await fetchSuggestions(value); // Fetch suggestions based on the input value
    };

    const handleSelect = (location: LocationIQSuggestion ) => {
        const city = location.address?.city || location.address?.town || location.address?.village; //so even if we get spmething in town/village.. we get that in the fcity
        const venue = location.display_name; // Use display_name as the venue
        const latitude = parseFloat(location.lat);  
        const longitude = parseFloat(location.lon);

        setInputValue(venue); // Update inputValue with the selected suggestion's display_name
        field.onChange({city, venue, latitude, longitude}); // Update the form state with
        setsuggestions([]); // Clear suggestions after selection
    }

  return (
    <Box>
      <TextField 
              {...props}
              value={inputValue} // Use inputValue state for the value of the TextField
              onChange={e=> handleChange(e.target.value)} // Call the handleChange function on input change
              fullWidth
              variant='outlined'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
          />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{border: 1}}>
            {suggestions.map((suggestion) => (
                <ListItemButton divider key={suggestion.place_id} 
                onClick={() => {handleSelect(suggestion) } } // Call handleSelect with the selected suggestion
                >
                    {suggestion.display_name}
                </ListItemButton>
            ))}
        </List>
      ) }
    </Box>
  )
}

export default LocationInput