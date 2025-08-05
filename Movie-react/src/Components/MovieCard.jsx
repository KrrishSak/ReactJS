import React from 'react'

const MovieCard = ({movie:{title, vote_average, poster_path, release_date, original_language}}) => {
  return(
    
    <div className='movie-card'>
        <p className='text-white'>{title}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="rounded mb-2"
        />

        <div className='mt-4'>
          <p className='text-white'>{title}</p>

          <div className='content'>
            <p className='text-white'>{release_date}</p>
            <div className='rating'>
              <img src="star.svg" alt='Star Icon' />
            </div>
          </div>
          
        </div>
    </div>



  )
}

export default MovieCard;