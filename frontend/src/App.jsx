import { useState } from 'react'
import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext';
import NavBar from './components/NavBar';
import Home from "./pages/Home"
import Favorites from './pages/Favorites';
import Movie from './pages/Movie';

function App() {
  const movieNumber = 1;

  return (
    <MovieProvider>
      <NavBar />
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/movies/:id' element={<Movie />} />
      </Routes>
    </main>
    </MovieProvider>
  )
}

export default App