import React from 'react'
import { getToken, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Nav = () => {

      const token = getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
    return (
        <nav>
            <Link to="/Users">Users</Link>
            <Link to="/add-user">Add User</Link>
           {!token && <Link to="/login">Login</Link>}
            {token && <button onClick={handleLogout}>Logout</button>}
            <hr />
            <hr />
        </nav>
    )
}

export default Nav