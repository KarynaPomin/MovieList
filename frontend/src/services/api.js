export const getPopularMovies = async () => {
    return [
        { id: 1, title: "John Wick", release_date: "2020" },
        { id: 2, title: "Terminator", release_date: "1999" },
        { id: 3, title: "The Matrix", release_date: "1998" }
    ];
};

export const searchMovies = async (query) => {
    const movies = await getPopularMovies();
    return movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
};
