import React, { use, useEffect, useState } from 'react'
import { getUserById, getUsers } from '../services/userService';
import { Link } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUser();
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

    

    return (
        <div>
            <h2>
                Users List
            </h2>

            {/* 🔴 Error */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 🟡 Loader */}
            {loading && <p>Loading...</p>}

            <ul>
                {
                    users.map((user) => {
                        return (
                            <li key={user.id}>
                               {user.id} ---- {user.name} - {user.email}
                                <br />
                                 <Link to={`/user/${user.id}`}>View Details</Link>
                            </li>
                        )
                    })
                }
            </ul>

            


        </div>
    )
}

export default Users