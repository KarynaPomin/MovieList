import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Favorites from './pages/Favorites';

function App() {
  const movieNumber = 1;

  return (
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route  path='/favorites' element={<Favorites />}/>
      </Routes>
    </main>
  )
}

export default App