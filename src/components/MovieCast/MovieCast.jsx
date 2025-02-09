import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer eced978ba9a6a00d9c703652fcf78a3f`,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => console.error("Error fetching movie cast:", error));
  }, [movieId]);

  return (
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
  );
};

export default MovieCast;
