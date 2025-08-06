import React from 'react'

const MovieCard = ({movie:{title, vote_average, poster_path, release_date, original_language}}) => {
  return(
    
    <div className='movie-card'>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="rounded mb-2"
        />
  
        <div className='mt-4'>
           <h3> {title} </h3>

          <div className='content'>

            <div className='rating'>
              <img src="Rating.png" alt='Star Icon' />
              <p>{vote_average ?  vote_average.toFixed(1) : "N/A"}</p>
                 <span>•</span>
              <p className='lang'> {original_language} </p>
                 <span>•</span>
              <p>{release_date ? release_date.split('-')[0] : "N/A"}</p>

            </div>
          </div>
        </div>
    </div>



  )
}

export default MovieCard;