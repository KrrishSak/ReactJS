import React, { useState, useEffect } from 'react'
import Search from './Components/Search'
import Spinner from './Components/Spinner'
import MovieCard from './Components/MovieCard'

const API_REST_URL="https://api.themoviedb.org/3"

const API_KEY= import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS= {
  method:"GET",
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const[movies, setmovies] = useState([]);
  const[isLoading, setisLoading] = useState(false);

  const fetchmovies = async() => {
    setisLoading(true);
    setError('');
    try{
      const endpoint = `${API_REST_URL}/discover/movie?sort_by=popularity.desc` 
      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
        throw new Error("Error fetching movies");
      }
      const data = await response.json();
      if(data.response === "False"){
        setError(data.error || 'Failed to fetch movies');
        setmovies([]);
        return;   
      }
      setmovies(data.results || []);
    }
    catch(error){
      console.error("Error Occured, Please try again")
      setError('Error loading movies, Please try again :)')
    }
    finally{
      setisLoading(false);
    }
  }
  useEffect(() => {
    fetchmovies();
  },[])
  return (
    <main>
      <div className="pattern">
        
      </div>
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="logo" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
        <section className='all-movies'>
          <h2 className='mt-[20px]'> All Movies </h2>
          {isLoading ? (
            <Spinner />
          ): error? (
            <p className="text-red-500">{error}</p>
          ): <ul>
              {movies.map((movie) => (
               <MovieCard key={movie.id} movie={movie}   />
              ))}
            </ul>}
        </section>
      </div>
    </main>
  )
}


export default App