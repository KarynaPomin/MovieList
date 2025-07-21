import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext"
import { getPopularMovies, searchMovies } from '../services/api';

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

    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    return (
        <div>
            <img src={`/images/${movie.cover_image}`} alt={movie.title} />
            <div className="movie-info-block">
                <h3>Title: {movie.title}</h3>
                <p>Genre: {movie.genre}</p>
                <p>Release date: {movie.release_date}</p>
                <p>Description: {movie.description}</p>
            </div>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
    );
}

export default Movie;
