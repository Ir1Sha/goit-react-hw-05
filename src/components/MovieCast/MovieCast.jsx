import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../../config";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

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

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
              width={100}
            />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
