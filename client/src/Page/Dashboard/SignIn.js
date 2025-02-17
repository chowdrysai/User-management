import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function SignIn() {
    const Navigate = useNavigate(),
        [message, setMessage] = React.useState(false),
        [errorResponse, setErrorResponse] = React.useState(''),

        handleSubmit = async (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget),
                email = data.get('email'),
                password = data.get('password');

            if (!email || !password) {
                setErrorResponse('Please fill in all fields.'); // Set error message for empty fields
                setMessage(true);
                return; // Exit function if fields are empty
            }

            const userData = {
                email,
                password,
            };

            try {
                const response = await axios.post('http://localhost:5000/login', userData);
                localStorage.setItem('userData', JSON.stringify(response.data.token));
                Navigate('/home');
            } catch (error) {
                setMessage(true);
                if(error.response.status===403){
                    setErrorResponse('Invalid Email');
                }else if (error.response && error.response.data && error.response.data.message) {
                    setErrorResponse(error.response.data.message);
                }else if(error.response.data){
                    setErrorResponse(error.response.data);
                }else {
                    setErrorResponse('An error occurred.'); 
                }
                console.error('Error submitting form:', error.response.data.message);
            }
        };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth="xs"
            >
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '32px',
                        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
                        color: 'black',
                        '& .custom-margin': {
                            marginTop: '70px',
                        },
                    }}
                >
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: '#3f51b5',
                            border: '2px solid #3f51b5',
                        }}
                    >
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography
                        component="h1"
                        variant="h4"
                    >
                        Sign in
                    </Typography>

                    <Typography
                        component="h6"
                        variant="h5"
                    >
                        Welcome to user Management
                    </Typography>

                    {message ? <Typography
                        align="center"
                        color="error"
                        gutterBottom
                        variant="h6"
                    >
                        {errorResponse}
                    </Typography> : null}

                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        style={{ width: '100%' }}
                    >
                        <TextField
                            InputLabelProps={{
                                style: { color: 'black' },
                            }}
                            InputProps={{
                                style: { color: 'black' },
                            }}
                            autoComplete="email"
                            autoFocus
                            fullWidth
                            id="email"
                            label="Email Address"
                            margin="normal"
                            name="email" 
                            required
                            type="email"
                            variant="outlined"
                        />

                        <TextField
                            InputLabelProps={{
                                style: { color: 'black' },
                            }}
                            InputProps={{
                                style: { color: 'black' },
                            }}
                            autoComplete="current-password"
                            fullWidth
                            id="password"
                            label="Password"
                            margin="normal"
                            name="password"
                            required
                            type="password"
                            variant="outlined"
                        />

                        <Button
                            fullWidth
                            sx={{ mt: 3, mb: 2, backgroundColor: '#3f51b5', color: 'white' }}
                            type="submit"
                            variant="contained"
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link
                                    href="/register"
                                    style={{ color: '#3f51b5' }}
                                    variant="body2"
                                >
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;
