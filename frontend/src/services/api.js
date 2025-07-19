const BASE_URL = "http://localhost/Rect%20project/MovieList/movie-api";

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/get_movies.php`);
    console.log("Fetch response:", response);
    const data = await response.json();
    console.log("Data:", data);
    return data;
}

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search_movies.php?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data;
}