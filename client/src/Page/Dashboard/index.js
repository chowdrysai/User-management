import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

function Dashboard() {
    const [users, setusers] = useState([]),
        [selecteduser, setSelecteduser] = useState(null),
        [isAdding, setIsAdding] = useState(false),
        [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
            const token=localStorage.getItem('userData');
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
        },

        handleEdit = (id) => {
            const user = users.find((user) => user._id === id);
            setSelecteduser(user);
            setIsEditing(true);
        },

        handleDelete = async (id) => {
            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
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
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        users={users}
                    />
                </>
            )}

            {/* Add */}
            {isAdding ? <Add
                setIsAdding={setIsAdding}
                setusers={setusers}
                users={users}
            /> : null}

            {/* Edit */}
            {isEditing ? <Edit
                selecteduser={selecteduser}
                setIsEditing={setIsEditing}
                setusers={setusers}
                users={users}
            /> : null}
        </div>
    );
}

export default Dashboard;
