

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginSchema } from '../schemas/loginSchema';
import agent from '../api/agent';
import { User } from '../types';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RegisterSchema } from '../schemas/registerSchema';

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    
    const registerUser = useMutation({ 
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        },
        onSuccess: () => {
            toast.success("Register successful, you can now login");
            navigate('/login');
            }
            
    })

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
            await navigate('/activities');
        }
    });

    const logOutUser = useMutation({
        mutationFn: async () => {
                await agent.post('/account/logout');
        },
        onSuccess: () => {
                queryClient.removeQueries({queryKey: ['user']});
                queryClient.removeQueries({queryKey: ['activites']});
                navigate('/');
        }
    });

    const {data: currentUser} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
            && location.pathname !== '/login'
            && location.pathname !== '/register'
    })

  return {
    loginUser,
    currentUser ,
    logOutUser ,
    registerUser
  }
}
