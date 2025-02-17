import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import { API_KEY } from "../../config";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/day", {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleMovieClick = (movieId) => {
    console.log("Navigating to movie:", movieId);
    navigate(`/movies/${movieId}`);
  };

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.homePageTitle}>Trending Movies</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
      ) : (
        <p className={styles.paragraph}>No movies found</p>
      )}
    </div>
  );
};

export default HomePage;
