import React, { useState } from 'react';
import { AppBar, Button, Hidden, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Header({ setIsAdding }) {
    const navigate = useNavigate(),
  
        [anchorEl, setAnchorEl] = useState(null),

        handleProfileIconClick = (event) => {
            setAnchorEl(event.currentTarget);
        },

        handleMenuClose = () => {
            setAnchorEl(null);
        },

        handleLogout = () => {
            localStorage.removeItem('userData');
            navigate('/register');
            handleMenuClose();
        },

        token = localStorage.getItem('userData');

    return (
        <div className="container">
            <AppBar
                position="static"
                style={{ marginTop: '50px' }}
            >
                <Toolbar>
                    <Typography
                        component="div"
                        style={{ flexGrow: 1,color:'black'}}
                        variant="h5"
                    >
                        User Management System
                    </Typography>

                    {token ? <>
                        <Hidden xsDown>
                            <Button
                                color="primary"
                                onClick={() => setIsAdding(true)}
                                sx={{
                                    borderRadius: '20px',
                                    marginRight: '16px',
                                    '@media (max-width:600px)': {
                                        fontSize: '12px',
                                        padding: '8px 12px',
                                        marginRight: '8px',
                                    },
                                }}
                                variant="contained"
                            >
                                Add User
                            </Button>
                        </Hidden>

                        <div style={{ position: 'relative' }}>
                            <IconButton
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                aria-label="account of current user"
                                color="inherit"
                                onClick={handleProfileIconClick}
                            >
                                <AccountCircleIcon />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                id="menu-appbar"
                                keepMounted
                                onClose={handleMenuClose}
                                open={Boolean(anchorEl)}
                                style={{ position: 'absolute', top: '40px', right: '0' }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    </> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
