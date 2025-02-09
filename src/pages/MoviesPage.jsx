import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        headers: {
          Authorization: `Bearer eced978ba9a6a00d9c703652fcf78a3f`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error("Error searching movies:", error));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value;
    setSearchParams({ query: searchValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MoviesPage;
