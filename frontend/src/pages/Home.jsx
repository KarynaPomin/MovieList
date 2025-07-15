import MovieCard from '../components/MovieCard';
import '../css/Home.css'
import { useState, useEffect } from 'react';


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [allMovies, setAllMovies] = useState([]);
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
            setAllMovies(popularMovies);
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

    const handleSearch = async (e) => {
        e.preventDefault(); // It make page is not update
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try {
            const searchResults = allMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies..")
        } finally {
            setLoading(false)
        }
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

        {error && <div className='error-message'>{error}</div>}

        {loading ? (
            <div className='loading'>Loading...</div>
        ) : (
        <div className="movies-grid">
            {movies.map(
                (movie) => (
                    <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
    )}
        
    </div>
}

export default Home