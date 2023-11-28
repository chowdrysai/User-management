import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

function Dashboard() {
    const [users, setusers] = useState([]);
    const [selecteduser, setSelecteduser] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token=localStorage.getItem('userData')
        try {
            const response = await axios.get('http://localhost:5000/api/users',{
            headers: {
                Authorization: token, 
              }
            });
            setusers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (id) => {
        const user = users.find((user) => user._id === id);
        setSelecteduser(user);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            isConfirmed: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.value) {
                try {
                    await axios.delete(`http://localhost:5000/api/users/${id}`);
                    const updatedusers = users.filter((user) => user._id !== id);

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'user data has been deleted.',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setusers(updatedusers);
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            }
        });
    };

    return (
        <div className=''  >
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header setIsAdding={setIsAdding} />
                    <List
                        users={users}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    users={users}
                    setusers={setusers}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    users={users}
                    selecteduser={selecteduser}
                    setusers={setusers}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
}

export default Dashboard;
