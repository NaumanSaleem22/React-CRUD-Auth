import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './component/Users'
import AddUser from './component/AddUser'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import UserDetails from './component/UserDetails'
import EditUser from './component/EditUser'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/Users">Users</Link>
          <Link to="/add-user">Add User</Link>
          <Link to="/edit-user">Edit User</Link>
          <hr />
        </nav>
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/user/:id' element={<UserDetails />} />
          <Route path='/user/:id/edit' element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
