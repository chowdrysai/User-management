import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Input,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Typography,
    Pagination,
    Box,
  } from '@mui/material';

function List({ users, handleEdit, handleDelete }) {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const filteredUsers = users.filter(
            (user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.Experience.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.DOB.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredUsers);
        setCurrentPage(1);
    }, [searchTerm, users]);
    
    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const sortedData = filteredData.sort((a, b) => {
        const keyA = sortBy ? a[sortBy].toString().toLowerCase() : null;
        const keyB = sortBy ? b[sortBy].toString().toLowerCase() : null;

        if (keyA && keyB) {
            if (sortOrder === 'asc') {
                return keyA > keyB ? 1 : -1;
            } else {
                return keyA < keyB ? 1 : -1;
            }
        }
        return 0;
    }); 

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const arrow = (key) => {
        if (sortBy === key) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return null;
    };

    return (
        <div className='container'>
        <div className='contain-table'>
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '6px' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className="table-header">
                            <TableCell >
                            <strong>NO</strong>
                            </TableCell>
                            <TableCell onClick={() => handleSort('username')}>
                            <strong>USERNAME</strong>{arrow('username')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('email')}>
                            <strong>EMAIL</strong>{arrow('email')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('Experience')}>
                                <strong>EXPERIENCE</strong> {arrow('Experience')}
                            </TableCell>
                            <TableCell colSpan={2} align="center">
                            <strong>ACTIONS</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.length > 0 ? (
                            currentItems.map((user, i) => (
                                <TableRow key={user.id} className="table-row">
                                    <TableCell>{(currentPage - 1) * itemsPerPage + i + 1}</TableCell>
                                    <TableCell>
                                        <Link to={`/api/users/${user._id}`}>{user.username}</Link>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.Experience}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() => handleEdit(user._id)}
                                            variant="outlined"
                                            color="primary"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'blue',
                                                },
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            onClick={() => handleDelete(user._id)}
                                            variant="outlined"
                                            color="secondary"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#9c27b0', // Change this to your desired hover color
                                                },
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography>No Users</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" marginTop="20px">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => paginate(page)}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    className="pagination"
                />
            </Box>
        </div>
        </div>
    );
}

export default List;
