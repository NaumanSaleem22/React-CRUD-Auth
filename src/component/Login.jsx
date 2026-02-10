import React, { useState } from 'react'
import { loginUser } from '../services/authService';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            setLoading(true);

            const res = await loginUser(form);
            saveToken(res.data.access_token);
            navigate("/users");
        }
        catch(err){
            setError("Login failed. Please check your credentials.");
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <h2>Login</h2>

        {error && <p style={{color: "red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" placeholder='Email' name="email" value={form.email} onChange={handleChange} />
            </div>
            <br/>   
            <div>
                <label>Password</label> 
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='Password' />    
            </div>


            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login