import React, {useState} from 'react'
import { createUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar:'https://picsum.photos/800',
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        })
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await createUser(formData);
            setSuccess("User created successfully");
            setError("");
            setFormData({ name: '', email: '', password: '', avatar: 'https://picsum.photos/800' });
            navigate("/users");
        }
        catch (error) {
            setError("Failed to create user");
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div><h2>Add User</h2>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name='name' value={formData.name} onChange={(handleChange)} />
                <input type="email" placeholder="Email" name='email' value={formData.email} onChange={(handleChange)} />
                <input type="password" placeholder="Password" name='password' value={formData.password} onChange={(handleChange)} />
                <input type="text" placeholder="Avatar URL" name='avatar' value={formData.avatar} onChange={(handleChange)} />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add User"}
                </button>
            </form>
        </div>
    )
}

export default AddUser