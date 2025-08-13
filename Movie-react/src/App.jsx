import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount, getTrendingMovies } from "./appwrite";

const API_REST_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search term
  useDebounce(() => setDebouncedSearch(searchTerm), 500, [searchTerm]);

  // Fetch movies from TMDB
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setError("");
    try {
      const endpoint = query
        ? `${API_REST_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_REST_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();

      if (!data.results) {
        setError(data.error || "Failed to fetch movies");
        setMovies([]);
        return;
      }

      setMovies(data.results);

      // Update search count in Appwrite
      if (query && data.results.length > 0) {
        const firstMovie = data.results[0];
        await updateSearchCount(query, firstMovie.id, firstMovie.poster_path);
      }
    } catch (err) {
      console.error("Error occurred:", err);
      setError("Error loading movies, Please try again :)");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trending movies from Appwrite
  const fetchTrending = async () => {
    try {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending || []);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  // Fetch movies on search
  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  // Fetch trending movies on mount
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="logo" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* Trending Movies */}
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>
                    {index + 1}
                  </p>
                  <img src={movie.poster_URL} alt= {movie.title} /> 
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* All Movies */}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
