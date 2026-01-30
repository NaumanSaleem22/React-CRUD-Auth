import React, { use, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/userService';

const EditUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
    });


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        const fetchUSer = async () => {
            try {
                setLoading(true);
                const res = await getUserById(id);
                setFormData({
                    name: res.data.name,
                    email: res.data.email,
                    password: '',
                    avatar: res.data.avatar,
                });
                setError('');
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        }
        fetchUSer();
    }, [id]);
    // 🔹 Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // 🔹 Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await updateUser(id, formData); // ✅ PUT request
            setSuccess("User updated successfully");
            setError("");
            navigate("/users"); // back to user list
        } catch (err) {
            console.log(err.response?.data || err.message);
            setError("Failed to update user");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading user data...</p>;
    return (
        <div> <h2>Edit User</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          placeholder="Avatar URL"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update User"}
        </button>
      </form></div>
    )
}

export default EditUser