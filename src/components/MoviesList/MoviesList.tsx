import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Movie from '../../models/Movie'

import './MoviesList.css'

import * as ROUTES from '../../constants/routes'

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
    <div className="MoviesList">
      {props.movies.map(movie => {
        console.log(movie.photo)
        return (
          <div
            className="MoviesList_item"
            key={movie.id}
            onClick={() => handleMovieClick(props, movie.id ? movie.id : 1)}
          >
            <img src={`http://localhost:3000/${movie.photo}`} />
            <div>{movie.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default withRouter(MoviesList)
