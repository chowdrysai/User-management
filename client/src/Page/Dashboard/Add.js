import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

function Add({ users, setusers, setIsAdding }) {
    const [username, setUsername] = useState(''),
        [description, setDescription] = useState(''),
        [email, setEmail] = useState(''),
        [DOB, setDOB] = useState(null),
        [Experience, setExperience] = useState(''),

        handleAdd = async (e) => {
            e.preventDefault();

            if (!validateUsername(username) || !validateEmail(email) || !validateDOB(DOB)) {
                return;
            }
            const token = localStorage.getItem('userData');
            try {
                const response = await axios.post('http://localhost:5000/api/users', {
                        username,
                        description,
                        email,
                        DOB,
                        Experience,
                    },{
                        headers: {
                            Authorization: token, // Set the Authorization header with the token
                        },
                    }),
                    newUser = response.data;
                setusers([...users, newUser]);
                setIsAdding(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: `${username}'s data has been added.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error('Error adding user:', error);
            }
        },

        validateUsername = (username) => {
            if (!username || username.trim() === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Username is required.',
                    showConfirmButton: true,
                });
                return false;
            }
            return true;
        },

        validateEmail = (email) => {
            const re = /\S+@\S+\.\S+/;
            if (!email || !re.test(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Please enter a valid email address.',
                    showConfirmButton: true,
                });
                return false;
            }
            return true;
        },

        validateDOB = (DOB) => {
            if (!DOB) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'DOB is required.',
                    showConfirmButton: true,
                });
                return false;
            }
            return true;
        };

    return (
        <div className="add-user-container">

            <CSSTransition
                appear
                classNames="fade"
                in
                timeout={500}
            >

                <form
                    className="add-user-form"
                    onSubmit={handleAdd}
                >
                    <h1>
                        Add User
                    </h1>

                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        margin="normal"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        variant="outlined"
                    />

                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        label="DOB"
                        margin="normal"
                        onChange={(e) => setDOB(e.target.value)}
                        type="date"
                        value={DOB}
                        variant="outlined"
                    />

                    <FormControl
                        fullWidth
                        margin="normal"
                    >
                        <InputLabel id="experience-label">
                            Experience
                        </InputLabel>

                        <Select
                            label="Experience"
                            labelId="experience-label"
                            onChange={(e) => setExperience(e.target.value)}
                            value={Experience}
                        >
                            <MenuItem value="Beginner">
                                Beginner
                            </MenuItem>

                            <MenuItem value="Intermediate">
                                Intermediate
                            </MenuItem>

                            <MenuItem value="Advanced">
                                Advanced
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <div style={{ marginTop: '30px' }}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>

                        <Button
                            color="secondary"
                            onClick={() => setIsAdding(false)}
                            style={{ marginLeft: '12px' }}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </CSSTransition>
            ￼￼
        </div>
    );
}

export default Add;
