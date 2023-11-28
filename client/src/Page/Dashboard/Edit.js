import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';


function Edit({ users, selecteduser, setusers, setIsEditing }) {
  const id = selecteduser._id;
  const initialuser = { ...selecteduser }; // Create a copy of initial data
  const [username, setUsername] = useState(selecteduser.username);
  const [description, setDescription] = useState(selecteduser.description);
  const [email, setEmail] = useState(selecteduser.email);
  const [Experience, setExperience] = useState(selecteduser.Experience);
  const [DOB, setDOB] = useState(selecteduser.DOB);

  const hasFormChanged =
    username !== initialuser.username ||
    description !== initialuser.description ||
    email !== initialuser.email ||
    Experience !== initialuser.Experience ||
    DOB !== initialuser.DOB;

  const handleUpdate = async (e) => {
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
      const response = await axios.patch(`http://localhost:5000/api/users/${id}`, user);
      const updateduser = response.data;

      const updatedusers = users.map((emp) =>
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

      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">

        <form onSubmit={handleUpdate} className="add-user-form">
          <h1>Edit User</h1>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="DOB"
            variant="outlined"
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="experience-label">Experience</InputLabel>
            <Select
              labelId="experience-label"
              value={Experience}
              onChange={(e) => setExperience(e.target.value)}
              label="Experience"
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <div style={{ marginTop: '30px' }}>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!hasFormChanged} // Disable the button if form hasn't changed
              style={{ cursor: 'pointer' }} // Always show pointer cursor
              className={!hasFormChanged ? 'disabled-button' : ''}
            >
              {hasFormChanged ? 'Update' : 'Update'} {/* Show different symbol if unchanged */}
            </Button>
            <Button
              style={{ marginLeft: '12px' }}
              variant="contained"
              color="secondary"
              onClick={() => setIsEditing(false)}
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
