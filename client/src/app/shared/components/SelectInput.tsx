import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, TextFieldProps } from '@mui/material'
import {FieldValues, useController, UseControllerProps} from 'react-hook-form'

type Props<T extends FieldValues> = {items: {text: string, value: string}[]} & UseControllerProps<T> & TextFieldProps 

function SelectInput<T extends FieldValues>(props: Props<T>) {
    
    const {field, fieldState} = useController({...props});

  return (
    <FormControl fullWidth error={!!fieldState.error}>
        <InputLabel>{props.label}</InputLabel>
        <Select 
            value={field.value || ''}   // use empty for creating activitiey and vaue prsnt for edit ctvty
            label={props.label}
            onChange={field.onChange}  // usew reacthook form's onchange and registers the new sel value wiht reacct hook form
            >

            {props.items.map(item => (
                <MenuItem key={item.value} value={item.value}>
                    {item.text}
                </MenuItem>
            ))}
        </Select>
        <FormHelperText>  //display any err. message from react hook form
            {fieldState.error?.message}  
        </FormHelperText>
    </FormControl>
  )
}

export default SelectInput