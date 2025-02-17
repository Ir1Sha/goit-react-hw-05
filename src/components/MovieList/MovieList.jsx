import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies, onMovieClick }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
    onMovieClick(movieId);
  };

  return (
    <div className={styles.movieListContainer}>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
            className={styles.movieListItem}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={260}
              className={styles.movieListImg}
            />
            <h3 className={styles.movieListTitle}>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
