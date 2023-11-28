import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

function Add({ users, setusers, setIsAdding }) {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState(null);
  const [Experience, setExperience] = useState('');

  const handleAdd = async (e) => {
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
      });
      const newUser = response.data;
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
  };

  const validateUsername = (username) => {
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
  };

  const validateEmail = (email) => {
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
  };

  const validateDOB = (DOB) => {
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

      <CSSTransition in={true} appear={true} timeout={500} classNames="fade">

        <form onSubmit={handleAdd} className="add-user-form">
          <h1>Add User</h1>
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
              variant="contained" color="primary">
              Add
            </Button>
            <Button
              style={{ marginLeft: '12px' }}
              variant="contained"
              color="secondary"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CSSTransition>￼￼
    </div>
  );
}

export default Add;
