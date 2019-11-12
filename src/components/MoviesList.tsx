import React from 'react'
import Movie from '../models/Movie'

interface MoviesListProps {
  movies: Movie[]
}

const MoviesList: React.FC<MoviesListProps> = (props: MoviesListProps) => {
  return (
    <div>
      {props.movies.map(movie => {
        return (
          <div key={movie.id}>
            <img src={movie.photo} />
            <div>{movie.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default MoviesList
