import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

function UserDetails() {
    const { userId } = useParams(),
        [user, setUser] = useState(null),
        [loading, setLoading] = useState(true);

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
        <Container
            maxWidth="sm"
            style={{ marginTop: '40px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px' }}
        >
            <Typography
                gutterBottom
                style={{ color: '#007bff' }}
                variant="h4"
            >
                User Details
            </Typography>

            {loading ? (
                <CircularProgress style={{ color: '#007bff' }} />
            ) : user ? (
                <form>
                    <TextField
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label="Username"
                        margin="normal"
                        value={user.username}
                        variant="outlined"
                    />

                    <TextField
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={user.email}
                        variant="outlined"
                    />

                    <TextField
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label="Experience"
                        margin="normal"
                        value={user.Experience}
                        variant="outlined"
                    />

                    <TextField
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label="Description"
                        margin="normal"
                        multiline
                        rows={3}
                        value={user.description}
                        variant="outlined"
                    />

                    <TextField
                        InputProps={{ readOnly: true }}
                        fullWidth
                        label="Date of Birth"
                        margin="normal"
                        value={user.DOB}
                        variant="outlined"
                    />
                </form>
            ) : (
                <Typography
                    style={{ color: 'red' }}
                    variant="body1"
                >
                    No user found
                </Typography>
            )}

            <Box mt={3}>
                <Link
                    style={{ textDecoration: 'none' }}
                    to="/"
                >
                    <Button
                        color="secondary"
                        variant="contained"
                    >
                        Back
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}
export default UserDetails;
