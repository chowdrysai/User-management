import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, TextField, Button, Box } from '@mui/material';

function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <Container maxWidth="sm" style={{ marginTop: '40px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#007bff' }}>
                User Details
            </Typography>
            {loading ? (
                <CircularProgress style={{ color: '#007bff' }} />
            ) : user ? (
                <form>
                    <TextField
                        label="Username"
                        value={user.username}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Email"
                        value={user.email}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Experience"
                        value={user.Experience}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Description"
                        value={user.description}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="Date of Birth"
                        value={user.DOB}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                </form>
            ) : (
                <Typography variant="body1" style={{ color: 'red' }}>No user found</Typography>
            )}
            <Box mt={3}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary">
                        Back
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
export default UserDetails;
