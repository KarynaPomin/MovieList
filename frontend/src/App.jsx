import { useState } from 'react'
import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from "./pages/Home"
import Favorites from './pages/Favorites';

function App() {
  const movieNumber = 1;

  return (
    <div>
      <NavBar />
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route  path='/favorites' element={<Favorites />}/>
      </Routes>
    </main>
    </div>
  )
}

export default App