import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../../config";

const MovieReviews = ({ movieId }) => {
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
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this movie.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
