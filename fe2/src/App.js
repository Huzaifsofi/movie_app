import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import MoviePage from './pages/MoviePage'
import Signup from './pages/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/:id' element={<MoviePage/>} />
      </Routes>
    </Router>
  )
}

export default App