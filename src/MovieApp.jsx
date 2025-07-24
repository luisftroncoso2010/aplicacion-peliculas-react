import "./MovieApp.css";
import { useState } from "react";

export const MovieApp = () => {
  const [search, setSearch] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "MI_API";

  const handleInputChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      setMoviesList(data.results);
    } catch (error) {
      console.error("Ha ocurrido el siguiente error: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí una película"
          value={search}
          onChange={handleInputChange}
        />
        <button className="search-button">Buscar</button>
      </form>
      {moviesList && (
        <div className="movie-list">
          {moviesList.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
