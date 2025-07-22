import MovieCard from '../components/MovieCard';
import '../css/Home.css'
import { useState, useEffect, use } from 'react';
import { getGenres, getPopularMovies, searchMovies } from '../services/api';
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup"


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadPopularMovies = async () => {
        try {
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [genresQuery, setGenresQuery] = useState("")

    const handleGenreSelect = async (genre) => {
        if (loading) return;

        setGenresQuery(genre);
        setLoading(true);
        try {
            const searchGenreResults = allMovies.filter(movie =>    
                movie.genre.toLowerCase().includes(genre.toLocaleLowerCase())  
            );

            if (genre === "All") 
                setMovies(allMovies); 
            else {
                if (searchGenreResults.length === 0){
                    setMovies([]);
                    throw "This is an error!";
                }
                else
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
        setAnchorEl(event.currentTarget);
    }
    
    function handleCloseMenu(event) {
        setAnchorEl(null);
    }

    useEffect (() => {
        const loadAllGenres = async () => {
            try {
                const genres = await getGenres();
                setAllGenres(genres);
            } catch (err) {
                console.log(err);
                setError("Failed to load genres...")
            } finally {
                setLoading(false);
            }
        }

        loadAllGenres();
    }, [])

    return <div className="home">
        <form onSubmit={handleSearch} className='search-form'>
            <input 
            type="text" 
            placeholder='Search for movies...' 
            className='search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <Button type='submit' className='search-button' variant="contained">Search</Button>
        </form>

        <div className='genres-list'>
            <ButtonGroup 
                variant="text" 
                aria-label="Basic button group"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
            >
                {allGenres.map((g) => (
                    <Button
                        key={g}
                        onClick={() => handleGenreSelect(g)}
                        id={g}
                    >
                        {g}
                    </Button>
                ))}



                {/* <Button onClick={() => handleGenreSelect("All")} id='sci-fi'>All</Button>
                <Button onClick={() => handleGenreSelect("Action")} id='action'>Action</Button>
                <Button onClick={() => handleGenreSelect("Thriller")} id='thtiller'>Thriller</Button>
                <Button onClick={() => handleGenreSelect("Sci-Fi")} id='sci-fi'>Sci-Fi</Button> */}
            </ButtonGroup>
            
            {/* <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
            >
                Genres
            </Button>
            <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                open={Boolean(anchorEl)}>

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

            </Menu> */}
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