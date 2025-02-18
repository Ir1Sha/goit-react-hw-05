import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  NavLink,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import { API_KEY } from "../../config";
import styles from "../styles/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  if (!movieData) return <p>Loading...</p>;

  const handleNavClick = (event, section) => {
    if (location.pathname.endsWith(section)) {
      event.preventDefault();
      navigate(`/movies/${movieId}`);
    }
  };

  return (
    <div className={styles.movieDetailsContainer}>
      <GoBackButton onClick={() => navigate(backLinkRef.current)} />

      <img
        src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
        alt={movieData.title}
        width={250}
        className={styles.moviePoster}
      />
      <h1 className={styles.movieTitle}>{movieData.title}</h1>
      <p className={styles.movieInfo}>User Score: {movieData.vote_average}</p>
      <p className={styles.movieInfo}>{movieData.overview}</p>
      <p className={styles.movieInfo}>
        Genres: {movieData.genres.map((genre) => genre.name).join(", ")}
      </p>

      <div className={styles.additionalInfo}>
        <h2 className={styles.additionalHeader}>Additional Information</h2>
        <ul className={styles.toggleButtonsContainer}>
          <li>
            <NavLink
              to="cast"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.toggleButton
              }
              onClick={(event) => handleNavClick(event, "cast")}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.toggleButton
              }
              onClick={(event) => handleNavClick(event, "reviews")}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
