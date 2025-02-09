import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/day", {
        headers: {
          Authorization: `Bearer eced978ba9a6a00d9c703652fcf78a3f`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
