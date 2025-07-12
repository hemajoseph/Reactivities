
import { registerSchema,RegisterSchema } from '../../lib/schemas/registerSchema';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { useAccount } from '../../lib/hooks/useAccount';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router';

export default function RegisterForm() {
    const {registerUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    
    const {control, handleSubmit, setError, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });
const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onSuccess: () => {
           navigate(location.state?.from || '/activities');
      },
      onError: (error) => {
        //console.log("Registration failed:", error);
        if (Array.isArray(error)) {
          error.forEach(err => {
            if (err.includes('Email')) setError('email', { message: err });
            if (err.includes('Password')) setError('Password', { message: err });
          });
        }
      }
    });
  }
  return (
    
    <Paper 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{display: 'flex', flexDirection: 'column', gap: 3 ,mx: 'auto', p: 3}}>
      
      <Box display = 'flex' alignItems='center' gap={2} color='secondary.main'>
            <LockOpen fontSize='large' />
            <Typography variant='h4'>Register</Typography>
      </Box>
      <TextInput label='Email' control={control} name='email' />
      <TextInput label='Display Name' control={control} name='displayName'/>
      <TextInput label='Password' control={control} name='Password' type='password' />
      <Button type='submit' disabled={!isValid || isSubmitting} variant='contained' size='large'>
        Register
      </Button>
      <Typography variant='body2' color='text.secondary' align='center'>
          Already have an account? 
          <Typography component={Link} to='/login' color="primary" sx={{textDecoration: 'none'}}>
            Sign in
          </Typography>
      </Typography>
    </Paper>
     
  )
}
 