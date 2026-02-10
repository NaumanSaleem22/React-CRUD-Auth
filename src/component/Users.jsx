import React, { use, useEffect, useMemo, useState } from 'react'
import { getUserById, getUsers, deleteUser } from '../services/userService';
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();
    const [search, setSearch] = useState("");
    const {theme, toggleTheme} = useContext(ThemeContext);

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
            setUsers(res => res.filter(user => user.id !== id));
        }
        catch (err) {
            setError("Failed to delete user");
            console.log(err.response?.data || err.message);
        }

    }

    const filteredUsers = useMemo(() => {
        return users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    }, [users, search]); // If users or search changes, recompute

    return (
        <div style={{
            background: theme === "light" ? "#fff" : "#222",
            color: theme === "light" ? "#1d1717" : "#fff",
            minHeight: "100vh",
            padding: "20px"
        }}> {/* ✅ Theme Toggle Button */}
            <button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"}
            </button>
            <h2>
                Users List
            </h2>

            <input type='text' placeholder='Search users...' value={search} onChange={(e) => setSearch(e.target.value)} />
            <br/><br/>

            {/* 🔴 Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 🟡 Loader */}
            {loading && <p>Loading...</p>}

            <table border="1" cellPadding="10" cellSpacing="0">
                <tbody>
                    {
                        filteredUsers.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/user/${user.id}`}>View Details</Link>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                                    </td>

                                    <td>
                                        <Link to={`/user/${user.id}/edit`}>Edit</Link> {/* ✅ Edit */}
                                    </td>
                                </tr>
                            )
                        })
                    }</tbody>
            </table>




        </div>
    )
}

export default Users