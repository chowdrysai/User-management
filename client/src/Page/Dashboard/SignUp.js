import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography
            align="center"
            color="text.secondary"
            variant="body2"
            {...props}
        >
            {'Copyright © '}

            <Link
                color="inherit"
                href="/"
            >
                User Management
            </Link>

            {' '}

            {new Date().getFullYear()}

            .
        </Typography>
    );
}

export default function SignUp() {
    const Navigate = useNavigate(),
        [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false),
        [message, setMessage] = React.useState(false),
        [errorResponse, setErrorResponse] = React.useState(''),

        handleCheckboxChange = (event) => {
            setIsCheckboxChecked(event.target.checked);
        },
        handleSubmit = async (event) => {
            event.preventDefault();
            if (!isCheckboxChecked) {
                setErrorResponse('Please accept terms and conditions');
                return;
            }

            const formData = new FormData(event.currentTarget),
                firstName = formData.get('firstName'),
                lastName = formData.get('lastName'),
                email = formData.get('email'),
                password = formData.get('password');

            if (!firstName || !lastName || !email || !password) {
                setErrorResponse('Please fill in all fields.');
                setMessage(true);
                return;
            }
            const userData = {
                firstName,
                lastName,
                email,
                password,
            };

            try {
                const response = await axios.post('http://localhost:5000/register', userData);
                console.log('Response:', response.data);
                Navigate('/login');
            } catch (error) {
                setMessage(true);
                if (error.response.status === 403) {
                    setErrorResponse('Invalid Email');
                } else if (error.response && error.response.data && error.response.data.message) {
                    setErrorResponse(error.response.data.message);
                } else if (error.response.data) {
                    setErrorResponse(error.response.data);
                } else {
                    setErrorResponse('An error occurred.');
                }
                console.error('Error submitting form:', error.response.data.message);
            }
        },

        defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container
                component="main"
                maxWidth="sm"
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
                        Sign up
                    </Typography>

                    <Typography
                        component="h6"
                        variant="h5"
                    >
                        Welcome to User Management
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
                        style={{ width: '100%', marginTop: '16px' }}
                    >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    autoComplete="given-name"
                                    autoFocus
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    margin="normal"
                                    name="firstName"
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                sm={6}
                                xs={12}
                            >
                                <TextField
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    autoComplete="family-name"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    margin="normal"
                                    name="lastName"
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    autoComplete="email"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <TextField
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    autoComplete="new-password"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    required
                                    type="password"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isCheckboxChecked}
                                            color="primary"
                                            onChange={handleCheckboxChange}
                                            required
                                        />
                                    }
                                    label="Accept terms and conditions."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            sx={{ mt: 3, mb: 2, backgroundColor: '#3f51b5', color: 'white' }}
                            type="submit"
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    href="/login"
                                    style={{ color: '#3f51b5' }}
                                    variant="body2"
                                >
                                    Already have an account? Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
            <Copyright sx={{ mt: 5 }} />
        </ThemeProvider>
    );
}