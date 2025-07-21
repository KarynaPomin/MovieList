import MovieCard from '../components/MovieCard';
import '../css/Home.css'
import { useState, useEffect, use } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadPopularMovies = async () => {
        try {
            // const popularMovies = [
            //     { id: 1, title: "John Wick", release_date: "2020" },
            //     { id: 2, title: "Terminator", release_date: "1999" },
            //     { id: 3, title: "The Matrix", release_date: "1998" }
            // ];

            const popularMovies = await getPopularMovies();
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

    const [selectedGenres, setSelectetGenres] = useState(null);
    const [genresQuery, setGenresQuery] = useState("")

    const handleGenreSelect = async (genre) => {
        if (loading) return;

        setGenresQuery(genre);
        setLoading(true);
        try {
            if (genre === "All") {
                setMovies(allMovies); 
            }
            else {
                const searchGenreResults = allMovies.filter(movie =>    
                movie.genre.toLowerCase().includes(genre.toLocaleLowerCase())  
            );

            if (searchGenreResults.length === 0)
                throw "This is an error!";

                setMovies(searchGenreResults)
            }
        
            setError(null)
        } catch (err) {
            console.log(err);
            setError("Failed to search movies by genre...")
        } finally {
            handleCloseMenu();
            setLoading(false);
        }
    }

    function handleOpenMenu(event) {
        setSelectetGenres(event.currentTarget);
    }
    
    function handleCloseMenu(event) {
        setSelectetGenres(null);
    }

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

        <div className='genres-list'>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
            >
                Genres
            </Button>
            <Menu
                keepMounted
                selectedGenres={selectedGenres}
                onClose={handleCloseMenu}
                open={Boolean(selectedGenres)}>

                <MenuItem onClick={() => handleGenreSelect("Action")} id='action'>
                    Action
                </MenuItem>
                <MenuItem onClick={() => handleGenreSelect("Thriller")} id='thtiller'>
                    Thriller
                </MenuItem>
                <MenuItem onClick={() => handleGenreSelect("Sci-Fi")} id='sci-fi'>
                    Sci-Fi
                </MenuItem>
                <MenuItem onClick={() => handleGenreSelect("All")} id='all'>
                    Show All
                </MenuItem>

            </Menu>
        </div>
    
        {genresQuery !== "All" && 
            <div className='genre-message'>{genresQuery}</div>
        }
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