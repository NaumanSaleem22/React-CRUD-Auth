import './App.css'
import Users from './component/Users'
import AddUser from './component/AddUser'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import UserDetails from './component/UserDetails'
import EditUser from './component/EditUser'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import NavbarS from './component/Nav'
import MyProfile from './component/MyProfile'
import { useEffect } from 'react'
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
function App() {

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme; // Apply theme class to body
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <NavbarS/>
        <Routes>
          <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path='/add-user' element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path='/user/:id' element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
          <Route path='/user/:id/edit' element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
          <Route path='/my-profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
