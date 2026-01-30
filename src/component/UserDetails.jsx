import React, { use, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUserById } from '../services/userService';



const UserDetails = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, [])


    const fetchUser = async () => {
        setLoading(true);
        const res = await getUserById(id);
        setUser(res.data);
        setLoading(false);
    }

    return (
        <div>  <h2>User Detail</h2>

            {loading && <p>Loading...</p>}

            {user && (
                <>
                    <p><b>Name:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Role:</b> {user.role}</p>
                </>
            )}

            <Link to="/">⬅ Back</Link></div>
    )
}

export default UserDetails