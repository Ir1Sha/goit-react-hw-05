import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { API_KEY } from "../../config";
import styles from "../styles/MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error searching movies:", error);
      });
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value.trim();

    if (!searchValue) {
      alert("Please enter a search term!");
      return;
    }

    setSearchParams({ query: searchValue });
  };

  const handleMovieClick = (movieId) => {
    console.log(`Movie clicked with ID: ${movieId}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for a movie"
          className={styles.input}
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>
      {query && movies.length === 0 && (
        <p className={styles.searchResponse}>No movies found</p>
      )}

      {movies.length > 0 && (
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
};

export default MoviesPage;
