import { Typography } from '@mui/material';
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount';

function RequireAuth() {
    const {currentUser, loadingUserInfo} = useAccount();
    const location = useLocation();
    console.log('RequireAuth', currentUser, loadingUserInfo);

    if (loadingUserInfo) return <Typography>Loading...</Typography>;
    if (!currentUser) { return <Navigate to="/login" state={{from: location}} />; }

  return (
    <Outlet />
  )
}

export default RequireAuth