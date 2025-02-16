import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import { API_KEY } from "../../config";

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

  if (!movieData) return <p>Loading...</p>;

  return (
    <div>
      <GoBackButton onClick={() => navigate(-1)} />

      <img
        src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
        alt={movieData.title}
        width={250}
      />
      <h1>{movieData.title}</h1>
      <p>User Score: {movieData.vote_average}</p>
      <p>{movieData.overview}</p>
      <p>Genres: {movieData.genres.map((genre) => genre.name).join(", ")}</p>

      <div>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <button onClick={() => setShowCast(!showCast)}>
              {showCast ? "Hide Cast" : "Cast"}
            </button>
          </li>
          <li>
            <button onClick={() => setShowReviews(!showReviews)}>
              {showReviews ? "Hide Reviews" : "Reviews"}
            </button>
          </li>
        </ul>

        {showCast && (
          <div>
            <h2>Cast</h2>
            <ul>
              {cast.map((actor) => (
                <li key={actor.id}>
                  <p>{actor.name}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    width={100}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {showReviews ? (
          reviews.length > 0 ? (
            <div>
              <h3>Reviews</h3>
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <p>
                      <strong>{review.author}</strong>
                    </p>
                    <p>{review.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>We don't have any reviews for this movie.</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
