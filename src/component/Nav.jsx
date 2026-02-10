import React from 'react'
import { getToken, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MyProfile from './MyProfile';


const NavbarS = () => {

    const token = getToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        // <nav>
        //     <Link to="/Users">Users</Link>
        //     <Link to="/add-user">Add User</Link>
        //    {!token && <Link to="/login">Login</Link>}
        //     {token && <button onClick={handleLogout}>Logout</button>}
        //     <hr />
        //     <hr />
        // </nav>

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">CRUD + Auth Application </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/add-user">Add User</Nav.Link>
                        {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {token && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarS