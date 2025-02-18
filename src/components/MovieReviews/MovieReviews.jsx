import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../../config";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

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

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.additionalHeader}>Reviews</h2>
      {reviews.length === 0 ? (
        <p className={styles.movieInfo}>
          We don't have any reviews for this movie.
        </p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewAuthor}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
