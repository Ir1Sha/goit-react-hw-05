import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={styles.movieListContainer}>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieListItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={styles.movieLink}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={260}
                className={styles.movieListImg}
              />
              <h3 className={styles.movieListTitle}>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
