import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import { useAccount } from '../../lib/hooks/useAccount';
import { Add, Logout, Person } from '@mui/icons-material';
import { Link } from 'react-router';

export default function UserMenu() {
  const {currentUser,logOutUser} = useAccount();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        size='large'
        sx={{fontSize: '1.2rem', color: 'inherit'}}
        onClick={handleClick}
      >
        <Box display='flex' alignItems='center' gap={2}><Avatar/>{currentUser?.displayName}</Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to='/createActivity'>
            <ListItemIcon>
                <Add />
            </ListItemIcon>
            <ListItemText>Create Activity</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to='/profile'>
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
            logOutUser.mutate();
            handleClose();
        }} >
            <ListItemIcon>
                <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
        </MenuItem>

      </Menu>
    </>
  );
}
