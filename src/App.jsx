import { Box } from '@mui/material'
import React from 'react'
import Navigation from './components/Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/Blog'
import UserProvider from './context/UserContext'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navigation />
        <Routes>
          <Route path='/' element={<h1>Home page</h1>} />
          <Route path='/about' element={<h1>about page</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App




// fetch(
//   'http://localhost:5000/users',
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name: 'John Doe' })
//    }
// )
// .then(res => res.json())
// .then(data => console.log(data))

// axios.post('http://localhost:5000/users', { name: 'John Doe' })
//   .then(data => console.log(data))
