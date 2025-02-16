import React from "react";
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies, onMovieClick }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
    onMovieClick(movieId);
  };

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
          <h3>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={200}
          />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
