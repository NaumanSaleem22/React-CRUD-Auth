import React, { useContext } from 'react'
import { getToken, logout } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MyProfile from './MyProfile';
import Button from 'react-bootstrap/Button';
import { ThemeContext } from '../context/ThemeContext';

const NavbarS = () => {

    const token = getToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">CRUD + Auth Application </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/add-user">Add User</Nav.Link>

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

                        {token && <Button variant="danger" onClick={handleLogout}>Logout</Button>}
                        {!token && <Button variant="success" as={Link} to="/login">Login</Button>}
                        <Button onClick={toggleTheme} style={{ marginLeft: "10px" }}>
                            Toggle {theme === "light" ? "Dark" : "Light"} Theme
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarS