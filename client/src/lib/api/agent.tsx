import axios from 'axios';
import { store } from '../stores/store';
import { toast } from 'react-toastify';
import { router } from '../../app/router/Routes';

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL});

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

agent.interceptors.request.use((config) => {
    store.uiStore.isBusy();
    return config;
})

agent.interceptors.response.use(
  async (resp) => {
        await sleep(1000);
        store.uiStore.isIdle();
        return resp;  
  },
  async error => { 
    await sleep(1000);
    store.uiStore.isIdle();

    const {status, data} = error.response;
    switch (status) {
      case 400: 
      console.log(data); 
        //toast.error('Bad req - 400');
        if (data.errors){
          const modelStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401: 
        //toast.error('Unauthorised');  
        toast.error(data.title);  
        console.log(data);    
        break;
      case 404: 
        //toast.error('Not -fnd');
        //console.log(data);  
        toast.error(data);
        router.navigate('/not-found');
        break;
      case 500: 
        //console.log(data);
        router.navigate('/server-error', {state: {error: data}});
        break;
      default:
        toast.error('Something else');
        break;
    }
    return Promise.reject(error);  
  } );

export default agent;