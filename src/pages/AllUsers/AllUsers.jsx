import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useLoaderData } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';


const AllUsers = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);
    const MySwal = withReactContent(Swal);

    const handleDelete = id => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        const newUsers = users.filter(user => user._id !== id);
                        setUsers(newUsers);
                    }
                })
            }
        });
    }

    return (
        <div className={`${users.length < 4 && 'h-screen'}`}>
            <div className="max-w-5xl mx-auto mt-16 mb-8">
                <Link to={'/new'}><button className='flex items-center gap-2 px-3 py-2 shadow-lg text-blue-800'>New User <FaUser /></button></Link>
            </div>
            <TableContainer component={Paper} className='max-w-4xl mx-auto my-16'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontSize: '18px', fontWeight: 600 }}>ID</TableCell>
                            <TableCell align="center" style={{ fontSize: '18px', fontWeight: 600 }}>Name</TableCell>
                            <TableCell align="center" style={{ fontSize: '18px', fontWeight: 600 }}>&#64;Email</TableCell>
                            <TableCell align="center" style={{ fontSize: '18px', fontWeight: 600 }}>Gender</TableCell>
                            <TableCell align="center" style={{ fontSize: '18px', fontWeight: 600 }}>Status</TableCell>
                            <TableCell align="center" style={{ fontSize: '18px', fontWeight: 600 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, idx) => (
                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {idx + 1}
                                </TableCell>
                                <TableCell align="center">{user.name}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.gender}</TableCell>
                                <TableCell align="center">{user.status}</TableCell>
                                <TableCell align="center">
                                    <div className="flex gap-2">
                                        <Link to={`/update/${user._id}`}><button className='px-3 py-1 shadow-lg text-indigo-700 text-xl hover:scale-125' title='Edit'><MdEdit /></button></Link>
                                        <button className='px-3 py-1 shadow-lg text-indigo-700 text-xl hover:scale-125' title='Delete' onClick={() => handleDelete(user._id)}><MdDelete /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AllUsers;