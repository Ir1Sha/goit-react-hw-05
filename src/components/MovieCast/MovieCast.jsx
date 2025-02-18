import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../../../config";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
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
    <>
      <h2 className={styles.additionalHeader}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://via.placeholder.com/100"
              }
              alt={actor.name}
              className={styles.castItemImg}
            />
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.characterName}>{actor.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
