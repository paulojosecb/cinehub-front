import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Movie from '../models/Movie'

import * as ROUTES from '../constants/routes'

interface MoviesListProps {
  movies: Movie[]
}

const handleMovieClick = (props: any, id: number) => {
  const {
    match: { params },
    history
  } = props
  history.push(`${ROUTES.USER}/${params.user_id}${ROUTES.MOVIE_DETAIL}/${id}`)
}

const MoviesList: React.FC<MoviesListProps & RouteComponentProps> = (
  props: MoviesListProps
) => {
  return (
    <div>
      {props.movies.map(movie => {
        return (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(props, movie.id ? movie.id : 1)}
          >
            <img src={movie.photo} />
            <div>{movie.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(MoviesList)
