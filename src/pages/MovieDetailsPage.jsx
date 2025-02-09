import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";
import GoBackButton from "../components/GoBackButton/GoBackButton";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer eced978ba9a6a00d9c703652fcf78a3f`,
        },
      })
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movieData) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movieData.title}</h1>
      <p>{movieData.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
        alt={movieData.title}
        width={250}
      />
      <GoBackButton />
      <MovieCast />
      <MovieReviews />
    </div>
  );
};

export default MovieDetailsPage;
