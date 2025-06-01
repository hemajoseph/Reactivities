import { MenuItem } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router';

function MenuItemLink({children, to}: {children: React.ReactNode, to: string}) {
  return (
    <MenuItem component={NavLink} to={to} sx={{fontSize: '1.2rem', textTransform: 'upperCase', fontWeight: 'bold'}}>
      {children} 
    </MenuItem>
  )
}

export default MenuItemLink