import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';


function Edit({ users, selecteduser, setusers, setIsEditing }) {
    const id = selecteduser._id,
        initialuser = { ...selecteduser }, // Create a copy of initial data
        [username, setUsername] = useState(selecteduser.username),
        [description, setDescription] = useState(selecteduser.description),
        [email, setEmail] = useState(selecteduser.email),
        [Experience, setExperience] = useState(selecteduser.Experience),
        [DOB, setDOB] = useState(selecteduser.DOB),

        hasFormChanged =
    username !== initialuser.username ||
    description !== initialuser.description ||
    email !== initialuser.email ||
    Experience !== initialuser.Experience ||
    DOB !== initialuser.DOB,

        handleUpdate = async (e) => {
            e.preventDefault();
            if (!username || !description || !email || !Experience || !DOB) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'All fields are required.',
                    showConfirmButton: true,
                });
            }

            const user = {
                id,
                username,
                description,
                email,
                Experience,
                DOB,
            };

            try {
                const response = await axios.patch(`http://localhost:5000/api/users/${id}`, user),
                    updateduser = response.data,

                    updatedusers = users.map((emp) =>
                        emp._id === id ? updateduser : emp
                    );

                setusers(updatedusers);
                setIsEditing(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: `${updateduser.username}'s data has been updated.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update user data. Please try again.',
                    showConfirmButton: true,
                });
            }
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
                    onSubmit={handleUpdate}
                >
                    <h1>
                        Edit User
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
                            className={!hasFormChanged ? 'disabled-button' : ''}
                            color="primary"
                            disabled={!hasFormChanged}
                            style={{ cursor: 'pointer' }} 
                            type="submit" 
                            variant="contained"
                        >
                            {hasFormChanged ? 'Update' : 'Update'}
                        </Button>

                        <Button
                            color="secondary"
                            onClick={() => setIsEditing(false)}
                            style={{ marginLeft: '12px' }}
                            variant="contained"
                        >
                            Back
                        </Button>
                    </div>
                </form>
            </CSSTransition>
        </div>
    );
}

export default Edit;
