import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext"
import { getPopularMovies, searchMovies } from '../services/api';
import '../css/Movie.css'

function Movie() {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    useEffect(() => {
    const loadMovie = async () => {
        try {
            const allMovies = await getPopularMovies();
            const foundMovie = allMovies.find(movie => movie.id === Number(id));
            setMovie(foundMovie);
        } catch (err) {
            console.log(err);
            setError("Failed to load movies...");
        } finally {
            setLoading(false);
        }
    };

        loadMovie();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p>Movie not found</p>;

    return (
        <div className="movie-info">
            <img src={`/images/${movie.cover_image}`} alt={movie.title} />
            <div className="movie-info-block">
                <h3>{movie.title}</h3>
                <p><span>Genre: </span>{movie.genre}</p>
                <p><span>Release date: </span>{movie.release_date}</p>
                <p><span>Description: </span>{movie.description}</p>
            </div>
        </div>
    );
}

export default Movie;
