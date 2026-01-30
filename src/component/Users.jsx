import React, { use, useEffect, useState } from 'react'
import { getUserById, getUsers,deleteUser } from '../services/userService';
import { Link, useLocation } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();

    useEffect(() => {
        // if (location.state && location.state.refresh) {
        fetchUser();
        // }
    }, [])

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
            setError('');
        }
        catch (err) {
            setError("Failed to load users");
        }
        finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(user => user.id !== id));
        }
        catch (err) {
            setError("Failed to delete user");
           console.log(err.response?.data || err.message);
        }

    }


    return (
        <div>
            <h2>
                Users List
            </h2>

            {/* 🔴 Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 🟡 Loader */}
            {loading && <p>Loading...</p>}

            <table border="1" cellPadding="10" cellSpacing="0">
                {
                    users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/user/${user.id}`}>View Details</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>




        </div>
    )
}

export default Users