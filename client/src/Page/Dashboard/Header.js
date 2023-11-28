import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Hidden } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Header({ setIsAdding }) {
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/register');
    handleMenuClose();
  };

  const token = localStorage.getItem('userData');

  return (
    <div className="container">
    <AppBar position="static" style={{ marginTop: '50px' }}>
      <Toolbar>
        <Typography variant="h5" component="div" style={{ flexGrow: 1,color:'black'}}>
          User Management System
        </Typography>
        {token && (
          <>
            <Hidden xsDown>
              <Button
                onClick={() => setIsAdding(true)}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '20px',
                  marginRight: '16px',
                  '@media (max-width:600px)': {
                    fontSize: '12px',
                    padding: '8px 12px',
                    marginRight: '8px',
                  },
                }}
              >
                Add User
              </Button>
            </Hidden>

            <div style={{ position: 'relative' }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileIconClick}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                style={{ position: 'absolute', top: '40px', right: '0' }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  </div>
  );
}

export default Header;
