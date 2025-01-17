import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Input,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

function List({ users, handleEdit, handleDelete }) {
    const [sortBy, setSortBy] = useState(null),
        [sortOrder, setSortOrder] = useState('asc'),
        [searchTerm, setSearchTerm] = useState(''),
        [currentPage, setCurrentPage] = useState(1),
        [itemsPerPage] = useState(5),
        [filteredData, setFilteredData] = useState([]);

    
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
        },

        sortedData = filteredData.sort((a, b) => {
            const keyA = sortBy ? a[sortBy].toString().toLowerCase() : null,
                keyB = sortBy ? b[sortBy].toString().toLowerCase() : null;

            if (keyA && keyB) {
                if (sortOrder === 'asc') {
                    return keyA > keyB ? 1 : -1;
                } 
                return keyA < keyB ? 1 : -1;
            
            }
            return 0;
        }), 

        paginate = (pageNumber) => setCurrentPage(pageNumber),

        totalPages = Math.ceil(filteredData.length / itemsPerPage),

        indexOfLastItem = currentPage * itemsPerPage,
        indexOfFirstItem = indexOfLastItem - itemsPerPage,
        currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem),

        arrow = (key) => {
            if (sortBy === key) {
                return sortOrder === 'asc' ? '↑' : '↓';
            }
            return null;
        };

    return (
        <div className='container'>
            <div className='contain-table'>
                <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    style={{ marginBottom: '10px', padding: '6px' }}
                    type="text"
                    value={searchTerm}
                />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className="table-header">
                                <TableCell >
                                    <strong>
                                        NO
                                    </strong>
                                </TableCell>

                                <TableCell onClick={() => handleSort('username')}>
                                    <strong>
                                        USERNAME
                                    </strong>

                                    {arrow('username')}
                                </TableCell>

                                <TableCell onClick={() => handleSort('email')}>
                                    <strong>
                                        EMAIL
                                    </strong>

                                    {arrow('email')}
                                </TableCell>

                                <TableCell onClick={() => handleSort('Experience')}>
                                    <strong>
                                        EXPERIENCE
                                    </strong> {arrow('Experience')}
                                </TableCell>

                                <TableCell
                                    align="center"
                                    colSpan={2}
                                >
                                    <strong>
                                        ACTIONS
                                    </strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentItems.length > 0 ? (
                                currentItems.map((user, i) => (
                                    <TableRow
                                        className="table-row"
                                        key={user.id}
                                    >
                                        <TableCell>
                                            {(currentPage - 1) * itemsPerPage + i + 1}
                                        </TableCell>

                                        <TableCell>
                                            <Link to={`/api/users/${user._id}`}>
                                                {user.username}
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            {user.email}
                                        </TableCell>

                                        <TableCell>
                                            {user.Experience}
                                        </TableCell>

                                        <TableCell align="right">
                                            <Button
                                                color="primary"
                                                onClick={() => handleEdit(user._id)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'blue',
                                                    },
                                                }}
                                                variant="outlined"
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>

                                        <TableCell align="left">
                                            <Button
                                                color="secondary"
                                                onClick={() => handleDelete(user._id)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: '#9c27b0', // Change this to your desired hover color
                                                    },
                                                }}
                                                variant="outlined"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        colSpan={8}
                                    >
                                        <Typography>
                                            No Users
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    display="flex"
                    justifyContent="center"
                    marginTop="20px"
                >
                    <Pagination
                        className="pagination"
                        color="primary"
                        count={totalPages}
                        onChange={(e, page) => paginate(page)}
                        page={currentPage}
                        shape="rounded"
                        variant="outlined"
                    />
                </Box>
            </div>
        </div>
    );
}

export default List;
