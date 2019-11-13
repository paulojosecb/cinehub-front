import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import MoviesList from '../components/MoviesList'
import Movie from '../models/Movie'

import UserService from '../services/UserService'
import MovieService from '../services/MovieService'
import User from '../models/User'

interface OtherUserPageState {
  movies: Movie[]
  user: User
}

type Params = {
  user_id: string
}

class OtherUserPage extends React.Component<
  RouteComponentProps<Params>,
  OtherUserPageState
> {
  constructor(p: RouteComponentProps<Params>) {
    super(p)
    this.state = {
      movies: [],
      user: {}
    }
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props

    MovieService.fetchMovies(parseInt(params.user_id)).then(movies =>
      this.setState({ movies })
    )

    UserService.fetchUser(parseInt(params.user_id)).then(user =>
      this.setState({ user })
    )
  }
  render() {
    const { movies, user } = this.state
    return (
      <div className="App">
        <div>
          <div>
            <SectionTitle
              title={`Acervo de ${user.name ? user.name : 'Carregando'}`}
            />
          </div>
          <MoviesList movies={movies} />
        </div>
      </div>
    )
  }
}

export default OtherUserPage
