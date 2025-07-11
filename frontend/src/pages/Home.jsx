import MovieCard from '../components/MovieCard';
import '../css/Home.css'
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '../services/api';   

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadPopularMovies = () => {
        try {
            const popularMovies = [
                { id: 1, title: "John Wick", release_date: "2020" },
                { id: 2, title: "Terminator", release_date: "1999" },
                { id: 3, title: "The Matrix", release_date: "1998" }
            ];
            setMovies(popularMovies);
        } catch (err) {
            console.log(err);
            setError("Failed to load movies...");
        } finally {
            setLoading(false);
        }
    };

        loadPopularMovies();
    }, []);


    const handleSearch = (e) => {
        e.preventDefault(); // It make page is not update
        alert(searchQuery);
    };

    return <div className="home">
        <form onSubmit={handleSearch} className='search-form'>
            <input 
            type="text" 
            placeholder='Search for movies...' 
            className='search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type='submit' className='search-button'>Search</button>
        </form>
        <div className="movies-grid">
            {movies.map(
                (movie) => (
                movie.title.toLocaleLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />)
            ))}
        </div>
    </div>
}

export default Home