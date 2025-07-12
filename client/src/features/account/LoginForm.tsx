import React from 'react'
import { loginSchema, LoginSchema } from '../../lib/schemas/loginSchema';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { useAccount } from '../../lib/hooks/useAccount';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router';

export default function LoginForm() {
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });
const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
           navigate(location.state?.from || '/activities');
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
            <Typography variant='h4'>Sign in</Typography>
      </Box>
      <TextInput label='Email' control={control} name='email' />
      <TextInput label='Password' control={control} name='password' type='password' />
      <Button type='submit' disabled={!isValid || isSubmitting} variant='contained' size='large'>
        Login
      </Button>
      <Typography variant='body2' color='text.secondary' align='center'>
          Don't have an account? 
          <Typography component={Link} to='/register' color="primary" sx={{textDecoration: 'none'}}>
            Sign up
          </Typography>
      </Typography>
    </Paper>
     
  )
}
 