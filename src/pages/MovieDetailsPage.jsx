import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import { API_KEY } from "../../config";
import styles from "../styles/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => {
        console.error("Error fetching movie cast:", error);
      });
  }, [movieId]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movie reviews:", error);
      });
  }, [movieId]);

  const handleToggleCast = () => {
    setShowCast((prev) => !prev);
    setShowReviews(false);
  };

  const handleToggleReviews = () => {
    setShowReviews((prev) => !prev);
    setShowCast(false);
  };

  if (!movieData) return <p>Loading...</p>;

  return (
    <div className={styles.movieDetailsContainer}>
      <GoBackButton onClick={() => navigate(-1)} />

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
        <h2>Additional Information</h2>
        <ul className={styles.toggleButtonsContainer}>
          <li>
            <button onClick={handleToggleCast} className={styles.toggleButton}>
              {showCast ? "Hide Cast" : "Cast"}
            </button>
          </li>
          <li>
            <button
              onClick={handleToggleReviews}
              className={styles.toggleButton}
            >
              {showReviews ? "Hide Reviews" : "Reviews"}
            </button>
          </li>
        </ul>

        {showCast && (
          <div>
            <h2 className={styles.additionalHeader}>Cast</h2>
            <ul className={styles.castList}>
              {cast.map((actor) => (
                <li key={actor.id} className={styles.castItem}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    width={100}
                  />
                  <p className={styles.actorName}>{actor.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showReviews ? (
          reviews.length > 0 ? (
            <div className={styles.reviewsContainer}>
              <h3 className={styles.additionalHeader}>Reviews</h3>
              <ul>
                {reviews.map((review) => (
                  <li key={review.id} className={styles.reviewItem}>
                    <p>
                      <strong>{review.author}</strong>
                    </p>
                    <p>{review.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className={styles.movieInfo}>
              We don't have any reviews for this movie.
            </p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
