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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                User Management
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const Navigate = useNavigate();
    const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [errorResponse, setErrorResponse] = React.useState('');

    const handleCheckboxChange = (event) => {
        setIsCheckboxChecked(event.target.checked);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isCheckboxChecked) {
            setErrorResponse('Please accept terms and conditions');
            return;
        }

        const formData = new FormData(event.currentTarget);
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const email = formData.get('email')
        const password = formData.get('password')

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
                setErrorResponse('Invalid Email')
            } else if (error.response && error.response.data && error.response.data.message) {
                setErrorResponse(error.response.data.message);
            } else if (error.response.data) {
                setErrorResponse(error.response.data)
            } else {
                setErrorResponse('An error occurred.');
            }
            console.error('Error submitting form:', error.response.data.message);
        }
    };

    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
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
                    <Typography component="h1" variant="h4">
                        Sign up
                    </Typography>
                    <Typography component="h6" variant="h5">
                        Welcome to User Management
                    </Typography>
                    {message && (
                        <Typography variant="h6" color="error" align="center" gutterBottom>
                            {errorResponse}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '16px' }} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    autoFocus
                                    variant="outlined"
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    variant="outlined"
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="outlined"
                                    InputProps={{
                                        style: { color: 'black' },
                                    }}
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            required
                                            color="primary"
                                            checked={isCheckboxChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Accept terms and conditions."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#3f51b5', color: 'white' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2" style={{ color: '#3f51b5' }}>
                                    {'Already have an account? Sign In'}
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